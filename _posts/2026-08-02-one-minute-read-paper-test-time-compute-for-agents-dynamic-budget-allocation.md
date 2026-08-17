# Test-Time Compute for Agents: Dynamic Budget Allocation — 从均匀分配到自适应推理的范式转移

## Core Idea

Test-Time Compute for Agents 的核心范式转移在于：从"所有子任务均匀分配推理预算"转向"根据任务难度动态自适应地调整思考深度"。传统 Agent 架构（ReAct、Plan-Execute）在每一轮推理中消耗大致相同的计算资源——无论当前步骤是简单的工具调用还是复杂的逻辑推理。Test-Time Compute for Agents 范式则要求 Agent 具备元认知能力：在执行过程中实时评估子任务难度，将更多 thinking tokens 或搜索深度分配给困难步骤，同时快速通过简单步骤。

与通用 LLM 的 test-time compute scaling（如 o1/o3 的 thinking tokens 扩展）不同，Agent 场景的独特挑战在于：计算资源需要在多个子任务之间分配，而非在单个任务的推理链中均匀延长。这引入了新的优化维度——预算调度问题（budget scheduling），即如何在有限总预算下最大化整体成功率。

## Key Findings

**arXiv:2607.28573** (Woongkyu Lee, Jungwook Choi, 2026) 是第一篇专门针对 Agent 场景的 test-time compute 实证研究，系统性地评估了四个扩展维度：上下文扩展、时间扩展、结构分解和并行扩展。核心发现出人意料——额外计算并不提高任务成功率，而是将失败从"重复/停滞轨迹"转移到"过早错误成功"（模型自信地执行了错误的操作序列）。这意味着本地 CUA Agent 需要围绕模型能力设计的框架，而非简单增加计算。

这一发现与 DeepMind 的 Tree of Thoughts (ToT) / Graph of Thought (GoT) 形成互补——ToT/GoT 证明了搜索深度作为计算资源的有效性（Game of 24 任务中从 4% 提升到 74%），但也暴露了每个节点评估需要额外 LLM 调用的开销问题。OpenAI o1/o3 系列的 scaling law 进一步证实：thinking tokens 数量与准确率之间存在对数近似线性关系，但边际收益在高 token 区间（>10K）显著递减。

Anthropic Claude Extended Thinking 的工作为 Agent 预算分配提供了实用的参数化方法——通过控制 thinking token 上限来调节推理深度。Self-Refine/Reflexion 则展示了另一种扩展机制：不是简单地增加 tokens，而是通过"生成-评估-修正"循环动态调整输出质量。

## Implications for Agents

Test-Time Compute for Agents 对 Agent 架构设计产生三个关键影响。第一，Agent 需要内置难度评估器——在执行每个子任务前快速判断其复杂度等级（简单/中等/困难），据此决定分配多少推理预算。第二，"过早错误成功"的发现意味着动态分配不仅需要决定"何时多思考"，还需要"何时停止并切换策略"——自我怀疑（self-doubt）机制应成为 Agent 推理时扩展的标准组件。第三，工具调用延迟耦合是 Agent 场景独有的成本结构：增加 thinking tokens 的同时可能触发更多工具调用，导致总延迟非线性增长。

Best-of-N 采样方法提供了另一种思路——与其在一个路径上深度思考，不如并行探索多条路径。这在工具调用场景中特别有价值：当多个工具可能解决同一问题时，并行尝试并选择最优结果比串行试错更高效。

## Future Directions

三个值得关注的方向：一是 Agent 预算调度算法的标准化，是否会出现类似操作系统 CPU 调度器的通用框架；二是"过早错误成功"现象是否会催生新的评估指标和缓解技术；三是训练时蒸馏与推理时扩展的协同效应——大模型负责复杂任务的深度思考，小模型负责简单任务的快速执行，实现成本与性能的最佳平衡。

## References

1. Lee, W., Choi, J. (2026). "Rethinking Inference-Time Scaling in Local Computer-Use Agents: Failure Modes and Compute Tradeoffs." arXiv:2607.28573.
   https://arxiv.org/abs/2607.28573

2. Yao, S., et al. (2023). "Tree of Thoughts: Deliberate Problem Solving with Large Language Models." arXiv:2305.10601.
   https://arxiv.org/abs/2305.10601

3. Besta, M., et al. (2024). "Graph of Thought: Reasoning with Structured Contextualized Graphs." arXiv:2305.16582.
   https://arxiv.org/abs/2305.16582

4. OpenAI (2024). "Learning to Reason with LLMs." o1 System Card.
   https://openai.com/index/o1-system-card/

5. Madaan, A., et al. (2023). "Self-Refine: Iterative Refinement with Self-Feedback." arXiv:2303.17651.
   https://arxiv.org/abs/2303.17651

6. Shinn, N., et al. (2023). "Reflexion: Language Agents with Verbal Reinforcement Learning." arXiv:2303.11366.
   https://arxiv.org/abs/2303.11366
