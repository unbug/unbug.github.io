---
layout: post
title: "AI 智创简报：《网络排障 Agent 上场干活，考场却没人监考》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-network-agent-testing-patents.svg
tags: [patent, aiops, network-agent, agent-evaluation, indie]
description: "2026 年 6 到 8 月七周内，Cisco、Microsoft、ServiceNow、Juniper 密集授权或公开七件网络运维智能体专利，大厂平台圈住智能体动手改网这层，第三方考场、内网只读副驾与行为审计回放是个人能接的三段。"
---

2026 年 6 月 23 日到 8 月 13 日的七周内，Cisco、Microsoft、ServiceNow、Juniper 密集授权或公开七件网络运维智能体（让大模型智能体替人排查与恢复网络故障的 AIOps Agent）专利。大厂圈住智能体直接动手改网络这层，动手前后的评测考场与行为审计仍无厂商设防。

![网络排障智能体专利时间轴与开源生态缺口]({{ site.baseurl }}/assets/images/innovation-brief-network-agent-testing-patents.svg)

## 专利信号

七件全部经 Google Patents 详情页核验，公开号、申请人与公开日逐字照录：

- **US12701042B2**，Microsoft Technology Licensing, LLC，2026-08-04 授权：系统日志加函数层级图做结构化 grounding（把事实材料喂给模型再回答），定事故根因。
- **US12665804B2**，Cisco Technology, Inc.，2026-06-23 授权：从场景库实例化损伤场景，先在真实网络造故障，再考排障智能体。
- **US12705437B2**，Cisco Technology, Inc.，2026-08-11 授权：智能体执行结果与用户先前脚本的执行结果对拍比较。
- **US12683886B2**，Cisco Technology, Inc.，2026-07-14 授权：判定用户不满意后，据差评自动生成训练场景。
- **US12701054B2**，Cisco Technology, Inc.，2026-08-04 授权：测试环境模拟损伤定 ground truth，强化学习教学。
- **US20260238551A1**，ServiceNow, Inc.，2026-08-13 公开（审查中）：解决过程指标超阈值时自动拉人类坐席交接。
- **EP4548546B1**，Juniper Networks, Inc.，2026-08-05 公开授权文本：性能指标时间序列建知识图谱定位根因，是非大模型路线的对照组。

## 大厂路线：平台内闭环

把七件权利要求放在一起看，共同点是全部绑定自家平台：造故障要接控制器与网卡，评测要拿平台内脚本做对照，升级交接要接工单指标。智能体在平台里闭环动手，考场也握在平台自己手里，七件里没有一件把考场卖给别人。这与 [ORCA-bench 论文]({{ site.baseurl }}/one-minute-read-paper-orca-bench-how-ready-are-language-model-agents-for-oncall/)追问的问题同源：智能体上值班究竟行不行，目前缺的是考场，不是模型。

## 三处缝隙

**第三方考场**：Cisco 测试、评测、教学三件都要求可编排故障场景加 ground truth 对拍，但没有一家把这套能力卖给外部客户跑自己的智能体。开源 containerlab（`2,910` 星）可搭隔离拓扑、脚本化注入故障，个人可组「智能体考证包」：客户采购或自研的网络智能体进隔离沙场考题化跑分，交付验收报告。大厂测自己的智能体，接这单的人测所有人的智能体。

**内网只读副驾**：银行、政企、医疗的网络数据出不了内网，大厂的 agentic 能力绑定自家云平台。用 netmiko（`4,312` 星）加网络配置分析工具 batfish（`1,515` 星）加本地小模型，做内网只读排障副驾，只给建议、人来执行，顺带避开自动执行类权利要求。

**行为审计回放**：ServiceNow 只圈住指标超阈值拉人这一步，智能体每一步动作录像式留存、供网络变更事故定责的独立第三方审计层，七件专利无人占位，而这在路由改错的定责场景里是刚需。

## 市场信号

Mordor Intelligence 口径下 AIOps 市场 2026 年 `189.5 亿美元`、2031 年 `377.9 亿美元`，2026 到 2031 年增长 `14.80 %`（另一家机构口径差异大，此处只取一家）；同页记录 ScaleOps 2026 年 3 月融资 `1.3 亿美元`、Spectro Cloud 2026 年 7 月融资 `1 亿美元`。开源侧仍在生长期：通用网络库体量很大（netmiko `4,312` 星、containerlab `2,910` 星、batfish `1,515` 星），直接竞品却稀疏：netbox-agent-compliance 仅 `22` 星、lyraios `137` 星且已停更，爱立信 2026-10-13 开源的同方向测试床还是 `0` 星（星数均为 GitHub API 实测 2026-10-28）。这与 [Agent 护栏专利那篇]({{ site.baseurl }}/innovation-brief-agent-guardrail-patents/)同构：大厂的权利要求停在平台边缘，考场与回放录像机是个人能接的三段生意。

## References
- [Google Patents：US12701042B2 Automated root cause determination using a pre-trained generative model][p-msft-rca]
- [Google Patents：US12665804B2 Testing framework for language model-based computer network troubleshooting agents][p-cisco-test]
- [Google Patents：US12705437B2 Evaluation framework for LLM-based network troubleshooting and monitoring agents][p-cisco-eval]
- [Google Patents：US12683886B2 Generating network scenarios to train an LLM-based network troubleshooting agent][p-cisco-scen]
- [Google Patents：US12701054B2 Teaching LLM-based agents to troubleshoot networks using reinforcement learning][p-cisco-rl]
- [Google Patents：US20260238551A1 Agentic escalation for IT operations][p-snow]
- [Google Patents：EP4548546B1 Framework for automated application-to-network root cause analysis][p-jnpr]
- [Mordor Intelligence：AIOps Market（市场规模与融资信号，实测 2026-10-28）][s-mordor]
- [GitHub：srl-labs/containerlab（星数实测 2026-10-28）][s-lab]
- [GitHub：ktbyers/netmiko（星数实测 2026-10-28）][s-netmiko]
- [GitHub：batfish/batfish（星数实测 2026-10-28）][s-batfish]


[p-msft-rca]: https://patents.google.com/patent/US12701042B2/en
[p-cisco-test]: https://patents.google.com/patent/US12665804B2/en
[p-cisco-eval]: https://patents.google.com/patent/US12705437B2/en
[p-cisco-scen]: https://patents.google.com/patent/US12683886B2/en
[p-cisco-rl]: https://patents.google.com/patent/US12701054B2/en
[p-snow]: https://patents.google.com/patent/US20260238551A1/en
[p-jnpr]: https://patents.google.com/patent/EP4548546B1/en
[s-mordor]: https://www.mordorintelligence.com/industry-reports/aiops-market
[s-lab]: https://github.com/srl-labs/containerlab
[s-netmiko]: https://github.com/ktbyers/netmiko
[s-batfish]: https://github.com/batfish/batfish
