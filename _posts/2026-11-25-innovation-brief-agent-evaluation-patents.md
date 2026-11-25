---
layout: post
title: "AI 智创简报：《给AI Agent出考卷的专利来了》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-agent-evaluation-patents.svg
image_alt: "上：Booz Allen、百度、阿里云、Citibank、中电十四所五件专利，仅德国实用新型已注册；下：evaluation harness 词族全库累计26件（2026-11-25检索）；结论：agent 评测集专利体检加评测 CI 门禁，1人2-3周可启动"
tags: [Patent, ai-agents, DevTools, EvalHarness, solo-dev]
description: "evaluation harness 词族全库仅26件，百度、阿里云同月递交；评测占位赛开跑，体检加CI门禁1人2-3周可启动。"
---

「evaluation harness」精确词族全库仅 `26` 件（检索于 `2026-11-25`，全库累计，非新增），圈内已有 Booz Allen、百度、阿里云、Citibank 与个人发明人；给 agent 动手前拦截的德国实用新型已注册，评测占位赛开跑。

## 专利信号

- **评测做成云 API**（Booz Allen Hamilton Inc. `US20250292079A1`，审查中）：claim 1 逐字 "receiving, using an evaluation application programming interface (API), task data"，评测（evaluation harness：给大模型与 agent 出题、跑分、验证的评估装置）封装进执行容器对外卖。
- **自动实验加评测闭环**（北京百度网讯科技有限公司 `WO2026128383A1`，审查中，PCT）：claim 1 逐字 "utilizing an autonomous research agent … to conduct an experiment … evaluating the conducted experiment"；提交（`2025-12-08`）到公开（`2026-06-18`）`192` 天。
- **MCP 中介工具调用防线**（阿里云计算有限公司 `DE202025107678U1`，已注册）：德国实用新型不作实质审查，权利强度弱于发明专利，本簇唯一已拿权利件。
- **agent 上岗先登记**（Citibank, N.A. `US20260111278A1`，审查中）：claim 1 逐字 "receiving, by an agent registration interface of a Central Agent Name and Attribute Registry (CANAR), a registration request from an AI agent"；事件表逐字「2025-11-11 Assigned to aixplain, Inc.」。
- **上下文进入研发流水线**（中国电子科技集团公司第十四研究所 `CN121187570A`，审查中）：claim 1 逐字「一种基于人工智能的软件开发方法…获取用户输入的针对目标编程任务的编程需求信息和编程上下文」。
- **个人已在占位**（个人发明人 안범주 `KR20260049741A`）：claim 1 逐字含「평가 하네스(Evaluation Harness) 생성 및 검증 시스템」，申请 `2026-03-27` 到公开 `2026-04-14` 仅 `18` 天，只走韩国国内局。

![agent 评测与防线专利圈地与检索面口径信息图]({{ site.baseurl }}/assets/images/innovation-brief-agent-evaluation-patents.svg)

## 技术趋势

新老词族交接期。`2026-11-25` Google Patents 实测（全库累计，非新增）：「evaluation harness」`26` 件（17:33）、自动生成一支仅 `7` 件（19:33）、「context engineering」`185` 件、「LLM firewall」或「agent firewall」`76` 件（17:33）；guardrail `21,662`、MCP server `2,066`、human-in-the-loop `11,163` 只作规模参照，不作布局论据。防线侧另有 `US20250328560A1`：claim 1 逐字 "intercepting … performing a security analysis … one of approving or blocking"，agent 到工具调用逐条拦截。专利数据本身有噪声：Google Patents 英文表记为机翻层，本期 13 件详情页里 `9` 件与原文不符，Nvidia、Autoscience、Alibaba 均属错挂，申请人表述一律以原文为准。

> 五件里四件审查中，圈地不等于拿地；DE 件未经实质审查，不构成防线。

反方照写：Citibank 转让给 aixplain 说明金融买家在剥离注册表能力，也可反向解读为自留意愿低；不排除防御性公布。与 `2026-11-21` 期[《大厂圈地AI操作层，逐单批准还空着》]({{ site.baseurl }}/innovation-brief-agent-operation-permission-gap/)、`2026-11-23` 期[《MCP协议刚满两岁，中文专利圈了一整圈》]({{ site.baseurl }}/innovation-brief-mcp-patent-enclosure/)、`2026-11-24` 期[《AI写代码正热，编码agent专利先圈了一圈》]({{ site.baseurl }}/innovation-brief-coding-agent-patent-race/)切割：那三期管操作权限、协议层与写码本身，本期看谁给 agent 出考卷、谁把住工具调用总闸。

## 落地机会

**用户场景**：给 agent 评测工具团队接外包的独立开发者，客户要在 CI 里跑评测上线，第一句问「评测集会不会撞别人在审的权利要求」，他查不动全库词族，也没有工具能在评测不达标时拦住发版。

一个人能做的是 **agent 评测集专利体检加评测 CI 门禁**：按申请人拉出授权/在审/失效三态表加 claim 1 比对意见，再交付一条 CI 规则：agent 评测未过基线即拦截发版。`pytest`、容器、基线 JSON 全是现成栈，1 人 `2-3` 周可交。

## 创业发现

- 接单形态：体检报告 ¥2,000-5,000/份，评测门禁接入 ¥1.5 万起，每次新模型、新工具接入都要重跑即复购；客户从做 agent 评测、护栏、可观测的创业公司来。
- 门槛与风险：门槛是双词族检索加 claim 比对手艺，报告注明非法律意见；风险是在审件还在增加，交付前逐件复核。

## References

- [Google Patents 检索面（evaluation harness，全库累计）][gp-w1]
- [Google Patents 检索面（context engineering，全库累计）][gp-w2]
- [US20250292079A1 评测 API 与执行容器][p1]
- [WO2026128383A1 自动研究 agent 与实验评测][p2]
- [DE202025107678U1 MCP 中介工具调用安全系统][p3]
- [US20260111278A1 中央 agent 注册表 CANAR][p4]
- [CN121187570A 编程上下文软件开发方法][p5]
- [KR20260049741A 评估 harness 生成验证系统][p6]
- [US20250328560A1 agent 间进程通信拦截][p7]


[gp-w1]: https://patents.google.com/?q=%22evaluation+harness%22
[gp-w2]: https://patents.google.com/?q=%22context+engineering%22
[p1]: https://patents.google.com/patent/US20250292079A1/en
[p2]: https://patents.google.com/patent/WO2026128383A1/en
[p3]: https://patents.google.com/patent/DE202025107678U1/en
[p4]: https://patents.google.com/patent/US20260111278A1/en
[p5]: https://patents.google.com/patent/CN121187570A/en
[p6]: https://patents.google.com/patent/KR20260049741A/en
[p7]: https://patents.google.com/patent/US20250328560A1/en
