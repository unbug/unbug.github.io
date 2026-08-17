---
layout: post
title:  "一分钟读论文：《w-0：潜变量预测式世界动作模型实现人形机器人并发运动操作》"
author: unbug
categories: [embodiedai, robotics, humanoid]
image: assets/images/w0-latent-predictive-world-action-model-framework.svg
tags: [w0, loco-manipulation, worldmodel, vlm, humanoidrobot]
---

新加坡南洋理工大学、北京大学和北京智源研究院等机构合作的一篇论文[w-0：潜变量预测式世界动作模型实现人形机器人并发运动操作 (w-0: A Latent Predictive World Action Model for Concurrent Humanoid Loco-Manipulation)][paper1-url]，提出了一种将未来视觉潜在预测与全身动作生成联合建模的新范式。该论文在 11 个真实家庭任务上持续优于 9 种基线方法，并发布了目前最大规模的人形家庭操作数据集 w-HOME（40+ 小时）。

## 核心问题与方法设计

人形机器人在家庭环境中具有独特优势，但真实的辅助任务需要**并发运动操作**——下肢、躯干、手臂和手在移动过程中持续相互适应。擦桌子的机器人必须迈步、倾斜身体并保持接触；拖地的机器人必须在移动中控制长柄工具。当前系统面临两大挑战：**视觉-语言-动作策略以手臂为中心设计**，底盘与手臂被视为独立组件；**世界-动作模型依赖视频预测**，时间不一致性被放大为不稳定运动。

w-0 的核心转变在于将未来视觉预测用作**紧凑的预测信号而非视频生成目标**。训练分为三个阶段：第一阶段通过构建离散全身动作词汇表，微调 Qwen3-VL-2B-Instruct 使 VLM 学会将视觉观察与动作 token 关联；第二阶段受 V-JEPA 启发进行未来嵌入预测，关键创新是通过 SONIC 仿真回放将人类运动数据转换为机器人可执行的动作监督；第三阶段使用 w-HOME 真实演示数据进行微调，支持同视角和外视角 RGB-D 输入。

## 实验结果与行业影响

w-0 在 11 个家庭任务上进行了全面评估，涵盖桌面操作、物体转移、清洁和移动操作等场景。所有方法使用单个多任务模型训练，每种方法和任务进行 10 次独立试验。**经典模仿学习方法**（ACT 和 Diffusion Policy）在长时距人形运动中表现困难；**VLA 基线**的动作接口并非为统一全身控制设计；**WAM 基线**要么面向手臂操作，要么依赖不兼容控制器接口的视频生成。

w-0 联合学习未来视觉潜在变量和 SONIC 兼容的全身动作潜在变量，生成更连贯的全身行为。**Omni-View 变体**（支持同视角和外视角输入）在拖地、跨位置转移等运动密集任务中优势尤为明显。该研究代表了 AI Agent 从数字世界向物理世界的延伸——Micropaper 系列此前主要关注 Web Navigation 和 Computer Use，w-0 展示了具身操作能力的完整图景。

## 局限与未来观察点

w-0 在 G1 人形机器人上评估，动作接口与特定硬件紧密耦合，跨平台泛化能力尚未验证。模型包含 VLM、T5、V-JEPA 和 DiT 等多个组件，推理延迟对实时控制仍是挑战。论文未讨论真实世界操作中的安全问题，缺乏安全约束机制。未来值得观察的方向包括：架构能否推广到 Tesla Optimus、Figure 02 等平台；潜变量预测范式如何与具身大模型融合；以及如何集成安全约束和人机交互协议。

## References

- [w-0 论文][paper1-url]
- [SONIC 全身控制器][sonic-paper]
- [V-JEPA 视觉嵌入预测][vjepa-paper]
- [w-HOME 数据集页面][w-home-page]

[paper1-url]: https://arxiv.org/abs/2608.06375
[sonic-paper]: https://arxiv.org/abs/2410.07814
[vjepa-paper]: https://arxiv.org/abs/2305.20021
[w-home-page]: https://gentlefress.github.io/OMEGA-0_page/
