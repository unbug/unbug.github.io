---
layout: post
title:  "一分钟读论文：《规划者至关重要：面向长程规划的高效非对称多智能体协作框架》"
author: unbug
categories: [AI, Agent]
image: assets/images/2026-05-10-planner-matters-unbalanced-multi-agent.svg
tags: [multi-agent, planning, reinforcement-learning, asymmetric-architecture]
---

北京大学、清华大学和DeepSeek合作的一篇论文[《Planner Matters! An Efficient and Unbalanced Multi-agent Collaboration Framework for Long-horizon Planning》][paper1-url]，提出了一种非对称多智能体协作框架，通过实验发现**规划是影响长程任务性能的主导因素**，执行和记忆管理所需的计算资源和模型容量显著更少。

传统多智能体系统通常假设所有角色的能力需求对等，论文通过系统性消融实验推翻了这一假设。规划器负责高层决策和任务分解，执行器负责具体操作，记忆管理器负责上下文推理。三者中，规划器的能力直接决定了任务能否被正确分解和推进，而执行和记忆管理的作用相对次要。

## 非对称架构设计

论文的核心贡献是提出了**规划中心强化学习（Planning-Centric Reinforcement Learning）**方法。该方法的关键洞察是：在长程规划任务中，**规划器是系统瓶颈**。

具体设计如下：

**仅优化规划器**。论文使用基于视觉语言模型（VLM）作为裁判的轨迹级奖励信号，仅对规划器进行强化学习训练。执行器和记忆管理器在训练过程中被冻结，不参与参数更新。这种设计大幅降低了训练的计算成本，因为强化学习的主要开销集中在规划器上。

**非对称模型容量**。规划器使用较大的模型（如`Qwen2.5-72B`），而执行器和记忆管理器可以使用更小的模型（如`Qwen2.5-7B`甚至更小的专用模型）。实验表明，即使执行器使用显著降级的小模型，整体任务性能下降幅度远小于规划器能力下降带来的影响。

**角色解耦**。三个角色通过标准化接口通信，而非紧耦合的单一模型。规划器输出结构化任务指令，执行器解析并执行，记忆管理器提供历史上下文。这种解耦使得各组件可以独立优化和替换。

## 非对称 vs 对称架构的实验对比

论文在多个基准上进行了对称与非对称架构的系统对比：

**WebArena导航任务**。非对称架构使用规划器`Qwen2.5-72B`加执行器`Qwen2.5-7B`，达到了与全量`Qwen2.5-72B`对称架构相当的性能水平，但推理成本降低约`70%`。当执行器进一步降级到`Qwen2.5-3B`时，性能仅下降`2-3个百分点`。

**OSWorld操作系统控制**。在需要多步GUI交互的任务中，规划器的决策质量对最终成功率影响最大。消融实验显示，将规划器从`72B`降级到`14B`导致任务成功率下降超过`30个百分点`，而将执行器从`72B`降级到`7B`仅导致不到`5个百分点`的下降。

**工具使用基准**。在需要调用多个API的工具使用场景中，规划器负责选择正确的工具链和调用顺序，执行器负责参数构造和API调用。实验表明，规划器的工具选择准确率是任务成功的关键指标，而执行器的参数构造错误率即使达到`10%`，只要规划器选择了正确的工具链，整体成功率仍能保持在较高水平。

## 计算效率的实际意义

非对称架构的计算效率优势体现在两个层面：

**训练成本**。由于仅优化规划器，强化了学习的样本量和计算量大幅减少。论文报告训练成本仅为对称架构的约`30%`。

**推理成本**。在非对称架构中，执行器和记忆管理器可以使用量化或蒸馏后的小模型，推理延迟显著降低。对于Web导航等需要快速响应的场景，这种效率提升具有实际工程价值。

## 对Agent系统设计的指导意义

本文的实验结果对Agent系统设计有两点重要启示：

**资源分配应遵循非对称原则**。在构建多智能体系统时，应将主要计算资源投入到规划组件，而非平均分配给所有角色。这类似于计算机科学中常见的瓶颈分析思路——优化系统整体性能的关键在于解决最薄弱环节。

**可降级性设计**。非对称架构天然支持组件降级。当计算资源受限时，优先降级执行器和记忆管理器，对整体性能影响最小。这一特性使得Agent系统可以在不同算力条件下灵活运行。

## References

- [Planner Matters! An Efficient and Unbalanced Multi-agent Collaboration Framework for Long-horizon Planning][links-1]
- [WebArena: A Realistic Web Environment for Building Autonomous Agents][links-2]
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks][links-3]


[paper1-url]: https://arxiv.org/abs/2605.02168
[links-1]: https://arxiv.org/pdf/2605.02168
[links-2]: https://github.com/web-arena-x/webarena
[links-3]: https://github.com/xlang-ai/OSWorld
