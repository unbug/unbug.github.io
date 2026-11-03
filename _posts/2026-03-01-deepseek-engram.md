---
layout: post
title:  "一分钟读论文：《Engram 分离知识存储》"
author: unbug
categories: [AI]
image: assets/images/2026-03-01-deepseek-engram.svg
tags: [DeepSeek, Engram, Memory Architecture, Sparsity, MoE, LLM]
description: "DeepSeek 与北京大学提出条件内存系统 Engram，把静态知识存储从动态推理计算中分离，实现 O(1) 查找并支持 DRAM 卸载，在等参数等 FLOPs 约束下全面提升知识、推理、代码与数学任务表现。"
---

![DeepSeek Engram]({{ site.baseurl }}/assets/images/2026-03-01-deepseek-engram.svg)

DeepSeek 与北京大学合作的论文[《Conditional Memory via Scalable Lookup》][paper1-url]（2026 年 1 月发布）提出条件内存系统 Engram，把静态知识存储与动态推理分离，实现 `O(1)` 查找并支持内存表卸载到普通 DRAM，GitHub 仓库已获 `3.8k stars`。

Engram 试图成为继 MoE（混合专家）之后大模型的又一条稀疏性轴：MoE 扩展条件计算，Engram 扩展条件内存。

## 问题：GPU 内存的瓶颈

当前大模型面临 HBM 内存容量有限、价格昂贵的约束，而大量 GPU 周期实际花在静态知识的重复查找上，而非真正的推理计算。混合专家架构通过条件计算扩展了模型容量，但缺少原生的知识查找原语；对受出口限制影响的中国 AI 公司而言，获取顶级 GPU 内存尤为困难。Engram 的核心洞察是：静态知识和动态推理应该分开处理。

## Engram 的工作机制

Engram 将经典的 N-gram 嵌入现代化，构成一个确定性寻址、常数时间复杂度的条件内存系统，分三层工作。内存检索层从静态内存中检索 N-gram 知识，不需要复杂注意力机制，查找耗时不随模型规模增长，巨大的内存表可放在普通主机内存中。状态融合层把静态内存与动态隐藏状态融合，让早期层处理静态模式重建、深层专注复杂推理，模型有效深度保持不变。系统效率层面，Engram 与 MoE 构成互补的两条稀疏性轴——MoE 负责条件计算（动态），Engram 负责条件内存（静态），论文并给出 U 型缩放定律指导两者的最优容量分配。

## 实验结果与意义

研究团队在严格的等参数量和等 FLOPs（浮点运算量）约束下对比 Engram-27B 与 MoE 基线：Engram-27B 在知识、推理、代码、数学四类任务上均取得一致改进，长文本任务准确率达 `97%`。机制分析显示，Engram 让早期层从静态模式重建中解放出来，更多深层资源可用于复杂推理，同时以最小化推理开销的方式支撑大规模内存表。

这一方向的意义在于降低大模型的硬件门槛：知识容量扩展不再线性推高 HBM 需求，普通 DRAM 的低成本优势得以利用，也为受内存限制的训练环境提供了架构层面的解法。内存与计算分离的思路在计算机体系结构史上已有先例——让存储和计算各自专业化历来是更优的架构选择，Engram 相当于在 LLM 中重演这一过程。沿着这一思路，未来模型可能出现独立的内存与计算模块、MoE 与 Engram 叠加的多轴稀疏性、面向条件内存的专用硬件加速器，以及不重训整个模型即可持续更新知识的机制。同类通过架构与数据效率创新突破资源约束的路线，可与站内[《一次训练算清数据价值》]({{ site.baseurl }}/data-shapley-one-training-run/)对照阅读。

## References
- [Engram GitHub 仓库][paper1-url]
- [Engram 论文 PDF][links-1]


[paper1-url]: https://github.com/deepseek-ai/Engram
[links-1]: https://github.com/deepseek-ai/Engram/blob/main/Engram_paper.pdf
