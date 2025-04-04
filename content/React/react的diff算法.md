---
title: "React的diff算法"
date: 2025-03-28T07:57:28+08:00
draft: false
tags: ["React"]
---

## 什么是虚拟 dom

Virtual DOM 则是一种由 Javascript 类库基于浏览器 API 实现的概念

虚拟 dom 就是用 js 对象来描述 dom 结构。

## diff 算法 仅右移

```js
const oldVdom = {
  type: 'div',
  props: {
    children: []
  }
  children: [
    {
      type: 'p',
      props: {}
      children: []
    },
    {
      type: 'p',
      props: {}
    }
  ]
}
const newVdom = {
  type: 'div',
  props: {}
  children: [
    {
      type: 'p',
      props: {}
    },
    {
      type: 'p',
      props: {}
    }
  ]
}
function diff(oldVdom, newVdom) {
  if (oldVdom.type === newVdom.type) {
    for (let i = 0; i < oldVdom.children.length; i++) {
      diff(oldVdom.children[i], newVdom.children[i])
      if (oldVdom.children[i] !== newVdom.children[i]) {
        oldVdom.children[i] = newVdom.children[i]
      }
    }
  }
}
```
