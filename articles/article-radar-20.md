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

独立取证帖实测出 Claude Code 的后台 agent 状态摘要请求占其周消耗 `16.4%`，且不写入本地会话记录，普通成本工具看不见这笔钱（取证方自述样本；HN `50284255` 实测 `518` 分，`2026-10-29`）。

机制细节：Claude Code 每隔约 `30` 秒把每个后台 agent（background agent，指在主会话之外持续干活的子任务）的完整 transcript（会话记录）发给其模型（`96%` 走 Opus），只为生成状态栏里 3-5 个词的摘要，该类请求占其 API 请求总数 `19.7%`。三向证据同日摆开：厂方 Claude Code 成员 edwinarbus 在评论 `50284699` 承认机制并给出厂方自述口径——上周全量遥测用户中 `agent_summary` 约占 API 标价成本 `2%`、请求数不到 `4%`，终端场景约 `6%`，并称已在 `2.1.311+` 上线修复（均为厂方自述）；供给端窗口内新建的独立计量仓至少五个（microsoft/TokenEconomizer `492` 星等，实测 `2026-10-29`）；宏观侧 OpenRouter 官方榜单帖《Token-maxxing is dead》（HN `50159464`，`45` 分）给出用量见顶的旁证。

范式表述：**agent 隐性开销显形化——开发者对 agent 的成本假设正从「标价 × 我看得见的调用」切换为「必须实测 harness（包裹大模型、管理工具调用与会话的执行框架）在标价之外替你买了什么」；计量单位从 token 单价下沉到请求来源（Claude Code 的 OpenTelemetry 字段 `query_source`）级，账单第一次需要像安全事件一样被取证。**本文全部数字为 `2026-10-29` 晚经 HN Algolia API 全树遍历与 GitHub API 复测，转述与自述均已标注。据我们观察未发现同类中文报道（本检索通道未覆盖中文媒体）。

![封面：状态栏之下，看不见的摘要请求正把完整会话记录反复送回模型]({{ site.baseurl }}/assets/images/paradigm-radar-agent-hidden-cost-cover.svg)

## 一笔没有账单的请求：机制与取证

按 gist 原文（实测创建于 `2026-10-26T22:27Z`），该摘要请求自 `2.1.232`（2026 年 8 月）起默认开启、无官方关闭开关；回答只更新 agents 面板的状态行，「never reaches the model or your conversation」。异常由 Flamerix 的 DRIM 工具在 Claude Code 自身的 OpenTelemetry 导出里发现：把 `claude_code.api_request` 事件按 `query_source` 分组后，`agent_summary` 的花费「more than the main conversation itself」——占全部花费 `16.4%`（主对话本身 `15.7%`）、占请求数约五分之一，其中 `96%` 走 Opus，input:output 约 `9,000:1`。三项口径必须写清：`16.4%` 系取证方自述样本，且花费是 Claude Code 自己的 `cost_usd` 估算而非发票，订阅制下损失的是限速额度而非现金；gist 转述 issue `#86879`「collects four independent measurements of 18-26%」，属转述、未经逐一核验；`#86879` 本体实测 open、`22` 个 reactions、`7` 条评论，标题原文「Feature request: a supported way to disable the agent_summary spinner (22.7% of requests, ~18% of weighted tokens in a subagent-heavy session)」。gist 声明独立于 Anthropic（原文标注非关联方），但 Flamerix 自身售卖 DRIM 工具，动机需计入。盲区正是范式支点：「These requests are not written to the transcript… the OpenTelemetry export shows them」——读本地 transcript 的成本工具天然看不见这笔钱。

## 供给端：独立计量工具簇成排出现

独立计量（用开发者自己运行的工具核对 harness 实际发出的请求与花费）不是新行当，新在窗口内的密度。窗口内新建或活跃的独立仓（全部 GitHub API 实测 `2026-10-29`）：`microsoft/TokenEconomizer` `492` 星、创建于 `2026-10-13`，微软官方组织，描述「Experience-Driven Black-Box Cost Control for Coding Agents」，是供给端最重信号；`kelviq/tare` `301` 星（「Ask Claude Code where your usage went」）；`splunk/token-meter` `139` 星（Splunk 官方组织，本地优先仪表盘）；`rbartoli/agent-usage-guard` `83` 星（拦截 subagent fan-out 与重试循环）；`aashish254/burn` `43` 星（本地零依赖成本台账）。存量头部 `getagentseal/codeburn` `11,612` 星（2026-04 创建）说明赛道有 prior art，新意在三个官方组织（微软、Splunk、阿里 loongsuite-pilot `231` 星）同窗入场做 harness 侧计量。搜索面同样实测：`"token usage"` 存量 `5,676` 库、其中 `2026-06` 以来新建 `3,296`，近五个月新建占存量约 `58%`。与第 19 期[《把 Agent 的线拉进自己的箱子》]({{ site.baseurl }}/paradigm-radar-agent-gateway-layer/)的区隔：那期在传输层装闸、回答「此刻这字节经过谁的手」，本期给账单验光、回答「标价之外它替我花了哪些钱」——网关只是本期的手段之一。与第 15 期《Agent的Token消耗经济学》[站内链接]({{ site.baseurl }}/paradigm-radar-token-consumption-economics/)的区隔：那期算 token 单价的宏观账，本期查厂商默认值替你下的微观单。与第 18 期[《当你的笔记本上住进别人家的守护进程》]({{ site.baseurl }}/paradigm-radar-agent-daemon-sovereignty/)的区隔：那期要驱逐别人的常驻进程，本期不要求驱逐任何东西，只要求账本可验证。

## 反方与边界：从「计量无意义」到「厂方口径战」

线程内至少四条反方论据有实质内容。`50285828`（jstummbillig）逐字称「What market is going to care about the number of tokens somebody uses?... It's nonsense」——token 计量本身无意义论。厂方 edwinarbus（`50284699`）的反证最锋利：机制「only applies to background agents that are actively working」，空闲后台 agent 不触发，「Your 16.4% sounds like it was for a team running mostly background agents」——样本代表性反证，与厂方自述的 `2%/4%/6%` 口径互为表里，两组数字都只有自述可查、无第三方能独立复测厂方全量。`50287810`（brookst）质疑动机论：厂商故意烧 token 自损成本、赶用户去竞品，不合商业逻辑。同线程 `50288850`（subscribed）则反问关闭路径缺失：「is the distinct absence of any mechanism to tune/turn it off for our own good?」边界条件继续列开：gist 自承花费为估算非发票；`2.1.311+` 修复已上线意味着「无法关闭」的指责正在失效，但按厂方自述仍是「最贵场景修复加更便宜模式在路上」，不是关闭开关；同一周还有 `50219875`《Claude Code slyly adding users' emails to outbound HTTP》（`22` 分、全树 `8`）作为 harness 未授权行为的旁证帖，热度不足以独立成波，仅作影子行为注脚。

## 品类成形度与观察点

成形度判断：锚点 `518` 分仍在涨（本文调研当日内多次复测递增），需求情绪有第 19 期主证帖《If you don't run your own LLM proxy, how do you know whats going on?》（HN `50145507`，`303` 分、全树 `220`，本期只取其「你不知道脚下跑了哪些请求」的计量学读法，引用切割如前）；但工具簇自身帖热度仍低（agent-usage-guard 仅 `28` 分），OpenRouter 拐点帖 `45` 分——与第 19 期同款「品类前夜」形态：情绪与事故轴滚烫，命名与产品轴温吞。实操侧窗口内已给出动作：复制 `#86879` 的 `query_source` 分组自查法，用 OTel 导出核对自己的请求结构；重度用户可用 gist 的 Bun preload 方案（约 `70` 行、不改二进制，但 gist 自警「An update can silently undo it」，每次升级后复查）。第 19 期埋下的观察点（OTel 规范派与自建代理派之争）在本期获得部分回答：loongsuite-pilot、tare 等走 OTel 路线，本地台账与遥测导出正在成为计量主战场。观察点三条：厂方「更便宜模式」（小模型加短笔记替代全量 transcript）是否落地并进入文档；`#86879` 是否获得官方关闭开关；下一个被取证的隐性请求类型会不会来自 Codex 或 Cursor——同构蔓延即下一期选题判据。

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
