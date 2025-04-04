---
title: "Tailwindcss自定义配置教程"
date: 2024-12-05T10:59:00+08:00
draft: false
tags: ["CSS"]
---

```js
@tailwind base;    /* 注入 Tailwind 的基础样式，如默认字体、边距等重置样式 */
@tailwind components;    /* 注入 Tailwind 的组件类，包括预定义的组件样式 */
@tailwind utilities;    /* 注入 Tailwind 的功能类，如 flex、p-4、text-center 等工具类 */
```

这三个指令是 Tailwind CSS 框架的核心部分：

1. @tailwind base

- 重置浏览器的默认样式
- 提供一致的跨浏览器基础样式
- 设置基础排版样式

2. @tailwind components

- 注入组件类
- 包含一些预定义的组件样式
- 允许你使用 @apply 创建自己的可复用组件类

3. @tailwind utilities

- 注入所有的功能类
- 提供像 flex、pt-4、text-center 这样的原子类
- 这些类构成了 Tailwind 最常用的部分

如果项目已存在基础配置 可以不使用 `@tailwind base;` 以免影响页面已有布局

`tailwind.config.cjs` 配置如下

```js
/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  // prefix: 'tw-',
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    spacing: Array.from({ length: 2000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {
      lineHeight: ({ theme }) => theme("spacing"),
      borderRadius: ({ theme }) => theme("spacing"),
      colors: {
        333: "#333333",
        666: "#666666",
        999: "#999999",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "pf-r": (value) => ({
            fontSize: value,
            fontWeight: 400,
          }),
          "pf-m": (value) => ({
            fontSize: value,
            fontWeight: 500,
          }),
          "pf-s": (value) => ({
            fontSize: value,
            fontWeight: 600,
          }),
        },
        { values: theme("spacing") }
      );
    }),
  ],
};
```
