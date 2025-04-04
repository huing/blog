---
title: "Vue中key的作用"
date: 2025-03-25T13:58:25+08:00
draft: false
tags: ["Vue"]
---

## Vue3 中 key 的作用

`key` 是 Vue 中的一个特殊属性，主要用于 Vue 的虚拟 DOM 算法，帮助 Vue 识别节点，从而优化渲染性能。

### key 的主要作用

1. 帮助 Vue 准确追踪每个节点的身份
2. 在元素更新时提供更高效的 DOM 更新
3. 确保组件的正确重新渲染

### 使用场景

#### 1. v-for 中的 key

在使用 v-for 时，建议始终提供 key 属性：

```vue
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

#### 2. template v-for 的用法

在 Vue 3.x 中，当使用 `<template v-for>` 时，key 应该被放在 `<template>` 标签上：

```vue
<!-- Vue 3.x 正确用法 -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

### 错误的绑定 key

以下是一个常见的错误示例，展示了不正确使用 key 可能导致的问题：

```vue
<p v-for="(v, i) in spans" :key="i">
  <input type="text" /><button @click="delInput(i)">删除</button>
</p>
```

```js
const spans = reactive<{ id: number; value: number }[]>([])
spans.push({ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 })

const delInput = (i: number) => {
  console.log('🚀 ~ delInput ~ i:', i)
  spans.splice(i, 1)
}
```
