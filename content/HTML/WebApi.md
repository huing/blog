---
title: "WebApi"
date: 2024-10-30T13:30:51+08:00
draft: false
---

## IntersectionObserver

```js
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // 加载真实图片
      observer.unobserve(img); // 停止观察该图片
    }
  });
});
// 获取所有带有 data-src 属性的图片
document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});
```

## MutationObserver

MutationObserver 用于监视 DOM 树的变化，可以监听元素的属性变化、子节点的增删改、文本内容的修改等。

```js
// 创建一个观察器实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // mutation.type 可能是 'childList'、'attributes' 或 'characterData'
    console.log("DOM 发生变化:", mutation.type);

    if (mutation.type === "childList") {
      console.log("添加的节点:", mutation.addedNodes);
      console.log("移除的节点:", mutation.removedNodes);
    } else if (mutation.type === "attributes") {
      console.log("变化的属性:", mutation.attributeName);
    }
  });
});

// 配置观察选项
const config = {
  attributes: true, // 监听属性变化
  childList: true, // 监听子节点增删
  subtree: true, // 监听所有后代节点
  characterData: true, // 监听文本内容变化
};

// 开始观察目标节点
const targetNode = document.getElementById("some-id");
observer.observe(targetNode, config);

// 停止观察
// observer.disconnect();
```

MutationObserver 常用于：

- 监控 DOM 变化以实现动态功能
- 实现虚拟 DOM 的差异检测
- 监听第三方脚本对 DOM 的修改
- 实现自动化测试

## PerformanceObserver

<https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver>

PerformanceObserver entry.entryType

entry.entryType

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log(entry);
  }
}).observe({
  entryTypes: ["paint", "largest-contentful-paint", "first-input"],
});

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log(entry);
  }
}).observe({ entryTypes: ["mark", "measure"] });

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log("Layout shift:", entry);
  }
}).observe({ type: "layout-shift", buffered: true });
```

## ResizeObserver

## window.requestAnimationFrame

## window.cancelAnimationFrame
