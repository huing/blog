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