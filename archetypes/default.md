---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
author: "{{ .Site.Params.author }}"
draft: false
tags:
  - "{{ replace (trim (path.Dir .File.Dir) "content/") "/" "" }}"
language: "zh"                            # 指定语言
toc: true                                 # 是否显示目录（PaperMod 支持）
meta: true                                # 是否显示元信息（PaperMod 支持）
---
