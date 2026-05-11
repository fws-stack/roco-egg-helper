/**
 * 扫描 miniprogram/images/sprites/ 目录，生成图片可用性列表
 *
 * 用法: node generate-sprites-list.js
 * 输出: miniprogram/data/sprites-img-ids.js
 */
const fs = require('fs');
const path = require('path');

const SPRITES_DIR = path.join(__dirname, 'miniprogram', 'subpackages', 'sprites', 'images');
const OUTPUT = path.join(__dirname, 'miniprogram', 'data', 'sprites-img-ids.js');

const files = fs.readdirSync(SPRITES_DIR).filter(f => /^\d+\.png$/.test(f));
const ids = files.map(f => parseInt(f)).sort((a, b) => a - b);

const content =
  '// 自动生成 — 有本地立绘图片的精灵 ID 列表\n' +
  '// 运行 node generate-sprites-list.js 更新\n' +
  'module.exports = new Set(' + JSON.stringify(ids) + ');\n';

fs.writeFileSync(OUTPUT, content);
console.log('已写入 ' + ids.length + ' 个图片ID → miniprogram/data/sprites-img-ids.js');
