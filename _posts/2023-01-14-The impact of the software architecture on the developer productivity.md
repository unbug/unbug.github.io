---
layout: post
title:  "一分钟读论文：《软件架构对研发⽣产⼒的影响》"
author: unbug
categories: [ Productivity, Architecture ]
image: assets/images/screenshot-20230113-191938.jpg
tags: [Server-less, Firebase, Node, Angular]
---
匈牙利塞格德⼤学科学与信息学院软件⼯程系的论文[《The impact of the software architecture on the developer productivity》][paper1-url] 基于一个 5,000 多个⼯时，⻓达 3 年的真实远程医疗应⽤研发的数据集，对四种不同的软件架构和框架组合进行了对比。

**以下是对比的四种架构：**
![archs]({{ site.baseurl }}/assets/images/screenshot-20230113-191938.jpg)
- v1：基于 Node 服务，Mobile 和 Web 应用都是基于 Angular + Ionic3
- v2：和 v1 的区别是 Node 服务只做 REST 服务，数据服务基于 Python
- v3：和 v2 的区别是服务替换成 Firebase
- v4：和 V3 的区别是谨是将 Ionic3 重构成 Ionic4

**四种架构的效能分析：**
![results]({{ site.baseurl }}/assets/images/screenshot-20230113-194953.jpg)

结果表明，Server-less 确实能提效，基于 Firebase 的  Server-less 架构比私有云 IaaS 级架构`高效8倍`。

耗时分析所用的公式: `时长 = 工单量/研发量`
![results]({{ site.baseurl }}/assets/images/screenshot-20230113-193545.jpg)


[paper1-url]: https://pdfs.semanticscholar.org/8b01/4a53badc30a06f0378aba8737c9529d92a9a.pdf?_ga=2.165236855.979285908.1673232871-2044131725.1673232871