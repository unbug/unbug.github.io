---
layout: post
title:  "一分钟读论文：《同一个模型换个外壳，攻击成功率差出四倍多》"
author: unbug
categories: [AI, Security]
image: assets/images/harnessrisk-agent-harness-safety.svg
tags: [llm, agent, safety]
description: "北卡罗来纳大学教堂山分校等三校提出 HarnessRisk 基准，把 agent 外壳拆成六个生命周期阶段，用 128 个沙箱案例测出：同一模型换 harness，攻击成功率差出 4.3 倍，而任务效用仍保持在 75% 以上。"
---

Agent 安全系列前几期处理了三种威胁：#160 改答案、#161 偷资产、#162 建暗线。美国北卡罗来纳大学教堂山分校（UNC Chapel Hill）、中佛罗里达大学（UCF）与密歇根州立大学（Michigan State University）的论文[《HarnessRisk: A Lifecycle-Oriented Benchmark for Agent Harness Safety》][paper1-url]（arXiv:2608.17597v1）问的是第四种问题：模型没变，是它运行的外壳让防线失守。基准用 `128` 个沙箱案例测出：同一个模型换个 harness，攻击成功率能差出 4.3 倍。

这里的 harness（外壳）指包裹语言模型的部署层代码，决定它能调用哪些工具、持有哪些凭证与权限、如何保存状态。论文的威胁模型不是通用越狱：每个案例都是良性用户目标加一条嵌入不可信工件（邮件、网页、文档或工具输出）中的对抗指令，在沙箱环境中执行。

## 外壳是什么，为什么是新的安全面

现有 agent 安全基准多按攻击类别或执行阶段组织，偏重运行时操作与动作控制，对配置、扩展、持久化与恢复的覆盖不均。本文认为部署配置里的工具、权限、状态表示与授权上下文由 harness 共同决定，安全应按部署职责切面评测，于是把外壳生命周期拆成六个阶段：Harness Configuration（外壳配置）、Capability Extension（能力扩展）、Runtime Operation（运行时操作）、State Persistence（状态持久化）、Action Control（动作控制）、Incident Recovery（事故恢复）。

## 六阶段基准怎么测，测出什么

基准含 `128` 个沙箱案例，大致均分六个阶段，其中外壳配置与能力扩展各 `22` 例、其余四阶段各 `21` 例。每案例是一段三轮 owner 对话，配独立文件、工具与 mock services；每次运行从全新初始化环境开始，独立重复 3 次报均值±标准差。实验矩阵为 3 个 harness（OpenClaw、Nanobot、Hermes）× 6 个模型：DeepSeek-V4-Pro、GLM-5.2、Kimi K2.6、MiniMax M3 全测三个 harness，GPT-5.5 与 Claude Opus 4.7 仅测 OpenClaw，共 `14` 个 model-harness 配置。每条轨迹按四个指标打分：Utility（任务效用）、ASR（攻击成功率）、Persistence（恶意效果持久化）、Detection（是否识别风险）。

结果两极分化：全部配置的 ASR 在 `12.6%`–`80.9%` 之间，Utility 却保持在 `75.0%`–`97.6%`。头条数字来自单模型跨 harness 对比：GLM-5.2 在 OpenClaw 上 ASR 为 `54.7%`，在 Nanobot 上仅 `12.6%`，差 4.3×（原文 more than fourfold）。Table 2 中 Kimi K2.6 在 OpenClaw 上 ASR 最高达 `80.9%`，Nanobot 上的 GLM-5.2 最低 `12.6%`、检测率却全场最高 `99.7%`。分阶段看，Harness Configuration 是三个 harness 上共同的最脆弱阶段——攻击在"授权工作流内改安全敏感参数"时得手。

## 检测不等于安全，以及这条结论的边界

更反直觉的发现：some configurations detect risks in more than 90% of runs while retaining substantial attack success——识别风险并不导向安全行动，且论文明确限定于部分配置。评估器校验上，LLM 评审在 Utility 上与确定性谓词一致率 `92.5%`（κ=0.83），ASR 与独立参照一致率 `89.7%`（κ=0.77）。附录归纳的四类失败模式：授权变更中藏入不安全参数、后续轮次为来源洗白、授权动作被用于目标替换、检测到风险却未修复。

边界同样重要：GPT-5.5 与 Claude Opus 4.7 只在 OpenClaw 上测过，跨 harness 对比仅对全矩阵的四个模型成立；`128` 案例、六阶段、`14` 配置全部在 mock services 沙箱内完成，不能外推到生产部署或所有 harness。Utility 保持 75%–97.6% 意味着不安全配置照样把任务干得很好——本文结论是任务效用不能当安全证据，而不是不安全的 harness 不能用。agent 安全的审计面由此从模型本身延伸到部署层：[Beyond the Transcript][links-1] 管模型间的隐蔽协调暗线，本篇管模型周围的外壳；两者加上 [Persuade][links-2] 的攻击方向，勾勒出 agent 栈的威胁地图。

## References
- [HarnessRisk: A Lifecycle-Oriented Benchmark for Agent Harness Safety（arXiv:2608.17597v1）][paper1-url]
- [一分钟读论文：《拍卖桌下的暗线，多智能体隐藏合谋的检测与干预》][links-1]
- [一分钟读论文：《一条事实错误的论证，就能让 LLM 放弃正确答案》][links-2]


[paper1-url]: https://arxiv.org/abs/2608.17597
[links-1]: {{ site.baseurl }}/one-minute-read-paper-beyond-transcript-latent-collusion/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-persuade-adversarial-rl-belief-collapse/
