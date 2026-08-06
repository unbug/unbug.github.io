---
layout: post
title:  "一分钟读论文：《PAST-Bench：评估个人智能体递归自我改进的基础基准》"
author: unbug
categories: [AI, AgentFoundationModels]
image: assets/images/past-bench-framework.svg
tags: [PersonalAgents, RecursiveSelfImprovement, Benchmarking, ExperienceReuse]
---

香港中文大学和阿里巴巴集团合作的一篇论文[《PAST-Bench: Benchmarking the Foundations of Recursive Self-Improvement in Personal Agents》][paper1-url]，首次提出了针对个人 AI 智能体递归自我改进能力的系统性基准测试框架。该研究通过匹配的控制组设计隔离经验保留的因果效应，在 26 个任务族、204 个 episode 上评估了 7 个基础模型和 4 种 Agent 框架的跨会话能力演进表现：

## 评估范式创新

现有基准测试主要评估孤立任务的绝对性能，无法区分"模型本身强"和"从经验中学习后变强"这两个维度。PAST-Bench 的核心创新在于匹配的控制组设计——每个任务族包含有序 episode 序列，通过开启或关闭持久化机制来隔离经验保留的因果效应。

论文定义了四大能力维度：`memory_ability`（保留稳定偏好、约束和先例）、`procedural_ability`（复用流程和技能）、`proactive_information_gathering`（行动前查找先前上下文）和 `update_ability`（替换过时事实、规则和流程）。每个维度通过 artifact-level 和 trace-level 证据实现机制级归因，而非仅测量能力级表现。

## 实验结果与关键发现

在 7 个基础模型（MiniMax-M2.7、GLM-5.1、Kimi K2.6、DeepSeek-V4-Pro、GPT-5.4 等）和 4 种 Agent 框架（Hermes、Hermes+、nanobot、ZeroClaw）的实验中，核心发现如下：

跨会话经验带来的改进确实存在但不均衡。不同模型和框架在相同任务族上的表现差异显著，改进效果呈现明显的能力和模型依赖性。PAST-Bench 通过机制级归因揭示了表面增益背后的真实路径——部分 Agent 的增益可能来自其他因素而非真正的经验复用。

## Hermes+ 改进框架

基于 PAST-Bench 的诊断结果，论文提出了 Hermes+ 框架，在 Agent 循环中增加了五个针对性机制：`Plan`（执行前规划经验使用策略）、`Render`（改进经验的表示方式）、`Route`（改善经验检索路由）、`Gate`（质量门控控制）和 `Close`（状态管理）。

Hermes+ 在需要替换过时状态的任务上改进最显著，同时提供了更清晰的机制路径证据。然而，其效果仍然是能力依赖和模型依赖的，五个机制在其他 Agent 框架上的通用性尚未验证。

## 局限性与未来方向

PAST-Bench 存在若干已知局限性：任务覆盖范围有限（26 个任务族），评估器偏差风险（使用 MiniMax-M2.7 作为 judge model），以及 Hermes+ 的通用性未经验证。对于一次性任务或客服对话等场景，跨会话经验复用的价值相对有限。

未来观察点包括 PAST-Bench 是否会成为个人 Agent 自我改进能力的标准评估框架，以及与 Metis（探索模型原生记忆内化）形成互补的完整"Agent 记忆能力图谱"。

## References
- [PAST-Bench GitHub][links-1]


[paper1-url]: https://arxiv.org/abs/2608.04003
[links-1]: https://github.com/Gen-Verse/PAST-Bench
