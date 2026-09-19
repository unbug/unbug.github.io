---
title: "AI 智创简报：《大厂在给 AI 输出装质检阀，验收报告这门手艺没人接》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-llm-output-validation-patents.svg
tags: [Patent, LLM, Evaluation, DevTools, IndieHacker]
description: "Honeywell、Citibank、WitnessAI 四件大模型输出验证专利在 2024 至 2026 年相继授权：无监督一致性校验、提示词准入、沙箱试跑与护栏插件。替甲方验收 AI 交付物的质检报告，目前仍是个人手艺活。"
---

2024 年 5 月至 2026 年 7 月，四件「大模型输出验证」专利先后授权，受让人是 Honeywell、Citibank（两件）与 WitnessAI。大厂把"AI 的回答能不能出门"申请成了方法；替甲方验收 AI 交付物、出那份量化质检报告的那层活，目前还是个人手艺。

![LLM 输出验证专利信号与验收质检接单机会]({{ site.baseurl }}/assets/images/innovation-brief-llm-output-validation-patents.svg)

## 专利信号：四家把"能不能出门"做成方法

- **US12645691B2**，Honeywell International Inc.，2026-06-02 授权：无监督验证框架——从输入与 LLM 输出各自抽主题集合比对，不需要人工标注就能给输出打可信分。
- **US12147513B2**，Citibank, N.A.，2024-11-19 授权：提示词动态验证平台——先评估这条提示词适不适合交给某个模型处理，顺带估算资源开销，相当于给请求设准入闸。
- **US12111747B2**，Citibank, N.A.，2024-05-10 授权：把模型生成的检测代码放进隔离虚拟机里试跑，验证通过才采信——输出先过沙箱再上岗。
- **US12675579B2**，WitnessAI, Inc.，2026-07-07 授权：API 侧护栏系统，按管理策略动态挂输入输出过滤器。

四件均为已授权专利（非仅公开申请），信号比一般申请更硬：愿意付维持费，说明内部真在用。

## 技术趋势：验证从事后抽查变成流水线关卡

共同走向是把验收嵌进调用链：请求进来先过准入评估，回答出去前过一致性比对或沙箱试跑。与现成方案的差异：promptfoo（25,270 星）、Guardrails AI（7,434 星，均 2026-09-19 GitHub API 实测）已把"跑测试集"和"输出解析护栏"做成开源商品，但这四件专利主张的是**无标注一致性打分与提示词准入判定**——恰好是开源工具靠人工准备测试集才能覆盖的空白处。

## 落地机会：卖给交付完拿不出证据的外包方

用户场景：开发者给甲方做完 AI 客服或文档问答，上线三个月后甲方问"你怎么证明它没乱说"，手里只有几条抽查截图。一个人能做的那层：LLM 交付物验收工具——借无监督思路做输入输出主题一致性打分，配一批对抗题（跑偏、编造、越权指令），回放客户 API 出量化报告；对带代码生成的项目补一层沙箱试跑。技术栈 Python + 任一 LLM API + Docker，1 人 4 周出 MVP，月成本数百元。上一篇[RAG 拒答质检简报]({{ site.baseurl }}/innovation-brief-rag-evaluation-patents/)管单次回答的诚实度，这轮管整条输出流水线的准入与放行。

## 创业发现：验收报告一次性收费加回归巡检订阅

- 交付前验收服务：替外包方出带打分依据的质检报告，单次 3000-8000 元，报告署名反哺获客。
- 回归巡检订阅：客户模型或提示词每次变更后自动重跑一致性评估与对抗题，按接口数收 $19-49/月。

门槛：公信力来自行业出题经验与打分依据可解释，不在脚本本身。风险：promptfoo 等开源项目正在补无标注指标；WitnessAI 这类护栏产品已占企业侧——个人切的是中小外包交付的验收空档。读完今天能做的事：抽五十条真实问答，让另一个模型只比对输入输出主题是否漂移，数数有多少条答非所问。

## References
- [专利详情页：Honeywell 无监督输出验证][links-1]
- [专利详情页：Citibank 提示词动态验证][links-2]
- [专利详情页：Citibank 虚拟环境输出验证][links-3]
- [专利详情页：WitnessAI 护栏系统][links-4]
- [站内相关文章：RAG 拒答质检简报][links-5]

[links-1]: https://www.freepatentsonline.com/12645691.html
[links-2]: https://www.freepatentsonline.com/12147513.html
[links-3]: https://www.freepatentsonline.com/12111747.html
[links-4]: https://www.freepatentsonline.com/12675579.html
[links-5]: {{ site.baseurl }}/innovation-brief-rag-evaluation-patents/
