---
title: "isValidElement"
date: 2024-09-06T06:49:36+08:00
draft: false
tags: ["React"]
---

```js
React.Children.map(children, (child, index) => {
  if (!React.isValidElement(child)) return null;
  return React.cloneElement(child, {
    ...child.props,
    onClick: () => {},
  });
});
```
