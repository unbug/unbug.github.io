---
layout: post
title:  "一分钟读论文：《Function-Aware Fill-in-the-Middle 作为编码 Agent 基础模型的中期训练》"
author: unbug
categories: [AI, Engineering]
image: assets/images/fim-mid-training-coding-agent-foundations.svg
tags: [fill-in-the-middle, mid-training, coding-agents, tool-use-inductive-bias, self-supervised-learning]
---

阿里巴巴达摩院和宾夕法尼亚大学合作的一篇论文[《Function-Aware Fill-in-the-Middle as Mid-Training for Coding Agent Foundation Models》][paper1-url]（arXiv:2607.12463）提出了一种面向编码 Agent 基础模型的中期训练方法。通过在从 968 个 GitHub 仓库抽取的 2.6B token 去污染语料上进行自监督中期训练，该方法将函数调用模式映射到代码填充任务中，实现了工具调用归纳偏置的内化。在 SWE-Bench-Verified 上，7B、14B 和 Qwen3-8B 模型分别获得 +2.8、+3.0 和 +3.2 的绝对提升；SWE-Bench-Lite 上的提升更为显著，分别为 +3.7、+4.0 和 +5.4。

## FIM Mid-Training 核心原理

编码 Agent 的核心运行模式是 action-observation-continuation（AOC）循环：Agent 执行动作、观察环境反馈、然后基于反馈决定下一步行动。论文的关键洞察在于，这一循环在结构上完全等价于函数调用站点——动作对应函数调用，观察对应返回值，继续对应调用后的代码续写。

FIM Mid-Training 采用三段式掩码策略：将一段代码分为前缀（prefix）、掩码部分（mask）和后缀（suffix）。前缀提供上下文线索，包括导入语句、类定义和相邻函数的签名信息；后缀提供目标约束，包括函数调用后的使用方式和返回值处理逻辑。模型需要预测中间的掩码内容。当掩码部分恰好覆盖函数调用的关键站点时，模型被迫学习函数签名与调用上下文之间的深层关联。

这种训练方式不需要任何人工标注的工具调用指令数据。模型在标准的自监督语言建模目标下，通过预测被掩码的代码片段来自然习得函数调用的结构感知能力。

## 掩码选择策略与实验效果

FIM Mid-Training 不是随机选择要掩码的代码片段——它通过两个严格的标准来选择：程序依赖图（PDG）分析和复杂度可推断性。

程序依赖图分析确保被掩码的函数在代码结构中处于关键位置。一个函数的 PDG 节点包括数据依赖边和控制依赖边，FIM Mid-Training 优先选择那些在 PDG 中具有较高中心性的函数——这些函数通常是整个程序逻辑的核心枢纽。复杂度可推断性标准则确保被掩码的函数具有足够的学习信号：给定前缀和后缀上下文，模型必须通过推理而非记忆来推断出正确的函数签名和参数类型。

双重标准的组合效果是只选择那些既在程序结构中关键、又具有合理推断难度的函数进行掩码。语料从 968 个 GitHub 仓库抽取，总计 2.6B token，经过严格的去污染处理——确保训练数据与评估基准之间没有重叠。中期训练的模型包括 Qwen2.5-Coder-Instruct 的 7B 和 14B 版本，以及 Qwen3-8B。

实验在两个后训练管线（R2E-Gym 和 SWE-Smith）上均得到验证，说明中期训练的增益是一种通用的能力增强机制。一个重要的发现是 FIM Mid-Training 缓解了 agentic 后训练对非 Agent 编码能力的退化——传统上，当模型经过大量的工具调用指令微调后，其纯代码生成能力往往会下降，而中期训练通过内化函数调用的结构感知能力保护了模型的编码基础能力。

## References


[paper1-url]: https://arxiv.org/abs/2607.12463
[links-swebench]: https://github.com/swe-bench/SWE-bench
[links-r2e-gym]: https://github.com/your-org/r2e-gym
[links-swe-smith]: https://github.com/your-org/swe-smith
