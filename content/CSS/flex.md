---
title: "Flex"
date: 2024-09-03T06:56:19+08:00
draft: false
---

### flex: 1

`flex: 1` 是一个简写属性，等同于：

- `flex: 1 1 0%`
  - `flex-grow: 1` - 定义项目的放大比例，默认为 0。当容器有剩余空间时，flex-grow 为 1 的元素会平分剩余空间
  - `flex-shrink: 1` - 定义项目的缩小比例，默认为 1。当容器空间不足时，元素会按比例缩小。设置为 0 时空间不足也不缩小
  - `flex-basis: 0%` - 定义项目在主轴上的初始大小，默认值为 auto（即项目本来的大小）

常见使用场景：

1. 等分布局：

```css
.container {
  display: flex;
  width: 100%;
}

.item {
  flex: 1;
  /* 所有 item 平分容器宽度 */
}
```

2. 左侧固定右侧自适应：

```css
.container {
  display: flex;
}

.left {
  width: 200px; /* 固定宽度 */
}

.right {
  flex: 1; /* 占据剩余所有空间 */
}
```

3. 不同比例分配：

```css
.container {
  display: flex;
}

.item1 {
  flex: 2; /* 占据剩余空间的 2/3 */
}

.item2 {
  flex: 1; /* 占据剩余空间的 1/3 */
}
```

注意事项：

- 当需要严格控制空间分配比例时，建议配合 `width: 0` 使用
- `flex: 1` 只在父元素为 `display: flex` 时生效
- 可以通过设置不同的 flex 值来控制元素所占空间的比例

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

例如：

```css
.container {
  display: flex;
}

.item {
  flex: 1;
  width: 0;
}
```

这样设置后，即使子项中的内容长短不一，它们也会严格按照 1:1:1 的比例来分配容器空间，而不会受到内容宽度的影响。

### flex-basis: auto

- 有宽就用宽度的值 width: 200px
- 其次为内容的大小，max-content
- flex-basis:0
