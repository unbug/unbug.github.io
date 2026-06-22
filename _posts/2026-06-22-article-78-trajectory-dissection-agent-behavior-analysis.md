---
layout: post
title:  "一分钟读论文：《通过智能体轨迹解剖模型行为》"
author: unbug
categories: [AI, Agent]
image: assets/images/trajectory-dissection-diagram.svg
tags: [Agent, TrajectoryAnalysis, ModelBehavior]
---

堪萨斯大学的一篇论文[《Dissecting model behavior through agent trajectories》][paper1-url]，首次将**意图-执行差距（intent-execution gap）**形式化为可测量的系统偏差。通过分析`138k`条智能体轨迹、覆盖Claude、Gemini、GPT、Grok、Qwen五大模型家族，论文证明：AI Agent性能不仅是建模问题，更是系统问题——模型假设与harness行为之间的差距会阻止模型能力的充分转化。

## 从结果评估到过程诊断

传统Agent评估依赖`pass@1`等聚合分数，告诉你Agent做对了什么但不告诉你怎么做。堪萨斯大学团队构建了**Simple Strands Agent（SSA）**框架，将Agent轨迹映射到代码状态空间而非仅依赖文本日志。当两个模型在SWE-Pro上获得相同分数时，解题路径可能截然不同：有的快速编辑后反复测试，有的偏好长时间思考再动手。聚合分数掩盖了这些差异，而轨迹分析揭示了同分不同行的行为模式。

## 细粒度指标揭示行为画像

论文提出了一套超越传统评估的细粒度指标体系。**编辑频率**衡量代码修改投入密度，**测试活动**追踪验证行为分布特征，**相变点**识别解题策略发生根本转变的关键节点。通过对138k条轨迹的分析，团队发现不同模型家族在这些指标上呈现系统性差异：某些模型早期投入大量编辑精力但测试频率较低，另一些则采取小步快跑、频繁验证的策略。

## 填补可观测性空白

当前Micropaper系列构建了"预防-管理-恢复"可靠性链条：SEVRA（#75）回答何时需要验证，LedgerAgent（#76）解决如何管理状态，ToolMaze（#77）处理失败后如何恢复。但这一链条缺少一个核心维度——**可观测性/诊断层**。就像有了刹车、方向盘和备胎但没有仪表盘。第78篇论文填补了这一空白：在预防、管理和恢复之间，需要知道Agent实际在做什么、怎么做、为什么这么做。

## References


[paper1-url]: https://arxiv.org/abs/2606.17454
