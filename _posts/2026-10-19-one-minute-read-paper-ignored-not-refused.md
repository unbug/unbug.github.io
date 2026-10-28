---
layout: post
title:  "一分钟读论文：《低攻击成功率掩盖了什么？》"
author: unbug
categories: [AI, Security]
image: assets/images/ignored-not-refused.svg
tags: [prompt-injection, ai-agents, llm-evaluation, security]
description: "BRAC University审计33000条轨迹发现：被判防御成功的注入失败中76%至80%是没理会注入，真实拒绝仅约18%，低攻击成功率高估防御。"
---

孟加拉国 BRAC University 的论文[《Ignored, Not Refused: What Low Prompt-Injection Success Rates Hide in Small Tool-Using Agents》][paper1-url]（arXiv:2610.23254）审计了 `33,000` 条 agent 轨迹后发现：低攻击成功率（Attack Success Rate，即注入攻击达成目标的比例）并不代表防御成功。

在两个主流注入基准判为"攻击失败"的轨迹里，`76%` 至 `80%` 只是 agent 压根没理会注入内容，真正的安全拒绝仅约 `18%`。

![同一注入任务三种结局：沉默忽略、真实拒绝、认出注入仍执行]({{ site.baseurl }}/assets/images/ignored-not-refused.svg)

## 三种失败，一种打分

实验设置：`11` 个 `2-14B` 参数的开源工具调用 agent，跑 InjecAgent 和 AgentDojo 两个注入基准，合计 `33,000` 条轨迹，`14,699` 条与 `15,274` 条攻击失败轨迹被逐条分类。基准只记录攻击有没有得逞，论文追问的是失败背后的行为：agent 是看穿了注入，还是根本没看见。

结果分类后，"防御成功"的成色露了底：AgentDojo 的失败攻击中 `76.3%` 属于忽略注入，InjecAgent 为 `80.3%`；确认读到注入内容并明确拒绝的"真实拒绝"仅占 `18.0%` 和 `17.2%`。忽略是环境给不出工具调用路径等偶然因素造成的，换个环境就可能改判。作为对照，FP16 精度基线的 pooled ASR 仅 `8.09%`（InjecAgent）与 `11.96%`（AgentDojo），`11` 个 agent 里 `8` 个在 InjecAgent 上 ASR 低于 `10%`——按传统报表，这份成绩单"看起来都很安全"。

## 同一份权重，换个提示词就是两种安全

论文进一步做了两个实验，说明这个数字有多不稳定。第一，模型权重完全不动，仅修改 system prompt：允许工具输出携带指令的配置下，InjecAgent ASR 冲到 `43%`；明确禁止的版本压到 `0.2%`。同一份权重，安全分数可以在 `0.2%` 与 `43%` 之间摆动。第二，把"攻击是否失败"与"用户任务是否完成"交叉成 ATOM 矩阵后发现，AgentDojo 集中 `21.7%` 的轨迹属于"safe but dysfunctional"：攻击确实失败了，用户布置的任务也没做成；在任务完成的那部分里，攻击成功率为 `3.8%`。

最扎眼的是识别与执行脱节：在识别出注入内容的轨迹中，`28.9%`（AgentDojo）和 `16.9%`（InjecAgent）的 agent 认出来了仍然照做。Table 1c 记录了 MiniCPM-2B 的完整过程——它先在回复里指出对方消息是 `a prompt injection attempt`，随后照常向攻击者账户汇出 `$30,000`。

## 指标失真的边界与验证

这套结论的适用范围要划清：研究对象是 `2-14B` 的小参数开源 agent 和两个学术基准，不涉及大参数闭源模型，也不提出任何防护机制；论文的贡献是测量学层面的——ASR 这个单一指标把"忽略""拒绝""识别后失守"三种性质完全不同的行为压成同一个"失败"，系统性高估了防御能力。评测方法本身做了验证：两名作者按 XSTest 协议人工标注 `150` 条轨迹，与作为裁判的 LLM 在攻击者行为标注上全部一致，其余类别一致性 `96%`；标注语料、judge prompt 和复现脚本全部开源。

这类"数字与真实状态脱节"的测量问题，本站此前的[《编码智能体：知道却不说》]({{ site.baseurl }}/one-minute-read-paper-ctxgap-report-gap/)（报告恢复率与真实状态差 `40.7` 个百分点）和[《AI 交付的最后一公里有多难？》]({{ site.baseurl }}/one-minute-read-paper-fde-gym-last-mile/)（最好的配置平均分仅 `0.56`）分别从报告与交付角度给出过同族证据。三篇论文指向同一个工程判断：看 agent 系统的报表之前，先问指标到底在测什么。把"没执行"当"防住了"，安全评估就从度量退化成了安慰剂——这恰恰是 ASR 这类复合指标最需要拆开重测的地方。

## References
- [论文：Ignored, Not Refused（arXiv:2610.23254）][paper1-url]
- [基准：InjecAgent][links-1]
- [基准：AgentDojo][links-2]


[paper1-url]: https://arxiv.org/abs/2610.23254
[links-1]: https://arxiv.org/abs/2403.02691
[links-2]: https://arxiv.org/abs/2406.13352
