---
layout: post
title:  "一分钟读论文：《你的 AI 智能体，烧掉多少钱是白花的？》"
author: unbug
categories: [AI]
image: assets/images/agent-token-waste-pruning.svg
tags: [ai-agents, token-waste, llm-cost, agent-pruning]
description: "伊利诺伊大学等机构首次把 AI 智能体的 token 浪费变成可测量信号：约 18% 输出是废话；在线剪枝删掉 41%-46% 推理，SWE-bench Verified 成绩不降反微升。"
---

UIUC 等机构的论文[《How Do AI Agents Waste Your Money?》][paper1-url]测出 AI 智能体账单里白花的部分：约 `18%` 的输出 token 是浪费，在线剪枝删掉 `41%`–`46%` 推理后成绩基本不掉。

研究由伊利诺伊大学厄巴纳-香槟分校（UIUC）的 Huimin Zeng 与东北大学（Northeastern University）的 Yuxuan Lu 共同一作，成员来自加州大学洛杉矶分校（UCLA）、UT Austin 及独立研究者，UT Austin 的 Jiaxin Pei 为共同通讯作者。实验覆盖 `4` 个基准（`τ²-bench`、`SWE-bench Verified`、`Claw-Eval`、`MCP-Atlas`）、`6` 款前沿模型（Kimi-K3、Gemini 3.1 Pro、GPT-5.6 Terra、GPT-6 Astra、Claude Sonnet 5、Claude Fable 5.1）和 `5` 款执行框架，属于受控测量而非全行业账单统计。

## 什么算「浪费」

论文把「浪费」定义为可操作的测量口径：先用 LLM 裁判（LLM-as-a-Judge）把轨迹里的推理片段标成四类——复述（Restate）、重复取数（Duplicate-Fetch）、凑字（Padding）、绕远路（Detour），再把这些片段删掉重放执行，验证任务表现是否受影响，而非人工主观标注。

删除实验证明了这把尺子的有效性：在 `SWE-bench Verified` 上，删掉被标记的浪费后仅 `3.0%` 的轮次动作分布显著移位，而删掉全部历史推理则移位 `25.0%`；`MCP-Atlas` 上是 `10.5%` 对 `37.9%`。浪费片段对后续决策的影响比全部推理小一个量级，说明被标记的确实是「可安全移除」的部分，而不只是冗长的部分。

## 删掉近半推理，成绩基本不掉

在线剪枝实验中，删除复述与凑字两类内容后：`SWE-bench Verified` 删 `0%`（基线）时 solved 为 `89.0`，删 `41%` 后升到 `89.5`，删 `100%` 全删则崩到 `73.0`；`MCP-Atlas` 基线 `65.0`，删 `46%` 后 `62.3`，全删崩到 `56.0`。

浪费的分布高度不均。跨轨迹统计里约 `18%` 的输出 token 被标为浪费，这是衡量剪枝空间的基准量；删复述与凑字两类可达 `41%`–`46%`，因为剪枝删的是可安全移除的片段集合，与全量浪费标记口径不同。在超过 `45%` 的任务里，单个智能体浪费的输出比另一个成功解出同题的智能体的全部输出还多——两者是相互独立的观察。浪费还高度集中：`MCP-Atlas` 上约 `10%` 的 OpenHands 轨迹占了 `73%` 的轮次，`SWE-bench Verified` 上长轨迹约占 `40%` 的轮次。

## 加钱买推理，边际收益有台阶

以 Kimi-K3 单模型为例的预算曲线显示：从低档到高档多花 `0.99` 百万 token，成功率从 `69.7%` 升到 `78.4%`；再从高档到最高档多花 `0.80` 百万 token，成绩无可测提升。高档到最高档新增 token 中 `81%` 花在结果不变的任务上，只有 `12%` 对应失败转成功。

更反直觉的是：同在 Kimi-K3 上，最高档每轨迹推理 token 是低档的 `6.6` 倍，被判定为浪费的比例却仅从 `23.7%` 变到 `24.9%`，同一批都能解出的任务上贵 `1.62` 倍。多烧的钱买的是更长的路径，不是更多的废话；省钱的抓手是剪掉被标记的片段，而非一刀切压低推理预算。这条曲线仅为单模型口径，不能外推到全部前沿模型。

![智能体 token 浪费的构成与在线剪枝效果]({{ site.baseurl }}/assets/images/agent-token-waste-pruning.svg)

与站内[《像查性能热点一样查智能体的开销》]({{ site.baseurl }}/one-minute-read-paper-agent-pprof-semantic-stack/)不同：那篇是把 profiler 搬到智能体轨迹上做开销归因，这篇则是给「浪费」下了可删除、可验证的操作定义，并用它做在线剪枝干预，两者不在同一轴上。本文结论适用于其受控测量范围，不宜外推为全行业账单。

## References
- [How Do AI Agents Waste Your Money?][paper1-url]


[paper1-url]: https://arxiv.org/abs/2611.07238
