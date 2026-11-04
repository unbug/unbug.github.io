---
layout: post
title:  "一分钟读论文：《Agent 规划的轨迹奖励基准》"
author: unbug
categories: [AI, MachineLearning]
image: assets/images/ai-trajectory-reward.svg
tags: [reward-modeling, agent-alignment, trajectory-level, benchmark]
description: "ACL 2026 主会论文发布轨迹级偏好基准 Plan-RewardBench，用四类代表性任务检验评判模型区分偏好轨迹与干扰轨迹的能力，生成式、判别式和 LLM 评审三类评估器在长轨迹上全面失效。"
---

ACL 2026 主会论文[《Aligning Agents via Planning: A Benchmark for Trajectory-Level Reward Modeling》][paper1-url]发布轨迹级偏好基准 Plan-RewardBench，评估奖励模型在多步工具调用场景中区分**偏好轨迹**与**干扰轨迹**的能力，结果显示三类主流评估器全部面临重大挑战，长轨迹上性能急剧下降。

![轨迹级奖励建模]({{ site.baseurl }}/assets/images/ai-trajectory-reward.svg)

## 从单步到多步：奖励建模的根本转变
在经典的人类反馈强化学习（RLHF，用人类偏好训练评分模型再驱动强化学习的方法）中，奖励模型（Reward Model，为强化学习提供偏好信号的评分模型）是模型对齐的基本信号提供者，评估对象是孤立的单步输出。随着 LLM 演进为能自主调用工具、做复杂推理的 Agent 系统，需要评判的变成了**整条行为序列**：一次任务可能包含几十步搜索、代码执行和文件操作，中间一步的“局部最优”完全可能是全局的弯路，而首步的错误规划往往要到末尾才暴露。

然而该领域此前缺乏专门基准来评估奖励模型在工具集成环境中的能力，现有方法在面对复杂 Agent 场景时难以反映真实的对齐效果。Plan-RewardBench 填补的正是这一空白。

## Plan-RewardBench 的核心设计
基准覆盖 `四类代表性任务`：安全拒绝（Safety Refusal）、工具无关或不可用（Tool-Irrelevance/Unavailability）、复杂规划（Complex Planning）、鲁棒错误恢复（Robust Error Recovery）。前三类对应 Agent 最容易出问题的决策点：该拒绝时不能误接，不该调用工具时不能硬调，长程规划不能绕弯路；错误恢复则考察一步失败后能否合理重试而不是越修越错。

每个任务族包含经过验证的正样本轨迹，以及三种方式构造的**易混淆难负例**：多模型自然 rollout 产生的真实失败轨迹、基于规则的扰动、以及最小改动的 LLM 扰动。干扰轨迹刻意与正确路径高度相似，逼迫评判者真正理解规划的因果结构，而不是依赖表面特征打分——例如仅仅因为轨迹更长、工具调用次数更多就给出高分。所有评估在统一的成对比较协议下进行，并报告跨轨迹长度和任务类别的准确率变化。

## 三类评估器的系统性缺陷
- **生成式与判别式奖励模型**：主要针对单步输出设计，架构和训练目标难以捕捉多步序列的整体质量
- **LLM-as-a-Judge**：单轮推理表现出色，但难以权衡多步决策的连贯性与长期目标一致性
- **三类共同的失效模式**：任务轨迹越长，性能下降越剧烈，论文还对主要失败模式做了诊断分析

结论是明确的：Agent 时代的轨迹级奖励建模需要**专门的训练**，直接沿用单步奖励模型或通用评审提示词并不可靠。Plan-RewardBench 同时提供了一套可复用的蓝图，用于构建 Agent 规划偏好数据。对正在用 RLHF 微调 Agent 的团队，这意味着评分信号本身要先经过轨迹级检验。

## References
- [Plan-RewardBench 论文原文][paper1-url]
- [相关研究：AI Agent 安全与信任机制][links-1]


[paper1-url]: https://arxiv.org/abs/2604.08178
[links-1]: {{ site.baseurl }}/ai-agent-security-trust-mechanisms/
