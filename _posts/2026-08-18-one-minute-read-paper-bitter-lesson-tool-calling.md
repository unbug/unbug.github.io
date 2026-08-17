---
layout: post
title:  "一分钟读论文：《工具调用的苦涩教训》"
author: unbug
categories: [AI, LLM]
image: assets/images/bitter-lesson-tool-calling.svg
tags: [llm, tool-use, benchmark]
description: "普华永道美国团队在 BFCL v4 上用 14 个模型对比 JSON 工具调用与程序化工具调用：PTC 在 11/14 的模型上持平或更优、长链任务领先 18.8%，但全模型宏平均反而略低，优势随模型代际而非厂商分化。"
---

普华永道美国（PricewaterhouseCoopers U.S.A.）的论文[《The Bitter Lesson of Tool Calling》][paper1-url]（v1 提交于 `2026` 年 `8` 月），在伯克利函数调用基准（Berkeley Function-Calling Leaderboard，BFCL）v4 上用 `14` 个模型系统对比了两种工具调用范式：JSON tool calling（模型输出 JSON 函数调用）与 programmatic tool calling（PTC，模型写 Python 代码调用类型化 stub）。核心发现是 PTC 在 `11/14` 的模型上持平或更优、长链任务领先 `18.8%`，但全模型宏平均反而略低——优势随模型代际而非厂商分化。

## 两种范式与实验设置

JSON tool calling 是主流大语言模型 API 的原生接口：模型每轮输出一个 JSON 函数调用，执行结果回填后再进入下一轮推理，工具序列的每一步都对应一次独立的模型往返。PTC 则让模型直接写一段 Python 代码，通过类型化 stub（带签名约束的占位函数）在程序内循环、条件分支地调用工具，整段代码一次性生成并整体执行。BFCL v4 是评估大语言模型函数调用与工具使用能力的基准；实验取其 `309` 条代表性子集与 `8` 个任务类别，覆盖 `2024` 年 `11` 月至 `2026` 年 `7` 月发布、跨厂商与代际的 `14` 个模型。需要强调：BFCL v4 使用 echo-return stub——函数原样返回参数、不执行真实 API，因此测的是**参数序列化准确率**，不是端到端工具执行正确性。本站此前报道的 [CodeAct 智能体执行范式雷达]({{ site.baseurl }}/paradigm-radar-codeact-agent-execution/) 记录了微软将代码作为智能体执行接口的产品化动向，本篇是该路线在基准层面的量化补充。

![两种工具调用范式对比：JSON tool calling 与 PTC 在 BFCL v4 上的关键数字]({{ site.baseurl }}/assets/images/bitter-lesson-tool-calling.svg)

## 优势从哪里来

PTC 的收益集中在三类场景。**链式任务**：链条长度达到 `12` 步以上时，PTC 较 JSON tool calling 拉开 `18.8%` 的绝对差距，短链无此效应；原因是 JSON 范式每个环节多一次推理回合，往返开销随链条累积，而 PTC 在一段程序内完成全部调用。**并行扇出**：JSON tool calling 超过一定阈值后直接丢弃工具调用（阈值因模型而异，Claude Sonnet 5 的为 `N=70–72`），PTC 在 `N=100` 仍保持 `100%` 枚举准确率，暴露了原生范式的结构性硬上限；并行场景 PTC 在 `14` 个模型中 `13` 个持平或更优。**上下文污染**（context flooding）：向上下文注入大量无关内容后，PTC 平均绝对提升 `5.5%`，JSON 基线平均退化 `2.3%`，文件系统发现式对比方法退化 `32%`。模型代际上，GPT-5.6 家族收益最大：GPT-5.6-Sol 与 GPT-5.6-Terra 各自较自身 JSON 基线绝对提升 `10.6%`，OpenAI 最新三个 GPT-5.6 变体全部为正（`+4.2%` 至 `+10.6%`），而三个旧模型未达持平线。

## 边界与成本取舍

PTC 并非全面胜出。全模型宏平均上 PTC 反而略低：BFCL v4 主评测 JSON `78.6%` vs PTC `77.0%`，差距主要由三个 OpenAI 旧模型（GPT-4o、GPT-4.1、GPT-5.4-mini）在并行类别的 `\n` 编码失败驱动；「持平或更优」是逐模型口径，两种口径方向相反。成本上，链式消融中 PTC 输入 token 为 JSON tool calling 的 `1.5` 倍，高扇出时该开销反转；输出 token 两范式无差异，PTC 属以固定输入开销换取长链与高扇出收益的取舍。此外，消融样本量较小（每条件 n=`31–52`），单模型结果置信区间宽，只有跨模型聚合模式可可靠解读；论文明确将 echo-return stub、消融样本量小与 PTC 的固定输入 token 开销列为自身局限。

## References
- [The Bitter Lesson of Tool Calling（arXiv:2608.06370v1）][paper1-url]


[paper1-url]: https://arxiv.org/abs/2608.06370
