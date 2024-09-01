---
title: "Clone正则"
date: 2022-06-27T19:35:49+08:00
draft: false
categories: ["js"]
---

### 基本语法

`\w` 匹配一个单字字符 = [A-Za-z0-9_]

`?` 匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}

如果紧跟在任何量词 \*、 +、? 或 {} 的后面，将会使量词变为非贪婪（匹配尽量少的字符）

eg: `/\d+/.exec('abc123')` 匹配 123

eg: `/\d+?/.exec('abc123')` 匹配 1

`+` 匹配前面一个表达式 1 次或者多次。等价于 {1,}

`*` 匹配前一个表达式 0 次或多次。等价于 {0,}

[^abc] = [^a-c] 反向字符集

(?:x) 把 x 作为一个整体

$ 匹配输入的结束。如果多行标志被设置为 true，那么也匹配换行符前的位置。
例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。

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

### 人名

```js
let pattern = /\s*;\s*/;
const names =
  "Orange Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ";
const nameList = names.split(pattern);
console.log("nameList", nameList);
pattern = /(\w+)\s+(\w+)\s*/;
const bySurnameList = [];
for (let i = 0, len = nameList.length; i < len; i++) {
  console.log(i, pattern.exec(nameList[i]));
  bySurnameList[i] = nameList[i].replace(pattern, "$2, $1");
}
console.log("bySurnameList", bySurnameList);
```

### 字符串模板

```js
function render(template, context) {
  // (.*?) 匹配字符最少次数
  return template.replace(
    /\{\{(.*?)\}\}/g,
    (match, key) => context[key.trim()]
  );
}

const template = "{{name}}很厉害,才{{age}}岁";
const context = { name: "bottle", age: "15" };

render(template, context);

function generateMessage(template, data) {
  return template.replace(/\${(.*?)\}/g, (match, key) => data[key.trim()]);
}

const template1 =
  "亲爱的${username}，中秋大促~，送你一张${coupon}优惠券，你感兴趣的${sku1} 和${sku2} 都能用！";
const data = {
  username: "桔子",
  coupon: "5元",
  sku1: "冰激凌",
  sku2: "蛋糕",
};

generateMessage(template1, data);
```
