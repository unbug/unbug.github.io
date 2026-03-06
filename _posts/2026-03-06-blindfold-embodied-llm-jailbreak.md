---
layout: post
title:  "一分钟读论文：《Blindfold攻击：破解具身LLM安全防线》"
author: unbug
date: 2026-03-06 12:56:00 +0800
tags: [AI安全, 具身AI, LLM, 越狱攻击]
categories: [论文阅读]
image: assets/images/blindfold-embodied-llm.svg
---
ACM SenSys 2026论文揭示具身LLM全新漏洞：语义安全的动作指令可能导致危险物理后果。
- 攻击成功率：GPT-4o 93.2%，Phi-4-14B 98.1%
- 比基线方法提升3.4倍，真实世界机械臂实验验证有效
- 绕过传统语义级安全防御，跨多种具身系统通用

![Blindfold攻击框架]({{ site.baseurl }}/assets/images/blindfold-embodied-llm.svg)

**警示**：具身AI安全需要从"语言审查"转向"后果感知"防御机制。
