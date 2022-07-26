---
title: "普通函数vs箭头函数"
date: 2022-06-22T22:49:19+08:00
lastmod: 2022-06-22T22:49:19+08:00
draft: false
keywords: []
description: ""
tags: ["typescript", "ts", "react", "css", "javascript", "js"]
categories: []
author: "huing"
---

### this，arguments 区别

```js
const funA = () => {
  // this 指向 funA 的调用
  // 没有 arguments
};
function funB(params) {
  // this 指向 函数内部
  // 有 arguments
  console.log(arguments);
}
```
