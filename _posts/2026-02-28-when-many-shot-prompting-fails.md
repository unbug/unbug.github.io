---
layout: post
title:  "一分钟读论文：《Many-Shot 提示何时失效》"
author: unbug
categories: [AI, LLM]
image: assets/images/when-many-shot-prompting-fails.svg
tags: [LLM, Prompting, CodeTranslation]
description: "ICSE 2026 ReCode Workshop 论文通过 90000 多次代码翻译实验发现 Many-Shot 悖论：静态相似度随示例增多仅小幅提升，功能正确率却在 5-25 个示例时达峰，建议精选代表性示例而非塞满上下文窗口。"
---

Amir Kiarafiei 等人的论文[《When Many-Shot Prompting Fails: An Empirical Study of LLM Code Translation》][paper1-url]（已被 ICSE 2026 ReCode Workshop 接收）通过 `90000` 多次翻译实验揭示 Many-Shot 悖论：在代码翻译这类语义复杂任务中，**更多示例不等于更好结果**，功能正确率在 `5-25` 个 Few-Shot 示例时达到峰值，示例更多反而下降。

## 实验规模与方法

研究针对大语言模型（LLM）上下文窗口扩大后流行的假设——上下文学习（in-context learning，即在提示词里直接给出输入输出示例让模型模仿）中示例越多性能越好——在代码翻译任务上做系统检验。代码翻译要求两种编程语言之间的语义严格等价，一个运算符优先级或边界条件的偏差就会导致错误，是检验提示策略的理想场景，也是跨语言迁移代码的日常工程需求。

实验覆盖 `6` 种编程语言（Python、Java、JavaScript、C++、Go、Rust）之间的 `30` 种语言对，示例数量从零示例一路扩展到 `625` 个，提示长度约从 `10` 万 token 增至 `80` 万 token，总计超过 `90000` 次翻译；评估同时看两类指标：静态相似度（翻译结果与参考代码的字面接近程度）和功能正确性（以编译与测试通过衡量）。把示例规模拉到几百个量级，正是为了检验大上下文窗口时代的一个默认假设是否成立。

![Many-Shot 提示实验结果示意]({{ site.baseurl }}/assets/images/when-many-shot-prompting-fails.svg)

## Many-Shot 悖论与实践启示

核心发现分两层：**静态相似度指标随示例增多仅有温和改善**，容易让人误以为越多越好；**功能正确率却稳定在 5-25 个示例的 Few-Shot 区间达峰**，示例大幅增加后这一关键指标反而退化。两个指标的分歧正是悖论的来源：模型看到大量示例后，输出在字面上更像参考代码，却在语义层面丢失了正确性；长上下文中示例之间的相互干扰也被认为是候选解释之一。结论是：对代码翻译而言，少量精选示例的质量胜过单纯堆数量，最优提示策略是任务相关的，不能把"越多越好"当作普适规律；这一现象在不同模型和语言对上都可重复，排除了偶然因素，也意味着上下文窗口变大并不自动带来更好的提示策略，堆示例带来的表面收益很可能只是指标错觉。

对开发者的直接启示：写代码翻译或语义复杂任务的提示词时，控制在 `5-25` 个示例即可，把精力放在挑选代表性强、多样性好的示例上，而不是塞满上下文窗口；不同任务的最佳示例数量可能不同，重要场景值得先做小规模实验验证再上生产。对工程团队而言，把示例从几十上百个裁到十几个还能大幅降低推理 token 成本与延迟，质量与成本双赢。论文同时提醒研究者：评测提示策略时不能只看静态指标，功能正确性才是代码任务的金标准。同类话题可参阅站内[《自然语言摘要助力微服务 Bug 定位》]({{ site.baseurl }}/2026-02-28-microservice-bug-localization/)。

## References
- [When Many-Shot Prompting Fails: An Empirical Study of LLM Code Translation][paper1-url]
- [arXiv:2510.16809][links-1]


[paper1-url]: https://arxiv.org/abs/2510.16809
[links-1]: https://arxiv.org/pdf/2510.16809
