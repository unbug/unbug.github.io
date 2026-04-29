---
layout: post
title:  "一分钟读论文：《自动合成多智能体漏洞发现方案》"
author: unbug
categories: [AI, Security]
image: assets/images/article-38-agentflow.svg
tags: [MultiAgent, Security, Harness, AgentFlow, Vulnerability]
---

加州大学圣塔芭芭拉分校等机构研究者发表的论文[《Synthesizing Multi-Agent Harnesses for Vulnerability Discovery》][paper1-url]，提出AgentFlow框架，使用类型化图DSL自动合成多智能体协作方案，在Google Chrome中发现10个未知零日漏洞。

多智能体系统在漏洞发现等安全任务中表现优异，但协作方案（harness）通常手动编写。改变harness可以在保持语言模型不变的情况下将成功率提升数倍，然而手动设计耗时且难以穷尽所有可能。AgentFlow通过类型化图DSL定义搜索空间，结合运行时反馈驱动的外层循环，自动诊断和重写harness。

## AgentFlow框架

AgentFlow的核心是一个类型化图领域特定语言（DSL），其搜索空间同时覆盖智能体角色、提示词、工具、通信拓扑和协调协议。与传统手动设计harness不同，AgentFlow将harness设计视为一个可搜索、可优化的问题。

框架包含三个核心组件：Proposer根据当前harness的失败模式生成新的图结构变体；Execute-Observe-Score组件执行候选harness并收集运行时信号；Diagnoser读取目标程序的运行时信号（如sanitizer输出、覆盖率数据），诊断harness中导致失败的具体部分。

类型化约束确保生成的harness在结构上是合法的：每个节点必须对应有效的智能体角色，每条边必须定义合法的通信通道，每个反馈通道必须与目标程序的信号类型匹配。

## 反馈驱动的自动优化

AgentFlow的反馈驱动外层循环是其关键创新。传统harness优化器仅依赖粗粒度的通过/失败信号，无法诊断失败原因。AgentFlow从目标程序本身读取运行时信号，精确定位harness中的失败环节。

优化过程迭代进行：Proposer生成候选harness，Execute-Observe-Score执行并评分，Diagnoser分析失败模式，反馈信号指导下一轮搜索。这种闭环优化使AgentFlow能够在复杂的设计空间中高效探索。

## 实际安全影响

论文在两个场景上评估了AgentFlow：

- **TerminalBench-2**：使用Claude Opus 4.6，AgentFlow达到84.3%的成绩，为公开leaderboard最高分
- **Google Chrome**：使用Kimi K2.5，AgentFlow自动合成了针对Chrome的漏洞发现harness，发现10个未知零日漏洞，包括2个Critical级别的沙箱逃逸漏洞（CVE-2026-5280和CVE-2026-6297）

这两个Critical CVE的发现证明了自动合成harness的实际安全价值——自动生成的多智能体协作方案能够发现人类审计师和传统模糊测试工具遗漏的深层安全问题。

## 核心启示

AgentFlow揭示了一个关键观察：**多智能体系统的编排本身就是一个可优化的设计空间**。当语言模型固定时，harness的设计对成功率的影响可以超过数倍。通过类型化图DSL和反馈驱动优化，AgentFlow将harness设计从手工艺术转变为自动化工程。

这一方向对安全领域的影响尤为深远。漏洞发现任务需要智能体之间复杂的协作模式（源码分析、输入生成、崩溃分析），AgentFlow证明了这种复杂协作模式可以被自动合成和优化，而非依赖安全专家的手工设计。

## References

- [arXiv 页面][links-1]
- [PDF 全文][links-2]


[paper1-url]: https://arxiv.org/abs/2604.20801
[links-1]: https://arxiv.org/abs/2604.20801
[links-2]: https://arxiv.org/pdf/2604.20801
