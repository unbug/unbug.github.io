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

范式表述：**AI 编码工具链从「可信开发环境」降级为「供应链攻击面」——攻击者从投毒你的依赖，转向投毒你用来生成代码的那个工具的分发包；供给端已经把这当作一门生意：NVIDIA、思科、微软、Cloudflare 四个官方组织在 2026 年 1-6 月密集发布 agent 技能扫描与治理仓库，OWASP GenAI Security Project 把 Agentic App Security 与 AI Bill of Materials 设为常设轨道。**事件坐标：`OpenCode` 凭据泄露（`976` 分）、`LiteLLM` PyPI `1.107.0` 投毒（`596` 分）、官方 `Claude Code for VS Code` 扩展在 `Cursor Marketplace` 被植入跨平台持久化 SSH 后门（三帖 `645`/`396`/`377` 分，`2026-10-31` 实测）。本文全部数字为当日经 HN Algolia API 与 GitHub API 复测值，转述与自报口径均已标注。

![封面：官方扩展市场与包注册表的分发管道中混入带后门的安装包]({{ site.baseurl }}/assets/images/paradigm-radar-toolchain-poisoning-cover.svg)

## 13 天 5 帖：官方分发渠道接连失守

时间线（分数均为 `2026-10-31` 实测）：`10-17`，AI 编码工具 OpenCode 被入侵、用户凭据泄露（HN `50133401`，`976` 分）；`10-21`，AI 网关 LiteLLM（BerriAI/litellm，`62,393` 星，实测）的 PyPI 包 `1.107.0` 被投毒，装上即带凭据窃取器与后门（HN `50181114`，`596` 分）；`10-30`，同一天三家独立披露同一事件——官方 Claude Code for VS Code 扩展在 Cursor Marketplace 的分发包被植入后门：GossiTheDog 帖 `645` 分（HN `50302334`，截至写作仍在上涨）、Phorion 公告帖 `377` 分（HN `50300683`）、DoublePulsar 帖 `396` 分（HN `50301983`）。Phorion 公告（作者 Calum Hall，`2026-10-30`）给出细节：后门跨 macOS/Linux/Windows 三平台、以 SSH 持久化；Cursor 已下架该版本并从 NPM 与 VSCode registry 拉取 `2.1.313`，公告要求排查使用该版本的环境。前史同样在堆积：`2026-05` 恶意 VSCode 扩展致 GitHub `3,800` 个仓库泄露（HN 帖 `1054` 分）、`2026-09` OpenAI agent 对 RubyGems 发起未公开攻击（`975` 分）——攻击面从包注册表蔓延到扩展市场，再到 AI 工具自己的官方分发渠道。

## 供给端：四家官方组织半年内造好扫描器

攻击面成形的同时，防御侧供给在同一时间窗出现。GitHub API 实测（`2026-10-31`）：`NVIDIA/SkillSpector` `23,499` 星、创建于 `2026-03-21`，agent 技能安全扫描器，七个月即成赛道头部；`cisco-ai-defense/skill-scanner` `2,670` 星、创建于 `2026-01-29`；`microsoft/agent-governance-toolkit` `6,496` 星、创建于 `2026-03-02`，做策略强制、零信任身份与执行沙箱；`snyk/agent-scan` `3,191` 星。Cloudflare 官方组织也发布了面向 coding agent 的安全审计技能仓库（研究方实测 `53,577` 星，创建仅约 4 个月，该星数异常偏高，本文只作旁证、不入核心论证）。NVIDIA 的口径最具体：SkillSpector 的 README 自报——在其研究数据集的 `31,132` 个技能分析子集中，`26.1%` 含至少一个漏洞、`5.2%` 呈现可能的恶意意图（研究方自报口径，样本与判定标准由 NVIDIA 单方给出）；SkillSpector 同时是 NVIDIA Verified Skills 流水线的一环，「发布前扫描、评估并签名 agent 技能」，通过者进入 NVIDIA skills catalog（`NVIDIA/skills`，`3,796` 星，实测）。机构侧，OWASP GenAI Security Project 首页已设「Agentic App Security——保护自主 agent 与多步 AI 工作流」与「AI Bill of Materials——AI 供应链安全标准与工具」两个专项，并发布覆盖 2026 年三季度的 agent 漏洞汇编。

## 反面证据：进行中事件与虚胖赛道

三条刹车必须踩住。第一，Claude Code 扩展后门是进行中的事件：披露于 `2026-10-30` 当天，哪个 registry 先被投毒、影响面多大均未完全证实；研究方 `2026-10-30` 检索时，Anthropic 官方暂无公开的工程口径回应——市场先出事、厂商口径滞后，本身就是证据的一部分。第二，供应链恐慌并非 AI 独有：同一窗口内 eMudhra 证书机构被攻破（CA，Certificate Authority，签发数字证书的信任机构）、Binance 相关供应链事件同样拿下高分，AI 工具链只是广义供应链恐慌的一支，归因需要克制。第三，防御赛道星数虚胖：GitHub 搜索 `mcp security scanner` 返回 `917` 个仓库（研究方 `2026-10-30` 实测），结果里混着大量星数与内容不匹配的个人仓（如一个 `35,284` 星的个人技能仓），可靠信号只集中在带官方组织名的仓库上；更关键的是，尚无统一的「技能签名/注册表」标准落地——社区相关讨论最高只有 `49` 分的构想帖。所以本期结论只能写到「攻击面形成、厂商各自造轮子」，还不能写「标准波来了」。

## 与第 20 期的区隔：钱之外，还有攻击面

第 20 期[《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)回答的是「工具替你花了哪些看不见的钱」，把账单当安全事件取证；本期把同一批工具放上另一条轴——「工具给你带来哪些看不见的代码」。两期共用同一个前提：AI 编码工具不是透明代理，而是一个会替你行动、也替别人留门的软件供应链。区别在失效模式：第 20 期的失效是成本泄漏，账目可查、机制已被厂方自认；本期的失效是凭据与主机沦陷，Phorion 公告里的后门直接持久化到 SSH 层。同一个 LiteLLM 在两条轴上都是主角：作为网关它值钱（`62,393` 星），作为 PyPI 包它被投毒——价值即靶子，这条规律在扩展市场、技能市场、模型注册表上正在逐字重演。

## 观察点

三个可复查的信号：Anthropic 是否给出扩展后门事件的官方工程复盘（研究方 `2026-10-30` 检索时仍缺位，口径出现即事件定性）；NVIDIA Verified Skills 式「扫描+签名+目录」是否从单厂流水线变成跨厂互认（无统一签名标准前，各目录互不背书即是碎片化的证据）；下一个被投毒的分发渠道是技能市场还是模型注册表——OpenCode 与 ClawHub 恶意技能帖（`334` 分）提示技能市场已在射程内。开发者侧当下可执行的动作只有一个：把 AI 工具的扩展、插件、依赖纳入与业务代码同级的供应链审查，锁定版本、核对来源。

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
