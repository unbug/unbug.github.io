---
layout: post
title:  "一分钟读论文：《不会解题的 0.5B 小模型，反而成了大模型的运行时顾问》"
author: unbug
categories: [AI, LLM]
image: assets/images/cota-tiny-advisors.svg
tags: [llm, agent, test-time-compute]
description: "新加坡国立大学论文提出 COTA：一个只会成对比较、不会解题的 0.5B 小模型在运行时给更大的 actor 模型当顾问并建议其重规划，9 个 actor-环境组合全部取得最佳成绩，平均开销 1.38 倍。"
---

新加坡国立大学的论文[《Don't Solve, Just Compare: Tiny Advisors for Runtime Intervention in LLM Agents》][paper1-url]提出 COTA 框架：**顾问模型不需要会解题**——一个只会判断两个候选动作哪个更好的 `0.5B` 小模型（Qwen2.5-0.5B-Instruct），就能在运行时给比它大得多的 actor 模型指出错误、触发重规划。此前[《测试时扩展：瓶颈在筛选，不在采样》][links-1]的结论是筛选比采样难，这篇论文的结论与之互补：**比较比求解便宜，而且够用**。在 3 个 actor × 3 个环境共 9 个组合上，COTA 全部取得最佳成绩，平均端到端开销 `1.38×`（9 个设置中 7 个低于 `1.5×`）。

## 比较而非求解

流程是：actor 提出下一步动作后，系统从同一前缀采样若干候选替代动作，tiny comparator 做同前缀成对比较，判断哪个更好；重复比较触发干预时，**不直接替换动作**，而是把更优的候选作为非约束性建议返回，由 actor 自行重规划。comparator 的学习目标是局部比较而非求解：它既不生成纠正动作，也不预测绝对动作价值，规划、生成与执行完全留在原 actor 手中。论文把设计拆成两个因素——学习目标（绝对 Q 值预测 vs 成对比较）与干预机制（直接执行顾问偏好动作 vs 建设性干预），发现只有"成对比较 + 建设性干预"的组合在三个评测环境上都有效。论文强调，0.5B comparator 的任务求解能力远弱于 actor，却无需任何任务级微调即可提供有效的运行时干预。

## 三个基准上的主结果

评测覆盖 Qwen3-8B、Qwen3.6-35B-A3B、DeepSeek-V4-Flash 三个 actor 与三个环境：WebShop（智能体通过搜索与浏览完成购物任务的电商环境）、ALFWorld（评估组合式家务任务的文本具身环境）、tau3-Retail（带状态变更工具与模拟用户的策略受限客服对话）。COTA 在全部 9 个组合上最佳（Table 1）：Qwen3-8B 的 WebShop 奖励从 `0.3960` 升到 `0.5630`，ALFWorld 成功率从 `82.84%` 升到 `90.30%`，tau3-Retail 从 `37.50%` 升到 `45.00%`；更强的 Qwen3.6-35B-A3B 与 DeepSeek-V4-Flash 上增益依然成立（WebShop `0.5662→0.6813`、`0.6085→0.6867`；ALFWorld `85.07%→94.03%`、`90.00%→95.00%`）。这一结论限定在这 3 actor × 3 环境的特定组合内，不能外推为对任何 agent 通用有效。基线 Self-Reflection（让 actor 自己审视并修正自己的提案）在 9 个设置上全部变差——这是这些基线与环境下的对比结果，不是"self-reflection 无用"的一般性结论；AgentPRM 与 Asym-AC（缩小干预模型但保留解题式纠错目标）也全面落后于 COTA。

## 为什么不能直接接管动作

2×2 消融（Table 2）显示两个因素都重要：**强行执行**顾问偏好动作时，ALFWorld 成功率崩到 `2.24%`、tau3-Retail 崩到 `4.17%`（Qwen3-8B 行）；换成建设性干预——返回建议、由 actor 自行重规划——后恢复到 `57.46%` 与 `16.67%`。顾问只能引导，不能接管驾驶：0.5B 模型没有独立执行动作的能力，比较信号只有在更强的 actor 保留决策权时才有用。成本同样有明确边界：COTA 平均端到端 episode 时间是原 actor 的 `1.38×`，9 个设置中 7 个低于 `1.5×`，但部分设置明显更高——tau3-Retail 达 `2.024×`（Qwen3-8B 行），因为该环境的候选生成额外调用一个小 LLM，不能描述为开销可忽略。这条"比较比求解便宜"的路线与[工具调用的苦涩教训][links-2]共享同一底层逻辑：不是让单一模型包办一切，而是弱模型与强模型分工。

## References
- [Don't Solve, Just Compare: Tiny Advisors for Runtime Intervention in LLM Agents（arXiv:2608.21027v1）][paper1-url]
- [一分钟读论文：《测试时扩展：瓶颈在筛选，不在采样》][links-1]
- [一分钟读论文：《工具调用的苦涩教训》][links-2]


[paper1-url]: https://arxiv.org/abs/2608.21027
[links-1]: {{ site.baseurl }}/one-minute-read-paper-tts-exploitation-bottleneck/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-bitter-lesson-tool-calling/
