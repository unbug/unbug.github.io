---
layout: post
title:  "一分钟读论文：《近端文本梯度下降驱动的智能体技能自进化》"
author: unbug
categories: [AI, Agent]
image: assets/images/skillprox-forward-backward-framework.svg
tags: [agentic-coding, self-evolving, agent-skills]
description: "香港科技大学与澳门大学提出 SkillProx，用闭环诊断演化加近端精炼双阶段框架实现智能体技能自进化，在三个表格基准上平均提升约 3 个百分点，分布外泛化显著更稳。"
---

香港科技大学与澳门大学的论文[《SkillProx: Self-Evolving Agent Skills via Proximal Textual Gradient Descent》][paper1-url]，针对智能体技能（由主指令文件 SKILL.md 和可选引用资源目录构成的结构化文本工件）提出受近端梯度下降（交替执行任务损失方向步与正则约束子问题求解的优化算法）启发的"前向-后向"双阶段框架：前向闭环诊断演化验证每次编辑的实际效果，后向效用感知近端精炼审计并收缩累积知识。在 SpreadSheetBench、WikiTQ 和 HiTab 三个基准上，SkillProx 相比最强基线 SkillGrad 平均提升约 `3.0` 个百分点，且分布外（OOD）泛化显著更稳：Qwen3.5-4B 下 SkillOpt 的 OOD 得分在 WikiTQ、HiTab 上分别跌至 `26.0` 和 `16.0`，SkillProx 则达到 `78.5` 与 `69.2`。

## 技能演化的两个核心问题

现有方法如 SkillGrad、SkillOpt 和 EvoSkill 在技能演化中暴露出两个根本缺陷。第一个是**无验证的前向更新**：LLM 生成的诊断被直接当作有效更新方向提交，未经重新执行验证实际效果，某些看似合理的编辑反而降低任务性能。第二个是**不受控的技能增长**：迭代打补丁使技能膨胀为重复指令、冲突启发式与过度泛化的特定解法；留一法审计发现存在负效用知识单元——移除它们反而将准确率从 `46%` 提升到 `54%`。SkillProx 将技能演化形式化为复合优化问题：最小化任务损失（期望准确率）与文本复杂度（总字符数）的加权和，为双阶段设计提供理论基础。

## 前向-后向双阶段框架

![SkillProx 闭环诊断演化与近端精炼双阶段框架]({{ site.baseurl }}/assets/images/skillprox-forward-backward-framework.svg)

核心创新是将技能演化分解为两个正交阶段，分别对应标准近端梯度下降的前向梯度步与后向近半步。**前向——闭环诊断演化**：在当前技能上执行训练批次后，诊断器分析失败轨迹、成功轨迹与拒绝原因提出编辑方向（智能体轨迹中的错误分析方法可参考[《追踪错误生命周期以识别长程 Agent 轨迹中的关键失败》]({{ site.baseurl }}/one-minute-read-paper-trajdebug-error-lifecycle-agent-trajectories/)）；Patcher 生成候选技能后在同批次重执行验证，仅当硬准确率与平均单元格准确率同时不下降才接受更新，被拒绝的编辑及其性能变化注入后续诊断形成语义历史。**后向——验证门控近端精炼**：将技能解析为可审计的知识单元（二级章节与三级引用组），对每个单元执行冻结留一法效用审计计算边际贡献，按单元格效用升序排列、负效用优先处理；Shrinker 生成的临时副本须满足结构有效、复杂度严格降低、硬准确率不下降且单元格准确率降幅不超过阈值。前向决定哪些新知识进入技能，后向决定哪些累积知识保留。

## 实验结果与局限

在 Qwen3.5-4B、Qwen3.5-27B 和 Qwen3.6-27B 三个骨干模型上的实验提供了关键证据。IID 任务上 SkillProx 全面领先：Qwen3.6-27B 下 SpreadSheetBench `54.5`（最佳）、WikiTQ `86.2`、HiTab `80.0`（最佳），较 SkillGrad（`50.0/84.8/78.3`）分别提升 4.5、1.4、1.7 个百分点；相比人工编写技能（`36.7/85.7/78.0`）IID 提升高达 `17.8` 个百分点。消融实验验证两阶段独立贡献：完整 SkillProx（`54.5`）优于仅 Prox（`53.0`）与仅闭环诊断（`52.0`），移除 Prox 降幅更大（-2.5pp），说明仅靠前向编辑会积累冗余内容。压缩-准确率权衡显示，tau=-0.001 时达到最佳准确率 `52.3%` 同时压缩 25.7%，即使移除 74.9% 技能内容仍保留 `51.0%` 准确率；最终技能长度与 IID 硬准确率负相关（r=-0.628）。局限方面，评估仅覆盖三个高度结构化的表格基准，效果能否推广到更开放的编程或推理场景未知；留一法审计需对每个知识单元执行完整评估，LLM 调用开销大；Prox 门控基于固定验证集，存在过拟合风险。

## References
- [SkillProx 论文（arXiv:2608.07449v1）][paper1-url]
- [SkillProx 代码仓库][links-1]


[paper1-url]: https://arxiv.org/abs/2608.07449v1
[links-1]: https://github.com/Steven011018/SkillProx
