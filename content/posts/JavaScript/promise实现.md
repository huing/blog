---
title: "Promise实现"
date: 2022-09-02T21:59:01+08:00
draft: false
tags: ["JavaScript"]
---

## promise 实现

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

## 实现一个 myPromiseAll

```js
function myPromiseAll(promises) {
  if (typeof promises[Symbol.iterator] !== "function") {
    return Promise.reject(new TypeError("arguments must be an iterator"));
  }
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("arguments must be an array"));
  }
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    let count = 0;
    let result = [];
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((val) => {
          count++;
          result[i] = val;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
```

## promise 执行顺序

{{< code lang="js" file="js/promise-simple.js" >}}

### 微任务中有微任务

参考事件循环

{{< code lang="js" file="js/promise-simple-1.js" >}}
