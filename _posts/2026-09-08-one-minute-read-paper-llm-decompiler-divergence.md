---
layout: post
title:  "一分钟读论文：《通过全部测试的反编译代码为何仍不可信》"
author: unbug
categories: [AI, Security]
image: assets/images/decompile-diverge-llm-decompiler.svg
tags: [llm, security, decompilation, evaluation]
description: "论文用模糊测试对照发现，大模型反编译产物通过全部自带测试后仍有 4.9% 与原始程序行为分歧，最高单系统达 13%，只看能否编译的评测指标正在奖励错误路径。"
---

论文[《When LLM Decompilers Recompile More and Preserve Less》][paper1-url]（arXiv:2609.05370，作者 Chang Liu、Edward Raff、Kristopher Micinski，提交于 2026-09-04，2026-09-08 查阅）给出一个直接动摇当前评测口径的结论：以大模型为内核的反编译工具产出的代码，即使能通过全部随附测试，仍有 `4.9%` 在合法输入上与原始程序行为分歧，单一系统最高达 `13%`——也就是说，只看「能不能编译、过不过测试」这两项主流指标，会系统性地把错误路径评为更优。

## 两项主流指标为何漏掉两类失败

反编译是从已编译的机器代码恢复高级语言源码的过程，是漏洞检测与恶意软件分析的基础。Ghidra、Hex-Rays 等传统反编译器会把无法解析的部分显式留成占位符，产出的伪代码常常编译不过也跑不起来；大模型方案则输出干净、地道的 C 代码，因此几乎完全由可重编译性（能否构建）和可重执行性（能否通过随附的输入输出测试）来评判。论文指出这套指标会奖励错误的路径：一个函数可以顺利重编译并通过每一个随附测试，却在其他合法输入上与原程序分歧；一处已披露漏洞甚至可以在重编译产物中「无声消失」，崩溃不再复现，也不留任何可见痕迹。这两类失败，现有测试套件都抓不到。

## Decompile-Diverge：用模糊测试做行为对照

为补上这个缺口，论文提出 Decompile-Diverge，一个不依赖固定或手工测试用例的行为对比 oracle（判定器）：对每个函数自动合成调用 driver，从参考实现出发扩充模糊测试语料，再让反编译产物在相同输入上重跑，比对行为是否改变。在 `8 个系统在 9 种配置`下、基于既有大模型反编译语料的评测中，通过全部随附测试的候选仍有 `4.9%` 与原程序分歧，单一系统最高 `13%`。在 `300 个真实 GitHub 库函数与 287 个 CVE 关联函数`上，可重编译性与行为一致性出现了明显背离：最强的精化大模型（refinement LLM）把 Ghidra 的构建率从 `75%` 提到 `90%`，行为匹配率却从 `74%` 降到 `62%`；在已披露漏洞子集上，最高约十分之一的漏洞在其输出中出现崩溃缺失（Crash Absence）。

![大模型反编译的评测缺口：构建率上升与行为匹配率下降同时发生，模糊测试对照揭示通过全部随附测试后的行为分歧]({{ site.baseurl }}/assets/images/decompile-diverge-llm-decompiler.svg)

## 把不确定性藏进语义的代价

源码级分析显示，分歧源于大模型引入的字段（fields）、类型（types）、被调用函数（callees）和防护条件（guards）——它们把传统工具留下的「可见的未知」替换成了「看不见的错」。本刊此前解读的[轨迹预算指标错觉研究][links-2]与此同属「指标幻觉」一条轴：当评测只度量表层可用性，模型就学会把不确定性藏进指标测不到的地方。安全关键场景的实操含义是把可重编译性降级为必要条件而非充分条件，叠加行为等价测试（合成 driver 加模糊语料），并保留传统工具「宁留占位符、不编假代码」的文化。

边界同样要说清：模糊测试语料不是穷尽证明，分歧率是给定输入集合上的下界观察；这套 oracle 依赖参考实现可得，没有原始程序时无从对照；且论文为预印本，尚未经过同行评审。

## References
- [When LLM Decompilers Recompile More and Preserve Less (arXiv:2609.05370)][paper1-url]
- [一分钟读论文：轨迹与预算指标错觉][links-2]


[paper1-url]: https://arxiv.org/abs/2609.05370
[links-2]: {{ site.baseurl }}/one-minute-read-paper-trajectory-budget-confounds/
