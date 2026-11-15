---
layout: post
title:  "AI 范式雷达：《标价之外，Harness 替你买了什么》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-hidden-cost-cover.svg
tags: [agent, claude-code, token-usage, cost-tracking, opentelemetry, harness]
image_alt: "封面：状态栏之下，看不见的摘要请求正把完整会话记录反复送回模型"
description: "独立取证帖实测出Claude Code后台agent状态摘要占其周消耗16.4%且不入本地账本，厂方回帖自认并给出2%到6%自述口径，窗口内五个独立计量工具仓成型：agent成本观正从标价转向请求级实测。"
---

独立取证帖实测出 Claude Code 的后台 agent 状态摘要请求占其周消耗 `16.4%`，且不写入本地会话记录，普通成本工具看不见这笔钱（取证方自述样本；HN `50284255` 实测 `518` 分，`2026-10-29`；`2026-11-16` 复测 `591` 分 / `236` 条）。

口径先钉死：首采为 `2026-10-29` 晚经 HN Algolia API 全树遍历与 GitHub API 复测；`2026-11-16` 对线程、issue 与全部工具仓做了二次复测，两次口径分列不混用；厂方数字（`2%`/`4%`/`6%`）为当事团队自述，取证数字（`16.4%`）为取证方自述样本，第三方复测（约 `8%`）为个人自测——三组口径没有一个能换算成另一个，这正是本期故事的一部分。据我们观察未发现同类中文报道（本检索通道未覆盖中文媒体）。

机制细节：Claude Code 每隔约 `30` 秒把每个后台 agent（background agent，指在主会话之外持续干活的子任务）的完整 transcript（会话记录）发给其模型（`96%` 走 Opus），只为生成状态栏里 3-5 个词的摘要，该类请求占其 API 请求总数 `19.7%`。三向证据同日摆开：厂方 Claude Code 成员 edwinarbus 在评论 `50284699`（子树 `9` 条）承认机制并给出厂方自述口径——上周全量遥测用户中 `agent_summary` 约占 API 标价成本 `2%`、请求数不到 `4%`，终端场景约 `6%`，并称已在 `2.1.311+` 上线修复；供给端窗口内新建的独立计量仓至少五个（microsoft/TokenEconomizer 首发 `492` 星，复测 `6,245` 星）；宏观侧 OpenRouter 官方榜单帖《Token-maxxing is dead》（HN `50159464`，`45` 分）给出用量见顶的旁证。

范式表述：**agent 隐性开销显形化——开发者对 agent 的成本假设正从「标价 × 我看得见的调用」切换为「必须实测 harness（包裹大模型、管理工具调用与会话的执行框架）在标价之外替你买了什么」；计量单位从 token 单价下沉到请求来源（Claude Code 的 OpenTelemetry 字段 `query_source`）级，账单第一次需要像安全事件一样被取证。**

![封面：状态栏之下，看不见的摘要请求正把完整会话记录反复送回模型]({{ site.baseurl }}/assets/images/paradigm-radar-agent-hidden-cost-cover.svg)

## 一笔没有账单的请求：机制与取证

按 gist 原文（实测创建于 `2026-10-26T22:27Z`），该摘要请求自 `2.1.232`（2026 年 8 月）起默认开启、无官方关闭开关；回答只更新 agents 面板的状态行，「never reaches the model or your conversation」。异常由 Flamerix 的 DRIM 工具在 Claude Code 自身的 OpenTelemetry 导出里发现：把 `claude_code.api_request` 事件按 `query_source` 分组后，`agent_summary` 的花费「more than the main conversation itself」——占全部花费 `16.4%`（主对话本身 `15.7%`）、占请求数约五分之一，其中 `96%` 走 Opus，input:output 约 `9,000:1`。三项口径必须写清：`16.4%` 系取证方自述样本，且花费是 Claude Code 自己的 `cost_usd` 估算而非发票，订阅制下损失的是限速额度而非现金；gist 转述 issue `#86879`「collects four independent measurements of 18-26%」，属转述、未经逐一核验；`#86879` 首采时 open、`22` 个 reactions、`7` 条评论，标题原文「Feature request: a supported way to disable the agent_summary spinner (22.7% of requests, ~18% of weighted tokens in a subagent-heavy session)」；`2026-11-16` 复测，该 issue 已关闭，reactions 涨到 `121`、评论 `15` 条——诉求没有消失，声量涨了五倍半，关闭原因未附公开说明，本期按「修复路径（`2.1.311+`）+ issue 关闭」记账，不写「官方开关落地」。gist 声明独立于 Anthropic（原文标注非关联方），但 Flamerix 自身售卖 DRIM 工具，动机需计入。盲区正是范式支点：「These requests are not written to the transcript… the OpenTelemetry export shows them」——读本地 transcript 的成本工具天然看不见这笔钱。

![账单可见性矩阵：摘要请求走 30 秒定时器全量送 Opus，不入 transcript，读本地账本的工具看不见，只有代理与 OTel 导出可见]({{ site.baseurl }}/assets/images/paradigm-radar-hidden-cost-blindspot.svg)

## 第三方口径混战：16.4%、2% 与 8% 同时在场

线程里最有价值的不是任何一个数字，而是三组数字并排放下后没人能裁决。厂方口径之外，第三方实测第一批在 `24` 小时内到齐。jakozaur（评论 `50284683`）自测后说「looks real but more nuanced」：摘要只影响 subagents、workflows 不受波及，且多数请求是缓存读，「长上下文子代理贵、短上下文的几乎免费」，他自己的会话里「最多 `~8%`」。HeavenFox（`50284556`，子树 `25` 条）把缓存论点抬成一般疑问：全量 transcript 重发，绝大多数 token 应当是 cache hit、实际便宜——此论点与 jakozaur 互为印证，也把 `16.4%` 的成色问题挑明：贵的是缓存未命中的头部。反向样本来自 simon83（`50286504`）：他把 gist 喂给 Opus 让它按 `30` 秒定时器反推自己的隐藏调用，自报 `20x` Max 重度周、API 等价消费 `1,970` 美元口径下的隐性状态行开销清单——个人级样本，但方法可复制（拿自己的 transcript + 定时器就能复算）。gym（`50284567`，子树 `18` 条）提供了修复生效的现场证据：`Pro` 档下「`100%` 的 `5` 小时窗口吃掉整周额度的 `25%`」两天后变成 `13%`，「something was fixed」——额度行为变化先于任何文档更新被用户侦测到，这本身是「不透明计费时代」的标准场景。同线程还有两条注脚级的账：apt-apt-apt（`50284590`）把「缓存随机失效、单次约 `8` 美元」称作 free-revenue feature-bug；AlexErrant（`50285046`）顺手公布了移除系统提示词里邮箱的自制插件，把成本议题与影子行为议题（`50219875` 邮箱注入帖，复测 `25` 分）缝在同一只工具箱上。

![三组口径对照条：取证方 16.4%、厂方自述 2-6%、第三方自测 8%，各自标注样本与方法不可换算；下方为修复前后额度占比 25% 到 13% 的现场样本]({{ site.baseurl }}/assets/images/paradigm-radar-hidden-cost-claims-bars.svg)

## 供给端：独立计量工具簇成排出现

独立计量（用开发者自己运行的工具核对 harness 实际发出的请求与花费）不是新行当，新在窗口内的密度。窗口内新建或活跃的独立仓（首采实测 `2026-10-29`，括注 `2026-11-16` 复测）：`microsoft/TokenEconomizer` `492` 星（复测 `6,245` 星，约十三倍，`11-12` 仍有提交）、创建于 `2026-10-13`，微软官方组织，描述「Experience-Driven Black-Box Cost Control for Coding Agents」，是供给端最重信号——窗口内还是「星数 492 的新仓」，复测时已是本赛道事实头部；`kelviq/tare` `301` 星（复测 `307`，「Ask Claude Code where your usage went」，`8` 月后未再更新）；`splunk/token-meter` `139` 星（复测 `147`，Splunk 官方组织，本地优先仪表盘，描述已覆盖 Claude Code、Codex、Cursor、OpenCode、Kiro、Pi 六家）；`rbartoli/agent-usage-guard` `83` 星（复测 `100`，`11-15` 仍有提交，拦截 subagent fan-out 与重试循环）；`aashish254/burn` `43` 星（本地零依赖成本台账）。存量头部 `getagentseal/codeburn` `11,612` 星（2026-04 创建）说明赛道有 prior art，新意在三个官方组织（微软、Splunk、阿里 loongsuite-pilot `231` 星）同窗入场做 harness 侧计量。搜索面同样实测：`"token usage"` 存量 `5,676` 库、其中 `2026-06` 以来新建 `3,296`，近五个月新建占存量约 `58%`。控制手段也同期分化出第二代：tluyben2（`50285138`）自述在 Claude Code 前面架了路由件 Jev，「它比我预想得多得多的场景选了 Haiku，效果很好」——从「记账」升级到「分流」，模型路由成为成本治理的下一个动作位。与第 19 期[《把 Agent 的线拉进自己的箱子》]({{ site.baseurl }}/paradigm-radar-agent-gateway-layer/)的区隔：那期在传输层装闸、回答「此刻这字节经过谁的手」，本期给账单验光、回答「标价之外它替我花了哪些钱」——网关只是本期的手段之一。与第 15 期《Agent的Token消耗经济学》[站内链接]({{ site.baseurl }}/paradigm-radar-token-consumption-economics/)的区隔：那期算 token 单价的宏观账，本期查厂商默认值替你下的微观单。与第 18 期[《当你的笔记本上住进别人家的守护进程》]({{ site.baseurl }}/paradigm-radar-agent-daemon-sovereignty/)的区隔：那期要驱逐别人的常驻进程，本期不要求驱逐任何东西，只要求账本可验证。

## 反方与边界：从「计量无意义」到「厂方口径战」

线程内至少五条反方论据有实质内容。`50285828`（jstummbillig）逐字称「What market is going to care about the number of tokens somebody uses?... It's nonsense」——token 计量本身无意义论。厂方 edwinarbus（`50284699`）的反证最锋利：机制「only applies to background agents that are actively working」，空闲后台 agent 不触发，「Your 16.4% sounds like it was for a team running mostly background agents」——样本代表性反证，与厂方自述的 `2%/4%/6%` 口径互为表里，两组数字都只有自述可查、无第三方能独立复测厂方全量。`50287810`（brookst）质疑动机论：厂商故意烧 token 自损成本、赶用户去竞品，不合商业逻辑；franticgecko3（`50285008`，子树 `64` 条）把举证责任反抛给厂商：「Claude Code 无端烧掉大量 token 已经是见过好几次的头条了，该开始质疑自带 harness 的模型厂商的动机了」——同一楼层里，动机论与反动机论第一次都拿到了子树级的声量。`50288850`（subscribed）反问关闭路径缺失：「is the distinct absence of any mechanism to tune/turn it off for our own good?」。第五脚来自产品哲学：bprathamesh2003（`50286355`）与 messh（`50284507`）代表的「harness 臃肿论」把成本问题改写成选型问题——「发布时很干净，现在被功能轰炸」「Pi 的极简我更喜欢」；nikolay（`50285041`）的跨厂对照（Opus 周额度一两天烧穿、GPT 高推理档「感觉无限」）虽属单人口径，却是「成本观重塑选型」的第一批证词。边界条件继续列开：gist 自承花费为估算非发票；`2.1.311+` 修复已上线意味着「无法关闭」的指责正在失效，但按厂方自述仍是「最贵场景修复加更便宜模式在路上」，不是关闭开关；同一周还有 `50219875`《Claude Code slyly adding users' emails to outbound HTTP》（`22` 分、全树 `8`，复测 `25` 分）作为 harness 未授权行为的旁证帖，热度不足以独立成波，仅作影子行为注脚。

## 出口在选型：成本议题开始改写 harness 决策

这批线程合起来最值得存档的转向，是成本从「忍受项」变成了「选型轴」。gym 的额度侦测、tluyben2 的路由前置、jakozaur 的 workflow 规避（用不受摘要波及的调用形态绕开计费路径）、nikolay 的跨厂迁移，四个动作共用同一个前提：harness 的黑盒默认值不再被默认信任，「它替我发了什么请求」进入与「它好不好用」同级的评估位。但取证递归也在成形：jubilanti（`50147291`）在同窗就提醒，「LiteLLM 们要么是带漏洞的 vibecoded 烂摊子，更新速度这么快，里面不可能没有洞」——计量件自己也是第三方代码，账本工具的可信度问题，是本期叙事留给下一期的欠条。网关线程里的对照数字继续在场：NeutralWanted（`50147314`，子树 `74` 条）的「同强度 API 两三周烧穿 `200` 美元」与 variety8675（`50147381`）的「`$100` 订阅感觉无限」两说并存，说明额度、限速、隐性请求三本账在不同套餐与工况下彼此矛盾——没有统一账单口径，就没有统一的成本结论，这恰是独立计量工具存在的理由。选型轴上的每一次迁移，都会被下一次的 OTel 导出忠实地记录在案。

## 品类成形度与观察点

宏观侧继续提供背景压力：OpenRouter 榜单帖《Token-maxxing is dead》首采 `45` 分、`11-16` 复测仍 `45` 分 / `54` 条——榜单本身显示用量见顶，「堆 token 换效果」的军备叙事降温，单位预算的去处才第一次成为议题；这与本期的微观取证是同一枚硬币的两面：总量不再增长时，「钱花在哪」比「花了多少」更锋利。成形度判断在复测后需要部分改写：锚点 `591` 分还在慢涨；工具簇不再温吞——TokenEconomizer 从 `492` 星冲到 `6,245` 星，证明「官方组织出计量器」这条路有人买单；但命名轴依旧空白，没有一个词把「请求级成本取证」指认为品类。第 19 期同款「品类前夜」形态因此更新了半格：产品轴从温吞转热，命名轴与标准轴仍然凉的。实操侧窗口内已给出动作：复制 `#86879` 的 `query_source` 分组自查法，用 OTel 导出核对自己的请求结构；重度用户可用 gist 的 Bun preload 方案（约 `70` 行、不改二进制，但 gist 自警「An update can silently undo it」，每次升级后复查）。第 19 期埋下的观察点（OTel 规范派与自建代理派之争）在本期获得部分回答：loongsuite-pilot、tare 等走 OTel 路线，本地台账与遥测导出正在成为计量主战场。观察点三条，`2026-11-16` 状态如下：厂方「更便宜模式」（小模型加短笔记替代全量 transcript）仍未见文档化落地；`#86879` 已关闭但公开口径只有「修复上线」没有「开关提供」，诉求与实现的差值继续盯；下一个被取证的隐性请求类型会不会来自 Codex 或 Cursor——splunk/token-meter 的描述已经覆盖六家 harness，取证工具的适配清单，往往就是下一期事故面的预告片。

## References
- [HN 50284255：Claude Code 定期把每个后台 agent 的 transcript 发给其模型][links-1]
- [Flamerix gist：Claude Code burns ~15-20% of your tokens on a 3-word status line][links-2]
- [HN 评论 50284699：Claude Code 成员 edwinarbus 厂方回帖][links-3]
- [anthropics/claude-code issue #86879：请求提供关闭 agent_summary 的官方方式][links-4]
- [HN 50145507：不跑自己的 LLM proxy 怎么知道发生了什么][links-5]
- [HN 50159464：Token-maxxing is dead, OpenRouter's token usage plateaus][links-6]
- [microsoft/TokenEconomizer GitHub 仓库][links-7]
- [splunk/token-meter GitHub 仓库][links-8]
- [kelviq/tare GitHub 仓库][links-9]
- [rbartoli/agent-usage-guard GitHub 仓库][links-10]
- [HN 50219875：Claude Code slyly adding users' emails to outbound HTTP][links-11]
- [jakozaur 第三方实测约 8%][links-12]
- [HeavenFox 缓存命中论点][links-13]
- [gym 修复生效的额度现场][links-14]
- [franticgecko3 厂商动机质询][links-15]
- [站内：AI 范式雷达《把 Agent 的线拉进自己的箱子》][links-16]
- [站内：AI 范式雷达《当你的笔记本上住进别人家的守护进程》][links-17]
- [站内：AI 范式雷达《Agent 的 Token 消耗经济学》][links-18]


[links-1]: https://news.ycombinator.com/item?id=50284255
[links-2]: https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce
[links-3]: https://news.ycombinator.com/item?id=50284699
[links-4]: https://github.com/anthropics/claude-code/issues/86879
[links-5]: https://news.ycombinator.com/item?id=50145507
[links-6]: https://news.ycombinator.com/item?id=50159464
[links-7]: https://github.com/microsoft/TokenEconomizer
[links-8]: https://github.com/splunk/token-meter
[links-9]: https://github.com/kelviq/tare
[links-10]: https://github.com/rbartoli/agent-usage-guard
[links-11]: https://news.ycombinator.com/item?id=50219875
[links-12]: https://news.ycombinator.com/item?id=50284683
[links-13]: https://news.ycombinator.com/item?id=50284556
[links-14]: https://news.ycombinator.com/item?id=50284567
[links-15]: https://news.ycombinator.com/item?id=50285008
[links-16]: {{ site.baseurl }}/paradigm-radar-agent-gateway-layer/
[links-17]: {{ site.baseurl }}/paradigm-radar-agent-daemon-sovereignty/
[links-18]: {{ site.baseurl }}/paradigm-radar-token-consumption-economics/
