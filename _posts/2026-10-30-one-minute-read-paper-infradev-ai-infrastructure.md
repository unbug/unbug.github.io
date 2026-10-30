---
layout: post
title:  "一分钟读论文：《谁来验收AI基建的代码》"
author: unbug
categories: [AI, Engineering]
image: assets/images/infradev-coding-agents-ai-infra.svg
tags: [llm, agent, agentic-coding, benchmark]
description: "爱丁堡大学联合腾讯混元发布InfraDev基准，用36个多GPU真实任务测编码Agent开发训练与推理框架的水位：最强模型仅解决38.9%，隐藏探针还毙掉通过官方测试提交的32%，失败模式写成规范文档能补10.5个百分点。"
---

爱丁堡大学联合腾讯混元的论文[《InfraDev》][paper1-url]（arXiv:2610.36589）测了编码 Agent 开发 AI 基建（训练、推理、强化学习框架的代码）的水位：`36` 个真实任务上，最强模型 `GPT-6 Sol` 只解决 `38.9%`，隐藏探针还毙掉 `32%` 通过官方测试的提交。

论文全称 InfraDev: Can Coding Agents Develop AI Infrastructure, and How Can We Tell?，是 `2026` 年 `10` 月 `27` 日提交的预印本。任务取自 `Megatron-LM`、`vLLM`、`verl` 三个生产仓库在 2025 年 1 月至 2026 年 9 月合并的 `21,389` 个 pull request，只保留跨多文件、必须多 GPU 跑对的真改动，最终 `36` 个：训练 `19`、推理 `10`、强化学习 `7`。六个前沿模型在每个任务上各跑一次，独占一台 `8` 卡 NVIDIA H800/H20 节点，限时 `2.5` 小时。

## 官方测试本身在放水

论文最锋利的一刀砍向打分器：现有基准拿 PR 自带的官方测试判卷，而这些测试对 AI 基建并不完整。`36` 个 PR 里 `24` 个没有任何测试检查数值结果；`15` 个性能优化 PR 里 `13` 个没有任何测试检查承诺的提速，跳过优化的补丁照样通过。作者的对策是联合合成 hidden probes（隐藏探针：新写的验收测试，只要求通过合并时的正确补丁，不泄露解法，接口写进 prompt），两头堵住蒙混过关的路。

结果：`216` 份提交中 `102` 份全过官方测试，只有 `69` 份同时过得了探针，探针毙掉这 `102` 份里的 `32%`；加上探针后，六个模型的解决率全部下降 `11` 到 `19` 个百分点。站内[《删掉一个前缀，近满分的投毒防御当场裸奔》]({{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/)同样提醒过评估口径的分量。

## 38.9% 就是当前天花板

以官方测试加探针联合打分，`GPT-6 Sol` 的解决率 `38.9%`，是六机之首；它每任务平均耗时 `43.9` 分钟、估算 API 成本 `5.37` 美元、消耗 `20.86M` tokens（按牌价估算，每任务只跑一次，无方差），口径是全部测试通过的解决率，不是通用编程能力分。分类别看，推理任务最难：每个模型在 `10` 个推理任务里都只解决 `1` 个。更扎手的对照来自 prompt：直接拿 PR 原始的 GitHub 描述当任务书，没有任何模型解决哪怕一个任务，缺失接口说明的提示词，杀伤力比测试更大。

对 `1,754` 个失败测试用例的归因显示，结构性错误与状态性错误占主导，Agent 自写的测试几乎从不检查 memory、time、traffic（显存占用、运行耗时、通信流量），且三分之二的错误被多数模型共享，不同厂商的模型在栽同样的跟头。工程侧的副产品是共享执行环境：跨任务复用依赖与产物，在 Megatron-LM 和 vLLM 上省 `52–57%` 存储、`13–14%` 构建时间。论文同时提醒，`32%` 的假阳性是探针互证口径，由论文自建探针裁决，不是独立的 ground truth。

## 一份规范文档值 10.5 个百分点

把失败模式整理成 AI 基建开发规范的 agent skill（给 Agent 的说明文档）后，`GPT-5.6 Sol` 的解决率在 `19` 个任务的 Megatron-LM 子集上从 `42.1%` 升到 `52.6%`，提升 `10.5` 个百分点；干预对象不是榜单冠军 `GPT-6 Sol`。论文称将开源 InfraDev，但尚未上线；全文为未经同行评审的预印本，数字均为论文自测口径。对做 agent 工程的人来说，这个实验的提示很朴素：先把领域验收规范写进交接文档，再谈模型能力天花板。

## References
- [InfraDev: Can Coding Agents Develop AI Infrastructure, and How Can We Tell?（arXiv:2610.36589）][paper1-url]
- [删掉一个前缀，近满分的投毒防御当场裸奔（站内解读）][links-1]


[paper1-url]: https://arxiv.org/abs/2610.36589
[links-1]: {{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/
