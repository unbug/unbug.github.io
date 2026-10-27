---
layout: post
title:  "一分钟读论文：《研究 Agent 把证据磨得太光滑》"
author: unbug
categories: [AI, Safety]
image: assets/images/claim-smoothing-research-agents.svg
tags: [llm, ai-agents, deep-research, evaluation]
description: "纽约大学预印本把研究 Agent 将冲突证据压成自信叙事的偏差命名为 smoothing：在 7 个系统 4 个数据集上，每个系统至少 25% 的结论超出引文所能支持的程度，Gemini 重度平滑率 22-35% 最严重。"
---

纽约大学（New York University）的论文[《Quantifying Claim Smoothing by LLM Research Agents》][paper1-url]（arXiv:2610.35793）给深度研究 Agent 的一种系统性偏差起了名字：smoothing（平滑化，指把彼此冲突、条件各异的来源压成单一叙事时，丢掉证据的参差感，写出比引用所能支持的大胆得多的结论）。论文在 `7 个系统`、`4 个数据集`上测得：**跨 7 个系统与 4 个数据集，agent 一致地产出强于证据所允许程度的结论**，每个系统至少 `25%` 的结论（claim，指报告中可单独核查的判断句）拿到 `SmoothScore ≥ 3`（`1-5` 分制，分数越高磨得越平）。

![各系统结论平滑率对比：≥3 与 ≥4 两档，Gemini 重度平滑 22-35%]({{ site.baseurl }}/assets/images/claim-smoothing-research-agents.svg)

## 拿证据对账的评分管线

SmoothScore 的做法是先从报告里抽出关键结论，再检索与每条结论相关的证据段落，按高层维度（aspect，指证据分歧所在线索，例如效果、适用条件、对比对象）聚类，最后由 LLM judge 对照证据给每条结论打 `1-5` 分：`1` 表示无平滑，`≥ 3` 为实质性平滑，`≥ 4` 为严重平滑。它查的不是结论真假，而是结论对证据的压缩是否忠实：证据混合就该保留混合，证据范围窄就该收窄范围。传统的逐条事实核查只给出有支持/无支持的二元判断，对综合叙事型结论缺少连续刻度，这条管线把测量拆成结论抽取、证据抽取、维度归纳、证据分配、打分五步。人工校验覆盖了 `73 claims`：两名标注员拿到同一份评分细则盲评，judge 与标注者 1 在 `93%` 的结论上相差 `1` 分以内，与两名标注员之间的相互一致性处于同一量级。

## 系统之间的差距比想象大

重度平滑（`≥ 4`）是系统之间拉开差距的地方。Gemini Deep Research 有 `85-93%` 的结论得分 `≥ 3`，均分 `3.05-3.27`，严重平滑率 `22-35%`，约为其他闭源 agent 的 `3-12` 倍、Sol 的 `13-26` 倍；它引用的文档数约为 Luna 或 Sol 的 `2-5` 倍，报告在所有数据集上都是最长，但更长并不等于压缩得更有效。开源端的 DR Tulu 与 QUEST 约 `59%`/`55%` 的结论 `≥ 3`、`7-23%` `≥ 4`。最干净的是 Luna 与 Sol：至少 `36%` 的结论得分 `= 1`，即完全没有平滑，是其他系统的 `1.5-2.7` 倍。站内[《编码智能体：知道却不说》]({{ site.baseurl }}/one-minute-read-paper-ctxgap-report-gap/)测过报告与真实状态的另一种落差，可作参照。

## 没读过的页面写不出保留

平滑的一个嫌疑犯，是 Agent 根本没读过自己引用的页面。Luna 对 `496` 个引用文档只打开 `95` 个（`19%`），`65` 份报告里 `45` 篇一页未开；Claude Sonnet 5 的打开率只有 `2%`。它们几乎全靠搜索工具截断后的摘录干活，摘录长度中位数只有 `585` 字符，来源正文里的限定条件与反向发现，Agent 大概率从未看到。补救实验给出正面信号：把 SmoothScore 检索出的证据喂回给 Agent 修订报告，ResearcherBench 的专家评分 Luna `+4.4`、Sonnet `+12.0`（均 `p<.001`），补充上下文的体量只有原文档的五分之一到十分之一，效果持平甚至超过直接给全文。

这些数字全部来自论文自测口径，预印本尚未经同行评审；打分依赖 LLM judge，作者也承认在 `≥ 3` 阈值上两名标注员的一致性只有 `κ = 0.62`。方向却是清楚的：报告读起来越像一份笃定的综述，越值得回头核对它引用的页面到底说了什么。站内[《删掉一个前缀，近满分的投毒防御当场裸奔》]({{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/)同样提醒：评估口径本身，就是结论的一部分。

## References
- [Quantifying Claim Smoothing by LLM Research Agents（arXiv:2610.35793）][paper1-url]
- [SmoothScore 代码与数据仓库][links-1]
- [编码智能体：知道却不说（站内解读）][links-2]
- [删掉一个前缀，近满分的投毒防御当场裸奔（站内解读）][links-3]


[paper1-url]: https://arxiv.org/abs/2610.35793
[links-1]: https://github.com/tiasa2/SmoothScore
[links-2]: {{ site.baseurl }}/one-minute-read-paper-ctxgap-report-gap/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/
