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
