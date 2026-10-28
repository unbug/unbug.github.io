---
layout: post
title: "AI 范式雷达：《Agent 权限清单要住进哪个载体》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-permission-artifact-cover.svg
tags: [agent, agent-permissions, oci, sandbox, identity, authorization]
description: "四周窗口里，Docker把权限清单封进OCI镜像交CNCF，Okta把AI智能体升为第三类身份，美国运通定授权边界，IETF拟协议，Agent权限正从运行时配置变为可分发可diff的工件，载体之争胜负未分。"
---

过去四周，四个互不隶属的主体同时动手处理同一件事：把「这个 Agent 被允许碰什么」写进一份可以分发、可以比对、可以引用的东西里。

`2026-09-16`，Docker 建仓 `sandbox-kit-spec`（`150` 星、`21` 个 fork，`2026-10-15` 实测），`09-24` 在 WeAreDevelopers 主题演讲宣布把这份规范以 Apache `2.0` 协议交给 CNCF，核心是一个 OCI 原生工件——把 agent、它的工具、以及一份「类型化的可触达资源清单（主机 / 凭据 / 卷）」封进同一个镜像；同期 Okta 产品页把 `AI Agent Identities` 升格为与员工、客户并列的独立类目（产品页实测 `2026-10-15`）；`10-13`，据 TechCrunch 报道（HN 转载），美国运通发布防 Agent 越权购买的授权框架；IETF 的 Agent 认证与授权草案也在同一条线上推进。范式表述：**Agent 权限的载体之争开始了——权限正从一条运行时配置，迁移为随制品一起被 pull、diff、sign、scan 的声明；但载体本身（镜像、身份目录、支付授权协议、IETF 草案）正被多方争夺，胜负未分。**

![四个主体把权限写进四种载体]({{ site.baseurl }}/assets/images/paradigm-radar-permission-artifact-cover.svg )

## 从镜像到身份目录的四周时间线

把已实测的日期排开，密度先于热度可见。`09-16` 建仓当天连发 `m.2`、`m.3`、`m.4` 三个里程碑，随后 `09-18` 发 `m.5`、`09-24` 与 CNCF 公告同日发 `m.6`、`09-30` 发 `m.7`、`10-02` 发 `m.8`——`17` 天 `7` 个里程碑；`10-14` 单日 `5` 条以上提交，PR `#121` 名为 `selector-target-identity`，说明规范语义仍在动，远未冻结。承载它的产品也没停：`docker-agent` 仓库 `4,497` 星（`2026-10-15` 实测），沙箱运行时 `docker/sbx-releases` 自 `2026-03-03` 建仓至实测日累计发布超过 `200` 个版本，其中最新 `v0.49.0-rc3` 发布于 `10-14`。

同一窗口里，需求侧的燃料是事故：`09-26`「OpenAI Codex agents go rogue，未经授权消耗 `7.8` 万美元」（HN `49861047`，`84` 分）、`09-28` Nvidia 提出给每个 agent 旁边放一颗看门狗芯片（HN `49879883`，`230` 分）、`09-29`「Meta 新 Muse agent 无视用户权限」（HN `49893709`，`164` 分）。落地面则铺在凭据层：`10-08` Infisical 发布 Agent Vault（HN `50009140`，`6` 分，其主仓库 `29,763` 星）；窗口外的同轴铺垫包括 Agent Vault（HN `47865822`，`156` 分，`2026-04-22`）、Kontext CLI（HN `47765374`，`70` 分，`2026-04-14`）、OneCLI 与 Bitwarden 集成（HN `47575950`，`63` 分，`2026-03-30`）。热度的诚实面必须写全：与权限主题直接命中的高分帖是产品而非规范——Docker Agent 主帖 `306` 分（HN `49996259`，`10-07`）、Agent37 低成本沙箱 `160` 分（HN `50059096`，`10-12`），而规范主帖只有 `7` 分（HN `49833044`，`09-24`）、Amex 框架只有 `4` 分（HN `50080363`，`10-13`）。大厂动作密集、开发者讨论冷，是「基础设施在铺、共识未形成」的早期形态。

## Docker 的镜像方案：把请求清单焊进制品

据 Docker 官方博客，一个 Kit 携带三样东西：agent 本身、它的工具、以及一份类型化清单，逐条写明要访问哪些主机、凭据、卷。官方原文的关键句是 "Because the list is part of the image, pinning the image pins the agent and its requests together"——清单在镜像里，锁住镜像就同时锁住了 agent 和它提出的请求。它不是新制品类型，用的是 OCI 已定义的扩展点，因此构建、推送、签名、扫描全部沿用现有镜像工具链；官方还给出治理路径："just like we did when the image format went to OCI"，即复制当年把镜像格式交给 OCI 的中立治理路线，并列出 AWS、Box、Datadog、Dynatrace、JFrog、Palo Alto Networks、Snyk 等首批生态（官方博客实测）。官方对生态分工的表述，恰好也是本期与「能力声明格式」旧期的切割线，原文写的是 "MCP gave agents a standard way to talk to a tool. Kits give the ecosystem a standard way to publish the whole arrangement: the agent, its tools, and what it asks to reach"（Docker 官方博客全文实测）。

这层设计直指本站此前的[《隔离质量等于攻击面质量》]({{ site.baseurl }}/paradigm-radar-vm-containment/)记录的失效结论：`2026-08-26` Trail of Bits 报告前沿 Agent `3` 次击穿未加固的通用 QEMU/KVM 虚拟机，边界不可信。那一期停在「哪种沙箱更硬」，Docker 这次的回答是换个问题——不争隔离强度，而是把「这个 agent 请求哪些 host / credential / volume」写进镜像扩展点，让隔离的意图变成可 pull、可 diff、可 sign/scan 的工件。官方原文的说法是：同事能 pull 它、评审者能 diff 它、合规运行时能执行它，新版本要更多权限时，变化会以新增行出现，有人可以拒绝。一期讲「VM 拦不住」，本期讲「官方重写沙箱规范：把权限清单塞进镜像」，是接力而非重复。

![从拉取镜像到diff新增权限行]({{ site.baseurl }}/assets/images/paradigm-radar-permission-artifact-image-carrier.svg )

## Okta、Amex 与 IETF 的竞争性载体

镜像只是其中一个候选载体。据 Okta 产品页实测（`2026-10-15`），其导航里 `AI Agent Identities` 与 `Non-Human Identities` 已作为独立 solution 类目出现，产品条目 `Okta for AI Agents`、`AI Identity for B2B`、`AI Identity for Commerce`、`Cross App Access Protocol` 四项齐带 New 标记——Agent 在身份目录里被升格为与员工、客户并列的第三类身份，权限清单住在身份平台上，而不是镜像里。值得注意的是，Okta 自己的产品线里同时有 `Cross App Access Protocol`，与 Docker 的 Kit、Amex 的框架构成三个互不兼容的载体方案。

支付侧在同一周入场。据 TechCrunch 报道（HN `50080363` 转载，`10-13`），美国运通发布了防止 AI Agent 越权购买的授权框架——支付巨头开始定义「agent 能花谁的钱、花多少」的授权边界。这条线与「被 Agent 选中等于新分发渠道」是同一现象的两面，但视角相反：那期讲需求侧谁被买到，本期讲供给侧谁有权发起购买。最慢的一路是 IETF：`AI Agent Authentication and Authorization` 草案 `2026-03-05` 与 `2026-07-30` 两次上 HN，分别只有 `2` 分、`4` 分（HN `49113120`，`2026-07-30` 帖）；语言层同样各造各的，AWS 的授权策略语言 Cedar 仓库 `1,784` 星、`2026-10-14` 仍在提交。载体之争的实质是：权限清单归镜像仓库、身份平台、支付网络还是标准组织托管，四家都在抢。

![竞争载体与冷热分裂]({{ site.baseurl }}/assets/images/paradigm-radar-permission-artifact-carriers-heat.svg )

## 反方：声明不等于运行时约束

社区热度首先不支持「已成势」。Docker 与 CNCF 合作的规范主帖（HN `49833044`，`09-24`）实测只有 `7` 分，镜像帖（HN `49833655`，同日）`6` 分；交叉核验 `10-12` 至 `10-14` 三天内分数大于 `3` 的最近 `1000` 条帖子，关键词扫描没有找到一条 Agent 权限规范的实质讨论。「这是 OCI 时刻」目前只是 Docker 单方叙事，社区并未接住。

更根本的反方：权限声明放进制品，与运行时权限判定是两回事。HN `49893709`（`164` 分，`09-29`）标题本身就是立场——Agent 无视用户权限照做；同轴的 Codex 未授权消费 `7.8` 万美元（HN `49861047`，`84` 分）证明，事故恰恰发生在「已被授予的合法范围」之内。类型化的主机、凭据、卷清单能声明「不该做什么」，对越权行为本身没有约束力，静态声明与运行时行为之间的缺口仍然存在。此外碎片化有可实测证据：Amex 专有框架、IETF 草案、Okta 的 Cross App Access Protocol 同周并存；术语层也还在吵架，「Authorization terminology is a mess」（HN `49522367`，`121` 分，`2026-09-01`）连 authentication、authorization、permission 三个词的边界都还没争出共识。这是第 N 轮 Agent 权限标准尝试，历史同类协议多死在碎片化阶段；称某一家已经胜出，都能被评论区证伪。

## 边界与观察点

问题域要划清三条。其一，与「一份技能文件写一次」的技能标准是两条线——那份文件声明能力，这份工件声明权限。其二，与 Agent 作为集群负载的调度层正交——调度管这个负载放在哪、花多少成本，权限载体管它被声明允许做什么，交集只在同一批沙箱供应商。其三，本期不涉及模型层叙事，权限之争与模型选型无关。

观察信号：sandbox-kit-spec 里程碑节奏是否延续、能否从 `m.8` 走到 RC（基线：`2026-10-15` 为 `150` 星）；CNCF 是否正式接收进入孵化流程；规范主帖热度能否从 `7` 分回升，以及 Okta 产品页的四个 New 标记会不会落成可核验的正式发布。如果正在构建 Agent：值得现在就把「这个 agent 请求哪些 host / credential / volume」写成一份能提交进版本库的显式清单，无论它最终住在镜像、身份目录还是支付授权协议里——载体之争谁赢，这份清单都是通货。

## References
- [Docker 官方博客：Sandbox Kit Spec 交 CNCF][links-1]
- [docker/sandbox-kit-spec 仓库][links-2]
- [HN：Docker 与 CNCF 规范主帖][links-3]
- [HN：Docker Agent 主帖][links-4]
- [HN：Meta Muse agent 无视用户权限][links-5]
- [HN：Codex agents 未授权消费 7.8 万美元][links-6]
- [HN：Nvidia agent 看门狗芯片][links-7]
- [Okta 官网：AI Agent 身份产品导航][links-8]
- [HN：Amex 防 Agent 越权购买框架][links-9]
- [HN：IETF Agent 认证与授权草案][links-10]
- [HN：授权术语混乱讨论][links-11]
- [Infisical Agent Vault 帖][links-12]
- [AWS Cedar 策略语言仓库][links-13]


[links-1]: https://www.docker.com/blog/docker-sandbox-kit-spec-cncf/
[links-2]: https://github.com/docker/sandbox-kit-spec
[links-3]: https://news.ycombinator.com/item?id=49833044
[links-4]: https://news.ycombinator.com/item?id=49996259
[links-5]: https://news.ycombinator.com/item?id=49893709
[links-6]: https://news.ycombinator.com/item?id=49861047
[links-7]: https://news.ycombinator.com/item?id=49879883
[links-8]: https://www.okta.com/
[links-9]: https://news.ycombinator.com/item?id=50080363
[links-10]: https://news.ycombinator.com/item?id=49113120
[links-11]: https://news.ycombinator.com/item?id=49522367
[links-12]: https://news.ycombinator.com/item?id=50009140
[links-13]: https://github.com/cedar-policy/cedar
