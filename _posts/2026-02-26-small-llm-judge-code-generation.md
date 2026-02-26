---
title: "一分钟读论文：《小语言模型作为评委提升代码生成》"
author: unbug
categories: [AI, 软件工程]
image: assets/images/arxiv-paper-small-llm-judge-figure.png
tags: [featured, 代码生成, ICSE 2026]
date: 2026-02-26 18:00:00 +0800
---

![小语言模型作为评委提升代码生成](/assets/images/arxiv-paper-small-llm-judge-figure.png)

## 核心亮点

这篇来自瑞士 Università della Svizzera italiana 的研究，用小语言模型（SLM）当"代码评委"，居然能让代码生成效果超越更大的模型，而且成本超级便宜！

## 关键数据

- **最佳评委**：Qwen2.5 Coder 3B，Kappa 分数 0.57，甚至超过 GPT-4.1-mini
- **性能提升**：生成 10 个候选 + 1 个评委，比单模型提升 5.3%-20.6%
- **成本对比**：SLM 团队约 $600 vs 30B 模型约 $17,500，差了 29 倍！
- **最佳配置**：Qwen2.5 Coder 3B 的 pass@1 达到 0.521，比同系列 33B 模型还高 3.4%

## 具体提升效果

| 模型 | 提升幅度 |
|------|---------|
| Phi-4 mini 4B | +20.6% |
| Qwen2.5 Coder 3B | +16.0% |
| DeepSeek Coder 1.3B | +12.1% |
| OpenCoder 1.5B | +11.1% |
| Gemma-3 4B | +5.3% |

## 一句话总结

用两个小模型（一个生成代码，一个当评委），效果能 beat 大模型，成本只要几十分之一，这就是"小步快跑"的胜利！

论文链接：https://arxiv.org/pdf/2602.11911
