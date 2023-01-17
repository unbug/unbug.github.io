---
layout: post
title:  "一分钟读论文：《自动将 Legacy 项目重构为 ES6》"
author: unbug
categories: [ Refactor, JS ]
image: assets/images/screenshot-20230117-121828.jpg
---
很多遗留的项目都是 ES5 代码，不能在 ES6 或 TypeScript 下很好的复用，特别是企业级大型前端工程，维护成本令人头疼。雅典经济与商业大学信息学系的论文[《Automated Refactoring of Legacy JavaScript Code to ES6 Modules》][paper1-url]实现了将遗留 ES5 代码自动重构为 ES6 模块，重点是将模块对象解构为多个可单独重用的模块来实现模块内容的细粒度重用，每个重构模块`支持按需引入`而不是引入整个模块对象，并`自动重建依赖关系`，最大限度减少耦合并提高了可维护性。

论文使用静态分析来构建 JavaScript 项目模型，即模块依赖图 (MDG)，在 MDG 的基础上指定模块迁移到 ES6 的重构过程。原型实现在 19 个开源项目上进行了评估：

**重构的结果对系统模块化有什么影响？**
![Result]({{ site.baseurl }}/assets/images/screenshot-20230117-120521.jpg)

结果表明：所重构的方法将每个重构项目的可重用元素数量平均`增加了 4 倍`，并通过每个模块声明多个可重用元素来实现细粒度重用。 它通过限制其他模块未使用的模块功能的范围来强制模块封装，减少模块耦合。

**重构的源代码转换是否保留了所分析系统的外部行为？**
![Result]({{ site.baseurl }}/assets/images/screenshot-20230117-120755.jpg)

结果表明：重构结果保留了每个分析系统的外部行为。研究问题旨在从经验上调查所重构的重构的可靠性，即重构的应用是否不会引入语法错误或改变重构代码的外部行为，进一步支持所提方法的实用性。

[paper1-url]: https://arxiv.org/pdf/2107.10164.pdf