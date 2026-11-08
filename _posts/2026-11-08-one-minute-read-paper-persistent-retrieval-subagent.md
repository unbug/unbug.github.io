---
layout: post
title:  "一分钟读论文：《子 agent 别写总结，直接交证据》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/persistent-retrieval-subagent.svg
tags: [ai-agents, retrieval, llm-cost, agent-architecture]
description: "ServiceNow 论文实测三种检索架构：让检索子 agent 保留跨轮历史并直接回传原始证据，多轮场景比 skill 内检索省 43.3% token、省 45.0% 估算 API 成本，准确率仅降 1.45 个百分点。"
---

ServiceNow 论文[《Persistent Retrieval for Conversational Agents》][paper1-url]实测三种检索架构：检索子 agent 保留跨轮历史、直接交回原始证据，多轮比 skill 内检索省 `43.3%` token、`45.0%` 成本（牌价估算）。

准确率只降 `1.45` 个百分点。三种架构分别是：skill 内检索（`Skill`，主 agent 自己查）、无状态检索子代理（每次新历史，返回一段 findings 总结）、持久检索子代理（`Our method`，跨轮保留检索历史、把原始证据直接交回主 agent）。数据集是 ServiceNow 的 ITSM 工单 `57` 题、HRSD 人事工单 `48` 题，以及带多轮依赖的 ITSM Complex `69` 题；每组配置跑 `3` 次取均值。需要说明的是，作者 `5` 人全部来自 ServiceNow，实验跑在自家 agent harness 和自家企业工单集上，结论不宜泛化为所有 agent。

## 三套架构的账单差在哪

最贵的是让主 agent 自己把检索结果堆进上下文。在 ITSM Complex 上，`Skill` 平均每题 `401.5k` token、按公开牌价估算成本 `$0.387`；持久子代理是 `210.8k` token、`$0.121`；无状态子代理是 `148.0k` token、`$0.133`。持久方案对 `Skill` 的成本差为 `3.2` 倍，响应时间也从 `58.3` 秒降到 `54.3` 秒。跨 `5` 个多轮设置加权，持久子代理比 `Skill` 少 `43.3%` token、每题省 `$0.157`（`45.0%`）、快 `9.1%`。

代价也写在同一张表上：ITSM Complex 准确率从 `91.30%` 降到 `89.85%`，`-1.45` 个百分点。这个数字仅在 `69` 题多轮依赖集上出现，且是 GPT-5.4-mini 裁判判定的宽松通过率（得分大于 `0` 且判为一致即算通过），不是严格准确率。单轮场景反而打平甚至反超：ITSM 上两者同为 `98.25%`，每题估算成本从 `$0.113` 降到 `$0.068`。

## 省 token 与省钱是两本账

把对照系换成无状态子代理，结论会转弯。无状态子代理每次从零开始，持久方案反而比它多用 `41.4%` 总 token（ITSM Complex 口径），跨 `5` 个多轮设置平均多 `65.1%`；两口径属不同统计范围，不能混用。每题估算成本还贵 `$0.043`（`29.1%`），只是快 `15.6` 秒。保留历史把输入变大了，账单却没爆，因为未缓存输入 `$2.50`/百万 token、缓存输入只算 `$0.25`、输出 `$15`（OpenAI 公开的 GPT-5.4 标准牌价）——缓存单价只有未缓存单价的十分之一，存进缓存的那部分历史几乎不要钱，硬生生把账打了下来。所有 `$` 数字都是拿录制 token 乘牌价的估算，不是真实账单，也不含检索服务与裁判调用。注意 `43.3%`/`45.0%` 的省是相对 skill 内检索说的，不能当成「比不优化便宜一半」。

## 消融：别写总结比保留历史更值钱

ITSM Complex 消融把两个机制拆开定价（每题均值）：去掉「直接回传证据」、让子代理改写 findings 总结，成本上浮 `42%`、慢 `17.7` 秒；去掉「持久历史」只上浮 `8%`、慢 `4.3` 秒，前者代价是后者的 `5.3` 倍；三种配置准确率都停在 `89.85%`。真正的大头是不让子代理作文：主 agent 自己读证据、自己写答案，省掉一次中间生成。持久历史的价值则在于复用：同一个子代理跑完 `69` 题只做了 `23` 次元数据查询和 `59` 次 Cypher 查询，而 `Skill` 是 `36` 次与 `85` 次。

![三种检索架构的每题成本与消融代价对比]({{ site.baseurl }}/assets/images/persistent-retrieval-subagent.svg)

与站内[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/})不同：那篇是用 profiler 对已跑轨迹做开销归因，这篇是在架构层面比较三种检索外包姿势的选型，两者不在同一轴上。

## References
- [Persistent Retrieval for Conversational Agents: A Study of Retrieval Efficiency][paper1-url]


[paper1-url]: https://arxiv.org/abs/2611.07899
