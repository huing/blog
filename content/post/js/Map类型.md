---
title: "Mapç±»å"
date: 2022-06-16T23:20:39+08:00
lastmod: 2022-06-16T23:20:39+08:00
draft: false
keywords: []
description: ""
tags: ["javascript", "js"]
categories: []
author: "huing"
---

### Map

```js
// â Initialize Map from Array
// ðï¸ const map1: Map<string, string>
const map1: Map<string, string> = new Map([
  ['name', 'Tom'],
  ['country', 'Chile'],
]);

// ðï¸ {'name' => 'Tom', 'country' => 'Chile'}
console.log(map1);

// â Initialize Map from Object
const obj = { name: 'Tom', country: 'Chile' };
const map2 = new Map<string, string>(Object.entries(obj));

// ðï¸ {'name' => 'Tom', 'country' => 'Chile'}
console.log(map2);
```

### objects vs maps

|          |                  Map                   |                          Object |
| -------- | :------------------------------------: | ------------------------------: |
| æå¤çé® |             æ¾å¼æå¥çé®ã             |                  ååé¾ä¸çé®å |
| é®çç±»å | ä»»æå¼ï¼åæ¬å½æ°ãå¯¹è±¡æä»»æåºæ¬ç±»åã | å¿é¡»æ¯ä¸ä¸ª String ææ¯ Symbolã |
