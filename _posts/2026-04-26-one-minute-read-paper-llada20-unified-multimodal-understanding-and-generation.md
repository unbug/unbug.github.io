---
layout: post
title:  "一分钟读论文：《用扩散语言模型统一多模态理解与生成》"
author: unbug
categories: [AI, Multimodal]
image: assets/images/llada20-uni.svg
tags: [LLaDA, Diffusion, Multimodal, VLM]
description: "蚂蚁集团 InclusionAI 的 LLaDA2.0-Uni 用 SigLIP-VQ 语义 tokenizer 把图像变成离散 token，让 16B MoE 扩散语言模型在单一掩码预测目标下兼做视觉理解与图像生成，表现媲美专用模型。"
---

蚂蚁集团 InclusionAI 的论文[《LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model》][paper1-url]提出用离散扩散语言模型（dLLM）统一多模态理解与生成：在 MMStar 等理解基准上取得 64.1 分、与 Qwen2.5-VL 等专用视觉模型同级，图像生成与编辑也由同一个模型完成。

传统 AI 系统存在分裂大脑问题：理解用 VLM（视觉语言模型），生成用扩散模型，需要拼接多个专用模型，能力无法互补。LLaDA2.0-Uni 的核心思路是把图像压缩为离散语义 token，让同一个 MoE（混合专家）扩散模型在单一掩码预测目标下同时处理文本和视觉 token，从而共享知识、简化部署。

## 统一架构的三个组件
**SigLIP-VQ 语义 tokenizer**：以预训练 SigLIP2 ViT 为特征提取器，把连续图像映射为词表大小 16,384 的离散语义 token，并支持动态分辨率。与重建式 VQ-VAE 不同，它直接在理解任务上训练，保留的语义信息能支撑复杂视觉推理；理解与生成共享同一套 token，消除了异构编码器带来的建模鸿沟与优化目标分裂。

**16B MoE 扩散主干**：基于 LLaDA2.0-mini 的 16B 总参数 MoE 架构，扩展词表接入视觉 token，采用 block-level masked diffusion 同时处理两种模态。全双向往意注意力会损害文本性能，因此用分块注意力在并行解码速度与质量之间取得平衡；尺寸标记 token 让模型无需改架构即可处理任意分辨率。

**6B 扩散解码器**：SigLIP-VQ 是纯语义表示，需要专门的解码器把 token 重建为高清图。解码器基于 6B 文生图模型构建，以生成 token 为唯一条件输入并做 2 倍超分，经蒸馏实现 8 步无 CFG 推理。

![LLaDA2.0-Uni 统一架构]({{ site.baseurl }}/assets/images/llada20-uni.svg)

## 推理加速与三阶段训练
推理端提出免训练的 SPRINT 加速框架：稀疏前缀保持按模态剪枝前缀 KV 缓存，用键范数重要性与预测置信度给每个位置打分，决定去留；非均匀解锁用置信度自适应替代固定去噪调度，提前确定高确定度 token。两者合计最高 1.6 倍加速，质量损失可忽略。

训练分三阶段渐进：**视觉-语言对齐**（100B token）、**多任务预训练**（210B token，覆盖 OCR、grounding、视频、图文交错数据）、**监督微调**（80B token，上下文扩到 16K），避免多任务联合训练的目标冲突。

## 性能表现
理解侧，LLaDA2.0-Uni 在通用 VQA 与复杂推理上显著超越同类扩散统一模型：MMStar 64.1 对 Lumina-DiMOO 的 58.0，MMMU 50.1 对 44.9，OCR 与文档理解场景中基线更是大幅落后；综合表现与 Qwen2.5-VL 等专用 VLM 打平。生成侧，基于 Z-Image-Base 的解码器经蒸馏后，8 步 Turbo 版本在五个生成基准上保持与 50 步标准版接近的质量，推理成本大幅下降。

统一离散表示还带来原生能力：**交错生成与推理**——文本与图像在同一条序列里边想边画、边画边想，这是拼接式分裂系统做不到的；单参考与多参考编辑也在同一框架内完成。与站内[扩散语言模型跨架构蒸馏][tide-post]一文对照，可看到 dLLM 路线正同时向“更大统一”和“更小部署”两个方向推进，蒸馏后的统一模型进入消费级设备只是时间问题。

## References
- [LLaDA2.0-Uni 论文][paper1-url]
- [GitHub 仓库][links-1]
- [相关阅读：TIDE 跨架构蒸馏][tide-post]


[paper1-url]: https://arxiv.org/abs/2604.20796
[links-1]: https://github.com/inclusionAI/LLaDA2.0-Uni
[tide-post]: {{ site.baseurl }}/2026-05-03-one-minute-read-paper-tide-diffusion-llm-distillation/
