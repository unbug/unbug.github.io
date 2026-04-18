---
layout: post
title:  "一分钟读论文：《单Agent在归一化计算下可匹敌甚至超越多Agent》"
author: unbug
categories: [AI, LLM, Agents]
image: assets/images/2026-04-18-single-vs-multi-agent.svg
tags: [LLM, MultiAgent, SingleAgent, Reasoning, InformationTheory]
---

arXiv上一篇论文[《Single-Agent LLMs Outperform Multi-Agent Systems on Multi-Hop Reasoning Tasks》][paper1-url]，对当前火热的多Agent系统提出了一个尖锐挑战：**当计算量归一化后，单Agent系统（SAS）的表现可以匹敌甚至超越多Agent系统（MAS）**。论文来自Stanford，作者Hoang Tran和Douwe Kiela用信息论的严格论证揭示了多Agent范式的理论局限。

## 多Agent范式的计算混淆

近年多Agent系统（MAS）被广泛报道在推理任务上表现出色。但论文指出这些结果往往存在一个关键混淆因素：**测试时计算量的大幅增加**。MAS通过多个Agent协作自然增加了token数量，这使得公平对比变得困难。

论文的核心论证基于**数据处理不等式（Data Processing Inequality, DPI）**：

- 在链式通信中，每个Agent的输出是输入的函数
- 信息论保证：链式处理不增加互信息 I(X;Z) ≤ I(X;Y)
- 多Agent系统的信息流可以视为链式处理，理论上不应超越同等计算量的单Agent

## 实验发现

论文在多跳推理任务上进行了系统性对比：

- 计算量归一化后，单Agent系统匹敌多Agent系统的表现
- 在某些任务上，单Agent甚至优于多Agent
- 多Agent的"优势"主要源于token数量的增加，而非架构本身的增益

## 关键洞察

### 对工程实践的启示

- 不要盲目追求多Agent架构
- 计算量预算固定时，单Agent可能更高效
- 上下文窗口的扩展是更直接的性能提升路径
- 多Agent的价值应聚焦于功能模块化，而非推理增强

### 理论贡献

- 首次用信息论方法系统分析单Agent与多Agent的理论边界
- 揭示了当前比较评估方法中的系统性偏差
