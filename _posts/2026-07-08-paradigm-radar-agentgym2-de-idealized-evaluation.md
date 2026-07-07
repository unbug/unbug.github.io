---
layout: post
title: "AI 范式雷达：《AgentGym2——从理想化基准到真实世界部署的评估范式转移》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agentgym2-de-idealized.svg
tags: [AgentGym2, AgentEvaluation, Benchmarking, DeploymentReadiness, ToolDiscovery]
---

如果你正在构建生产级 AI 智能体，你可能已经发现一个令人不安的事实：在基准测试上表现优异的模型，在实际部署中却频频翻车。GPT-5 在 AgentGym2 上的平均分仅为 46.15（约 44%），Claude Sonnet 4.5 更是只有 37%。这揭示了一个被长期忽视的真相——**我们一直在用理想化的尺子，测量一个充满噪声和不确定性的真实世界**。

2026 年 7 月，AgentGym2 论文的发布标志着 Agent 评估领域的一次范式转移：从 benchmark-driven 的理想化测试，转向 deployment-ready 的去理想化评估。本文将带你深入理解这一转变的核心原理、关键数据，以及它对你构建 AI 智能体的实际意义。

## 为什么现有 Agent 基准不够用了

### 理想化的陷阱

过去几年，Agent 领域涌现了大量基准测试：ToolBench、WebArena、Aider-bench 等。这些基准在推动模型能力进步方面功不可没，但它们共享一个根本假设——**环境是理想的**。

具体来说，这些基准通常具备以下特征：

- **预封装的工具接口**：Agent 不需要发现工具，工具列表已经明确给出
- **干净的输入假设**：任务描述清晰完整，没有歧义或噪声
- **单一任务导向**：评估的是"在给定条件下完成特定任务的能力"
- **封闭的探索空间**：Agent 只能在预定义的工具集中选择

这些特征使得基准测试更像是一场"开卷考试"——你知道有哪些工具可用、输入是什么格式、任务目标是什么。在这种环境下，模型只需要展示推理和规划能力即可。

### 真实世界的残酷

然而，生产环境中的 Agent 面临的是完全不同的挑战：

- **工具需要主动发现**：环境中没有预定义的工具列表，Agent 需要通过探索找到可用的工具
- **输入充满噪声**：用户查询可能不完整、模糊甚至自相矛盾
- **端到端执行**：不只是推理和规划，还要完成从发现问题到解决问题的完整流程
- **工具组合创新**：将已有工具以新方式组合，解决从未见过的问题

这些挑战构成了 AgentGym2 的核心动机：**如果我们的基准测试无法反映真实部署的难度，那么基准分数的提升就只是"在理想世界中变得更好"，而非"在现实世界中变得更可靠"**。

## AgentGym2 框架核心原理

### 去理想化的四个维度

AgentGym2 通过四个相互正交的能力维度来评估 Agent：

**1. 端到端流程执行（End-to-End Procedure Execution）**

传统基准通常只评估 Agent 的推理和规划能力。AgentGym2 要求 Agent 完成完整的操作流程——从理解任务、发现工具、调用工具到验证结果，每一步都不能出错。这就像从"设计蓝图"升级为"实际施工"。

**2. 工具发现（Tool Discovery via Exploration）**

这是 AgentGym2 最具颠覆性的设计。在真实世界中，Agent 面对的是一个开放的工具生态——它不知道有哪些工具可用、每个工具的输入输出格式是什么、哪些工具能解决当前问题。Agent 必须通过探索环境来发现可用的工具。

**3. 工具组合（Tool Composition for Unseen Tasks）**

即使 Agent 发现了正确的工具，还需要将它们以正确的方式组合起来解决新问题。这要求 Agent 不仅理解单个工具的功能，还要理解工具之间的依赖关系和组合逻辑。

**4. 噪声鲁棒性（Robustness to Noisy Information）**

真实世界的输入从不完美。AgentGym2 通过注入噪声和不完整信息来测试 Agent 的鲁棒性——当查询包含错误信息、歧义表述或无关内容时，Agent 能否仍然给出正确的结果？

### 三种核心场景

基于上述四个维度，AgentGym2 设计了三种典型场景：

**复杂工具使用场景（Complex Tool Using）**：Agent 需要在开放环境中发现并组合多个在线工具来完成复杂任务。这是最接近真实部署的场景。

**数据分析场景（Data Analysis）**：Agent 需要处理包含噪声和缺失值的数据集，从中提取有价值的洞察。这考验 Agent 的数据理解和推理能力。

**深度搜索场景（Deep Search）**：Agent 需要在充满噪声的搜索结果中找到关键信息并完成综合报告。这考验 Agent 的信息筛选和整合能力。

## 实测数据：SOTA 模型的"翻车现场"

### 整体表现

AgentGym2 测试了 15 个主流模型，结果令人震惊：

| 模型 | Avg@3 得分 | 说明 |
|------|-----------|------|
| GPT-5 | 46.15 (~44%) | SOTA 专有模型中最高 |
| Claude Sonnet 4.5 | ~37% | 表现显著低于 GPT-5 |
| Gemini 2.5 Pro | 中等水平 | 同样面临严峻挑战 |
| Nex-N1-671B (开源) | 32.19 | 开源模型中最高 |
| DeepSeek-V3.1 | 21.66 | 开源模型表现 |

**关键发现**：即使是 GPT-5，在 AgentGym2 上的得分也仅为约 44%。这意味着在真实世界部署场景下，超过一半的任务无法被正确完成。

### 模型规模与性能的关系

AgentGym2 揭示了模型规模与性能之间的清晰关系：

| Qwen3 系列 | Avg@3 得分 |
|-----------|-----------|
| Qwen3-8B | 8.70 |
| Qwen3-32B | 10.53 |
| Qwen3-235B-A22B (非思考模式) | 25.40 |

模型规模越大，性能越高。但这并不意味着"更大的模型就能解决所有问题"——GPT-5（当前最强专有模型）的得分也仅为 46.15。

### Agentic Post-Training 的效果

一个重要的发现是：**Agentic post-training 可以显著提升开源模型的性能**。Nex-N1-32B（基于 Qwen3-32B 进行 agentic post-training）和 Nex-N1-671B（基于 DeepSeek-V3.1 进行 agentic post-training）分别比其基础模型提升了约 9.16% 和 10.53%。

这表明，**针对 Agent 场景的专门训练可以显著缩小开源模型与专有模型之间的差距**。

### 噪声对性能的影响

AgentGym2 通过注入噪声来测试模型的鲁棒性：

- **Claude Sonnet 4.5**：引入噪声后性能下降 6.4%
- **GPT-5**：引入噪声后性能下降 7.4%

这意味着，即使在最强大的模型中，噪声信息也会导致显著的性能退化。对于生产环境中的 Agent 来说，这是一个不容忽视的问题。

## 失败模式分析：Agent 在真实世界中的弱点

### 五大失败模式

通过对 GPT-5 的细粒度错误分析，AgentGym2 识别出以下主要失败模式：

| 失败模式 | 平均占比 | 说明 |
|---------|---------|------|
| 不正确的分析（Incorrect Analysis） | 24.0% | Agent 对任务的理解或推理出现偏差 |
| 探索不足（Insufficient Exploration） | 22.8% | Agent 未能充分探索环境中的可用工具 |
| 确认偏误（Confirmation Bias） | 24.7% | 在复杂工具场景中，Agent 过度依赖内部先验而非主动验证 |
| 指令误解（Instruction Misinterpretation） | 27.0% | 在数据分析场景中，Agent 未能精确对齐细粒度任务约束 |
| 过早终止搜索（Premature Termination） | 35.2% | 在深度搜索场景中，Agent 在噪声环境中过早结束搜索 |

### 深层洞察

这些失败模式揭示了一个核心问题：**当前 Agent 的核心弱点不在于推理能力本身，而在于对开放环境的探索能力和鲁棒性**。

具体来说：

1. **探索不足**是跨场景的普遍问题。Agent 倾向于快速收敛到第一个看似合理的解决方案，而不是充分探索所有可能性。这在真实部署中可能导致次优甚至错误的结果。

2. **确认偏误**在复杂工具场景中尤为突出。当 Agent 找到一些工具后，它倾向于直接使用这些工具，而不去验证是否有更好的选择。这反映了 Agent 缺乏"元认知"能力——对自身决策过程的反思和修正。

3. **过早终止搜索**表明 Agent 在面对噪声环境时缺乏耐心。真实世界中的信息往往是碎片化的，Agent 需要能够在不确定条件下持续探索直到找到足够证据。

## 范式转移的深层含义：从 benchmark-driven 到 deployment-ready

### 旧范式的局限

传统 Agent 基准测试的核心假设是：**如果模型在基准上表现好，那么它在生产环境中也会表现好**。这个假设在过去几年被广泛接受，但 AgentGym2 的数据明确推翻了它。

原因很简单：基准测试评估的是"在理想条件下的推理能力"，而生产环境需要的是"在噪声和不确定性中的端到端执行能力"。这两者之间的差距，远比我们想象的要大。

### 新范式的核心原则

AgentGym2 代表的新范式包含三个核心原则：

**1. 去理想化（De-idealization）**

真实世界充满噪声、不确定性和不完整信息。评估框架必须反映这些现实约束，而非假设一个理想化的环境。

**2. 端到端（End-to-End）**

Agent 的能力不仅仅体现在推理和规划上，更体现在从发现问题到解决问题的完整流程中。任何环节的失败都会导致整体任务的失败。

**3. 部署就绪（Deployment-Ready）**

评估的最终目标不是"在基准上取得高分"，而是"在生产环境中可靠运行"。这意味着评估框架必须与生产环境的约束保持一致。

### 对 Agent 开发的启示

这一范式转移对你的 Agent 开发工作意味着什么？

1. **不要过度依赖基准分数**。一个在 ToolBench 上得 90% 的模型，可能在真实部署中表现远不如预期。
2. **重视 Agentic Post-Training**。Nex-N1 系列的结果表明，针对 Agent 场景的专门训练可以显著提升性能。
3. **关注探索能力和鲁棒性**。这些是当前 Agent 的核心弱点，也是未来改进的重点方向。
4. **在噪声环境中测试你的 Agent**。如果你的 Agent 只能在干净输入下工作，那么它还没有准备好投入生产。

## 雷达观察点：未来 1-2 个周期的关键信号

基于 AgentGym2 的发现，我们提出以下雷达观察点：

**观察点一：Agentic Post-Training 的标准化**

Nex-N1 系列的成功表明，针对 Agent 场景的专门训练是一个高价值方向。未来 1-2 个周期内，我们预计会看到更多开源模型采用 agentic post-training 策略来缩小与专有模型的差距。关注哪些框架和工具链正在推动这一趋势。

**观察点二：思考模式 vs. 指令模式的权衡**

AgentGym2 发现，推理导向的思考模式（thinking-mode）变体在交互轮次上更少，但性能反而低于指令版本（Qwen3-235B-A22B-Thinking 比 instruct 版本低 5.31 分）。这表明，在当前技术阶段，**过度依赖内部推理可能损害 Agent 的外部工具调用能力**。未来需要找到推理与交互之间的最佳平衡点。

**观察点三：探索能力的量化评估**

AgentGym2 揭示了"探索不足"是跨场景的普遍问题。我们预计未来会出现更多专门评估 Agent 探索能力的基准和工具，帮助开发者量化和改进这一关键能力。

## 总结与行动清单

AgentGym2 揭示了一个被长期忽视的事实：**当前最强大的 AI 模型在真实世界部署中仍然面临巨大挑战**。这既是危机，也是机遇——它指明了未来改进的核心方向。

**你现在可以做的**：

1. **在你的 Agent 系统中引入噪声测试**。模拟真实世界的噪声和不完整输入，评估你的 Agent 的鲁棒性
2. **关注 Agentic Post-Training 的最新进展**。Nex-N1 系列的结果表明这是一个高价值方向
3. **重新审视你的基准策略**。不要过度依赖单一基准分数，考虑使用多个不同假设的基准进行综合评估
4. **在你的 Agent 中增加探索机制**。鼓励 Agent 在做出决策前充分探索可用工具和环境

## References

- [AgentGym2: Benchmarking Large Language Model Agents in De-Idealized Real-World Environments][links-1]
- [Nex-N1: Agentic Models Trained for Real-World Deployment][links-2]
- [ToolBench: Benchmarking LLMs for Tool Use][links-3]
- [WebArena: A Realistic Web Environment for Building Autonomous Agents][links-4]
- [Scaling Laws for Agent Systems][links-5]

[links-1]: https://arxiv.org/abs/2607.05174
[links-2]: https://huggingface.co/Agi-CLub/Nex-N1-671B
[links-3]: https://github.com/OpenBMB/ToolBench
[links-4]: https://webarena.dev/
[links-5]: https://arxiv.org/abs/2501.19393
