---
layout: post
title:  "一分钟读论文：《Frontis-MA1：面向递归自改进的AI4AI模型》"
author: unbug
categories: [AI, ML]
image: assets/images/frontis-ma1-framework.svg
tags: [ai4ai, recursive-self-improvement, machine-learning-engineering, agent-training]
---

Horizon Research、Frontis.AI 和清华大学联合团队发表的论文[《Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering》][paper1-url]提出了首个面向递归自改进（RSI）的全栈开源系统 OpenMLE。该系统将机器学习工程任务分解为四个原子演化算子，通过 SFT+RL 训练出一个 35B 参数的元进化代理 Frontis-MA1，在 MLE-Bench Lite 上将 Medal Average 从基座模型的 `39.39%` 提升至 `60.61%`，配合进化搜索框架 OpenMLE-Evo-Max 进一步达到 `71.21%`，超越了 GPT-5.5 + Codex 组合。

## AI4AI：让 AI 改进构建 AI 的过程

递归自改进（RSI）是通向通用人工智能的核心路径之一——其核心思想是让 AI 系统能够改进构建自身的过程，形成自我强化的能力增长循环。传统 AI 辅助人类（Human-in-the-loop）范式中，人类始终是决策主体；而 AI4AI 追求的是让 AI 自主优化 ML 工程流水线、模型训练策略和架构设计，最终实现不依赖人类专家干预的自动化 ML 研发闭环。

机器学习工程（MLE）成为 RSI 的理想验证场景：每个 ML 任务都有明确的性能指标便于量化评估，从数据描述到模型代码的映射关系清晰适合 AI 代理操作，且包含特征工程、架构设计、超参调优等多个可优化维度。在单卡 RTX 4090 + 12 小时/任务的资源约束下，既保证可行性又具有挑战性。

## OpenMLE：三组件闭环协作系统

OpenMLE 由三个核心组件构成闭环协作：**Gym** 提供标准化的 ML 工程任务环境和可验证的反馈信号；**RL** 通过强化学习训练模型掌握原子演化算子的使用策略；**Evo** 基于进化算法在大规模操作序列空间中寻找最优解。三者形成"执行-评估-改进"的自循环结构，体现了 RSI 的核心思想。

四个原子演化算子将 ML 工程任务分解为可组合的操作：**Draft（起草）**从零生成完整流水线代码；**Improve（改进）**针对已有代码进行维度优化；**Debug（调试）**识别修复语法、运行时和逻辑错误；**Crossover（交叉）**融合两个不同方案的优点。这种原子化设计使 RL 训练更加可行，也提高了系统的可解释性和可控性。

## 实验结果与开源意义

在 MLE-Bench Lite 上，Frontis-MA1 (SFT+RL) 的 Medal Average 达到 `60.61%`（基座模型为 `39.39%`），OpenMLE-Evo-Max 进一步推至 `71.21%`，Human Rank 达 `0.8126`——接近人类专家水平的 81%。在 NatureBench Lite 迁移实验中，模型能力贡献了 `+20%` Match-SOTA 提升，搜索框架贡献了 `+30%`，证明两者是互补的正交组件。

更重要的是，Frontis-MA1 + OpenMLE-Evo-Max 的表现超越了 GPT-5.5 + Codex 组合，接近 GPT-5.6 Sol 和 Kimi K3。一个 35B 参数的开源模型配合专门训练和搜索框架，能够在 ML 工程任务上匹敌闭源商业模型的组合方案。代码、模型权重和数据集均已开源（https://github.com/FrontisAI/OpenRSI），为 AI4AI 领域的开源生态发展提供了有力支撑。

## References

- [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering][paper1-url]
- [arXiv:2607.28568][links-1]


[paper1-url]: https://arxiv.org/abs/2607.28568
[links-1]: https://github.com/FrontisAI/OpenRSI
