---
layout: post
title:  "一分钟读论文：《强模型掌舵，弱模型盯梢》"
author: unbug
categories: [AI, Engineering]
image: assets/images/leash-weak-to-strong.svg
tags: [llm-agents, model-routing, ai-agents, benchmark, evaluation]
description: "Simular 联合威斯康星大学麦迪逊分校提出 LEASH 框架：弱模型按不确定性升级给强模型，交接后转任影子观察者在线盯梢黑盒强模型，OSWorld 成功率 73.66% 追平常开强模型，估算成本省 19.2%。"
---

Simular 联合威斯康星大学麦迪逊分校的论文[《LEASH》][paper1-url]（arXiv 预印本，2026 年 10 月提交）给出了一个省钱又不掉链子的方案：让开源弱模型先干活，按`不确定性`在合适时机升级给强模型接管，弱模型转任`影子观察者`在线盯梢，OSWorld 成功率 `73.66%`。

该论文全称为[《LEASH: Uncertainty-Aware Weak-to-Strong Escalation and Oversight for Computer-Use Agents》][paper1-url]，来自 Simular 联合威斯康星大学麦迪逊分校（University of Wisconsin–Madison）。让开源弱模型先干活，按`不确定性`在合适时机升级给强模型接管；接管后弱模型并不下班，而是转任`影子观察者`在线盯梢强模型。在 OSWorld 基准（评测桌面任务成功率的基准）上，以 Qwen3.5-35B-A3B 为骨干时，LEASH 任务成功率 `73.66%`，追平常开 Claude Opus 5 的 `72.90%`，单任务`估算成本`（按固定参考价折算 token 用量得出，非真实账单）`$0.4117` 对 `$0.5094`，省 `19.2%`。

![LEASH 消融阶梯：37.40 → 41.15 → 67.94 → 73.66]({{ site.baseurl }}/assets/images/leash-weak-to-strong.svg)

## 三层机制：何时换人，换了之后谁盯着

计算机操作智能体（computer-use agent，能像人一样操作桌面完成任务的智能体）的长任务有个两难：前沿强模型每一步都调用太贵，小开源模型单独执行又做不成事。LEASH 是一套无需训练的三层机制：开局按`任务级不确定性`早期路由，难任务直接交给强模型；运行中由弱智能体的`步级不确定性`触发`升级交接`，把任务移交给强执行器；交接后弱智能体转任影子观察者，继续盯梢强智能体。另有一个强模型担任的 Manager，在开头和子目标边界拆解与验收。

最特别的设计在第三层。论文指出，强模型是`拿不到内部状态的黑盒 API`，长任务中同样会跑偏、陷入死循环；口头表达的信心也不可靠——这一判断来自论文引述的先前研究（Han et al. 2024）。看不见强模型的心跳，LEASH 就让白盒弱模型在`相同的动作 token 位置`生成`影子表征`，用自己的隐状态变化替代看不见的心跳，判断强模型是否还在线上。这套在线盯梢与第 191 期介绍的[轨迹裁判][links-1]的区别一句话说清：裁判是事后打分，影子是运行时干预。

## 消融实验：钱花在哪一层，各买回多少分

论文最有迁移价值的是同表消融阶梯，把每层花费和回报摊开（Qwen3.5-35B-A3B 骨干，估算成本口径同上）：

- 弱模型独立执行：`37.40%`
- 加入 Manager 拆解验收：`41.15%`，估算成本 `$0.1372`
- 加入不确定性升级：`67.94%`，估算成本 `$0.4050`
- 加入影子盯梢：`73.66%`，估算成本 `$0.4117`

大头花在`该换人时换人`：升级机制拉高 `26.8` 个百分点；影子层再补 `5.7` 个百分点，成本只多花约 `1.7%`。跨骨干看，升级差距可回收 `75%–102%`，成本为常开强模型的 `69%–81%`。同成本对照下，LEASH 比随机升级高 `9.1` 个百分点，说明收益来自`何时升级`的判断，而非多调用强模型；主打配置升级率 `64.1%`。

低升级率也有收益：Nemotron-3 从 `45.04%` 升到 `66.03%`（升级率 `43.1%`），EvoCUA-8B 从 `42.37%` 升到 `67.18%`（升级率 `45.4%`），4 个开源骨干一致。

## 值得记下的设计判断

模型路由研究大多在回答`什么时候换强模型`，LEASH 多回答了一件常被忽略的事：换上去的强模型自己也会迷路。让下班的弱模型在同样的动作位置上用隐状态替强模型把脉，等于给黑盒执行器装了一个低成本在线仪表。这仍是 2026 年 10 月的 arXiv 预印本，结果以 OSWorld 任务成功率为口径，论文未提及平台开源。

## References
- [LEASH: Uncertainty-Aware Weak-to-Strong Escalation and Oversight for Computer-Use Agents][paper1-url]
- [一分钟读论文：智能体轨迹裁判][links-1]


[paper1-url]: https://arxiv.org/abs/2610.22280
[links-1]: https://unbug.github.io/one-minute-read-paper-swe-critix-trajectory-verifier/
