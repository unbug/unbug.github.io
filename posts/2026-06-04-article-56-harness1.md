---
layout: post
title:  "一分钟读论文：《Harness-1：认知卸载的检索 Agent 训练范式》"
author: unbug
categories: [AI, Agent]
image: assets/images/article-56-harness1.svg
tags: [RL, SearchAgent, CognitiveOffloading, RAG]
---

威斯康星大学麦迪逊分校等机构合作的论文[《Harness-1: Reinforcement Learning for Search Agents with State-Externalizing Harnesses》][paper1-url]，提出了一种检索 Agent 训练的新范式——认知卸载（cognitive offloading）。其核心主张是：在长周期搜索中，模型不应同时承担语义决策和机械状态管理两种负担，应将后者从策略网络剥离到环境侧的工作记忆中。

## 认知卸载范式

传统检索 Agent 训练将语义决策和机械状态管理全部压入策略网络，导致状态重建负担过重、优化问题病态、工具坍塌和跨文档结构丢失等问题。Harness-1 的核心设计原则是**语义决策留在模型内，机械记账放入环境工作记忆**。

具体实现为一个两层记忆架构：内层为紧凑的文本状态，渲染到模型上下文中，包含查询、搜索历史、候选池、重要性标记的 curated 文档集和证据图摘要；外层为完整文档存储，通过专用工具访问。关键组件包括四档重要性标记的 curated set（上限 30 文档）、实体共现证据图、蕴含验证工具、BM25 句子级压缩和 MinHash 内容去重。

与 Context-1 的对比尤为直观：Context-1 围绕"最小化"原则，将记账负担留给策略；Harness-1 则围绕"认知卸载"原则。论文证明，相同模型（GPT-5.4）从 Context-1 harness 切换到 Harness-1 harness，recall 提升 4.2 点，无需额外训练。

## 实验与消融结果

Harness-1 使用 20B 规模的 gpt-oss-20b MoE 模型，在 8 个基准上平均 curated recall 达到 0.730，比 Context-1（20B）高 11.4 点，比 Tongyi DeepResearch 30B 高约 13 点。在 BrowseComp+ 上达到 0.584 recall，与 Opus-4.6（frontier 模型）仅差 0.035。

消融实验在 BrowseComp+ 上揭示了各组件的贡献：禁用所有机制后 recall 从 0.56 骤降至 0.46；auto-seed 是最大的单组件贡献者，其次是重要性标记和证据图。所有组件共同作用，任一组件禁用都导致性能下降。

训练配置方面，SFT 使用 LoRA rank 32 在 899 条轨迹上训练 3 个 epoch，RL 采用 on-policy CISPO 算法，共约 82K 总 rollout。值得注意的是，RL 仅在 SEC（金融文件）域训练，但 7/8 评估基准在训练域外，跨域 transfer 增益最大，支持"学到了通用搜索状态操作"的假设。

## 工程复杂度与泛化风险

Harness 必须维护工作记忆、执行验证、内容去重和压缩观察，系统比最小工具循环复杂得多。auto-seed 依赖早期重排序结果的质量，证据图提取可能遗漏实体，验证质量取决于底层验证器。这些工程复杂度对追求简洁性的团队构成权衡。

开源权重已发布在 Hugging Face，代码仓库包含搜索 harness、训练和推理等完整模块，为复现和后续研究提供了基础。

## References

- [Harness-1 论文][paper1-url]
- [Context-1 开源检索子 Agent][links-1]
- [BrowseComp+ 基准][links-2]


[paper1-url]: https://arxiv.org/abs/2606.02373
[links-1]: https://github.com/chroma-core/context-1
[links-2]: https://arxiv.org/abs/2501.19329
