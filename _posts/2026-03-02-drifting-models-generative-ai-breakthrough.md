---
layout: post
title: "一分钟读论文：《Drifting Models 单步生成》"
author: unbug
categories: [AI]
image: assets/images/drifting-models-teaser.svg
tags: [Generative AI, Drifting Models, Kaiming He, MIT, Diffusion Models]
description: "MIT 何恺明团队提出 Drifting Models，把扩散模型推理时的多步迭代搬到训练时完成分布漂移，推理只需一步生成，ImageNet 256 上以单步达到 FID 1.54，优于传统扩散模型 50 到 100 步的效果，机器人控制任务成功率不降反升。"
---

MIT 何恺明团队的论文[《Generative Modeling via Drifting》][paper1-url]提出 Drifting Models：把生成过程从推理时搬到训练时，推理只需一次函数评估即可出图，ImageNet 256×256 上 FID 达 `1.54`。

![Drifting Models 主图](assets/images/drifting-models-generative-ai-breakthrough.svg)

## 把迭代从推理搬到训练

扩散模型（如 Stable Diffusion、DALL-E）的核心痛点是串行迭代：生成一张图需要 `20-100 步`，每步都要完整跑一遍神经网络，即便 SDXL Turbo 等加速版本仍需 4 步，难以满足视频生成、机器人控制等实时需求。

传统扩散模型的分工是：训练时学习逐步去噪，推理时从噪声开始迭代几十次。Drifting Models 反过来：训练时让模型输出分布慢慢"漂移"向真实数据分布，推理时直接一步映射到位。换句话说，扩散模型把计算压力放在推理阶段，Drifting Models 把它全部前移到训练阶段，换来推理时近乎免费的单次前向计算。

核心机制是**漂移场（Drifting Field）V**，它是一个描述"当前生成分布该往哪个方向移动"的向量场，具有两个性质：一是指示当前分布应向哪个方向漂移才能更接近真实数据；二是当两个分布完美匹配时自动趋近于 0，训练自然收敛。训练因此在"生成—漂移—回归"之间循环：模型每前进一步，漂移场就重新指示下一步的修正方向，直到生成分布与真实分布重合。

## 实现方式与实验结果

训练过程分三步：从当前 batch 估计漂移场 V；用 V 把当前样本漂移得到目标；让网络回归匹配漂移后的目标。推理过程只有一步 `x = f(noise)`，没有迭代。

**ImageNet 256×256 生成**：Drifting Models 的 Latent 版本以单步生成拿下 FID 1.54，Pixel 版本为 1.61；作为对照，传统扩散模型需要 50-100 步做到约 2.0-3.0，SDXL Turbo 用 4 步约为 2.0。单步质量的对手是几十步迭代累计的结果。

**机器人控制**：机器人策略领域的主流方案 Diffusion Policy 同样依赖多步去噪生成动作，难以跟上高频控制回路。把多步生成替换为 Drifting Models 单步生成后，任务成功率不降反升，推理速度快了几十倍，说明单步生成并没有以牺牲质量为代价，对延迟敏感的实时控制场景意义直接。

## 方法意义

这篇论文的贡献不止于速度。它把"生成是逐步打磨过程"的默认假设改为"训练时完成分布进化"，使实时生成（视频、AR/VR、交互式创作）成为可能，同时降低部署门槛，手机等边缘设备也可运行高质量生成模型。论文还给出理论分析解释漂移场为何有效，这一思路与何恺明团队从 ResNet、Mask R-CNN 到 MAE 一路延续的"重新思考基本问题"路线一致，也可能把单步生成的思路带到视频、音频、3D 等更多模态的生成任务中。从多步到单步的转变还改变了模型的能力边界：过去串行迭代决定了生成速度存在硬性下限，现在训练时的算力投入可以直接兑换成推理时的响应速度，这对需要每秒数十帧连续生成的视频与交互场景是前提性的改变。


与 Drifting Models 同期，站内[《给长上下文模型戴上降噪耳机》]({{ site.baseurl }}/lucid-attention-long-context-breakthrough/)记录了 2026 年初另一项基础模型层面的改进：在注意力机制内部去相关，把长上下文的检索精度与可学习性解耦。

## References
- [Generative Modeling via Drifting][paper1-url]
- [项目主页][links-1]


[paper1-url]: https://arxiv.org/abs/2602.04770
[links-1]: https://lambertae.github.io/projects/drifting/
