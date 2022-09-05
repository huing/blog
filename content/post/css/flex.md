---
title: "Flex"
date: 2022-06-12T17:32:26+08:00
draft: false
categories: ["css"]
author: "huing"
---

### line-height 如何继承

line-height 具体值 30px 子元素继承该值

line-height 比例 1.5 子元素继承该比例

line-height 百分比 200% 子元素继承 父元素 font-size \* 200% 的值

### flex: 1

- flex: 1 1 0%
- flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
- flex-shrink 定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小,为 0 空间不足不缩小
- flex-basis 定义项目占据的主轴空间 ，默认值为 auto, 即项目本来的大小

### flex:1; width: 0;

### flex-basis: auto

- 有宽就用宽度的值 width: 200px
- 其次为内容的大小，max-content
- flex-basis:0
