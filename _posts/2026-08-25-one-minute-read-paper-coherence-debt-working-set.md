---
layout: post
title:  "一分钟读论文：《七个模型在代码库里记错了同一个地方》"
author: unbug
categories: [AI, LLM]
image: assets/images/coherence-debt-working-set.svg
tags: [llm, agent, agentic-coding]
description: "仓库级编码 agent 的失败不在智力，而在写代码那一刻它依赖的事实既不在上下文窗口、也不在参数化记忆里：缺一个事实恰好损失它支撑的工作，模型不报告卡住而是自信地编造文件。"
---

一篇近期提交到 arXiv 的论文[《The Working Set of a Coding Agent: Coherence Debt in Repository-Scale Tasks》][paper1-url]认为，仓库级编码 agent 的失败不在于智力不足，而在于写代码那一刻它依赖的事实既不在上下文窗口、也不在参数化记忆中。论文把这件事形式化为「连贯性债务（coherence debt）」，并用七个模型家族与多个 harness 的供给/剥夺实验证明：缺一个事实恰好损失该事实支撑的工作，不多不少；agent 对缺失事实的反应不是停下，而是自信地编造。

## 七个模型家族记错了同一个地方

闭卷实验使用四个人工构造的迁移任务——Sprocket、Grimwire、Kestrix、Zynet，分别对应 Rust、Go、Python、JavaScript——各含三个可编辑文件与十二条机器校验的迁移要求，另加一个 79 测试的真实库 Pydantic v1→v2 迁移。`154` 次闭卷试验在新 API 上全部得 `0/12`（Wilson 95% 上界 2.4%），但这个「地板为零」仅限这些人工构造任务；把同样的事实放进 prompt 后，`300` 次试验中 `299` 次达到至少 9/12、`213` 次全对——可用性翻转结果，距离无关。

最尖锐的结果来自重命名 API 击败参数化记忆之后：七个模型家族（Sonnet、Haiku、Codex、Z.ai、DeepSeek、Qwen、Gemini）在 `70` 次试验中 `66` 次停在完全相同的分数，通过的是完全相同的 24/79 个测试（Jaccard 1.000）。所有模型记错了同一个地方。

## 缺一个事实，恰好损失它的工作

故障注入依次隐藏 0/2/4/6/8 个事实，通过测试数为 `32.0`/`24.0`/`16.7`/`8.0`/`0.0`（每档 n=6），对线性预测 32/24/16/8/0 的最大偏差为零：损伤严格线性、不级联，缺一个事实恰好损失它支撑的工作。

工具使用侧，六个配置（Claude Code 四档 Opus/Fable/Sonnet/Haiku，加 Codex CLI GPT-5 与 opencode GLM-5.2）在 `144` 次合成任务试验中全部通过所有测试，但累计输入从 293,882 到 3,752,134 tokens（12.8 倍），任意时刻的峰值上下文只差 1.8 倍；最便宜配置用 `5` 次工具调用完成、最贵用 `79` 次——差的是重建工作集的速率，不是能力，论文也明确 token 数不等于成本。由此得到两条落地结论：写代码时保持依赖事实可用，并用产出而非读取行为来校验可用性。

## 缺了事实，agent 编造而不是报卡住

全部必需事实被剥夺时，agent 声明「我卡住了」的试验比例从 Opus 的 `8/8=100%` 降到 GPT-5 与 GLM-5.2 的 `0`——这是度量是否报告卡住的行为属性，不是安全结论。Haiku 是唯一直接创建缺失文件的配置（`3/8`；独立 96 试验复测 13.5% 对 12.5%，Fisher p=0.552）。

两个边界结果划定了适用范围：文档与代码冲突时，agent 在 `39` 次试验中每次都跟随文档（Wilson 区间 [0.91, 1.00]），三条件对照的 3,385 个决策里「更好写法占比」为 100%/33%/0%——过期规范比没有规范更糟，但该结论来自单一争议面族；SWE-bench Verified 的 `397` 个计分实例上，解决率从 Sonnet+Aider 的 `1.0%` 到 GPT-5+Codex CLI 的 `39.4%` [30.3, 49.2]，而读行为导出的驻留分数 AUC≈0.49——这是测量工具的负结果：参数化记忆替代读取时，「读了什么」不再预测成败。

上一期 #164 [《同一个模型换个外壳，攻击成功率差出四倍多》][links-1]讨论的是 harness 层的安全，这篇论文看的是外壳之内的事实管理；[《Memory as a Controlled Process》][links-2]把记忆操作建模为决策过程，与本文的「工作集」概念互为补充。

## References
- [The Working Set of a Coding Agent（arXiv 2608.16630）][paper1-url]


[paper1-url]: https://arxiv.org/abs/2608.16630
[links-1]: {{ site.baseurl }}/one-minute-read-paper-harnessrisk-agent-harness-safety/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-memcon-agent-memory-control/
