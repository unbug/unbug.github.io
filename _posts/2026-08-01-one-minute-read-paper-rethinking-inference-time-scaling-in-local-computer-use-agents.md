---
layout: post
title:  "一分钟读论文：《重新思考本地计算机使用 Agent 的推理时扩展》"
author: unbug
categories: [AI, Engineering]
image: assets/images/computer-use-agents-scaling-framework.svg
tags: [computer-use-agents, inference-time-scaling, agentic-coding, test-time-compute]
---

韩国研究团队发表的论文[《Rethinking Inference-Time Scaling in Local Computer-Use Agents: Failure Modes and Compute Tradeoffs》][paper1-url]系统性地研究了推理时扩展在本地计算机使用 Agent 中的有效性，发现额外计算往往产生递减回报并改变失败模式而非提高成功率。在对四个开源模型和 OSWorld 基准的评估中，上下文扩展改善轨迹稳定性但收益随 token 成本饱和，时间扩展减少停滞却不显著提高任务成功率——更长的视界往往延长错误轨迹而非纠正它们。

## 核心问题：推理时扩展的局限性

随着计算机使用 Agent（CUA）在隐私、成本和实用性方面的需求增长，本地部署越来越重要。然而，在严格硬件约束下提升本地模型性能仍然困难。近期研究表明推理时扩展——在执行期间增加计算——可以改善前沿 CUA 的性能，但这种策略对资源受限的本地模型是否有效尚不清楚。

论文的核心问题是：**推理时扩展能否有效提升本地 CUA 的性能？如果不能，失败模式如何变化？**

## 四维度扩展框架

研究从四个维度系统评估推理时扩展。**上下文扩展**通过提供历史信息改善轨迹稳定性，但收益随 token 成本增加而饱和，失败模式从重复或停滞轨迹转向过早错误成功。**时间扩展**减少最大步骤停滞，但不显著提高任务成功率——更长的视界往往延长而非纠正错误轨迹。

**结构分解**在本地两阶段 Agent 中引入规划和格式化开销，部分缓解失败但代价高昂。**并行扩展**进一步部分缓解上述问题，但以大幅增加计算成本为代价。这四个维度覆盖了推理时扩展的主要策略空间，提供了全面的实证图景。

## 实验评估与关键发现

研究评估了 Qwen3-VL-8B/30B-A3B、UI-TARS-1.5-7B 和 OpenCUA-7B 四个模型在 OSWorld 基准上的表现。核心发现是：**额外计算不提高成功率，而是改变失败模式**。上下文扩展将失败从"重复停滞"转移到"过早错误成功"——这意味着 Agent 不是做得更多，而是更早地做出错误判断并停止探索。

时间扩展的实验结果尤为反直觉：更长的执行视界没有纠正错误轨迹，反而延长了它们。这表明本地模型缺乏在长程任务中自我修正的能力——增加计算只是让错误走得更远。结构分解和并行扩展虽然部分缓解了这些问题，但计算成本大幅增加，在实际部署中可能不具可行性。

## References

- [Rethinking Inference-Time Scaling in Local Computer-Use Agents][paper1-url]


[paper1-url]: https://arxiv.org/abs/2607.28573
