---
layout: post
title:  "一分钟读论文：《长程 Agent 记忆中的压缩悬崖》"
author: unbug
categories: [AI, LLM]
image: assets/images/compaction-cliff-agent-memory.svg
tags: [llm, agent, memory, context-management]
description: "长程 Agent 压缩上下文时，安全规则与情景日志被同一比例摘要，而只有规则需要逐字精确才能保持可执行：Claude Code 生产配置下五轮压缩后仅存 10% 安全规则。论文提出按知识类型分流的 Knowledge Triage，五轮后保留率 96%。"
---

德国帕绍大学（University of Passau）与奥地利 IT:U Linz 合作的论文[《The Compaction Cliff in Long-Running AI Agent Memory》][paper1-url]（arXiv:2608.22752，2026-08-24 提交）发现：长程 Agent 的上下文预算溢出时，安全规则与情景日志按同一压缩率被摘要，但只有安全规则需要逐字精确才能保持可执行。在 `20` 个生产 agent 配置上实测 Claude Code 的 /compact 提示（Sonnet 4.6），一轮压缩后仅保留 `53%` 的安全规则，五轮后只剩 `10%`。论文将这种随压缩轮次累积的保真度断崖命名为 Compaction Cliff（压缩悬崖）。

## Knowledge Triage：按类型分流的知识保留策略

框架的核心是一个分类器，把 agent 知识库的每一行知识归入四种类型之一，每种类型走独立的保留策略；三个确定性算子覆盖上下文管理的三类操作。TypeCompact 按类型保真度原地改写条目，压缩时不丢弃安全规则；TypeDecompose 把大到无法安全压缩的主题拆成子主题，并把跨主题的适用规则复制到每个分区；TypeRetrieve 从外部存储取回条目时，让适用范围内的规则优先于相关性置顶返回。

三个算子都是确定性规则逻辑而非 LLM 调用，这是它与 [《CompactionRL——将上下文压缩引入强化学习》][links-2] 的关键区别：后者把压缩能力作为策略学出来，本文则用可验证的算子保证行为边界。框架还配一个校验器，检查每条约束是否存活；任何一条缺失，输出即被标记为 unsafe。

## 五个语料与三个下游基准的结果

在 `5` 个公开语料上，TypeCompact 在每个压缩率下保留的安全规则数都是最强单次 LLM 压缩器的 `2-4` 倍，五轮后 recall 达 `96%`。TypeDecompose 的 locality violation（分区破坏主题完整性的比例）为 `0%`，均匀分区是 `93%`；TypeRetrieve 的 recall@50 为 `100%`，最佳单次 LLM 检索器为 `73%`。

下游行为基准上，医疗合规域对生产 Sonnet 压缩器的 paired McNemar 检验 p < 1e-8（N=200），零售任务通过率击败全策略与分层基线（p < 0.01，N=115），航空域 p = 0.024。论文同时开源 AgentArtifactCorpus：来自 `54,628` 个公开 GitHub 仓库的 `396,934` 个 agent 配置，以及分类器与参考实现。

## 与相关工作及边界条件

该结果与 [《七个模型在代码库里记错了同一个地方》][links-1] 构成互补：连贯性债务证明缺失一个事实恰好损失它支撑的工作，本文则显示压缩会主动侵蚀已存在的事实；安全规则是其中一类特殊事实，被摘要改写后 agent 失去的不是 token 数而是可执行性。对照 [《追踪错误生命周期以识别长程Agent轨迹中的关键失败》][links-3] 对长程轨迹失败模式的刻画，压缩悬崖属于运行期上下文管理层的系统性失效，而非单次推理错误。

边界条件有二：生产实测绑定 Claude Code /compact 提示与 Sonnet 4.6 的 `20` 个配置，其他工具与模型上的悬崖高度未测；整套机制依赖分类器正确识别安全规则行，误分类会直接破坏分流策略。

## References
- [The Compaction Cliff in Long-Running AI Agent Memory（arXiv:2608.22752v1）][paper1-url]
- [一分钟读论文：《七个模型在代码库里记错了同一个地方》][links-1]
- [一分钟读论文：《CompactionRL——将上下文压缩引入强化学习》][links-2]
- [一分钟读论文：《追踪错误生命周期以识别长程Agent轨迹中的关键失败》][links-3]


[paper1-url]: https://arxiv.org/abs/2608.22752
[links-1]: {{ site.baseurl }}/one-minute-read-paper-coherence-debt-working-set/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-compactionrl/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-trajdebug-error-lifecycle-agent-trajectories/
