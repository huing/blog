---
title: "EventBus"
date: 2025-03-19T09:34:28+08:00
draft: false
---

## 实现一个 EventBus 发布/订阅设计模式

EventBus 是 一个事件总线，它允许多个组件之间进行通信。
在 javascript 中，我们可以使用一个类来表示 EventBus。

```js
class EventBus {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  off(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }
    if (callback) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    } else {
      delete this.events[eventName];
    }
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((callback) => {
      callback(...args);
    });
  }
  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}
```
