---
layout: post
title:  "一分钟读论文：《SearchOS：开放域信息检索的多代理协作框架》"
author: unbug
categories: [ai-agent, multi-agent]
image: assets/images/searchos-framework.svg
tags: [agentic-rag, information-seeking, multi-agent-collaboration, state-management]
---

浙江大学与阿里巴巴集团合作发表的论文[《SearchOS：Towards Robust Open-Domain Information-Seeking Agent Collaboration》][paper1-url]，提出了一种面向开放域信息检索的多代理协作框架 SearchOS，通过**搜索导向上下文管理（SOCM）**将演化状态外显为四个可追踪组件，有效缓解多代理系统在长交互历史中重复循环、浪费搜索预算的问题。

## 问题背景：长交互中的重复循环

开放域信息检索要求 Agent 在多个来源之间穿梭，发现实体、填充属性、并将每个值锚定到可信证据。当搜索尝试未能产生有用结果时，单代理或多代理系统容易陷入**重复搜索同一类查询**的困境。现有方法缺乏对任务进度的显式跟踪机制，Agent 无法区分"尚未探索的路径"与"已验证无效的路径"，导致搜索预算被大量消耗在低效循环中。在多代理协作场景下，这一问题尤为突出：多个 Agent 可能同时向同一类低效查询发起请求，进一步加剧资源浪费，最终输出的信息质量和完整性显著下降。

## SOCM 框架设计：四个外显组件

SearchOS 将开放域信息检索形式化为**带引用锚定的关系模式补全问题**。Agent 需要发现实体、填充跨链接表的属性，并将每个值锚定到来源证据。SOCM 作为状态管理核心，由四个组件构成：

- **Frontier Task（前沿任务）**：维护待执行的子任务队列，按优先级排序，确保 Agent 始终聚焦于最有价值的探索方向。当新证据被发现时，系统自动派生新的子任务并插入队列
- **Evidence Graph（证据图）**：以三元组形式组织已发现的实体关系，每个值都锚定到具体来源，保证可追溯性。该图结构支持跨链接表的属性填充和关系推理
- **Coverage Map（覆盖地图）**：标记关系模式补全的完成度，识别尚未填充的属性缺口，指导后续搜索策略。通过可视化覆盖状态帮助系统判断何时停止搜索
- **Failure Memory（失败记忆）**：记录已验证无效的查询路径和死胡同，避免 Agent 重复踏入相同陷阱。该组件对提升长期搜索效率尤为关键

这四个组件通过中央状态管理器进行协调更新，形成闭环的信息检索流程。

## 实验结果与启示

SearchOS 引入**流水线并行调度**机制，将搜索执行与状态更新重叠进行，减少 Agent 的空闲等待时间。实验表明，该框架在多个开放域信息检索基准上显著降低了重复查询率，同时提升了最终输出的完整性和证据覆盖率。与传统串行执行方式相比，流水线设计使系统吞吐量获得可观提升。这一设计思路对 Agentic RAG 系统具有普遍参考价值：当多代理协作涉及大量外部搜索时，**将状态管理从隐式记忆转为显式组件**是提升鲁棒性的关键路径。SOCM 的四个组件共同构成了一个自校正的信息检索闭环，使 Agent 能够在复杂的多跳查询中保持方向感。

## References

- [SearchOS: Towards Robust Open-Domain Information-Seeking Agent Collaboration][paper1-url]


[paper1-url]: https://arxiv.org/abs/2607.15257
