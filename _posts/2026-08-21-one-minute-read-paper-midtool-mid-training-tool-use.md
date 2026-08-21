---
layout: post
title:  "一分钟读论文：《MidTool：工具使用需要专门的中间训练》"
author: unbug
categories: [AI, LLM]
image: assets/images/midtool-mid-training-tool-use.svg
tags: [llm, tool-use, mid-training]
description: "Snowflake、华盛顿大学与北卡罗来纳大学教堂山分校构建了 20.3B token 的工具使用中间训练语料 MidTool-Mix，在 Qwen3-4B/8B-Base 上经 SFT+RL 后 BFCLv3、tau2-Bench 与 MCP-Universe 均显著提升，表明工具使用需要专门的中间训练而非仅靠后训练。"
---

Snowflake、华盛顿大学和北卡罗来纳大学教堂山分校合作的论文[《MidTool: Mid-training Data Synthesis for Agentic Tool Use》][paper1-url]提出，智能体工具使用能力需要专门的 mid-training 数据管线，而不是只依赖 post-training。这与站内此前的[《工具调用的苦涩教训》][links-2]不同：那篇对比的是推理时方法（JSON 工具调用与程序化工具调用），本篇是训练数据管线的视角。论文于 2026 年 8 月 20 日提交 arXiv（v1，cs.AI），提交人 Fengqing Jiang，共 8 位作者。核心论点是：工具使用像数学和科学一样，需要专门的 mid-training 数据，而不是全靠 post-training。论文构建了 `20.3B` token 的 mid-training 语料 MidTool-Mix，在 Qwen3-4B-Base 与 Qwen3-8B-Base 上完成监督微调（SFT）与强化学习（RL）后，BFCLv3、tau2-Bench 与 MCP-Universe 三个基准一致提升。

![MidTool mid-training 数据合成与评测框架图]({{ site.baseurl }}/assets/images/midtool-mid-training-tool-use.svg)

## MidTool-Mix：20.3B token 的语料构成

mid-training（中间训练）指预训练完成之后、SFT 之前的继续预训练阶段，用大规模领域数据向 base 模型注入专门能力。论文摘要将这项工作描述为一条开放的语料构建管线：先收集真实 web 文本、PDF 与代码，再从真实工具 API、MCP（Model Context Protocol）skills 与文档工作流生成合成监督信号，两部分混合成 `20.3B` token 的 MidTool-Mix，总量与后文对照实验所用的 Dolmino-20BT 相当；管线按论文 Section 2 分为数据源采集、数据预处理与 agentic 轨迹合成三个阶段。这些合成监督信号在 mid-training 阶段注入 base 模型，为工具调用行为提供训练样本。语料与 mid-trained 模型都在 Hugging Face collection 中发布，abs 页 comments 标注为 Data & Model，可直接复现或扩展。

## 三个基准的一致提升

BFCLv3 overall（Table 3）上，表格依次给出三种配置：SFT 基线、加入 MidTool-Mix 做 SFT、再叠加 RL。Qwen3-4B-Base 的 SFT 基线为 `39.73`，加入 MidTool-Mix 做 SFT 后升至 `50.25`（+10.5），SFT + RL 进一步到 `54.18`；官方 Qwen3-4B 仅 `24.27`，官方 Qwen3-8B 仅 `26.45`。这两行官方发布模型作为参照线，说明不做 mid-training 时，更大的 8B 也追不上 mid-trained 的 4B。也就是说，在 Qwen3 家族的 BFCLv3 overall 上，mid-trained 的 4B 超过了官方 8B，论文 Figure 1 右图给出同一结论。tau2-Bench overall Pass@1（Table 4）上，4B 从 SFT 基线 `8.54` 提升到 MidTool-Mix + SFT + RL 的 `19.96`，约 2.3 倍；8B 从 `10.43` 到 `21.31`。MCP-Universe overall（Table 5）上，4B 的 score / pass rate 从 `13.20 / 1.68%` 升到 `23.80 / 10.06%`，pass rate 约提升 6 倍；8B 从 `15.18 / 3.35%` 到 `25.16 / 9.50%`。对比 SFT 与 SFT + RL 两行，RL 在 BFCLv3 overall 上再提升约 3.9 分；但两个模型 RL 后的 tau2-Bench overall Pass@1 仍在 `20%` 上下。以上数字均取自论文正文 Table 3–5。

## 数据构成比数据量更关键

论文设置了 matched-budget 对照来排除「数据多就好」的解释：Dolmino-20BT（Table 6）是同等规模的通用 mid-training 语料。matched-budget 指两份语料的 token 规模相当，唯一变量是数据构成，因此增益差异可以归因于构成而非规模。该基线的 BFCL overall 仅提升 `+3.4`，MCP-Universe score 反而下降 `-7.8`。相比之下，MidTool-Mix 在同一批基准上带来两位数增益：仅 SFT 就在 BFCLv3 overall 上增加 10.5 分，叠加 RL 后达到 54.18。工具专用的合成轨迹与通用 web 数据的构成差异，比数据量本身更关键；对工具使用能力而言，应先优化构成再考虑扩大规模。

## 能力边界：telecom 与 Web Search

论文实验仅用 Qwen3-4B-Base 与 Qwen3-8B-Base 两个 base 模型验证，结论不能外推到其他模型家族。两个边界需要如实指出。其一，tau2-Bench 的 telecom 子集在 MidTool-Mix + SFT + RL 配置下 Pass@1 仅 `6.36`，远低于 overall 水平；其二，MCP-Universe 的 Web Search 列在所有配置行均为 `0.00 / 0.00%`。论文将后者解读为独立的能力边界而非迁移失败——browser、financial、location 等其他子集均有提升。引用该论文结论时应同时考虑这两个边界。

## References
- [MidTool: Mid-training Data Synthesis for Agentic Tool Use（arXiv）][paper1-url]
- [MidTool 数据与模型 Hugging Face collection][links-1]
- [一分钟读论文：《工具调用的苦涩教训》][links-2]


[paper1-url]: https://arxiv.org/abs/2608.20314
[links-1]: https://hf.co/collections/MidTool/midtool-release
[links-2]: {{ site.baseurl }}/one-minute-read-paper-bitter-lesson-tool-calling/
