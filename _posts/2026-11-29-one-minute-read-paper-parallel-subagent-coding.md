---
layout: post
title:  "一分钟读论文：《并行子代理多花 3 倍钱，多对 5 分》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/one-minute-read-paper-parallel-subagent-coding.svg
image_alt: "左栏：随机抽题上并行子代理只把隐藏测试通过率抬高约 1 到 5 个百分点，成本却是单 agent 的 2.6 到 3.8 倍；右栏：难任务 atlas 上 47% 到 77%，长跑预算耗尽时按牌价约 500 美元对比自然停止不足 20 美元。"
tags: [AIAgents, CodingAgents, MultiAgent, Cost, Evaluation, TestTimeScaling]
description: "UIUC 实测并行子代理写代码：随机抽题通过率只抬 1 到 5 个百分点，成本却要 2.6 到 3.8 倍，同成本下单 agent 打平或反超。"
---

论文[《When Are Parallel Subagents Effective for Coding?》][paper1-url]来自 UIUC，实测并行子代理写代码：随机抽题通过率只抬约 `1` 到 `5` 个百分点，成本却要付到 `2.6` 到 `3.8` 倍，同成本下单 agent 打平或反超。

论文测的对象是仓库构建任务：一个主 agent 要从零做出能通过隐藏测试的程序。实验组 Multi 是主 agent 派生并行子代理（parallel subagents，把模块拆给多个子代理同时开工），对照组 Single 是单 agent 自己干。UIUC 全称为伊利诺伊大学厄巴纳-香槟分校。每基准抽 `30` 题、三档难度各 `10` 题，题目来自 NL2Repo 和 ProgramBench，后者还提供一份可执行的参考程序。驱动框架是 Codex CLI，模型名按论文原样：GPT-5.6 Sol、GPT-6 Sol、GPT-6.1 Sol、Opus 5.5、Grok 4.6、MiniMax-M3。开这个开关很轻：「in Codex and Claude Code a user enables subagents with one sentence and pays the extra cost whether or not the program improves.」——一句话开启，账单跟程序有没有变好无关。

## 三笔账：分数、成本、噪声

**第一笔是提升。**「The gain is about 1 to 5 points across model generations and benchmarks, at 2.6 to 3.8 times the cost of a single agent.」跨模型代际和基准，增益都停在 `1` 到 `5` 个百分点，成本却是 `2.6` 到 `3.8` 倍。

**第二笔是同成本对照。**「At equal cost, Single's score is higher than or equal to Multi's.」把两边预算拉平，单 agent 的分数不低于多 agent——并行买到的那点提升，摊进同样的钱之后并不划算。

**第三笔是噪声，也是这篇最该被引用的一句话。**`30` 题里有 `10` 题的增益在两轮重复之间正负换号（「On 10 of the 30 tasks, the gain from subagents even changes sign between two repetitions of the comparison.」），而且「Most comparisons rest on one to three runs per setup.」多数对照每设置只跑 `1` 到 `3` 次。所以「`1` 到 `5` 个百分点」不能当成稳定提升读，它本身就是小样本里的方向信号。

## 什么时候真买到了东西

难任务是例外。atlas 是 ProgramBench 上要重建数据库 schema 工具的 hard 题：「On atlas, a hard ProgramBench task that rebuilds a database schema tool, a single GPT-5.6 Sol agent stops at 47% of the hidden tests, whereas with subagents it reaches 77%.」单 agent GPT-5.6 Sol 停在 `47%`，加子代理到 `77%`。

机制上，子代理买到的主要是「替主 agent 补自检」。同一摘要口径显示，从 GPT-5.6 Sol 到 GPT-6.1 Sol，增益随单 agent 自检变强而缩小。对单 agent 加一句「先跑一遍参考程序」的提示，作者测得它「recovers most of this gain at a fraction of the cost」——大部分收益能用零头成本换回来。作者还在 Claude Code 上用 Opus 5.5 做了小规模复现，每个 RQ 每设置每题一跑、每个基准十道随机题，观察到类似模式。

长跑里还有一处翻车点：跑到预算耗尽时，「only multi-agent runs end with a program that does not build (2 of 30 extended runs, against none of 38 single-agent ones)」——只有多 agent 组交编不过的程序，`30` 次里 `2` 次，单 agent `38` 次里 `0` 次。同一任务把 GPT-5.6 Sol 跑到 20 小时上限，「GPT-5.6 Sol costs about $500 at list price on average, compared with under $20 for a run to the natural stop.」平均约 `$500` 牌价，自然停止不足 `$20`。

![难任务 atlas 上单 agent 47% 对加子代理 77%；长跑预算耗尽按牌价约 500 美元，自然停止不足 20 美元]({{ site.baseurl }}/assets/images/one-minute-read-paper-parallel-subagent-coding.svg)

## 这份测量自己承认的边界

数字要连着局限读。作者自认「so their cost figures compare token use rather than price」：成本是按 token 用量折算牌价，不是真实账单。每设置 `1` 到 `3` 跑、`30` 题中 `10` 题增益换号，意味着 `1` 到 `5` 个百分点是噪声量级的方向差。仓库口径也要写清：abs 页挂了 `github.com/cogito233/subagent-study` 的链接，但发稿前实测（2026-11-27）该地址返回 `404`，本文不写「已开源」。此外这是单一实验室（UIUC 三人）、主跑单一 harness（Codex CLI）的结果，外推宜谨慎。

它和站内[《子 agent 别写总结，直接交证据》]({{ site.baseurl }}/persistent-retrieval-subagent/})正好接上：那篇测「派子代理时怎么传话更省钱」（回传原始证据比改写总结省 `43.3%` token），这一篇测「这个代理到底值不值得派」；前者管姿势，后者管开关。与[《标价之外，Harness 替你买了什么》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/})也成对照：那期雷达量的是 harness 自己悄悄记在账外的开销，这一篇量的是用户一句话主动开启的开销。

## References
- [When Are Parallel Subagents Effective for Coding? An Empirical Study on Repository Construction (arXiv:2611.33893)][paper1-url]
- [站内：子 agent 别写总结，直接交证据][links-1]
- [站内：标价之外，Harness 替你买了什么][links-2]


[paper1-url]: https://arxiv.org/abs/2611.33893
[links-1]: {{ site.baseurl }}/persistent-retrieval-subagent/
[links-2]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
