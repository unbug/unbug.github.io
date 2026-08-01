---
layout: post
title:  "一分钟读论文：《AgentRadio：面向长程多智能体协作的被动感知》"
author: unbug
categories: [AI, Engineering]
image: assets/images/agentradio-framework.svg
tags: [multi-agent, agentic-coding, asynchronous-communication, passive-awareness]
---

佐治亚理工学院等机构的研究团队发表的论文[《AgentRadio: Passive Awareness for Long-Horizon Multi-Agent Collaboration》][paper1-url]提出了一种异步消息传递层，使编码 Agent 能在后台监听队友的消息而不中断前台工作。在 SWE-Atlas QnA 基准测试上，四个由 AgentRadio 组织的 Claude Code Agent 解决了 62.1% 的任务，比单 Agent 高出 29.8 个百分点，甚至超越了使用更新模型 Opus 4.8 的单 Agent（57.2%）。

## 核心问题：通信与计算的互斥

现有大多数多智能体系统在并行工作时面临一个根本限制——通信和工作是互斥的。当 Agent A 在执行任务时，它无法同时接收 Agent B 的发现；只有等到阶段边界或同步轮次时，信息才能交换。这种设计在简单分解任务中或许足够，但在代码库理解等长程任务中暴露出明显不足：一个 Agent 的中间发现可能完全改变另一个 Agent 的工作方向，而等待阶段边界的延迟意味着大量无效工作。

AgentRadio 的核心洞察是：**通信不应该中断计算**。通过引入"被动感知"机制——让 Agent 在后台监听消息的同时继续前台工作——系统实现了真正的异步协作。

## AgentRadio 框架架构

AgentRadio 暴露三个操作原语给每个 Agent。**create_thread** 在消息服务器上打开一个命名对话并返回标识符。**send_message** 将消息追加到线程中并立即返回，无论是否有人监听。最关键的是 **wait_for_mention**——它作为后台任务运行，使队友的消息在工作步骤之间浮现而不中断前台工作。

五阶段协议构成了协作的组织框架：**分工**将任务分配给多个 Agent，**执行**让各 Agent 并行工作，**实时发现**允许 Agent 在发现信息时立即发布而非等到阶段边界，**协商**根据新发现调整策略，最后**整合**汇总结果。其中第三阶段的"实时发现"是区别于现有系统的核心——一个 Agent 的发现可以在执行中途被队友捕获并融入其 ongoing 任务中。

## 实验评估与消融分析

实验在 SWE-Atlas QnA 基准上进行，包含 124 个关于 11 个生产代码库的问题，每个任务平均携带 12.3 个严格验证的 rubric。单 Agent（Claude Code Opus 4.6）仅解决 32.3% 的任务，而四个由 AgentRadio 组织的 Agent 达到 62.1%，相对提升 92%。即使使用更强的 Opus 4.8 模型，单 Agent 也仅达到 57.2%，仍低于 AgentRadio 方案。

消融实验进一步验证了各组件的有效性：**被动感知单独贡献**在 Opus 4.6 上增加 10.5 分、DeepSeek V4 Pro 上增加 11.3 分，证明后台监听机制本身就有显著增益。**难度分层分析**显示增益随任务难度增长——与"中途修正"作为核心机制的假设一致。**结构优于算力**实验表明完整方案击败了计算匹配的 best-of-6 采样（Opus 4.6: 62.1% vs 37.9%，DeepSeek V4 Pro: 58.4% vs 31.4%），证明协作架构本身比单纯增加计算量更有效。

## References

- [AgentRadio: Passive Awareness for Long-Horizon Multi-Agent Collaboration][paper1-url]
- [AgentRadio 开源代码][links-1]


[paper1-url]: https://arxiv.org/abs/2607.28430
[links-1]: https://github.com/Coral-Protocol/AgentRadio
