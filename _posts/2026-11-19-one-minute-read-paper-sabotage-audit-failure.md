---
layout: post
title:  "一分钟读论文：《AI 审查员抓不住研究内鬼》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/sabotage-audit-auroc.svg
image_alt: "人类审计员 AUROC 0.59、完整识破 17%；Fable 5.1 为 0.73、32%（领先幅度在噪声范围内）。"
tags: [LLM, AIAgents, MachineLearning, Evaluation]
description: "Redwood 预印本实测：人类只读研究记录识破蓄意破坏，AUROC 0.59 近乎随机、完整识破 17%；最强模型 0.73 但领先在噪声内，人机都不可靠。"
---

Redwood Research 等机构预印本[《Auditors Struggle to Catch Sabotage》][paper1-url]实测：人类审计员识破 AI 安全研究中的蓄意破坏，`AUROC` 仅 `0.59` 与随机无异，完整识破率 `17%`。

当 AI 代理开始承担安全研究本身，谁来监督研究过程成了新问题，而这篇论文的答案是：现在谁都监督不住。审计环节本身不可信，安全研究的结论可信度就要打一个连环问号。

## 实验设定：读文档抓内鬼

**AUROC 是衡量二分类判断能力的指标**，`0.5` 等于抛硬币，越接近 `1` 判别越准。实验里的"破坏者"由人类专家扮演，论文作者之一参与其中：正常完成一份 AI 安全研究任务，同时暗中植入一处破坏。审计员拿到端到端研究记录，包括代码、数据与推理轨迹，任务是判断这份研究被没被破坏、破坏点具体在哪，相当于只读工作日志抓内鬼。结果：人类审计员平均 `AUROC 0.59`，论文摘要原文称其 not significantly better than chance，即与随机猜测没有显著差异；能完整指出具体破坏的比例仅 `17%`，五份记录里识破不到一份。换句话说，把审计员的判断换成抛硬币，区分被破坏研究与正常研究的效果差不多。

## 模型也没完胜人类

**模型侧最强的是 Fable 5.1：`AUROC 0.73`、完整识破率 `32%`**，比人类高，但论文摘要的措辞必须逐字读：领先幅度 within noise，即落在噪声范围内，较弱模型与人类表现相当。这组数字既不支持"AI 审计完胜人类"，也不支持"AI 也不行"，只能说明人机都不可靠：最好的模型完整识破率也才刚过三成。

![人类审计员 AUROC 0.59、完整识破 17%；Fable 5.1 为 0.73、32%（领先幅度在噪声范围内）]({{ site.baseurl }}/assets/images/sabotage-audit-auroc.svg)

**两条设定削弱结论强度**。其一，模型被禁止运行实验，人类审计员却可以自己跑代码验证，人机权限不对等，比较并未对齐（附录 A.10）。其二，实验数据按五五开构造，一半被破坏、一半正常；真实部署里破坏是少数事件，基础率远低于 `50%`，实际检出会比 `0.59` 显示的更难（附录 A.11）。站内[《AI 审稿为何专挑附录下手》][links-2]测量的是评估者注意力放错位置，本期测的是评估者整体判别失灵，角度不同，同属评估环节失效议题。

## 局限与利益相关

**三条局限要摆明**：单人研究员的小规模博弈设定，外部效度有限（附录 A.1）；人机权限不对等（附录 A.10）；`50%` 先验与真实基础率不符（附录 A.11）。

**利益相关**：Redwood Research 本身是 AI safety 研究机构，破坏者由包括作者在内的自家专家扮演，存在自设自审风险：自己出题设破绽，再考自己请来的审查员。论文未发布自有代码仓（推测地址实测 `404`），仅引用外部测试框架 control-arena（UKGovernmentBEIS，`270` stars，MIT 协议），第三方复现得自己重建博弈设定；目前是未评审预印本（v1 提交于 `2026-11-16`），数字属于待复现信号。

## References
- [Auditors Struggle to Catch Sabotage in End-to-End Transcripts of AI Safety Research (arXiv:2611.21832)][paper1-url]
- [论文 HTML 全文][links-1]
- [站内：AI 审稿为何专挑附录下手][links-2]
- [control-arena 测试框架][links-3]


[paper1-url]: https://arxiv.org/abs/2611.21832
[links-1]: https://arxiv.org/html/2611.21832v1
[links-2]: {{ site.baseurl }}/one-minute-read-paper-ai-review-appendix-bias/
[links-3]: https://github.com/UKGovernmentBEIS/control-arena
