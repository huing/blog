---
title: "基本语法"
date: 2024-09-03T06:59:04+08:00
draft: false
---

### es6+

### 变量提升

### 时间冒泡捕获

### 作用域

### 原型

### 闭包

闭包（Closure）是 JavaScript 中一个重要的概念，指的是一个函数可以访问其外部作用域中的变量，即使在该函数在其他作用域中被调用时也能保持对这些变量的访问权限。换句话说，闭包让你可以从内部函数访问外部函数的作用域。

#### 闭包的基本示例

```javascript
function outer() {
  const message = "Hello";
  function inner() {
    console.log(message); // 可以访问 outer 函数中的变量
  }
  return inner;
}
const fn = outer();
fn(); // 输出: "Hello"
```

#### 闭包的主要应用场景

1. **数据私有化**

```javascript
function counter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    getCount() {
      return count;
    },
  };
}
const myCounter = counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.getCount()); // 2
```

2. **函数工厂**

```javascript
function multiply(x) {
  return function (y) {
    return x * y;
  };
}
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(4)); // 8
```

3. **模块化模式**

```javascript
const module = (function () {
  let privateVariable = 0;
  function privateMethod() {
    return privateVariable;
  }
  return {
    publicMethod: function () {
      privateVariable++;
      return privateMethod();
    },
  };
})();
```

4. **事件处理和回调**

```javascript
// 防抖：事件触发后延迟执行，若在延迟期间重复触发则重置延迟
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流：事件触发后在一段时间内只执行一次
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```

5. **柯里化（Currying）**

-- function.length

```js
console.log(Function.length); // 1
console.log((() => {}).length); // 0
console.log(((a) => {}).length); // 1
console.log(((a, b) => {}).length); // 2，依此类推
console.log(((...args) => {}).length);
// 0，剩余参数不计算在内
console.log(((a, b = 1, c) => {}).length);
// 1，只计算第一个具有默认值的参数之前的参数
```

-- 实现

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}
function add(a, b, c) {
  return a + b + c;
}
curry(add)(1)(2)(3);
```

```js
/*
 * 柯里化 相加
 * */
function add(...argus) {
  // arguments是个对象
  // let args = Array.prototype.slice.call(arguments);
  const args = argus;
  const inner = function (...innerArgs) {
    args.push(...innerArgs);
    return inner;
  };
  inner.toString = function () {
    return args.reduce((acc, cur) => acc + cur, 0);
  };
  inner.value = function () {
    return args.reduce((acc, cur) => acc + cur, 0);
  };
  return inner;
}
// const result = add(1)(2)(3)(4)(5);
const result = add(1, 2, 3, 4)(5);
result.toString();
result.value();
```

#### 使用闭包需要注意的点

1. **内存管理**：闭包会保持对外部变量的引用，可能导致内存无法及时释放
2. **this 指向**：在闭包中使用 this 时需要特别注意其指向
3. **性能考虑**：过度使用闭包可能会影响性能

闭包是 JavaScript 中非常强大的特性，合理使用可以实现很多优雅的编程模式和解决方案。但同时也需要注意内存管理等问题，避免造成内存泄漏。

### 普通函数 vs 箭头函数

```js
const funA = () => {
  // this 指向 funA 的调用
  // 没有 arguments
  // 不能new
  // 没有原型链
};
function funB(params) {
  // this 指向 函数内部
  // 有 arguments;
}
```

### this 指向

```js
var test = "王五";
const outerFun = () => {
  this.test = "张三";
  return () => {
    console.log(this.test);
  };
};
var obj = {
  test: "李四",
  innerFun: outerFun(),
};
obj.innerFun();
```

```js
var test = "王五";
function outFun() {
  this.test = "张三";
  return function () {
    console.log(this.test);
  };
}
var obj = {
  test: "李四",
  inFun: outFun(),
};
obj.inFun();
```

```js
var test = "王五";
var obj = {
  test: "李四",
  inFun() {
    console.log(this.test);
  },
};
obj.inFun();
```

```js
var test = "王五";
var obj = {
  test: "李四",
  inFun: () => {
    console.log(this.test);
  },
};
obj.inFun();
```

```js
let test = "王五";
let obj = {
  test: "李四",
  inFun: () => {
    console.log(this.test);
  },
};
obj.inFun();
```
