---
layout: post
title:  "一分钟读论文：《简洁代码能降低技术债吗？》"
author: unbug
categories: [Engineering]
image: assets/images/screenshot-20230129-231600.jpg
tags: [TechnicalDebt, Refactor]
---
希腊马其顿大学应用信息学系和荷兰格罗宁根格罗宁根大学数学与计算机科学研究所的论文[《Can Clean New Code Reduce Technical Debt Density?》][paper1-url]对 Apache 软件基金会的 27 个开源软件项目进行了大规模案例研究，分析了 `66,661` 个类和 `56,890` 个 commit。结果表明，`编写“简洁”（或至少“更简洁”）的新代码可以降低技术债`（Technical Debt，简称 `TD`）:

- 增、删、改引入的简洁代码与技术债密度的`正向变化`有很强的关联，新简洁代码的贡献对于系统质量改进的转变更为深远。
- 在会议上`经常讨论代码质量`的项⽬表现出更⾼频率的更简洁的代码提交。
- 编写有更少的技术债问题的代码证明是⼀种⾮常`有效且低成本`的管理技术债的⽅法。
- 应⽤`质量卡点`来确保每次提交产⽣的违规次数，从根本上改善质量的趋势，从⽽扭转软件劣化现象。

**计算技术债密度的公式：**

![img1]({{ site.baseurl }}/assets/images/screenshot-20230129-232512.jpg)


[paper1-url]: https://www.semanticscholar.org/reader/0c4ce3c4a05ee326f4cbcb128df93baa7ac7dc45