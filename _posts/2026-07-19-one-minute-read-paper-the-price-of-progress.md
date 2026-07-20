---
layout: post
title:  "一分钟读论文：《智能每美元的经济学》"
author: unbug
categories: [AI, LLM-Economics]
image: assets/images/price-performance-trend.svg
tags: [llm-economics, agent-training, post-training, intelligence-per-dollar, nvidia]
---

Epoch AI 与 Artificial Analysis 合作发表的论文[《The Price of Progress: Price Performance and the Future of AI》][paper1-url]，构建了迄今为止最大规模的 LLM 推理价格数据集，量化了每美元智能的年度变化趋势。核心发现揭示了一个深刻的悖论：前沿模型在知识、推理、数学和软件工程基准上的单位性能成本每年下降 5x 至 10x，但前沿模型的实际运行成本因更大规模和更长推理需求反而上升 3x 至 18x 每年。

## 算法效率与规模扩张的矛盾张力

论文的核心贡献在于将"智能"与"价格"统一到一个可量化的框架中。研究团队收集了从 2023 年至 2026 年初超过 500 个 LLM API 的价格数据，覆盖 OpenAI、Anthropic、Google、Meta 等主流提供商的数百个模型变体。

关键指标是**每美元智能（intelligence per dollar）**——即单位货币能够购买到的模型性能。该指标通过知识检索、逻辑推理、数学解题和软件工程四个基准测试来衡量，每个基准得分与对应 API 调用成本相除得到统一度量。

数据呈现出一条清晰的长期趋势线：每美元智能每年增长约 5x 至 10x。这意味着算法效率的提升速度远超预期——如果这一趋势持续，两年内同等性能的成本将降至当前的百分之一以下。

## NVIDIA 的指标与 WAIC 的背景

NVIDIA CEO Jensen Huang 在 GTC 2025 上提出了"intelligence per dollar"作为衡量 AI 进展的核心指标，而这篇论文为其提供了坚实的实证基础。2026 年 7 月 18 日，NVIDIA 在世界人工智能大会（WAIC）期间进一步发布了该指标的年度更新报告。

这一背景解释了为什么"智能每美元"正在从学术讨论走向产业共识。当算法效率每年提升约 3x 时，NVIDIA 的指标试图回答一个关键问题：在芯片算力持续增长的背景下，AI 系统的实际经济价值究竟如何变化？

## Agent 后训练的经济启示

论文同时揭示了一个被忽视的维度：**前沿模型的实际运行成本仍在上升**。这一看似矛盾的现象源于两个因素：一是前沿模型的规模持续扩大，二是推理链长度不断增加。虽然单位性能的成本在下降，但为了达到更高的绝对性能水平，开发者需要调用更大、更复杂的模型，导致总支出不降反升。

对于 Agent 后训练领域而言，当每美元智能以每年 5x-10x 的速度增长时，在基础模型之上进行微调或强化学习的投资回报率正在快速提升。PostTrainBench（arXiv:2603.08640）提出的工具链评估框架和 ProRL Agent（arXiv:2603.18815）的推理优化方法，正是针对这一经济环境的工程回应——它们试图在算法效率红利与规模扩张成本之间找到最优平衡点。

论文的最终结论是：我们正处于一个**算法效率与规模扩张并行加速**的时代，理解这一双重趋势对制定 AI 基础设施的投资决策至关重要。

## References

- [The Price of Progress: Price Performance and the Future of AI][paper1-url] (arXiv:2511.23455, v2, Mar 2026)
- Hans Gundlach et al., Epoch AI / Artificial Analysis
- PostTrainBench: A Toolchain for Evaluating Post-Training Methods (arXiv:2603.08640)
- ProRL Agent: Reasoning Optimization via Process Reward Models (arXiv:2603.18815)


[paper1-url]: https://arxiv.org/abs/2511.23455
