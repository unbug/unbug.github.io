---
layout: post
title:  "一分钟读论文：《LLM 智能体推理全景路线图》"
author: unbug
categories: [AI, Agent]
image: assets/images/arxiv-paper-agentic-reasoning-survey.svg
tags: [Agentic Reasoning, LLM Agent, Reinforcement Learning, Multi-Agent, Survey]
description: "UIUC、Meta、Amazon、Google DeepMind 等机构联合发表智能体推理综述，提出基础、自我进化、集体三层框架，梳理两种优化模式、六大应用与评测基准，并指出个性化、世界模型、治理等六个开放问题。"
---

伊利诺伊大学厄巴纳-香槟分校（UIUC）、Meta、Amazon、Google DeepMind、加州大学圣地亚哥分校（UCSD）、耶鲁大学等机构的团队发表综述[《Agentic Reasoning for Large Language Models》][paper1-url]，把大语言模型（LLM）从被动文本生成器重新定义为能通过持续交互进行规划、行动和学习的自主智能体，并系统梳理了这一领域的完整路线图。

## 从被动推理到主动智能

传统 LLM 推理是静态输入加单次前向传播得到固定输出，没有记忆、无法适应变化。智能体推理（Agentic Reasoning，指智能体在环境中多步规划、行动并从反馈中学习的推理方式）则把推理变成连接模型、记忆和环境的动态循环：多步迭代代替单次计算，外部记忆与状态追踪代替无状态输出，明确目标驱动的规划代替被动的提示反应。

![Agentic Reasoning]({{ site.baseurl }}/assets/images/agentic-reasoning-survey.svg)

## 三层框架与两种优化模式

综述提出三层互补维度的框架。**基础智能体推理**关注单个智能体在稳定环境中的基本技能：规划推理（分解目标、制定计划、验证结果）、工具使用优化（调用外部 API、执行代码）与智能体搜索，代表系统有交替思考与行动的 ReAct、集成推理与测试的代码智能体 OpenHands，以及 Toolformer、Gorilla、HuggingGPT 等工具使用框架。**自我进化智能体推理**通过反馈和记忆持续改进，包括自我批判与验证器指导的反馈机制、事实/经验/结构化记忆，代表系统有通过自我反思改进推理的 Reflexion、在 Minecraft 中持续学习技能的 Voyager、双智能体动态管理记忆的 Memory-R1。**集体多智能体推理**让多个智能体协作解决复杂问题，按领导者、工作者、批评者、记忆管理者、沟通促进者分类角色，代表系统有模拟产品流程协作的 MetaGPT、多智能体对话框架 AutoGen、用强化学习优化连接方案的 GPTSwarm。

在优化方式上，综述区分两种互补模式：**上下文推理**冻结模型参数，在推理时通过结构化编排、基于搜索的规划、自适应工作流设计导航复杂问题空间，代表如 Tree-of-Thoughts；**训练后推理**通过强化学习和监督微调把成功的推理模式固化到模型权重中，代表如 DeepSeek-R1、Search-R1、ToolLLM。

## 应用、基准与开放问题

综述覆盖**六大应用领域**：数学探索与编程智能体（竞赛级推理、多轮自我修正的 vibe coding，代表有 OpenHands、Cursor、Copilot）；科学发现智能体（自主设计湿实验室实验的 Coscientist、端到端机器学习实验自动化的 The AI Scientist、四智能体的 ARIA）；具身智能体（把语言锚定在机器人感知与导航中，代表有 SayCan、Gemini Robotics）；医疗智能体（症状分诊到临床试验优化，要求严格安全约束，代表有 ClinicalAgent、MedAgent-Pro）；以及自主网络探索与研究智能体（导航在线资源、直接操作软件界面的 GUI 智能体）。

评估基准分两类：**核心机制基准**涵盖工具使用（ToolQA、APIBench、T-Eval）、搜索（WebWalker、Mind2Web 2）、记忆与规划（LOCOMO、ALFWorld、PlanBench）、多智能体系统（SMAC、LLM-Coordination）；**应用级基准**包括具身（OSWorld、BALROG）、科学发现（ScienceAgentBench、DISCOVERYWORLD）、医疗（MedAgentGym）与网络智能体（WebArena、GAIA、AssistantBench）。

综述最后提出**六大开放问题**：以用户为中心的个性化推理、跨数天乃至数周的长时程推理、带世界模型的推理、多智能体协作推理与训练、更高效的潜在空间推理，以及智能体系统的安全性、透明度与治理。相关资源见项目仓库 [Awesome-Agentic-Reasoning][links-1]，也可参阅站内[《三个AI智能体组队修复仓库级问题》]({{ site.baseurl }}/enagent-ensemble-reasoning/)一文。

## References
- [Agentic Reasoning for Large Language Models][paper1-url]
- [Awesome-Agentic-Reasoning 项目仓库][links-1]


[paper1-url]: https://arxiv.org/abs/2601.12538
[links-1]: https://github.com/weitianxin/Awesome-Agentic-Reasoning
