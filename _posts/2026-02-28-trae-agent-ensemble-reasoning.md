---
layout: post
title:  "一分钟读论文：《多代理集成推理攻克仓库级问题》"
author: unbug
categories: [AI, Engineering]
tags: [Code Generation, ICSE 2026, Agent]
description: "字节跳动 Trae 团队等机构的论文提出首个基于代理的集成推理框架 Trae Agent，用生成、修剪、选择三个代理探索仓库级补丁空间，在 SWE-bench Verified 上取得 78.80% 的 Pass@1，较基线平均提升 10.22%，性能随集成规模单调提升可按预算权衡成本。"
---

字节跳动 Trae 研究团队与天津大学等机构合作的论文[《Agent-Based Ensemble Reasoning for Repository-Level Issue Resolution》][paper1-url]（ICSE 2026）提出首个基于代理的集成推理框架 Trae Agent，用生成、修剪、选择三个代理协作探索巨大的候选补丁空间，在 SWE-bench Verified 上取得 `Pass@1 = 78.80%`，相比基线平均提升 `10.22%`。

## 仓库级问题集成的两大瓶颈

软件 Issue 解决的难点在于：候选补丁空间巨大，且修复往往需要跨文件理解整个仓库的上下文——一个 Bug 的根因可能在另一个模块，修复方案可能牵动多个文件的接口。现有基于提示工程的集成推理方法（即让多个模型或多个采样结果投票选优）存在两个瓶颈——**难以有效探索大规模集成空间**，候选补丁多了以后缺乏筛选手段，性能反而下降；**缺乏仓库级理解能力**，只看报错附近的代码，无法把握跨文件依赖。Trae Agent 把 Issue 解决建模为最优解搜索问题，用模块化代理分别负责探索、过滤和决策，目标是同时突破两个瓶颈。

![Trae Agent](/assets/images/arxiv-paper-trae-agent.png)

## 三个代理与测试时缩放

框架包含三大核心代理：**生成代理（Generator）**用多个大语言模型（LLM）加随机采样产生多样化补丁，覆盖尽可能广的解空间；**修剪代理（Pruner）**快速过滤明显错误的补丁，把资源留给有希望的候选；**选择代理（Selector）**利用仓库级上下文从剩余补丁中选出最优解。仓库级理解通过迭代代理文件摄入、代码区域摘要与聚类实现，不依赖图神经网络，而是用 LLM 提示完成，并由 SequentialThinkingTool 指导跨文件依赖的探索。

在此之上，论文引入**测试时缩放（test-time scaling）策略**：随集成规模增大性能单调提升，可以按预算动态选择集成大小，实现成本与质量的灵活权衡——线上紧急修复可以拉大集成追求胜率，日常任务则用小集成控制推理开销。模块化架构的另一个好处是可替换：生成、修剪、选择三个代理可以各自升级而不用重写整个系统。

## 实验结果与启示

在 SWE-bench Verified（从真实开源仓库抽取的 Issue 修复基准）上，以 GPT-4o、Claude 3.5 Sonnet、DeepSeek-Coder 三个大语言模型为后端时，Trae Agent 相比 `4` 个对比基线均显著提升，平均提升 `10.22%`，并曾位居该榜单第一（`Pass@1 = 78.80%`）。系统的启示是：多模型多采样的组合配合专门的修剪与选择环节，比单模型直出更稳；解决问题不能只看单个文件，仓库级上下文是决定上限的关键。Trae Agent 已开源，同类话题可参阅站内[《一分钟读论文：EnAgent 三个 AI 智能体组队，登顶代码修复榜单》]({% post_url 2026-02-28-enagent-ensemble-reasoning %})。

## References
- [Agent-Based Ensemble Reasoning for Repository-Level Issue Resolution（Trae Agent）][paper1-url]
- [arXiv:2507.23370][links-1]


[paper1-url]: https://arxiv.org/abs/2507.23370
[links-1]: https://arxiv.org/pdf/2507.23370
