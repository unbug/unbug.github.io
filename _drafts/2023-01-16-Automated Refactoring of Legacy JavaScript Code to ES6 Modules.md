---
layout: post
title:  "一分钟读论文：《自动将 Legacy JS 代码重构为 ES6》"
author: unbug
categories: [ Refactor, JS ]
image: assets/images/
---
这项工作研究了将遗留 ES5 代码自动重构为 ES6 模块，并通过命名的导入/导出语言结构对模块内容进行细粒度重用。重点是通过将导出的模块对象解构为细粒度的模块功能来减少重构模块的耦合，并通过利用 ES6 语法增强模块依赖性
的论文[《Automated Refactoring of Legacy JavaScript Code to ES6 Modules》][paper1-url]：

![]({{ site.baseurl }}/assets/images/)




[paper1-url]: https://arxiv.org/pdf/2107.10164.pdf