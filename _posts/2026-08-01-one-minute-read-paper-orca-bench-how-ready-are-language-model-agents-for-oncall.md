---
layout: post
title:  "一分钟读论文：《ORCA-bench：语言模型 Agent 准备好应对 On-Call 了吗？》"
author: unbug
categories: [AI, Engineering]
image: assets/images/orca-bench-framework.svg
tags: [agent-evaluation, oncall, root-cause-analysis, sre-agents]
---

研究团队发表的论文[《ORCA-bench: How Ready Are Language Model Agents for Oncall?》][paper1-url]提出了一个生产保真度的根因分析基准测试，将通用编码 Agent 置于真实的生产环境中进行评估。在包含 1,079 个任务的测试中，最佳语言模型 Agent 在中等难度任务上的 RCA 准确率仅为 25.3%，在困难任务上仅 10.0%——即使使用 Claude Fable 5 模型也无法弥合这一差距。

## 核心问题：合成基准与生产现实的鸿沟

现有大多数 Agent 评估基于合成或简化的任务设置，无法反映真实生产环境的复杂性。On-call 根因分析（RCA）尤其具有挑战性：它要求从模糊的用户报告出发，在噪声指标、日志、追踪和源代码中进行推理，而且往往在故障发生数小时之后才开始。

ORCA-bench 的核心创新在于**生产保真度测试床**——一个六天的 OpenTelemetry 仪器化微服务系统，暴露真实的遥测接口（Prometheus、Jaeger、OpenSearch via Grafana）和完整的源代码访问权限。这种设置使评估结果更接近真实部署场景中的 Agent 表现。

## ORCA-bench 架构设计

ORCA-bench 由两个核心组件构成。**生产保真度测试床**是一个真实的微服务系统，包含六天的指标、日志和追踪数据，通过标准遥测接口暴露给 Agent。**1,079 个 RCA 任务**系统性变化报告具体性、检测时间和并发故障场景，确保评估覆盖多样化的真实 oncall 情境。

Ground-truth symptoms 由 SRE 专家审核签署，LLM-as-judge 的评分经人类重新验证（Cohen's κw=0.90），确保评估结果的可靠性。这种双重验证机制在 Agent 基准测试中较为罕见，为实验结果提供了坚实的可信度基础。

## 实验评估与关键发现

研究评估了五个前沿 Agent 模型在 ORCA-bench 上的表现。核心发现是：**当前最佳 Agent 在生产保真度 oncall 场景中的准确率仍然很低**。Medium 难度任务（真实输入设置）仅 25.3%，Hard 难度任务仅 10.0%。最弱模型在 40% 的故障报告中产生不可信的根因——即幻觉式诊断。

关键发现还包括：**移除源代码访问使所有指标下降**，表明代码理解是 RCA 的核心能力。**当前性能是下界估计**——测试床只有 50GB 数据和六天运行时间，而真实生产系统大几个数量级、更动态且更多样化。这意味着在实际部署中，Agent 的 oncall 表现可能比 ORCA-bench 报告的还要差。

## References

- [ORCA-bench: How Ready Are Language Model Agents for Oncall?][paper1-url]


[paper1-url]: https://arxiv.org/abs/2607.28545
