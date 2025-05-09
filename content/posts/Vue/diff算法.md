---
title: "Vue的diff算法"
date: 2025-03-25T13:58:35+08:00
draft: false
tags: ["Vue"]
---

## Diff 算法简介

在 Vue 中,Diff 算法是用来对比新旧虚拟 DOM 树的差异,从而确定需要对实际 DOM 进行的最小修改操作。这个过程对于提升页面性能至关重要,因为 DOM 操作通常是最耗费性能的。

Vue 通过以下方式来提升 Diff 的性能:

1. 只对同层级的节点进行比较,不跨层级比较
2. 通过 key 属性来标识节点的唯一性
3. 采用了不同版本的优化算法

## vue2 双端 diff 算法

Vue2 采用双端对比算法,这是一种同时从新旧节点序列的两端进行对比的算法。主要步骤如下:

1. 定义四个指针:

   - oldStartIdx: 指向旧节点序列的开始
   - oldEndIdx: 指向旧节点序列的结束
   - newStartIdx: 指向新节点序列的开始
   - newEndIdx: 指向新节点序列的结束

2. 对比过程:

   - 旧开始节点 vs 新开始节点
   - 旧结束节点 vs 新结束节点
   - 旧开始节点 vs 新结束节点
   - 旧结束节点 vs 新开始节点

3. 如果以上四种情况都不匹配,则通过 key 在旧节点中查找新开始节点

优点:

- 对于节点位置变化较少的情况效率较高
- 能够复用已有节点,减少 DOM 操作

## vue3 快速 diff 算法

Vue3 采用了更高效的快速 Diff 算法,主要包含以下步骤:

1. 预处理优化:

   - 对比序列的头部,跳过相同的前缀
   - 对比序列的尾部,跳过相同的后缀

2. 处理剩余节点:
   - 生成新节点的 key-index 映射
   - 构建最长递增子序列
   - 移动/添加/删除节点

### 最长递增子序列

最长递增子序列(Longest Increasing Subsequence, LIS)在 Vue3 的 Diff 算法中起着重要作用:

1. 用途:

   - 确定哪些节点不需要移动
   - 最小化 DOM 移动操作

2. 实现思路:
   - 将新节点在旧节点序列中的索引转换为数组
   - 计算该数组的最长递增子序列
   - 最长递增子序列中的节点位置保持不变
   - 其他节点需要移动到正确位置

优化效果:

- 时间复杂度从 O(n^2)优化到 O(nlogn)
- 显著减少了 DOM 移动操作
- 提高了大规模列表的更新性能

## 性能对比

1. Vue2 双端 Diff:

   - 适合小规模数据
   - 节点移动较少的场景
   - 实现相对简单

2. Vue3 快速 Diff:
   - 更适合大规模数据
   - 节点移动频繁的场景
   - 内存占用略高但性能更优

## 最佳实践

1. 保持稳定的 DOM 结构
2. 使用唯一的 key 属性
3. 避免不必要的节点更新
4. 合理设计组件粒度
