---
layout: post
title: "一分钟读论文：《嵌套学习：深度学习架构的错觉》"
author: unbug
categories: [AI, Machine Learning]
image: assets/images/2026-03-01-nested-learning-google-ai-breakthrough.svg
tags: [nested-learning, google-research, neurips-2025]
description: "Google Research 在 NeurIPS 2025 提出嵌套学习范式，把模型架构与优化算法统一为多层次嵌套优化问题，各层按不同频率更新，概念验证架构 Hope 在语言建模与长上下文任务上优于 Titans、Mamba2 等基线。"
---

![Google Nested Learning](assets/images/2026-03-01-nested-learning-google-ai-breakthrough.svg)

Google Research 发表于 NeurIPS 2025 的论文[《Nested Learning: The Illusion of Deep Learning Architectures》][ref3]提出嵌套学习范式，认为灾难性遗忘——学新任务丢旧任务——源于「模型该被一个优化器统一更新」这一假设。架构调整、优化规则改进与正则化都被证明治标不治本，架构调整、优化规则改进与正则化都被证明治标不治本，论文把矛头指向了模型更新方式本身。

## 把架构与优化看成同一个嵌套系统

嵌套学习的核心主张是：不要把模型架构和优化算法当作两个独立的东西。传统分工里，架构是网络结构，优化是训练规则；论文则把单个模型重解为一组相互连接、多层次的优化问题，同时进行优化。每个层次都有自己的上下文流（独特信息流）和更新频率（权重调整节奏），按频率排序就构成层次结构，类似大脑的多时间尺度处理：快系统适应当下，慢系统巩固长期记忆。在这套框架下，架构不再是静态的网络结构，而是一组按不同节奏演化的优化问题，训练规则本身也进入了设计空间。

论文用关联记忆来说明这一视角：反向传播本身可以建模为关联记忆——模型学会把数据点映射到局部误差值，度量其令人惊讶的程度；Transformer 的注意力机制也可形式化为简单的关联记忆模块，学习序列内令牌间的映射。这一视角直接产出两个改进方向。其一是深度优化器：标准优化器依赖简单点积相似度、更新不考虑样本间关系，把优化器底层目标换成 L2 回归这类标准损失后，动量等核心概念获得了新公式，对不完美数据更鲁棒。其二是连续记忆系统（CMS）：把 Transformer 里短期记忆（序列模型）与长期记忆（前馈网络）的二分，扩展成一系列以不同频率更新的记忆模块，让信息在多个时间尺度上分层沉淀。

## Hope 架构与实验证据

作为概念验证，团队按嵌套学习原则设计了 Hope，它是 [Titans 架构][ref1]的变体。Titans 按惊讶程度对长期记忆排序，但只有两层参数更新，止步一阶上下文学习；Hope 是自修改循环架构，可支持多层上下文学习，用 CMS 块扩展到更大上下文窗口，并能通过自引用过程优化自己的记忆。

实验上，在公共语言建模与常识推理任务中，Hope 相比现代循环模型和标准 Transformer 取得更低困惑度与更高准确率。长上下文大海捞针（NIAH）任务覆盖三个难度级别，对比对象包括 Hope、Titans、TTT 与 Mamba2，Hope 和 Titans 始终领先，且 Hope 展示了更强的记忆管理能力，支持 CMS 处理扩展信息序列更有效的判断。多频率更新的层次结构让它在长序列上不必把一切都压进有限窗口，快层处理眼前内容，慢层留住不常访问的信息。论文同时给出快慢学习系统的生物学对应，认为这为缩小当前 LLM 易遗忘的本质与人脑持续学习能力之间的差距提供了基础。站内另一篇[《嵌套学习：深度架构的错觉》]({{ site.baseurl }}/nested-learning-google-ai/)从 HOPE 与遗忘机制角度另有一篇解读。

## References
- [Titans 架构][ref1]
- [Google Research Blog: Introducing Nested Learning][ref2]
- [Nested Learning: The Illusion of Deep Learning Architectures][ref3]
- [NeurIPS 2025 OpenReview][ref4]

[ref1]: https://arxiv.org/abs/2501.00663
[ref2]: https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/
[ref3]: http://abehrouz.github.io/files/NL.pdf
[ref4]: https://openreview.net/forum?id=nbMeRvNb7A
