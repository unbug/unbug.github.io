---
layout: post
title: 一分钟读论文：《Blindfold 如何攻陷具身大模型》
author: unbug
categories: [AI Security, AI]
image: assets/images/blindfold-embodied-llm.svg
tags: [AISecurity, EmbodiedAI, Jailbreak, ACMsenSys]
description: "ACM SenSys 2026 论文的 Blindfold 攻击把恶意指令拆成语义无害的动作序列，对具身大模型实现最高 99.2% 攻击成功率，语义级防御几乎失效。"
---

ACM SenSys 2026 论文[《Blindfold: Jailbreaking Embodied LLMs via Action-level Manipulation》][paper1-url]（arXiv:2603.01414）提出针对具身大语言模型的**Blindfold** 攻击框架：把恶意意图拆解为逐个语义无害的动作序列，绕过只看语言层面的安全机制，在 Phi-4 上攻击成功率达 `99.2%`，GPT-4o 也有 `93.2%`。

具身 LLM 让 AI 通过自然语言指令和物理动作与真实世界交互，也带来新漏洞：每一步都看似无害的指令链，仍然可能导致危险的物理后果。

## 攻击设计与效果
Blindfold 采用**对抗代理规划**（Adversarial Proxy Planning）策略，在黑盒环境之外攻陷一个本地代理 LLM 来生成攻击，包含三个模块：

- **命令转换器**：把恶意意图翻译成动作链，例如"破坏用户的手机"被改写为 `find(phone) → pick(phone) → move(oven) → stretch()`，单看每个动作都平平无奇
- **意图混淆器**：识别动作链中最危险的主导动作，注入上下文相关的掩护动作（如在放入烤箱前插入"找苹果→拿苹果"）稀释语义信号，规避检测
- **规则验证器**：用有限状态机检查每个动作的物理可行性，检测冲突并反馈，通过规划器-验证器循环迭代，保证攻击真的可执行

在具身 AI 模拟器和真实 6DoF 机械臂上的评测显示，各模型攻击成功率（ASR）与任务成功率（TSR）如下：

| 模型 | ASR | TSR |
|------|-----|-----|
| Phi-4-14B | 99.2% | 82.3% |
| GPT-4o | 93.2% | 77.6% |
| Claude-3.5-Sonnet | 91.8% | 74.2% |
| Llama-3.1-70B | 89.4% | 71.8% |

攻击之所以奏效，是因为被评测的具身模型逐条检查动作的语言安全性，而不维护一条"当前动作序列会把物理系统带向什么状态"的轨迹模型。`find(phone) → pick(phone) → move(oven)` 每一步都通过语言审查，组合起来却是一次把手机放进烤箱的完整伤害路径。相对 SOTA 基线，Blindfold 的攻击成功率最高提升 `53%`。传统防御迁移到具身场景后大面积失效：Llama-Guard 只降低 `7.6%` 成功率，SafeDecoding 降低 `4.8%`，效果最好的 VeriSafe 也只降低 `17.9%`，三重防御叠加下攻击成功率仍有 `16%`。

## 从语言审查到后果意识
评测同时覆盖了闭环执行：任务成功率（TSR）衡量攻击动作在环境中真正完成的比例，Phi-4 上达到 `82.3%`，说明攻击不仅骗过审查，还能落地为完整的物理动作序列。三个发现值得记住。**语言安全不等于物理安全**：语义级防御读不懂动作的物理后果，逐个无害的动作可以拼出有害的轨迹。**越强的模型越危险**：GPT-4o 等能力更强的模型被攻破后造成实际伤害的能力也更强。**防御必须升级维度**：论文建议多模态对齐——整合实时视觉等环境线索而非只依赖语言语义；以及动作级推理——对智能体完整动作轨迹建模，正式验证是否违反全局安全约束。

当 AI 能撬动物理世界时，检查语言层面的安全性远远不够，具身 AI 的安全机制需要从"审查说了什么"转向"预判会发生什么"。

![Blindfold 动作级攻击流程与各模型成功率示意图]({{ site.baseurl }}/assets/images/blindfold-embodied-llm.svg)

延伸阅读：模型内部安全的另一面见[《LLM Agent 会主动搞阴谋吗》][rel1]。

## References
- [Blindfold: Jailbreaking Embodied LLMs via Action-level Manipulation][paper1-url]
- [arXiv:2603.01414 论文页][paper1-url]


[paper1-url]: https://arxiv.org/abs/2603.01414
[rel1]: {{ site.baseurl }}/scheming-propensity-paper/
