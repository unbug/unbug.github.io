---
layout: post
title:  "一分钟读论文：《8B 多模态深度研究模型》"
author: unbug
categories: [AI, Multimodal]
image: assets/images/vision-deepresearch-architecture.svg
tags: [deep-research, vision-language, mllm, ai]
description: "多机构联合发布首个长时序多模态深度研究模型 Vision-DeepResearch，通过监督微调加强化学习把深度研究能力内化进模型，8B 参数版本在六个基准上平均 50.5 分，超过基于 GPT-5 构建的智能体工作流。"
---

![Vision-DeepResearch 架构图](assets/images/vision-deepresearch-architecture.svg)

多个研究机构 2026 年 1 月联合发布的论文[《Vision-DeepResearch》][ref4]提出首个长时序多模态深度研究模型，支持数十轮推理与数百次真实搜索引擎交互，8B 参数版本在六个基准上平均 `50.5 分`，超过基于 GPT-5、Gemini-2.5 Pro 构建的智能体工作流。

现有多模态深度研究采用"推理-然后-工具调用"（ReAct）范式，存在三个局限：推理轮次有限，无法处理需要深度研究的复杂任务；缺乏多尺度、多实体的视觉与文本搜索能力；深度研究能力停留在外部工具调用，没有内化为模型自身能力。换句话说，查两下就放弃的不是模型态度，而是架构上限：外部编排无法支撑长链条的研究任务。

## 范式与训练策略

Vision-DeepResearch 的新范式包含四个要素：支持数十轮推理步骤的多轮推理；同时处理多个实体查询的多实体搜索；支持图像裁剪与图像搜索的多尺度视觉搜索；与真实搜索引擎进行数百次交互。模型配套四类工具：多尺度图像裁剪、图像搜索、文本搜索、网页浏览，推理流程为推理、工具调用、观察整合、下一步推理，循环直到给出最终答案。每一轮观察结果都会被整合进后续推理，信息随交互逐步累积，而不是查一次就交卷。

训练分两步，目标是把研究能力刻进模型本身。第一步冷启动监督训练（SFT），用高质量 VQA 实例和多轮轨迹微调；第二步强化学习（RL）进一步优化深度研究能力。相当于先学优秀研究员的完整操作轨迹，再通过大量练习自我提升。站内另一篇[《MiroFlow 开源深度研究智能体框架》]({{ site.baseurl }}/miroflow-agent-framework/)走的是外部工作流路线，两者恰好构成对照。

## 基准表现与 VDR-Bench

在 VDR、FVQA、MMSearch+、MMSearch、LiveVQA、BC-VL 六个基准上，直接回答模式的 GPT-5 平均 `37.4 分`、Gemini-2.5 Pro 平均 `37.7 分`；改造成智能体工作流后，GPT-5 提升到 48.3 分，Gemini-2.5 Pro 到 50.7 分。Vision-DeepResearch-8B 平均 `50.5 分`，在 VDR 基准上拿到 29.2 分，明显高于 GPT-5 工作流的 20.4 分；MMSearch 上 69.6 分与 Gemini-2.5 Pro 工作流持平，LiveVQA 上 76.7 分为全场最高。

更大的 Vision-DeepResearch-30B-A3B 平均 `56.9 分`，在六个基准中五个领先。对比各自的基础模型，8B 版本平均提升 `10.4 分`，30B-A3B 版本平均提升 `16.0 分`，其中 MMSearch+ 从 10.0 分升到 28.5 分。

评估方面，团队同步发布了配套基准 VDR-Bench（论文[《Vision-DeepResearch Benchmark》][ref5]），针对多模态大型语言模型重新思考视觉与文本搜索，支持多尺度、多实体的搜索评估。

## 开源生态

项目已开放代码、数据集与模型权重：SFT 与 RL 训练代码于 2026 年 2 月发布，数据集包括冷启动数据集与 RL 数据集的演示版、VDR-Bench 完整版与 testmini 版，模型权重提供 8B（仅 SFT）版本，30B-A3B（SFT+RL）版本即将发布。GitHub 仓库截至 2026 年 3 月 1 日已有 377 个 Star、38 个 Fork。

核心贡献有三点：首个把推理扩展到数十轮、搜索交互扩展到数百次的长时序多模态深度研究模型；用监督加强化学习把深度研究内化为模型能力而非外部编排；在多个基准上超越闭源顶级模型构建的工作流，为自动化研究助手提供了可复现的开源基座。对需要跨多个实体收集信息、多源信息整合与复杂决策支持的场景，这套能力给出了从演示走向实用的路径。

## References
- [Vision-DeepResearch GitHub][ref1]
- [Hugging Face 模型][ref2]
- [项目主页][ref3]
- [Vision-DeepResearch 论文][ref4]
- [Vision-DeepResearch Benchmark 论文][ref5]


[ref1]: https://github.com/Osilly/Vision-DeepResearch
[ref2]: https://huggingface.co/Osilly/Vision-DeepResearch-8B
[ref3]: https://osilly.github.io/Vision-DeepResearch/
[ref4]: https://arxiv.org/abs/2601.22060
[ref5]: https://arxiv.org/abs/2602.02185
