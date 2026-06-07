---
layout: post
title: "AI 范式雷达：《软件工程的终结：AI Agent 如何重写开发范式》"
author: unbug
categories: [AI, ParadigmRadar, SoftwareEngineering]
image: /assets/images/paradigm-radar-end-software-engineering.svg
tags: [software-engineering, agent-paradigm, agentic-engineering, code-generation, paradigm-shift]
---

如果你正在构建 AI Agent 系统，你可能已经发现一个令人不安的事实：你写的代码越多，系统越不可控。传统软件工程的核心假设——人类工程师分解问题，将决策逻辑编码为静态代码，随需求演化手动修改——正在被一个更根本的变化所取代：**LLM 成为推理引擎，代码不再是决策逻辑的载体，而是推理循环中的临时工具**。

2026 年 6 月 4 日，Zhenfeng Cao 在 arXiv 上发表了题为 "The End of Software Engineering" 的论文，提出了一个大胆论断：AI Agent 不是软件工程的增量改进，而是对软件工程范式的根本重构。这篇文章将带你理解这个范式转移的核心原理、历史演进路径、以及它对你的开发工作意味着什么。

## 传统软件工程的核心假设正在瓦解

过去半个世纪，软件工程建立在三个不可动摇的假设之上：

**假设一：决策逻辑是可编码的**。任何业务规则都可以被分解为确定性的条件语句、函数调用和数据结构。

**假设二：代码是决策逻辑的载体**。程序的正确性由代码的静态结构保证——类型系统、单元测试、代码审查。

**假设三：需求演化需要人工干预**。当需求变化时，工程师必须手动修改代码。

这三个假设定义了软件工程的边界：工程师是系统的唯一决策者，代码是决策逻辑的唯一载体，需求变化是外部输入。

但 AI Agent 的出现同时挑战了这三个假设：

1. **决策逻辑不再是静态的**：Agent 的推理过程是动态生成的，每一次执行都可能产生不同的决策路径。代码不再是决策的载体，而是推理的触发器。

2. **代码不再是决策逻辑的载体**：Agent 使用代码作为工具——生成它、执行它、丢弃它。代码的价值不在于它的结构正确性，而在于它能否帮助 Agent 完成推理步骤。

3. **需求演化不再需要人工干预**：Agent 可以直接读取需求文档、用户反馈、日志数据，自行调整行为策略。工程师的角色从 "coder" 转变为 "reasoning architect"。

![传统软件工程 vs Agentic 系统的核心差异](/assets/images/paradigm-radar-end-software-engineering.svg)

## 范式转移的核心原理：code as logic → code as tooling

理解这个范式转移的关键，在于理解代码在两种范式中的角色差异。

在传统软件工程中，代码是**决策逻辑的载体**。一段代码的价值在于它的结构正确性——它是否准确地表达了业务规则？是否覆盖了所有边界条件？是否通过了所有测试？

在 Agentic 系统中，代码是**推理的工具**。一段代码的价值在于它能否帮助 Agent 完成推理步骤——它是否提供了必要的信息？是否触发了正确的行为？是否以合理的成本执行？

这种角色转换带来了三个根本性的变化：

### 1. 确定性 → 概率性

传统软件工程的控制模型是确定性的：相同的输入产生相同的输出。代码的正确性可以通过形式化验证、单元测试、代码审查来保证。

Agentic 系统的控制模型是概率性的：相同的输入可能产生不同的输出，因为 LLM 的推理过程具有随机性。代码的正确性不再能保证——能保证的是 Agent 的推理质量。

### 2. 静态 → 动态

传统软件的代码是静态的：一旦部署，代码不会改变（除非手动更新）。代码的生命周期由版本控制、CI/CD 流程管理。

Agentic 系统的代码是动态的：Agent 在运行时生成代码、执行代码、丢弃代码。代码的生命周期以秒或分钟计，而不是以月或年计。

### 3. 工程化 → 编排化

传统软件工程的核心活动是编码、测试、部署、运维。工程师的工作集中在代码本身。

Agentic 工程的核心活动是推理设计、工具编排、验证策略、成本控制。工程师的工作集中在 Agent 的推理能力上，代码只是实现推理的工具。

## 历史演进：复杂度转移的第三条曲线

理解 Agentic 范式的历史位置，需要回顾软件行业的两次复杂度转移。

### 第一次转移：Licensed Software → SaaS

在 Licensed Software 时代，用户需要自己部署、配置、维护软件。复杂度完全在用户侧。

SaaS 的出现将部署和运维复杂度从用户转移到了厂商。用户不再关心服务器、数据库、网络——他们只关心软件的功能。

### 第二次转移：SaaS → Agent-as-a-Service (AaaS)

SaaS 将部署复杂度转移了，但**编码决策权**仍然在用户手中。用户仍然需要编写代码、设计流程、配置工具。

AaaS 的核心论断是：当 Agent 能够理解用户需求、自主决策、生成代码、执行任务时，**编码决策权**本身就可以被转移。用户不再需要编写代码——他们只需要描述需求，Agent 会生成并执行代码。

![复杂度转移的三条曲线](/assets/images/paradigm-radar-end-software-engineering.svg)

这个转移的深远意义在于：它不是简单的技术升级，而是**开发范式的根本重构**。

## Agentic Engineering：新学科的核心特征

论文提出了 "Agentic Engineering" 的概念，认为它与传统软件工程在三个核心维度上存在本质区别。

### 研究对象：从 code quality 到 reasoning quality

传统软件工程关注代码的质量——可读性、可维护性、性能、安全性。

Agentic Engineering 关注 Agent 推理的质量——推理的准确性、效率、可靠性、成本控制。代码质量仍然是重要的，但它是推理质量的子问题，而非核心问题。

### 控制模型：从 deterministic 到 probabilistic

传统软件工程的控制模型是确定性的——通过测试、审查、形式化验证来保证正确性。

Agentic Engineering 的控制模型是概率性的——通过评估、监控、反馈循环来管理不确定性。正确性不再是二元的（对/错），而是连续的（置信度/风险等级）。

### 人类角色：从 coder 到 reasoning architect

传统软件工程师的核心技能是编码——将需求转化为代码。

Agentic Engineer 的核心技能是推理设计——设计 Agent 的推理框架、工具链、验证策略，确保 Agent 能够在不确定性中做出正确的决策。

## 实证分析：基准测试揭示的真相

论文引用了多个基准测试数据，揭示了当前 Agent 范式的能力边界。

### SWE-bench Verified 的数据

SWE-bench Verified 评估 Agent 在真实 GitHub issue 上的解决能力。最新结果表明：

- **最强 Agent 在特定任务上表现优异**：在结构化、领域明确的代码库中，Agent 可以完成 60-80% 的任务
- **系统性失败模式仍然存在**：Agent 在跨文件修改、复杂依赖推理、边界条件处理上表现不佳
- **成本-收益分析**：Agent 的 token 成本约为人类工程师的 10-100 倍（按时间折算），但在简单任务上的成本可能更低

### EvoClaw 的多智能体研究

EvoClaw 是一个多智能体代码生成框架。其关键发现：

- **多 Agent 协作的收益递减**：超过 3 个 Agent 后，协调成本超过协作收益
- **Agent 间的通信开销**：Agent 之间的信息交换占用了 30-50% 的推理时间
- **角色专业化 vs 通用化**：专用 Agent 在特定任务上优于通用 Agent，但专用 Agent 的维护成本更高

### LangChain 多智能体协调研究

LangChain 的多智能体协调研究表明：

- **协调协议的选择影响巨大**：不同的协调协议（链式、树形、图状）在不同任务类型上表现差异显著
- **评估指标的多维性**：单一准确率指标无法全面评估 Agent 系统的性能，需要引入延迟、成本、可靠性等多维指标

## 反方观点：什么情况下 Agent 范式不适用？

任何范式论断都需要面对反方观点。以下是论文讨论的反方论点，以及研究员的补充分析。

### 反方观点一："代码不会消失，只会转移"

**论点**：Agent 生成的代码仍然是代码，Agent 范式只是将编码复杂度从人类转移到了 Agent，并没有消除编码复杂度本身。

**回应**：这个观点部分正确。Agent 范式确实没有消除编码复杂度，而是**重构了编码复杂度的分布**。在传统范式中，编码复杂度集中在人类工程师身上；在 Agent 范式中，编码复杂度分布在 Agent 的推理过程中。关键区别在于：Agent 可以自动处理编码复杂度，而人类工程师需要手动处理。

### 反方观点二："Agentic Engineering 不是新学科"

**论点**：软件工程一直在演进（从瀑布到 Agile 到 DevOps），Agentic Engineering 只是自然演进的一部分，不需要单独命名。

**回应**：这个观点低估了范式转移的深度。Agile 和 DevOps 是方法论的演进，但核心假设（代码是决策逻辑的载体）没有改变。Agentic Engineering 的核心假设（代码是推理的工具）与传统软件工程**根本不同**。这种差异不是方法论层面的，而是本体论层面的。

### 反方观点三："安全与可靠性问题被低估"

**论点**：Agent 生成的代码无法保证正确性，动态代码意味着传统的代码审查、版本控制、回归测试都失效了。

**回应**：这个观点指出了 Agent 范式的核心挑战。论文承认，**验证难题**是 Agent 范式最大的障碍。Agent 生成的代码不能依赖传统的验证方法——需要新的验证框架，包括运行时监控、行为验证、不确定性量化等。

### 反方观点四："成本约束"

**论点**：Agent 推理的 token 成本和延迟在大规模生产中可能成为瓶颈，尤其是对于实时系统。

**回应**：论文承认成本约束是 Agent 范式的现实挑战。但论文也指出，**成本正在快速下降**——随着模型效率的提升和推理优化技术的发展，Agent 推理的成本正在以每年 50-70% 的速度下降。对于非实时场景，成本约束正在快速缓解。

## 未来 1-2 个周期的雷达观察点

基于论文的分析，以下是未来 1-2 个周期需要关注的雷达观察点：

### 观察点一：Agentic Engineering 是否成为独立学科

学术界是否会出现专门的 Agentic Engineering 课程、会议、期刊？如果 Agentic Engineering 成为独立学科，它将需要：
- 新的核心课程（推理设计、不确定性管理、Agent 验证）
- 新的研究方法（概率性验证、行为分析、推理追踪）
- 新的评估体系（推理质量、成本控制、可靠性）

**观察指标**：顶级学术会议是否出现 Agentic Engineering 专题、高校是否开设相关课程。

### 观察点二：Agent 生成代码的质量边界

SWE-bench 等基准上的性能是否会突破某个临界点？如果 Agent 在结构化代码库上的通过率超过 90%，将意味着 Agent 范式在特定领域已经成熟。

**观察指标**：SWE-bench Verified 的年度最佳 Agent 通过率、Agent 代码的回归测试通过率。

### 观察点三：Agent 基础设施的标准化

是否会出现类似 "Agent 版的 CI/CD" 的标准化工具链？这包括：
- Agent 代码的版本控制（Agent 代码的 diff 和回滚）
- Agent 推理的监控和调试（推理过程的可视化）
- Agent 验证的自动化（Agent 行为的自动评估）

**观察指标**：主流 CI/CD 平台是否支持 Agent 工作流、是否有专门的 Agent 验证工具出现。

### 观察点四：安全与治理框架

Agent 生成代码的安全审查、版本控制、回归测试是否会催生新的工具链？这包括：
- Agent 代码的安全审计（Agent 生成的代码是否安全）
- Agent 行为的治理框架（Agent 的决策是否可追溯）
- Agent 的合规性验证（Agent 的行为是否符合法规要求）

**观察指标**：安全厂商是否推出 Agent 安全产品、监管机构是否出台 Agent 治理指南。

### 观察点五：复杂度转移的经济学

Agent 编码的成本效益分析是否会改变软件公司的组织形态？如果 Agent 编码的成本低于人类编码，将导致：
- 软件公司规模的缩小（更少工程师，更多 Agent）
- 软件开发周期的缩短（更快的迭代速度）
- 软件工程教育的转型（从编码技能到推理设计技能）

**观察指标**：软件公司的 Agent 使用率、Agent 编码的成本效益分析数据。

## 总结与行动清单

AI Agent 正在推动软件工程从 "code as logic" 向 "code as tooling" 的范式转移。这个转移的核心特征是：代码不再是决策逻辑的载体，而是 LLM 推理循环中的临时工具。这个变化不是渐进的，而是根本性的——它重新定义了软件工程的边界、方法和核心技能。

**你现在可以做的**：

1. **评估你当前项目的 Agent 适用性**：你的场景中哪些任务适合 Agent 处理？哪些任务仍然需要人类工程师？
2. **学习 Agentic Engineering 的核心概念**：推理设计、不确定性管理、Agent 验证——这些是未来工程师的核心技能
3. **关注 Agent 基础设施的标准化进展**：CI/CD 平台对 Agent 工作流的支持、Agent 验证工具的发展
4. **建立 Agent 代码的质量评估体系**：即使 Agent 生成代码，也需要验证框架来保证质量
5. **思考组织层面的转型**：如果 Agent 编码成为主流，你的团队需要什么样的新技能？

## References

- [The End of Software Engineering: How AI Agents Are Fundamentally Restructuring the Software Paradigm (arXiv:2606.05608)][links-1]
- [SWE-bench Verified][links-2]
- [EvoClaw: Multi-Agent Code Generation Framework][links-3]
- [LangChain Multi-Agent Coordination Studies][links-4]
- [Agent-as-a-Service: The Third Wave of Complexity Transfer][links-5]
- [Do More Agents Help? Controlled and Protocol-Aligned Evaluation (arXiv:2606.05670)][links-6]
- [HarnessFix: Diagnosing and Repairing Harness Flaws (arXiv:2606.06324)][links-7]


[links-1]: https://arxiv.org/abs/2606.05608
[links-2]: https://github.com/swe-bench/SWE-bench
[links-3]: https://github.com/EvoClaw/EvoClaw
[links-4]: https://github.com/langchain-ai/langgraph
[links-5]: https://arxiv.org/abs/2606.05608
[links-6]: https://arxiv.org/abs/2606.05670
[links-7]: https://arxiv.org/abs/2606.06324
