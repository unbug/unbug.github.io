---
layout: post
title:  "一分钟读论文：《删掉一个前缀，近满分的投毒防御当场裸奔》"
author: unbug
categories: [AI, Security]
image: assets/images/rag-defense-benchmark-shortcut.svg
tags: [rag, safety, evaluation, retrieval-augmented-generation]
description: "华盛顿州立大学等机构论文发现：RAG投毒防御基准把目标问题原样拼在毒文档前，删掉这个前缀后RAGuard的AUROC从0.953跌到0.758，近满分检测测的是拼接痕迹而非投毒。"
---

North Creek High School 与 Washington State University 两位作者署名的论文[《Ranking Is Not Deciding: Benchmark Shortcuts and Operating-Point Collapse in Query-Time RAG Poisoning Defenses》][paper1-url]（arXiv:2610.33849，2026-10-24 提交）指出：RAG 投毒防御论文里的近满分检测率，很可能测的不是投毒本身，而是毒文档的构造痕迹——PoisonedRAG 官方代码把目标问题原样拼在每条注入文本前面。

只做一件事：删掉这个前缀，已发表防御 RAGuard（Cheng 等人的查询时过滤方法）的 AUROC（衡量排序区分能力的指标）从 `0.953` 掉到 `0.758`，漏检率从 `0.191` 涨到 `0.763`，而 `0.93` 的毒文仍能被检索到。这与站内另一篇[《低攻击成功率掩盖了什么？》]({{ site.baseurl }}/one-minute-read-paper-ignored-not-refused/)是同一类问题的两面：那篇打的是攻击成功率这类攻击侧指标的失真，本篇打的是防御侧检测指标的失真。

![删前缀前后：AUROC 不动、部署阈值漏检率崩塌]({{ site.baseurl }}/assets/images/rag-defense-benchmark-shortcut.svg)

## 考卷把答案印在了题目上

RAG（Retrieval-Augmented Generation，检索增强生成）把语料库变成攻击面：能往库里插文本的攻击者就能操纵回答。论文转引 PoisonedRAG 原文的结论是，每个目标问题只需 `5` 条注入文本即可达成 `90%` 以上的攻击成功率。主流应对是查询时过滤器：生成前逐篇判断检索文档能否进入上下文。

问题出在评测怎么造毒。PoisonedRAG 的发布代码（`src/attack.py`）把每条注入文档生成为"目标问题＋句号＋文本"，防御论文直接跑这个代码评测，等于让过滤器做"找出带题目的那份卷子"。论文实测：某第三方复现释放的毒文里，`500 of 500` 条包含目标问题原文。按该文自述的 survey 口径（作者自建表 II 的统计，非第三方独立审计），`21` 个已发表防御评估中 `8` 个可验证地在用这种含问题毒文构造，`5` 个换用了长度或重复线索——比如把片段重复 `2–10` 次，或毒文 `119–162` 词对干净文档固定 `100` 词，光数词数就能到 AUROC `0.999`；另有 `12` 个不报告部署阈值下的假阳率。

## 删掉前缀、补上长度，决策当场死亡

在 `4` 个语料库（NQ、医疗、金融、法律）、`4` 个攻击族、`10` 个逐文档防御的同一共享候选集上，两个控制实验撕开了口子。其一，对 NQ 上攻击作者自己的毒文只删问题前缀：毒文检索率保持 `0.93`，RAGuard 的 AUROC 从 `0.953` 跌到 `0.758`。其二，把医疗毒文用乱序词填充到干净文档长度——内容信息清零——TrustRAG 的集合级漏检率从 `0.000` 涨到 `0.827`；论文自己的学习打分器漏检率从 `0.000` 涨到 `0.986`（对齐 `5%` 假阳率后仍有 `0.321`），而 AUROC 停在 `0.953` 不动，进入上下文的毒文占比从 `0.00` 升到 `0.94`。用论文原话说，The ranking survives; the decision does not——排名还在，决策已死：只看 AUROC 的报表分不清这两件事。另一个细节：前缀本身还撑着检索，Contriever top-5 中含毒文档在有前缀时平均 `4.79` 条（`86 of 100` 个查询五条全中），删掉后只剩 `2.40` 条。

## 这不证明防御无用，但证明报表要改写法

论文明确划了边界：逐字写道 we propose no defense，不提出任何防御；其自有打分器被自适应攻击者以 `0.977` 的毒文过检率击穿；结论只适用于上述共享候选集的受控实验，不涉及真实部署，也不意味着所有 RAG 防御都失效。医疗格子里毒文包含问题且长度出格时，`8` 个打分系统中 `4` 个漏检为 `0.000`——饱和恰恰出现在线索最强处。论文给出的可操作建议是：检测结果只有在同时报告毒文构造画像（问题原文包含率、长度重叠度）和实际部署阈值的假阳率时才算证据；论文另一处实测显示，防御 DRS 的阈值校准方式可使其医疗库假阳率从 `0.945` 变 `0.035`，阈值校准本身也在左右结论。

## References
- [Ranking Is Not Deciding: Benchmark Shortcuts and Operating-Point Collapse in Query-Time RAG Poisoning Defenses][paper1-url]
- [PoisonedRAG: Knowledge Corruption Attacks to Retrieval-Augmented Generation of Large Language Models][links-1]
- [站内：一分钟读论文：《低攻击成功率掩盖了什么？》][links-2]


[paper1-url]: https://arxiv.org/abs/2610.33849
[links-1]: https://arxiv.org/abs/2402.07867
[links-2]: {{ site.baseurl }}/one-minute-read-paper-ignored-not-refused/
