---
layout: post
title: "AI 范式雷达：《快脑拆出大模型，Agent 控制循环改订阅决策函数》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-system-one-models.svg
tags: [decision-models, agent, non-autoregressive, model-serving, typed-output]
description: "TypeSafe 定义 Jev 品类后的四周里，Cloudflare、AWS 系 Strands 与多个独立团队相继发布决策模型、本地运行时与清单层，Agent 控制循环正从解析大模型文本转向订阅毫秒级类型化决策函数，快脑与慢脑开始分家。"
---

Agent 的高频控制循环正在换芯：从「调用一个会聊天的自回归大模型、再解析它吐出的文本」迁移为「订阅一个只输出带概率的类型化决策、毫秒级返回、按输入计费的函数」。

TypeSafe AI 于 2026-09-15 发布 Jev 与「System One Models」品类定义（HN item `49717558`，实测 `1989` 分、`518` 条评论），随后四周内，Cloudflare、AWS 系 Strands、Nokia 应用研究团队与多名独立开发者跟进，无隶属关系。慢脑（推理与生成）留在大模型里，快脑（结构化决策）成为独立的模型品类。据我们观察未发现同类中文报道。

## 四周内成形的生态波

判断这是范式而非发布稿，看跟进者构成。GitHub API 实测（2026-10-11）：jaredpalmer 的 kev（基于 Qwen3.5/3.8 的 Jev 风格模型家族）`8,895` 星；firelex 的 jeff，`0.8B` 家用训练，`1,499` 星；ollaya 是本地决策模型运行时，`1,283` 星；Nokia 应用研究团队的 AnyJev 把任意 LLM 转成 Jev 风格模型，`1,150` 星。清单层：awesome-jev `2,261` 星、awesome-jev-tools `743` 星，GitHub 搜索 "jev decision model" 返回 `1,087` 个仓库。模型、运行时、路由、清单四层齐备，是生态信号而非单品信号。

大厂一侧：Cloudflare 发布开放权重决策模型 Clef（HN `49923692`，`641` 分），AWS 系 Strands 发布 Decider `2B` 开源决策模型（HN `49987076`，`285` 分）。更早的 HN `49765348`（`1363` 分）里，Laya 声称一年前做过非自回归决策模型——品类不新，新的是命名、兼容接口与生态位分工。价格侧另有共振：DeepSeek 4.1 Flash 帖（HN `50000488`，`1107` 分、`967` 条评论）与「Tokens too cheap to meter」讨论（HN `49813482`，`354` 分）同属把模型调用做成廉价基础设施的漂移。TypeSafe 的延迟 `70ms-500ms`、输出免费、融资 `870M` 美元与估值 `7.5B` 美元（HN `50023450`，`423` 分），均为厂商自述。

## 快脑与慢脑的架构分工

TypeSafe 发布稿里那句 "unstructured state in, typed probabilistic decisions out"（非结构化状态进，带概率的类型化决策出）是这次分工的钥匙。传统 Agent 循环里，每轮工具选择、路由都要让自回归大模型逐 token 生成文本，再由外层代码解析——决策伪装成对话。决策模型把这层剥掉：并行采样的非自回归直接输出标签加概率，不参与聊天。类比 CPU 时代「通用核 + 协处理器」分工：慢脑管推理与生成，快脑管高频结构化决策，两者在同一条控制循环里分层订阅。

对 "can't hallucinate" 这类强宣称要给反方留位：不发散文本拿掉了编造事实的通路，但概率失真、标签集外误判仍在，公开可复现基准之前，这句话只能当设计目标读。本站此前的论文解读[《改一个选项的名字就能打开安全闸门》]({{ site.baseurl }}/one-minute-read-paper-option-channel-guardrail-attack/)查的是这类模型当安全闸门有多不可靠；本期讲为什么全行业在造这类模型。一期造闸、一期验闸，互为印证而非矛盾：造闸潮越大，验闸越值钱。

## 反方：没有基准的品类与商品化风险

社区火力：Jev 主帖评论 id `49719120` 称技术与结果含糊，RLCD 是什么、相比 LLM 的基准分数在哪，整篇像营销稿，品类发布至今没有公开可复现基准。评论 id `49720601` 称速度对比「极其不诚实」，id `49720956` 附和：端到端 LLM 延迟对比单步决策延迟，口径不对等。更根本的是 id `49723102`：这就是个对自定义标签输出加权分的分类器，质量能否超过结构化输出模式的 LLM 待客观基准验证——「新瓶装旧分类器」论直接攻击品类成立性。商品化专帖：「OpenAI 已处在跟进 Jev 的有利位置」（HN `49802161`，`328` 分）——兼容接口越像标准，首发者护城河越薄。共同点：范式成立不等于 TypeSafe 赢。

## 边界与观察点

边界要划清：与集群调度切割——调度层管 Agent 负载在集群里怎么排队休眠，本期讲控制循环内用哪类模型决策；与文件标准之争切割——Jev-compatible 目前是事实兼容生态，没有成文跨厂商标准，写成「标准之战」会误导读者。

验证信号：kev/jeff/ollaya 星数增速（基线 2026-10-11）；第三方盲测基准是否出现，当前最大空缺、反方火力点；OpenAI、Anthropic 是否发同类类型化决策端点，fast-follow 论的证实或证伪点；DeepSeek 系是否跟进类型化输出与免费输出定价，两条廉价路线是否合流。如果你正在构建 Agent：把控制循环里高频、只需标签加概率的部分拆出来，用 kev 或 jeff 加 ollaya 本地验证，安全闸门留在待验清单。

## References
- [Introducing System One Models and Jev][links-1]
- [HN：Jev 首发帖][links-2]
- [Cloudflare：Clef 开放权重决策模型][links-3]
- [Strands Decider 2B][links-4]
- [kev 仓库][links-5]
- [jeff 仓库][links-6]
- [ollaya 仓库][links-7]
- [AnyJev 仓库][links-8]
- [OpenAI is well positioned to fast-follow Jev][links-9]


[links-1]: https://typesafe.ai/blog/introducing-system-one-models-and-jev
[links-2]: https://news.ycombinator.com/item?id=49717558
[links-3]: https://blog.cloudflare.com/clef-decision-models/
[links-4]: https://strandsagents.com/blog/introducing-strands-decider/
[links-5]: https://github.com/jaredpalmer/kev
[links-6]: https://github.com/firelex/jeff
[links-7]: https://github.com/ollaya-dev/ollaya
[links-8]: https://github.com/nokia-applied-research/AnyJev
[links-9]: https://news.ycombinator.com/item?id=49802161
