---
layout: post
title: "一分钟读论文：《Agent OS 时代：部署范式重塑》"
author: unbug
categories: [AI, ParadigmRadar, Agent]
image: assets/images/paradigm-radar-agent-os-era.svg
tags: [AgentOS, MicrosoftBuild, NVIDIA, WAF, OpenShell, Qwen36]
description: "微软与英伟达把智能体的文件、网络、界面与进程能力及策略审计下沉到操作系统层，文章梳理四大能力域与本地云端混合架构，认为系统级底座不会替代上层编排框架。"
---

Agent 正从“运行在操作系统上的应用”转向“操作系统原生能力的一部分”。微软 WAF 1.0 与 NVIDIA OpenShell、RTX Spark 的组合，标志着部署范式开始从应用编排走向系统编排。本文关注这次转移的结构变化、工程价值和落地边界。

![Agent OS 范式转移图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-paradigm-shift.svg)

## 发布会现场：可以引用的原话

`2026-06-02`，Build 主题演讲把基调钉在一句话上：Nadella 宣布「Agent 现在是运行时、工具链和分发模型中的一等公民」，多家现场报道不约而同用了「Windows 不再只人类平台」的转述。同一天微软开源 Windows Agent Framework（WAF）`1.0`、MIT 协议，并预告了 Windows Agent Store——开发者分成 `85%`。分发层的动作常被技术评论略过，本篇偏要先捡起来：商店分成意味着微软准备让 agent 像应用一样有收入模型，OS 厂商第一次把「agent 住户」当成生态供给来采购，这比任何 API 列表都更能说明投入级别。发布会同期，NVIDIA 的联合博客给出了硬件侧：RTX Spark 小主机与 DGX Station for Windows「两台产品都跑 NVIDIA OpenShell——一个为自主 agent 设计的安全运行时」，RTX Spark 标称 `1` petaflop AI 算力、最高 `128GB` 统一内存、不插电全天续航，OEM 阵营 ASUS、Dell、GIGABYTE、HP、MSI、Supermicro 的机型排在 `2026` 年 Q4。软件开闸、硬件铺路、商店发钱，三件事同周发生，才构成「范式切换」的完整证据链。

## 为什么这是一轮范式切换

传统 Agent 方案通常位于应用层，核心依赖是工具封装和跨进程调用。这种方式在 PoC 阶段成本可控，但在复杂任务中会暴露明显瓶颈：

1. 权限和上下文在多组件之间来回传递，稳定性下降。
2. UI 自动化、文件操作、进程管理缺乏统一抽象，维护成本高。
3. 安全策略与执行路径分离，审计链条不完整。

WAF 1.0 的意义在于将“能力暴露”前移到 OS 级别，减少胶水层复杂度。

## WAF 1.0 的能力域

先给口径：发布方自己的组件清单是会话管理、记忆、规划、工具使用与多 agent 协作这几项（发布会报道原文），「一个 YAML 清单定义 agent、笔记本上跑、任务重了自动升云端 GPU、最终发布到 Azure 当服务，全程不改定义」是多方报道共同强调的机制，「环境 agent」（不用你问才答、常驻后台处理邮件与监控）也被点名。本节随后出现的「四域」拆法——文件系统、网络、UI 自动化、进程管理——是本文的分析框架而非官方目录，标注分析观点，读者引用时请分清。四域作为分析框架的价值在于对齐操作系统的传统资源面：

1. 文件系统域：流式读写与事件监听——agent 的「手」。
2. 网络域：统一认证、重试与策略约束——agent 的「电话线」。
3. UI 域：基于可访问性树的自动化——agent 用人类界面的旁路。
4. 进程域：启动、监控、终止与资源治理——agent 生别的进程的权利。

配套的审批流程把这四域从「能力」变「授了权的能力」。Windows Developer Blog 的同周综述里，Windows 高管 Pavan Davuluri 的表述是「在设备端、在云端或两者之间运行 AI 负载而不做权衡」——OS 层的野心从「跑好应用」改写成「跑好 agent」。

![RTX Spark 与 Agent Runtime 架构]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-spark-architecture.svg)

## 别把两个框架读成一个

Build 现场同时站着两个名字相近的东西，混读率极高，值得单列一段。Windows Agent Framework 是 OS 层的开源运行时（上节主角）；Microsoft Agent Framework 是开发者侧的编排 SDK，同周达到 `1.0` 正式可用，配套动作全在「生产化」三个字上：Foundry 里的托管 agent 与会话级沙箱、把 agent harness 当正式组件而非自装胶水、跨 SDK 把别人的 agent 引进来当「命名参与者」而协作路径保持确定性、跟踪与评测走同一条 OpenTelemetry 管道、外加一份「agent 控制规范」声明生产环境里 agent 的被允许行为。两个框架的分工恰好复用了本文的四域隐喻：WAF 管资源面的接入权，MAF 管编排与治理回路。对「系统级底座会不会吃掉上层框架」的老问题，同周证据给的是反方向的信号：微软一边下沉 OS 能力一边把编排 SDK 独立发版，说明系统层与编排层的边界在厂商自己的路线图里都是分开的——底座的商业模式是收租（商店分成、云账单），不是替住户过日子。

## NVIDIA 统一栈的作用

NVIDIA 提供了从终端设备到策略引擎的配套能力，使 Agent OS 具备“可跑、可管、可审计”的闭环。

1. RTX Spark：降低本地推理与工具执行的门槛。
2. DGX Station：面向企业连续任务的高负载场景。
3. OpenShell：将策略约束前置到执行链路。

![个人与企业硬件对比]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-hardware-compare.svg)

OpenShell 在这套叙事里的位置值得再钉一层：联合博客明说 RTX Spark 与 DGX Station 两台产品「都跑 OpenShell」，且它以「GitHub Copilot 里的安全运行时」的身份出现在同一页——从开发者工具到终端硬件，同一个运行时贯穿，这是 NVIDIA 讲「统一栈」时最硬的证据，也是「策略前置到执行链路」第一次有了跨设备的落点。

## OpenShell：策略即代码的价值

OpenShell 的关键价值不是“再加一层安全组件”，而是把策略定义、版本管理、审计回放放进同一工程流程。

1. 策略文件可版本化，便于变更追踪。
2. 执行前评估可阻断高风险调用。
3. 审计日志可用于事后溯源与回归测试。

![OpenShell 数据流]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-openshell-flow.svg)

## 最小落地片段

下面示例展示一个“先声明能力，再按策略执行”的最小流程。

```yaml
agent:
  capabilities: [filesystem, network, ui, process]
policy:
  filesystem_read: [/workspace/**]
  filesystem_write: [/workspace/output/**]
  network_allow: [api.github.com, pypi.org]
  process_block: [sudo, ssh]
```

关键点是：能力声明与策略约束同层管理，避免“开发能跑、上线失控”。这个片段刻意模仿 WAF 清单的形制而字段为示意——真实清单以官方 schema 为准，但“先声明后执行”的骨架与运行时无关，任何一家都能抄。骨架之上补一条工程回路：审计日志的复用姿势。策略文件版本化之后，把历史 trace 在新旧两版策略下各重放一遍、比对阻断点的差异，策略变更就有了回归测试——这比“上线后看运气”便宜两个数量级，也是“审计回放进同一工程流程”那句话的落地形态。

运行时的选型谱系（从进程级沙箱到微虚机）本站[《隔离质量等于攻击面质量》]({{ site.baseurl }}/paradigm-radar-vm-containment/)画过全图，OpenShell 这类“安全设计内建”的厂商运行时是该图谱上新增的一格：它的卖点不是隔离强度数字，而是把策略、身份、审计做成默认件——隔离层的竞争正从“谁围得厚”转向“谁把治理做成了出厂设置”。

## 观测与评测：agent 控制规范被点名

同周公告里最低调、长期看可能最重的一条：Foundry 侧把跟踪与评测收进同一条 OpenTelemetry 管道，并配一份「agent 控制规范」来管理生产 agent 的被允许行为。三个选择都值得逐条读：选 OpenTelemetry 意味着 agent 遥测放弃私有格式、搭上后端已有的标准件货架；跟踪与评测同管道意味着「监控」与「质量」不再两套系统对不上账；控制规范成文意味着「允许行为」从散在代码里的 if 变成可评审、可版本化的对象——这正是权限清单篇乐见的方向，规范文本能否覆盖工具级细粒度是接下来的观察点。发布周还有个容易被漏掉的信号来自开发环境侧：Windows 端 Linux 风格 Coreutils、WSL 容器原生跑 Linux 容器、WinGet 单文件声明开发配置转正式可用——「agent 的第一台工位」本身在被提速，这类螺丝钉更新从不进主题演讲，省下的却是每个工程师每周的真时间。

## 本地推理栈与竞争格局

本地推理能力（如 Qwen 3.6 35B 一档的开源权重）让 Agent OS 在隐私与时延场景更具吸引力，但云端大模型仍在复杂推理质量上保持优势。硬件与模型的账要对齐看：RTX Spark 的 `128GB` 统一内存档位，对应的恰是量化后 `30B` 级模型的舒适区——NVIDIA 把「本地跑 agent」的门槛从装机爱好降回买得起的整机，这是混合架构里「本地」一侧第一次有厂商级背书；云端一侧的对价是 Foundry 上架 NVIDIA 开源模型与 GPU 加速的 Fabric 数据链路，本地云端两头都有人铺货。短期内更现实的路径仍是「本地执行 + 云端补偿」的分层路由：高频、隐私敏感、动作确定的步骤压本地，复杂规划与大上下文上云——路由规则本身写在哪、谁来验证，又回到控制规范那张纸上。

![本地 Agent 推理栈]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-local-stack.svg)

![Agent 框架竞争图]({{ site.baseurl }}/assets/images/paradigm-radar-agent-os-competition-map.svg)

## 常驻 agent 的新攻击面（分析观点）

「环境 agent」这个词在发布会报道里是卖点，在威胁建模文档里是新章节：一个常驻后台、能读邮件、能调文件与进程的 agent，等于把「用户离开电脑时的权限」交还给一条随时可被内容注入的提示通道。传统应用被攻击需要漏洞，agent 被策反只需要一段写得好的邮件正文——注入内容不需要越权，它只需要说服一个本来就有权的执行体。OS 级运行时把这个矩阵摊开又收了回去：四个能力域各自可声明、可审批，意味着策反的成本从「说服」重新抬高到「说服一个恰好被授予了该能力的会话」，这是架构性的减震，不是免疫。安全社区对此的默认配置建议朴素得近乎乏味：新 agent 一律默认拒绝、按域白名单放行、高副作用操作二次确认——「出厂带策略」的可贵之处，是让这些朴素建议第一次成为平台默认而非每个团队的手工活。

## 边界条件

agent 权限声明住进 YAML 清单这件事，本站[《Agent 权限清单要住进哪个载体》]({{ site.baseurl }}/paradigm-radar-agent-permission-artifact/)整期讨论过载体之争——WAF 的选择说明「随应用分发的声明文件」在与「平台侧注册表」的赛跑里先拿下一城；而「agent 作为 OS 一等居民」与[《智能体正从应用循环迁为集群一等负载》]({{ site.baseurl }}/paradigm-radar-agent-as-workload/)在集群侧记录的迁移是同一场运动的两个端点：一边搬进桌面 OS，一边搬进调度器，中间的「应用壳」在两头挤压下变薄。

这轮范式转移并不意味着应用级框架失效，主要边界包括：

1. 平台绑定：WAF 当前以 Windows 生态为主。
2. 策略覆盖：规则写得越细，维护成本越高。
3. 质量权衡：本地模型在复杂任务上仍可能落后云端模型。

因此，Agent OS 更适合作为“关键能力底座”，而非替代全部上层编排逻辑。第四条边界留给分发模型：`85%` 分成把商店模式原样搬给 agent，应用商店二十年攒下的全部病历——刷量、审核积压、长尾发现难——大概率随药方一起搬来，agent 商店的治理曲线值得从第一天开始记。

## 总结与行动清单

Agent OS 的核心趋势是：把能力、策略、审计收敛到同一系统层。WAF 与 OpenShell 的组合降低了工程碎片化风险，也让部署治理更加可验证。

1. 在现有项目中先抽离四大能力域，识别可 OS 化能力。
2. 用策略文件管理高风险调用，建立最小审计链。
3. 采用本地 + 云端混合推理，按任务分层路由。
4. 跟踪跨平台框架进展，提前规划迁移成本。

雷达观察点：一，agent 商店上线后的第一批下架公告——治理从哪条规则开始严格执行，暴露平台方真实的优先级；二，agent 控制规范的覆盖面扩展速度，工具级细粒度与跨厂商互认是两个可证伪里程碑；三，OEM 机型 Q4 铺货后，“预装 agent 运行时”会不会像当年预装浏览器一样成为新的渠道战争入口。

## References

- [Microsoft Agent Framework at BUILD 2026](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026/)
- [Visual Studio Magazine：Build 2026 把 Windows 设为 agent OS][links-w]
- [WAF 1.0 开源与 Agent Store 报道][links-s]
- [NVIDIA + Microsoft Build 2026 Partnership](https://blogs.nvidia.com/blog/microsoft-build-windows-local-cloud-devices/)
- [Microsoft Agent Framework SDK (GitHub)](https://github.com/microsoft/agent-framework)
- [NVIDIA OpenShell](https://build.nvidia.com/openshell)
- [RTX Spark 产品页](https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark)

[links-w]: https://visualstudiomagazine.com/articles/2026/06/02/at-build-2026-microsoft-sets-up-windows-as-an-os-for-ai-agents.aspx
[links-s]: https://nexchron.com/business/microsoft-windows-agent-framework-build-2026
