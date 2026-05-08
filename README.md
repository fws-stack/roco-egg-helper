# 洛克孵蛋查询

洛克王国世界手游孵蛋辅助查询微信小程序。

## 功能

- **正向查询** — 选择两只父精灵，查看可能孵化的子代
- **反向查询** — 选择目标精灵，反查所有可能的父母组合
- **蛋参数查询** — 输入蛋的长度和重量，判断是什么精灵的蛋

## 技术栈

- 微信小程序原生框架
- 纯静态数据（JSON → JS Module），无后端

## 项目结构

```
miniprogram/
├── app.js / app.json / app.wxss   # 应用入口和全局配置
├── pages/                         # 页面
│   ├── index/                     # 首页
│   ├── forward/                   # 正向查询
│   ├── reverse/                   # 反向查询
│   ├── egg-query/                 # 蛋参数查询
│   └── sprite-detail/             # 精灵详情
├── components/                    # 组件
│   ├── sprite-card/               # 精灵卡片
│   ├── sprite-picker/             # 精灵选择器
│   ├── breeding-result/           # 孵蛋结果
│   ├── egg-result/                # 蛋参数结果
│   └── empty-state/               # 空状态
├── data/                          # 数据文件
│   ├── sprites.js                 # 精灵数据 (472个, 18种属性)
│   ├── breeding.js                # 孵蛋配方
│   └── egg-data.js                # 蛋参数数据 (472条)
├── utils/                         # 工具函数
│   ├── breeding.js                # 孵蛋查询算法
│   ├── egg.js                     # 蛋参数匹配算法
│   ├── sprite.js                  # 精灵数据辅助
│   └── storage.js                 # 本地历史缓存
└── styles/                        # 公共样式
```

## 开发

使用微信开发者工具打开 `miniprogram/` 目录即可预览。
