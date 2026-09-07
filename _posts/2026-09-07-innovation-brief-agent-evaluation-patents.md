---
layout: post
title: "AI 智创简报：《Agent 轨迹评测专利成簇，长任务质检是接单活》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-agent-evaluation-patents.svg
tags: [Patent, AIAgent, Evaluation, DevTools, IndieHacker]
description: "2026 年前八个月四件 AI Agent 评测专利密集公开：花旗、KPMG、Quantiphi 把智能体验收做成方法论。轨迹回放打分与交付质检报告，是独立开发者能接的量化活。"
---

2026 年 1 至 8 月，四件"AI Agent（能自主多步调用工具的 AI 程序）评测"专利接连公开，申请人里出现花旗银行与 KPMG。大厂和咨询公司在把 Agent 验收做成方法论；给小团队交付物做量化质检的那一层，还空着。

![Agent 评测专利信号与轨迹质检接单机会]({{ site.baseurl }}/assets/images/innovation-brief-agent-evaluation-patents.svg)

## 专利信号：银行和咨询公司在给 Agent 定验收标准

- **US20260017525A1**，Citibank, N.A.，2026-01-15 公开：用约束字符集定义 Agent 边界，第二组模型比对"提议动作与预期动作"找差距，第三组模型增删改动作后放行。
- **US20260030476A1**，KPMG LLP，2026-01-29 公开：聚合企业环境里已部署的多个 Agent，用运行行为数据与可信度数据评估选定 Agent，输出总评分。
- **US20260154581A1**，Quantiphi, Inc.，2026-06-04 公开：按 Agent 档案合成测试数据，真实交互跑出轨迹（trace，逐步执行记录），对照评估矩阵打分。
- **US20260186944A1**，2026-07-02 公开（申请人未在公开文本中标注）：持续接收执行记录，按推理周期与动作序列切分轨迹段，对长程 Agent 逐段评估。

以上四件均为已公开申请，不是授权专利；第四件国际分类落在 `G06F11/34`（计算机系统测量），与传统软件测试同族。

## 技术趋势：从看单次输出到给整条轨迹打分

共同走向：Agent 的质量不再靠抽查一次回答判断，而是合成场景、真跑一遍、收集轨迹、按矩阵逐段评分。咨询与金融系申请人要的是"可验收的分数"——这暗示甲方侧正在长出对 Agent 交付做第三方评估的需求。与现有方案的差异：Langfuse、LangSmith、Braintrust 等观测平台把"记录 Agent 做了什么"做成商品，2026 年 8 月的行业对比文章里评测已是标配卖点；但这些专利主张的是"这条轨迹该打几分、卡在哪一步"——打分标准与业务检查点，恰恰是通用平台留给空白的部分。

## 落地机会：卖给交不出验收报告的 Agent 外包方

用户场景：AI 外包工作室给客户交付一个客服 Agent，多步任务（查单、退款、建工单）偶发中途走歪；客户验收时问"你怎么证明它靠谱"，工作室只有日志，拿不出量化评测报告。一个人能做的那一层：Agent 验收工具——读入已有轨迹数据（OpenTelemetry 或 Langfuse 导出格式），按业务流程合成边界场景，重放后逐段对检查点打分，产出质检报告与失败样本集。技术栈 Python 加任一 LLM API 加 SQLite，无需训练模型，月成本数百元，1 人 4 周出 MVP。上一篇[提示词测试专利简报]({{ site.baseurl }}/innovation-brief-prompt-testing-patents/)管的是静态提示词的回归，这轮管的是动态轨迹的验收。

## 创业发现：一次性验收报告加日常巡检订阅

- 验收审计服务：替 Agent 外包交付物出评测报告与整改清单，单次 3000-8000 元，首批客户是接 Agent 私活的外包工作室和甲方验收人，报告署名反哺工具获客。
- 轨迹巡检订阅：接入客户已有 trace 做每日回放打分，按 Agent 个数计收 $19-49/月。

门槛：评分方法论要公开才有人信，先拿开源检查点规则库换信任。风险：Braintrust 等平台正把评测下沉成一键功能——护城河在垂直业务的检查点设计与报告公信力，不在打分脚本本身。读完今天能做的事：导出你手上 Agent 最近五十条真实轨迹，让模型按"任务完成、越权操作、中途放弃"三项逐条打分，看看它到底不及格几次。

## References
- [专利检索来源][links-1]
- [产业佐证：LLM 观测与评测平台格局][links-2]
- [站内相关文章：提示词测试专利简报][links-3]

[links-1]: https://www.freepatentsonline.com/y2026/0154581.html
[links-2]: https://www.marktechpost.com/2026-08-09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/
[links-3]: {{ site.baseurl }}/innovation-brief-prompt-testing-patents/
