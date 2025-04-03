---
title: "Promise实现"
date: 2022-09-02T21:59:01+08:00
draft: false
categories: ["js"]
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

```js
console.log("同步任务1");

setTimeout(() => {
  console.log("宏任务: setTimeout 1");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("微任务: Promise1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("微任务: Promise2");
  });

queueMicrotask(() => {
  console.log("微任务: queueMicrotask");
});

setTimeout(() => {
  console.log("宏任务: setTimeout 2");
}, 0);

console.log("同步任务2");

setImmediate?.(() => {
  console.log("宏任务: setImmediate");
});

process.nextTick(() => {
  console.log("微任务: process.nextTick");
});
```

```js
console.log("1. 同步代码开始");

// 宏任务1
setTimeout(() => {
  console.log("8. setTimeout 回调 (宏任务1)");

  // 在宏任务1中添加微任务
  Promise.resolve().then(() => {
    console.log("9. 宏任务1中的微任务");

    // 在微任务中添加新的微任务
    queueMicrotask(() => {
      console.log("10. 宏任务1中的微任务的微任务");
    });
  });
}, 0);

// 宏任务2
setTimeout(() => {
  console.log("11. setTimeout 回调 (宏任务2)");
}, 0);

// 微任务1
Promise.resolve().then(() => {
  console.log("4. Promise 回调 (微任务1)");

  // 在微任务1中添加新的微任务
  queueMicrotask(() => {
    console.log("6. 微任务1中的微任务");

    // 在嵌套微任务中添加宏任务
    setTimeout(() => {
      console.log("12. 嵌套微任务中添加的宏任务");
    }, 0);
  });
});

console.log("2. 同步代码继续");

// 微任务2
queueMicrotask(() => {
  console.log("5. queueMicrotask 回调 (微任务2)");
});

// 微任务3
Promise.resolve().then(() => {
  console.log("7. Promise 回调 (微任务3)");
});

console.log("3. 同步代码结束");
```
