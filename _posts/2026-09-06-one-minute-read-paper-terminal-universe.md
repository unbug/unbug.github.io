---
layout: post
title:  "一分钟读论文：《旧轨迹里挖出新环境》"
author: unbug
categories: [AI]
image: assets/images/terminal-universe-trajectory-env.svg
tags: [llm, agents, post-training, code]
description: "阿里 Qwen 团队与清华合作的预印本提出 Terminal-Universe：回放轨迹里的文件操作即可重建可执行终端环境，从公开轨迹产出 37.3k 个任务充分环境，SFT 后单轮基准提 11.9 分、多轮提 13.8 分。"
---

以阿里 Qwen 团队为主力、合作清华大学的论文[《Terminal-Universe: Turning Agent Trajectories into Scalable Terminal Environments》][paper1-url]（arXiv:2609.04148，2026 年 9 月 3 日提交，14 位作者）提出一个判断：终端代码智能体（terminal agent，在命令行环境里执行任务的大模型智能体）后训练的真正瓶颈不是轨迹数量，而是可执行环境。一条轨迹是一次性冻结的示范，一个环境却能反复生成无数可验证任务并返回真实执行反馈。论文的结论是环境不必从零合成——已有轨迹里的工具执行历史本身就泄露了环境的结构与内容。按这个思路构建的 Terminal-Universe 框架从公开终端智能体轨迹中产出 `37.3k` 个 task-sufficient 环境（指足以支撑任务验证的环境）。

需要先划清边界：这是未经同行评审的预印本，「环境藏在轨迹里」是作者的主张而非学界定论；文中 `+11.9` 与 `+13.8` 两个数字均指 SFT（监督微调）后模型相对基线的提升分数，不是绝对成绩。

## 环境重建：回放文件操作再补齐缺口

Terminal-Universe 的核心机制分两步。第一步回放：轨迹记录了智能体对文件系统的每一次读写操作，把这些文件操作逆向回放到起点，就能把每个文件恢复到智能体修改之前的状态，得到一个残缺但真实的部分工作区。第二步补全：交给 completion agent（补全智能体）推断并补齐缺失的文件与依赖，把一个能跑起来、可反复出题的可执行环境还原出来。换言之，训练数据的再加工从样本级推到了环境级——不需要专门的模拟器或人工搭建的沙箱，别人跑过的轨迹就是矿。

在此之上，论文沿两个轴扩展任务。宽度轴挖掘相关环境之间的方向性依赖，合成跨代码库的查询任务；深度轴引入 user agent（模拟用户追问与反馈的智能体），把单轮查询扩展成带迭代反馈的多轮会话。

## 实测：单轮提分，多轮提分更多

论文把框架应用于公开的终端智能体轨迹，得到 `37.3k` 个 task-sufficient 环境，并用这份语料对 Qwen3.5-27B 做 SFT。结果分两个口径：单轮任务上，Terminal-Bench 2.1（终端智能体的公开基准）相对基线提升 `11.9` 分；多轮任务上，EvoCode-Bench v2 的 MT@4 指标（多轮会话口径的通过类指标）提升 `13.8` 分。多轮的增益大于单轮，与框架专门做了 user agent 多轮化设计的取向一致。

## 与轨迹评估那篇的方向区分

这篇论文和已发的[《推理链里的顿悟时刻，多半是预算给的错觉》][links-1]恰好站在轨迹的两端：那篇把轨迹当被审视的对象，拆穿从轨迹外部读数时的预算混淆；这篇把轨迹当原材料，从里面反向工程出训练用的环境。同一个数据物，一个是评估口径的质疑，一个是数据合成的增量，读的时候可以对照着看。对做智能体后训练的团队，可迁移的启发是：先盘点手头已有轨迹里的工具调用记录，那里可能已经躺着重建环境的原料，而环境才是能反复生题、持续给反馈的那一层资产。

## References
- [Terminal-Universe: Turning Agent Trajectories into Scalable Terminal Environments][paper1-url]
- [HTML 全文（方法细节与实验表格）][links-2]
- [站内：推理链里的顿悟时刻，多半是预算给的错觉][links-1]


[paper1-url]: https://arxiv.org/abs/2609.04148
[links-1]: {{ site.baseurl }}/one-minute-read-paper-trajectory-budget-confounds/
[links-2]: https://arxiv.org/html/2609.04148v1
