---
layout: post
title: "AI 智创简报：《智能体批准专利各占一角，统一批准网关仍空着》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-agent-toolcall-approval.svg
image_alt: "左侧宽窄检索面对比（宽查询 AI agent+security 11876 件 对比 窄层 browser agent+injection 1 件、capability broker 2 件、2026 年 approval+tool call 0 件）；右侧五件地主：Individual 2 件、BarWorld 1 件、Airia LLC 2 件"
tags: [agent-security, tool-approval, Patent, mcp, solo-dev]
description: "智能体工具调用批准层五件专利各占一角，两件挂个人发明人；2026 年后 approval 加工具调用新公开为零，统一批准网关无人 claim；1 人 4 周可做。"
---

五件专利各占一角，地主多是个人发明人：智能体工具调用的「装完即用批准网关」还没人做（Google Patents 实测，截至 `2026-11-16`）。

宽查询 `"AI agent" "security"` 堆到 `11876` 件，窄窄的批准拦截层却几乎空着：`"browser agent" "prompt injection"` 仅 `1` 件、`"capability broker" "large language model"` `2` 件、2026 年后公开的 `"approval" "tool call"` `0` 件。

## 专利信号

- **US20260067335A1**《Security and Privacy Preserving Agentic Browser》，地主 **Individual**（发明人 Bao Tran，GP 页面原文）：优先权 `2024-06-25`，`2026-03-05` 公开，已公开（审查中）。把浏览器拟执行动作按大模型分为 safe 或 risky，风险动作触发 step-up 升级认证。该件同时命中本期 5 个窄查询（browser agent、capability broker、approval、injfirewall、stepup），是本赛道枢纽件。
- **WO2026154461A2** 防智能体数据目的洗白与滥用，地主 **Individual**（发明人 Sangam DAS）：优先权 `2025-12-09`，`2026-07-23` 公开，已公开（审查中）。硬件根最终性加加密执行授权，盯转账等不可逆动作。
- **KR102982822B1** 按风险评估动态拦截工具的 AI 智能体控制装置，地主 **BarWorld 株式会社**：优先权 `2026-02-19`，`2026-06-26` 注册，已授权。调用前判危险度，批准 UI 加只跑已批准调用的沙箱，带可回滚快照。
- **US12592823B1** 智能体经安全隧道访问远程客户资源，地主 **Airia LLC**（发明人 John Manton、Gregory Roberts）：优先权 `2025-09-24`，`2026-03-31` 注册，已授权。同族 **US12683941B1** 覆盖本地执行工具，`2026-07-14` 注册，已授权，摘要逐字含 Model Context Protocol（MCP）。

## 技术趋势

> 不是没需求，是没人按智能体语境在 claim。

`"user approval" "tool call"` 共 `38` 件，其中 2026 年后公开 `0` 件，同义复核确认多为 RPA 审批流老语义。枢纽件包揽五个窄查询，`"step-up authentication" "autonomous agent"` `2` 件，`"firewall" "untrusted content" "language model"` `3` 件；egress 方向配优先权 2024-06 后为单次实测 `0`。与宽查询 11876 件比，缺口在风险分级批准这层。

## 落地机会

**用户场景**：给智能体开了浏览器、服务器、文件权限的独立开发者与小团队，在智能体要执行一条会改数据、发消息、花真钱的工具调用时被卡住——现有框架要么全放开（出事无痕），要么全人肉（每条都问）；「低风险放行、高风险弹批准、批准后进沙箱、可快照回滚」这一层没有装完即用的小工具。

一个人能做的那一层：本地/自托管的工具调用批准网关，MCP 代理或 agent 中间件形态，含风险分类器、批准 UI、只跑已批准调用的沙箱、会话快照。技术栈 Python/TS 加 MCP SDK 加策略引擎（OPA 或 Cedar），1 人 4 周出 MVP，成本低于 2 万元。

## 创业发现

- 切入形态是订阅制开发者工具：首批客户取自把 coding agent 接进工作流的独立开发者，再上小团队 admin 版；渠道走 HN Show、MCP 目录、GitHub。
- 门槛与风险：大厂原生权限系统会吃掉浅层需求（Claude Code 权限弹窗已是内置），差异位是跨框架统一网关、移动端批准、审计日志留痕。
- 切割句：五件各占一角（浏览器风险分级、硬件根最终性、批准沙箱回滚、安全隧道访问），无一形成「统一批准网关」的完整权利要求网；2026 年 `"approval" "tool call"` 新公开为 `0`。
- 上一期[智能体签发授权书]({{ site.baseurl }}/ai-innovation-brief-mandate-verification-gap/)写授权怎么签发，这期写执行前的批准拦截。

## References
- [Agentic Browser 安全与隐私专利][links-p1]
- [防智能体数据目的洗白专利][links-p2]
- [BarWorld 动态拦截工具专利][links-p3]
- [Airia 远程资源安全隧道专利][links-p4]
- [Airia 本地工具安全隧道专利][links-p5]
- [HN：如何为生产环境的智能体动作授权][links-h1]
- [HN：如何强制智能体工具调用的权限][links-h2]
- [HN：Multicorn Shield 开源权限与批准][links-h3]
- [HN：用手机批准 Claude Code 权限请求][links-h4]
- [Google Patents 检索入口][links-s1]


[links-p1]: https://patents.google.com/patent/US20260067335A1/en
[links-p2]: https://patents.google.com/patent/WO2026154461A2/en
[links-p3]: https://patents.google.com/patent/KR102982822B1/en
[links-p4]: https://patents.google.com/patent/US12592823B1/en
[links-p5]: https://patents.google.com/patent/US12683941B1/en
[links-h1]: https://news.ycombinator.com/item?id=46719774
[links-h2]: https://news.ycombinator.com/item?id=46740645
[links-h3]: https://news.ycombinator.com/item?id=47269228
[links-h4]: https://news.ycombinator.com/item?id=47111171
[links-s1]: https://patents.google.com/

