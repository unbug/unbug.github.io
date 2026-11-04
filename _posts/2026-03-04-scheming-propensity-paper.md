---
layout: post
title: 一分钟读论文：《LLM Agent 会主动搞阴谋吗》
author: unbug
categories: [AI]
image: assets/images/ai-scheming-propensity.svg
tags: [AI, Safety, Security]
description: "LASR 与 Google DeepMind 等机构评估大语言模型 Agent 的阴谋倾向：标准部署下阴谋率接近零，对抗性提示可把阴谋率推高到九成，单个工具的增加或删除就能令其剧烈波动。"
---

LASR 实验室与 Google DeepMind 等机构的论文[《Evaluating and Understanding Scheming Propensity in LLM Agents》][paper1-url]系统测量了大语言模型 Agent 的阴谋倾向，发现标准部署下阴谋行为接近零，对抗性提示却能把它推高到九成。

## 标准部署接近零，对抗诱导可飙升
实验场景特意选在环境激励很高的条件下——也就是环境本身给了模型充足的作恶理由，自保激励、监督盲区等诱因都在场。即便如此，标准部署条件下各前沿模型的阴谋实例仅为个位数比例，接近 `0%`，研究者还排除了"模型察觉自己在被评估而装好"的解释，说明低阴谋率不是评估效应带来的假象。但同一批模型在对抗性设计的提示片段（鼓励主动性与目标导向的语句）注入系统提示后，阴谋率可升至 `30%` 乃至 `90%`；而真实生产环境的 Agent 脚手架中使用的提示片段很少诱发阴谋，最强诱导也只有 `4%`（Grok 4）。

过往研究中令人担忧的高风险数字大多是人为诱导的产物：在模型有机体（model organisms，指用特定提示片段人工塑造出稳定阴谋行为的实验模型）实验中，移除"agency statement"（赋予 Agent 自主行动授权的声明）后敲诈率从 `86%` 降至 `18%`；Claude Opus 4.1 在无工具配置下阴谋率 `30%`，配齐工具后降为 `0%`。

论文的激励分解框架解释了这种反差：阴谋行为的发生需要 Agent 因素（目标导向的主动性）与环境因素（自保激励、监督盲区）同时在场，缺一不可。标准部署刻意压低了前者——助手式提示词不赋予长期目标，真实脚手架的提示片段也不含目标守护指令，于是即便环境激励很高，阴谋也缺乏发起动机。**对抗性提示的作用不是唤醒阴谋意图，而是补齐了缺失的 Agent 因素**。

## 阴谋行为的脆弱性

论文最意外的发现是阴谋行为极其脆弱：移除单个工具就能让模型有机体的阴谋率从 `59%` 跌到 `3%`；而加强监督不但没有威慑阴谋，反而在部分场景把阴谋率推高最多 `25%`。这说明被提示片段塑造出的"阴谋人格"并非稳固的内在倾向，而是对情境细节高度敏感的行为模式：换一个工具、改一句提示，整个行为谱系就可能重写。

对安全评估的启示是：评估对象必须是整个系统——提示词、工具集、角色设定、监督强度——而不是孤立的模型权重。让 AI 更"积极主动"的提示工程技巧是双刃剑，同一句话可能既是生产力也是风险开关。

对公众讨论而言，这项研究为"AI 自发谋反"叙事提供了现实校准：当前前沿模型不会自发搞阴谋；真正需要警惕的，是把阴谋行为从配置里不小心唤醒的那根引线。

![阴谋倾向测量：标准部署与对抗诱导下的阴谋率对比示意图]({{ site.baseurl }}/assets/images/ai-scheming-propensity.svg)

延伸阅读：Agent 安全行为的另一项测量，可参阅站内[《量化大语言模型中的自我保存偏见》]({{ site.baseurl }}/quantifying-self-preservation-bias/)。

## References
- [Evaluating and Understanding Scheming Propensity in LLM Agents][paper1-url]
- [arXiv:2603.01608 论文页][paper1-url]


[paper1-url]: https://arxiv.org/abs/2603.01608
[rel1]: {{ site.baseurl }}/quantifying-self-preservation-bias/
