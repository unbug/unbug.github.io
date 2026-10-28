---
layout: post
title:  "一分钟读论文：《Skill库越大agent越不翻说明书》"
author: unbug
categories: [AI, Engineering]
image: assets/images/skill-routing-collapse.svg
tags: [llm-agents, skill-routing, ai-agents, model-evaluation]
description: "预印本论文称LLM agent的skill库扩到一千个无关项时，加载召回从73.6%跌至27.4%，51.6%的任务干脆什么都不加载；成功率却几乎不动，路由坍缩被成功率指标掩盖，显式预筛选可缓解。"
---

香港大学、华中科技大学等作者的预印本论文[《Lost in Implicit Routing: How LLM Agents Fail to Load Relevant Skills at Scale》][paper1-url]（arXiv:2610.18522）测量出一种叫「skill 路由坍缩」的现象：当 skill 库扩到一千个无关项时，agent 的加载召回率从 `73.6%` 跌到 `27.4%`，`51.6%` 的任务干脆一个 skill 都不加载——坍缩的主因不是加载错误，而是不加载。

论文称，同一批任务的 Pass@3 成功率却几乎不动，坏掉的路由被成功率指标掩盖。

这里的 **skill** 指可复用的任务说明书：一份指令文件加元数据（名称与描述），agent 按需加载后照着执行。所谓**隐式路由**，是 agent 只看元数据自行决定加载哪个 skill，不加载也能继续执行——执行可靠性就全押在这个自选环节上。

值得注意的是，这次坍缩的反差在于：agent 并不是选错了说明书，而是干脆什么都不带。加载召回（正确 skill 是否被加载）与任务成功率是两回事，隐式路由把两者解了耦：选不选说明书，任务都能接着跑。本文严格分开使用这两个指标。

## 实验设计：任务不动，只把库变大

实验把 SkillsBench（论文使用的 skill 基准）的任务与其 golden skills（标准答案 skill）固定不动，只往库里逐批加入无关 skill，看隐式路由能否撑住。论文称，规模到一千个无关 skill 时，加载召回从 `73.6%` 跌到 `27.4%`，**零加载率**（什么都不加载的任务比例）从 `9.3%` 涨到 `51.6%`；同一库改为显式选择（由系统替 agent 选定），召回保住 `73.9%`。

退化在百级就已出现：库里只加一百个无关 skill 时，`GLM-5`、`Kimi K2.5`、`MiniMax M2.5` 三个开源权重模型的加载召回分别掉 `24.6`、`15.6`、`20.7` 个点。论文还排除了「加载了别的 skill」这条解释——包括加载看似合理的替代 skill——其比例太罕见，不足以解释召回下跌。三个均为开源权重模型，结论未覆盖闭源前沿模型。

![Skill 库越大，加载召回越低，零加载比例越高]({{ site.baseurl }}/assets/images/skill-routing-collapse.svg)

## 任务成功率滞后于路由坍缩

同规模下，`GLM-5` 的 `Pass@3`（任务成功率）从 `57.3%` 到 `56.1%`，`Kimi K2.5` 从 `52.4%` 到 `50.6%`，基本守在基线附近。论文称，只看任务成功会让一个坏掉的 skill 系统显得健康。

这层滞后对工程监测的含义是：加载召回与任务成功率是两条独立曲线，成功率是滞后的下游指标，团队若只盯 `Pass@3`，要等用户投诉才发现 agent 早已不带说明书干活。站内[第 12 期 AI 范式雷达][links-2]记录过 SKILL.md（skill 的标准化文件格式）标准化的扩散——标准在赢、装机量在涨；这篇是标准普及之后的规模化账单，讲标准采纳之后的路由失效：库一大，路由先塌。

## 干扰来源与缓解手段

论文称，两条实验指向能解释坍缩。其一为**语义干扰**：只遮蔽无关 skill 的描述字段后，skill 加载大幅恢复，说明描述文本在大规模下互相干扰选择。其二为**指令干扰**：元数据完整时，显式要求 agent 先规划 skill 使用，召回仍低于预筛选——skill 选择与任务执行在争夺同一份注意力。

缓解上，显式预筛选（由系统在运行前筛掉无关 skill）是实际可行的手段，代价是覆盖与延迟之间的权衡；`10k`（万级）规模下，混合预筛选有效。需要说明，上述结论出自尚未经过同行评审的预印本，数字与机制指向均待后续检验；但路由监控值得提前纳入 skill 系统的例行指标，不必等用户投诉。


## References
- [Lost in Implicit Routing: How LLM Agents Fail to Load Relevant Skills at Scale][paper1-url]
- [AI 范式雷达 #12：SKILL.md 标准化波][links-2]


[paper1-url]: https://arxiv.org/abs/2610.18522
[links-2]: https://unbug.github.io/paradigm-radar-skill-md-standard/
