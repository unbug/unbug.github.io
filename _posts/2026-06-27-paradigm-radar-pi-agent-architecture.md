---
layout: post
title: "AI 范式雷达：《规划与执行分离：Agent 编排的真实谱系》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-pi-agent-architecture.svg
tags: [Agent, PlanExecute, Orchestration, ReAct, LLM]
description: "规划与执行分离的编排架构从ReAct循环走到工作流分层：本文以真实论文与官方文档重建谱系，给出规划器执行器评估器三件套的工程边界，并撤回首版无法溯源的基准数字。"
---

## 先还一笔旧账

本文 `2026-06-27` 首版曾引用「Anthropic Claude 4 内部基准：PI 架构比 ReAct 提升 47%」「65% 开发者遇到规划失效」两组数字，并附一段 PI SDK 代码示例。`2026-11-16` 复核：前两组数字检索不到任何可公开核实的来源，首版引用的文档链接为占位地址，示例中的 `pi_sdk` 包并不存在——三项全部撤稿，本版不再出现。架构层面的定性判断（规划与执行分离对错误恢复和多工具编排有价值）作为分析观点保留，但本版把它重新钉在可核实的文献与官方文档上：没有对比实验可引，就不写百分比。这次重做本身也是本站口径纪律的一部分——观点可以旧，证据必须新。

![规划-执行编排骨架三件套]({{ site.baseurl }}/assets/images/paradigm-radar-pi-agent-trio.svg)

## 真实谱系：从一步一想到有计划的行动

把这条线按原始文献排开，会发现「先规划再执行」不是什么新发明，而是对 ReAct 缺陷的连续修补。ReAct（arXiv `2210.03629`，Yao 等人，`2022-10` 提交，后发表于 ICLR 2023）让模型交替产出推理轨迹与动作调用，它的问题首版说对了大半：每步只看局部，长任务里历史混排、错误累积。第一条修补路线来自提示层：Plan-and-Solve（arXiv `2305.04091`，ACL 2023）把零样本提示拆成「先制定计划、再按计划执行」两步，证明仅仅让模型先列骨架就能改善多步任务的走偏——这基本就是 PI 思想的最小实验证据，只是规模在提示层而非系统层。第二条修补路线来自搜索层：LATS（arXiv `2310.04406`，`2023-10` 提交）把语言 agent 的推理、行动、规划统一进树搜索，用回溯和重放换错误恢复能力，代价是把单次前向变成多分支采样，成本结构完全不同——树搜索是「规划-执行分离」的昂贵上限形态。

工程世界的收敛点在厂商侧。Anthropic 的《Building Effective Agents》（官方工程博客，`2024-12` 上线，链接在案）给出的分类学把话说得很克制：预定义代码路径走清楚的叫 workflow（其下明确列了 orchestrator-workers 这类「中央模型拆解任务、并行 workers 执行、综合结果」的模式），模型自主决定过程才叫 agent——并提醒多数场景应优先用 workflow、把 agent 留给真正开放式的任务。这份博客没有附任何「对比 ReAct 提升 N%」的基准，这本身就是个信号：一线构建者当时不认为存在可迁移的单一数字。LangGraph 官方文档则提供了可运行的对照实现：其 Plan-and-Execute 教程给出的图结构正是「planner 节点产出步骤列表、executor 节点逐步调用工具、replan 节点决定是否修订」，与首版描述的三件套一一对应——规划器、执行器、评估修订器作为工程模式是真的，只是从来没人公布过它赢 ReAct 的统一百分比。

![从ReAct到工作流分层的谱系时间线]({{ site.baseurl }}/assets/images/paradigm-radar-pi-lineage.svg)

## 两篇打底论文的精读

谱系里前两篇值得逐句读，因为它们把「规划」的收益和代价都标定了刻度。Plan-and-Solve 的问题定义非常窄：Zero-shot-CoT（「让我们一步一步思考」）在算术类任务上暴露三类失败——计算错误、漏步错误、语义误解——作者只认领其中一类：漏步错误（missing-step errors），解法就是让模型先「制定计划把整个任务切成子任务、再逐一执行」。这种克制值得注意：它没有宣称规划让一切变好，而是宣称规划精确打击一种失败模式，实验也围绕算术与推理数据集展开。后来工程圈把「先列计划」泛化成万灵药，超出了原论文的主张范围——本文首版那种「提升 47%」式的断言，正是这种泛化的极端产物。LATS 则走向另一个极端：把蒙特卡洛树搜索装进语言 agent，用模型自己当价值函数、用自反思生成扩展分支、用环境反馈（测试结果、网页观察、执行报错）回传信号做选择，在编程与交互式决策两类任务上换来了显著更强的错误恢复。它的账本同样诚实：搜索树意味着同一问题要采样多条轨迹，token 消耗与延迟按分支数放大——「规划-执行分离」的收益上限确实存在，但明码标价，付费方式是计算。把两篇并排放，PI 模式的合理预期就出来了：它买的是「漏步与失控」，付的是「计划开销与修订轮数」，值不值要看任务里漏步造成的返工有多贵。

## Anthropic 页面上的五个模式名

《Building Effective Agents》整页值得细读的地方在于它给了一组模式专名，而不是一个口号。页面把「预定义代码路径」的编排系统叫 workflow，逐一展开五个模式：prompt chaining（把任务切成固定次序的子调用，每步消费上一步输出）、routing（先分类再分流到不同处理链）、parallelization（分段并行或同一路务多投投票）、orchestrator-workers（中央模型动态拆解任务、派发给 workers、综合结果）、evaluator-optimizer（生成与评审交替，评审者决定是否返工）。首版三件套里的 Planner/Executor 大致对应 orchestrator-workers，Evaluator/Revisor 对应 evaluator-optimizer——也就是说，PI 并不是一个与这套分类学平行的「新架构」，而是其中两个已命名模式的组合称谓。页面另一半立场同样常被转述丢失：作者建议「能找到足够简单的方案就用它，只在必要处增加复杂度」，agent 形态留给「无法预知步数、结构开放式」的问题；而页面通篇没有给出任何跨场景成功率对比。一线实验室把「何时不该上自主循环」写成显式建议，这比任何基准数字都更能说明当时工程共识的真实形状。

## 框架层的实物证据：星数与尸体

编排框架是这条范式最诚实的读数仪。OpenAI 的 swarm 仓库（`openai/swarm`，实测 `2026-11-16`）自述定位「探索轻量多 agent 编排的教学框架」，`22,141` 星、`2,355` fork，但最后一次 push 停在 `2026-04-15`——教学示例毕业后没人维护，是编排层快速商品化的标本。接棒者 openai-agents-python（Agents SDK）创建于 `2025-03-11`，实测 `30,701` 星、`5,062` fork，复测当天仍有提交：官方把「handoff（控制权移交）」做成一等公民，恰好是编排问题从「自己写循环」变成「框架原语」的注脚。两个仓库放一起读，能读出一个与 PI 互补的事实：规划-执行分离的思想没有以「PI 框架」的形态胜出，而是被拆进了各家 SDK 的默认图结构里——思想赢的方式是溶解。图结构一派的旗舰也在同一坐标系里：langgraph 仓库实测（`2026-11-16`）`45,004` 星、当天仍有提交，plan-and-execute 教程至今是官方文档的常设章节；微软阵营的 microsoft/agent-framework 实测 `14,697` 星、`11-15` 有提交，三家的 README 里都找不到「比 ReAct 提升 N%」式的句式——框架商卖的是控制原语，不是对比实验，这个沉默本身就是本节最重要的证据。

## 三件套还站得住吗：工程分析（分析观点）

去掉虚构数字后，首版的架构分析哪些仍然成立？逐条重估。Planner 产出结构化计划、Executor 按计划调用、Evaluator/Revisor 监控偏差并触发修订——这个三件套成立，且比首版说得更准的表述是：它的价值不在「成功率数字」，在于把三类失败模式变成可分别治理的对象。规划幻觉（Planner 编出不存在的工具或参数）可以在规划阶段用工具 Schema 校验拦截，这是执行阶段做不到的，因为 ReAct 里没有「完整计划」这样一个可以整体校验的中间产物；循环依赖可以在计划生成期用 DAG 检查拒绝，同理；副作用治理（崩溃后哪些步骤可重放、哪些必须跳过）第一次有了天然的 checkpoint 边界——计划步骤就是状态机的节点。这三条都是结构性收益，不依赖任何基准数字就成立，本文明确标注为分析观点。反过来，两条代价也要写清：计划本身会过期，环境在长任务里持续变化，静态计划的有效期是门函数；而 replan 每触发一次，就是一次全上下文推理，规划-执行分离省的常是「步骤数」，加的是「修订轮数」，净收益强依赖任务结构——流程越像流水线越赚，越像探索越亏。这正是本站[《CodeAct：Agent执行范式转移》]({{ site.baseurl }}/paradigm-radar-codeact-agent-execution/)把赌注押在「直接生成程序」上的原因：程序本身就是计划，控制流由解释器免费执行，省掉了「计划→逐步决策」的中间商。

## 失败之后的三种岔路：重试、修订还是止损（分析观点）

三件套真正见功夫的地方是失败分类学。步骤失败至少分三类，处置完全不同：瞬态失败（网络抖动、限流、超时）该重试，且该在原步骤内重试——惊动 Planner 是浪费；结构性失败（计划假设的世界状态不存在，比如目录路径错了、API 换了签名）该修订计划，原样重试一百次也是失败；而价值性失败（任务在当前权限或能力下根本不可达成）该止损上报，继续烧 token 属于事故。ReAct 循环把三者混作「观察结果再继续」，planner-executor 图结构给了分诊挂点：executor 的失败标记是 typed 的，replan 触发条件是显式写死的——这等于把「错误恢复」从模型的临场发挥变成图上的边。这个分诊台与后续两期的关系值得接线：失败归因（哪些失败其实是 harness 缺陷而非计划缺陷）在[《HarnessFix：失败轨迹自动修复》]({{ site.baseurl }}/paradigm-radar-harnessfix-diagnose-repair-agent-failures/)有更系统的处理；而 evaluator-optimizer 模式的命门——评审者判断力跟不上生成者——正是[《生成-验证差距与自我修正失败》]({{ site.baseurl }}/paradigm-radar-generation-verification-gap/)整期讨论的问题，Revisor 的可靠性上限就是评审模型的鉴别力上限。

## 边界与观察点

三条边界。其一，本文比较的是编排形态，不是模型能力——同一家 SDK 里 planner 节点换成哪个模型都还是那个图结构，模型越强、裸 ReAct 的可用半径越大，规划层的相对收益就越向「超长任务、多副作用、需要审计」的场景收缩。其二，「先规划」与「先授权」是两件事：规划解决「怎么做」，权限声明解决「被允许做什么」，后者住在[《Agent 权限清单要住进哪个载体》]({{ site.baseurl }}/paradigm-radar-agent-permission-artifact/)讨论的工件层，别指望计划文件兼职。其三，谱系右侧还在动：Anthropic 博客自己把「workflow 优先」写成给开发者的建议，而模型代际每往前一步，这条建议的适用范围就被测试一次。给动手的人三条最小动作：拿 LangGraph 官方 plan-and-execute 教程跑通一次三件套图结构，对照同模型裸 ReAct 在你自己任务上的表现；给计划产物加 Schema 校验与 DAG 检查，成本约半天；把「计划修订次数」记进你的观测指标——它比首版那种来历不明的成功率数字诚实得多，也更接近你生产环境的真相。

收尾给一张路线牌：本篇管来路与结构——谱系从哪里来、三件套长什么样；怎么接、怎么测、会在哪些地方翻车，交给实战篇《Plan-Execute 实战：上下文隔离与自测协议》；工具层的接口怎么标准化、编排层与它如何接缝，交给互联格局篇与《MCP×规划执行：工具层与编排层的接口》。三篇分工各管一段，引用时请按段取用，别拿结构篇的框架图去回答工程题，也别拿实战篇的踩坑清单去反驳谱系判断——范式的地图上，比例尺和等高线是两种不同的诚实。

## References

- [ReAct: Synergizing Reasoning and Acting in Language Models][links-1]
- [Plan-and-Solve Prompting][links-2]
- [LATS: Language Agent Tree Search][links-3]
- [Anthropic：Building Effective Agents][links-4]
- [LangGraph：Plan-and-Execute 教程][links-5]
- [openai/swarm 仓库][links-6]
- [openai/openai-agents-python 仓库][links-7]

[links-1]: https://arxiv.org/abs/2210.03629
[links-2]: https://arxiv.org/abs/2305.04091
[links-3]: https://arxiv.org/abs/2310.04406
[links-4]: https://www.anthropic.com/engineering/building-effective-agents
[links-5]: https://langchain-ai.github.io/langgraph/tutorials/plan-and-execute/plan-and-execute/
[links-6]: https://github.com/openai/swarm
[links-7]: https://github.com/openai/openai-agents-python
