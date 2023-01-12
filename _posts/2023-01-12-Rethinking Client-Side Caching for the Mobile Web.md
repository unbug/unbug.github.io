---
layout: post
title:  "一分钟读论文：《重新思考移动客⼾端的网页缓存》"
author: unbug
categories: [ Performance, MobileWeb ]
image: assets/images/screenshot-20230112-185611.jpg
---
最高约`49%`的 JS 运算可以在网页上重用。美国密歇根⼤学和加州⼤学洛杉矶分校的论文[《Rethinking Client-Side Caching for the Mobile Web》][paper1-url] 提出了一个新的客户端缓存架构，该架构主张直接`缓存运行时的 JS`。

![arch]({{ site.baseurl }}/assets/images/screenshot-20230112-185611.jpg)

**该架构原理：**
- 当用户加载页面时，浏览器将获取并缓存以前未缓存的资源，就像现在一样。 
- 浏览器可以使用（离线）静态程序分析来检测缓存的脚本，以跟踪每个 JavaScript 函数访问或修改的状态。
- 当在任何页面加载中执行检测脚本时，在执行每个检测函数之前，浏览器可以执行计算缓存查找以搜索匹配的文件。
- 如果找到匹配项，浏览器将应用该缓存条目的效果而不是执行该函数； 否则，它将执行该函数并将新条目添加到缓存中。

![Quantifying]({{ site.baseurl }}/assets/images/screenshot-20230112-203427.jpg)
该论文并为验证实现此架构，只是通过分析 Aleax Top 1000 的网站分析 JS 的课重用：
- 同一个网站1天的运行时缓存能节省`57%`的 JavaScript 执⾏时间，⼀天后可重⽤的 JavaScript 执⾏部分更⾼`（75%）`；
- 不同网站`15%`的 JS 执行可以在1天的时间内重⽤
- JavaScript 执⾏占中等复杂度页面的`65%`，估计中等⻚⾯最高可节省`49%`；

[paper1-url]: http://web.eecs.umich.edu/~harshavm/papers/hotmobile21.pdf