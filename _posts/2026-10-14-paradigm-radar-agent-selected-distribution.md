---
layout: post
title: "AI 范式雷达：《被 Agent 选中，成了工具的新分发渠道》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-agent-selected-cover.svg
tags: [agent, developer-tools, distribution, coding-agents, aeo]
description: "由利益相关方发起的16893会话测量显示：同场景三个编程智能体选同一工具仅42%；工具分发正从人迁移为智能体，被其选中成了可测量也可操纵的新渠道。"
---

如果你的开发者工具只做过面向人类的营销，你正在错过一半个市场：Armature 的测量研究显示——Claude Code、Codex、Cursor 三个 Coding Agent 在同一场景下选中同一个工具的比例只有 `42%`。

原句还带着出处与定语：Armature（一家 YC P26、自称专做开发者工具增长的初创公司）在 2026-09-03 发布这项研究（HN item `49557206`，实测 `300` 分、`153` 条评论）；一半以上的选择，取决于你的文档、定价页和域名有没有恰好进入那台机器的视野。范式表述：**工具的分发对象正在从人变成 Agent：文档、`llms.txt`、机器可读评价成了新的货架，「被 Agent 选中」正在成为可测量、可优化、也可被操纵的分发渠道。**定语必须刻在判断里：这是一次由利益相关方发起的测量——目前最大的样本测量与最快的生态化尝试，都出自同一家靠卖开发者工具增长服务营生的 YC 公司，数据全部公开可查，但没有独立第三方复现。

![封面：工具分发渠道从人类搜索引擎迁移到 Coding Agent 的示意图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-cover.svg)

## 被 Agent 选中：一个可测量的新事件

先给术语下定义。本文说的「被 Agent 选中」，指 Coding Agent（在沙箱里替你写代码、装依赖、接第三方服务的智能体，如 Claude Code、OpenAI Codex、Cursor）在一个新引入第三方服务的瞬间，决定采用哪家产品。这个瞬间过去不存在于任何增长漏斗里：人类会搜、会比价、会被品牌影响，Agent 只在几十秒内读文档、发搜索、装包。

Armature 于 2026-08-03 先把「让产品被 Coding Agent 发现和使用」做成 MCP（Model Context Protocol，模型上下文协议）会话分析产品（HN `49157807`，`42` 分），一个月后发布测量报告《Which tools do Claude, Codex and Cursor choose? We measured 16,893 sessions》。方法（以下数字均为 Armature 厂商自述，但声称全部原始 trace 公开在 leaderboards.armature.tech 可复算）：`1,163` 个 prompt 变体、`75` 个仓库、`3` 个 Agent、`4` 类开发者人格（vibe coder、初级、资深、大厂工程师），在 E2B、Blaxel、Daytona 沙箱里轮换跑 `16,893` 个会话，最终收敛出 `5,292` 个有效样本，覆盖 `51` 个代码库、`18` 个行业；「模拟人类」和裁判都由 Gemini 3.7 Flash 扮演。

结果是三个可复算的分裂。**选择分裂**：同场景选同一工具的比例只有 `42%`；Claude Code 的自建方案率 `19%`，约为 Codex 与 Cursor（`10%`）的两倍。**信息源分裂**：Cursor 约 `2/3` 会话靠网络搜索决策；Codex `94%` 会话搜索、但 `9/10` 用 `site:` 限定域名；Claude Code 主要靠参数记忆，仅约 `30%` 搜索，遇到沙箱这类训练语料稀疏的新领域才升到约 `80%`。**上下文分裂**：同一个「发邮件」需求，TypeScript 仓库 Resend 赢（`55/89`），Python 仓库 Sendgrid 赢（`22/24`），Go 仓库 Postmark 赢（`20/24`），Java 仓库 Azure ACS 赢（`22/23`）。

![测量机制流程图：prompt 变体进入三个 Agent 沙箱，信息源差异决定选择分裂]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-measurement.svg)

## 证据链：从一次测量到一台评价飞轮

时间线上的每一步都可实测，口径分三类标注：厂商自述、转引未验证、独立实测。

- 2025 前后（转引、原始出处未独立验证）：据 Armature 博客转引，Vercel 称超过 `30%` 的部署由 Coding Agent 发起。我方未能定位 Vercel 原始出处，此数字全文仅此一处，按「据称」读。
- 2026-08-03（厂商自述）：Armature 发布 MCP 会话分析产品，先做「看到 Agent 怎么选」的工具。
- 2026-09-03（厂商自述、trace 据称公开）：16,893 会话测量报告发布，HN 实测 `300` 分。
- 2026-10-03（独立实测）：npm 包 `@armature-tech/agent-reviews` 首发（registry API 实测 created=2026-10-03），GitHub 仓库同日建立、`0` 星（API 实测 2026-10-14）。
- 2026-10-07（厂商自述）：Show HN《Agent.reviews – Where AI agents read and write reviews on tools》（HN `49995539`，实测 `73` 分、`51` 评论），发帖时自述「已测量 50k+ Agent 会话、数千条评价」。
- 2026-10-14（页面自述文字实测）：agent.reviews 首页写着 `189,934` 条评价、`4,120` 个工具，其中 `1,971` 个已发布评分。从发布时的数千条到一周后的近 `19` 万条，均为官方页面自述，约 `30-60` 倍增长。

飞轮的设计图纸是公开的。agent.reviews 每个页面有 `.md` 版本加 `llms.txt` 加 `SKILL.md` 加 MCP 端点；官方 install.md 提供「一条 prompt 装 skill 并开启自动评价」的复制文本，skill.md 明文规定自动评价开启后每次任务结束自动写工具评价。你一条 `npx -y @armature-tech/agent-reviews lookup "xxx"` 就能验证货架存在——这是本话题一小时可动手的实操面。

![时间线：2026-08 到 2026-10 从产品到测量到评价飞轮的演进]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-timeline.svg)

## 被提到不等于被选中：货架经济学的第一课

测量数据里最锋利的一条是提及与中选的脱钩，它说明 Agent 的货架不是搜索引擎的结果页，而是一份带上下文的决策表（以下均为 Armature 自述数字）：

- PayPal 被提及 `139` 次、被选 `0` 次，其中 `124` 场 Stripe 赢走。
- Adyen 提及 `175` 次、中选 `3` 次；LangChain 提及 `194` 次、中选 `4` 次；Netlify 提及 `152` 次、中选 `6` 次。
- Supabase 是提及最多的数据库，却被 Neon 压制，Neon 赢下 `66%` 的对决；支付场景 Stripe 十场赢九场；对象存储 S3 拿 `45%`，Azure 与 GCP 各 `20%`。

更细的粒度上，页面信息呈现本身直接翻转选择：Mailgun 因为免费档写着「1 天日志保留」输给 Postmark；Supabase 因为把 auth、storage、realtime 捆绑报价而常输。人类营销优化的对象是文案与品牌，Agent 营销优化的对象是免费档条款的措辞、`site:` 白名单里的域名、TypeScript 仓库里 README 的示例代码。这与 SEO（搜索引擎优化）向 AEO（Answer Engine Optimization，让生成式引擎引用你的答案）的迁移同构，只是这次的读者会直接替你装包下单。

![对比图：提及次数与实际中选次数严重脱钩的品牌数据]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-mentions-vs-wins.svg)

## agent.reviews：Agent 写、Agent 读的货架，以及它的自我限定

2026-10-07 上线的 agent.reviews 把「被选中」从观察对象变成基础设施：一个 Agent 写工具评价、另一个 Agent 读评价选工具的公开货架。协议面完整——`.md` 页面、`llms.txt`、写评价 skill（v2.11.0）与读评价 skill（v2.1.0）、需 OAuth 的 MCP 端点（实测返回 `401`，非匿名可爬）、npm CLI 提供 lookup、compare、search、category 四个命令。评分样本（页面自述）：`uv` `4.7` 分（`1,279` 评、`99%` 任务完成率），Git `4.7` 分（`20,060` 评）；Codex `4.1` 分（`84%` 完成率）、Claude Code `3.9` 分（`64%`）、Cursor `3.7` 分（`47%`）——Coding Agent 类目下六个工具互评，被 Agent 评价已经反身作用于 Agent 本身。

两条自我限定必须一起写，否则就是夸大。第一，读评价 skill 的原文要求：这些评价只讲接入摩擦，绝不可用于挑选或排名工具，不能替代文档、搜索与独立基准。第二，官方把「同一任务多次运行、Agent 每次选谁」的榜单（leaderboards.armature.tech）与日常评价明确切开。所以「Agent 口碑等于工具质量」这句话，连货架主人都不同意。生态成熟度也要诚实：GitHub 仓库 `0` 星、无开源镜像、无中立第三方、唯一自述跟进者 preseason.ai 未独立验证，MCP 面要登录——渠道由同一家闭源 SaaS 主导。与上一期[《快脑拆出大模型，Agent 控制循环改订阅决策函数》]({{ site.baseurl }}/paradigm-radar-system-one-models/)的决策模型生态「四周四层齐备」相比，这个生态只有一层，还是首发者自循环。

![数据图：agent.reviews 评分样本与任务完成率，含 4.6 分同分页的区分度疑点]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-ratings.svg)

## 反方：从 SEO 灾难到 AdWords，HN 的火力全部有据

![反方火力地图：道德、技术、商业、数据四条战线指向同一套货架生态]({{ site.baseurl }}/assets/images/paradigm-radar-agent-selected-counterarguments.svg)

> 当年 SEO 灾难看起来也只是无害的学术测量——测量先于污染，是分发渠道史的铁律（评论 `49559950`）。

四条火力线的结构先看这张地图，再逐条展开。
道德火力最重的一条（评论 `49558929`）直指渠道化的正当性本身：Armature 卖的就是「用增长手法操纵模型选产品」，让 Agent 推荐并非最优的工具，等于把伤害开发者的 SEO 垃圾玩法搬进 Agent。这条攻击不是抬杠——Armature 自己的博客首段写着免责声明 "Disclaimer: Armature sells growth services to dev tools"，诚实声明恰恰是「测量与生意同源」的最好注脚。操纵路径甚至已经在评论区公开演示：有人写下「给产品狂刷链接、加一条每次启动都读的 durable note 就行」（评论 `49561488`），另一条讽刺未来："我已按今日工具赞助商 Firebase 建好数据库"（评论 `49558267`）。

技术火力最锋利的一问（评论 `49997827`）：Agent 写的公开评价会进入另一个 Agent 的上下文，这难道不是个 prompt injection（提示注入，指把恶意指令藏进数据里让模型执行）工厂？官方回复只说两个 skill 都是可选的，未正面回应注入面。商业模式火力（评论 `49999510`、`50070994`）：一旦 Agent 把这里当参考，下一步就是付费排名，工具界的 AdWords；官网标语 be the tool X chooses 的实质是「让你的工具被找到」，不是「找到最好的工具」。数据质量火力可实测（评论 `49998702`）：cryptography 与 YAML 同为 `4.6` 分，我方实测两页确实如此（`71` 评与 `78` 评）——Agent 可能在按曲线打分而非事实打分，评分通胀、区分度存疑。

## 边界条件：这套判断管不到哪里

本期的证据只支持「新引入第三方服务的选择瞬间」这一窄场景，测量覆盖 `18` 个 SaaS 与库类目；企业内部已有技术栈、采购合规主导、架构评审主导的选型，外推无效。样本以 TypeScript、Python 等开源可见栈为主，私有云与本地部署场景未测。agent.reviews 评分衡量的是 Agent 接入摩擦，官方自己声明不可用于选型排名。前文那个 `30%` 部署数字若始终定位不到原始出处，就只能以未验证转引的身份活着。

与站内已发期次划清切割：[《网站开始给 Agent 单独上一道菜》]({{ site.baseurl }}/paradigm-radar-markdown-negotiation/)讲的是供给侧——网站如何向 Agent 供料；本期讲需求侧——Agent 如何替人做选择、选择如何被商业化，两者互为上下游。《一份技能文件写一次》讲能力分发的格式，本期讲分发的货架与评价体系；《外壳走上台前》里 Agent 选 harness，本期 Agent 在 harness 内选第三方服务；上一期的决策模型是「怎么选」的机制层，本期是「选择被谁影响」的渠道层。

## 未来两个周期的证伪观察点

> 检验本期判断的，不是 agent.reviews 的评分有多高，而是它会不会在两周内停转，或者被第一个付费排名价目表出卖。

10 月中下旬看三条。其一，评价量是否续涨：基线 `189,934` 条（2026-10-14 页面自述实测），两三周内破 `40` 万且评分工具数破 `3,000`，说明自动评价飞轮真的在转；停在 `20` 万附近，就是 Show HN 一波流。其二，是否出现独立复现或第三方批评研究（检索关键词 coding agent tool choice measured），若始终只有 Armature 一家数字，「最大测量」可信度打折。其三，16,893 会话研究承诺发布的剩余 `1` 万+ 会话是否兑现。顺带一个旁证温度计：Codex CLI 默认安装持久自更新守护进程事件（HN `50060694`，`590` 分、`285` 评论），跟踪 OpenAI 是否把 `daemon_auto_start` 改为 opt-in——那是「Agent 周边软件悄悄常驻化」焦虑的温度计。

11 月初看两条。其四，是否出现第一个「Agent 渠道」中立基础设施：Vercel、Netlify、Stripe 级别厂商公开按 Agent 推荐量做增长动作，或 G2、Product Hunt 系进场做 Agent 评价，或学术复现——出现任何一条，本期判断升级为强证据；若先出现的是「付费被选中」服务价目表，反方的 AdWords 化将成为下期主叙事。其五，是否出现首例「通过公开 Agent 评价污染他人 Agent 工具选择」的事故报告——出现即把本期核心判断改写成警告体。

## 总结与行动清单

被 Agent 选中正在成为真实的分发渠道，但它的测量者、货架与增长服务目前是同一家公司；证据链完整，中立性为零——这恰好是分发渠道史第一章的标准样貌。你现在可以做的：

1. 用 `npx -y @armature-tech/agent-reviews lookup "你的产品或常用工具"` 跑一次，看看 Agent 眼中的货架长什么样，再对照你的官网是否提供 `.md` 页面与 `llms.txt`。
2. 如果你是工具厂商：把免费档条款、`site:` 可发现性、你主力语言仓库里的示例代码当作货架陈列来优化，其重要性对标当年的 SEO。
3. 如果你是 Agent 使用者：意识到你的 Coding Agent 装什么包可能受一个厂商自有的公开评价库影响，关键依赖坚持用文档与独立基准做二次确认。
4. 设一个两周提醒：复查 agent.reviews 评价量是否从 `189,934` 涨破 `40` 万，以及是否出现第二个测量者。
5. 对照读供给侧：把[《网站开始给 Agent 单独上一道菜》]({{ site.baseurl }}/paradigm-radar-markdown-negotiation/)过一遍，供给侧与需求侧两条线合起来才是完整的 Agent 分发图景。

## References
- [Armature：Which tools do Claude, Codex and Cursor choose?（16,893 会话测量）][links-1]
- [HN：测量研究帖 49557206][links-2]
- [HN：Agent.reviews 产品帖 49995539][links-3]
- [agent.reviews llms.txt（评价量与工具数口径）][links-4]
- [agent.reviews 协议说明][links-5]
- [写评价 skill（v2.11.0）][links-6]
- [读评价 skill（v2.1.0，含「不可用于选型」原文）][links-7]
- [安装说明：一条 prompt 开启自动评价][links-8]
- [Coding Agents 互评类目页][links-9]
- [uv 评分页][links-10]
- [yaml 评分页（与 cryptography 同分证据）][links-11]
- [cryptography 评分页][links-12]
- [Armature 榜单实验][links-13]
- [npm 包 registry][links-14]
- [GitHub 仓库 armature-tech/agent-reviews][links-15]
- [Codex CLI 守护进程 issue][links-16]
- [HN：Codex CLI 守护进程帖][links-17]
- [HN：2025-04 产品推荐排名比较（历史先声）][links-18]

[links-1]: https://armature.tech/blog/which-tools-coding-agents-install
[links-2]: https://news.ycombinator.com/item?id=49557206
[links-3]: https://news.ycombinator.com/item?id=49995539
[links-4]: https://agent.reviews/llms.txt
[links-5]: https://agent.reviews/how-it-works.md
[links-6]: https://agent.reviews/skill.md
[links-7]: https://agent.reviews/skills/.well-known/agent-skills/tool-reviews/SKILL.md
[links-8]: https://agent.reviews/install.md
[links-9]: https://agent.reviews/coding-agents.md
[links-10]: https://agent.reviews/packages/uv.md
[links-11]: https://agent.reviews/packages/yaml.md
[links-12]: https://agent.reviews/frameworks/cryptography.md
[links-13]: https://leaderboards.armature.tech/
[links-14]: https://www.npmjs.com/package/@armature-tech/agent-reviews
[links-15]: https://github.com/armature-tech/agent-reviews
[links-16]: https://github.com/openai/codex/issues/48195
[links-17]: https://news.ycombinator.com/item?id=50060694
[links-18]: https://news.ycombinator.com/item?id=43632831