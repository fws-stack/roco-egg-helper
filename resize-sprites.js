/**
 * 批量压缩精灵立绘图片到小程序可用尺寸
 *
 * 用法: node resize-sprites.js
 *
 * 将 miniprogram/images/sprites/*.png 压缩到 200px 宽
 * 同时生成缩略图版本供列表使用
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SPRITES_DIR = path.join(__dirname, 'miniprogram', 'images', 'sprites');
const THUMB_DIR = path.join(__dirname, 'miniprogram', 'images', 'sprites-thumb');

// 确保输出目录存在
if (!fs.existsSync(THUMB_DIR)) {
  fs.mkdirSync(THUMB_DIR, { recursive: true });
}

const files = fs.readdirSync(SPRITES_DIR).filter(f => /^\d+\.png$/.test(f));
const total = files.length;

console.log(`共 ${total} 个图片文件\n`);

let done = 0;
let savedTotal = 0;
let origTotal = 0;

async function processFile(file) {
  const srcPath = path.join(SPRITES_DIR, file);
  const origSize = fs.statSync(srcPath).size;
  origTotal += origSize;

  try {
    // 原图缩到 200px 宽
    await sharp(srcPath)
      .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(srcPath + '.tmp');

    const newSize = fs.statSync(srcPath + '.tmp').size;

    // 缩略图 80px 宽（列表用）
    await sharp(srcPath)
      .resize(80, 80, { fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(THUMB_DIR, file));

    // 替换原文件
    fs.unlinkSync(srcPath);
    fs.renameSync(srcPath + '.tmp', srcPath);

    const pct = ((1 - newSize / origSize) * 100).toFixed(0);
    process.stdout.write(`  ${file} → ${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${pct}%)\n`);
    savedTotal += (origSize - newSize);
  } catch (err) {
    process.stdout.write(`  ${file} → ⚠️ ${err.message}\n`);
  }

  done++;
}

async function main() {
  for (const file of files) {
    await processFile(file);
  }

  const origMB = (origTotal / 1024 / 1024).toFixed(1);
  const savedMB = (savedTotal / 1024 / 1024).toFixed(1);
  console.log(`\n===== 完成 =====`);
  console.log(`原大小: ${origMB}MB → 节省: ${savedMB}MB`);
  console.log(`缩略图: ${THUMB_DIR}`);
}

main().catch(console.error);
