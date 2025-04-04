---
title: "Vue"
date: 2025-03-25T09:35:37+08:00
draft: false
tags: ["Vue"]
---

### vue-router 路由守卫 路由原理

```js
beforeEnter(to, from, next) {}
```

vue 响应式数据 原理 数组更新

### vuex 和 pinia 响应式数据原理区别

vuex 和 pinia 区别是什么

1. 架构设计

- Vuex 基于模块化设计，使用 mutations、actions、modules 等概念
- Pinia 采用更简单的 Store 设计，没有 mutations，直接使用 actions 进行状态修改
- Pinia 的 Store 可以直接定义，不需要像 Vuex 那样创建复杂的模块树

2. TypeScript 支持

- Pinia 是用 TypeScript 编写的，提供了更好的类型推导和类型安全
- Vuex 对 TypeScript 的支持相对较弱，需要额外的类型声明

3. 开发体验

- Pinia 支持多个 Store，可以相互独立
- Pinia 的 devtools 调试体验更好
- Pinia 代码更简洁，不需要写 mutations
- Pinia 支持自动代码分割（code splitting）

4. 性能

- Pinia 体积更小，打包后约 1KB
- Pinia 没有嵌套模块，扁平化设计使得性能更好

5. Vue 版本支持

- Pinia 同时支持 Vue 2 和 Vue 3
- Vuex 4 只支持 Vue 3，Vuex 3 只支持 Vue 2

```js
// Vuex 示例
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
});
```

```js
// Pinia 示例
export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
    async incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
});
```

总的来说，Pinia 是更现代化的状态管理方案，提供了更好的开发体验和类型支持。Vue 官方也推荐使用 Pinia 作为新项目的状态管理方案

## Suspense

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理
