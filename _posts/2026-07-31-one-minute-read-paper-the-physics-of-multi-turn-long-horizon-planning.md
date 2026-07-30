---
layout: post
title:  "一分钟读论文：《多轮长程规划的训练物理》"
author: unbug
categories: [AI, Agent]
image: assets/images/planphys-framework.svg
tags: [agent-foundation-models, planning, agentic-distillation, rl-post-training]
---

中国科学院自动化研究所复杂系统认知与决策智能重点实验室的论文[《The Physics of Multi-Turn Long-Horizon Planning: From Pre-training to Post-training via Single- and Multi-Teacher On-Policy Agentic Distillation》][paper1-url]首次从预训练到后训练再到多教师整合的全生命周期，系统研究了基础模型智能体多轮长程规划能力的获取与塑造机制。研究构建了首个可控的多轮长程规划实验平台（Controllable Planning Gym），揭示了世界模型内部化、RL 后训练适用边界和多教师蒸馏兼容性的核心规律。

## 可控规划环境与预训练能力获取

论文基于技能图构建了统一可控的多轮长程规划环境，覆盖奇幻炼金术、畜牧养殖和电子组装三个领域，每个领域设五个难度级别，支持对任务长度、数据质量和规划模式的精确控制。这是该领域首个系统性可控研究平台。

在预训练阶段的研究中，团队发现**世界模型内部化**（通过后序遍历思维链构建状态转换规则）比直接动作预测产生显著更强的长程泛化能力：短程规划 avg@8 从 `89.5%` 提升至 `98.9%`（+9.4%），中程提升 `39.3%`，长程提升 `45.8%`。同时发现仅靠原子技能不足以实现组合泛化，少量长程数据即可显著提升规划能力；而次优轨迹会严重损害性能，因为决策误差在长程任务中不断累积放大。

## RL 后训练的三区域适用边界

论文从互信息角度区分了通用规划模式（如反思、回溯）和任务特定规划知识，并定义了 RL 后训练的三个适用区域：**不需要**（高质量数据上 GRPO/OPD 对模式改善有限）、**有效**（含次优轨迹时显著改善）和**不可支持**（从不同知识教师蒸馏未见过程序可能损害学生已有世界建模）。

在低质量预训练数据和长规划场景下，**OPD（On-Policy Distillation）**比 GRPO 具有更宽的有效区域。当数据包含次优轨迹时，Short OPD 带来 `+29.77` 的提升，而 Short GRPO 仅带来 `+19.97`，差距约 10 个百分点。这是因为 OPD 在教师模型理想时比稀疏信用分配提供更一致的更新方向。

## 多教师蒸馏的兼容性机制

论文首次深入分析了多教师在线策略蒸馏（MOPD）的机制：兼容的模式支持跨环境泛化，部分共享的模式支持持续学习，而完全冲突的模式会导致严重的灾难性遗忘和跨环境干扰。这一发现为实际多教师整合提供了理论指导——在多教师场景中，模式兼容性比单一教师性能更重要。

## References

- [The Physics of Multi-Turn Long-Horizon Planning: From Pre-training to Post-training via Single- and Multi-Teacher On-Policy Agentic Distillation][paper1-url]
- [arXiv:2607.24720][links-1]


[paper1-url]: https://arxiv.org/abs/2607.24720
[links-1]: https://arxiv.org/pdf/2607.24720
