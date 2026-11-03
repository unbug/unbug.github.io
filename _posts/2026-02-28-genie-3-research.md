---
layout: post
title:  "一分钟读论文：《实时交互式世界模型 Genie 3》"
author: unbug
categories: [AI, deepmind]
image: assets/images/arxiv-paper-genie-3.png
tags: [deepmind, world-model, genie-3, ai]
description: "Google DeepMind 发布 Genie 3 世界模型，用文本提示即可生成 720p、每秒 24 帧、可连续交互数分钟的实时 3D 环境，配合自回归架构与自主学习的世界记忆保持物理一致性，被视为具身智能体训练和通往 AGI 的阶梯。"
---

Google DeepMind 于 2025 年 8 月 5 日发布的[《Genie 3: A New Frontier for World Models》][paper1-url]能够通过文本提示生成可实时交互的 3D 环境，输出达到 `720p 分辨率`、`24 帧/秒`，支持数分钟连续交互，DeepMind 将其视为通往 AGI 的关键一步。

## 自回归架构与世界记忆

Genie 3 基于 Genie 2（生成智能体新环境）和 Veo 3（理解物理的视频生成模型）的技术传承，采用自回归（auto-regressive）方式逐帧生成世界：模型必须回顾之前生成的内容来决定接下来发生什么，这是保持环境一致性的关键。DeepMind 研究总监 Shlomi Fruchter 称这是架构的关键部分。

世界记忆机制并非显式编程，而是模型自主学习获得：短期记忆约 `1 分钟`可保持场景上下文，重访旧位置能回忆细节，用户行为（如在墙上绘画）会持久存在。物理理解同样不依赖硬编码引擎，模型通过记忆和长时推理自学物体如何移动、下落和交互。与 NeRF（神经辐射场）、高斯溅射等方法相比，自回归逐帧创建的环境更加动态和详细。

## 功能、应用与局限

核心功能包括文本生成照片级真实或奇幻风格场景、实时导航交互，以及可提示的世界事件（Promptable World Events）——探索中实时改变天气、加入物体或调整光照，世界不重置而是继续演变。最重要的应用是训练通用具身智能体：DeepMind 已用 SIMA（Scalable Instructable Multiworld Agent）测试，智能体能在 Genie 3 生成的仓库环境中执行"接近亮绿色的垃圾压缩机"等指令，相关工作可参考站内[《千环境合成训练 AI 智能体》]({{ site.baseurl }}/agent-world-model-research/)。教育与培训（探索历史时代、自动驾驶安全测试）和创意娱乐（游戏原型、动画）也是典型场景。

2026 年 1 月 29 日，Google 面向美国 18 岁以上的 AI Ultra 订阅用户开放了基于 Genie 3 的实验原型 Project Genie，提供世界草图（文本加图像创建环境，集成 Nano Banana Pro 微调）、世界探索和世界混音三大功能。当前局限包括部分物理效果不完美（如雪的运动）、智能体动作范围有限、难以建模多智能体复杂交互、交互时长仅数分钟而实际训练需要数小时、无法精确模拟真实地点，以及清晰文本通常只在输入描述中出现时才渲染。DeepMind 强调这类基础技术从一开始就需要深入的责任承诺。


## References
- [DeepMind Genie 3 官方页面][paper1-url]
- [TechCrunch 报道][links-1]
- [Project Genie 官方博客][links-2]
- [Genie 3 演示视频][links-3]


[paper1-url]: https://deepmind.google/models/genie/
[links-1]: https://techcrunch.com/2025-08-05/deepmind-thinks-genie-3-world-model-presents-stepping-stone-towards-agi/
[links-2]: https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/
[links-3]: https://www.youtube.com/watch?v=PDKhUknuQDg
