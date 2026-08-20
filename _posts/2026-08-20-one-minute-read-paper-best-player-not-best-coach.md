---
layout: post
title:  "一分钟读论文：《最佳选手未必是最佳教练》"
author: unbug
categories: [AI, LLM]
image: assets/images/centaur-bench-augment-vs-automate.svg
tags: [llm, benchmark, multi-agent]
description: "UC Berkeley Haas 的 CentaurBench 在 7 个真实工作任务上对比 LLM 的自动化与增强两种角色，模型级排名相关仅 0.48，5/7 任务冠军不同，无指导基线在 3 个任务胜过所有指导。"
---

加州大学伯克利分校哈斯商学院数据创新与人工智能实验室（DIAL）的论文[《CentaurBench: Benchmarking LLM Capabilities on Augmenting vs. Automating Real-World Work Tasks》](https://arxiv.org/abs/2608.18554)发现，大语言模型的"自动化"能力与"增强"能力几乎不相关：最会自己干活的"选手"，未必是最会指导别人干活的"教练"。论文用统一框架在 7 个真实工作任务上评测 9 个助手模型，每任务独立重复 10 次，两种角色排名的模型级 Spearman 相关仅 `0.48`（p=0.187），在常规显著性水平下与零不可区分。

## 两种角色，一套框架

自动化模式下，助手模型直接产出交付物；增强模式下，助手只写一段 200-250 词的过程性指导文本，实际交付物由固定的工人模型 GPT-3.5-Turbo 完成。9 个助手模型来自 Claude、Gemini、DeepSeek 与 GPT 四个家族，固定弱工人是为了模拟实践中强模型指导弱模型的常见配置。7 个任务都来自有经济意义的真实场景：咨询、旅行规划、菜单规划、报税、辅导、运筹与市场趋势分析。评分由 LLM 评审团盲评两两对比，使用任务专属评分标准，且评审模型不评价自家模型的输出。

![CentaurBench 框架：自动化与增强两种角色]({{ site.baseurl }}/assets/images/centaur-bench-augment-vs-automate.svg)

## 选手排名与教练排名对不上

任务级相关从 -0.04（旅行规划）到 0.85（报税，p=0.004）不等，仅报税通过 Bonferroni 校正。7 个任务中有 5 个的"增强冠军"与"自动化冠军"不是同一个模型。下文排名均为 10 次重复的平均排名，1 表示最佳。论文给出两组角色反转：市场趋势任务上，Claude-Opus-4.8 自动化平均排名 2.05，增强却只有 8.15，是最弱的助手之一；咨询任务上 GPT-4.1 正好相反，增强排名 3.80 为所有受助条件最佳，自动化排名却只有 7.40。这些差异在 10 次独立重复后依然稳定。

## 指导有时帮倒忙

无指导的 GPT-3.5-Turbo 基线在运筹、报税、旅行规划三个任务上排名第一，胜过所有"受助"条件。GPT-5-Mini 是唯一在自动化与增强两种方案下平均排名都第一的模型；在增强对比中，无指导基线的整体平均排名第二（3.79），唯一整体优于它的受助条件就是 GPT-5-Mini（3.66）。作者认为这不是指导无用的证据，而是说明指导的价值依任务而定、甚至可以为负：匹配不当或过于复杂的指导，会让工人比独自工作表现更差。

## 局限与启示

论文自称 pilot 研究，并列出明确局限：依赖 LLM 评审而非人类专家判断，评审偏差无法完全消除；增强只测一次性指导文本，未测多轮交互；工人固定为 GPT-3.5-Turbo，结论能否迁移到其他工人未知；7 个任务、10 次重复的覆盖面有限。其核心启示是自动化能力是协助质量的不完全代理，合适的模型取决于它扮演的角色与支持的任务，模型选型应当依据角色而非单一榜单。此前介绍的[《贝叶斯伙伴建模与 LLM 协同重规划》]({{ site.baseurl }}/one-minute-read-paper-bayes-belief-agent-adaptive-replanning/)关注 LLM 与动态伙伴的协同重规划，CentaurBench 则回答一个更基础的问题：哪个模型适合扮演哪个角色。

## References
- [CentaurBench: Benchmarking LLM Capabilities on Augmenting vs. Automating Real-World Work Tasks（arXiv:2608.18554v1）][paper1-url]
- [论文 HTML 全文][links-1]
- [代码仓库][links-2]
- [CentaurBench 项目页][links-3]


[paper1-url]: https://arxiv.org/abs/2608.18554
[links-1]: https://arxiv.org/html/2608.18554v1
[links-2]: https://github.com/kennywong524/best-player-not-best-coach
[links-3]: https://kennywong524.github.io/centaur-benchmark
