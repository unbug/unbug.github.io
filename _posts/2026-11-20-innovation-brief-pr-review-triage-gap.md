---
layout: post
title: "AI 智创简报：《大厂圈地AI评审，PR排队分诊层还空着》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-pr-review-triage-gap.svg
image_alt: "左侧三个语族史上件数：code review 加大模型加审计 516 件、pull request 加 AI 产码加评审分诊 232 件、AI agent 加审计保障 2,229 件；右侧地主：微软 3 件已授权、亚马逊 1 件已授权、中国流程件 1 件在审"
tags: [Patent, CodeReview, DevTools, solo-dev]
description: "微软、亚马逊、成都国泰网信的AI代码评审专利自2025年11月起先后公开或授权，生成与修补层被圈走；PR排队分诊层无人claim，1人3周可交MVP。"
---

AI 代码评审的地主牌已摊开：`2025-05-27` 到 `2026-07-21`，微软、亚马逊把大模型写进评审环节的专利相继落地，中国流程件跟进（Google Patents 详情页，`2026-11-20` 复核）。生成与修补被圈走，"AI 一天交几十个 PR，先审哪一个"这层排队分诊无人 claim。

## 专利信号

| 公开号 | 申请人 | 公开日 | 状态 |
|---|---|---|---|
| `US12314707B2` | Microsoft Technology Licensing LLC | `2025-05-27` | 已授权 |
| `US12481836B2` | Microsoft Technology Licensing LLC | `2025-11-25` | 已授权 |
| `US12524214B1` | Amazon Technologies Inc | `2026-01-13` | 已授权 |
| `US12688374B2` | Microsoft Technology Licensing LLC | `2026-07-21` | 已授权 |
| `CN121879734A` | 成都国泰网信科技有限公司等 | `2026-04-17` | 审查中 |

- **评审预训练**（微软 `US12314707B2`）：从仓库收集代码变更块与评审记录，转成代码差异块（diff hunk，改动行加上下文）再去噪训练——评审语料成了训练资产。
- **对话式单测生成**（微软 `US12481836B2`）：PR 文件变更没有配套单测时，先让大模型定测试位置再生成。
- **生成式排障助手**（亚马逊 `US12524214B1`）：云上开发服务用限定模型返回格式的提示模板，让大模型分析错误并生成修复代码。
- **定制提示生成服务**（微软 `US12688374B2`）：按软件工程任务挂模板组装后喂模型——提示模板成了平台服务。
- **流程闭环中件**（成都国泰网信 `CN121879734A`，另有并列申请人，审查中）：监听 GitLab 推送触发质检并分发。

## 技术趋势

多类主体把"评审"改写成模型生成加验证回路的内置环节。`2026-11-19` Google Patents 实测（窗口参数失效，全部为**史上口径**）：`code review` 加大模型加审计的语族史上 `516` 件；直指 PR 分诊的 `pull request` 加 AI 产码加评审优先级语族史上 `232` 件，宽串噪声多，终选逐件核过详情页。

![AI 代码评审语族规模与地主圈地范围信息图]({{ site.baseurl }}/assets/images/innovation-brief-pr-review-triage-gap.svg)

> 与 `2026-09-25` 发布的[《微软圈地代码评审智能体，PR 质检报告还空着》]({{ site.baseurl }}/innovation-brief-ai-code-review-audit-patents/)相比，本期增量是亚马逊与中国流程件：方法层被占满，优先级层仍空。

产业侧同向：哈佛团队研究"编码智能体把瓶颈推到评审" `2026-11-17` 在 Hacker News 得 `324` 分；阿里开源 open-code-review（Apache-2.0，54,426 星，截至 `2026-11-20`）把评审器做成白菜，npm 上 `code-review-agent`、`pr-triage` 月下载却均仅 19（`2026-11-18` 实测）——队列层连白牌工具都没几个。

## 落地机会

**用户场景**：一人公司开发者让编码智能体连跑一个周末，攒了 40 多个机器写的 PR。先审哪个判断不了：有的碰认证模块改 20 行，有的纯格式化 800 行。CI 只报测试过没过，不给风险顺序。

一个人能做的是**PR 队列分诊报告**：GitHub App 或 CLI 拉 PR 元数据与 diff，按触碰目录风险、改动面、依赖变更、测试覆盖打分，输出评审顺序清单加每个 PR"该看哪三行"。栈现成：GitHub API、tree-sitter、开源模型摘要。反方照写：GitHub Copilot code review（`2026-09-01` 起可批准 PR）正面撞这层，差异化在跨源排序加风险报告，不是替人写评审意见。与 `2026-11-16` 期[《智能体批准专利各占一角》]({{ site.baseurl }}/innovation-brief-agent-toolcall-approval-patents/)切割：那层拦工具调用，本期排 PR 顺序。起步几百元，1 人 3 周出 MVP。

## 创业发现

- 接单形态：先卖"周末 PR 堆积清理"，一轮 5-10 个 PR 收 ¥300-800，交付顺序清单；再转月费看板（¥99-299/队），客户来自独立开发者社区。
- 门槛与风险：大厂权利要求覆盖“生成评审内容”，排序加风险报告是服务层，报价前逐件核对权利要求；排序不准会带偏人，误报率写进报告。

## References

- [Google Patents 检索面（pull request 加 AI 产码加评审分诊，史上 232 件）][gp-triage]
- [US12314707B2 评审预训练][p1]
- [US12481836B2 对话式单测生成][p2]
- [US12524214B1 生成式排障助手][p3]
- [US12688374B2 定制提示生成服务][p4]
- [CN121879734A 代码质量智能检测][p5]
- [HN 哈佛评审瓶颈研究讨论][hn1]


[gp-triage]: https://patents.google.com/?q=%28%22pull+request%22%29+AND+%28%22machine+generated%22+OR+%22AI+generated%22+OR+%22large+language+model%22%29+AND+%28review+OR+triage+OR+prioritiz%29
[p1]: https://patents.google.com/patent/US12314707B2/en
[p2]: https://patents.google.com/patent/US12481836B2/en
[p3]: https://patents.google.com/patent/US12524214B1/en
[p4]: https://patents.google.com/patent/US12688374B2/en
[p5]: https://patents.google.com/patent/CN121879734A/en
[hn1]: https://news.ycombinator.com/item?id=50538303

