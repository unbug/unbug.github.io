---
layout: post
title:  "一分钟读论文：《自进化智能体的陪练式高分陷阱》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/skill-policy-coevolution-trap.svg
tags: [llm, ai-agents, self-improving, evaluation, skill-library]
description: "阿里、港理工与UIC论文发现：技能库与策略共进化的自进化智能体，在技能库被改写后最坏成功率比训练峰值低5到13个百分点，抹掉技能库增益的52%到93%，现有评测协议存在系统性盲区。"
---

阿里巴巴、香港理工大学与伊利诺伊大学芝加哥分校的论文[《Evolving Together, Failing Apart》][paper1-url]发现：技能库与策略模型共同进化的自进化智能体，一旦技能库被改写，最坏情况成功率比训练峰值低 `5-13` 个百分点，抹掉技能库增益的 `52-93%`。

论文 `2026` 年 `10` 月 `14` 日发布于 arXiv（编号 `2610.20845`），第一作者 Yujie Feng 隶属 Alibaba Token Hub。这里说的技能库（skill bank）是智能体在任务中积累并复用的可调用过程性技能，通常以文档形式保存；技能与策略共进化（skill-policy co-evolution）指训练过程中策略模型与技能库互相改进，是当前自进化智能体的主流范式之一。

## 共进化把智能体绑死在陪练技能库上

论文指出的盲区在评测协议：现有方法一律用训练时交付的那份技能库给智能体打分，模型与技能库是「陪练关系」。但部署之后，技能会被改写、新增或删除，频率远高于策略模型的重训节奏，智能体实际面对的是一份漂移后的技能库——训练目标与评测协议谁都没有覆盖它。

漂移的代价随训练加深而放大。六组设置里，不减干扰的成功率随共进化训练一路上扬：Skill RL-ALFWorld 从 `5.2%` 升到 `88.8%`，ARISE-AMC23 从 `15.5%` 升到 `87.4%`，Evolving-RL-Mind2Web 从 `16.4%` 升到 `25.2%`；但同一批检查点对技能库扰动的敏感度（论文实测的下降斜率）在十八个扰动轴与设置的组合中有十二个显著上升——模型越强，越离不开陪练它的那份库。

## 一次保持原义的改写就能掉分

跨四种共进化方法、五个基准（六设置）的统一结果是：最坏情况成功率比各自交付峰值低 `5-13` 个百分点，相当于抹掉交付技能库相对无技能基线增益的 `52-93%`。更扎心的是扰动类型：不改语义、只换措辞的保持原义改写，单项就在 ReSkill-ScienceWorld 上吃掉 `10.9` 分（该设置峰值 `50.3%`）。

![共进化训练中成功率上升但漂移敏感度同步上升]({{ site.baseurl }}/assets/images/skill-policy-coevolution-trap.svg)

论文同时给出边界：漂移后技能的最低成功率仍高于无技能基线，说明技能库并非失去价值，失败的本质是模型对特定技能库措辞的过拟合，即技能派生增益的丢失。作者提出 CODA 评测协议，用两个指标替代单一峰值：一致性率（保持原义编辑下的成绩保持）与抗腐蚀率（对污染技能的抵抗力），把共进化目标从「在陪练库上的峰值」改写为「驾驭技能库漂移的能力」。

## 对自建技能库智能体的提醒

对在生产环境跑技能库智能体的团队，论文的操作含义是三件事：发布测试必须包含技能改写与污染变体，而非只用训练交付库打分；技能修订节奏与模型重训节奏要显式对齐或解耦管理；把一致性率与抗腐蚀率纳入回归。站内[《技能各自合规，组合就出事》]({{ site.baseurl }}/one-minute-read-paper-cosa-conflict-of-skills-attack/)研究过技能库的对抗性注入攻击，这篇则证明不需要攻击者——日常维护产生的自然漂移就足以让峰值成绩大幅退坡，两份证据共同指向：技能库已成为与模型权重同级的维护面。

论文目前为预印本（PDF 页眉标注 Preprint. Under review.），未声明代码开源，复现需自行实现扰动协议。


## References
- [Evolving Together, Failing Apart: The Skill-Policy Co-evolution Trap in Self-Improving Agents][paper1-url]
- [站内：《技能各自合规，组合就出事》][links-1]


[paper1-url]: https://arxiv.org/abs/2610.20845
[links-1]: {{ site.baseurl }}/one-minute-read-paper-cosa-conflict-of-skills-attack/
