---
layout: post
title:  "AI 范式雷达：《数学工厂把验证搬进流水线》"
author: unbug
categories: [AI, ParadigmRadar, Mathematics]
image: assets/images/paradigm-radar-math-factory-validation-pipeline.svg
image_alt: "封面：上段为 ω=9/4 主帖 39 小时三级热度阶梯（813、1040、1063 分，实测 2026-11-27 上午）；下段为三锚与 openai/math 星标（1,986、368、18,500）；底注：OpenAI openai/math 仓库，最后 push 2026-11-25T00:18:51Z"
tags: [openai-math, matrix-multiplication, lean-formalization, vp-vnp, scott-aaronson, paradigm-radar]
description: "实测 11-27 上午：ω=9/4 主帖 1063 分、Aaronson 帖 1986 分；OpenAI 把 Lean 验证随论文同仓出货，验证从投稿后搬进生产流水线。"
---

实测 `2026-11-27` 上午，OpenAI 开源仓库 `openai/math` 挂出的预印本声称矩阵乘法指数 `ω`（衡量矩阵乘法算法随规模增长快慢的特定理论量）精确等于 `9/4`，即上界加下界互相夹住；讨论它的主帖 `50637220` 已到 `1063` 分、全树 `598` 条评论，发布约 `39` 小时仍在涨。这篇要讲的不是这个结果本身成不成立，而是它背后的生产方式：论文、形式化证明、勘误提交全部走同一间「数学工厂」的出货流水线，机器验证从投稿后的验收环节，搬进了投稿前的默认工序。

本栏目已经写过这条母题的另外三面：`11-22` 的[《1700万行证明的盖章时刻》]({{ site.baseurl }}/paradigm-radar-machine-checked-proof/)写机构如何用机器给一份 `1700` 万行证明盖章；`11-25` 的[《盖章机旁边，拆机人也派出了机器人》]({{ site.baseurl }}/paradigm-radar-mirror-verification-swarm/)写社区如何用机器反向拆机；`11-26` 的[《84条假命题裁决与规模查表》]({{ site.baseurl }}/paradigm-radar-verified-refutations-scale-table/)写反方勘误流水线的规模账。那三篇写的都是「验证」本身；本期写的是一个新面——验证被搬进论文生产流水线，厂商自己变成了实验室。所有热度数字均为 Hacker News 全树口径实测，正文逐个标注实测时刻。

![封面：ω=9/4 主帖三级热度阶梯与三锚星标对照；数据实测 2026-11-27 上午]({{ site.baseurl }}/assets/images/paradigm-radar-math-factory-validation-pipeline.svg)

## 48 小时热度账：三个锚点两轮实测

先把账摆清楚。这轮素材在 `2026-11-26 16:3x`（GMT+8）做过一次全量实测，成稿前本栏目又在 `2026-11-27` 上午对三个核心锚点做了现场刷新，两批数字都保留、各标各的时刻。

- `ω=9/4` 主帖 `50637220`（《The matrix multiplication exponent is nine fourths [pdf]》，发布于 `2026-11-25T01:19Z`）：`2026-11-26 16:3x` 实测 `1040` 分、全树 `581` 评论；`2026-11-27` 上午刷新为 **`1063` 分、全树 `598` 评论**。约 `39` 小时还在陡峭上行，中间隔的一次复测（`813` 分）说明它几乎没有停过。
- Aaronson 解读帖 `50646108`（发布于 `2026-11-25T19:11Z`）：`2026-11-26 16:3x` 实测 `1410` 分、全树 `1220` 评论；`2026-11-27` 上午刷新为 **`1986` 分、全树 `1794` 评论**。一夜之间分数涨了近 `60%`，解读帖比论文帖跑得快，是本期最反常的一条热度曲线。
- `VP ≠ VNP` 帖 `50620102`（发布于 `2026-11-23T22:09Z`）：两轮实测都是 **`368` 分、全树 `337` 评论**（`2026-11-26 16:3x` 与 `2026-11-27` 上午各一次），四天从 `290` 涨到这里后明显放缓，距 `400` 分线还差 `32` 分。本栏目 `11-26` 那篇记录的是 `362` 分口径，本期衔接为「四天 `290` 到 `368`，随后两天基本走平」。
- `openai/math` 仓库星标：`2026-11-26 16:3x` 实测 `18,409`；`2026-11-27` 上午刷新为 **`18,500`**。最后一次 push 仍停在 `2026-11-25T00:18:51Z`——仓库一天涨近一百星，但代码库本身一天多没有动过。

![四锚两日对照：ω=9/4 主帖 1040→1063，Aaronson 帖 1410→1986，VP≠VNP 走平于 368，openai/math 星标 18,409→18,500 而 push 时间戳未动；两轮实测 2026-11-26 16:3x 与 2026-11-27 上午]({{ site.baseurl }}/assets/images/paradigm-radar-validation-anchors-two-rounds.svg)

把四条曲线叠在一起看，热度重心已经不在论文上。主帖 `1063` 分配 `598` 条全树评论，解读帖 `1986` 分配到 `1794` 条评论——评论对点赞的比例接近一比一，这在以「转发表态」为主的 HN 上是典型的争论帖形态；解读帖的评论量甚至超过了论文帖。换句话说，社区讨论的中心不是「`9/4` 对不对」这个结果，而是「这家公司的证明该怎么信」这个流程问题。这正是流水线范式浮现的地方。

## 从「已解决」到「可查询」：一份论文怎么变成仓库里的一个目录

`openai/math` 是 OpenAI 在 `2026-10-06` 建起来的公开仓库，到本期内已累积 `761` 项预印本（preprints 目录口径），`11` 月 `24` 日一次批量提交了 `9` 篇同族论文与配套 Lean 形式化文件，PR 编号 `#5`（Add VP≠VNP，`11-24`）、`#6`（Add November 24 manuscripts and Lean formalizations，`11-25` 合并）。`ω=9/4` 那篇的 README（`2026-11-26 16:1x` 实测 `200`，sha `c8386471`，与上轮一致）逐字只有两句核心的话：「The exponent of square matrix multiplication is $9/4$ over every field」，以及下界侧的「at least ⌈n^{9/4}/2⌉ nonscalar multiplication or division gates」。下界那句带全了三个限定词：只对**方阵**（`square`）、只对**无除法电路**（`division-free circuits`，一种只允许乘法和加法、不允许除法的计算模型）、在**每个域上**（`over every field`）成立。

这两句就是目前关于这个结果**能写的全部内容**：它是 OpenAI 仓库挂出的预印本声称，配了随文 Lean（一种机器可检查的形式化证明语言）文件 `ExactExponent.lean`，声称上界与下界互相咬合。它还不是一个被数学界集体接受的定理。把限定词摘掉写成「证明了矩阵乘法复杂度」，是社区反方第一条就点名的口径错误。

仓库节奏本身比论文更能说明生产方式。`11` 月 `24` 日 `9` 篇同族批量出货之后，第二支独立成帖的是《The polynomial Hirsch conjecture is false [pdf]》`50644980`，`2026-11-26 16:3x` 实测 `152` 分、全树 `41` 评论，URL 直接指向 `openai/math` 的预印本目录——论文的发布渠道不是 arXiv 或期刊，而是**厂商 Git 仓库的一个路径**。

本期是这个「机器验证」母题在栏目内的第四篇，差异化先说白：前三期写「验证这台机器怎么运转」，本期写「验证被装进了谁的生产线」；那三篇的事件主体是黎曼猜想/Masullo 一族对撞、视角在社区与反方，本期主体换成 `openai/math`，与该线零重叠。

![数学工厂出货结构：仓库 created 2026-10-06、761 项 preprints、11-24 批量 9 篇 + PR#5/#6、最后 push 11-25T00:18:51Z；出货端两帖：ω=9/4 主帖 1063 分（实测 11-27 上午）、Hirsch 反例帖 152 分（实测 11-26 16:3x）]({{ site.baseurl }}/assets/images/paradigm-radar-math-factory-shipment-structure.svg)

传统论文的链路是「投稿—评审—发表—社区复核」，每步之间隔着月；这条链路是「commit—随文形式化—公开仓库—社区围观」。评审那一环被抽掉了，替代它的是形式化检查器。于是「验证搬到哪一步」成了整个问题的心脏。

## 验证搬进投稿前：随文 Lean 文件是出货单的一部分

把 `11` 月这一串提交按时间排开，能看清验证工序在流水线里的位置：`11-24` PR `#5` 合入 VP≠VNP 与 Lean 文件；`11-25` PR `#6` 合入当天批次的文稿与形式化，最后一次 push 落在 `11-25T00:18:51Z`；此后到 `2026-11-27` 上午，仓库零新增 commit、零外部 PR、零外部 issue 复现（`2026-11-26 16:1x` 实测口径，`2026-11-27` 上午复核 push 时间戳未变）。

三个信号各自独立，指向同一件事。第一，**验证文件与论文同仓随文**：README 里直接给 Lean 文件路径，任何人 `git clone` 下来就能自己跑检查器——机器可查从「投稿后评审员可能要求补」搬到了「出货单的一部分」。第二，**mathlib 侧零搬运**：数学形式化主库 mathlib4 自 `11-24` 以来的 `71` 条 PR（`2026-11-26` 检索实测）里与 `9/4` 直接相关的为零，独立社区没有接手这条线，形式化目前锁在厂商仓库内。第三，**外部复现工件为零**：`9/4` 下界目前没有任何第三方复现报告，`openai/math` 也没有出现外部提交的复现 PR。

![验证工序位置图：传统链路（投稿→评审→发表→社区复核，验证在投稿后）vs 工厂链路（commit→随文 Lean→公开仓库→社区自跑，验证在投稿前）；外部复现工件计数实测为零]({{ site.baseurl }}/assets/images/paradigm-radar-verification-before-submission.svg)

社区侧的「拆机基础设施」同时在跑。反方勘误仓库 `mccorvie/riemann-masullo` 在 `2026-11-25T10:53:02Z` 落地 commit `9c791d74`（PR `#7666`），提交信息逐字为「ERRATA: status sentences and the Checked column brought in line with main」，说明有 `156` 行的核查状态与主表不同步、逐行走依赖后一次性修正 `157` 行。改版后的新口径（`2026-11-26 16:1x` 实测）：表行合计 `789`（`F277 / I432 / M50 / R30`），F 类中 `Checked` 列标为 lean 的是 `228` 行。**这个 `228` 是 `2026-11-25` 改版新口径（commit `9c791d74`，Checked 列）下的计数，与旧表结构下的 `84` 不可比**，任何引用都得带上这句口径标注。

对读者真正的含义是：一家公司产出论文的速度，已经和它产出「可机检证据」的速度拉平了。验证不再是论文发表之后别人替它补的课，而是出厂配置。至于这份出厂配置值不值信——那是下一节那条 `1986` 分曲线要回答的事。

## 1410 到 1986 分：专业人士的表态链与它的三次自纠

Aaronson 的博文《HOLY SHIT HOLY SHIT HOLY SHIT HOLY SHIT》（源站 `scottaaronson.blog/?p=10379`，`2026-11-26` 实测 `200`）在 `2026-11-27` 上午已涨到 **`1986` 分、全树 `1794` 评论**。正文三段逐字：「OpenAI claims to prove that ω, the exponent of matrix multiplication, is exactly 9/4—a lower bound (!!), matching the upper bound that OpenAI proved in the great Mathocalypse drop of October 6」「my working assumption by this point is that any proof that comes directly from OpenAI or Anthropic is correct barring information to the contrary」「they don't even bother to issue press releases anymore, they just upload papers」。

同一篇博文里，Aaronson 亲口给这段背书装了降温阀，逐字：「I do not wish to be responsible for spreading unverified rumors. And I worry that exact statements of what was done may have been mangled in a game of Telephone」。HN 帖内 id `50647174` 的读者 brynet 直接顶了回去：「my working assumption… is correct barring information to the contrary. Yikes. Show a little healthy skepticism.」——连「工作假设」这个措辞本身都成了争论对象。

把 Aaronson 本人两周内的动作排成一条线（本栏目 `11-22` 那篇写过这条线的前半段，本期只补转折事实，鹦鹉学舌的旧段子不重讲）：`11` 月中旬他先发了讽刺 AI 抢证黎曼猜想的段子文（HN 转载帖 `50581084`，`2026-11-26` 复测 `364` 分、全树 `371` 评论）；两周后 `11-25` 写下上面这篇背书帖；而背书帖里又嵌着他对自己传播未经核实传闻的公开自纠。**讽刺、背书、自纠，全部发生在同一位 MIT 理论复杂度专家的两周内**——这比任何单一表态都更能说明这条流水线给专业人士制造的处境：证据生产速度超过了人类复核速度，立场只能在半明半暗里下注。

旁证来自另一人。Fortnow 的专文《VP ≠ VNP》（blog.computationalcomplexity.org，`2026-11-24T12:28Z` 发布，`2026-11-26 16:1x` 实测 `13` 条评论）逐字：「Anthropic dropped a Lean-verified proof of VP ≠ VNP. This is, for now, the most important computational complexity result of the year」；同时他划出边界：「VP ≠ VNP a major step toward proving complexity lower bounds, but it doesn't give us a technique to handle the full [P vs NP]」。他本人在 HN 的回帖（`11-25 07:32`）是「I don't want to speculate as an exact probability, but feel free to make me an offer.」。要按口径引用：**这是「Fortnow 专文加 `13` 条评论」，不是「Fortnow 的 HN 帖很高」**——他的 HN 转载帖 `50639658` 实测只有 `10` 分。引用口径写错，就会把一个专业人士的谨慎表态放大成整个领域的结论。

![Aaronson 两周转折线：讽刺（鹦鹉文 HN 转载 364 分）→ 背书（HOLY SHIT 帖 1410→1986 分）→ 自纠（Telephone 逐字降温）；Fortnow 旁证：专文 13 评论、HN 转载帖仅 10 分；实测 2026-11-26 16:3x 与 2026-11-27 上午]({{ site.baseurl }}/assets/images/paradigm-radar-aaronson-two-week-turn.svg)

## 反方为什么必须留在正文里

一条 `1063` 分的论文帖下面，社区最活跃的三条质疑必须原样保留（均 `2026-11-26 16:3x` 实测），它们的共同点是：**攻击的全是口径，不是数据**。

- id `50638518`（tczMUFlmoNk）：主帖标题《矩阵乘法指数是 Θ(n^2.25)》说的「矩阵乘法指数」是代数复杂度理论里的特定量，和工程师日常理解的「矩阵乘法算法复杂度」不是一回事，标题口径直接喂给大众会制造误解。
- id `50641668`（turzmo）：即便 `ω=9/4` 的双向夹逼最终成立，理论指数的改进也不自动等于实践中更快的矩阵乘法；历史上最优渐近算法因为常数过大而从未上机的例子并不少见。
- id `50637810`（vlovich123）：下界声称限定在方阵，矩形矩阵乘法的 exponent 是另一道开放问题，标题化传播容易把「方阵」悄悄放大成「矩阵乘法」。

这三条加上 Aaronson 自己的 Telephone 自纠，构成本期反方的完整结构：**没有人说 OpenAI 造假，所有人都说「现在还不能按标题那句话理解它」**。这与 R1 红线是同一条线：`9/4` 目前的全部状态是「仓库预印本声称双向夹逼、随文 Lean 可查、Aaronson 级专业人士给了带保留的高信任表态」，不是「数学界已接受」。上界一侧 `48` 次乘法的旧故事本栏目 `03-01` 那篇[《AlphaEvolve 与矩阵乘法突破》]({{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/)已经写过，本期不重述。

还有一条传闻级子线必须按降温口径处理：《Factoring in P》传闻帖 `50643065`（`2026-11-26 16:3x` 实测 `488` 分、全树 `356` 评论）源头只是一条 Reddit 转述帖（HN id `50643280` 逐字点破：「It's a link to a Reddit thread… a comment supposedly from Scott Aaronson」），Aaronson 本人已在新文里公开降温（Telephone 逐字见上节）。**没有任何实验室官方确认因式分解被解决，本文不写、读者也不要转述这个结论。**同期还有一条个人仓 GRH 再验证帖（`lsernau/grh-lean`，`2026-11-25T20:42Z` 创建的个人仓库）属于上一轮同族事件的余波，不构成本期事实。

## 厂商即实验室：这场归属战没有裁判席

这轮热潮的引信其实不是 `9/4`，而是一场归属战：`ω=9/4` 的上界属于 OpenAI（`10-06` 那批），下界却与 Anthropic 的 `VP ≠ VNP` 线互相咬合，两家在 `11` 月下旬的提交时间戳几乎贴脸——OpenAI 仓库 README 的时间戳与 Anthropic 那条 `11-23T22:09Z` 的 HN 帖，是目前**唯一可写的事实对**。本栏目 `11-25` 那篇写过这场对撞的开头，本期只更新增量：`anthropics/formal-math` 仓库自 `2026-11-23T21:43:50Z` 之后无任何新推送（`2026-11-26 16:1x` 实测，星标 `1,048`）；`anthropic.com/news` 与 `/research` 两页全文扫描 matrix/VNP 关键词零命中（同一实测时刻，页面本身 `200` 可达）；`openai/math` 侧到 `2026-11-27` 上午也没有出现 Anthropic 署名的任何内容。

按中立口径记账：**截至 `2026-11-26 16:1x` 实测，Anthropic 官方零回应**——没有回应文、没有仓库动作、没有声明。写「Anthropic 沉默」是事实，写「Anthropic 默认」是编故事。归属战在时间戳之后进入了第二种形态：双方各自的社区侧代理在 HN 打分、写解读、互相指认，而两家的官方通道同时保持安静。

![厂商即实验室：官方通道时间线——OpenAI 最后一次 push 2026-11-25T00:18:51Z（星标 18,500，实测 11-27 上午）、Anthropic formal-math 最后 push 2026-11-23T21:43:50Z（星标 1,048）、官方 news/research 零回应文；社区侧 Aaronson 帖 1986 分、主帖 1063 分]({{ site.baseurl }}/assets/images/paradigm-radar-vendor-as-lab-timeline.svg)

这就是「厂商即实验室」的确切含义：证据由厂商的流水线生产，检验由厂商自选的形式化工具完成，仲裁交给了本来设计来仲裁「论文对审稿人」的评论区。旧实验室体系的制衡——独立复现、期刊评审、学术声誉抵押——在这条链路上一个都还没上线；目前唯一在跑的对抗性工序，反而是外部社区用同一套 Lean 去拆同族另一条线的勘误（下期若出现对 `9/4` 下界的独立复现工件，本轴立即复议）。

## 其它轴动态与下期盯法

以下均为 `2026-11-26 16:2x-16:4x` 全轴复测实测（全树口径），状态到本期未动者如实标注。

**代码验证簇 `3.60`，按既定判据降档。** Harvard 锚 `50538303` 实测 `334` 分（第八轮未破 `340` 线），下期再低于 `340` 降至 `3.5`；独立观察线 cekrem `405` 分破 `400` 后持平。

**基座产品化 `3.75`、接入层 x402 `3.65` 均维持降档。** OpenShell 主帖 `508` 分持平、Brave x402 帖 `263` 分持平，窄窗内平台方事件级新增为零。

**长尾一句话记账**：ONNX 主帖 `471` 分，微软官方解释帖为零；Google Workspace 强制 MCP 帖仅 `6` 分，标准化波唯一苗头；蚕食搜索主帖 `714` 分平台期；侧信道帖 `457` 分、蒸馏帖 `450` 分双双破 `400` 但判据未中，分别留在备用池与 `12-03` 避让窗内；Clojure 核心库 Lean 质检帖 `219` 分是「Lean 当日常质检」母题的新观察，登记备用池；LeCun 帖 `2014` 分、perplexity 提案帖 `720` 分回应工件仍为零，纯热度不升档。

下期盯五件事：`VP ≠ VNP` 帖 `368` 是否借势破 `400`；`openai/math` 是否首次出现外部 PR/issue 级复现；Anthropic 是否被迫对归属表态；`9/4` 下界是否出现独立复现工件（目前为零）；Factoring-in-P 传闻若出现实验室官方口径，立即单列评估。接口健康锚（AWS 复刻帖 `996` 分、全树 `237`）本轮复测正常，全部检索可信。

## 总结与行动清单

这轮事件的可迁移结论一句话：**当论文的作者和验证文件的作者变成同一条流水线，「机器可查」就从信任的加分项变成了信任的起点假设，而对抗工序的缺席会由社区自发补位——补位的形式是评论区和勘误仓库，不是期刊。**`1063` 分的论文帖、`1986` 分的解读帖、`18,500` 星的仓库、零个外部复现工件，四个数放在一起就是这门新实验室的家底。

**你现在可以做的**：

1. 把「随文形式化」当作评估 AI 产出论文的默认信号：先找机器可查工件（Lean 文件、检查器配置、可复跑脚本），没有工件的声称降级处理。
2. 抄一遍这条引用纪律：转述这类结果时保留原口径的限定词（方阵、无除法电路、每个域），限定词一删，结论就开始变形。
3. 给「专业人士背书」和「社区共识」分开记账：单个人的高信任表态（哪怕他是 Aaronson）是一条曲线，不是一个结论；引用带实测时刻。
4. 如果你自己的团队在做「验证内建」（代码、文档、评测随文交付），把外部可复跑路径一起交付——厂商仓库这次被围观的不是证明本身，而是「能不能自己跑」。
5. 盯三个复议信号：外部复现 PR、官方回应文、`VP ≠ VNP` 破 `400`；任一落地，这条母题的结论就要重写。

## References
- [openai/math 仓库][links-1]
- [ω=9/4 预印本 README][links-2]
- [HN 1063 分：The matrix multiplication exponent is nine fourths][links-3]
- [Aaronson《HOLY SHIT HOLY SHIT HOLY SHIT HOLY SHIT》][links-4]
- [HN 1986 分：Aaronson 帖讨论区][links-5]
- [Fortnow《VP ≠ VNP》专文][links-6]
- [HN 368 分：VP ≠ VNP over Every Field][links-7]
- [anthropics/formal-math 仓库][links-8]
- [勘误仓库改版 commit 9c791d74][links-9]
- [HN 152 分：The polynomial Hirsch conjecture is false][links-10]
- [站内：1700万行证明的盖章时刻][links-11]
- [站内：盖章机旁边，拆机人也派出了机器人][links-12]
- [站内：84条假命题裁决与规模查表][links-13]
- [站内：AlphaEvolve 与矩阵乘法突破][links-14]


[links-1]: https://github.com/openai/math
[links-2]: https://github.com/openai/math/blob/main/README.md
[links-3]: https://news.ycombinator.com/item?id=50637220
[links-4]: https://scottaaronson.blog/?p=10379
[links-5]: https://news.ycombinator.com/item?id=50646108
[links-6]: https://blog.computationalcomplexity.org/2026/11/vp-vnp.html
[links-7]: https://news.ycombinator.com/item?id=50620102
[links-8]: https://github.com/anthropics/formal-math
[links-9]: https://github.com/mccorvie/riemann-masullo/commit/9c791d74
[links-10]: https://news.ycombinator.com/item?id=50644980
[links-11]: {{ site.baseurl }}/paradigm-radar-machine-checked-proof/
[links-12]: {{ site.baseurl }}/paradigm-radar-mirror-verification-swarm/
[links-13]: {{ site.baseurl }}/paradigm-radar-verified-refutations-scale-table/
[links-14]: {{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/

