---
layout: post
title:  "一分钟读论文：《可复现性：AI治理的新前沿》"
author: unbug
categories: [AI Governance, AI]
image: assets/images/reproducibility-ai-governance.svg
tags: [AI Governance, Reproducibility, Academic Integrity, ICML]
description: "ICML 2026论文指出AI研究可复现性危机正削弱治理能力：2019至2024年AI论文增长72%居各学科之首，ICML 2024顶级论文仅24%能被大模型复现，建议推行预注册与开放数据。"
---

发表于ICML 2026的论文[《Reproducibility: The New Frontier in AI Governance》][paper1-url]来自MIT、Stanford、Oxford等机构团队，核心论点是：AI可复现性危机正削弱政策制定者的治理能力，提高可复现性标准是有效治理的核心机制。

![可复现性：AI治理的新前沿]({{ site.baseurl }}/assets/images/reproducibility-ai-governance.svg)

## 各学科的可复现性现状

论文用跨学科数据说明问题的普遍性：

- **AI**：2019 至 2024 年，信息与计算机科学领域论文增长 `72%`，是所有学科中最快的，比其他领域快约 50%；ICML 2024 顶级论文中仅 `24%` 能被 LLM 复现，博士生复现率不到 50%；NeurIPS 论文提到 GitHub 的比例虽在增加，仍有大量论文不提供代码
- **经济学**：顶级期刊中只有不到一半的论文能被成功复现，复现失败多因数据与代码不公开
- **癌症生物学**：只有 `2%` 的研究有开放数据，`0%` 有完整实验方案
- **心理学**：只有 `36%` 的研究能被成功复现，复现危机早在 AI 之前就已蔓延，AI 只是把它推到最危险的领域

## 无法复现的历史代价

论文用两个案例说明代价。2010 年 Reinhart 与 Rogoff 的《债务时代的增长》声称外债达到 GDP 的 60% 时经济增长下降约 2%，这一结论被用来支持欧洲紧缩政策，导致英国数万人超额死亡；2014 年复现研究发现原始研究存在数据缺失和计算错误，重新分析后没有发现债务与增长之间的趋势。癌症生物学方面，Center for Open Science 用 8 年时间尝试复现 53 篇高影响力论文的 193 个实验，只有 50 个实验复现成功，效应量平均比原始研究小 `85%`，20 种癌症药物中只有 1 种成功上市，造成巨大经济和机会成本。

论文进一步警告：在缺乏可复现性标准的情况下，行业参与者可能利用信息污染环境进行监管捕获，通过信息不对称削弱 AI 治理和民主制度。同类治理讨论可参见[《规模化智能体系统的责任真空》]({{ site.baseurl }}/responsibility-vacuum-ai-governance-failure/)。

## 三大解决方案

针对上述危机，论文提出三个核心可复现性协议，把可复现性从学术规范升级为治理工具：

1. **预注册**：在实验前公开注册假设和实验方案，避免后见之明偏差
2. **统计效能**：提供开放获取的计算资源，支持基于计算的实验的统计显著性
3. **负面结果报告**：鼓励发表负面结果，让 AI 研究者和治理专家全面了解 AI 的局限性

没有统一行动解决可复现性问题，AI 可能传播的许多危害将成为现实。科学家、政策制定者和政府的共同责任，是把可复现性作为 AI 治理的新前沿来解决：只有当研究结论可被独立验证，监管才有可核查的事实基础。


## References
- [Reproducibility: The New Frontier in AI Governance (ICML 2026)][paper1-url]


[paper1-url]: https://icml.cc/
