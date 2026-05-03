---
layout: post
title:  "一分钟读论文：《TIDE：扩散语言模型的跨架构蒸馏》"
author: unbug
categories: [AI, MachineLearning]
image: assets/images/article-41-tide.svg
tags: [DiffusionLM, KnowledgeDistillation, ModelCompression, CrossArchitecture, dLLM]
---

北京大学和浙江大学研究者发表的论文[《Turning the TIDE: Cross-Architecture Distillation for Diffusion Large Language Models》][paper1-url]，提出首个面向扩散语言模型的跨架构蒸馏框架TIDE，将16B MoE教师模型压缩至0.6B学生模型，在HumanEval代码生成任务上提升16.48分，推理加速5.2倍，峰值内存降低22倍。

扩散语言模型（dLLM）使用扩散过程对文本进行建模，与自回归（AR）模型逐字生成不同，dLLM支持并行解码和双向上下文理解，已在多个基准上展现出竞争力。然而，当前最先进的dLLM需要数十亿参数才能达到可接受的性能，这严重限制了其在消费级硬件上的部署。已有蒸馏方法仅限于同一架构内的步数压缩，无法解决跨架构知识迁移问题——即教师和学生模型在架构、注意力机制和分词器上均存在差异的场景。

## 跨架构蒸馏的核心挑战

跨架构蒸馏面临两个根本性难题。首先，教师和学生模型的分词器不同，token无法直接对齐。传统蒸馏方法假设师生模型共享相同的token空间，可以直接计算输出分布的KL散度，但在跨分词器场景下，同一语义可能被编码为完全不同的token序列。

其次，扩散过程的噪声调度使得教师信号在不同掩码比率下可靠性差异巨大。在高噪声区域（即高掩码比率），教师模型输出的token预测置信度低，直接蒸馏会产生误导性信号，拖累学生模型的训练。

## TIDE框架设计

TIDE框架针对上述挑战设计了三个核心模块：

**TIDAL双轴调度机制**在训练进度和扩散时间步两个维度上联合调节蒸馏强度。在训练初期和较低噪声阶段，蒸馏强度较高以快速传递知识；随着训练推进和噪声增加，自动降权教师在高掩码比率区域的不可靠信号。这相当于在蒸馏过程中动态识别"教师何时在胡说"，并对这些时刻减权。

**CompDemo上下文增强**通过两次教师推理解决高噪声下的信号质量问题。传统方法对每个掩码位置仅进行一次教师推理，揭示的上下文信息有限。CompDemo通过互补掩码分割策略，让每个掩码位置看到约50%的已揭示上下文，显著提高高噪声区域教师信号的质量。

**Reverse CALM跨分词器匹配**解决分词器异构问题。采用反向分块级二元交叉熵实现跨分词器token匹配，梯度系数有界（仅依赖固定的教师模型），并加入双端噪声过滤，等价于Bernoulli-KL模式搜索目标。这使得学生模型能够在不共享分词器的情况下，从教师模型的输出分布中有效学习。

## 实验结果

TIDE支持两种蒸馏管线：跨分词器管线（LLaDA2.0-mini 16B MoE到Qwen3-0.6B-BD3LM）和共享分词器管线（WeDLM-8B到Qwen3-0.6B-BD3LM）。在8个基准测试上的核心结果：

- TIDE-Cross相比未蒸馏的BD3LM基线平均提升1.53分（34.20 vs 32.67）
- HumanEval代码生成任务提升16.48分（48.78 vs 32.30），蒸馏后的dLLM在代码生成上表现尤为出色
- 相比16B MoE教师模型，峰值内存降低22倍（1.4 GB vs 31.3 GB）
- 推理速度提升5.2倍（6.25秒 vs 32.55秒，生成256 token，H100）

将16B MoE或8B Dense教师压缩到0.6B学生模型，仍保持竞争力性能，证明了跨架构蒸馏的实用价值。TIDE让dLLM从实验室走向消费级硬件部署成为可能。

## References

- [arXiv 页面][links-1]
- [GitHub 仓库][links-2]
- [HuggingFace 模型和数据集][links-3]


[paper1-url]: https://arxiv.org/abs/2604.26951
[links-1]: https://arxiv.org/abs/2604.26951
[links-2]: https://github.com/PKU-YuanGroup/TIDE
[links-3]: https://huggingface.co/PKU-YuanGroup/TIDE
