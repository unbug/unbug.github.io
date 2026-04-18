---
layout: post
title:  "一分钟读论文：《轨迹级奖励建模基准 Plan-RewardBench》"
author: unbug
categories: [AI, MachineLearning]
image: assets/images/ai-trajectory-reward.svg
tags: [reward-modeling, agent-alignment, trajectory-level, benchmark]
---

## 从单步到多步：奖励建模的根本转变

在经典的人类反馈强化学习中，Reward Models 是模型对齐的基本信号提供者。随着 LLM 从单轮对话扩展到多轮交互、工具调用和复杂任务规划，reward modeling 的评估对象发生了根本变化：从**单步输出**转向**多步行为序列**。

然而，当前领域缺乏专门设计的基准，用于评估评判者区分偏好 agent 轨迹与干扰轨迹的能力。这一空白导致现有 reward modeling 方法在面对复杂 agent 场景时，难以准确反映真实的对齐效果。

## Plan-RewardBench 的核心设计

该基准的核心设计思路是构建复杂工具使用场景下的 agent 轨迹对，包含**偏好轨迹**与**干扰轨迹**，并要求评判模型在其中做出准确区分。该基准填补了该领域长期存在的评估空白。

Plan-RewardBench 的创新在于：首先，它聚焦于 agent 在实际应用中的多步行为序列，而非孤立的单步决策；其次，它涵盖了**搜索、代码执行、文件操作**等多种工具使用场景；第三，它提供了完整的训练数据和评估指标，为后续研究提供了可复现的基准。

## 评估器家族的系统性缺陷

该研究对三类主流评估器家族进行了系统性测试，发现它们在面对 trajectory-level 任务时均面临重大挑战：

**RM-based 评估器**：传统奖励模型主要针对单步输出设计，其架构和训练目标难以捕捉多步行为序列的整体质量。

**LLM-as-a-Judge 评估器**：尽管大型语言模型在单轮推理中表现出色，但在面对轨迹级评估任务时，难以有效权衡多步决策的连贯性与长期目标的一致性。

**Hybrid 评估器**：结合上述两种方法的混合评估器同样未能突破瓶颈，说明当前混合策略未能有效融合各自优势。

实验数据显示，在复杂工具使用和长序列任务中，传统 reward model 与人类偏好之间的相关性显著下降，而 trajectory-level 评估方法则展现出更好的对齐效果。

![轨迹级奖励建模]({{ site.baseurl }}/assets/images/ai-trajectory-reward.svg)

## References

- [东京大学 Plan-RewardBench 论文][paper1-url]


[paper1-url]: https://arxiv.org/abs/2604.08178
