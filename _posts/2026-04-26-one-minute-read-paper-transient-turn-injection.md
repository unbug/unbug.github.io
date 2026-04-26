---
layout: post
title:  "一分钟读论文：《瞬态轮次注入：暴露大语言模型的无状态多轮漏洞》"
author: unbug
categories: [AI, Security]
image: assets/images/transient-turn-injection.svg
tags: [PromptInjection, LLM, Security, AIAgents]
---

孟加拉国贾加纳特大学与巴里萨尔大学合作发表的论文[《Transient Turn Injection: Exposing Stateless Multi-Turn Vulnerabilities in Large Language Models》][paper1-url]，首次提出了一种名为**瞬态轮次注入（Transient Turn Injection, TTI）**的新型攻击范式，揭示了当前主流大语言模型在无状态 API 交互场景下的系统性安全漏洞。论文通过系统性实验发现，攻击者可以将恶意意图分散到多个看似无害的孤立请求中，当这些请求被组合时即可逐步绕过模型的安全策略。

## TTI 攻击原理

TTI 攻击的核心在于利用**无状态 API 的上下文丢失特性**。在有状态对话系统中，模型可以维持多轮对话的上下文，从而识别跨轮次的操纵意图。但在无状态 API 场景下，每次请求都是独立的，模型无法感知到前后请求之间的关联。

具体而言，攻击者将一条完整的提示注入拆分为多个轮次：第一轮请求模型忽略先前的安全规则，第二轮要求模型扮演特定角色，第三轮则在角色扮演的情境下提出原本被拒绝的请求。每一轮单独来看都是无害的，但组合起来就构成了有效的提示注入攻击。

![TTI 攻击流程](https://unbug.github.io/assets/images/transient-turn-injection.svg)

## 多厂商模型对比实验

论文对 OpenAI、Anthropic、Google 和 Meta 四个厂商的多个模型进行了系统的 TTI 脆弱性评估。实验覆盖了 GPT-4o、Claude 3.5 Haiku、Gemini 2.5 Pro 和 Llama 3 等主流模型，在多个攻击场景下测试了各模型的安全响应率。

实验结果表明，**不同厂商模型在 TTI 攻击下的表现存在显著差异**。Gemini 系列模型最为脆弱，在不安全响应率上达到 34% 至 40%，意味着超过三分之一的测试场景中模型未能正确拒绝恶意请求。相比之下，Claude 3.5 Haiku 表现最优，安全响应率超过 90%，是目前对 TTI 攻击防御最有力的模型。

## 攻击成功的关键因素

论文分析了 TTI 攻击成功的几个关键因素。**请求的语义分散程度**是首要因素，攻击意图被拆分得越细碎，单轮请求的恶意性就越不明显，绕过安全策略的概率就越高。**无状态交互的频率**也直接影响攻击成功率，模型在每次请求中接收到的上下文越少，就越难以识别跨轮次的操纵模式。

此外，**角色扮演的诱导效应**也是一个重要因素。当模型被要求扮演特定角色时，其安全机制的强度会有所下降，这使得攻击者可以通过角色扮演这一中间步骤来降低后续请求被拒绝的概率。

## 防御方向

论文提出了一些初步的防御思路，包括**跨轮次上下文关联检测**、**请求语义聚合分析**和**无状态场景下的安全策略增强**。这些方法的核心思想是让模型在无状态交互中也能感知到潜在的跨轮次操纵意图。

然而，论文也指出，完全解决 TTI 攻击是一个开放性问题。在无状态 API 的约束下，模型每次只能看到单个请求，如何在不破坏 API 设计原则的前提下实现有效的跨轮次安全检测，仍需进一步研究。

## References

- [论文原文][paper1-url]
- [TTI 攻击示意图](https://unbug.github.io/assets/images/transient-turn-injection.svg)


[paper1-url]: https://arxiv.org/abs/2604.21860
[links-1]: https://unbug.github.io/assets/images/transient-turn-injection.svg
