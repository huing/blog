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

#### js 浏览器的缓存机制

- 浏览器缓存机制有两种，一种为强缓存，一种为协商缓存。
- 对于强缓存，浏览器在第一次请求的时候，会直接下载资源，然后缓存在本地，第二次请求的时候，直接使用缓存。
- 对于协商缓存，第一次请求缓存且保存缓存标识与时间，重复请求向服务器发送缓存标识和最后缓存时间，服务端进行校验，如果失效则使用缓存。
- 协商缓存方案：
  - Exprires：服务端的响应头，第一次请求的时候，告诉客户端，该资源什么时候会过期。Exprires 的缺陷是必须保证服务端时间和客户端时间严格同步。
  - Cache-control：max-age，表示该资源多少时间后过期，解决了客户端和服务端时间必须同步的问题。
  - If-None-Match/ETag：缓存标识，对比缓存时使用它来标识一个缓存，第一次请求的时候，服务端会返回该标识给客户端，客户端在第二次请求的时候会带上该标识与服务端进行对比并返回 If-None-Match 标识是否表示匹配。
  - Last-modified/If-Modified-Since：第一次请求的时候服务端返回 Last-modified 表明请求的资源上次的修改时间，第二次请求的时候客户端带上请求头 If-Modified-Since，表示资源上次的修改时间，服务端拿到这两个字段进行对比。

#### js 浏览器渲染过程

- 首先浏览器主进程接管，开了一个下载线程。
  然后进行 HTTP 请求（DNS 查询、IP 寻址等等），中间会有三次捂手，等待响应，开始下载响应报文。
  将下载完的内容转交给 Renderer 进程管理。
  Renderer 进程开始解析 css rule tree 和 dom tree，这两个过程是并行的，所以一般我会把 link 标签放在页面顶部。
  解析绘制过程中，当浏览器遇到 link 标签或者 script、img 等标签，浏览器会去下载这些内容，遇到时候缓存的使用缓存，不适用缓存的重新下载资源。
  css rule tree 和 dom tree 生成完了之后，开始合成 render tree，这个时候浏览器会进行 layout，开始计算每一个节点的位置，然后进行绘制。
  绘制结束后，关闭 TCP 连接，过程有四次挥手。

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
