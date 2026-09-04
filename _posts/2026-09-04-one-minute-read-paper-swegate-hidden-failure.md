---
layout: post
title:  "一分钟读论文：《跑通测试的补丁，三成过不了人类 review 这一关》"
author: unbug
categories: [AI, Engineering]
image: assets/images/swegate-hidden-failure.svg
tags: [llm, agent, coding-agent, benchmark]
description: "中山大学、浙江大学、重庆大学联合构建 SWE-Gate 双轨基准，从真实 PR review 提取约束测试：644 个通过功能测试的补丁中 221 个隐藏失败，整体隐藏失败率 34.3%，最高单模型达 53.6%；显式披露约束能提升合规，却拖累修复本身。"
---

中山大学、浙江大学和重庆大学联合发表的论文[《SWE-Gate: Passing Functional Tests Is Not Enough for Software Engineering Agents》][paper1-url]（[arXiv:2609.04167][paper1-url]，2026 年 9 月 3 日提交，6 位作者）给出了一个直接冲击 agentic coding 叙事的数字：在 644 个通过功能测试的仓库级修复补丁中，有 221 个没有通过约束验证，整体隐藏失败率（Hidden Failure Rate）为 34.3%。也就是说，代码智能体在 SWE-bench 类基准上"跑通测试"的产出，约三分之一过不了真实项目 review 的那道关。与已发的[《约束在交接中悄悄失效》][links-2]关注多 Agent 交接中约束丢失不同，这篇考察的是单个智能体产出的补丁对工程约束的违反——约束来自真实 PR review 评论，验证方式是可自动执行的测试套件。

## SWE-Gate 怎么构造第二道标尺

SWE-Gate 是一个仓库级修复基准，包含 303 个修复实例，覆盖 75 个开源 Python 仓库。它的核心设计是把评测拆成两条轨：功能测试轨沿用传统方式，检查补丁是否修好了目标问题；约束测试轨则从这些仓库真实合并 PR 的 review 评论中反向提取验收约束，把"改动范围要收敛""资源要清理""转义和引号要正确""schema 类型要匹配"这类人工 review 中反复出现的要求，翻译成可自动执行的检查。补丁只有同时通过两条轨，才算联合成功。这样，"解决问题的能力"和"遵守工程约束的能力"第一次被拆成两个独立度量的维度。

## 隐藏失败率：四个模型的实测结果

论文在同一个 Mini-SWE-Agent 框架下评测了 GPT-5.5、GPT-5.4-mini、DeepSeek-V4-Flash 和 GPT-4o-mini 四个模型，排除了框架差异的干扰。功能测试通过但约束验证失败的补丁被定义为隐藏失败：GPT-5.5 的隐藏失败率为 29.5%，GPT-5.4-mini 为 35.8%，DeepSeek-V4-Flash 为 35.6%，而 GPT-4o-mini 高达 53.6%——最强的模型也只是把失败率压到近三成，没有哪个模型能可靠地交出"人类愿意合"的补丁。最难遵守的约束类别集中在改动范围泛化（Scope Generalization）、生命周期清理、编码转义和 schema 类型这几类，恰好都是功能测试永远不会报错、review 却一定会挑刺的地方。

## 把约束摊开说，效果并不免费

一个自然的问题是：直接把约束描述写进提示词，能不能救回这些隐藏失败？结果显示这是一枚双面硬币。一方面，显式约束描述显著提升了联合成功率，GPT-5.5 的联合成功率从 54.6 升到 70.5，提升 15.9 个百分点；另一方面，四个模型中有三个的功能成功率反而下降，GPT-5.5 自身也略有回落——约束信息占用了模型的注意力，遵守了规矩却修不好 bug。约束披露提升了合规性，但没有统一地改善修复能力。需要说明的是，SWE-Gate 的结论限定在 Python 仓库范围内，能否外推到其他语言尚未验证。

SWE-Gate 的意义在于给"跑通测试"之外补上了第二道标尺：评测主体从"任务完成度"扩展到"产物可合入性"，而约束不再靠人肉 review 兜底，而是变成了可以批量执行的测试。对正在把智能体接入真实代码库的团队，隐藏失败率是一个值得先测一遍的指标。

## References
- [SWE-Gate: Passing Functional Tests Is Not Enough for Software Engineering Agents][paper1-url]
- [约束在交接中悄悄失效（#170）][links-2]


[paper1-url]: https://arxiv.org/abs/2609.04167
[links-2]: {{ site.baseurl }}/one-minute-read-paper-constraint-weakening-handoff/
