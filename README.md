## DownLoad

- 方法一

```
git clone --recursive https://github.com/huing/blog.git
```

- 方法二

```
git clone https://github.com/huing/blog.git
git submodule init
git submodule update
```

### blog 用法

#### 新建博客

```
hugo new post/css/css值与单位.md
```

#### start the hugo server

```
cd blog
hugo server -D
```

#### build static pages

```
cd blog
hugo -D
```

#### publish

```
cd blog/public
git push
```
