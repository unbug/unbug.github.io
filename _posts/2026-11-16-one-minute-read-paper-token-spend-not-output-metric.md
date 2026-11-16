---
layout: post
title:  "一分钟读论文：《工程师的 token 花费衡量了什么？》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/token-spend-not-output-metric.svg
image_alt: "左面板：commit 数相近的周里，花费第 90 百分位是第 10 百分位的 39 到 240 倍；右面板：产出与工作指标只能解释工程师之间 38% 的花费差异、个体周内的 13%。"
tags: [developer-productivity, ai-coding-agents, telemetry, metrics]
description: "卡内基梅隆大学、JetBrains 等团队对 404 名工程师的 5 周遥测研究：花费衡量使用强度而非产出，用它考核工程师并不成立。"
---

卡内基梅隆大学、JetBrains 与加州大学尔湾分校的预印本论文[《The AI Era's Lines of Code?》][paper1-url]对 `404` 名工程师 `5` 周的编码代理 token 花费与提交记录做了案例研究：token 花费衡量的是使用强度，不是工作的产出与价值。

## 同一产出，花费差 39 到 240 倍

**产出相近的周，花费天差地别**。研究窗口（2026-05-10 至 2026-08-08）内有 `584` 名工程师提交过代码，分析对象是其中 `404` 人在 `5` 个完整周（2026-06-29 至 2026-08-02）的遥测。在 commit 数相近的周里，花费的 `90` 百分位是 `10` 百分位的 `39` 至 `240` 倍。反向的弹性同样平淡：within an engineer，花费翻倍约对应 `10%` 更多 commit；反过来，commit 翻倍的周，token 只比本人常态多约五分之一。

![commit 数相近的周里花费 P90/P10 差 39 到 240 倍；产出指标解释花费差异 between 38% / within 13%]({{ site.baseurl }}/assets/images/token-spend-not-output-metric.svg)

## 三种弹性口径，互相打架

**花费与产出的弹性，三个口径给出三个答案，分歧本身就是这条指标不可靠的证据**。本论文 within-engineer（同一工程师个体内）斜率折算的产出弹性约为 `35%`，置信区间 `[7%, 109%]`，上界过百；针对强制目标的外部研究上限是产出最多多 `76%`（at most 76%）；商业分析厂商 Jellyfish 的口径则是 `10` 倍花费对应约 `40%` 更多产出——这是厂商口径。产出侧的解释力也弱：可用工作指标只能解释工程师之间 `38%`、个体周内 `13%` 的花费差异，保留集上不到五分之二的 between 差异；"是哪位工程师"本身解释 `79%` 的周花费波动。作者还给出上界：最多五分之一（up to two fifths）的花费不随当周 commit 波动——这是上界而非浪费率，其中含用代理的固定成本和手写 commit 背后的花费。问卷侧，近九成的技术岗评测回答显示，受访者把代理用在编码之外的工作上，例如分析、调研与规划。

## 相关不是因果，数据也不是公开的

**作者反复声明估计口径**。论文原话转述：因为工程师自己决定用多少代理，所有估计都是相关关系（correlation），不是因果效应（causal effect）；这个估计也不等于强加预算或指标会带来什么。利益相关必须交代：`7` 位作者中 `5` 位是数据方 JetBrains 员工，CMU 与 UC Irvine 为学术方，属公司数据、部分作者为公司员工的公司案例研究，而非第三方独立审计；另有两处内在断点——`412` 份内部问卷无法与个人遥测关联，原始数据不可公开、匿名记录需签 NDA 向 JetBrains 作者申请。复现仓 `CMUSTRUDEL/token-study-replication` 只含分析代码、不含数据（`2026-10-24` 创建、无 license、`stars` 为 `0`），第三方独立复现目前无法完成。站内 [《你的 AI 智能体，烧掉多少钱是白花的？》][links-2] 算的是推理期 token 剪枝的成本账，这期算的是人的花费该不该被考核，两者角度不同。

## 作者的落地建议

**token 花费最多做资源记账**。作者的落地建议：不要用花费考核工程师的产出；既然产出涨幅远小于花费涨幅，不要指望给工程师设花费目标能拉升产出，也不要把花费除以 commit 或 PR 数量当作效率指标来算账。

## References
- [The AI Era's Lines of Code? (arXiv:2611.13396)][paper1-url]
- [复现仓 CMUSTRUDEL/token-study-replication][links-1]
- [站内：token 浪费剪枝][links-2]


[paper1-url]: https://arxiv.org/abs/2611.13396
[links-1]: https://github.com/CMUSTRUDEL/token-study-replication
[links-2]: {{ site.baseurl }}/one-minute-read-paper-agent-token-waste-pruning/

