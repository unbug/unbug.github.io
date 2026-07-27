---
layout: post
title:  "一分钟读论文：《Agentic Real2Sim：用视觉语言代理实现物理世界建模》"
author: unbug
categories: [AI, Robotics]
image: assets/images/agentic-real2sim-framework.svg
tags: [agent-foundation-models, world-models, embodied-ai, real-to-sim]
---

UCLA、MIT 和 UCSD 联合团队发表的论文[《Agentic Real2Sim: Physics-based World Modeling with Vision-Language Agents》][paper1-url]提出了一种全新的真实世界到仿真环境的自动化转换框架。该研究利用视觉语言代理（VLM Agent）将真实世界的物体-机器人交互记录自动转换为可仿真的"episodic twin"，保留了观测数据、几何结构、机器人交互信息和物体状态，为下游机器人策略学习提供了低成本的高质量仿真环境。

## 真实到仿真的自动化瓶颈

在机器人学习中，从真实世界获取高质量训练数据成本高昂——需要精密传感器、大量标注时间和昂贵的物理实验设备。传统的 Real2Sim（Real-to-Sim）流程高度依赖人工：研究人员必须手动完成视觉重建、物理参数推断和仿真器组装，整个过程耗时数天甚至数周，且对操作者的专业技能要求极高。

这一瓶颈严重限制了机器人策略学习的可扩展性。即使收集了大量真实交互数据，如果无法高效地转换为可仿真的环境，这些数据就无法被大规模复用。现有的自动化方法往往只能处理单一类型的物体或场景，缺乏通用性和鲁棒性。

## Agentic Real2Sim 框架

Agentic Real2Sim 的核心创新在于将 VLM Agent 作为"智能胶水"，自动完成从真实观测到可仿真环境的完整转换流程。该框架包含四个关键步骤：首先通过视觉重建提取场景的几何结构；其次利用 VLM Agent 推断物理参数（如质量、摩擦系数）；然后进行坐标系对齐和网格清理；最后组装为完整的仿真环境。

与传统方法不同，Agentic Real2Sim 不需要人工干预每个环节——VLM Agent 根据观测数据自主决策每一步的操作策略。这种"代理驱动"的方法使得框架能够处理多样化的场景，包括刚性物体操作、可变形物体交互和人形运动等复杂情况。

## 实验评估与结果

论文在多个真实世界场景中进行了评估，使用开源 VLM 后端（如 Qwen2.5-VL）以极低的成本实现了与前沿模型相当的转换成功率。在刚性物体操作任务中，生成的仿真环境能够准确复现真实物理交互；在可变形物体（如布料、绳索）交互场景中，框架同样展现了良好的泛化能力。

关键优势在于成本效益：整个 Real2Sim 流程仅需使用开源 VLM 后端，无需昂贵的专有模型，使得该方法具有极高的可及性和可扩展性。生成的"twin"环境可直接用于下游机器人策略学习和评估，显著降低了机器人学习的门槛和成本。

## References

- [Agentic Real2Sim: Physics-based World Modeling with Vision-Language Agents][paper1-url]
- [arXiv:2607.19190][links-1]


[paper1-url]: https://arxiv.org/abs/2607.19190
[links-1]: https://arxiv.org/pdf/2607.19190
