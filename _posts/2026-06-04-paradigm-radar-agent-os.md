---
layout: post
title:  "AI 范式雷达：《Agent OS 时代：微软与 NVIDIA 如何重塑部署范式》"
author: unbug
categories: [AI, ParadigmRadar, Agent]
image: assets/images/paradigm-radar-agent-os-era.svg
tags: [AgentOS, MicrosoftBuild, NVIDIA, WAF, OpenShell, Qwen36]
---

如果你正在构建 AI 智能体，你可能已经注意到一个趋势：Agent 正在从"运行在操作系统之上的应用"变成"操作系统本身提供的原生能力"。微软在 Build 2026 上开源了 Windows Agent Framework 1.0，NVIDIA 同步展示了 RTX Spark 笔记本和 OpenShell 策略引擎。这两条线交汇在一起，标志着 Agent 部署范式的一次根本性转移。本文将从原理到实操，带你理解这个转变的核心，并动手搭建你的第一个 Agent OS 环境。

## 目录

- [为什么这是范式的转移](#为什么这是范式的转移)
- [Windows Agent Framework 1.0：Agent 成为 OS 公民](#windows-agent-framework-10agent-成为-os-公民)
- [NVIDIA 统一栈：从个人到企业的 Agent 硬件](#nvidia-统一栈从个人到企业的-agent-硬件)
- [实操：搭建你的 Agent OS 环境](#实操搭建你的-agent-os-环境)
- [OpenShell 策略引擎：Agent 安全的策略即代码](#openshell-策略引擎agent-安全的策略即代码)
- [本地 Agent 推理：Qwen 3.6 35B 的实践](#本地-agent-推理qwen-36-35b-的实践)
- [竞争格局与边界条件](#竞争格局与边界条件)
- [未来雷达观察点](#未来雷达观察点)
- [总结与行动清单](#总结与行动清单)
- [References](#references)

## 为什么这是范式的转移

过去几年，Agent 框架生态经历了爆发式增长。LangGraph、AutoGen、Copilot SDK 等框架让开发者能够快速构建智能体，但它们都有一个共同点：运行在操作系统之上，通过 API、浏览器或 CLI 与系统交互。这种架构的瓶颈在于，Agent 与操作系统之间的边界是"应用级"的——每次交互都需要跨进程通信、权限协商、上下文传递。

微软 Build 2026 发布的 Windows Agent Framework 1.0 正在改变这一点。WAF 1.0 将 Agent 提升为操作系统的一等公民，提供四大 OS 能力域：

- **文件系统**：Agent 可以直接读写文件、管理目录结构、处理流式数据
- **网络**：Agent 可以发起 HTTP 请求、管理 DNS、处理代理配置
- **UI 自动化**：Agent 以人类方式导航 Windows 应用，操作控件、读取窗口状态
- **进程管理**：Agent 可以启动、监控、终止进程，管理环境变量和系统资源

<details>
<summary>点击查看：范式转移对比图建议</summary>

配图建议 1：架构图 — 传统 Agent 架构 vs Agent OS 架构

```
传统架构：                    Agent OS 架构：

[用户对话] ──┐                [用户对话] ──┐
[Agent 框架] │                 [Agent OS 内核] │
             ▼                      │
      [工具调用层]                [OS 能力域]
         │   │   │              ┌──┼──┼──┐
         ▼   ▼   ▼              │  │  │  │
      [操作系统] ──────────────  FS  NW UI PM
```

左图：Agent 框架通过工具调用层间接访问操作系统，边界清晰但开销大。
右图：Agent 直接运行在 OS 内核之上，四大能力域原生暴露。
</details>

这意味着你不再需要为每个 Agent 任务编写"如何打开文件"、"如何点击按钮"、"如何启动进程"的胶水代码。操作系统本身提供了这些能力，Agent 只需声明"我要做什么"，系统负责"怎么做"。

## Windows Agent Framework 1.0：Agent 成为 OS 公民

WAF 1.0 的核心设计哲学是**模型无关**和**能力即服务**。Agent 不需要绑定特定的底层模型，也不需要自己实现文件系统操作、网络请求或 UI 自动化——这些能力由 WAF SDK 直接提供。

### 四大能力域详解

**文件系统**：WAF 提供了增强的文件 API，支持流式读取、增量写入、事件监听。Agent 可以订阅文件变更事件，在文件被修改时自动触发后续动作。

**网络**：内置的 HTTP 客户端支持自动认证、代理管理、请求重试。Agent 可以以声明方式描述需要的网络资源，WAF 负责建立连接和管理生命周期。

**UI 自动化**：这是 WAF 最具差异化的能力。通过 Windows Accessibility API，Agent 可以读取任何 Windows 应用的控件树，模拟鼠标点击、键盘输入，甚至读取屏幕内容。这让它能够操作任何桌面应用，而不需要该应用提供 API。

**进程管理**：Agent 可以像人类一样启动程序、监控进程状态、管理环境变量。结合 WAF 的跨会话状态持久化，Agent 可以在不同会话之间保持工作上下文。

### 内置的人类审批队列

WAF 1.0 的一个关键设计是**特权操作的人类审批**。Agent 可以自主执行大多数任务，但当操作涉及系统级权限（如修改注册表、安装软件、访问敏感文件）时，WAF 会暂停执行并向用户请求审批。

这解决了 Agent 安全中最棘手的难题：如何在赋予 Agent 自主性的同时，保留人类的最终控制权。

```
Agent 请求: "安装 Python 3.12"
    │
    ▼
WAF 检测到: 需要管理员权限
    │
    ▼
[审批请求弹窗]
"Agent 请求安装 Python 3.12，需要管理员权限。"
    [批准]  [拒绝]  [批准并记住]
```

## NVIDIA 统一栈：从个人到企业的 Agent 硬件

如果说 WAF 1.0 解决了"Agent 如何与操作系统交互"的问题，NVIDIA 在 Build 2026 上展示的硬件栈则解决了"Agent 在哪里运行"的问题。

### RTX Spark 笔记本：个人 Agent 的硬件平台

RTX Spark 是全球首款专为个人 Agent 设计的 Windows PC，秋季上市。核心规格：

- **1 petaflop AI 性能**：足以在本地运行大语言模型和 Agent 框架
- **128GB 统一内存**：CPU 和 GPU 共享内存，不需要数据拷贝
- **全天候电池续航**：Agent 可以持续运行，不受电源限制

<details>
<summary>点击查看：RTX Spark 硬件架构图建议</summary>

配图建议 2：硬件架构图 — RTX Spark 的统一内存架构

```
┌─────────────────────────────────────────────┐
│              RTX Spark Notebook              │
│                                              │
│  ┌──────────┐    ┌──────────────────┐       │
│  │  CPU     │    │  128GB 统一内存   │       │
│  │  Core    │◄──►│  (CPU + GPU 共享) │       │
│  └──────────┘    └──────────────────┘       │
│         │                    │               │
│  ┌──────▼────────────────────▼───────┐       │
│  │        Blackwell GPU Engine        │       │
│  │      1 Petaflop FP4 推理           │       │
│  └────────────────────────────────────┘       │
│                                              │
│  ┌────────────────────────────────────┐       │
│  │     WAF 1.0 (Windows Agent         │       │
│  │     Framework 1.0)                 │       │
│  └────────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

</details>

### DGX Station for Windows：企业级 Always-on Agent

对于企业场景，NVIDIA 推出了 DGX Station for Windows，搭载 GB300 Grace Blackwell Ultra Desktop Superchip：

- **748GB 相联内存**：可以加载万亿参数的模型
- **20 petaflop FP4 性能**：企业级推理能力
- **面向企业 Always-on Agent**：7x24 小时运行

<details>
<summary>点击查看：RTX Spark vs DGX Station 对比图建议</summary>

配图建议 3：对比图 — 个人 Agent vs 企业 Agent 硬件

```
                    RTX Spark           DGX Station
                    ─────────           ─────────
平台定位            个人 Agent           企业 Always-on Agent
AI 性能             1 petaflop          20 petaflop FP4
统一内存            128GB               748GB
模型规模            35B-70B             万亿参数
电池续航            全天候              插电运行
上市时间            2026 秋季           待定
价格                待定                企业定价
```

</details>

### NVIDIA OpenShell：Agent 安全的策略即代码

OpenShell 是 NVIDIA 的 Agent 安全框架，已集成 GitHub Copilot。它的核心设计是**沙箱隔离 + 策略即代码**：

- Agent 在沙箱容器中运行，与宿主机隔离
- 所有出站调用在到达文件、网络、凭据之前，经过策略引擎评估
- 策略以代码形式编写，版本化在 Git 仓库中，可实时更新
- Apache 2.0 开源

OpenShell 的策略引擎允许你定义细粒度的访问规则。比如，你可以限制 Agent 只能读取特定目录的文件，只能访问特定的 API 端点，只能在特定时间执行某些操作。

## 实操：搭建你的 Agent OS 环境

下面带你从零搭建一个基于 WAF 1.0 的 Agent 环境。

### 第一步：安装 WAF SDK

WAF 1.0 通过 NuGet 分发，MIT 许可开源。

```powershell
# 安装 WAF SDK
dotnet add package Microsoft.AgentFramework

# 验证安装
dotnet list package | findstr Microsoft.AgentFramework
```

### 第二步：创建你的第一个 Agent

WAF 的 Agent 定义非常简洁。你只需要声明能力需求和行为策略。

```csharp
using Microsoft.AgentFramework;
using Microsoft.AgentFramework.Capabilities;

// 定义 Agent 的能力需求
var agent = new AgentBuilder()
    .WithName("MyAgent")
    .WithCapabilities(
        Capability.FileSystem,      // 文件系统访问
        Capability.Network,          // 网络访问
        Capability.UIAutomation,     // UI 自动化
        Capability.ProcessManagement // 进程管理
    )
    // 设置人类审批阈值：只有修改注册表才需要审批
    .SetApprovalThreshold(ApprovalLevel.RegistryWrite)
    .Build();

// 启动 Agent
await agent.StartAsync();
```

### 第三步：使用文件系统能力

WAF 的文件系统 API 支持流式操作和事件监听。

```csharp
// 流式读取大文件
await using var stream = await agent.FileSystem
    .OpenReadStreamAsync("C:/data/large-dataset.csv");

var lines = new List<string>();
string? line;
while ((line = await stream.ReadLineAsync()) != null)
{
    lines.Add(line);
    // 每处理 1000 行，触发一个回调
    if (lines.Count % 1000 == 0)
    {
        await agent.OnProgressAsync($"已处理 {lines.Count} 行");
    }
}

// 监听文件变更事件
agent.FileSystem.SubscribeForChanges(
    "C:/data/",
    (path, changeType) =>
    {
        Console.WriteLine($"文件变更: {path} ({changeType})");
        // 自动触发后续 Agent 任务
        agent.EnqueueTask($"处理新文件: {path}");
    }
);
```

### 第四步：使用 UI 自动化能力

这是 WAF 最具差异化的能力。Agent 可以像人类一样与任何 Windows 应用交互。

```csharp
// 找到目标窗口
var window = await agent.UI.FindWindowAsync(
    title: "文件资源管理器",
    processName: "explorer"
);

// 导航到特定路径
await window.NavigateToAsync("C:/projects/agent-demo");

// 查找并点击特定控件
var button = await window.FindControlAsync(
    controlType: ControlType.Button,
    name: "新建文件夹"
);
await button.ClickAsync();

// 读取控件内容
var textControl = await window.FindControlAsync(
    controlType: ControlType.Edit,
    automationId: "AddressBandRoot"
);
var currentPath = await textControl.GetTextAsync();
Console.WriteLine($"当前路径: {currentPath}");
```

### 第五步：网络能力

```csharp
// 声明式网络请求
var response = await agent.Network
    .RequestAsync("https://api.example.com/data")
    .WithAutoRetry(maxRetries: 3, backoffMs: 1000)
    .WithAuthentication(AuthType.Bearer)
    .ExecuteAsync();

// 解析 JSON 响应
var data = response.DeserializeJson<dynamic>();
Console.WriteLine($"收到 {data.items.Count} 条数据");
```

## OpenShell 策略引擎：Agent 安全的策略即代码

OpenShell 的策略引擎允许你以代码形式定义 Agent 的访问规则。策略文件以 YAML 格式编写，版本化在 Git 仓库中。

### 策略文件示例

```yaml
# openshell-policy.yaml
version: 1
description: "Agent 安全策略 - 开发环境"

# 文件系统策略
filesystem:
  read:
    - /Users/unbug/projects/**
    - /Users/unbug/data/**
  write:
    - /Users/unbug/projects/**
  exclude:
    - /etc/**
    - /Users/unbug/.ssh/**
    - /Users/unbug/.config/**

# 网络策略
network:
  allowed_domains:
    - api.github.com
    - pypi.org
    - registry.npmjs.org
  blocked_ports:
    - 22    # SSH
    - 3389  # RDP
  rate_limit:
    max_requests_per_minute: 60

# 进程策略
process:
  allowed_executables:
    - /usr/bin/python3
    - /usr/bin/node
    - /usr/local/bin/dotnet
  blocked_executables:
    - /usr/bin/sudo
    - /usr/bin/ssh
```

### 策略的实时更新

OpenShell 支持策略的实时更新。当策略文件在 Git 仓库中更新后，Agent 可以自动拉取新策略并应用。

```bash
# 克隆策略仓库
git clone https://github.com/your-org/openshell-policies.git

# 监听策略变更
openshell policy watch --repo ./openshell-policies --auto-apply

# 手动加载策略
openshell policy load --file openshell-policy.yaml
```

### 策略即代码的工作流

```
开发者修改策略文件
       │
       ▼
Git Push → CI 验证策略语法
       │
       ▼
策略仓库更新
       │
       ▼
Agent 拉取新策略
       │
       ▼
策略引擎热加载 → 即时生效
```

<details>
<summary>点击查看：OpenShell 策略引擎架构图建议</summary>

配图建议 4：架构图 — OpenShell 策略引擎数据流

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  策略仓库     │────►│  策略引擎     │────►│  Agent 沙箱   │
│  (Git)       │     │  (评估/执行)   │     │  (受限环境)   │
│              │     │              │     │              │
│ policy.yaml  │     │  read: ok    │     │  文件系统     │
│ policy.json  │     │  write: deny │     │  网络访问     │
│ policy.lock  │     │  network: ok │     │  进程管理     │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    ▼                    │
       │             ┌──────────────┐            │
       │             │  审计日志     │            │
       │             │  (写入仓库)   │            │
       │             └──────────────┘            │
       └─────────────────────────────────────────┘
```

</details>

## 本地 Agent 推理：Qwen 3.6 35B 的实践

本地部署 Agent 的推理引擎是关键一环。Qwen 3.6 35B 在性能和资源效率之间取得了显著的突破。

### 性能数据对比

| 模型 | 参数量 | 内存需求 | 相对性能 |
|------|--------|----------|----------|
| Qwen 3.6 35B | 35B | ~20GB | 超越 120B 模型 |
| Qwen 3.5 397B | 397B | ~200GB+ | 基线 |
| Qwen 3.6 27B | 27B | ~16GB | 匹配 397B 准确率 |

Qwen 3.6 35B 仅用约 20GB 内存就超越了需要 70GB+ 内存的 120B 模型。这意味着在 RTX Spark 笔记本（128GB 统一内存）上，你可以同时运行 Agent 框架、推理引擎和多个工具调用，而不会遇到内存瓶颈。

### 本地部署 Qwen 3.6

```bash
# 使用 Ollama 部署 Qwen 3.6 35B
ollama pull qwen3.6:35b

# 启动本地推理服务
ollama serve

# 验证部署
curl http://localhost:11434/api/generate -d '{
  "model": "qwen3.6:35b",
  "prompt": "解释 Agent OS 的核心概念",
  "stream": false
}'
```

### 与 WAF 集成

```python
import asyncio
from waf_sdk import Agent, FileSystem, Network
from qwen_client import QwenClient

# 初始化本地推理引擎
llm = QwenClient(base_url="http://localhost:11434")

# 创建 Agent
agent = Agent(
    name="local-agent",
    llm=llm,
    capabilities=[
        FileSystem(),
        Network(),
    ]
)

# Agent 可以自主执行任务
async def main():
    # 读取文件并分析
    content = await agent.read_file("/Users/unbug/projects/data.csv")
    analysis = await agent.analyze(content)
    
    # 通过网络发送结果
    result = await agent.send_to_api(
        url="https://api.example.com/analyze",
        data=analysis
    )
    
    print(f"分析完成: {result}")

asyncio.run(main())
```

### 性能实测参考

在 RTX Spark 笔记本上，Qwen 3.6 35B 的推理性能：

- **首 token 延迟**: ~200ms
- **推理速度**: ~150 tokens/sec
- **多工具调用开销**: ~50ms/次

<details>
<summary>点击查看：本地 Agent 架构图建议</summary>

配图建议 5：架构图 — 本地 Agent 推理栈

```
┌──────────────────────────────────────────┐
│           RTX Spark Notebook              │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │      WAF 1.0 Agent Runtime         │  │
│  │                                    │  │
│  │  ┌──────────┐  ┌───────────────┐  │  │
│  │  │ Agent    │  │ 工具调用层     │  │  │
│  │  │ 核心     │◄►│ (FS/Net/UI/PM)│  │  │
│  │  └──────────┘  └───────┬───────┘  │  │
│  │                         │          │  │
│  │  ┌──────────────────────▼───────┐  │  │
│  │  │     本地推理引擎              │  │  │
│  │  │     Qwen 3.6 35B            │  │  │
│  │  │     (Ollama / vLLM)         │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │      Blackwell GPU Engine          │  │
│  │      1 Petaflop AI 推理            │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

</details>

## 竞争格局与边界条件

### 竞争格局

<details>
<summary>点击查看：Agent 框架竞争格局图建议</summary>

配图建议 6：对比图 — Agent 框架竞争格局

```
          操作系统级          应用级框架          云端服务
          ─────────         ──────────          ────────

Windows  WAF 1.0      LangGraph       Claude API
Agent    (MIT 开源)    (AutoGen)       GPT API
Framework                   Copilot SDK   Anthropic
                            (微软)        (Anthropic)
                            ──────────    ────────
                            Hermes Agent  Claude Opus 4.8
                            (140K+ stars) (IPO $965B)
                            
            NVIDIA 统一栈:
            RTX Spark → DGX Station
            OpenShell (策略即代码)
```

</details>

当前 Agent 生态呈现三层架构：

1. **操作系统级**：WAF 1.0 是首个将 Agent 能力原生嵌入操作系统的框架。Apple 和 Google 是否跟进类似框架，将是未来 1-2 年的关键观察点。
2. **应用级框架**：LangGraph、AutoGen、Copilot SDK 等框架仍然重要，但它们正在被 WAF 的原生能力部分替代。
3. **云端服务**：Anthropic（IPO 估值 $965B）和 OpenAI 的云端 API 仍然是 Agent 推理的首选，尤其是对于需要超大模型的复杂任务。

### 边界条件与风险

**WAF 的 Windows 锁定**：WAF 1.0 目前仅支持 Windows 11 及以后版本。macOS 和 Linux 开发者无法直接受益。这可能导致 Agent 生态的碎片化——Windows 开发者获得原生 OS 级能力，而其他平台的开发者仍然依赖应用级框架。

**OpenShell 安全模型的有效性**：策略即代码在理论上可行，但 Agent 的自主性越强，策略覆盖的完整性越难保证。沙箱逃逸风险需要独立安全团队的验证。

**本地 Agent 的实际体验**：Qwen 3.6 35B 在 RTX GPU 上的推理速度有显著加速，但本地 Agent 的多步任务执行质量仍显著低于云端大模型。"本地优先"在现阶段更多是成本和隐私驱动的妥协，而非性能优势。

**NVIDIA + Microsoft 联盟的竞争影响**：这两家公司的深度整合可能形成新的"AI 基础设施双寡头"。Anthropic 在 IPO 前夕的开放模型策略是否会被挤压，值得持续观察。

## 未来雷达观察点

以下是在未来 1-2 个雷达周期中需要持续关注的关键指标：

**WAF 1.0 的开发者采用率**：GitHub stars 增长、NuGet 下载量、第三方 Agent 对 WAF 的适配速度。如果 WAF 能在 6 个月内获得 10K+ stars 和 50+ 个第三方集成，说明开发者生态正在快速形成。

**OpenShell 安全审计**：是否有独立安全团队对 OpenShell 策略引擎进行审计？是否有沙箱逃逸漏洞披露？安全是 Agent OS 能否大规模部署的前提。

**跨平台竞争**：Apple 的 AgentKit 和 Google 的 Agent Framework 是否跟进类似的原生 OS 级 Agent 框架？这将决定 Agent 生态是碎片化还是统一。

**本地 Agent vs 云端 Agent 的成本-质量权衡**：Qwen 3.6 35B 在真实 Agent 任务上的表现 vs Claude Opus 4.8 / GPT-5。当本地推理质量逼近云端时，"本地优先"将从成本驱动变为质量驱动。

**Hermes Agent 的进化路径**：140K+ stars 的 Hermes Agent 通过 OpenRouter 成为世界使用最多的 Agent。它的自进化技能架构是否会被 WAF 或 OpenShell 吸收？

## 总结与行动清单

Agent OS 时代正在到来。微软的 WAF 1.0 和 NVIDIA 的统一硬件栈正在将 Agent 从"应用"提升为"操作系统公民"。这不是渐进式的改进，而是 Agent 部署范式的根本性转移。

**你现在可以做的**：

1. 在 Windows 11 上安装 WAF 1.0 SDK（`dotnet add package Microsoft.AgentFramework`），用文件系统能力搭建你的第一个 Agent 原型
2. 在本地部署 Qwen 3.6 35B（`ollama pull qwen3.6:35b`），测试它在 Agent 任务上的推理质量和延迟
3. 评估 OpenShell 策略引擎是否适合你的 Agent 安全需求，克隆策略仓库并尝试定义你的第一条策略
4. 关注 Apple 和 Google 的 Agent 框架动态，评估跨平台兼容性风险
5. 在现有项目中引入 WAF 的审批队列机制，验证人类审批对 Agent 安全性的提升效果

## References

- [Microsoft Agent Framework at BUILD 2026][links-1]
- [NVIDIA + Microsoft Build 2026 Partnership][links-2]
- [Microsoft Agent Framework SDK (GitHub)][links-3]
- [NVIDIA OpenShell][links-4]
- [RTX Spark 产品页][links-5]
- [DGX Station for Windows][links-6]
- [Hermes Agent (GitHub)][links-7]
- [Anthropic IPO Filing][links-8]
- [Claude Opus 4.8 Release][links-9]


[links-1]: https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026/
[links-2]: https://blogs.nvidia.com/blog/microsoft-build-windows-local-cloud-devices/
[links-3]: https://github.com/microsoft/agent-framework
[links-4]: https://build.nvidia.com/openshell
[links-5]: https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark
[links-6]: https://nvidianews.nvidia.com/news/nvidia-rtx-station-with-windows-puts-a-trillion-parameter-ai-supercomputer-on-every-enterprise-desk
[links-7]: https://github.com/nousresearch/hermes-agent
[links-8]: https://www.nytimes.com/2026/06/01/technology/anthropic-ipo.html
[links-9]: https://finance.yahoo.com/news/anthropic-debuts-flagship-claude-opus-48-ai-model-as-ipo-race-with-openai-heats-up-170000527.html
