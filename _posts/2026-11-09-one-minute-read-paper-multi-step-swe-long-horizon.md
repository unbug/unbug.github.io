---
layout: post
title:  "一分钟读论文：《代码会写，接着写不会》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/multi-step-swe-long-horizon.svg
tags: [ai-agents, coding-agent, benchmark, long-horizon]
description: "Klavis AI 自建 69 任务、574 步长程编程基准 Multi-step SWE：最强的 Claude Opus 5.5 整任务解决率仅 18.5%，单步通过率却有 56.8%，版本升级类无模型超过 8.8%。"
---

Klavis AI（产品公司）的论文[《Multi-step SWE》][paper1-url]把「编程智能体能否在自己的代码上接着写」做成可测基准：`69` 个任务、共 `574` 步相互依赖的连续改动，每任务 `5`–`15` 步，最强的 Claude Opus 5.5 整任务解决率只有 `18.5%`。

这里的「整任务解决率」有严格口径：一条 rollout 必须在任务的每一步都拿满分才算解决；`Pass@4` 则是同一任务跑 `4` 条 rollout，至少有一条解出整任务的比例。`3` 位作者全部来自 Klavis AI，无学术机构混合署名；评测框架 Harbor 由其关联方维护，开源基准仓 `2026-11-04` 建立、`stars` 仅 `2`，社区独立复现目前为零，`18.5%` 暂时是单一机构数据。

## 单步看着都对，整链几乎必断

Claude Opus 5.5 的`单步通过率`为 `56.8%`，`整任务解决率`只有 `18.5%`，两者差着 `38.3` 个百分点。`Pass@4` 多试 `4` 次也只到 `31.9%`。其余 `8` 款模型整任务解决率都不超过 `17.8%`：Claude Fable 5.1 为 `17.8%`，Gemini 4 Argon 与 GPT-6.1 Sol 同为 `10.1%`，GPT-6 Astra 为 `6.9%`，DeepSeek V4.1 Flash 为 `6.5%`，Qwen 3.8 Max 为 `4.0%`，MiMo 2.6 Pro 为 `2.9%`，Grok 4.7 只有 `1.4%`。

版本升级类任务是重灾区：智能体先把系统搭起来，再一个版本一个版本地改行为，`20` 道题里没有一款模型解决率超过 `8.8%`，其中 `16` 道题无人能解。

## 错误从第一步就开始复利

论文追踪「仍在正轨」的比例：截至当前步，每一步都通过的 rollout 占比。把任务按步数切成五段，Claude Opus 5.5 从第一段的 `54.7%` 跌到最后一段的 `19.2%`；Grok 4.7 从 `13.1%` 跌到 `1.4%`。`9` 款模型的最陡跌幅都出现在第一段到第二段之间，全模型均值从 `34.9%` 掉到 `9.0%`。与之对照，单步通过率下降得平缓得多，从 `40.7%` 到 `27.8%`——每一步单独看错误率变化不大，一旦后面每一步都建立在前一步留下的代码上，早期设计失误就会一路滚雪球。

![仍在正轨比例随任务推进的复利式衰减]({{ site.baseurl }}/assets/images/multi-step-swe-long-horizon.svg)

## 失败多半不是算力不够

这一点比 `18.5%` 更有解释力。基准给每一步 `2`–`4` 小时、每任务 `10`–`60` 小时预算（`471` 步给 `2` 小时，`56` 步给 `3` 小时，`47` 步给 `4` 小时）。实测中只有 `12%` 的失败步骤跑到距离时限 `5` 分钟以内；`6` 款模型的中位失败步骤只用掉 `24%`–`37%` 预算，还剩 `77`–`93` 分钟没用。只有 `3%` 的失败以时间预算为停止理由，`19%` 结束时连最终报告都没交。多数失败是方向走错，而不是时间或算力不足。需要说明的是，每步 `2`–`4` 小时是基准的设计预算，不是模型真实部署成本。

## 局限：误杀的裁判与偏底层的题

论文自认：尽管经过专家评审并对齐既有事实来源，仍有些任务含有含糊需求，或存在漏判、误杀正确行为的 verifier（自动验证器）。另一个未解之处是能力与脚手架没有分离——把每一步单独执行的 isolated-step 基线被留作 future work，因此 `18.5%` 里有多少归因于模型能力、多少归因于任务串联难度，本文无法回答。任务分布也偏向系统底层：`69` 题里 C/C++ 占 `38` 题，Rust `11` 题，Java `6` 题，Go、JavaScript 各 `4` 题，Python `3` 题，PHP `2` 题，Ruby `1` 题；结论外推到普通业务代码库需要谨慎。起点上 `34` 题从空目录或骨架开始、`35` 题基于已有开源代码库。因此 `18.5%` 是这套任务分布下的结果，不宜当成通用编程能力得分。

与站内[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/)不同：那篇对已跑完的轨迹做开销归因，这篇测的是编码任务跨步累积的错误，两者不在同一轴上。

## References
- [Multi-step SWE: Can Coding Agents Keep Building on Their Own Code Over Long Horizons?][paper1-url]
- [Multi-step SWE 开源基准仓库][links-1]
- [Multi-step SWE 项目站与 leaderboard][links-2]
- [Harbor 评测框架][links-3]


[paper1-url]: https://arxiv.org/abs/2611.07166
[links-1]: https://github.com/Klavis-AI/Multi-step-SWE
[links-2]: https://multistepswe.com
[links-3]: https://github.com/harbor-framework/harbor
