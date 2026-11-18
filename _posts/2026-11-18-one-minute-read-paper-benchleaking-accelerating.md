---
layout: post
title:  "一分钟读论文：《榜单第一可能是背出来的》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/benchleaking-anti-hack-scores.svg
image_alt: "ERNIE-5.5-Flash-Base 原始分与 Anti-Hack 分对照：HumanEval 100.00 对 3.66，20 基准均值 85.17 对 68.55。"
tags: [LLM, Benchmark, Evaluation, OpenSourceModels, MachineLearning]
description: "Xinxu AI 与 GAIR 预印本探针四款开源基座模型：ERNIE-5.5-Flash-Base 背出 96.3% 的 HumanEval 题目含参考实现，判零后 20 基准均值从 85.17 掉到 68.55，排名反转。"
---

Xinxu AI 与 GAIR 预印本[《Benchleaking Is Accelerating》][paper1-url]探针 4 款开源基座模型：ERNIE-5.5-Flash-Base 背出 96.3% 的 HumanEval 题目，判零后 `20` 基准均分 `85.17` 掉到 `68.55`，排名反转。

## 背题率：四个模型差了一个量级

**探针方法是 few-shot 续写**：给基座模型几道测试题开头让它续写，输出若复现未见于输入的测试题，即按论文自定义匹配规则判为"泄漏"。按全文版口径，ERNIE-5.5-Flash-Base 被判泄漏的题目占比为：HumanEval `96.3%`、OpenBookQA `85.4%`、GSM8K `80.1%`、GPQA-Main `34.6%`。这些是被判泄漏的题目占比，不是模型准确率。最扎眼的细节：命中题连参考实现一起背出，逐字复现了题目原文的拼写错误 `examble`。对照组差距悬殊：MiMo-V2.5-Base 为 `73.8%`，DeepSeek-V4-Flash-Base 为 `9.1%`，Hy3-preview-Base 为 `6.7%`，后两者在该探针下未泄漏完整的 OpenBookQA 或 GPQA-Main 题目。

## 把背出来的题判零分，排名就反转

**Anti-Hack 分的定义必须写全**：被判泄漏的题目直接记零分，分母保持原测试集规模不变，而不是删题重算。这套规则下 ERNIE-5.5-Flash-Base 的 HumanEval 从 `100.00` 掉到 `3.66`，OpenBookQA 从 `98.60` 掉到 `14.20`，GSM8K 从 `91.21` 掉到 `17.21`；`20` 基准均值从 `85.17` 掉到 `68.55`，掉 `16.6` 分。MiMo-V2.5-Base 的 `20` 基准均值掉 `5.0` 分，HumanEval 从 `98.78` 掉到 `25.76`；泄漏少的 DeepSeek-V4-Flash-Base 与 Hy3-preview-Base 均值只掉 `1.5` 分和 `1.3` 分。上述掉分均为 `20` 基准均值口径，与单基准掉分不可混用；论文据此把四款分成两组：泄漏少的两款几乎不掉分，说明强基座拿高分并不必然依赖背题，泄漏重的两款则被这一刀戳出水分。

![ERNIE-5.5-Flash-Base 原始分与 Anti-Hack 分对照：HumanEval 100.00 对 3.66，20 基准均值 85.17 对 68.55]({{ site.baseurl }}/assets/images/benchleaking-anti-hack-scores.svg)

**掉的分是"扣掉疑似泄漏题后的分"**，不是模型能力只有 `3.66`。排名反转仅限四款被测模型：ERNIE-5.5-Flash-Base 原始均值最高、Anti-Hack 均值垫底，不构成全行业榜单失真。站内[《代码会写，接着写不会》][links-2]讨论的是自建基准的分数解释，那类解释同样默认测试集没被背过。

## 这份预印本，还不能当判决书

**方法学诚实边界有三条**。第一，few-shot 续写命中只能证明"背得出"，不能证明训练语料确实含有该测试集，论文自己的措辞也是 suggesting（推测语气），而非训练数据实证。第二，命中判定依赖作者自定义的匹配严格度，附录给出 L1、L2、L3 三档规则，档位不同结论强度不同；WinoGrande 的命中被论文标注可能来自孪生句构造而非真泄漏。第三，Anti-Hack 属惩罚式重算，对恰好背过题但仍会做的模型是过度惩罚，论文自认这一度量设计偏保守。另外，摘要里的 `23%` 转引自 Schaeffer and Räuker (2026)，属他人研究，不是本文实验产出。

**利益相关同样要摆出来**。这是未评审预印本（提交于 `2026-11-16`），作者 Xinxu AI 与 GAIR 为非高校机构；GAIR 长期以榜单评测为业务，这次批评的四款模型对象全是中国厂商的开源基座模型（百度 ERNIE、小米 MiMo、腾讯 Hy3、DeepSeek），被评方无法在同一篇里答辩。论文给出的仓库地址 `github.com/GAIR-NLP/Benchleaking` 实测返回 `404`，独立复现暂时无从谈起；`96.3%` 目前更适合作为待复现信号，还不能下定论。

## References
- [Benchleaking Is Accelerating (arXiv:2611.21315)][paper1-url]
- [论文 HTML 全文][links-1]
- [站内：代码会写，接着写不会][links-2]


[paper1-url]: https://arxiv.org/abs/2611.21315
[links-1]: https://arxiv.org/html/2611.21315v1
[links-2]: {{ site.baseurl }}/one-minute-read-paper-multi-step-swe-long-horizon/
