---
layout: post
title:  "一分钟读论文：《AI 审稿为何专挑附录下手》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/ai-review-appendix-bias.svg
image_alt: "左右对照条形：LLM 审稿缺点摘自附录 62.00%（ICLR 2027）对比人类审稿 8.40%（ICLR 2021-2024）；另标人类 2027 年升至 27.60%（时间相关）。"
tags: [LLM, AcademicPublishing, PeerReview, ChatGPT, Claude]
description: "辛辛那提大学预印本实测 2000 篇顶会论文：LLM 审稿缺点 62% 摘自附录，人类审稿仅 8.4%，三种使用方式均复现，附录偏见是新一代模型的新行为。"
---

辛辛那提大学 NLP 组（CINCNLP）的预印本论文[《AI Reviews Are Biased Towards the Appendix》][paper1-url]实测四个顶会 `2,000` 篇论文：最新 GPT 与 Claude 模型的审稿缺点约六成摘自附录，人类审稿人仅 `8.4%`。

## 62.00% 对比 8.40%：差距近一个数量级

**抽样口径先说清**。研究分两组：LLM 组从 ACL 2026、EMNLP 2026、COLM 2026、ICLR 2027 每个会议抽 `200` 篇附录不少于 `15` 页的论文，共 `800` 篇，交给 `GPT-6-Astra`、`GPT-6.1-Sol`、`Claude-Opus-5.5`、`Claude-Sonnet-5.5` 四个模型生成审稿，并把每条缺点自动归因回论文的具体章节。人类对照组从 ICLR 2021 至 2024 每年抽 `200` 篇附录不少于 `10` 页的论文，共 `1,200` 篇，两组是不同论文、不同年份。按论文 Table 1 口径，ICLR 2027 的 LLM 审稿缺点摘自附录的均值是 `62.00% ± 7.70`，ICLR 2021-2024 的人类审稿只有 `8.40% ± 1.44`，差距接近 `7` 倍。这里的"附录依赖"指审稿缺点的内容来源落在正文之外的补充材料里，是本研究的测量对象；它不涉及缺点本身是否成立。

![LLM 审稿缺点摘自附录 62.00%（ICLR 2027）对比人类审稿 8.40%（ICLR 2021-2024）；人类 2027 年升至 27.60%（时间相关）]({{ site.baseurl }}/assets/images/ai-review-appendix-bias.svg)

## 换哪种用法都一样，而且是新行为

**三种使用方式都超过五成**。研究分别通过 API、Codex 与 Claude Code 编程代理、以及网页界面调用模型，三种方式产生的审稿缺点来自附录的比例都超过 `50%`，说明附录依赖与调用方式无关。对比旧一代模型：GPT-5 的审稿缺点与附录相关的不超过 `30%`，GPT-6-Astra 与 GPT-6.1-Sol 则达到约 `60-70%`，论文据此判断这种行为是新一代模型才出现的新行为（this behavior is new）。背景是 AI 审稿已经普及：ICLR 2026 约五分之一的审稿被标记为完全由 AI 生成，还有更多可能经过 LLM 辅助。人类审稿人的附录化缺点比例同样在变化：长年稳定在 `6-10%`，ICLR 2027 升至 `27.60%`，时间上与 GPT-6-Astra、Claude-Opus-5.5 的发布重合。论文对此明确声明这只是时间相关（temporal correlation），不构成 LLM 导致人类审稿附录化的证据。站内 [《AI 研究智能体如何把证据磨平》][links-2] 讨论研究智能体在写作环节弱化证据，这期讨论评审环节的来源偏移，两者都属于 LLM 学术产出可信度问题。

## 预印本的边界：哪里还不能下结论

**四类局限论文自己写明**。第一，"缺点出自哪一节"由 LLM 自动归因，人工只做抽样复核，不是逐条核验，缺点含糊或跨多节时容易判错；第二，研究只统计缺点来自哪里、讲什么，不评估每条缺点本身对不对、有没有用，论文明确指出有些附录缺点指向真实问题；第三，人机对照组来自不同论文、不同年份，写作风格与附录规范随时间变化，会干扰比较；第四，抽样限定长附录论文，结论不能外推到全部投稿，研究也不涉及论文所得分数。利益相关同样要摆出来：这是未标注任何录用信息的纯预印本，出自单一实验室，而"AI 审稿质量"恰是 NLP 学术社区自身的利益相关话题；官方复现仓 `cincynlp/review_appendix` 实测 `stars` 仅 `2`（MIT 协议，`2026-11-04` 创建，`11-16` 仍在更新），第三方独立验证尚未发生，`62%` 目前更适合作为一个待复现的信号，而不是定论。

## References
- [AI Reviews Are Biased Towards the Appendix (arXiv:2611.17811)][paper1-url]
- [复现仓 cincynlp/review_appendix][links-1]
- [站内：AI 研究智能体如何把证据磨平][links-2]


[paper1-url]: https://arxiv.org/abs/2611.17811
[links-1]: https://github.com/cincynlp/review_appendix
[links-2]: {{ site.baseurl }}/one-minute-read-paper-claim-smoothing-llm-research-agents/

