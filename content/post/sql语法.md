---
title: "Sql语法"
date: 2022-09-05T21:33:26+08:00
draft: false
categories: ["sql"]
author: "huing"
---

## 精确匹配 id

    SELECT * FROM menu WHERE id = 569;

## 模糊匹配

    SELECT * FROM menu WHERE path LIKE '%teacher%';

## 定义变量

    SET @path = 'teacher';
    SELECT * FROM menu WHERE path LIKE CONCAT('%', @path, '%');

## 连表查询

    SELECT a.id,a.NAME,b.num FROM classes a LEFT JOIN classes_detail b ON a.id=b.id WHERE a.id=2541;

## IS NULL

    SELECT * FROM classes WHERE person_avg IS NULL;

## 把查询到的结果插入表中

    INSERT INTO menu
    SELECT * FROM menu_copy WHERE is_deleted = 0 GROUP BY name;

## 找到所有的菜单并插入菜单表

    INSERT INTO menu (
    SELECT*FROM menu_copy WHERE parent_id=0 AND is_deleted=0 UNION ALL
    SELECT*FROM menu_copy WHERE parent_id<> 0 AND is_deleted=0 GROUP BY NAME);

## 删除 name = 监控中心 并且 id != 389

    DELETE FROM menu WHERE name = '监控中心' AND id <> 389;

## 删除多条数据

    DELETE FROM menu WHERE id IN (
    SELECT id FROM (
    SELECT id FROM menu WHERE NAME='大区管理' AND id<> 391) AS t);

## 更新多条数据

    UPDATE menu
    SET parent_id=391 WHERE parent_id IN (
    SELECT id FROM (
    SELECT id FROM menu WHERE name='大区管理' AND id<> 391) AS t);
