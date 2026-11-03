---
layout: post
title:  "一分钟读论文：《三个AI智能体组队修复仓库级问题》"
author: unbug
categories: [AI, Engineering]
image: assets/images/e3-complexity-aware-agent-execution.svg
tags: [Software Engineering, AI Agents, SWE-bench]
description: "天津大学与字节跳动在 ICSE 2026 提出 EnAgent：生成、剪枝、选择三个智能体分工协作修复仓库级缺陷，先广撒候选再逐级筛选，通过率较此前最优方法显著提升并登顶榜单。"
---

天津大学与字节跳动的 ICSE 2026 论文[《Agent-Based Ensemble Reasoning》][paper1-url]提出 EnAgent：三个 AI 智能体组队修复仓库级 Issue，登顶 SWE-bench Verified，Pass@1 达 `78.80%`。

EnAgent 由三个分工明确的智能体组成：生成智能体提出多个修复方案，剪枝智能体快速过滤明显不可行的方案，选择智能体从剩下的方案中选出最优解。这套结构的直觉来源很朴素——单个模型会犯错，但让多个视角先发散再收敛，犯同样错的概率就会下降。

## 仓库级代码修复为什么难

修复仓库级 Issue 比单函数代码生成难一个量级。**集成空间太大**：一个问题可能有多种修复方式，不同 LLM、不同提示策略会产生不同结果，如何从大量候选中找到最优解是首要难题，而把所有候选都跑一遍完整测试的成本又高得不可接受——仓库级基准的单个测试套件动辄数分钟，十几个候选逐一验证会把修复流程拖成小时级任务。**仓库级理解要求高**：需要理解整个代码库结构，知道修改哪个文件、哪个函数，还要保证修改不破坏其他功能——局部正确与全局兼容经常互相矛盾。EnAgent 把问题建模为最优解搜索，用三个模块化智能体分别负责探索、过滤和决策，把"想得广"与"验得起"拆成两个独立问题各自解决。

## 三个智能体各司其职

**生成智能体（Generator）**用多种 LLM（如 GPT-4、Claude、DeepSeek）搭配不同提示策略各生成一个修复方案，构成多样化的候选池，相当于先头脑风暴、暂不评判。**剪枝智能体（Pruner）**用静态检查（语法对不对）和简单测试（基本逻辑通不通）快速把候选池从十几个缩小到 `2-3` 个，避免每个方案都完整测试的高成本——这是整个系统能落地的关键：便宜的过滤器承担绝大部分淘汰量。**选择智能体（Selector）**对剩余候选做完整测试，用代码质量、兼容性等更复杂的评估标准选出最终方案。模块化设计让三个智能体可以各自升级而不必重写整个系统，换用更强的模型只会让对应环节变强。

## 实验结果与启发

论文在 SWE-bench（从真实开源仓库抽取的 Issue 修复基准）上实验：使用 `3` 种主流 LLM，对比 `4` 种 SOTA 方法，EnAgent 平均提升 `10.22%` Pass@1——在这个边际改进以百分点计的领域是很大幅度的进步；集成到 Trae Agent 后登顶 SWE-bench Verified，Pass@1 达 `78.80%`，意味着在标准测试集上能解决近八成的真实仓库 Issue。对工程师的启发与系统本身同构：遇到问题先多想几个方案，快速排除不靠谱的，再认真验证剩下的——AI 正在学习人类团队的工作方式，而人类团队的分工经验（评审分级、漏斗式筛选）正在被证明同样适用于智能体系统设计。EnAgent 的思路与 Trae Agent 框架同源，可参阅站内[《多代理集成推理攻克仓库级问题》]({% post_url 2026-02-28-trae-agent-ensemble-reasoning %})。

## References
- [Agent-Based Ensemble Reasoning for Repository-Level Issue Resolution][paper1-url]
- [arXiv:2507.23370][links-1]


[paper1-url]: https://arxiv.org/abs/2507.23370
[links-1]: https://arxiv.org/abs/2507.23370
