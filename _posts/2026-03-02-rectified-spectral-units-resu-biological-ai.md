---
layout: post
title: "一分钟读论文：《果蝇大脑启发的 ReSU 神经元》"
categories: [AI, Neuroscience, Machine Learning]
image: assets/images/resu-neural-network.svg
tags: [AI, Neural Networks, Neuroscience, Bio-inspired, ReSU, Backpropagation]
description: "Flatiron 研究所发表于 AAAI 2026 的论文提出 ReSU 整流谱单元，让每个神经元通过过去与未来的规范相关分析自监督预测未来，无需反向传播与标注数据，两层网络即重现果蝇视觉通路 L1/L2/L3 时间滤波器与 T4 方向选择性。"
---

Simons 基金会 Flatiron 研究所的论文[《A Network of Biologically Inspired Rectified Spectral Units》][paper1-url]（arXiv:2512.23146，AAAI 2026）提出 ReSU 神经元单元：每个神经元通过预测未来自监督学习，无需反向传播和标注数据。

![ReSU 神经网络单元](assets/images/resu-neural-network.svg)

## ReSU 单元的设计逻辑

深度学习建立在 ReLU 与反向传播之上，但两者各有根本局限：ReLU 是静态的，只处理同时到达的输入，丢弃时间动态；反向传播依赖海量标注与跨层非局部交互，生物大脑中找不到对应机制。当前 AI 因此效率低下——训练耗电以兆瓦时计、需数十亿标注样本，而人脑功率约 `20W`。

ReSU（Rectified Spectral Units，整流谱单元）的设计理念是每个神经元应学习预测未来，工作分三步：把输入历史的最近窗口投影到一个规范方向；该方向通过对过往观察到的"过去-未来"输入对做规范相关分析（CCA）获得；再整流其正分量（ON ReSU）或负分量（OFF ReSU）。突触权重直接来自输入的过去-未来 CCA，无需跨层通信，而 CCA 已被证明可由局部学习规则实现——这正是其生物学合理性所在。

## 在果蝇视觉通路上验证

研究团队选择解剖与生理描述最精确的果蝇视觉运动检测通路作为试验场，构建两层 ReSU 网络：第一层每个单元由单个像素驱动，学习时间滤波器；第二层空间汇集第一层输出，学习方向选择性；训练数据为以恒定速度扫描自然场景得到的平移图像。

结果与生物记录高度吻合：

- **第一层**学出类似果蝇 L1/L2/L3 神经元的时间滤波器——第一个滤波器低通、类似 L3，第二个是平滑时间导数、类似 L1/L2；ON 单元响应对比度增加，OFF 单元响应对比度降低；滤波器还随信噪比动态适应，低噪声时呈多波瓣，噪声增大时过渡为单波瓣
- **第二层**获得方向选择性、类似 T4 运动检测细胞，学习到的突触权重重现了果蝇 T4a 神经元突触输入的大部分符号模式并近似相对幅度，与连接组重建结果接近

## 意义与扩展方向

论文的意义在三层面：理论上给出建模感觉回路的原则性框架，以及构建深度自监督网络的无反向传播范式；实践上有望继承人脑的高能效、强泛化、少数据优势；神经科学上，作者 Shanshan Qin 表示该架构可以解释果蝇视觉系统中的大量现有实验数据，形成理论与实验的闭环。

团队已把网络扩展到三层以更好捕捉果蝇运动检测通路，并让三层网络从双向平移图像学习（两层版本仅用单向）；后续方向包括根据输入统计自动确定最佳记忆长度、引入自上而下反馈。ReSU 代表 AI 研究从纯工程路线向神经科学启发路线的一次根本性重思考。

## References
- [A Network of Biologically Inspired Rectified Spectral Units (ReSUs)][paper1-url]
- [代码仓库][links-1]
- [Simons Foundation 报道][links-2]


[paper1-url]: https://arxiv.org/abs/2512.23146
[links-1]: https://github.com/ShawnQin/ReSU
[links-2]: https://www.simonsfoundation.org/2026-01-26/biological-brains-inspire-a-new-building-block-for-artificial-neural-networks/
