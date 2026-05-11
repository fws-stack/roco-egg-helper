#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
洛克王国世界 - BWIKI数据爬取 + 数据文件生成
从 wiki.biligame.com/rocom 获取精灵数据，直接生成更新后的 JS 数据文件
"""

import json
import os
import re
import time
import urllib.request
import urllib.parse
import gzip
from io import BytesIO

API_BASE = "https://wiki.biligame.com/rocom/api.php"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(OUTPUT_DIR, "miniprogram", "data")

HEADERS = {
    "User-Agent": "RocoEggQuery/1.0 (data collection for mini-program)",
    "Accept": "application/json",
    "Accept-Encoding": "gzip",
}

# 元素类型映射 (模板短名 → 完整中文名 + 索引)
ELEMENT_MAP = {
    "普通": "普通", "草": "草", "火": "火", "水": "水",
    "光": "光", "地": "地", "冰": "冰", "龙": "龙",
    "电": "电", "毒": "毒", "虫": "虫", "武": "武",
    "翼": "翼", "萌": "萌", "幽": "幽", "恶": "恶",
    "机械": "机械", "幻": "幻",
}

ELEMENT_ORDER = list(ELEMENT_MAP.keys())


def api_request(params, retries=3):
    url = API_BASE + "?" + urllib.parse.urlencode(params)
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            resp = urllib.request.urlopen(req, timeout=20)
            data = resp.read()
            if resp.headers.get("Content-Encoding") == "gzip":
                data = gzip.GzipFile(fileobj=BytesIO(data)).read()
            return json.loads(data.decode("utf-8"))
        except Exception as e:
            if attempt == retries - 1:
                return None
            time.sleep(1)
    return None


def get_all_sprite_pages():
    """获取所有精灵页面列表"""
    print("[1] 获取精灵列表...")
    all_pages = []
    params = {
        "action": "query", "list": "categorymembers",
        "cmtitle": "Category:精灵", "format": "json", "cmlimit": 500,
    }
    while True:
        data = api_request(params)
        if not data: break
        for m in data.get("query", {}).get("categorymembers", []):
            if m.get("ns") == 0:
                all_pages.append(m["title"])
        if "continue" in data:
            params["cmcontinue"] = data["continue"]["cmcontinue"]
        else:
            break
        time.sleep(0.2)
    print(f"  共 {len(all_pages)} 个精灵页面")
    return all_pages


def filter_base_sprites(pages):
    """去重：过滤掉形态变体，只保留基础形态"""
    # 变体后缀模式
    variant_pats = [
        r'[（(](?!本来|平常|原始)[^)）]*(?:样子|形态)[)）]',
        r'[（(][^)）]*(?:春天|夏天|秋天|冬天|火山|雪山|沙地|草地|高山|崖间|极夜|极昼)[^)）]*[)）]',
        r'[（(](?:白石|黑子|上弦|下弦|磨[^)）]*)[)）]',
        r'[（(](?:储水期|枯水期|蜕皮时|悲鸣|被污染|喵喵|幽冥眼|奇丽花|球球尾巴|短毛|海神|象牙|彩玉)[^)）]*[)）]',
        r'[（(](?:蓝莓|杨桃|樱桃|草莓|抹茶|巧克力|香草|碧蓝|翠绿|杏黄|洋红|烧蓝|星彩|西瓜|莲花)[^)）]*[)）]',
    ]

    base = []
    variants = []
    for page in pages:
        is_var = False
        for pat in variant_pats:
            if re.search(pat, page):
                is_var = True
                variants.append(page)
                break
        if not is_var:
            base.append(page)

    print(f"  基础精灵: {len(base)}, 形态变体: {len(variants)}")
    return base


def batch_fetch_wikitext(pages, batch_size=20):
    """批量获取精灵页面的 wikitext"""
    print(f"[2] 批量获取 {len(pages)} 个精灵数据...")
    results = []

    for i in range(0, len(pages), batch_size):
        batch = pages[i:i + batch_size]
        titles = "|".join(batch)

        data = api_request({
            "action": "query", "prop": "revisions",
            "rvprop": "content", "rvslots": "main",
            "titles": titles, "format": "json", "redirects": 1,
        })

        if not data:
            continue

        for pid, pdata in data.get("query", {}).get("pages", {}).items():
            if pid.startswith("-"): continue
            revs = pdata.get("revisions", [])
            if revs:
                text = revs[0].get("slots", {}).get("main", {}).get("*", "")
                results.append({
                    "title": pdata.get("title", ""),
                    "pageid": int(pid),
                    "wikitext": text,
                })

        progress = min(i + batch_size, len(pages))
        print(f"  {progress}/{len(pages)}", end="\r")
        time.sleep(0.4)

    print(f"\n  成功获取 {len(results)} 个页面")
    return results


def parse_sprite_info(item):
    """从 wikitext 解析精灵信息模板"""
    text = item["wikitext"]
    title = item["title"]
    info = {"wiki_name": title, "pageid": item["pageid"]}

    # 查找模板
    m = re.search(r'\{\{精灵信息\s*\n(.*?)\}\}', text, re.DOTALL)
    if not m:
        return info
    tpl = m.group(0)

    fields = {
        "精灵名称": r'\|\s*精灵名称\s*=\s*(.*)',
        "精灵初阶名称": r'\|\s*精灵初阶名称\s*=\s*(.*)',
        "主属性": r'\|\s*主属性\s*=\s*(.*)',
        "2属性": r'\|\s*2属性\s*=\s*(.*)',
        "特性": r'\|\s*特性\s*=\s*(.*)',
        "特性描述": r'\|\s*特性描述\s*=\s*(.*)',
        "精灵描述": r'\|\s*精灵描述\s*=\s*(.*)',
        "精灵类型": r'\|\s*精灵类型\s*=\s*(.*)',
        "精灵阶段": r'\|\s*精灵阶段\s*=\s*(.*)',
        "生命": r'\|\s*生命\s*=\s*(.*)',
        "速度": r'\|\s*速度\s*=\s*(.*)',
        "物攻": r'\|\s*物攻\s*=\s*(.*)',
        "魔攻": r'\|\s*魔攻\s*=\s*(.*)',
        "物防": r'\|\s*物防\s*=\s*(.*)',
        "魔防": r'\|\s*魔防\s*=\s*(.*)',
        "体型": r'\|\s*体型\s*=\s*(.*)',
        "重量": r'\|\s*重量\s*=\s*(.*)',
        "分布地区": r'\|\s*分布地区\s*=\s*(.*)',
        "是否有异色": r'\|\s*是否有异色\s*=\s*(.*)',
        "进化条件": r'\|\s*进化条件\s*=\s*(.*)',
    }

    for key, pat in fields.items():
        match = re.search(pat, tpl, re.MULTILINE)
        if match:
            val = match.group(1).strip()
            if val and val != "":
                info[key] = val

    return info


def determine_rarity(stage, has_variant):
    """根据精灵阶段推断稀有度"""
    stage_map = {
        "Ⅰ阶": 1, "Ⅱ阶": 2, "最终形态": 3,
        "原始形态": 1, "地区形态": 2,
    }
    return stage_map.get(stage, 1)


def build_sprite_data(parsed_sprites):
    """构建 sprites.js 数据"""
    sprites = {}
    for s in parsed_sprites:
        name = s.get("精灵名称") or s.get("精灵初阶名称") or s.get("wiki_name", "")
        # 清理名字中的括号后缀
        name = re.sub(r'[（(][^)）]*[)）]', '', name).strip()

        elem = s.get("主属性", "普通")
        elem_idx = ELEMENT_ORDER.index(elem) if elem in ELEMENT_ORDER else 0

        stage = s.get("精灵阶段", "")
        rarity = determine_rarity(stage, s.get("是否有异色", "") == "是")

        desc = s.get("精灵描述", "")

        sprites[name] = {
            "n": name,
            "e": elem_idx,
            "r": rarity,
            "d": desc,
        }

    return sprites


def build_egg_data(parsed_sprites):
    """根据爬取数据更新蛋参数"""
    eggs = []
    for s in parsed_sprites:
        name = s.get("精灵名称") or s.get("wiki_name", "")
        name = re.sub(r'[（(][^)）]*[)）]', '', name).strip()

        size_str = s.get("体型", "0.1~0.3")
        weight_str = s.get("重量", "0.1~1.0")

        # 解析范围
        def parse_range(s):
            parts = re.split(r'[~～-]', s)
            try:
                if len(parts) >= 2:
                    return (float(parts[0].strip()), float(parts[1].strip()))
                else:
                    v = float(parts[0].strip())
                    return (v, v)
            except:
                return (0.1, 0.5)

        size_min, size_max = parse_range(size_str)
        weight_min, weight_max = parse_range(weight_str)

        eggs.append({
            "name": name,
            "size": {"min": size_min, "max": size_max},
            "weight": {"min": weight_min, "max": weight_max},
        })

    return eggs


def generate_js_files(sprites, eggs, existing_sprites=None):
    """生成更新后的 JS 数据文件"""
    print("[3] 生成 JS 数据文件...")

    # 与现有 sprites.js 合并 (保留现有ID映射)
    # 首先读取现有的 sprites.js 获取 ID→名称 映射
    existing_sprites_path = os.path.join(DATA_DIR, "sprites.js")
    existing_ids = {}
    if os.path.exists(existing_sprites_path):
        with open(existing_sprites_path, "r", encoding="utf-8") as f:
            content = f.read()
        # 匹配: "id": { n: "name", ... }
        entries = re.findall(r'"(\d+)"\s*:\s*\{\s*n:\s*\'([^\']+)\'', content)
        for sid, sname in entries:
            existing_ids[sname] = int(sid)

    # 合并数据: 保留现有ID，新精灵分配新ID
    next_id = max(existing_ids.values()) + 1 if existing_ids else 1
    merged_sprites = {}

    # 构建名称→ID 的映射
    name_to_id = {}
    # 现有精灵保持ID
    for name, sid in existing_ids.items():
        name_to_id[name] = sid
        # 使用爬取到的属性更新数据
        if name in sprites:
            merged_sprites[str(sid)] = sprites[name]
        else:
            # 保留原始数据（从现有文件解析完整数据）
            pass

    # 新精灵分配新ID
    for name, data in sprites.items():
        if name not in name_to_id:
            name_to_id[name] = next_id
            merged_sprites[str(next_id)] = data
            next_id += 1

    # 也保留原有但未被爬取到的精灵
    if existing_ids:
        with open(existing_sprites_path, "r", encoding="utf-8") as f:
            content = f.read()
        old_entries = re.findall(r'"(\d+)"\s*:\s*(\{\s*n:\s*\'[^\']+\',\s*e:\s*\d+,\s*r:\s*\d+,\s*d:\s*\'[^\']*\'\s*\})', content)
        for sid, entry_str in old_entries:
            if sid not in merged_sprites:
                merged_sprites[sid] = entry_str

    # 保存原始爬取数据
    raw_path = os.path.join(OUTPUT_DIR, "_all_sprites_data.json")
    with open(raw_path, "w", encoding="utf-8") as f:
        json.dump({"sprites": sprites, "eggs": eggs}, f, ensure_ascii=False, indent=2)
    print(f"  原始数据: {raw_path}")

    # 保存名称→ID 映射
    mapping = {name: name_to_id.get(name, 0) for name in sorted(name_to_id.keys())}
    map_path = os.path.join(OUTPUT_DIR, "_name_to_id_map.json")
    with open(map_path, "w", encoding="utf-8") as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    print(f"  名称映射: {map_path}")

    # 打印统计
    elem_count = {}
    for name, sid in name_to_id.items():
        sid_str = str(sid)
        if sid_str in merged_sprites:
            d = merged_sprites[sid_str]
            if isinstance(d, dict):
                e = d.get("e", 0)
            else:
                e_match = re.search(r'e:\s*(\d+)', str(d))
                e = int(e_match.group(1)) if e_match else 0
            elem_name = ELEMENT_ORDER[e] if e < len(ELEMENT_ORDER) else "未知"
            elem_count[elem_name] = elem_count.get(elem_name, 0) + 1

    print(f"\n  总精灵数: {len(name_to_id)}")
    print(f"  属性分布:")
    for elem, count in sorted(elem_count.items(), key=lambda x: -x[1]):
        print(f"    {elem}: {count}")

    return merged_sprites, name_to_id, eggs


def main():
    print("=" * 60)
    print("洛克王国世界 - 精灵数据爬取")
    print("=" * 60)

    # Step 1: 获取精灵列表
    all_pages = get_all_sprite_pages()
    base_pages = filter_base_sprites(all_pages)

    # Step 2: 批量获取 wikitext
    results = batch_fetch_wikitext(base_pages)

    # 解析精灵信息
    parsed = []
    for item in results:
        info = parse_sprite_info(item)
        if info.get("精灵名称") or info.get("主属性"):
            parsed.append(info)

    print(f"  解析成功: {len(parsed)} 个精灵")

    # 打印几个样例
    print("\n样例数据:")
    for s in parsed[:10]:
        name = s.get("精灵名称", s.get("wiki_name", "?"))
        elem = s.get("主属性", "?")
        desc = s.get("精灵描述", "")[:50]
        print(f"  {name}: 属性={elem}, 阶段={s.get('精灵阶段','?')}, 描述={desc}...")

    # Step 3: 构建数据
    sprites = build_sprite_data(parsed)
    eggs = build_egg_data(parsed)

    # Step 4: 合并并生成
    merged, name_to_id, egg_list = generate_js_files(sprites, eggs)

    # Step 5: 生成新的 sprites.js
    print("\n[4] 写入更新后的数据文件...")

    # 生成 sprites.js
    lines = ['// 洛克王国世界 - 精灵数据', '// 自动生成于 ' + time.strftime('%Y-%m-%d %H:%M')]
    lines.append('// 元素: ' + ', '.join(f'{i}={ELEMENT_ORDER[i]}' for i in range(len(ELEMENT_ORDER))))
    lines.append('')
    lines.append('const SPRITES = {')

    for sid in sorted(merged.keys(), key=int):
        entry = merged[sid]
        if isinstance(entry, str):
            lines.append(f'  "{sid}": {entry},')
        elif isinstance(entry, dict):
            n = entry.get("n", "")
            e = entry.get("e", 0)
            r = entry.get("r", 1)
            d = entry.get("d", "")
            d_escaped = d.replace("'", "\\'").replace("\n", "")
            lines.append(f'  "{sid}": {{ n: \'{n}\', e: {e}, r: {r}, d: \'{d_escaped}\' }},')

    lines.append('};')
    lines.append('')
    lines.append('module.exports = SPRITES;')
    lines.append('')

    sprites_path = os.path.join(DATA_DIR, "sprites.js")
    with open(sprites_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"  已写入: {sprites_path}")

    # 生成 egg-data.js
    egg_lines = ['// 洛克王国世界 - 蛋参数数据', '// 自动生成于 ' + time.strftime('%Y-%m-%d %H:%M')]
    egg_lines.append('')
    egg_lines.append('const EGG_DATA = [')

    for i, egg in enumerate(egg_list):
        name = egg["name"]
        sz = egg["size"]
        wt = egg["weight"]
        egg_lines.append(f'  {{ spriteId: {i+1}, name: \'{name}\', ')
        egg_lines.append(f'    size: {{ min: {sz["min"]}, max: {sz["max"]} }}, ')
        egg_lines.append(f'    weight: {{ min: {wt["min"]}, max: {wt["max"]} }} }},')

    egg_lines.append('];')
    egg_lines.append('')
    egg_lines.append('module.exports = { eggs: EGG_DATA };')
    egg_lines.append('')

    egg_path = os.path.join(DATA_DIR, "egg-data.js")
    with open(egg_path, "w", encoding="utf-8") as f:
        f.write("\n".join(egg_lines))
    print(f"  已写入: {egg_path}")

    print("\n完成!")


if __name__ == "__main__":
    main()
