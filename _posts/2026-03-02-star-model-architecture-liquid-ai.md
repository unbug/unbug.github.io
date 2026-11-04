---
layout: post
title: "一分钟读论文：《STAR 自动进化出模型架构》"
author: unbug
categories: [AI Research, Architecture]
image: assets/images/star-architecture-overview.svg
tags: [AI, Machine Learning, Model Architecture, STAR, Liquid AI, Transformer]
description: "MIT 孵化的 Liquid AI 提出 STAR 架构自动合成框架，用分层基因编码与进化算法搜索注意力、循环、卷积等组件的组合，生成的语言模型相比 Transformer 缓存减少 90%、参数减少 13%，性能相当或更优，并可从 1.25 亿扩展到 10 亿参数。"
---

Liquid AI 的论文[《Synthesis of Tailored Architectures by Targeted Evolution（STAR）》][paper1-url]（arXiv:2411.17800）用进化算法自动合成模型架构，生成的模型相比 Transformer 缓存减少 `90%`。

![STAR 架构概览](assets/images/star-architecture-overview.svg)

## Transformer 的效率瓶颈

自 2017 年 Transformer 提出以来，主流模型基本沿用其骨架做局部修补。自注意力 `O(n²)` 的计算复杂度让长文本处理成本急剧上升，推理时的 KV 缓存（存放历史 token 的键值向量、随序列长度线性增长）内存占用与训练能耗同样突出。加州大学伯克利分校计算机、数据科学与社会学院院长 Jennifer Chayes 也公开表示，希望看到 Transformer 的替代方案，以更少能源完成同样的计算。问题在于，人工设计架构高度依赖专家经验，注意力、循环、卷积等组件的组合空间又远超人力所能遍历，进二十年来的架构创新因此集中在少数几种成熟骨架的变体上。

## STAR 的进化式架构合成

STAR 把架构设计变成一个进化问题，包含三个机制：

1. **STAR 基因组**：用分层编码表示候选架构，覆盖注意力机制、循环网络、卷积层等多种组件的组合空间
2. **进化优化**：通过重组与突变迭代改进候选架构，适者生存
3. **多目标优化**：同时权衡性能、效率与硬件兼容性

理论根基来自动力系统（刻画模型动态行为）、信号处理（优化信息流）与数值线性代数（保证计算效率）的跨学科融合，使搜索能触及人类设计师想不到的设计，而非在已知骨架附近做微调。此外 STAR 具备模块化特性：能在进化中发现重复出现的结构模式与最优组件组合，沉淀为可复用构建块，让后续搜索站在前人解之上继续演化。

## 实验结果与意义

在自回归语言建模这一 Transformer 主场，STAR 合成的模型缓存相比混合模型减少 `37%`，相比传统 Transformer 减少 `90%`，且质量未下降。同时优化模型质量与大小时，参数数量减少 `13%`，标准基准性能反而提高。可扩展性上，进化出的架构从 `1.25 亿`参数扩展到 `10 亿`参数，性能与 Transformer++ 及混合模型相当或更好，缓存需求则大幅降低——缓存直接决定推理时的显存占用与批处理上限，这项节省在部署端会转化为真金白银的成本差异。

STAR 的意义在于把架构设计从专家手工工艺转为自动化工程：缓存与参数效率直接降低推理内存与能耗，让同等硬件能跑更长上下文或更大批量；自动化搜索降低了架构创新门槛，没有资深架构师团队也能获得定制模型；进化出的非 Transformer 骨架为后 Transformer 时代提供了可验证路径。用进化算法搜索结构与解法，和站内[《AI 打破矩阵乘法 56 年纪录》]({{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/)的 AlphaEvolve 属同一范式：后者用进化式代码搜索找到胜过人类纪录的矩阵乘法算法，STAR 则把同样的搜索施加于神经网络架构本身。Liquid AI 计划将方法推向计算机视觉、语音、科学计算与边缘设备等更多场景。

## References
- [Synthesis of Tailored Architectures by Targeted Evolution][paper1-url]
- [Liquid AI 研究页面][links-1]


[paper1-url]: https://arxiv.org/abs/2411.17800
[links-1]: https://www.liquid.ai/research/automated-architecture-synthesis-via-targeted-evolution
