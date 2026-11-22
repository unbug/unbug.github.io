---
layout: post
title:  "一分钟读论文：《150个AI做同一研究，分歧像人类》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/agentic-multiverse-analysis-disagreement.svg
image_alt: 上半：三阶段分歧条（独立分析、AI 互评后几乎不变、看范文后塌缩 80%～99%）；下半：主导分叉最高解释跨 Agent 方差 95%。
tags: [LLM, AIAgents, Reproducibility, PeerReview, Evaluation]
description: 150 个 AI 分析师独立做同一研究：分歧集中在单个方法分叉（最高解释方差 95%），互评消不掉，看范文靠模仿收敛；审计 10 篇顶刊，5 篇稳健性声明站不住
---

达拉斯德州大学预印本[《When AI Analysts Disagree》][paper1-url]让 `150` 个 AI 分析师独立做同一项实证研究，结果像人类分析师一样吵了起来：AI 互评几乎消不掉分歧，看范文才瞬间收拢——靠模仿，不是靠分析。

『多元宇宙分析』指同一份数据、同一个假设，把所有站得住脚的分析选择各做一遍，看结论会不会变。站内[《AI 体检黑盒》][links-2]查 AI 当审计员，这篇让 AI 重做人类的研究。

## AI 分析师也会吵

`150` 个自主 Claude Code Agent（`100` 个跑 Claude Sonnet 4.6、`50` 个跑 Claude Opus 4.6，均为 Anthropic 模型）在毫秒级交易市场数据上独立检验 `6` 个市场质量假设，分三阶段：独立分析、书面 AI 互评、看 `5` 份评分最高的范文。

- **分歧幅度**：跨 Agent 四分位距是单个 Agent 中位标准误的 `0.6～15` 倍；每个假设总有一个主导分叉，最高解释跨 Agent 方差的 `95%`——分歧集中在少数可指认的方法学选择上。
- **AI 互评无效**：摘要原话，互评让分歧『几乎不变』。作者限定于试点设定（以写出最好论文为目标的书面互评），并非断言 AI 审稿没有价值。
- **范文收敛是从众**：看范文后，分歧在收敛家族内塌缩 `80%～99%`，来自模仿范文的选择而非分析性收敛；跨家族仍有多元并存。
- **AI 比人类窄**：Sonnet 与 Opus 的效应值分布在 `6` 个假设上全部被检验判为不等；H1 上 `150` 个 Agent 全选了 OLS 趋势回归，人类团队中 `58%` 用过的『相对变化』范式一次都没出现。

整套试点花了 `$1,558`、约 `25` 小时，而它对标的人类多分析师研究约耗 `27` 人年志愿者劳动。

## 把分歧变成审计工具

![三阶段分歧变化与单分叉方差解释度]({{ site.baseurl }}/assets/images/agentic-multiverse-analysis-disagreement.svg)

AMA 框架（Agentic Multiverse Analysis）把这套装置改造成复现审计器：先跑通论文的复现包，检查不过则后面全部不启动；一个高能力 Agent 枚举分叉空间；独立 Agent 按 Simonsohn 等人提出的规格曲线有效性标准逐条给分叉打分、丢弃无效分支；执行验证过的规格网格，交叉质询并严格职责分离。工具已开源（MCP server 加 CLI），论文用配置需向作者索取。

在某管理学顶刊复现包的 `10` 篇实证研究（合计 `1,755` 个规格估计，为保护原作者署名为 Papers A–J）上实测出三种模式：

- **全部复现**：`10` 篇的原始估计全部从复现材料中恢复——复现成功只说明数据能重跑，与结论稳健与否是两回事。
- **稳健性声明翻车**：`5` 篇论文发表文本中对具体分析选择的明确稳健性承诺，在自家复现数据上站不住，例如声称『按指派层级聚类不改变结果』的论文，其全部标题规格在该聚类下失去显著性。样本非随机，不能外推为顶刊比例。
- **沉默与赌对**：最能翻结果的选择不写进论文是普遍现象；反过来，作者解释过理由的选择常被评估支持。每个案例中推翻结论的规格本身都被独立验证判为有效，还有 `3` 篇论文的头号选择被判无效。

## 边界：谁的数据、谁的账

论文是 `2026-11-18` 提交的预印本 v1，未见同行评审信息；作者为同组两人，同组还有一篇金融版姊妹篇（`324` 篇论文、`62,409` 个规格）。`10` 篇论文非随机抽样且匿名化，第三方无法逐篇对账；存活率口径作者自警『不是正式统计检验』。`$1,558` 是试点的总账，`10` 篇审计只有『每篇几小时、几十美元』的概括口径；`27` 人年属于另一项 164 个团队的人类金融研究。代码：[AMA 开源仓库][links-1]。

## References
- [When AI Analysts Disagree: Agentic Multiverse Analysis and the Robustness of Empirical Research (arXiv:2611.25198)][paper1-url]
- [AMA 开源仓库][links-1]
- [站内：AI 体检黑盒，找到病灶采不出新药][links-2]
- [站内：AI 审稿为何专挑附录下手][links-3]


[paper1-url]: https://arxiv.org/abs/2611.25198
[links-1]: https://github.com/ruijiang81/agentic_multiverse_analysis
[links-2]: {{ site.baseurl }}/one-minute-read-paper-blackbox-clinical-audit/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-ai-review-appendix-bias/
