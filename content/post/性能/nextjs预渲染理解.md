---
title: "nextjs预渲染理解"
date: 2022-06-27T19:13:36+08:00
draft: false
tags: ["性能"]
author: "huing"
---

### 静态生成

构建时 （build time） 生成 html

在每个页面请求时重用

可以被 cdn 缓存

### 服务器端渲染

在地址栏输入 url，发送 get 请求，生成 html

页面内容会随着每个请求变化

cdn 无法缓存
