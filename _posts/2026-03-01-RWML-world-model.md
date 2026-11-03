---
layout: post
title:  "一分钟读论文：《RWML：让 LLM 智能体学会预测未来》"
author: unbug
categories: [AI]
image: assets/images/2026-03-01-rwml-world-model.svg
tags: [AI, Paper Review, Reinforcement Learning, World Models, LLM, AI Agents]
description: "微软研究院与哥伦比亚大学提出 RWML，用强化学习和嵌入空间相似度自我监督地训练 LLM 智能体的世界模型，ALFWorld 成功率从 13% 提升至 87.9%，且比监督微调遗忘更少。"
---

微软研究院、哥伦比亚大学等机构的论文[《Reinforcement World Model Learning for LLM-based Agents》][paper1-url]（arXiv:2602.05842，2026 年 2 月）提出 RWML（Reinforcement World Model Learning），一种完全自我监督的世界模型训练方法，让 LLM 智能体学会预测行动后果，在 ALFWorld 基准上把成功率从 `13.0%` 提升到 `87.9%`。

## 用强化学习替代监督微调

大语言模型在智能体场景中常无法预测行动后果：去厨房找刀却翻遍抽屉，处理客服问题忘记先检查飞行模式。RWML 针对的正是这种前瞻能力缺失。此前方法多用 SFT（监督微调）让 LLM 预测下一状态，存在两个硬伤：过度关注 token 级准确性而忽略语义等价性，以及容易让模型死记硬背导致模型坍塌。

RWML 改为在预训练嵌入空间中比较预测状态与真实状态的相似度，用 GRPO（Group Relative Policy Optimization）算法做强化学习训练，不需要专家数据、更强的 LLM 或任务成功奖励。训练分两阶段：先用环境轨迹转成的状态-动作-下一状态三元组做世界模型学习，奖励基于嵌入相似度二值化（够近给 1.0 分，否则 0 分）；再用任务成功奖励做策略强化学习。数据子采样过滤过简单样本，推理链让模型预测前先推理，实验发现二值化奖励比连续奖励更稳健、不易被奖励攻击。

## 实验结果与更少的遗忘

在文本具身环境 ALFWorld 上，基础模型成功率 `13.0%`，仅自我监督的 RWML 达 `32.6%`，叠加策略 RL 后达 `87.9%`，比直接策略 RL 高 `6.9 点`，甚至超过使用专家数据的方法。在客服工具环境 τ² Bench 上，成功率从 `31.9%` 提升到 `43.7%`，比直接策略 RL 高 `5.7 点`，与专家数据方法性能相当。案例显示训练后模型能正确预测"刀最可能在灶台上"，仅 5 步完成任务，也会主动考虑飞行模式开启的情况。

意外发现是 RWML 比 SFT 造成更少的灾难性遗忘：在 MMLU-Redux、IFEval、MATH-500、GSM8k、GPQA-Diamond、LiveCodeBench 等基准上，其知识保留均显著优于 SFT，原因在于在线强化学习的参数更新更精确，只针对性修改一小部分参数。论文据此提出"中间训练"（mid-training）概念——在预训练和下游任务强化学习之间插入自我监督的世界模型学习阶段，与世界模型训练的另一条路线可对照站内[《千环境合成训练 AI 智能体》]({{ site.baseurl }}/agent-world-model-research/)阅读。


## References
- [RWML 论文][paper1-url]


[paper1-url]: https://arxiv.org/abs/2602.05842
