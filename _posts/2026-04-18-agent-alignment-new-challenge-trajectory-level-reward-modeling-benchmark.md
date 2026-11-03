---
layout: post
title:  "一分钟读论文：《轨迹级奖励建模基准》"
author: unbug
categories: [AI, MachineLearning]
image: assets/images/ai-trajectory-reward.svg
tags: [reward-modeling, agent-alignment, trajectory-level, plan-reward-bench]
description: "Plan-RewardBench 是面向智能体轨迹级偏好的基准，用安全拒绝、工具误用、复杂规划、错误恢复四类任务检验评估器，三类主流评估器在长轨迹上性能急剧下降。"
---

南京大学软件新技术全国重点实验室与阿里巴巴高德地图合作的 ACL 2026 论文[《Aligning Agents via Planning: A Benchmark for Trajectory-Level Reward Modeling》][paper1-url]提出轨迹级偏好基准 **Plan-RewardBench**，检验评估模型能否在复杂工具使用场景中区分偏好轨迹与干扰轨迹，结果显示生成式、判别式和 LLM-as-a-Judge 三类评估器全部面临重大挑战，性能在长轨迹上急剧下降。

## 从单步输出到行为序列
在经典的人类反馈强化学习（RLHF）中，奖励模型（Reward Model，为强化学习提供偏好信号的评分模型）是模型对齐的基本信号提供者，评估对象是孤立的单步输出。随着 LLM 演进为能自主调用工具、执行复杂规划的 Agent 系统，需要评判的对象变成了**整条行为序列**：中间一步看似合理的局部决策可能是全局弯路，首步的规划错误往往到任务末尾才暴露。

该领域此前缺乏专门评估奖励模型在工具集成环境中能力的基准。传统奖励模型主要面向单步输出设计，难以捕捉多步行为序列的整体质量；LLM-as-a-Judge 在单轮推理中表现出色，却难以权衡多步决策的连贯性与长期目标的一致性。Plan-RewardBench 针对的正是这一空白。

![轨迹级奖励基准]({{ site.baseurl }}/assets/images/ai-trajectory-reward.svg)

## Plan-RewardBench 的核心设计
基准围绕四类代表性任务家族构建：**安全拒绝**、**工具不相关或不可用**、**复杂规划**、**鲁棒错误恢复**。每条测试数据由一条经过验证的偏好轨迹和若干条容易混淆的困难负例轨迹组成，要求评判模型做出正确区分。

困难负例的构造有三种方式：用多个模型自然 rollout 采样出形似而神散的干扰轨迹；用规则程序对正确轨迹做扰动；用 LLM 做最小改动编辑，让错误轨迹在表面上与正确轨迹几乎一致。这种设计逼迫评估器关注规划质量本身，而不是表面流畅度。评估采用统一的成对比较协议，按轨迹长度和任务类别分别报告准确率。

## 三类评估器的系统性缺陷
基准对三类主流评估器家族进行了系统测试。基于奖励模型的评估器（含生成式与判别式）难以捕捉多步序列的整体质量；LLM-as-a-Judge 在长轨迹上判断力明显衰退；混合评估器同样未能突破瓶颈，说明当前混合策略没有有效融合各方优势。

论文还对失败模式做了诊断分析：评估器普遍对轨迹长度敏感，长序列上的性能退化最为剧烈，凸显出针对 Agent 场景做轨迹级奖励建模专项训练的必要性。轨迹质量难以评判的另一面是如何从海量轨迹中找出违规证据，可参考站内[Meerkat 跨轨迹审计][meerkat-post]一文。该基准同时提供可复用的 Agent 规划偏好数据构建蓝图。

## References
- [Plan-RewardBench 论文][paper1-url]
- [相关阅读：Meerkat 跨轨迹审计][meerkat-post]


[paper1-url]: https://arxiv.org/abs/2604.08178
[meerkat-post]: {{ site.baseurl }}/2026-04-17-multi-agent-auditing-tool-meerkat-4x-security-vulnerabilities/
