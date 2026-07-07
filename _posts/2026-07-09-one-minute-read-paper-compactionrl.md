---
title: 一分钟读论文：《CompactionRL——将上下文压缩引入强化学习》
tags: [rl, context-compaction, agent, long-horizon]
layout: post
---

# 一分钟读论文：《CompactionRL——将上下文压缩引入强化学习》

本文讨论的论文是 CompactionRL: Reinforcement Learning with Context Compaction for Long-Horizon Agents，arXiv:2607.05378，由清华大学（Tsinghua University）的 Yujiang Li、Zhenyu Hou、Yi Jing、Jie Tang 和 Yuxiao Dong 五位研究者完成。论文链接：[arXiv:2607.05378](https://arxiv.org/abs/2607.05378)

长程Agent面临一个日益严峻的瓶颈：随着任务复杂度上升，Agent需要维护的上下文长度呈线性甚至超线性增长，而现有模型的上下文窗口始终有限。当对话历史超出窗口容量时，关键信息被截断或遗忘，导致Agent在需要多步推理和长期记忆的任务中性能急剧下降。CompactionRL的核心洞察是：与其被动等待模型支持更大的上下文窗口，不如主动将压缩机制融入强化学习训练框架，让Agent学会在有限资源下自主管理信息密度。这一思路与人类认知中的注意力分配机制高度相似——我们并非记住每一句话的每个字，而是有选择地保留关键信息、遗忘冗余细节。

## 压缩与强化学习的联合优化

CompactionRL的创新之处在于它没有将上下文压缩视为后处理步骤，而是将其作为RL训练的一等公民。传统方法通常先执行任务、再对历史进行摘要压缩，这种两阶段设计导致压缩策略与任务目标脱节——Agent不知道哪些信息对未来决策真正重要。

CompactionRL通过token-level loss normalization和cross-trajectory GAE（广义优势估计）实现了任务执行损失与摘要生成损失的联合优化。具体而言，模型在每一步同时输出动作和对应的上下文压缩指令，两个任务的梯度通过归一化后的loss进行加权融合。cross-trajectory GAE则确保不同轨迹之间的优势信号保持一致性，避免压缩策略在不同场景下出现剧烈波动。这种设计使得Agent能够端到端地学习何时保留、何时丢弃、如何摘要的信息管理策略。与传统RLHF仅优化最终奖励信号不同，CompactionRL在中间步骤引入了细粒度的压缩质量信号，使训练过程更加稳定且可解释。

## 实验结果与生产部署

CompactionRL在多个基准上验证了其有效性。GLM-4.5-Air模型在SWE-bench Verified上的性能提升了7.0个百分点，达到66.8%；在Terminal-Bench 2.0上也获得了3.1点的提升。更值得注意的是，当应用于更大规模的GLM-5.2模型（750B参数、MoE架构含40B激活）时，同样观察到了约5.5点的性能增益。这些结果表明压缩机制在不同规模模型上均具有泛化能力，且性能增益与模型规模呈正相关——更大的模型从上下文压缩中获得的收益更为显著，这可能是因为大模型本身具备更强的信息理解和摘要能力。

CompactionRL的工程意义不仅在于实验数据，更在于它已经部署至生产级RL训练管线中，用于实际训练GLM-5.2模型。这意味着上下文压缩不再是一个研究原型，而是经过大规模训练验证的成熟技术组件。对于工业界而言，这提供了一个可复用的范式：在有限的计算和存储资源下，通过让Agent主动管理上下文信息来突破长程任务的性能天花板。CompactionRL的部署经验表明，将压缩机制作为RL训练的原生组件而非外挂模块，能够显著降低工程复杂度并提升整体系统的可扩展性。

## References

- CompactionRL: Reinforcement Learning with Context Compaction for Long-Horizon Agents, arXiv:2607.05378, https://arxiv.org/abs/2607.05378
- SWE-bench Verified benchmark, https://www.swebench.com/
- Terminal-Bench 2.0 benchmark, https://github.com/unit-mesh/terminal-bench
