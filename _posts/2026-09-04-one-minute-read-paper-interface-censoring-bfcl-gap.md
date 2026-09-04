---
layout: post
title:  "一分钟读论文：《同一份权重，换个接口就从不会调工具变成 0.96 分》"
author: unbug
categories: [AI, Engineering]
image: assets/images/interface-censoring-bfcl-gap.svg
tags: [llm, agent, tool-use, benchmark]
description: "香港城市大学论文在 BFCL v4 官方数据上固定权重只换 serving 接口，同一模型得分 0.00 或 0.96。工具调用率是模型与接口栈共同的属性，2x2 实验锁定契约错配，修复接口后通过率仅从 53 升到 62 且不显著。"
---

香港城市大学（City University of Hong Kong）的论文[《Interface-Induced Trajectory Censoring》][paper1-url]（arXiv:2609.03966，2026 年 9 月 3 日提交，单作者 Wenbo Wang）给出一个测量有效性层面的结论：Agent 评测里读到的工具调用率，不是模型单方面的属性，而是「模型加 serving 接口栈」这个整体的属性。所谓接口审查（interface censoring），指模型的调用在下游看到任何东西之前，就被 chat template 与 function-calling parser 的错配静默丢弃。上一篇[《跑通测试的补丁，三成过不了人类 review 这一关》][links-2]说的是智能体产出合不合格，这一篇更进一层：你看到的基准数字本身，可能连「它会不会调工具」都没测准。

## 只换接口，分数横跨整个量程

主实验约束极严：跑在 BFCL v4 官方数据上，executor 与 scorer 均为官方实现，权重、case、解码参数与随机种子全部固定，唯一变量是 serving adapter——即模型外面那层 chat template 与 parser 的配对配置。结果同一份模型在 `simple_python` 子集上得 `0.00` 或 `0.96`，`multi_turn_base` 上是 `0.19`。模型自始至终在发出格式正确的调用，是接口在服务器侧把它们全部吞掉了。作者自建探针复现了这个漏斗，覆盖 Qwen2.5-Coder 五个 checkpoint、21 倍的参数规模跨度：服务器解析率在每个规模都是 `0/100`，而模型发出的格式正确调用随规模上升，32B 处达到 `80/100`（对照第三方裁定金标准校准后约 72）。在 tau-bench 的 115 个交互式 retail 任务上，同一次 swap 让服务器解析出的调用从 `0` 到 `636`，触达任何工具执行的任务数从 `0` 到 `103`。需要强调边界：这是 BFCL v4 与 tau-bench 上被精确复现的接口层失效，论文并未断言所有基准的分数都不可信。

## 机制定位：两个主效应恰为零，全部效应在交互项

论文最有方法论价值的一步是一个 2x2 实验：chat template 有无，乘以 parser 有无。结果是**两个主效应恰为零，全部效应落在交互项**。翻译成工程语言：没有任何单个组件是坏的——单独加或减任一侧都观察不到差异；但当契约两侧不匹配时，只修其中一侧毫无用处。配套的预注册反事实同样干净：在接口契约对齐的匹配条件下，静默比例保持在 `0-2`，这条预测在跑实验之前就已写进开源仓库。还有一个更小的例子说明错配多么琐碎可解：Llama-3.1-8B 有 23% 概率把任务函数本身当工具调用，加上一个 `strict: true` 标志后归零。

## 训练回路里的零观测，和修不好的一半

错配的代价不止于评测读数，还会顺着 agentic RL 的训练回路放大：零调用意味着零执行、零观测，训练信号被静默抽干。论文限定在 verl 框架的 AgentLoop 中实测，且两个规模分开报告——7B 处 115 条生成中 45 条携带完整调用，被接受 `0`、执行 `0`、返回观测 `0`；1.5B 处同一个零是过决定的（模型本身也发不出足够调用），因此不能归因于接口单一来源。本文最诚实的转折在最后：评测期修复 adapter 能恢复机制，却没有显著的结果收益——解析量从 `0` 到 `84`、多轮挽救从 `0` 到 `9`，但 pass rate 只是从 `53` 到 `62`，统计上不显著。修好测量不等于修好能力：接口曾经压低的分数是虚低的，把它释放出来也不会白得一段更强的模型。作者配套发布了 98 行的 preflight 检查，可捕获文中所有静默失败，任何跑 agent 评测或 agentic RL 的团队都能在接入前几秒钟内自查模板与 parser 是否配对。

## References
- [Interface-Induced Trajectory Censoring][paper1-url]
- [上一期：跑通测试的补丁，三成过不了人类 review 这一关][links-2]


[paper1-url]: https://arxiv.org/abs/2609.03966
[links-2]: {{ site.baseurl }}/one-minute-read-paper-swegate-hidden-failure/
