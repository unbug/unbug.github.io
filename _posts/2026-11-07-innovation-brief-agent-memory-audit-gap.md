---
layout: post
title: "AI 智创简报：《智能体开始记长期账，谁来管坏账？》"
author: unbug
description: "2025年8月到2026年6月的五件智能体记忆专利，全部圈在记忆的写入与编排，读取侧的失效审计近乎空白；只读离线审计是尚无权利要求卡住的位置。"
categories: [AI, InnovationBrief]
image: assets/images/agent-memory-governance-gap.svg
tags: [patent, agent-memory, context-engineering, dev-tools, indie-hacker]
---

2025 年 8 月到 2026 年 6 月，Qomplx、微软、Monday.com 与两家中国公司先后公开或授权 `5` 件智能体记忆专利，逐件详情页于 `2026-11-07` 二验：权利要求全部圈在「怎么写进去、怎么组起来」，「读出来的记忆还能不能用」无人认领。

![智能体记忆治理缺口：写入侧专利圈地与审计侧空位]({{ site.baseurl }}/assets/images/agent-memory-governance-gap.svg)

## 五件专利全在管记账，没人管坏账

`US20250259042A1`（Qomplx Inc，`2025-08-14` 公开，优先权日 `2024-02-08`）claim 1 保护「任务分解后交给多领域 agent，初步结果嵌入所有 agent 共享的公共 token 空间供后续复用」的编排系统（中译），claim 2 再加跨 agent 分层记忆结构（中译）。`EP4657312A1`（Microsoft Technology Licensing LLC，`2025-12-03` 公开）claim 1 把上下文数据装入 agent 多层记忆（multi-layer memory），再由此机器学习出「监督等级」配置执行自由度（中译）。`CN121233825B`（北京城市网邻信息技术有限公司，`2026-06-26` 授权）claim 1 要求先按领域与主题类别从短期记忆存储区召回会话摘要，召不回再转长期记忆存储区（中译）；说明书把上下文工程（context engineering，即对进入模型的记忆与资料做采集、筛选、压缩、排序、更新）就定义为这套流水线。`CN121301536A`（上海羚数智能科技有限公司，`2026-01-09` 公开）把「基于智能体上下文工程的混合 AI 自适应优化系统」直接写成发明名称（中译），claim 1 的知识库由带来源、时间戳、使用次数、置信度元数据的结构化知识单元组成。`US20260181056A1`（Monday.com Ltd，`2026-06-25` 公开）最直白，跨 agent 记忆同步子系统直接写进标题：在两个以上 agent 实例间同步记忆完成协作（中译）。

## 检索面一边拥挤，一边近乎空地

Google Patents 检索接口对精确短语 "context engineering" 的聚合面返回 `185` 件，其中 `146` 件公开于 `2025` 年及以后（分箱来自接口自算 summary，两次命中计数一致）。185 不等于赛道全量，大量同技术专利用 memory store、token space 等词书写，不能作全行业定量结论。反向对比更能说明问题：查 "memory staleness" 仅命中 `4` 件，全是硬件内存泄漏与虚拟机状态旧专利（`1987` 至 `2021` 年），没有一件属于智能体记忆语义。写入装配的术语下七成就在近一年，读取失效的术语下近乎空地。

## 开发者先不相信，工具却只有仓库

社区侧同频，Hacker News 近 12 个月：「Agents don't need memory, they need documentation」拿到 `392` 分，「Don't trust large context windows」`277` 分、「Agent memory as a file format」`191` 分；一条 `371` 分帖子题为「OpenAI reduces Codex Model Context Size from 372k to 272k」，是社区上报叙述，PR 正文未读，但至少说明上下文预算被当成资源讨论。供给端却是另一个故事：npm 上 mem0ai 最新版 `3.3.1`（`2026-09-25`）自述就是 The Memory Layer For Your AI Apps，PyPI 上 cognee `1.6.6`、memobase `0.0.27` 同理都是「存」的库；搜 memory audit、context budget 一类命名，只有 `4` 个个人开发者体量的小包（`1` 到 `8` 个版本），做窗口预算估算或本地日志分析，没有一个审计记忆内容本身。这就是「供大于求、验大于零」的位置差：需求开了口，工具几乎为零。

## 空位是只读审计，不是又一个记忆库

缺口对应一个可交付物：记忆审计 CLI。指向本地 agent 记忆目录（JSONL、SQLite、Markdown），输出过期条目、矛盾记忆对、从未被召回的死记忆、跨 agent 重复写入；不依赖大模型，不改动记忆，只出报告。从公开文本看，五件 claim 覆盖写入、编排、召回与监督等级配置，只读、离线、不执行任务的审计目前不落在其文字范围；但 Monday.com 的协调层 claim 较宽，产品一旦做成带调度的同步中间件就会贴近，这条边界要守住。上一篇[网络排障 Agent 专利]({{ site.baseurl }}/innovation-brief-network-agent-testing-patents/)解决「上场干活没人监考」，这篇解决「记下来的账没人对账」。

## References
- [US20250259042A1 - Qomplx][links-1]
- [EP4657312A1 - Microsoft][links-2]
- [US20260181056A1 - Monday.com][links-3]
- [CN121233825B - 北京城市网邻][links-4]
- [CN121301536A - 上海羚数智能][links-5]
- [HN: Agents don't need memory][links-6]
- [HN: Codex context size 上报帖][links-7]
- [PyPI: cognee][links-8]
- [npm: mem0ai][links-9]


[links-1]: https://patents.google.com/patent/US20250259042A1/en
[links-2]: https://patents.google.com/patent/EP4657312A1/en
[links-3]: https://patents.google.com/patent/US20260181056A1/en
[links-4]: https://patents.google.com/patent/CN121233825B/en
[links-5]: https://patents.google.com/patent/CN121301536A/en
[links-6]: https://hn.algolia.com/api/v1/search?query=agent+memory&tags=story&numericFilters=points%3E100
[links-7]: https://hn.algolia.com/api/v1/search?query=context+engineering&tags=story&numericFilters=points%3E150
[links-8]: https://pypi.org/pypi/cognee/json
[links-9]: https://registry.npmjs.org/mem0ai
