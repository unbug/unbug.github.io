---
layout: post
title: "AI 智创简报：《AI 下单的支付路，卡组织先装了两道闸》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-agentic-payment-patents.svg
tags: [Patent, AIAgent, Payment, AgenticCommerce, IndieHacker]
description: "2026 年 8 月一个月内，万事达授权一件 LLM 智能体支付专利，Visa 同日公开两件 agentic commerce PCT。凭证发放与合同监控两层被卡组织圈走，授权对账、商户协议适配与支付审计回放是个人开发者能接的三段活。"
---

2026 年 8 月单月，支付卡组织在智能体支付（让 AI 智能体替用户办事的 agentic commerce）上连落三子：万事达拿下一件授权，Visa 同日公开两件 PCT。

具体是：万事达国际公司于 `2026-08-11` 获授权 US12705604B2，权利要求写的就是「由用户设备上的大语言模型（LLM）custom agent 接收订行程的请求，并对多笔订单执行安全支付」；`2026-08-20` 同一天，Visa 国际服务协会两件 PCT 公开——WO2026173611A1《Infrastructure for authenticated agentic commerce》与 WO2026173648A1《Agentic payments and commerce》，优先权均落在 2025 年 2 月 13 日的美国临时申请。公开不等于授权，两件 PCT 尚在路上，授权文本才是既成事实。

![智能体支付专利时间轴与开源生态对照]({{ site.baseurl }}/assets/images/innovation-brief-agentic-payment-patents.svg)

## 两道闸：凭证怎么发、合同怎么管

把三件文本摆在一起，卡组织圈的是同一条路的两道闸。凭证闸：万事达的授权件让 LLM 智能体拿一次性访问令牌收款单，Visa 的基础设施件把令牌再收紧一档——「tokenization process that restricts payment tokens to a particular agent and contract」，令牌绑定到具体智能体与具体合同，换人换单即失效。合同闸：Visa 文本写明支付网络「monitor contracts and their state, ensuring transactions remain within budget」，智能体能花多少钱、买什么东西，以用户签署的合同为准，网络逐笔核对。为此 Visa 还配了一套 PKI：智能体服务商要过审查才拿得到支付网络证书权威签发的数字证书，轻量商户则用动态交易校验值 dTVV 免接口接入。个人 inventor 也已在合规控制面抢跑——澳大利亚临时申请 AU2026906209A0《Bounded Execution Compliance Control Plane for Agentic Payment》公开于 2026-07-23，临时申请未实审，只算风向标。

## 协议战开打，适配层还是空的

专利之外，协议生态同期铺开（均实测 2026-10-30）：Stripe 的 ACP 文档写明「Shared Payment Tokens——给智能体发起的购物发放限定作用域的支付凭证」，配套 Catalog feed 让商户把商品数据喂给 AI 发现；Google 的 AP2 开源仓库 3,254 星（2025-05-30 创建，Apache-2.0）；ACP 规范仓 1,591 星，Anthropic 的 commerce-agents 仓库 2026-09-01 新建已聚到 3,378 星，GitHub 上 agentic commerce 相关仓库共 6,862 个。规范热闹，落地端却缺胶水：中小商户要把存量商品库、库存、结账接口改造成协议兼容，目前基本靠外包手写。

## 三段能接的活

一是合同授权对账器：商户与用户都需要一把独立尺——把 ACP/AP2 的授权书、预算、有效期字段做成校验与越界告警台账，纯软件、订阅制、不碰卡号即可绕开 PCI 重负。二是商户侧协议适配网关：照着 Stripe Catalog feed 与 AP2 规范做批量转换器，按商户数收费，四周能出 MVP。三是智能体支付审计回放：每笔智能体发起的支付请求、令牌作用域、拒付证据链本地留痕可验证——凭证层专利被卡组织圈走，对凭证层做审计这层目前没有专利圈地，且与 agent 成本取证（本栏目雷达第 20 期）同构起量。

## 门槛与风险

两条路径：工具站形态（合同校验+审计台账打包 SaaS，VPS 千元级月成本起步，首批客户找已接 ACP 的跨境电商服务商）；或咨询+适配一体（帮商户接协议、顺手沉淀转换器，客单高但难规模化）。硬门槛有三个：不碰主账号 PAN、全部停留在令牌与合同字段层，否则 PCI 合规压垮个人；规范仍在快改，ACP 与 AP2 字段半年一换，抽象层要做薄；最长期风险是卡组织把对账能力直接内建——但 PCT 尚在早期，留给独立开发者的窗口以年计。

## References
- [US12705604B2 — Mastercard：Secure payment flow using an LLM agent with a single use access token](https://patents.google.com/patent/US12705604B2/en)
- [WO2026173611A1 — Visa：Infrastructure for authenticated agentic commerce](https://patents.google.com/patent/WO2026173611A1/en)
- [WO2026173648A1 — Visa：Agentic payments and commerce](https://patents.google.com/patent/WO2026173648A1/en)
- [AU2026906209A0 — Bounded Execution Compliance Control Plane for Agentic Payment](https://patents.google.com/patent/AU2026906209A0/en)
- [Stripe Agentic Commerce 文档](https://docs.stripe.com/agentic-commerce)
- [Google AP2 开源仓库](https://github.com/google-agentic-commerce/AP2)
- [ACP 规范仓库](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- [站内：范式雷达第 20 期——标价之外，Harness 替你买了什么]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)
