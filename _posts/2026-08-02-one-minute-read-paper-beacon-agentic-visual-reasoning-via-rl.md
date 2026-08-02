---
layout: post
title:  "一分钟读论文：《Beacon：通过强化学习实现智能视觉推理》"
author: unbug
categories: [AI, ComputerVision]
image: assets/images/beacon-framework.svg
tags: [agentic-vision, reinforcement-learning, tool-use, mllm, mode-adaptiveness]
---

多机构研究团队发表的论文[《Beacon: Knowing When and How to Perform Agentic Visual Reasoning》][paper1-url]提出了 Mode Adaptiveness（MA）和 Tool Effect（TE）双维度分析框架，通过 Necessity-Aware Adaptive Reward 强化学习训练机制，使多模态大语言模型学会在视觉推理任务中何时需要调用工具以及如何有效使用工具。实验表明，Beacon 在多个 agentic vision benchmark 上显著降低了工具滥用率，同时保持了推理准确性。

## 核心问题：Agentic Vision 中的工具滥用

多模态大语言模型在执行视觉推理任务时面临一个根本困境：**过度依赖工具调用**。现有 MLLM 在面对复杂视觉场景时倾向于频繁调用外部工具（如目标检测、OCR、图像分割等），即使这些工具的调用并不能提升最终答案的准确性，反而增加了延迟和计算成本。

研究者将这一问题形式化为两个正交维度：**Mode Adaptiveness（MA）**衡量模型在"自主推理模式"与"工具辅助模式"之间做出正确切换的能力；**Tool Effect（TE）**衡量所选工具对最终推理结果的真实贡献度。高 MA 意味着模型能够根据任务需求自适应选择最优推理路径，而高 TE 确保每次工具调用都带来可量化的性能提升。

## MA-TE 双维度框架与 RL 训练机制

Beacon 的核心创新在于将"工具使用策略"问题分解为两个可量化、可优化的维度。**MA-TE 框架**的价值在于它不再依赖人工标注的"正确工具调用序列"，而是为强化学习提供了明确的优化目标。

Beacon 的训练包含两个关键设计。**Necessity-Aware Adaptive Reward（NAAR）**是一种基于必要性的自适应奖励函数——当自主推理能够取得正确结果时给予更高奖励，当工具调用确实提升了准确性时也给予正向反馈，但对低 TE 的工具调用施加惩罚。**Hint-Guided Capability Expansion（HGCE）**则是一种渐进式能力扩展策略，在训练初期通过 hint 引导模型逐步学习更复杂的 MA-TE 决策路径，随着训练推进 hint 逐渐减少，模型最终能够独立做出高质量的模式切换和工具选择决策。

## 实验结果与关键发现

研究在多个 agentic vision benchmark 上评估了 Beacon 的性能。核心发现是：**Beacon 在保持推理准确性的同时显著降低了工具调用频率**。相比基线 MLLM，Beacon 的工具滥用率大幅下降，而最终答案的准确率没有明显损失。

另一个重要发现是 **MA 和 TE 之间存在正相关关系**——模式切换能力更强的模型往往也能做出更有效的工具选择。这表明 MA-TE 双维度框架捕捉到了 agentic vision 中工具使用策略的本质结构。研究还验证了 Beacon 在不同规模 MLLM backbone 上的泛化能力，结果表明即使较小的模型通过 Beacon 训练后也能获得显著的 MA-TE 性能提升。

## References

- [Beacon: Knowing When and How to Perform Agentic Visual Reasoning][paper1-url]


[paper1-url]: https://arxiv.org/abs/2607.28595
