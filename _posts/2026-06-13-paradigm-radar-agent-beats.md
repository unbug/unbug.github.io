---
layout: post
title: "AI 范式雷达：《Agent评估新标准：用A2A+MCP协议实现基准即Agent》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-beats.svg
tags: [agent-evaluation, mcp, a2a, benchmarking, standardization]
---

在评估 M 个 Agent 系统如何在 N 个基准上表现时，传统方法需要编写 N×M 次定制化集成代码——每个基准都需要为每个 Agent 单独适配接口、处理格式差异、管理认证流程。当 Agent 生态以指数级增长时，这种线性扩展的集成成本变得不可持续。

加州大学伯克利分校、EPFL、IBM Research、卡内基梅隆大学等16家机构联合发表的论文[《AgentBeats: Agentifying Agent Assessment for Openness, Standardization, and Reproducibility》](https://arxiv.org/abs/2606.13608)提出了 AAA（Agentified Agent Assessment）范式，将基准本身视为一个独立的 Judge Agent，通过 A2A（Agent-to-Agent）协议和 MCP（Model Context Protocol）工具访问层实现评估流程的标准化。在为期五个月的开放竞赛中，该框架成功协调了 298 个 Judge Agent 对 467 个 Subject Agent 的评估，覆盖代码生成、网页浏览、医疗健康等多个领域。

这篇文章将带你理解 AAA 范式的核心原理、五种操作模式的设计考量，以及 Harness-Swapping 实验揭示的共适应效应如何改变你对 Agent 性能评估的认知。

![AAA范式概念图：基准即Agent]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats.svg)

上图展示了 AAA 范式的核心概念转变：左侧的传统模式中，每个 Agent-基准对都需要一条独立的集成连线（N×M 条），形成密集的网状结构；右侧的 AAA 模式中，基准被封装为 Judge Agent，Agent 通过标准协议与基准交互，集成复杂度从 N×M 降为 N+M。Judge Agent 作为中介层，统一处理工具调用、结果解析和评分逻辑。

## 为什么传统 Agent 评估不够用了

如果你正在构建或评估一个 AI Agent，你可能已经习惯了在论文中报告某个模型在特定基准上的得分——SWE-bench 上解决了多少任务、GAIA 上达到了什么分数。这些数字看起来很有说服力，但 AAA 论文揭示了一个被行业长期忽视的根本问题：**N×M 的集成复杂度正在成为 Agent 评估可扩展性的瓶颈。**

传统评估方法的核心流程是：对于每个基准 N 和每个 Agent M，你需要编写定制化的集成代码来处理接口适配、输入格式转换、输出解析和评分逻辑。当有 10 个基准和 20 个 Agent 时，你需要维护 200 条独立的集成路径。每条路径都可能因为 API 变更、格式调整或依赖更新而失效。这种线性扩展的集成成本意味着评估规模的增长直接转化为工程负担的等比例增长。

更深层的问题是：**测试-生产不匹配正在扭曲我们对 Agent 真实能力的认知。** AAA 论文在 Coding Agent 的案例研究中记录了一个关键发现——在三个编码基准上评估四个代表性 Agent 时，公开记录的分数与实际部署表现之间存在显著差距。这种差距并非源于模型能力的退化，而是源于评估环境与生产环境之间的系统性差异：测试基准通常使用简化的输入格式、固定的工具接口和理想化的执行条件，而真实生产环境中这些变量都在动态变化。

**不可复现性则是第三个致命缺陷。** 当每个 Agent-基准对都有独立的集成实现时，不同团队甚至同一团队在不同时间运行的评估结果可能因为代码版本差异、依赖库更新或环境配置不同而产生偏差。这意味着你无法横向比较两个 Agent 的真实性能——你只能比较它们的集成质量。

![N×M vs N+M 复杂度对比图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-nxn-vs-nm.svg)

上图直观展示了两种评估架构的复杂度差异：左侧的传统模式呈现为密集的网状连接，每个 Agent（A1-A4）与每个基准（B1-B3）之间都有独立的集成路径，总计 N×M=12 条连线；右侧的 AAA 模式中，Agent 通过标准协议连接到封装后的 Judge Agent（JB1-JB3），集成路径降为 N+M=7 条。随着 Agent 和基准数量的增长，两种架构的复杂度差距呈指数级扩大——当 N=M=50 时，传统模式需要 2,500 条集成路径，而 AAA 模式仅需 100 条。

## AAA 核心原理：基准即 Agent

AAA 范式的核心洞察是：**评估基准本身就是一个智能体。** 它接收输入、调用工具、解析输出、生成评分——这些行为与任何 Agent 的执行流程完全一致。将基准视为一个独立的 Judge Agent，意味着你可以用统一的方式管理所有评估组件，而不是为每个基准编写独特的集成代码。

### Judge Agent：封装评估逻辑的独立实体

在 AAA 范式中，每个基准被封装为一个 Judge Agent。这个 Judge Agent 内部包含了该基准的所有必要知识：输入格式规范、工具调用协议、结果解析规则和评分标准。外部系统（即 Subject Agent）不需要了解这些细节——它只需要按照标准协议发送请求并接收评分结果。

这种封装带来了两个关键优势。**第一，评估逻辑与集成代码解耦。** 当基准的评分规则发生变化时，你只需要更新 Judge Agent 的内部实现，而不需要修改任何外部集成代码。**第二，评估组件可以独立开发和测试。** 每个 Judge Agent 都可以作为独立的微服务运行、部署和版本管理。

![Judge Agent 架构图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-judge-arch.svg)

上图展示了 Judge Agent 的内部架构：输入解析模块接收来自 Subject Agent 的请求，工具调度模块根据基准需求调用相应的 MCP 工具（如代码执行环境、网页浏览器或医疗知识库），结果评估模块将 Subject Agent 的输出与参考答案进行比对并生成评分，最后输出标准化评分报告。整个流程对外的接口完全由 A2A 协议定义，内部实现可以独立演进。

### A2A 协议：Agent 之间的标准通信层

A2A（Agent-to-Agent）协议是 AAA 范式的通信基础设施。它定义了 Judge Agent 和 Subject Agent 之间交互的标准格式——包括请求结构、响应格式、错误处理和认证机制。通过这一协议，任何遵循标准的 Agent 都可以与任何遵循标准的基准进行交互，无需额外的适配层。

A2A 协议的关键设计原则是**语义互操作性**。不同于传统的 API 集成（需要为每个接口编写特定的序列化/反序列化代码），A2A 协议基于结构化的消息格式，使得 Agent 之间的通信不依赖于具体的实现语言或框架。这意味着你可以用 Python 编写的 Judge Agent 与用 Rust 实现的 Subject Agent 无缝协作。

### MCP：工具访问的统一抽象层

MCP（Model Context Protocol）是 AAA 范式的工具访问层。它定义了 Agent 如何发现、调用和组合外部工具的标准化接口。在 AAA 框架中，Judge Agent 通过 MCP 协议访问评估所需的工具——代码执行沙箱、网页浏览器实例、医疗知识检索系统等。

MCP 的核心价值在于**工具的可组合性**。一个基准可能需要多个工具协同工作（例如代码生成基准需要代码执行工具和静态分析工具），MCP 协议使得这些工具可以像乐高积木一样灵活组装，而不需要在每个基准中硬编码工具调用逻辑。

### 五种操作模式：从开放评估到生产对齐

AAA 框架支持五种操作模式，每种模式针对不同的评估场景和安全需求进行了优化。

**开放评估模式（Open Assessment）**是最基础的运行方式。Judge Agent 和 Subject Agent 都在公开环境中运行，所有交互日志、评分结果和中间状态都可以被第三方审计。这种模式适用于学术研究、基准竞赛和透明性要求高的场景。五个月的开放竞赛就采用了这种模式——298 个 Judge Agent 对 467 个 Subject Agent 的评估过程完全可追溯。

**隐私保护评估模式（Privacy-Preserving Assessment）**通过加密通信和零知识证明技术，确保 Subject Agent 的内部实现细节不会被 Judge Agent 泄露。这在评估商业闭源模型时尤为重要——你希望知道模型的评估分数，但不希望暴露模型的架构设计或训练数据特征。

**可复现评估模式（Reproducible Assessment）**为每次评估生成完整的执行快照，包括输入数据、工具调用序列、中间状态和最终评分。这使得任何第三方都可以精确复现评估结果，解决了传统基准测试中"我无法复现你的分数"这一长期问题。

**混合模式（Hybrid Mode）**允许在同一评估流程中同时使用开放和隐私保护两种策略——例如，公开报告总体评分分布，但保留个体 Agent 的详细执行日志用于内部调试。这种灵活性使得 AAA 可以适应从学术研究到企业合规的多样化需求。

**生产对齐评估模式（Production-Aligned Assessment）**将评估环境与目标 Agent 的实际部署环境保持一致。这意味着评估过程中使用的工具版本、API 端点和数据格式都与生产环境相同，从而最大程度地减少测试-生产不匹配带来的偏差。这是 AAA 框架最具实用价值的创新之一——它直接回应了 Coding Agent 案例研究中揭示的分数差距问题。

![五种操作模式矩阵图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-five-modes.svg)

上图展示了五种操作模式的二维分类：横轴表示透明度（从完全封闭到完全开放），纵轴表示环境保真度（从隔离沙箱到生产对齐）。每种模式在两个维度上都有不同的定位——开放评估位于高透明度和低环境保真度的象限，隐私保护评估位于低透明度和中等环境保真度的位置，而生产对齐评估则追求高透明度与高环境保真度的最佳平衡。

## 实操指南：如何将基准 Agentify

将现有基准转换为 AAA 兼容的 Judge Agent 并不复杂。核心工作集中在三个层面：定义 Judge Agent 的标准接口、实现 MCP 工具访问逻辑、以及配置 A2A 协议通信参数。下面展示一个最小化的实现流程。

### 环境准备与最小命令

首先确保你的评估环境中安装了 A2A 协议客户端和 MCP 工具运行时。然后使用以下命令初始化一个新的 Judge Agent：

```bash
agentbeats init my-benchmark --mode open --mcp-endpoint http://localhost:8080
```

这条命令会生成一个包含标准接口定义、MCP 配置模板和 A2A 通信参数的项目骨架。你只需要填充基准特有的评估逻辑即可。

### Judge Agent 核心实现

Judge Agent 的核心代码负责接收 Subject Agent 的请求、调用 MCP 工具执行评估任务、解析结果并生成评分报告。以下是一个简化但完整的实现示例：

```python
from agentbeats import JudgeAgent, MCPClient, A2AProtocol

class CodingBenchmarkJudge(JudgeAgent):
    def __init__(self, mcp_endpoint: str):
        self.mcp = MCPClient(endpoint=mcp_endpoint)
        self.protocol = A2AProtocol(version="1.0")

    async def evaluate(self, request: dict) -> dict:
        # 从请求中提取 Subject Agent 的输出和测试用例
        agent_output = request["agent_response"]
        test_case = request["test_input"]

        # 通过 MCP 调用代码执行沙箱
        execution_result = await self.mcp.call(
            tool="code_executor",
            args={"code": agent_output, "input": test_case}
        )

        # 对比执行结果与参考答案
        score = self._compute_score(execution_result["output"], test_case["expected"])

        return {
            "score": score,
            "details": execution_result["logs"],
            "reproducible_snapshot": self.protocol.capture_snapshot()
        }

    def _compute_score(self, actual: str, expected: str) -> float:
        # 简化的评分逻辑：精确匹配得满分，部分匹配按比例计分
        if actual.strip() == expected.strip():
            return 1.0
        match_ratio = len(set(actual.split()) & set(expected.split())) / max(len(expected.split()), 1)
        return round(match_ratio, 4)
```

这段代码展示了 Judge Agent 的核心工作流：接收标准化请求、通过 MCP 调用评估工具（如代码执行沙箱）、将 Subject Agent 的输出与参考答案比对并生成评分。`capture_snapshot()` 方法确保每次评估都可以被精确复现——这是可复现评估模式的关键实现。

### A2A 协议集成步骤

Subject Agent 侧的集成更为简洁。你只需要按照 A2A 协议的格式构造请求消息，发送到 Judge Agent 的端点即可：

```python
# Subject Agent 侧：发送评估请求
response = await protocol.send_request(
    target="my-benchmark",
    message={
        "agent_response": generated_code,
        "test_input": test_case_data
    }
)

print(f"评分: {response['score']}")  # 0.8571
```

Subject Agent 不需要了解基准的任何内部细节——它只需要知道 Judge Agent 的端点地址和 A2A 协议的消息格式。这种解耦使得你可以随时替换或升级基准实现，而无需修改 Subject Agent 的代码。

![A2A 协议交互流程图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-a2a-flow.svg)

上图展示了 A2A 协议的完整交互流程：Subject Agent 构造标准化的评估请求并通过 A2A 协议发送到 Judge Agent，Judge Agent 解析请求后通过 MCP 层调用相应的工具（如代码执行沙箱），工具返回执行结果后 Judge Agent 进行评分并将结构化响应回传给 Subject Agent。整个过程中，两个 Agent 之间只交换标准化的消息格式，不共享任何内部实现细节。

## 五个月竞赛数据验证

AAA 范式的理论优势需要实证数据的支撑。为期五个月的开放竞赛提供了迄今为止最大规模的 Agent 评估数据集——298 个 Judge Agent 对 467 个 Subject Agent 进行了全面评估，覆盖代码生成、网页浏览、医疗健康、数学推理和通用智能等多个领域。

### 规模概览与领域分布

298 个 Judge Agent 中，约 35% 专注于代码生成任务（如 SWE-bench、HumanEval 的变体），25% 面向网页浏览和信息检索（如 GAIA、WebArena），20% 涉及医疗健康领域的专业评估（如医疗问答、诊断推理），其余 20% 覆盖数学推理、通用智能和其他垂直领域。467 个 Subject Agent 中，既有开源模型（如 Llama 系列、Qwen 系列），也有商业闭源模型（如 GPT-5.4、Claude 系列），还有专门针对特定任务优化的垂直 Agent。

### 关键发现一：没有单一领先者

在三个编码基准上的评估结果揭示了一个重要事实：**没有任何一个 Agent 系统在所有基准上同时表现最优。** 某些 Agent 在代码生成任务中领先，但在网页浏览或复杂推理任务中落后；另一些 Agent 则在通用智能维度上表现均衡，但在特定领域的深度任务中不如专用模型。这一发现对行业产生了深远影响——它意味着"全能型 Agent"的叙事需要被更精细的能力画像所取代，Agent 选型应该基于具体任务的匹配度而非单一的综合排名。

### 关键发现二：成本聚集在一个数量级内

令人意外的是，**每个评估实例的成本（以 token 消耗计）都聚集在一个数量级内。** 无论 Agent 的架构复杂度如何、模型规模大小如何，完成相同基准评估所需的计算资源差异不大。这意味着评估成本的差异主要来自于任务本身的难度而非 Agent 的效率——一个更复杂的模型并不一定需要更多的 token 来完成相同的任务。这一发现为评估成本的可预测性提供了重要依据：你可以根据基准的难度级别预估评估成本，而不必担心某个特定 Agent 会意外消耗大量资源。

### 关键发现三：测试-生产分数差距

第三个关键发现直接验证了前文提到的**测试-生产不匹配问题。** 在公开记录中表现优异的 Agent，在生产环境中的实际表现往往低于预期——平均差距约为 8-12 个百分点。这种差距并非随机波动，而是系统性地出现在那些评估环境与生产环境差异最大的基准上（如使用简化输入格式的基准）。AAA 框架的生产对齐评估模式正是为了解决这一问题而设计的——通过将评估环境与实际部署环境保持一致，可以显著缩小这一分数差距。

## Harness-Swapping 与共适应效应

Harness-Swapping 实验是 AAA 框架中最具洞察力的分析之一。该实验的核心设计是：将同一个 Agent 系统部署在不同的基准 harness（即评估执行环境）上运行，观察其表现如何随环境变化而波动。

### GPT-5.4 在原生 Codex Harness 下的表现

实验中，GPT-5.4 在其原生开发的 Codex harness 下表现出独特的行为模式：**它使用了更多的 token，但解决率也更高。** 这一现象揭示了一个重要的权衡——当 Agent 运行在它最熟悉的环境中时，它会倾向于使用更详细的推理路径和更多的工具调用步骤来确保正确性。这种" verbose but correct "的策略在原生环境中效率最高，因为环境的所有细节（API 格式、错误处理机制、工具行为）都与模型的训练数据高度匹配。

### 跨 Harness 迁移的权衡分析

当 GPT-5.4 被迁移到其他 harness 上运行时，一个明显的**解决速度与解决率的权衡**出现了：在陌生环境中，GPT-5.4 倾向于使用更少的 token（更快的推理速度），但解决率相应下降。这种行为的根本原因是**共适应效应（Co-adaptation Effect）**——Agent 和评估环境在长期交互中形成了相互依赖的关系。模型在训练过程中接触到的评估数据主要来自特定的 harness，这使得它在这些环境中表现得更加自信和高效；当环境发生变化时，模型的推理策略需要重新调整，而这个调整过程本身就消耗了额外的计算资源并降低了准确性。

![Harness-Swapping 实验数据图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-harness-swapping.svg)

上图展示了 GPT-5.4 在四种不同 harness 上的评估结果：横轴为 token 消耗量（越低越快），纵轴为任务解决率。每个点代表一个 harness 环境，颜色深浅表示该 Agent 与该 harness 的共适应程度（深色表示原生或高度适配的环境）。可以看到，GPT-5.4 在 Codex harness（最深色）上虽然 token 消耗最高但解决率也最高；当迁移到其他 harness 时，token 消耗下降但解决率也随之降低。这种"快而不准"与"慢而准确"的权衡是共适应效应的直接体现。

### 对 Agent 开发者的启示

Harness-Swapping 实验对 Agent 开发者提出了一个明确的建议：**不要将单一基准上的高分视为模型能力的绝对指标。** 如果你的目标是在多个环境中部署同一个 Agent，你应该在多种 harness 上对其进行评估，而不仅仅是在它最擅长的环境里。AAA 框架的混合模式为此提供了便利——你可以在开放模式下快速验证多个 harness 的表现，同时在生产对齐模式下确认最终部署效果。

## AAA 与现有评估体系的关系

AAA 范式不是要取代现有的 Agent 评估方法，而是为它们提供一个统一的元框架。理解它与 Micropaper 系列中已有文章的关系，可以帮助你更好地将其整合到完整的评估体系中。

**与 APB（第 67 篇）：元框架与具体应用。** APB 专注于 Agent 规划能力的细粒度诊断，通过五大评估设置拆解端到端成功率中的规划失败与执行失败。AAA 则是更上层的元框架——它定义了如何将任何评估基准（包括 APB）封装为可复用的 Judge Agent。你可以将 APB 的规划能力评估设置为一个 AAA 兼容的 Judge Agent，然后通过 A2A 协议将其集成到你的 Agent 评估流程中。APB 回答"Agent 的规划哪里出了问题"，AAA 回答"如何标准化地运行这个诊断"。

**与 REFLECT（第 66 篇）：事前标准 vs 事后诊断。** REFLECT 专注于 Agent 执行失败后的错误归因——它分析 Agent 为什么出错、是工具调用错误还是推理偏差。AAA 则从另一个角度切入：通过标准化的评估流程，在问题发生之前就建立可复现的基线。REFLECT 告诉你"这次为什么失败了"，AAA 确保"下次你可以精确复现同样的失败并追踪变化"。

**与 AgentDoG 1.5（第 68 篇）：通用基础设施 vs 特定维度检测。** AgentDoG 1.5 是专门针对安全维度的评估框架，通过轨迹级诊断引擎识别跨步骤累积的安全风险。AAA 则是通用的评估基础设施——它不关心你评估的是安全性、规划能力还是代码质量，它只负责提供标准化的评估运行环境。你可以将 AgentDoG 1.5 的诊断模型封装为一个 AAA Judge Agent，然后在统一的 A2A 协议下与其他评估组件协同工作。

![AAA 与现有评估体系的集成关系图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-beats-ecosystem.svg)

上图展示了 AAA 框架在 Micropaper 评估体系中的位置：AAA 作为元框架位于最底层，提供标准化的 Judge Agent 封装和 A2A/MCP 通信协议；APB、REFLECT 和 AgentDoG 1.5 等具体评估方法作为上层组件运行在 AAA 基础设施之上。这种分层架构使得每个评估组件既可以独立使用（通过标准接口），也可以组合使用（通过统一的协议层）。

## 总结与行动清单

AAA 范式通过将基准封装为 Judge Agent、利用 A2A 和 MCP 协议实现标准化通信，将 Agent 评估的集成复杂度从 N×M 降低到 N+M。五个月开放竞赛中 298 个 Judge Agent 对 467 个 Subject Agent 的成功协调，验证了这一范式的工程可行性。Harness-Swapping 实验揭示的共适应效应则提醒我们：Agent 的性能高度依赖于评估环境，单一基准上的高分不足以代表真实能力。

**你现在可以做的：**

1. 将你最常用的一个评估基准封装为 AAA 兼容的 Judge Agent——从最简单的代码生成基准开始，使用 agentbeats init 命令快速搭建原型
2. 在你的 Agent 评估流程中引入 Harness-Swapping 实验——至少用两种不同的 harness 运行同一个 Agent，观察解决率和 token 消耗的权衡变化
3. 如果你的团队同时使用 APB、REFLECT 和 AgentDoG 1.5，尝试将它们封装为 AAA Judge Agent 并通过 A2A 协议统一调度，建立标准化的评估流水线
4. 在生产部署前使用生产对齐评估模式进行最终验证——确保评估环境与目标部署环境保持一致，缩小测试-生产分数差距

## References

- [AgentBeats: Agentifying Agent Assessment for Openness, Standardization, and Reproducibility (arXiv:2606.13608)][links-1]
- [A2A Protocol Specification][links-2]
- [Model Context Protocol (MCP) Documentation][links-3]


[paper1-url]: https://arxiv.org/abs/2606.13608
[links-1]: https://arxiv.org/abs/2606.13608
[links-2]: https://agentprotocol.ai/specification/a2a
[links-3]: https://modelcontextprotocol.io/docs/concepts/architecture
