---
layout: post
title: "一分钟读论文：《AI如何从感官体验形成概念》"
author: unbug
categories: [AI, Neuroscience]
image: assets/images/2026-03-03-cats-net.svg
tags: [ai, neuroscience, concept-formation, neural-networks, symbolic-thinking]
description: "发表在 Nature Computational Science 的 CATS Net 用双模块神经网络模拟人类从感官运动经验中压缩出抽象概念的过程，其激活模式与人脑 fMRI 数据高度相关，两个智能体还能绕开人类语言直接交流概念。"
---

发表于 Nature Computational Science 的论文[《A neural network for modeling human concept formation, understanding and communication》][paper1-url]提出 CATS Net——一个双模块神经网络，首次模拟人类从感官体验中形成抽象概念的过程，其激活模式与人脑 fMRI 数据中的概念处理模式高度一致。

## 概念形成为什么是难点

概念形成（concept formation）指从具体经验中抽象出通用概念的能力：人能把不同品种、不同颜色的动物都认作"猫"，也能从具体事件中提炼出"正义""自由"这类抽象概念。现有 AI 系统在这两端是割裂的——要么擅长处理感官数据（如图像识别），要么擅长处理符号逻辑（如推理），很难像人类一样把两者连接起来。让机器复现"从感知到概念"的通路，因此长期是认知科学与 AI 交叉地带的难题。

![CATS Net 双模块架构与主要发现](assets/images/2026-03-03-cats-net.svg)

## 双模块的工作方式

CATS Net（Conceptual Abstraction from Sensory-motor experiences，从感官运动经验中抽象概念）由两个核心模块组成。模块一是**感官-运动编码器**（Sensory-Motor Encoder），处理具体的感官输入和运动经验，功能上对应人的视觉、听觉、触觉系统。模块二是**概念压缩器**（Concept Compressor），把感官经验压缩成抽象的概念表示，对应人脑形成概念的过程。整个过程可以类比儿童学习"球"的三阶段：先看到不同颜色、大小的球并触摸滚动（感官体验），再把具体经验压缩成一个抽象的"球"概念（抽象压缩），最后用这个概念识别新球、讨论球（理解运用）。

## 三项主要发现

论文的结果覆盖三个层面：

- **与人类大脑活动对齐**：CATS Net 的激活模式与人类 fMRI 数据中观察到的概念处理模式高度相关，表明模型学到的是与人脑相近的概念组织方式，而非单纯拟合任务输出
- **AI 之间的概念交流**：两个 CATS Net 智能体可以不用人类语言，直接在概念层面交换信息并相互理解，相当于绕开自然语言的"概念对话"
- **知识迁移**：学到的概念可以迁移到新的任务上，说明概念表示是可复用的中间结构，而非绑定单一任务的记忆

作者团队包括 Liangxuan Guo、Haoyang Chen、Shan Yu 等研究者，实验在 Nature Computational Science 的同行评审下完成。论文以定性方式报告了上述发现，强调机制对齐而非单一准确率指标。

## 这项工作的位置

在认知科学一侧，CATS Net 是首个用计算模型系统验证人类概念形成理论的工作，为理解人脑如何从感知通往抽象思维提供了可检验的模型。在 AI 一侧，它指向一条从"模式匹配"走向"概念理解"的路径：如果概念表示能被网络自发压缩出来，下游的推理与交流就可能建立在与人同构的概念之上，人机交互也因此多了一种对齐基础。同类话题可参阅站内[《从大脑活动重建视频的 SemVideo》]({{ site.baseurl }}/semvideo-brain-reading-video/)——那项工作从相反方向切入脑与模型的接口：把 fMRI 信号还原为画面，CATS Net 则把人脑的概念组织方式装进网络。

## References
- [A neural network for modeling human concept formation, understanding and communication][paper1-url]
- [Nature Computational Science 2026 年文章列表][links-1]


[paper1-url]: https://www.nature.com/articles/s43588-026-00968-0
[links-1]: https://www.nature.com/natcomputsci/articles?year=2026
