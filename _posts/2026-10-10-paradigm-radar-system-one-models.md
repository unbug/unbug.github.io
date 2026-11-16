---
layout: post
title: "AI 范式雷达：《快脑拆出大模型，Agent 控制循环改订阅决策函数》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-system-one-models.svg
tags: [decision-models, agent, non-autoregressive, model-serving, typed-output]
description: "TypeSafe 定义 Jev 品类后的四周里，Cloudflare、AWS 系 Strands 与多个独立团队相继发布决策模型、本地运行时与清单层，Agent 控制循环正从解析大模型文本转向订阅毫秒级类型化决策函数，快脑与慢脑开始分家。"
---

Agent 的高频控制循环正在换芯：从「调用一个会聊天的自回归大模型、再解析它吐出的文本」迁移为「订阅一个只输出带概率的类型化决策、毫秒级返回、按输入计费的函数」。

TypeSafe AI 于 2026-09-15 发布 Jev 与「System One Models」品类定义（HN item `49717558`，实测 `1989` 分、`518` 条评论），随后四周内，Cloudflare、AWS 系 Strands、Nokia 应用研究团队与多名独立开发者跟进，无隶属关系。慢脑（推理与生成）留在大模型里，快脑（结构化决策）成为独立的模型品类。据我们观察未发现同类中文报道。

口径先钉死：星数与帖数为两次实测——首采 `2026-10-11`、复测 `2026-11-16`（GitHub API / Algolia API）；`70ms-500ms` 延迟、输出免费、融资 `8.7 亿美元` 与估值 `75 亿美元`、40-400x 便宜等全部是厂商自述，复测未获第三方基准改变这一状态；「一年前做过」等评论区声称标注来源。五周复测的核心变化：热度冻结、代码活性与生态数量继续爬坡、但「拿来做什么」开始被公开追问。

![快脑与慢脑的分家：控制循环从解析文本改为订阅类型化决策]({{ site.baseurl }}/assets/images/paradigm-radar-system-one-models.svg)

## 四周内成形的生态波

判断这是范式而非发布稿，看跟进者构成。GitHub API 首采（2026-10-11）：jaredpalmer 的 kev（基于 Qwen3.5/3.8 的 Jev 风格模型家族）`8,895` 星；firelex 的 jeff，`0.8B` 家用训练，`1,499` 星；ollaya 是本地决策模型运行时，`1,283` 星；Nokia 应用研究团队的 AnyJev 把任意 LLM 转成 Jev 风格模型，`1,150` 星。清单层：awesome-jev `2,261` 星、awesome-jev-tools `743` 星，GitHub 搜索 "jev decision model" 返回 `1,087` 个仓库。模型、运行时、路由、清单四层齐备，是生态信号而非单品信号。

`2026-11-16` 复测，五周后的曲线：kev `8,895`→`9,996` 星（`11-15` 仍有提交）、jeff `1,499`→`1,601`、ollaya `1,283`→`1,465`、AnyJev `1,150`→`1,611`；awesome-jev `2,261`→`2,594`；"jev decision model" 搜索仓库数 `1,087`→`1,496`（+38%）。主帖 `1989` 分纹丝不动——话题热度冻结，但代码与仓库在长，这是品类沉淀而非潮水的形状。ollaya 的复测描述值得整段引用，它是「事实接口」成形的最好标本：「拉取并本地运行 29 个模型家族（Laya、pplx-decider、Clef、Winnow、coba……），暴露在 `/v1/systemone` 端点后面，TypeSafe SDK 不改一行代码即可切换——把 base URL 指过来就行」。一个第三方运行时把竞品们的模型统一到一个端点路径下、并让首发厂的 SDK 直接复用：兼容层的实际约束力已经超过任何一家的文档，这正是「快脑」开始像 CPU 指令集那样被多家实现包围的证据。

## 跟进潮之后的两周：从发布转向找用途

复测检索 `10-11` 月 HN，波峰之后还有第二层信号，方向从「又造了一个」转向「到底拿它干什么」。运行时与评测先跑通：Ollaya 自发帖 `09-25` 拿到 `618` 分 / `145` 条（HN `49848269`），是品类里除 TypeSafe 主帖外的最高独立声量；openlayer 的 jevals（`09-20`，`47` 分）用类型化决策替换 LLM-as-judge——评测器是决策模型最顺手的第一个客户。模型侧继续下探：privatemode 把 GLM-5.3-Flash 改造成 Jev 风格（HN `49857656`，`138` 分）、Gutsy 把 0.8B 决策模型塞进 CPU（HN `49923223`）、`11-09` 的 Flide 宣称把 Jev-like 推理加速 `9.5` 倍（HN `50421155`，`126` 分）。最有研究味的一条来自 PostHog 的 Jeeves（HN `49891290`，`242` 分 / `95` 条）：把推理过程叠回决策模型、证明 reasoning 能提升 Jev-like 精度——快慢脑的边界开始反向渗透。而 `10-13` 的 Ask HN《有人在用 Jev 吗？用来干什么》（`6` 分 / `8` 条）与 `11-12` 的《为什么要用 Jev/决策模型》（`10` 分 / `9` 条），两问得分惨淡但问题真实：供给端四层齐备，需求端还在互相打听用例。注意这两问的形态本身就是证据：Ask HN 是 HN 上「公开搜索无果才发问」的最后一招，三个月内同类问题问出两次，说明官方叙事与可检索的民间使用经验之间已经出现断层。波峰、基建、找用途三段排开，这个品类的采纳曲线走到了第三段门口——离「被消化」还差一个杀手用例，离「被证伪」还差一份公开盲测。

![决策模型潮时间线：发布、跟进、基建、找用途四段，标注星数与帖数]({{ site.baseurl }}/assets/images/paradigm-radar-jev-wave-timeline.svg)

## 大厂一侧与价格共振

大厂一侧：Cloudflare 发布开放权重决策模型 Clef（HN `49923692`，`641` 分，复测 `642` / 全树 `218` 条），AWS 系 Strands 发布 Decider `2B` 开源决策模型（HN `49987076`，`285` 分，复测 `286` / 全树 `76` 条）。更早的 HN `49765348`（`1363` 分、全树 `311` 条）里，Laya 声称一年前做过非自回归决策模型——品类不新，新的是命名、兼容接口与生态位分工。价格侧另有共振：DeepSeek 4.1 Flash 帖（HN `50000488`，`1107` 分、`967` 条评论）与「Tokens too cheap to meter」讨论（HN `49813482`，`354` 分）同属把模型调用做成廉价基础设施的漂移。TypeSafe 的延迟 `70ms-500ms`、输出免费、融资 `870M` 美元与估值 `7.5B` 美元（HN `50023450`，首采 `423`、复测 `446` 分 / 全树 `357` 条），均为厂商自述。把 TypeSafe 的融资帖与 DeepSeek 降价帖放在同一张价格图上读：一条把慢脑的价格砸向地板，一条给快脑开出新品类定价——两条路线共同的前提是「控制循环的调用量会大到价格成为架构问题」。反方也可顺手引用这张图：慢脑价格若继续塌，快脑省下的钱迟早不够覆盖重写控制循环的工程成本，品类窗口是按降价速度折现的。

## 快脑与慢脑的架构分工

TypeSafe 发布稿里那句 "unstructured state in, typed probabilistic decisions out"（非结构化状态进，带概率的类型化决策出）是这次分工的钥匙。传统 Agent 循环里，每轮工具选择、路由都要让自回归大模型逐 token 生成文本，再由外层代码解析——决策伪装成对话。决策模型把这层剥掉：并行采样的非自回归直接输出标签加概率，不参与聊天。类比 CPU 时代「通用核 + 协处理器」分工：慢脑管推理与生成，快脑管高频结构化决策，两者在同一条控制循环里分层订阅。

主帖 `518` 条评论把「什么算幻觉」吵成了全场焦点，值得细录。dbbk（评论 `49718708`，子树 `37` 条）给出官方口径的通俗版：「所谓不会幻觉，是指每个结果都带置信值——0.1 置信度你直接丢弃即可」；8note（`49720537`，子树 `16` 条）立刻戳穿漏洞：「对错误答案给出高置信度，那不还是幻觉？」jacobgold（`49718492`，子树 `91` 条，全帖最高）干脆替品类重写定位：「更准确的标题是——用通用生成能力换快速类型化推断」。现场还有创始人对线：CompleteSkeptic 自报 CEO（`49718407`，子树 `16` 条）承认 token 类比难懂、自家也全文使用生成式模型（`49718767`，子树 `20` 条），并在 `49719080` 反问质疑者「你说一个线性分类器会产生幻觉吗？」——这一问其实点中了要害：Jev 在数学形态上确实更接近带软概率的分类器，争议只是它值不值得一个新名字。让价值真正「咔哒」一声落地的是一楼演示：cfowles（`49721150`，子树 `32` 条）说看了官方 Home Assistant 演示才懂——家庭自动化里「开灯还是开空调」这种每秒级、错一次代价极小的决策，正是慢脑最贵的浪费。

对 "can't hallucinate" 这类强宣称要给反方留位：不发散文本拿掉了编造事实的通路，但概率失真、标签集外误判仍在，公开可复现基准之前，这句话只能当设计目标读。本站此前的论文解读[《改一个选项的名字就能打开安全闸门》]({{ site.baseurl }}/one-minute-read-paper-option-channel-guardrail-attack/)查的是这类模型当安全闸门有多不可靠；本期讲为什么全行业在造这类模型。一期造闸、一期验闸，互为印证而非矛盾：造闸潮越大，验闸越值钱。

## 反方：没有基准的品类与商品化风险

社区火力：Jev 主帖评论 id `49719120` 称技术与结果含糊，RLCD 是什么、相比 LLM 的基准分数在哪，整篇像营销稿，品类发布至今没有公开可复现基准。评论 id `49720601` 称速度对比「极其不诚实」，id `49720956` 附和：端到端 LLM 延迟对比单步决策延迟，口径不对等。更根本的是 id `49723102`：这就是个对自定义标签输出加权分的分类器，质量能否超过结构化输出模式的 LLM 待客观基准验证——「新瓶装旧分类器」论直接攻击品类成立性。ramon156（`49718120`，子树 `12` 条）要 RLCD 与并行采样的实证，dinobones（`49718973`）吐槽命名「Typesafe.AI 听起来像 TypeScript 工具，system one 又是什么」。复测补一条营销军备竞赛的实锤：WhitneyLand（`49719144`，子树 `11` 条）留存了被删改前的原始标题——《Jev：新前沿模型，便宜 40-400 倍、快 20-200 倍》，发布当日即因「frontier model」与倍数口径被围攻后改掉标题（`49719001`，子树 `13` 条）；温和派 janalsncm（`49718782`）的总结最公允：就它选定的用例确实更快更便宜，质量好不好至今未知。商品化专帖：「OpenAI 已处在跟进 Jev 的有利位置」（HN `49802161`，`328` 分 / 全树 `233` 条）——兼容接口越像标准，首发者护城河越薄；ollaya 的 `/v1/systemone` 大一统端点与 Flide 的推理加速说明，护城河的竞争已经转移到运行时性能与模型家族广度。共同点：范式成立不等于 TypeSafe 赢。

![快慢脑分层控制循环：传统文本解析与类型化决策订阅的对照，标注幻觉之争的两个阵营]({{ site.baseurl }}/assets/images/paradigm-radar-jev-brain-split.svg)

## 1363 分的优先权风波：首发、命名与受质疑的顺序

比反方火力更完整的事实链在 Laya 帖（HN `49765348`，`1363` 分 / 全树 `311` 条，复测不变）：作者 Diogo 自述一年前就用 RL 训过非自回归决策模型，不满在于 Jev 发布稿把同类工作称作突破、既不引用在先成果又用「前沿模型」自我加冕。线程高赞几乎全员下场：prometheus1992（`49767192`，子树 `50` 条）替围观者说出观感——「发布文案初看像恶搞、像骗子，B 轮话术堆满屏幕」；dcow（`49766861`，子树 `23` 条）两头打——「作者的不满能理解，但姿态幼稚，Jev 和 Laya 都站在无数前人论文上」；operaopera（`49766884`）把指控收窄到准确位置：「问题不是技术，是把他人路线喊成突破而不给署名」。另一侧，johnfn（`49769116`，子树 `33` 条）给出市场派读法：「有人不懂营销与品牌和产品同等重要——Jev 是罕见地会做品牌的那个」；tchalla（`49766268`，子树 `32` 条）则是老 ML 的冷笑：「干过十年的人早知道，拿 LLM 包打一切本来就又懒又浪费」。最值得单独存档的是全场唯一一条贴地实测：Oras（`49765997`，子树 `56` 条，线程最高）发布当晚就把 Jev 换进自己原用 Gemini 2.5 Flash Lite 的分类任务——「快一些、便宜一些」（评论转述实测，样本与方法未公开，一致性表现存原帖）。把它与「公开盲测缺席」并排放：社区级体感与厂商级宣称之间，仍然隔着一份没人发表的对照表。dominotw（`49768147`）补的刀客素材也值得一录——发布稿宣传语里有「来自发明了 ChatGPT 的那个人」式表述，优先权与话术在此品类是一体两面。

## 边界与观察点

边界要划清：与集群调度切割——调度层管 Agent 负载在集群里怎么排队休眠（见本刊[《智能体正从应用循环迁为集群一等负载》]({{ site.baseurl }}/paradigm-radar-agent-as-workload/)），本期讲控制循环内用哪类模型决策；与文件标准之争切割——Jev-compatible 目前是事实兼容生态（ollaya 端点、SDK 复用），没有成文跨厂商标准，写成「标准之战」会误导读者。

验证信号对表（`2026-11-16`）：其一，第三方盲测基准是否出现——仍是最大空缺、反方火力点，jevals 与 ollaya 的 public bench 是候选苗子；其二，kev/jeff/ollaya/AnyJev 星数增速——五周温和爬坡（kev +12%、AnyJev +40%），无爆无崩；其三，OpenAI、Anthropic 是否发同类类型化决策端点——未见，fast-follow 论既未证实也未证伪；其四（新增），两条 Ask HN 的「求用例」状态能否在下一周期被真实生产案例回答——若 `2027` 年初仍无人在公开线程给出可复现的用例证词，品类叙事将让位于「高级分类器」叙事。如果你正在构建 Agent：把控制循环里高频、只需标签加概率的部分拆出来，用 kev 或 jeff 加 ollaya 本地验证，安全闸门留在待验清单。

## References
- [Introducing System One Models and Jev][links-1]
- [HN：Jev 首发帖][links-2]
- [Cloudflare：Clef 开放权重决策模型][links-3]
- [Strands Decider 2B][links-4]
- [kev 仓库][links-5]
- [jeff 仓库][links-6]
- [ollaya 仓库][links-7]
- [AnyJev 仓库][links-8]
- [OpenAI is well positioned to fast-follow Jev][links-9]
- [Ollaya 主帖][links-10]
- [PostHog Jeeves][links-11]
- [TypeSafe 融资帖][links-12]
- [站内：AI 范式雷达《智能体正从应用循环迁为集群一等负载》][links-13]


[links-1]: https://typesafe.ai/blog/introducing-system-one-models-and-jev
[links-2]: https://news.ycombinator.com/item?id=49717558
[links-3]: https://blog.cloudflare.com/clef-decision-models/
[links-4]: https://strandsagents.com/blog/introducing-strands-decider/
[links-5]: https://github.com/jaredpalmer/kev
[links-6]: https://github.com/firelex/jeff
[links-7]: https://github.com/ollaya-dev/ollaya
[links-8]: https://github.com/nokia-applied-research/AnyJev
[links-9]: https://news.ycombinator.com/item?id=49802161
[links-10]: https://news.ycombinator.com/item?id=49848269
[links-11]: https://news.ycombinator.com/item?id=49891290
[links-12]: https://news.ycombinator.com/item?id=50023450
[links-13]: {{ site.baseurl }}/paradigm-radar-agent-as-workload/
