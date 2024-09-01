---
title: "Proxy"
date: 2022-09-01T00:00:37+08:00
draft: false
categories: ["js"]
---

接口代理

对象代理

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

转发代理

```js
let target = {};
let p = new Proxy(target, {});

p.a = 37; // 操作转发到目标

console.log(target.a); // 37. 操作已经被正确地转发
```
