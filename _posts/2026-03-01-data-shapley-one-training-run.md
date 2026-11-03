---
layout: post
title:  "一分钟读论文：《一次训练算清数据价值》"
author: unbug
categories: [AI]
image: assets/images/2026-03-01-data-shapley.svg
tags: [AI, Machine Learning, Data Shapley, ICLR 2025]
description: "普林斯顿大学等机构提出 In-Run Data Shapley 方法，在单次训练过程中即可算清每个训练数据点对最终模型的贡献值，几乎不增加额外计算开销，并在 AI 版权归因与预训练数据清洗上给出可操作结论。"
---

![Data Shapley in One Training Run]({{ site.baseurl }}/assets/images/2026-03-01-data-shapley.svg)

Princeton University 等机构的论文[《Data Shapley in One Training Run》][paper1-url]（ICLR 2025 杰出论文亚军）提出 In-Run Data Shapley，在单次训练中算清每个数据点的贡献，几乎不增加开销，为 AI 版权与数据治理提供量化工具。

该方法首次把数据归因扩展到基础模型预训练阶段，使原本停留在博弈论层面的 Shapley 值变得工程可行。

## 从指数级重训到单次训练

Data Shapley 基于合作博弈论中的 Shapley 值概念衡量每个数据点的贡献，在版权纠纷（基础模型从互联网抓取数据训练，需要回答谁的数据贡献了多少）、数据质量（识别低质量和有害数据）与资源浪费等场景中至关重要。但传统方法需要在不同数据子集上重新训练模型，对 n 个数据点要考虑 `2ⁿ 个子集`，完全无法应用于大规模模型。

In-Run Data Shapley 的核心思想是不再重新训练，而是利用模型训练的迭代性质，在单次训练过程中实时追踪每个数据点的影响：通过一阶和二阶泰勒展开近似模型性能变化，并借助 "Ghost dot-product" 与 "Ghost gradient-Hessian-gradient product" 技术高效计算这些量，最高效实现下仅带来可忽略的额外训练开销，可针对特定训练运行评估数据贡献。

## 三组实验的发现

在"贡献是否需要记忆"实验中，研究者从训练集选出一个语料库，用 GPT-4 生成多个释义版本，计算原始训练语料库对每个释义版本的平均价值排名。结果显示，即使输出不需要与输入高度相似，训练数据仍然对生成内容有贡献——这意味着即使输出与版权材料看起来不相似，训练数据所有者也应持有相应的版权份额，对 AI 版权讨论具有直接意义。

在数据价值动态实验中，训练初期价值构成变化迅速、随后趋稳，后期反映 ArXiv 数学内容的相对丰度；包含通用网页抓取的 Pile-CC 域最初显示正贡献，很快降至负值并收敛到零，说明通用语料在早期对学习基本语言模式和常识重要，随训练转向专业主题其相关性下降。

在数据清洗实验中，约 `16%` 的训练语料具有负的二阶 In-Run Data Shapley 值；过滤全部负值语料后重新训练 GPT-2，达到 3.75 测试损失所需的训练迭代次数减少约 `25%`。这表明即使是 Pile 这样精心策划的公共语料库，在数据治理上仍有明显改进空间。

## 应用方向

该方法的落点集中在三个方向：AI 版权领域可量化评估版权内容对模型的贡献，为数据创作者获得公平报酬提供技术基础；数据治理领域可识别并移除低质量、有害数据，提升训练效率与质量；模型训练优化领域可识别最有价值的训练示例，并帮助理解 AI 能力的来源。作为首个可扩展到基础模型预训练阶段的数据归因方法，它把原本停留在理论层面的 Shapley 值变成了大规模训练中可以实际运行的工具；训练效率的另一条优化路线可对照站内[《DeepSeek Engram 分离知识存储》]({{ site.baseurl }}/deepseek-engram/)阅读。

## References
- [Data Shapley in One Training Run][paper1-url]
- [项目主页][links-1]


[paper1-url]: https://arxiv.org/abs/2406.11011
[links-1]: https://jiachen-t-wang.github.io/data-shapley.github.io/
