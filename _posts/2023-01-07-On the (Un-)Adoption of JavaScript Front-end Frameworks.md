---
layout: post
title:  "一分钟读论文：《关于（未）采用 JavaScript 前端框架的研究》"
author: unbug
categories: [FrontEnd, Architecture]
image: assets/images/Screenshot2023-01-09-00.jpeg
tags: [featured, JavaScript, Framework]
---
如果你的团队正在考虑迁移新的前端框架，建议你先读巴西南马托格罗索联邦大学计算机系的这篇论文[《On the (Un-)Adoption of JavaScript FrontEnd Frameworks》][paper1-url]。作者通过研究 Github 的 TOP-15000 项目，覆盖 Angular、React、VUE、Backbone, Ember 主流框架，对采用或不采用框架有了建设性的发现：
1. `受欢迎程度 (39%) 和易学性 (35%)` 是激励采用前端框架的主要因素。
2. `20%`的人计划在未来的项目中采用新的的框架。
3. 迁移到新的框架很费时间，`41%`项目在执行迁移上花费的时间多于使用新旧框架的时间。
4. 在迁移到新框架期间需要`更多的开发人员数量`。
5. 大多数迁移直接发生在 Master 或 develop 分支中，`意味着重写`。

**该论文还对开发者做了相关问卷调研，涉及5个问题：**
1. 为什么决定改前端框架？
2. 迁移过程中遇到的主要障碍是什么？
3. 我们发现迁移是在 X 天内执行的。 [为什么它执行得这么快-为什么花了那么长时间]？
4. 我发现您使用<xx策略> 执行了迁移。 将 <xx策略> 用于此特定目的的主要挑战和好处是什么？
5. 你对新框架满意吗？

**得到如下建议：**
1. 考量框架的建议：
- 关键因素：框架的流行度、易学性和架构。
- 其他因素：以前的专业知识、社区、绩效和支持。
- 评估框架文档的质量。
- 分析框架的架构是否适合应用程序的架构。
- 分析团队的专业知识。

2. 迁移至新框架的建议：
- 仔细评估迁移风险，包括负面影响。
- 当两个框架在迁移期间并行使用时，评估渐进迁移方法。
- 从最简单的组件开始迁移。
- 征求利益相关者的反馈，尤其是关于我们未采用的关键因素研究，例如用户体验。
- `让旧框架的专家参与迁移`，以澄清可能存在的疑虑。
- 投资于新框架下的团队培训。


## References
- [Twitter releated post][links-1]


[paper1-url]: https://homepages.dcc.ufmg.br/~mtov/pub/2021-spe.pdf
[links-1]: https://twitter.com/mtov/status/1448308623365611520
