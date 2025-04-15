---
title: "iframe"
date: 2025-04-09T07:00:28+08:00
draft: false
tags: ["HTML"]
---

## iframe 是如何通信的，当父容器是三方时，怎么设置 iframe 的宽度

### iframe 是如何通信的

#### postMessage API

- 父窗口发送消息给 iframe

```js
const iframe = document.getElementById("myIframe");
iframe.contentWindow.postMessage(
  "Hello from parent!",
  "https://iframe-domain.com"
);
```

- iframe 接收消息

```js
window.addEventListener("message", (event) => {
  // 验证消息来源
  if (event.origin !== "https://parent-domain.com") return;

  console.log("Received message:", event.data);
});
```

#### 跨文档通信 (同域时)

如果父窗口和 iframe 同域，可以直接访问彼此的属性和方法

```js
// 父访问iframe
document.getElementById("myIframe").contentWindow.document;

// iframe访问父
window.parent.document;
```

#### 3. URL 片段标识符 (hash)

通过修改 URL 的 hash 部分来传递数据

```js
// 父窗口设置iframe的hash
iframe.src = iframe.src.split("#")[0] + "#data=value";

// iframe中监听hash变化
window.onhashchange = function () {
  const data = window.location.hash.substring(1);
};
```

#### 4. 使用 Local Storage

在同一域名下，父窗口和 `iframe` 可以通过 `localStorage` 进行通信。父窗口可以将数据存储在 `localStorage` 中，`iframe` 可以监听 `storage` 事件来获取数据。

```js
// 父窗口存储数据
localStorage.setItem("message", "Hello from parent!");

// iframe 监听 storage 事件
window.addEventListener("storage", (event) => {
  if (event.key === "message") {
    console.log("Received message:", event.newValue);
  }
});
```

### 设置 iframe 宽度（当父容器是第三方时）

#### 1. 通过 postMessage 协商

```js
// iframe内部代码
const desiredWidth = 800; // 你想要的宽度

// 发送宽度请求给父窗口
window.parent.postMessage(
  {
    type: "resize-request",
    width: desiredWidth,
  },
  "*"
);

// 父窗口代码
window.addEventListener("message", (event) => {
  if (event.data.type === "resize-request") {
    document.getElementById("myIframe").style.width = event.data.width + "px";
  }
});
```

#### 2. 使用 CSS max-width (如果父容器允许)

```js
<iframe src="..." style="max-width: 100%; width: 800px;"></iframe>
```

#### 4. 通过 URL 参数传递宽度

```js
// iframe代码
const url = new URL(window.location.href);
const width = url.searchParams.get("width") || "800px";
document.body.style.width = width;
```

#### 5. JavaScript 动态调整

可以使用 JavaScript 来动态调整 iframe 的宽度。例如，监听窗口的 resize 事件，根据父容器的宽度来调整 iframe 的宽度

```js
function adjustIframeWidth() {
  const iframe = document.getElementById("myIframe");
  const parentWidth = iframe.parentElement.offsetWidth;
  iframe.style.width = parentWidth + "px";
}

window.addEventListener("resize", adjustIframeWidth);
adjustIframeWidth(); // 初始化时调用
```
