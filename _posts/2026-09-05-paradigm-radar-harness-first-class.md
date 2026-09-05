---
layout: post
title: "AI 范式雷达：《外壳走上台前：Agent 的竞争从换模型转向换 Harness》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-harness-first-class.svg
tags: [agent, harness, benchmark, evaluation, supply-chain]
description: "FrontierHarness 在同一模型下横评 9 个执行外壳，通过率相差 16.7 个百分点、成本相差 17 倍；DeepSeek 发布插件化开源外壳，arXiv 三天内出现 harness 基准论文潮并长出供应链攻击面。Agent 的竞争正从换模型转向换更好的执行外壳。"
---

9 月 2 日登上 Hacker News 的 FrontierHarness Eval（HN Algolia API 2026-09-06 实测 `81` 分）给出结论：同一 Kimi K3 模型、同一运行时下，横评 9 个执行外壳（harness，包裹在 LLM 外、负责工具调用与沙箱验证的那层软件），任务通过率最高 `66.7%`、最低 `50.0%`，每任务成本相差 `17` 倍。模型权重冻结时，仅换外壳就有这种量级的差距：竞争焦点正从「选哪个模型」转向「基准化哪层外壳」。这与本刊 8 月 26 日[《不再调权重：Agent 的自进化搬进了 Harness》]({{ site.baseurl }}/paradigm-radar-evolving-harness-memory-skill/)视角不同：那篇讲外壳内的自我进化机制，这篇讲外壳本身成为被标准化与基准化的对象。

![同一模型下九个 harness 的通过率与成本差距]( {{ site.baseurl }}/assets/images/paradigm-radar-harness-first-class.svg )

## 同一模型下外壳差距有多大

**FrontierHarness Eval**（Runta 出品）在相同任务集上测了 9 个 harness、12 种配置：Codex 通过率 `66.7%`，OpenCode 与 Hermes 只有 `50.0%`；每任务成本从 Exo Harness 的 `$1.05` 到 Claude Code 的 `$18.34`。质量与成本还会脱钩：每成功一次任务的中位成本从 OpenCode 的 `$0.0615` 到 Claude Code 的 `$0.2880`，相差约 `4.7` 倍；缓存命中率最高的 Codex 为 `88.0%`，最低的恰是 Claude Code 的 `67.8%`。这意味着模型预算和外壳预算是两笔分开的账：换外壳可能比换模型便宜得多。评测方自注仅覆盖软件工程与终端任务，且 Runta 亦是厂商，外推需谨慎。

## 厂商把外壳做成产品，论文把外壳做成考题

8 月 13 日 DeepSeek 发布 DeepSeek Harness developer preview，一切能力皆插件（模型、工具、沙箱、UI 皆可换）；Minimal mode 只留 shell 与编辑器，用于最小环境评测。GitHub API 2026-09-06 实测仓库 `deepseek-ai/deepseek-harness` 已获 `213,026` star（创建于 8 月 13 日）。9 月 1 日至 3 日，arXiv 出现以 harness 为评测单元的基准潮：HarnessDev（`arXiv:2609.01437`）把评估单元从任务输出改为可运行基础设施，考核 LLM 能否自建并进化 harness；CordisBench（`arXiv:2609.01600`）以 `1,200` 道题考组件生命周期推理，组件越多、模型越不可靠。这意味着：一层技术一旦拥有公开基准和插件标准，就开始成为独立学科与独立采购项。

微观证据：Grep beats LSP 实测中检索后端不变、仅在返回结果里附加源码文本，多文件重命名 pass@1 从 `0.67` 升到 `0.83`，后续读取从 `15.2` 次降到 `3.2` 次。作者自注这是小规模试点信号。

## 热潮的另一面：不是万能，还长出了攻击面

HN 热帖《Why Software Factories Fail》唱反调：仅靠 harness 工程产不出可靠软件工厂，上下文质量、任务分解与人类意图表达仍是瓶颈。安全侧，论文《A Blind Trust, the Bloody Thrust》（`arXiv:2609.03884`）证明攻击者控制的 hook 更新即可操纵 agent harness——「一切皆插件」换来可组合性，也把供应链攻击入口带进 agent 层。商业后果已现：Armature 实测 `16,893` 个会话（有效 `5,292`），Claude Code、Codex、Cursor 三个 coding agent 的同工具选择率仅 `42%`，Claude Code 造轮子比例达 `19%`（HN 帖发布于 2026-09-03，Algolia 2026-09-06 实测 `294` 分）；文中转引 Vercel 口径称超过 `30%` 的部署由 coding agent 发起（二手转引）。这意味着外壳进入生产后，选型偏差不再是抽象指标，而是真实账单与新的信任边界。

## 接下来盯住什么

未来一到两个周期盯三个信号：FrontierHarness 是否扩展到第二个模型——若换模型后排名重排，说明存在 harness 与模型强耦合（pairing effect），那将是下一个范式级结论；OpenAI 与 Anthropic 是否跟进版本化公开外壳与 harness 级 changelog；以及模型训练是否开始把 harness 构建能力回填进权重——若发生则本范式部分自我否定，应发续篇。可复现的最小路径：固定模型，在两个外壳里并排跑同一组自己仓库的真实任务，记录通过率、总成本与每成功一次的成本。

## References
- [FrontierHarness Eval][links-1]
- [DeepSeek Harness developer preview][links-2]
- [deepseek-ai/deepseek-harness][links-3]
- [Grep beats LSP][links-4]
- [Which tools do Claude, Codex and Cursor choose? We measured 17k runs to find out][links-5]
- [HarnessDev: Can LLMs Create and Evolve Their Own Agent Harness?][paper1-url]
- [CordisBench: Can Language Models Reason About Component Lifecycles in Dynamic Agent Harnesses?][paper2-url]
- [A Blind Trust, the Bloody Thrust: When Attacker-Controlled Hook Updates Steer AI Agent Harnesses][paper3-url]


[links-1]: https://frontierharness.org
[links-2]: https://www.deepseek.com/harness/en/
[links-3]: https://github.com/deepseek-ai/deepseek-harness
[links-4]: https://www.agentconnect.md/blog/grep-beat-lsp-harness/
[links-5]: https://armature.tech/blog/which-tools-coding-agents-install
[paper1-url]: https://arxiv.org/abs/2609.01437
[paper2-url]: https://arxiv.org/abs/2609.01600
[paper3-url]: https://arxiv.org/abs/2609.03884
