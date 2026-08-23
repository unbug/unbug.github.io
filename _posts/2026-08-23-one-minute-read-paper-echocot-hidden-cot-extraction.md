---
layout: post
title:  "一分钟读论文：《黑盒推理模型的隐藏思维链，正在被一条长度信号读走》"
author: unbug
categories: [AI, Security]
image: assets/images/echocot-hidden-cot-extraction.svg
tags: [llm, safety, reasoning, model-security]
description: "CISPA 论文发现黑盒大推理模型的隐藏思维链可仅靠 API 交互被提取：攻击者利用 tool call 之间返回的推理长度与摘要信号迭代重放，开源模型上最高 66.4% 的样本通过近逐字保真校验。"
---

德国亥姆霍兹信息安全中心 CISPA（CISPA Helmholtz Center for Information Security）的论文[《EchoCoT: Extracting Hidden Chain-of-Thought from Large Reasoning Models》][paper1-url]证明：仅靠纯 API 交互，就能从黑盒大推理模型（LRM, Large Reasoning Model）中提取其隐藏的思维链（CoT），在开源模型上达到近逐字保真。论文识别出一个此前被忽视的攻击面——tool call 之间由 API 返回的推理元数据（推理长度与 CoT 摘要）构成的"推理回放面"（reasoning replay surface）：攻击者把它当作保真度信号，多步迭代地把目标模型的隐藏 CoT 重放出来。这是一篇攻击论文，代码已开源。

这与[对抗性说服][links-1]一类攻击的定位不同：说服攻击改变模型的答案，EchoCoT 不碰答案——模型照常作答、照常调用工具，被读走的是推理过程本身，也就是模型最核心的思维资产。机制上分两层：信息通道是 API 返回的推理元数据；提取载体则是诱导模型把推理重放进下一次 tool call 的参数。配套的 LLM 优化框架（Inject + Reflect + Distill）自动搜索跨数据集通用的注入轨迹，无需针对每个目标人工设计。攻击面恰好落在 tool call 之间的缝隙里，而[工具调用][links-2]正是大推理模型能力的关键组成部分。

## 开源模型：近逐字提取与跨数据集迁移

在 DeepSeek-V4-Flash、Qwen3.5-Plus、GLM-5.2 三个开源 LRM 上（OpenThoughts 测试集），EchoCoT-LTGO 的 ASR@90 区间为 `30.8%`–`66.4%`，ASR@99 区间为 `22.8%`–`46.1%`（Table 1）。两种口径对应不同保真度阈值：ASR@90 要求长度误差不超过 `10%` 且至少 `90%` 的 token 与目标 CoT 精确匹配；ASR@99 收紧为长度误差 `1%`、匹配率 `99%`。峰值出现在 DeepSeek-V4-Flash：`66.4%` 的样本通过 ASR@90 校验，提取 trace 的长度在目标的 `10%` 以内。

极端案例（Figure 4）更具说服力：目标 CoT `21,106` tokens，提取出 `21,109` tokens，Token-EM（token 精确匹配率）达 `0.999`，`1,132` 行中仅 3 行有差异。同一套优化出的注入轨迹还能迁移到三个未见数据集 MATH500、JEEBench、LiveCodeBench，ASR@90 最高达 `80%`（DeepSeek-V4-Flash 在 MATH500，Table 7），说明学到的是通用重放策略而非对单一数据集的过拟合。

## 闭源前沿模型：长度贴近，无法逐字对照

对五个闭源前沿 LRM（Gemini-2.5/3.1/3.5、Sonnet-4.6、Opus-4.6），EchoCoT 的工具调用率达 `95%`–`100%`；目标模型对至少 `87.8%` 的问题返回 CoT 摘要，仅 Opus-4.6 为 `31.5%`（Table 4）。提取出的 trace 长度贴近 API 报告的目标长度：Gemini-2.5 上提取 `23,429` tokens、目标 `18,568`；Gemini-3.5 上提取 `17,645`、目标 `18,119`。极端案例（Figure 1）中，从 Gemini-2.5 提取出 `33,463` tokens 的 CoT，API 报告的目标长度为 `32,948`。

这里必须明确口径边界：闭源模型没有 ground-truth CoT 可供 token 级对照，结论只能落在"长度贴近目标 + 语义对齐"层面，不能表述为逐字提取；"近逐字"仅适用于有对照的开源侧。

## 防御评估：根因解与残余缺口

在 `100` 条 OpenThoughts 随机样本上（Table 6），无防御时平均 ASR@90 为 `46.0%`（DeepSeek `66.0` / Qwen `24.0` / GLM `48.0`）。移除 reasoning state 后三个模型全部归零，证明攻击根因就在 API 返回的推理元数据——但这是需要 API 提供方配合的根因解。实用防御中最强的是防御性 system prompt：平均 ASR@90 从 `46.0%` 降到 `5.0%`；可一旦攻击者自适应重优化注入轨迹，均值回升到 `9.7%`，DeepSeek 上仍达 `29.0%`。完整移除长度字段可压到 `12.0%`–`15.0%`，长度混淆（扰动范围从 `0-10%` 扩到 `20-30%`）使均值从 `17.0%` 降到 `13.0%`。

结论应落在两点：风险真实存在，且现有实用防御有残余缺口；同时不能外推为"所有推理模型都脆弱"——开源侧仅测了三个模型，Qwen 无防御 ASR@90 只有 `24.0%`，闭源侧的结论也只在长度保真层面。

## References
- [EchoCoT: Extracting Hidden Chain-of-Thought from Large Reasoning Models（arXiv:2608.20055v1）][paper1-url]
- [代码仓库：TrustAIRLab/EchoCoT][links-3]


[paper1-url]: https://arxiv.org/abs/2608.20055
[links-1]: {{ site.baseurl }}/one-minute-read-paper-persuade-adversarial-rl-belief-collapse/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-bitter-lesson-tool-calling/
[links-3]: https://github.com/TrustAIRLab/EchoCoT
