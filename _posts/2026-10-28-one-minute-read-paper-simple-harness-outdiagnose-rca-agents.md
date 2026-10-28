---
layout: post
title:  "一分钟读论文：《别替模型排答题路线》"
author: unbug
categories: [AI, Engineering]
image: assets/images/simple-harness-rca.svg
tags: [llm, ai-agents, root-cause-analysis, evaluation]
description: "北京大学与北京邮电大学同台对比微服务故障诊断的两条路线：不规定模型调用流程的简单 harness 在 RCAtlas 基准上 PR@1 达到 65-77%，全面超过把调查步骤写死在程序里的已发表智能体的 16-53%。"
---

北京大学与北京邮电大学的论文[《Free to Look, Free to Reason: Simple LLM Harnesses Outdiagnose Hand-Crafted Root Cause Analysis Agents》][paper1-url]（arXiv:2610.35767）给一个流行做法判了负分：为根因分析（RCA，指从故障发生时的指标、日志、调用链等遥测数据里定位最初坏掉的组件）手工编排 LLM Agent。论文用三个不规定模型调用流程的简单 harness（harness 指包住模型的调用外壳：一次调用读过证据包、SQL agent、Codex coding agent），对阵五个已发表的 LLM RCA agent 和一批统计、因果方法，同台比准确率：基准 RCAtlas 由 `8 个公开数据集`拼装的 `90 个验证案例`，覆盖 `6 个模型`、`3 档推理努力`。结果：**简单 harness 最准**，PR@1（首个答案即命中根因的案例占比）在三个中档模型上达到 `65-77%`，高于发表 agent 的 `16-53%` 与非 LLM 方法的 `6-39%`，且在每个同时跑了两族方法的模型上全部领先。

![三族方法在 RCAtlas 上的 PR@1 区间对比]({{ site.baseurl }}/assets/images/simple-harness-rca.svg)

## 程序替模型决定读什么

发表 agent 的准确率落差，出在编排本身。论文统计每个方法的 prescribed-call ratio（规定调用占比，指由程序在固定节点发起、而非模型自己决定发起的模型调用比例）：五个发表 agent 把 `十分之一到全部`的模型调用写死在程序里，标准操作流程、固定阶段、角色分工各写各的；相比之下，简单 harness 把看什么、查哪条、什么时候停全部交还给模型。案例研究展示了写死的代价：当程序规定先看什么，它会跳过决定性证据，比如某一行日志，或者一个不再收到调用请求的服务。站内[《ORCA-bench：On-Call 考验》]({{ site.baseurl }}/one-minute-read-paper-orca-bench-how-ready-are-language-model-agents-for-oncall/)同样研究 on-call 根因分析，角度相反：那篇用生产级测试床丈量模型能力有多不够，这篇证伪的是手工编排本身带来的附加价值：编排没有把有限的能力垫高，反而把它压低了。

## 模型管可靠，外壳管能力

换更强模型与多给推理预算，作用并不相同。从 Luna 到 Sol，能力分 A（三次运行都解出的案例占比）只上升 `2-7 个百分点`，不稳定分 U（有时解出、有时解不出的案例占比）却从 `32-36` 降到 `7-8`；多轮 harness 主要买能力，SQL agent 与 Codex 在 Luna 上至少解出一次的案例比一次调用多 `10-11 个百分点`。把推理努力加满，准确率只变`几个点`，时间最多`乘以七`。成本侧同样是一边倒：在准确率超过最佳非 LLM 方法（NSigma，PR@1 `38.9%`）的运行里，成本或时间 Pareto 最优的`每一条`都是简单 harness；七个达标的发表 agent 运行（`43-63%`）全被不更贵或不更慢的 harness 在准确率上压过。换句话说，花钱与花时间换来的最优解全部落在放任模型自己调查的一侧。

数字有边界：四个发表 agent 是论文按原文重新实现的，案例研究只跟了单个案例，且论文自述规定调用占比只测编排固定了多少，没有证明固定就是准确率低的直接原因；全部结果出自论文自测口径，预印本未经同行评审。站内[《研究 Agent 把证据磨得太光滑》]({{ site.baseurl }}/one-minute-read-paper-claim-smoothing-llm-research-agents/)从另一个角度给出同一提示：Agent 的工作流越是预先光滑，越可能漏掉它本就该看见的东西。

## References
- [Free to Look, Free to Reason: Simple LLM Harnesses Outdiagnose Hand-Crafted Root Cause Analysis Agents（arXiv:2610.35767）][paper1-url]
- [ORCA-bench：On-Call 考验（站内解读）][links-1]
- [研究 Agent 把证据磨得太光滑（站内解读）][links-2]


[paper1-url]: https://arxiv.org/abs/2610.35767
[links-1]: {{ site.baseurl }}/one-minute-read-paper-orca-bench-how-ready-are-language-model-agents-for-oncall/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-claim-smoothing-llm-research-agents/
