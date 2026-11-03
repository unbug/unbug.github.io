---
layout: post
title: "一分钟读论文：《AI 网络安全特工征服 CTF》"
categories: [AI, Security]
image: assets/images/cai-ctf-dominance.svg
tags: [Cybersecurity, AI, CTF, Agent]
description: "Alias Robotics 的 CAI 系统在 2025 年五大国际 CTF 竞赛中系统性击败人类队伍，赢得 5 万美元 Neurogrid 大奖，并通过熵基动态模型选择把推理成本降低 98%，论文据此主张传统 Jeopardy 式 CTF 已过时，安全运营需转向 AI 优先架构。"
---

Alias Robotics 的论文[《CAI: Dominate CTFs》][paper1-url]（arXiv:2512.02654）报告 CAI 系统在 2025 年五大国际 CTF 竞赛中系统性击败人类队伍，并赢得 Neurogrid CTF 大奖。

![CAI在全球CTF竞赛中的统治性表现](assets/images/cai-ctf-dominance.svg)

## 五大竞赛的战绩

CTF（Capture-the-Flag，夺旗赛）传统上被认为是识别顶级安全人才的黄金标准，2025 年这一地位被 AI 动摇。CAI 的关键战绩：

- **Neurogrid CTF**（155 队）：41/45 旗、`91%` 解题率，以 33,917 分、领先 1,925 分夺冠，64 分钟内达到 10,517 分，而人类团队需要 24 小时以上
- **Dragos OT CTF**（1,200+ 队）：32/34 旗，5.42 小时率先达到 10,000 分，比最快人类团队快 `9.8 分钟`，前 7-8 小时排名全球第一，最终第 6 名
- **HTB AI vs Humans**（163 队）：19/20 旗，AI 类别第 1
- **Cyber Apocalypse 2025**（8,129 队）：30/77 旗，最终第 859 名
- **UWSP Pointer Overflow**（635 队）：起跑比前三名晚 50 天，仅用 60 小时追到第 21 名，表明同等时间内可与顶尖人类队伍匹敌

## 技术架构与成本突破

CAI 采用 alias1 作为基础模型，通过`熵基动态模型选择`决定何时激活昂贵的辅助 SOTA 模型：词级不确定性（困惑度）量化预测不确定性，任务级置信度校准评估整体解法把握，两者经加权调和均值组合，仅在两种信号都指示不确定时才切换。

成本结果是论文最具实际意义的贡献：纯 Claude Opus 4.5 每百万 token 成本 `5.94 美元`，10 亿 token 需 5,940 美元；CAI 在 k=2 配置下每百万 token 仅 `0.12 美元`，10 亿 token 只需 119 美元，成本降低 `98%`，连续安全代理运营首次在财务上可行。

 ## CTF 范式与安全运营的转变

论文核心论点之一是传统 Jeopardy 式 CTF 已经过时：当 AI 在逆向工程、密码学、Web 利用和取证各类别都接近满分时，竞赛只衡量计算速度和资源分配，不再区分安全能力。作者主张将 Jeopardy CTF 退役到回归测试，建立含实时服务防御、自适应补丁管理和战略资源分配的 Attack & Defense 格式作为新标准。

对 OT（运营技术）安全而言，CAI 以 37% 速度优势登顶 Dragos OT CTF 表明，工业控制系统防御不能再假设人类速度足够，作者预言到 2030 年没有 AI 代理的安全运营将像没有防火墙的网络防御一样过时。

论文同时坦承局限：`最后的 5% 问题`——Dragos 最后 1,000 分需要额外 24 小时；CTF 与真实生产环境之间仍有巨大鸿沟；古德哈特定律下的评估危机——缺乏有意义的 AI 安全能力基准。伦理上，91% 解题率代表攻防双重用途能力，AI 驱动 SOC 误操作的责任归属、专业知识民主化同时降低对手门槛等问题仍未解决。

## References
- [CAI: Dominate CTFs with Cost-Efficient Multi-Model Orchestration][paper1-url]
- [CAI GitHub][links-1]
- [Attack/Defense CTF 评估（arXiv:2510.17521）][links-2]
- [CAIBench 基准（arXiv:2510.24317）][links-3]


[paper1-url]: https://arxiv.org/abs/2512.02654
[links-1]: https://github.com/aliasrobotics/cai
[links-2]: https://arxiv.org/abs/2510.17521
[links-3]: https://arxiv.org/abs/2510.24317
