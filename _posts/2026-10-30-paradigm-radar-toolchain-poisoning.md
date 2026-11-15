---
layout: post
title:  "AI 范式雷达：《官方渠道沦陷之后》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-toolchain-poisoning-cover.svg
image_alt: "封面：官方扩展市场与包注册表的分发管道中混入带后门的安装包"
tags: [supply-chain, security, coding-agent, vscode-extension, pypi, mcp]
description: "13 天内 5 个高分 HN 事件实测出 AI 编码工具的官方分发渠道接连沦陷：OpenCode、LiteLLM、Claude Code 扩展遭投毒，四家官方组织同窗发布扫描与签名仓，AI 工具链正被当作供应链资产管理，防御标准尚未落地。"
---

13 天内 Hacker News 出现 `5` 个 AI 工具链供应链高分事件帖（`976` 分最高，`2026-10-31` 实测）：被攻击的是开发者写代码用的 AI 工具本身，官方 Claude Code VS Code 扩展也在其中被植 SSH 后门（Phorion 公告[links-1]）。

口径先钉死：首采为 `2026-10-31` 的 HN Algolia 全树遍历与 GitHub API 实测；`2026-11-16` 复测，线程热度与防御仓星数各自刷新（Phorion 公告帖从 `377` 分涨到 `1014` 分，反超成主线程），两次口径分列不混用；Reuters 与 Cursor 公告为转述级，Anthropic 员工发言为当事方口径，NVIDIA 扫描数据为研究方自报，全部标注。

范式表述：**AI 编码工具链从「可信开发环境」降级为「供应链攻击面」——攻击者从投毒你的依赖，转向投毒你用来生成代码的那个工具的分发包；供给端已经把这当作一门生意：NVIDIA、思科、微软、Cloudflare 四个官方组织在 2026 年 1-6 月密集发布 agent 技能扫描与治理仓库，OWASP GenAI Security Project 把 Agentic App Security 与 AI Bill of Materials 设为常设轨道。**事件坐标：`OpenCode` 凭据泄露（`976` 分）、`LiteLLM` PyPI `1.107.0` 投毒（`596` 分）、官方 `Claude Code for VS Code` 扩展在 `Cursor Marketplace` 被植入跨平台持久化 SSH 后门（三帖 `645`/`396`/`377` 分，`2026-10-31` 实测）。

![封面：官方扩展市场与包注册表的分发管道中混入带后门的安装包]({{ site.baseurl }}/assets/images/paradigm-radar-toolchain-poisoning-cover.svg)

## 13 天 5 帖：官方分发渠道接连失守

时间线（分数均为 `2026-10-31` 实测，括注 `2026-11-16` 复测）：`10-17`，AI 编码工具 OpenCode 被入侵、用户凭据泄露（HN `50133401`，`976` 分，复测 `977` 分 / `185` 条）；`10-21`，AI 网关 LiteLLM（BerriAI/litellm，`62,393` 星，实测）的 PyPI 包 `1.107.0` 被投毒，装上即带凭据窃取器与后门（HN `50181114`，`596` 分，复测 `596` 分 / `202` 条）；`10-30`，同一天三家独立披露同一事件——官方 Claude Code for VS Code 扩展在 Cursor Marketplace 的分发包被植入后门：GossiTheDog 帖 `645` 分（复测 `663`）、Phorion 公告帖 `377` 分（复测 `1014` 分 / `514` 条）、DoublePulsar 帖 `396` 分（复测 `399` 分 / `1` 条）。

![五帖首采与复测双柱：Phorion 公告帖 377 涨到 1014 反超成主线程，另两帖评论被合并]({{ site.baseurl }}/assets/images/paradigm-radar-toolchain-recheck-bars.svg)

复测揭示的格局变化比首采更清楚：三帖同题时，热度最终归给了给出完整技术细节的公告方——Phorion 公告（作者 Calum Hall，`2026-10-30`）写明后门跨 macOS/Linux/Windows 三平台、以 SSH 持久化；Cursor 已下架该版本并从 NPM 与 VSCode registry 拉取 `2.1.313`，公告要求排查使用该版本的环境。另两帖的评论区在当天就被 HN 管理员动议合并进公告帖（`50304623`、`50304651` 两条「Comments moved to」留痕）——事件复盘的公共注意力，向「谁有细节」集中。前史同样在堆积：`2026-05` 恶意 VSCode 扩展致 GitHub `3,800` 个仓库泄露（HN 帖 `1054` 分）、`2026-09` OpenAI agent 对 RubyGems 发起未公开攻击（`975` 分）——攻击面从包注册表蔓延到扩展市场，再到 AI 工具自己的官方分发渠道。

## 主线程内部：官方口径与十一个小时窗口

`514` 条的主线程顶楼来自 Anthropic 的 felixrieseberg（评论 `50304129`，子树 `156` 条），这也是本文首版「观察点」里悬着的官方口径——它在披露当天就到位了：「Felix from Anthropic here. We're working with Cursor on this incident, but it wasn't a compromise of Anthropic's systems or employee laptops. A malicious actor used access to Cursor's marketplace to publish a tampered copy of the Claude Code extension, which we didn't build or publish. The versions on our official channels are not affected and this only impacts Cursor users.」口径落定即事件定性：受害者名单里，Anthropic 与开发者并列，真正的断点是 marketplace 的发布权限。

![事件定性流程：投毒方借 Cursor 市场发布权限上传篡改包；Reuters 口径窗口 11 小时、5000+ 受影响；Anthropic 口径官方渠道未受影响；三帖评论合并进公告帖]({{ site.baseurl }}/assets/images/paradigm-radar-toolchain-marketplace-flow.svg)

规模与窗口由转述级信源给出：altbdoor（`50302594`）贴出 Cursor 官方安全公告（cursor.com/blog/claude-code-extension-security-notice）；AdrianCX（`50302777`，子树 `40` 条）引 Reuters：受影响用户 `5,000` 以上，恶意包在市场上架窗口为周四 `2:27 a.m.` 至 `1:35 p.m.`（PT）——十一个小时，比同期 LiteLLM 事件的 Docker 通道缺口（`4` 小时）长出近三倍，扩展市场通道的暴露时长第一次被量化。讽刺层由线程自带：glimshe（`50302653`）反问「拥有超级智能的 Claude 为什么没检测到后门」，eviks（`50302649`）接梗「手握前沿开发工具，安全交付速度本该快 100 倍」——两句都是嘲讽，但记录的恰是公众对 AI 工具安全性的预期错位。更深的一刀来自 anon-3988（`50302764`，子树 `32` 条）：「用 Claude Code 或 Codex 的人，本质上每天都在跑 RCE（Remote Code Execution，远程代码执行——由远端指令直接在你机器上执行）」——当日常操作已经是全权委托，「小心 curl | bash」式的老告诫失去了坐标系，攻击面评估要从「装了什么」转向「托付了什么」。

## 另两条线程：命名事故与二度进宫

OpenCode 线程（`185` 条）的主线是一起命名事故。redsymbol（评论 `50135950`）澄清了团队「没做好澄清工作」的事实：被入侵的是 OpenCode Console——一个存第三方 provider key、类似 OpenRouter 的服务，与开源编码代理是两回事，「只用 coding agent 的人不受影响」；rozenmd（`50135135`）当场 at 管理员改标题。官方声明由发帖人转帖（`50133412`）：泄露面是「正在退役的 legacy 系统」里的第三方 provider key，请用户去各家 dashboard 吊销。线程里最有用的是 Ciantic（`50133904`，子树 `32` 条）的制度提案：key 系统应标配「invalidate_api_key」端点，泄露时由平台一键全废，而不是像现在这样「邮件通知、各自逃命」；bewareofscams（`50133643`）翻出 `68` 天前的旧警告与仓库 issue `10416`，preommr（`50133745`）则记录了一个耐看的元现象——指出预警信号存在的评论被大量点踩，「有人就是很喜欢 opencode」。

LiteLLM 线程（`202` 条）里，官方定责帖与治理提案并存。detente18（本名 Krrish，LiteLLM 创始人，评论 `50189921`）回帖「已遏制」并附完整复盘链接，与站内[《把 Agent 的线拉进自己的箱子》]({{ site.baseurl }}/paradigm-radar-agent-gateway-layer/)记录的是同一起事故——那期从网关视角拆攻击链，本期把它放回供应链序列：rsanheim（`50187074`）指出这是一两年内第二次重大 exploit，他 `3` 月就写过审计脚本排查依赖里的 litellm（futuresearch 博客在案）；「一周连环账」由 rvz（`50182126`）汇总——Google Cloud 宕机、eMudhra CA 私钥泄露、TiDB `10.6` TB 泄露、PHP2Shell、LiteLLM 二轮，AI 工具链事件只是广义供应链焦虑月度指数的一格。提案层最实在的两条：stbenjam（`50182491`，子树 `26` 条）要求 uv/npm 默认加 `24`–`48` 小时安装冷却期，「装新东西应该需要你刻意绕路」；joshheitzman（`50190123`）自述做开源 harness，想直接 blocklitellm 这个包名却发现 pip 根本没有 exclude 机制（pypa issue `10797` 挂着）。

## 供给端：四家官方组织半年内造好扫描器

这两条线程还共同记录了一个认知现场：事故当天，绝大多数读者分不清「被黑的是哪个东西」。fleshers（`50133652`）问的是凭据泄露之后是否已被拿去做批量蒸馏，computerex（`50134222`）连发三问的核心是「我的 API key 为什么会出现在他们的后端」，rozenmd 与 redsymbol 花一整天给产品家族做命名拆分（Console、CLI、cloud 各是什么），latchkey（`50134739`）则从 UX 角度补了结构性批评：登录页直接让你把 provider key 粘进托管表单，页面里连 ToS 与隐私政策的链接都找不到——「这等于把私钥交给别人替你保管」。MisterMunchkin（`50134100`）说透了动机层的范式变化：token 已经值钱到攻击者愿意为几个 API key 花一整套入侵工程。供应链安全在 AI 工具链上多了一个传统软件没有的前提：负载本身是流通货币，所以「凭据托管」这种产品设计的每一次简化，都是给攻击面直接充值。

## 供给端：四家官方组织半年内造好扫描器

攻击面成形的同时，防御侧供给在同一时间窗出现。GitHub API 实测（`2026-10-31`，括注 `2026-11-16` 复测）：`NVIDIA/SkillSpector` `23,499` 星（复测 `26,174`，`11-14` 仍有提交）、创建于 `2026-03-21`，agent 技能安全扫描器，八个月即成赛道头部；`cisco-ai-defense/skill-scanner` `2,670` 星（复测 `2,730`）、创建于 `2026-01-29`；`microsoft/agent-governance-toolkit` `6,496` 星（复测 `6,567`）、创建于 `2026-03-02`，做策略强制、零信任身份与执行沙箱；`snyk/agent-scan` `3,191` 星。Cloudflare 官方组织也发布了面向 coding agent 的安全审计技能仓库（研究方实测 `53,577` 星，创建仅约 4 个月，该星数异常偏高，本文只作旁证、不入核心论证）。NVIDIA 的口径最具体：SkillSpector 的 README 自报——在其研究数据集的 `31,132` 个技能分析子集中，`26.1%` 含至少一个漏洞、`5.2%` 呈现可能的恶意意图（研究方自报口径，样本与判定标准由 NVIDIA 单方给出）；SkillSpector 同时是 NVIDIA Verified Skills 流水线的一环，「发布前扫描、评估并签名 agent 技能」，通过者进入 NVIDIA skills catalog（`NVIDIA/skills`，`3,796` 星，实测）。机构侧，OWASP GenAI Security Project 首页已设「Agentic App Security——保护自主 agent 与多步 AI 工作流」与「AI Bill of Materials——AI 供应链安全标准与工具」两个专项，并发布覆盖 2026 年三季度的 agent 漏洞汇编。

![供给与缺口对照：四家官方仓创建时间与复测星数排成时间轴；右侧列出尚未闭合的四个缺口（统一签名标准、pip exclude、安装冷却、权限疲劳）]({{ site.baseurl }}/assets/images/paradigm-radar-toolchain-defense-gap.svg)

## 反面证据：进行中的部分与虚胖的赛道

三条刹车继续踩住。第一，事件的「进行中」部分已经收窄：Anthropic 口径在披露当天到位（上节逐字），但恶意 actor 如何拿到 Cursor 市场的发布权限，截至 `2026-11-16` 复测仍无公开根因复盘——marketplace 侧的账没有结。第二，供应链恐慌并非 AI 独有：同一窗口内 eMudhra 证书机构被攻破（CA，Certificate Authority，签发数字证书的信任机构）、Binance 相关供应链事件同样拿下高分，rvz 的一周连环账（`50182126`）就是证据，归因需要克制。第三，防御赛道星数虚胖：GitHub 搜索 `mcp security scanner` 返回 `917` 个仓库（研究方 `2026-10-30` 实测），结果里混着大量星数与内容不匹配的个人仓（如一个 `35,284` 星的个人技能仓），可靠信号只集中在带官方组织名的仓库上；更关键的是，尚无统一的「技能签名/注册表」标准落地——社区相关讨论最高只有 `49` 分的构想帖。所以本期结论只能写到「攻击面形成、厂商各自造轮子」，还不能写「标准波来了」。

还有一只更结构性的刹车，来自最热的子楼：crossroadsguy（`50184801`，子树 `44` 条）指出 sandbox-exec 与防火墙规则挡不住这一类攻击，因为真正的漏洞在人的行为面上——权限弹窗疲劳让所有确认变成肌肉记忆，「package X 要装 367 个依赖？现在都这样」，`brew` 列表里 `59` 个包过期也无人细看。扫描器可以数出一张技能卡里的恶意模式（`5.2%`），数不出一个开发者一天点了多少次「允许」。工具链攻防的最后一公里是社会工程学，不是解析器。

## 与第 20 期的区隔：钱之外，还有攻击面

第 20 期[《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)回答的是「工具替你花了哪些看不见的钱」，把账单当安全事件取证；本期把同一批工具放上另一条轴——「工具给你带来哪些看不见的代码」。两期共用同一个前提：AI 编码工具不是透明代理，而是一个会替你行动、也替别人留门的软件供应链。区别在失效模式：第 20 期的失效是成本泄漏，账目可查、机制已被厂方自认；本期的失效是凭据与主机沦陷，Phorion 公告里的后门直接持久化到 SSH 层。同一个 LiteLLM 在两条轴上都是主角：作为网关它值钱（`62,393` 星），作为 PyPI 包它被投毒——价值即靶子，这条规律在扩展市场、技能市场、模型注册表上正在逐字重演。

## 观察点

`2026-11-16` 复查后的三个信号：Anthropic 的工程口径已到位，欠账换成 Cursor 的发布权限根因复盘（公告链接在案，复盘日期未定，落地即可给事件最终定性）；NVIDIA Verified Skills 式「扫描+签名+目录」是否从单厂流水线变成跨厂互认——复测八个月里四家官方仓全部保持提交活跃，但目录间互不背书，碎片化依旧；下一个被投毒的分发渠道是技能市场还是模型注册表——OpenCode 与 ClawHub 恶意技能帖（`334` 分）提示技能市场已在射程内。开发者侧当下可执行的动作只有一个：把 AI 工具的扩展、插件、依赖纳入与业务代码同级的供应链审查，锁定版本、核对来源——LiteLLM 线程给出的 pin 到 `1.106.2` 式自救（`50183423`）说明：标准落地前，版本钉死就是签名。

## References
- [Phorion 安全公告：Official Claude Code Extension Compromise][links-1]
- [HN 50133401：OpenCode Hacked: User credentials leaked][links-2]
- [HN 50181114：Compromised LiteLLM 1.107.0 on PyPI Installs a Credential Stealer and Backdoor][links-3]
- [HN 50302334：Backdoors in official Claude Code extensions][links-4]
- [HN 50300683：Backdoor in Claude Code for VS Code extension on the Cursor Marketplace][links-5]
- [HN 50301983：Claude Code VS Code extension with backdoor released on Cursor marketplace][links-6]
- [NVIDIA/SkillSpector GitHub 仓库][links-7]
- [cisco-ai-defense/skill-scanner GitHub 仓库][links-8]
- [microsoft/agent-governance-toolkit GitHub 仓库][links-9]
- [NVIDIA/skills GitHub 仓库][links-10]
- [OWASP GenAI Security Project][links-11]
- [BerriAI/litellm GitHub 仓库][links-12]
- [felixrieseberg（Anthropic）线程内口径][links-13]
- [AdrianCX 引 Reuters：5000+ 与 11 小时窗口][links-14]
- [redsymbol：OpenCode Console 与编码代理是两回事][links-15]
- [stbenjam：包管理器默认安装冷却提案][links-16]
- [crossroadsguy：权限弹窗疲劳论][links-17]
- [站内：AI 范式雷达《标价之外，Harness 替你买了什么》][links-18]
- [站内：AI 范式雷达《把 Agent 的线拉进自己的箱子》][links-19]


[links-13]: https://news.ycombinator.com/item?id=50304129
[links-14]: https://news.ycombinator.com/item?id=50302777
[links-15]: https://news.ycombinator.com/item?id=50135950
[links-16]: https://news.ycombinator.com/item?id=50182491
[links-17]: https://news.ycombinator.com/item?id=50184801
[links-18]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
[links-19]: {{ site.baseurl }}/paradigm-radar-agent-gateway-layer/

[links-1]: https://phorion.io/blog/offical-claude-code-vsx-compromise/
[links-2]: https://news.ycombinator.com/item?id=50133401
[links-3]: https://news.ycombinator.com/item?id=50181114
[links-4]: https://news.ycombinator.com/item?id=50302334
[links-5]: https://news.ycombinator.com/item?id=50300683
[links-6]: https://news.ycombinator.com/item?id=50301983
[links-7]: https://github.com/NVIDIA/SkillSpector
[links-8]: https://github.com/cisco-ai-defense/skill-scanner
[links-9]: https://github.com/microsoft/agent-governance-toolkit
[links-10]: https://github.com/NVIDIA/skills
[links-11]: https://genai.owasp.org/
[links-12]: https://github.com/BerriAI/litellm
