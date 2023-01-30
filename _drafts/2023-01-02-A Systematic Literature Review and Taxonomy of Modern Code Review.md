---
layout: post
title:  "一分钟读论文：《现代 Code Review 的系统文献综述》"
author: unbug
categories: [CodeReview, Agile]
image: assets/images/screenshot-20230127-184311.jpg
tags: [featured]
---
Code Review 从结构化和严格的形式（即软件检查）演变为灵活的、基于工具的异步过程，即` Modern Code Review (MCR)`。巴西南里奥格兰德州联邦大学 (UFRGS)和阿雷格里港信息学研究所合著的论文[《A Systematic Literature Review and Taxonomy of Modern Code Review》][paper1-url] 系统分析了 139 篇论文，非常详尽的记录了15个细节性发现，能帮助我们了全面了解采用 MCR 的动机、挑战和好处，以及哪些影响因素导致哪些结果，并总结了 MCR 流程改进的建议。

## 典型的 MCR 流程
![]({{ site.baseurl }}/assets/images/screenshot-20230127-184311.jpg)

- 第⼀阶段，审查计划，包括三个主要任务。在第⼀个（准备）中，作者准备更改的代码并附有详细信息的描述。选择可能或应该检查代码的合适审阅⼈。审阅者会收到邀请通知。
- 第⼆阶段，代码审阅，分析代码缺陷。每个审阅者单独执⾏代码检查、评估更改并将其与以前的版本进⾏⽐较。他们与作者互动，撰写反馈意⻅，注释代码⽚段，或促进讨论以澄清问题，做出决定（Review Decision），可以是接受、拒绝和返⼯。最后根据审阅者的反馈更新代码后进⾏新的审阅周期。
- 这些任务⾄少由两个⻆⾊执⾏，即作者和审阅者。作者是更改源代码并为其创建审阅请求的开发⼈员，⽽审阅者（通常也是开发⼈员）负责审查代码并提供反馈。


## MCR 流程的改进建议
![]({{ site.baseurl }}/assets/images/screenshot-20230129-155136.jpg)

- Review 计划： 计划阶段相关的⽀持，即在审核⼈员审核代码之前，提供的⽀持类型有：`变更⽂档、推荐人、Review 优先级`。
- Code Review ：Review 阶段相关的⽀持，提供的⽀持类型有：`代码检查、Review 反馈和 Review 决策`。
- 过程管理：过程相关的支持，提供的⽀持类型有：`方法论指南、Review 回顾、工具支持`。


[paper1-url]: https://arxiv.org/pdf/2103.08777.pdf 