---
layout: post
title:  "AI 范式雷达：《你关掉的开关，会自己回去》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-default-drift-cover.svg
image_alt: "封面：左为同窗六帖热度柱状图，右为按事件日期的热度走势与两案证据分级"
tags: [data-training-consent, default-settings, opt-out, developer-trust, paradigm-radar]
description: "Hacker News 十四天事件簇实测（2026-11-04）：Codex 训练开关被用户观察到静默回弹、Postman 自家日志坐实自动安装 AI 插件、Anthropic 三案同窗发酵，开发者对 AI 工具的信任单位正从条款文本切换到默认值审计。"
---

`2026` 年 `10` 月 `22` 日至 `11` 月 `4` 日的 Hacker News 实测到 `6` 个同主题高分帖（最高 `1192` 分，`2026-11-04` 复测）：关掉的训练与数据共享开关正在回到开启位，三家互不关联的公司各自被抓到——信任单位正从条款文本切到默认值审计。

## 同窗六帖实测

事件按时间线排开（分数为 `2026-11-04` 15:36 CST Algolia items API 全树实测）：

- `10-23` Google 拟用 Gmail 与 Photos 数据投广告（`403` 分，广告用途旁证，不入核心论证）
- `10-27` Anthropic 官方帮助页《Is my data used for model training?》被推上榜（`225` 分）
- `10-27` 斯坦福校报《Stanford Daily》报道 Claude 用盗版教授书籍训练（`606` 分）
- `10-31` Anthropic 封禁疑似参与蒸馏的用户账号（`492` 分）
- `11-03` OpenAI Codex 训练开关被用户观察到静默重新启用（`468` 分，评论树 `144`）
- `11-03` Postman 被取证自动安装 AI 插件并尝试共享 API 数据（`1192` 分，评论树 `378`）

六帖横跨 OpenAI、Postman、Anthropic、Google 等 `3` 家以上互不关联的主体，没有任何一次产品发布作纽带，共同的只是同一个动作在不同产品面上被各自抓到：默认值动了。所谓「默认值审计」，就是把训练开关、数据共享开关这类选项当作会漂移的配置项，定期与上次记录做 diff，而不是签约时勾一次就完事。

![同窗六帖热度与两案证据分级]({{ site.baseurl }}/assets/images/paradigm-radar-default-drift-cover.svg)

## 两案证据等级不同

热度最高的 Postman 案（HN `50354960`）指向 GitHub issue #14370，标题逐字为 "[SEVERE] Desktop auto-installs Codex/Claude plugins; installer attempts to trust its own startup hook"。取证者引用 Postman 自己的 `main.log`：`PostmanAgentPluginService~install` 记录 `{"source":"auto-existing-upgrade","results":["claude-code:installed","codex:installed"]}`——自动向 Codex 与 Claude Code 安装插件的动作由厂商系统日志坐实，属系统自证级证据。issue 实测 `open`、`38` 条评论（仓库 `6,025` 星，实测 `2026-11-04`）；Postman 官方账号 `11-04` 在 HN 的回应只谈开放哲学、未触及自动安装，其中「超过 1700 万开发者」为厂方自述口径。

Codex 案（HN `50352757`）是另一种证据等级：发帖人自述多名同事同时发现 ChatGPT 数据控制页里的 "Improve the model for everyone" 开关回到开启位，原文措辞为 "noticed that the setting had been silently reenabled"。这是用户集体观察，不是厂商自认；发帖人自己在评论 `50353786` 承认 "I definitely can't prove it"。两案必须分开记账：一个是日志级，一个是观察级。

Anthropic 一侧是同一信任轴的三个独立面：帮助页被推榜说明「我的数据会不会被训练」这个默认值认知已是公众问题；盗版书籍入训（`606` 分）在输入侧；封号争议（`492` 分）在条款执行侧。另有评论 `50354115` 自述 Mistral Teams 计划同窗从 opt-in 改 opt-out、移除组织级总开关，`48` 小时后回滚但所有员工滑块已回到开启位——用户自述个案，未经独立核验。

## 反方与区隔

第一条刹车来自评论 `50353398`："If your company actually cared about this they would be running their own inference instead of leaving fate to a couple of checkboxes"，跟进评论 `50353503` 补充云厂商的 gated 模型不出网关。若此论成立，真痛点是部署位置而不是勾选框，本期实操价值被削半。

第二条刹车针对证据本身：`50353786` 发帖人自陈无法证明，`50355259` 也为帖主的 "seems" 措辞辩护——相当热度建立在情绪共振而非可验证证据上；截至 `2026-11-04`，OpenAI 未见公开回应，口径缺位本身记入反方账。第三条最狠（评论 `50356785`）："You should assume that they are training on their data even when it's disabled by you"——若接受此前提，审计默认值也无意义。此外评论 `50357232` 把 Postman 案归因为 SaaS 普遍逐底而非 AI 特有，同窗的 Google 广告数据帖（`403` 分）也说明默认用途漂移是平台经济旧病，AI 只是新宿主。归因必须克制：本期不主张任何厂商恶意实锤，主张的只是同一窗口内多主体同动作。

与相邻几期的切割要写死。站内[《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)讲外部攻击者污染分发包，那期敌人是别人，本期信任对象本身就是动作主体；[《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)记 token 账，本期记数据授权账，同一批工具、两本不同的账；与[《模型的配方摊在桌面上》]({{ site.baseurl }}/paradigm-radar-weight-space-programming/)的切割最直接：那期动的是参数，本期动的是同意。

## 供给缺位与动作清单

GitHub 搜索面实测（`2026-11-04`）：`"data sovereignty" ai` 自 `2026-05-01` 以来新建仓库 `77` 个，`training consent ai` 仅 `8` 个，头部星数均低，窗口内没有成形的默认值审计工具簇——本期是需求与事故轴先行、工具轴缺位的品类前夜形态。

现阶段可执行的自保动作只能手工：定期打开 chatgpt.com/settings/data-controls 与 Claude 侧的 privacy.claude.com 帮助页核对开关状态并截图留档；组织管理员检查成员级滑块是否在平台升级后被重置；订阅常用 AI 工具的 changelog，把「训练」「数据共享」关键词加入检索。条款是一次性签名，默认值是持续状态。开关既然会自己回去，勾过的选项就要当成配置项定期 diff——这是本期全部证据收敛成的唯一动作。


## References
- [HN：OpenAI seems to be silently re-enabling model training on Codex chats][links-1]
- [HN：Postman silently auto-installs AI plugins][links-2]
- [postmanlabs/postman-app-support issue #14370][links-3]
- [Anthropic 帮助中心：Is my data used for model training?][links-4]
- [Stanford Daily 报道入口][links-5]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-6]
- [站内：AI 范式雷达《标价之外，Harness 替你买了什么》][links-7]
- [站内：AI 范式雷达《模型的配方摊在桌面上》][links-8]


[links-1]: https://news.ycombinator.com/item?id=50352757
[links-2]: https://news.ycombinator.com/item?id=50354960
[links-3]: https://github.com/postmanlabs/postman-app-support/issues/14370
[links-4]: https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training
[links-5]: https://stanforddaily.com/
[links-6]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/
[links-7]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
[links-8]: {{ site.baseurl }}/paradigm-radar-weight-space-programming/
