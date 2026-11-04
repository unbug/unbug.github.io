---
layout: post
title:  "一分钟读论文：《让 AI 拥有真正的长期记忆》"
author: unbug
categories: [AI, Machine Learning]
image: assets/images/titans-miras-google-ai-long-term-memory.svg
tags: [Google, Titans, MIRAS, Memory, Transformer, Sequence Modeling]
description: "Google Research 提出 Titans 架构与 MIRAS 设计框架，用推理时实时更新的神经长期记忆替代纯注意力机制，在 BABILong 等长上下文基准上超越 GPT-4 等众多基线模型，可扩展到超过 200 万 token 的上下文窗口。"
---

![Titans + MIRAS 架构示意图](assets/images/titans-miras-google-ai-long-term-memory.svg)

Google Research 的论文[《Titans: Learning to Memorize at Test Time》][ref1]与配套框架论文[《MIRAS》][ref2]给出组合方案：Titans 架构 + MIRAS 设计框架，把 RNN 的效率与 Transformer 的准确度结合，让模型在推理时实时更新核心记忆，处理数百万 token 的超长上下文。

Transformer 的软肋在于计算成本随序列长度呈二次方增长，读完整本书或整条基因组的算力代价过高。Titans 的思路是借鉴人脑的短期/长期记忆分工，把记忆从注意力里独立出来。

## Titans：推理时更新的神经长期记忆

Titans 采用三层记忆：短期记忆是标准 Transformer 注意力，高精度捕捉即时上下文；神经长期记忆是一个多层感知机模块，在推理时实时更新参数；持久记忆是固定的学习参数，存放训练阶段获得的知识。

核心机制是`惊喜度量`（surprise metric）：模型用内部误差信号（梯度）衡量当前记忆与新输入的差距。差距小就跳过不记，差距大——比如严肃财务报告里突然出现的无关信息——才优先写入长期记忆，实现选择性更新。配套还有两个机制：`动量`同时考虑瞬时惊喜与过去惊喜，让相关后续信息不被漏掉；`遗忘`用自适应权重衰减当遗忘门，在有限记忆容量下淘汰旧信息。

## MIRAS：序列建模的统一框架

MIRAS 框架的核心洞察是：从 Transformer 到线性 RNN，各种序列建模突破本质上都是`联想记忆`模块。它把序列模型拆解为四个设计选择：记忆架构（存信息的结构）、注意力偏差（内部学习目标，决定优先记什么）、保留门（记忆正则化器，平衡新学习与旧知识保留）、记忆算法（更新记忆的优化算法）。

现有序列模型几乎都靠均方误差或点积相似度实现偏差与保留，对异常值敏感且限制表达能力。MIRAS 跳出这个框框，从优化与统计学文献引入非欧几里得目标和正则化，生成三个无注意力模型：YAAD 用 Huber 损失对单个拼写错误这类异常值不敏感；MONETA 用广义范数惩罚研究更稳定的长期记忆；MEMORA 强制记忆状态像严格的概率图，确保每次更新受控且平衡。站内另一篇[《嵌套学习破解 AI 遗忘难题》]({{ site.baseurl }}/nested-learning-google-ai/)从后续范式角度解读了同一团队的工作。

## 实验结果与应用

在标准语言建模数据集（C4、WikiText）和零样本推理任务（HellaSwag、PIQA）上，Titans 的准确度和困惑度对比 Transformer++、Mamba-2、Gated DeltaNet 等基线全程领跑。消融研究显示记忆架构的深度关键：同规模下更深的长期记忆模块困惑度始终更低，且序列长度大幅增加时性能稳定。

超长上下文召回是最突出的优势。在 BABILong 基准——需要在极长文档里分散的事实之间做推理——上，Titans 超过包括 GPT-4 在内的所有基线，参数更少但效果更强，并展示了对超过 `200 万 token` 上下文窗口的扩展能力。应用上，团队列出的方向包括直接处理完整 DNA 序列的基因组建模、金融市场与天气的时间序列预测、法律合同等超长文档理解，以及代码理解与数学证明等多步骤推理。

## References
- [Titans 论文][ref1]
- [MIRAS 论文][ref2]
- [Google Research 博客][ref3]


[ref1]: https://arxiv.org/abs/2501.00663
[ref2]: https://arxiv.org/pdf/2504.13173
[ref3]: https://research.google/blog/titans-miras-helping-ai-have-long-term-memory/
