---
layout: post
title: "AI 范式雷达：《一份技能文件写一次，所有客户端都能跑》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-skill-md-standard.svg
tags: [agent-skills, standards, developer-tools, mcp]
description: "SKILL.md 正从 Anthropic 私有扩展变成跨厂商事实标准，官方客户端列表已有 46 款并覆盖 OpenAI、Google、微软三大阵营。Agent 能力分发层的接口正在定型，但注册表、质量评估与供应链安全至今仍是空白。"
---

给 Claude Code 写一份配置、给 Copilot 再写一份、给 Gemini CLI 又写一份——各写各的日子正在结束。

Agent Skills（以 `SKILL.md` 为核心的能力打包格式）由 Anthropic 发起，规范仓库 agentskills/agentskills 已有 `25,385` 星，官方客户端列表收录 `46` 款工具，OpenAI、Google、微软阵营全部在列（均截至 2026-09-16 实测）。范式转移是从「每个工具写一份厂商专属配置」到「写一个 SKILL.md，全端通吃」：能力分发层的接口正在定型，而注册表、质量评估、供应链安全还全是空白。

口径先钉死：首采为 `2026-09-16` 实测（GitHub API / Algolia API）；`2026-11-16` 复测，规范仓库 `27,324` 星（fork `2,036`，`11-04` 仍有提交），母仓库 anthropics/skills `195,434` 星（fork `22,969`，`11-14` 活跃）；两帖复核为 Ask HN `320` 分 / 全树 `299` 条、I-have-ADHD `542` 分 / 全树 `364` 条；「客户端 `46` 款」无法逐行复核——clients.md 页面在复测时已改前端渲染，数字停留在首采口径，此局限记在边界一节；社区测试与传闻一律标注来源。

![一份 SKILL.md 在多家客户端间分发：规范仓库、客户端列表与传播链全景]({{ site.baseurl }}/assets/images/paradigm-radar-skill-md-standard.svg)

## 一家发起，三家跟进

规范仓库独立于 Anthropic 组织之外，创建于 2025 年 12 月；母仓库 anthropics/skills 已有 `176,551` 星（复测 `195,434`），9 月仍在合入新技能。信号在对手阵营：OpenAI 的 codex 仓库内有专门的 skills 文档页，Gemini CLI、GitHub Copilot、VS Code 均在官方客户端列表。两条 HN 热帖印证真实痛点——《Ask HN: How do you manage skills files?》`320` 分（首采与复测同分，全树 `299` 条），讨论团队如何分发技能文件；单个 `I-have-ADHD` 技能（防止 Agent 把答案埋在长输出里）拿下 `542` 分（首采 `540`），其仓库 ayghri/i-have-adhd 从创建（`2026-05-13`）到 `2026-11-16` 实测累计 `61,304` 星 / `3,598` fork——一个 markdown 文件就能成为跨客户端的传播单元，这个数字比多数 npm 包的十年都跑得快。GitHub topic agent-skills 下约 `23,486` 个仓库（含低质仓库，只作规模下限），第三方集合仓库自述收录 `5,400+` 技能。

## 标准定型前传：一月份就有两个「别人的标准」

复测检索 HN 存档，发现「SKILL.md 之战」其实打过：`2026-01-20` 有《Dockerhub for Skill.md》（skillregistry.io，HN `46692692`，`49` 分）、`01-22` 有 Mintlify 发文推自家的《Skill.md: An open standard for agent skills》（HN `46723183`，`48` 分）——在 agentskills 拿到主场声量之前，格式标准至少有两家先动手抢注。转折在 `02-03`：agentskills.io 主页帖《Agent Skills》以 `544` 分 / `260` 条登顶（HN `46871173`），三周后《SkillsBench》基准论文帖又有 `364` 分 / `171` 条（arXiv `2602.12670`，HN `47040430`），`05-04` Addy Osmani 的《Agent Skills》长文 `376` 分 / `212` 条（HN `48015397`）。到 `07-30`，连「强制 Claude 用 ASD-STE100 简化英语写文档」这种单一用途技能（HN `49114639`，`363` 分）都能上热榜。把时间轴排齐能看清采纳周期的形状：一月是格式之争（谁定义），二月起是平台跟进与基准化（能不能用），五个月后进入内容爆炸（写什么）——`09` 月那两条热帖（团队怎么管理技能文件、一个防废话技能走红）恰好都是「用法」而非「格式」问题：讨论重心越过标准本身，正是标准开始赢的标志。Mintlify 一系 skill.md 的抢注最终没有翻盘，胜出者的优势不在格式更优，而在发起方恰好拥有最大 agent 装机量（Claude Code），这条与 Google PWA、Meta Open GraphQL 的剧本一字不差。

![SKILL.md 采纳时间线：一月格式之争、二月平台登顶与基准化、年中内容爆炸、九月重心转向用法]({{ site.baseurl }}/assets/images/paradigm-radar-skill-adoption-timeline.svg)

## 像 MCP 的扩散路径，但烈度更低

MCP 同样是 Anthropic 发起、OpenAI 与 Google 跟进的接口标准，走了近两年才铺开且竞争噪声极大。SKILL.md 的差异在于它是纯文件格式而非协议——没有服务器、握手和运行时依赖，客户端只需认目录结构和 frontmatter，采纳成本低一个量级，所以三家跟进快、对抗少。对照面是 MCP 自己：《Ask HN: Who is using MCP in production?》仅 `198` 分，高赞评论直言许多 MCP server 已被「Agent 直接调 CLI」取代。工具接入层退潮，能力打包层上行。效果度量也没缺席：SkillsBench 论文帖（arXiv `2602.12670`，HN `47040430`，`364` 分 / `171` 条）专门基准「技能到底让 agent 变好了多少」——格式登顶两周后即有效果基准，说明「装了有没有用」立刻成了采购问题。这条线与本刊[《网站开始给 Agent 单独上一道菜》]({{ site.baseurl }}/paradigm-radar-markdown-negotiation/)是供给层姊妹篇但属不同接口：内容协商解决 Agent 读什么，SKILL.md 解决 Agent 会什么。

## 反方细读：蛇油论与它的反证

`320` 分 Ask HN 线程（全树 `299` 条）的第一高赞是蛇油论：avaer（评论 `49595780`，子树 `69` 条）直言「skills 基本是蛇油，大家用它的方式是从名人那里下载功夫——去年也许还有用，好模型 + 好仓库指引之后边际价值在消退」；WatchDog（`49593675`，子树 `31` 条）作势佐证：「我不用任何 skills，通用任务模型自己会搞定」。但线程自己长出了三条反证。其一，量化反证：itishappy（`49598686`，子树 `11` 条）转述公司测试——「在旗舰模型上，用 skill 能把 token 输出减少大约 2 到 4 倍，而且这个倍数随新模型还在增大」；蛇油不会让经济学曲线变得更好看，技能把重复指令从每轮对话挪进按需加载的文件，省的是实打实的上下文预算（口径：公司内测转述，未公开方法）。其二，定义反证：colechristensen（`49599350`，子树 `10` 条）「skills 就是提示词怎么了，这就是它的定义——你希望反复注入的那段提示词的存储格式」；serf（`49590065`，子树 `8` 条）补刀「模型能力永远填不了它没见过的空白——你们公司的数据库地址、分支命名、哪些云资源许碰」。其三，行为反证：线程里最一致的画面是 alexhans（`49594234`）与 picklenerd（`49599924`）不约而同的工作流——「我不下载 skills，我把自己反复做的事写成 skill，放进 git，symlink 到每个 harness 的技能目录」；pletnes（`49594045`）给出企业版：「我的 skill 是『这个公司这个项目怎么干活』」。stanmancan（`49594260`，子树 `8` 条）问出边界问题：「这不就是 AGENTS.md 干的活吗？」——答案是范围：AGENTS.md 是单仓库的常驻约定，SKILL.md 是可命名、可分发、按需加载的能力包；线程没有达成共识，但问题本身就是新分层在显形的证据。

## 三层契约：AGENTS.md、CLAUDE.md 与 SKILL.md 的分工显形

线程吵到最后，浮出水面的是一个没被命名但人人都在用的分层（此为本文分析观点，锚点全部来自评论原文）。最内层是单仓库常驻约定：AGENTS.md 或各家 harness 的等价物，管「在这个代码库里怎么干活」，每轮对话都在上下文里；中间层是 harness 级人格修正：hysan（`49614935`）烧掉无数会话后的自述代表一群人的姿势——写作风格矫正应该像中间件一样装进外壳，而不是每次对话碰运气；最外层才是可命名、可分发、按需加载的 SKILL.md，管「我会一件什么本事、什么时候拿出来」。三层的关系在讨论里不断被混同——stanmancan 用 AGENTS.md 质疑技能的存在必要，jp57 把「CLAUDE.md 指令与技能」并列为同一门个体户产业——混同本身就是新分层显形期的典型症状：npm 早期，package.json、shrinkwrap、lock 的分工也吵了近两年。分层的判据最终也会来自经济学：itishappy 的「省 2-4 倍 token」只可能对按需加载的外层成立——常驻内容越滚越大时，把可复用能力从常驻层剥离到按需层就是必然的架构动作，这比任何标准宣言都更能决定 SKILL.md 的命运。

## ADHD 帖的文化侧读法

`542` 分 / `364` 条的 I-have-ADHD 帖是「能力文件作为模因」的标本。它的走红不是因为技术上难——jp57（`49613789`，子树 `101` 条）把背景说透：「Claude（尤其）是个糟糕的写作者，围绕把它掰回可读输出已经形成一门个体户产业，每个 CLAUDE.md 和 skill 都在推」；ryandrake（`49613881`，子树 `82` 条）点名最顽固的「Claudism」：「它总要在做完的事之外汇报一遍没做什么」。真正的信息在副楼：hysan（`49614935`，子树 `23` 条）自述烧掉无数会话后的结论——写作矫正应该放进 harness 层而不是每次对话碰运气，这正是「能力打包层」存在的理由；egeozcan（`49611904`，子树 `35` 条）则从真人 ADHD 患者视角提醒这类命名的挪用感。一个防废话的 markdown 文件拿到六万星，说明分发格式的红利已经从「功能」外溢到「身份表达」——给 agent 装什么技能开始像给人选表情包。复测给这轮病毒传播补上速度参照：仓库 `05-13` 创建、`11-16` 累计 `61,304` 星，月均约 `1.1 万` 星；对照规范仓库自身——创建近一年攒 `27,324` 星——**一个 meme 技能六个月的吸星量 ≈ 整个标准组织一年**。技能生态的传播单位已经不是规范，而是可转发的身份物件；这也解释了注册表类产品的尴尬：人们不按「包管理器」的心智分发技能，按「推荐链接」的心智分发——GitHub star 与 HN 首页才是实际的注册表，这一条对本节下面讲的标准侧 registry 设计是个硬约束。还有个漂亮的闭环值得存档：hysan 烧会话手工矫正写作毛病的手途，与 i-have-adhd 用一份 markdown 打包解决同一毛病的新法，隔了不到一个月——「个人土办法 → 打包制品 → 病毒分发」这条流水线，正是技能品类自我造血的模板，也解释了为什么技能爆款几乎全是工作流痛点的直接结晶。

## 供应链空白：从「未发现证据」到「在野测试」

首版说「未发现 registry/signing 相关提交」，复测要补上另一半拼图：野生尝试早就有，只是全都没起量。`2026-01-30` 就有人把话说死——「skill.md 就是一枚没有签名的二进制」（HN `46826010`，`2` 分）；`02-18` Vett 上线「安装前扫描、签名、验证 agent 技能」（HN `47063497`，`3` 分），次日其博客发布实测《我测了 Claude Code 与 Codex 的供应链攻击，双双失败》（HN `47074353`，`2` 分）；`02-23` 有 SkillScan「检测恶意技能文件的免费 API」（HN `47121910`，`3` 分）；`07-22` 有 drskill「技能与 MCP 配置的 brew doctor」（HN `49008729`，`2` 分）。注册表侧同样有 skillregistry.io（`49` 分）与 openskills.space（HN `46702089`，`5` 分）抢跑。读法有两层：悲观层，恶意技能实测「双双失败」意味着到今年二月为止，主流客户端对捆绑脚本的技能毫无审查，首版「早期 npm 没有 audit」的判断被在野测试坐实；乐观层，扫描、签名、体检工具已经长出来，缺的是把它们变成默认——与 npm audit 从第三方到内置的剧本对照，观察窗就是接下来两个周期。

![技能供应链流水线：作者→分发→安装→运行四段，标注野生尝试（registry/扫描/签名）与标准层空白的位置]({{ site.baseurl }}/assets/images/paradigm-radar-skill-supplychain.svg)

## 边界与接下来盯什么

支持不等于等价：同一份 SKILL.md 在 Claude Code 生效不代表 Codex、Gemini CLI 行为一致，验证只到官方列表收录层，未做逐端行为验证。复测新增一条口径边界：clients.md 已改前端渲染，第三方连「`46` 款」都无法逐行复核——标准站自己的可审计性在下降，这本身算一个弱信号。采纳也不可靠：Codex 的 skills 文档页只是一行外链薄壳，OpenAI 转向时一个 release 就能撤掉。据我们观察，中文社区还没有「46 客户端 + 标准之争」同深度解读（首采搜索通道故障未排除撞题，复测检索仍未见同题长文）。未来盯四个可证伪信号：规范仓库是否出现 registry/signing 相关 PR（`11-16` 仓库 `11-04` 后无新提交窗口可查，仍未见）或首个技能投毒公开案例；Vett/SkillScan 一系是否被任一主流客户端收编为默认能力；OpenAI、Google 是否发布不兼容的自有格式或从客户端列表消失（一月 Mintlify 抢注失败不代表竞争终止）；SkillsBench 一系效果基准能否成为客户端一致性测试的蓝本。

**你现在可以做的**：挑一个最熟的工作流写一份 SKILL.md，在至少两个厂商客户端跑同一任务对比行为差异；把团队规范从私有配置迁到统一技能目录试一个月；分发前先想清楚——没有签名和审查，你的技能供应链靠谁把关；顺手跑一次 itishappy 式对照：同一任务带 skill / 不带 skill 各三次，记下 token 与轮次差。

## References
- [agentskills 规范仓库][links-1]
- [官方客户端列表][links-2]
- [OpenAI Codex Skills 文档][links-3]
- [Ask HN: How do you manage skills files?][links-4]
- [I-have-ADHD skill（HN）][links-5]
- [Agent Skills 主帖（agentskills.io）][links-6]
- [SkillsBench 论文与 HN 帖][links-7]
- [Vett 供应链攻击实测][links-8]
- [ayghri/i-have-adhd 仓库][links-9]
- [Mintlify 版 skill.md 抢注帖][links-10]
- [站内：AI 范式雷达《网站开始给 Agent 单独上一道菜》][links-11]
- [站内：AI 范式雷达《外壳走上台前》][links-12]


[links-1]: https://github.com/agentskills/agentskills
[links-2]: https://agentskills.io/clients.md
[links-3]: https://raw.githubusercontent.com/openai/codex/main/docs/skills.md
[links-4]: https://news.ycombinator.com/item?id=49589914
[links-5]: https://news.ycombinator.com/item?id=49610631
[links-6]: https://news.ycombinator.com/item?id=46871173
[links-7]: https://news.ycombinator.com/item?id=47040430
[links-8]: https://news.ycombinator.com/item?id=47074353
[links-9]: https://github.com/ayghri/i-have-adhd
[links-10]: https://news.ycombinator.com/item?id=46723183
[links-11]: {{ site.baseurl }}/paradigm-radar-markdown-negotiation/
[links-12]: {{ site.baseurl }}/paradigm-radar-harness-first-class/
