---
layout: post
title: "AI 范式雷达：《智能体正从应用循环迁为集群一等负载》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-as-workload.svg
tags: [agent, orchestration, kubernetes, scheduler]
description: "google/ax 发布 v0.3.0 并直接对标 Kubernetes，下层运行时自述百万级沙箱与 sub-500ms resume；同期 Linear 证实 AI 代码压垮 CI。供给端与需求端同周交汇，Agent 正从应用框架里的循环变成集群调度器眼里的一等负载。"
---

「Agent 是应用框架里的一个 loop」这个定义正在被基础设施层改写。GitHub 组织为 google 的开源编排运行时 ax 于 2026-09-20 发布 `v0.3.0` 并冲上 HN 头版，拿下 `663` 分、`299` 条评论（2026-09-25 实测），仓库现有 `11,045` 星（同日实测）。README 自述这是一个「在集群内运行 billions 级自主 Agent 负载的高吞吐声明式编排器」，并直接写明「If you have used Kubernetes, ax will feel similar」。范式表述：Agent 从「应用框架里的一个 loop」迁移为「集群调度器眼里的一等负载」。同一周，Linear 官方博客给出需求侧独立证据——AI 生成代码让 CI 成为新瓶颈、流水线被迫重构，相关 HN 帖 `313` 分（实测）。供给端与需求端两条互不相关的线，同周指向同一件事。

## 供给端：微服务原语逐件复刻

ax 的形态就是把 Kubernetes 时代的词汇表逐件搬到 Agent 上：声明式 manifest 描述期望状态，每个 Agent 任务跑在沙箱里，网络出口走 Gateway 白名单，生命周期支持 suspend/resume。它的下层项目 Agent Substrate 主打密度与唤醒速度——README 自述「millions of sandboxes」量级的沙箱密度与 `sub-500ms` resume，靠挂起空闲 Agent 复用 worker 资源；该仓库 `3,761` 星（2026-09-25 实测）。必须标注口径：billions、millions 均为仓库自述目标，没有第三方压测数据背书；ax 的性质是开源运行时，不是 Google 云的商业产品承诺。但原语清单本身是真的——调度、隔离、配额、生命周期，这些当年为微服务设计的概念正在被一件不落地套在 Agent 上。

## 需求端：为人类节奏设计的基础设施先排队

Linear 官方博客的标题直白：AI coding has made CI a bottleneck, so we reworked ours to keep up。代码产出量由 Agent 放大后，按人类提交节奏设计的持续集成流水线开始排队，他们为此重构了整条链路。这条证据的价值在于独立性——Linear 与 ax 是互不关联的两家主体，不存在「Linear 用了 ax」这回事；它证明的是需求侧压力真实存在：先压垮的不是集群调度器，而是离 Agent 产出最近的那层旧设施。供给端在造新原语，需求端在为旧原语打补丁，两侧同周出现，说明错位已经大到藏不住。

## 反方：必然论疲劳与「普通服务」论

HN 主帖下的三条高质疑都成立。第一是必然论疲劳：有评论讽刺「k8sification of AI was always inevitable, if only as a form of salary justification」——每当新负载出现就复刻一套编排栈，可能更多是岗位自我辩护而非技术必需。第二是复杂度病灶复刻：「Overly complex; yaml files, heavy framework」获多条附和，声明式 manifest 恰是微服务时代被诟病最深的部分，YAML 地狱可能随原语一起移植过来。第三刀最直接，攻击本期范式表述本身：Agent 为什么不是普通软件工程？一个队列加重试就能跑的东西，不需要发明新原语——如果这条成立，ax 们就是在给旧瓶刻新标签。三条质疑的共同点是都不否认 Agent 负载在涨，争的是「新负载」还是「旧负载的新流量」。

## 边界与接下来盯什么

本文证据只到公开仓库与热帖层：README 自述的规模目标未经压测，ax 能否调度真实集群、suspend/resume 是否损耗语义状态，均无第三方验证。与本刊第 184 期[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/)是同一迁移的上下游但轴不同：那篇管单个 Agent 长任务的资源归因，本期管集群调度层——先有负载被调度，才谈得上给负载画像。据我们观察，中文社区尚未发现同角度的集群调度解读（搜索通道故障，未经实测排除撞题）。三个可证伪信号：ax 是否出现第三方压测或生产事故报告；Substrate 的自述密度数字是否有人复现；「普通服务加队列」阵营里是否有人公开跑通同等规模的对照方案。

**你现在可以做的**：clone ax 跑一遍官方 demo，感受声明式 manifest 管 Agent 与管 Deployment 的手感差异；数一数自己团队里 Agent 任务每天在 CI、限流、排队上浪费多少时间——那是需求侧最便宜的证据；再认真回答一次：你的 Agent 负载用普通队列到底跑不跑得动。

## References
- [google/ax 仓库][links-1]
- [AX – Google's Open Agentic Orchestrator（HN）][links-2]
- [Agent Substrate 仓库][links-3]
- [Linear：CI 瓶颈重构博客][links-4]
- [Linear CI 帖（HN）][links-5]


[links-1]: https://github.com/google/ax
[links-2]: https://news.ycombinator.com/item?id=49780797
[links-3]: https://github.com/agent-substrate/substrate
[links-4]: https://linear.app/now/ci-bottleneck-reworked
[links-5]: https://news.ycombinator.com/item?id=49792067
