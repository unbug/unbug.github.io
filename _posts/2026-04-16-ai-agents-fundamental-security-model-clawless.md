---
layout: post
title:  "一分钟读论文：《ClawLess 代理安全模型》"
author: unbug
categories: [AI, Security]
image: assets/images/ai-clawless-security.svg
tags: [ai-safety, autonomous-agents, security-model, clawless]
description: "ClawLess 论文在最坏情况下假设 Agent 本身已被攻陷，用形式化验证的策略、用户态内核与 BPF 系统调用拦截强制约束 AI Agent 的信息检索和代码执行，不依赖训练或提示词调节。"
---

论文[《ClawLess: A Security Model of AI Agents》][paper1-url]针对自主 LLM Agent 能自主检索信息、执行代码带来的安全风险，提出不依赖训练调节的形式化安全框架 ClawLess：在最坏情况威胁模型下——即假设 Agent 本身可能已被攻击者控制——通过形式化验证的策略、用户态内核和 BPF 系统调用拦截，强制限制 Agent 的信息流与代码执行，无论 Agent 内部如何设计都能生效。

![AI Agent 根本安全模型]({{ site.baseurl }}/assets/images/ai-clawless-security.svg)

## 为什么训练和提示词不是安全边界
传统 AI Agent 安全主要依赖**训练调节**和**提示工程**：前者通过对齐训练让模型拒绝危险请求，后者在系统提示里写清楚什么不能做。问题在于，这两类手段都是概率性的，既无法提供形式化保证，也存在被绕过的风险——间接提示注入只要把恶意指令藏进网页、文档或 API 响应里，就可能让模型把攻击者的话当成任务执行。更麻烦的是，训练调节的效果无法验证：没有一个测试能证明模型在任意输入下都拒绝危险操作。

ClawLess 的出发点正是放弃“说服模型守规矩”，转向**架构层面的强制**：定义细粒度的安全执行边界，阻止未授权的信息检索和危险代码执行，把安全属性交给可验证的策略而非模型的概率性行为。

## 形式化模型与强制执行
ClawLess 围绕三类对象建立形式化安全模型：**系统实体**（进程、文件、网络端点）、**信任范围**（哪些实体属于同一可信域）和**权限**。在此基础上表达能随 Agent 运行时行为动态调整的策略，例如“来自不可信网页的上下文，不得将数据流向网络外发工具”。

这些策略会被翻译成具体安全规则，由一个增强型用户态内核执行，配合基于 **BPF 的系统调用拦截**，在操作系统层面挡住越权操作。这种做法把形式化安全模型与实际执行连接起来：安全保证不取决于 Agent 用的是哪个模型、有没有被注入，最坏情况下 Agent 完全敌对，边界依然在。

## 与传统安全模型的衔接
自主 LLM Agent 的安全风险与传统软件存在本质差异：在基于 LLM 的代理中**指令即数据**，传统“代码与数据分离”的安全边界在 Agent 场景中失效。当 Agent 执行“浏览网页并总结”这类任务时，攻击者可以在 HTML 中嵌入恶意指令，要求把本地配置文件上传到攻击者控制的 URL；Agent 将该内容作为上下文摄入后，无法区分用户总体目标与恶意局部指令，进而通过合法工具完成数据窃取。

ClawLess 给出的答案是回到系统安全的经典武器——最小权限、信息流控制、沙箱强制执行——但把它们重新表述为面向 Agent 生命周期的动态策略。对运行 OpenClaw 这类高权限代理的用户，直接启示是：缺乏执行沙箱化、直接以宿主用户权限运行的 Agent，一旦上下文被污染，攻击面等于宿主用户的全部权限。

## References
- [ClawLess 论文原文][paper1-url]
- [相关研究：OpenClaw 自主代理的安全威胁分析][links-1]


[paper1-url]: https://arxiv.org/abs/2604.06284
[links-1]: {{ site.baseurl }}/taming-openclaw-llm-agent-security/
