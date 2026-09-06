---
layout: post
title:  "一分钟读论文：《数据喂饱了，算法还饿着》"
author: unbug
categories: [AI]
image: assets/images/one-shot-opd-state-coverage.svg
tags: [llm, distillation, post-training, reasoning]
description: "清华大学团队预印本报告 on-policy 蒸馏的数据极简极限：单条 query 的在线蒸馏即可覆盖全量训练约 71.5% 的访问状态，`16` 条追平全量；瓶颈不在数据量，而在学生对教师监督的吸收速度。"
---

以清华大学为主力的团队发布预印本[《Rethinking On-Policy Distillation of Large Language Models II: One Training Example》][paper1-url]（arXiv:2609.04172，2026 年 9 月 3 日提交，13 位作者，合作机构包括中国科学院大学、Northeastern University、UIUC 与 Johns Hopkins University），报告了 on-policy distillation（在线蒸馏：学生模型自己采样回答，教师逐 token 给出密集监督）在数据极简极限下的表现：只用一条训练 query，蒸馏就能持续上行数百步，恢复全量数据蒸馏收益的大部分。需要先划清边界——这不是「一条数据训出完整模型」，而是说在这类后训练里，数据量远没有想象中金贵。与已发的[《推理链里的顿悟时刻，多半是预算给的错觉》][links-2]聚焦评估方法不同，这篇考察的是训练本身的数据极限与机制。

## 状态覆盖：一条 query 能走多远

这里的学生状态，指学生自己采样出的回答前缀——教师的监督恰好逐 token 落在这些前缀上。论文提出一个可测量的新轴 state coverage（状态覆盖）：全量数据蒸馏在训练中访问过的学生状态集合里，一个小 query 集的采样轨迹能覆盖多大比例。按这个口径，作者发现单条 query 就能达到全量数据的 `71.5%`，而且大部分覆盖在前 `100` 步内就到账；换语义不同的 query，覆盖率与验证精度同步上升，`16` 条 query 覆盖到 `98.9%`，追平全量训练。论文把结论限定在数学任务与所测模型家族上，并报告该效应跨模型家族和任务领域稳健。

![单条 query 的状态覆盖曲线示意]({{ site.baseurl }}/assets/images/one-shot-opd-state-coverage.svg)

## 瓶颈在算法吸收，不在数据供给

如果一条 query 就能访问大部分状态，多出来的数据买到了什么？作者把训练拆成两个变量分别测量——学生访问哪些状态，以及学生对齐教师的速率——对齐测量给出了另一半答案：无论喂一条还是全量数据，学生对教师的对齐速度都以相似速率放缓，哪怕把状态集固定不动，吸收这些监督也需要数百步。论文据此给这套在线蒸馏下了一个自造的诊断词——data-overfed but algorithm-starved（数据喂饱了，算法饿着）：学生的 rollout 很快摊开足够广的监督面，真正稀缺的是算法把这些监督吃进去的速率。需要说明，state coverage 是这篇论文提出的测量框架，不是学界既有定论，且全文为未经同行评审的预印本。

## 多教师设定与实操含义

论文的延伸实验把结论推广到 multi-teacher（多教师）蒸馏：每个领域只用 `16` 条语义多样的 query，即可追平全量数据的多教师训练；用内容轻量的模板 query、甚至跨域的 WildChat 真实用户对话，也能接近真实领域 query 基线的表现。对实操的含义是直接的：后训练预算未必该继续堆数据，query 之间的语义差异比条数重要，而算法侧的吸收效率——学习率、优化步数这类训练动力学旋钮——才是更值得投入的方向。代码已在 GitHub 开源，本文是 2026 年 4 月同系列论文（arXiv:2604.13016）的续篇。

## References
- [论文 abs 页][paper1-url]
- [前作 Rethinking On-Policy Distillation I][links-3]
- [代码仓库 One-Shot-OPD][links-4]


[paper1-url]: https://arxiv.org/abs/2609.04172
[links-2]: {{ site.baseurl }}/one-minute-read-paper-trajectory-budget-confounds/
[links-3]: https://arxiv.org/abs/2604.13016
[links-4]: https://github.com/Thinking-Space/One-Shot-OPD
