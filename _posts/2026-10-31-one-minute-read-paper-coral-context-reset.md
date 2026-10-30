---
layout: post
title:  "一分钟读论文：《智能体学会主动清空记忆》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/coral-context-checkpoint.svg
tags: [llm, ai-agents, reinforcement-learning, context-management]
description: "港中文、腾讯与港科大在 COLM 2026 提出 CORAL：长周期任务中智能体主动存档进度并清空脏上下文开新回合，8B 模型在 GAIA 平均准确率 42.8%，输入 token 比 ReAct 智能体少 6 到 7 倍，比被动截断更省更准。"
---

本文是香港中文大学、腾讯与香港科技大学发在 COLM 2026 的论文[《Don't Lose the Thread》][paper1-url]：智能体学会存档进度、清空脏上下文开新回合，`8B` 模型在 GAIA 基准平均准确率 `42.8%`，输入 token 比 ReAct 智能体少 `6-7` 倍。

论文 `2026` 年 `10` 月 `29` 日提交，已被 COLM 2026 录用，PDF 页眉标注 Published as a conference paper at COLM 2026，作者为 Zheng Zhu、Xiaozhuan Liang、Xi Chen、Bei Yu、Jiaya Jia。方法名 CORAL，取 COgnitive Resource Self-ALlocation（认知资源自我分配）首字母缩写。

![checkpoint 后重置上下文开新回合]({{ site.baseurl }}/assets/images/coral-context-checkpoint.svg)

## 上下文越滚越长，注意力被稀释

长周期任务（多步搜索、跨文件改代码、持续数小时的调查）里，智能体的工作记忆会被不断膨胀的无关信息塞满：失败的尝试、读过就没用的网页、重复的工具输出，全都堆在上下文窗口里越滚越长。认知过载（工作记忆被无关信息占满）的直接后果是注意力稀释，规划与推理随之受阻：模型不是不会做下一步，而是被噪声盖住了下一步。站内[《谁来验收AI基建的代码》]({{ site.baseurl }}/one-minute-read-paper-infradev-ai-infrastructure/)同样研究过长期跑任务的 Agent：那篇看任务书与验收口径，这篇看上下文负担——窗口塞满之前，谁来丢垃圾。

## 存档、清空、开新回合

CORAL 给智能体一个主动动作：在关键节点 checkpoint（存档任务进度与已验证事实），重置被污染的上下文，只留 checkpoint 信息开一个新 episode（回合），从干净状态接着做。这与被动截断或滑动窗口有本质区别：何时清、留什么由模型自己决定，不是由框架按固定长度硬切。乱清反而丢关键事实，预训练模型并不天生善用这个动作。配套 MERPO（Multi-episode Agentic Reinforced Policy Optimization，多回合智能体强化策略优化）算法把 checkpoint 能力训进策略，让模型学会在污染开始前动手，而不是等撑爆窗口才被动裁剪。

## 42.8% 与 6-7 倍的 token 差距

GAIA 基准（分三档难度、考多步工具调用与网页检索的通用助手基准）上，CORAL 训练出的 `8B` 模型平均准确率 `42.8%`，提升集中在长周期最难的 Level 2 与 Level 3 两档，这两档正是长周期能力的分水岭。成本侧同样占优：同样的任务用更少 token 换更高准确率，干净上下文本身就是性能来源。能力可泛化到多跳 Knowledge QA（串联多个事实才能作答的问答题）；在更难的 BrowseComp 上，CORAL 让一个强的专有智能体提升 `8.0` 分，这条路对前沿模型同样有增量。论文页标注了代码仓库地址，实测访问返回 `404`，开源可用性以作者后续发布为准。

## 把清上下文做成一等动作

对开发者与独立工作者，启示落在工程习惯上：跑长任务时，与其指望模型在几十万 token 的噪声里保持清醒，不如在框架或提示词里显式提供存档加开新回合的动作，并给出 checkpoint 模板——已验证事实、未决问题、下一步计划各写一段。CORAL 的实验说明，模型要经强化学习才学会何时按下清空动作；没有训练条件的团队，可以用模板强制模型在每个阶段交一次答卷再轻装上阵。把上下文当成需要主动管理的资源，而不只是一个长度上限：主动清空比被动撑爆便宜得多。

## References
- [Don't Lose the Thread: Empowering Long-Horizon LLM Agents with Cognitive Resource Self-Allocation（arXiv:2610.40350）][paper1-url]
- [COLM 2026][links-1]
- [谁来验收AI基建的代码（站内解读）][links-2]


[paper1-url]: https://arxiv.org/abs/2610.40350
[links-1]: https://colmweb.org/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-infradev-ai-infrastructure/
