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
