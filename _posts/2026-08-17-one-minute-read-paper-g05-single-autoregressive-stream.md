---
layout: post
title:  "一分钟读论文：《G0.5：单流自回归统一机器人推理与动作》"
author: unbug
categories: [embodiedai, robotics]
image: assets/images/g05-single-autoregressive-stream.svg
tags: [embodied-ai, vlm, reasoning, long-horizon]
description: "银河通用发布开放权重 VLA 模型 G0.5，用单一自回归流同时生成推理与动作 token，真机微调成功率 76.7%，超过 π0.5 的 53.3%。"
---

上海机器人公司银河通用（Galaxea）的论文[《G0.5: One Autoregressive Stream for Robot Reasoning and Action》][paper1-url]，提出预训练自回归视觉-语言-动作模型（VLA）G0.5：单一 transformer decoder 在同一 token 流中同时输出推理与动作。主流 VLA 配方把预训练视觉语言模型（VLM）当上下文编码器、另配独立 flow-matching 动作专家（通过回归向量场生成连续动作），使 VLM 只负责编码上下文；G0.5 让 VLM 直接成为决策者。相对主流配方，这是架构层面的改变而非训练技巧。真机微调成功率 `76.7%`，超过 π0.5 的 `53.3%` 和 GR00T-N1.7 的 `24.4%`；模型权重已开放，为社区验证这一路线提供了可复现起点。

## 单流自回归架构

G0.5 在大规模机器人轨迹数据集与 VQA（视觉问答）样本上联合预训练，由三个组件支撑。跨本体可学习动作 tokenizer：把 `14` 种本体的异构机器人动作映射到共享词表（统一 `27` 维动作空间），使不同机器人的动作用同一套 token 表示。原生思维链流：任务分解、物体定位与动作提示等推理 token 与动作 token 交替出现在同一条自回归序列中，由单一目标函数训练；这种交错排列意味着模型在生成的每一步先输出对任务状态的判断再给出动作，推理不是外挂模块，而是动作生成过程本身的一部分。视觉记忆模块：通过视觉编码器注入数秒级历史观测，弥补单帧输入的时序信息缺失。

![G0.5 单流自回归架构：推理与动作共享同一 transformer decoder]({{ site.baseurl }}/assets/images/g05-single-autoregressive-stream.svg)

推理与动作共享同一套权重是这一设计的直接后果：VLM 预训练获得的指令跟随能力可以迁移到物理行为上，模型对指令的遵循也更紧密。本站此前解读的 [w-0 世界动作模型]({{ site.baseurl }}/one-minute-read-paper-w0-latent-predictive-world-action-model-for-concurrent-humanoid-loco-manipulation/) 走的是预测未来潜变量再生成动作的路线，G0.5 则直接改造策略架构本身，两者属于不同层面的工作。

## 实验结果

论文在 `7` 个独立评测设置中报告了结果。真机实验使用公司自研的 R1-Lite 与 R1-Pro 机器人（4 任务 6 配置）微调后：成功率 `76.7%`，π0.5 为 `53.3%`，GR00T-N1.7 为 `24.4%`。2025 BEHAVIOR Challenge（50 个长程家庭移动操作任务，每个任务跨感知、规划与执行多个阶段）：G0.5 以单一通用策略 checkpoint 取得 `31.4%`，超过 π0.5 的 `26.3%` 与冠军方案 RLC 的 `26.1%`；仅训练 `1` epoch 即达 `29.0%`，已高于 π0.5。DROID 后训练后向未见环境与物体的零样本迁移（Franka 臂、10 任务）成功率 `82.5%`；LIBERO `98.9%`、RoboTwin 2.0 `93.3%`、SimplerEnv-Bridge `87.3%`，另在语言跟随 Pick-and-Place 基准上超过现有模型。论文还显示，仅修改 prompt 即可调节动作粒度、任务时程与分布外场景处理而无需再训练，这类部署侧调优不再依赖新数据采集或微调。

## 边界条件

需要指出三点边界：

- BEHAVIOR 的绝对成功率仅约 `31.4%`，冠军方案 RLC 本身也只有约 `26%`，该基准整体仍属困难问题，长程家庭任务远未解决；
- 真机实验每配置仅 `15` episodes、共 4 个任务，样本量偏小，且为团队自报数据；
- "7 independent regimes" 混合了不同评测协议与数据集，横向可比性有限。

## References
- [G0.5 论文（arXiv:2608.11739v1）][paper1-url]
- [DROID 机器人操作数据集项目页][links-1]
- [LIBERO 基准项目页][links-2]


[paper1-url]: https://arxiv.org/abs/2608.11739
[links-1]: https://droid-dataset.github.io/
[links-2]: https://libero-project.github.io/
