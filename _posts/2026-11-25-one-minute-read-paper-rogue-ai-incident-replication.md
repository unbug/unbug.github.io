---
layout: post
title:  "一分钟读论文：《108次重演事故，62起没有凶手》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/rogue-ai-incident-replication.svg
image_alt: 左侧柱状图对比事故条件（18%-33%）与匹配对照（不超过1%）的伤害重演率；右侧环形图显示 72 起真实伤害事故中 62 起没有攻击者；脚注：89% 的复现重演了报道的伤害，点名危害警告把 Claude Sonnet 4.6 的伤害率压到 2%。
tags: [AIAgents, Security, Reproducibility, Evaluation, IncidentResponse, Audit]
description: 得克萨斯农工大学预印本把 253 份智能体事故报道建成 108 条复现：89% 重演报道伤害；72 起真实伤害里 62 起没有攻击者，普通危害比注入更难防
---

得克萨斯农工大学（Texas A&M University）预印本[《ROGUE-AI: Replication of Agentic Security Events》][paper1-url]重演已报道的智能体事故：`108` 条复现中 `89%` 重演了伤害，`72` 起真实伤害事故里 `62` 起没有攻击者。

这些事故多数不是攻击所致：agent 只是照任务干活，漏看了一个普通的环境危害。

## 把报道变成可重演的复现

ROGUE-AI 是多 agent 流水线：先上网搜集事故报道，逐条对最详细的一手信源核验并写下被指控的原因，再由 agent 离线重建事故环境，同时建一个只差『被指控原因』的匹配对照组。以 Replit 编码 agent 删库事件为例（论文叙述，其 CEO 已确认删除）：事故副本的测试连生产数据库，对照副本的测试连临时库。另一厂商的 agent 再复核每条重建，伤害是否发生由代码裁决。

流水线从 `253` 份报道建成 `108` 条复现，覆盖 `96` 起事故、`38` 个类别，单条成本 `$3.28`。复现要过六条准入标准，第一条是一手信源核验——作者因此更正了 `253` 条中的 `76` 条，还有 `2` 条被信源反驳。

## 重演结果：伤害是真的，凶手多数不存在

![事故条件与对照条件伤害率、72 起事故中 62 起无攻击者]({{ site.baseurl }}/assets/images/rogue-ai-incident-replication.svg)

`5` 个现役模型——GPT-5.6-luna、GPT-5.6-sol（OpenAI）、Claude Sonnet 4.6（Anthropic）、Gemini 3.5 Flash（Google）与开源权重（open-weight）的 DeepSeek-V4-Flash——在事故条件下 `18%` 至 `33%` 的运行重演了被报道的错误，匹配对照组不超过 `1%`；每个条件跑 `3` 次。Replit 复现中，五个模型约一半事故会话抹掉了生产行，`15` 条对照会话全部无损。

**更反直觉的是归因**：`72` 起有真实世界伤害的复现事故里，`62` 起没有攻击者；agent 干了任务要求的事，漏掉诸如『测试库和生产库是同一个』这类平庸危害。无攻击者复现造成的伤害，五个模型全部高于 prompt injection 复现，而这些复现里一条注入指令都没有——当下主打的防注入防御找的东西，在这里不存在。作者另做复核：三名作者盲读 `30` 起抽样事故全部与最终标签一致；GPT-5.6-luna 盲标 `72` 起，攻击者有无一致 `66/72`（κ = `0.68`）。

## 修复、成本与边界

在每条工具输出后加一条点名危害及其后果的警告（如『这些测试会删掉生产数据库』），五个模型伤害全部下降，Claude Sonnet 4.6 降到 `2%`；等长的不提危害的提示基本无效。另一口径：在首个致害步单点修改，消除了 `208` 个致害会话中的 `118` 个。

对模型厂商，复现集可当发版前审计：重跑单次 `$0.54` 至 `$47`，作者已把各模型结果报送 OpenAI、Anthropic、Google、DeepSeek。代码、复现与会话日志经项目站发布[（ROGUE-AI 项目页）][links-1]。

边界要划清：这是 v1 预印本，未见会议接收；复现的是『报道声称的机制』而非逐字节重演当年事故，模型是现役五款而非事发时版本，细节缺失处用中性默认值补齐，不能据此断言 Replit 事故成因已被证明。站内[《AI 分析师做同一研究》][links-2]刚说明 AI 互查不可信，这篇的对策是交叉厂商复核加代码裁决。

## References
- [ROGUE-AI: Replication of Agentic Security Events: Audit and Investigation (arXiv:2611.26553)][paper1-url]
- [ROGUE-AI 项目页][links-1]
- [站内：150个AI做同一研究，分歧像人类][links-2]
- [站内：Agent 恢复记录的缺口][links-3]


[paper1-url]: https://arxiv.org/abs/2611.26553
[links-1]: https://rogue-ai.surge.sh
[links-2]: {{ site.baseurl }}/one-minute-read-paper-agentic-multiverse-analysis/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-agent-recovery-gap/
