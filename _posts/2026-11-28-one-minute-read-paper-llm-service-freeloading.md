---
layout: post
title:  "一分钟读论文：《白嫖大模型的五百家店》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/one-minute-read-paper-llm-service-freeloading.svg
image_alt: "左栏：三个头部项目 2026-11-16 快照星数 75,841、33,129、32,484 对比中位数 1 星；右栏：682 个去重组合中三种调用方式 452、100、13；脚注：62 家有可查条款的服务里 58 家明确禁止至少一种被观测做法。"
tags: [LLM, OpenSource, Security, Cost]
description: 清点出 513 个把免费大模型推理改造成独立 API 的开源项目，覆盖 64 家上游服务，93.0% 的仓库建于 2026 年，83.2% 的路径靠复刻产品协议而非破解。
---

华中科技大学的论文[《Demystifying Real-world LLM Service Freeloading》][paper1-url]清点出 `513` 个把免费大模型推理改造成独立 API 的开源项目，涉及 `64` 家上游服务、`1,588` 条推理路径，`93.0%` 的仓库建于 2026 年。

论文把这类项目称作 LLM service freeloading（LSF，大模型服务白嫖）：第三方把大模型网页应用或专用客户端的免费推理，在超出厂商允许的访问、额度或再分发条件下，重新包装成独立 API。它量的是被观测到的开源生态。

## 513 个项目在卖什么

数据集来自 `24` 个 GitHub 检索式：`5,963` 条命中去重得 `5,181` 个仓库，剔除 `149` 个资源清单类仓库，`76` 个项目构成种子集，最终纳入 `513` 个 LSF 项目；抽样复查的内漏报率（false omission rate）为 `2%`。

被转卖的主要是四个网页产品的免费额度：`513` 个项目中 `264` 个（`51.5%`）至少支持其一——DeepSeek Web `105` 个、Gemini Web `86` 个、Qwen Web `57` 个、ChatGPT Web `37` 个，DeepSeek 覆盖最广。

## 不用破解，复刻协议就够

反直觉的是技术门槛。按「下游协议族 × 上游服务 × 调用方式」去重得 `682` 个组合，`452` 个用的是 direct product request：项目自己复刻产品客户端正常发出的 HTTP 或 WebSocket 请求，不运行浏览器就能转手免费推理；`100` 个走浏览器中介，只剩 `13` 个用专用客户端桥接。摘要口径同样显示，直接 HTTP 或 WebSocket 请求占路径的 `83.2%`。

另一条省力办法是账号轮转：`304` 条路径（`19.1%`）出现账号选择或轮转，持多账号的项目能把请求摊到各份额度上。

## 62 家条款对上了 58 家

政策分析给出的数字是 `58` 比 `62`：可查条款覆盖 `62` 家上游服务，其中 `58` 家明确禁止至少一种被观测做法，包括自动化访问、账号共享或服务再分发。

作者同时是披露方：`513` 个项目已全部上报 GitHub 请求审查，`64` 家厂商也都收到通知。论文自陈 GitHub 已对 `2` 个仓库页加限制，要求签名访问并显示「This repository contains malicious content」警告。这是作者的上报动作，不等同于平台的处置结论。

## 中位 1 星与 8.7 万星

![三个头部项目 2026-11-16 快照星数 75,841、33,129、32,484 对比中位 1 星；右侧 682 个去重组合里三种调用方式 452、100、13]({{ site.baseurl }}/assets/images/one-minute-read-paper-llm-service-freeloading.svg)

关注度极度不均。以论文 `2026 年 11 月 16 日` 采集的 GitHub 指标为准，星数中位数是 `1`，`383` 个仓库（`74.7%`）不足 `10` 星，而 `10` 个项目拿走全部星数的 `89.0%`，前 `3` 名占 `74.8%`。三个头部仓库分别是客户端插件、账号管理器和多服务网关：[dsh-our-free-model][links-1] 快照 `75,841` 星，Antigravity-Manager `33,129` 星，[9router][links-2] `32,484` 星。

这些是论文测量的项目，不是本文复现物。`2026 年 11 月 26 日` 实测，dsh-our-free-model 已涨到 `87,694` 星，两个口径不可混用；三个头部仓库里两个许可证为 NOASSERTION，可访问、可审计，但许可不完整。活跃度同样集中：前 `90` 天有推送的 `286` 个仓库中，`211` 个（`73.8%`）在同一窗口内新建，论文提醒这不等于开发频率上升。

## 这份清单量到了什么边界

局限得和数字一起读。发现依赖检索式、公开仓库与所选协议族，术语陌生、自定义接口、源码不可访问、GitHub 之外的实现都可能漏掉，人工复核也找不回从未发现的项目；结论只刻画被观测到的生态，不代表 LSF 的整体规模或普遍率。免费额度、厂商政策与项目实现都在演化，数字只反映研究时点。

这条生态与工具层的清点互为对照：站内[《护栏工具层月装五百四十万次，纸面专利一个号都追不上》][links-3]量的是防御侧安装量，口径同为公开可访问指标，切入另一侧。

## References
- [Demystifying Real-world LLM Service Freeloading (arXiv:2611.33218)][paper1-url]
- [论文所测量的项目：Ebony-Vinyl/dsh-our-free-model][links-1]
- [论文所测量的项目：decolua/9router][links-2]
- [站内：护栏工具层月装五百四十万次，纸面专利一个号都追不上][links-3]


[paper1-url]: https://arxiv.org/abs/2611.33218
[links-1]: https://github.com/Ebony-Vinyl/dsh-our-free-model
[links-2]: https://github.com/decolua/9router
[links-3]: {{ site.baseurl }}/innovation-brief-guardrail-install-gap/
