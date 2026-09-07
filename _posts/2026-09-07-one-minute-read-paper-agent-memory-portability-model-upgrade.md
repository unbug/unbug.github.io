---
layout: post
title:  "一分钟读论文：《记忆库原封不动，Agent 为何照样失忆》"
author: unbug
categories: [AI, LLM]
image: assets/images/memory-portability.svg
tags: [llm, agent, memory, knowledge-graph]
description: "对照实验显示 Agent 换模型后记忆库原封不动也会失忆：笔记迁移精度随方向摆动 +9.91 或 -13.28 个百分点，固定 schema 知识图谱几乎零损耗。记忆的持久性取决于表示格式，保留原始历史才能修复。"
---

Ankit Goyal 与 Jaideep Ray 合作的论文[《Does Your Agent's Memory Survive a Model Upgrade? A Controlled Study of Memory Portability》][paper1-url]（arXiv:2609.05339，2026-09-04 提交）给出一个反直觉结论：模型升级是常态运维，而 Agent 的记忆库即使原封不动也照样会"丢"。固定 schema 的知识图谱（KG-fixed）迁移几乎零损耗，换写入模型后精度仅变化 `+0.0004 ± 0.0020`；由模型压缩写成的自然语言笔记（NOTES）则与模型强耦合，精度随迁移方向摆动 `+9.91` 或 `-13.28` 个百分点。记忆的持久性取决于表示格式，而不是存储本身。

## 实验设计：历史逐字保留，只换记法

实验控制单一变量：同一段对话历史逐字保留，只把记忆做成四种表示——LC-RAW（原文全量放进长上下文直接读）、RAG（分块后按向量相似度检索）、NOTES（模型把历史压缩成自然语言笔记）、KG-fixed（归一化为固定 schema 的知识图谱）。规模为 `48` 条合成历史，答案代码随机化，采用 exact scoring（精确匹配评分），读写两侧使用两个参数量低于 10B 的开源权重模型。写入记忆的 writer 模型与读取的 reader 模型可分别替换，以此隔离"换模型"这一件事本身的影响——历史内容一个字没变，变的只有记法与读写它的模型。

## 迁移与损失：格式决定在哪一环丢

固定 schema 的结构转移最可靠：KG-fixed 在换掉 writer 模型后，精度变化仅 `+0.0004 ± 0.0020`。NOTES 表现出强烈的模型耦合，且方向不对称——按具体迁移方向不同，精度或升 `+9.91` 个百分点、或降 `-13.28` 个百分点，升级不保证更好，换错方向反而更糟。RAG 的损耗出在 embedding 版本上：新旧向量各占一半（50/50）的混版索引只拿到 `4.96` 分提升，而全量 re-embedding 的提升为 `11.90` 分——半途迁移等于放弃了大部分本可获得的收益。

诊断分解进一步把损失归到不同环节：NOTES 的精度损失有 `80%`（`0.467 ± 0.014`）源于初始构建时就丢失了信息，RAG 的损失有 `81%`（`0.364 ± 0.012`）源于检索失败。修复实验直接支持一个朴素做法：只动记忆库、不动模型的 store-only 修复在全部 `48` 例中都未达到 90% 的恢复目标；而保留原始历史时，在一个被测方向上 `34/48` 例成功恢复。换言之，笔记本身坏了很难就修笔记，找回原始证据重写才有效。这一结果与 [《长程 Agent 记忆中的压缩悬崖》][links-1] 形成互补：压缩悬崖说明运行期摘要会侵蚀已存事实，本文说明模型升级会让旧笔记对新模型失效——记忆工程的瓶颈正从"存得下"转向"换得起"。

## 质疑与边界条件

结论有几点必须打折扣。其一，实验基于 `48` 条合成历史与 sub-10B 小模型，能否外推到前沿大模型和真实长期记忆仍是未知数，方向不对称本身就说明结论依赖具体模型配对。其二，KG-fixed 的优势可能来自 schema 设计者预先注入的任务相关性，"固定格式赢"未必是格式本身的功劳。其三，exact scoring 对开放任务过于苛刻，NOTES 的真实损失可能被评分方式放大。边界条件同样清晰：论文为预印本、未经同行评审，作者两人且无机构标注，方向性结论只测了两个方向，不能写成普适定律。

## References
- [Does Your Agent's Memory Survive a Model Upgrade? A Controlled Study of Memory Portability（arXiv:2609.05339）][paper1-url]
- [一分钟读论文：《长程 Agent 记忆中的压缩悬崖》][links-1]


[paper1-url]: https://arxiv.org/abs/2609.05339
[links-1]: {{ site.baseurl }}/one-minute-read-paper-compaction-cliff-agent-memory/
