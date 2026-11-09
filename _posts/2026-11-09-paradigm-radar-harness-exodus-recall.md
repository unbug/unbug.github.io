---
layout: post
title:  "AI 范式雷达：《执行壳：有人往外搬，有人往里收》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-harness-exodus-recall.svg
image_alt: "封面：a 为 2026-11-09 上午两帖热度对全树评论数散点，b 为个人带订阅迁往开源壳与甲方把壳收给工程师的对冲方向"
tags: [paradigm-radar, ai-agents, developer-tools, harness]
description: "Hacker News 双帖实测（2026-11-09）：《Goodbye Claude, hello Pi》702 分，个人带着订阅把执行壳换成开源的 Pi；高盛收权帖 604 分，把 Claude Code 从交易员与银行员手里收回给工程师。一边搬家一边收权，推理位置都没动。"
---

`2026-11-09` 上午的 Hacker News 实测到两件方向相反的事（分数与全树评论数）：个人开发者帖《Goodbye Claude, hello Pi》`702` 分 / `433` 条，高盛收权帖 `604` 分 / `351` 条——一边带订阅搬进开源壳，一边把壳从非工程岗收回来。

![个人带订阅离巢与甲方收回执行壳的对冲对照]({{ site.baseurl }}/assets/images/paradigm-radar-harness-exodus-recall.svg)

## 带着订阅搬走的四百三十三条评论

「执行壳」（harness）指套在大模型外面、替人执行命令与改写文件的那层工具，Claude Code、Pi、OpenCode 都算这一类。模型可以不变，壳可以换。主锚帖 `50410107` 在 `11-08` 03:11Z 登上首页，`11-09` 09:45（Asia/Shanghai）实测为 `702` 分 / `433` 条，`09:5x` 的终采为 `702` 分 / `432` 条；昨日 `18:4x` 终测还只有 `320` 分与 `192` 条评论。`702` 这个分数在连续多次采样里保持不变，评论树仍以每小时 `4` 到 `5` 条的速率增长，末条评论落在 `11-09` 01:46Z，属于持续发酵，而非一次性冲高。

主锚线程的叙事骨架是一批迁移自述，逐条可定位：`50419687`（indemnity）自述从 Claude Code 换到 Pi 的分支 OMP 之后精神状态变好；`50419852`（alexfortin）自述走过 Claude Code 与 OpenCode，最终停在 Pi，并对闭源模型失去兴趣；`50413684`（srid）自述经 agent-distro 换到 Oh My Pi 这个壳；`50412579`（gregwebs）自述本年大部分时间用 Pi，并且正考虑再转投他家。口径先写死：以上全为评论区自述的人工遍历，不是统计样本，只能证明搬家动作真实存在，而且当事人愿意在评论区署名。

开源壳这一侧的供给同步刷新（`11-09` 上午 GitHub API 实测）：`earendil-works/pi` 仓库 `120,865` 星，较昨日的 `120,712` 一夜再涨 `153` 颗；观察窗内新建的 pi 扩展仓库由 `431` 个增至 `436` 个。站内 [《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)核算的是壳的价格，本期记录的是搬家朝向哪里。

## 高盛那一侧：把壳收回到工程师手里

`50415628`（`11-09` 上午 10:0x 实测 `604` 分 / `351` 条）报道高盛把 Claude Code 与 GitHub 的使用范围收缩到「仅工程师」，交易员与银行员被切断，strats 这类量化岗仍保留着访问权限，内部指引于 `10` 月更新。这不是把模型搬回自家机房：高盛保留的仍是 Anthropic 云端的 Claude Code，改变的只是谁有资格握着这个壳，推理位置从头到尾都没有动。高盛发言人 Nick Carcaterra 的话属公司自述：评估过生产力与风险管理等因素后，把工具交给「最适合长期运用它们的人」这一群体。信源层级写死：可核的是 Bloomberg 报道（fa-mag 转载全文可查），HN 实际链接的 the-stateofai 被评论 `50415815` 指为 AI 生成站转述链，不当原始报道使用。

报道里另一句关键表述：「在高盛把 Anthropic 带上市的前几周」。高盛同时是 Anthropic IPO 的主承销商，这是利益绑定而非决裂，「甲方抛弃供应商」的说法不被证据支持；评论 `50415930` 提出的替代解释（是否关乎承销商信息墙）与这句互相咬合，只能并列呈现，动机不替任何一方写死。岗位侧的对照来自 `50412499`（surgical_fire），其自述「Pi 很棒，可惜岗位上强制用 Claude Code，体验很挫」，恰好是两线的焊点：个人往外搬，岗位往里收，收与搬的是同一样东西——对壳的选择权。这与站内 [《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)讲的分发渠道投毒无关，本文不展开安全事件细节，相邻的 `50407882`（`586` 分 / `387` 条）只当作迁移燃料记上一句。本期与 `2026-09-05`《外壳走上台前》的分工也写清楚：那期比较壳与壳之间的选型，本期记录人的搬家与岗位的收回，跑分不入文。

## 反方：六脚刹车

第一脚踩在动因上，用来拆掉「银行业集体动手」这个暗示。评论 `50415825` 指出 Barclays 正朝反方向移动（自述年底前半数工程师用 Claude Code）；`50417888` 则补充说，原文并未写 Barclays 允许交易员使用，只写了开发者一侧——「银行业集体撤壳」不成立，这只是单家银行的内部规约，不是行业共识。

第二脚踩在信源上，即 the-stateofai 转述链的可信度问题，上一节已经交代。第三脚踩在企业侧：评论 `50416519` 自述，企业界担心托管的开源模型被暗中注入缺陷，且自托管成本不划算——离巢浪进不了企业大门。

后三脚来自主锚线程，今日全树复扫未见推翻：`50411310`（jpardoe）自述切换之后被迫回流，因为订阅比按 API 计费更划算；`50411155`（commandersaki）指出 Anthropic 不允许 Pi 挂载 Pro/Max 订阅套餐，「带着订阅出走」这件事在服务条款层面受阻；`50411772`（0xbadcafebee）列举 OpenCode 的支持面短板，说明搬家目的地之间同样存在代差。六条反方并排之后，能站住的结论只剩下：壳的持有资格开始被分级，个人与甲方各自算账，方向恰好相反，谁也别说谁。据我们观察未发现同类中文报道。


## References
- [HN：Goodbye Claude, hello Pi][links-1]
- [HN：Goldman Sachs is pulling Claude Code from its bankers and traders][links-2]
- [Bloomberg 报道（fa-mag 转载）：Goldman restricts traders and bankers from using some AI tools][links-3]
- [GitHub：earendil-works/pi][links-4]
- [站内：AI 范式雷达《标价之外，Harness 替你买了什么》][links-5]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-6]


[links-1]: https://news.ycombinator.com/item?id=50410107
[links-2]: https://news.ycombinator.com/item?id=50415628
[links-3]: https://www.fa-mag.com/news/goldman-restricts-traders-and-bankers-from-using-some-ai-tools-89026.html
[links-4]: https://github.com/earendil-works/pi
[links-5]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
[links-6]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/

RADAR-EDITOR-1109-DONE
