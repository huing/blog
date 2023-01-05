---
title: "const常量断言用法"
date: 2022-06-14T10:35:51+08:00
draft: false
categories: ["ts"]
author: "huing"
---

索引访问类型 Indexed Access Types

常量断言 const assertions

### 数组转 type

```js
const animals = ['cat', 'dog', 'mouse'] as const
// const animals: readonly ['cat', 'dog', 'mouse']

type Animal = typeof animals[number]
// type Animal = 'cat' | 'dog' | 'mouse'
```

### 数组对象转 type

```js
const animals = [
  { species: 'cat', name: 'Fluffy' },
  { species: 'dog', name: 'Fido' },
  { species: 'mouse', name: 'Trevor' }
] as const

type Animal = (typeof animals)[number]["species"];
// type Animal = "cat" | "dog" | "mouse"
```

### 对象转 type

取 key

```js
const animals = {1: 'cat', 2: 'dog', 3: 'mouse' } as const
type animal = keyof typeof animals
```

取 value

```js
const animals = {1: {name: 'cat'}, 2: {name: 'dog'}, 3: {name: 'mouse'} } as const
type key = keyof typeof animals
type value = typeof animals[key]['name']
```
