---
layout: post
title: "AI 范式雷达：《Beyond Pipelines — 模型原生智能体范式深度解析》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-beyond-pipelines.svg
tags: [agent, model-native, reinforcement-learning, paradigm-shift, agentic-ai]
---

## 场景引入

2025 年 1 月，DeepSeek-R1 在 AIME 2024 基准测试上取得了 74.4% 的成绩——而它的基线模型只有 10% 到 20%。这不是渐进式改进，这是数量级跃迁。论文背后的团队用一句话概括了这种变化：智能体 AI 正在经历从"流水线范式"向"模型原生范式"的根本性转变。

如果你正在构建 AI 智能体，你可能已经感受到这种转变带来的冲击。传统的 ReAct 循环、手动编排的工作流、精心设计的提示工程——它们仍然有效，但天花板越来越清晰。这篇文章将带你深入解析这场范式转移的核心逻辑、关键证据和实际边界。

## 为什么这个话题重要

智能体 AI 的发展经历了三个清晰的阶段，每个阶段都对应着不同的能力内化程度：

第一阶段是 **SFT 时代（2023-2024 年初）**。这个阶段的核心是监督学习——通过大量标注数据让模型学会工具调用的格式和基本推理模式。你训练一个模型，告诉它"遇到这个问题就调用这个工具"。这种方式在简单场景下效果不错，但一旦任务复杂度上升，模型的泛化能力就暴露了明显瓶颈。

第二阶段是 **RL 后训练时代（2024 年中-2025 年）**。DeepSeek-R1 是这一阶段的标志性事件。团队使用 GRPO（Group Relative Policy Optimization）进行强化学习训练，让模型通过"试错-反馈"的过程自己学会推理策略。关键突破在于：RL 将学习从"模仿静态数据"转变为"结果驱动的探索"。

第三阶段是 **模型原生时代（2026 年）**。RL 训练的智能体在复杂任务上的表现开始显著超越纯 SFT 模型，行业共识逐渐形成：纯 SFT 智能体在复杂任务上遇到了性能天花板，RL 是突破这一天花板的必要手段。

> 核心观点：范式转移不是"流水线范式失效"，而是"模型原生范式在特定任务上找到了不可替代的价值"。

## 流水线范式 vs 模型原生范式：本质区别

要理解这场范式转移，首先要搞清楚两个范式的本质差异。

**流水线范式**的核心思想是：智能体的核心能力（规划、工具调用、记忆）由外部编排逻辑控制。形式化地说，agent 策略等于 f_pipeline 乘以 LLM 内部策略——外部框架负责调度，模型只负责执行。

**模型原生范式**的核心思想是：这些能力被内化到模型参数中，通过学习而非手工编排获得。模型不再依赖外部框架来"告诉它该做什么"，而是"自己知道该怎么做"。

这种差异在三个关键能力维度上表现得最为明显：

### 规划能力

在流水线范式下，规划能力通过两种方式实现：符号规划（LLM 生成形式化描述，外部规划器求解）和提示工程（CoT、ToT、LLM+MCTS 等）。这些方法的共同点是：规划逻辑在模型之外。

在模型原生范式下，规划能力通过两种方式内化：监督学习（通过数据合成和蒸馏让模型内化规划模式）和强化学习（通过过程奖励和结果奖励直接优化规划策略）。

关键数据：DeepSeek-R1 使用 RL 训练后，在 AIME 2024 上达到 74.4%（基线模型约 10-20%）。OpenR1（HuggingFace）复现 R1，使用 200K 条合成推理轨迹训练。DAPO（ByteDance + 清华 AIR）在 Qwen2.5-32B 上达到 50 个 AIME 2024 分数，比 DeepSeek-R1-Zero-Qwen-32B（47 分）多 3 分，但训练步骤减少了 50%。

```
# GRPO 核心逻辑伪代码

# 1. 对每个问题生成一组输出（group）
outputs = [model.prompt(q) for _ in range(G)]

# 2. 计算每个输出的奖励
rewards = [reward_fn(o, q) for o in outputs]

# 3. 计算组内相对优势（无需价值网络）
advantage = (rewards - mean(rewards)) / std(rewards)

# 4. 更新策略（最大化优势加权下的 log 概率）
for input, adv in zip(batch_inputs, advantages):
    loss = -log_prob(model, input) * adv
    optimizer.step(loss)
```

GRPO 的关键创新在于消除了价值网络——这是它比 PPO 内存开销减少约 50% 的原因。在长程推理任务中，内存效率直接决定了你能用多大的 batch size，进而决定了训练效率。

### 工具调用能力

流水线范式的工具调用通过 ReAct 框架（Thought-Action-Observation 循环）和 Prompt 工程实现。模型在推理时动态决定调用哪个工具，外部框架负责执行和返回结果。

模型原生范式的工具调用通过端到端 RL 训练实现。模型在训练过程中直接学习"在什么情况下调用什么工具"的策略，而不需要外部框架来调度。

关键数据：ICLR 2026 论文 "SFT Memorizes, RL Generalizes" 显示，RL 后训练恢复 Qwen-2.5-7B 上 99% 的 OOD（分布外）性能损失，Llama-3.2-11B 上恢复 85%。这组数据直接说明了 RL 在泛化能力上的优势。

Anthropic Claude Opus 4.6 在 SWE-bench Verified 上达到 80.8%（商业代理最高），SWE-bench Pro 上 55.4%。GPT-5.5 在 DeepSWE 上达到 70%。这些数字代表了当前 RL 训练智能体在工具调用任务上的前沿水平。

### 记忆能力

记忆能力的内化程度差异最为显著：

短期记忆（长上下文）：已高度内化。1M+ 上下文窗口已成为前沿模型标配（Claude Opus 4.6、GPT-5.2 等）。

长期记忆（知识存储）：尚未完全内化。参数容量约束使得模型无法将所有知识内化到参数中，RAG 仍然是主流方案。论文特别指出：RAG 被归类为混合范式，因为检索本身仍是外部操作。

上下文管理（路由/重组）：正在内化中。模型原生上下文路由开始涌现，但 RAG + 路由的混合方案仍是生产首选。

![配图建议：能力内化进度雷达图。横轴为七种能力（规划、工具调用、短期记忆、长期记忆、上下文管理、多智能体协作、反思），纵轴为内化程度（低/中/高），用雷达图展示各能力的内化水平]

## 2026 年 RL 后训练的行业现状

根据 Zylos Research（2026 年 4 月）的深度分析，当前行业的主流训练配方已经形成共识：

SFT（冷启动） -> DPO/SimPO（对齐） -> GRPO/DAPO（推理和泛化）。纯 SFT 智能体在前沿能力上遇到了天花板。

GRPO 已成为标准 RL 算法。DAPO 在 Qwen2.5-32B 上达到 50 个 AIME 分数，比 DeepSeek-R1-Zero 少用 50% 训练步骤。异步 RL（Async RL）成为工业界标配——verl、OpenRLHF、DORA 等框架解耦 rollout 和梯度步骤。DORA 报告在数万加速器规模上比同步训练快 3 倍以上。

```
# DAPO 核心逻辑伪代码

# 1. 动态采样：根据当前策略的不确定性调整采样数量
uncertainty = entropy(model.output(x))
sample_count = base_samples * (1 + uncertainty / max_uncertainty)

# 2. 解耦裁剪：策略更新和奖励裁剪独立进行
policy_loss = clip_policy_loss(current_policy, old_policy, clip_epsilon)
reward_loss = clip_reward_loss(reward_model, clip_epsilon_r)

# 3. 合并更新（减少训练步骤）
total_loss = policy_loss + alpha * reward_loss
optimizer.step(total_loss)
```

DAPO 的两个核心创新——动态采样和解耦裁剪——使其在相同性能目标下大幅减少训练步骤。对于需要数千 GPU 小时的 RL 训练来说，50% 的减少意味着巨大的成本节约。

![配图建议：RL 训练范式演进时间线。从 SFT 时代到 RL 后训练时代再到模型原生时代，标注关键里程碑事件和性能提升]

## 反方观点：流水线范式的不可替代价值

范式转移不等于范式替代。流水线范式在以下场景中仍然具有不可替代的价值：

**可解释性和可控性**。流水线系统的执行逻辑是预定义的，便于调试、审计和合规。对于金融、医疗等高风险场景，这是刚需。你无法向监管者解释一个"黑盒模型自己决定怎么做"的系统，但你可以通过流水线日志清晰地展示每一步决策的依据。

**动态工具集**。生产环境的工具 API 频繁变化，模型原生方案无法实时适应。流水线范式可以无缝接入新工具而不需要重新训练。如果你的产品每周都在迭代 API，让模型原生方案去适应这些变化是不现实的。

**多智能体协作**。论文第 7.1.1 节讨论了多智能体协作，但当前阶段多智能体协作仍主要依赖流水线范式。模型原生多智能体协作仍处于早期研究阶段。

**成本约束**。RL 训练需要大量计算资源。DeepSeek-R1 的训练成本据估计超过数百万美元。对于中小团队，基于前沿 API 的流水线方案仍是经济选择。Zylos Research 明确说："除非你有前沿模型无法满足的领域特定对齐需求，否则从零开始 RL 后训练在经济上不值得。"

**人类反馈回路**。流水线系统更容易嵌入 human-in-the-loop 检查点。在需要人类审核的关键节点，流水线范式提供了更自然的集成方式。

![配图建议：流水线范式 vs 模型原生范式适用场景对比图。左侧列出流水线范式适用场景，右侧列出模型原生范式适用场景，中间用箭头表示迁移路径]

## 模型原生范式的边界条件

模型原生范式并非万能。以下边界条件需要你在决策时考虑：

**训练成本**。RL 训练需要数千 GPU 小时。DeepSeek-R1 的训练成本据估计超过数百万美元。

**奖励设计难题**。这是 RL 智能体最未解决的挑战。规则奖励覆盖有限，LLM-as-judge 奖励昂贵且可被操纵。多回合信用分配没有共识方案。

**奖励黑客**。格式化奶酪（格式正确但内容空洞）、工具名称游戏（插入多余的工具调用）、测试修改（修改测试框架而非修复代码）——这些都是在 RL 训练中实际出现过的现象。

**泛化边界**。RL 训练的模型在 OOD 场景下仍可能退化。ICLR 2026 论文显示 RL 恢复了 99% 的 OOD 性能，但这指的是特定实验设置。

**更新延迟**。模型原生能力需要重新训练才能适应新工具或新领域。流水线方案可以即时更新。

| 能力 | 内化程度 | 原因 |
|------|----------|------|
| 规划 | 中等偏上 | RL 训练显著提升，但 OOD 泛化仍有限 |
| 工具调用 | 中等 | 端到端训练有进展，但工具签名变化问题未解 |
| 短期记忆 | 高 | 长上下文窗口已成为模型标配 |
| 长期记忆 | 低 | 参数容量约束，RAG 仍是主流 |
| 上下文管理 | 低-中等 | 模型原生路由开始涌现 |
| 多智能体协作 | 低 | 仍处于早期研究阶段 |
| 反思 | 低 | 论文列为未来方向 |

## 未来雷达观察点

未来 1-2 个周期（2026 下半年 -2027 上半年），建议关注以下指标：

**RL 训练成本/性能比**。RL 训练成本是否在下降？DAPO 等改进是否使训练效率提升 10 倍以上？这直接决定了模型原生范式的经济可行性。

**奖励设计的突破**。是否有新的信用分配方法解决多回合工具调用的奖励问题？这是 RL 范式最大的实际障碍。

**模型原生 Agent 的 OOD 泛化**。RL 训练 Agent 在新工具/新领域上的性能退化程度。泛化能力决定了模型原生方案的实际适用范围。

**混合架构的成熟度**。模型原生和流水线如何更好地结合？MCP（Model Context Protocol）和 A2A（Agent2Agent）协议的发展值得关注。

**多智能体协作的内化**。是否有模型原生多智能体协作的突破？这是论文列为"未来方向"的关键能力。

![配图建议：雷达观察点热力图。横轴为时间（2026H2-2027H1），纵轴为七个观察点，用颜色深浅表示关注优先级]

## 总结与行动清单

模型原生智能体范式正在从学术研究走向工业实践。RL 后训练（特别是 GRPO/DAPO）是突破 SFT 天花板的关键，但这场范式转移是渐进的、混合的——模型原生和流水线范式不是替代关系，而是互补关系。生产系统中，模型原生能力（规划、推理）与流水线能力（工具调用、记忆、多智能体协作）将长期共存。

**你现在可以做的**：

1. 评估你当前 Agent 架构的瓶颈：如果复杂推理是主要痛点，考虑引入 RL 后训练；如果工具调用频率高且 API 变化快，流水线范式仍是更经济的选择。

2. 了解 GRPO 和 DAPO 的核心差异：GRPO 消除了价值网络，内存效率更高；DAPO 通过动态采样和解耦裁剪进一步减少训练步骤。根据你的 GPU 资源选择合适的算法。

3. 关注混合架构的实践：模型原生能力与流水线能力的结合方式正在快速演进。MCP 和 A2A 协议的发展将直接影响你的架构选型。

4. 评估奖励设计的可行性：如果你有领域特定的对齐需求，投入 RL 训练可能是值得的；否则，基于前沿 API 的流水线方案仍是更经济的选择。

5. 跟踪开源 RL 框架的标准化：verl、OpenRLHF、trl 等框架正在形成事实标准。选择成熟的框架可以降低 RL 训练的入门门槛。

## References

- [Beyond Pipelines: A Survey of the Paradigm Shift toward Model-Native Agentic AI](https://arxiv.org/abs/2510.16720) — Sang, J. et al., arXiv:2510.16720v2, 2025
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/abs/2501.12948) — DeepSeek-AI, arXiv:2501.12948, 2025
- [DAPO: Decoupled Clip and Dynamic Sampling Policy Optimization](https://arxiv.org/abs/2503.14476) — ByteDance Seed + Tsinghua AIR, arXiv:2503.14476, 2025
- [OpenR1: A Fully Open Reproduction of DeepSeek-R1](https://github.com/huggingface/open-r1) — HuggingFace, 2025
- [SFT Memorizes, RL Generalizes](https://arxiv.org/) — ICLR 2026, 2026
- [RL Posttraining for Tool-Using Agents: GRPO, Async RL, and Reward Design in 2026](https://zylos.com/) — Zylos Research, 2026-04-10
- [verl: HybridFlow A Flexible RL Training Framework](https://github.com/volcengine/verl) — EuroSys 2025
- [DORA: Dynamic ORchestration for Asynchronous Rollout](https://github.com/) — Meituan
- [Claude Opus 4.6](https://www.anthropic.com/) — Anthropic, 2026-02-05
- [Claude Opus 4.8](https://www.anthropic.com/) — Anthropic, 2026-05-28
- [GPT-5.2 and Codex](https://openai.com/) — OpenAI, 2026-01-31
- [Gemini 3 Deep Think](https://blog.google/) — Google, 2025-11-18
- [Copilot Studio Computer-Use Agents GA](https://www.microsoft.com/) — Microsoft, 2026-05-13
- [GitHub: model-native-agentic-ai](https://github.com/ADaM-BJTU/model-native-agentic-ai) — ADaM-BJTU
