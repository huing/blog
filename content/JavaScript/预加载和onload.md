---
title: "预加载和onload"
date: 2025-04-03T13:50:59+08:00
draft: false
---

## 预加载 和 window.onload 的区别

1. 使用 <link rel="preload"> 预加载关键资源

```js
<link rel="preload" href="/styles/main.css" as="style">
<link rel="preload" href="/script/main.js" as="script">
```

2. 图片预加载

```js
const img = new Image();
img.src = "图片URL"; // 提前加载图片到缓存
```

3. 脚本预加载
   使用 async 属性：并行请求脚本，尽快解析和执行
   使用 defer 属性：在文档解析后、DOMContentLoaded 事件前执行

### DOMContentLoaded 事件

DOMContentLoaded 事件在 DOM 树构建完成后立即触发,此时:

- HTML 已经被完全加载和解析
- DOM 树已经构建完成
- 外部资源(如图片、样式表等)可能还未完全加载
- 必须使用 addEventListener 来监听该事件

示例代码:

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // DOM 已准备就绪,可以安全地操作 DOM 元素
  console.log("DOM 已加载完成");
});
```

### window.onload 事件

window.onload 事件会在页面完全加载后触发,包括:

- DOM 树构建完成
- 所有外部资源加载完成(图片、样式表、脚本等)
- 所有 iframe 加载完成

示例代码:

```javascript
window.onload = function () {
  // 页面的所有资源都已加载完成
  console.log("页面完全加载完成");
};
```

### 主要区别

1. 触发时机

   - DOMContentLoaded: DOM 树构建完成后立即触发
   - window.onload: 所有资源(包括图片、样式等)加载完成后触发

2. 使用场景

   - DOMContentLoaded: 适合进行 DOM 操作、添加事件监听器等不依赖外部资源的操作
   - window.onload: 适合需要等待所有资源加载完成后的操作,如获取图片尺寸

3. 性能影响
   - DOMContentLoaded 通常比 window.onload 更早触发
   - 使用 DOMContentLoaded 可以让页面交互代码更早执行,提升用户体验

### 实际应用建议

1. 如果代码只需要操作 DOM,建议使用 DOMContentLoaded
2. 如果代码需要处理外部资源(如图片尺寸),则使用 window.onload
3. 可以通过 document.readyState 来检查当前文档加载状态:
   - loading: 文档正在加载
   - interactive: 文档已被解析完成(等同于 DOMContentLoaded)
   - complete: 文档和所有资源已完成加载(等同于 window.onload)

## 预加载的使用场景

### 框架开发中的使用场景

#### 预加载的使用场景

1. **SPA 应用的关键资源预加载**

```html
<!-- 预加载首屏必需的 CSS 和 JS -->
<link rel="preload" href="/app.css" as="style" />
<link rel="preload" href="/app.js" as="script" />
```

2. **路由懒加载优化**

- 当用户 hover 或即将进入某个路由时，预加载对应的组件资源
- 适用于 React.lazy、Vue Router 等场景

3. **字体文件预加载**

```html
<!-- 预加载自定义字体，避免 FOUT (Flash of Unstyled Text) -->
<link rel="preload" href="/fonts/custom-font.woff2" as="font" crossorigin />
```

4. **首屏关键图片预加载**

```javascript
// 比如轮播图第一张
const img = new Image();
img.src = "banner-1.jpg";
```

#### window.onload 的使用场景

1. **Hybrid 应用开发**

- 需要等待页面完全加载后再调用原生方法
- 控制 WebView 加载进度条的消失时机

2. **复杂数据可视化**

```javascript
window.onload = () => {
  // 确保所有资源加载完成后再初始化图表
  initCharts();
};
```

3. **性能监控**

```javascript
// 记录页面完整加载时间
window.onload = () => {
  const loadTime = performance.now();
  // 上报加载性能数据
};
```

### 框架开发中的最佳实践

1. **Vue 项目中**

```javascript
// 路由组件的预加载
const Home = () => import(/* webpackPrefetch: true */ './views/Home.vue')

// 确保资源加载完成
mounted() {
  window.onload = () => {
    // 初始化需要完整页面资源的操作
  }
}
```

2. **React 项目中**

```javascript
// 预加载组件
const Component = React.lazy(() => import("./Component"));

// 使用 Suspense 处理加载状态
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>;
```

3. **性能优化场景**

- 使用预加载提升首屏加载速度
- 通过 Performance API 监控加载性能

```javascript
// 监控关键性能指标
const performanceMetrics = {
  loadTime: 0,
  domContentLoaded: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  performanceMetrics.domContentLoaded = performance.now();
});

window.onload = () => {
  performanceMetrics.loadTime = performance.now();
};
```

### 注意事项

1. **预加载使用建议**

- 只预加载当前页面必需的资源
- 避免过度预加载导致带宽浪费
- 使用 Chrome DevTools 监控预加载资源的使用情况

2. **onload 事件使用建议**

- 避免在 onload 中执行过重的操作
- 考虑使用 DOMContentLoaded 代替不需要等待所有资源的场景
- 在 Hybrid 开发中特别注意 onload 的触发时机
