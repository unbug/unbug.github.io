---
layout: post
title:  "AI 范式雷达：《把 Agent 的线拉进自己的箱子》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/agent-gateway-layer.svg
tags: [agent, llm-proxy, ai-gateway, litellm, supply-chain, observability]
description: "十天窗口内自建代理需求主帖303分、承载网关层的LiteLLM遭供应链投毒主帖596分、厂商把agent gateway定为品类名：对智能体的信任支点正从厂商后台迁移到开发者自建代理进程。"
---

`2026-10-16` 至 `10-28` 的十二天里，agent 与模型之间那根直连裸线在 Hacker News 上同时遭到需求、事故、命名三向挤压：

个人开发者主帖「不跑自己的 LLM proxy 你怎么知道发生了什么」（HN `50145507`）拿到 `303` 分、全树 `219` 条评论；市占头部的 `62,195` 星（实测 2026-10-28）LiteLLM 在 PyPI 被投毒（HN `50181114`，`596` 分、`202` 条评论）；Maxim AI 官方博客把「Agent Gateway」定为品类名（自述）。

范式表述：**agent 观测网关化——开发者不再接受 agent 与模型/工具之间的通信只存在于厂商后台，而是把这层流量实时收进自己运行的代理进程里，看、记、限、拦；对 agent 的信任支点正从「信平台后台」迁移为「信自己脚下的这条线」。**全部数字为 `2026-10-28` 经 HN API 全树遍历与 GitHub API 实测，厂商数字标注自述。据我们观察未发现同类中文报道。

![窗口内证据矩阵：需求与事故两根轴热度最高，直接命名品类的帖子热度最低]({{ site.baseurl }}/assets/images/agent-gateway-layer.svg)

## 供给与命名

代理层（proxy/gateway，指夹在客户端与模型 API 之间、由使用者自己运行的中转进程）不是新物：GitHub API 实测（2026-10-28）搜索总数 `q="llm gateway"` `11,728`、`q="ai gateway"` `19,012`，存量巨大。波的动作在头部换代与命名更新。`10-27`，Maxim AI 官方博客《Introducing Agent Gateway in Bifrost: One gateway for models, tools and agents》（厂商自述）把 models、tools、agents 一个网关写成品类名，并同步进 maximhq/bifrost 仓库描述（`9,153` 星，实测 2026-10-28）；该命名帖只有 `2` 分。窗口内新建同类仓星数都小：nenya `36` 星、sturnus `13` 星、Strix 供应链防火墙 `18` 星；波的形成形态是老仓上新品类词加小仓涌现。评论区同时是集市：agentsview（`6,289` 星，实测 2026-10-28，评论 `50147725` 推荐的非代理查看器路线）、nenyamy、agent-beacon、Relay 等至少六个互不隶属的新工具自荐。与第 17 期[《Agent 说完不算，拿出证据》]({{ site.baseurl }}/paradigm-radar-agent-forensics-layer/)的切割：那期是事后证据层，本期是实时传输层；证据层回答「它做过什么」，网关层回答「此刻这字节经过谁的手」。

## 反方与边界

需求侧最硬的对手不是厂商，是规范派。评论 `50151130` 逐字称「You don't need a proxy to do this」，代理会把单点故障直接放进生产力线里，Codex 与 Claude Code 都输出 OTEL traces；`50147603`、`50152949` 附和。代理派的回应（评论 `50154093`）是规范落地靠 harness 自觉。更锋利的是评论 `50147291`：「imagine a world where LiteLLM and all the other LLM shovels weren't buggy vibecoded messes」——加一层代理就是加一条供应链，`596` 分的投毒帖把这条反方变成既成事实。事故细节同样打在信任结构上：被投毒的 `1.107.0` 已从 PyPI 撤下（实测 `10-28` 最新版本 `1.106.5`），官方 issue `#47826` 记录企业版走私有 registry 分发 embargoed（受限）修复——企业通道与开源通道分裂。边界继续列开：`50153072` 与 `50151189` 质疑「自建代理=透明」的前提，代理只看到 harness 愿意给的，闭源 harness 换个子域名照样 phone home；`50147381` 称订阅制下成本监控是伪需求。

## 品类成形度与观察点

诚实信号：直接命名品类的两条（Bifrost `2` 分、Respan Rust 网关 `53` 分）热度低，高分集中在需求情绪（`303`）与事故（`596`）两根轴上——这是品类前夜形态，不是品类成熟形态。口径限定：全部星数与热度为实测 `2026-10-28`、随时间可变；Bifrost 与 agent-beacon 的定性均为厂商或作者自述口径；据我们观察未发现同类中文报道。与第 18 期[《当你的笔记本上住进别人家的守护进程》]({{ site.baseurl }}/paradigm-radar-agent-daemon-sovereignty/)方向正好相反：那期是驱逐别人代码常驻本机，本期是开发者亲手在脚下立一个中间件——同为「主权」叙事，动作互为镜像。实操侧窗口内已给出动作：钉住版本（pin）、发版冷却期（cooldown）、金丝雀升级。观察点：OTel GenAI 规范扩展（agent-beacon，评论 `50153592`）是否最终吃掉自建代理叙事，规范派与代理派的胜负就是下一期的选题判据。

## References
- [HN 50145507：不跑自己的 LLM proxy 怎么知道发生了什么][links-1]
- [HN 50181114：LiteLLM 1.107.0 投毒版本安装凭据窃取器与后门][links-2]
- [Maxim AI 官方博客：Introducing Agent Gateway in Bifrost][links-3]
- [BerriAI/litellm GitHub 仓库][links-4]
- [maximhq/bifrost GitHub 仓库][links-5]
- [LiteLLM issue #47826：企业版私有 registry 分发 embargoed 修复][links-6]


[links-1]: https://news.ycombinator.com/item?id=50145507
[links-2]: https://news.ycombinator.com/item?id=50181114
[links-3]: https://www.getmaxim.ai/bifrost/blog/introducing-agent-gateway-in-bifrost-one-gateway-for-models-tools-and-agents
[links-4]: https://github.com/BerriAI/litellm
[links-5]: https://github.com/maximhq/bifrost
[links-6]: https://github.com/BerriAI/litellm/issues/47826
