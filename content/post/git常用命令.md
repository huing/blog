---
title: "Git常用命令"
date: 2022-06-15T10:11:31+08:00
draft: false
tags: ["git"]
author: "huing"
---

git log --pretty=oneline --graph

git reflog 记录命令历史

git checkout

```
git checkout --readme.text 丢弃工作区修改
git checkout -b dev 创建并切换到dev分支
git checkout -b dev origin/dev 创建远程origin的dev分支到本地
```

git branch

```
git branch --set-upstream-to=origin/dev dev 链接远程分支
git branch -a 查看所有分支
git branch -d dev 删除分支
```

git merge dev 合并分支

```
git merge --no-ff dev 在 dev 分支上生成一个新节点
git merge --no-ff -m "merge with no-ff" dev
git merge --squash dev (git commit)
```

git stash 存储工作区内容

```
git stash list 查看列表
git stash apply 只弹出不删除
git stash pop 弹出并删除（不存在冲突的情况下）
```

git fetch

```
git fetch --all
git fetch origin --prune 同步删除的分支
```

git pull

```
git pull --rebase origin master
git pull -p 删除已经不存在的远程分支
```

git push (-u) origin master
git push origin --tags --force
git push origin --all --force
git push origin --delete feature 删除远程分支

git commit

```
git commit -m "do what" 提交文件到仓库
git commit --amend 修改注释
```

git init 这个目录变成 Git 可以管理的仓库
git add file.txt 把文件添加到仓库
git status 查看当前仓库状态
git diff file.txt 查看不同

git reset head file.txt
把暂存区的修改撤销，重新放回工作区
git reset --hard HEAD^
删除工作空间改动代码,撤销 commit,撤销 git add .
git reset --soft HEAD^
不删除工作空间改动代码,撤销 commit,不撤销 git add .
git reset --mixed HEAD^
不删除工作空间改动代码,撤销 commit,并且撤销 git add . 默认参数

git remote add origin git@github.com:username/repname.git
git remote -v 查看地址
git remote remove origin
git remote rename <old> <new>
git remote show origin

cat file.txt 查看文件内容

git rm file.txt 删除版本库文件
git rm 停止追踪指定文件，但该文件会保留在工作区
git rm -r --cached dir
git rm --cached file

git tag 打标签
git tag tagname
git tag tagname commitId
git tag --delete tagname

### git flow 工作流程

git flow init

feature

```
git flow feature start 1.0.0 从develop开始一个新分支
git flow feature publish 1.0.0 推送分支
git flow feature finish 1.0.0 把feature合到develop

```

release

```
git flow release start 1.0.0 从develop开始一个新分支
git flow release finish 1.0.0 把release合到develop，把release合到master
```

hotfix 分支

```
git flow hotfix start 1.0.0
git flow hotfix finish 1.0.0
```

工作结束推送分支到远程

```
git push origin --tags
git push master
git push develop
```

### git cherry-pick

场景：
a、代码敲完后发现写错分支了，本应该在分支 A 的误写在了 B 分支！
b、有些 commit 不希望在本次版本中发布
操作：
1、git log 先在 B 分支找到那个 commit，复制出 commitID
2、git checkout A 切换到 A 分支
3、git cherry-pick commitID 把 B 分支上的 commitID 合并过来
4、git reset —hard commitID 回到 B 分支把写错地方的 commitID 删除掉

### git rebase

场景：删除 commit 记录中的某一条，比如从早到现在 A、B、C 三条记录，删除 B 又不影响 C
操作：
1、 git log 找到 A 的 commitID
2、git rebase -i <A-commitID> 回退到 A
3、编辑将需要删除的行，前面的 pick 改为 drop。保存并退出
4、至此本地仓库已生效，如果需要同步远程仓库，执行 git push -f origin <BranchName>进行远程强制更新

---

# 查看存储库中的大文件

$ git rev-list --objects --all | grep -E `git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10 | awk '{print$1}' | sed ':a;N;$!ba;s/\n/|/g'`

# 改写历史，去除大文件

$ git filter-branch --tree-filter 'rm -f path/to/large/files' --tag-name-filter cat -- --all
$ git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch path-to-your-remove-file' --prune-empty --tag-name-filter cat -- --all

---
