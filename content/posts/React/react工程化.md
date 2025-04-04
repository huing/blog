---
title: "React工程化"
date: 2022-06-12T17:31:57+08:00
draft: false
tags: ["React"]
---

## useEffect

> <https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/>

> <https://react.iamkasong.com/hooks/useref.html#commit%E9%98%B6%E6%AE%B5>

React 工程化

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler

Reconciler（协调器）—— 负责找出变化的组件

Renderer（渲染器）—— 负责将变化的组件渲染到页面上

虚拟 DOM 在 react 中的正式称呼 Fiber（纤程）

Fiber 并不是计算机术语中的新名词，他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在 JS 中，协程的实现便是 Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在 JS 中的体现。

React Fiber 可以理解为：

React 内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为 React Element 对应的 Fiber 节点。

当我们用 canvas 绘制动画，每一帧绘制前都会调用 ctx.clearRect 清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种在内存中构建并直接替换的技术叫做双缓存 (opens new window)。

React 使用“双缓存”来完成 Fiber 树的构建与替换——对应着 DOM 树的创建与更新。
