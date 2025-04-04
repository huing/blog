---
title: "vue中nextTick是宏任务还是微任务,为什么"
date: 2025-03-25T13:58:25+08:00
draft: false
---

### Vue nextTick 实现原理

#### 基本概念

nextTick 是 Vue 提供的一个全局 API，用于在下次 DOM 更新循环结束之后执行延迟回调。当你修改数据后，要等待 DOM 更新完成后再执行某个操作，就可以使用 nextTick。

#### 实现机制

Vue 中的 nextTick 采用了优雅降级的方式来实现异步调用：

1. **优先级顺序**

   - Promise（微任务）
   - MutationObserver（微任务）
   - setImmediate（宏任务，IE 和 Node 环境）
   - setTimeout(fn, 0)（宏任务，降级方案）

2. **具体实现流程**

   ```js
   export function nextTick<T = void>(
     this: T,
     fn?: (this: T) => void
   ): Promise<void> {
     const p = currentFlushPromise || Promise.resolve();
     return fn ? p.then(this ? fn.bind(this) : fn) : p;
   }
   ```

#### 为什么优先使用微任务？

1. **时机更早**

- 微任务在当前宏任务结束后立即执行
- 可以确保在下一次 DOM 更新前完成
- 避免不必要的视图更新延迟

2. **性能更好**

- 减少不必要的渲染
- 避免因宏任务导致的额外渲染
- 提供更好的用户体验

#### 使用场景

1. **数据更新后获取最新 DOM**

```js
this.message = "changed"; // 更新数据
this.$nextTick(() => {
  // DOM 更新完成，可以访问到最新的 DOM
  console.log(this.$el.textContent);
});
```

2. **组件更新后的回调**

   ```js
   updated() {
     this.$nextTick(() => {
       // 组件更新完成后执行
     });
   }
   ```

3. **异步组件加载完成后的处理**

   ```js
   mounted() {
     this.$nextTick(() => {
       // 组件挂载完成后执行
     });
   }
   ```

#### 注意事项

1. nextTick 返回一个 Promise 对象，可以使用 async/await 语法
2. 多个 nextTick 回调会被存储到队列中，按顺序执行
3. 在同一个 tick 内多次修改数据，只会触发一次更新
4. 要谨慎在 nextTick 回调中再次修改数据，可能导致无限循环

### dom 更新 浏览器渲染

### 重排和重绘 回流
