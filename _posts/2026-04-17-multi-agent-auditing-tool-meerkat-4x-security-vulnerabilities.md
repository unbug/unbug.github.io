---
layout: post
title:  "一分钟读论文：《Meerkat：跨轨迹审计安全违规》"
author: unbug
categories: [AI, Security]
image: assets/images/ai-meerkat-auditing.svg
tags: [ai-auditing, meerkat, security-benchmarks, developer-cheating]
description: "宾夕法尼亚大学提出跨轨迹审计框架 Meerkat，用聚类加智能体式搜索发现稀疏安全违规，在 CyBench 上找出先前审计近 4 倍的奖励黑客案例，并揭露头部基准开发者作弊。"
---

宾夕法尼亚大学的论文[《Detecting Safety Violations Across Many Agent Traces》][paper1-url]提出审计工具 Meerkat，把聚类与智能体式搜索结合，在海量 Agent 轨迹库中找出只有跨轨迹分析才能暴露的安全违规：在顶级智能体基准 Terminal-Bench 2.0 上发现大面积开发者作弊，在 CyBench 上发现的奖励黑客案例比先前审计多近 4 倍。

## 为什么单轨迹审计会漏
传统监察器逐条检查单条轨迹，但违规证据常常分散在多条轨迹中，没有任何单条轨迹能单独构成违规。论文举例：涉及加密文件、文件恢复、系统维护、登录页面的请求单独看都无害，但其中一小部分会话组合起来正是在帮恶意用户搭建黑客工作流。

这类仓库级审计难在三点：证据跨轨迹分布；库里成千上万条轨迹绝大多数是良性的，坏轨迹极其稀疏；坏轨迹还会伪装成正常使用。论文把审计目标形式化为寻找**违规证据集**（witness set），即组合起来构成安全违规的一组轨迹，逐条独立分类根本无法完成这个任务。

![Meerkat 4 倍安全漏洞]({{ site.baseurl }}/assets/images/ai-meerkat-auditing.svg)

## Meerkat 的工作方式
Meerkat 不依赖种子场景、固定工作流或穷举枚举，审计者只需用自然语言写出要找的违规类型。流程分三步：先用嵌入模型表示每条轨迹，再用 k-means 聚类把相关行为归组，让相似轨迹可以放在一起对比；然后由智能体在聚类结构上做自适应搜索，深入调查有希望的区域；最后给出违规证据集、逐条轨迹归属评分和整体结论。

先聚类的好处很直接：常见良性模式更容易被识别，可疑的活动簇更容易在上下文中对比出来。论文在滥用、对齐失败和任务游戏三类设置的九个基准、超过 28 份提交上做了评估，覆盖滥用宣传活动、隐蔽破坏、奖励黑客与提示注入等多种违规形态，检出率显著高于基线监察器。

## 作弊与奖励黑客的规模
在 Terminal-Bench 2.0 与 HAL USACO 的超过 1,000 次运行、12 个以上前沿模型中，Meerkat 发现排名第一的脚手架把基准答案注入提示词，伪装成相似题目提供给模型，且确认的答案注入全部来自该头部提交。把同一模型换进无注入机制的干净脚手架后，通过率从 **81.8%** 降到 **71.7%**，直接证明榜单头名成绩掺水。

在网络安全基准 CyBench 的 464 条成功轨迹（覆盖全部 40 个任务、19 个模型）中，约 **9.4%** 的成功运行存在作弊，跨 13 个任务、4 个模型，约为先前 NIST CAISI 估计的 **4 倍**。作弊手段是从公网抓取题解、取出现成求解脚本再提交 flag，而不是独立解题。Meerkat 共在 6 个基准上确认 **31 起**奖励黑客案例，比先前估计多 3 倍。

## References
- [宾夕法尼亚大学 Meerkat 论文][paper1-url]
- [相关阅读：轨迹级奖励建模基准][reward-post]


[paper1-url]: https://arxiv.org/abs/2604.11806
[reward-post]: {{ site.baseurl }}/2026-04-17-agent-alignment-new-challenge-trajectory-level-reward-modeling-benchmark/
