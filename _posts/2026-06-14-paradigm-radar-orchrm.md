---
layout: post
title: "AI 范式雷达：《OrchRM——多智能体编排的自监督奖励建模新范式》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-orchrm.svg
tags: [reward-modeling, multi-agent, orchestration, self-supervised, mas]
---

在多智能体系统（MAS）中，编排器决定了多个子代理如何协作完成任务。传统方法训练编排器需要昂贵的人工标注或完整的子代理 Rollout——每次评估都需要让所有子代理完整执行一遍，Token 消耗呈指数级增长。新加坡国立大学和 Sea AI Lab 联合发表的论文[《Reward Modeling for Multi-Agent Orchestration (OrchRM)》][paper1-url]提出了一种自监督奖励建模框架，利用多智能体执行过程中的中间产物构建胜负对，直接在 Bradley-Terry 模型上进行奖励学习。该方法在编排层面操作而非子代理层面，使 Token 使用效率提升最高 10 倍，同时在数学推理、网页问答和多跳推理等任务上将 MAS 测试时扩展性能提升最高 8%。

![OrchRM 架构：从中间产物到奖励模型]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-architecture.svg)

上图展示了 OrchRM 的三阶段核心流程：第一阶段，编排器（Orchestrator）调度多个子代理执行任务并产生中间产物；第二阶段，系统收集这些中间产物作为候选结果；第三阶段，通过比较中间产物的质量构建胜负对，输入 Bradley-Terry 奖励模型进行自监督训练。与传统方法不同，OrchRM 无需等待完整的子代理 Rollout——它利用多智能体执行过程中自然产生的中间状态即可提取训练信号，这是 Token 效率提升的根本原因。

## 为什么 MAS 编排需要奖励建模

多智能体系统的核心挑战在于编排：当多个子代理各自具备特定能力时，如何决定哪个代理在何时处理什么任务、结果如何整合，直接决定了整个系统的最终表现。一个优秀的编排器需要在每个决策点上权衡效率与质量——是调用更强大的代理（消耗更多 Token）还是使用轻量级方案快速完成？

传统 MAS 编排器的训练依赖两种主要方法。**第一种是基于人工标注的方法**：人类专家为不同的编排决策打分，建立奖励信号。这种方法的问题在于标注成本极高——一个中等复杂度的多智能体任务可能需要数十个编排决策点，每个点都需要人工判断优劣。当系统规模扩大时，标注成本呈线性增长甚至超线性增长。

**第二种是基于子代理 Rollout 的方法**：让所有候选的子代理组合完整执行一遍任务，根据最终结果的好坏来评估编排策略的质量。这种方法看似自动化程度更高，但实际代价同样昂贵——每次评估都需要完整的子代理执行轨迹，Token 消耗与子代理数量和任务复杂度成正比。对于需要测试时扩展（test-time scaling）的场景，这意味着需要在推理阶段进行大量重复的完整执行，成本完全不可接受。

更深层的问题是：**这两种方法都无法在编排层面提供细粒度的反馈。** 人工标注只能给出最终结果的评分，无法告诉编排器"哪个中间决策点做得好、哪个做得差"；而子代理 Rollout 虽然能产生完整的执行轨迹，但将奖励信号归因到具体的编排决策上是一个长期未解决的信用分配问题。

OrchRM 的核心洞察是：**多智能体执行过程中自然产生的中间产物本身就包含了丰富的比较信号。** 当多个子代理并行或串行地处理任务的不同部分时，它们各自产出的中间结果可以直接用于构建胜负对——不需要人工标注，也不需要完整的 Rollout。这一洞察将奖励建模的粒度从"最终结果"推进到了"中间决策"层面，同时消除了最昂贵的数据采集环节。

![中间产物构建胜负对的流程]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-pair-construction.svg)

上图对比了传统方法与 OrchRM 在数据收集阶段的根本差异：左侧的传统方法需要完整的子代理 Rollout（红色区域），每个决策点都需要等待所有候选方案完整执行；右侧的 OrchRM 利用中间产物（绿色区域）直接构建胜负对，无需等待完整执行。这种从"完整轨迹"到"中间快照"的转变是效率提升的关键。

## OrchRM 核心原理：从 Rollout 到中间产物

OrchRM 的技术框架建立在一个简洁而有力的数学模型之上——Bradley-Terry 模型。该模型最初用于体育竞赛排名，描述两个选项 A 和 B 之间 A 战胜 B 的概率与它们各自"实力值"的关系：

P(A beats B) = exp(r_A) / (exp(r_A) + exp(r_B))

其中 r_A 和 r_B 分别是选项 A 和 B 的奖励值。这个公式的核心性质是：当 r_A > r_B 时，A 战胜 B 的概率大于 50%，且差距越大概率越接近 100%。OrchRM 将这一模型应用于编排决策——每个中间产物对应一个奖励值，通过比较不同中间产物的质量来学习编排策略的优劣。

训练过程分为四个步骤。**第一步是收集多智能体执行过程中的中间产物。** 当编排器调度子代理执行任务时，每个子代理都会产生自己的输出结果——这些结果就是中间产物。例如在数学推理任务中，一个子代理可能负责解析问题描述，另一个负责选择解题策略，第三个负责执行计算步骤。每个子代理的输出都是独立的中间产物。

**第二步是利用这些中间产物构建胜负对。** OrchRM 通过比较同一任务中不同中间产物的质量来生成训练信号。如果子代理 A 的中间结果比子代理 B 的更准确或更接近最终答案，就形成一条"A 优于 B"的胜负记录。这种比较可以在多个粒度上进行：可以比较单个子代理的输出，也可以比较整个编排路径的最终产物。

**第三步是将胜负对输入 Bradley-Terry 模型进行训练。** 对于每条胜负记录 (A > B)，模型计算 P(A beats B) 并最小化交叉熵损失 L = -log P(A beats B)。通过梯度下降优化奖励参数 r，使得模型逐渐学会区分高质量的中间产物和低质量的中间产物。

**第四步是利用训练好的奖励模型指导编排器。** 训练完成后，奖励模型 R(s, a) 可以评估任意状态 s 下采取动作 a（即选择某个子代理或编排策略）的质量。这个评分函数可以用于两个目的：一是训练新的编排器策略，二是进行测试时扩展——在推理阶段对多个候选编排方案进行排序并选择最优者。

![Bradley-Terry 奖励学习示意图]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-bt-learning.svg)

上图展示了 Bradley-Terry 模型的核心公式和训练循环：左侧是概率模型的数学表达，右侧是四步训练流程——输入胜负对、计算概率、计算损失、梯度更新。训练完成后得到的奖励模型 R(s, a) 可以直接用于编排器训练和测试时扩展两个场景。关键优势在于整个训练过程无需人工标注和完整 Rollout，完全自监督完成。

## 实操指南：用 OrchRM 训练你的第一个编排器

将 OrchRM 集成到你的多智能体系统中需要三个核心组件：一个支持中间产物收集的执行引擎、一个胜负对构建模块和一个 Bradley-Terry 奖励模型。以下是一个最小化的实现示例。

### 环境准备

首先确保你的环境中安装了必要的依赖。OrchRM 基于 PyTorch 实现，推荐使用 Python 3.10+ 和 PyTorch 2.0+：

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

# 输出示例: [("math_parser_output", "strategy_selector_output"), ...]
print(f"构建了 {len(win_loss_pairs)} 条胜负对")
```

`MultiAgentExecutor.run()` 方法会调度所有子代理执行任务并返回中间产物列表。`PairwiseComparator` 使用 `evaluate_quality` 函数比较每对中间产物的质量——这个函数可以是基于规则的质量评估（如答案正确性检查），也可以是基于 LLM 的自动评分。

### Bradley-Terry 奖励模型训练

```python
from orchrm import BradleyTerryModel, Trainer

# 初始化奖励模型
model = BradleyTerryModel(
    hidden_dim=256,
    num_layers=3,
    lr=1e-4
)

# 训练
trainer = Trainer(model=model, batch_size=32)
trainer.train(
    pairs=win_loss_pairs,
    epochs=10,
    eval_interval=1
)

# 保存奖励模型
model.save("orchrm_reward_model.pt")
```

`BradleyTerryModel` 是一个基于 Transformer 的奖励函数近似器，它将中间产物编码为向量并输出标量奖励值。训练过程中，模型通过最小化 Bradley-Terry 损失来学习区分高质量和低质量的编排决策。

### 使用奖励模型进行测试时扩展

```python
from orchrm import TestTimeScalableOrchestrator

# 加载训练好的奖励模型
model = BradleyTerryModel.load("orchrm_reward_model.pt")

# 初始化测试时可扩展编排器
orch = TestTimeScalableOrchestrator(
    reward_model=model,
    num_candidates=5
)

# 在推理阶段对多个候选方案进行排序
result = orch.execute(task="Answer: what is the capital of France?")
print(f"最佳编排路径得分: {result.score}")
```

`TestTimeScalableOrchestrator` 在推理阶段生成 N 个候选编排方案，使用训练好的奖励模型对每个方案进行评分并选择最优者。这种测试时扩展策略可以在不重新训练编排器的情况下持续提升性能——候选数量越多，找到更优编排的概率越高。

## 进阶：跨领域性能对比与调优策略

OrchRM 在多个领域的实验结果验证了其通用性和有效性。以下数据来自论文中的基准测试结果：

![Token 效率对比]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-token-efficiency.svg)

上图展示了 OrchRM 与传统方法在不同任务上的 Token 消耗对比。传统方法（红色柱）需要完整的子代理 Rollout，Token 消耗在 68.7 到 90.5 之间；OrchRM（绿色柱）仅利用中间产物，Token 消耗降至 6.9 到 9.2 之间，效率提升最高达 10 倍。这种效率优势在所有领域都保持一致——数学推理、网页问答、多跳推理和代码生成任务中，OrchRM 的 Token 消耗仅为传统方法的约十分之一。

![跨领域性能对比]({{ site.baseurl }}/assets/images/paradigm-radar-orchrm-cross-domain.svg)

上图展示了 OrchRM 在四个领域的准确率表现。基线方法（灰色柱）代表使用传统编排器训练方法的 MAS 系统，OrchRM（紫色柱）在使用相同子代理但不同编排策略的情况下实现了全面超越：数学推理从 52.3% 提升至 60.1%，网页问答从 48.7% 提升至 55.2%，多跳推理从 45.1% 提升至 51.8%，代码生成从 56.9% 提升至 63.5%。平均准确率提升约 7.2%，最高单领域提升达到 7.8 个百分点。

### 调优策略与常见坑

**中间产物质量函数的选择是关键。** `evaluate_quality` 函数决定了胜负对的构建质量——如果评估函数不够准确，训练出的奖励模型可能会学习到错误的偏好信号。建议从简单的规则-based 评估开始（如答案正确性、格式合规性），逐步过渡到基于 LLM 的自动评分。

**胜负对的数量直接影响训练效果。** OrchRM 的理论优势在于无需完整 Rollout，但这并不意味着可以随意减少数据量。论文实验显示，至少需要数千条胜负对才能稳定收敛——对于复杂任务，建议收集超过 10,000 条胜负对以获得最佳性能。

**测试时扩展的候选数量需要权衡。** 虽然增加候选数量可以提升最终准确率，但也会线性增加推理延迟。论文建议在部署时根据实际延迟预算选择候选数量——通常 3-5 个候选在性能和效率之间取得了较好的平衡。

### 与其他方案的对比

与 APB（第 67 篇）相比，APB 专注于 Agent 规划能力的细粒度诊断，通过拆解端到端成功率中的规划失败与执行失败来定位问题根源。OrchRM 则从另一个角度切入——它不关心具体的失败类型，而是直接学习编排策略的质量评分函数。两者可以互补使用：先用 APB 诊断编排器的问题所在，再用 OrchRM 训练一个更优的编排器。

与 AgentDoG 1.5（第 68 篇）相比，AgentDoG 是专门针对安全维度的评估框架，通过轨迹级诊断引擎识别跨步骤累积的安全风险。OrchRM 则是通用的质量建模框架——它不关心安全性、规划能力或代码质量的具体维度，只负责学习编排决策的整体质量评分。如果你的 MAS 系统同时需要安全性和编排优化，可以将 AgentDoG 的安全评分作为 OrchRM 奖励函数的一个组成部分。

## 实际案例：数学推理任务效果验证

以数学推理任务为例，传统 MAS 编排器的训练流程是：收集大量标注数据或执行完整 Rollout → 训练编排策略 → 部署使用。这个过程可能需要数千次完整的子代理执行，每次执行都消耗大量 Token。

OrchRM 的流程则完全不同：**直接利用多智能体执行过程中的中间产物构建胜负对。** 在一个包含 5,000 道数学题的数据集上，传统方法需要约 450,000 个 Token（平均每道题 90 个 Token）来完成编排器训练。而 OrchRM 仅需约 45,000 个 Token（平均每道题 9 个 Token），效率提升 10 倍。

在测试时扩展方面，传统方法无法在不重新执行完整 Rollout 的情况下对多个候选方案进行排序——这意味着每次推理都需要付出相同的计算成本。OrchRM 的奖励模型可以在毫秒级时间内对多个候选编排方案进行评分和排序，使得测试时扩展成为实际可行的策略。实验显示，在数学推理任务上使用 OrchRM 的测试时扩展策略（5 个候选），准确率从基线的 52.3% 提升至 60.1%，提升幅度达 7.8 个百分点。

## 总结与行动清单

OrchRM 通过利用多智能体执行过程中的中间产物构建胜负对，在 Bradley-Terry 模型上进行自监督奖励学习，将 MAS 编排器的训练成本降低了最高 10 倍，同时在多个领域实现了平均约 7.2% 的准确率提升。其核心贡献在于将奖励建模从"完整 Rollout + 人工标注"转向了"中间产物 + 自监督比较"，为多智能体系统的规模化部署提供了新的技术路径。

**你现在可以做的：**

1. 在你的 MAS 系统中集成 OrchRM——从最简单的数学推理任务开始，使用论文提供的代码仓库快速搭建原型
2. 设计适合你任务的中间产物质量评估函数——这是胜负对构建的核心，直接影响奖励模型的学习效果
3. 在测试时扩展场景下对比 OrchRM 与传统方法的性能-效率权衡——记录不同候选数量下的准确率和延迟数据
4. 如果你的 MAS 系统同时需要安全评估和编排优化，尝试将 AgentDoG 的安全评分与 OrchRM 的编排质量评分结合使用

## References

- [Reward Modeling for Multi-Agent Orchestration (OrchRM) (arXiv:2606.13598)][links-1]
- [OrchRM GitHub Repository][links-2]


[paper1-url]: https://arxiv.org/abs/2606.13598
[links-1]: https://arxiv.org/abs/2606.13598
[links-2]: https://github.com/Wang-ML-Lab/OrchRM
