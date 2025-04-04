---
title: "npm命令"
date: 2022-12-29T10:11:31+08:00
draft: false
---

文件读写 fs

路径查找 path

网络 http

## 包管理

## npm

## yarn

## npx

## pnpm

## package.json 配置

### 入口文件字段

- **main**: CommonJS 规范的入口文件

  - Node.js 默认使用的入口点
  - 通常指向 `dist/index.js` 或 `lib/index.js`
  - 使用 `require()` 导入时使用此入口

- **type** 的两个类型

  - **module**: ES Module 规范的入口文件

    - 现代打包工具（webpack、rollup 等）优先使用
    - 通常指向 `.mjs` 或含 ES modules 的 `.js` 文件
    - 使用 `import` 语句导入时使用此入口
    - 支持 tree-shaking

  - **umd**: Universal Module Definition 入口文件
    - 兼容 AMD、CommonJS 和全局变量方式
    - 适用于浏览器直接通过 `<script>` 标签引用
    - 通常指向打包后的单一文件，如 `dist/index.umd.js`

主要区别说明：

- `main` 是最传统的 CommonJS 格式入口，主要用于 Node.js 环境。
- `module` 是现代 ES Module 格式入口，支持静态导入导出，便于打包工具进行 tree-shaking 优化。
- `umd` 是通用格式，主要用于浏览器环境，可以同时支持多种模块系统。

这三种格式的存在使得同一个包可以在不同环境下都能正常使用，开发者可以根据具体使用场景选择最适合的版本。

## npm 命令

login

```js
npm login
```

change version

```js
npm version 1.0.0-beta.0
```

publish

```js
npm publish --tag beta
```

use

```js
npm install — save libraryname@beta.num
```
