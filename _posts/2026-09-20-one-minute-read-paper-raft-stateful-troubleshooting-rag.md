---
layout: post
title:  "一分钟读论文：《查历史工单要比所处阶段而非整篇文档》"
author: unbug
categories: [AI, Engineering]
image: assets/images/raft-stateful-troubleshooting-rag.svg
tags: [rag, retrieval, agent, customer-support]
description: "微软RAFT论文把已关闭工单抽象成时间线条目链并按阶段检索，初始症状阶段案例命中率达84.2%，远超整篇文档检索的67.3%，说明有状态语料的检索粒度决定历史案例复用效果。"
---

微软（Microsoft）红雷蒙德团队的论文[《RAFT: A Stateful Retrieval-Augmented Framework for Troubleshooting Agents》][paper1-url]提出：企业客服工单是多阶段、有状态的处置过程，把每条已关闭案例抽象成`时间线条目链`并在条目级检索，比把工单当静态文档整篇检索更能命中真正同阶段的先例——在只有初始症状（`0% progress`）时，RAFT 的`Case Hit`达到 `84.2%`，而传统 RAG 为 `67.3%`。论文已被 EMNLP 2026 行业 track（Industry Track，面向工业实践的投稿通道，评审强度与完整 research track 不同）接收，代码与评测集已开源。

## 从查文档到查阶段

现有检索增强生成（RAG）系统把历史工单当作静态文档切片入库，查询时返回与症状文字最相似的整篇记录。问题在于故障处置是有状态的：同一个根因在初期、中段、收尾阶段留下的文本痕迹完全不同，整篇相似度匹配到的往往是"结局像"而非"处境像"的案例。RAFT 的做法是把每条已关闭案例拆成一条有向的`时间线条目`（timeline entry）链——每个条目对应处置推进到某个状态时的一段记录——检索时在条目级别匹配，返回锚定在匹配状态上的父案例轨迹，让智能体看到的是"别人走到这一步之后做了什么"。论文还提供一个可选的案例级图，用可配置的相似度表示把相关案例连起来。需要说明定位：这不是通用 RAG 框架的改进，而是针对工单类有状态语料的检索抽象。

## 评测直接测检索层

评测不需要生产部署，直接衡量检索质量。基准分两部分：合成基准由 `Microsoft Learn` 的 Windows Server 文档构造，真实数据部分用 Apache Jira 上带人工 duplicate（重复工单）标签的 issue。核心指标`Case Hit`定义为检索结果中是否找到了与当前案例匹配的历史案例；对照方法包括传统 RAG 和两种 GraphRAG 方法——GraphRAG 指给知识库施加显式关系结构再检索的一类方法，其中 `HippoRAG2` 在语料上构建开放关系知识图谱并用个性化 PageRank 从查询实体出发检索。结果是在案例推进的每个阶段，RAFT 的 Case Hit 都优于基线，对最强基线的提升经按根因分组聚类的自助重采样检验具有统计显著性。站内另一篇[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/)处理的是长任务的资源归因——钱烧在哪个意图上；这篇处理的是历史案例的检索粒度——该翻哪条先例，两篇一个管运行时账本，一个管知识库入口。

## 结果能信到什么程度

边界必须先于结论。第一，合成基准来自微软自家的 Microsoft Learn 文档生态，训练数据污染风险未排除——模型可能在预训练阶段就见过这些文档，84.2% 对 `65.0%`（HippoRAG2）的优势在陌生语料上能否复现没有证据。第二，Jira 部分论文原文自限为`directional evidence`（方向性证据），即只说明优势有向真实案例迁移的迹象，不能写成"真实场景验证通过"。第三，Case Hit 是检索层指标，不是端到端解决率：检索到匹配案例不等于智能体照着做就能关闭工单。第四，时间线条目链假设处置流程可线性抽象，对并行分支、回退重查这类非线性流程如何建模，论文未展开。第五，实现与语料均出自单一厂商，尚无第三方复现。

## References
- [RAFT 论文（arXiv:2609.20754）][paper1-url]
- [微软开源仓库 microsoft/RAFT][links-1]
- [站内：像查性能热点一样查智能体的开销][links-2]


[paper1-url]: https://arxiv.org/abs/2609.20754
[links-1]: https://github.com/microsoft/RAFT
[links-2]: {{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/
