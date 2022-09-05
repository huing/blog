---
title: "Css值与单位"
date: 2022-08-31T23:12:58+08:00
draft: false
categories: ["css"]
author: "huing"
---

1. 绝对长度单位 `与任何东西都没有关系`

- cm
- mm
- pt: 点
- px: 像素

2. 相对长度单位

- em: 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width
- rem: 根元素的字体大小
  - 设置 html 字体的大小为百分比
  - 用 js 动态设置 html 字体大小
  - 浏览器默认字体大小 16px,最小 12px,css3 并未提及
