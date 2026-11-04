---
layout: post
title:  "一分钟读论文：《iGRPO让AI学会自我反馈》"
author: unbug
categories: [AI]
image: assets/images/2026-03-03-igro.svg
tags: [LLM, Reasoning, ReinforcementLearning, Mathematics]
description: "NVIDIA Research 提出两阶段强化学习方法 iGRPO，让大语言模型以自身最佳解为条件继续改进，无需外部批评模型或批评文本。在多个数学基准上平均最高提升 3.96%，AIME24 得分达 85.62%，并能延迟训练中的熵崩溃。"
---

NVIDIA Research 的论文[《iGRPO: Self-Feedback Reinforcement Learning for LLM Reasoning》][paper1-url]提出两阶段自我反馈训练方法 iGRPO，在多个数学基准上平均最高提升 `3.96%`，AIME24 得分达 `85.62%`。

![iGRPO 两阶段自我反馈训练框架示意]({{ site.baseurl }}/assets/images/2026-03-03-igro.svg)

## 从外部打分到自我反馈

GRPO(Group Relative Policy Optimization，组相对策略优化)等强化学习方法能提升大语言模型的推理能力，但训练信号完全依赖外部奖励，模型就像永远等老师打分、从不自己检查作业的学生，能力上限被奖励信号的质量锁死。iGRPO 的思路是让模型把超越自己上一次最佳表现当作学习目标，不需要额外的批评模型，不生成批评文本，只沿用同一个标量奖励，把反馈环节内化进训练循环本身。

## 两阶段的工作方式

iGRPO 把一轮训练拆成两步。第一阶段是探索与选择：模型对同一道题生成多个候选解答，按奖励信号选出最强的那次尝试，相当于在草稿纸上比较几种解法后圈出最靠谱的一个。第二阶段是条件化改进：把选出的最佳解作为条件输入，让模型在它的基础上生成更好的解答，学习如何超越自己此前的表现，相当于基于正确思路继续打磨答案。整个流程只增加一次条件生成，不引入任何外部评判组件。

论文同时指出，强化学习训练中常见的熵崩溃——模型过早变得保守、只输出高确定性答案，从而停止探索——被 iGRPO 明显延迟；使用生成式法官(generative judge，即让模型以生成方式判定答案正确性)还能带来额外收益，模型不仅拿到分数，还能理解分数从何而来。

## 基准测试的表现

NVIDIA Research 的三组对照实验中，iGRPO 在 Nemotron-H-8B-Base-8K 上把基线 `41.1%` 提升到 `45.0%`，提升 `3.96%`；DeepSeek-R1-Distill-Qwen-7B 从 `68.3%` 提升到 `69.9%`，OpenMath-Nemotron-14B 从 `76.7%` 提升到 `78.0%`，模型规模从 7B 到 14B 均有收益，说明这不是小模型专属的改进。在 AceReason-Math 数据集上，OpenReasoning-Nemotron-7B 加 iGRPO 在 AIME24 得分 `85.62%`、AIME25 得分 `79.64%`，为当前最先进水平。框架本身不绑定 GRPO：论文显示同样的两阶段结构也能提升 DAPO 和 GSPO 等其他强化学习方法，说明自我反馈是一个可迁移的通用机制，而非针对某一算法的补丁。

## 工程价值与适用边界

自我反馈机制省去了训练外部批评模型的环节，也省去了生成和维批文本的成本，简化了强化学习流程；实验基于开源模型，结果可复现、可验证，对教育、科研、工程等需要可靠数学推理的场景有直接价值。作者团队包括 Ali Hatamizadeh、Shrimai Prabhumoye、Igor Gitman 等研究者，实验覆盖多个基座模型与基准。局限在于方法仍依赖标量奖励的可靠性，在奖励难以自动判定的开放式任务上收益如何，论文尚未给出系统结论。同类方向上，[DeepSeek-R1 纯强化学习解锁推理][r1-post]证明无需人类标注推理轨迹也能激发模型的推理能力；两篇论文共同说明，强化学习正在取代人工监督成为推理训练的主引擎，训练信号从哪里来，正在取代参数规模成为决定模型能力上限的关键因素。

## References
- [arXiv:2602.09000][links-1]


[paper1-url]: https://arxiv.org/abs/2602.09000
[links-1]: https://arxiv.org/abs/2602.09000
[r1-post]: {{ site.baseurl }}/2026-03-02-deepseek-r1-reinforcement-learning-reasoning/
