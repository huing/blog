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
