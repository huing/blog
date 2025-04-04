---
title: "Ref实现父组件调用子组件方法"
date: 2022-09-04T10:30:23+08:00
draft: false
categories: ["ts", "react", "css", "js"]
---

### Ref 实现父组件调用子组件方法

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- `你不能在函数组件上使用 ref 属性`，因为他们没有实例。

#### 构造组件

createRef 仅能用在 ClassComponent

```js
class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    // 为 DOM 元素添加 ref
    this.textInput = React.createRef();
    this.doSomething = this.doSomething.bind(this);
  }
  doSomething() {
    // this.textInput.current.focus()
  }
  render() {
    return <input type="text" ref={this.textInput} />;
  }
}
class ParentInput extends React.Component {
  constructor(props) {
    super(props);
    // 为 class 组件添加 Ref
    this.textInput = React.createRef();
  }
  componentDidMount() {
    // this.textInput.current.doSomething()
    console.log(this.textInput.current);
  }
  render() {
    return <CustomInput ref={this.textInput} />;
  }
}
```

#### 函数组件

useRef 仅能用在 FunctionComponent

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  // 使用 ref 时自定义暴露给父组件的实例值
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    doSomething: () => {
      console.log("doSomething");
    },
  }));
  return <input ref={inputRef} />;
}
// forwardRef 会创建一个React组件
const ChildInput = forwardRef(FancyInput);

function ParentInput() {
  const inputRef = useRef();
  useEffect(() => {
    console.log(inputRef.current);
  }, [inputRef.current]);
  return <ChildInput ref={inputRef} />;
}
```

### 子组件调用父组件方法

```js
function ChildButton(props) {
  return <button onClick={props.doSomething}>点击</button>;
}
function ParentButton() {
  const doSomething = () => {
    console.log("doSomething");
  };
  return <ChildButton doSomething={doSomething} />;
}
export default ParentButton;
```
