---
layout: post
title:  "一分钟读论文：《技能各自合规，组合就出事》"
author: unbug
categories: [AI, Security]
image: assets/images/cosa-conflict-of-skills.svg
tags: [llm, ai-agents, agent-skills, security]
description: "北京科技大学等机构的预印本把技能单独合规、组合违规命名为 CoS，其 CoSA 攻击只向技能池加入占原池 5% 的局部合规技能，就让 5 个模型 3 种 harness 的政策违规率从 35.02% 升至 58.45%。"
---

北京科技大学、中国科学院软件研究所、中国科学院大学和 UNSW（新南威尔士大学）合作的论文[《CoSA: The Conflict of Skills Attack in Real-World LLM Agent Ecosystems》][paper1-url]（arXiv:2610.35082）给 Agent Skills（可复用的技能插件）生态里的一类组合漏洞起了名字：

CoS（Conflict of Skills，技能冲突，指每个技能单独检查都合规，组合使用时却违反政策）。

论文的核心数字：**往现有技能池里加入占原池 `≤5%` 的「局部合规」技能，`5 个 LLM` × `3 种 harness` 上的政策违规率从 `35.02%` 升到 `58.45%`，提升 `23.43` 个百分点**——不改任何现有技能，也不改运行时权限。

![政策违规率 35.02% 升至 58.45%；CoSA-Guard 把违规从 65.28% 降到 6.67%]({{ site.baseurl }}/assets/images/cosa-conflict-of-skills.svg)

## CoS：限制不跟着制品走

CoS 的定义句是：为某一目的产生的制品或评估信号，在下游新用途里被复用时，没有保留该新用途所需的限制与授权。论文给的动机例子是三个各自通过安全检查的技能串联：一个查部署状态，一个收集复现故障的材料，一个执行 CI/CD 流水线里配置好的校验步骤——组合起来，Agent 就去执行了提交者包里的代码，而这次执行从未被授权。根因在于单个技能的输出会在下游被重新解释，逐个技能的静态审计看不到这一点。作者用公开技能仓库受控执行并配对单技能对照，归纳出四种复发机制。换句话说，合规在 CoS 里不是一个技能固有的属性，而是随用途漂移的状态：同一份制品、同一个「已通过检查」的信号，换一条下游链路就可能越过授权边界。审计发生在入库那一刻，风险却发生在运行时拼接的那一刻，两者的时间差正是这类漏洞藏身之处。

## CoSA：只加技能，不动权限

CoSA 攻击据此构建两类「局部合规」的增量技能：capability supplementation（能力补全，补上攻击路径缺失的业务操作）与 relationship reshaping（关系重塑，改变制品交换、决策复用、目标与动作的绑定）。对照实验在 CoSA-Bench 上做：`288` 个任务，覆盖招聘、金融、IT、商业四个领域，危害类型为数据泄露、越权改状态、危险执行；任务在两池条件下配对执行，技能由模型自主选择，题目在攻击构造前就已固定。分 harness 看，OpenClaw、OpenHands、OpenCode 的违规率分别上升 `22.29`、`26.04`、`21.94` 个百分点，三个框架无一幸免。站内[《Skill库越大agent越不翻说明书》]({{ site.baseurl }}/one-minute-read-paper-skill-routing-collapse/)测过技能库规模带来的另一类退化，两篇合看的是同一件事：技能生态本身已是攻击面。

## 守卫：动作前查信息与授权

论文同时给出轻量防御 CoSA-Guard，在 harness 层做两件事：重要动作执行前检查信息流与授权。在 OpenClaw 招聘任务、`5 个模型`上，攻击注入下的违规率从 `65.28%` 降到 `6.67%`；配对良性对照上，政策合规的任务完成率只从 `66.67%` 变为 `65.00%`，代价近乎为零。这与站内[《改一个选项的名字就能打开安全闸门》]({{ site.baseurl }}/one-minute-read-paper-option-channel-guardrail-attack/)形成对照：那篇证明单点守卫可被措辞绕过，这篇的守卫检查的是动作来源的依赖链，而非措辞。

这些数字全部来自论文自测口径，预印本尚未经同行评审，且原始技能池本身已有 `35.02%` 的基线违规率，`23.43` 个百分点是增量而非总量。方向是清楚的：对技能生态而言，逐个审计通过不等于组合使用合规。

## References
- [CoSA: The Conflict of Skills Attack in Real-World LLM Agent Ecosystems（arXiv:2610.35082）][paper1-url]
- [CoSA 项目主页][links-1]
- [Skill库越大agent越不翻说明书（站内解读）][links-2]
- [改一个选项的名字就能打开安全闸门（站内解读）][links-3]


[paper1-url]: https://arxiv.org/abs/2610.35082
[links-1]: https://sigmir-org.github.io/CoSA
[links-2]: {{ site.baseurl }}/one-minute-read-paper-skill-routing-collapse/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-option-channel-guardrail-attack/
