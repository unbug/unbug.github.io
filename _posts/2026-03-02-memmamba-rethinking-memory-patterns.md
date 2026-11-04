---
layout: post
title: "一分钟读论文：《MemMamba 重造状态空间记忆》"
author: unbug
categories: [AI]
image: assets/images/memmamba-architecture.svg
tags: [AI, SSM, Mamba, Memory, ICLR 2026]
description: "ICLR 2026 论文 MemMamba 从数学上揭示 Mamba 状态转移矩阵导致记忆指数级衰减，借鉴人类记笔记引入状态池与跨 Token、跨层注意力，在 400K token 检索任务保持 90% 准确率，推理延迟仅为 Transformer 的 0.52 倍。"
---

中国人民大学等机构的论文[《MemMamba: Rethinking Memory Patterns in State Space Model》][paper1-url]（ICLR 2026）指出 Mamba 长程记忆会指数衰减，其 MemMamba 以"记笔记"机制在 `400K token` 检索保持 `90%` 准确率。

## Mamba 为什么会遗忘

序列建模长期存在效率与记忆的矛盾：RNN/LSTM 无法并行且超长序列梯度消失；Transformer 自注意力可全局建模但复杂度 `O(n²)`；2023 年的 Mamba 以线性复杂度 `O(n)` 在语言建模上超过同规模 Transformer，代价是长程记忆快速衰退。

论文用状态更新方程给出根源：`h_t = A·h_{t-1} + B·x_t`，稳定性要求 |A| < 1，于是 k 步前输入的贡献被 `|A|^k` 压制——随 k 增大指数级衰减，早期输入几乎被完全遗忘。问题在于高效架构与持久记忆在原始设计里难以兼得：Mamba 的线性效率正是靠压缩历史换来的。为量化损失，论文引入横向-纵向记忆保真度框架：预期 Token 记忆保真度（ETMF）衡量信息在层内水平传播的保留程度，预期跨层记忆保真度（ECLMF）衡量层间垂直传输的保留程度，两者共同定位遗忘发生在哪个环节。

## 像人类一样记笔记

MemMamba 模仿人类读长文档时提取要点、记笔记、需要时回顾的方式，每个块层集成三个组件：

- **Note Block**：用评分函数评估每个 token 重要性，超过阈值 τ1 即把压缩摘要按 FIFO 或优先级策略写入状态池
- **跨 Token 注意力**：检测到遗忘（状态池保真度低于阈值 τ2）时，在当前输入与状态池之间执行注意力补充
- **跨层注意力**：每隔 p 层触发一次，聚合此前各层的状态池

双阈值加稀疏跨层设计让记忆补充在每层发生、层间交互稀疏激活，在记忆保留与计算效率间取得平衡：重要的 token 才进笔记，笔记不足才回看，深层才做汇总。

![MemMamba 架构设计](assets/images/memmamba-architecture.svg)

## 实验与理论结果

**PG19 语言建模**（平均 69K token 的英语小说）：30K-60K token 时 Mamba 与 DeciMamba 完全崩溃（PPL 超 100 或发散），MemMamba 稳定在 `17.33-18.25`，60K 时仍为 17.35。

**Passkey Retrieval**：400K token 时 MemMamba 检索准确率 `0.9`，DeciMamba 为 0.6，Pythia 与 Mamba 在 32K 内即归零。

**含噪文档检索**：200 个干扰文档下 MemMamba 得 0.24，DeciMamba 0.12，Mamba 为 0，说明笔记机制在噪声干扰下仍能定位目标信息。

**效率**：端到端延迟为 Transformer 的 `0.52 倍`，即 48% 推理加速，笔记机制的额外开销被稀疏触发控制得很小。

理论上，论文证明 MemMamba 尽管增加了状态摘要与跨层注意力，仍保持线性时间空间复杂度 `O(n·d)`，具备 BIBO（有界输入有界输出）稳定性，长序列召回率不低于 90%。这意味着记笔记机制没有把线性模型拖回二次复杂度。

在解决高效架构遗忘问题的路线上，MemMamba 与站内[《Engram 分离知识存储》]({{ site.baseurl }}/deepseek-engram/)思路相近：前者给状态空间模型外挂状态池保存关键信息，后者把知识存储从计算骨干中分离出去，都指向"记忆应当成为架构的一等公民"。应用上 MemMamba 适合整本书理解、基因组长序列、视频音频等多模态时序数据这类超长输入场景——它们的共同特点是关键信息可能出现在任意位置且必须长期保留。未来方向包括多模态扩展、与检索增强系统集成，以及把 MemMamba 扩展为以记忆为一等公民的高效基础模型。

## References
- [MemMamba: Rethinking Memory Patterns in State Space Model][paper1-url]


[paper1-url]: https://arxiv.org/abs/2510.03279
