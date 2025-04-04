---
title: "Base"
date: 2022-09-01T20:20:27+08:00
draft: false
categories: ["js"]
---

#### 浅拷贝方法

```javascript
slice()
Object.assign({}, a)
...rest
```

#### 获取浏览器信息 navigator

```javascript
navigator.userAgent;
// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
navigator.language;
// "zh-CN"
navigator.languages;
// ["zh-CN", "zh", "fr-CA", "fr", "fr-CH", "fr-FR", "en"]
```

#### setTimeOut 实际延时比设定值更久的原因

- 最小延迟时间
- 时间误差 函数嵌套延迟 4ms 回调函数阻塞导致函数  setTimeout  接受两个参数：待加入队列的消息和一个时间值（可选，默认为 0）。这个时间值代表了消息被际加入到队列的最小延迟时间。如果队列中没有其它消息并且栈为空，在这段延迟时间过去之后，消息会被马上处理。但是，如果有其它消息，setTimeout  消息必须等待其它消息处理完。因此第二个参数仅仅表示最少延迟时间，而非确切的等待时间。

#### 字面量 Literals

- 数组字面量 Array literals

  ```javascript
  var fish = ["Lion", , "Angel"]; // fish[1] = undefined
  ```

- 布尔字面量 Boobean literals
- 浮点数字面量 Floating-point literals
- 整数 Integers
- 对象字面量 Object literals
- RegExp literals
- 字符串字面量 String literals
- 模板字面量 Template literals

#### BOM 浏览器对象模型

#### DOM 虚拟对象模型

- parse stringify
- parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
- JSON.parse()  方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象
- JSON.stringify()  方法是将一个 JavaScript 值(对象或者数组)转换为一个 JSON 字符串

```javascript
console.log(
    new Date(),
    (new Date()).toString(),
    (new Date()).valueOf(),
    Date.now(),
    Date.parse(new Date())
  )
  Wed Aug 28 2019 14:35:22 GMT+0800 (中国标准时间) "Wed Aug 28 2019 14:35:22 GMT+0800 (中国标准时间)" 1566974122905 1566974122905 1566974122000
```

#### js 中 === vs ==

- 严格相等 ===
- 宽松相等 ==
- Object.is(val1, val2)
  ![equal](../../public/pCyqkLc.png)

#### 父组件调用子组件方法，子组件向父组件传值方法

- 子组件向父组件传值方法
  - 把子组件的值当成参数，传递到父组件的作用域
- 父组件调用子组件方法
- props<http://taobaofed.org/blog/2016/11/17/react-components-communication/>
- Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

```javascript
const {Provider, Consumer} = React.createContext(defaultValue)
<Provider value={/* some value */}>
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

#### React 重复渲染 SVG

- 无答案

#### React 是什么，特点

- 用于构建用户界面的 JavaScript 库

1. 声明式设计 −React 采用声明范式，可以轻松描述应用。
2. 高效 −React 通过对 DOM 的模拟，最大限度地减少与 DOM 的交互。
3. 灵活 −React 可以与已知的库或框架很好地配合。
4. JSX − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
5. 组件 − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
6. 单向响应的数据流 − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

#### 前端工程化

- 无解

#### 虚拟 DOM

- 首先说说为什么要使用 Virturl DOM，因为操作真实 DOM 的耗费的性能代价太高，所以 react 内部使用 js 实现了一套 dom 结构，在每次操作在和真实 dom 之前，使用实现好的 diff 算法，对虚拟 dom 进行比较，递归找出有变化的 dom 节点，然后对其进行更新操作。为了实现虚拟 DOM，我们需要把每一种节点类型抽象成对象，每一种节点类型有自己的属性，也就是 prop，每次进行 diff 的时候，react 会先比较该节点类型，假如节点类型不一样，那么 react 会直接删除该节点，然后直接创建新的节点插入到其中，假如节点类型一样，那么会比较 prop 是否有更新，假如有 prop 不一样，那么 react 会判定该节点有更新，那么重渲染该节点，然后在对其子节点进行比较，一层一层往下，直到没有子节点。
  基于 diff 算法的同级对比，它主要分为四种类型的对比，分别为:
  1. 新建 create： 新的 vd 中有这个节点，旧的没有
  2. 删除 remove： 新的 vd 中没有这个节点，旧的有
  3. 替换 replace： 新的 vd 的 tagName 和旧的 tagName 不同
  4. 更新 update： 除了上面三点外的不同，具体是比较 attributes 先，然后再比较 children

#### 为什么要写 super(props)

#### 为什么要写 jsx

#### 为什么要打包

#### 函数组件和 class 组件区别

#### new URL()

### this 指向

### bind, apply, call 区别

```js
const me = { a: 123 };
const he = { b: 456 };
function x() {
  console.log(this, arguments, this.a);
}
```

bind，返回函数的 copy
**使用时要重新调用一次**
参数形式， (this, arg1, arg2)

```js
x.bind(me, 2, 3).bind(he)(); // bind只生效一次！
// {a: 123} {'0': 2,'1': 3} 123
```

apply，返回函数的调用的结果
参数形式， (this, [arg1, arg2])

```js
x.apply(me, [2, 3]);
// {a: 123} {'0': 2,'1': 3} 123
```

call，返回函数的调用的结果
参数形式， (this, arg1, arg2)

```js
x.call(me, 2, 3);
// {a: 123} {'0': 2,'1': 3} 123
```

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
