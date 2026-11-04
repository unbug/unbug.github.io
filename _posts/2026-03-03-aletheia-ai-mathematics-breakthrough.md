---
layout: post
title: "一分钟读论文：《AI 自主攻克六个数学难题》"
author: unbug
categories: [AI]
image: assets/images/2026-03-03-aletheia-ai-mathematics-breakthrough.svg
tags: [AI, Mathematics, Google DeepMind, Paper Review]
description: "Google DeepMind 的数学研究智能体 Aletheia 基于 Gemini 3 Deep Think，采用生成器加验证器架构并坚持宁可不答也不答错，在 FirstProof 挑战中自主解决 10 个研究级数学难题中的 6 个，其中一个曾是学术著作记载的公开问题。"
---

Google DeepMind 的论文[《Aletheia tackles FirstProof autonomously》][paper1-url]（arXiv:2602.21201）报告数学智能体 Aletheia 在 FirstProof 挑战中`自主解决 10 个研究级难题中的 6 个`。

## FirstProof 挑战与 Aletheia 的架构

FirstProof 由专业数学家设计，包含 10 个引理——数学家研究过程中遇到的中间技术问题，覆盖代数数论、等变稳定同伦论、几何拓扑、辛几何、张量分解、数值线性代数等领域。规则严格：AI 必须完全自主产生证明，不接受任何人类提供的数学思想或内容输入。换句话说，这是一次针对"独立研究能力"而非"解题能力"的考试。

Aletheia 基于 Gemini 3 Deep Think 模型构建，核心设计原则是可靠性优先：论文作者认为，在人类专家验证带宽有限的情况下，实际从事研究的数学家宁愿牺牲原始解题能力换取更高准确性。架构采用生成器-验证器结构：生成器子 Agent 产生候选证明，验证器子 Agent 严格检查正确性；找不到正确证明时系统主动输出"没找到解决方案"而非编造，即"知道自己不知道"。

![Aletheia 在 FirstProof 十个问题上的解答成绩](assets/images/2026-03-03-aletheia-ai-mathematics-breakthrough.svg)

## 十个问题的解答成绩

两个配置 Aletheia A 与 B 合计解决 6 个问题，专家评估要点：

- P2、P9 被 4/4 专家认定正确，P10 被 2/2 专家认定正确
- P5 由 A 正确解决（B 误解题目）；P7 由 B 解决、3/3 专家认定正确，其推理成本比其他问题高出一个数量级
- P8 存在学术性分歧：3 位辛几何专家与 2 位相邻领域数学家认为正确，2 位认为不够完整，但没有专家指出证明有错误，分歧仅在缺失细节是否超出"小修改"门槛
- P10 上 Aletheia A 自主发现了最优理论复杂度界，优于官方人类作者的解决方案

未解决的 4 个问题（P1、P3、P4、P6）两个配置均无输出，系统按设计如实报告。P7 的高推理成本则提示另一面：可靠性与经济性之间仍有张力，难题的自主攻克目前还是"烧出来"的成果。

## 从解题到做研究

这一结果标志着 AI 数学从"做有已知答案的题目"（如奥赛基准）迈向"做没有已知答案的研究问题"。这一转向与近年的进展一脉相承：AlphaGeometry 系列把几何推理推到国际数学奥林匹克金牌水平，AlphaEvolve 用进化搜索打破了矩阵乘法 `56 年`的复杂度纪录（另见站内[《AI 打破矩阵乘法 56 年纪录》]({{ site.baseurl }}/alphaevolve-matrix-multiplication-breakthrough/)）——但那些成果要么有标准答案可对照，要么有明确目标函数可优化。FirstProof 的引理来自数学家笔记，此前无人解决，AI 第一次在没有参照答案的地带单独交卷。

论文的立场是 AI 定位是数学家的研究伙伴而非替代品：数学家提出猜想，AI 尝试证明并附上自我验证结论，数学家检查完善后发表。可靠性设计在其中是关键——数学研究中一个错误证明可能浪费大量后续验证时间，准确性优先于覆盖率。

论文承认这是有限的研究，但展示了有希望的方向：AI 辅助数学发现、机器可验证的形式化证明普及等。6/10 的成绩本身也划定了当前边界——AI 已能在真实数学研究中发挥作用，人类数学家仍是不可或缺的一方。

## References
- [Aletheia tackles FirstProof autonomously][paper1-url]
- [Aletheia 代码与原始输出][links-1]
- [FirstProof 挑战论文][links-2]


[paper1-url]: https://arxiv.org/abs/2602.21201
[links-1]: https://github.com/google-deepmind/superhuman/tree/main/aletheia
[links-2]: https://arxiv.org/abs/2602.05192
