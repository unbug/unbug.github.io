---
layout: post
title:  "一分钟读论文：《SABLE：智能体编排的先导化合物优化》"
author: unbug
categories: [AI, DrugDiscovery]
image: assets/images/sable-dmta-computational-twin.svg
tags: [drug-discovery, llm-agent, dmta, bayesian-optimization]
description: "北卡罗来纳大学教堂山分校开源 SABLE 框架，用 LLM 编排反应模板枚举、性质预测、亲和力打分与贝叶斯优化，构成 DMTA 分析的计算孪生体；METTL3 回顾性案例单次运行得到预测活性提升约 95 倍的候选分子。"
---

美国北卡罗来纳大学教堂山分校（UNC Chapel Hill）的论文[《A Modular Agentic Framework for Synthetically Constrained Multi-Objective Hit-to-Lead Optimization》][paper1-url]，提出开源智能体框架 SABLE（Synthetically-accessible Agentic Bayesian Ligand Exploration）：LLM 解析自然语言优化目标并路由任务，调度反应模板类似物枚举、ADMET 与理化性质预测、Boltz-2 结构亲和力打分、贝叶斯优化四类专用工具，构成药物发现「设计-合成-测试-分析」（DMTA）循环中分析与优先级排序阶段的**计算孪生体**。METTL3 回顾性案例中，单次运行即得到预测浓度 `102.33 nM` 的头部类似物（相对起始化合物约 `95` 倍预测活性提升），且论文明确该候选未经湿实验验证、属前瞻性优先级排序。

## 核心问题与方法

先导化合物优化要求在效力、选择性、药代动力学、安全性与合成可行性等竞争约束下迭代设计类似物，传统流程依赖人工逐轮执行 DMTA 循环。SABLE 将该循环的分析与优先级排序阶段搬到计算侧：用户以自然语言下达目标（如最小化对 METTL3 的预测亲和力），**LLM 编排层**解析出优化目标与迭代预算并路由任务；HEALER 反应模板引擎枚举合成可及的类似物库，RDKit 与 STOPLIGHT 提供理化性质和 ADMET 预测，Boltz-2 从蛋白序列与配体输入联合预测复合物结构与亲和力分数（logIC50），贝叶斯优化迭代挑选候选。每个数值输出均记录来源工具与调用参数、可逐条回溯；模块化架构下仅需编辑配置文件即可替换枚举引擎或表征后端。本站此前解读的 [BrainPilot 多 Agent 科研系统]({{ site.baseurl }}/one-minute-read-paper-brainpilot-automating-brain-discovery/) 同样以可追溯性为核心设计；SABLE 则把可溯源落到每个数值输出的工具级出处，复现所需提示词与 JSON 状态转储随代码仓库开源。

![SABLE 智能体编排架构：LLM 路由到四个专用工具，构成 DMTA 计算孪生体]({{ site.baseurl }}/assets/images/sable-dmta-computational-twin.svg)

## 实验结果

实验覆盖单目标、双目标与四靶点三类优化战役。单目标战役以 CAMKK2（UniProt Q96RR4）为靶点：最佳观测预测 logIC50 较种子改善 `1.03` 个 log 单位（–0.52 到 –1.55），前 `20` 名候选的累积分布在约 `5` 次迭代后进入平台期。双目标战役同时优化 Boltz-2 预测亲和力与类药性 QED，得到覆盖不同折中点的非支配解集。四靶点案例选取 BACE1、碳酸酐酶 XII、ABL1 与 S1P1 受体：ChEMBL 数据仅用于挑选低活性种子分子与参考化合物，优化过程未输入 SAR 轨迹或实验标签，唯一信号是 Boltz-2 分数；找到的类似物在预测亲和力上达到或超过各系列最佳化合物，其中 BACE1 的种子从预测 `58.88 µM` 改善到 `370 nM`。效率上，收敛前仅评估枚举库的一小部分，相对穷举筛选的 Boltz-2 推理调用节省量在 `10^3`–`10^6` 规模库上随库大小近似线性增长。METTL3 回顾性案例中，起始化合物预测 IC50 为 `9.77 µM`（实验值约 `7 µM`），单次运行得到的头部类似物即上述 `102.33 nM` 候选。

## 局限与风险

第一，**全部结果均为计算预测**：Boltz-2 在 SABLE 中只充当计算预言机（oracle，昂贵评估的代理模型）而非实测生化效力的替代；`95` 倍提升是预测值，头部候选未经任何湿实验验证。第二，回顾性案例存在对已知 SAR（构效关系）过拟合的风险；论文声明优化信号仅为 Boltz-2 分数、未输入 SAR 轨迹与实验标签，但 ChEMBL 种子选择本身来自已发表系列。第三，框架性能受限于枚举引擎反应模板的覆盖度与表征模型的校准质量，且缺少与其他 agentic 药物发现系统的正面基线对比；论文将其定位为支持而非取代药物化学评审与实验验证，把纳入真实 DMTA 实验闭环列为后续工作。

## References
- [SABLE 论文（arXiv:2608.11483v1）][paper1-url]
- [SABLE 代码仓库（Apache 许可开源）][links-1]


[paper1-url]: https://arxiv.org/abs/2608.11483
[links-1]: https://github.com/molecularmodelinglab/SABLE
