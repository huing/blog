---
title: "Stack"
date: 2025-03-24T14:11:14+08:00
draft: false
tags: ["JavaScript"]
---

### Queue 先进先出

```js
class Queue {
  constructor() {
    this.items = []; // 用于存储队列元素的数组
  }

  // 入队方法 - 在队列尾部添加元素
  enqueue(element) {
    this.items.push(element);
  }

  // 出队方法 - 移除并返回队列头部的元素
  dequeue() {
    if (this.isEmpty()) {
      return "队列为空";
    }
    return this.items.shift();
  }

  // 查看队列头部的元素
  peek() {
    if (this.isEmpty()) {
      return "队列为空";
    }
    return this.items[0];
  }

  // 检查队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回队列的大小
  size() {
    return this.items.length;
  }

  // 清空队列
  clear() {
    this.items = [];
  }

  // 打印队列内容
  print() {
    console.log(this.items.toString());
  }
}
```

### Stack 先进后出

```js
class Stack {
  constructor() {
    this.items = [];
  }

  // 入栈
  push(element) {
    this.items.push(element);
  }

  // 出栈
  pop() {
    if (this.isEmpty()) {
      return "栈为空";
    }
    return this.items.pop();
  }

  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return "栈为空";
    }
    return this.items[this.items.length - 1];
  }

  // 检查栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回栈的大小
  size() {
    return this.items.length;
  }

  // 清空栈
  clear() {
    this.items = [];
  }

  // 打印栈内容
  print() {
    console.log(this.items.toString());
  }
}
```

### 使用队列实现栈的出栈入栈

```js
class StackUsingQueues {
  constructor() {
    this.queue1 = []; // 主队列
    this.queue2 = []; // 辅助队列
  }

  // 入栈操作
  push(x) {
    // 先将新元素加入空队列2
    this.queue2.push(x);

    // 将队列1中的所有元素依次出队并加入队列2
    while (this.queue1.length > 0) {
      this.queue2.push(this.queue1.shift());
    }

    console.log(this.queue1, this.queue2);
    console.log("---------");
    // 交换队列1和队列2的引用
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    console.log(this.queue1, this.queue2);

    // // 先将新元素入队
    // this.queue1.push(x)

    // // 将前面的元素依次出队并重新入队，使新元素位于队列前端
    // for (let i = 0; i < this.queue1.length - 1; i++) {
    //   this.queue1.push(this.queue1.shift())
    // }
  }

  // 出栈操作
  pop() {
    if (this.empty()) {
      return "栈为空";
    }
    return this.queue1.shift();
  }

  // 查看栈顶元素
  top() {
    if (this.empty()) {
      return "栈为空";
    }
    return this.queue1[0];
  }

  // 检查栈是否为空
  empty() {
    return this.queue1.length === 0;
  }
}
```
