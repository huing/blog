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
