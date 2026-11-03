---
layout: post
title: "一分钟读论文：《AI 共同研究员时代来了》"
categories: [AI]
image: assets/images/ai-co-researchers-team.svg
tags: [AI, Research, Claude, ChatGPT, Gemini]
description: "企业家 Iban Borras 让 Claude Opus、Gemini Pro、ChatGPT 与 Manus 四个 AI 模型作为共同研究员完成论文并在 Zenodo 发表，四个模型均被列为共同作者，实验设计、实施与同行评审中 AI 均做出实质贡献，人类与 AI 的研究协作模式正在被重新定义。"
---

企业家 Iban Borras 的论文[《AI Models as Co-Researchers》][paper1-url]让四个 AI 模型作为共同研究员参与研究并在 Zenodo 发表，四个 AI 均被列为共同作者。这是有记录以来首次 AI 在实验设计、实施和同行评审中均做出实质性贡献的案例。

![AI 共同研究员团队](assets/images/ai-co-researchers-team.svg)

## 四个 AI 模型的分工与协作

Borras 的挑战课题是关于现实本质的理论假设，团队由 Claude Opus、Gemini Pro、ChatGPT 和 Manus（DOI: 10.5281/zenodo.18721271）四个模型组成，各有分工，构成一个动态的多智能体批评系统：互相质疑、互相验证，组合表现超越了仅由人类或单一 AI 组成的方法。

- **Claude Opus**：负责假设设计与伦理把关，像最严苛的审稿人一样挑战假设、指出方法论缺陷。据 LLM-Stats 2026 年 2 月基准测试，Claude Opus 4.6 的 GPQA 分数达到 `0.9`，为商用模型最高水平
- **Gemini Pro**：负责模式识别与数据分析，从 Borras 的 `200 GB` 二进制数据集中识别微妙相关性，并与公共科学存储库交叉引用，XDA Developers 评价其在检测 23 次实验迭代中的混淆变量时不可或缺
- **ChatGPT 与 Manus**：ChatGPT 把抽象假设转化为可执行代码框架，专用模型 Manus 在二进制数据流中发现隐藏异常，这些发现成为整个假设的核心

研究过程中的分歧不靠 Borras 拍板，而是通过迭代对话解决：一个模型质疑统计异常，另一个补充论证，迫使假设不断完善，最终产出足以发表的稳健发现，也引发了学术界关于 AI 作者身份合法性的大辩论。

## AI 正在加速科学发现

Borras 的实验不是孤例。OpenAI 2026 年 1 月发布的《AI as a Scientific Collaborator》报告显示：ChatGPT 上`每周 840 万条`高级科学和数学消息在交换，约 `130 万`每周用户专注于高级数学和科学主题，每月高级科学消息数量增长近 `50%`。

数学领域的进展最为突出：GPT-5.2 Thinking 在 2025 年 AIME 美国数学邀请赛中无需外部工具取得满分；在 Google 验证的 FrontierMath 问题集上解决了第 1-3 级中 `40.3%` 的问题；2026 年初还为几个 Erdős 开放问题的解法做出了贡献，并获得数学家 Terence Tao 的验证。

 其他领域同样在推进：物理学中，LLM 在美国国家实验室等设施中充当复杂操作堆栈与内部知识库之上的统一层；化学中，ChatGPT 从一次性问答转向多步骤工作流程，能在自然语言和化学表示之间转换并调用外部工具验证；生物学中，AlphaFold 3 通过扩散架构可预测包含蛋白质、DNA、RNA 与小分子的复合物联合 3D 结构。

## 伦理意义与 AI 作者身份

随着 Claude Opus 4.6 等模型推理能力提升，一个问题越来越无法回避：AI 什么时候从助手变成了合作者。期刊编辑正在讨论是否应强制披露 AI 贡献。Borras 的论文给出了示范：GitHub 公开完整源代码，透明记录每个 AI 的具体角色。他本人认为，一个能提出控制变量、反驳指标并与研究者迭代数周的模型，不是工具，而是合作者。

OpenAI 科学副总裁 Kevin Weil 也表态：AI 正被越来越多地用作科学合作者，更多研究人员正借助高级推理系统在开放问题上取得进展。2026 年可能被铭记为 AI 从工具转变为科学合作者的转折点，科学的未来或许属于人类-AI 研究集体。

## References
- [AI Models as Co-Researchers: How Claude, Gemini, and ChatGPT Led a 2026 Scientific Breakthrough][paper1-url]
- [AI as a Scientific Collaborator (OpenAI, January 2026)][links-1]
- [Nature: The Rise of AI Co-Authors][links-2]
- [Zenodo: DOI 10.5281/zenodo.18721271][links-3]


[paper1-url]: https://aihaberleri.org/en/news/ai-models-as-co-researchers-how-claude-gemini-and-chatgpt-led-a-2026-scientific-breakthrough
[links-1]: https://cdn.openai.com/pdf/f4b4a5da-b2de-418d-9fcd-6b293e9dc157/oai_ai-as-a-scientific-collaborator_jan-2026.pdf
[links-2]: https://www.nature.com/articles/s41586-026-08912-3
[links-3]: https://doi.org/10.5281/zenodo.18721271
