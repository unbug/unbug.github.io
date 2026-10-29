---
layout: post
title:  "一分钟读论文：《编码 Agent 的分层经验复用》"
author: unbug
categories: [AI, LLM]
image: assets/images/stair-hierarchical-trajectory-abstraction.svg
tags: [llm, coding-agents, agent-memory, agentic-coding]
description: "STAIR 框架把编码代理历史修复轨迹抽象成分层可复用计划；搭配开源模型 MiniMax M2.5 在 SWE-bench Verified 达 81.2% Pass@1 排名第一，框架质量可弥补模型能力差距。"
---

Concordia University 与华为团队的论文[《Reusing Past Repairs Through Hierarchical Trajectory Abstraction》][paper1-url]（arXiv:2607.29658）提出把历史修复轨迹变成可复用计划的 STAIR 框架。

论文针对一个被忽视的浪费：软件维护占开发生命周期的 `50%-70%`，而 SWE-agent、AutoCodeRover、OpenHands 等 LLM 驱动的自主代码修复代理把每个 issue 当作独立任务，运行结束即丢弃历史修复轨迹中的程序性知识。STAIR（分层轨迹抽象框架）把历史修复轨迹转化为多层次、可复用的计划，使代理能从过去经验中学习。

![STAIR 分层轨迹抽象：35 个原始步骤逐级抽象为中层策略与高层原则，SWE-bench Verified 达 81.2% Pass@1]({{ site.baseurl }}/assets/images/stair-hierarchical-trajectory-abstraction.svg)

## 程序性记忆的三个缺口

认知科学研究显示，人类专家解决新问题时本质上是在做案例推理（case-based reasoning，从记忆中检索类似案例、提取可迁移策略并适配当前情境）。现有代码修复代理的行为则类似「失忆症患者」：两个高度相似的 issue 先后提交给同一个代理，代理仍会像第一次遇到一样重新探索修复过程。近期研究（Lingxi、SWE-Exp、ExpeRepair）开始探索知识复用，但有三个局限：仅以单一粒度表示知识；检索到的知识直接注入提示而不适配目标 issue；未关联相似修复轨迹以提取反复出现的模式。

## 四层闭环与分层抽象

STAIR 的核心创新是**分层轨迹抽象**，框架由四个模块构成「收集-抽象-检索-应用」闭环。**程序性知识构建**：在被解决的历史 issue 上运行修复代理收集轨迹，按故障定位、规划、执行与验证三阶段组织。**分层轨迹抽象**：两个基于 LLM 的操作符迭代构建层次结构——分组操作符把共享一致程序意图的连续步骤划分为一组，抽象操作符把每组提炼为包含修复意图、关键动作、适用条件和常见陷阱的结构化节点。一个典型 Django issue 修复从 Level 0 的 `35` 个细粒度步骤，抽象为 Level 1 的中层策略（「功能被 UI 阻止时，还要检查后端是否直接拒绝」），最终提炼为 Level 2 的高层原则（「在每个系统层级强制意图，而非仅可见入口点」）。**指导检索与计划生成**：基于文本相似度评分、LLM 验证器过滤和排序，把抽象指导适配为针对当前问题的可执行计划。**计划引导的问题解决**：阶段特定计划在修复中注入代理提示，引导但不强制。

## 结果、边界与迁移性

在 SWE-bench Verified（`500` 个真实 GitHub issue）上，**STAIR + MiniMax M2.5（开源权重模型）达到 `81.2%` Pass@1**，在所有对比代理中排名第一；STAIR + GPT-5 达到 `79.2%`，与基于 Claude 4.5 Opus 的 Sonar Foundation Agent 持平，框架质量可弥补骨干模型差距。消融实验验证了层次化抽象的贡献：完整多层抽象（`76.0%`）优于仅低层（`62.4%`）、仅高层（`56.8%`），远超无抽象的原始轨迹（`53.6%`）；混合多个抽象级别比任何单一级别高出 `13-19` 个百分点。跨代理泛化测试中，STAIR 计划无需代码修改即可转移到 mini-SWE-agent v2，Pass@1 从 `75.8%` 提升至 `81.0%`，token 用量减少约 `3.5%`。

边界同样明确：**冷启动问题**——预处理成本约 `211` 美元（`479` 个轨迹），新仓库积累足够历史前无法获得有效指导；分组与抽象均基于 GPT-5，计划质量受底层模型制约；实验仅限 Python 代码库；回退分析显示约 `19%` 的情况下 STAIR 未解决而基线解决了，多源于计划不完整或执行偏离。本站[《追踪错误生命周期以识别长程Agent轨迹中的关键失败》]({{ site.baseurl }}/one-minute-read-paper-trajdebug-error-lifecycle-agent-trajectories/)与[《软件智能体的修复策略探索》]({{ site.baseurl }}/one-minute-read-paper-phoenixrepair-rethinking-repair-strategy-exploration-in-software-agents/)同属把修复轨迹变成结构化知识的线索。

## References
- [Reusing Past Repairs Through Hierarchical Trajectory Abstraction for Coding Agents（arXiv:2607.29658）][paper1-url]
- [PhoenixRepair: Rethinking Repair Strategy Exploration in Software Agents][links-1]
- [Case-Based Reasoning: Foundational Issues][links-2]
- [追踪错误生命周期以识别长程 Agent 轨迹中的关键失败（站内解读）][links-3]
- [软件智能体的修复策略探索（站内解读）][links-4]


[paper1-url]: https://arxiv.org/abs/2607.29658
[links-1]: https://arxiv.org/abs/2607.18859
[links-2]: https://content.iospress.com/articles/ai-communications/aic16-04-01
[links-3]: {{ site.baseurl }}/one-minute-read-paper-trajdebug-error-lifecycle-agent-trajectories/
[links-4]: {{ site.baseurl }}/one-minute-read-paper-phoenixrepair-rethinking-repair-strategy-exploration-in-software-agents/
