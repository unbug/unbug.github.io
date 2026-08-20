---
layout: post
title:  "一分钟读论文：《贝叶斯伙伴建模与 LLM 协同重规划》"
author: unbug
categories: [AI, MultiAgent]
image: assets/images/bayes-belief-agent-framework.svg
tags: [llm, multi-agent, planning]
description: "论文提出 BayesBeliefAgent，用贝叶斯后验追踪队友技能，仅在动作与信念矛盾时中断并重规划；Overcooked 上 belief-action gap 从 0.41 降到 0.20，重规划次数减少 20-80 倍。"
---

论文[《Bayesian Partner Modelling enables Adaptive Replanning for LLM Coordination》](https://arxiv.org/abs/2608.18490)针对多智能体大语言模型系统的一个常见问题：队友会在任务中途切换策略，智能体却常常在公开证据表明伙伴已更换技能之后，仍继续执行过时的计划。现有方法要么把伙伴追踪当作被动上下文，知道变化发生但反应迟缓，要么不加区分地频繁重规划。论文提出 BayesBeliefAgent，将基于 GPT-4o 的分层大语言模型规划器与一个贝叶斯追踪模块配对，仅当伙伴的实际动作与推断技能直接矛盾时，才中断当前技能并触发重规划。除标准奖励外，论文以重规划效率与 belief-action gap 作为核心评估维度。

## 信念-行动差距：一个新指标

论文引入 **belief-action gap** 指标：在所有决策点中，智能体对伙伴的估计正确、却仍执行不互补技能的比例。不互补技能指与队友当前技能重叠或不配合的动作，例如两个智能体同时执行同一任务步骤。该指标衡量"知道"与"做到"之间的脱节：即使对伙伴的信念正确，智能体也可能继续执行过时、重复或不互补的宏观动作。论文同时提出 **replanning efficiency** 指标，定义为平均奖励除以每 episode 的重规划次数。

在 Overcooked 基准上，BayesBeliefAgent 与基线 ProAgent 的伙伴技能识别准确率几乎相同（Open 布局 `0.79` 对 `0.78`），但 gap 率在 Open 布局从 `0.41` 降到 `0.20`，在 Ring 布局从 `0.38` 降到 `0.28`。互补性指标 Comp@3 在 Open 布局从 `0.39` 升到 `0.66`，重复技能率从 `0.30` 降到 `0.15`。这说明差距不在智能体能否"看穿"伙伴，而在于信念是否被用作控制信号。

## 门控中断机制

BayesBeliefAgent 将系统分为两层：规划器是基于 GPT-4o 的分层大语言模型规划器，以宏观技能为单位组织行为，每个技能包含多步动作序列；贝叶斯追踪模块根据观察到的动作持续推断伙伴当前技能的后验分布，并在每个决策点更新信念。仅当伙伴动作与推断技能直接矛盾时，系统才中断当前技能并触发重规划，论文称之为后验门控中断，把伙伴信念从"被动上下文"升级为"主动控制信号"。消融实验表明，把后验用作控制信号，优于仅将其作为规划器提示词的上下文。

![BayesBeliefAgent 框架：贝叶斯追踪、矛盾检测、门控中断与重规划流程，及 belief-action gap 对比数字]({{ site.baseurl }}/assets/images/bayes-belief-agent-framework.svg)

## 实验结果与局限

实验使用 Overcooked 的 Open、Ring 与 Forced Coordination 三种布局，外加 Burrito 环境，伙伴均为行为偏好多样的未见过队友。在 Open 布局上，Full 变体平均每 episode 重规划 `1.8-3.0` 次，Periodic-10 与 Compl./held 变体分别需要 `15-51` 次与 `50-169` 次，三者的平均奖励相当，重规划次数少 20-80 倍。

论文同时说明自身局限：在 Forced Coordination 布局上收益较小，底层规划器的局限在该设置下更为明显，论文明确识别出选择性重规划收益有限的设置。规划器以 GPT-4o 为主配置，论文另以 GPT-5.2 做 backbone 敏感性检查，两种 backbone 互有胜负、无一一致占优。

## References
- [Bayesian Partner Modelling enables Adaptive Replanning for LLM Coordination（arXiv:2608.18490v1）][paper1-url]
- [论文 HTML 全文][links-1]
- [BrainPilot 多 Agent 科研系统][links-2]


[paper1-url]: https://arxiv.org/abs/2608.18490
[links-1]: https://arxiv.org/html/2608.18490v1
[links-2]: {{ site.baseurl }}/one-minute-read-paper-brainpilot-automating-brain-discovery/
