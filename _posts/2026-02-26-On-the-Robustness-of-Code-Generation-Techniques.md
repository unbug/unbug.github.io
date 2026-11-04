---
layout: post
title:  "一分钟读论文：《Copilot 代码生成稳健吗》"
author: unbug
categories: [AI, Engineering]
image: assets/images/arxiv-paper-github-copilot-robustness.svg
tags: [CodeGeneration, AI]
description: "瑞士意大利语大学（USI）与莫利塞大学的实证研究发现，仅改写需求描述措辞，GitHub Copilot 在约 46% 的情况下生成完全不同的代码，约 28% 的情况下正确性随之改变，测试通过率仅约 13%。"
---

瑞士意大利语大学（USI）SEART 团队与意大利莫利塞大学的论文[《On the Robustness of Code Generation Techniques: An Empirical Study on GitHub Copilot》][paper1-url]（arXiv:2302.00438）测试了 GitHub Copilot 的稳健性，发现仅对语义等价的需求描述做同义改写，就能在 `约 46%` 的情况下让 Copilot 生成完全不同的代码，`约 28%` 的情况下改变生成代码的正确性。

## 研究问题与方法
稳健性（robustness）指模型输出对输入措辞变化的敏感程度：如果两个开发者用不同措辞描述同一个功能，工具却给出不同实现，其可靠性就值得怀疑。论文从 `1,401` 个开源项目中收集了 `892` 个 Java 方法——每个方法都带有 Javadoc 文档注释，且被项目自带的测试套件覆盖，并以注释首句作为"原始描述"。研究团队再用两种复述技术生成语义等价的替代描述：人工改写，以及自动方法 PEGASUS（深度学习复述工具）和 TP（Translation Pivoting，基于翻译 pivoting 的启发式方法）；人工检验显示 TP 产出 `77%` 的有效复述，在能提供复述的样本中正确率约 `87%`，适合用于稳健性测试。判定正确性时，团队把生成的方法放回项目测试套件运行，以测试通过与否作为正确性的代理指标。

## 核心发现
**第一，措辞影响输出。** 语义等价但说法不同的描述，导致 `约 46%` 的情况下 Copilot 生成完全不同的代码推荐。**第二，正确性被牵连。** 描述的语义等价变化会影响 `约 28%` 案例中生成代码的正确性——原描述生成的方法能通过测试，换成改写描述后反而通不过。**第三，整体通过率偏低。** 只有 `约 13%` 的实例（原始描述 112 个、人工改写 122 个）生成了通过全部测试的方法，约 `73%` 的实例生成的方法无法通过单元测试。更值得注意的是，原始描述与人工改写各自产生的通过测试的推荐中，只有 98 个重叠，各有 14 个和 24 个正确推荐只由其中一种描述触发——也就是说，换个说法可能"捡到"原本生成不出的正确代码，也可能丢掉本来正确的结果。数据集层面，样本方法的平均长度约 `150` tokens，平均圈复杂度 `5.3`，中位数 `3.0`。

## 对开发者的启示
这些发现说明模型输入在代码推荐中扮演核心角色，深度学习代码生成工具的稳健性还需要专门的测试与改进。对使用者的直接建议是：把自然语言描述当作需要打磨的接口——同一需求可以多试几种措辞来扩大获得正确推荐的概率；对生成结果必须依赖测试验证而非表面相似度，因为论文也观察到部分测试通过的方法 CodeBLEU 分数很低，反之高分代码未必能通过测试，两种度量各有盲区。这类"输入措辞决定输出质量"的现象在提示工程中并非孤例，站内[《Many-Shot 提示何时失效》]({{ site.baseurl }}/when-many-shot-prompting-fails/)从示例数量角度给出了类似的警示。

## References
- [On the Robustness of Code Generation Techniques: An Empirical Study on GitHub Copilot][paper1-url]


[paper1-url]: https://arxiv.org/abs/2302.00438
