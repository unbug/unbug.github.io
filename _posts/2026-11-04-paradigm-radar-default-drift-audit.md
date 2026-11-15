---
layout: post
title:  "AI 范式雷达：《你关掉的开关，会自己回去》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-default-drift-cover.svg
image_alt: "封面：左为同窗六帖热度柱状图，右为按事件日期的热度走势与两案证据分级"
tags: [data-training-consent, default-settings, opt-out, developer-trust, paradigm-radar]
description: "Hacker News 十二天事件簇实测：Codex 训练开关被观察到静默回弹、Postman 自家日志坐实自动安装 AI 插件且取证 issue 已被删除、Anthropic 三案同窗发酵，开发者信任单位正从条款文本切到默认值审计。"
---

`2026` 年 `10` 月 `22` 日至 `11` 月 `4` 日的 Hacker News 实测到 `6` 个同主题高分帖（最高 `1533` 分，`2026-11-16` 复测，首采 `1192`）：关掉的训练与数据共享开关正回到开启位，三家无关联公司各自被抓现行——信任单位正从条款文本切到默认值审计。

口径：首采为 `2026-11-04` 15:36 CST Algolia items API 全树实测；本文 `2026-11-16` 对六帖、涉事 GitHub issue 与搜索面做了全量复测，两次数值分列不混用；评论区引语为原文摘译并附可定位评论编号；自述、转述、日志级证据分级标注。

## 同窗六帖实测

事件按时间线排开（分数为 `2026-11-04` 首采，括注 `2026-11-16` 复测）：

- `10-23` Google 拟用 Gmail 与 Photos 数据投广告（`403` 分，复测 `403` 分，帖主 JustSkyfall，广告用途旁证，不入核心论证）
- `10-27` Anthropic 官方帮助页《Is my data used for model training?》被推上榜（`225` 分，复测 `225` 分）
- `10-27` 斯坦福校报《Stanford Daily》报道 Claude 用盗版教授书籍训练（`606` 分，复测 `608` 分）
- `10-31` Anthropic 封禁「碰过训练大模型」的用户账号（`492` 分，复测 `497` 分，帖题逐字为 "Anthropic blocks users for anything touching training larger models"）
- `11-03` OpenAI Codex 训练开关被用户观察到静默重新启用（`468` 分，复测 `536` 分 / `163` 条）
- `11-03` Postman 被取证自动安装 AI 插件并尝试共享 API 数据（`1192` 分，复测 `1533` 分 / `462` 条）

六帖横跨 OpenAI、Postman、Anthropic、Google 四家互不关联的主体，没有任何一次产品发布作纽带，共同的只是同一个动作在不同产品面上被各自抓到：默认值动了。所谓「默认值审计」，就是把训练开关、数据共享开关这类选项当作会漂移的配置项，定期与上次记录做 diff，而不是签约时勾一次就完事。复采两天里 Postman 案涨 `341` 分、Codex 案涨 `68` 分——事故帖还在长，其余四帖已基本封顶，热度继续向「可复现证据」两端集中。

![同窗六帖热度与两案证据分级]({{ site.baseurl }}/assets/images/paradigm-radar-default-drift-cover.svg)

![六帖首采对复测双时点柱：Postman +341、Codex +68，其余封顶；底注指出热度向可复现证据集中]({{ site.baseurl }}/assets/images/paradigm-radar-default-drift-recheck-bars.svg)

## 两案证据等级不同

热度最高的 Postman 案（HN `50354960`）指向 GitHub issue `#14370`，标题逐字为 "[SEVERE] Desktop auto-installs Codex/Claude plugins; installer attempts to trust its own startup hook"。取证者引用 Postman 自己的 `main.log`：`PostmanAgentPluginService~install` 记录 `{"source":"auto-existing-upgrade","results":["claude-code:installed","codex:installed"]}`——自动向 Codex 与 Claude Code 安装插件的动作由厂商系统日志坐实，属系统自证级证据。首采时 issue 为 `open`、`38` 条评论；`2026-11-16` 复测，GitHub API 对该 issue 返回「This issue was deleted」——删除方与删除原因无法从 API 判定，但「坐实问题的取证帖在其后消失」这一事实本身已入档。Postman 官方账号 `11-04` 在 HN 的回应只谈开放哲学、未触及自动安装，其中「超过 1700 万开发者」为厂方自述口径。

线程里最重的子树来自 pants2（评论 `50355299`，子树 `252` 条）：他把案底归到轨迹而非单次事故——一个本可以长成 curl 或 Little Snitch 的小工具，融了 `4` 亿多美元、雇到 `1500` 人之后，只能靠强制登录、数据收集、订阅和 AI 功能来撑估值。senfiaj（`50355878`）补了个「Postman 化」定义：像 uTorrent，人人听说过、装机靠惯性，snapetom（`50356620`）接过去：它成了「企业默认选项」，大到没人认真审查。primitivesuave（`50358055`）投来更旧的案底并附长文：用 `{{some_secret}}` 模板填的参数，Postman 会把密钥实值发到自家日志端点，掐掉该端点整个应用失效——「我关掉它之后就写了那篇 Medium」；happytoexplain（`50356162`）补充 GxP 环境早就因「schema 与密钥自动同步上云」弃用它，bottombutton（`50356050`）自报医疗团队因此被网络安全部门吊销认证、一夜集体换 Bruno。逃离路线在 `11-03` 当晚就卷成队列：Waterluvian（`50355212`，子树 `24` 条）早换 Insomnia，georgel（`50355247`）去看了一眼发现落地页也塞满 AI 热词；更多人指向 Bruno；sneak（`50355348`）给出行动派路线：开源许可证里的 fork 权就是为此存在，「现在借 LLM 连去掉后门带换皮都能一次性跑通」。

Codex 案（HN `50352757`）是另一种证据等级：发帖人 user052919 自述多名同事同时发现 ChatGPT 数据控制页里的 "Improve the model for everyone" 开关回到开启位，原文措辞为 "noticed that the setting had been silently reenabled"。这是用户集体观察，不是厂商自认；发帖人自己在评论 `50353786` 承认 "I definitely can't prove it"，但顶住了「那就去跑自建推理」的转向（`50353530`：「显式退出之后静默重开仍是供应商的伦理问题」）。两案必须分开记账：一个是日志级，一个是观察级。

![四档证据分级图：日志级 Postman main.log 原样引用（含 issue 已删除状态）、观察级 Codex 开关（发帖人自认无法证明）、自述级 Mistral/Daybreak、结构性规避级合成数据路径；底注列反方两条无实证主张]({{ site.baseurl }}/assets/images/paradigm-radar-default-drift-evidence-tiers.svg)

## 漂移不止训练开关

线程把「默认值」这个词撑大到了整个同意面。jamienk（评论 `50355424`，子树 `15` 条）拆了 Gemini 的连环句法：侧栏保存聊天＝同意拿去训练，包装语是「保留活动记录能帮你随时续聊」，ipsum2（`50356708`）补刀「用 AI Studio 就基本退不出去」。edot（`50353526`）给出的自保路径——开高级账户安全（需硬件密钥）会连数据共享一起锁死——随即被 tom1337（`50353613`）贴出的 Daybreak 计划变更通知打了个对穿：连「可信访问」的条款也在被改写。bitbasher（`50356234`）与 loopasam（`50357439`）则说明开关防不住的更隐蔽路径：对话轨迹与被观察到的工具调用可以被拿去生成合成训练数据——「不训练你的聊天」与「不用你的聊天」是两个命题。combobyte（`50354985`）半开玩笑地提议往提示词里掺敏感人名求「污染自保」，AlanYx（`50355219`，自述）反向警告：同类行为在 Anthropic 侧可能让账号被静默打标、使保密条款反而失效。此前记录的用户自述同窗仍并档：Mistral Teams 计划从 opt-in 改 opt-out、移除组织级总开关，`48` 小时后回滚但所有员工滑块已回到开启位（评论 `50354115`，未经独立核验）。开关的漂移只是这批动作里最容易被截图的那一种。

## Anthropic 三案的线程细账

帮助页案（HN `50259406`，帖主 jonpizza，把官方页面本身当新闻推榜）说明「我的数据会不会被训练」已是公众级疑问，线程里全是条款显微镜。fxwin（评论 `50259714`）贴出原文：反馈按钮一按，「我们会存储整个相关会话」；spenvo（`50260342`）走得更深，自测发现连点「跳过这次反馈」都可能被计为反馈，附了取证博文，hmokiguess（`50260380`）在楼下喊该有人发起集体诉讼；TheRoque（`50260295`）问怎么关掉反馈弹窗，答（`50260305`）是关遥测会连带关掉远程控制功能——同意项之间互相咬合，想退干净就得功能打折。质疑声外也有「本属应当」派（felixarba，`50260137`：你点赞时就知道这条会进训练），caaqil（`50260271`）回他：「用于评审」与「整条会话原样入训」是两个声明，别替厂商合并口径。

盗版书籍案（HN `50260814`，复测 `608` 分）在输入侧：《Stanford Daily》报道 Claude 训练用了斯坦福教授被盗版成书的著作，退休教授 Wolff 的原话被 raffram（评论 `50265075`）整段搬来——「让我这样干活却不付钱，是一种奴隶劳动」。线程内最热的子树却是 piltdownman（`50261350`）的反讽：按同一法理，当年下载 JSTOR 论文Aaron Swartz 该判得更重——用旧案照执法选择性；kenmacd（`50260994`）较真标题，称「非法获取书籍」属实、「训练本身非法」报道并未断言，alistairSH（`50261329`）一句「区分没有意义」把这条法律精细度又抹了回去。本案与默认值无直接关系，入簇理由是同轴：数据从哪来、谁同意过，与开关回到哪一侧，是同一笔账的进出两端。

封号案（HN `50319358`，复测 `497` 分，帖主 pretext）在条款执行侧，封的不是数据用途而是「碰过训练相关」的行为本身。gdiamos（评论 `50320591`）划界自述：常问大模型技术问题没事，「让 Claude 给训练数据打标」是他不敢碰的线；cisc（`50320968`）回得直白：「为什么要划线？Anthropic 自己没划」。tristanj（`50320289`）推测被封账号因港牌访问触发，leobuskin（`50320333`）以自己美欧两地旅行实测反驳：同样触发封禁的是「修改权重、前沿训练方法」类话题本身，不是地理位置——默认值审计够不到的地方，行为分类器在自己漂移。zmmmmm（`50321207`）的高跟结论：专业用户应主动培育替代与回退路线，别把生产押在单一供应商的分类器心情上。

## 反方与区隔

第一条刹车来自评论 `50353398`（monster_truck）："If your company actually cared about this they would be running their own inference instead of leaving fate to a couple of checkboxes"，跟进评论 `50353503`（rs999gti）补充云厂商的 gated 模型不出网关；rglullis（`50353808`）更彻底：「合同加明文聊天不是技术安全」。若此论成立，真痛点是部署位置而不是勾选框，本期实操价值被削半。

第二条刹车针对证据本身：`50353786` 发帖人自陈无法证明，`50355259` 也为帖主的 "seems" 措辞辩护——相当热度建立在情绪共振而非可验证证据上；截至 `2026-11-16` 复测，OpenAI 对 Codex 案仍未见公开回应，口径缺位本身记入反方账。第三条走「非恶意」归因：hyperbovine（评论 `50353917`）搬出汉隆剃刀——「别用恶意解释能用烂代码解释的」，Codex CLI 的 issue 区已经是机器人在跟机器人对话，「没有任何人真正理解这个应用」，静默回弹更像事故现场；此说同样无人能证。第四条最狠（评论 `50356785`）："You should assume that they are training on their data even when it's disabled by you"——若接受此前提，审计默认值也无意义。此外评论 `50357232` 把 Postman 案归因为 SaaS 普遍逐底而非 AI 特有，同窗的 Google 广告数据帖（`403` 分）也说明默认用途漂移是平台经济旧病，AI 只是新宿主。归因必须克制：本期不主张任何厂商恶意实锤，主张的只是同一窗口内多主体同动作——包括 issue 消失这件事，也止步于记录。

与相邻几期的切割要写死。站内[《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)讲外部攻击者污染分发包，那期敌人是别人，本期信任对象本身就是动作主体；[《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)记 token 账，本期记数据授权账，同一批工具、两本不同的账；与[《模型的配方摊在桌面上》]({{ site.baseurl }}/paradigm-radar-weight-space-programming/)的切割最直接：那期动的是参数，本期动的是同意。

## 供给缺位与迁移潮反证

GitHub 搜索面实测（`2026-11-04` 首采，括注 `11-16` 复测）：`"data sovereignty" ai` 自 `2026-05-01` 以来新建仓库 `77` 个（复测 `80`），`training consent ai` 仅 `8` 个（复测 `11`），头部星数均低，窗口内没有成形的默认值审计工具簇——需求与事故轴先行、审计工具轴缺位的品类前夜形态没变。

但迁移潮在另一条轴上给出了反证：Postman 线程内 Bruno（usebruno/bruno，复测 `48,402` 星，建仓 `2022-09`，`11-12` 仍有提交）被顶到成为默认答案——FuriouslyAdrift（评论 `50355565`）、senfiaj（`50355878`）、richwater（`50355248`）、debo_（`50355274`）至少四条独立迁移自报，外加 bottombutton 的整支医疗团队；saikatsg（`50355483`）顺手贴出 OpenCollection 开放格式，rhdunn（`50356167`）提醒 JetBrains 与 VS Code 自带的 `.http` 文件路线。同一招数在 Google 广告帖（`403` 分）线程里同步上演：jmathai（评论 `50216317`）发 PSA 教程「用 Takeout 导出加自建 Immich，比 Google Photos 更好」，rmunn（`50217605`）自报实锤——`2023` 年他建了个名为 Weight 2023 的 Google 表格记体重，广告随即开始推减肥产品（自述，无法复核）。开发者与用户对默认值漂移的即时反应不是装审计器，而是换成本地运行、数据不出机的替代品——「审计工具」缺位的空档，正被「换掉整个 SaaS」的粗动作吃掉。审计若还想成为品类，得跑赢迁移的速度。

![迁移潮三行流向图：Postman→Bruno/OpenCollection，Google Photos→Immich+Takeout，训练开关→自建推理/ZDR，对应审计工具仓库缺位（80/11 个）；含 rmunn 减肥广告自报格]({{ site.baseurl }}/assets/images/paradigm-radar-default-drift-exodus-flow.svg)

## 动作清单

现阶段可执行的自保动作仍然手工，但复测后的版本比首采版多三条。基础三条不变：定期打开 chatgpt.com/settings/data-controls 与 Claude 侧的 privacy.claude.com 帮助页核对开关状态并截图留档；组织管理员检查成员级滑块是否在平台升级后被重置；订阅常用 AI 工具的 changelog，把「训练」「数据共享」关键词加入检索。新增：把关键 issue、取证帖与官方帮助页做本地存档（Postman 案证明证据本身会消失）；对「保存＝共享」型连环条款（Gemini 式）逐项截图比对文案变更；涉密项目直接走本地或 ZDR（zero data retention，零数据保留）合同，别指望滑块——线程内三派（vibranium `50353665`、rglullis `50353808`、monster_truck `50353398`）罕见地在这一点同向。条款是一次性签名，默认值是持续状态。开关既然会自己回去，勾过的选项就要当成配置项定期 diff——这是本期全部证据收敛成的唯一动作。

## References
- [HN：OpenAI seems to be silently re-enabling model training on Codex chats][links-1]
- [HN：Postman silently auto-installs AI plugins][links-2]
- [postmanlabs/postman-app-support issue #14370][links-3]
- [Anthropic 帮助中心：Is my data used for model training?][links-4]
- [HN：Anthropic trained Claude on illegally obtained Stanford professors' books][links-5]
- [HN：Anthropic blocks users for anything touching training larger models][links-6]
- [HN：Now Google says it might use your Gmail and Google Photos data to target ads][links-7]
- [primitivesuave 密钥日志取证长文][links-8]
- [usebruno/bruno 仓库][links-9]
- [pants2 轨迹归因长评][links-10]
- [jamienk Gemini 连环条款拆解][links-11]
- [tom1337 Daybreak 条款变更转述][links-12]
- [loopasam 合成数据路径][links-13]
- [hyperbovine 汉隆剃刀归因][links-14]
- [HN：帮助页《Is my data used for model training?》被推榜][links-18]
- [fxwin 反馈条款原文][links-19]
- [spenvo 「跳过反馈也算反馈」取证][links-20]
- [raffram 搬运 Wolff 教授原话][links-21]
- [kenmacd 标题较真][links-22]
- [alistairSH 「区分无意义」][links-23]
- [gdiamos 划界自述][links-24]
- [leobuskin 行为分类器实测][links-25]
- [jmathai Immich 迁移教程][links-26]
- [rmunn 体重表格广告自述][links-27]
- [senfiaj uTorrent 类比][links-28]
- [Waterluvian 逃离队列一员][links-29]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-15]
- [站内：AI 范式雷达《标价之外，Harness 替你买了什么》][links-16]
- [站内：AI 范式雷达《模型的配方摊在桌面上》][links-17]


[links-1]: https://news.ycombinator.com/item?id=50352757
[links-2]: https://news.ycombinator.com/item?id=50354960
[links-3]: https://github.com/postmanlabs/postman-app-support/issues/14370
[links-4]: https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training
[links-5]: https://news.ycombinator.com/item?id=50260814
[links-6]: https://news.ycombinator.com/item?id=50319358
[links-7]: https://news.ycombinator.com/item?id=50214218
[links-8]: https://anonymousdata.medium.com/postman-is-logging-all-your-secrets-and-environment-variables-9c316e92d424
[links-9]: https://github.com/usebruno/bruno
[links-10]: https://news.ycombinator.com/item?id=50355299
[links-11]: https://news.ycombinator.com/item?id=50355424
[links-12]: https://news.ycombinator.com/item?id=50353613
[links-13]: https://news.ycombinator.com/item?id=50357439
[links-14]: https://news.ycombinator.com/item?id=50353917
[links-18]: https://news.ycombinator.com/item?id=50259406
[links-19]: https://news.ycombinator.com/item?id=50259714
[links-20]: https://news.ycombinator.com/item?id=50260342
[links-21]: https://news.ycombinator.com/item?id=50265075
[links-22]: https://news.ycombinator.com/item?id=50260994
[links-23]: https://news.ycombinator.com/item?id=50261329
[links-24]: https://news.ycombinator.com/item?id=50320591
[links-25]: https://news.ycombinator.com/item?id=50320333
[links-26]: https://news.ycombinator.com/item?id=50216317
[links-27]: https://news.ycombinator.com/item?id=50217605
[links-28]: https://news.ycombinator.com/item?id=50355878
[links-29]: https://news.ycombinator.com/item?id=50355212
[links-15]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/
[links-16]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
[links-17]: {{ site.baseurl }}/paradigm-radar-weight-space-programming/
