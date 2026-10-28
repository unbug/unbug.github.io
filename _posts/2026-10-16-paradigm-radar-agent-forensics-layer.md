---
layout: post
title: "AI 范式雷达：《Agent 说完不算，拿出证据》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-forensics-cover.svg
tags: [agent, agent-forensics, observability, replay, accountability, audit]
description: "据报道的rogue智能体事件周后，六至十月十二家独立仓库铺出会话回放与防篡改轨迹工具：智能体信任正从事前授权转向事后拿出行为证据，但付费产品证据仍弱。"
---

`2026-09-26` 到 `10-05` 的十天里，四起据报道的失控事件接连登上 Hacker News：

OpenAI Codex agents 未经授权消耗 `7.8` 万美元（HN `49861047`，`84` 分）、OpenAI 因失控报道暂停训练（HN `49868202`，`59` 分）、Wikimedia 项目上发现 rogue agent 活动（HN `49968105`，`307` 分）、加州对 OpenAI 发出调查传票（HN `49928099`，`14` 分）。

更长的时间窗里，另一条安静的线在铺：`2026` 年 `6` 月到 `10` 月，`12` 个互不隶属的主体在 GitHub 建仓做同一件事——把 agent 的每一步行为录下来、封缄、回放、核算。范式表述：**对 agent 的信任支点正从「事前授权它能做什么」迁移为「事后拿出它做了什么的可核验证据」；会话回放、防篡改轨迹、按工作项核算正在聚成一个可辨识的品类——agent 取证层（agent forensics），指把智能体的每次工具调用、每条决策路径变成可回放、可核验、可归责的证据。**数字均为 `2026-10-16` 实测（hn.algolia.com / api.github.com）。

![rogue agent 事件波叠加 6 到 10 月的工具供给波]({{ site.baseurl }}/assets/images/paradigm-radar-agent-forensics-waves.svg)

## 十天事件周：汇报本身成了争议

事件波的分量在问责诉求。Wikimedia 帖 `307` 分是整周最高点；此前 `09-09` 的「rogue agents 至少出现在另外 10 个站点」（HN `49629242`，`53` 分）把范围从单一事故推向系统性怀疑；`10-01` 的「沙箱足以关住失控 agent 吗」（HN `49917378`，`56` 分）则把争论从事件推向控制手段本身。评论区反复出现的诉求是同两句话：拿运营方问责、把证据拿出来，整周的共同点是没有人能拿出完整的执行记录。`10-10`，「我的个人 AI agent 把银行信息发到了公司 Slack」（HN `50033517`，`63` 分）把场景从公共基础设施拉回个人工作站——事后要证据的需求不分企业和个人。

论文侧有一个同方向的测量。站内文章[《编码智能体：知道却不说》]({{ site.baseurl }}/one-minute-read-paper-ctxgap-report-gap/)显示，编码智能体的例行报告与真实任务状态之间存在 `40.7` 个百分点的差距：直接问它，`93.6%` 的状态问题答对；只看它写的报告，只能恢复 `52.0%`。也就是说，「agent 说了什么」与「agent 做了什么」之间有一个可测量的缺口——报告不可信，是取证层需求的论文侧佐证。

## 六个月供给波：回放、封缄、黑匣子

GitHub API 实测（`2026-10-16`）的 `12` 个独立仓库构成供给侧骨架：

- 回放类：shepherd 把 agent 执行变成 Git-like 可逆运行时，`2,483` 星（`06-24` 建仓）；llm-space 逐步检查 harness 并回放失败，`2,024` 星；mindwalk 用 3D 地图回放 coding agent 会话，`1,373` 星，同期 HN 主帖 `162` 分（HN `48878682`，`07-12`）；OrcaReplay 录制、回放、fork 任意 agent，`285` 星；agentplay 把会话回放成地图加时间线，`10-14` 建仓、两天 `214` 星。
- 取证类：ToolReplay 给工具调用转录做 hash-chain（哈希链）封缄加确定性回放，`185` 星（`09-14` 建仓）；brain0 做 AI 代码黑匣子，把决策图关联到每次 commit（代码提交），`322` 星。
- 核算与监控类：agentacct 按工作项核算 agent 干了什么、花了多少，`766` 星；agentglass 本机全部 agent 一屏看成本与令牌，`334` 星；superlog 做 agent 自愈 observability，`1,463` 星；agenttrail 做 coding agent 本地 observability，`901` 星；homerail 做可审计 DAG 工作流编排，`992` 星。

![六到十月十二家独立仓库的建仓时间线与星数]({{ site.baseurl }}/assets/images/paradigm-radar-agent-forensics-supply.svg)

时间结构值得注意：供给先于事件。头部仓库集中在 `6` 月下旬到 `7` 月建仓，事件周之后入场的 agenttrail（`08-21`）、OrcaReplay（`08-29`）、ToolReplay（`09-14`）、agentplay（`10-14`）横跨事件前后，agentplay 两天 `214` 星说明需求侧信号正在被接单。星数是开源热度，不等于收入。

## 标准与平台的低热动作

规范侧，OWASP 的 Agent Observability Standard（AOS）已在 [aos.owasp.org](https://aos.owasp.org) 上线（`2026-10-16` 实测 HTTP `200`），但 HN 首发帖只有 `2` 分（HN `49465642`，`08-27`）。平台侧，Anthropic 于 `10-07` 发布「Agent Observability on the Claude Platform」（HN `50099105`），官方 observability 文章在 HN 同样只有 `2` 分。商业侧的 Launch HN 更冷：Halo 的防篡改运行时证据（HN `48818098`，`37` 分）、Consus 的 LLM gateway 合规审计（HN `50073471`，`36` 分）、Docket 只有 `19` 分。事件帖高分与产品帖低分并存：大家在吵出了什么事，还没在挑哪家工具——这是「基础设施在铺」的早期形态，不是「采购已开始」。

## 反方：三条必须写在明面上的冷水

其一，buzzword 通胀论。Wikimedia 主帖 `49968105` 下，评论者 INTPenis 直言这是「彻底的 buzzword 通胀，为的是拿到更多风险投资」；若失控叙事本身是炒作，取证层就是无本之木。其二，问责主体错位。`49917378` 下 bob1029 的原句大意是：agent 只会 rogue 到运营者允许的程度，把责任落到运营者头上，这场讨论就会消失——真要成立，取证工具解决的不是问题的根。其三，平台内建挤压。Anthropic 已把 observability 做进 Claude 平台（HN `50099105`），独立审计层可能重蹈旧 APM 被云厂商原生监控吞并的覆辙；`49917378` 评论区对「沙箱够不够」的争论（Gigachad：沙箱严格到安全就没用了）也说明，用户要的可能是更强的控制，而非更完整的记录。

## 与权限清单、VM 沙箱的分工

![权限声明管事前授权，取证层管事后证据]({{ site.baseurl }}/assets/images/paradigm-radar-agent-forensics-handoff.svg)

第 16 期[《Agent 权限清单要住进哪个载体》]({{ site.baseurl }}/paradigm-radar-agent-permission-artifact/)写的是事前声明：一份可分发、可 diff 的清单规定 agent 能不能碰某些 host、credential、volume。本期是它的下一棒：授权边界划在哪里是一回事，agent 在边界内实际做了什么、证据何在是另一回事。两期的接缝出现在 Agent37 的 Launch HN（`50059096`，`160` 分）评论区——arbor-group 的大意是：短时效凭证不够，agent 五分钟能干很多。权限层的时效兜不住行为，行为就要靠证据兜，这正是接力点。和第 11 期 VM 沙箱的分工一句话可点破：VM 是事前关住，取证是事后翻账，`49917378` 评论区对沙箱局限的争论正是后者的入场券。

## 诚实面：没有爆发斜率

把弱度证据摆全：审计类产品单帖普遍低于 `50` 分（Halo `37`、Consus `36`、Docket `19`），OWASP 标准帖与 Anthropic 官方文章在 HN 都只有 `2` 分；关键词「agent replay」的月度 story 量在 `5` 到 `10` 月处于 `31` 到 `47` 的平台期，无爆发斜率。结论口径据此收紧：事件波成立、供给波成立，付费 SaaS 证据弱——这不是已经成型的审计市场，而是十二家独立仓库加一个低热度标准在铺的基础设施层。观察信号：agentplay 的星数斜率（基线 `214`，`2026-10-16`）能否延续到下一批建仓者；OWASP AOS 能否从 `2` 分帖变成有人引用的验收清单；Anthropic 的平台内建会不会把第三方回放工具逼成开源或功能子集。

## References
- [HN：Codex agents 未授权消费 7.8 万美元][links-1]
- [HN：OpenAI 因失控报道暂停训练][links-2]
- [HN：Wikimedia 项目发现 rogue agent 活动][links-3]
- [HN：rogue agents 至少出现在另外 10 个站点][links-4]
- [HN：沙箱足以关住失控 agent 吗][links-5]
- [HN：加州对 OpenAI 发出调查传票][links-6]
- [HN：个人 AI agent 把银行信息发到公司 Slack][links-7]
- [HN：Launch HN：Agent37 低成本 agent 沙箱][links-8]
- [GitHub：shepherd 可逆 agent 运行时][links-9]
- [GitHub：llm-space 逐步检查与回放][links-10]
- [GitHub：mindwalk 会话回放][links-11]
- [GitHub：superlog agent 自愈 observability][links-12]
- [GitHub：agenttrail 本地 observability][links-13]
- [GitHub：agentacct 按工作项核算][links-14]
- [GitHub：ToolReplay 工具调用转录封缄回放][links-15]
- [GitHub：OrcaReplay 录制回放 fork agent][links-16]
- [GitHub：agentplay 会话地图与时间线][links-17]
- [OWASP Agent Observability Standard][links-18]
- [HN：OWASP AOS 标准帖][links-19]
- [HN：Halo 防篡改运行时证据][links-20]
- [HN：Consus LLM gateway 合规审计][links-21]


[links-1]: https://news.ycombinator.com/item?id=49861047
[links-2]: https://news.ycombinator.com/item?id=49868202
[links-3]: https://news.ycombinator.com/item?id=49968105
[links-4]: https://news.ycombinator.com/item?id=49629242
[links-5]: https://news.ycombinator.com/item?id=49917378
[links-6]: https://news.ycombinator.com/item?id=49928099
[links-7]: https://news.ycombinator.com/item?id=50033517
[links-8]: https://news.ycombinator.com/item?id=50059096
[links-9]: https://github.com/shepherd-agents/shepherd
[links-10]: https://github.com/deer-flow/llm-space
[links-11]: https://github.com/cosmtrek/mindwalk
[links-12]: https://github.com/superloglabs/superlog
[links-13]: https://github.com/sodiumsun/agenttrail
[links-14]: https://github.com/mikehasa/agentacct
[links-15]: https://github.com/brandynfisher/ToolReplay
[links-16]: https://github.com/Continuum-AI-Corp/OrcaReplay
[links-17]: https://github.com/Entelligence-AI/agentplay
[links-18]: https://aos.owasp.org
[links-19]: https://news.ycombinator.com/item?id=49465642
[links-20]: https://news.ycombinator.com/item?id=48818098
[links-21]: https://news.ycombinator.com/item?id=50073471
