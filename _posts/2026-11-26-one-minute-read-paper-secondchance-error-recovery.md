---
layout: post
title:  "一分钟读论文：《改对了错，任务却没救回来》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/secondchance-error-recovery.svg
image_alt: 左图对比无援助与给修复方案两档下最佳模型的完全恢复率 16% 与 27%；右图阶梯显示 GPT-6.1-sol 四档援助下错误更正 24%-42% 与完全恢复 21%-34% 逐级上升；脚注：AppWorld 84 次任务成功的续跑有 40 次错误仍在原地。
tags: [AIAgents, Evaluation, ErrorRecovery, Benchmark, Reliability, ToolCalling]
description: Georgia Tech 把智能体自己犯下的 129 个错误做成检查点，12 个模型续跑 5760 次：最佳模型无援助只完成 16%，改对错误任务零完成
---

佐治亚理工学院预印本[《SecondChance: Benchmarking Reliable Error Recovery in AI Agents》][paper1-url]把智能体自己犯下的 `129` 个错误做成检查点，让 `12` 个模型续跑 `5760` 次：最佳模型无援助只完成 `16%`，拿到方案也只有 `27%`。

## 不注入故障，回到自己闯祸的现场

SecondChance 的做法是不注入故障：从 τ²-bench、BFCL、AppWorld 三个环境回放智能体自己的任务轨迹，把自然产生的错误现场做成检查点（error checkpoint），附上错误证据与『是否存在修复方案』的证据。任何模型可从同一现场续跑，援助分四档加码：无援助、告知出错了（error notice）、指出错在哪（error location）、给修复方案（repair guidance）。打分还分列错误更正、环境状态保留、修复耐久性与成本。主研究 `12` 个模型为 `10` 个开源权重模型加托管的 GPT-5.4-mini 与 GPT-6.1-sol，每检查点、每条件、每模型各跑一次。跑对一次不等于可靠，出事之后能不能收拾残局现有评测根本没测。

## 改对不等于恢复

![四档援助下的更正率与完全恢复率]({{ site.baseurl }}/assets/images/secondchance-error-recovery.svg)

拿到修复方案后，Llama-3.3-70B 更正了 `26%` 的 τ² 错误却一次任务都没完成；AppWorld 里 `84` 次『任务成功』的续跑有 `40` 次错误原封未动。在 `18` 个已证明存在修复方案的 τ² 检查点上，GPT-6.1-sol 带方案完成 `13` 次恢复，Llama-3.3-70B 改对 `10` 个错误恢复为零，任务成功率单一指标同时漏掉『改错没报』『改对没救』『改对又撤销』三类失败。

**援助不是普惠**。`11` 个模型在前三档条件下一个 τ² 错误都不改，对它们只有直接给方案才有用。GPT-6.1-sol 每加一档援助，更正率（`24%`、`29%`、`37%`、`42%`）与完全恢复率（`21%`、`24%`、`29%`、`34%`）同步上台阶。

**先问更贵**。SecondChance 把『完全恢复』定义为修正错误并告知用户、不要求先征求同意：被告知错误位置的 GPT-6.1-sol 更正 `14` 个 τ² 错误、完成 `11` 次恢复，其中 `9` 次先修错事后才告知用户，`10` 次全程没问；换成要求先解释并征求同意的方案档，它 `16` 次更正完成 `13` 次且全部先问，代价是完全恢复的中位调用数从 `11` 次涨到 `15` 次。论文另设更严的先征求同意（consent-first）口径供对照。

## 没有回头路的错

在逐状态分析的 `30` 条 BFCL 原始轨迹里，能定出精确关闭点的修复窗口共 `9` 个，全部关闭在犯错动作当步——想事后修复，窗口已经没了；同口径下另有 `14` 个错误到轨迹结束仍可修。修复大体撑得住：τ² 的 `58` 次带方案更正中 `4` 次被后续操作撤销，AppWorld 的 `26` 次中撤销 `1` 次。

## 成本、边界与工程落点

三条可直接抄进 agent 持续集成的断言：评测要回到错误现场重跑；不可逆操作要在致害动作之前拦住；恢复预算按调用数计。成本口径：重复运行与托管模型子研究中托管模型共花 `$92.19`（BFCL 智能体 `$13.24`、τ² 智能体 `$39.22`、τ² 模拟用户 `$39.73`），按记录 token 用量与牌价折算、并非账单实付。数据集已在 HuggingFace 公开[（SecondChance 数据集）][links-1]，论文给出的 GitHub 地址实测 404。边界：v1 预印本无接收标注，每个组合只跑一次，『无回头路』仅建立在 `30` 条轨迹的 `9` 个关闭点上。站内[《108次重演事故，62起没有凶手》][links-2]复现事故怎么发生、[《Agent 恢复记录的缺口》][links-3]普查文献里的恢复记录，这篇是同现场变援助的受控实验。

## References
- [SecondChance: Benchmarking Reliable Error Recovery in AI Agents (arXiv:2611.31586)][paper1-url]
- [SecondChance 数据集（HuggingFace）][links-1]
- [站内：108次重演事故，62起没有凶手][links-2]
- [站内：Agent 恢复记录的缺口][links-3]


[paper1-url]: https://arxiv.org/abs/2611.31586
[links-1]: https://huggingface.co/datasets/atahandokme/secondchance
[links-2]: {{ site.baseurl }}/one-minute-read-paper-rogue-ai-incident-replication/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-agent-recovery-gap/
