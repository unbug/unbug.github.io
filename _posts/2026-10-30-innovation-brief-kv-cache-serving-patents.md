---
layout: post
title: "AI 智创简报：《服务商省钱的缓存手段，被专利圈起来了》"
author: unbug
description: "7月初到8月中旬六周内，微软、谷歌、支付宝、火山引擎、AtomBeam与记忆张量各自公开或授权一件KV缓存专利，六件全部圈在推理服务商侧；提示词按缓存重排与命中率审计仍是空位。"
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-kv-cache-serving-patents.svg
tags: [patent, llm-inference, kv-cache, cost-optimization, indie-hacker]
---

7 月 2 日到 8 月 13 日的六周里，大模型推理的 KV 缓存（key-value cache，生成时复用历史注意力计算、省去重复预填充的显存缓存）层落了六件专利：六家申请人互不重叠，已授权 `1` 件、公开申请 `5` 件，逐件详情页于 `2026-10-31` 逐一核验。

节奏是：支付宝与火山引擎两件在 7 月初公开，Google 与微软两件欧洲申请 7 月末 8 月初公开，记忆张量一件 8 月 11 日在中国获授权，AtomBeam 一件 8 月 13 日公开。

![KV 缓存专利时间轴与圈层地图]({{ site.baseurl }}/assets/images/innovation-brief-kv-cache-serving-patents.svg)

## 六件专利圈的全是服务端

按公开日排开：`WO2026138159A1`（支付宝，`2026-07-02` 公开，优先权为中国申请 `2024-12-25`）做推理缓存优化；`US20260195309A1`（火山引擎，`2026-07-09` 公开，权利要求 1 写「sending, upon determining that there is first key-value data in a graphics memory of a graphics processing unit, a data storage request...」（中译：确定图形处理单元显存中存在第一键值数据时，向其发起存储请求）——显存到 KV 数据库的分层调度）；`EP4781281A1`（Google，`2026-07-29` 公开，优先权日 `2023-10-26`）做序列处理的并行化提效；`EP4785219A1`（微软，`2026-08-05` 公开，优先权日 `2023-09-28`）标题直书「Kv-cache streaming for improved performance and fault tolerance」，把 KV 缓存当流式管道在模型服务系统里搬运；`CN122019408B`（记忆张量，`2026-08-11` 授权）最激进——语义段哈希索引、前缀哈希表底层指针覆写实现「零拷贝跨上下文复用」、原子引用计数管显存生命周期，说明书明写目标是多智能体共享工作记忆、降首字延迟；`US20260236476A1`（AtomBeam，`2026-08-13` 公开）把缓存对象从 KV 再往前推一层，直接缓存多阶段系统的隐式思维（latent thought）。值得留意的是微软与 Google 两件优先权分别落在 `2023-09-28` 与 `2023-10-26`——公开潮滞后于圈地近两年。

## 空位在客户端那一侧

把六件权利要求叠起来看，圈地全部发生在推理服务商的基础设施层：显存分层、流式搬运、并行调度、缓存复用引擎。但硬币另一面没人圈：怎么让请求天然命中这些缓存，是调用方的事。缓存按前缀匹配计费打折已是各家 API 的公开卖点，命中率却取决于提示词结构——系统提示放最前、可变内容放最后、会话历史别插队改写，这些排列纪律散落在工程博客里，没有一个工具把它做成可执行的审查。专利检索里，「面向缓存命中的提示词自动重排」这类客户端侧方案未见大厂落子。

## 三段能接的活

一是缓存命中审查器：接用户的提示词模板与调用日志，离线给出重排建议与预期命中率、按前缀计费折扣折算月省金额——纯客户端软件，不碰服务商调度层，绕开六件专利的正面。二是前缀折扣审计：各家 API 的缓存折扣口径不一（折扣比例、最短前缀长度、TTL 各不相同），做独立第三方对账面板，验证账单上每一次折扣是否真给足——与之前写过的 agent 成本取证同族，客户重叠。三是多智能体缓存一致性测试：记忆张量那件授权件把「多智能体共享工作记忆」写进了说明书，共享缓存引发的串话、越权读到别人上下文这类缺陷，正是测试工具该盯的靶子——做验证不做实现，专利风险最低。

## 门槛与风险

三段活都不需要自建推理集群：审查器与审计面板是纯文本处理加账单解析，VPS 级成本可起步；一致性测试需会编排多 agent 的测试框架，门槛稍高但客单也高。两条风险：一是缓存命中优化直接省服务商 GPU 成本，长期看服务商有动力内建成产品功能，窗口以年计；二是记忆张量授权件保护面较宽（语义段级复用），做第三段活时把工具钉死在「测试与验证」，别碰「实现复用」。

## References
- [WO2026138159A1 — 支付宝：大模型推理中的缓存优化方法及装置](https://patents.google.com/patent/WO2026138159A1/en)
- [US20260195309A1 — 火山引擎：基于键值数据库的数据处理方法](https://patents.google.com/patent/US20260195309A1/en)
- [EP4781281A1 — Google：Efficiently serving machine-learned model computations](https://patents.google.com/patent/EP4781281A1/en)
- [EP4785219A1 — Microsoft：Kv-cache streaming for improved performance and fault tolerance](https://patents.google.com/patent/EP4785219A1/en)
- [CN122019408B — 记忆张量：一种用于语言模型推理的键值缓存调度方法及系统](https://patents.google.com/patent/CN122019408B/en)
- [US20260236476A1 — AtomBeam：Latent Thought Caching for Multi-Stage Language Model Systems](https://patents.google.com/patent/US20260236476A1/en)
- [站内：AI 范式雷达第 20 期——标价之外，Harness 替你买了什么]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)
