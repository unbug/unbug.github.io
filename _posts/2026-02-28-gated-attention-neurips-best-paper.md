---
layout: post
title:  "一分钟读论文：《给大模型注意力装一个阀门》"
author: unbug
categories: [AI, Machine Learning]
image: assets/images/gated-attention-hero.svg
tags: [NeurIPS 2025, Gated Attention, LLM, Qwen]
description: "阿里巴巴 Qwen 团队的 NeurIPS 2025 最佳论文在注意力输出后加头级门控，开销不到 2%，换来训练稳定和消除注意力汇聚，长上下文外推提升超 10 个点。"
---

![Gated Attention](assets/images/gated-attention-hero.svg)

阿里巴巴 Qwen 团队的论文[《Gated Attention for Large Language Models》][paper1-url]获 NeurIPS 2025 最佳论文奖：在注意力输出后加一个门控，额外开销不到 `2%` 延迟，却消除注意力汇聚、提升长上下文能力。

为什么这个简单改进能获奖？因为它同时解决了 LLM 最头疼的几个问题：训练不稳定、注意力汇聚（attention sink，模型过度关注起始符等特殊 token 的现象）、长上下文表现差——RULER 基准上外推能力提升超过 `10` 个点，方法已集成到 Qwen3-Next 并在生产环境使用。

## 注意力机制的三个痛点

标准注意力机制有三个问题：**训练不稳定**，损失值经常在训练中突然飙升；**长上下文表现差**，上下文变长后模型表现急剧下降；**缺乏非线性**，标准注意力计算本质上是线性的，表达能力有限。过去的方法多是头痛医头，Qwen 团队则从注意力输出本身出发重新设计。

## 给注意力输出加智能阀门

Gated Attention 的做法分四步：先正常计算缩放点积注意力（SDPA）；用当前 token 的 Query 表示计算一个 sigmoid 门控值；将注意力输出乘以门控值，选择性放大或抑制；每个注意力头保持独立门控，维护头的多样性。门控基于 Query 计算是关键——模型根据当前 token 在找什么，决定哪些注意力输出有用。通过对比 `30` 多种变体，团队找到最佳配置：门控放在 SDPA 输出后、头级粒度、乘法门控、Sigmoid 激活（优于 SiLU）。

## 多重收益与工业价值

这个简单修改带来多重收益：性能提升、训练稳定性大幅提升、可以使用更大的学习率和 batch size 加速训练、长上下文表现更好、消除注意力汇聚——从对注意力汇聚的事后补救转为从设计上解决。对比 `30` 多种变体、训练 15B MoE 和 1.7B 稠密模型的实验规模，需要大规模计算资源，是工业界研究的典型；团队选择公开这些发现，NeurIPS 评选委员会也称赞了这种开放分享。改进本身轻量、即插即用，现有 Transformer 模型只需加几行代码即可升级，推理延迟几乎不受影响。同类话题可参阅站内[《一分钟读论文：Google 嵌套学习破解 AI 遗忘难题》]({% post_url 2026-02-28-nested-learning-google-ai %})。

## References
- [Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free][paper1-url]
- [arXiv:2505.06708][links-1]


[paper1-url]: https://arxiv.org/abs/2505.06708
[links-1]: https://arxiv.org/abs/2505.06708
