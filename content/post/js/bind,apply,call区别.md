---
title: "Bind,apply,call区别"
date: 2022-06-13T11:41:34+08:00
tags: ["js"]
draft: false
author: "huing"
---

### bind, apply, call 区别

```js
const me = { a: 123 };
const he = { b: 456 };
function x() {
  console.log(this, arguments, this.a);
}
```

bind，返回函数的 copy
**使用时要重新调用一次**
参数形式， (this, arg1, arg2)

```js
x.bind(me, 2, 3).bind(he)(); // bind只生效一次！
// {a: 123} {'0': 2,'1': 3} 123
```

apply，返回函数的调用的结果
参数形式， (this, [arg1, arg2])

```js
x.apply(me, [2, 3]);
// {a: 123} {'0': 2,'1': 3} 123
```

call，返回函数的调用的结果
参数形式， (this, arg1, arg2)

```js
x.call(me, 2, 3);
// {a: 123} {'0': 2,'1': 3} 123
```
