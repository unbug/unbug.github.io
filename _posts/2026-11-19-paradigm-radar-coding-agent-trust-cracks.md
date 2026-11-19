---
layout: post
title:  "AI 范式雷达：《编码 Agent 的信任正在从六个方向裂开》"
author: unbug
categories: [AI, ParadigmRadar, Security]
image: assets/images/paradigm-radar-agent-trust-crest.svg
image_alt: "封面：六根横向支柱条按 HN 分数排列（1,616/1,014/728/628/591/536），最热一根朱色其余蓝色，底注合计 5,113 分与企业侧高盛 905 分另计，标题字「信任裂缝」"
tags: [ai-agents, coding-agents, security, telemetry, supply-chain, credential-isolation]
description: "编码 Agent 信任危机全景：六根支柱帖 5,113 分，四家涉事方各自翻车，高盛收回权限、Win11 收割遥测、Codex 训练回滚，附六条自保清单。"
---


从 `10-29` 到 `11-16` 的三周里，Hacker News 上围绕编码 Agent 的信任事故支柱帖累计冲到 `5,113` 分（Algolia API 全树实测，截至 `2026-11-19`）：邮箱外发、渠道后门、常开授权泄密、transcript 上行、训练开关回滚、OS 遥测收割，六根支柱彼此独立、互相不解释，涉事主体横跨 Anthropic、OpenAI、微软与一个攻击者；披露侧由两名研究员与社区帖把事故钉成可查证实据。`11-08`，一家媒体披露高盛把 Claude Code 从银行家和交易员手里收了回去，这条企业侧消息单独拿了 `905` 分（全树 `474` 评论），不计入支柱合计。

编码 Agent 的普及叙事正在从「能不能用」切换到「敢不敢用」。这篇文章把三周的碎片拼成一张完整的裂缝地图：分发渠道、权限模式、上行通道、厂商政策、操作系统、企业治理六个方向，每个方向给出可复现的验证入口，最后附一份你现在就能执行的自保清单。

![支柱分数封面图：四家涉事方 · 六根支柱 · 三周（含分发渠道与权限模式面），六根横条按 HN 分数排列（1,616 / 1,014 / 728 / 628 / 591 / 536），最热一根朱色其余蓝色，底注「四家涉事方六支柱合计 5,113 分 · 高盛 905 分为企业侧回应另计 · 数据截至 2026-11-19」，标题字「信任裂缝」]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-crest.svg)


## 目录

- 三周，六条裂缝：先看全景
- 裂缝一：分发渠道被打穿
- 裂缝二：一次授权，永久放行
- 裂缝三与四：两条看不见的上行通道
- 裂缝五与六：政策悄悄回滚，操作系统替你记账
- 企业侧多米诺：高盛把权限收回去
- 反方与噪声：哪些声音不该照单全收
- 自保行动清单
- 口径与边界
- References

## 三周，六条裂缝：先看全景

先把事实底座钉死。下表七条帖（六根支柱帖加一根企业侧回应帖）全部来自本文写作前的 HN Algolia 接口复测（分数与全树评论数为递归计数，剔除 deleted/dead，截至 `2026-11-19`）：

| 事件 | 涉事主体 | HN 分数 / 全树评论 | 日期 |
|---|---|---|---|
| Claude Code 经 User-Agent 头外发邮箱 | Anthropic | `1616` / `502` | 11-05 |
| Cursor Marketplace 官方 VSX 被植入后门 | 攻击者（针对 Anthropic 渠道） | `1014` / `514` | 10-30 |
| 高盛收回 Claude Code 使用权 | Goldman Sachs | `905` / `474` | 11-08 |
| Win11 遥测收割编码 Agent 使用数据 | Microsoft | `728` / `616` | 11-16 |
| 「Don't Ask Again」权限模式泄密 1,122 个文件 | Anthropic（Claude Code 权限模式） | `628` / `422` | 11-07 |
| 背景 Agent transcript 上行 | Claude Code 后台任务 | `591` / `236` | 10-29 |
| Codex 对话训练开关悄悄回滚 | OpenAI | `536` / `163` | 11-03 |

把 `10-29` 至 `11-07` 的早期四根支柱相加是 `3,849` 分，`11` 月第二、三周新增 Win11 与 Codex 两根支柱（合计 `1,264` 分），六根支柱合计 5,113 分 = Claude Code 相关四帖 3,849 + OpenAI 与 Microsoft 两帖 1,264（六支柱累计口径同此）；高盛为企业侧回应另计，`905` 分不入支柱合计——危机不但不收敛，还在加速。另有 `134` 分的规避实践帖和 `96` 分的本地审计工具未计入上表，簇内合计约 `2,400` 条全树评论。**注意这张表的结构**：它不是一个厂商的连续翻车记录，而是 Anthropic、OpenAI、微软、攻击者四个涉事方加高盛一家出手企业的独立事故——这正是不祥之处。单一厂商的信任事故可以靠换供应商解决；多个主体同时出问题，说明问题出在「把 Agent 接进开发环境」这件事本身。

![六支柱分数图：结论行「四家涉事方六支柱合计 5,113 分，高盛 905 分为企业侧回应另计，危机三周仍在加速」；a 面板「七根支柱与邻簇帖的 HN 分数」横条（1,616 / 1,014 / 728 / 628 / 591 / 536 / 319），数值标于条端、无坐标轴，高盛收回权限与 Harvard 审查瓶颈两根灰色标注不入合计；b 面板三根横条对比早期四支柱 3,849、新增两支柱 1,264、高盛企业侧 905（标「不入合计」），其中 1,264 条端注「与早期相加为六支柱合计 5,113」]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img02.svg)

时间分布也值得一看：早期支柱（`10-29` 至 `11-07`）集中在「工具替你做了没被告知的事」，`11` 月第二、三周除了 Win11 与 Codex 两根新支柱，企业侧也开始了正式回应（高盛 `905` 分单列）。裂缝还在长大，下文按六条线逐一拆。

## 裂缝一：分发渠道被打穿

`10-30`，安全公司 phorion 披露（HN `1014` 分，源页 HTTP 实测可达）：Cursor 的开放扩展市场 VSX 上，与 Claude Code 相关的官方渠道扩展被植入后门。攻击路径不是 0-day，而是一条纯流程缺口——**市场收录扩展，但没有人校验「发布者账号是否真的是厂商本人」**。开发者在编辑器里点下安装、重载窗口，恶意代码就跟着你的编辑器进程进了本机，拿到的是你整个开发环境能碰到的一切：SSH 私钥、云凭证、浏览器会话。本站早前写过通用工具链的同类事件（[《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)），本期不重复展开；差别在于这一次被打穿的是编码 Agent 的官方分发面。

这条线的可怕在于「官方」二字的含金量归零。过去我们区分「官方扩展」和「第三方扩展」时，默认市场页面上的厂商标识构成一种担保；VSX 事件证明这层担保在部分市场上只是可自由申领的装饰。GitHub 官方仓库里的 `claude-code-security-review`（星数 `7,007`，GitHub API 实测，截至 `2026-11-16` 基线）是厂商侧对 Agent 安全审查的正面投入，但它防不住你从市场装进来的那个「官方」扩展——信任断在最入口的一环。

![分发信任链图：a 面板开发环境→编辑器扩展宿主→本地凭证（SSH 私钥/云凭证/浏览器会话）的链路，厂商构建、扩展市场收录、开发者安装三个节点，注入点标注在收录到安装之间（即发布者身份未校验）；b 面板对照「你以为的信任链」（厂商签名→市场审核→安装安全）与「实际的：」信任链（任何人可申领发布者标识→市场收录→安装即执行），「两条链的差值 = 市场侧发布者身份校验的缺失」，phorion 披露的 VSX 后门（HN 1,014 分）即从此缺口进入]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img03.svg)

值得记住的方法论：**扩展的安全性取决于分发渠道对发布者身份的校验强度，而不是扩展页面上写了谁的名字。**这条教训适用于所有 Agent 插件生态——VSX、JetBrains Marketplace、各类 MCP 目录，无一例外。

## 裂缝二：一次授权，永久放行

`11-07`，安全研究员 apiiro 发文（HN `628` 分，全树 `422` 评论；原帖标题点名的是 Claude Code）：他扫描公开 GitHub 仓库，发现 **`1,122` 个文件泄露了密钥类敏感内容，路径都通向编码 Agent 的「Don't Ask Again」（不再询问）权限模式**。机制拆开很简单：Agent 第一次要执行某类命令（读文件、跑脚本、发起网络请求）时弹窗问你，你嫌烦点了「不再询问」——这个决策被写进配置后变成常开许可，此后同类操作不再有任何拦截。问题在于，你授权时看到的是这一次的具体命令，而规则覆盖的是这一类的全部未来。

（注：apiiro 原文对直连请求返回 `403` 反爬拦截，本文数字转引自其 HN 讨论帖口径，读者可在帖内查证原始链接。）

「不再询问」这个交互文案本身就是事故的一部分。它听起来像「记住我的偏好」，实际语义是「把这类操作的安全审查永久移交给 Agent」。每一次点击都是一次不可见的权限固化，攒够几百条之后，你的 Agent 拥有一套从未被完整审计过的常开权限集——而它替你提交进公开仓库的东西，可能正在这套权限的覆盖范围内。

![权限状态机图：a 面板四状态流程——操作请求→弹窗询问（你看到的是一次具体命令）→点击不再询问→常开许可（规则覆盖该类全部未来），从常开许可直接通向泄密的边标为红色；b 面板对照条：授权时上下文=1 条具体命令，生效范围=该类全部未来操作，标注 1,122 个泄露文件为研究员扫描口径，b 面板标题「授权时上下文与生效范围（条端直标数值，无坐标轴）」]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img04.svg)

这一裂缝的独特性在于：**泄密的扳机是用户自己的点击，工具只是把一个高风险决策包装成了免打扰设置。**它不需要任何漏洞，正常使用就会发生。

## 裂缝三与四：两条看不见的上行通道

裂缝一、二还需要你「装错东西」或「点错按钮」，裂缝三和四则发生在完全正常的配置下。

**其一，背景 Agent 的 transcript 上行。**`10-29`，开发者 flamerix 发 gist 实测（HN `591` 分，全树 `236` 评论）：Claude Code 的后台任务会把完整对话记录（transcript——你与 Agent 的全部往来文本，含你贴进对话的密钥、内部仓库路径、未发布代码片段）上行到远端端点，配置里没有一行说明。gist 原文在本机网络环境下不可达，HN 帖健康，帖内附有原文存档。

**其二，邮箱经 User-Agent 头外发。**`11-05`，有人在 `anthropics/claude-code` 仓库提了 issue `#107757`（HN `1616` 分，本簇最高）：CLI 发出的 HTTP 请求，User-Agent 头里拼进了用户的 GitHub 邮箱。邮箱不是藏在什么调试字段里，而是放在每一次请求都会携带的标准头部——等于每个 HTTPS 握手都在向端点自报身份。这条线单帖 `1616` 分、全树 `502` 评论，是整簇最热的一条。

![上行通道标注图：本机开发环境（SSH 私钥/云凭证/对话 transcript/GitHub 邮箱）到远端三条通道——通道一 transcript 回传（背景任务完整对话上行，591 分）；通道二 User-Agent 邮箱（每次请求标准头部携带邮箱，1,616 分）；通道三 Windows ETW 遥测（使用位记录经诊断管道上传，728 分）；通道一二标配置无说明，通道三标 optional 诊断默认开启]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img05.svg)

比泄露本身更硬的证据是修复速度。GitHub API 实测（截至 `2026-11-19`）：issue `#107757` 状态 **open**，`121` 条评论，标签含 `area/security`。也就是说，这条被 HN 社区推上 `1616` 分的安全缺陷，在官方仓库里挂了三周仍未关闭、未修复。**厂商安全响应的真实速度，就写在你自己的 issue 列表里。**

这两条通道共同改写了「本地工具」的定义。你以为 Agent 在你机器上干活、只在你主动提交时产生网络流量；实际上每一次后台心跳、每一个请求头，都是一条持续存在的上行路径。审视一个 Agent 工具的安全面，第一个动作应该是打开抓包工具看它到底发了什么，而不是读它的隐私政策。

## 裂缝五与六：政策悄悄回滚，操作系统替你记账

剩下两条裂缝的主角不再是某个 Agent 产品，而是平台本身。

**裂缝五：训练开关的悄悄回滚。**`11-03`，HN 上一条文本帖（`536` 分，全树 `163` 评论）收集证据称：OpenAI 似乎在未发公告的情况下，对 Codex 对话重新启用了模型训练——而此前的政策口径是编码对话不用于训练。这是一条社区指控级材料，OpenAI 未在帖内给出可查证的书面回应，本文只陈列帖内证据链，不作定论。但它触及的问题独立成立：**数据用途是一种政策状态，而政策状态可以随时回滚，且回滚不必然伴随通知。**你今天基于「数据不训练」做出的信任决策，明天可能已经不再对应任何事实。

**裂缝六：操作系统开始收割编码 Agent 的使用数据。**`11-16`，具名安全研究员 xusheng 发布逆向报告（HN `728` 分，全树 `616` 评论，全文 HTTP 实测可达、可复现）：Windows 11 的 `MissionControlAggregator.dll` 里硬编码了编码 Agent 的可执行文件名——`codex.exe`、`claude.exe`、`copilot.exe`、`cursor.exe`、`agy.exe`——共四个 CLI-Agent 槽位加五个桌面-Agent 槽位，连 WSL 内无扩展名的路径都在探测范围。系统记录这些工具的使用位，先存本地，再经 Windows Diagnostics 管道上传微软；前提是那个默认勾选的「可选诊断数据」（optional diagnostics）没有被关掉。工具用逆向软件 Binary Ninja 完成分析，作者的 CVE 与媒体经历挂在个人页可查。

这条是六条裂缝里唯一**读者可以亲手复现**的：用任意十六进制工具打开那个 DLL 搜字符串，或用 ETW（Event Tracing for Windows）监听该组件的行为，都能独立验证。它同时也是打击面最大的一条——不挑你用什么 Agent，只要你在 Windows 上开发，收割就与你有关。

把裂缝五、六并排看会得到一个不舒服的结论：应用层的厂商会把政策改回去，OS 层厂商会把你用工具的事实收走。**在编码 Agent 这件事上，「平台是中立的」这个默认假设已经没有一条幸存。**

## 企业侧多米诺：高盛把权限收回去

个人用户的信任裂缝，到 `11-08` 出现了机构级回应。The State of AI 报道（HN `905` 分，全树 `474` 评论，源页 HTTP 实测可达，转引 Bloomberg `2026-11-02` 原始报道）：**高盛在 `10` 月更新内部指引，把 Claude Code 与 GitHub 的使用权限收缩到工程师岗位，交易员和银行家收回使用权；而在此前的 `4` 月，其香港岗位已经先行禁用了 Claude。**触发因素报道口径为生产力评估与风险审查，交易员（strats，技术型岗位）保留权限。

三个细节让这个案例的分量超出一家公司的内部 IT 决定：

1. **这是「先放后收」，不是「从没放过」。**高盛是 AI 编码工具的重度采购方，收回权限是一次正式的信任撤销，走的还是 Bloomberg 具名报道这种可查证渠道。
2. **岗位分级授权本身就是新的治理范式。**全员工具→工程师专属，说明企业内部开始把「哪些岗位可以接触何种 Agent 能力」当作一道需要设计的安全边界，而不是一纸全员许可。
3. **利益相关方也在下场用。**报道同时提到高盛是 Anthropic IPO 的主承销商之一——承销商与采购方双重身份并存，采购方仍然选择收缩，这个信号比任何独立第三方的禁令都硬。

![五主体事件矩阵：「事件 × 涉事主体矩阵（格内为 HN 分数）」，Anthropic（含渠道与权限面）占三格（1,616、1,014 旁注「攻击者借 Anthropic 渠道」、628，另 591 一格）、OpenAI 536、Microsoft 728；Goldman（企业侧）905 灰色标注「企业侧回应，不入合计」；b 合计口径：Claude Code 相关四帖 3,849 + OpenAI 与 Microsoft 两帖 1,264 = 5,113；底注邻簇事件未并入，Algolia 全树口径实测 2026-11-19]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img06.svg)

窗口内还有更弱的跟进信号：Citi 限制 AI Agent 访问客户账户的帖（`50121032`，仅 `2` 分）。单看分数微不足道，但方向与高盛一致；`agent.reviews` 式的外部评价飞轮（实测 `193,121` 条评价 / `4,495` 个工具，截至 `2026-11-19`）则说明「按厂商安全履历选型」正在长出公共数据面。企业侧的多米诺才推到第二块，但倒塌方向已经可见。

## 反方与噪声：哪些声音不该照单全收

一条 `5,113` 分的簇里同样混着噪声，不甄别会被带偏。

**其一，方向相反的邻帖不构成本簇证据。**同窗口内「Anthropic 封禁涉及大模型训练的用户」（`50319358`，`497` 分）是平台封用户，与「工具替你泄密」方向相反，本文不并入；「Lovable 泄露用户护照与私信」（`50499017`，`1007` 分）属 vibe-coding 平台的数据安全，涉事产品不是编码 Agent，同样不并入。把不相干的泄露事件堆进同一个叙事，是这类热点最常见的失真方式。

**其二，部分证据链存在核验缺口。**Codex 训练回滚是社区指控，OpenAI 无书面确认；apiiro 原文直连 `403`，数字只能转引讨论帖口径；transcript gist 原始域对本文抓取环境不可达，依赖帖内存档。这三处在正文里都已逐条标注，引用时请保持同样的谨慎。

**其三，簇内也有防御侧的正面信号。**`134` 分的实践帖《Running coding agents without handing them my credentials》（`11-17`）展示了不交常驻凭证跑 Agent 的完整路径；Show HN 的 Stroq 本地审计工具（`96` 分）把 Agent 行为日志留在本机；加上官方 security-review 仓库的 `7,007` 星，防御生态在事件压力下已经开始成形。信任危机的另一面，是安全实践第一次成为编码 Agent 选型的显性指标。

## 自保行动清单

按「今天就能做」排序，六条全部有本文实测过的入口：

![防御分层图：五层横条——分发层（校验发布者账号）、权限层（审计常开授权）、网络层（抓包核验上行通道）、OS 层（关闭可选诊断数据）、审计层（本地行为日志/最小权限凭证），右侧箭头标注攻击链自外向内逐层进入]({{ site.baseurl }}/assets/images/paradigm-radar-agent-trust-img07.svg)

1. **重验所有 AI 编码扩展的来源**：逐个打开扩展页面对比发布者账号与厂商官方仓库的归属关系，宁可重装一遍。Cursor Marketplace 事件说明页面标识不构成担保。
2. **审计 Agent 配置里的累计授权**：检查 `.claude/settings.json` 及各 Agent 的权限配置文件，把「Don't Ask Again」类常开许可逐条撤销到按需询问；如果你用 Agent 向公开仓库提交过代码，跑一次密钥泄露自查（apiiro 的 `1,122` 个文件全是这么被扫出来的）。
3. **关窗看一次上行流量**：用抓包工具观察你的编码 Agent 空闲状态下的请求——transcript、User-Agent、遥测端点，眼见为实。顺手关注 issue `#107757` 的状态，把厂商安全响应速度记进工具选型笔记。
4. **Windows 用户关闭可选诊断数据**：设置 → 隐私和安全性 → 诊断数据与相关反馈，取消「发送可选诊断数据」。这直接切断 `MissionControlAggregator` 的上传前提；想深挖的话，那个 DLL 的字符串你自己就能搜。
5. **给 Agent 建凭证隔离**：用最小权限、短时效的 token 跑编码任务，不投喂常驻主凭证；参考 HN `50526152` 的实践路径，配合 Stroq 类本地审计把 Agent 行为留在自己机器上。
6. **企业用户参考岗位分级模型**：把高盛的「工程师岗位专属 + 敏感岗位收回」当作现成模板，按数据敏感度给 Agent 能力划岗位边界，而不是全员一张通行证。

## 口径与边界

本文数字全部为快照口径：HN 分数与全树评论数来自 Algolia API 递归计数（剔除 deleted/dead，截至 `2026-11-19`），与网页展示存在口径差；GitHub 星数为 API 实测（security-review 仓库星数沿用 `2026-11-16` 基线，存在实时漂移）。四处证据缺口已在正文逐条标注：Codex 训练回滚为社区指控级、apiiro 原文 `403` 不可直连、transcript gist 原始域对本文环境不可达、Citi 信号仅 `2` 分不构成趋势。高盛事件的授权收缩细节以 Bloomberg 原始报道为准，本文转引 The State of AI 与 HN 讨论口径。相邻但不同簇的事件（Lovable 泄密、Anthropic 封禁用户、Optimizely 供应链投毒、Harvard 代码审查瓶颈帖 `319` 分）均未计入 `5,113` 分合计，防混簇。本文不主张停用编码 Agent——六条裂缝都有对应的工程缓解手段；本文主张的是：**把编码 Agent 当外部承包商管理，而不是当自己的 shell 管理。**

## References
- [HN 50385272：Claude Code User-Agent 邮箱外发讨论][links-1]
- [anthropics/claude-code issue #107757][links-2]
- [HN 50300683：Cursor Marketplace VSX 后门讨论][links-3]
- [phorion：官方 Claude Code VSX 被攻陷披露][links-4]
- [HN 50407882：Don't Ask Again 泄密讨论][links-5]
- [apiiro：编码 Agent 泄密研究原文][links-6]
- [HN 50284255：背景 Agent transcript 上行讨论][links-7]
- [flamerix gist：transcript 上行实测原文][links-8]
- [HN 50352757：Codex 训练开关回滚讨论][links-9]
- [HN 50524736：Win11 编码 Agent 遥测讨论][links-10]
- [xusheng.dev：Win11 遥测逆向原文][links-11]
- [HN 50415628：高盛收回 Claude Code 讨论][links-12]
- [The State of AI：高盛禁令报道][links-13]
- [HN 50526152：Agent 凭证隔离实践][links-14]
- [anthropics/claude-code-security-review][links-15]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-16]
- [站内：AI 范式雷达《你的 Agent 正在被默认值悄悄改写》][links-17]

[links-1]: https://news.ycombinator.com/item?id=50385272
[links-2]: https://github.com/anthropics/claude-code/issues/107757
[links-3]: https://news.ycombinator.com/item?id=50300683
[links-4]: https://phorion.io/blog/offical-claude-code-vsx-compromise/
[links-5]: https://news.ycombinator.com/item?id=50407882
[links-6]: https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again
[links-7]: https://news.ycombinator.com/item?id=50284255
[links-8]: https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce
[links-9]: https://news.ycombinator.com/item?id=50352757
[links-10]: https://news.ycombinator.com/item?id=50524736
[links-11]: https://xusheng.dev/posts/windows-coding-agent-telemetry/
[links-12]: https://news.ycombinator.com/item?id=50415628
[links-13]: https://thestateofai.com/news/goldman-sachs-claude-code-traders-bankers
[links-14]: https://news.ycombinator.com/item?id=50526152
[links-15]: https://github.com/anthropics/claude-code-security-review
[links-16]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/
[links-17]: {{ site.baseurl }}/paradigm-radar-default-drift-audit/
