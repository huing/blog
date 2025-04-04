---
title: "如何把xmind转成md"
date: 2024-12-04T16:14:19+08:00
draft: false
---

## 创建 `index.cjs` 文件

```javascript
const fs = require("fs");
const path = require("path");

/**
 * 递归遍历节点
 */
function jsonToMarkdown(topic, level = 1) {
  if (!topic) return "";
  let markdown = "";

  // 添加标题
  markdown += `${"#".repeat(level)} ${topic.title}\n\n`;

  // 添加笔记
  if (topic.notes?.plain.content) {
    markdown += `> ${topic.notes.plain.content}\n\n`;
  }

  // 添加标签
  if (topic.labels && topic.labels.length > 0) {
    markdown += `**Labels:** ${topic.labels.join(", ")}\n\n`;
  }

  // 添加样式（简化处理）
  if (topic.style?.properties["fo:font-style"] === "italic") {
    markdown = markdown.replace(topic.title, `*${topic.title}*`);
  }
  if (topic.style?.properties["fo:font-weight"] === "700") {
    markdown = markdown.replace(topic.title, `**${topic.title}**`);
  }

  // 递归添加子主题
  if (topic.children?.attached) {
    for (const child of topic.children.attached) {
      markdown += jsonToMarkdown(child, level + 1);
    }
  }

  // 递归添加总结
  if (topic.children?.summary) {
    for (const summary of topic.children.summary) {
      markdown += jsonToMarkdown(summary, level + 1);
    }
  }

  return markdown;
}

function entry() {
  const filename = process.argv[2].replace(".xmind", "");
  const outputPath = `${filename}.md`;

  try {
    const filePath = path.join(__dirname, "/zip/content.json");

    // 添加文件存在检查
    if (!fs.existsSync(filePath)) {
      throw new Error("找不到解压后的 content.json 文件");
    }

    const buffer = fs.readFileSync(filePath);
    const contentJsonArray = JSON.parse(buffer.toString("utf8"));

    let content = "";
    for (const contentJson of contentJsonArray) {
      content += jsonToMarkdown(contentJson.rootTopic, 1);
    }

    fs.writeFileSync(outputPath, content);

    console.log(`转换完成，已生成 ${outputPath}`);
  } catch (error) {
    console.error("转换过程中出错:", error.message);
    process.exit(1);
  }
}

entry();
```

## 创建文件 `index.sh` 文件

```bash
#!/bin/bash
xmind_file=$1

# 检查是否提供了文件参数
if [ -z "$xmind_file" ]; then
    echo "错误: 请提供 xmind 文件路径"
    exit 1
fi

# 确保 zip 目录存在
mkdir -p "$(pwd)/zip"

echo "开始处理文件: $xmind_file"

tar -xvf $xmind_file -C "$(pwd)/zip" && node index.cjs $xmind_file
```

## 执行 sh 脚本

```bash
./index.sh test.xmind
```

## 运行结果

1. xmind 文件会解压到 zip 目录下
2. 在同一目录下输出 test.md 文件
