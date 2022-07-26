---
title: "Map类型"
date: 2022-06-16T23:20:39+08:00
lastmod: 2022-06-16T23:20:39+08:00
draft: false
keywords: []
description: ""
tags: ["javascript", "js"]
categories: []
author: "huing"
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

|          |                  Map                   |                          Object |
| -------- | :------------------------------------: | ------------------------------: |
| 意外的键 |             显式插入的键。             |                  原型链上的键名 |
| 键的类型 | 任意值，包括函数、对象或任意基本类型。 | 必须是一个 String 或是 Symbol。 |
