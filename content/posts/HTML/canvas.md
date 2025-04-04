---
title: "Canvas"
date: 2025-03-23T11:53:04+08:00
draft: false
tags: ["HTML"]
---

## Canvas 基础概念

Canvas 是 HTML5 提供的用于在网页上绘制图形的元素。它可以用于绘制图表、制作图片合成或者实现基础的动画效果。

### 基本用法

1. 创建 Canvas 元素
2. 获取绘图上下文(Context)
3. 使用 Canvas API 进行绘制

### 常见绘图操作

- 绘制形状(矩形、圆形、路径等)
- 添加颜色和样式
- 绘制文本
- 图片操作
- 变换(平移、旋转、缩放)

### Canvas API 实例

#### 1. 基础图形绘制

```javascript
// 获取Canvas上下文
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 绘制矩形
ctx.fillStyle = "red"; // 设置填充颜色
ctx.fillRect(10, 10, 100, 50); // x, y, width, height

// 绘制圆形
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2); // x, y, 半径, 起始角度, 结束角度
ctx.fillStyle = "blue";
ctx.fill();
```

#### 2. 绘制路径

```javascript
// 绘制三角形
ctx.beginPath();
ctx.moveTo(50, 50); // 起点
ctx.lineTo(150, 50); // 第二点
ctx.lineTo(100, 150); // 第三点
ctx.closePath(); // 闭合路径
ctx.fillStyle = "green";
ctx.fill();
```

#### 3. 文本绘制

```javascript
// 设置文本样式
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Hello Canvas!", 150, 100);

// 带描边的文本
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.strokeText("Outlined Text", 150, 150);
```

#### 4. 图片处理

```javascript
const img = new Image();
img.src = "path/to/image.jpg";
img.onload = () => {
  // 绘制图片
  ctx.drawImage(img, 0, 0);

  // 缩放绘制
  ctx.drawImage(img, 0, 0, 200, 100);

  // 裁剪绘制
  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight
  );
};
```

#### 5. 动画效果

```javascript
let x = 0;
function animate() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制移动的矩形
  ctx.fillStyle = "purple";
  ctx.fillRect(x, 50, 50, 50);

  // 更新位置
  x = (x + 2) % canvas.width;

  // 请求下一帧
  requestAnimationFrame(animate);
}

animate();
```

#### 6. 渐变效果

```javascript
// 线性渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.5, "green");
gradient.addColorStop(1, "blue");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 100);

// 径向渐变
const radialGradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 50);
radialGradient.addColorStop(0, "white");
radialGradient.addColorStop(1, "black");

ctx.fillStyle = radialGradient;
ctx.fillRect(50, 50, 100, 100);
```

#### 7. 变换操作

```javascript
// 保存当前状态
ctx.save();

// 平移
ctx.translate(100, 100);

// 旋转 (弧度)
ctx.rotate(Math.PI / 4);

// 缩放
ctx.scale(2, 2);

// 绘制
ctx.fillStyle = "orange";
ctx.fillRect(-25, -25, 50, 50);

// 恢复之前的状态
ctx.restore();
```

### 完整示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Canvas Demo</title>
    <style>
      canvas {
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="400" height="300"></canvas>
    <script>
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");

      // 这里可以放入上述任意示例代码

      // 示例: 绘制一个简单的场景
      // 背景
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, 400, 300);

      // 太阳
      ctx.beginPath();
      ctx.arc(350, 50, 30, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();

      // 草地
      ctx.fillStyle = "#90EE90";
      ctx.fillRect(0, 200, 400, 100);

      // 房子
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(100, 150, 80, 80);

      // 屋顶
      ctx.beginPath();
      ctx.moveTo(90, 150);
      ctx.lineTo(140, 100);
      ctx.lineTo(190, 150);
      ctx.fillStyle = "#A52A2A";
      ctx.fill();
    </script>
  </body>
</html>
```

## WebGL 进阶

WebGL 是基于 OpenGL ES 的 3D 绘图标准,能在 Canvas 中实现硬件加速的 3D 渲染。

### WebGL 特点

- 底层图形 API
- 支持 3D 渲染
- 硬件加速
- 着色器编程

## 实际应用案例

### 飞书表格的实现原理

在线表格应用(如飞书表格)使用 Canvas 的优势:

- 高性能渲染大量单元格
- 自定义绘制和样式
- 优化滚动和缩放
- 内存管理

## 性能优化

### 提升 Canvas 性能的关键点

1. 批量绘制操作
2. 使用 requestAnimationFrame
3. 离屏渲染(Off-screen Canvas)
4. 图层分离
5. 避免不必要的状态改变
6. 合理使用缓存

### 性能监控

- FPS 监测
- 内存占用
- 渲染时间

## Canvas 与 WebGL 结合使用

Canvas 和 WebGL 可以在同一个页面中协同工作，下面是一个结合示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Canvas + WebGL Demo</title>
    <style>
      .canvas-container {
        display: flex;
        gap: 20px;
      }
      canvas {
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <div class="canvas-container">
      <canvas id="canvas2D" width="400" height="300"></canvas>
      <canvas id="canvasWebGL" width="400" height="300"></canvas>
    </div>
    <script>
      // 2D Canvas 部分
      const canvas2D = document.getElementById("canvas2D");
      const ctx2D = canvas2D.getContext("2d");

      // 绘制2D动画
      function draw2D(time) {
        ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);

        // 绘制旋转的方块
        ctx2D.save();
        ctx2D.translate(200, 150);
        ctx2D.rotate(time * 0.001);
        ctx2D.fillStyle = "blue";
        ctx2D.fillRect(-50, -50, 100, 100);
        ctx2D.restore();

        requestAnimationFrame(draw2D);
      }

      // WebGL 部分
      const canvasGL = document.getElementById("canvasWebGL");
      const gl = canvasGL.getContext("webgl");

      // 顶点着色器程序
      const vertexShaderSource = `
            attribute vec4 aVertexPosition;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            void main() {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            }
        `;

      // 片段着色器程序
      const fragmentShaderSource = `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;

      // 创建着色器程序
      function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      }

      // 初始化着色器程序
      const vertexShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
      );
      const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
      );

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // 创建缓冲区
      const positions = [
        -0.5,
        0.5,
        0.0, // 左上
        0.5,
        0.5,
        0.0, // 右上
        0.5,
        -0.5,
        0.0, // 右下
        -0.5,
        -0.5,
        0.0, // 左下
      ];

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      // 渲染WebGL场景
      function drawWebGL(time) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(shaderProgram);

        const vertexPosition = gl.getAttribLocation(
          shaderProgram,
          "aVertexPosition"
        );
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPosition);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        requestAnimationFrame(drawWebGL);
      }

      // 启动动画
      draw2D(0);
      drawWebGL(0);
    </script>
  </body>
</html>
```

这个示例展示了：

1. **2D Canvas 部分**

- 创建一个旋转的蓝色方块
- 使用基础的 2D 变换和动画

2. **WebGL 部分**

- 创建一个红色的矩形
- 使用基础的着色器程序
- 实现 WebGL 基本渲染流程

3. **结合要点**

- 使用两个独立的 canvas 元素
- 分别初始化 2D 和 WebGL 上下文
- 独立的动画循环
- 同步渲染

### 使用场景

Canvas 和 WebGL 结合使用的常见场景：

1. **混合渲染**

- 2D UI 元素使用 Canvas
- 3D 场景使用 WebGL
- 提高特定场景的性能

2. **性能优化**

- 简单 2D 图形用 Canvas
- 复杂 3D 效果用 WebGL
- 根据设备性能动态切换

3. **特效叠加**

- WebGL 渲染主场景
- Canvas 绘制 UI 覆盖层
- 实现复杂的视觉效果

### 注意事项

1. **上下文切换**

- 避免频繁切换上下文
- 合理规划渲染层级

2. **性能考虑**

- 注意内存使用
- 优化渲染循环
- 考虑设备兼容性

3. **调试方法**

- 使用浏览器开发工具
- 监控 FPS 和内存
- 分析性能瓶颈
