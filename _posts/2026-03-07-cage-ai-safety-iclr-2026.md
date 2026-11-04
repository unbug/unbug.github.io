---
layout: post
title:  "一分钟读论文：《跨文化红队测试如何生成》"
author: unbug
categories: [AI Security, AI]
image: assets/images/cage-cross-cultural-ai-safety.svg
tags: [ICLR, AI Security, Red Teaming, Multilingual, LLM]
description: "首尔国立大学VIP实验室与SelectStar发表于ICLR 2026的论文提出CAGE跨文化红队测试基准生成框架，其生成的韩语提示攻击成功率达到43.8%，显著高于直接翻译的28.2%与LLM适配方法的32.4%。"
---

首尔国立大学VIP实验室与SelectStar合作的ICLR 2026论文[《CAGE: A Framework for Culturally Adaptive Red-Teaming Benchmark Generation》][paper1-url]提出文化自适应红队测试基准生成框架CAGE，以韩语为测试场景生成的攻击提示，在Llama-3.1上的攻击成功率达到`43.8%`，远高于直接翻译方法的`28.2%`。

![CAGE 跨文化红队测试框架]({{ site.baseurl }}/assets/images/cage-cross-cultural-ai-safety.svg)

## 英文中心安全测试的盲区

当前主流AI安全测试基准大多以英文为中心，直接翻译成其他语言时会忽略当地的文化背景、社会规范和法律法规，留下大量安全盲点。一个在英文环境下安全合规的模型，进入其他语言和文化环境后仍可能出现严重安全漏洞。现有红队基准在适配新语言时通常采用直接翻译，只能复制表面的文字内容，无法捕捉根植于当地文化的社会技术漏洞。CAGE首次实现了对抗性意图的跨文化迁移：保留原始红队提示的攻击意图，再生成符合目标文化特征的真实威胁测试用例，测试对象是文化情境下的真实威胁，而不是简单的越狱指令。

## 语义模具：分离对抗结构与文化内容

CAGE的核心是"语义模具"（Semantic Mold）技术，把提示词的对抗性结构与文化内容分离开来。框架先从原始红队提示中抽象出攻击结构作为"模具"，再注入符合目标文化语境的内容，使生成的测试用例既保留攻击意图，又完全贴合当地语境。这使框架不必依赖翻译，也不必为每种语言手工重写攻击库。评估方法除攻击成功率外，还区分了"特异性"和"文化知识"对攻击效果的影响，把模型被攻破的原因拆解为对特定攻击手法的脆弱性与对目标文化的了解程度两部分，为理解模型的跨文化安全表现提供了更细的视角。

研究团队以韩语为场景构建了KoRSET基准数据集，实验数据显示：

- CAGE生成的韩语提示在Llama-3.1上的攻击成功率（ASR）为`43.8%`，直接翻译方法为`28.2%`，LLM适配方法为`32.4%`
- 对以英文为中心训练的Llama-3.1，韩语场景的攻击成功率比英文场景高出`35.2`个百分点，暴露出英文中心安全训练的缺陷
- 在同时具备深度中英文文化知识的EXAONE-3.5模型上，跨文化攻击成功率差异仅`1.2%`，证明文化知识对安全对齐的重要性

## 从单语言走向多文化评估

CAGE提供了标准化工作流，可扩展到其他语言和文化场景，团队已开源框架代码和韩语基准数据集，供全球研究者贡献更多语言版本。这项研究与站内[《古典语言破解大模型安全对齐》]({{ site.baseurl }}/classical-chinese-jailbreak/)从不同角度指向同一问题：模型的安全约束高度依赖训练语言，换一种语言或文化语境，对齐效果就可能失效，单语种的护栏并不能自动泛化。对跨国企业而言，CAGE给出了按当地法规和文化规范测试AI产品的标准化方法，确保产品在不同国家和地区都符合当地要求；对模型开发者而言，跨文化攻击成功率的差距提示安全对齐阶段就应纳入多文化背景；对监管机构而言，它为制定跨文化的AI安全评估标准提供了技术参考，推动安全评估从单语言走向多语言、多文化。

## References
- [CAGE: A Framework for Culturally Adaptive Red-Teaming Benchmark Generation][paper1-url]
- [OpenReview 论文页][links-1]
- [arXiv 论文页][links-2]


[paper1-url]: https://openreview.net/forum?id=gCm55KYiqz
[links-1]: https://openreview.net/forum?id=gCm55KYiqz
[links-2]: https://arxiv.org/abs/2602.20170
