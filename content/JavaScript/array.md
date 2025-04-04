---
title: "Array"
date: 2022-09-01T20:21:47+08:00
draft: false
tags: ["JavaScript"]
---

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 方法

#### 修改器方法 改变自身的值

- push() 将一个或多个元素添加到数组的末尾，并`返回该数组的新长度`
- pop() 从一个数组中删除并`返回删除的元素值`
- reverse() 颠倒数组中的元素，并返回该数组的引用，同时改变原数组

```javascript
const sourceArray = ["one", "two", "three"];
const reverseArray = sourceArray.reverse();
sourceArray === reverseArray; // true
```

- shift() 删除数组第一个元素，并返回删除的元素值
- sort()
- splice()  删除或新增元素，返回修改后的数组，改变原数组
- unshift() 添加元素到数组的头部 返回 length 属性值

#### 访问方法 返回新数组

- concat() 将数组和/或值连接成新数组，对于对象引用的值修改会修改原数组

```javascript
const arr = ["a", "b", "c"];
const al = arr.concat(1, [2, 3]);
console.log(al); // ['a', 'b', 'c', 1, 2, 3]
```

- includes()
- join()
- slice() [begin, end) 对于对象引用的值修改会修改原数组
- toString()

```js
{}.toString() // 报错 没有原型链了吧
[].toString() // ""
```

- toLocaleString()
- indexOf()
- lastIndexOf()

#### 迭代方法

- forEach()不会改变原数组。除了抛出异常以外，没有办法中止或跳出  forEach()  循环。
- entries()
- every()
- some()
- filter() 返回一个新数组
- find()
- findIndex()
- keys()
- map() 返回一个新数组

```javascript
["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(parseInt);
// [1, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 9]
```

- reduce()
- reduceRight()
- values()

### 属性

- Array.prototype.constructor
- Array.prototype.length

### 生成数组方法

- Array.from()

```javascript
Array.from("foo"); // ["f", "o", "o"];
Array.from([1, 2, 3], (x) => x + x); // [2, 4, 6];
```

- Array.of()

```javascript
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

- Array.apply

```javascript
const arr = Array.apply(null, new Array(4));
arr.map((elem, index) => index); // [0, 1, 2, 3]
```

### 判断变量是否为数组

```js
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```
