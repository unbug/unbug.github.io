---
layout: post
title:  "一分钟读论文：《字段顺序决定结构税交多少》"
author: unbug
categories: [AI, Engineering]
image: assets/images/structure-tax-field-order.svg
tags: [llm, structured-output, schema, calibration]
description: "AACL IJCNLP 2026 主会接收的 PayPal AI 论文证实，生产系统里 LLM 结构化输出的精度损失不在 JSON 或 XML 格式本身，而在字段顺序：把推理字段排在答案字段之前，两个开权重小模型在 GSM8K 上从 10.98% 回升到 83-87%。"
---

PayPal Artificial Intelligence 的论文[《Structure Tax: How Structured Output affects LLMs Performance》][paper1-url]（arXiv:2610.12056，2026 年 10 月 8 日提交）已被 AACL IJCNLP 2026 主会接收，是本站少见的已过同行评审的论文。

它重审了生产系统里长期被默认接受的「结构税」：强制大语言模型按 JSON 或 XML 这类固定格式作答时的精度损失，不在结构本身，而在字段顺序——把推理字段放到答案字段前面，两个开权重小模型在 GSM8K 数学基准上从 10.98% 回升到 83-87%。

![字段顺序的影响示意：推理字段在前时两个开权重小模型在 GSM8K XML 输出下维持 83-87% 的准确率，答案字段在前时双双跌到 10.98%]({{ site.baseurl }}/assets/images/structure-tax-field-order.svg)

## 结构税此前一直记错了账

「结构税」指强制模型按预定义格式作答所带来的精度下降，结构化输出即模型必须按给定 schema 逐字段填写答案。此前的普遍做法是把这部分损失当作使用 JSON 或 XML 的固有成本接受下来。PayPal AI 团队用五个模型乘以四个数据集的全交叉矩阵重审了这一假设：模型侧是 GPT-4o、Gemini-Flash-2.0、Claude-Sonnet-4.5 三个闭源前沿模型，加上 Llama-3.1-8B 与 Gemma3-4B 两个不同量级、不同家族的开权重模型；任务侧覆盖 GSM8K（应用数学）、MMLU（知识选择题）、LogicBench（逻辑推理）与 Spider（Text-to-SQL）。结果显示，税的高低由字段顺序决定：推理优先的排法——先写推理字段、再写答案字段——在相同任务上匹配甚至超过自由文本输出；真正出事的是答案优先的排法。

## 10.98% 的崩盘需要四个前提

最剧烈的翻转出现在四个条件叠加时：GSM8K 数据集、XML 格式、答案字段排在推理字段之前，开权重的 Llama-3.1-8B 与 Gemma3-4B 双双跌到 10.98%，而同条件下推理优先的排法保持在 83-87%。这个对比数字剥离掉任何一层前提都不成立，引用时必须带上完整的任务、格式、顺序与模型范围。论文同时给出了税的分布规律：格式敏感度与任务自身对答案结构的约束成反比，答案被题目约束得越死的任务，字段顺序能造成的差距越小。针对提示词表面变体的重跑实验显示结果稳定，效应不是某一条提示词的偶然。

## 先落子的答案 token 为什么贵

机制解释很直接：模型是自回归生成，只能逐 token 往后写；答案字段排前面，意味着答案 token 在任何推理内容写出来之前就被落子承诺。等于强迫模型先押注答案，再补写配合该答案的过程。论文把实验中观察到的两种失败模式归到同一个根因：答案承诺发生得太早。推理优先的排法只是恢复了自然顺序——过程先行，答案最后落子。论文还给出内部表征与校准两个层面的证据：按 CKA 相似度分析，推理优先时中间层里答对与答错样本的表征可分性更大；校准误差指标也随之改善，即模型的置信度与其真实答对概率的吻合程度更高。

## 工程师的结论：把字段顺序倒过来

可执行的结论只有一句话：给模型的 JSON schema 里，把推理或依据字段放在最终答案字段之前。不换模型、不增加推理开销，只改字段声明顺序，是一项经过评审验证的免费午餐。这与本站前一天的 [AI 范式雷达第 14 期]({{ site.baseurl }}/paradigm-radar-system-one-models/) 正好互补：雷达讲的是供给端——行业为什么集体转向类型化的决策输出；本文补上使用端——字段怎么排才不会为同样的输出付税。对生产系统必须使用结构化输出的团队来说，问题已经不再是要不要用 JSON，而是 JSON 的字段按什么顺序写。


## References
- [Structure Tax: How Structured Output affects LLMs Performance (arXiv:2610.12056)][paper1-url]
- [论文 PDF 全文][links-1]


[paper1-url]: https://arxiv.org/abs/2610.12056
[links-1]: https://arxiv.org/pdf/2610.12056
