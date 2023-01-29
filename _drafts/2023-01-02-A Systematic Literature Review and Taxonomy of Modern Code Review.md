---
layout: post
title:  "一分钟读论文：《现代 Code Review 的系统文献综述》"
author: unbug
categories: [CodeReview, Agile]
image: assets/images/screenshot-20230127-184311.jpg
tags: [featured]
---
Code Review 从结构化和严格的形式（即软件检查）演变为灵活的、基于工具的异步过程，即` Modern Code Review (MCR)`。巴西南里奥格兰德州联邦大学 (UFRGS)和阿雷格里港信息学研究所合著的论文[《A Systematic Literature Review and Taxonomy of Modern Code Review》][paper1-url] 系统分析了 139 篇论文，帮助我们了全面了解采用 MCR 的动机、挑战和好处，以及哪些影响因素导致哪些结果。并介绍`改进 MCR 实践的技术、工具或理论建议`。

![]({{ site.baseurl }}/assets/images/screenshot-20230127-184311.jpg)

**Review 规划：** 计划阶段相关的⽀持，即在审核⼈员审核代码之前，提供的⽀持类型有：补丁⽂档、推荐人、Review 优先级

**Code Review ：** Review 阶段相关的⽀持，提供的⽀持类型有：代码检查、Review 反馈和 Review 决策。

**过程管理：** 提供的⽀持类型有：方法论指南、Review 回顾、工具支持。

![]({{ site.baseurl }}/assets/images/screenshot-20230129-155136.jpg)

[paper1-url]: https://arxiv.org/pdf/2103.08777.pdf 