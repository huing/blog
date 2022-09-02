---
title: "Promise实现"
date: 2022-09-02T21:59:01+08:00
draft: false
tags: ["js"]
author: "huing"
---

```js
class Commitment {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  private status: "PENDING" | "FULFILLED" | "REJECTED";
  private result: any;
  constructor(func: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) {
    this.status = "PENDING";
    this.result = undefined;
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  resolve(value: any) {
    if (this.status === "PENDING") {
      this.status = "FULFILLED";
      this.result = value;
    }
  }
  reject(reason?: any) {
    if (this.status === "PENDING") {
      this.status = "REJECTED";
      this.result = reason;
    }
  }
  then(onfulfilled?: (value: any) => void, onrejected?: (reason: any) => void) {
    return new Commitment((resolve, reject) => {
      setTimeout(() => {
        let res: any;
        if (this.status === "FULFILLED" && onfulfilled) {
          res = onfulfilled(this.result);
        }
        if (this.status === "REJECTED" && onrejected) {
          res = onrejected(this.result);
        }
        if (this.status === "FULFILLED" && resolve) {
          resolve(res);
        }
        if (this.status === "REJECTED" && reject) {
          reject(res);
        }
      });
    });
  }
}
```
