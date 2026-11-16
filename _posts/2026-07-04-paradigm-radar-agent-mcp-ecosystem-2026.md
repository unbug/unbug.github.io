---
layout: post
title: "AI 范式雷达：《六种协议与四个框架：2026 Agent互联格局》"
author: unbug
categories: [AI, ParadigmRadar, Agent]
image: assets/images/paradigm-radar-agent-mcp-ecosystem-2026.svg
tags: [Agent, MCP, A2A, LangGraph, CrewAI, AutoGen]
description: "二〇二六年agent互联格局盘点：MCP、A2A、AP2等六种协议各管一层，四个编排框架的实测星数与选型边界，并撤稿首版转引的两处无源效率增益数字。"
---

## 先还一笔旧账

本文首版（`2026-07-04`）两处数字站不住，`2026-11-16` 复核后撤除：其一，「根据 Anthropic 的报告，早期采用 Agentic AI 架构的组织实现了 30-50% 的效率增益」——查无此文，Anthropic 的工程博客谈的是工作流模式与「寻找足够简单的方案」，从未发布过这样一个组织级增益区间；其二，「行业实践报告显示采用 MCP 与成熟框架的项目节省 40-60% 开发时间」——同样无源，连带摘要里「省下一半集成代码」的说法一并作废。撤除后本篇并不因此空心：协议时间线、框架格局、仓库活跃度全部可以钉在公开页面上，本篇按可核实的重讲一遍，并把首版真正有价值的分层视角（六种协议各解决互联栈的一层）展开成地图。

## 六种协议，四层分工

`2026` 年的 agent 互联词汇表确实膨胀了：MCP、ACP、A2A、A2UI、AG-UI、AP2——但把它们按「管哪一层」摆开，混乱立刻减半。工具与上下文层：MCP（Model Context Protocol，Anthropic `2024-11` 发布）管模型应用连工具与数据源，官方仓库 modelcontextprotocol/servers 实测（`2026-11-16`）`92,025` 星、`11-12` 仍有提交；同层曾有 ACP（Agent Communication Protocol，IBM 为 BeeAI 平台于 `2025-03` 推出，REST 优先、异步优先），但它已在 `2025` 年下半年正式并入 A2A——IBM 的孵化主管进入 A2A 技术指导委员会，独立开发停止、团队整建制转入，这是六个名字里第一个「名字还响、身体已合并」的。Agent 互调层：A2A（Agent2Agent）`2025-04-09` 由 Google 发布、`2025-06-23` 在 Open Source Summit 上捐给 Linux Foundation，发起成员包括 AWS、Cisco、Microsoft、Salesforce、SAP、ServiceNow——厂商中立托管这一步让它成了互调层的默认候选。界面层：AG-UI 用 SSE 事件流把 agent 内部状态（文本增量、工具调用三段式、状态补丁、人机中断）投给前端，微软 Agent Framework、AG2、LangGraph 都挂了一等集成，社区里流传的三句口号把它的位置说得最干净——MCP 管工具、A2A 管 agent、AG-UI 管用户；A2UI 走声明式界面描述的路线，同属「agent 输出不止是文本」这个战场。支付层：AP2（Agent Payments Protocol，Google `2025-09-15` 联合六十余家支付机构发布）处理「agent 代替人花钱」的授权凭证链——这是六者里唯一直接踩在钱上的协议，治理重量完全不同。四层地图的价值在选型纪律：「MCP 和 A2A 谁赢」是个病句，一个管模型伸手拿工具，一个管 agent 之间打电话，分层之后互操作问题第一次可以逐层回答。支付层单独多说一句，因为它的第一份正式文本就带着全行业最重的措辞：AP2 的规范通篇围绕授权凭证链展开，核心对象 Payment Mandate（支付授权凭证）用可验证凭证（Verifiable Credential）把「用户授权了什么、上限多少、给哪个商户」写成密码学可审计的对象——协议正文出现 近百次的关键词是一个授权凭证而非任何消息格式，这说明起草人清楚自己面对的不是连通性问题而是责任链问题：agent 花错钱时，法庭上能出示什么。六层里其他五层都在解决「怎么说话」，只有支付层在解决「说错话谁负责」，这也是本篇判断它最可能率先被监管点名（而非率先普及）的原因。

![四层协议地图与四个框架的落位]({{ site.baseurl }}/assets/images/paradigm-radar-protocols-four-layers.svg)

| 协议 | 管哪层 | 消息载体 | 治理现状 | 一句话点评 |
|------|--------|----------|----------|------------|
| MCP | 模型→工具/数据 | JSON-RPC | 多厂商事实标准，未入基金会 | 管道定位，刻意无状态 |
| ACP | agent→agent | REST/MIME | 已并入 A2A | 第一个身体合并的名字 |
| A2A | agent→agent | JSON-RPC+SSE | Linux Foundation | 中立性最齐的一张牌 |
| AG-UI | agent→用户 | SSE 事件流 | 开源社区+框架集成 | 「三件套」里最年轻的位置 |
| A2UI | agent→用户 | 声明式界面 | Google 主导 | 与 AG-UI 同位置竞争 |
| AP2 | agent→支付 | 授权凭证链 | Google+六十余支付机构 | 唯一踩在钱上的一层 |

（治理状态与集成名单为 `2026-11-16` 据公开页面复核；装机量无公开口径，本表不下「谁赢了」的结论。）

## 合并比收敛来得早

协议格局读到最后只剩一个问题：六个名字剩几个？`2025` 年的答案比多数评论预期得快——ACP 并入 A2A 不是孤立事件而是模式：`2025-06` Google 把 A2A 捐给 Linux Foundation，`2025-07-29` Cisco 拉上 LangChain 与 Galileo 把 Agntcy（自称「智能体互联网」，管发现、身份、消息、观测四件事，六十余家公司背书）也捐了进去，随后 ACP 跟着身体入场。Linux Foundation 在几个月里收下三个 agent 协议项目，成了事实上的公共落点——而 MCP 至今没走这条路，它靠 OpenAI、微软相继接入获得中立性，而不是靠治理架构。两条路线的对照是 `2026` 年协议政治的全部剧情：托管中立派宣称「不交给基金会就等于让厂商保留改约权」，产品扩散派反驳「规范治理委员会救不了没人用的协议」。DID 路线的 ANP 仍在场外，主张去中心化发现，短期内看不到装机信号。合并给选型的直接红利：给互调层押 A2A 现在比 `2025` 上半年安全得多——最大竞争者的团队已坐在同一张指导委员会桌上；而「薄适配层、一周可退出」的纪律仍然值得对任何协议保持，合并会迟到，不会缺席。

## 三条选型纪律（分析观点）

把上面的地图压缩成可执行的三条。第一，采用时点跟着宿主默认值走：一个协议值不值得押注，最硬的信号不是规范页而是「你依赖的宿主产品是否默认开启」——OpenAI 接入 MCP 之后，工具层协议才算进入了「不采用才是风险」的区间；在此之前采用，承担的是生态波动而非收益。第二，把版本锁写进部署物：MCP 规范以日期版本化（如 `2025-06-18` 版在案），服务器与客户端的兼容矩阵靠运行时协商，生产部署必须显式钉住协商范围并配降级路径——协议快速演进期的集成故障，九成来自「谁都没改代码，但对面升级了」这一种无责事故。第三，任何协议接入都包一层自家适配层，且保持一周可退出：适配层的成本是几百行胶水，收益是协议合并、更名、治理易主时的逃生门——`2025` 年 ACP 用户的迁移通知书已经证明了这条纪律的对价。三条的共同精神只有一句：把协议当供应商合同来读，好处按页签收，风险按页设防——合同意识是这轮协议通胀期里，小团队唯一负担得起的对冲工具。

## 四个框架：实测星数与各自的天花板

编排框架一派的公开刻度（GitHub API 实测，`2026-11-16`）：AutoGen `61,865` 星（`2023-08` 创建，`11-12` 有提交）、CrewAI `60,970` 星（`2023-10` 创建，当天仍在推）、LangGraph `45,004` 星（当天有提交）、Semantic Kernel `28,777` 星——注意这组数字的正确读法：星数是注意力指标不是质量指标，且两两星数差不到 `1.5` 倍，「谁胜出」的叙事在数据上不成立。各自被验证过的长板依旧清晰：LangGraph 把状态图、节点级重试、条件分支做成了基础设施级抽象，适合显式控制的生产工作流；CrewAI 的角色-任务-团队抽象最大的功能是产品经理能读懂；AutoGen 的消息驱动适合对话式协作与仿真；Semantic Kernel 的价值在微软生态的身份、策略与合规钩子。天花板同样各有一块：状态图的学习曲线、角色抽象对确定性要求的遮蔽、对话式协调的 token 账单（agent 之间每句话都是真金白银的推理开销）、以及 SK 在非 .NET 语言的存在感。创建日期还藏着另一个读法：Semantic Kernel `2023-02`、LangGraph 与 AutoGen 同为 `2023-08`、CrewAI `2023-10`——四个框架全部诞生于 `2023` 年，那是 ChatGPT 之后第一波「必须给 LLM 找个循环」的集体冲动，而 `2024-2025` 没有任何新框架挤进头部。格局冻结通常意味着抽象层已经收敛：编排框架的战争在创建时间线上就结束了，之后的星数只是存量再分配；对选型的含义是，押注新框架的机会成本远高于给老框架写适配层。选型的诚实版本从来不是排行榜，而是把你的主导约束（控制粒度、团队语言、合规域）逐一对到天花板下面。

## MCP 时间线：可以钉在页面上的部分

把散在官方页面的时间线钉成一条：`2024-11` Anthropic 发布 MCP 与首批服务器（官方新闻稿在案）；`2025-03-04` Sam Altman 宣布 OpenAI 全线采用，从 Agents SDK 起步扩展至 ChatGPT 桌面版与 Responses API——竞争对手的旗舰产品接入对方发起的协议，这在协议史上都值得单记一笔；`2025-06-18` 规范修订（版本化规范页在案）；`2025-09` ChatGPT Apps 开放第三方 MCP 接入；此后协议进入多厂商联合维护期。与 A2A 的「出生即捐基金会」对照，MCP 走的是「先被一家产品化、再被对手接纳」的扩散路径——两条路线的共同点是都学会了把中立性当资产，`2026` 年判断一个新协议能否押注，看它有没有把治理权交出去的意愿，比看它的演示视频可靠得多。规范本体（以 `2025-06-18` 版为准）值得每个评估者读一遍，因为它比新闻稿克制得多：服务端只暴露三种原语——tools（模型可调用的操作）、resources（可读取的上下文源）、prompts（模板化的指令片段），客户端方向同样只有三项——sampling（服务器反过来请求宿主模型做一次生成）、roots（宿主告诉服务器该在哪个文件系统边界内活动）、以及宿主侧的声明能力。值得注意的是规范里没有的东西：没有 agent 间通信（那是 A2A 的地盘）、没有身份联邦（留给宿主与外部 IdP）、没有任何「记忆」对象——MCP 对状态的沉默是刻意的，它把自己定义成管道而非平台。管道定位解释了两件事：为什么 OpenAI 接它不觉得交出主权（接的是一层薄协议不是生态），以及为什么安全社区的担忧全部落在宿主侧——管道自己不设防，设防是宿主的责任，而宿主的默认配置往往没有这道题。MCP 与安全的关系本站另有一期专讲——工具接入面越宽，「最宽管道」的风险越具体，见[《Agent 权限清单要住进哪个载体》]({{ site.baseurl }}/paradigm-radar-agent-permission-artifact/)。

## 边界与观察点

三条边界。其一，本篇只盘点互联层格局，MCP 与规划-执行编排如何接线（工具发现喂给 Planner、callTool 落在 Executor）是[《MCP×规划执行：工具层与编排层的接口》]({{ site.baseurl }}/paradigm-radar-mcp-pi-agent/)的主题，别混着读。其二，协议文本发布不等于部署密度：A2A 的基金会成立、AP2 的六十家背书都是治理信号，生产环境的真实装机量没有公开口径，读到「已成标准」类断言时记得这层空档。其三，确定性编排的口号（「协调零 token」）方向正确但边界未定——协调层能确定化到几成，取决于任务图静态可声明的比例，这个比例没人测过，包括本文。观察信号更新为三条：界面层是下一个合并候选吗——AG-UI 已拿到三个框架的一等集成，A2UI 若不愿做第二实现，「投用户」这个位置可能提前结束战争；MCP 会不会补上治理中立这块短板（复制基金会路径，或以多厂商规范组织替代）——这是六者中最后一个悬而未决的治理问题；Agntcy 的发现与身份层会不会被塞进别家协议——它的四件事里没有一件有标准答案，被吸收进 A2A 或 MCP 扩展都算另一种赢法。三格读数合起来，就是 `2027` 年互联格局的主线剧情。

## References

- [Model Context Protocol 官方站][links-1]
- [Anthropic MCP 发布稿][links-2]
- [Google：Announcing the Agent2Agent Protocol][links-8]
- [Linux Foundation 接收 A2A 捐赠][links-9]
- [Google：Announcing Agent Payments Protocol (AP2)][links-10]
- [MCP 规范 2025-06-18 版][links-11]
- [IBM：What is Agent Communication Protocol?][links-13]
- [The Register：Cisco 将 Agntcy 捐给 Linux Foundation][links-14]
- [站内：MCP×规划执行][links-12]

[links-1]: https://modelcontextprotocol.io/
[links-2]: https://www.anthropic.com/news/model-context-protocol
[links-8]: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/
[links-9]: https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/
[links-10]: https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
[links-11]: https://modelcontextprotocol.io/specification/2025-06-18
[links-12]: {{ site.baseurl }}/paradigm-radar-mcp-pi-agent/
[links-13]: https://www.ibm.com/think/topics/agent-communication-protocol
[links-14]: https://www.theregister.com/2025/07/30/agntcy_lf_donation/
