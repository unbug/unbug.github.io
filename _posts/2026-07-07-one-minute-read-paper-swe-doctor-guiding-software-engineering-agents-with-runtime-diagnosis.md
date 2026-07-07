---
title: "一分钟读论文：《SWE-Doctor——用多面 Bug 复现测试引导 Agent》"
author: unbug
categories: [AI, SoftwareEngineering]
image: assets/images/swe-doctor.svg
tags: [swe-agent, bug-reproduction-tests, runtime-diagnosis, multi-faceted-testing]
layout: post
---

本文讨论的论文是 SWE-Doctor: Guiding Software Engineering Agents with Runtime Diagnosis from Multi-Faceted Bug Reproduction Tests，arXiv:2607.00990，由新加坡国立大学和中国科学技术大学联合完成。论文链接：https://arxiv.org/abs/2607.00990

软件开发Agent在自动修复Bug方面取得了显著进展，但一个根本性问题长期被忽视：现有的Bug复现测试（BRT）仅仅作为补丁生成后的验证工具使用，其丰富的运行时信息从未被用于指导生成过程本身。SWE-Doctor的核心主张是——如果把BRT从"事后验尸报告"升级为"实时诊断仪"，Agent的补丁生成质量将发生质的飞跃。这一转变的关键在于让测试数据在生成阶段就发挥作用，而非仅在完成后充当裁判角色。

## 问题发现与多面BRT方案

论文首先做了一个关键实验：直接将BRT的执行结果反馈给Agent，看能否改善补丁生成效果。结果出乎意料——不仅没有提升，反而暴露了两个系统性陷阱。

第一个陷阱是fail-to-fail类型的BRT会误导Agent。这类测试用于验证Bug确实存在（即复现失败），但当它被用作生成引导信号时，Agent容易过度拟合这些失败的测试用例，导致补丁偏离正确方向。第二个陷阱是fail-to-pass类型的BRT仅覆盖单一表现路径。一个测试只能描述一种预期行为，当Bug修复涉及多个方面时，单一的pass条件无法提供足够的诊断信息，Agent因此倾向于生成只满足该特定测试的partial patches——即部分补丁，它们让某个测试通过了，却可能引入新问题或遗漏其他需要修复的地方。这两个陷阱共同说明了一个事实：简单的反馈信号不足以指导复杂的代码修改任务。

SWE-Doctor的解决方案是构建完整的运行时诊断流水线：从多角度生成覆盖不同行为维度的复现测试，在真实环境中执行并收集堆栈跟踪、变量状态等调试信息，最后整合为结构化的诊断记录作为补丁生成的输入信号。Agent不再面对孤立的"通过/失败"二元判断，而是获得包含执行路径和异常信息的完整诊断视图，从而理解Bug的根本原因而非仅仅让某个测试通过。

## 效果验证与启示

论文在SWE-bench Verified和SWE-bench Pro两个基准上进行了系统评估。在SWE-bench Verified上，平均解决率达到75.7%；在更具挑战性的SWE-bench Pro上达到59.4%，相对基线方法提升8.0到8.9个百分点。这些提升覆盖了10种LLM与不同基准的组合，所有组合均优于现有方法。多面BRT方法还有效减少了partial patches的产生，意味着生成的补丁不仅通过了测试，而且更可能是完整、正确的修复方案，而非仅仅满足局部条件的临时修补。

SWE-Doctor揭示了一个被长期忽视的优化空间：Bug复现测试中蕴含的运行时诊断信息是一个尚未被充分开发的富矿。将BRT从验证工具升级为生成引导工具，不仅提升了Agent的补丁质量，也为软件工程自动化提供了一个新的设计范式——让反馈回路从单向验证变为双向诊断。

## References

- SWE-Doctor: Guiding Software Engineering Agents with Runtime Diagnosis from Multi-Faceted Bug Reproduction Tests, arXiv:2607.00990, https://arxiv.org/abs/2607.00990
