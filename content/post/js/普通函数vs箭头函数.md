---
title: "普通函数vs箭头函数"
date: 2022-06-22T22:49:19+08:00
draft: false
tags: ["js"]
author: "huing"
---

### this，arguments 区别

```js
const funA = () => {
  // this 指向 funA 的调用
  // 没有 arguments
  // 不能new
  // 没有原型链
};
function funB(params) {
  // this 指向 函数内部
  // 有 arguments);
}
```
