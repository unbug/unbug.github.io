---
layout: post
title: "AI 智创简报：《护栏工具层月装五百四十万次，纸面专利一个号都追不上》"
author: unbug
categories: [AI, InnovationBrief, Security]
image: assets/images/innovation-brief-guardrail-install-gap.svg
image_alt: "上：提示注入防御工具层近一月安装量，npm promptfoo 5,345,028、PyPI presidio-analyzer 6,698,602、nemoguardrails 469,947、llm-guard 127,352、pyrit 90,800（2026-11-26 实测）；中：OpenAI 官方 RSS 9 条公开轨迹，从 2025-11-07 论文到 2026-11-23 与 Cisco 发布 Shirudo；下：昨夜 GP 检索面封锁，本期可验主题专利 0 件；结论：护栏版本漂移回归体检 1 人 1-2 周可启动"
tags: [Patent, PromptInjection, Guardrails, AgentSecurity, solo-dev]
description: "提示注入防御的开源工具层近一月被装上五百四十多万次，昨夜专利检索面封锁，本期可验主题专利为零件；官方轨迹一年九条从论文走到产品，护栏版本漂移回归体检是 1 人 1-2 周能启动的活。"
---

提示注入防御这一层的开源工具近一月被装上五百四十多万次（npm `promptfoo` `5,345,028` 次，`2026-11-26` 实测），而昨夜专利检索面全程封锁，本期能在纸面逐字核对的同主题新公开是 `0` 件。

![护栏工具层安装量、OpenAI 官方轨迹与纸面专利缺口信息图]({{ site.baseurl }}/assets/images/innovation-brief-guardrail-install-gap.svg)

## 专利信号

本期没有可写的专利——这是事实，不是疏忽。昨夜 Google Patents 检索面全程封锁，本期无新增可验主题专利；已验的 `US20260259908A1`（NEC Corporation，公开 `2026-09-03`）方向是信息处理与关键信息提取，与提示注入防御不同题，不硬挂；`2026-08-24` 期[《微软、蚂蚁都在给 AI 应用打注入疫苗，小团队缺个便宜的体检医生》]({{ site.baseurl }}/innovation-brief-prompt-injection-defense-patents/)已把当时能核的五件写完，本期不再引用旧专利充数。

纸面追不上的是这串工具层数字（均 `2026-11-26` 直连实测、近一月口径，npm 与 PyPI 分列不相加）：

- PyPI：`presidio-analyzer` `6,698,602` 次、`nemoguardrails` `469,947` 次、`llm-guard` `127,352` 次、`pyrit` `90,800` 次、`promptfoo` `16,036` 次
- npm：`promptfoo` `5,345,028` 次、`langchain` `17,660,428` 次、`@huggingface/inference` `2,082,093` 次
- GitHub star：`promptfoo/promptfoo` `27,698`（建仓 `2023-04-28`）、`NVIDIA-NeMo/Guardrails` `7,581`（建仓 `2023-04-18`）、`microsoft/PyRIT` `5,100`（建仓 `2023-12-12`）、`data-privacy-stack/presidio` `12,067`（建仓 `2018-05-04`）

## 技术趋势

纸面数不出来，官方时间线却有九条。OpenAI 官方 RSS（`2026-11-26` 实测）逐字标题：`2025-11-07`《Understanding prompt injections: a frontier security challenge》起步，`2025-12-22`《Continuously hardening ChatGPT Atlas against prompt injection》、`2026-02-13`《Introducing Lockdown Mode and Elevated Risk labels in ChatGPT》、`2026-03-11`《Designing AI agents to resist prompt injection》、`2026-07-15`《GPT-Red: Unlocking Self-Improvement for Robustness》、`2026-11-05`《GPT-6 Cyber: Advancing the frontier of aligned cybersecurity agents》、`2026-11-20`《Combatting adversarial distillation》、`2026-11-23`《OpenAI and Cisco introduce Shirudo》，一年从论文走到与 Cisco 联合发布产品；`2026-09-22`《Better prompt caching for GPT-6》是同一层的成本侧注脚。与 11-25 期[《给AI Agent出考卷的专利来了》]({{ site.baseurl }}/innovation-brief-eval-harness-landgrab/)、11-26 期[《生成式界面库月装一千五百万，纸面专利只剩时间差》]({{ site.baseurl }}/innovation-brief-generative-ui-layer/)、11-21 期[《大厂圈地AI操作层，逐单批准还空着》]({{ site.baseurl }}/innovation-brief-agent-operation-permission-gap/)、11-20 期[《大厂圈地AI评审，PR排队分诊层还空着》]({{ site.baseurl }}/innovation-brief-pr-review-triage-gap/)切割：那四期分别看 agent 出题、界面层安装、操作权限批准、评审排队分诊，本期清点防御这一层装多快、纸面为什么追不上；再与 8-24 期[《微软、蚂蚁都在给 AI 应用打注入疫苗》]({{ site.baseurl }}/innovation-brief-prompt-injection-defense-patents/)切割：那期靠五件专利讲防御在产品化，本期零专利，只清点安装量与官方轨迹。

> 一个议题成熟与否，先看安装量，再看专利号；本期安装量五百四十多万，专利号零。

## 落地机会

**用户场景**：把 `nemoguardrails`、`llm-guard` 挂在 agent 调用链上的独立开发者，护栏库一升级，原先拦得住的注入样本就悄悄漏了；他对客户承诺过“有护栏”，手上却没有一条能证明护栏版本与拦截效果的回归。

一个人能做的是 **护栏版本漂移回归体检**：固定一套注入样本集，每次护栏库升级或提示词变更后重跑，输出拦截率前后对比与漏拦样本归档；`promptfoo`、`pyrit`、CI 矩阵全是现成栈，1 人 `1-2` 周可启动。反方照写：NEC 那件不同题、`promptfoo` 自己就能跑断言，护城河来自交付与跟版本的手艺，不来自专利规避。

## 创业发现

- 交付形态一：护栏漂移体检报告加 CI 门禁模板，按调用链收费，起步成本主要是 CI 机时；首批客户从护栏库的 issue 区与依赖方找，订阅或按次均可。
- 交付形态二：注入红队验收与 8-24 期那期生意相邻，本期差异在“升级后复测”这个复购钩子。
- 门槛与风险：门槛是样本集要随攻击手法持续更新；风险是零专利窗口随时会补上，报告注明非法律意见；反例照写：若只卖扫描脚本，`promptfoo` 免费够用，收不到钱。

## References

- [OpenAI 官方 RSS][rss]
- [OpenAI 提示注入官方博客][oa]
- [PyPI `nemoguardrails` 下载量][pypi1]
- [PyPI `presidio-analyzer` 下载量][pypi2]
- [npm `promptfoo` 下载量][npm1]
- [promptfoo/promptfoo 仓库][gh1]


[rss]: https://openai.com/news/rss.xml
[oa]: https://openai.com/index/prompt-injections
[pypi1]: https://pypistats.org/packages/nemoguardrails
[pypi2]: https://pypistats.org/packages/presidio-analyzer
[npm1]: https://api.npmjs.org/downloads/point/last-month/promptfoo
[gh1]: https://github.com/promptfoo/promptfoo
