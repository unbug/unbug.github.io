---
layout: post
title: 一分钟读论文：《AlphaEvolve - 用 LLM 自动发现多智能体学习算法》
author: unbug
categories: [AI]
image: assets/images/alphaevolve-marl-algorithm-discovery.svg
tags: [AI, Reinforcement Learning, Multiagent, DeepMind]
---
想象一下：设计一个优秀的多智能体强化学习（MARL）算法需要多少人类专家的智慧和经验？传统算法设计完全依赖人类直觉，而 DeepMind 的 AlphaEvolve 系统正在打破这个瓶颈。

最新研究展示了一个革命性的范式：用 LLM 驱动的进化式编码代理，将算法源代码视为"基因组"，让 LLM 作为"基因操作器"来重写核心逻辑，从而自动发现全新的 MARL 算法。

核心成果：
1. **VAD-CFR**：波动自适应折扣 CFR，在迭代遗憾最小化领域超越了最先进基线
2. **SHOR-PSRO**：平滑混合乐观遗憾 PSRO，在群体训练领域实现了更优的经验收敛

技术创新包括非直观的机制设计（波动敏感折扣、一致性强制乐观、硬热启动策略累积调度）、混合元求解器（线性混合乐观遗憾匹配与温度控制的纯策略分布）以及动态退火策略（自动从群体多样性过渡到严格均衡发现）。

这项工作的意义在于：
- 实现了从人类手动设计算法到 AI 自动发现算法的范式转换
- 证明了 LLM 不仅能写代码，还能"创造"新算法，发现人类难以构想的非直观解决方案
- 在博弈论、多智能体系统、不完全信息博弈等领域具有广泛应用前景

正如 DeepMind CEO Demis Hassabis 所言，AGI 需要能够参与自身架构发展的 AI 模型，AlphaEvolve 正是这一方向的重要一步。

![AlphaEvolve：LLM 驱动的 MARL 算法发现](/assets/images/alphaevolve-marl-algorithm-discovery.svg)