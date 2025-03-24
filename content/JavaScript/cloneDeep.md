---
title: "CloneDeep"
date: 2025-03-23T11:53:04+08:00
draft: false
---

```js
const cloneDeep = (obj) => {
  // 处理基本类型和 null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 处理正则表达式
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item));
  }

  // 处理 Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    obj.forEach((value, key) => {
      clonedMap.set(cloneDeep(key), cloneDeep(value));
    });
    return clonedMap;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    obj.forEach((value) => {
      clonedSet.add(cloneDeep(value));
    });
    return clonedSet;
  }

  // 处理循环引用
  const weakMap = new WeakMap();

  function deepClone(obj) {
    if (weakMap.has(obj)) {
      return weakMap.get(obj);
    }

    const cloned = Object.create(Object.getPrototypeOf(obj));
    weakMap.set(obj, cloned);

    // 获取所有属性，包括不可枚举的属性
    const descriptors = Object.getOwnPropertyDescriptors(obj);

    // 复制所有属性描述符
    Object.defineProperties(
      cloned,
      Object.fromEntries(
        Object.entries(descriptors).map(([key, descriptor]) => [
          key,
          {
            ...descriptor,
            value:
              descriptor.value && typeof descriptor.value === "object"
                ? cloneDeep(descriptor.value)
                : descriptor.value,
          },
        ])
      )
    );

    return cloned;
  }

  return deepClone(obj);
};

// 使用示例
const example = {
  string: "Hello",
  number: 123,
  boolean: true,
  null: null,
  undefined: undefined,
  date: new Date(),
  regexp: /test/gi,
  array: [1, 2, { a: 3 }],
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  nested: {
    a: 1,
    b: {
      c: 2,
    },
  },
};

// 创建循环引用
example.self = example;

const cloned = cloneDeep(example);
```
