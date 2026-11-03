---
layout: post
title: 一分钟读论文：《专家级学术问题基准 HLE》
author: unbug
categories: [AI]
image: assets/images/humanitys-last-exam.svg
tags: [AI, Benchmark, Evaluation]
description: "发表于 Nature 的 HLE 基准由近千名专家出 2500 道跨学科难题，当前 AI 表现极差，暴露深度专业理解的局限，为评估 AI 能力提供共同参照。"
---

非营利机构 ARC-AGI 等机构联合发布的论文[《A benchmark of expert-level academic questions to assess AI capabilities》][paper1-url]（发表于 Nature，卷 649，页码 1139-1146）介绍了 **Humanity's Last Exam**（HLE）：由近 `1,000` 名全球各领域专家共同出的 `2,500` 道专家级题目，当前最强 AI 系统在其上表现极差，暴露出深度专业理解上的局限。

当 MMLU 等传统基准准确率纷纷突破 `90%`，"为人类设计的考试"已无法测量 AI 的能力边界。HLE 的目标就是做一个短期内考不倒模型的测试。

## 基准的构建方式
HLE 的三道防线保证题目难度与防记忆能力：

- **专家出题**：近 `1,000` 名出题人不是只有计算机科学家，还涵盖历史学家、物理学家、语言学家、医学研究者等，题目覆盖数学、人文、自然科学、古代语言等数十个学科
- **唯一短答案**：每道题有唯一、明确、不可辩论的简短答案，避免评分歧义，也让题目无法靠冗长套话蒙混
- **题库保密**：部分题目公开用于社区测试，大部分题目隐藏进私有测试集，防止模型训练数据记忆题目，保证基准长期有效

## 当前 AI 的表现
结果非常明确：论文发表时，即便是最强的前沿模型，HLE 准确率也处于极低水平，与在 MMLU 上的高分形成鲜明对比。这说明现有基准的高准确率相当一部分来自数据熟悉度和模式匹配，而非真正的专家级推理。研究人员同时预测，按 AI 的迭代速度，模型可能在 2025 年底前在 HLE 上突破 `50%`——基准本身也被设计成记录能力演进的时间戳。

低分集中在需要跨领域知识组合与精确短答案的题目上：模型能写出流畅的长篇分析，却在要求唯一答案的题目上给出近似但错误的结果。HLE 因此测的是知识的精度与深度，而非语言的流畅度，这也是它与以选择题为主的 MMLU 系列在方法论上的核心差异。

隐藏题集的另一个作用是抑制刷分行为：公开子集可以被针对性微调，私有子集不能，因此 HLE 报告的差距更接近真实能力而非工程调优的结果。## 超越基准的意义
HLE 的价值超出一个排行榜。它把 AI 评估从"为人类设计的考试"推向"真正测试专家级理解的基准"；近千名跨学科专家的协作本身展示了人类集体智慧的组织方式；对科学界和政策制定者，它提供了一个评估 AI 能力的共同参照点。

尽管名字带有末日意味，HLE 的立项动机是对人类专业知识独特性的重申——每一道答不出的题，都精确标出了当前机器与专家之间还存在的鸿沟，也为后续研究给出了具体的攻关清单。出题过程本身也沉淀了一份跨学科专家名录，为后续基准更新和同行评审提供了可动员的网络。

![Humanity's Last Exam 基准构成与模型表现示意图]({{ site.baseurl }}/assets/images/humanitys-last-exam.svg)

延伸阅读：AI 能力边界的另一面讨论见[《AI 能力平台期》][rel1]。

## References
- [A benchmark of expert-level academic questions to assess AI capabilities][paper1-url]
- [HLE 项目网站][links-1]
- [arXiv:2501.14249][links-2]


[paper1-url]: https://www.nature.com/articles/s41586-025-09962-4
[links-1]: https://lastexam.ai/
[links-2]: https://arxiv.org/abs/2501.14249
[rel1]: {{ site.baseurl }}/ai-capabilities-plateau-paper/
