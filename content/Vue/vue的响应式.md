---
title: "Vue的响应式"
date: 2025-03-28T07:56:34+08:00
draft: false
---

## vue2 defineProperty

```js
// 示例代码：简化版的defineProperty实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取${key}: ${val}`);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`设置${key}为: ${newVal}`);
        val = newVal;
        // 触发更新...
      }
    },
  });
}
```

## vue3 proxy (3.3)

```js
// Proxy示例
const reactive = (target) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    },
  });
};
```
