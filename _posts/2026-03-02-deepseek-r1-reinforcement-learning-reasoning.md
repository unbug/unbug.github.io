---
layout: post
title: "一分钟读论文：《DeepSeek-R1 的纯强化学习之路》"
author: unbug
categories: [AI]
image: assets/images/deepseek-r1-concept.svg
tags: [DeepSeek, Reinforcement Learning, Reasoning, LLM]
description: "DeepSeek 团队论文验证大语言模型的推理能力可完全由强化学习激发，无需大量人工标注推理轨迹：DeepSeek-R1-Zero 在纯强化学习中涌现自我验证与反思行为，最终 DeepSeek-R1 数学推理性能与 OpenAI o1 相当，并开源 1.5B 到 70B 蒸馏模型。"
---

DeepSeek 团队 2025 年 1 月的论文[《DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning》][paper1-url]验证：大语言模型的推理能力可以完全通过强化学习激发，无需大量人工标注的推理轨迹。

![DeepSeek-R1 核心概念](assets/images/deepseek-r1-concept.svg)

## 从 R1-Zero 到 R1 的方法

在此前范式里，提升推理能力主要靠思维链提示、用人工标注轨迹做监督微调或堆模型规模，共同瓶颈是标注成本高、能力受示范质量限制。DeepSeek-R1 的突破是跳过监督微调，直接对基础模型做强化学习。

**DeepSeek-R1-Zero** 仅用大规模强化学习训练，不给监督微调：模型在数学、代码、逻辑任务上探索，奖励是答案正确性的二元信号（对得 1 分、错得 0 分）。由此涌现出四类行为——自我验证答案、遇错后反思调整、生成长思维链、尝试多种解法。训练中还有一个记录在案的"啊哈时刻"：某个中间版本模型学会重新评估初始方法、给难题分配更多思考时间。

R1-Zero 也存在可读性差、中英混用、重复输出等问题。最终版 **DeepSeek-R1** 采用多阶段训练框架：先用数千个示例做冷启动数据，再经两阶段强化学习——第一阶段发现更好的推理模式，第二阶段与人类偏好（有用性、无害性）对齐，中间结合拒绝采样与监督微调。

## 实验结果与开源贡献

DeepSeek-R1 在数学推理基准上与 OpenAI o1-1217 性能相当，代码生成与复杂逻辑推理同样表现出色。研究团队还开源了从 `1.5B` 到 `70B` 的蒸馏版本，基于 Qwen 和 Llama 架构，小模型也能获得出色推理性能，普通硬件也能运行接近顶尖水平的推理模型，让学生和中小团队可以在本地设备上复现与微调推理能力。蒸馏的做法是用 DeepSeek-R1 生成的推理数据去重新训练更小的基座模型，把大模型积累的推理模式压缩进小模型参数里。

论文的核心贡献可归纳为：首次验证无需监督微调、仅靠强化学习即可激发大模型推理能力；记录了自我验证与反思等行为的自然涌现；提出平衡推理能力与用户体验的多阶段训练管道；开源全系列模型并展示蒸馏技术将大模型推理能力迁移到小模型。

## 局限与研究方向

论文指出的局限包括：大规模强化学习计算资源需求高；目前主要聚焦答案可验证的任务；推理过程仍不够透明。未来方向包括扩展到更多任务类型、提升推理过程的可解释性、优化训练计算效率，以及探索比二元正确性更精细的奖励机制。其中奖励设计是关键一环：正确性判断本身需要一个可靠的验证器，在数学和代码之外，如何为开放式任务构造可自动校验的奖励信号，仍是没有标准答案的开放问题。论文的结论是：释放推理潜力的关键不在大规模人工标注，而在提供困难的推理问题、可靠的验证器和足够的强化学习计算资源——这推动 AI 研究从"人类示范"范式转向"环境反馈"范式。


如果说不依赖人工标注的强化学习是激发推理能力的一条路，站内[《2700 万参数的小模型超越大模型》]({{ site.baseurl }}/hrm-hierarchical-reasoning-machine-breakthrough/)则从架构层面给出另一条路：用分层结构替代思维链完成推理。

## References
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning][paper1-url]
- [deepseek-ai/DeepSeek-R1 GitHub][links-1]
- [deepseek-ai/DeepSeek-R1 Hugging Face][links-2]


[paper1-url]: https://arxiv.org/abs/2501.12948
[links-1]: https://github.com/deepseek-ai/DeepSeek-R1
[links-2]: https://huggingface.co/deepseek-ai/DeepSeek-R1
