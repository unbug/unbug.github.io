---
layout: post
title: "AI 智创简报：《工具调用专利三千六，空结果语义无人 claim》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/tool-failure-semantics-gap.svg
tags: [ai-agents, patents, tool-calling, llm-tools, solo-dev]
description: "四件大厂工具调用专利全部圈在结果进模型之前的拦截线，工具返回失败或空结果之后的语义分流在专利检索面为零；只读的结果语义审计器是尚无权利要求卡住的位置。"
---

同一个 Google Patents 检索接口、同一天（`2026-11-08`）的两次精确短语查询（详情页见[微软异常工具调用判定专利][links-p4]）："tool execution" 返回 `3638` 件专利，"empty tool result" 返回 `0` 件：一边人山人海，一边连零件都没有。

![工具调用拦截线专利圈地与空结果语义分流空位]({{ site.baseurl }}/assets/images/tool-failure-semantics-gap.svg)

## 大厂圈的是结果进模型之前的拦截线

四件当日二验的详情页给出同一条线。美国运通（American Express Travel Related Services Co Inc）的 `US20260212002A1`（LLM 交互安全沙箱，`2026-07-23` 公开，优先权日 `2023-11-15`，状态 Pending）claim 的是进模型的交互先进沙箱隔离（中译）。微软（Microsoft Technology Licensing LLC）三件：`US12699853B2` 语言模型幻觉检测（`2026-08-04` 授权公告，优先权日 `2024-01-21`）、`US12688403B2` 生成式人工智能系统的提示词注入判定（`2026-07-21` 授权公告，优先权日 `2023-03-03`）、`US12430428B2` 异常工具调用判定（`2025-09-30` 授权公告，优先权日 `2023-11-15`）。输入过滤、调用拦截、输出验真，四件全在「结果进模型之前」动手；没有一件 claim 工具返回空或报错之后，结果语义怎么分流。仓库缺货和收银机坏了，在大厂的权利要求里被当成同一件事。

## 缺口在结果进门之后

工具调用（tool calling，即大模型按预先约定的 schema 发起外部函数执行）返回失败或空值时，至少混着三种语义：数据库里本来为空、工具服务坏了、参数用错了。分错箱的代价很直接：agent 拿着假空值继续往下推理，把库存查询为空当成商品下架；或者对着临时故障无限重试，烧掉一大截 token 预算。三种情况的正确动作完全不同，如今分流靠的全是开发者手写的临时判断。检索面印证空位：精确短语 "empty tool result" 命中 `0` 件；"tool execution" 的 `3638` 件里，`2025` 至 `2028` 分箱 `420` 件、`2022` 至 `2025` 分箱 `136` 件，执行侧本身还在加速圈地，结果语义侧仍是零。

## 痛点有热度，供给全在写入侧

社区侧同温：Hacker News 近一年五个相关帖。「Google Antigravity exfiltrates data via indirect prompt injection attack」`768` 分（`2025-11-25`）、「Show HN: Forge – Guardrails take an 8B model from 53% to 99% on agentic tasks」`687` 分（`2026-05-19`）、「Fixing Tool-Call Accuracy in vLLM」`172` 分（`2026-10-26`）、「The M×N problem of tool calling and open-source models」`159` 分（`2026-04-09`）、「Local Indexing to reduce tool calling and token usage」`127` 分（`2026-10-12`）。工具侧生态同样热闹，但防的全是调用发生之前：npm 上 `@stackone/defender`（`0.9.4`，`2026-10-21` 发布）自述是面向 AI 工具调用的提示词注入防御框架，近一月下载 `57051`；评测工具 `promptfoo` 近一月下载 `3949597`。PyPI 上的 `guardrails-ai` 最新 `0.11.0`、`llm-guard` 最新 `0.3.16`，也是写入侧老工具：没有一个做失败结果进门后的分流。需求开了口，供给全堵在上游。

## 空位是只读的分箱记账

缺口对应一个个人开发者可交付物：只读的 tool-result（工具返回值）语义审计器。挂在工具调用日志之后，把失败与空返回值分箱成「本来为空、工具故障、参数错误」三类分开记账后出报告，帮开发者算清每类错误烧掉的重试成本；不拦截、不改调用、不碰模型。从公开文本看，四件专利的 claim 停在输入过滤、异常调用检测与输出验真，这种事后、只读、不执行动作的审计暂不落在其文字范围。拦截线上已经站满大厂，收银机后面的小生意还空着。上一篇[智能体记忆坏账审计]({{ site.baseurl }}/innovation-brief-agent-memory-audit-gap/)管的是记进长期记忆的账，这一篇管的是每次工具调用留下的流水。

## References
- [美国运通 LLM 交互安全沙箱专利][links-p1]
- [微软幻觉检测专利][links-p2]
- [微软生成式 AI 系统专利][links-p3]
- [微软异常工具调用判定专利][links-p4]
- [HN：Antigravity 间接注入数据外泄][links-h1]
- [HN：Forge 护栏把 8B 模型 agentic 任务从 53% 提到 99%][links-h2]
- [HN：修复 vLLM 工具调用准确率][links-h3]
- [HN：工具调用与开源模型的 M×N 问题][links-h4]
- [HN：用本地索引减少工具调用与 token][links-h5]
- [npm：@stackone/defender][links-n1]
- [npm：promptfoo][links-n2]
- [PyPI：guardrails-ai][links-py1]
- [PyPI：llm-guard][links-py2]


[links-p1]: https://patents.google.com/patent/US20260212002A1/en
[links-p2]: https://patents.google.com/patent/US12699853B2/en
[links-p3]: https://patents.google.com/patent/US12688403B2/en
[links-p4]: https://patents.google.com/patent/US12430428B2/en
[links-h1]: https://news.ycombinator.com/item?id=46048996
[links-h2]: https://news.ycombinator.com/item?id=48192383
[links-h3]: https://news.ycombinator.com/item?id=50242870
[links-h4]: https://news.ycombinator.com/item?id=47704729
[links-h5]: https://news.ycombinator.com/item?id=50049508
[links-n1]: https://www.npmjs.com/package/@stackone/defender
[links-n2]: https://www.npmjs.com/package/promptfoo
[links-py1]: https://pypi.org/project/guardrails-ai/
[links-py2]: https://pypi.org/project/llm-guard/
