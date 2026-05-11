/**
 * 生成精灵 Wiki 原图 URL 映射（用于预览大图）
 * 从 Bilibili Wiki API 批量查询，约需 12 分钟
 *
 * 用法: node generate-img-urls.js
 * 输出: miniprogram/data/sprite-img-urls.json
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sprites = require('./miniprogram/data/sprites.js');
const IMG_IDS = require('./miniprogram/data/sprites-img-ids.js');
const OUTPUT = path.join(__dirname, 'miniprogram', 'data', 'sprite-img-urls.json');

const DELAY_MS = 2000;

function curl(url) {
  try {
    return execSync(
      `curl -sL --max-time 15 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" -H "Accept: application/json" -H "Referer: https://wiki.biligame.com/rocom/" "${url}"`,
      { encoding: 'utf-8', maxBuffer: 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }
    );
  } catch {
    return '';
  }
}

function getImageUrl(spriteName) {
  const file = 'File:页面_宠物_立绘_' + spriteName + '_1.png';
  const apiUrl = 'https://wiki.biligame.com/rocom/api.php?action=query&titles=' +
    encodeURIComponent(file) + '&prop=imageinfo&iiprop=url&format=json';
  const text = curl(apiUrl);
  if (!text) return null;
  try {
    const json = JSON.parse(text);
    for (const page of Object.values(json.query.pages)) {
      if (page.imageinfo && page.imageinfo[0]) return page.imageinfo[0].url;
    }
  } catch {}
  return null;
}

const entries = Object.entries(sprites).filter(([id]) => IMG_IDS.has(Number(id)));
const total = entries.length;
console.log(`共 ${total} 个精灵有本地图片，开始获取原图 URL...\n`);

const urls = {};
let done = 0;

function next(i) {
  if (i >= entries.length) {
    fs.writeFileSync(OUTPUT, JSON.stringify(urls, null, 2));
    const count = Object.keys(urls).length;
    console.log(`\n完成: ${count}/${total} 个 URL → ${OUTPUT}`);
    return;
  }

  const [id, data] = entries[i];
  process.stdout.write(`[${i + 1}/${total}] #${id} ${data.n} ... `);
  const url = getImageUrl(data.n);
  if (url) {
    urls[id] = url;
    process.stdout.write('✅\n');
  } else {
    process.stdout.write('❌\n');
  }
  done++;

  setTimeout(() => next(i + 1), DELAY_MS);
}

next(0);
