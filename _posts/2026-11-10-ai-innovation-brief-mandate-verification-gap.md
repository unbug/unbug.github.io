---
layout: post
title: "AI 智创简报：《智能体签发授权书热热闹闹，替双方验书的柜台还没开张》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/mandate-verification-gap.svg
image_alt: "对比图：签发侧 A2A 协议仓库 26,467 星、x402 npm 近一月下载 240 万；校验侧 Praman 15 星、sutra 9 星、kanon 4 星"
tags: [agent-mandate, agent-protocols, patents, x402, solo-dev]
description: "智能体协议专利热到 2297 件，授权书校验窄查询仅 8 件；签发头名仓库 26467 星，mandate 校验头名仅 15 星，第三方验书位暂无权利要求卡住。"
---

`2026-11-10` Google Patents 精确检索：智能体协议、协商一侧热到 `2297`、`1745` 件，授权书校验一侧窄查询只有 `8`、`33` 件——签发端在圈地，替交易双方验授权书的中立校验位还是方向差。

![签发侧协议仓库高星 vs 校验侧个位数星占坑]({{ site.baseurl }}/assets/images/mandate-verification-gap.svg)

## 六件终选，各有一句判词

Citibank `US12526244B2` 加密智能体验证（`2026-01-13` 授权）claim 第一方智能体取得定义第二方操作边界的机器可读结构并哈希入库，判词：边界结构加加密核验都在，核验方却是交易对手第一方，不是中立第三方。Citibank `US12450494B1` 用生成式 AI 验证智能体（`2025-10-21` 授权），约束集进来、生成式验证器出去，判词：验证器是银行嵌在自家流程里的。Citibank `US12694133B1` 智能体监察（`2026-07-28` 授权），观测代理盯活动数据流，判词：企业域内管行为，不管授权书条款。Citibank `US12706859B1` 交叉验证加密执行（`2026-08-11` 授权），判词：与前件同族，圈的是执行侧。清华大学 `CN120915496B` 跨域互信多智能体协作（`2026-03-10` 授权），去中心化身份加分布式账本锚定交互信息卡，判词：占住互信理论位，做的是身份认证，不是条款级校验。个人发明人 TRAN, ALEX 的 `US11593685B1` 全渠道智能协商助手（`2023-02-28` 授权），判词：个人早在协商助手位落过子。

## 检索面：签发热、核验冷的方向差

mandate（授权书，智能体替人办事时携带的机器可读授权凭证）的签发端人山人海：`"agent protocol"` `2297` 件、`"negotiation" "large language model"` `1745` 件、`"smart contract" "large language model"` `731` 件、`"protocol" "negotiation" "large language model"` `691` 件且 2025 后占 76%。核验端是另一番量级：`"verifiable credential" "autonomous agents"` 仅 `8` 件、`"mandate" "autonomous agents"` `33` 件、托管 `"escrow" "autonomous agents"` `51` 件、争议 `"dispute" "autonomous agents"` `89` 件、`"agent payments protocol"` 仅 `4` 件。核验端里 Citibank 一家在 `"verifiable credential" "autonomous agents"` 的 `8` 件里占 3 席，盘内逐条已核实，是银行圈地最硬的单一申请人证据。要交代的是：本轮没有任何真零查询，窄处也是个位到两位数，缺口是量级方向差而非空集。仓库侧同构：A2A（agent2agent 开放协议）主仓 `26467` 星、x402（HTTP 402 支付的开放协议）npm 近一月下载 `2400334`，mandate 一致性校验头名 Praman 却只有 `15` 星，Soham109/sutra `9` 星，iamonuwa/kanon `4` 星——x402 mandate 一致性测试向量加参考校验器，坑位正被一个 4 星仓库精确占住。internet-court-skill `7083` 星卖的却是自己当裁判，属另一类，不算校验位繁荣。

## 反方六条，逐条摆开

需求侧同冷是本期最大口径差异：专利圈地、工具真空、讨论冷三者同向，HN 上 mandate 相关帖最高只有 `10` 分；窗口对单人开放与伪赛道两种读法并存，本期只写三者同向，不提需求热度。反方摆六条：其一，Citibank 四件已把第一方核验圈实，切割句要摆正：核验方是交易对手，不是中立方。其二，清华件占住跨域互信的理论位。其三，internet-court `7083` 星已占「裁判」位。其四，kanon `4` 星精确占了参考校验器，先发优势未必还在。其五，无真零，窄查询也是两位数。其六，需求冷本身就可能是伪赛道信号。上一篇[内容溯源验真]({{ site.baseurl }}/ai-innovation-brief-provenance-verification-gap/)管内容真假，10-30 那期写钱怎么被授权花，本期写授权书谁来替双方验。

## 单人切口：只验不签的校验器

与 kanon 正面相遇的个人形态是 mandate 一致性校验 CLI/CI：对 AP2 mandate、x402 manifest、A2A extension 做字段级校验与越界告警，只验不签不建库。六件为何卡不住这个位：Citibank 四件的核验方都是交易对手第一方且绑加密执行或行为监察；清华件落在身份认证与账本；个人那件是协商助手本体——没有一件 claim「中立第三方对 mandate 做字段级一致性校验」。不建议自建仲裁：裁判位 `7083` 星已占，单人做不赢信任。

## References
- [Citibank 加密智能体验证专利][links-p1]
- [Citibank 生成式 AI 验证智能体专利][links-p2]
- [Citibank 智能体监察专利][links-p3]
- [Citibank 交叉验证加密执行专利][links-p4]
- [清华大学跨域互信多智能体专利][links-p5]
- [个人发明人全渠道智能协商助手专利][links-p6]
- [GitHub：a2aproject/A2A][links-g1]
- [GitHub：internet-court/internet-court-skill][links-g2]
- [GitHub：iamonuwa/kanon][links-g3]


[links-p1]: https://patents.google.com/patent/US12526244B2/en
[links-p2]: https://patents.google.com/patent/US12450494B1/en
[links-p3]: https://patents.google.com/patent/US12694133B1/en
[links-p4]: https://patents.google.com/patent/US12706859B1/en
[links-p5]: https://patents.google.com/patent/CN120915496B/en
[links-p6]: https://patents.google.com/patent/US11593685B1/en
[links-g1]: https://github.com/a2aproject/A2A
[links-g2]: https://github.com/internet-court/internet-court-skill
[links-g3]: https://github.com/iamonuwa/kanon
