---
title: "Clone正则"
date: 2022-06-27T19:35:49+08:00
lastmod: 2022-06-27T19:35:49+08:00
draft: false
keywords: []
description: ""
tags: ["typescript", "ts", "react", "css", "javascript", "js"]
categories: []
author: "huing"
---

### 基本语法

```js
\w 匹配一个单字字符 = [A-Za-z0-9_]
+ 匹配前面一个表达式 1 次或者多次。等价于 {1,}
* 匹配前一个表达式 0 次或多次。等价于 {0,}
$ 匹配输入的结束。如果多行标志被设置为 true，那么也匹配换行符前的位置。
例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。

```

### exec 返回

```js

const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
[ "dbbd", "bb", index: 1, input: "cdbbdbsbz" ]
// 匹配到的字符串和所有被记住的子字符串

```

### 克隆正则

```js
const reFlags = /\w*$/;

function cloneRegExp(regexp) {
  // reFlags.constructor === RegExp
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

cloneRegExp(/xyz/gim);
// => /xyz/gim
```

### 理解

```js

// 匹配0次或多次，所以匹配空字符串
/\w*/.exec('/xyz/gim')
// ['', index: 0, input: '/xyz/gim', groups: undefined]

// 匹配输入的结束，所以不会匹配xyz
/\w*$/.exec('/xyz/gim')
// ['gim', index: 5, input: '/xyz/gim', groups: undefined]

```

### 手机号中间四位显示\*

```js
// $n 代表第n个括号匹配的字符串
"11122223333".replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
```
