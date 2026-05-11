/**
 * 从 Bilibili Wiki 批量下载精灵立绘图片
 *
 * 用法: node download-sprites.js
 *
 * 数据来源: wiki.biligame.com/rocom (洛克王国世界手游 Wiki)
 * 下载到: miniprogram/images/sprites/{精灵ID}.png
 *
 * 347 只精灵约需 12 分钟 (每次请求间隔 2 秒)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sprites = require('./miniprogram/data/sprites.js');
const entries = Object.entries(sprites);

const OUT_DIR = path.join(__dirname, 'miniprogram', 'subpackages', 'sprites', 'images');
const DELAY_MS = 2000;

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

let downloaded = 0;
let missing = 0;
let skipped = 0;
const total = entries.length;

console.log(`共 ${total} 只精灵\n`);

function curl(url) {
  try {
    return execSync(
      `curl -sL --max-time 15 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" -H "Accept: application/json" -H "Referer: https://wiki.biligame.com/rocom/" "${url}"`,
      { encoding: 'buffer', maxBuffer: 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }
    );
  } catch {
    return Buffer.alloc(0);
  }
}

function curlImage(url) {
  try {
    return execSync(
      `curl -sL --max-time 20 -H "User-Agent: Mozilla/5.0" -H "Referer: https://wiki.biligame.com/rocom/" "${url}"`,
      { encoding: 'buffer', maxBuffer: 2 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }
    );
  } catch {
    return Buffer.alloc(0);
  }
}

function getImageUrlSync(spriteName) {
  const file = 'File:页面_宠物_立绘_' + spriteName + '_1.png';
  const apiUrl = 'https://wiki.biligame.com/rocom/api.php?action=query&titles=' +
    encodeURIComponent(file) + '&prop=imageinfo&iiprop=url&format=json';

  const buf = curl(apiUrl);
  if (buf.length === 0) return null;

  try {
    const json = JSON.parse(buf.toString());
    for (const page of Object.values(json.query.pages)) {
      if (page.imageinfo && page.imageinfo[0]) {
        return page.imageinfo[0].url;
      }
    }
  } catch {}
  return null;
}

function downloadSprite(id, name) {
  const outPath = path.join(OUT_DIR, id + '.png');

  if (fs.existsSync(outPath)) {
    process.stdout.write(`  #${id} ${name} → 已存在，跳过\n`);
    skipped++;
    return;
  }

  const imageUrl = getImageUrlSync(name);

  if (!imageUrl) {
    process.stdout.write(`  #${id} ${name} → ❌ Wiki 未收录\n`);
    missing++;
    return;
  }

  const data = curlImage(imageUrl);

  if (data.length > 100 && data[0] === 0x89 && data[1] === 0x50) {
    fs.writeFileSync(outPath, data);
    process.stdout.write(`  #${id} ${name} → ✅ ${(data.length / 1024).toFixed(0)}KB\n`);
    downloaded++;
  } else {
    process.stdout.write(`  #${id} ${name} → ⚠️ 下载失败(${data.length}B)\n`);
    missing++;
  }
}

// 主流程 - 串行执行
let i = 0;
function next() {
  if (i >= entries.length) {
    console.log(`\n===== 完成 =====`);
    console.log(`总计: ${total} | ✅已下载: ${downloaded} | ❌未收录: ${missing} | ⏭跳过: ${skipped}`);
    return;
  }

  const [id, data] = entries[i];
  process.stdout.write(`[${i + 1}/${total}] `);
  downloadSprite(id, data.n);
  i++;

  if (i < entries.length) {
    setTimeout(next, DELAY_MS);
  } else {
    next();
  }
}

console.log('开始下载...\n');
next();
