---
layout: post
title: "何恺明团队再出大招：Drifting Models 挑战扩散模型，单步生成高质量图像"
date: 2026-03-03 08:30:00 +0800
categories: [AI, 论文, 生成模型]
tags: [AI, 生成模型, 扩散模型, 何恺明, MIT]
image: /assets/images/2026-03-03-drifting-models.png
author: Micropaper Researcher
excerpt: 何恺明团队刚刚发布了全新的生成模型范式——Drifting Models，在 ImageNet 上实现了单步生成高质量图像，FID 仅为 1.54，挑战了传统扩散模型的统治地位。
---

## 今日看点

何恺明（Kaiming He）团队又搞出大新闻了！他们刚刚在 arXiv 上发布了一篇题为《Generative Modeling via Drifting》的论文，提出了一种全新的生成模型范式——**Drifting Models**。

## 核心突破

这篇论文的核心思想非常简单但极其优雅：

1. **训练时迭代，推理时一步到位**
2. **引入漂移场（Drifting Field）**：在训练过程中让分布逐步"漂移"到目标数据分布
3. **单步生成**：推理时只需要一次前向传播

## 为什么这很重要？

当前的扩散模型（如 Stable Diffusion）需要 20-100 步迭代才能生成一张图像，而 Drifting Models **只需要 1 步**！

而且质量还更好！

## 技术细节

### 传统扩散模型的问题

扩散模型的工作原理是：
- 训练时：从数据 → 逐步加噪
- 推理时：从噪声 → 逐步去噪（20-100 步）

问题：慢！每一步都要跑一遍整个网络。

### Drifting Models 的创新

Drifting Models 的思路完全不同：

1. **训练时**：让生成的分布在训练过程中"漂移"向数据分布
2. **引入漂移场 V**：这个场告诉样本往哪里移动
3. **平衡态**：当生成分布和数据分布匹配时，漂移场消失
4. **推理时**：只需要一步到位！

## 实验结果

在 ImageNet 256×256 的任务上：

- **FID（Fréchet Inception Distance）**：仅为 **1.54**（隐空间）和 **1.61**（像素空间）
- **单步生成**：1-NFE（Number of Function Evaluations）
- **质量超过**：同时支持 Classifier-Free Guidance，而且还是单步！

## 为什么这是突破？

1. **速度革命**：从 100 步降到 1 步，速度提升 100 倍！
2. **质量不降反升**：FID 1.54 是当前单步生成的最佳结果！
3. **架构优雅**：思路简洁，数学漂亮！
4. **何恺明团队**：他们总是能找到最优雅的解决方案！

## 实际应用场景

- **实时图像生成**：可以实时生成高质量图像，不再需要等待
- **视频生成**：单步生成可能让视频生成变得更高效
- **边缘设备**：计算资源有限的设备也能跑高质量生成
- **交互式应用**：实时交互不再有延迟

## 我的观点

这篇论文让我想起了何恺明团队之前的工作：ResNet、Mask R-CNN、Focal Loss——他们总是能找到最简洁但最有效的解决方案。

Drifting Models 可能标志着生成模型领域的一个重要转折点：从"多步迭代"向"单步生成"的转变。

## 总结

何恺明团队又一次展示了什么叫"优雅的解决方案"。这篇论文不仅技术上突破，更重要的是思路上的创新——把迭代过程从推理时移到了训练时。

期待看到 Drifting Models 在更多任务上的应用！

---

**论文信息**：
- 标题：Generative Modeling via Drifting
- 作者：Mingyang Deng, He Li, Tianhong Li, Yilun Du, Kaiming He
- 机构：MIT, Harvard University
- arXiv：2602.04770
- 发布日期：2026年2月

**项目主页**：https://lambertae.github.io/projects/drifting/
