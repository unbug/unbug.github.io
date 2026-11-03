---
layout: post
title:  "一分钟读论文：《GLM-5 迈向智能体工程》"
author: unbug
categories: [AI]
image: assets/images/glm5-illustration.png
tags: [GLM-5, GLM, LLM, AI Agents, Reinforcement Learning]
description: "智谱 AI 与清华大学联合发布 GLM-5 基础模型：总参数 744B，用异步强化学习训练，在 8 项智能体与编码基准上比肩顶级专有模型，成为首个在 Artificial Analysis 智能指数达到 50 分的开源权重模型。"
---

智谱 AI 与清华大学 2026 年 2 月发布的论文[《GLM-5》][paper1-url]（arXiv:2602.15763）推出总参数 `744B`、激活参数 `40B` 的基础模型 GLM-5，在 8 项智能体与编码基准上比肩顶级专有模型，是首个在 Artificial Analysis 智能指数 v4.0 达 `50 分`的开源权重模型。

论文有 186 位作者、篇幅 40 页，代表了开源模型向专有模型前沿发起的挑战。

## 架构与训练创新

GLM-5 采用 DeepSeek Sparse Attention（DSA，稀疏注意力）架构，训练 token 达 `28.5 万亿`，上下文窗口最高 `200K`；相比前代 GLM-4.5（355B 总参数、32B 激活参数），规模翻倍的同时保持了效率。

训练层面的核心创新是异步强化学习基础设施：将生成与训练完全解耦，提高 GPU 利用率，支持大规模智能体轨迹探索并消除同步瓶颈，配合异步智能体强化学习算法，使模型能从复杂的长程交互中更有效学习。推理层面，GLM-5 支持三种思维特性——交错思维（每次响应和工具调用前思考）、保留思维（多轮对话中保留思维块）、轮次级思维（每轮推理控制）。

此外，GLM-5 从发布首日即适配华为昇腾、摩尔线程、海光、寒武纪、昆仑芯、沐曦、天数智芯等中国 GPU 生态，通过深度优化在单个中国节点上达到双 GPU 国际集群的性能，长序列场景部署成本降低 `50%`。这七家芯片厂商覆盖了国内多条 AI 加速卡路线，适配本身也是工程能力的一部分。

## 基准表现与真实任务评估

在 8 项智能体、推理和编码基准中，GLM-5 与 Claude Opus 4.5、GPT-5.2 (xhigh) 的对比呈现互有胜负的格局：Humanity's Last Exam 得分 `50.4`，高于 Claude Opus 4.5 的 43.4 和 GPT-5.2 的 45.5；SWE-bench Verified 为 77.8，略低于两者的 80.9 和 80.0；τ²-Bench 为 89.7；BrowseComp（带上下文管理）达 `75.9`，明显高于两者的 57.8 和 65.8；Vending Bench 2 模拟经营 2 万个交易日，GLM-5 收益 $4,432，仅次于 Claude Opus 4.5 的 $4,967。

研究团队还构建了内部评估套件 CC-Bench-V2，用于评估真实智能体工程环境中的表现：前端评估构建成功率达 `98.0%`，后端评估与 Claude Opus 4.5 相当，在大型代码库探索等长程任务上甚至超过 Claude Opus 4.5。

## 匿名测试与开源定位

论文披露了一个细节：GLM-5 曾以「Pony Alpha」匿名身份在 OpenRouter 平台上发布测试，并引起社区对神秘模型的猜测。25% 的用户猜测它是 Claude Sonnet 5，20% 猜测是 DeepSeek，10% 猜测是 Grok，其余猜测为 GLM-5。确认身份后，这一结果直接回应了关于中国大语言模型能否在前沿水平竞争的疑问。

论文摘要指出，GLM-5 证明开源权重模型现在可以在复杂的真实世界工作流中与顶级专有系统的能力相媲美。通过开源，智谱 AI 希望社区超越静态基准测试，探索高效的智能体通用智能，让 AI 智能体自主规划、实施和迭代复杂任务；相关智能体训练路线可对照站内[《千环境合成训练 AI 智能体》]({{ site.baseurl }}/agent-world-model-research/)阅读。

## References
- [GLM-5 论文][paper1-url]
- [GLM-5 GitHub][links-1]


[paper1-url]: https://arxiv.org/abs/2602.15763
[links-1]: https://github.com/zai-org/GLM-5
