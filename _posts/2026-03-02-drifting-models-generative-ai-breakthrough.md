---
layout: post
title: "一分钟读论文：《Drifting Models 单步生成》"
categories: [AI]
image: assets/images/drifting-models-generative-ai-breakthrough.svg
tags: [Generative AI, Drifting Models, Kaiming He, MIT, Diffusion Models]
description: "MIT 何恺明团队提出 Drifting Models，把扩散模型推理时的多步迭代搬到训练时完成分布漂移，推理只需一步生成，ImageNet 256 上以单步达到 FID 1.54，优于传统扩散模型 50 到 100 步的效果，机器人控制任务成功率不降反升。"
---

MIT 何恺明团队的论文[《Generative Modeling via Drifting》][paper1-url]提出 Drifting Models：把生成过程从推理时搬到训练时，推理只需一次函数评估即可出图，ImageNet 256×256 上 FID 达 `1.54`。

![Drifting Models 主图](assets/images/drifting-models-generative-ai-breakthrough.svg)

## 把迭代从推理搬到训练

扩散模型（如 Stable Diffusion、DALL-E）的核心痛点是串行迭代：生成一张图需要 `20-100 步`，每步都要完整跑一遍神经网络，即便 SDXL Turbo 等加速版本仍需 4 步，难以满足视频生成、机器人控制等实时需求。

传统扩散模型的分工是：训练时学习逐步去噪，推理时从噪声开始迭代几十次。Drifting Models 反过来：训练时让模型输出分布慢慢"漂移"向真实数据分布，推理时直接一步映射到位。

核心机制是**漂移场（Drifting Field）V**，具有两个性质：一是指示当前分布应向哪个方向漂移才能更接近真实数据；二是当分布与真实数据完美匹配时自动趋近于 0。

![Drifting Models 架构图](assets/images/drifting-models-architecture.png)

## 实现方式与实验结果

训练过程分三步：从当前 batch 估计漂移场 V；用 V 把当前样本漂移得到目标；让网络回归匹配漂移后的目标。推理过程只有一步 `x = f(noise)`，没有迭代。

**ImageNet 256×256 生成**：

| 方法 | FID（越低越好） | 步数 |
|------|------------------|------|
| Drifting Models（Latent） | **1.54** | 1 |
| Drifting Models（Pixel） | 1.61 | 1 |
| 传统扩散模型 | 约 2.0-3.0 | 50-100 |
| SDXL Turbo | 约 2.0 | 4 |

**机器人控制**：把 Diffusion Policy 的多步生成替换为 Drifting Models 单步生成后，任务成功率不降反升，推理速度快了几十倍，对实时控制意义直接。

![Drifting Models 性能对比](assets/images/drifting-models-performance.png)

## 方法意义

这篇论文的贡献不止于速度。它把"生成是逐步打磨过程"的默认假设改为"训练时完成分布进化"，使实时生成（视频、AR/VR、交互式创作）成为可能，同时降低部署门槛，手机等边缘设备也可运行高质量生成模型。论文还给出理论分析解释漂移场为何有效，这一思路对 ResNet、Mask R-CNN、MAE 之后何恺明团队延续的"重新思考基本问题"路线是一致延续，也可能启发视频、音频、3D 等更多模态的单步生成探索。

## References
- [Generative Modeling via Drifting][paper1-url]
- [项目主页][links-1]


[paper1-url]: https://arxiv.org/abs/2602.04770
[links-1]: https://lambertae.github.io/projects/drifting/
