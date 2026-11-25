---
layout: post
title:  "AI 范式雷达：《84条假命题裁决与规模查表》"
author: unbug
categories: [AI, ParadigmRadar, formal-verification]
image: assets/images/paradigm-radar-errata-scale-economics.svg
image_alt: "封面：上段为勘误表 789 行四段堆叠条（F 277、I 432、M 50、R 30）；下段为 277 条 F 类对其中 84 条 Checked=Lean、432 条 I 类对 0 条的对比条；底注：GitHub mccorvie/riemann-masullo，最后一次 push 实测 2026-11-25 15:42 GMT+8"
tags: [formal-verification, lean, verification, ai-agents, Mathematics, paradigm-radar]
description: "实测截至 11-25 下午：反方勘误表 789 行、84 条机器裁决两天未变；外部审计增至 5 份仅 3 份具名；1700 万行证明在规模阶梯上只是中游。"
---

实测截至 `2026-11-25 16:40`：反方勘误仓库 `mccorvie/riemann-masullo` 的勘误表 `789` 行，`84` 条「印刷命题为假」已由 Lean 机器裁决，两天没变；外部审计却从 `3` 份涨到 `5` 份——裁决稳定，审计输入还在进门。

具体口径（写作当日下午实测）：`ERRATA.md` 为 `704,959` 字节，编号到 `F277 / I432 / M50 / R30`，表行合计 `789`；仓库 `stars` `149`、体量 `31,975 KB`，最后一次 push 落在 `15:42`（GMT+8）。文件首行逐字仍是「Most entries were first reported by an AI agent.」——这条反方流水线的报告端，从第一天起就是机器。

本栏目已写过这条线的三次开场：`11-22` 的[《1700万行证明盖章时刻》]({{ site.baseurl }}/paradigm-radar-machine-checked-proof/)记录机构用机器验收一份 `1700` 万行证明；`11-23` 的[《盖章机旁边，拆机人也派出了机器人》]({{ site.baseurl }}/paradigm-radar-mirror-verification-swarm/)记录社区用机器拆另一份论文；本篇写 `48` 小时后的三笔增量：勘误仓库从「一直长」进入「裁决数稳定」；「证明的规模」第一次变成一张可查表的工程问题，`1700` 万行在阶梯上只是中游；热度重心从围观帖移向提交与复核帖。所有数字都带实测时刻，因为被审的仓库和读它的文章都在动。

![勘误表 789 行构成（F 277、I 432、M 50、R 30）与 84 条 Checked=Lean 对 I 类 0 条的对比；数据实测 2026-11-25 16:40 GMT+8]({{ site.baseurl }}/assets/images/paradigm-radar-errata-scale-economics.svg)

## 仓库进入第二天：勘误表停止变长，裁决数停着没动

把三天实测排成一张表，就能看出这条流水线在 `11-24` 夜里完成了什么、又在哪里停下：

| 项目 | `11-24 中午` 实测 | `11-25 16:40` 实测 |
|---|---|---|
| ERRATA.md 字节 | `672,405` | `704,959` |
| 编号上限 | `F277 / I431 / M50 / R30` | `F277 / I432 / M50 / R30` |
| 表行合计 | `788` | `789` |
| F 类中 Checked=Lean | `84` | `84` |
| I 类中 Checked=Lean | `0` | `0` |
| README 自述 | 约 `750` 条（`270` 假 / `400` 不精确 / `50` 缺件 / `25` 报告） | 约 `790` 条（`280` 假 / `430` 不精确 / `50` 缺件 / `30` 报告） |
| 外部审计报告 | `5` 份 | `5` 份 |
| 同名对账条目 | `93` 条 | `93` 条 |

`28` 小时内字节只涨 `32,554`、F 类一行没加：报告洪水期结束了。提交信息说明了内容：`11-25 上午`的提交是「ERRATA: the evening batch of 24 November (#7576)」「Correct the Lean statement of Definition E.1.1.1(2) and prove it」，`11-24 下午`的提交写着「288 printed statements」（`288` 条印刷陈述）——它在逐个定理推进，不是在整理文档。

数字右移自带引用风险：`11-24` 午间的快照（`672,405` 字节、`788` 行）在当天下午就对，今天已失效；本栏目 `11-23` 那篇的 `750` 行同理。任何引用必须重测。README 自述的 `280` 条「false as printed」也不等于「论文有 `280` 处错误」，它是「按印刷原样为假的陈述」的当前计数，仓库还在动。

## 84 条裁决为什么敢停下来：成熟度标记自己会退

`Checked` 列的 `Lean` 有精确含义：不是「人读着觉得不对」，而是那条印刷命题被写成一条 Lean 陈述，并附上一条**证明它不成立**的机器可查证明。`277` 条 F 类这样做的有 `84` 条；`432` 条 I 类里是 `0` 条——目前只有「假命题」这一档做到了机器裁决，而 `84` 这个数两天没变——它敢停下来，靠的是下面这套自己会退的账。

三道复核工序在原文全部逐字可查（实测 `11-25 下午`）：`389` 条标为 reviewed 的行「was given to a second agent whose task was to refute it against the page image」，反驳机撤走 `6` 条、改表 `10` 条、修正一批；此后新行发布前过同样双检，`118 older rows`（只由发现者或单个 agent 看过的老行）也补了同样的复检，撤回 `4` 条、`26` 条改判为假命题；外部报出而表内没有的内容「tested against the page images by two agents in turn」，站住的是 `F233–F248`、`I352–I373`、`M29–M49`、`R10–R30`。

更要紧的是回退机制：「forty entries were marked *Lean* too early; they have been set back to what they were.」`40` 条超前标记被公开退回——成熟度标记是滞后的、可撤回的账，不是加分项。审计端也在长大：ERRATA 现文点名 `3` 份具名外部审计（Dev Goyal、Eric Naslund、issue #2469），README 现文口径已是「Five outside audits have been compared with it report by report」，逐份比对、同名记账 `93` 条不变——增量对账尚未入账，这是本期唯一在涨的外部输入。

![复核链与回退账：双 agent 复核 389 行撤走 6 条改表 10 条，老行补检 118 条撤回 4 条改判 26 条，超前标记退回 40 条；外部审计 5 份比对、具名 3 份、同名对账 93 条；实测 2026-11-25 下午]({{ site.baseurl }}/assets/images/paradigm-radar-refutation-ledger.svg)

红线必须掐死：这 `84` 条裁决的是「这份印刷稿里的这句话为假」，不是黎曼猜想被推翻。README 逐字写明主定理缺口的出处「They did not come from this formalization」，并两次自证未完成——「The paper has no numbered statement of its main theorem」、第 13 章「does not yet state its main theorem」。写「Masullo 的证明被证伪」是错的，「那份印刷证明没有成立」才是这批工件裁决的对象。

## 热度重心：围观帖平台期，参与帖在破线

`11-25 16:30` 复测 Hacker News（Algolia items API，全树口径，同一脚本），六条帖各说各的话：

![六帖同屏：盖章声明帖 1,246 分平台期，VP ≠ VNP 帖 362 分三天涨 72 分最快，Baez 解读帖 314 分跨过 300 分线，17M lines 帖 275 分，勘误进度帖 262 分近一日 +5 分零评论，P=NP 蜂群帖 209 分稳在 150 分线上方；实测 2026-11-25 16:30]({{ site.baseurl }}/assets/images/paradigm-radar-heat-shift-six-threads.svg)

- 盖章声明帖 `50589618`：`1,246` 分、全树 `1,042` 评论，四小时级增量近乎停摆，确认进入平台期。
- Baez 解读帖 `50598441`：`314` 分、全树 `301` 评论，跨过 `300` 分线——上期留的「出圈」判据兑现。
- 《Yes, 17M lines of Lean is a lot》`50607668`：`275` 分、全树 `348` 评论，讨论量高于点赞量，是典型的「拿来当工具书」的帖。
- P=NP agent 蜂群帖 `50604314`：`209` 分、全树 `174` 评论，稳在 `150` 分线上方，延续正式小节待遇。被审页面 `pequalnp.com` 实测 `200`（`21,568` 字节），页内这句逐字在页：「Every line is a structured record of the fleet: a lemma stated, an attempt begun or dead, a verdict of the checker.」——agent 蜂群的每一步都过检查器记账，和勘误蜂群是同一套机器逻辑。
- `VP ≠ VNP over Every Field` 帖 `50620102`：`362` 分、全树 `331` 评论，三天从 `290` 涨到破 `300`，是本簇起量最快的一支。Anthropic 公开仓库的 `vp-vnp` 目录页实测 `200`（`215,925` 字节），README 自述逐字为「VP ≠ VNP over every field*, by Claude (Anthropic)」，且同页逐字警告「Both were written by AI models, and no human mathematician has checked the proof」——帖子分数加仓库可达是本期的全部证据，其数学结论与复核状态未核验，本文不写「已证并被社区接受」。
- 勘误进度帖 `50605045`：`262` 分、全树 `195` 评论，比上期 `257` 只涨 `5` 分、评论零增长，未破 `400`、不独立成轴——它的热度已经和它的勘误表一样进入第二天的平静。

## 1700 万行只是中游：证明的规模查表

`11-21` 的机构联合声明（实测 `200`，`8,064` 字节）逐字是「a Lean library comprising 17 million lines of code」与「We hereby certify that both the statement and the proof of the Riemann Hypothesis are correct」，列的检查器含 Lean 官方 kernel、con-leche、con-ron。MIT 数学家 Andrew Sutherland 维护的验证工件页（`math.mit.edu/~drew/grh`，实测 `200`，页内更新于 `11-24 05:25 UTC`）是另一套口径：`175,187` 个模块编译零错误、导出件 `61,570,595,788` 字节、独立内核 `nanoda` 与 `con-leche`、`lean4lean` 全部通过。**声明页与工件页两套数字、两份检查器名单不得混装在同一句话里。**

`1700` 万行到底算不算多，micjm 的《Yes, 17M lines of Lean is a lot》（实测 `200`；转引口径：作者自述 AI 辅助检索与制图，属二手整理）给了可查表的对照：Mathlib 维护的著名证明集超过 `1,000` 条、只有 `259` 条配有 Lean 且全部人类手写；Reservoir 索引全部已发布 Lean 包、其中 `938` 个在 GitHub 上有代码，比 `17M` 更大的有三个——`88M` 的 Qiuzhen-CFSG/CFSG（AI 建的群论分类证明库，仍在进行）、`36M` 的 CBirkbeck/LeanBridge（约 `98%` 脚本生成，手写约 `50` 万行）、`27M` 的 anthropics/fermats-last-theorem（AI 产出的费马大定理完整证明），而 Kevin Buzzard 主持的人类费马大定理项目约 `6` 万行仍在进行，AI 版本「roughly 450 times longer」。

![规模阶梯：88M / 36M / 27M / 17M / 0.06M 五档 Lean 仓库（百万行对数刻度），下段为 Mathlib 259 条与 Reservoir 938 条人类标尺；对照数据转引自 micjm 博客，检索于 2026-11-24 上午；AI 版费马大定理库约为人类版本的 450 倍]({{ site.baseurl }}/assets/images/paradigm-radar-formal-proof-scale-ladder.svg)

把两张表叠起来读，结论就出来了：把两张表叠起来，`17M` 在五档阶梯里只排第四，比它大的全是 AI 产出；人类手写的两把标尺——`259` 条著名定理有 Lean、`938` 个已发布包有代码——都停在阶梯底部两个数量级以下。「多少行算一个证明」从此是查表问题：产出规模不再稀缺，稀缺换成了给前提定论、替结论反驳的那部分——勘误仓库自己的话适合收尾：「These are the assessments of the agents that checked the entries against the pages, not a specialist's.」这话说的是机器裁决的可信度边界：`84` 条敢停下来，因为每条背后有反驳机与回退账；`432` 条 I 类不敢，因为反驳机对「论证不精确」还没有可查的形式。`17M` 行的盖章同理——它验的是「编得过、证的是那个定理」，不是「人读得懂、人同意」。

## 蜂群与检查器：两条线都到第二天，分工收敛

勘误仓库的 `84` 对 `0`（F 类有机器裁决、I 类没有）和 micjm 表的 `259` 对 `938`（著名定理有 Lean、长尾没有）说的是同一件事：**机器裁决的覆盖面由「能被形式化成什么」决定，不由产能决定。**

![覆盖面边界：F 类 277 条里 84 条已被 Lean 裁决，I 类 432 条里 0 条；Mathlib 超过 1,000 条里 259 条配有 Lean，Reservoir 已发布包里 938 个在 GitHub 上有代码；两组对比实测 2026-11-25]({{ site.baseurl }}/assets/images/paradigm-radar-coverage-boundary.svg)

假命题可以被写成一条 Lean 陈述加否定证明，论证缺口和占位缺件暂时不行；机构能盖章 `17M` 行编译全绿的库，盖不了「这 `6000` 行注释说的和 `84` 条机器裁决对得上吗」。本栏目 `11-19` 读过的[《AI 审查员抓不住研究内鬼》]({{ site.baseurl }}/one-minute-read-paper-sabotage-audit-failure/)开出的药方在这两天兑现成了工程形态：审查要可信，就得变成有留痕、可回退、被对抗的多机过程——`40` 条标记退回、`6` 条初检撤回、`4` 条老行撤回，都是同一味药的剂量。

## 其它轴动态：主簇之外，一条线首破、一条线降档

主簇之外，本期有三件事值得记账（以下均为 `11-24` 午间全轴复测实测，全树口径，状态到本期未动）。

**代码验证簇 `3.70` 降到 `3.60`，连续第六轮未过线。**Harvard 那篇验证论文 `332` 分（上期 `331`，只涨 `1`），离 `340` 降档线只差 `8` 分却六轮迈不过去；KPMG 企业侧帖 `502` 分、claude.dev 帖 `299` 分双双冻结。同一批锚里反而是一条观察线先破线：技能退化观察帖 `402` 分、`184` 评论——上期它卡在 `397` 三轮不上不下，本期首次站上 `400`。按栏目纪律，破 `400` 的观察对象单独记档、单独评级（`2.6`），不并回主簇：它看的是「AI 写码时代人的审码能力掉不掉」，和验证瓶颈是两个问题，下一步只盯有没有第二家复现。

**OpenAI 的 perplexity 替代提案（`698` 分、`443` 评论）维持 `3.5` 观察：第二家头部实验室的回应仍是零。**本期做了三重排查——HN 全库检索，`2026` 年相关讨论只有本帖；Anthropic 新闻室全文扫描，最新条目里没有交叉熵指标相关文；DeepMind 博客全文零命中。热度够了，缺的只是一个外部触发：任一头部实验室给出一段公开文本即复议。

**新轴候选：LeCun 抨击 Anthropic 帖评 `3.5`（`1324` 分、`720` 评论，发布 `19` 小时）。**这条立案门槛写在前面：任一头部实验室公开正面回应，或第三方整理出可查的立场对照帖破 `150`。现在的风险是工件太薄——单一推文转引、无机构文档，属「热度够、工件薄」；红线也先钉死：这个话题不得写成「AI 大佬内斗」，要写只能落在「开源与安全标准的论据结构」上。下期决定是否立案。

两条高热线索本期明确不立案：Nvidia 复职簇（`2251` 分、一级评论 `3183`，站内最高热）属纯财经与公司治理，零范式可迁移；GLM-5.4 发布帖（`1080` 分）在 `11-19` 编码 agent 信任危机的邻域里，按避让清单规避。接口健康锚（AWS 复刻帖 `996` 分、全树 `238`）复测正常，全部检索可信。

## 雷达口径与下期看点

本期为同轴第三篇（`11-22`、`11-23` 之后），维持主簇加权 `4.50`，增量只在裁决稳定性、审计进门与规模口径三处，盖章机制与蜂群纪律不再展开。下期盯四件事：`VP ≠ VNP` 帖是否破 `400` 并出现独立复核（现 `362` 分，「no human mathematician has checked the proof」是其 README 自述）；`Checked=Lean` 是否离开 `84`、F 类是否恢复增长（若两天仍不动，「稳定」升格为结论）；两份新到具名审计是否落地对账（`5` 份比 `3` 份多出的 `2` 份尚无增量入账）；勘误进度帖是否破 `400` 独立成轴（现 `262` 分、近一日 `+5` 分零评论，同期 `VP ≠ VNP` 同题帖同期涨 `72` 分作对照）。另有一条平行线：推理供应商数据事故线——企业或监管级跟进一出现即转 GO 候选评估；「下架三家、移除 125 端点」是 OpenRouter 自述且自称 precautionary measure，非监管认定，本期（`11-25 16:40` 复核）无新增。

## References
- [勘误仓库 mccorvie/riemann-masullo][links-1]
- [ERRATA.md 全文][links-2]
- [README.md（自述口径与复核纪律）][links-3]
- [HN 1,246 分：Lean 验证黎曼猜想讨论][links-4]
- [Lean 与 Mathlib 联合声明原文][links-5]
- [验证工件页（Andrew Sutherland, MIT）][links-6]
- [HN 314 分：Baez《Masullo on the Riemann Hypothesis》][links-7]
- [HN 275 分：Yes, 17M lines of Lean is a lot][links-8]
- [HN 209 分：Agent swarm trying to solve P vs. NP][links-9]
- [P=NP agent 蜂群页面 pequalnp.com][links-10]
- [HN 362 分：VP ≠ VNP over Every Field][links-11]
- [Anthropic 形式化仓库 vp-vnp 目录][links-12]
- [HN 262 分：Masullo 论文 Lean 形式化进度帖][links-13]
- [站内上期：1700万行证明盖章时刻][links-14]
- [站内上期：盖章机旁边，拆机人也派出了机器人][links-15]
- [站内：AI 审查员抓不住研究内鬼][links-16]


[links-1]: https://github.com/mccorvie/riemann-masullo
[links-2]: https://github.com/mccorvie/riemann-masullo/blob/main/ERRATA.md
[links-3]: https://github.com/mccorvie/riemann-masullo/blob/main/README.md
[links-4]: https://news.ycombinator.com/item?id=50589618
[links-5]: https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
[links-6]: https://math.mit.edu/~drew/grh/
[links-7]: https://news.ycombinator.com/item?id=50598441
[links-8]: https://micjm.com/blog/yes-17m-lines-of-lean-is-a-lot/
[links-9]: https://news.ycombinator.com/item?id=50604314
[links-10]: https://pequalnp.com/
[links-11]: https://news.ycombinator.com/item?id=50620102
[links-12]: https://github.com/anthropics/formal-math/tree/main/vp-vnp
[links-13]: https://news.ycombinator.com/item?id=50605045
[links-14]: {{ site.baseurl }}/paradigm-radar-machine-checked-proof/
[links-15]: {{ site.baseurl }}/paradigm-radar-mirror-verification-swarm/
[links-16]: {{ site.baseurl }}/one-minute-read-paper-sabotage-audit-failure/
