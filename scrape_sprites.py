#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
洛克王国世界 - 精灵数据爬虫
从 BWIKI (wiki.biligame.com/rocom) 抓取精灵数据
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

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
}


def api_request(params):
    """发送 API 请求并返回 JSON 数据"""
    url = API_BASE + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        data = resp.read()
        if resp.headers.get("Content-Encoding") == "gzip":
            data = gzip.GzipFile(fileobj=BytesIO(data)).read()
        return json.loads(data.decode("utf-8"))
    except Exception as e:
        print(f"  [!] 请求失败: {e}")
        return None


def get_all_sprite_pages():
    """获取所有精灵页面列表"""
    print("[1/5] 获取所有精灵页面列表...")
    all_pages = []
    params = {
        "action": "query",
        "list": "categorymembers",
        "cmtitle": "Category:精灵",
        "format": "json",
        "cmlimit": 500,
    }

    while True:
        data = api_request(params)
        if not data:
            break

        members = data.get("query", {}).get("categorymembers", [])
        for m in members:
            # 过滤掉模板页面 (ns=10)
            if m.get("ns") == 0:
                all_pages.append(m["title"])

        if "continue" in data:
            params["cmcontinue"] = data["continue"]["cmcontinue"]
        else:
            break
        time.sleep(0.3)

    print(f"  获取到 {len(all_pages)} 个精灵页面")
    return all_pages


def parse_sprite_info(text, page_title):
    """从页面 wikitext 中解析精灵信息模板"""
    info = {"name": page_title}

    # 匹配精灵信息模板
    # 格式: {{精灵信息|属性=草|...}}
    template_match = re.search(r'\{\{精灵信息([^}]+)\}\}', text, re.DOTALL)
    if not template_match:
        # 尝试其他模板名
        template_match = re.search(r'\{\{(?:宠物信息|精灵信息)([^}]+)\}\}', text, re.DOTALL)

    if template_match:
        template_text = template_match.group(0)

        # 提取字段
        fields = {
            "编号": r'\|\s*编号\s*=\s*([^\n|]+)',
            "属性": r'\|\s*属性\s*=\s*([^\n|]+)',
            "属性2": r'\|\s*属性2\s*=\s*([^\n|]+)',
            "种族值": r'\|\s*种族值\s*=\s*([^\n|]+)',
            "生命": r'\|\s*生命\s*=\s*([^\n|]+)',
            "速度": r'\|\s*速度\s*=\s*([^\n|]+)',
            "物攻": r'\|\s*物攻\s*=\s*([^\n|]+)',
            "魔攻": r'\|\s*魔攻\s*=\s*([^\n|]+)',
            "物防": r'\|\s*物防\s*=\s*([^\n|]+)',
            "魔防": r'\|\s*魔防\s*=\s*([^\n|]+)',
            "特性": r'\|\s*特性\s*=\s*([^\n|]+)',
            "进化": r'\|\s*进化\s*=\s*([^\n|]+)',
            "获取": r'\|\s*获取\s*=\s*([^\n|]+)',
            "蛋组": r'\|\s*蛋组\s*=\s*([^\n|]+)',
        }

        for key, pattern in fields.items():
            match = re.search(pattern, template_text)
            if match:
                info[key] = match.group(1).strip()

    # 尝试解析描述 (第一段文本)
    desc_match = re.search(r"'''(.*?)'''", text)
    if desc_match:
        info["描述"] = desc_match.group(1).strip()

    return info


def fetch_sprite_pages(page_titles, batch_size=10):
    """批量获取精灵页面内容"""
    print(f"[2/5] 获取 {len(page_titles)} 个精灵页面内容...")
    all_sprites = []

    for i in range(0, len(page_titles), batch_size):
        batch = page_titles[i : i + batch_size]
        titles = "|".join(batch)

        params = {
            "action": "query",
            "prop": "revisions",
            "rvprop": "content",
            "rvslots": "main",
            "titles": titles,
            "format": "json",
            "redirects": 1,
        }

        data = api_request(params)
        if not data:
            continue

        pages = data.get("query", {}).get("pages", {})
        for page_id, page_data in pages.items():
            if page_id.startswith("-"):
                continue

            title = page_data.get("title", "")
            revisions = page_data.get("revisions", [])
            if revisions:
                content = revisions[0].get("slots", {}).get("main", {}).get("*", "")
                sprite_info = parse_sprite_info(content, title)
                sprite_info["pageid"] = int(page_id)
                all_sprites.append(sprite_info)

        progress = min(i + batch_size, len(page_titles))
        print(f"  进度: {progress}/{len(page_titles)}")
        time.sleep(0.5)

    return all_sprites


def get_sprite_images(page_titles):
    """获取精灵页面对应的图片 URL"""
    print(f"[3/5] 获取精灵图片URL...")
    images = {}

    for i in range(0, len(page_titles), 10):
        batch = page_titles[i : i + 10]
        titles = "|".join(batch)

        params = {
            "action": "query",
            "prop": "pageimages",
            "piprop": "original",
            "titles": titles,
            "format": "json",
        }

        data = api_request(params)
        if not data:
            continue

        pages = data.get("query", {}).get("pages", {})
        for page_id, page_data in pages.items():
            if page_id.startswith("-"):
                continue
            title = page_data.get("title", "")
            original = page_data.get("original", {})
            if original:
                images[title] = original.get("source", "")

        time.sleep(0.3)

    print(f"  获取到 {len(images)} 张图片 URL")
    return images


def download_images(images, output_dir):
    """下载精灵图片"""
    print(f"[4/5] 下载 {len(images)} 张精灵图片...")
    img_dir = os.path.join(output_dir, "miniprogram", "images", "sprites")
    os.makedirs(img_dir, exist_ok=True)

    downloaded = 0
    for title, url in images.items():
        if not url:
            continue
        try:
            # 用页面标题作为文件名 (后续会映射)
            safe_name = title.replace("/", "_").replace("\\", "_")
            img_path = os.path.join(img_dir, f"wiki_{safe_name}.png")
            if os.path.exists(img_path):
                continue

            req = urllib.request.Request(url, headers=HEADERS)
            resp = urllib.request.urlopen(req, timeout=30)
            with open(img_path, "wb") as f:
                f.write(resp.read())
            downloaded += 1
            if downloaded % 10 == 0:
                print(f"  已下载: {downloaded}")
        except Exception as e:
            pass
        time.sleep(0.2)

    print(f"  成功下载 {downloaded} 张图片")
    return downloaded


def merge_with_existing_data(all_sprites, existing_csv_path):
    """将新爬取的数据与现有 CSV/JS 数据合并"""
    print("[5/5] 合并数据...")

    # 读取现有精灵列表
    existing_names = set()
    try:
        import csv

        with open(existing_csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            next(reader)  # 跳过标题
            for row in reader:
                if len(row) >= 4:
                    existing_names.add(row[3].strip())
    except Exception:
        pass

    # 也读 JS 数据中的名字
    sprites_js = os.path.join(os.path.dirname(existing_csv_path), "miniprogram", "data", "sprites.js")
    if os.path.exists(sprites_js):
        with open(sprites_js, "r", encoding="utf-8") as f:
            content = f.read()
        js_names = re.findall(r"n:\s*'([^']+)'", content)
        existing_names.update(js_names)

    print(f"  现有精灵数量: {len(existing_names)}")

    # 匹配爬取数据与现有数据
    matched = []
    unmatched = []
    for sprite in all_sprites:
        name = sprite.get("name", "")
        # 去掉括号中的形态描述
        base_name = re.sub(r'[（(][^)）]*[)）]', '', name).strip()
        if base_name in existing_names:
            matched.append(sprite)
        else:
            unmatched.append(sprite)

    print(f"  匹配成功: {len(matched)}, 未匹配: {len(unmatched)}")

    return matched, unmatched


def main():
    print("=" * 60)
    print("洛克王国世界 - 精灵数据爬虫")
    print("=" * 60)

    # Step 1: 获取所有精灵页面列表
    all_pages = get_all_sprite_pages()

    # 过滤掉一些明显是形态变体的页面（保留基础形态）
    base_sprites = []
    variant_patterns = [
        r'[（(](?!本来的|平常的)[^)）]*的样子[)）]',  # 各种"xxx的样子"
        r'[（(](?!本来的|平常的)[^)）]*形态[)）]',  # 各种形态
        r'[（(][^)）]*(?:春天|夏天|秋天|冬天|火山|雪山|沙地|草地)[^)）]*[)）]',  # 季节/地形变体
        r'[（(][^)）]*(?:白石|黑子)[^)）]*[)）]',  # 棋子颜色变体
        r'[（(][^)）]*(?:储水期|枯水期|上弦|下弦|磨[^)）]*)[)）]',  # 时期变体
    ]

    for page in all_pages:
        is_variant = False
        for pat in variant_patterns:
            if re.search(pat, page):
                is_variant = True
                break
        if not is_variant:
            base_sprites.append(page)

    print(f"  过滤后基础精灵: {len(base_sprites)}")

    # Step 2: 批量获取精灵页面内容
    sprites_data = fetch_sprite_pages(base_sprites, batch_size=10)

    # Step 3: 获取图片
    images = get_sprite_images(base_sprites)

    # Step 4: 保存原始数据
    raw_path = os.path.join(OUTPUT_DIR, "_wiki_sprites_raw.json")
    with open(raw_path, "w", encoding="utf-8") as f:
        json.dump(sprites_data, f, ensure_ascii=False, indent=2)
    print(f"  原始数据已保存到: {raw_path}")

    img_path = os.path.join(OUTPUT_DIR, "_wiki_images.json")
    with open(img_path, "w", encoding="utf-8") as f:
        json.dump(images, f, ensure_ascii=False, indent=2)
    print(f"  图片URL已保存到: {img_path}")

    # Step 5: 与现有数据合并
    csv_path = os.path.join(OUTPUT_DIR, "洛克王国孵蛋尺寸对照.csv")
    matched, unmatched = merge_with_existing_data(sprites_data, csv_path)

    matched_path = os.path.join(OUTPUT_DIR, "_wiki_matched.json")
    with open(matched_path, "w", encoding="utf-8") as f:
        json.dump(matched, f, ensure_ascii=False, indent=2)

    unmatched_path = os.path.join(OUTPUT_DIR, "_wiki_unmatched.json")
    with open(unmatched_path, "w", encoding="utf-8") as f:
        json.dump(unmatched, f, ensure_ascii=False, indent=2)

    # 打印摘要
    print("\n" + "=" * 60)
    print("爬取完成!")
    print(f"  总共精灵页面: {len(all_pages)}")
    print(f"  基础精灵(去重后): {len(base_sprites)}")
    print(f"  成功获取数据: {len(sprites_data)}")
    print(f"  获取图片URL: {len(images)}")
    print(f"  与现有数据匹配: {len(matched)}")

    # 打印一些样例数据
    print("\n样例数据 (前5个有属性的精灵):")
    count = 0
    for s in sprites_data:
        if s.get("属性"):
            print(f"  {s.get('name','?')}: 属性={s.get('属性','?')}, 特性={s.get('特性','?')}, 蛋组={s.get('蛋组','?')}")
            count += 1
            if count >= 5:
                break

    return sprites_data, images


if __name__ == "__main__":
    main()
