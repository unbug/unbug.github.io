---
layout: post
title:  "一分钟读论文：《AutoResearchBench：评估AI智能体在科学文献发现中的能力》"
author: unbug
categories: [AI, Research]
image: assets/images/2026-05-06-autoresearchbench.svg
tags: [AutoResearchBench, AI-Agent, Scientific-Literature, Benchmark]
---

北京大学的论文[《AutoResearchBench: Benchmarking AI Agents on Complex Scientific Literature Discovery》][paper1-url]，首次系统性地定义了AI智能体在科学文献发现任务上的评估框架，提出Deep Research和Wide Research两种任务范式，并对主流Agent框架在真实科学文献库上的表现进行了全面评测。

## Deep Research 与 Wide Research 两种任务范式

AutoResearchBench的核心贡献在于将科学文献发现任务分解为两种可量化评估的范式。

**Deep Research（深度研究）**要求智能体从初始查询出发，通过多跳推理追踪线索，最终定位到单篇目标论文。这个过程模拟了研究人员在文献检索中的深度探索行为：从关键词出发，追踪引用关系，逐步缩小范围，最终锁定目标。每个查询都对应一篇唯一的黄金目标论文，评估指标包括是否找到目标论文以及搜索路径的跳数。

**Wide Research（广度研究）**要求智能体收集一组与查询相关的研究文献。与Deep Research不同，Wide Research不要求定位单篇特定论文，而是要求智能体在给定时间或搜索预算内，尽可能全面地覆盖相关研究。评估指标包括召回率和查准率，即智能体收集到的文献中有多少是真正相关的。

这两种任务范式的区分具有实际意义。Deep Research对应研究中的精准定位需求，Wide Research对应文献综述中的广度覆盖需求。两者共同构成了科学文献发现的完整能力谱系。

## 实验结果的主要发现

论文在真实科学文献库上评测了多种主流Agent框架，主要发现包括：

**不同Agent在两种任务上表现差异显著。** Deep Research任务中，具备强多跳推理能力的Agent表现更好，而Wide Research任务中，具备高效搜索策略的Agent表现更优。这说明文献发现能力并非单一维度，不同Agent在不同任务上各有优势。

**搜索策略对Wide Research的影响远大于Deep Research。** 在Wide Research任务中，搜索策略的优化可以带来显著的召回率提升，而在Deep Research任务中，搜索策略的影响相对较小，多跳推理能力成为更关键的因素。

**现有Agent在复杂文献发现任务上仍有较大提升空间。** 即使是表现最好的Agent，在Deep Research任务上的成功率也未达到理想水平，Wide Research任务的查准率也有明显提升空间。这表明科学文献发现是一个尚未被充分解决的问题。

## 与自主科学发现系统的关联

AutoResearchBench的提出与Qiushi等自主科学发现系统的发展形成互补。Qiushi关注如何将AI用于科学发现的实践，AutoResearchBench则关注如何评估AI在科学文献发现中的能力。两者共同指向一个核心问题：AI智能体在科研流程中的角色定位和能力边界。

AutoResearchBench为评估AI智能体的文献发现能力提供了标准化的基准，这将有助于推动相关系统的持续改进。随着AI Agent在科研领域的应用不断深化，类似的评估框架将变得愈发重要。

## References

- [AutoResearchBench GitHub仓库][links-1]
- [Qiushi: AI for Science 启士发现引擎（第42篇）][links-2]


[paper1-url]: https://arxiv.org/abs/2604.25256
[links-1]: https://github.com/autoresearchbench/autoresearchbench
[links-2]: https://micropaper.com/2026-05-06-qiushi-ai-for-science/
