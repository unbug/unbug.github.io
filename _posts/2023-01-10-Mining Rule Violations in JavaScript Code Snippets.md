---
layout: post
title:  "一分钟读论文：《StackOverflow 上 JS 代码片段规则违规的挖掘》"
author: unbug
categories: [Front-end]
image: assets/images/screenshot-20230110-165809.jpeg
tags: [Lint, JS]
---
还在复制粘贴 StackOverflow 的代码吗？巴西的巴西利亚大学和巴西贝伦联邦大学合著的论文[《Mining Rule Violations in JavaScript Code Snippets》][paper1-url]对 StackOverflow 的 336k 个代码片段进行分析，发现答案里 `100%` 的 JavaScript 代码都存在 ESLinter 不通过问题。

**论文的研究问题有3个：**
- JavaScript 代码片段中违反规则的情况有多普遍？
- JavaScript 代码片段中最常违反的规则是什么？
- 标记有可能 Error 的 JavaScript 代码片段是否在 GitHub 项目中被重用？

**论文结论：**
- JavaScript 代码片段数据集中`普遍存在违规行为`，没有一个代码片段是没有违规的。 
- 根据 ESLINT 使用的五个规则对违规行为进行了分类，即：Error、最佳实践、变量、文体问题、ECMAScript、Node.js 和 CommonJs。 文体问题占整体违规行为的 82.9%。 开发人员可能更感兴趣的 Error 占违规的 0.1%。
- 发现在 6,303 个有潜在 Error 的代码片段中，只有 36 个代码片段在 GitHub 软件项目中被重用，共有 `2,092` 个项目重用了这些代码片段。 然而，只有三个代码片段占整体重用的 `94%`。

![lint-rules]({{ site.baseurl }}/assets/images/screenshot-20230110-164906.jpeg)


[paper1-url]: http://gustavopinto.org/lost+found/msr2019c.pdf