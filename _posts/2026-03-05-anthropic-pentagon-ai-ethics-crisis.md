---
layout: post
title:  "一分钟读论文：《Anthropic与五角大楼的伦理对决》"
author: unbug
categories: [AI Ethics, AI]
image: assets/images/anthropic-pentagon-ethics.svg
tags: [Anthropic, DoD, AI Ethics]
description: "Anthropic拒绝五角大楼2亿美元合同续约，坚持不将AI用于完全自主武器和大规模国内监控两条红线，被列为供应链风险并遭联邦停用，成为AI公司坚守道德承诺的首个案例。"
---

2026年2月最后一周，估值`3800亿美元`的Anthropic拒绝了五角大楼`2亿美元`合同续约，坚持两条红线：不用于**完全自主武器**、不用于**大规模国内监控**，随即被列为`供应链风险`并遭联邦机构停用（来源：[Anthropic官方][paper1-url]）。

![Anthropic 与五角大楼]({{ site.baseurl }}/assets/images/anthropic-pentagon-ethics.svg)

## 从合作伙伴到决裂

Anthropic 曾是五角大楼在机密网络中的首个 AI 合作伙伴，其 Claude 模型是第一个被批准在军方机密网络上工作的商业 AI，通过与 Palantir 的合作部署。2024 年夏天签订这份合同时，OpenAI、Google、xAI 等其他主要商业 AI 实验室都未达到这种级别的访问权限。

原始合同的可接受使用政策明确禁止大规模监控和自主武器，但五角大楼要求修改为`所有合法目的`，成为核心引爆点。2026 年 2 月决定性的一周里：国防部长 Pete Hegseth 向 CEO Dario Amodei 发出最后通牒，甚至可能援引《国防生产法》迫使 Anthropic 无限制提供模型；Anthropic 审查五角大楼的最终提议后认为，所谓妥协的安全语言与法律术语配对，护栏可被随意忽视，在防止大规模监控或完全自主武器方面几乎没有进展；Anthropic 明确拒绝后，五角大楼采取了前所未有的行动。特朗普总统同时下令所有联邦机构立即停止使用 Anthropic。

## 法律锁与技术锁

就在同一天，OpenAI 宣布获得五角大楼合同。诡异的是，OpenAI CEO Sam Altman 表示他同样分享 Anthropic 的红线——禁止国内大规模监控和人类对使用武力负责。结果截然不同的关键在于**合同架构**：

- **Anthropic**：要求在合同文本中写入明确的、可执行的禁止条款（法律锁）
- **OpenAI**：接受所有合法目的语言，同时在部署架构中构建技术护栏（技术锁）

OpenAI 声称其协议比任何以前的机密 AI 部署协议都有更多护栏，但技术安全堆栈只有在公司愿意顶住政府压力维护时才强大，合同禁止则在法庭上有牙齿。讽刺的是，五角大楼自己的 DoD 指令 3000.09（2023 年更新）已经要求对致命武力决策进行适当水平的人类判断，Anthropic 只是在要求反映现有五角大楼政策的合同语言。当前 LLM 会产生幻觉、错误解释上下文，赋予这样的系统自主杀伤权在操作上同样是鲁莽的。AI 治理的制度化挑战可参见[《可复现性：AI 治理的新前沿》]({{ site.baseurl }}/reproducibility-the-new-frontier-in-ai-governance/)。

## 代价与先例

2 亿美元合同对估值 3800 亿美元的 Anthropic 不是生存威胁，但供应链风险指定通常是预留给敌对国家企业的武器，此前先例是华为。任何与美国军方合作的公司都必须证明其工作中没有接触任何与 Anthropic 相关的东西，财富 500 强公司的总法律顾问都不得不评估使用 Claude 的风险。多位法律专家对该指定的有效性提出质疑：政府未完成风险评估，且完全不清楚对手如何利用 Anthropic 的使用限制来破坏军事系统。

这场冲突的核心问题是私人公司能否对政府如何使用其技术设定道德限制。AI 与战斗机不同，它是可以指向几乎任何任务的通用推理系统。如今行业有三条路径：OpenAI 的技术护栏、Anthropic 的合同保护、xAI 的无条件接受。Anthropic 测试了一家 AI 公司能否在最大的政府压力下维护道德承诺，并证明了代价真实存在。


## References
- [Anthropic 官方新闻][paper1-url]
- [OpenAI 官方新闻][links-1]


[paper1-url]: https://www.anthropic.com/news
[links-1]: https://openai.com/news/
