---
layout: post
title: "AI 范式雷达：《外壳走上台前：Agent 的竞争从换模型转向换 Harness》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-harness-first-class.svg
tags: [agent, harness, benchmark, evaluation, supply-chain]
description: "FrontierHarness 在同一模型上横评 9 个执行外壳，通过率相差 16.7 个百分点、成本相差 17 倍；开源插件化外壳与 harness 基准论文潮同窗出现，Agent 竞争正从换模型转向换外壳。"
---

9 月 2 日登上 Hacker News 的 FrontierHarness Eval（HN Algolia API 2026-09-06 实测 `81` 分）给出结论：同一 Kimi K3 模型、同一运行时下，横评 `9` 个执行外壳，任务通过率最高 `66.7%`、最低 `50.0%`，每任务成本相差 `17` 倍。

口径先钉死：首采为 `2026-09-06` 实测（HN Algolia API / GitHub API）；`2026-11-16` 全量复测，两次数据分列不混用；论文数字转抄摘要并标注论文口径；厂商宣称（Runta、Armature、Vercel 转引）一律标「评测方自述 / 二手转引」。

（harness，包裹在 LLM 外、负责工具调用与沙箱验证的那层软件），模型权重冻结时，仅换外壳就有这种量级的差距：竞争焦点正从「选哪个模型」转向「基准化哪层外壳」。这与本刊 8 月 26 日[《不再调权重：Agent 的自进化搬进了 Harness》]({{ site.baseurl }}/paradigm-radar-evolving-harness-memory-skill/)视角不同：那篇讲外壳内的自我进化机制，这篇讲外壳本身成为被标准化与基准化的对象。

![同一模型下九个 harness 的通过率与成本差距]({{ site.baseurl }}/assets/images/paradigm-radar-harness-first-class.svg)

## 同一模型下外壳差距有多大

**FrontierHarness Eval**（Runta 出品）在相同任务集上测了 9 个 harness、12 种配置：Codex 通过率 `66.7%`，OpenCode 与 Hermes 只有 `50.0%`；每任务成本从 Exo Harness 的 `$1.05` 到 Claude Code 的 `$18.34`。质量与成本还会脱钩：每成功一次任务的中位成本从 OpenCode 的 `$0.0615` 到 Claude Code 的 `$0.2880`，相差约 `4.7` 倍；缓存命中率最高的 Codex 为 `88.0%`，最低的恰是 Claude Code 的 `67.8%`。这意味着模型预算和外壳预算是两笔分开的账：换外壳可能比换模型便宜得多。评测方自注仅覆盖软件工程与终端任务，且 Runta 亦是厂商，外推需谨慎。

复测回读主帖（`81`→`82` 分、全树 `56` 条）能看到这批数字的方法论软肋，当时评论区已点名：vidarh（评论 `49539391`）指出只测 Kimi K3 可能严重扭曲排名——Kimi 有一批需要外壳专门适配的怪癖，「围绕迁就怪模型而建的外壳天然吃亏」；dfltr（`49541405`）的自行车类比更狠：「说『我们用同一个骑手测了所有自行车』，但参测的有一辆根本是拆掉零件的高端车架」（暗指极简 harness 参评的不公平）；markbao（`49541099`）给出建设性版本：「harness×model 矩阵才是该做的东西，Cursor 的外壳秘方一直没人量化过」。这三条当时无人接盘的问题，两个月后全部有了下文。

主帖里还有四条容易被略过、事后却最见血肉的现实质询。成本口径上，monster_truck（`49538823`）提醒「没人会在一个 `$50-100` 的真实任务上跑 17 遍基准」——榜上的每次通过都摊着四次计分的预算，家庭作坊直接照搬排名会低估真实账单；工程门槛上，GodelNumbering（`49539173`）问「页面上找不到让自定义外壳参测的说明，我想跑 Dirac」——v1 只有榜单没有通道，这个问题直到 v1.1 的 submit your harness 入口才算还上；耦合问题上，jonstewart（`49539602`）的「怎么拿非 Anthropic 模型跑 Claude Code」看似新手提问，实际戳中了外壳与模型绑定分发这个行业默认设置——榜单把「可换」当作前提，而多数商业外壳的前提恰恰是不可换；覆盖面上，kakugawa（`49540040`）点名新版 Gemini 配套的 Antigravity CLI 缺席——每代新模型自带官方外壳，榜单永远在追一个移动靶。四条合起来是评测民主化的全部摩擦面：预算、通道、耦合、时效。

## 基准自己长大了：v1.1 与营销军备竞赛
`2026-11-16` 复测，frontierharness.org 已挂出 **v1.1**：从「9 外壳 × 单一 Kimi K3」扩到 **21 种 harness 配置 × 5 个模型 × 62 个任务**，域从软件工程与终端铺到科学、数据、系统、ML 与安全，每任务 4 次计分、只认验证器通过、基础设施故障单独记账不计分，赞助商列着 Runta、Baseten 与 Z.ai，leaderboard 实时刷新且开放「submit your harness」。一个 `82` 分帖点燃的东西，两个月长成了有赞助商、有投稿通道、有实时榜的公开基准——这正是「一层技术开始成为独立学科与采购项」的标准形态。

伴随基准化的是营销军备竞赛，同窗口内出现了四个「我在榜上赢」帖：`09-04` Mouse 以完成循环（completion loops）在 Kimi K3 上刷到 24/30（HN `49560389`）；`09-09`「一个验证循环把 OpenCode 从垫底带到榜首」（HN `49632357`）；`09-22`「我打败了所有流行 harness」（maki，HN `49808026`）；`11-05` Factory 发布 Droid 1.0，标题直接用《Building a Frontier Harness》（HN `50375236`）。四个帖子分数全是个位数，但信号清晰：榜单开始被当成卖点，「换外壳」从工程话题变成采购话术——markbao 与 vidarh 担心的「harness×model 耦合被榜单掩盖」，如今叠加了第二个风险：榜单本身成了可优化的营销目标。

![FrontierHarness 从 9 外壳单模型到 21 配置五模型六十二任务的两段演化，下方挂出四篇个位数分的登顶营销帖]({{ site.baseurl }}/assets/images/paradigm-radar-harness-first-class-evolution.svg)

## 厂商侧复测：747 分主帖、Desktop 版与 28 万星

首版对 DeepSeek Harness 只记了发布事件与仓库星数，漏掉了它在 HN 的真实热度：主帖（`49285244`，`08-13`）实测 `747` 分、全树 `301` 条——同窗口 harness 话题的最高声量。评论区三块拼图：作者本人 tianyicui（`49287317`，子树 `54` 条）自述「只是 developer preview，MIT 协议，预期大量粗糙与破坏兼容的变更」；高赞质疑 rco8786（`49286014`，子树 `28` 条）「但所以它到底是什么？README 除了安装命令只有一个还在 active development 的 Cordis『时空可组合元框架』」——产品边界模糊本身就是早期形态的注脚；syntaxing（`49285900`，子树 `56` 条）问出生态问题「为什么这么多 agent harness 用 node.js 写」，m_ke（`49285945`）的五条回答（异步、跨平台、解释执行迭代快、LLM 熟）已成这一层的技术选型常识。

复测增量：仓库 `deepseek-ai/deepseek-harness` 从首采 `213,026` 星涨到 `281,724` 星（`2026-11-16` 实测，fork `34,848`，`11-13` 仍有提交）；`10-02` 发布 **Desktop 版**（macOS/Windows，HN `49929489`，`417` 分、`228` 条）——「一切皆插件」从开发者终端走向桌面分发，外壳层的竞争开始有消费软件的面貌。

## 论文潮细账：三篇论文各自回答了一个问题

`11-16` 复测重读三篇论文摘要，发现它们恰好回答了本文首版留下的三个问题。HarnessDev（arXiv `2609.01437`，`09-01` 提交）把评估单元从任务输出改到可运行基础设施：Creation 阶段从最小种子造完整执行系统，Evolution 阶段用下游反馈自我修订；实测覆盖 `6` 个创作者模型、`4` 个领域、`5` 个下游基准共 `2,207` 个实例。两个结论直接命中本文观察信号：造出的 harness 在代码与检索研究上大幅落后人类工程化参考，但在写作与 ML 实验上追平甚至反超；更关键的是——固定运行时模型的实验显示「进化收益强烈依赖执行 harness 的那个模型，跨模型迁移有限」。首版观察信号一问的 harness×model 耦合（pairing effect），论文侧已有部分实锤。CordisBench（arXiv `2609.01600`）把「组件生命周期推理」做成 `1,200` 题基准，量化了插件化外壳的隐性认知成本：交互数一多模型就不可靠，且代价昂贵——GPT-5.6 Luna 在 16 交互子集上每题吃掉近 `3,000` 个推理 token，而独立有限参考语义在全部 `528` 道可执行题上与运行时逐观测一致：这部分推理成本理论上可以外包给确定性组件。安全论文《A Blind Trust, the Bloody Thrust》（arXiv `2609.03884`）给出了本文「一切皆插件带来攻击面」论断的具体弹药：攻击者只控制插件元数据与 lifecycle-hook 配置，就能把良性版本化插件特洛伊化，HookPry 框架在 `25` 种外壳×后端组合、`1,000` 次端到端运行里沦陷了全部 `7` 个参测外壳，单外壳成功率最高 `92.5%`，Microsoft Defender 召回率 `0%`，三种静态防御并集仍漏掉 `47.5%`。

![三张论文卡片：HarnessDev 2207 实例与跨模型迁移受限、CordisBench 1200 题与每题 3000 token、HookPry 七外壳全沦陷与 Defender 零召回]({{ site.baseurl }}/assets/images/paradigm-radar-harness-first-class-paper-cards.svg)

## 反方细读：软件工厂帖的 272 条评论在吵什么

首版引用的《Why Software Factories Fail》其实是 `07-23` 的原帖（HN `49023019`，`394` 分、全树 `272` 条，humanlayer 出品），九月只是被人反复转载。复测精读线程，反方论点比「harness 工程不够用」的标题锋利：rglynn（`49025641`，子树 `69` 条）把瓶颈定位到 PR 评审——理想世界的 PR 漂亮好读，但现实是人根本没带宽看完 agent 产出的量；4lx87（`49025865`，子树 `39` 条）直接宣告治理失效：「我的 agent 替我回复评审请求、以我的口吻做评审，公司强制人工评审的政策已经是摆设」；sathish316（`49030270`，子树 `39` 条）给出框架版命名「Intent-Implement-Quality 问题」——实现端已被一行需求打通，意图表达与质量验收两端才是断点，且他在另一条（`49030316`）里划出适用边界：零用户、零营收、容错高的 0-1 软件，软件工厂完全成立。fishtoaster（`49025804`，子树 `16` 条）则提醒原帖「2025 年 7 月试过全黑灯工厂」的失败经验可能已经过期——模型在 2025 秋/2026 春有过一次可用性阶跃。反方的正确打开方式是 sathish316 那句边界：外壳与工厂不是万能，但在它的适用域内已经成立，外推到企业软件才是失效区。

## Armature 复测：300 分帖与它自己承认的立场

《Which tools do Claude, Codex and Cursor choose?》复测 `300` 分 / `152` 条（首采 `294`）。作者 screm（`49557233`，子树 `18` 条）在评论区亲口补了首版没写全的立场：「免责声明：我是 Armature 联创，我们卖的是『影响 coding agent 选型』的增长服务，这项研究是其中一部分」——数据可用，但卖铲人下场讲故事这一点必须与数字同框。他的三条主要发现：Claude Code 极少主动搜网、Codex 几乎每次都搜、Cursor 居中；三个 agent 的工具选择分歧多于一致（与正文同工具选择率 `42%` 相印证）；LangChain、Supabase、Netlify 这类头部组件「几乎总被提及、却几乎不被选择」。IgorPartola（`49559680`，子树 `24` 条）的高赞吐槽则把宏观数字拉回日常：「Claude Code 现在动不动用 awk、sed 甚至 Python 做基础文件编辑，5 系列之后谁改的？」

微观证据与此呼应：Grep beats LSP（HN `49560260`，`97` 分 / `69` 条）实测检索后端不变、仅在返回结果里附加源码文本，多文件重命名 pass@1 从 `0.67` 升到 `0.83`，后续读取从 `15.2` 次降到 `3.2` 次。这条数据给「外壳差距」提供了机制级解释：差距未必来自调度或提示工程的玄学，可能就是工具返回的信息密度——同一模型拿到更密的上下文，行为立刻变好。线程里 tonyarkles（`49560594`）自述与 Claude Code 的共演化：看着它满仓库 grep 之后直接问它「哪几步是搜索」，再把高频搜索固化成工具——外壳调优正在变成用户自己动手的日常动作；the_duke（`49561032`）贴出稀疏 AST 打印工具，装进 skill 后 GPT 5.6 会自动调用；nomilk（`49560435`）顺手给了个反面注脚：自己的 LSP 配置几个月崩一次，坏了就开着 LLM 抱怨到它自己修好——用户用脚投票的顺序，恰恰是先保 grep、后修 LSP。作者自注仍是那句话：小规模试点信号。

## 接下来盯住什么：观察信号回表

首版三个信号的 `11-16` 对表：其一，FrontierHarness 已扩展到第二模型直至 `5` 模型，v1.1 实时榜在案，但「换模型后排名是否重排」的量化对照仍未公开——pairing effect 目前只有 HarnessDev 的间接实锤，观察继续；其二，OpenAI 与 Anthropic 未跟进版本化公开外壳与 harness 级 changelog，倒是 DeepSeek 把外壳做成了 Desktop 产品（`417` 分帖在案），外壳产品化的接力棒换了厂商；其三，「训练把 harness 构建能力回填权重」正是 HarnessDev 的出题方向，其「进化收益跨模型迁移有限」的结论说明回填尚未发生。新增两个信号：v1.1 的提交通道会不会收进第一批非厂商社区 harness（榜单中立性的试金石）；HookPry 的 lifecycle-hook 攻击面会不会在一年内逼出外壳层的签名钩子标准——那将把第 16 期[《Agent 权限清单要住进哪个载体》]({{ site.baseurl }}/paradigm-radar-agent-permission-artifact/)的授权之争引入插件更新链。可复现的最小路径不变：固定模型，在两个外壳里并排跑同一组自己仓库的真实任务，记录通过率、总成本与每成功一次的成本。另记一条热度校准：Armature 复测窗口内主帖仅 +6 分（`294`→`300`），厂商自述类帖的热度半衰期明显短于基准与论文类——引用此类帖子的数字时，按发帖当月读取比按今日排名读取更接近讨论现场。

## References
- [FrontierHarness Eval][links-1]
- [DeepSeek Harness developer preview][links-2]
- [deepseek-ai/deepseek-harness][links-3]
- [Grep beats LSP][links-4]
- [Which tools do Claude, Codex and Cursor choose? We measured 17k runs to find out][links-5]
- [HarnessDev: Can LLMs Create and Evolve Their Own Agent Harness?][paper1-url]
- [CordisBench: Can Language Models Reason About Component Lifecycles in Dynamic Agent Harnesses?][paper2-url]
- [A Blind Trust, the Bloody Thrust: When Attacker-Controlled Hook Updates Steer AI Agent Harnesses][paper3-url]
- [HN：FrontierHarness Eval 主帖][links-6]
- [HN：DeepSeek Harness 主帖][links-7]
- [HN：Why Software Factories Fail 原帖][links-8]
- [Mouse：验证循环把 OpenCode 从垫底带到榜首][links-9]
- [Factory Droid 1.0：Building a Frontier Harness][links-10]
- [站内：不再调权重：Agent 的自进化搬进了 Harness][links-11]
- [站内：AI 范式雷达《Agent 权限清单要住进哪个载体》][links-12]


[links-1]: https://frontierharness.org
[links-2]: https://www.deepseek.com/harness/en/
[links-3]: https://github.com/deepseek-ai/deepseek-harness
[links-4]: https://www.agentconnect.md/blog/grep-beat-lsp-harness/
[links-5]: https://armature.tech/blog/which-tools-coding-agents-install
[links-6]: https://news.ycombinator.com/item?id=49538490
[links-7]: https://news.ycombinator.com/item?id=49285244
[links-8]: https://news.ycombinator.com/item?id=49023019
[links-9]: https://news.ycombinator.com/item?id=49632357
[links-10]: https://news.ycombinator.com/item?id=50375236
[links-11]: {{ site.baseurl }}/paradigm-radar-evolving-harness-memory-skill/
[links-12]: {{ site.baseurl }}/paradigm-radar-agent-permission-artifact/
[paper1-url]: https://arxiv.org/abs/2609.01437
[paper2-url]: https://arxiv.org/abs/2609.01600
[paper3-url]: https://arxiv.org/abs/2609.03884
