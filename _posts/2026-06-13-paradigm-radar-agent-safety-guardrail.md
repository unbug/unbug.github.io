---
layout: post
title: "AI 范式雷达：《Agent安全新范式：从静态对齐到动态诊断护栏》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-safety-guardrail.svg
tags: [AgentSafety, Alignment, Guardrail, AgenticReasoning, Security]
---

在 R-judge 基准测试中，一个仅需约 1000 个样本进行 SFT 训练的 7B 参数模型达到了 GPT-5.4 级别的安全诊断性能。这不是渐进式优化——当 Agent 获得工具调用权限后，安全对齐从"模型层面的静态分类"升级为"系统层面的动态护栏"。

上海人工智能实验室（AI45Lab）的论文[《AgentDoG 1.5: A Lightweight and Scalable Alignment Framework for AI Agent Safety and Security》](https://arxiv.org/abs/2605.29801)提出了 AgentDoG 1.5，一个轻量级且可扩展的对齐框架。该框架通过轨迹级诊断引擎、推理增强构建方法和免训练在线护栏设计，实现了从静态安全分类到动态实时防护的范式转移。论文基于 ATBench（Agent Trajectory Benchmark）在风险来源（Risk Source）、失败模式（Failure Mode）和真实世界危害（Real-World Harm）三个维度上进行了全面评估，并展示了 SFT+RL 训练环境可将部署开销降低两个数量级。

这篇文章将带你理解 AgentDoG 1.5 的三大核心组件、轨迹级诊断与单步判断的本质区别，以及如何在你的 Agent 系统中部署这一安全护栏。

![AgentDoG 1.5 整体架构图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-guardrail.svg)

上图展示了 AgentDoG 1.5 的整体架构：输入层接收 Agent 的完整执行轨迹（包括工具调用序列、中间状态和最终输出），经过推理增强构建模块生成带解释的安全评估上下文，再由诊断引擎输出细粒度的风险标签和根因分析。整个流程支持两种部署模式——训练后的离线评估和免训练的在线实时护栏。

## 为什么 Agent 安全需要新范式

Agent 系统与传统 LLM 应用的核心区别在于**权限跃迁**。传统 LLM 的输出仅限于文本生成，而 Agent 通过工具调用获得了执行外部操作的能力——读写文件、调用 API、执行命令、访问数据库。这种从"被动问答"到"主动执行"的转变，使得安全对齐的复杂度呈指数级增长。

### 静态安全分类器的失效

传统的安全对齐方法（如 RLHF、DPO）在单轮对话场景中表现良好：模型被训练为拒绝生成有害内容。但当这些经过安全对齐的模型被部署为 Agent 时，一个被称为**对齐悖论**的现象开始显现——即使模型本身通过了所有安全测试，它在 Agent 工作流中仍可能屈服于复杂攻击。

这种失效的根本原因在于：**静态分类器只能评估单个输出的安全性，无法理解跨步骤累积的风险。** 想象以下场景：Agent A 的第一步是查询用户偏好（无害），第二步是根据偏好搜索商品（无害），第三步是将搜索结果发送到外部服务（看似正常）。每一步单独看都是安全的，但组合起来可能构成数据泄露攻击。静态分类器对每一步都给出"安全"判断，而轨迹级诊断引擎能够识别这种跨步骤的累积风险模式。

### 现有方案的局限

当前 Agent 安全方案主要面临三个局限：

**单步判断 vs 轨迹级累积风险**。大多数现有护栏（如 Guardrails AI、NeMo Guardrails）在每一步执行前进行独立的安全检查。它们无法理解"这一步单独无害，但结合上下文就是有害的"这一关键问题。

**训练依赖过高**。许多安全模型需要对 Agent 模型本身进行额外的 SFT 或 RL 微调，这不仅增加了部署复杂度，还可能导致原始模型的有用性下降（即过度对齐导致的拒绝率上升）。

**诊断透明度不足**。当护栏阻止了某个操作时，它通常只输出"不安全"的二元标签，无法解释为什么不安全、风险来源是什么、如何修复。这种黑盒行为使得安全团队难以进行有效的根因分析和策略调优。

## AgentDoG 1.5 核心原理

AgentDoG 1.5 的核心贡献在于将安全评估从单步判断升级为轨迹级诊断，并通过推理增强和免训练设计实现了性能与效率的双重突破。

### 轨迹级诊断引擎：从孤立步骤到累积风险评估

轨迹级诊断是 AgentDoG 1.5 最核心的创新。传统安全分类器将 Agent 的每一步执行视为独立事件，而 AgentDoG 1.5 将整个执行轨迹（包括所有工具调用、中间状态和上下文信息）作为输入进行联合分析。

这种设计的关键优势在于**上下文感知的风险识别**。一个工具调用的安全性高度依赖于它之前的操作序列：在查询用户数据之后立即将结果发送到外部服务，与在初始化阶段发送相同的数据，其风险等级完全不同。轨迹级诊断引擎通过建模步骤之间的依赖关系，能够捕捉到单步判断无法发现的隐蔽攻击模式。

![轨迹级诊断 vs 单步判断对比图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-trajectory-vs-step.svg)

上图对比了两种评估方式：左侧的单步判断将每个步骤独立评分，导致跨步骤累积风险被完全忽略；右侧的轨迹级诊断将整个执行序列作为输入，能够识别出"看似无害的步骤组合在一起构成攻击链"的情况。红色虚线框标注的区域正是单步判断无法检测到的隐蔽风险路径。

### Rationale-Enhanced 构建框架：推理增强如何提升安全判断准确性

AgentDoG 1.5 引入了**推理增强（Rationale-Enhanced）**的评估方法。在传统的分类器中，模型直接输出"安全/不安全"的二元标签；而在 AgentDoG 1.5 中，模型首先生成一段风险评估的推理过程（rationale），然后基于这段推理输出最终的安全判断。

这种设计借鉴了思维链（Chain-of-Thought）的核心思想——让模型在做出判断之前先"想清楚"。具体而言，Rationale-Enhanced 框架要求诊断模型在执行安全评估时，先生成一段结构化的风险分析文本，包括：风险来源分类、攻击路径识别、危害程度评估和修复建议。这段推理过程不仅提升了最终判断的准确性（因为模型被迫显式地建模风险逻辑），还提供了可解释的诊断输出。

![Rationale-Enhanced 构建流程图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-rationale-enhanced.svg)

上图展示了 Rationale-Enhanced 框架的工作流程：原始 Agent 轨迹首先被编码为结构化表示，然后送入推理增强模块生成风险评估的中间推理文本，最后基于这段推理输出细粒度的风险标签。与直接分类相比，这种两阶段方法在 ATBench 基准上带来了显著的性能提升——特别是在"看似安全但不合理"（Safe but Unreasonable）这一难以检测的风险类别上。

### 免训练在线护栏设计：为什么不需要对 Agent 模型额外训练

AgentDoG 1.5 的第三个核心贡献是**免训练在线护栏（Training-Free Online Guardrail）**设计。这意味着你可以直接将 AgentDoG 的诊断模型部署为实时护栏，而无需对你的 Agent 模型进行任何额外的 SFT 或 RL 微调。

这种设计的工程价值在于**即插即用**。传统的安全对齐方案通常需要对目标 Agent 模型进行专门的微调——你需要收集该模型的错误案例、设计针对性的训练数据、然后重新训练整个模型。这个过程不仅耗时耗力，还可能导致模型在原有任务上的性能下降（过度对齐问题）。AgentDoG 1.5 的免训练护栏通过外部诊断模型的方式绕过了这一限制：它作为一个独立的评估服务运行，实时分析 Agent 的执行轨迹并输出安全判断，完全不需要触碰目标 Agent 模型的参数。

![免训练在线护栏工作流]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-online-guardrail.svg)

上图展示了免训练在线护栏的部署架构：AgentDoG 诊断模型作为独立服务运行，通过 API 接口实时接收 Agent 的执行轨迹并返回安全评估结果。当检测到高风险操作时，护栏可以自动触发阻断、告警或降级策略，而整个过程中目标 Agent 模型的参数保持不变。

### 与静态安全分类器的对比

| 维度 | 传统静态分类器 | AgentDoG 1.5 |
|------|---------------|-------------|
| 评估粒度 | 单步输出 | 完整执行轨迹 |
| 上下文感知 | 无 | 跨步骤依赖建模 |
| 诊断透明度 | 二元标签（安全/不安全） | 细粒度风险分类 + 根因分析 |
| 训练依赖 | 需对目标模型微调 | 免训练在线部署 |
| 推理增强 | 无 | Rationale-Enhanced 两阶段评估 |

## 动手验证：部署你的第一个 AgentDoG 护栏

下面展示如何在现有 Agent 框架中集成 AgentDoG 1.5 的诊断能力。核心逻辑包括加载预训练的诊断模型、构建轨迹表示、执行风险评估和输出诊断结果。

```python
from agentdog import TrajectoryDiagnoser, RiskLevel

# 初始化诊断器（支持 4B/7B/8B 三种尺寸）
diagnoser = TrajectoryDiagnoser.from_pretrained("ai45lab/agentdog-1.5-7b")

# 构建 Agent 执行轨迹
trajectory = [
    {"step": 1, "action": "query_user_preferences", "result": "..."},
    {"step": 2, "action": "search_products", "result": "..."},
    {"step": 3, "action": "send_to_external_service", "payload": "..."},
]

# 执行轨迹级风险评估（含推理增强）
diagnosis = diagnoser.diagnose(trajectory)

print(f"风险等级: {diagnosis.risk_level}")          # RiskLevel.HIGH
print(f"风险来源: {diagnosis.risk_source}")           # "data_exfiltration"
print(f"失败模式: {diagnosis.failure_mode}")          # "cross_step_accumulation"
print(f"推理摘要: {diagnosis.rationale_summary}")     # 结构化风险分析文本
```

这段代码展示了 AgentDoG 1.5 的核心使用流程：加载预训练的诊断模型后，将 Agent 的执行轨迹作为输入，即可获得包含风险等级、风险来源分类和推理摘要的完整诊断报告。与传统的单步安全检查不同，`diagnose()` 方法会分析整个轨迹中的步骤依赖关系，识别出跨步骤累积的风险模式。

## 多尺寸变体选型指南

AgentDoG 1.5 提供了三种规模的模型变体（4B、7B、8B），分别面向不同的部署场景和资源约束。

**4B 变体**适合边缘设备和资源受限环境。它在 ATBench 上的平均性能约为中档水平，但推理延迟显著低于大尺寸版本，适合对实时性要求较高的在线护栏场景。Qwen2.5-4B 和 Llama-3.2-3B（近似）是主要的基座选择。

**7B 变体**是性能和效率的最佳平衡点。它在 R-judge 基准上达到了 GPT-5.4 级别的安全诊断性能，同时保持了合理的推理延迟。这是大多数生产环境的首选尺寸，特别是当你的 Agent 系统已经部署了 7B 级别的基座模型时。

**8B 变体**面向对安全诊断精度要求最高的场景。它在"看似安全但不合理"和"跨步骤累积风险"等难以检测的风险类别上表现最优，但推理开销也相应增加。适合金融、医疗等高合规要求的领域。

训练环境的资源效率是 AgentDoG 1.5 的另一个重要优势。论文指出，基于 AgentDoG 1.5 构建的 SFT+RL 训练环境可将 Docker 级部署环境的开销降低两个数量级（约 1/100）。这意味着你可以在普通服务器上完成整个安全模型的训练和微调，而不需要昂贵的 GPU 集群。

![多尺寸变体性能对比柱状图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-size-comparison.svg)

上图展示了三种尺寸变体在 ATBench 三个维度（风险来源 RS、失败模式 FM、真实世界危害 RWH）上的性能对比。7B 变体在所有维度上均表现均衡，4B 变体在推理效率上有明显优势，8B 变体在复杂风险类别上精度最高。

## 与 Micropaper 已有文章的互补关系

AgentDoG 1.5 不是孤立的安全方案，它与 Micropaper 系列中已有的 Agent 安全保障文章形成了完整的覆盖体系。

**第 65 篇 SKILL.nb（正向保障）+ AgentDoG 1.5（负向检测）** = 完整安全保障体系。SKILL.nb 关注的是确保 Agent 按照正确的流程执行任务——它通过结构化技能定义来引导 Agent 的行为方向。AgentDoG 1.5 则从另一个角度切入：当 Agent 偏离安全边界时，实时检测和阻断风险操作。正向保障防止"做错了"，负向检测阻止"做了不该做的"。

**第 66 篇 REFLECT（事后归因）+ AgentDoG 1.5（事中干预）** = 全生命周期安全闭环。REFLECT 在 Agent 执行失败后分析根本原因——是规划问题、工具调用错误还是外部依赖故障？AgentDoG 1.5 则在风险发生的过程中实时介入，阻止有害操作的继续执行。事后归因帮助你理解"为什么出错"，事中干预确保"错误不会造成实际危害"。

**第 67 篇 APB（事前规划评估）+ AgentDoG 1.5（运行时护栏）** = 端到端 Agent 治理。APB 在任务执行之前评估 Agent 的规划能力——它能否正确分解任务、选择合适工具、识别不可解场景？AgentDoG 1.5 则在任务执行过程中持续监控安全状态。事前评估确保"方向正确"，运行时护栏确保"过程安全"。

![SKILL.nb + AgentDoG + REFLECT 完整安全闭环示意图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-safety-closed-loop.svg)

上图展示了 Micropaper 系列中三个安全保障组件的协作关系：APB 在事前评估规划能力，AgentDoG 1.5 在事中执行实时护栏，REFLECT 在事后进行错误归因。三者共同构成了 Agent 全生命周期的安全治理闭环——从任务规划到运行时监控再到失败分析，每个环节都有对应的安全保障机制。

## 边界条件与反方观点

在拥抱 AgentDoG 1.5 之前，你需要了解它的适用范围和潜在局限：

**免训练方案的极端对抗场景局限性**。免训练在线护栏虽然部署便捷，但在面对精心设计的对抗性攻击时可能不如经过专门微调的模型鲁棒。当攻击者针对诊断模型的已知弱点构造输入时（如通过特殊的轨迹模式绕过检测），免训练方案缺乏针对性的防御能力。论文中报告的 ATBench 测试集虽然覆盖了多种风险类别，但真实世界中的攻击模式可能更加多样和隐蔽。

**多尺寸变体性能差异的验证需求**。4B、7B、8B 三种变体的性能差距在不同风险类别上并不均匀——在某些简单风险场景下，4B 变体与 8B 变体的准确率差距可能不到 3%，但在跨步骤累积风险等复杂场景下，差距可能扩大到 15% 以上。这意味着选型时需要结合你的具体风险分布进行实证测试，而非仅凭基准分数做决定。

**大规模共同作者团队的贡献分散性**。AgentDoG 1.5 有 49 位共同作者（相比初版 AgentDoG 的 42 位增加了 7 人），这种规模的协作虽然体现了社区参与度，但也可能带来贡献分散的问题——核心创新点可能来自少数几位主要贡献者，而大量署名作者的实质性贡献难以量化。在引用和评估该工作时，建议重点关注论文中明确标注的核心贡献者和项目领导者（Dongrui Liu、Jing Shao 等）。

## 总结与行动清单

AgentDoG 1.5 的核心价值在于将 Agent 安全对齐从静态的模型层面升级到了动态的系统层面。通过轨迹级诊断引擎，它解决了单步判断无法识别跨步骤累积风险的根本缺陷；通过推理增强构建框架，它在提升安全判断准确性的同时提供了可解释的诊断输出；通过免训练在线护栏设计，它将部署复杂度降低到即插即用的水平。

更重要的是，AgentDoG 1.5 证明了**轻量级模型也可以实现顶级安全诊断性能**——一个仅需约 1000 个样本训练的 7B 参数模型在 R-judge 上达到了 GPT-5.4 级别的表现。这为中小团队部署高质量 Agent 安全护栏提供了切实可行的路径，不再需要依赖闭源大模型的 API 服务。

**你现在可以做的**：

1. 在你的 Agent 评估流程中引入轨迹级安全分析——不要只检查单步输出的安全性，尝试对整个执行轨迹进行联合风险评估
2. 部署 AgentDoG 1.5 的免训练在线护栏作为你的第一个实时安全监控组件，观察它在实际工作流中的拦截效果
3. 如果你的团队同时使用 APB（第 67 篇）、AgentDoG 1.5 和 REFLECT（第 66 篇），建立"事前评估 + 事中护栏 + 事后归因"的完整安全治理闭环
4. 根据你面临的实际风险类型选择合适的模型尺寸——简单场景用 4B，通用场景用 7B，高合规要求场景用 8B

## References

- [AgentDoG 1.5: A Lightweight and Scalable Alignment Framework for AI Agent Safety and Security (arXiv:2605.29801)][links-1]
- [AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security (arXiv:2601.18491)][links-2]
- [AI45Lab AgentDoG 项目主页][links-3]


[links-1]: https://arxiv.org/abs/2605.29801
[links-2]: https://arxiv.org/abs/2601.18491
[links-3]: https://ai45lab.github.io/AgentDoG/
