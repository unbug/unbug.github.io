---
layout: post
title: "AI 范式雷达：《Harness Agent 实战：让 AI 稳定跑完百步长链任务》"
author: unbug
categories: [AI, ParadigmRadar, Agent]
image: assets/images/paradigm-radar-harness-agent-long-horizon.svg
tags: [Agent, LongHorizon, Harness, AgentFlow, MultiAgent]
---

TerminalBench-2 的数据很扎心：即便是 GPT-5.5、Claude Opus 4.6 这样的顶尖模型，单智能体模式下完成 89 个真实长任务的成功率也只有 65–82%。换句话说，在构建 Linux 内核、修复真实代码漏洞、执行多阶段系统管理这类任务时，**现在最好的 AI 大概每五次失败一次到两次**。而加州大学圣塔芭芭拉分校在 2026 年 4 月发布的 AgentFlow，通过"Harness Agent"架构把这个数字推到了 **84.3%**——还顺手在 Google Chrome 里挖出了 10 个未知零日漏洞。

这篇文章拆解 Harness Agent 的核心架构，给你一套可以动手实现的长视野（Long-Horizon）Agent 工程范式。

## 目录

- [为什么 Long-Horizon 任务让传统 Agent 翻车](#为什么-long-horizon-任务让传统-agent-翻车)
- [什么是 Harness Agent](#什么是-harness-agent)
- [Harness 的四个核心组件](#harness-的四个核心组件)
- [动手实现：从零搭建 Harness Agent](#动手实现从零搭建-harness-agent)
- [进阶：Context Folding 与分层规划](#进阶context-folding-与分层规划)
- [性能实测与关键对比](#性能实测与关键对比)
- [总结与行动清单](#总结与行动清单)

---

## 为什么 Long-Horizon 任务让传统 Agent 翻车

在一个简单的问答任务里，Agent 只需要"想一下→答一下"，这是现代 LLM 的拿手好戏。但真实的工程任务根本不是这样的：

- **修复一个生产 Bug** 需要先阅读代码库、复现错误、定位根因、打补丁、写测试、验证——至少七八个连续步骤，每步的输出都是下一步的输入。
- **完成一个数据处理流水线** 可能涉及数据清洗、特征工程、模型训练、评估、打包部署，跨越几十个工具调用。
- **漏洞发现** 需要源码分析、模糊测试输入生成、崩溃分析、Exploit 验证，各阶段高度耦合。

传统 ReAct（Reason + Act）模式在这些场景下有三个致命伤：

1. **上下文饱和**：随着任务进行，history 越积越长，Token 窗口被占满，早期关键信息被"挤出去"，Agent 开始"失忆"。
2. **失败无法自愈**：某一步工具调用失败时，Agent 只会盲目重试，不会诊断"为什么失败"，然后调整策略。
3. **单一瓶颈**：所有逻辑都压在一个 Agent 上——分析、执行、验证、报告，它既是策划者又是执行者，这在复杂任务下往往导致"角色混乱"。

> 💡 **关键洞察**：把 LLM 换成更大的模型，并不能根本解决这三个问题。它们是**架构问题**，不是模型能力问题。

---

## 什么是 Harness Agent

"Harness"这个词在软件工程里原本指测试框架——一套用来驱动和控制被测系统的脚手架。在多智能体领域，**Harness Agent 把这个思路搬进了 Agent 编排**：

> Harness 是一个描述多智能体协作方案的结构化规格，它定义了哪些 Agent 角色存在、它们如何通信、调用哪些工具、按什么拓扑协作。**Harness 本身是可搜索、可优化、可自动生成的。**

传统做法是：工程师手写 Agent 提示词、手工设计协作流程，然后凭经验调优。AgentFlow 的核心洞察是：**Harness 设计本身是一个可优化的设计空间**，当模型固定时，换一套 Harness 可以让成功率翻倍甚至更多。

![Harness Agent 架构图]({{ site.baseurl }}/assets/images/paradigm-radar-harness-agent-long-horizon.svg)

具体来说，AgentFlow 用**类型化图 DSL（Typed Graph DSL）**来表达 Harness：

```yaml
# harness.yaml — 一个最小化的 Harness 定义示例
harness:
  name: "vuln-discovery-v2"
  agents:
    - id: analyzer
      role: "source_analysis"
      model: claude-opus-4-6
      tools: [code_read, grep, ast_parse]
    - id: fuzzer
      role: "input_generation"
      model: kimi-k2-5
      tools: [fuzz_gen, coverage_track]
    - id: verifier
      role: "crash_analysis"
      model: claude-opus-4-6
      tools: [run_target, sanitizer_read]
  topology:
    - from: analyzer
      to: fuzzer
      channel: structured_json
    - from: fuzzer
      to: verifier
      channel: input_stream
    - from: verifier
      to: analyzer
      channel: feedback  # 崩溃信号反馈给分析器
  coordination: round_robin_with_feedback
```

类型系统保证了合法性：每个 `role` 必须是预定义类型之一，每个 `channel` 必须与发送方和接收方的数据类型匹配，`tools` 列表中每个工具必须已注册且接口有效。这使得自动生成的 Harness 在结构上总是合法的。

---

## Harness 的四个核心组件

AgentFlow 的 Harness 优化循环由四个组件构成：

### 1. Proposer（提案器）

Proposer 根据当前 Harness 的失败模式，生成一批新的 Harness 变体。它的工作不是随机搜索，而是**基于上一轮 Diagnoser 的诊断报告进行定向变异**：

- 如果上一轮失败集中在"Fuzzer 生成的输入覆盖率太低"，Proposer 会在 fuzzer agent 的工具配置里加入更多覆盖引导工具
- 如果失败是"Analyzer 分析超时"，Proposer 会把分析任务拆成两个并行子 Agent

```python
class Proposer:
    def __init__(self, dsl_schema: TypedGraphSchema):
        self.schema = dsl_schema

    def propose(self, 
                current_harness: Harness,
                diagnosis: DiagnosisReport,
                n_variants: int = 5) -> list[Harness]:
        """基于诊断报告生成候选 Harness 变体"""
        mutation_hints = diagnosis.failure_patterns  # 失败模式列表
        candidates = []
        for hint in mutation_hints[:n_variants]:
            mutated = self._apply_mutation(current_harness, hint)
            if self.schema.validate(mutated):  # 类型系统验证
                candidates.append(mutated)
        return candidates

    def _apply_mutation(self, harness: Harness, hint: FailurePattern) -> Harness:
        # 根据 hint.component 和 hint.reason 定向修改
        if hint.component == "tool_coverage":
            return harness.add_tool(hint.suggested_tool)
        elif hint.component == "agent_timeout":
            return harness.split_agent(hint.target_agent)
        # ... 更多变异策略
        return harness.clone()
```

### 2. Execute-Observe-Score（执行-观测-评分）

这一步把候选 Harness 真正跑起来，在目标环境中执行，并收集**多维度的运行时信号**：

```python
class ExecuteObserveScore:
    def run(self, harness: Harness, task: Task) -> ExecutionResult:
        # 1. 在隔离容器中启动 Multi-Agent 系统
        env = DockerEnvironment(task.container_image)
        agent_system = harness.instantiate(env)

        # 2. 执行任务
        trajectory = agent_system.run(task.goal, timeout=task.time_limit)

        # 3. 收集多维信号（不只是通过/失败）
        signals = {
            "task_success": env.check_outcome(task.validator),
            "coverage": env.get_coverage_report(),          # 代码覆盖率
            "sanitizer": env.get_sanitizer_output(),        # ASan/UBSan 输出
            "tool_errors": trajectory.count_tool_failures(),
            "context_overflow": trajectory.had_context_truncation(),
            "step_count": len(trajectory.steps),
        }
        score = self._compute_score(signals)
        return ExecutionResult(signals=signals, score=score, trajectory=trajectory)
```

> ⚠️ **关键区别**：传统优化器只看"通过/失败"，AgentFlow 从目标程序本身读取 sanitizer 输出和覆盖率数据。这使得它能够在任务**没有完全成功**时，仍然判断"哪个子步骤是关键瓶颈"。

### 3. Diagnoser（诊断器）

Diagnoser 读取执行结果，精确定位 Harness 中的失败环节，生成结构化诊断报告：

```python
class Diagnoser:
    def diagnose(self, results: list[ExecutionResult]) -> DiagnosisReport:
        patterns = []

        for result in results:
            if result.signals["context_overflow"]:
                patterns.append(FailurePattern(
                    component="context_management",
                    reason="context_overflow",
                    suggested_fix="add_context_compression",
                    severity="high"
                ))

            if result.signals["tool_errors"] > 3:
                # 找出最常失败的工具
                failing_tools = result.trajectory.get_failing_tools()
                patterns.append(FailurePattern(
                    component="tool_harness",
                    reason=f"tool_failure: {failing_tools}",
                    suggested_fix="replace_or_add_fallback",
                    severity="medium"
                ))

            if result.signals["coverage"] < 0.3:
                patterns.append(FailurePattern(
                    component="exploration_strategy",
                    reason="low_coverage",
                    suggested_fix="diversify_input_generation",
                    severity="high"
                ))

        return DiagnosisReport(failure_patterns=patterns)
```

### 4. 优化循环主体

把三个组件串起来，就是完整的自动优化循环：

```python
class AgentFlowOptimizer:
    def __init__(self, schema: TypedGraphSchema, budget: int = 20):
        self.proposer = Proposer(schema)
        self.executor = ExecuteObserveScore()
        self.diagnoser = Diagnoser()
        self.budget = budget  # 最大迭代轮次

    def optimize(self, task: Task, initial_harness: Harness) -> Harness:
        best_harness = initial_harness
        best_score = 0.0

        for round_idx in range(self.budget):
            # Step 1: 生成候选 Harness
            if round_idx == 0:
                candidates = [initial_harness]
            else:
                diagnosis = self.diagnoser.diagnose(round_results)
                candidates = self.proposer.propose(best_harness, diagnosis)

            # Step 2: 并行执行所有候选（每个用独立容器）
            round_results = [
                self.executor.run(h, task) for h in candidates
            ]

            # Step 3: 选出最优
            best_in_round = max(round_results, key=lambda r: r.score)
            if best_in_round.score > best_score:
                best_score = best_in_round.score
                best_harness = candidates[round_results.index(best_in_round)]

            print(f"Round {round_idx}: best_score={best_score:.3f}")

            # 提前终止：已达到目标分数
            if best_score >= 0.95:
                break

        return best_harness
```

---

## 动手实现：从零搭建 Harness Agent

下面给出一个完整的最小可运行示例，用 Python + LangGraph 实现一个支持 Long-Horizon 任务的 Harness Agent。

### 环境准备

```bash
pip install langgraph langchain-anthropic langchain-openai
# 可选：用于容器化执行
pip install docker
```

### 定义 Typed Graph Schema

```python
from dataclasses import dataclass, field
from typing import Literal, Optional
from enum import Enum

class AgentRole(str, Enum):
    PLANNER   = "planner"
    EXECUTOR  = "executor"
    VERIFIER  = "verifier"
    DIAGNOSER = "diagnoser"

class ChannelType(str, Enum):
    STRUCTURED_JSON = "structured_json"
    RAW_TEXT        = "raw_text"
    FEEDBACK        = "feedback"

@dataclass
class AgentNode:
    id: str
    role: AgentRole
    model: str
    tools: list[str]
    system_prompt: Optional[str] = None

@dataclass
class Edge:
    source: str
    target: str
    channel: ChannelType

@dataclass
class Harness:
    name: str
    agents: list[AgentNode]
    edges: list[Edge]

    def validate(self) -> bool:
        """类型系统验证：检查所有 edge 的 source/target 是否存在"""
        agent_ids = {a.id for a in self.agents}
        for edge in self.edges:
            if edge.source not in agent_ids or edge.target not in agent_ids:
                return False
        return True
```

### 构建 Long-Horizon 执行引擎

```python
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, Annotated
import operator

# 共享状态定义
class HarnessState(TypedDict):
    task_goal: str
    current_step: int
    max_steps: int
    plan: list[str]           # 分层规划：宏观步骤列表
    context_summary: str      # 折叠后的历史摘要（Context Folding）
    recent_actions: Annotated[list[str], operator.add]  # 近期动作（短期记忆）
    tool_results: Annotated[list[str], operator.add]
    success: bool
    failure_reason: Optional[str]

def build_harness_graph(harness: Harness) -> StateGraph:
    """将 Harness 规格转换为 LangGraph 工作流"""
    workflow = StateGraph(HarnessState)

    # 根据 Harness 定义动态构建节点
    for agent in harness.agents:
        node_fn = create_agent_node(agent)
        workflow.add_node(agent.id, node_fn)

    # 根据 Harness edges 定义边
    workflow.set_entry_point(harness.agents[0].id)  # 第一个 agent 作为入口

    for edge in harness.edges:
        if edge.channel == ChannelType.FEEDBACK:
            # 反馈边：条件路由
            workflow.add_conditional_edges(
                edge.source,
                should_continue,
                {
                    "continue": edge.target,
                    "end": END
                }
            )
        else:
            workflow.add_edge(edge.source, edge.target)

    return workflow.compile()

def create_agent_node(agent: AgentNode):
    """工厂函数：为每个 AgentNode 创建对应的执行函数"""
    llm = ChatAnthropic(model=agent.model) if "claude" in agent.model \
          else ChatAnthropic(model="claude-opus-4-6")  # 默认回退

    def node_fn(state: HarnessState) -> dict:
        # 构建包含 Context Folding 的提示词
        context = f"""
已完成步骤摘要：
{state['context_summary']}

最近动作记录：
{chr(10).join(state['recent_actions'][-5:])}  # 只保留最近 5 条

当前任务目标：{state['task_goal']}
当前步骤：{state['current_step']} / {state['max_steps']}
"""
        system = agent.system_prompt or f"你是一个 {agent.role.value} 智能体。{context}"

        response = llm.invoke([
            SystemMessage(content=system),
            HumanMessage(content=f"执行下一步。当前计划：{state['plan']}")
        ])

        # 更新状态
        new_state = {
            "current_step": state["current_step"] + 1,
            "recent_actions": [f"[{agent.role.value}] {response.content[:200]}"],
        }

        # Context Folding：每 10 步压缩一次历史
        if state["current_step"] % 10 == 0 and state["recent_actions"]:
            new_state["context_summary"] = fold_context(
                state["context_summary"],
                state["recent_actions"]
            )
            # 注意：recent_actions 继续累加，folding 不清空它（LangGraph reducer 行为）

        return new_state

    return node_fn

def should_continue(state: HarnessState) -> str:
    """条件路由：判断是否继续还是结束"""
    if state["success"]:
        return "end"
    if state["current_step"] >= state["max_steps"]:
        return "end"
    return "continue"
```

### Context Folding 实现

```python
from langchain_anthropic import ChatAnthropic

_fold_llm = ChatAnthropic(model="claude-haiku-4-5")  # 用小模型做压缩，节省成本

def fold_context(existing_summary: str, recent_actions: list[str]) -> str:
    """
    将近期动作列表压缩成摘要，保留关键信息。
    这是 Long-Horizon Agent 的核心技术之一。
    """
    if not recent_actions:
        return existing_summary

    recent_text = "\n".join(recent_actions)
    prompt = f"""请将以下近期操作记录压缩成简洁摘要，保留所有关键状态变化、工具结果和错误信息。

已有历史摘要：
{existing_summary or "（无）"}

近期操作（需要合并压缩）：
{recent_text}

输出格式要求：
- 不超过 300 字
- 保留所有关键文件路径、错误代码、成功/失败的步骤
- 省略重复信息和中间过程细节
- 用完成时态描述已完成的步骤"""

    response = _fold_llm.invoke([HumanMessage(content=prompt)])
    return response.content
```

### 运行示例

```python
import asyncio

async def main():
    # 1. 定义 Harness
    harness = Harness(
        name="code-debug-harness",
        agents=[
            AgentNode(
                id="planner",
                role=AgentRole.PLANNER,
                model="claude-opus-4-6",
                tools=["code_read", "grep"],
                system_prompt="你是一个资深软件工程师，负责分解调试任务并制定执行计划。"
            ),
            AgentNode(
                id="executor",
                role=AgentRole.EXECUTOR,
                model="claude-opus-4-6",
                tools=["bash", "python_exec", "file_write"],
                system_prompt="你是一个执行工程师，严格按计划执行每一步，遇到错误立即记录。"
            ),
            AgentNode(
                id="verifier",
                role=AgentRole.VERIFIER,
                model="claude-haiku-4-5",
                tools=["test_run", "lint"],
                system_prompt="你是一个质量保证工程师，验证每步执行结果是否符合预期。"
            ),
        ],
        edges=[
            Edge("planner", "executor", ChannelType.STRUCTURED_JSON),
            Edge("executor", "verifier", ChannelType.RAW_TEXT),
            Edge("verifier", "planner", ChannelType.FEEDBACK),  # 反馈回路
        ]
    )

    assert harness.validate(), "Harness 类型校验失败"

    # 2. 构建执行图
    graph = build_harness_graph(harness)

    # 3. 运行长视野任务
    initial_state = HarnessState(
        task_goal="修复 src/parser.py 中导致数组越界的 bug，确保所有测试通过",
        current_step=0,
        max_steps=50,  # 最多 50 步
        plan=[],
        context_summary="",
        recent_actions=[],
        tool_results=[],
        success=False,
        failure_reason=None,
    )

    final_state = await graph.ainvoke(initial_state)
    print(f"任务完成：{final_state['success']}")
    print(f"总步骤：{final_state['current_step']}")
    print(f"最终摘要：{final_state['context_summary']}")

asyncio.run(main())
```

---

## 进阶：Context Folding 与分层规划

### Context Folding：解决上下文饱和问题

Long-Horizon 任务最大的工程挑战是**上下文窗口管理**。一个 50 步的任务，如果每步产生 500 个 Token 的记录，累积下来就有 25,000 Token——对于要给下一步提供完整背景的 Agent 来说，这会"淹没"真正有用的信息。

AgentFold 研究（2025）证明了一个反直觉的结论：**主动折叠（Proactive Folding）比被动截断（Truncation）性能高 23%**。区别在于：

| 策略 | 做法 | 问题 |
|------|------|------|
| **被动截断** | 超过窗口限制后，直接删掉最旧的内容 | 关键早期信息（如初始错误堆栈）可能被删 |
| **主动折叠** | 每隔 N 步，用 LLM 主动压缩历史为结构化摘要 | 计算成本略高，但信息无损 |

实现主动折叠的关键是**触发时机**：不要等到窗口满了才压缩，而是**在完成一个自然阶段边界时**（比如"完成了代码分析阶段"）主动触发。

```python
def detect_phase_boundary(trajectory: list[Action]) -> bool:
    """检测是否到达自然阶段边界（适合触发 Context Folding）"""
    if not trajectory:
        return False
    last_action = trajectory[-1]
    # 常见阶段边界信号
    boundary_signals = [
        "分析完成", "测试通过", "步骤完成",
        "analysis_complete", "phase_done", "checkpoint"
    ]
    return any(sig in last_action.output for sig in boundary_signals)
```

### 分层规划：宏观目标与微观执行分离

另一个关键技术是**宏观-微观分离**（Macro/Micro Planning）：

```python
@dataclass
class HierarchicalPlan:
    macro_goals: list[str]        # 高层目标（2-5 个）
    current_macro_idx: int = 0    # 当前在执行哪个高层目标

    micro_steps: list[str] = field(default_factory=list)   # 当前宏观目标的微步骤
    current_micro_idx: int = 0

    def current_goal(self) -> str:
        return self.macro_goals[self.current_macro_idx]

    def advance_micro(self):
        self.current_micro_idx += 1
        if self.current_micro_idx >= len(self.micro_steps):
            # 微步骤完成，推进到下一个宏观目标
            self.current_macro_idx += 1
            self.micro_steps = []
            self.current_micro_idx = 0

def create_hierarchical_plan(task_goal: str, llm) -> HierarchicalPlan:
    """用 LLM 生成分层计划"""
    response = llm.invoke([
        SystemMessage(content="你是一个任务规划专家，将复杂任务分解为 3-5 个高层阶段。"),
        HumanMessage(content=f"""
将以下任务分解为高层执行阶段（JSON 格式）：
任务：{task_goal}

输出格式：
{{
  "macro_goals": [
    "阶段1：...（一句话描述）",
    "阶段2：...（一句话描述）",
    ...
  ]
}}
""")
    ])
    # 解析 JSON 响应
    import json
    plan_data = json.loads(response.content)
    return HierarchicalPlan(macro_goals=plan_data["macro_goals"])
```

### Replan-not-Retry：失败时重规划而非盲目重试

传统 Agent 遇到工具调用失败时会重试同一个动作（有时重试 3 次）。实际上，**大多数连续失败是因为策略错了，不是因为随机错误**。正确的做法是：

```python
async def execute_with_replan(state: HarnessState, graph) -> HarnessState:
    """带重规划的执行器"""
    consecutive_failures = 0
    max_consecutive_failures = 3

    while not state["success"] and state["current_step"] < state["max_steps"]:
        prev_step = state["current_step"]
        state = await graph.ainvoke(state)

        # 检测是否"卡住了"（连续步骤但没有进展）
        if state["current_step"] == prev_step:
            consecutive_failures += 1
        else:
            consecutive_failures = 0

        if consecutive_failures >= max_consecutive_failures:
            # 触发重规划：基于当前状态重新制定计划
            print(f"⚠️ 连续 {max_consecutive_failures} 次无进展，触发重规划...")
            state = await replan(state)
            consecutive_failures = 0

    return state

async def replan(state: HarnessState) -> HarnessState:
    """基于当前状态重新规划"""
    llm = ChatAnthropic(model="claude-opus-4-6")
    response = llm.invoke([
        SystemMessage(content="你是一个规划专家。"),
        HumanMessage(content=f"""
任务目标：{state['task_goal']}

已完成进度摘要：
{state['context_summary']}

当前遭遇的障碍：
{state['recent_actions'][-3:]}

请制定新的执行计划，跳过当前的卡点，从不同角度完成剩余目标。
输出一个新的步骤列表（JSON 数组）。
""")
    ])
    import json
    new_plan = json.loads(response.content)
    return {**state, "plan": new_plan}
```

---

## 性能实测与关键对比

基于 TerminalBench-2（89 个真实长任务）的公开数据：

| 系统 | 架构 | TB-2 成功率 | 平均步骤数 |
|------|------|-------------|----------|
| **AgentFlow（Multi-Harness）** | Harness 自动优化 + 类型图 | **84.3%** | ~35 步 |
| GPT-5.5（单 Agent）| ReAct | 82.0% | ~28 步 |
| Claude Mythos Preview | ReAct | ~82% | ~27 步 |
| Gemini 3.5 Flash | ReAct | ~76% | ~25 步 |
| Claude Opus 4.6（单 Agent）| ReAct | ~65% | ~22 步 |
| 基准 ReAct（GPT-4.1）| ReAct | ~40% | ~18 步 |

有几点值得注意：

- **AgentFlow 的优势来自架构，而非模型本身**。AgentFlow 最高分是用 `Claude Opus 4.6` 和 `Kimi K2.5` 的组合实现的，不是靠更强的 GPT-5.5。
- **步骤数更多，但成功率更高**。Harness 架构允许更多迭代和自我修正，代价是执行更多步骤——这是一个合理的取舍。
- **安全任务上的提升尤为显著**：在 Chrome 漏洞发现任务中，AgentFlow 发现了 10 个人工审计员和传统 Fuzzer 都没有发现的 CVE。

> 💡 对工程团队来说，这意味着：如果你的任务成功率卡在 60-70%，先不要升级模型——先审查你的 Agent 编排架构。

---

## 总结与行动清单

**Harness Agent 代表了一个关键范式转移**：从"提示词工程"到"架构工程"。当模型能力已经足够强的时候，决定 Agent 成功率的关键变量是**如何组织多个 Agent 之间的分工与协作**，以及**如何利用运行时反馈动态优化这套组织方式**。

三个核心收益：
1. **Context Folding** 解决了长任务的上下文饱和问题，维持 500 步内的有效记忆
2. **Replan-not-Retry** 在遇到障碍时重新规划，而不是盲目重试
3. **反馈驱动的 Harness 优化** 把 Agent 编排从手工艺术变成可搜索的工程问题

**你现在可以做的**：

1. **审查你的现有 Agent 是否存在"上下文饱和"问题**：在任务 50% 完成时检查上下文大小，如果已超过窗口的 60%，立即引入 Context Folding
2. **用 Typed Graph DSL 重新描述你的 Agent 协作方案**：哪怕只是一个 YAML 文件，明确定义角色、工具、通信拓扑，让 Harness 从隐式变成显式
3. **在执行循环里加入 Replan 机制**：当连续 3 步没有进展时，触发基于当前状态的重规划，而不是让 Agent 卡死在重试
4. **用 TerminalBench-2 的任务集测试你的系统**：选 10 个任务作为内部基准，持续跟踪改进幅度
5. **考虑引入 Diagnoser 角色**：专门负责分析失败轨迹、生成结构化的故障报告，让失败变成优化信号而不是报错日志

## References

- [AgentFlow: Synthesizing Multi-Agent Harnesses for Vulnerability Discovery][links-1]
- [TerminalBench-2 官方页面与 Leaderboard][links-2]
- [AgentFold: Long-Horizon Web Agents with Proactive Context Folding][links-3]
- [LangGraph 官方文档][links-4]
- [TerminalBench-2 GitHub 仓库][links-5]


[links-1]: https://arxiv.org/abs/2604.20801
[links-2]: https://explainx.ai/blog/terminal-bench-2-0-ai-agent-benchmark-evaluation
[links-3]: https://openreview.net/forum?id=IuZoTgsUws
[links-4]: https://langchain-ai.github.io/langgraph/
[links-5]: https://github.com/harbor-framework/terminal-bench
