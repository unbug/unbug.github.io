---
layout: post
title:  "一分钟读论文：《给大模型注意力装一个阀门》"
author: unbug
categories: [AI, Machine Learning]
image: assets/images/gated-attention-hero.svg
tags: [NeurIPS 2025, Gated Attention, LLM, Qwen]
description: "阿里巴巴 Qwen 团队的 NeurIPS 2025 最佳论文在注意力输出后加头级 sigmoid 门控，额外开销不到 2% 延迟，换来训练稳定、基本消除注意力汇聚，RULER 长上下文外推提升超 10 个点，已集成到 Qwen3-Next。"
---

阿里巴巴 Qwen 团队的论文[《Gated Attention for Large Language Models》][paper1-url]获 NeurIPS 2025 最佳论文奖：在注意力输出后加一个门控，额外开销不到 `2%` 延迟，却消除注意力汇聚、提升长上下文能力。

为什么这个简单改进能获奖？因为它同时解决了 LLM 最头疼的几个问题：训练不稳定、注意力汇聚（attention sink，模型过度关注起始符等特殊 token 的现象）、长上下文表现差——RULER 基准上外推能力提升超过 `10` 个点，方法已集成到 Qwen3-Next 并在生产环境使用。

## 注意力机制的三个痛点

标准注意力机制有三个问题。**训练不稳定**：损失值经常在训练中途突然飙升，轻则中断重训、重则整个批次配置报废，而大模型训练一次的成本极高，稳定性本身就是工程命门。**长上下文表现差**：上下文变长后模型表现急剧下降，检索远处信息的能力明显退化，这限制了实际业务里最值钱的长文档场景。**缺乏非线性**：标准注意力的加权求和本质上是线性操作，头与头之间还容易趋同，表达能力受限。三个问题在文献里长期被分开处理——有人调优化器、有人改位置编码、有人加正则。过去的方法多是头痛医头，Qwen 团队则从注意力输出本身出发重新设计，用同一个机制同时压住三个病灶。

## 给注意力输出加智能阀门

Gated Attention 的做法分四步：先正常计算缩放点积注意力（SDPA）；用当前 token 的 Query 表示计算一个 sigmoid 门控值；将注意力输出乘以门控值，选择性放大或抑制；每个注意力头保持独立门控，维护头的多样性。门控基于 Query 计算是关键设计：Query 表达的是当前 token 在找什么，用它来当阀门，等于让模型根据"我要找什么"决定"这次注意力结果值多少"，无关信息在离开注意力层时就被就地压掉，而不是留到前馈层再补救。通过对比 `30` 多种变体，团队找到最佳配置：门控放在 SDPA 输出后、头级粒度、乘法门控、Sigmoid 激活（优于 SiLU）。

## 多重收益与工业价值

这个简单修改带来多重收益：基准性能提升；训练稳定性大幅改善，损失尖刺显著减少，团队因此可以使用更大的学习率和 batch size 加速训练；长上下文表现更好，在超出训练长度的外推区间优势更明显；注意力汇聚被基本消除——以往要靠窗口裁剪等事后补救，现在从机制设计上不再产生。值得注意的是这些收益并非以复杂度换来：门控只是输出端的一次逐元素乘法，工程落地成本极低。对比 `30` 多种变体、训练 15B MoE 和 1.7B 稠密模型的实验规模，需要大规模计算资源，是工业界研究的典型；团队选择公开这些发现，NeurIPS 评选委员会也称赞了这种开放分享。改进本身轻量、即插即用，现有 Transformer 模型只需加几行代码即可升级，推理延迟几乎不受影响。同类话题可参阅站内[《一分钟读论文：Google 嵌套学习破解 AI 遗忘难题》]({% post_url 2026-02-28-nested-learning-google-ai %})。

## References
- [Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free][paper1-url]
- [arXiv:2505.06708][links-1]


[paper1-url]: https://arxiv.org/abs/2505.06708
[links-1]: https://arxiv.org/abs/2505.06708
