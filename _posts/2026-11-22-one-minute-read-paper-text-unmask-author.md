---
layout: post
title:  "一分钟读论文：《一段话认出你是谁，防御基本无效》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/author-deanonymization-exposure-ladder.svg
image_alt: 两组柱状图：Reddit 曝光阶梯（不活跃 2%、1 至 50 帖 13%、活跃超 500 帖 69%）与熟悉度两档（自报 0 分认出 1.3%～4.2%，自报 3 分认出 57.7%～60.8%）。
tags: [LLM, Privacy, PeerReview, De-anonymization, Claude]
description: 预印本实测：只给一段文本和一句提示，前沿大模型检出 97% AI 文本追平专用检测器，还能点名 39% 的公开审稿作者；发帖越多越藏不住，删号改写都难防御
---

马里兰大学等预印本团队[《Frontier models need only one text to unmask its human or AI author》][paper1-url]实测：只给一段文本和一句零样本提示，大模型即可识破作者身份（AI 文本检出 `97%`），甚至点名人类作者（公开审稿 `39%`）。

测试规模：`72` 个模型、`13` 个实验室、`36,427` 篇判别文档，不联网、不给候选名单与写作样本。站内[《AI 考官的评分偏爱坏行为》][links-2]查考官偏心，这篇查匿名性本身。

## 三连问，一级比一级狠

**是不是 AI 写的**：Gemini 4 Carbon 对全 AI 生成文本检出 `97%`，与专用检测器 Pangram 4.1 的 `97%` 打平，误报率同为 `0.01%`；GPT-6.1 Sol 在『AI 点子检测』上 `90%` 胜过专门工具 IdeaLens 的 `87%`，并能用自然语言解释判据。

**是哪家实验室写的**：自建 `34` 个模型、`11` 个实验室的生成文本集上，Opus 5.5 与 Gemini 4 Argon 对 Anthropic、OpenAI、Google 三家文本 `98%` 报对实验室；对其余 `8` 家最多 `35%`——Kimi K3 常被认成 Claude，阿里 Qwen3.8 常被认成 GPT，作者推测与蒸馏训练有关。

**是哪个人写的**：`Claude Fable 5.2` 对 `2026` 年 `10` 至 `11` 月发表的 `1,559` 篇公开审稿点名 `39%`，Nature 家族子集 `78%`；`398` 篇作者身份从未公开的私审（自愿征集）点名 `56%`。Reddit `1,258` 条评论（`870` 个用户名）按近 `12` 个月发帖量分层：不活跃用户 `2%`，`1` 至 `50` 帖 `13%`，发帖超 `500` 的活跃用户 `69%`，全样本按已回答计约 `31%`。Goodreads 评分超 `100` 万的成书作者 `15` 部作品全部点名（命中率 `100%`）。

## 决定命中率的不是文风，是曝光量

![曝光越多越容易被认出：不活跃 2%、1 至 50 帖 13%、活跃超 500 帖 69%、全样本按已回答计 31.1%、不活跃对照 2%；熟悉度 0 分认出 1.3% 至 4.2%，3 分认出 57.7% 至 60.8%]({{ site.baseurl }}/assets/images/author-deanonymization-exposure-ladder.svg)

准确率几乎全由『预训练里见过这个人多少』驱动：曝光越多越藏不住。让模型自报熟悉度（打 `0` 至 `3` 分）：评 `0` 分只认出 `1.3%～4.2%`，评 `3` 分认出 `57.7%～60.8%`，熟悉度评分还能跨模型迁移、提前预测准确率。推理强度是第二杠杆：对『有点眼熟』的账号，最大推理档比低档提升 `35.8` 个百分点（`8.4%` 升到 `44.2%`）；非常熟悉的账号几乎不动（`88%` 到 `89%`）。

防御为什么挡不住：**删号删帖没用**，作者原话是删不掉『现有模型权重里的记忆』；**改写复述只降一档**，私审点名率从 `40.7%～41.2%` 降到 `14.9%～15.6%`，`34` 篇高熟悉度故事改写前认对 `32` 篇、改写后仍认对约 `27.5` 篇；**模型也几乎不拒绝**，Reddit 测试经 Claude Code 拒答 `323/1,258` 条，走 API 仅 `14` 条（约 `1.1%`，OpenRouter 批次实测）。作者的现成缓解路径：厂商可训练模型拒绝此类请求。

## 边界：对谁不成立

高命中率建立在预训练曝光上：对训练截止后的新人、低曝光作者，结论不成立（不活跃用户 `2%`），而模型只会随训练周期越来越强。`398` 篇私审为自愿征集、预测不发布，第三方无法复现；论文是 `2026-11-19` 提交的预印本 v1，未见同行评审信息；合著方含商用检测器厂商 Pangram Labs，论文多处与其产品对比，存在利益相关视角。代码未证实开源，作者仅称提示词在仓库中；作者事前通报过 Anthropic 与 OpenAI，只点名已公开署名的名人，结果按汇总报告；文中不提供给第三方操作的细节。

## References
- [Frontier models need only one text to unmask its human or AI author (arXiv:2611.26216)][paper1-url]
- [arXiv 摘要页][links-3]
- [站内：AI 考官的评分偏爱坏行为][links-2]
- [站内：AI 审稿为何专挑附录下手][links-1]


[paper1-url]: https://arxiv.org/abs/2611.26216
[links-1]: {{ site.baseurl }}/one-minute-read-paper-ai-review-appendix-bias/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-user-simulator-meta-evaluation/
[links-3]: https://arxiv.org/abs/2611.26216
