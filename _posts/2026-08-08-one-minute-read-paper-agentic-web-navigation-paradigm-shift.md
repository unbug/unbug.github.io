---
layout: post
title:  "一分钟读论文：《智能体网页导航的范式转变》"
author: unbug
categories: [AI, LLM]
image: assets/images/agentic-web-navigation-paradigm.svg
tags: [webagent, computervision, browsergym, benchmark, vlm]
description: "智能体网页导航让AI从检索文本转向直接操作网页。基准显示GPT-4在WebArena的成功率仅约16%，远低于人类基线；OpenAI与谷歌已推出Computer Use接口，可靠性与成本仍是落地障碍。"
---

围绕 Web 智能体（能像人一样点击按钮、填写表单、滚动页面并处理弹窗的大语言模型程序）的一组基准研究——WebArena[《A Realistic Web Environment for Building Autonomous Agents》][paper1-url]、Mind2Web[《Towards a Generalist Agent for the Web》][paper2-url]、WebVoyager[《Building an LLM Agent for Interactive Web Navigation》][paper3-url]、OSWorld[《Benchmarking Multimodal Agents for Realistic Operating System Tasks》][paper4-url] 与统一框架 BrowserGym[《A Unified Framework for Web Agent Research》][paper5-url]——共同勾勒出 AI 与互联网交互的一次范式转变：从被动检索（Passive Retrieval）转向主动导航（Active Navigation）。在 812 个真实任务的 WebArena 基准上，GPT-4 的任务成功率仅约 `16%`，人类基线为 `80%` 以上，能力缺口清晰可量化。

![智能体网页导航基准：人类与模型成功率对比]({{ site.baseurl }}/assets/images/agentic-web-navigation-paradigm.svg)

## 从检索文本到操作网页

传统搜索与检索增强生成（RAG，即先取回文本片段再生成答案）只能读取已索引的静态文本；信息若未被索引，对模型而言就不存在。智能体网页导航接收的是任务目标而非查询词，模型实时访问多个网站、点击搜索结果、填写比较表单、聚合跨页信息，触达可能永远不会被索引的当前内容。交互模式由此从知识检索器变为问题求解者。

智能体的运行遵循推理、行动、观察、反思的循环，直至目标达成或步数耗尽。核心难点是上下文管理：每一步产生数百到数千 Token 的观测数据，在线购物等 `10+` 页面的任务会让上下文窗口迅速填满。

## 观测方式与基准数据

观测分两类：DOM/无障碍树方式获得结构化元素数据，定位精准但有隐私暴露与解析成本；截图方式由视觉语言模型（VLM，即同时理解图像与文本的模型）预测点击坐标，对布局变化更鲁棒但单次观测消耗 `2000-5000` Token。BrowserGym 原生支持两种模式，混合使用成为新兴最佳实践。

各基准数据勾勒出现状：MiniWoB++ 的 `125` 个微任务上，当前最优智能体成功率约 `60-70%`；WebArena 上 GPT-4 约 `16%`；Mind2Web 覆盖 `500+` 个网站的 `2000+` 个任务，GPT-4 约 `30%`；WebVoyager 在 `15` 个真实网站的 `643` 个任务上借自探索机制（智能体无任务指导下先学习网站结构）达到约 `25%`；扩展到完整操作系统的 OSWorld 上，最优成绩约 `15%`。失败模式集中在导航错误、表单填写失误与多步规划中断。

## 产品化与主要障碍

OpenAI 的 GPT-4o Computer Use 以截图输入、鼠标键盘坐标输出实现端到端视觉操作，是首个生产级网页导航接口；谷歌 Gemini Computer Use 支持截图加文本指令的多模态输入，覆盖 Web、Android 与桌面环境。

障碍有四：安全上，智能体会执行越界操作；可靠性上，网站改版即可导致智能体失效；成本上，多步任务累计 `50000-200000` Token、每步增加 `1-5` 秒延迟；伦理上，智能体浏览与自动化抓取的边界模糊。若要判断该领域进入主流应用，可盯住两个观察点：Computer Use 产品是否在 `2026` 年下半年达到 `50%` 以上成功率且单步延迟低于 `10` 秒，复杂基准成功率是否从当前的 `20-30%` 跃升至 `50%` 以上。相关评测基础设施的演进可参阅本站的 [AgentGym2 去理想化评测范式雷达]({{ site.baseurl }}/paradigm-radar-agentgym2-de-idealized-evaluation/)。

## References
- [WebArena: A Realistic Web Environment for Building Autonomous Agents][paper1-url]
- [Mind2Web: Towards a Generalist Agent for the Web][paper2-url]
- [WebVoyager: Building an LLM Agent for Interactive Web Navigation][paper3-url]
- [OSWorld: Benchmarking Multimodal Agents for Realistic Operating System Tasks][paper4-url]
- [BrowserGym/AgentLab: A Unified Framework for Web Agent Research][paper5-url]
- [MiniWoB++: Micro-Task Web Benchmark][links-1]


[paper1-url]: https://arxiv.org/abs/2307.13854
[paper2-url]: https://arxiv.org/abs/2306.13847
[paper3-url]: https://arxiv.org/abs/2401.13910
[paper4-url]: https://arxiv.org/abs/2403.00563
[paper5-url]: https://arxiv.org/abs/2412.05467
[links-1]: https://arxiv.org/abs/1909.03047
