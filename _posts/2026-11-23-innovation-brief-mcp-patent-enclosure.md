---
layout: post
title: "AI 智创简报：《MCP协议刚满两岁，中文专利圈了一整圈》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-mcp-patent-enclosure.svg
image_alt: "上半部：银联CN121526599B已授权Active，另四件审查中；下半部：MCP词族全库累计1,787件、支付组合321件（2026-11-23检索）；结论：接入适配服务仍是空位，体检报告加模板1人3周可交"
tags: [Patent, ai-agents, DevTools, solo-dev]
description: "中国银联把基于MCP的支付系统写到已授权，百度、浪潮、天翼的MCP执行、低代码生成、注入防护专利密集公开；本批五件之外，接入适配服务仍是散家空位。"
---

MCP（模型上下文协议，给大模型统一调用外部工具的开放协议）刚满两岁就被写进中文权利要求书：中国银联的 MCP 支付专利 `CN121526599B` 已授权（Google Patents，`2026-11-23` 复核），另有 4 件在审。

## 专利信号

| 公开号 | 申请人 | 公开日 | 状态 |
|---|---|---|---|
| `CN121526599B` | China Unionpay Co Ltd | `2026-07-14` | 已授权 |
| `CN122420137A` | China Unionpay Co Ltd | `2026-07-17` | 审查中 |
| `CN121396646A` | Tianyi Vision Technology Co ltd | `2026-01-23` | 审查中 |
| `CN120653465A` | Beijing Baidu Netcom Science and Technology Co Ltd | `2025-09-16` | 审查中 |
| `CN120872309A` | Inspur Yunzhou Industrial Internet Co Ltd | `2025-10-31` | 审查中 |

- **AI 替人付钱**（银联 `CN121526599B`，申请 `2026-01-16`，`12` 项）：claim 1 写明系统由支付智能体、支付 MCP 集成服务端、支付接口集成网关组成，服务端存支付、积分兑换、退款等工作流；授权事件 GR01 落在 `2026-07-14`。
- **AI 替人砍价**（银联 `CN122420137A`，`28` 项，审查中）：AI 智能体解析指令生成语境向量与隐私标签，MCP 路由网关在智能体与多个 MCP 服务器间议价。
- **MCP 防注入**（天翼视联 `CN121396646A`，`10` 项，审查中）：轻量双向编码器模型对 MCP 请求文本与上下文做语义向量化输出风险评分。防护件公开，本身就是攻击已在发生的信号。
- **执行与生产**（百度 `CN120653465A`，`17` 项：按对象属性取 MCP 工具信息喂大模型；浪潮云洲 `CN120872309A`，`10` 项：元数据转 MCP 描述文件入库）。

## 技术趋势

走向是 MCP 从开发者约定变成机构系统环节。`2026-11-23` Google Patents 实测（窗口参数失效，为**全库累计口径**，非新增）：MCP 加 agent 组合全库 `1,787` 件，加 payment 组合全库 `321` 件。

![MCP 中文专利圈地与检索面口径信息图]({{ site.baseurl }}/assets/images/innovation-brief-mcp-patent-enclosure.svg)

> 五件里四件在审，圈地不等于拿地；主张的是具体系统组合，不是 MCP 协议本身。

反方照写：这批权利要求绑定支付网关、路由网关等具体组合，据此下「标准被私有化」结论为时过早；也不排除部分公开属防御性公布。与 `2026-11-21` 期[《大厂圈地AI操作层，逐单批准还空着》]({{ site.baseurl }}/innovation-brief-agent-operation-permission-gap/)和 `2026-11-16` 期[《智能体批准专利各占一角》]({{ site.baseurl }}/innovation-brief-agent-toolcall-approval-patents/)切割：那两期管 agent 操作与调用闸门，本期看协议层被写进权利要求书。

## 落地机会

**用户场景**：给城商行做外包的独立开发者，客户要把审批流接进 AI 助手，商务第一句问「有没有专利风险」——他查不动 `1,787` 件累计中文族，更分不清哪件已授权。

一个人能做的是**MCP 专利体检加接入模板**：按申请人拉清单，输出已授权/在审/失效三态表加比对意见；再配 MCP 开源 SDK 做接入 demo。栈现成：Google Patents 检索、公开 claim 文本。起步几百元（API 与文档时间），1 人 3 周交得出体检报告加接入模板这单 MVP。

## 创业发现

- 接单形态：先卖「MCP 专利体检报告」，一份 ¥2,000-5,000；再转接入实施，按项目 ¥2 万起谈。首批客户从支付外包商与城商行科技部门来。
- 门槛与风险：门槛是中文族检索加 claim 比对手艺，报告须注明非法律意见；风险是银联等机构后续补圈服务层，交付前逐件复核状态，在审不等于授权。

## References

- [Google Patents 检索面（MCP 加 agent，全库累计）][gp-w1]
- [Google Patents 检索面（MCP 加 payment，全库累计）][gp-w2]
- [CN121526599B 基于 MCP 的支付方法][p1]
- [CN122420137A MCP 分布式自动议价系统][p2]
- [CN121396646A MCP 注入攻击防护][p3]
- [CN120653465A 基于 MCP 的任务执行方法][p4]
- [CN120872309A 低代码平台 MCP 生成与调用][p5]


[gp-w1]: https://patents.google.com/?q=%28%22model+context+protocol%22%29+%28agent+OR+agents%29
[gp-w2]: https://patents.google.com/?q=%28%22model+context+protocol%22%29+%28payment+OR+%E6%94%AF%E4%BB%98%29
[p1]: https://patents.google.com/patent/CN121526599B/en
[p2]: https://patents.google.com/patent/CN122420137A/en
[p3]: https://patents.google.com/patent/CN121396646A/en
[p4]: https://patents.google.com/patent/CN120653465A/en
[p5]: https://patents.google.com/patent/CN120872309A/en
