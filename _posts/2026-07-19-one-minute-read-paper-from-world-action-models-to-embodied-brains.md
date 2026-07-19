---
layout: post
title:  "一分钟读论文：《From World Action Models to Embodied Brains》"
author: unbug
categories: [ai-agent, embodied-ai]
image: assets/images/wam-roadmap.svg
tags: [world-models, embodied-ai, wam, physical-intelligence, agentic-systems]
---

本文是对 arXiv:2607.11689 的系统性解读。该论文由上海人工智能实验室与南京大学的研究团队联合提出，题为《From World Action Models to Embodied Brains: A Roadmap for Open-World Physical Intelligence》。文章系统梳理了从传统世界模型到 World Action Models（WAMs）的演进路径，并提出了以"具身大脑"为核心的协同进化路线图，为开放世界的物理智能研究提供了清晰的框架指引。

## WAM 与三个关键断层

World Action Models（WAMs）是传统世界模型的直接继承者，但做出了关键性的扩展。传统世界模型的核心任务是学习环境的动态规律——给定当前状态和动作，预测下一个状态的分布。这类模型在封闭环境中取得了显著成果，但当环境从封闭转向开放时，其局限性暴露无遗：它们擅长"看"和"想"，却不擅长"做"。WAMs 的核心创新在于将动作空间纳入模型的内生表征，不再仅仅预测环境的未来状态，而是学习如何将模型输出转化为具体的工具调用、控制器指令和验证日志。

论文敏锐地识别出当前研究中的三个结构性断层：第一是模型角色与表征的不兼容——不同来源的模型各自为政，缺乏统一的语义对齐机制；第二是目标和标准化缺失——没有一个公认的基准来衡量 WAM 在开放世界中的真实能力；第三是系统组成碎片化——数据采集、模型训练、部署执行等环节被割裂在不同的工具链中。这三个断层相互强化：表征不兼容导致数据孤岛，缺乏标准使得碎片化工具链更加根深蒂固，而碎片化又反过来加剧了表征层面的分歧。

## 具身大脑与闭环进化

针对上述断层，论文提出了"具身大脑"（Embodied Brain）的概念框架。其核心思想是将 WAMs 作为预测功能原型，通过物理 harness（Physical Harness）这一中间层，将模型的内部表征转化为可执行的行动序列。物理 harness 承担三重职责：将模型输出映射为工具调用指令、生成控制器级别的底层控制信号、收集执行过程中的验证日志形成反馈闭环。

这一框架的关键创新在于共享契约机制——通过定义统一的接口规范，异构的模型、数据源、任务类型和机器人平台可以在同一套协议下协同工作。更重要的是，论文引入了闭环后训练（Closed-Loop Post-Training）机制：将物理世界中已验证的成功交互转化为可复用的经验，持续反哺模型的进化。这种"行动-验证-学习"的循环使得具身大脑能够在真实环境中不断自我改进。

## 对 AI Agent 领域的意义

这篇论文标志着 AI 研究的一个重要转向——从"感知-认知"范式向"感知-认知-行动"闭环范式的演进。当前大语言模型驱动的 Agent 系统普遍面临"纸上谈兵"的问题：在仿真中表现优异，但在真实物理世界中却难以落地。WAMs 和具身大脑的提出恰好填补了这一鸿沟——它让智能体不再仅仅依赖文本推理来规划行动，而是通过内生的世界理解来指导物理交互。当模型能够真正理解自身动作对物理世界的因果影响时，AI Agent 才可能跨越从数字世界到物理世界的最后一道门槛。

## References

1. Yuanzhi Liang, Xufeng Zhan, Haibin Huang, Chi Zhang, Xuelong Li. From World Action Models to Embodied Brains: A Roadmap for Open-World Physical Intelligence. arXiv:2607.11689, July 2026.
