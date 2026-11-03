---
layout: post
title:  "一分钟读论文：《AI 邂逅纯数学的突破与挑战》"
author: unbug
categories: [AI, Mathematics]
image: assets/images/ai-for-mathematics-2026.svg
tags: [Mathematics, AI]
description: "北京大学综述系统梳理 AI for Mathematics 进展：AI 解几何题已达国际数学奥林匹克金牌水平，并在 Erdős 猜想上产出经 Lean 形式化验证的反例，但验证瓶颈与语义一致性仍是通往研究级数学合作者的主要障碍。"
---

北京大学的 Haocheng Ju 和 Bin Dong 发表于 arXiv 的综述论文[《AI for Mathematics》][paper1-url]（arXiv:2601.13209）梳理了 AI 在纯数学领域的进展：AI 已达国际数学奥林匹克金牌水平，在 Erdős 猜想上产出形式化验证反例，但验证瓶颈与语义一致性仍是主要挑战。

论文以 Hilbert 在 1920 年代提出的数学形式化宏大计划为参照：一个世纪后，AI 正从计算工具转变为数学研究的合作者。

## 两大研究方向

论文把 AI for Mathematics（AI4Math）研究划分为两个互补方向。问题特定建模针对具体数学问题设计专门架构，优势是针对性强、数据和计算资源需求较少，缺点是难以迁移、依赖领域专业知识。通用建模则开发从数学专用语言模型到通用推理引擎的基础模型，通用性强、支持更广泛的工作流，但需要海量训练数据与巨大计算资源，工程复杂度也更高。

## 突破性成果

在引导人类直觉方面，DeepMind 于 2021 年用神经网络发现纽结理论中代数与几何不变量之间的新关系；AI 还在仿射 Deligne-Lusztig 簇研究中重新发现了经典虚维数公式，并建立新的精确下界定理。

在构造例子和反例方面，FunSearch（2024）用进化方法搜索生成构造程序，发现了超越已知结果的大型 cap 集构造；AlphaEvolve（2025）把进化过程扩展到整个代码文件并同时优化多个指标，为最小重叠问题和 11 维接吻数问题提供了改进构造（另见站内[《AI 打破矩阵乘法 56 年纪录》]({{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/)）。

在形式化推理方面，AlphaGeometry（2024）将符号几何推理引擎与语言模型结合，达到 IMO（国际数学奥林匹克）银牌水平；AlphaGeometry2（2025）引入共享知识集成搜索树算法，实现金牌表现。定理证明正转向模块化 Agent 工作流：DSP 先生成非形式化证明再翻译为形式化草图，交由轻量证明器收尾；LEGO-Prover 维护持久引理库并演化出新引理；Aristotle 将非形式化推理与形式化验证交错进行；Numina-Lean-Agent（2026）解决了 2025 年 Putnam 竞赛的所有问题。

在 Erdős 问题上，Aristotle 等 Agent 系统已成为 Terence Tao 等人研究 Paul Erdős 猜想的工作流组成：前沿语言模型生成候选构造或启发式论证，再在 Lean 中被严格形式化和机械检查。该管道已产生对问题 #205 的形式化验证反例，以及对问题 #367 的部分解决。

## 性能与检索瓶颈

在性能评估方面，能力分层明显：北京大学本科 11 个数学科目期末考试中，GPT-4 得分低于 60 分，而 OpenAI o 系列、DeepSeek-R1、Gemini 2.5 Pro 等推理增强模型多个科目超过 90 分；在分析、概率、代数、几何与拓扑四个领域的博士资格考试中，o3-mini 平均得分 `84.4 分`，代数表现最强、几何与拓扑最低，说明当前 AI 处理抽象代数结构比需要几何直觉的任务更擅长。

另一瓶颈是数学信息检索。mathlib4 已包含超过 `250,000 个定理`和 `120,000 个定义`，前提检索（识别可证明新定理的已有结果）、语义检索和问答检索成为主要障碍，LeanSearch、Moogle、LeanExplore、LeanFinder 和 LeanDex 等工具正帮助数学家导航大型数学库。

## 挑战与未来方向

论文指出七项关键挑战：问题特定建模仍依赖人类直觉做特征工程；自然语言歧义与审计专家稀缺造成验证瓶颈；自动形式化面临语义一致性难题；形式有效性只是数学价值的必要条件而非充分条件；AI4Math 的未来在于模拟专业数学家工作流的 Agent 系统；社区需积极干预以建立对系统能力的集体心理模型；以及为 AI 演变为研究副驾驶做好文化准备。作者观察到，这些模型可能仍缺乏真正的理解、经常"模仿思考"，但已擅长自主发现逃避人类直觉的数学构造。

## References
- [AI for Mathematics: Progress, Challenges, and Prospects][paper1-url]


[paper1-url]: https://arxiv.org/abs/2601.13209
