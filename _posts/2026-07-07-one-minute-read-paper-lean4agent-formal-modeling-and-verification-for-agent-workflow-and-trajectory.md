---
title: "一分钟读论文：《Lean4Agent——用依赖类型语言验证 Agent》"
author: unbug
categories: [AI, FormalMethods]
image: assets/images/lean4agent.svg
tags: [agent, formal-verification, lean4]
layout: post
---

LLM Agent 的工作流设计长期缺乏形式化保障，研究者通常依赖经验性测试和统计评估来判断一个 Agent 流程是否可靠。[这篇来自 UC Berkeley Tong Zhang 团队的新论文](https://arxiv.org/abs/2606.06523)首次提出用 Lean4 这一依赖类型语言对 Agent 工作流和执行轨迹进行统一的形式化建模与验证，并在此基础上实现了自动修订闭环。

## 核心问题：Agent 工作流的"黑盒"困境

当前 LLM Agent 系统（如 ReAct、Plan-and-Solve）的工作流设计高度依赖直觉和试错。一个 Agent 由多个工具调用、状态转移和决策分支组成，其正确性往往只能通过大量实验来间接验证。这种经验主义方法存在三个根本缺陷：无法在部署前证明工作流的语义一致性——即 Agent 是否会在某些输入下进入死循环或产生不可预期的行为；当 Agent 表现不佳时缺乏系统性的诊断手段来确定是工具选择错误还是推理逻辑有漏洞；不同 LLM 模型在同一工作流上的表现差异难以归因，因为工作流本身没有被精确定义。

## FormalAgentLib：用依赖类型语言建模 Agent

论文的核心贡献是 FormalAgentLib——一个可扩展的 Lean4 库，用于在显式假设下对 Agent 工作流进行形式化建模。其关键设计思路是将 Agent 的执行过程表示为依赖类型的命题，使得每个步骤的正确性都可以被机器检查。

具体而言，FormalAgentLib 将 Agent 的工作流分解为若干可验证的语义组件：工具调用的前置条件和后置条件、状态转移的类型约束、以及整体工作流的终止性和一致性证明。由于 Lean4 是依赖类型语言，研究者可以用类型系统直接编码这些约束——例如，一个代码生成工具的输入类型必须是合法的 Python 源码字符串，输出类型必须是经过语法检查的代码块。这种建模方式的优势在于验证结果不是概率性的而是确定性的：如果一个工作流通过了 FormalAgentLib 的验证，就意味着在给定假设下其语义一致性得到了数学证明。

## LeanEvolve：从验证到自动修订的闭环

论文的另一大贡献是 LeanEvolve——一个基于验证结果的自动工作流修订框架。其工作流程遵循"验证发现缺陷→自动修订工作流→重新验证"的闭环逻辑：首先，FormalAgentLib 对当前工作流进行形式化验证，识别出违反类型约束或语义一致性的步骤；然后，系统根据验证错误自动生成修订建议——例如当检测到某个工具调用的输入类型不匹配时，LeanEvolve 会在该调用前插入一个类型转换步骤；最后，修订后的工作流重新进入验证流程直到通过全部检查。

这一闭环机制的意义在于它将形式化验证从"事后审计"转变为"设计驱动"——工作流的每一次迭代都在形式化约束下进行，从而逐步增强其可靠性。

## 实验结果：验证确实带来性能提升

论文在 SWE-Bench-Verified 和 ELAIP-Bench 两个基准上进行了系统评估，覆盖 Claude Sonnet 4、GPT-4o、Gemini 2.5 Pro 等 5 个主流 LLM。关键数据如下：通过 FormalAgentLib 验证的工作流相比未经验证的基线平均性能提升 11.94%；LeanEvolve 在 SWE-Bench-Verified 上进一步将性能提升 7.47%，表明自动修订机制能够有效改善工作流的实际表现。这一结果打破了"形式化方法只适用于理论场景"的传统认知——在 LLM Agent 领域，严谨的形式化建模同样能带来可量化的工程收益。

## References

- Ruida Wang, Jerry Huang, Pengcheng Wang, Xuanqing Liu, Luyang Kong, Tong Zhang. Lean4Agent: Formal Modeling and Verification for Agent Workflow and Trajectory. arXiv:2606.06523, 2026.
- https://arxiv.org/abs/2606.06523
