---
title: "Map类型"
date: 2022-06-16T23:20:39+08:00
draft: false
categories: ["js"]
---

### Map

```js
// ✅ Initialize Map from Array
// 👇️ const map1: Map<string, string>
const map1: Map<string, string> = new Map([
  ['name', 'Tom'],
  ['country', 'Chile'],
]);

// 👇️ {'name' => 'Tom', 'country' => 'Chile'}
console.log(map1);

// ✅ Initialize Map from Object
const obj = { name: 'Tom', country: 'Chile' };
const map2 = new Map<string, string>(Object.entries(obj));

// 👇️ {'name' => 'Tom', 'country' => 'Chile'}
console.log(map2);
```

### objects vs maps

- 意外的键

  - map: 显式插入的
  - object: 原型链上的键名

- 键的类型
  - map: 任意值，包括函数、对象或任意基本类型
  - object: 必须是一个 String 或是 Symbol
