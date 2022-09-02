---
title: "Array"
date: 2022-09-01T20:21:47+08:00
draft: false
tags: ["js"]
author: "huing"
---

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 方法

#### 修改器方法 改变自身的值

- push()

```javascript
const sports = ["soccer", "baseball"];
const total = sports.push("football", "swimming");
console.log(sports); // ["soccer", "baseball", "football", "swimming"]
console.log(total); // 4
```

- pop() 从一个数组中删除并返回最后一个元素

```javascript
["a"].pop(); // 'a'
```

- reverse() 颠倒数组中元素的位置，并返回该数组的引用

```javascript
const sourceArray = ["one", "two", "three"];
const reverseArray = sourceArray.reverse();
sourceArray === reverseArray; // true
```

- shift() 删除数组最前面（头部）的元素

```javascript
const arr = ["angel", "clown", "mandarin", "surgeon"];
console.log(arr.shift()); // 'angel'
const arr = [];
console.log(arr.shift()); // undefined
```

- sort()
- splice()  返回的是数组

```javascript
const arr = ["angel", "clown", "mandarin", "sturgeon"];
console.log(arr.splice(2, 0, "drum", "guitar")); // []
console.log(arr.splice(2, 1, "drum", "guitar")); // ['drum']
console.log(arr); // ['angel', 'clown', 'drum', 'guitar', 'guitar', 'mandarin', 'sturgeon']
```

- unshift() 添加元素到数组的头部 返回 length 属性值

```javascript
const arr = [4, 5, 6];
arr.unshift(1, 2, 3); // 6
console.log(arr); // [1, 2, 3, 4, 5, 6]
const arr2 = [4, 5, 6];
arr2.unshift(1);
arr2.unshift(2);
console.log(arr2); // [2, 1, 4, 5, 6]
```

#### 访问方法 返回新数组

- concat() 将数组和/或值连接成新数组

```javascript
const arr = ["a", "b", "c"];
const al = arr.concat(1, [2, 3]);
console.log(al); // ['a', 'b', 'c', 1, 2, 3]
```

- includes()
- join()
- slice()

```javascript
slice(begin, end); // [begin, end)
const animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice(2)); // ['camel', 'duck', 'elephant']
console.log(animals.slice(1, 4)); // ['bison', 'camel', 'duck']
```

- toString()
- toLocaleString()
- indexOf()
- lastIndexOf()

#### 迭代方法

- forEach()不会改变原数组。除了抛出异常以外，没有办法中止或跳出  forEach()  循环。
- entries()
- every()
- some()
- filter() 返回一个新数组

```javascript
const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];
const result = words.filter((word) => word.length > 6);
console.log(result); // ['exuberant', 'destruction', 'present']
```

- find()
- findIndex()
- keys()
- map() 返回一个新数组

```javascript
["1", "2.1", "3"]
  .map((str) => parseInt(str, 10)) // [1, 2, 3]
  [("1", "2.1", "3")].map(Number); // [1, 2.1, 3]
```

- reduce()

```javascript
const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
const res = arr
  .map((el) => el.x)
  .reduce((acc, cur) => Math.max(acc, cur), -Infinity);
console.log(res); // 3

function Fun(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
  );
}
function Fun2() {
  const numArr = [];
  for (let i = 0; i < 10; i += 1) {
    numArr.push(Fun(10, 100));
  }
  return numArr;
}
for (let i = 0; i < 10; i += 1) {
  const res = Fun2()
    .sort()
    .reduce((acc, cur) => {
      if (!acc.length || acc[acc.length - 1] !== cur) {
        // !acc.includes(cur)
        acc.push(cur);
      }
      return acc;
    }, [])
    .reduce((acc, cur) => acc + cur, 0);
  console.log(res);
}
```

- reduceRight()
- values()

### 属性

- Array.prototype.constructor
- Array.prototype.length

### 方法

- Array.from()

```javascript
Array.from("foo"); // ["f", "o", "o"];
Array.from([1, 2, 3], (x) => x + x); // [2, 4, 6];
```

- Array.isArray()

```javascript
Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
```

- Array.of()

```javascript
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

```javascript
const arr = Array.apply(null, new Array(4));
arr.map((elem, index) => index); // [0, 1, 2, 3]
```
