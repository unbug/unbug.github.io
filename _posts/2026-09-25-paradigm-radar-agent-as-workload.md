---
layout: post
title: "AI 范式雷达：《智能体正从应用循环迁为集群一等负载》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-as-workload.svg
tags: [agent, orchestration, kubernetes, scheduler]
description: "google/ax 发布 v0.3.0 并直接对标 Kubernetes，下层运行时自述百万级沙箱与 sub-500ms resume；同期 Linear 证实 AI 代码压垮 CI。供给端与需求端同周交汇，Agent 正从应用框架里的循环变成集群调度器眼里的一等负载。"
---

「Agent 是应用框架里的一个 loop」这个定义正在被基础设施层改写。

GitHub 组织为 google 的开源编排运行时 ax 于 2026-09-20 发布 `v0.3.0` 并冲上 HN 头版，拿下 `663` 分、`299` 条评论（2026-09-25 实测），仓库现有 `11,045` 星（同日实测）。README 自述这是一个「在集群内运行 billions 级自主 Agent 负载的高吞吐声明式编排器」，并直接写明「If you have used Kubernetes, ax will feel similar」。范式表述：Agent 从「应用框架里的一个 loop」迁移为「集群调度器眼里的一等负载」。同一周，Linear 官方博客给出需求侧独立证据——AI 生成代码让 CI 成为新瓶颈、流水线被迫重构，相关 HN 帖 `313` 分（实测）。供给端与需求端两条互不相关的线，同周指向同一件事。

口径先钉死：首采为 `2026-09-25` 实测（GitHub API / Algolia API）；`2026-11-16` 复测——ax 主帖 `666` 分 / 全树 `299` 条，google/ax 仓库 `14,724` 星 / `794` fork（`11-16` 当天仍有提交），最新版本 v0.3.1（`09-25` 发布，之后无新版）；Agent Substrate `6,825` 星（首采 `3,761`，七周 `1.8` 倍）；Linear 帖 `317` 分、全树 `408` 条（远超首采所见评论数，讨论在帖后持续生长）。billions / millions / sub-500ms 均为仓库自述口径，复测仍未见第三方压测；App Store 增长等评论区数字标注转述。

![Agent 负载的两端：声明式编排器与排队的人肉瓶颈]({{ site.baseurl }}/assets/images/paradigm-radar-agent-as-workload.svg)

## 供给端：微服务原语逐件复刻

ax 的形态就是把 Kubernetes 时代的词汇表逐件搬到 Agent 上：声明式 manifest 描述期望状态，每个 Agent 任务跑在沙箱里，网络出口走 Gateway 白名单，生命周期支持 suspend/resume。它的下层项目 Agent Substrate 主打密度与唤醒速度——README 自述「millions of sandboxes」量级的沙箱密度与 `sub-500ms` resume，靠挂起空闲 Agent 复用 worker 资源。复测里最硬的证据是工程活性：substrate 七周从 `3,761` 星涨到 `6,825` 星、`11-14` 仍有提交；ax 仓库 `11-16` 当天还在收 commit——「发布即弃」的质疑至少在观察窗口内不成立。必须继续标注口径：billions、millions 仍是自述目标，没有第三方压测数据背书；ax 的性质是开源运行时，不是 Google 云的商业产品承诺。但原语清单本身是真的——调度、隔离、配额、生命周期，这些当年为微服务设计的概念正在被一件不落地套在 Agent 上。

线程里对「谁在做」有一条容易被略过的溯源链：mynegation（评论 `49781452`）指认项目由 rakyll 公开推进「在推特上发帖推动，看起来背后有支像样的团队」（评论转述口径）——项目不是部门整编的产物，更像个人信誉驱动的孵化；mcoliver（`49781514`，子树 `22` 条）把它接进 Google 自家工具链语境（Antigravity harness、Jules 用户顺手一试）；alembic_fumes（`49785882`，子树 `16` 条）则当场戳穿官网文案的张力：「一边说『以毫不妥协的人机工程为焦点、快速迭代』，一边给你 K8s 级的概念清单——这两句话至少有一句是修辞」。这三条合读，ax 的真实身份更接近「带官方门牌的团队实验」：比 side project 有资源，比产品承诺有弹性——读者该用什么预期管理它，正是第三节厂牌折扣派与工程活性证据之间的裂缝。

## 争议副楼：这些负载到底需要多大的沙箱

沙箱是 ax 概念清单里最贵的组件，线程里为它单开了一栋楼。Onavo（`49782813`，子树 `8` 条）发难：「不做代码执行就不需要沙箱——推理-only 的应用多的是，比如抓一个常年不变的网页」；IanCal（`49783624`，子树 `7` 条）一句话收回去：「只要你的 agent 能联网、能读你不希望公开的文件，就需要——这已经是最小场景了」。srcreigh 的自我反对票（`49781615`）最专业：「把宿主文件系统挂进不信任的 k8s pod，这种 VM 我不想要」——编排器把文件系统便利给了 agent，等于把 vm-containment 一案的逃逸攻击面重新请回房间；chrisweekly（`49781579`）与 LeBit（`49781659`）递出的 smolmachines 微 VM 方案（可挂 K8s、可挂 S3）说明社区已经在用「更小沙箱换更高密度」的显学回应这道题。这栋楼的实质是编排层的隐藏考题：suspend/resume 与高密度复用是 ax 的卖点，而隔离强度是它的成本——两个卖点同时拉满时，密度与安全在同一批 worker 上直接对撞，本刊[《隔离质量等于攻击面质量》]({{ site.baseurl }}/paradigm-radar-vm-containment/)的结论在这里换了个形态重新生效：集群把沙箱做成默认组件只是及格线，做成多大的沙箱才是真决策。

## 前传：「k8s for agents」早在年初就有民间抢注

`11-16` 检索补上前史：`2026-01-20` 有 KAOS——The Kubernetes Agent Orchestration System（HN `46688521`，`26` 分），`02-15` 有 Klaw.sh 直白标题《Kubernetes for AI agents》（HN `47047223`，`60` 分 / `43` 条）。google/ax 仓库本身 `03-30` 才创建。也就是说「把 K8s 那套搬到 Agent」在民间提案里比 Google 入场早了整整两个月，而民间版声量只有主场版的十分之一。这个比例本身就是范式判断的另一半证据：方向不是 Google 发明的，是行业水位涨出来的；平台大厂出手的作用不是定义，而是点火与收敛——与 SKILL.md 一月份两家民间抢注、二月平台登顶的剧本同构。反过来说，民间编排项目（Klaw.sh 之外还有 01-23 的 YAML+Prolog agent 构建器之类）集体沉寂也提示了另一种读法：这类项目挂掉的比火的多，ax 活到 v0.3.1 靠的不是创意而是维护承诺。复测查了两家民间项目的仓库活性，结局一冷一热：Klaw.sh（`636` 星）最后一次 push 停在 `03-30`——发布帖三个月后代码就没了下文；KAOS（`286` 星）反而还在动，`11-15` 仍有提交——声量最高的民间提案先熄火，说明编排赛道杀死项目的不是对手，是维护带宽。

![时间线：1月民间抢注（KAOS 26分/Klaw 60分）→ 3月 ax 建仓 → 9月20日 v0.3.0 主帖 663 分与 Linear 313 分同周 → 11-16 复测当天仍有提交]({{ site.baseurl }}/assets/images/paradigm-radar-agent-workload-timeline.svg)

## 需求端：为人类节奏设计的基础设施先排队

Linear 官方博客的标题直白：AI coding has made CI a bottleneck, so we reworked ours to keep up。代码产出量由 Agent 放大后，按人类提交节奏设计的持续集成流水线开始排队，他们为此重构了整条链路。这条证据的价值在于独立性——Linear 与 ax 是互不关联的两家主体，不存在「Linear 用了 ax」这回事；它证明的是需求侧压力真实存在：先压垮的不是集群调度器，而是离 Agent 产出最近的那层旧设施。

复测精读 Linear 线程（全树 `408` 条），需求侧图景比「CI 排队」更深一层。torben-friis（评论 `49793761`，子树 `248` 条）提出全线程最大悖论：「所有人快到处撞墙，为什么下游用户端看不到对应的产品改善？」——apf6（`49793953`，子树 `63` 条）用转述数据接招：「去年问 AI 在哪，今年 App Store 新提交同比涨 84%」；torben-friis 自己在 `49794013`（子树 `44` 条）拆台：「量不等于价值，GitHub 宕机有一部分就是 vibecoded push 的体重压的」（评论转述，非实测）。更值钱的是两个「瓶颈后移」证词：aliclark（`49792937`，子树 `31` 条）「我们那卡住的不是 CI，是人肉验收——它能跑，但不是我们要的方式跑」；TrueDuality（`49793932`，子树 `42` 条）「公司里 AI 干得最猛的两件事：烧掉积压技术债 + 补测试——都是没人有带宽干的活」。合起来是需求侧的完整链条：Agent 放大产出 → CI 排队（Linear 已重构）→ 人肉验收排队（尚无产品）→ 价值证明排队（线程最大的悬案）。集群编排层在这条链的最上游，Linear 们的痛在下游——两侧同时发声才构成「错位藏不住」的完整证据。线程里还有两条值得存档的旁敲：lazyasciiart（`49795559`，子树 `31` 条）问「开发者的满意度怎么样？」——重构流水线的账单最终由谁来付，帖内无人能答；xracy（`49792631`，子树 `25` 条）坦白「我是从业者但不知道 CI 缩写指什么」，consumer451（`49795689`，子树 `23` 条）接得刻薄：「对九成开发者来说 CI 本来就是过去的奢侈品」——「基础设施跟不上 Agent」的抱怨，前提是曾经人人都有像样的基础设施，这条评论提醒读者：Agent 负载暴露的断层，一部分是从前就欠的债。

## 反方：四派质疑都立在实处

HN 主帖（全树 `299` 条）下的质疑比首版记录的多出一派。必然论疲劳与复杂度复刻依旧成立：有评论讽刺「k8sification of AI was always inevitable, if only as a form of salary justification」；「Overly complex; yaml files, heavy framework」获多条附和。第二派是「普通服务」论：faizshah（`49782804`，子树 `9` 条）「人人都有沙箱、都有工具注册表、都有跑 agent 的办法——这不是新原语是旧货拼装」；weedfroglozenge（`49782024`）更狠：「没人有用途，官网 demo 演示的其实就是暂停再恢复」。第三派攻击的是「Google」这个定语：Mond_（`49781164`，子树 `23` 条）「九成把握 Google 高层没听说过这项目，标题里的『Google 的』有误导性——发布在 google 组织不等于公司级承诺」，gnaman（`49782704`，子树 `14` 条）补刀「就是那个把 gemini cli 杀掉又换个壳复活的 Google」，线程里 Google+ 与 Wave 的嘲讽（`49782752`、`49782876`）构成厂牌信任折扣，jmathai（`49780943`，子树 `7` 条）则展示了折扣在读者端的完成态：「我说不上原因，但 Google 的这类新闻我早就直接跳过——不知道是哪年攒下的印象」。第四派是复测新增的生态病理观察：briga（`49781958`，子树 `29` 条）「根本没有什么收敛，人人每天都在写新 agent 框架」——编排器想终结的碎片化，恰是它自己的出生环境。sigbottle（`49781801`，子树 `85` 条，全帖最高）的困惑是这一派的民意基础：「谁能给我讲清楚现在收敛出的工作流长什么样？我看到的只有沙箱、网关、注册表一堆互不相认的原语」。四派共同点：都不否认 Agent 负载在涨，争的是「新负载」还是「旧负载的新流量」、以及「Google 背书值几成」。但 substrate 社区里也长出了建设性读法：srcreigh（`49781555`，子树 `14` 条）「substrate 勾掉的那堆格子——沙箱、配额、生命周期——本该是我们跑一切软件的 table stakes，不只 agent」；他也顺手递了反对票给自己（`49781615`）：「把宿主文件系统挂进不信任的 k8s pod，这不是我想要的 VM」——隔离工程的老问题随编排层一起到货，与本刊[《隔离质量等于攻击面质量》]({{ site.baseurl }}/paradigm-radar-vm-containment/)直接接壤。

## 观察信号回表与边界

首版三个可证伪信号对表（`2026-11-16`）：其一，第三方压测或生产事故报告——未见，密度与唤醒数字维持自述口径，但 `11-16` 当天仍在收 commit、substrate 星数 1.8 倍，弃坑概率下降；其二，「普通服务加队列」阵营跑通同等规模对照——未见公开对照，Klaw.sh 等民间项目发布后沉寂反而是弱反证；其三（本文补）：Google 厂牌折扣是否兑现——v0.3.1 后六周无新版但未归档，悬而未决。与本刊[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/)是同一迁移的上下游但轴不同：那篇管单个 Agent 长任务的资源归因，本期管集群调度层——先有负载被调度，才谈得上给负载画像。与[《一份技能文件写一次，所有客户端都能跑》]({{ site.baseurl }}/paradigm-radar-skill-md-standard/)则是能力层的姊妹迁移：主帖评论区里 DanMcInerney（`49781408`）一句「skills 是所有 agent harness 的通用语言」点破了分工——编排层管 agent 在哪跑、技能层管 agent 会什么，两层同时从应用框架里析出，合起来才叫「Agent 基础设施化」。据我们观察，中文社区尚未发现同角度的集群调度解读（首采搜索通道故障未排除撞题，复测检索仍未见同题长文）。

![主帖四派质疑：必然论疲劳、普通服务论、Google 厂牌折扣、生态不收敛，各配线程证据与反证]({{ site.baseurl }}/assets/images/paradigm-radar-agent-workload-doubts.svg)

**你现在可以做的**：clone ax 跑一遍官方 demo，感受声明式 manifest 管 Agent 与管 Deployment 的手感差异；数一数自己团队里 Agent 任务每天在 CI、限流、排队上浪费多少时间——那是需求侧最便宜的证据；再做一次 aliclark 式盘点：你的瓶颈到底卡在机器（CI）还是人（验收），两者药方完全不同；最后认真回答一次：你的 Agent 负载用普通队列到底跑不跑得动。

## References
- [google/ax 仓库][links-1]
- [AX – Google's Open Agentic Orchestrator（HN）][links-2]
- [Agent Substrate 仓库][links-3]
- [Linear：CI 瓶颈重构博客][links-4]
- [Linear CI 帖（HN）][links-5]
- [Klaw.sh：Kubernetes for AI agents][links-6]
- [KAOS：Kubernetes Agent Orchestration System][links-7]
- [Linear 线程：瓶颈后移讨论][links-8]
- [站内：AI 范式雷达《隔离质量等于攻击面质量》][links-9]
- [站内：AI 范式雷达《一份技能文件写一次，所有客户端都能跑》][links-10]


[links-1]: https://github.com/google/ax
[links-2]: https://news.ycombinator.com/item?id=49780797
[links-3]: https://github.com/agent-substrate/substrate
[links-4]: https://linear.app/now/ci-bottleneck-reworked
[links-5]: https://news.ycombinator.com/item?id=49792067
[links-6]: https://news.ycombinator.com/item?id=47047223
[links-7]: https://news.ycombinator.com/item?id=46688521
[links-8]: https://news.ycombinator.com/item?id=49793761
[links-9]: {{ site.baseurl }}/paradigm-radar-vm-containment/
[links-10]: {{ site.baseurl }}/paradigm-radar-skill-md-standard/
