---
layout: post
title: "AI 范式雷达：《Agent的Token账单：1000倍消耗差异背后的工程真相》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-token-consumption-economics.svg
tags: [token-economics, agent-cost, swebench, model-efficiency, cost-optimization]
---

如果你正在构建或部署 AI 智能体，你可能已经注意到一个令人不安的事实：同一个 Agent 任务，跑十次可能产生十种完全不同的 Token 账单。斯坦福大学 Longju Bai、密歇根大学 Jiaxin Pei 等研究者最近发表的论文[《How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks》][paper1-url]首次对这个问题进行了系统性量化研究——他们分析了 8 个前沿 LLM 在 SWE-bench Verified 上的执行轨迹，得出了几个颠覆常识的结论。这篇文章将带你理解这些发现背后的工程含义，以及它们如何改变你对 Agent 成本管理的认知。

![封面图]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-economics.svg)

## 为什么 Agent Token 消耗是一个被忽视的工程问题

在讨论大语言模型的成本时，我们习惯了用"每百万 Token X 美元"来衡量——这适用于代码补全、对话问答等单次推理场景。但 Agent 编码任务完全打破了这个计量框架。

Agent 不是做一次推理就结束。它需要：加载系统提示和工具定义、生成初始代码、执行测试、分析错误反馈、迭代修复、最终提交。每一步都涉及一次或多次 LLM 调用，而每次调用的输入 Token 包含了之前所有步骤的完整上下文。这意味着——**Token 消耗不是线性的，而是累积的**。

![Agent 编码任务 Token 累积路径]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-accumulation.svg)

论文的研究对象是 SWE-bench Verified——一个包含真实 GitHub 仓库 bug 修复任务的基准测试集。研究者让 8 个前沿模型（包括 GPT-5、Claude-Sonnet-4.5、Kimi-K2、Gemini-2.5-Pro 等）独立完成这些任务，并记录了每一步的 Token 消耗。

这个研究的价值在于：它是第一个将 Agent 编码任务的 Token 消耗从"模糊的经验感知"转化为"精确的量化数据"的工作。在此之前，工程师们只能凭感觉说"这个 Agent 太贵了"——现在他们有了具体的数字、分布和趋势。

## 输入 Token 如何驱动成本爆炸

论文最核心的发现之一：**Agent 任务的 Token 消耗主要由输入 Token（而非输出 Token）驱动**。

![Token 消耗构成分析]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-breakdown.svg)

具体来说，在 Agent 编码任务中：

- **系统提示和工具定义**构成了初始输入的绝大部分——这些是每次调用都必须携带的"固定成本"
- **迭代循环中的上下文累积**是成本爆炸的真正推手。每轮错误修复都会将之前的对话历史重新发送给模型，导致输入 Token 随迭代次数线性增长
- **输出 Token（生成的代码）**只占总消耗的约 15%

这意味着什么？当你优化 Agent 的成本时，减少输出的 Token 数量几乎没有任何效果——真正需要关注的是如何**压缩输入 Token**。

一个典型的策略是：在每轮迭代中，不发送完整的对话历史，而是提取关键信息摘要。另一个策略是使用更紧凑的工具定义格式。还有一些前沿方案尝试将系统提示拆分为"核心指令"和"按需加载的上下文模块"——只在需要时注入相关部分。

但所有这些方案的共同挑战在于：**压缩输入 Token 的同时不能丢失 Agent 做出正确决策所需的信息**。这是一个典型的工程权衡问题，没有银弹解决方案。

## 同一任务，30倍差异：Agent 的内在变异性

如果你以为选一个更强的模型就能稳定控制成本，论文的数据会给你泼一盆冷水。

![同一任务运行间 Token 消耗差异]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-variance.svg)

在 SWE-bench Verified 的测试中，**同一个任务在不同运行间的 Token 消耗差异可达 30 倍**。这意味着：即使你固定了模型、提示词和工具定义，Agent 仍然可能因为随机性（temperature 设置、采样路径等）产生完全不同的执行轨迹——有的路径高效地解决问题，有的路径则在错误的方向上浪费大量 Token。

这种变异性不是 bug，而是当前基于采样的 LLM 架构的固有特性。每次推理都是一次概率抽样，而 Agent 的多步决策链会将这些微小的随机偏差放大为巨大的成本差异。

更令人意外的是：**更高 Token 消耗并不等于更高的任务解决准确率**。论文绘制了准确率与 Token 消耗的关系曲线——它呈现出一个倒 U 型：在中等成本区间准确率最高，超出后反而下降。

![准确率 vs Token 消耗]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-accuracy-curve.svg)

这个发现挑战了一个根深蒂固的直觉："多花点钱，多跑几轮，总能解决"。数据表明：当 Agent 进入高消耗区域时，它往往已经在错误的方向上越走越远——更多的 Token 只是在重复无效的路径，而不是探索新的解决方案。

## 模型效率与预测困境：两个被忽视的维度

论文揭示了两个常被忽视但影响深远的发现：**模型间的 Token 效率差异巨大**，以及**前沿模型无法准确预测自身的 Token 用量**。

![模型效率对比]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-model-comparison.svg)

在模型效率方面，Kimi-K2 和 Claude-Sonnet-4.5 平均比 GPT-5 多消耗超过 150 万 Token。Gemini-2.5-Pro 也显著高于基准线。这意味着：在 Agent 编码任务中，**模型效率（每百万 Token 能完成多少工作）比模型"强度"更重要**。一个效率更高的中等强度模型，可能比一个低效的顶级模型在总成本上表现更好——尤其是在需要大量迭代修复的场景中。

当然，这并不意味着你应该盲目追求"最便宜的模型"。效率与准确率之间存在权衡：更高效的任务可能解决率更低，导致你需要重新运行任务，反而增加了总成本。最佳策略是找到**单位解决成本的最低点**——即（Token 消耗）/（解决率）的最小值。

![模型自我预测 vs 实际消耗]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-prediction.svg)

在预测能力方面，研究者让每个模型在开始执行任务之前先预测自己的 Token 消耗量——然后与实际消耗进行对比。结果发现：**所有前沿模型都无法准确预测自身的 Token 用量，最高相关性仅为 0.39**。更关键的是，所有模型都**系统性低估**了实际消耗。

这个现象背后的原因很直观：LLM 在生成第一个 token 时，无法预知后续迭代中会出现多少次错误、需要多少轮修复。Agent 的执行路径是动态生成的——每一步的决策都会影响下一步的可能性空间，而模型在起点处只能看到一个模糊的概率分布。

从工程角度看，这意味着：**你不能依赖模型自身的 Token 预测来做预算规划**。你需要建立独立的成本估算系统——基于历史数据、任务特征和模型效率基准来预测消耗量。

## 人类直觉的盲区：难度评估与 Token 消耗的脱节

论文还做了一个有趣的交叉分析：**人类专家对任务难度的主观评分与实际 Token 消耗之间的相关性**。

![人类难度 vs Token 消耗]({{ site.baseurl }}/assets/images/paradigm-radar-token-consumption-difficulty.svg)

结果令人意外：两者之间只有**弱相关**。一些被人类标记为"简单"的任务，Agent 可能消耗大量 Token 才能解决；而一些标记为"困难"的任务，Agent 反而高效地完成了。

这个发现有两层含义：

第一，**人类对 Agent 行为模式的直觉是不可靠的**。我们基于自己的编程经验来判断任务难度，但 Agent 的工作方式与人类完全不同——它可能在一个简单问题上反复尝试错误的修复方案，也可能在复杂问题上通过一次正确的工具调用就解决问题。

第二，**Token 消耗不能作为任务难度的代理指标**。你不能简单地用"这个任务花了多少 Token"来推断它的复杂度——因为消耗量更多反映的是 Agent 的执行效率，而非任务的固有难度。

## 反方观点与工程策略

在讨论任何技术经济问题时，都必须考虑一个常见的反驳论点：**随着模型价格持续下降，Token 消耗的绝对值还会那么重要吗？**

这个观点有一定道理——如果每百万 Token 的价格从 10 美元降到 0.1 美元，那么 30 倍的消耗差异对总成本的影响确实会缩小。但有几个因素让这个反驳不够充分：

**第一，Agent 的规模在增长。** 当你在生产环境中同时运行数百个 Agent 实例时，即使每个实例的成本很低，总量也可能非常可观。

**第二，Token 效率与资源利用是相关的。** 高 Token 消耗不仅意味着更高的 API 费用，还意味着更长的执行时间和更多的 GPU 资源占用。这些隐性成本不会因为单价下降而消失。

**第三，竞争压力会推动效率优化。** 如果你的 Agent 系统比竞争对手的效率高 30%，你不仅能节省成本，还能提供更快的响应速度——这是一个双重竞争优势。

基于论文发现的研究结果和工程实践，以下是几个可以直接应用的成本优化策略：

**策略一：上下文窗口管理。** 在每轮迭代中，不发送完整的对话历史，而是提取关键信息摘要。具体来说，保留最近的 N 轮对话（N 通常取 3-5），对更早的历史进行压缩或丢弃。

**策略二：工具定义优化。** 系统提示中的工具定义是固定成本的一部分——每次调用都必须携带。通过精简工具描述、使用更紧凑的格式（如 JSON Schema 而非自然语言），可以在不损失功能的前提下减少初始输入 Token。

**策略三：模型路由策略。** 根据任务复杂度动态选择模型——简单任务用轻量级高效模型，复杂任务才调用顶级模型。研究表明人类直觉不可靠，所以更好的方案是基于历史数据训练一个轻量级的成本预测模型。

**策略四：预算硬限制。** 在 Agent 框架中设置 Token 消耗上限——当达到阈值时自动终止当前执行并返回最佳结果。这防止了"高消耗低准确率"区域的无限循环。

```python
# 最小化示例：Token 预算硬限制
class BudgetGuard:
    def __init__(self, max_tokens=2_000_000):
        self.max_tokens = max_tokens
        self.used_tokens = 0
    
    def check(self, new_tokens):
        if self.used_tokens + new_tokens > self.max_tokens:
            return False  # 触发终止
        self.used_tokens += new_tokens
        return True

# 在 Agent 循环中使用
guard = BudgetGuard(max_tokens=2_000_000)
for step in agent_loop():
    if not guard.check(step.token_count):
        print("预算耗尽，返回最佳结果")
        break
```

## 总结与行动清单

这篇论文揭示了一个被严重低估的工程现实：Agent 编码任务的 Token 消耗模式与传统 LLM 推理完全不同——它由输入 Token 驱动、具有高度内在变异性、且无法被模型自身准确预测。理解这些发现是优化 Agent 系统成本的第一步。

**你现在可以做的：**

1. 在你的 Agent 系统中引入 Token 预算硬限制，防止高消耗低准确率区域的无限循环
2. 分析现有 Agent 执行的 Token 分布——区分输入和输出 Token 的比例，找到最大的优化空间
3. 评估不同模型在相同任务上的效率差异（Token/解决率），选择单位成本最优的模型组合
4. 实现上下文窗口管理器，在每轮迭代中压缩或丢弃不必要的历史对话

**未来雷达观察点：**

- **推理压缩技术的成熟度。** 如果蒸馏、量化和稀疏化等技术能够将模型的有效上下文窗口缩小而不损失性能，那么输入 Token 的绝对量可能会大幅下降。这将改变整个 Agent 经济学的成本结构——从"输入驱动"转向更平衡的模式。
- **Agent 执行路径的可预测性。** 当前模型无法准确预测自身 Token 用量的根本原因是执行路径的不确定性。如果未来的架构能够通过规划阶段生成更可预测的执行路径，那么预算规划和成本控制将变得更加可靠。这与 #67 APB 中讨论的 Agent 规划能力评估方向直接相关——更好的规划意味着更少的无效迭代和更低的 Token 消耗。

## References

- [How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks (arXiv:2604.22750)][paper1-url]
- [SWE-bench Verified 基准测试说明][links-swebench]
- [AgentDoG 1.5: Agent 安全诊断护栏框架（第 68 篇范式雷达）][links-agentdog]
- [APB: Agent 规划能力评估基准（第 67 篇范式雷达）][links-apb]
- [LLM Token Economics: A Survey of Cost Optimization Techniques][links-token-survey]


[paper1-url]: https://arxiv.org/abs/2604.22750
[links-swebench]: https://github.com/swe-bench/SWE-bench
[links-agentdog]: /paradigm-radar-agentdog-safety-guardrail/
[links-apb]: /paradigm-radar-apb-agent-planning-benchmark/
[links-token-survey]: https://arxiv.org/abs/2401.05560
