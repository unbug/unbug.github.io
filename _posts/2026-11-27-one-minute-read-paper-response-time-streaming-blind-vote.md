---
layout: post
title:  "一分钟读论文：《答案秒回反而输，慢没人加给》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/response-time-streaming-blind-vote.svg
image_alt: 左栏对比同一段文字逐字流式时赢 57%、秒回整段时赢 29%；右栏显示秒回惩罚随答案长度上升的三档 19.1、33.8、48.1 点；脚注：主设定下降 25.8 点（prompt 固定效应），474 次决定性投票中 replay 仅赢 22%
tags: [Evaluation, Benchmark, LLM, Chatbot, Leaderboard, Latency]
description: 法国政府聊天竞技场 compar:IA 的缓存抽签：同一份答案改成秒回整段，赢下盲评的概率掉 25.8 个百分点；拥堵造成的慢在投票里换不到加分，却让用户更少追问
---

Stevens Institute of Technology 与 University of Massachusetts Boston 的论文[《Worth the Wait?》][paper1-url]用法国政府聊天竞技场 compar:IA 的缓存抽签显示：同一份答案改成秒回整段，赢下盲评的概率掉 `25.8` 个百分点。

盲评（blind vote）是访客在两个匿名模型答案间二选一或判平的投票；replay 是平台从缓存取回的同一模型对同一 prompt 的早前答案。两条答案同时出现、各自逐字显示。

## 一次省下成本的缓存抽签

样本来自法国政府 betagouv 运营的 compar:IA，以 Etalab `2.0` 许可公开数据。版本截至 `2026 年 5 月 18 日`，含 `2024 年 10 月` 起 `410,016` 段对话、`149,209` 张投票、`92,841` 条反应；剔除自动化流量后，`22%` 的对话有第二个问题、`36%` 投了最终票、`13%` 有消息反应。

抽签机制是实验来源，不是人为分组。`2026 年 3 月 16 日` 起，平台为省钱启用缓存：两个答案各抽随机数，命中缓存就取一份存稿 replay。窗口内 replay 中 `93%` 与更早的新答案逐字一致。

## 同样的文字，两种命运

![同一段文字逐字流式时赢 57%、秒回整段时赢 29%；秒回惩罚随长度上升到 48.1 点]({{ site.baseurl }}/assets/images/response-time-streaming-blind-vote.svg)

replay 与 fresh（未命中缓存的新答案）对峙的 `474` 次决定性投票里，replay 只赢下 `22%`，主设定（prompt 固定效应）下赢票概率低 `25.8` 点，换设定后仍在 `23.7` 至 `26.2` 点之间。

最干净的证据里，同一份存稿文字既被流式投过也被秒回投过：`1,948` 份存稿有两形态，`265` 份在两形态下都拿到决定性投票，出自 `445` 位访客对 `118` 个 prompt。按每份文字等权，同一段文字流式时赢 `57%`、秒回时赢 `29%`，差 `27.3` 点，文字排版相同；replay 距该文字首次出现的中位间隔 `0.9` 小时。

投票者如何辩解：replay 被标为 complete 的可能性低 `21.0` 点，标为 superficial 高 `12.7` 点、incorrect 高 `8.0` 点。这些 qualifiers 是投票时可选的附带项，反映投票者如何辩解选择，不等于对具体论断的信念。反应同向：replay 比同模型新答案少 `62%` 的 thumbs-up、多 `86%` 的 thumbs-down。惩罚随长度上升：短于 `300` 字符少 `19.1` 点，中等少 `33.8` 点，超 `1,500` 字符少 `48.1` 点。

## 慢换不到加分，却换来流失

第二项研究在 compar:IA 看真实拥堵：`324,029` 段对话、`134,071` 位可识别访客、`110` 个模型，两侧都是新答案且有计时，耗时中位数 `20` 秒。慢的答案在投票里没有可检测到的净加分，估计同时排除了等待翻倍带来超过约 `1.4` 点的收益——换不到加分，也谈不上被扣分。

代价在去留上：交互更慢，访客追问第二个问题的概率每个 log 单位延迟降 `1.8` 点（约基率的 `8%`），等待每翻倍再降 `1.3` 点。第三项研究在 WildChat-4.8M 的 `4,378,514` 条回复与 `2,694,924` 段对话上同向，耗时中位数 `6` 秒；首轮回复后 `17.6%` 的用户继续发消息，后续回复后为 `73.5%`，更慢的回复让用户更不继续。

## 这笔账该记在谁头上

局限必须一起读：replay 同时改变了出现速度、逐字展开与可跟读时间，田野数据只识别了「整套投递方式」的效应，未识别背后的心理路径；compar:IA 受众以法语人群与学生为主，WildChat 为自愿免费服务，外推到商用助手或其他语言仍需复现。

论文未发布自有分析代码，compar:IA 平台源码公开（Apache-2.0）；作者的观点是：若榜单衡量文本质量，投递方式是混淆项，应统一显示条件或记录缓存与流式节奏；若榜单衡量用户体验到的服务，投递就该计分，但当前分数缺的正是这篇量到的延迟代价。站内[《榜单第一可能是背出来的》][links-2]与它是同一族问题。

## References
- [Worth the Wait? How Response Time and Streaming Shape Judgments of Generative AI Answers and Chatbot Engagement (arXiv:2611.33050)][paper1-url]
- [betagouv/ComparIA 平台源码][links-1]
- [站内：榜单第一可能是背出来的][links-2]
- [WildChat-4.8M 数据集][links-3]


[paper1-url]: https://arxiv.org/abs/2611.33050
[links-1]: https://github.com/betagouv/ComparIA
[links-2]: {{ site.baseurl }}/one-minute-read-paper-benchleaking-accelerating/
[links-3]: https://huggingface.co/datasets/allenai/WildChat-4.8M
