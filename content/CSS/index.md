---
title: "基本语法"
date: 2024-09-03T06:55:26+08:00
draft: false
---

### line-height 如何继承

line-height 具体值 30px 子元素继承该值

line-height 比例 1.5 子元素继承该比例

line-height 百分比 200% 子元素继承 父元素 font-size \* 200% 的值

### css 值与单位

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

2. 字重

   100 - Thin
   200 - Extra Light (Ultra Light)
   300 - Light
   400 - Normal
   500 - Medium
   600 - Semi Bold (Demi Bold)
   700 - Bold
   800 - Extra Bold (Ultra Bold)
   900 - Black (Heavy)
