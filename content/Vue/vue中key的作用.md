---
title: "Vue中key的作用"
date: 2025-03-25T13:58:25+08:00
draft: false
---

## 错误的绑定 key

input 输入框没有双向绑定，删除第二个输入框,dom 上却删除了第三个

```html
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
