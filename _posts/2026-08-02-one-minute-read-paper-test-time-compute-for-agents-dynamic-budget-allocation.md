---
layout: post
title:  "一分钟读论文：《Agent 的推理预算该动态分配》"
author: unbug
categories: [AI, LLM]
image: assets/images/test-time-compute-for-agents-framework.svg
tags: [llm, agent, test-time-compute, reasoning]
description: "首篇针对 Agent 场景的测试时计算实证研究发现，额外计算不提高任务成功率，只把失败从重复停滞轨迹转移到过早错误成功；预算应随子任务难度动态调度，而非在推理链上均匀延长。"
---

韩国研究团队 Woongkyu Lee 与 Jungwook Choi 的论文[《Rethinking Inference-Time Scaling in Local Computer-Use Agents: Failure Modes and Compute Tradeoffs》][paper1-url]（arXiv:2607.28573）是第一篇针对 Agent 场景的 test-time compute（测试时计算，

指执行任务而非训练期间消耗的推理资源）实证研究。

核心结论：**额外计算并不提高任务成功率**，只把失败从「重复/停滞轨迹」转移到「过早错误成功」，即模型自信地执行了错误的操作序列。

![固定预算与动态预算分配的对比：三步均匀 2,400 tokens 与按难度调度 7,200 tokens]({{ site.baseurl }}/assets/images/test-time-compute-for-agents-framework.svg)

## 从均匀分配到难度调度

**Test-Time Compute for Agents** 的范式转移在于：从「所有子任务均匀分配推理预算」转向「根据任务难度动态调整思考深度」。传统 Agent 架构（ReAct、Plan-Execute）每轮推理消耗的计算资源大致相同，无论当前步骤是简单工具调用还是复杂逻辑推理。该范式要求 Agent 具备元认知能力：执行中实时评估子任务难度，把更多 thinking tokens 分配给困难步骤，快速通过简单步骤。

与通用大语言模型的测试时计算扩展（如 OpenAI o1/o3）不同，Agent 的计算资源要在多个子任务间分配，而非在单条推理链中均匀延长，由此引入预算调度问题（budget scheduling）：在有限总预算下最大化整体成功率。在同一条三步执行序列上，若每步一律 `~800 tokens`，合计 `~2,400`；按难度调度后简单步 `~300`、中等步 `~1,500`、困难步 `~5,000`，合计约 `~7,200 tokens`。本站[Agent 推理时扩展范式雷达]({{ site.baseurl }}/paradigm-radar-test-time-compute-for-agents/) 对这一转移有完整梳理。

## 四维扩展的实证证据

论文系统评估了上下文扩展、时间扩展、结构分解和并行扩展四个维度；核心发现是额外计算改变失败模式而非提升成功率，本地计算机使用 Agent（Computer-Use Agent，CUA，即操作本地电脑界面的代理）需要围绕模型能力设计框架。停滞轨迹尚可回退，过早错误成功则不可逆。

这一发现与 DeepMind 的 Tree of Thoughts（ToT）/ Graph of Thought（GoT）形成互补：两者证明了搜索深度作为计算资源的有效性（Game of 24 任务中从 `4%` 提升到 `74%`），但也暴露了每个节点评估需额外 LLM 调用的开销。OpenAI o1/o3 系列的 scaling law 进一步证实：thinking tokens 数量与准确率近似对数线性，但边际收益在高 token 区间（`>10K`）显著递减。Anthropic Claude Extended Thinking 通过控制 thinking token 上限调节推理深度；Self-Refine 与 Reflexion 则用「生成-评估-修正」循环动态调整输出质量，而非简单增加 tokens。

## 对 Agent 架构的三个影响

第一，Agent 需要内置难度评估器，执行每个子任务前判断复杂度等级（简单/中等/困难），据此决定推理预算。第二，「过早错误成功」意味着动态分配不仅要决定「何时多思考」，还要决定「何时停止并切换策略」，自我怀疑（self-doubt）机制应成为推理时扩展的标准组件。第三，工具调用延迟耦合是 Agent 场景独有的成本结构：增加 thinking tokens 可能触发更多工具调用，导致总延迟非线性增长。Best-of-N 采样（并行采样多条候选路径再择优）提供了另一条路，在多个工具可解决同一问题的场景中尤其有效。

三个值得关注的方向：Agent 预算调度算法的标准化；「过早错误成功」是否会催生新的评估指标与缓解技术；训练时蒸馏与推理时扩展的协同：大模型负责复杂任务的深度思考，小模型负责简单任务的快速执行。本站[《测试时扩展：瓶颈在筛选，不在采样》]({{ site.baseurl }}/one-minute-read-paper-tts-exploitation-bottleneck/)提供了算力与利用端的补充证据。

## References
- [Rethinking Inference-Time Scaling in Local Computer-Use Agents（arXiv:2607.28573）][paper1-url]
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models][links-1]
- [Graph of Thought: Reasoning with Structured Contextualized Graphs][links-2]
- [OpenAI o1 System Card][links-3]
- [Self-Refine: Iterative Refinement with Self-Feedback][links-4]
- [Reflexion: Language Agents with Verbal Reinforcement Learning][links-5]
- [Agent 推理时扩展：动态预算分配的范式转移（站内范式雷达）][links-6]
- [测试时扩展：瓶颈在筛选，不在采样（站内解读）][links-7]


[paper1-url]: https://arxiv.org/abs/2607.28573
[links-1]: https://arxiv.org/abs/2305.10601
[links-2]: https://arxiv.org/abs/2305.16582
[links-3]: https://openai.com/index/o1-system-card/
[links-4]: https://arxiv.org/abs/2303.17651
[links-5]: https://arxiv.org/abs/2303.11366
[links-6]: {{ site.baseurl }}/paradigm-radar-test-time-compute-for-agents/
[links-7]: {{ site.baseurl }}/one-minute-read-paper-tts-exploitation-bottleneck/
