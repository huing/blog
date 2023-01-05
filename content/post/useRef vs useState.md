---
title: "useRef vs useState"
date: 2022-06-15T22:53:05+08:00
draft: false
categories: ["react"]
author: "huing"
---

<!-- pages/journal/ref_state.tsx -->

> 原文地址 https://blog.logrocket.com/usestate-vs-useref/

> useHooks 实现 https://usehooks.com/

useRef

```js
const inputRef = useRef();
```

useState

```js
const [count, setCount] = useState(0);
```

let variable

```
let prevCount;
```

1. useState 返回数组，第一个真实的状态(the actual state)，第二个状态更新函数(the state updater function)
2. 状态更新组件重新渲染 (Every state change re-renders the App component),子组件也会触发更新
3. useRef 返回对象，包含属性 current,存真实的值，值更新不会触发组件更新
4. let 定义的变量在每次 render 时被覆盖，最终只有初始值

总结：

1. 在渲染周期（render cycles）和 ui 更新（UI updates）期间 两者都保存更新的值，useState 重新渲染
2. useRef 的 current 属性是可变的，useState 的 state 需要 setState 更新赋值
3. 两者都被认为是数据 hook,useRef 可以直接访问 react 组件或者 dom 元素

<!-- 1.与状态不同，存储在引用或引用中的数据或值保持不变，即使在组件重新渲染之后也是如此。因此，**「引用不会影响组件渲染，但状态会影响」**。

2.useState 返回一个数组，一个是值，另一个是更新值的函数。useRef 只返回一个值，即实际存储的数据。

3.当值发生变化时，useRef 无需刷新或重新渲染即可更新。但是在 useState 中，组件必须再次渲染以更新状态或其值。

4.refs 在获取用户输入、DOM 元素属性和存储不断更新的值时很有用。存储组件相关信息或在组件中使用方法，states 则是最佳选择。

useState 的值在每个 rernder 中都是独立存在的。而 useRef.current 则更像是相对于 render 函数的一个全局变量，每次他会保持 render 的最新状态。

useState 值的更新会触发组件重新渲染，而 useRef 的 current 不会出发重渲染。

useRef（）钩不仅用于 DOM 引用。“ ref”对象是通用容器，其当前属性是可变的，并且可以保存任何值，类似于类的实例属性。

变量是决定视图图层渲染的变量，请使用 useState，其他用途 useRef

useRef 特性：可变的 ref 对象，持久化 -->
