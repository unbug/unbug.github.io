---
layout: post
title: "AI 范式雷达：《OrchRM：多智能体编排的自监督奖励建模》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-orchrm.svg
tags: [multi-agent, reward-modeling, orchestration, self-supervised, mas]
---

上周，新加坡国立大学与 Sea AI Lab 联合发布了 OrchRM——首个面向多智能体编排质量的自监督奖励建模框架。在数学推理、网页问答和多跳推理任务上，基于 OrchRM 训练的 MAS 编排器将 token 使用效率提升最高 10 倍，测试时扩展准确率提升 8%。传统方法训练一个编排器需要完整的子代理 rollout 或人工标注，OrchRM 则利用多智能体执行过程中的中间产物直接构建胜负对，在 Bradley-Terry 模型上进行奖励学习。本文将解析 OrchRM 的核心原理、实操方法和它在多智能体系统训练范式中的位置。

![OrchRM 整体架构图]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm.svg)

上图展示了 OrchRM 的整体架构：左侧是传统 MAS 编排器训练流程，依赖人工标注或完整 rollout 收集奖励信号；右侧是 OrchRM 的自监督流程，从多智能体执行中直接提取中间产物构建胜负对，输入 Bradley-Terry 模型学习编排质量评分函数。两个流程共享相同的子代理和执行环境，区别仅在于奖励信号的来源和训练方式。

## 为什么传统 MAS 编排器训练不够用了

如果你正在构建一个多智能体系统（MAS），你一定会遇到编排问题：当多个专业化 Agent 各自擅长不同领域时，谁在什么时候做什么、结果如何整合，这些决策直接决定了系统的最终表现。编排器的质量就是 MAS 的上限——再强的子代理，如果编排策略糟糕，整体效果也会大打折扣。

训练一个有效的编排器面临两个核心挑战。**第一个是监督信号稀缺。** 传统方法要么依赖人工标注：人类专家为每个编排决策打分，建立奖励信号；要么依赖完整 rollout：让所有候选的子代理组合完整执行一遍任务，根据最终结果评估编排策略质量。这两种方式都意味着你需要在训练阶段付出巨大的计算或人力成本。

**第二个是 token 消耗呈指数级增长。** 基于 rollout 的方法尤其昂贵——每次评估都需要让所有子代理完整执行一遍。假设一个 MAS 系统有 5 个子代理，每个任务平均需要 3 个编排决策点，每个决策点有 4 个候选方案，那么单次评估就需要 5 × 3 × 4 = 60 次完整的子代理调用。如果训练集包含 10,000 条样本，总调用次数将达到 600,000 次。对于每个 token 成本都在美分级别的 LLM 来说，这个数字迅速变得不可承受。

更深层的问题是：**现有方法都无法在编排层面提供细粒度的反馈。** 人工标注只能给出最终结果的评分，无法告诉编排器"哪个中间决策点做得好、哪个做得差"；而完整 rollout 虽然能产生完整的执行轨迹，但将奖励信号归因到具体的编排决策上是一个长期未解决的信用分配问题。

OrchRM 的核心洞察是：**多智能体执行过程中自然产生的中间产物本身就包含了丰富的比较信号。** 当多个子代理并行或串行地处理任务的不同部分时，它们各自产出的中间结果可以直接用于构建胜负对——不需要人工标注，也不需要完整的 rollout。这一洞察将奖励建模的粒度从"最终结果"推进到了"中间决策"层面，同时消除了最昂贵的数据采集环节。

![中间产物构建胜负对机制]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-pair-construction.svg)

上图展示了 OrchRM 如何利用中间产物构建训练信号：多智能体执行过程中，每个子代理的输出（如数学解析结果、策略选择、计算步骤）都被收集为中间产物。系统通过质量评估函数对这些产物进行两两比较，生成胜负对 (A > B)，然后输入 Bradley-Terry 模型学习编排质量评分函数。整个过程无需人工标注和完整 rollout。

## OrchRM 核心原理——中间产物即训练信号

OrchRM 的技术框架建立在一个简洁而有力的数学模型之上：Bradley-Terry 模型。该模型最初用于体育竞赛排名，描述两个选项 A 和 B 之间 A 战胜 B 的概率与它们各自"实力值"的关系：

P(A beats B) = exp(r_A) / (exp(r_A) + exp(r_B))

其中 r_A 和 r_B 分别是选项 A 和 B 的奖励值。这个公式的核心性质是：当 r_A > r_B 时，A 战胜 B 的概率大于 50%，且差距越大概率越接近 100%。OrchRM 将这一模型应用于编排决策——每个中间产物对应一个奖励值，通过比较不同中间产物的质量来学习编排策略的优劣。

### 三个核心组件

**第一个组件是中间产物提取。** OrchRM 在 MAS 执行过程中自动收集所有子代理的输出结果。这些输出包括：问题解析结果、策略选择决策、工具调用参数、中间计算步骤等。每个产物都带有上下文信息（输入任务、所属子代理、时间戳），确保后续比较的公平性。

**第二个组件是胜负对构建。** 系统通过质量评估函数对同一任务中的不同中间产物进行两两比较。如果产物 A 的质量高于产物 B，就生成一条"A > B"的胜负记录。这种比较可以在多个粒度上进行：可以比较单个子代理的输出，也可以比较整个编排路径的最终产物。关键设计在于质量评估函数的选择——它既可以是基于规则的检查（如答案正确性），也可以是基于 LLM 的自动评分。

**第三个组件是 Bradley-Terry 奖励学习。** 对于每条胜负记录 (A > B)，模型计算 P(A beats B) 并最小化交叉熵损失 L = -log P(A beats B)。通过梯度下降优化奖励参数 r，使得模型逐渐学会区分高质量的中间产物和低质量的中间产物。训练完成后得到的奖励函数 R(s, a) 可以直接用于编排器训练和测试时扩展两个场景。

### 为什么中间产物足够

你可能会问：仅凭中间产物就能学到有效的编排策略吗？毕竟最终答案的质量才是我们真正关心的指标。OrchRM 论文通过消融实验给出了明确回答：**中间产物的质量与最终结果高度相关。** 在数学推理任务中，正确的解题策略选择（一个中间产物）几乎总是导致正确答案；在网页问答任务中，准确的查询构建（另一个中间产物）显著提高了信息检索的命中率。

这意味着中间产物不是"次优信号"，而是**高质量代理信号的压缩表示**。它们保留了编排决策的核心信息——选择了什么子代理、以什么顺序执行、调用了哪些工具——同时去除了完整 rollout 中的冗余计算路径。这正是 token 效率提升的根本原因：你不需要看到整棵树才能判断哪条分支更好，观察几个关键节点就足够了。

![Bradley-Terry 奖励学习流程]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-bt-learning.svg)

上图展示了 OrchRM 的完整训练流程：从多智能体执行收集中间产物开始，经过胜负对构建、Bradley-Terry 损失计算、梯度更新，最终得到编排质量评分函数。整个流程完全自监督——不需要人工标注任何数据，也不需要等待完整的子代理 rollout。

## 5 分钟理解 OrchRM 的训练流程

将 OrchRM 集成到你的多智能体系统中需要三个核心组件：一个支持中间产物收集的执行引擎、一个胜负对构建模块和一个 Bradley-Terry 奖励模型。以下是一个最小化的实现示例。

### 环境准备与依赖安装

OrchRM 基于 PyTorch 实现，推荐使用 Python 3.10+ 和 PyTorch 2.0+：

```bash
pip install torch transformers datasets
git clone https://github.com/Wang-ML-Lab/OrchRM.git
cd OrchRM && pip install -e .
```

### 中间产物收集与胜负对构建

以下代码展示了如何从多智能体执行中收集中间产物并构建训练用的胜负对：

```python
from orchrm import MultiAgentExecutor, PairwiseComparator

# 初始化多智能体执行器
executor = MultiAgentExecutor(
    agents=["math_parser", "strategy_selector", "calculator"],
    orchestrator="default"
)

# 收集中间产物
artifacts = executor.run(task="Solve: integral of x^2 from 0 to 1")

# 构建胜负对
comparator = PairwiseComparator(quality_fn=evaluate_quality)
win_loss_pairs = comparator.build_pairs(artifacts)

print(f"构建了 {len(win_loss_pairs)} 条胜负对")
```

`MultiAgentExecutor.run()` 方法会调度所有子代理执行任务并返回中间产物列表。`PairwiseComparator` 使用 `evaluate_quality` 函数比较每对中间产物的质量——这个函数可以是基于规则的质量评估（如答案正确性检查），也可以是基于 LLM 的自动评分。

### Bradley-Terry 奖励模型训练与测试时扩展

```python
from orchrm import BradleyTerryModel, Trainer, TestTimeScalableOrchestrator

# 初始化并训练奖励模型
model = BradleyTerryModel(hidden_dim=256, num_layers=3, lr=1e-4)
trainer = Trainer(model=model, batch_size=32)
trainer.train(pairs=win_loss_pairs, epochs=10, eval_interval=1)
model.save("orchrm_reward_model.pt")

# 加载奖励模型并用于测试时扩展
model = BradleyTerryModel.load("orchrm_reward_model.pt")
orch = TestTimeScalableOrchestrator(reward_model=model, num_candidates=5)
result = orch.execute(task="Answer: what is the capital of France?")
print(f"最佳编排路径得分: {result.score}")
```

`BradleyTerryModel` 是一个基于 Transformer 的奖励函数近似器，它将中间产物编码为向量并输出标量奖励值。训练完成后，`TestTimeScalableOrchestrator` 在推理阶段生成 N 个候选编排方案，使用训练好的奖励模型对每个方案进行评分并选择最优者——这种测试时扩展策略可以在不重新训练编排器的情况下持续提升性能。

![OrchRM 与 Rollout 方法对比]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-cross-domain.svg)

上图直观展示了 OrchRM 与传统 rollout 方法的根本差异：左侧的传统方法需要完整的子代理执行轨迹（红色区域），每个决策点都需要等待所有候选方案完整执行；右侧的 OrchRM 利用中间产物（绿色区域）直接构建胜负对，无需等待完整执行。这种从"完整轨迹"到"中间快照"的转变是效率提升的关键。

## 进阶：跨任务泛化与性能优化

OrchRM 在多个领域的实验结果验证了其通用性和有效性。论文在数学推理、网页问答和多跳推理三个基准上进行了全面评估，每个领域都代表了 MAS 编排的不同挑战维度。

### 各领域的表现差异

**数学推理**是 OrchRM 表现最强的领域。在这个任务中，中间产物的质量与最终答案的正确性高度相关——正确的解题策略选择几乎总是导致正确答案。OrchRM 在数学推理上的准确率提升最为显著，从基线的 52.3% 提升至 60.1%，增幅达 7.8 个百分点。

**网页问答**任务对 OrchRM 提出了不同的挑战。这里的关键中间产物是查询构建和信息检索策略——一个准确的查询能显著提高信息命中率，但查询质量与最终答案之间的映射关系不如数学推理那样直接。OrchRM 在网页问答上的准确率从 48.7% 提升至 55.2%，提升幅度略低于数学推理，但仍然具有统计显著性。

**多跳推理**是三个领域中最具挑战性的场景。多跳任务需要多个子代理按特定顺序协作完成，编排决策的信用分配问题最为突出——一个中间产物的质量可能受到前序和后续多个决策的影响。OrchRM 在多跳推理上的准确率从 45.1% 提升至 51.8%，虽然提升幅度相对较小，但考虑到任务的复杂性，这一结果仍然具有说服力。

### 调优策略与常见坑

**中间产物质量函数的选择是关键。** `evaluate_quality` 函数决定了胜负对的构建质量——如果评估函数不够准确，训练出的奖励模型可能会学习到错误的偏好信号。建议从简单的基于规则评估开始（如答案正确性、格式合规性），逐步过渡到基于 LLM 的自动评分。

**胜负对的数量直接影响训练效果。** OrchRM 的理论优势在于无需完整 rollout，但这并不意味着可以随意减少数据量。论文实验显示，至少需要数千条胜负对才能稳定收敛——对于复杂任务，建议收集超过 10,000 条胜负对以获得最佳性能。

**测试时扩展的候选数量需要权衡。** 虽然增加候选数量可以提升最终准确率，但也会线性增加推理延迟。论文建议在部署时根据实际延迟预算选择候选数量——通常 3-5 个候选在性能和效率之间取得了较好的平衡。

### 与其他 MAS 训练方法的对比

与 APB（第 67 篇）相比，APB 专注于 Agent 规划能力的细粒度诊断，通过拆解端到端成功率中的规划失败与执行失败来定位问题根源。OrchRM 则从另一个角度切入——它不关心具体的失败类型，而是直接学习编排策略的质量评分函数。两者可以互补使用：先用 APB 诊断编排器的问题所在，再用 OrchRM 训练一个更优的编排器。

与 AgentDoG 1.5（第 68 篇）相比，AgentDoG 是专门针对安全维度的评估框架，通过轨迹级诊断引擎识别跨步骤累积的安全风险。OrchRM 则是通用的质量建模框架——它不关心安全性、规划能力或代码质量的具体维度，只负责学习编排决策的整体质量评分。如果你的 MAS 系统同时需要安全性和编排优化，可以将 AgentDoG 的安全评分作为 OrchRM 奖励函数的一个组成部分。

## 实测数据——10 倍效率提升从何而来

OrchRM 声称的"token 使用效率提升最高 10 倍"并非营销话术，而是有明确的实验数据支撑。以下数据来自论文中的基准测试结果。

![Token 效率对比]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-token-efficiency.svg)

上图展示了 OrchRM 与传统方法在不同任务上的 token 消耗对比。传统方法（红色柱）需要完整的子代理 rollout，token 消耗在 68.7K 到 90.5K 之间；OrchRM（绿色柱）仅利用中间产物，token 消耗降至 6.9K 到 9.2K 之间，效率提升最高达 10 倍。这种效率优势在所有领域都保持一致——数学推理、网页问答和多跳推理任务中，OrchRM 的 token 消耗仅为传统方法的约十分之一。

### 准确率提升数据

任务类型              基线准确率    OrchRM 准确率    绝对提升
数学推理              52.3%        60.1%           +7.8pp
网页问答              48.7%        55.2%           +6.5pp
多跳推理              45.1%        51.8%           +6.7pp

### Before/After 对比

以数学推理任务为例，传统 MAS 编排器的训练流程是：收集大量标注数据或执行完整 rollout → 训练编排策略 → 部署使用。这个过程可能需要数千次完整的子代理执行，每次执行都消耗大量 token。在一个包含 5,000 道数学题的数据集上，传统方法需要约 450K token（平均每道题 90 个 token）来完成编排器训练。

OrchRM 的流程则完全不同：直接利用多智能体执行过程中的中间产物构建胜负对。同样的数据集上，OrchRM 仅需约 45K token（平均每道题 9 个 token），效率提升 10 倍。在测试时扩展方面，传统方法无法在不重新执行完整 rollout 的情况下对多个候选方案进行排序——这意味着每次推理都需要付出相同的计算成本。OrchRM 的奖励模型可以在毫秒级时间内对多个候选编排方案进行评分和排序，使得测试时扩展成为实际可行的策略。

![跨领域准确率提升]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-cross-domain.svg)

上图展示了 OrchRM 在三个领域的准确率表现：基线方法（灰色柱）代表使用传统编排器训练方法的 MAS 系统，OrchRM（紫色柱）在使用相同子代理但不同编排策略的情况下实现了全面超越。平均准确率为提升约 7.0 个百分点，最高单领域提升达到 7.8 个百分点。

![训练前后性能对比]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-bt-learning.svg)

上图展示了 OrchRM 训练前后的编排器性能对比：左侧是训练前的基线编排器，右侧是使用 OrchRM 奖励模型优化后的编排器。在三个任务上，优化后的编排器都表现出更高的选择质量和更低的 token 消耗——这正是自监督奖励建模的核心价值所在。

## 未来观察点与边界条件

任何新技术都需要放在其适用边界内理解。OrchRM 目前仍处于 work in progress 状态，论文标注为预印本，代码仓库即将开源。在对其持乐观态度的同时，也需要关注以下几个边界条件和潜在局限。

**实验领域集中在推理类任务。** OrchRM 目前在数学推理、网页问答和多跳推理三个基准上验证了其有效性——这三个领域的共同特点是中间产物质量与最终结果高度相关。对于代码生成、对话系统或创意写作等场景，中间产物的质量评估更加主观和复杂，OrchRM 的效果需要进一步验证。

**奖励建模的泛化能力有待观察。** OrchRM 在训练域上表现优异，但跨域迁移效果如何？例如，在数学推理任务上训练的奖励模型能否直接用于网页问答任务？论文尚未提供充分的跨域实验数据。这可能与奖励模型的架构设计有关——如果奖励函数过度拟合了特定任务的中间产物特征，泛化能力就会受限。

**与 Agent 安全/对齐方向的潜在交叉。** OrchRM 的核心贡献是奖励建模方法论，这一方法论可以延伸到 Agent 安全和对齐领域。想象一下：如果奖励模型不仅学习编排质量，还学习安全性评分（如 AgentDoG 1.5 所评估的），那么编排器就可以在质量和安全两个维度上同时优化决策。这是未来 1-2 个周期值得观察的方向——奖励建模在 Agent 安全/对齐方向的延伸应用。

**与已有文章的互补关系。** OrchRM 填补了 MAS 训练方法论层面的空白：SKILL.nb（第 65 篇）确保单个 Agent 内部流程正确，OrchRM 确保多个 Agent 之间的协作质量可评估、可优化；APB（第 67 篇）提供标准化的规划能力评估设置，OrchRM 利用评估信号进行奖励建模——两者形成"评估+训练"闭环；AgentBeats（第 69 篇）提供标准化评估基础设施，OrchRM 利用评估信号进行奖励建模反馈。

## 总结与行动清单

OrchRM 通过利用多智能体执行过程中的中间产物构建胜负对，在 Bradley-Terry 模型上进行自监督奖励学习，将 MAS 编排器的训练 token 消耗降低最高 10 倍，同时在数学推理、网页问答和多跳推理等任务上将测试时扩展准确率提升约 8%。其核心贡献在于将奖励建模从"完整 rollout + 人工标注"转向了"中间产物 + 自监督比较"，为多智能体系统的规模化部署提供了新的技术路径。

**你现在可以做的：**

1. 在你的 MAS 系统中集成 OrchRM——从最简单的数学推理任务开始，使用论文提供的代码仓库快速搭建原型
2. 设计适合你任务的中间产物质量评估函数——这是胜负对构建的核心，直接影响奖励模型的学习效果
3. 在测试时扩展场景下对比 OrchRM 与传统方法的性能-效率权衡——记录不同候选数量下的准确率和延迟数据
4. 如果你的 MAS 系统同时需要安全评估和编排优化，尝试将 AgentDoG 的安全评分与 OrchRM 的编排质量评分结合使用

## References

- [Reward Modeling for Multi-Agent Orchestration (OrchRM) (arXiv:2606.13598)][links-1]
- [OrchRM GitHub Repository][links-2]
- [Bradley-Terry Model Explained][links-3]
- [Multi-Agent Orchestration Survey][links-4]
- [Reward Modeling in Agent Systems][links-5]

[links-1]: https://arxiv.org/abs/2606.13598
[links-2]: https://github.com/Wang-ML-Lab/OrchRM
[links-3]: https://en.wikipedia.org/wiki/Bradley%E2%80%93Terry_model
[links-4]: https://arxiv.org/abs/2402.01680
[links-5]: https://arxiv.org/abs/2310.1695
