---
title: "Flex"
date: 2024-09-03T06:56:19+08:00
draft: false
---

### flex 计算 left right 的宽度

```html
<div style="display: flex; width: 800px">
  <div class="left" style="flex: 1 2 300px"></div>
  <div class="right" style="flex: 2 1 200px"></div>
</div>
```

计算步骤：

1. 首先看容器总宽度：800px

2. 看两个元素的 flex-basis 总和：

   - left: 300px
   - right: 200px
   - 总和：500px

3. 因为 500px < 800px，所以需要扩展，剩余空间为 300px

4. 计算扩展比例：

   - left 的 flex-grow: 1
   - right 的 flex-grow: 2
   - 总比例：3

5. 计算各自扩展的尺寸：

   - left 扩展：300 × (1/3) = 100px
   - right 扩展：300 × (2/3) = 200px

6. 最终宽度：
   - left = 300 + 100 = 400px
   - right = 200 + 200 = 400px

所以最终：

- left 的宽度为 400px
- right 的宽度为 400px

这样加起来正好是容器的 800px 宽度。虽然两个元素的 flex-basis 不同，但因为剩余空间的分配比例是 1:2，最终它们恰好达到了相同的宽度。注意这里的 flex-shrink 值（left 的 2 和 right 的 1）并未起作用，因为没有发生收缩。

```html
<div style="display: flex; width: 800px">
  <div class="left" style="flex: 1 1 600px"></div>
  <div class="right" style="flex: 1 3 1000px"></div>
</div>
```

计算步骤：

1. 首先看容器总宽度：800px

2. 看两个元素的 flex-basis 总和：

   - left: 600px
   - right: 1000px
   - 总和：1600px

3. 因为 1600px > 800px，所以需要收缩，差值为 800px

4. 计算收缩因子：

   - left 的收缩因子：1 × 600 = 600
   - right 的收缩因子：3 × 1000 = 3000
   - 总收缩因子：3600

5. 计算各自需要收缩的尺寸：

   - left 收缩：800 × (600/3600) = 133.33px
   - right 收缩：800 × (3000/3600) = 666.67px

6. 最终宽度：
   - left = 600 - 133.33 = 466.67px
   - right = 1000 - 666.67 = 333.33px

所以最终：

- left 的宽度约为 467px
- right 的宽度约为 333px

这样加起来正好是容器的 800px 宽度。right 虽然 flex-basis 更大，但因为它的 flex-shrink 值为 3（比 left 的 1 大），所以收缩得更多，最终宽度反而更小。

### flex: 1

`flex: 1` 是一个简写属性，等同于：

- `flex: 1 1 0%`
  - `flex-grow: 1`
    - 定义项目的放大比例，默认为 0。当容器有剩余空间时，flex-grow 为 1 的元素会平分剩余空间
  - `flex-shrink: 1`
    - 定义项目的缩小比例，默认为 1。当容器空间不足时，元素会按照收缩因子。设置为 0 时空间不足也不缩小
  - `flex-basis: 0%`
    - 定义项目在主轴上的初始大小，默认值为 auto（即项目本来的大小）

### flex:1; width: 0

在 Flex 布局中，这个组合是一个常见且重要的用法：

1. `flex: 1` 如前文所述，是 `flex: 1 1 0%` 的简写，表示：

   - `flex-grow: 1` - 可以放大
   - `flex-shrink: 1` - 可以缩小
   - `flex-basis: 0%` - 初始主轴空间为 0

2. `width: 0` 的作用：
   - 强制设置元素的基础宽度为 0，覆盖元素的默认宽度
   - 防止元素内容影响其初始宽度
   - 确保所有 flex 子项真正按照 flex-grow 比例来分配空间

这个组合最常用的场景是：

- 当你想要多个 flex 子项完全按照 flex-grow 的比例来分配容器的空间
- 需要忽略子项内容长度的影响
- 确保空间分配更加精确

这样设置后，即使子项中的内容长短不一，它们也会严格按照 1:1:1 的比例来分配容器空间，而不会受到内容宽度的影响。

### flex-basis: auto

- 有宽就用宽度的值 width: 200px
- 其次为内容的大小，max-content
- flex-basis:0
