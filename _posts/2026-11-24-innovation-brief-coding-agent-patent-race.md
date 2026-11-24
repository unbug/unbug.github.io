---
layout: post
title: "AI 智创简报：《AI写代码正热，编码agent专利先圈了一圈》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-coding-agent-patent-race.svg
image_alt: "上：SAS、Laredo已授权，支付宝、腾讯、阿里审查中；下：精确词族全库累计4件、coding agent 20件（2026-11-24检索）；结论：编码agent专利体检1人3周可交"
tags: [Patent, ai-agents, DevTools, solo-dev]
description: "SAS把agent部署进客户环境用411天就授权，支付宝、腾讯、阿里的编码agent专利密集公开；精确词族全库仅4件，词族未成型但圈地已开始。"
---

「AI coding agent」精确词族在 Google Patents 全库仅 `4` 件（全库累计，检索于 `2026-11-24`，非新增），圈地已经开跑：SAS 把 agent 配进客户环境的专利，优先权到授权只走 `411` 天（`US12619423B1`，同日复核）。

## 专利信号

| 公开号 | 申请人 | 公开日 | 状态 |
|---|---|---|---|
| `US12619423B1` | SAS Institute Inc | `2026-05-05` | 已授权 |
| `US12498920B2` | Laredo Labs Inc | `2025-12-16` | 已授权 |
| `CN122450431A` | Alipay Hangzhou Digital Service Technology Co Ltd | `2026-07-24` | 审查中 |
| `CN122018872A` | Tencent Technology (Shenzhen) Co Ltd | `2026-05-12` | 审查中 |
| `CN118363601A` | Alibaba China Co Ltd | `2024-07-19` | 审查中 |

- **agent 进流水线**（SAS `US12619423B1`）：claim 1 写明接收外部计算环境的 agent 部署请求，再配置部署 agentic module。优先权 `2025-03-20` 到授权 `2026-05-05` 共 `411` 天。
- **issue 到代码闭环**（Laredo Labs `US12498920B2`）：机器学习模型辅助软件工程任务，从 issue tracker 收请求、产出报告与代码改动，`2025-12-16` 授权。
- **知识库辅助编程**（支付宝 `CN122450431A`）：claim 1 逐字「一种知识库辅助编程方法，应用于智能体」，多层知识库驱动 agent 写码，申请 `2026-05-26`。
- **对话加预览的 IDE 形态**（腾讯 `CN122018872A`，申请 `2026-02-12`）：软件生成界面含对话与预览区域，对话区收自然语言指令并展示候选回答。
- **代码处理模型训练管线**（阿里 `CN118363601A`，申请 `2024-03-21`）：用样本处理结果与样本代码块数据训练代码处理模型。另有亚马逊软件现代化重构两件（`US11579868B1`、`US11809841B1`）已授权，属遗留代码迁移。

## 技术趋势

新老词族正在交接。`2026-11-24` Google Patents 实测（全库累计，非新增）：精确词族「coding agent」全库 `20` 件（10:06 实测）、「AI coding agent」仅 `4` 件（10:38 实测）；上一代词族「coding assistant」全库 `104` 件（10:13 实测），中文侧「智能体」加「代码生成」组合 `2,187` 件（10:43 实测），宽族只作规模参照。「代码库索引大模型」这类短语检索直接零结果：词族尚未定型。圈地者画像清晰：工具厂商抢快授权，大厂按月上新，创业公司补闭环。

![编码 agent 专利圈地与检索面口径信息图]({{ site.baseurl }}/assets/images/innovation-brief-coding-agent-patent-race.svg)

> 五件里三件审查中，圈地不等于拿地；主张的是具体系统组合，不是 AI 编程本身。

反方照写：权利要求绑定知识库分层、对话加预览界面、issue tracker 对接等具体组合，据此下「AI 编程被圈地」「某款编程助手侵权」结论为时过早；也不排除部分公开属防御性公布。与 `2026-11-21` 期[《大厂圈地AI操作层，逐单批准还空着》]({{ site.baseurl }}/innovation-brief-agent-operation-permission-gap/)、`2026-11-23` 期[《MCP协议刚满两岁，中文专利圈了一整圈》]({{ site.baseurl }}/innovation-brief-mcp-patent-enclosure/)切割：那两期管操作权限与协议层，本期看写代码本身被写进权利要求。

## 落地机会

**用户场景**：给 AI 编程工具团队接外包的独立开发者，客户要上线 agent 写码功能，第一句问「有没有专利风险」——他查不动全库十几万件，更分不清哪件已授权。

一个人能做的是**编码 agent 专利体检加回归门禁**：按申请人拉清单，输出已授权/在审/失效三态表加 claim 1 比对意见；再加一条 CI 规则，AI 代码未过测试就拦截合入。检索、claim 文本、CI 都现成，1 人 3 周可交这单 MVP。

## 创业发现

- 接单形态：先卖「编码 agent 专利体检报告」，一份 ¥2,000-5,000；再转接入实施，按项目 ¥2 万起谈，客户从 AI 编程工具创业公司与外包团队来。
- 门槛与风险：门槛是中英双词族检索加 claim 比对手艺，报告须注明非法律意见；风险是快授权件还在增加，交付前逐件复核，在审不等于授权。

## References

- [Google Patents 检索面（coding agent，全库累计）][gp-w1]
- [Google Patents 检索面（AI coding agent，全库累计）][gp-w2]
- [Google Patents 检索面（coding assistant，全库累计）][gp-w3]
- [US12619423B1 外部环境 agent 部署][p1]
- [US12498920B2 机器学习辅助软件工程任务][p2]
- [CN122450431A 知识库辅助编程方法][p3]
- [CN122018872A 软件生成方法][p4]
- [CN118363601A 任务处理方法与代码处理模型][p5]


[gp-w1]: https://patents.google.com/?q=%22coding+agent%22
[gp-w2]: https://patents.google.com/?q=%22AI+coding+agent%22
[gp-w3]: https://patents.google.com/?q=%22coding+assistant%22
[p1]: https://patents.google.com/patent/US12619423B1/en
[p2]: https://patents.google.com/patent/US12498920B2/en
[p3]: https://patents.google.com/patent/CN122450431A/en
[p4]: https://patents.google.com/patent/CN122018872A/en
[p5]: https://patents.google.com/patent/CN118363601A/en
