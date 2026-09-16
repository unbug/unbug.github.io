---
layout: post
title: "AI 范式雷达：《一份技能文件写一次，所有客户端都能跑》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-skill-md-standard.svg
tags: [agent-skills, standards, developer-tools, mcp]
description: "SKILL.md 正从 Anthropic 私有扩展变成跨厂商事实标准，官方客户端列表已有 46 款并覆盖 OpenAI、Google、微软三大阵营。Agent 能力分发层的接口正在定型，但注册表、质量评估与供应链安全至今仍是空白。"
---

给 Claude Code 写一份配置、给 Copilot 再写一份、给 Gemini CLI 又写一份——各写各的日子正在结束。Agent Skills（以 `SKILL.md` 为核心的能力打包格式）由 Anthropic 发起，规范仓库 agentskills/agentskills 已有 `25,385` 星，官方客户端列表收录 `46` 款工具，OpenAI、Google、微软阵营全部在列（均截至 2026-09-16 实测）。范式转移是从「每个工具写一份厂商专属配置」到「写一个 SKILL.md，全端通吃」：能力分发层的接口正在定型，而注册表、质量评估、供应链安全还全是空白。

## 一家发起，三家跟进

规范仓库独立于 Anthropic 组织之外，创建于 2025 年 12 月；母仓库 anthropics/skills 已有 `176,551` 星，9 月仍在合入新技能。信号在对手阵营：OpenAI 的 codex 仓库内有专门的 skills 文档页，Gemini CLI、GitHub Copilot、VS Code 均在官方客户端列表。两条 HN 热帖印证真实痛点——《Ask HN: How do you manage skills files?》`320` 分（2026-09-16 实测），讨论团队如何分发技能文件；单个 `I-have-ADHD` 技能（防止 Agent 把答案埋在长输出里）拿下 `540` 分，一个 markdown 文件就能成为跨客户端的传播单元。GitHub topic agent-skills 下约 `23,486` 个仓库（含低质仓库，只作规模下限），第三方集合仓库自述收录 `5,400+` 技能。

## 像 MCP 的扩散路径，但烈度更低

MCP 同样是 Anthropic 发起、OpenAI 与 Google 跟进的接口标准，走了近两年才铺开且竞争噪声极大。SKILL.md 的差异在于它是纯文件格式而非协议——没有服务器、握手和运行时依赖，客户端只需认目录结构和 frontmatter，采纳成本低一个量级，所以三家跟进快、对抗少。对照面是 MCP 自己：《Ask HN: Who is using MCP in production?》仅 `198` 分，高赞评论直言许多 MCP server 已被「Agent 直接调 CLI」取代。工具接入层退潮，能力打包层上行。这条线与本刊第 10 期[《网站开始给 Agent 单独上一道菜》]({{ site.baseurl }}/paradigm-radar-markdown-negotiation/)是供给层姊妹篇但属不同接口：内容协商解决 Agent 读什么，SKILL.md 解决 Agent 会什么。

## 反方把软肋摆上了台面

最硬的质疑是「skills 会被模型能力吃掉」：上下文窗口和指令遵循能力持续提升后，写作风格、代码规范这类通用技能可能不再需要外置文件——320 分热帖下正是这场争论，MCP 生产采用帖高赞评论提供了实证抓手：协议层标准化在能力增长面前持续贬值。第二击指向标准本身：agentskills.io 由 Anthropic 主导创建，`46` 款客户端是自愿填报的 showcase 而非一致性测试认证，frontmatter 字段语义、脚本权限、发现优先级均无互操作测试套件，robots.txt 各家「支持」程度天差地别的历史就在眼前（此为分析观点）。第三击是信任层：技能可捆绑可执行脚本，`5,400+` 第三方技能自由分发，而规范仓库窗口期内未发现安全审查、签名或 registry 相关提交——这是「未发现证据」型论断，不等于不存在。悲观读法：这不是 tar 包时刻，而是早期 npm 没有 audit 的时刻。

## 边界与接下来盯什么

支持不等于等价：同一份 SKILL.md 在 Claude Code 生效不代表 Codex、Gemini CLI 行为一致，验证只到官方列表收录层，未做逐端行为验证。采纳也不可靠：Codex 的 skills 文档页只是一行外链薄壳，OpenAI 转向时一个 release 就能撤掉。据我们观察，中文社区还没有「46 客户端 + 标准之争」同深度解读（搜索通道故障，未经实测排除撞题）。未来盯三个可证伪信号：规范仓库是否出现 registry/signing 相关 PR 或首个技能投毒公开案例；OpenAI、Google 是否发布不兼容的自有格式或从客户端列表消失；MCP 官方是向 SKILL.md 靠拢还是明确切割。

**你现在可以做的**：挑一个最熟的工作流写一份 SKILL.md，在至少两个厂商客户端跑同一任务对比行为差异；把团队规范从私有配置迁到统一技能目录试一个月；分发前先想清楚——没有签名和审查，你的技能供应链靠谁把关。

## References
- [agentskills 规范仓库][links-1]
- [官方客户端列表][links-2]
- [OpenAI Codex Skills 文档][links-3]
- [Ask HN: How do you manage skills files?][links-4]
- [I-have-ADHD skill（HN）][links-5]


[links-1]: https://github.com/agentskills/agentskills
[links-2]: https://agentskills.io/clients.md
[links-3]: https://raw.githubusercontent.com/openai/codex/main/docs/skills.md
[links-4]: https://news.ycombinator.com/item?id=49589914
[links-5]: https://news.ycombinator.com/item?id=49610631
