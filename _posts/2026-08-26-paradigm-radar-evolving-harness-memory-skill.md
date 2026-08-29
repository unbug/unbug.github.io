---
layout: post
title: "AI 范式雷达：《不再调权重：Agent 的自进化搬进了 Harness》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-evolving-harness-memory-skill.svg
tags: [agent, harness, memory, skill, self-improvement]
description: "三篇 2026 年 8 月新论文显示 Agent 自进化的主战场正从模型权重转移到 Harness 层：Recuris 在 τ²-Bench 让 Claude Opus 5 达到 87.9% 成功率，StarHarness 仅用 4-12 次修改提升 20-35 个百分点。本文拆解结构化证据、组件级修补与验证门控这套可落地的工程模式及其边界条件。"
---

如果你最近在看 Agent 方向的论文，可能会注意到一个微妙的变化：过去半年讨论「让 Agent 自我改进」时，主角几乎总是模型本身——继续预训练、RLHF、递归微调。但 8 月 25 日一天之内上线的三篇 arXiv 论文，把主角换成了模型外面那层执行框架（harness）。Princeton 大学、新加坡国立大学（NUS）、斯坦福大学与牛津大学合作的 Recuris 在 τ²-Bench 上让 Claude Opus 5 达到 `87.9%` 任务成功率；StarHarness 只改动 prompt、工具接口和技能库，就在三个企业基准上提升了 `20-35` 个百分点。模型权重全程未动。这篇文章拆解这次范式转移的原理、证据链与边界条件。

![Agent 自进化从权重层迁移到 Harness 层的三篇论文定位]( {{ site.baseurl }}/assets/images/paradigm-radar-evolving-harness-memory-skill.svg )

## 为什么自进化要搬进 Harness

先给术语下定义。**Harness（执行外壳）**指包裹在 LLM 外面的那层执行框架：它负责记忆管理、技能调用、任务状态跟踪、工具交互和结果验证，模型本身只是其中的推理引擎。**递归自我改进（RSI, Recursive Self-Improvement）**指系统利用自身运行产生的证据持续修改自身行为，且这个循环可以无限迭代。

长期以来 RSI 的主战场在权重层：用 Agent 的轨迹做数据，再微调模型。这条路有三个工程痛点：

- **成本高**：每轮改进都要训练，3B 到 70B 模型的微调成本差异巨大
- **不可回滚**：权重更新是全局性的，改坏了只能重新训练
- **归因难**：任务失败时很难判断该修哪一层，有研究对非结构化日志做事后归因，对「责任 Agent」的准确率只有 `53.5%`

Harness 层进化把改进对象从「模型参数」换成「外部记忆与接口」，天然绕开这三个问题。Recuris 论文里有一句很关键的表述：所有增益都是在基础模型保持厂商出厂状态的前提下获得的（every gain is obtained with the base model left exactly as its provider shipped it）。

## Recuris：把失败定位到具体的记忆组件

Recuris 的核心是一个三层记忆架构加一个进化循环。理解它之前，先看传统 harness 的两个问题：检索时对着不断增长的对话历史找相似内容，长任务里早就丢失了未解决的目标；进化时用单个任务的结果重写整块记忆，改 A 坏 B。

![Recuris 的 EM-WM 耦合与验证门控进化循环]( {{ site.baseurl }}/assets/images/paradigm-radar-recuris-loop.svg )

**三层记忆分工**：

- **Working Memory（工作记忆）**：跟踪当前任务进度，是一个结构化的状态对象，而不是对话历史
- **Experiential Memory（经验记忆）**：持久存储的跨任务经验，技能调用从这里检索
- **Skill Memory（技能记忆）**：可被进化的技能模板，是唯一允许被 Meta-Agent 修改的组件

执行层面还有一个容易忽略的细节。传统 harness 在「模型说了什么」和「环境发生了什么」之间没有校验，Recuris 在执行事件上检索记忆，并用一个 checker 把环境响应转成经过验证的状态更新，而不是直接信任对话内容。这意味着 Working Memory 里的每一条进度都有环境证据背书，长任务中「我以为我已经完成了 X」这类漂移会被显式拦住。

**进化循环的关键设计**是「结构化证据 + 验证门」：

1. 每一步执行都记录四元组：工作状态、被调用的技能、动作、环境观测
2. 固定配置的 Meta-Agent 读取失败轨迹，把每个失败归因到具体的记忆组件
3. 只修补被点名的组件（component-specific patching），而不是重写整块记忆
4. 候选补丁必须通过验证门：在留出开发集上修复目标失败、且不回退已有的锚点任务，否则直接丢弃

论文报告了一个支撑整个设计的数字：从结构化轨迹做失败归因的准确率是 `64.8%`，而只看任务结果（成功/失败二值信号）只有 `13.0%`。这就是「为什么必须记录过程」的最短论证。

主结果方面，Recuris 在四个长程基准、十个模型上评估：

- τ²-Bench Retail：GPT-5.6 Sol 从 `58.3%` 提到 `76.1%`（+17.8），Claude Opus 5 从 `72.4%` 提到 `87.9%`（+15.6），比该基准上不用 Recuris 的最佳模型还高 9.7 个点
- SkillFlow：Qwen3.6-27B 从 `42.2%` 到 `58.7%`，Qwen3.6-35B 从 `35.3%` 到 `48.8%`
- 37 个「模型 × 基准」组合中 35 个提升；交互轮次越长优势越大，最长任务上达到 +32.2 个点，常见长程失败模式最多下降 80%

![Recuris 在 τ²-Bench 与 SkillFlow 上的基线对比]( {{ site.baseurl }}/assets/images/paradigm-radar-recuris-gains.svg )

还有一个反直觉的消融值得注意。论文 Table 12 对比了四种配置（τ²-Retail，同模型同任务同预算）：裸 Agent 成功率 `58.11%`；只加工作记忆 `82.02%`；让模型自己控制技能调用（把整个技能库常驻上下文）只有 `65.57%`，比 Recuris 的 `83.55%` 低 18 个点，单次成功成本还高 46%。结论是：状态接地（state-grounded）的技能选择比「把更多东西塞进上下文」更有效，多给上下文反而买来了更差的结果。

## StarHarness 与 SkillForge：同一条路线的另外两个证据点

**StarHarness**（7 位作者，企业环境方向）做的是 harness 本身的进化搜索：用分层搜索（stratified search）从基线失败行为中构造紧凑的任务池，把任务分成 proposer 可见的搜索集、proposer 不可见的选择集和留出的评估集。进化对象包括 prompt 与任务框架、工具接口、技能、MCP provider、子 Agent 结构和 agent loop 配置。结果：

- ITBench SRE、EnterpriseOps-Gym ITSM、AutomationBench Finance 三个基准上，全基准性能提升 `20-35` 个百分点，每个环境只接受了 4-12 次修改
- ITBench 上 Qwen3.5-27B 从 `25.6%` 到 `70.0%`（+44.4 pp），GPT-5.4-mini 从 `33.1%` 到 `79.4%`（+46.3 pp）
- 增益在排除出进化集的任务上依然成立，且跨 GPT 与 Qwen 模型家族免重训迁移

![StarHarness 的分层任务池与验证门控提交流程]( {{ site.baseurl }}/assets/images/paradigm-radar-starharness-search.svg )

**SkillForge**（8 位作者）则从训练侧切入：RL 训练的 Agent 通常是「一次性的」（episodic），跨 episode 无法积累可复用知识。此前的 SkillRL 把技能库当只追加仓库，从不验证已存技能是否还有效。SkillForge 让 RL 直接优化技能调用决策本身，并为每个技能跟踪成功率与使用次数，聚合出低效分数触发反思式修订——技能库可以持续增长，同时保持质量。在 ALFWorld、WebShop、AppWorld 上全面超过 SkillRL。

三篇论文放在一起看，信号是清晰的：**记忆怎么被使用（Recuris）、harness 结构怎么被搜索（StarHarness）、技能怎么被验证与精炼（SkillForge）**，分别覆盖了 Harness 自进化的三个子问题，而且都收敛到同一组工程模式。

| 维度 | Recuris | StarHarness | SkillForge |
|------|---------|-------------|------------|
| 进化对象 | Skill Memory（组件级补丁） | prompt/工具接口/技能/子 Agent 结构 | 技能库条目 |
| 搜索方式 | Meta-Agent 定向修补 | 分层任务池 + 提议-选择分离 | RL 直接优化调用决策 |
| 验证机制 | dev 集锚点任务回归门 | proposer-hidden 选择集 + 留出集 | 成功率/使用次数低效分数 |
| 模型权重 | 不动 | 不动 | 动（RL 训练） |
| 迁移证据 | 跨模型（SkillFlow） | 跨任务 + 跨 GPT/Qwen 家族 | 基准内（ALFWorld/WebShop/AppWorld） |

注意最后一行：SkillForge 是唯一同时动权重的，它的「可验证技能」实际上是在训练时给 RL 提供结构化的中间目标。这提示 Harness 层与权重层的边界没有想象中清晰——更准确的说法是：**进化的证据回路搬到了外部，但优化器可以留在任何一层**。

## 反方观点：这些增益的边界在哪里

范式转移的叙事要成立，必须先把反面证据摆出来。以下是从论文原文中提炼的边界条件，也是你评估这套路线时应该问的问题。

**基准过拟合风险**。三篇论文的增益全部来自基准环境。StarHarness 用 proposer-hidden 选择集和留出集来控制这个问题，Recuris 用 evolve/dev/test 三分且 dev 集里故意放锚点任务来抓回退——但这些都是「在可验证环境里」的防御。你的生产环境如果没有程序化验证器（verifier），验证门就失去了证据来源，整个循环退化成无监督的自我修改。

**迁移是有条件的**。Recuris 明确区分了两种迁移：SkillFlow 的结果衡量的是跨模型迁移（技能包在部署模型上构建、原样发给没参与构建的模型），不是跨任务迁移，因为该基准没有留出任务集；StarHarness 的跨模型迁移是在三个特定企业基准上验证的。把「跨 GPT/Qwen 可迁移」泛化成「到处可迁移」，超出了证据范围。

**样本量与统计强度**。Recuris 在 Terminal-Bench 2.1 的测试时自适应实验中自己承认：所有置信区间在该样本量下都包含零，「我们报告的是方向性证据」。+32.2 点的最长任务增益同样来自有限任务数。

**归因准确率仍有上限**。64.8% 的失败归因准确率意味着约三分之一的补丁可能修错了组件——验证门能挡住回退，但挡不住「修对了地方却没用」的无效迭代。StarHarness 也报告了部分场景下误报诊断（false-positive diagnoses）减少而非消失。

**与权重层路线不是替代关系**。Recuris 把递归限制在记忆控制层，是主动选择而非证明权重层无用。如果某个失败模式源于模型能力缺口（而不是状态跟踪或技能调用错误），Harness 层进化修不了它。两条路线更可能是分工：Harness 层吃「工程性失败」，权重层吃「能力性失败」。

## 落地参考：从论文到生产的最小模式

如果你想在现有 Agent 系统里试这条路，三篇论文收敛出的最小可行模式是四件事：

1. **记录结构化轨迹**：每步存（状态、技能、动作、观测）四元组。这是后面一切归因的原料，成本几乎为零
2. **失败归因到组件**：用一个小模型或规则把失败轨迹映射到「工作记忆错 / 技能选错 / 技能本身错」，不要直接重写整块 prompt 或记忆
3. **验证门控提交**：任何修改先在留出任务集上跑——必须修复目标失败且不回退锚点任务。没有验证器就先造一个最小验证器，这是整条路线的前置条件
4. **预算对齐的对照**：Recuris 在 Terminal-Bench 上的对照不是「重试 vs 不重试」，而是「同预算下冻结记忆重试 vs 自适应记忆」。你的 A/B 也要控制重试预算这个混淆变量

验证门的核心逻辑可以压缩成十几行伪代码：

```python
def admit(memory, candidate, failed_tasks, dev_set):
    # candidate: Meta-Agent 生成的组件级补丁
    repaired = all(run(candidate, t).ok for t in failed_tasks)
    anchors = [t for t in dev_set if run(memory, t).ok]
    no_regression = all(run(candidate, t).ok for t in anchors)
    return candidate if (repaired and no_regression) else memory
```

## 雷达观察点：未来 1-2 个周期盯什么

基于本轮三篇论文的位置，下一到两个周期（4-8 周）值得盯的信号：

- **验证器生态**：如果「为生产环境造 Agent 任务验证器」出现独立工具或框架，Harness 自进化就从基准走进生产。关注 StarHarness 作者团队（企业运营方向）的后续开源
- **跨模型技能包市场**：Recuris 证明了技能包可以跨模型免重训迁移。如果出现「技能包 + 目标模型」的组合分发形态，Agent 能力分发的粒度就从 checkpoint 变成 skill package
- **归因准确率竞争**：64.8% 是 Recuris 用结构化轨迹做到的水平。这个指标会被卷——谁把失败归因做到 90%+，谁的进化循环迭代效率就高一个量级
- **权重层与 Harness 层的分工证据**：期待出现显式对比「同一个失败，微调修 vs Harness 修」成本收益的论文。这类 matched comparison 目前三篇里都没有
- **安全边界**：可自修改的系统天然引入新的攻击面（恶意技能注入、验证门绕过）。参考本站此前对 Agent harness 安全基准的分析（[HarnessRisk][harnessrisk-post]），自进化 harness 大概率是下一个被红队盯上的对象

## 总结与行动清单

这轮论文的核心判断：**Agent 自进化的主战场正在从模型权重转移到 Harness 层**，驱动力是成本、可回滚性和归因精度三个工程约束。三篇论文分别验证了记忆使用（Recuris）、结构搜索（StarHarness）和技能质量（SkillForge），共同收敛到「结构化证据 + 组件级修补 + 验证门」这套模式。边界同样清楚：一切依赖可验证环境，迁移有条件，统计强度有限。

**你现在可以做的**：

1. 给现有 Agent 加上四元组轨迹记录，先积累两周的失败样本
2. 为最核心的 3-5 个任务写最小程序化验证器（断言式即可）
3. 用规则或小模型对历史失败做组件归因，统计「状态错 / 技能错 / 调用错」的比例
4. 在留出任务集上实现验证门逻辑，再考虑引入 Meta-Agent 自动修补
5. 跟踪 τ²-Bench、SkillFlow、ITBench 的后续版本，注意基准本身的进化

## References

- [Recuris: Recursive Experiential-Working Memory Evolution for Long-Horizon Agent Harnesses (arXiv:2608.24876)][paper1-url]
- [StarHarness: Evolving Harnesses with Stratified Search for Enterprise Environments (arXiv:2608.24804)][paper2-url]
- [SkillForge: Evolving Verifiable Skills for Reinforcement Learning Agents (arXiv:2608.24747)][paper3-url]
- [AI 范式雷达：HarnessRisk — Agent harness 安全基准解读][harnessrisk-post]


[paper1-url]: https://arxiv.org/abs/2608.24876
[paper2-url]: https://arxiv.org/abs/2608.24804
[paper3-url]: https://arxiv.org/abs/2608.24747
[harnessrisk-post]: {{ site.baseurl }}/one-minute-read-paper-harnessrisk-agent-harness-safety/
