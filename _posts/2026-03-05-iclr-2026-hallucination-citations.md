---
layout: post
title:  "一分钟读论文：《ICLR 2026幻觉引用围攻同行评审》"
author: unbug
categories: [AI]
image: assets/images/iclr-2026-hallucination.svg
tags: [ICLR 2026, Academic Integrity, Hallucination]
description: "GPTZero团队扫描300篇ICLR 2026投稿，发现16.7%含有经人工核实的幻觉引用，每篇论文经3至5位同行评审全部漏检，部分论文评分高达8/10，按2万篇投稿规模推算或有数百篇存在同类问题。"
---

GPTZero团队的调查报告[《Peer Review is Under Siege》][paper1-url]用Hallucination Check工具扫描300篇ICLR 2026投稿，发现`16.7%`（50篇）含经人工验证的幻觉引用，每篇经3至5位同行评审却无人发现，部分评分高达`8/10`。

![ICLR 2026 幻觉引用]({{ site.baseurl }}/assets/images/iclr-2026-hallucination.svg)

## 幻觉引用的五种类型

按比例推算，ICLR 2026 的 2 万篇投稿中可能有数百篇存在幻觉引用。GPTZero 把幻觉引用归纳为五种模式：

- **作者错乱型**：论文真实存在但作者全部错误，如 NeurIPS 2023 的 Segment everything everywhere all at once 作者列表完全错乱
- **部分虚构型**：前 3 位作者正确，后面 7 位不存在，如 ICLR 2021 的 Measuring massive multitask language understanding 被添加 7 位虚构作者
- **完全无匹配型**：论文、作者、会议均不存在，如标注为 ICLR 2020 的 Defense against adversarial attacks using spectral regularization 在数据库中查无此文
- **元数据错误型**：论文存在但年份、页码、期刊错误，如 MLflow 论文标题和年份都不对
- **混合拼凑型**：标题来自一篇论文、作者来自另一篇、会议来自第三篇，拼成半真实引用

GPTZero 对幻觉引用的定义是：由生成式 AI 产生、似乎改写或组合了一个或多个真实来源的标题、作者或元数据的引用，区别于拼写错误、格式问题等有缺陷引用。三种引用的区分本身就是调查方法论的一部分，避免把人类笔误误判为 AI 造假。五种模式里既有完全凭空捏造的论文，也有把真实论文的元数据改得面目全非的半真半假引用，后者更容易骗过快速浏览的评审者。

## 系统性危机与防线

危机背景是同行评审整体过载：2016 至 2024 年科学论文发表数量增长 `48%`，评审者不堪重负导致质量下降，撤稿和丑闻激增。LLM 几分钟就能生成一篇看似合格的论文，特征是冗长、过度使用项目符号、伪造数据和幻觉引用，AI 生成内容与真实论文的界限越来越模糊，评审者既没有时间也没有工具逐条核对参考文献，一份动辄几十条的引用列表在有限的评审周期内几乎不可能逐条溯源。值得注意的是，这不是低排名期刊的问题，而是发生在机器学习领域最顶级会议之一的 ICLR。ICLR 2026 官方政策明确表示，即使一个清晰的幻觉引用也是伦理违规、可能导致拒稿，但现有评审系统在 AI 生成论文洪流面前无法执行这一政策。

GPTZero 提出双重防御：AI 检测与幻觉检查并行，工具自动识别可疑引用、人工做最终判断，大幅减少验证来源所需的时间和人力。团队已与 ICLR 程序主席合作，目标是让同行评审过程对每个人来说都更快、更公平、更透明。人工负责最终判断、机器负责海量初筛，是这场攻防里目前最现实的分工。被围攻的不仅是同行评审，而是整个学术诚信的基础：当评审专家都无法区分真实引用和幻觉引用时，科学文献的可信度本身成了问题。同类学术诚信危机可参见[《AI 无节制采用威胁学术根基》]({{ site.baseurl }}/ai-threatens-academia-foundations/)。


## References
- [GPTZero 官网（Hallucination Check）][paper1-url]
- [What counts as a hallucinated citation][links-1]


[paper1-url]: https://gptzero.me/
[links-1]: https://gptzero.me/news/what-counts-as-a-hallucinated-citation
