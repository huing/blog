---
title: "typescript"
date: 2024-12-23T16:50:50+08:00
draft: false
tags: ["TypeScript"]
---

## 基础类型

### 布尔值（boolean）

可选类型 true/false

```ts
let booleanExample: boolean = false;
```

### 数字（number）

可选类型 number

```ts
let numberExample: number = 6;
```

### 字符串（string）

可选类型 string

```ts
let stringExample: string = "Demo";
let stringTemplate: string = `template${Demo}`;
```

### void

void 表示没有任何类型

```ts
function sayHi(): void {
  console.log("Hi!");
}
let nothing: void = undefined;
let unusable: void = null; // 不能将类型“null”分配给类型“void”
let num: void = 1; // Error: 不能将类型“number”分配给类型“void”
```

### null 和 undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。
然而，当你指定了 `strictNullChecks` `标记，null` 和 `undefined` 只能赋值给 `void` 和它们各自。 许在某处你想传入一个 `string` 或 `null` 或 `undefined，可以使用联合类型` `string | null | undefined`

### 特殊类型

#### any

任意类型

```ts
let demand: any;
```

#### unknown

unknown 类型和 any 都可以表示任何类型。区别是 any 类型的变量是可以进行任意进行赋值、实例化、函数执行等操作，但是 unknown 只允许赋值，不允许实例化、函数执行等操作

```ts
let demandOne: any;
let demandTwo: unknown;
demandOne = "Hello, Tuture"; // 可以的
demandTwo = "Hello, Ant Design"; // 可以的
demandOne.foo.bar(); // 可以的
demandTwo.foo.bar(); // 报错
```

#### never

never 表示永远不存在的值的类型，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。除了 never 本身以外，其他任何类型不能赋值给 never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

## 数组

```ts
const values: string[] = ["1", "2", "3"];
const values: Array<string> = ["1", "2", "3"];
// 多类型数组
const values: (string | number)[] = ["Apple", 2, "Orange", 3, 4, "Banana"];
values = ["Apple", 2, true]; // 不能将类型“boolean”分配给类型“string | number”

// 数组对象
const arr: { name: string; age: number }[] = [
  { name: "Alice", age: 27 },
  { name: "Bob", age: 28 },
  { name: "Carl", age: 29 },
];

// 接口形式声明数组对象
interface Person {
  name: string;
  age: number;
}
const arr2: Person[] = [
  { name: "Alice", age: 27 },
  { name: "Bob", age: 28 },
  { name: "Carl", age: 29 },
];

interface Array {
  [index: number]: any; // or 其他item类型
}
```

## 元组类型

元组允许定义数组的每一项的类型

```ts
const values: [string, number] = ["a", 2];
```

## 接口

它相当于类型中的 JS 对象，用于对函数、类等进行结构类型检查，所谓的结构类型检查，就是两个类型的结构一样，那么它们的类型就是兼容的，这在计算机科学的世界里也被称为 “鸭子类型”。

> 当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子

```ts
interface PostDataDTO {
  title: string;
  id: number;
  date: string;
  contentHtml: string;
}

const postData: PostDataDTO;
```

### 可选属性 ?

```ts
interface PostDataDTO {
  title: string;
  id: number;
  date?: string;
  contentHtml: string;
}
```

### 只读属性 readonly

```ts
interface PostDataDTO {
  title: string;
  readonly id: number;
  date?: string;
  contentHtml: string;
}

const postData: PostDataDTO = {
  id: 1,
  date: "2022-11-09",
  title: "Duck",
  contentHtml: "Duck Typing",
};

postData.date = "2022-11-10";
postData.id = 2; //  无法分配到 "id" ，因为它是只读属性。
```

### 多余属性

动态增加属性

```ts
interface PostDataDTO {
  title: string;
  readonly id: number;
  date?: string;
  contentHtml: string;
  [propName: string]: any;
}

const postData: PostDataDTO = {
  id: 1,
  date: "2022-11-09",
  title: "Duck",
  contentHtml: "Duck Typing",
};

postData.isDeleted = 1; // 不会报错
```

### 继承接口

```ts
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
// 一个接口可以继承多个接口
interface Square extends Shape, PenStroke {
  sideLength: number;
}
```

### 接口合并

接口是开放式的，它允许你使用接口来模仿 js 的可扩展性。但是合并的属性需要保持类型一致，函数会重载

```ts
interface Point {
  x: number;
  y: number;
  hasPoint(id: number): number;
}
interface Point {
  x: string; // 后续属性声明必须属于同一类型。属性“x”的类型必须为“number”，但此处却为类型“string”
  z: number;
  hasPoint(id: string): string;
}
class Crazy implements Point {
  x: number = 1;
  y: number = 1;
  z: number = 1;
  // https://stackoverflow.com/questions/52602528/typescript-interface-method-overload-doesnt-work
  hasPoint(id: string): string;
  hasPoint(id: number): number;
  hasPoint(id: unknown): unknown {
    if (typeof id === "string") {
      return "1";
    }
    if (typeof id === "number") {
      return 1;
    }
  }
}
const ponit: Crazy = new Crazy();
ponit.x;
ponit.y;
ponit.z;
ponit.hasPoint(1);
ponit.hasPoint("1");
```

## 枚举

### 基本语法

```ts
enum Continents {
  North_America,
  South_America,
}
// usage
const region = Continents.Africa;
```

### 数字枚举

```ts
enum Weekend {
  Friday,
  Saturday,
  Sunday,
}
```

### 计算枚举

```ts
enum Weekend {
  Friday = 1,
  Saturday = getDate("TGIF"),
  Sunday = Saturday * 40,
  Thursday = 4,
}
function getDate(day: string): number {
  if (day === "TGIF") {
    return 3;
  }
}
Weekend.Saturday; // returns 3
Weekend.Sunday; // returns 120
```

### 字符串枚举

```ts
enum Weekend {
  Friday = "FRIDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
}
const value = someString as Weekend;
if (value === Weekend.Friday || value === Weekend.Sunday) {
  console.log("You choose a weekend");
  console.log(value);
}
```

### 异构枚举

```ts
enum Weekend {
  Friday = "FRIDAY",
  Saturday = 1,
  Sunday = 2,
}
```

### 反向映射

```ts
enum Weekend {
  Friday = 1,
  Saturday,
  Sunday
}
// console.log(Weekend);
{
  '1': 'Friday',
  '2': 'Saturday',
  '3': 'Sunday',
  Friday: 1,
  Saturday: 2,
  Sunday: 3
}
Weekend[1] // Friday
Weekend['Friday'] // 1
```

## 函数

### 注解函数

```ts
function greet(person: string): string {
  return `Hello, ${person}!`;
}
```

### 变量类型

```ts
const add: (x: number, y: number) => number = function (x, y) {
  return x + y;
};

const add = (x: number, y: number): number => {
  return x + y;
};
```

### 可选参数

```ts
function add(x: number, y?: number): number {
  return x + (y || 0);
}
```

### 默认参数

```ts
function add(x: number, y: number = 10): number {
  return x + y;
}
add(1);
```

### 函数重载

1. 用联合类型声明

```ts
function greet(person: string | string[]): string | string[] {
  if (typeof person === "string") {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map((name) => `Hello, ${name}!`);
  }
  throw new Error("Unable to greet");
}
greet("World"); // 'Hello, World!'
greet(["Jane", "Joe"]); // ['Hello, Jane!', 'Hello, Joe!']
```

此种方法缺点是函数提示不明显，输入字符串时明确返回值是 `string` 类型，但编译器依然提示 `string | stirng[]`

2. 函数重载 Overloads

```ts
// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature
function greet(person: unknown): unknown {
  if (typeof person === "string") {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map((name) => `Hello, ${name}!`);
  }
  throw new Error("Unable to greet");
}

greet("World"); // 'Hello, World!'
greet(["Jane", "Joe"]); // ['Hello, Jane!', 'Hello, Joe!']
const someValue: unknown = "Unknown";
greet(someValue); // 报错
```

此时调用函数能看到明确的语法提示

变量声明 `unknown` 依然会报错，因为只有重载签名是可调用的，虽然实现签名实现了函数行为，但它不能直接调用。

3. 类型别名声明函数重载

```ts
interface Data {
  postalCodes: string[];
  country: string;
}
const data: Data = {
  postalCodes: ["123", "422"],
  country: "PL",
};
type GetData = {
  (data: Data, key: "postalCodes"): string[];
  (data: Data, key: "country"): string;
};
const getData: GetData = (data, key): any => {
  return data[key];
};
const postalCodesRetrieved: string[] = getData(data, "postalCodes");
const counryRetrieved: string = getData(data, "country");
```

### 方法重载

```ts
class Greeter {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  // Overload signatures
  greet(person: string): string;
  greet(persons: string[]): string[];

  // Implementation signature
  greet(person: unknown): unknown {
    if (typeof person === "string") {
      return `${this.message}, ${person}!`;
    } else if (Array.isArray(person)) {
      return person.map((name) => `${this.message}, ${name}!`);
    }
    throw new Error("Unable to greet");
  }
}

const hi = new Greeter("Hi");
hi.greet("Angela"); // 'Hi, Angela!'
hi.greet(["Pam", "Jim"]); // ['Hi, Pam!', 'Hi, Jim!']
```

## 交叉类型 `&`

交叉类型就是多个类型通过 `&` 类型运算符，合并成一个类型，这个类型包含了多个类型中的所有类型成员

```ts
interface A {
  name: string;
  age: number;
}
interface B {
  name: number;
  id: string;
}
type Union = A & B;
const unionObj = {} as Union;
unionObj.name = "xixi"; // name: never。 不能将类型“string”分配给类型“never”
unionObj.id = "2"; // string
unionObj.age = 20; // number
```

## 联合类型 `|`

联合类型是通过操作符 `|` 将多个类型进行联合，组成一个复合类型，当用这个复合类型注解一个变量的时候，这个变量可以取这个复合类型中的任意一个类型，但是最终只能取一个类型

```ts
interface A {
  name: string;
  age: number;
}
interface B {
  name: number;
  id: string;
}
type Union = A | B;
const unionObj = {} as Union;
unionObj.name = "xixi"; // string | number
unionObj.id = "2"; // 类型“Union”上不存在属性“id”。类型“A”上不存在属性“id”
unionObj.age = 20; // 类型“Union”上不存在属性“age”。类型“B”上不存在属性“age”
```

## 类型断言

### <>

```ts
interface Foo {
  bar: number;
  bas: string;
}
const foo = <Foo>{};
foo.bar = 1;

let defaultBar: any;
let bar = <string>defaultBar; // 现在 bar 的类型是 'string'
```

### as 推荐用法

```ts
interface Foo {
  bar: number;
  bas: string;
}
const foo = {} as Foo;
foo.bar = 123;
```

### 双重断言

```ts
function handler(event: Event) {
  const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}
function handler(event: Event) {
  const element = event as any as HTMLElement; // ok
}
```

## 字面量类型

字面量是 TS 类型系统里面最小的类型，就像 JS 里面的数字 1，它不可能再拆成更小的部分了

### 数字字面量

```ts
let age: 20;
age = 30; // 不能将类型“30”分配给类型“20”
```

### 字符串字面量

```ts
let age: "20";
age = "30"; // 不能将类型“"30"”分配给类型“"20"”。
```

字面量用途

- 实现枚举 联合类型+字面量类型

```ts
osType: "Linux" | "Mac" | "Windows";
```

- 实现类型守卫

## 类型守卫

TS 在遇到一些些条件语句时，会在语句的块级作用域内「收紧」变量的类型，这种类型推断的行为称作类型守卫 (Type Guard)

### 字面量相等判断 ==, !=, ===, !==

```ts
type Foo = "foo" | "bar" | "unknown";

function test(input: Foo) {
  if (input != "unknown") {
    // 这里 input 的类型「收紧」为 'foo' | 'bar'
  } else {
    // 这里 input 的类型「收紧」为 'unknown'
  }
}
```

### instanceof

```ts
class Foo {}
class Bar {}
function test(input: Foo | Bar) {
  if (input instanceof Foo) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Bar
  }
}
```

### in

```ts
interface Foo {
  foo: string;
}
interface Bar {
  bar: string;
}
function test(input: Foo | Bar) {
  if ("foo" in input) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Bar
  }
}
```

### typeof

```ts
function StudentId(x: string | number) {
  if (typeof x == "string") {
    console.log("Student");
  }
  if (typeof x === "number") {
    console.log("Id");
  }
}
StudentId(`446`); // Student
StudentId(446); // Id
```

### 自定义类型守卫

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
// | 联合类型
function getSmallPet(): Fish | Bird {
  return {
    swim: () => {},
  };
}
// 类型谓词 is
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
let pet = getSmallPet();
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

自定义类型守卫的意义是当我们需要明确返回值类型时可以用，如果去掉 `pet is Fish` ，`isFish` 的结果仅为 `boolean`，但我们需要明确的类型提示

## 类型别名

语法

```ts
type Params = number;

type Params = string | (() => string);

type Params2 = {
  name: string;
  age: number;
};

type Params = {
  name: string;
  favorite: string;
} & Params2;

type Weekend = "Friday" | "Saturday" | "Sunday";
const week: Weekend;
```

## 类

- 类可以拿来进行类型注解
- 类的实例都可以用类名来注解

```ts
class Animal {
  name: string | undefined;
  static isAnimal(a: Animal): boolean {
    return a instanceof Animal;
  }
  constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
```

### 访问限定符

#### public 公共的

```ts
class Animal {
  public name: string | undefined;
  public constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
const bird = new Animal("Tuture");
bird.move(520);
bird.name;
```

#### protected 受保护的

```ts
class Animal {
  protected name: string | undefined;
  public constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
const bird = new Animal("Tuture");
bird.move(520);
bird.name; // 属性“name”受保护，只能在类“Animal”及其子类中访问
```

#### private 私有的

```ts
class Animal {
  private name: string | undefined;
  public constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
const bird = new Animal("Tuture");
bird.move(520);
// 编译器不会提示name属性
bird.name; //属性“name”为私有属性，只能在类“Animal”中访问。
```

#### readonly 只读属性

```ts
class Animal {
  public name: string = "Tuture";
  readonly defautlDistance: number = 20;
  public constructor(name: string) {
    this.name = name;
  }
  move(distance?: number) {
    console.log(`${this.name} moved ${distance || this.defautlDistance}m.`);
  }
}
const bird = new Animal("Tuture");
bird.move();
bird.defautlDistance = 30; // 无法分配到 "defautlDistance" ，因为它是只读属性
```

#### 抽象类

```ts
// 抽象类
abstract class Animal {
  // 抽象方法
  abstract makeSound(): void;
  move(): void {
    console.log("Roaming the earth...");
  }
}
const bird = new Animal(); // 无法创建抽象类的实例
```

抽象类只可以被继承，不可以被实例化

继承抽象类必须实现抽象类中的抽象方法

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("Roaming the earth...");
  }
}
class Bird extends Animal {
  makeSound(): void {
    console.log("Tuture tuture tuture.");
  }
}
```

## 类与接口

### 类实现接口

```ts
// 报警器接口
interface Alarm {
  alert(): void;
}
// 灯开关接口
interface Light {
  lightOn(): void;
  lightOff(): void;
}
// 一个类可以实现多个接口
class Car implements Alarm, Light {
  alert() {
    console.log("Car alarm");
  }
  lightOn() {
    console.log("Car lighton");
  }
  lightOff() {
    console.log("Car lightoff");
  }
}
```

类必须实现接口中的所有属性和方法

```ts
interface Point {
  x: number;
  y: number;
  z: number;
}
// 类“MyPoint”错误实现接口“Point”。
// 类型 "MyPoint" 中缺少属性 "z"，但类型 "Point" 中需要该属性。
class MyPoint implements Point {
  // ERROR : missing member `z`
  x: number;
  y: number;
}
// 类型 "MyPoint" 中缺少属性 "z"，但类型 "Point" 中需要该属性
let foo: Point = new MyPoint();
```

### 接口继承类

```ts
class Point {
  x: number | undefined;
  y: number | undefined;
}

interface Point3d extends Point {
  z: number;
}
```

### 类作为接口使用

```ts
class TodoInputProps {
  value: string = "tuture";
  onChange(value: string) {
    console.log("Hello Tuture");
  }
}
interface TodoInputState {
  content: string;
  user: string;
  date: string;
}
// React.Component<TodoInputProps, TodoInputState> 泛型用法
class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  // 用类注解变量
  static defaultProps: TodoInputProps = new TodoInputProps();
  // 类注解类
  // const TodoInputPropsAlias: typeof TodoInputProps = TodoInputProps
  render() {
    return <div>Hello World</div>;
  }
}
```

## 泛型

### 基本语法

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// 编译器自动推断类型
createArray(10, true);
// function createArray<boolean>(length: number, value: boolean): boolean[]
createArray(10, 1);
// function createArray<number>(length: number, value: number): number[]
createArray(10, "1");
// function createArray<string>(length: number, value: string): string[]
```

### 箭头函数范型

```ts
const createArray = <T>(length: number, value: T): Array<T> => {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

const deleteArray = <T extends { id: number }>(arr: T[], value: any): T[] => {
  return arr.filter((val: T) => val.id != value);
};
```

### 类泛型

```ts
// eg1:
class Todo<T> {
  title: T[] | undefined;
}
let todo = new Todo<string>();
todo.title = ["第一篇", "第二篇"];

// eg:2 创建一个泛型类
class Queue<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // Error：类型“string”的参数不能赋给类型“number”的参数。
```

### 接口泛型

```ts
interface Todo<T> {
  title: string;
  content: string;
  time: T;
}
const todo: Todo<string>;
todo.time; // string
```

### 类型别名泛型

```ts
type Todo<T> = {
  title: string;
  content: string;
  time: T;
};
const todo: Todo<string>;
todo.time;
```

### 泛型约束

```ts
type Todo<T> = {
  title: string;
  content: string;
  time: T;
};
type Author = {
  nickName: string;
  penName: string;
};
// 用 Todo<string> & Author 约束 U
function todoList<T, U extends Todo<string> & Author>(
  info: T[],
  profile: U
): T[] {
  info.length;
  profile.nickName;
  return info;
}
```

### 注解构造函数

```ts
class Profile<T> {
  username!: string;
  nickName!: string;
  avatar!: string;
  age!: T;
}
class TutureProfile extends Profile<string> {
  github!: string;
  remote!: string[];
}
interface ConstructorFunction<C> {
  new (): C;
}
function createInstance<A extends Profile<string>>(B: ConstructorFunction<A>) {
  return new B();
}
// function createInstance<TutureProfile>(B: ConstructorFunction<TutureProfile>): TutureProfile
const myTutureProfile = createInstance(TutureProfile);
```

## extends 条件类型

类型匹配

```ts
type IsNumber<T, U> = T extends U ? number : string;

type Num = IsNumber<1, number>; // number;
type Str = IsNumber<"1", number>; // string;
```

联合类型 A 的所有子类型，在联合类型 B 中存在，则条件满足

```ts
type AB<T, U> = T extends U ? "a" : "b";

type A = AB<"x", "x" | "y">; // 确定条件，结果是 'a'
// type A = 'a'
```

**当条件类型不确定时会返回所有的值， 即分配条件类型（Distributive Conditional Types）**

```ts
type AB<T, U> = T extends U ? "a" : "b";

type All = AB<"x" | "y", "x">; // 非确定条件，可能是 'x' 或 'y'
// type All = 'a' | 'b'
```

```ts
type Merge2<T, U> = T extends U ? T : "a";
type Values2 = Merge2<"x" | "y", "x">;
// type Values2 = "a" | "x"

type Merge3<T, U> = T extends U ? "a" : T;
type Values3 = Merge3<"x" | "y", "x">;
// type Values3 = "a" | "y"
```

## 工具

[请参考官网](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Partial 可选

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
// eg:
interface Todo {
  title: string;
  description: string;
}
type TodoPreview = Partial<Todo>;
const todo: TodoPreview = {
  title: "Clean room",
};
```

### Required 必需

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
// eg:
interface Todo {
  title?: string;
  description?: string;
}
type TodoPreview = Required<Todo>;
const todo: TodoPreview = {
  title: "Clean room",
};
// 类型“{ title: string; }”缺少类型“Required<Todo>”中的以下属性: description
```

### Readonly 只读

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
// eg:
interface Todo {
  title: string;
}
type TodoPreview = Readonly<Todo>;
const todo: TodoPreview = {
  title: "Clean room",
};
todo.title = "Hello"; // 无法分配到 "title" ，因为它是只读属性。
```

### Pick 挑选

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// eg:
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### Record 记录

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
// eg:
interface Todo {
  title: string;
  description: string;
}
type TodoName = "今天" | "明天";
type TodoPreview = Record<TodoName, Todo>;
const todo: TodoPreview = {
  今天: { title: "大雨", description: "哗啦啦" },
  明天: { title: "大雨", description: "哗啦啦" },
};
todo.今天.title;
```

### Exclude 排除

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
// eg:
type T0 = Exclude<"a" | "b" | "c" | "d", "b" | "c">;
// "a" | "d"
```

### Extract 提取

```ts
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
// eg:
type T0 = Extract<"a" | "b" | "c" | "d", "b" | "c">;
// type T0 = "b" | "c"
```

### Omit 忽略

```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// eg:
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
};
```

### ReturnType 返回类型

```ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
// eg:
type T0 = ReturnType<() => string>;
// string
type T1 = ReturnType<(s: string) => void>;
// void
```

## 常量断言

### 数组转 type

```ts
const animals = ["cat", "dog", "mouse"] as const;
// const animals: readonly ['cat', 'dog', 'mouse']

type Animal = (typeof animals)[number];
// type Animal = 'cat' | 'dog' | 'mouse'
```

### 数组对象转 type

```ts
const animals = [
  { species: "cat", name: "Fluffy" },
  { species: "dog", name: "Fido" },
  { species: "mouse", name: "Trevor" },
] as const;

type Animal = (typeof animals)[number]["species"];
// type Animal = "cat" | "dog" | "mouse"
```

### 对象转 type

取 key

```ts
const animals = { 1: "cat", 2: "dog", 3: "mouse" } as const;
type animal = keyof typeof animals;
```

取 value

```ts
const animals = {
  1: { name: "cat" },
  2: { name: "dog" },
  3: { name: "mouse" },
} as const;
type key = keyof typeof animals;
type value = (typeof animals)[key]["name"];
```

## const 常量断言用法

索引访问类型 Indexed Access Types

常量断言 const assertions

### 数组转 type

```js
const animals = ['cat', 'dog', 'mouse'] as const
// const animals: readonly ['cat', 'dog', 'mouse']

type Animal = typeof animals[number]
// type Animal = 'cat' | 'dog' | 'mouse'
```

### 数组对象转 type

```js
const animals = [
  { species: 'cat', name: 'Fluffy' },
  { species: 'dog', name: 'Fido' },
  { species: 'mouse', name: 'Trevor' }
] as const

type Animal = (typeof animals)[number]["species"];
// type Animal = "cat" | "dog" | "mouse"
```

### 对象转 type

取 key

```js
const animals = {1: 'cat', 2: 'dog', 3: 'mouse' } as const
type animal = keyof typeof animals
```

取 value

```js
const animals = {1: {name: 'cat'}, 2: {name: 'dog'}, 3: {name: 'mouse'} } as const
type key = keyof typeof animals
type value = typeof animals[key]['name']
```

### 泛型参数的默认类型

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```

```typescript
map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
```

### is 类型谓词 type predicates

### as 类型断言 type assertions

```js
type Fish = { swim: () => void };
type Bird = { fly: () => void };

// | 联合类型
declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

### 应用

```js

export const isNumber = (value?: any): value is number => {
  // or typeof value === "number" && Number.isFinite(value)
  return typeof value === "number" && !Number.isNaN(value);
};

export const isString = (value?: any): value is string => {
  return typeof value === "string";
};
```
