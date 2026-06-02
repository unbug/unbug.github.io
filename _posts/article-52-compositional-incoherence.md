---
layout: post
title:  "一分钟读论文：《局部协调，全局不协调：多组件 LLM Agent 的组成性不协调》"
author: unbug
categories: [AI, Agent]
image: assets/images/article-52-compositional-incoherence.svg
tags: [LLM, Agent, Composition, Uncertainty, Calibration]
---

Anany Kotawala 的论文[《Locally Coherent, Globally Incoherent: Bounding Compositional Incoherence in Multi-Component LLM Agents》][paper1-url]，揭示了多组件 LLM Agent 系统中的一个根本性缺陷：即使每个组件在局部都是校准良好的，它们的组合输出仍可能违反基本概率公理。论文在 1,876 个集成簇上的实验表明，组合不协调现象在 33% 到 94% 的情况下出现，导致每笔决策产生 +0.115 nats 的后悔损失。

## 核心问题

多组件 Agent 的典型架构中，Planner 将问题路由到不同的专家组件，每个组件只看到问题的局部视图。一个研究组件报告 P(共和党获胜) = 0.6，一个预测组件报告 P(民主党获胜) = 0.6，组合后总概率质量为 1.2，没有任何概率测度能分配这样的值。这种 Dutch-book 暴露严格产生于组件之间，而非单个组件内部。

已有方法如 per-component 校准、自我一致性（Self-Consistency）和共形预测（Conformal Prediction）都作用于单个模型输出，只能保证单点相干性，对跨组件的逻辑约束完全不可见。

## 组成性不协调的形式化

论文引入**组成性残差** ε* 来量化这一问题。它是局部修复后的组合输出到联合相干多面体的 L2 距离，可以从系统输出和声明的跨组件耦合约束在运行时计算。

论文提出了一个**产品结构二分法**定理：在所有者选择聚合模式下，局部相干性保证全局相干性，当且仅当联合多面体可分解为局部多面体的笛卡尔积。任何更紧密的耦合都会导致存在局部相干但全局不协调的预测。

基于 Rayleigh 商的幅度预测可以在三个关系类中将观测残差预测到 7% 以内。论文还通过实验验证了经验硬度排序：划分 >> 否定 >> 析取 >> 合取，这与理论预测的多面体约束强度完全一致。

## 修复与监控

论文提出了一种**分层 Boyle-Dykstra 投影**来确定性修复组合输出，将 Dutch-book 暴露 bound 驱动到数值下限。同时，论文设计了一个**任意时间有效的 e-process**，用于序列相干性监控，在任何停止时间控制误报率。

在实验中，Naive 组合下的暴露 bound 平均值为 0.137，而分层投影可将其降至 QP 求解器的数值下限。论文还报告了每个单元格的 Brier 分数，使用 Diebold-Mariano 显著性检验（预测比较的标准配对检验）进行验证。

## 直觉缓解策略为何失效与核心贡献

论文测试了三种直觉上的 LLM 端缓解策略：**检索增强、分区感知提示、聚合器 LLM**，结果每一项都失败或产生退化。这一发现表明，组成性不协调不是可以通过简单提示工程解决的表面问题，而是多组件系统架构层面的根本性挑战。

论文的核心贡献在于将组成性残差 ε* 作为运行时证书，证明了局部校准无法自动保证系统级校准，并给出了可证伪的幅度预测和分解基准。对于构建多组件 LLM Agent 的工程实践而言，这意味着需要在架构层面显式处理跨组件的逻辑约束，而非依赖单个组件的校准质量。

## References

- [论文原文][paper1-url]
- [de Finetti 1937 概率一致性理论][links-1]
- [Self-Consistency 方法][links-2]
- [共形预测框架][links-3]


[paper1-url]: https://arxiv.org/abs/2605.30335
[links-1]: https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-8/issue-none/on-the-fundamentals-of-expectational-logic/10.1214/aoms/1177732578.full
[links-2]: https://arxiv.org/abs/2203.11176
[links-3]: https://arxiv.org/abs/2107.07511
