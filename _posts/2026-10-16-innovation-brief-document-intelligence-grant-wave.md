---
layout: post
title: "AI 智创简报：《抽文档省 token 的做法正在收敛：先定位，只喂那一小块》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-document-intelligence-grant-wave.svg
tags: [patent, document-ai, information-extraction, llm, dev-tools]
description: "2026 年 2 到 8 月六家不同公司的大模型文档抽取专利密集授权，Mistral 从优先权到授权只用了 5.3 个月；技术路线收敛为规则先定位、只把命中邻域交给大模型、再做字段级校验。"
---

生成式 AI 落地最早的赛道之一，正在专利面上留下整齐的一排：2026 年 2 月到 8 月，六家互不相同的公司围绕同一件事拿到了授权——**用语言模型从非结构化文档里抽取结构化字段**。

值得单独写一篇的原因不是题目新，而是路线收敛得漂亮：**大厂们不约而同地把大模型用「小」了——先用规则、版式或分类器定位，只把命中那一小块上下文喂给模型，最后做字段级校验。**

![六件授权的公开节奏与两件快速授权]({{ site.baseurl }}/assets/images/innovation-brief-document-intelligence-grant-wave.svg)

## 一排授权与两个异常快的数字

把六件核心授权按公开节奏排开（均经 Google Patents 详情页逐字核验）：Mistral AI 的《Document intelligence system》（US12651113B1），IBM 的《Location of key value pairs》（US12639362B2），Intuit 的两件——《In-context OCR exemplars for out-of-domain document information extraction》（US12632675B2）与《Hybrid key value document extraction》（US12705916B2），Adobe 的《Data identification and extraction from unstructured documents》（US12699851B2），Vendr 的《Systems and methods for automated data extraction of unstructured documents》（US12586403B2）。

两个数字异常。Mistral 这件专利优先权日是 2025-12-31，授权日 2026-06-09，**从优先权到授权只有 5.3 个月**；Vendr 那件从申请（2025-09-15）到授权（2026-03-24）只用了 6.3 个月。审查快慢受程序因素影响多，不能直接读成市场热度，但异常快的授权连续出现，通常意味着该主题的权利要求空间已经清晰——能圈的都在圈，动作慢的就轮到别人了。

## 收敛的技术模式：把模型放在定位之后

六件权利要求各有侧重，拆开看是同一条流水线，只是各家切的刀口不同。

**规则或版面先动手，模型只处理疑难点。** Intuit 的 US12705916B2 切得最直白：先用规则解析命中目标字段，只把命中词的邻域文本交给语言模型——整页不进模型，省下 token 也缩了幻觉面。IBM 的 US12639362B2 用 LLM 生成和应用 prompt 模板定位文档中的键值对，模型负责「找」，结构化落库走确定性通道。Intuit 另一件 US12632675B2 解决域外文档：给没见过的文档类型构造带标注的 OCR 范例，用 in-context 范例教模型抽字段，而不是微调。

**抽取完不算完，校验环节进了独立权利要求。** Vendr 的 US12586403B2 在多分类器分类加抽取的主流程之外，把 corrections and validations 流程写进了方案；背景件里 HighRadius 的财务文档抽取（US12664136B1）主打自动纠错。字段级校验从工程细节升格为权利要求，说明各家都被真实业务里的抽取错误烫过。

**Mistral 的位置最有信号意义。** US12651113B1 是文档标注与抽取的工作流系统——模型厂在做文档智能的管道件，前沿模型厂开始亲自圈流程层的地，而不只是卖 API。

## 对做工程的人的三点提示

第一，**整页文档塞大模型做抽取的做法，已经落后于专利面显示的工程共识**。先定位后抽取在六家申请人的文件里反复出现，是这个阶段的标准做法，不是某家的独门技巧。

第二，**工具层不空**。Reducto、LlamaParse、Unstructured 正拿抽取准确率当营销主战场，第三方评测已在写「按字段暴露失败模式」——想靠「更准的抽取器」切入的人面对的是红海。这排授权的真正价值，是看清六家独立团队收敛到哪条流水线上，把自己的文档管线对齐过去。

第三，**审查速度本身是可跟踪的信号**。若同类主题的授权节奏持续加快，说明权利要求还在被快速消化，「快授件」值得当成一个独立的雷达档位。

## References
- Mistral AI, "Document intelligence system", US12651113B1: https://patents.google.com/patent/US12651113B1/en
- IBM, "Location of key value pairs", US12639362B2: https://patents.google.com/patent/US12639362B2/en
- Intuit, "In-context OCR exemplars for out-of-domain document information extraction", US12632675B2: https://patents.google.com/patent/US12632675B2/en
- Intuit, "Hybrid key value document extraction", US12705916B2: https://patents.google.com/patent/US12705916B2/en
- Adobe, "Data identification and extraction from unstructured documents", US12699851B2: https://patents.google.com/patent/US12699851B2/en
- Vendr, "Systems and methods for automated data extraction of unstructured documents", US12586403B2: https://patents.google.com/patent/US12586403B2/en
- HighRadius, 财务文档抽取与自动纠错, US12664136B1: https://patents.google.com/patent/US12664136B1/en
