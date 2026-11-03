---
layout: post
title:  "一分钟读论文：《AI 打破矩阵乘法 56 年纪录》"
author: unbug
categories: [AI]
image: assets/images/alphaevolve-breakthrough.svg
tags: [AlphaEvolve, Matrix Multiplication, Google DeepMind, Algorithm Discovery, Mathematics]
description: "谷歌 DeepMind 的 AlphaEvolve 智能体用进化式代码搜索发现 4×4 矩阵乘法的 48 次标量乘法算法，打破 Strassen 算法保持 56 年的 49 次纪录，并已用于加速 Gemini 模型训练与优化 TPU 芯片电路设计。"
---

![AlphaEvolve 矩阵乘法突破]({{ site.baseurl }}/assets/images/alphaevolve-breakthrough.svg)

Google DeepMind 的论文[《AlphaEvolve: A coding agent for scientific and algorithmic discovery》][paper1-url]发布的 AI 系统发现只用 `48 次标量乘法`计算 4×4 复数矩阵乘积的方法，打破了 Strassen 算法保持 `56 年`的 `49 次`纪录。

这是 AI 在核心数学领域的首个此类原创发现，优化成果已同步应用于 Gemini 模型训练与芯片电路设计。

## 从 Strassen 到 48 次乘法

1969 年，德国数学家 Volker Strassen 展示了用 49 次标量乘法计算 4×4 矩阵乘积的分治方法，比传统 64 次乘法快约 23%；该方法可递归应用，把时间复杂度从 O(n³) 降到约 O(n^2.807)。对 1024×1024 矩阵，传统方法需要约 10 亿次乘法，Strassen 方法约 6 亿次。矩阵乘法是深度学习、图形渲染、科学计算和数据处理的核心运算，AI 模型推理的大部分计算时间都消耗于此，因此哪怕一次乘法的节省也具有行业意义。

AlphaEvolve 把 4×4 复数矩阵乘法的标量乘法次数降到 48 次，并总共改进了 `14 种不同尺寸`的矩阵乘法算法：例如 (2,4,5) 从 33 次降到 32 次，(3,4,6) 从 56 次降到 54 次，(4,5,6) 从 93 次降到 90 次。虽然相对 Strassen 只少 1 次乘法，但这是人类在该问题上停滞半个多世纪后的首次进展。

## 系统工作原理与实际影响

AlphaEvolve 的设计灵感来自生物进化，由三个核心组件构成：程序生成器用 Gemini 模型作为"语义突变器"生成新代码变体；评估级联充当质量控制，对矩阵乘法任务生成随机测试矩阵、验证候选算法结果正确性并统计乘法次数，只有通过全部测试的方案进入下一轮；进化循环对候选方案进行选择与迭代，重复突变、选择过程直到收敛。

实际影响已在生产环境体现。在 Gemini 模型训练中，AlphaEvolve 优化了关键矩阵乘法内核，实现 `23%` 的内核速度提升，使整体训练时间减少 `1%`；它还重新设计了 Tensor Processing Unit（TPU）中的关键算术电路，去掉不必要的位，该改进已获验证并将用于未来芯片设计。在纯数学领域，AlphaEvolve 总共处理了 `67 个数学问题`，在 `20%` 的问题上找到了优于人类已知方案的解，包括 11 维空间亲吻数问题的更好结果、1955 年提出的 Erdős 最小重叠问题进展，以及傅里叶分析问题的新发现。

论文还描述了一个正在发生的自我改进循环：AlphaEvolve 发现更快的算法，加速大模型训练基础设施，更强的模型再集成回 AlphaEvolve，用于发现更好的算法。AlphaEvolve 表明 AI 可以主动发现新算法而不仅是验证人类猜想，成为数学家和计算机科学家的真正合作者；AI 在纯数学中从竞赛走向研究前沿的整体图景，可对照站内[《AI 邂逅纯数学的突破与挑战》]({{ site.baseurl }}/ai-for-mathematics-2026/)延伸阅读。

## References
- [AlphaEvolve: A coding agent for scientific and algorithmic discovery][paper1-url]
- [VentureBeat 报道][links-1]


[paper1-url]: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf
[links-1]: https://venturebeat.com/ai/meet-alphaevolve-the-google-ai-that-writes-its-own-code-and-just-saved-millions-in-computing-costs/
