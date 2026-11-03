---
layout: post
title: "一分钟读论文：《2700 万参数的小模型超越大模型》"
categories: [AI]
image: assets/images/hrm-architecture.svg
tags: [AI, Deep Learning, Architecture, Reasoning, HRM]
description: "Sapient Intelligence 发表于 NeurIPS 2025 的论文提出分层推理模型 HRM，用高层规划与低层计算两个模块在潜空间推理，替代思维链，仅 2700 万参数和 1000 个训练样本即在数独、迷宫任务上接近完美，ARC-AGI 达 40.3%，超过规模大得多的 o3-mini-high 与 Claude 3.7 Sonnet。"
---

Sapient Intelligence 发表于 NeurIPS 2025 的论文[《Hierarchical Reasoning Model》][paper1-url]（arXiv:2506.21734）提出分层推理模型 HRM，仅用 `2700 万参数`和 `1000 个训练样本`，就在需要大量搜索与回溯的推理任务上超越了思维链驱动的大语言模型。

![HRM 架构示意图](assets/images/hrm-architecture.svg)

## 思维链的困境与分层架构

大语言模型解决复杂问题主要依赖思维链（Chain-of-Thought, CoT），即让模型把问题拆成逐步文本推理。其局限有四：一步出错整条链崩溃；依赖海量训练数据；逐词生成速度慢；生成的推理文本未必反映模型真实的计算过程。

HRM 的灵感来自大脑的双系统结构——负责慢速抽象规划的部分与负责快速直觉计算的部分。模型由此分为两个模块：**高层模块（H-module）**负责抽象规划，**低层模块（L-module）**负责具体计算。两者通过"分层收敛"嵌套循环协作：L-module 先快速求出一个局部解，H-module 检视结果、调整战略并下达更精细的子任务，相当于让 L-module 重置，避免陷入单一路径。整个过程在潜空间完成推理，不需要 CoT 文本，也不依赖海量数据。

## 实验结果

在"极限数独"和"困难迷宫"等高强度搜索任务上，最先进的 CoT 模型准确率为 `0%`，HRM 用 1000 个训练样本即达到接近完美的准确率。

在抽象推理基准 ARC-AGI 上：

- HRM（27M 参数）：`40.3%`
- OpenAI o3-mini-high：34.5%
- Claude 3.7 Sonnet：21.2%

且该成绩没有大规模预训练支撑。效率方面：专业级数独训练仅需 `2 个 GPU 小时`，ARC-AGI 训练需 50-200 GPU 小时；潜空间并行处理相比 CoT 逐词生成可能带来约 `100 倍`推理提速。

 ## 适用场景与后续方向

HRM 的意义在于提供了一个"结构化架构优于单纯堆参数"的证据。其适用场景集中在三类：科学探索、专业诊断等数据稀缺领域；具身 AI、机器人等延迟敏感领域；物流优化、复杂系统诊断等需要确定性推理的任务。对企业而言，专用小型推理引擎的成本远低于调用大型 API 模型。

Sapient Intelligence 正把 HRM 从专用求解器推向通用推理模块，其脑启发模型已在医疗、气候预测和机器人领域展开应用。论文指向的更远方向是具备自我修正能力的推理系统——对当前大模型难以处理的搜索密集型问题，答案可能不是更大的模型，而是更贴近大脑的分层结构。

## References
- [Hierarchical Reasoning Model: A Brain-Inspired Architecture for Latent Reasoning][paper1-url]
- [github.com/sapientinc/HRM][links-1]
- [Sapient Intelligence][links-2]


[paper1-url]: https://arxiv.org/abs/2506.21734
[links-1]: https://github.com/sapientinc/HRM
[links-2]: https://www.sapient.inc/
