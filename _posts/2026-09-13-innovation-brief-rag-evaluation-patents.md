---
layout: post
title: "AI 智创简报：《RAG 拒答题测试专利成簇，知识库质检是接单活》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-rag-evaluation-patents.svg
tags: [Patent, RAG, Evaluation, DevTools, IndieHacker]
description: "2026 年 4 至 6 月三件 RAG 质量评测专利公开：Salesforce、SAP、通用汽车把知识库问答的拒答能力与置信度打分做成方法。拒答题测试集与上线前质检报告，是独立开发者能接的活。"
---

2026 年 4 至 6 月，三件 RAG（检索增强生成，即先查资料再让大模型作答的架构）质量评测专利接连公开，申请人是 Salesforce、SAP 与通用汽车。大厂在把"知识库问答什么时候该闭嘴"申请成方法；给小团队 RAG 交付物做拒答测试与验收质检的那一层，还空着。

![RAG 评测专利信号与知识库质检接单机会]({{ site.baseurl }}/assets/images/innovation-brief-rag-evaluation-patents.svg)

## 专利信号：三家产业公司给"该不该作答"定方法

- **US20260170067A1**，Salesforce, Inc.，2026-06-18 公开：为任意外部知识库合成"不可回答"请求数据集，评测 RAG 系统能否正确拒答指令含糊、含错误前提、超出库范围等六类问题。
- **US20260111331A1**，SAP SE，2026-04-23 公开：企业 RAG 评测框架，用"问题 + 上下文 + 标准答案"测试集迭代跑评估，直到满足评测阈值才放行。
- **US20260093735A1**，GM Global Technology Operations LLC，2026-04-02 公开：集成检索器对每次输入多路取回，为 RAG 回答计算置信分数，低分不直接出口。

以上三件均为已公开申请，不是授权专利；国际分类集中在 `G06F16/953`（检索）与 `G06N3`（机器学习）。

## 技术趋势：从查得准不准到敢不敢说不知道

共同走向：RAG 的验收标准正从"检索命中率"转向"回答可信度"——答对要给分，硬答要扣分。与现成方案的差异：RAGAS、TruLens 等开源库已把忠实度打分做成商品，但这三件专利主张的是**拒答题数据集的合成方法与放行阈值**——造"库里没有的题"考系统，恰是通用评测库留下的空白。2026 年 5 月的 EnterpriseRAG-Bench 基准论文同样把"应识别为不可回答"列为核心考点。

## 落地机会：卖给上线前心虚的知识库问答项目

用户场景：开发者给企业做完内部文档问答机器人，上线后员工问到文档没覆盖的问题，模型一本正经编答案，被业务部门投诉两次后老板要求"证明它不会乱说"——开发方手里只有几条抽查记录，拿不出量化证据。一个人能做的那一层：RAG 拒答质检工具——读入客户文档库，用 LLM 合成六类不可回答题与一批有据可答题，回放客户 RAG API，按"该拒不拒、该答不答"两项打分，产出质检报告与失败样本集。技术栈 Python 加任一 LLM API 加 SQLite，无需训练模型，月成本数百元，1 人 4 周出 MVP。上一篇[Agent 轨迹评测专利简报]({{ site.baseurl }}/innovation-brief-agent-evaluation-patents/)管的是多步任务的过程验收，这轮管的是单次回答的诚实度。

## 创业发现：上线前质检报告加回归巡检订阅

- 交付前质检服务：替接 RAG 私活的外包方出拒答测试集与质检报告，单次 3000-8000 元，报告署名反哺获客。
- 回归巡检订阅：接入客户已有 RAG API，知识库每次更新后自动重跑题集打分，按知识库个数收 $19-49/月。

门槛：题库合成质量决定公信力，先开源一套通用拒答题模板换信任。风险：RAGAS 等开源库正补拒答指标——护城河在垂直行业文档的出题经验与报告背书，不在脚本本身。读完今天能做的事：让模型基于你的知识库生成五十道库里没有答案的问题，喂给现有机器人，数数它编了几次。

## References
- [专利检索来源：Salesforce 不可回答评测][links-1]
- [专利检索来源：SAP 企业 RAG 评测框架][links-2]
- [产业佐证：EnterpriseRAG-Bench 基准论文][links-3]
- [站内相关文章：Agent 轨迹评测专利简报][links-4]

[links-1]: https://www.freepatentsonline.com/y2026/0170067.html
[links-2]: https://www.freepatentsonline.com/y2026/0111331.html
[links-3]: https://arxiv.org/html/2605.05253v1
[links-4]: {{ site.baseurl }}/innovation-brief-agent-evaluation-patents/
