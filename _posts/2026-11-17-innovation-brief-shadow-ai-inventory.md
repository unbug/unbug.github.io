---
layout: post
title: "AI 智创简报：《员工 AI 工具没人登记，盘点生意浮出水面》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-shadow-ai-inventory.svg
image_alt: "核心数字：Google Patents 检索 LLM 加审计痕迹，2026-08-01 至 11-17 公开 263 件；Citibank、U.S. Bank、Aembit、Automation Anywhere、中国银联、Monday.com 六件同期公开；npm shadow-ai 为 2024 年停更空壳"
tags: [shadow-ai, ai-governance, Patent, compliance, solo-dev]
description: "六件 AI 行为留痕与管控专利同期公开，核心簇 3.5 个月 263 件；面向中小公司的轻量 AI 使用盘点报告无人做，1 人 2-3 周可做 MVP。"
---

一家 50 人软件公司的技术负责人，被甲方安全问卷里一句话卡住：“贵司员工用了哪些 AI 工具、数据流向哪里？”答不出来，单子差点飞掉。他没钱买大平台，也没人力逐部门排查——而这个“说清楚”的活儿，正好有人开始收钱了。

## 专利信号

- **US20260228267A1** · **Citibank NA**：优先权 `2024-04-11`，`2026-08-06` 公开，审查中。按查询复杂度、领域、监管约束选模型的 LLM 路由，配不可篡改审计链（claim1 为存储介质项）。
- **US12701129B2** · **US Bank NA**：优先权 `2024-10-24`，`2026-08-04` 公开，已授权。实时封包检测加交易筛查做访问控制；说明书原文写明 agentic systems utilize natural language processing and large language models to analyze transaction records。
- **EP4785531A1** · **Aembit Inc**：优先权 `2023-09-29`，`2026-08-05` 公开，审查中。工作负载（智能体）身份与访问管理：从计算环境提取身份信息认证 client workload，再施加访问策略。
- **WO2026165173A1** · **Automation Anywhere**：优先权 `2024-02-27`，`2026-08-06` 公开，审查中。从事件日志（用户操作留痕）生成自动化流程，口径是流程观测与行为留痕。
- **CN122573634A** · **中国银联**：优先权 `2026-06-29`，`2026-08-14` 公开，审查中。AI 审计规则生成加业务数据审计，claim1 含预训练规则生成器与对抗迭代训练；从优先权到公开仅 46 天。
- **US20260093544A1** · **Monday com Ltd**：优先权 `2023-08-14`，`2026-04-02` 公开，审查中。SaaS 协作环境内 AI 智能体实例的集中管控与监控（枢纽件，claim1 为系统项）。

## 技术趋势

> 六件专利全部假设企业已有 SIEM/大平台，没有面向 20-300 人公司的轻量盘点报告层。

检索面可以看清规模：宽式 `"large language model" OR generative ai` 交 `audit trail / audit log / ai governance / model audit` 全时段共 `7355` 件；同簇精确式限定 `2026-08-01` 至 `11-17` 公开，命中 `263` 件（Google Patents，2026-11-17 实测）。信号不在数量变化，在线路：银行、工作流 SaaS、RPA 三条线同期布局 AI 行为留痕与管控，六件公开日集中在 `2026-04` 至 `2026-08`。银联件从优先权到公开只隔 46 天，是中国审查快速通道的细节注脚。

## 落地机会

**用户场景**：开头那位技术负责人就是典型客户——20 到 300 人的公司要交安全问卷、要过合规检查，却连“员工装了什么 AI 扩展、访问了哪些 AI 域名”都拿不出一份清单。

一个人能做的那一层是三源合并盘点包：浏览器企业策略导出的扩展清单，加网络出口域名指纹，加报销关键词匹配，产出一份《AI 使用清单与风险分级报告》。开源对标各只覆盖单层——ThalesGroup/shadowai-watch 只做操作系统级编码代理，AgrusScanner（星 41）只做网络扫描——报告与合规映射层没人做。npm 上的 `shadow-ai` 是 2024 年 6 月停更的空壳，商用命名位还空着（GitHub、npm、HN，2026-11-17 实测；HN 相关话题 130 帖，头部帖仅个位数分）。成本不到 1000 元，1 人 2-3 周出 MVP。

## 创业发现

- 收费：报告 3000-8000 元/次，或订阅 49 美元/月/公司；首批客户是接安全问卷的软件外包公司、MSP 服务商、SaaS 初创 CTO。渠道从合规咨询接单者分包切入。
- 门槛与风险：采集网络与终端数据必须拿客户书面授权并写清免责；微软 Purview 一类大厂方案向低价位下探是主要挤压。个人优势是客单低、部署轻、不用换平台。
- 本周动作：从自己公司的浏览器策略和出口日志里拉一份 AI 域名访问清单——既是第一份作品样例，也是下一次填安全问卷的弹药。
- 上一期[智能体工具调用批准专利]({{ site.baseurl }}/innovation-brief-agent-toolcall-approval-patents/)写执行前怎么拦，这期写员工实际用了什么。

## References
- [Google Patents 核心簇检索结果页][links-gp]
- [HN Algolia：shadow AI 讨论][links-hn]
- [GitHub Search：shadow ai discovery][links-gh1]
- [GitHub：ThalesGroup/shadowai-watch][links-gh2]
- [GitHub：antropos17/Aegis][links-gh3]
- [npm registry：shadow-ai][links-npm]


[links-gp]: https://patents.google.com/?q=(%22large+language+model%22+OR+generative+ai)+AND+(%22audit+trail%22+OR+%22audit+log%22+OR+%22ai+governance%22+OR+%22model+audit%22)&before=publication:20261118&after=publication:20260801
[links-hn]: https://hn.algolia.com/api/v1/search?query=shadow%20AI&tags=story
[links-gh1]: https://api.github.com/search/repositories?q=shadow+ai+discovery
[links-gh2]: https://github.com/ThalesGroup/shadowai-watch
[links-gh3]: https://github.com/antropos17/Aegis
[links-npm]: https://registry.npmjs.org/shadow-ai
