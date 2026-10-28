---
layout: post
title:  "一分钟读论文：《把题目改错，模型的推理链纹丝不动》"
author: unbug
categories: [AI, LLM]
image: assets/images/medcot-decorative-reasoning.svg
tags: [llm, reasoning, medical, faithfulness]
description: "TU Eindhoven 与 Dana-Farber 的医疗 CoT 扰动审计发现，14 个模型在临床有意义的破坏性编辑上链条解耦率达 72.9%：诊断全对、答案不翻转，三个独立测试收敛，可见推理链基本没被真正使用。"
---

埃因霍温理工大学（TU Eindhoven）与 Dana-Farber 癌症研究所合作的论文[《Right Diagnoses, Decorative Reasoning: A Perturbation Audit of Medical Chain-of-Thought》][paper1-url]（[arXiv:2608.24790][paper1-url]，2026-08-25 提交）检验了一个很少被直接测试的问题：临床医生把模型输出的推理链当作医学推理的证据，但这条可见的链到底有没有真正参与作答？此前 [《黑盒推理模型的隐藏思维链，正在被一条长度信号读走》][links-1] 处理的是链不可见时的提取问题，这篇处理的正好相反——链就摆在眼前，它被用了吗？

## 30 个临床算子同时改题目和链条

论文的审计方法是一个 30 算子的扰动套件（M-block），用临床动机的算子同时编辑问题和推理链：severity reversal（严重度反转，把轻症描述改成重症）、negation flip（否定翻转，「无家族史」变「有家族史」这类方向性改动）、demographic swap（人口属性替换）与 evidence ablation（证据消融，直接删掉关键依据）等。只改题目不改链、只改链不改题的对照编辑也在套件里，用来区分模型到底是读了题还是读了链。每个编辑后做 chain-update × answer-flip 联合分析：链条有没有登记这个改动，答案有没有跟着翻转，两个维度交叉把每个模型归入不同的失败模式。评测覆盖 `14` 个 LLM（含开源与闭源层）、四个医疗 QA benchmark（MedQA、MedMCQA、PubMedQA 等）。

## 三个独立测试指向同一个解耦

结果上，三个相互独立的测试收敛到同一结论。其一是核心指标 CDR（Chain-Decoupling Rate）：链条没有登记编辑、答案也没有翻转的比例，在临床有意义的破坏性编辑子集上 panel-wide 达 `72.9%`。其二是直接破坏推理链（chain corruption），模型准确率不变；其三是不做 CoT prompting，准确率也不降。两条路都说明可见链对最终答案的贡献很小。两名持证临床医生重标注了 `N=197` 个扰动问题，`98.5%` 的 gold 答案仍然站得住——这一步验证的是扰动本身合理（M-block soundness），而不是模型答得对不对。论文还报告该模式跨医疗/推理微调与规模保持；在闭源层链文本不可得，作者只能看答案侧信号，其表现与同一解耦一致，注意这是间接证据而非对链条的直接测量。

## 装饰性推理意味着什么

「decorative reasoning」是论文对这一解耦现象的定性：诊断全对，但摆出来的推理过程更像事后文档而非计算路径——答案可能来自参数知识或题目模式匹配，链条只是把结论重新讲了一遍。需要强调边界：这个结论限于医疗 QA 场景，不能直接推广到所有 CoT 应用；CDR 也只统计了临床有意义的破坏性编辑子集，不是全部编辑、更不是逐模型结论。对部署侧的含义是，「展示推理」不等于「可审查的推理」：当监管方要求模型给出可检查的过程时，这套 30 算子扰动方法加 CDR 提供了检验链是否忠实的最小工具，论文称这套框架与 CDR 是可复用标尺，可迁移到其他高风险领域的链忠实性审计。

## References
- [Right Diagnoses, Decorative Reasoning: A Perturbation Audit of Medical Chain-of-Thought][paper1-url]
- [一分钟读论文：《黑盒推理模型的隐藏思维链，正在被一条长度信号读走》][links-1]


[paper1-url]: https://arxiv.org/abs/2608.24790
[links-1]: /one-minute-read-paper-echocot-hidden-cot-extraction/
