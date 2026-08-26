---
layout: post
title:  "一分钟读论文：《写进记忆的一句话，让后续回答都偏了方向》"
author: unbug
categories: [AI, Security]
image: assets/images/injecmem-memory-injection.svg
tags: [llm, agent, memory, safety]
description: "上海交通大学与蚂蚁集团的 InjecMEM 论文证明，无需读写记忆库权限，一次交互即可把对抗指令写进 LLM Agent 的记忆：MemGPT 上条件攻击成功率 48.6%，而能彻底拦截的困惑度过滤会误杀 71.8% 的良性检索。"
---

上海交通大学（Shanghai Jiao Tong University）与蚂蚁集团（Ant Group）合作的论文[《InjecMEM: Memory Injection Attack on LLM Agent Memory Systems》][paper1-url]（arXiv:2608.23471，2026-08-24 提交）提出了一种针对 LLM Agent 记忆系统的注入攻击：攻击者只需与 agent 进行`单次交互`，不需要读取或修改记忆库的任何权限，就能让后续相关查询的回答被导向预指定输出。在 MemGPT 系统上，该攻击的条件攻击成功率（ASR-c）达 `48.6%`，联合口径（ASR-j）为 `18.1%`；在 MemoryOS 上分别为 `76.6%` 与 `35.6%`。

## 注入记录由锚点加对抗指令构成

记忆系统普遍采用 retrieve-then-generate 机制：先检索相关记忆，再把检索结果拼进提示词生成回答。InjecMEM 利用这一点构造注入记录，包含两部分。**锚点**（anchor）携带高召回的主题线索，让后续同主题查询在检索时稳定命中这条记录；**对抗指令**（adversarial command）是一段短序列，通过基于梯度的坐标搜索（gradient-based coordinate search）优化，对提示词模板、插入位置和长上下文都保持鲁棒。论文还扩展到跨 backbone 联合优化：同一条对抗指令在多个模型上共同训练，用于研究它在一个 backbone 上习得后能否迁移到其他模型。

## 两个记忆系统上的攻击效果

实验覆盖 MemGPT 与 MemoryOS 两套记忆系统，backbone 使用 Qwen2.5 系列（默认 Qwen2.5-7B-Instruct）、Llama-3.1-8B-Instruct 与 Mistral-7B-Instruct-v0.3。评测数据由 LLM 合成跨 `19` 个领域的多轮对话，每个领域围绕一个连贯主题展开若干轮次，再随机插入记忆库以模拟真实积累过程。核心指标有三个：检索成功率 RSR、条件攻击成功率 ASR-c（已知注入记录被检索到之后回答命中目标的概率）与联合口径 ASR-j（把检索与生成两步合并计算的概率）。

- MemoryOS：RSR `46.5%`，ASR-c `76.6%`，ASR-j `35.6%`
- MemGPT：RSR `37.2%`，ASR-c `48.6%`，ASR-j `18.1%`

作为对照，DPI、BadChain 与原始 GCG 等既有提示注入方法在记忆增强生成场景下的成功率全部归零，而 InjecMEM 的 Multi-GCG 变体成为首个在该场景下取得攻击成功的方法（ASR-c `76.6%`）。
论文报告攻击在记忆漂移（memory drift）下仍然有效，且自称非目标查询不受影响。需要强调的是，这些结论只在上述小参数模型与两个记忆系统上验证，不能推广到所有 agent 或所有记忆系统。这与 [《长程 Agent 记忆中的压缩悬崖》][links-1] 形成对照：一篇研究记忆如何被压缩，这篇研究记忆会被如何攻击。

## 检索时过滤的防御权衡

论文把 LLM-as-a-Judge、ProtectAI、PromptGuard 与困惑度过滤（perplexity filtering）四类检测器接在检索环节做过滤，并额外报告良性拦截率 BBR（benign blocked rate）衡量效用损失。默认阈值下，前三种检测器能降低但无法消除毒化检索：LLM-as-a-Judge 的 RSR 从 `46.5%` 降到 `36.2%`，ProtectAI 与 PromptGuard 分别降到 `39.1%` 与 `35.2%`。困惑度过滤在阈值取 `40`（论文扫描后能完全压制攻击的最大阈值）时是唯一能把攻击彻底打没的方法：RSR 归零、ASR-c 与 ASR-j 均为零，代价是写入阶段误杀 `71.8%` 的良性记忆记录。这是单方法的效用代价，并非所有防御都不可用，但安全与效用的权衡确实显著。论文同时开源了完整的攻击框架（GitHub: BlueBlood6/InjecMEM），为记忆系统的安全加固提供了可复现的评测基线。

## References
- [InjecMEM: Memory Injection Attack on LLM Agent Memory Systems][paper1-url]
- [一分钟读论文：《长程 Agent 记忆中的压缩悬崖》][links-1]


[paper1-url]: https://arxiv.org/abs/2608.23471
[links-1]: /one-minute-read-paper-compaction-cliff-agent-memory/
