---
layout: post
title:  "一分钟读论文：《LLM 自动发现多智能体算法》"
author: unbug
categories: [AI]
image: assets/images/alphaevolve-marl-algorithm-discovery.svg
tags: [AI, Reinforcement Learning, Multiagent, DeepMind]
description: "DeepMind 团队的论文用 AlphaEvolve 进化式编码代理在大语言模型辅助下自动发现多智能体学习算法，得到 VAD-CFR 与 SHOR-PSRO，在 18 个博弈上比肩人类设计基线，蒸馏后的极简版本泛化更优。"
---

DeepMind 团队的论文[《Discovering Multiagent Learning Algorithms with Large Language Models》][paper1-url] 用 AlphaEvolve 自动发现了 VAD-CFR 和 SHOR-PSRO 两个多智能体学习算法，在 `18` 个博弈测试集上与人类设计的最先进基线持续保持竞争力。

## 从人工设计到自动发现

测试集横跨扑克、Goofspiel、吹牛骰、Blotto 与海战棋变体，覆盖面相当宽。
不完全信息博弈指的是参与者无法看到对手全部行动或私有信息的游戏，德州扑克就是典型。这类场景下的多智能体强化学习（MARL，多个决策主体在同一环境中同时学习策略的方法）进展，历史上依赖人类专家对手动迭代的算法基线进行打磨，每个经典算法背后都是多年的试错积累。论文的切入点是让 LLM 驱动的进化式编码代理（即把候选算法的代码视为基因组、通过反复变异和选择进化代码的自动化系统）进入两个人类设计范式的设计空间：**反事实遗憾最小化（CFR）**与**策略空间响应预言机（PSRO）**。自动搜索产出两个新算法——**波动自适应折扣的 VAD-CFR**，面向迭代遗憾最小化；**平滑混合乐观遗憾的 SHOR-PSRO**，面向群体训练。两者在横跨扑克、Goofspiel、吹牛骰、Blotto、海战棋变体的 `18` 个博弈上均与最先进人类基线打得有来有回，证明 LLM 不只是组装代码，还能发现人类难以构想的非直观机制：波动敏感折扣、一致性强制乐观、硬热启动的策略累积调度、线性混合乐观遗憾匹配与温度控制的纯策略分布组成的混合元求解器，以及从群体多样性自动过渡到严格均衡发现的动态退火策略。

![AlphaEvolve：LLM 驱动的 MARL 算法发现](assets/images/alphaevolve-marl-algorithm-discovery.svg)

## 蒸馏出真正的泛化内核

LLM 在特定训练集上优化适应度，容易堆出为这些环境定制的高度耦合复杂机制，人们自然担心这些发现只是对训练环境的过拟合。论文通过系统消融实验回答了这个疑虑：**这些机制虽紧密协同，但泛化的真正驱动力是一个极简算法内核**。把 LLM 的发现蒸馏到最基本的原理后，得到两个极简求解器——**warm-started 乐观预测的 WOP-CFR** 和**投影匹配的 PM-PSRO**。这两个蒸馏版本以大幅降低的结构复杂度取得了更好的泛化性能，为使用 LLM 做算法发现提供了清晰方法论：先让 LLM 大面积搜索，再用消融实验定位关键机制，最后蒸馏出可迁移的核心。

这项工作的意义在于展示了从人类手动设计算法到 AI 自动发现算法的范式转换路径：AI 不仅能写代码，还能在专业领域内提出并验证新算法。对博弈论、多智能体系统、不完全信息博弈等方向有广泛应用前景，而消融加蒸馏的方法论也可直接移植到其他算法工程场景。DeepMind CEO Demis Hassabis 曾表示，AGI 需要能参与自身架构发展的 AI 模型，AlphaEvolve 正是这一方向的一步。同类话题可参阅站内[《AI 打破矩阵乘法 56 年纪录》]({{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/)。

## References
- [Discovering Multiagent Learning Algorithms with Large Language Models][paper1-url]
- [arXiv:2602.16928][links-1]


[paper1-url]: https://arxiv.org/abs/2602.16928
[links-1]: https://arxiv.org/pdf/2602.16928
