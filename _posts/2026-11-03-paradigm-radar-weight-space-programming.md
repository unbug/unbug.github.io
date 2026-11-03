---
layout: post
title:  "AI 范式雷达：《模型的配方摊在桌面上》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-weight-space-cover.svg
image_alt: "封面：左为七日 HN 事件点阵与分数，右为权重可编程的三层结构"
tags: [open-weights, model-editing, interpretability, inference, coding-agent, paradigm-radar]
description: "Hacker News 七日事件簇实测：MIT CSAIL 博客证明前沿模型能原生读写神经网络权重拿下 2526 分，RISC-V CPU 被编译进 Qwen 权重，五个 27B 小模型组队打平前沿大模型，开源权重正从黑盒调用品变成可读可写可编译的编程介质。"
---

`2026` 年 `10` 月 `25` 日至 `11` 月 `2` 日的 Hacker News 上，实测到 `6` 个同主题高分事件帖（最高 `2526` 分，`2026-11-03` 复测）：被讨论的对象不是某个新模型，而是「模型权重本身可以被读写、编译与组队」这件事——开源权重正在从调用品变成可编程介质。

## 七日事件簇实测

事件按时间线排开（分数为 `2026-11-03` Algolia 实测）：

- `10-25` GVS5H：五个 Qwen3.8-27B 组队打平前沿大模型（`195` 分）
- `10-26` IBM CEO 称开源权重模型已经又好又便宜（`428` 分）
- `10-27` 五家推理服务商同时上架去安全化 DeepSeek（`100` 分）
- `10-29` Qwenputer：一台确定性 RISC-V CPU 被编译进 Qwen3.5 权重（`704` 分）
- `10-31` Memdoor：五个 Qwen3.8-27B 在 LiveCodeBench Hard 击败前沿模型（`456` 分）
- `11-02` Astra 能读写权重改进 Qwen（`2526` 分，`259` 评论）

簇内密度罕见：八天六帖、两个仓库、两个独立博客，全部指向同一个动作——对权重本体动手，而不是对提示词动手。

![七日 HN 事件点阵与权重可编程三层结构]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-cover.svg)

## 三个一手源说了什么

热度最高的 Astra 结果出自 MIT CSAIL 博客《Sparks of Weight-Space Programming》（`11` 月 `2` 日发布，作者 Rikiya Takehi、Jayden Teoh、Alex Zhang、Omar Khattab）。TL;DR 原句为 "We find that frontier LLMs are surprisingly good at natively reading and writing neural network weights, well past what we'd expect from humans or conventional algorithms."——前沿大模型无需工具辅助即可直接读写神经网络的权重，远超人类和传统算法的预期。评论区已经有人在讨论这是否是实验室为递归自我改进（RSI）做的内训外溢，但作者未做此声称。

Qwenputer 是同一个方向的极端演示：一篇个人博客把一台完整的确定性 RISC-V CPU 编译进了 stock Qwen 3.5 4B 的权重里，利用其 Gated DeltaNet 层当 RAM 运行，作者 Divyansh Agrawal 把它称为「compiled weights」。它没有实用价值，但有范式价值：权重只要能编码一台 CPU，就说明它是通用介质而不是玄学参数。

供给端同步在动：Memdoor 仓库（`336` 星，`10` 月 `5` 日创建）与 GVS5H 仓库（`1182` 星，Persis Capital 研究实验室）都声称五个 Qwen3.8-27B 的编队能在 LiveCodeBench Hard 打平单个前沿大模型，Memdoor README 承诺每轮成绩公开可查。这属于自报口径，第三方独立复现还没有。

## 反面证据与边界

这个簇的热度里掺着三类水分。其一，Astra 是博客而非同行评审论文，读写权重在多大模型规模、多通用领域成立尚无答案，评论区最集中的质疑正是 "does it cap at small model sizes and common domains"。其二，五小模型打平大模型的两个仓库都来自非学术机构，评测基准单一（LiveCodeBench Hard），价格优势（五分之一）与单卡可跑的卖点都是卖方叙述。其三，把 CPU 编译进 4B 模型是精巧玩具，作者自己列了 limits 一节。

但方向性信号不依赖单点成立：同窗口内去安全化模型已有五家商用服务商供给、企业高管公开背书开源权重成本线、权重读写与编译连发——单独看是六个热点，合起来看是一条链：**读权重（可解释）→ 写权重（可修改）→ 编权重（可装载）→ 组权重（可复制编排）**。

## 对做工具的人意味着什么

站内[《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)讲过 AI 工具链被当成供应链资产管理；这层变化更激进：资产本体（权重）变成可改写文本。可预见的空位集中在「改写之后的守门」——权重变更的审计与 diff 工具、改写后模型的行为回归测试、以及五小模型编队这种多副本工作流的路由与一致性校验。防御工具链投毒的人都知道，管道里最危险的是没人能读懂的包裹；而权重，恰恰是所有人都读不懂的那种。

模型配方的桌面已经摊开，读得懂、改得对、验得住的中间层，还没有人真正占住。


## References
- [Sparks of Weight-Space Programming][links-1]
- [Qwenputer: a RISC-V CPU inside Qwen3.5][links-2]
- [guregodevo/memdoor][links-3]
- [slee-persis/GVS5H][links-4]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-5]


[links-1]: https://rikiyat.github.io/blog/weight-space-programming/
[links-2]: https://divagr.com/blog/qwenputer
[links-3]: https://github.com/guregodevo/memdoor
[links-4]: https://github.com/slee-persis/GVS5H
[links-5]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/
