---
layout: post
title: "AI 范式雷达：《Long Horizon Agent 全栈设计：从接单到交付的工程蓝图》"
author: unbug
categories: [AI, ParadigmRadar, Agent]
image: assets/images/paradigm-radar-harness-agent-long-horizon.svg
tags: [Agent, LongHorizon, Memory, Planning, Checkpointing]
---

今天的 AI Agent 大多能在 10–20 步内完成一个明确的小任务。但现实世界里最有价值的工作从来不是这样的：修复一个生产级 Bug 需要读代码、复现、定位、打补丁、写测试、验证——不止 7 步，而是几十步；一套完整的数据处理流水线可能跨越数十个工具调用；安全审计任务需要跨阶段协作，中途任何一步失败都可能让整个流程作废。这类任务统称 **Long Horizon Task**，而能够稳定完成它们的系统，就是 Long Horizon Agent。

TerminalBench-2 的公开数据可以直观感受到差距：在 89 个真实长任务上，最好的单 Agent 系统（GPT-5.5）也只有 82% 的成功率，基准 ReAct 模式只有 40%。这不是模型能力不足——而是**架构不足**。本文从端到端视角，拆解 Long Horizon Agent 的六层工程架构，给出每一层的核心设计决策和可运行代码。

## 目录

- [Long Horizon 的本质挑战](#long-horizon-的本质挑战)
- [六层全栈架构总览](#六层全栈架构总览)
- [第一层：分层规划与任务图](#第一层分层规划与任务图)
- [第二层：四维记忆系统](#第二层四维记忆系统)
- [第三层：执行引擎与工具编排](#第三层执行引擎与工具编排)
- [第四层：状态持久化与断点续传](#第四层状态持久化与断点续传)
- [第五层：错误恢复与重规划](#第五层错误恢复与重规划)
- [第六层：可观测性与成本控制](#第六层可观测性与成本控制)
- [总结与行动清单](#总结与行动清单)

---

## Long Horizon 的本质挑战

普通 Agent 任务是一个单点问题：给定输入，产出答案，任务结束。Long Horizon 任务是一个**动态过程**：目标在执行中可能被细化，工具调用的结果会影响后续决策，失败不是异常而是常态，整个系统需要在**不确定的长路径**上保持方向感。

具体来说，有三类核心矛盾：

**矛盾一：上下文有限 vs 任务无限长**

当任务超过 30–40 步，历史轨迹会把上下文窗口塞满。最朴素的解法——截断最旧的内容——会让 Agent 失去早期关键信息（比如最初的约束条件、第一步的报错信息）。研究表明，主动折叠（Context Folding）比被动截断的任务成功率高 23%。

**矛盾二：局部最优 vs 全局目标**

ReAct 模式让 Agent 每一步都"想当前最优动作"，但在长任务中，当前最优不等于全局最优。一个"快速绕过"的临时方案可能让后续步骤陷入死局。需要分层规划来在宏观层保持全局约束。

**矛盾三：幂等性 vs 副作用**

长任务中工具调用会产生真实副作用：文件被创建、数据库被写入、API 被调用。一旦崩溃重启，如果没有状态持久化，这些副作用要么需要重做（浪费成本）、要么无法重做（破坏环境）。

> 💡 这三个矛盾的解法——Context Folding、分层规划、状态持久化——构成了 Long Horizon Agent 工程的核心三角。

---

## 六层全栈架构总览

一个完整的 Long Horizon Agent 系统包含六个垂直分层，每一层解决一类特定问题：

![Long Horizon Agent 全栈架构]({{ site.baseurl }}/assets/images/paradigm-radar-harness-agent-long-horizon.svg)

| 层 | 职责 | 关键技术 |
|----|------|---------|
| ① 任务接入 & 分层规划 | 解析目标，构建任务图 | HTN、LLM 规划、DAG |
| ② 四维记忆系统 | 管理跨步骤的信息存取 | 向量数据库、知识图谱、Context Folding |
| ③ 执行引擎 & 工具编排 | 调用工具，驱动步骤执行 | 工具路由、沙箱、并行调度 |
| ④ 状态持久化 & 断点续传 | 保存和恢复执行状态 | Event Sourcing、Checkpoint、Temporal |
| ⑤ 错误恢复 & 重规划 | 识别失败，调整策略 | 失败诊断、Replan-not-Retry |
| ⑥ 可观测性 & 成本控制 | 监控、告警、Token 预算 | OpenTelemetry、成本熔断 |

这六层不是简单的线性流水线——**记忆层横跨所有步骤**，**状态层为执行层提供持久化后盾**，**恢复层在任何时刻都可能被触发**。数据沿两条主线流动：执行主线（①→③）和反馈回路（⑥→⑤→②→①）。

---

## 第一层：分层规划与任务图

Long Horizon 任务的规划不能是一个平铺的步骤列表，必须是**分层的**：宏观阶段（Macro Goals）定义"做什么"，微观步骤（Micro Steps）定义"怎么做"。宏观目标在整个任务生命周期内相对稳定，微观步骤则随执行结果动态调整。

```python
from dataclasses import dataclass, field
from typing import Optional
import json

@dataclass
class MicroStep:
    id: str
    description: str
    tool: str
    params: dict
    depends_on: list[str] = field(default_factory=list)  # 依赖的步骤 ID
    status: str = "pending"   # pending | running | done | failed

@dataclass
class MacroGoal:
    id: str
    description: str
    success_criterion: str    # 可验证的完成条件
    micro_steps: list[MicroStep] = field(default_factory=list)
    status: str = "pending"

@dataclass
class TaskGraph:
    task_id: str
    original_goal: str
    constraints: dict         # 时间限制、资源限制、禁止操作等
    macro_goals: list[MacroGoal]

    def current_macro(self) -> Optional[MacroGoal]:
        for g in self.macro_goals:
            if g.status in ("pending", "running"):
                return g
        return None

    def completion_ratio(self) -> float:
        total = sum(len(g.micro_steps) for g in self.macro_goals)
        done = sum(
            1 for g in self.macro_goals
            for s in g.micro_steps if s.status == "done"
        )
        return done / total if total > 0 else 0.0
```

用 LLM 生成初始任务图（带约束提取）：

```python
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import SystemMessage, HumanMessage

def decompose_task(goal: str, constraints: str, llm=None) -> TaskGraph:
    """将自然语言目标分解为结构化任务图"""
    llm = llm or ChatAnthropic(model="claude-opus-4-6")

    response = llm.invoke([
        SystemMessage(content="""你是一个任务规划专家。
将目标分解为 3-5 个宏观阶段，每个阶段再分解为 2-6 个可执行微步骤。
严格输出 JSON，格式见示例：
{
  "constraints": {"max_steps": 60, "forbidden": ["删除生产数据库"]},
  "macro_goals": [
    {
      "id": "m1",
      "description": "...",
      "success_criterion": "...",
      "micro_steps": [
        {"id": "s1", "description": "...", "tool": "bash", 
         "params": {"cmd": "..."}, "depends_on": []}
      ]
    }
  ]
}"""),
        HumanMessage(content=f"目标：{goal}\n额外约束：{constraints}")
    ])

    data = json.loads(response.content)
    import uuid
    macro_goals = [
        MacroGoal(
            id=g["id"], description=g["description"],
            success_criterion=g["success_criterion"],
            micro_steps=[MicroStep(**s) for s in g["micro_steps"]]
        )
        for g in data["macro_goals"]
    ]
    return TaskGraph(
        task_id=str(uuid.uuid4()),
        original_goal=goal,
        constraints=data.get("constraints", {}),
        macro_goals=macro_goals
    )
```

> ⚠️ **关键设计点**：`success_criterion` 字段是可机器验证的完成条件，而不是模糊的描述。例如"所有单元测试通过，覆盖率 ≥ 80%"而不是"代码修好了"。这是后续自动验收的基础。

---

## 第二层：四维记忆系统

人类完成复杂长任务靠的不只是短期记忆。Long Horizon Agent 同样需要四种不同粒度的记忆，各自解决不同问题：

| 记忆类型 | 存储什么 | 实现方式 | 生命周期 |
|---------|---------|---------|---------|
| **工作记忆** | 当前上下文（目标、最近动作、工具结果） | LLM 上下文窗口 + Context Folding | 步骤级 |
| **情节记忆** | 发生了什么（完整事件日志） | 向量数据库（带时间戳） | 任务级 |
| **语义记忆** | 领域知识（代码库结构、API 文档） | RAG（Qdrant / Chroma） | 持久化 |
| **程序记忆** | 怎么做（成功工具序列 / 解决方案模板） | 结构化技能库 | 持久化 |

```python
from datetime import datetime
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import hashlib

class LongHorizonMemory:
    """四维记忆系统的统一接口"""

    def __init__(self, task_id: str, embed_fn):
        self.task_id = task_id
        self.embed = embed_fn
        self.client = QdrantClient(":memory:")  # 生产环境换成持久化地址

        # 创建情节记忆集合
        self.client.create_collection(
            collection_name=f"episodes_{task_id}",
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
        )

        # 工作记忆（短期缓冲）
        self._working_buffer: list[dict] = []
        self._context_summary: str = ""
        self.FOLD_THRESHOLD = 8  # 每 8 条记录触发一次 Context Folding

    # ── 工作记忆：主动折叠 ──────────────────────────────────
    def add_to_working(self, role: str, content: str, metadata: dict = None):
        self._working_buffer.append({
            "role": role, "content": content,
            "ts": datetime.utcnow().isoformat(),
            **(metadata or {})
        })
        if len(self._working_buffer) >= self.FOLD_THRESHOLD:
            self._fold_working_memory()

    def _fold_working_memory(self):
        """主动将工作记忆缓冲压缩进摘要，而不是被动截断"""
        from langchain_anthropic import ChatAnthropic
        llm = ChatAnthropic(model="claude-haiku-4-5")  # 小模型降成本
        recent = "\n".join(
            f"[{e['role']}] {e['content'][:300]}"
            for e in self._working_buffer
        )
        prompt = (
            f"请将以下操作记录压缩为简洁摘要（≤200字），"
            f"保留所有关键文件路径、错误码、决策节点。\n\n"
            f"已有摘要：{self._context_summary or '（无）'}\n\n"
            f"新增记录：\n{recent}"
        )
        result = llm.invoke([HumanMessage(content=prompt)])
        self._context_summary = result.content
        self._working_buffer.clear()

    def get_working_context(self) -> str:
        recent = "\n".join(
            f"[{e['role']}] {e['content'][:200]}"
            for e in self._working_buffer[-5:]  # 最近 5 条保持原文
        )
        return f"历史摘要：\n{self._context_summary}\n\n近期动作：\n{recent}"

    # ── 情节记忆：语义检索 ──────────────────────────────────
    def record_episode(self, event_type: str, content: str, outcome: str):
        vec = self.embed(f"{event_type}: {content}")
        uid = int(hashlib.md5(
            f"{self.task_id}{datetime.utcnow()}".encode()
        ).hexdigest()[:8], 16)
        self.client.upsert(
            collection_name=f"episodes_{self.task_id}",
            points=[PointStruct(
                id=uid, vector=vec,
                payload={"type": event_type, "content": content,
                         "outcome": outcome, "ts": datetime.utcnow().isoformat()}
            )]
        )

    def recall_similar(self, query: str, top_k: int = 3) -> list[dict]:
        hits = self.client.search(
            collection_name=f"episodes_{self.task_id}",
            query_vector=self.embed(query), limit=top_k
        )
        return [h.payload for h in hits]
```

> 💡 **Context Folding vs 截断**：截断是被动的——窗口满了就删最旧的。Folding 是主动的——在自然阶段边界（每 8 条或完成一个宏观目标）时，用小模型把历史压缩成信息密度更高的摘要。这让 Agent 在第 80 步仍然"记得"第 3 步的关键约束。

---

## 第三层：执行引擎与工具编排

执行层负责将规划层的 `MicroStep` 转化为真实的工具调用，并处理调用结果。设计重点有两个：**工具调用幂等性**（允许安全重试）和**结果归一化**（让上层规划可以统一处理不同工具的输出）。

```python
import asyncio
import subprocess
from typing import Any

class ToolResult:
    def __init__(self, success: bool, output: str, 
                 error: str = "", metadata: dict = None):
        self.success = success
        self.output = output[:4000]   # 截断过长输出
        self.error = error
        self.metadata = metadata or {}

class ToolExecutor:
    """幂等工具执行器：所有工具调用的统一入口"""

    TOOLS = {
        "bash": "_run_bash",
        "python_eval": "_run_python",
        "file_read": "_read_file",
        "file_write": "_write_file",
    }

    def execute(self, step: MicroStep, dry_run: bool = False) -> ToolResult:
        """
        执行单个工具调用。
        dry_run=True 时只验证参数，不真正执行（用于幂等性检查）。
        """
        if step.tool not in self.TOOLS:
            return ToolResult(False, "", f"未知工具: {step.tool}")

        if dry_run:
            return ToolResult(True, f"[dry_run] {step.tool} validated")

        handler = getattr(self, self.TOOLS[step.tool])
        try:
            return handler(**step.params)
        except Exception as e:
            return ToolResult(False, "", str(e))

    def _run_bash(self, cmd: str, timeout: int = 60,
                  workdir: str = "/tmp") -> ToolResult:
        """在受限环境中执行 bash 命令"""
        result = subprocess.run(
            ["bash", "-c", cmd],
            capture_output=True, text=True,
            timeout=timeout, cwd=workdir
        )
        return ToolResult(
            success=(result.returncode == 0),
            output=result.stdout,
            error=result.stderr,
            metadata={"returncode": result.returncode}
        )

    def _run_python(self, code: str, context: dict = None) -> ToolResult:
        """在隔离命名空间中执行 Python 代码片段"""
        namespace = context or {}
        try:
            exec(code, namespace)  # noqa
            output = str(namespace.get("__result__", ""))
            return ToolResult(True, output)
        except Exception as e:
            return ToolResult(False, "", str(e))

    def _read_file(self, path: str, max_bytes: int = 8192) -> ToolResult:
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read(max_bytes)
            return ToolResult(True, content)
        except FileNotFoundError:
            return ToolResult(False, "", f"文件不存在: {path}")

    def _write_file(self, path: str, content: str,
                    mode: str = "w") -> ToolResult:
        try:
            with open(path, mode, encoding="utf-8") as f:
                f.write(content)
            return ToolResult(True, f"已写入 {path}")
        except Exception as e:
            return ToolResult(False, "", str(e))
```

对于需要并行执行的独立步骤（互相没有 `depends_on` 关系），用 `asyncio` 并发调度：

```python
async def execute_parallel_steps(
    steps: list[MicroStep], executor: ToolExecutor
) -> dict[str, ToolResult]:
    """并行执行无依赖关系的步骤，有依赖的按拓扑序执行"""

    # 拓扑排序：找出可以并行的 step 组
    completed = set()
    results = {}

    while len(completed) < len(steps):
        # 找出所有依赖已满足的 pending 步骤
        ready = [
            s for s in steps
            if s.status == "pending"
            and all(dep in completed for dep in s.depends_on)
        ]
        if not ready:
            break   # 可能有循环依赖，跳出

        # 并行执行这一批
        tasks = [
            asyncio.to_thread(executor.execute, s)
            for s in ready
        ]
        batch_results = await asyncio.gather(*tasks, return_exceptions=True)

        for step, result in zip(ready, batch_results):
            results[step.id] = result
            step.status = "done" if (
                isinstance(result, ToolResult) and result.success
            ) else "failed"
            completed.add(step.id)

    return results
```

---

## 第四层：状态持久化与断点续传

这一层是 Long Horizon Agent 区别于普通 Agent 的关键工程能力。一个跑了 40 步的任务，如果因为网络超时、机器重启或者模型 API 限流而中断，必须能从中断点恢复，而不是从头再来。

设计基于两个互补的模式：
- **Checkpoint**（阶段粒度）：每完成一个宏观阶段，保存完整状态快照
- **Event Sourcing**（步骤粒度）：每一步动作都作为事件写入日志，支持全量回放

```python
import json
import os
from datetime import datetime
from dataclasses import asdict

class CheckpointManager:
    """基于文件系统的轻量级检查点管理（生产环境换 S3/数据库）"""

    def __init__(self, task_id: str, checkpoint_dir: str = "/tmp/agent_checkpoints"):
        self.task_id = task_id
        self.checkpoint_dir = os.path.join(checkpoint_dir, task_id)
        os.makedirs(self.checkpoint_dir, exist_ok=True)
        self._event_log: list[dict] = []  # 内存中的事件缓冲

    def save_checkpoint(self, task_graph: TaskGraph,
                        context_summary: str, step_index: int):
        """在完成宏观阶段后保存检查点"""
        checkpoint = {
            "task_id": self.task_id,
            "step_index": step_index,
            "saved_at": datetime.utcnow().isoformat(),
            "context_summary": context_summary,
            "task_graph": self._serialize_task_graph(task_graph),
        }
        path = os.path.join(
            self.checkpoint_dir, f"checkpoint_{step_index:04d}.json"
        )
        with open(path, "w") as f:
            json.dump(checkpoint, f, indent=2, ensure_ascii=False)
        print(f"✅ Checkpoint 已保存: step={step_index}")
        return path

    def load_latest_checkpoint(self) -> Optional[dict]:
        """恢复最新检查点"""
        files = sorted([
            f for f in os.listdir(self.checkpoint_dir)
            if f.startswith("checkpoint_") and f.endswith(".json")
        ])
        if not files:
            return None
        with open(os.path.join(self.checkpoint_dir, files[-1])) as f:
            checkpoint = json.load(f)
        print(f"🔄 从检查点恢复: step={checkpoint['step_index']}")
        return checkpoint

    def log_event(self, event_type: str, step_id: str,
                  data: dict, outcome: str):
        """记录每步事件（Event Sourcing）"""
        event = {
            "seq": len(self._event_log),
            "ts": datetime.utcnow().isoformat(),
            "type": event_type,
            "step_id": step_id,
            "data": data,
            "outcome": outcome,
        }
        self._event_log.append(event)
        # 异步刷盘（生产环境用 append-only 日志文件或消息队列）
        log_path = os.path.join(self.checkpoint_dir, "event_log.jsonl")
        with open(log_path, "a") as f:
            f.write(json.dumps(event, ensure_ascii=False) + "\n")

    def _serialize_task_graph(self, tg: TaskGraph) -> dict:
        return {
            "task_id": tg.task_id,
            "original_goal": tg.original_goal,
            "constraints": tg.constraints,
            "macro_goals": [
                {
                    "id": g.id, "description": g.description,
                    "success_criterion": g.success_criterion,
                    "status": g.status,
                    "micro_steps": [
                        {"id": s.id, "description": s.description,
                         "tool": s.tool, "params": s.params,
                         "status": s.status}
                        for s in g.micro_steps
                    ]
                }
                for g in tg.macro_goals
            ]
        }
```

在执行循环中整合检查点：

```python
async def run_with_checkpointing(
    task_graph: TaskGraph,
    memory: LongHorizonMemory,
    executor: ToolExecutor,
    ckpt_manager: CheckpointManager
) -> dict:
    """带断点续传的主执行循环"""

    # 尝试从上次检查点恢复
    ckpt = ckpt_manager.load_latest_checkpoint()
    start_macro_idx = 0
    if ckpt:
        # 恢复任务图状态和上下文摘要
        restore_task_graph_state(task_graph, ckpt["task_graph"])
        memory._context_summary = ckpt["context_summary"]
        start_macro_idx = ckpt["step_index"]
        print(f"📌 从第 {start_macro_idx} 个宏观阶段继续执行")

    for i, macro_goal in enumerate(task_graph.macro_goals[start_macro_idx:],
                                    start=start_macro_idx):
        if macro_goal.status == "done":
            continue

        macro_goal.status = "running"
        print(f"\n▶ 阶段 {i+1}: {macro_goal.description}")

        # 执行当前阶段的微步骤（支持并行）
        results = await execute_parallel_steps(
            macro_goal.micro_steps, executor
        )

        # 记录本阶段结果到记忆系统
        for step_id, result in results.items():
            memory.record_episode(
                event_type="tool_call",
                content=f"step={step_id}",
                outcome="success" if result.success else "failure"
            )
            ckpt_manager.log_event(
                "step_complete", step_id,
                {"tool": "..."},
                "success" if result.success else "failed"
            )

        # 验证宏观阶段是否完成
        all_done = all(s.status == "done" for s in macro_goal.micro_steps)
        if all_done:
            macro_goal.status = "done"
            # 完成一个宏观阶段 → 保存检查点
            ckpt_manager.save_checkpoint(
                task_graph, memory._context_summary, i + 1
            )
        else:
            macro_goal.status = "failed"
            break

    return {"success": all(g.status == "done" for g in task_graph.macro_goals),
            "completion": task_graph.completion_ratio()}
```

---

## 第五层：错误恢复与重规划

失败在 Long Horizon 任务中不是异常，是必然。关键是**如何有效地从失败中恢复**。核心原则是：

> **Replan-not-Retry**：如果连续同一策略失败超过阈值次数，不要继续重试，而是**重新规划**。

```python
from dataclasses import dataclass
from enum import Enum

class FailureType(Enum):
    TOOL_ERROR = "tool_error"          # 工具调用本身出错
    VALIDATION_FAIL = "validation_fail"  # 结果不符合预期
    TIMEOUT = "timeout"                  # 超时
    BLOCKED = "blocked"                  # 卡住（连续无进展）

@dataclass
class RecoveryStrategy:
    failure_type: FailureType
    max_retries: int          # 同策略最多重试次数
    action: str               # retry | rollback | replan | escalate

RECOVERY_POLICIES = [
    RecoveryStrategy(FailureType.TOOL_ERROR,    max_retries=2, action="retry"),
    RecoveryStrategy(FailureType.VALIDATION_FAIL, max_retries=1, action="replan"),
    RecoveryStrategy(FailureType.TIMEOUT,       max_retries=1, action="rollback"),
    RecoveryStrategy(FailureType.BLOCKED,       max_retries=0, action="replan"),
]

class RecoveryEngine:
    def __init__(self, llm, ckpt_manager: CheckpointManager):
        self.llm = llm
        self.ckpt_manager = ckpt_manager
        self._failure_counts: dict[str, int] = {}

    def handle_failure(self, step: MicroStep, result: ToolResult,
                       task_graph: TaskGraph,
                       memory: LongHorizonMemory) -> str:
        """
        分析失败，返回恢复动作：
        'retry' / 'rollback' / 'replan' / 'escalate'
        """
        failure_type = self._classify_failure(result)
        policy = next(
            (p for p in RECOVERY_POLICIES if p.failure_type == failure_type),
            RecoveryStrategy(FailureType.TOOL_ERROR, 2, "retry")
        )

        key = f"{step.id}:{failure_type.value}"
        self._failure_counts[key] = self._failure_counts.get(key, 0) + 1

        if self._failure_counts[key] > policy.max_retries:
            # 超过重试上限 → 升级到重规划
            if policy.action in ("retry", "rollback"):
                return self._trigger_replan(step, result, task_graph, memory)
        return policy.action

    def _classify_failure(self, result: ToolResult) -> FailureType:
        if "timeout" in result.error.lower():
            return FailureType.TIMEOUT
        if result.error:
            return FailureType.TOOL_ERROR
        return FailureType.VALIDATION_FAIL

    def _trigger_replan(self, failed_step: MicroStep,
                        result: ToolResult,
                        task_graph: TaskGraph,
                        memory: LongHorizonMemory) -> str:
        """基于当前状态和失败信息，让 LLM 生成新的微步骤替代方案"""
        current_macro = task_graph.current_macro()
        if not current_macro:
            return "escalate"

        context = memory.get_working_context()
        similar_episodes = memory.recall_similar(
            f"failed: {failed_step.description}", top_k=2
        )

        replan_prompt = f"""
任务：{task_graph.original_goal}
当前阶段：{current_macro.description}
成功条件：{current_macro.success_criterion}

已完成进度摘要：
{context}

失败步骤：{failed_step.description}
失败原因：{result.error or result.output}

相似历史经验：
{similar_episodes}

请生成替代方案（JSON 数组，格式同原 micro_steps），
用不同路径达成当前阶段的成功条件：
"""
        response = self.llm.invoke([HumanMessage(content=replan_prompt)])
        try:
            new_steps_data = json.loads(response.content)
            # 将新步骤替换当前阶段中未完成的步骤
            pending_ids = {
                s.id for s in current_macro.micro_steps
                if s.status == "pending"
            }
            current_macro.micro_steps = [
                s for s in current_macro.micro_steps
                if s.id not in pending_ids
            ] + [MicroStep(**ns) for ns in new_steps_data]
            print(f"🔀 重规划完成：{len(new_steps_data)} 个新步骤")
        except json.JSONDecodeError:
            return "escalate"

        return "replan_done"
```

> ⚠️ **重规划的"情节记忆"价值**：重规划时调用 `memory.recall_similar()` 检索类似历史失败，可以避免 LLM 提出"已知无效的方案"。这是程序记忆与情节记忆协同工作的典型场景。

---

## 第六层：可观测性与成本控制

Long Horizon Agent 如果没有可观测性，就是一个黑盒。一旦出问题，你不知道卡在哪一步、消耗了多少 Token、重规划了几次。生产级系统必须在每一步都有可度量的指标。

```python
import time
from dataclasses import dataclass, field

@dataclass
class TaskMetrics:
    task_id: str
    start_time: float = field(default_factory=time.time)
    total_steps: int = 0
    successful_steps: int = 0
    failed_steps: int = 0
    replan_count: int = 0
    total_tokens: int = 0
    estimated_cost_usd: float = 0.0
    tool_call_counts: dict = field(default_factory=dict)

    TOKEN_COST_PER_1K = {
        "claude-opus-4-6": {"input": 0.015, "output": 0.075},
        "claude-haiku-4-5": {"input": 0.00025, "output": 0.00125},
    }

    def record_llm_call(self, model: str,
                        input_tokens: int, output_tokens: int):
        self.total_tokens += input_tokens + output_tokens
        costs = self.TOKEN_COST_PER_1K.get(model, {"input": 0.01, "output": 0.03})
        self.estimated_cost_usd += (
            input_tokens / 1000 * costs["input"] +
            output_tokens / 1000 * costs["output"]
        )

    def record_tool_call(self, tool: str, success: bool):
        self.tool_call_counts[tool] = self.tool_call_counts.get(tool, 0) + 1
        self.total_steps += 1
        if success:
            self.successful_steps += 1
        else:
            self.failed_steps += 1

    def check_budget(self, max_cost_usd: float = 5.0,
                     max_steps: int = 100) -> tuple[bool, str]:
        """检查是否超出预算（成本熔断）"""
        if self.estimated_cost_usd > max_cost_usd:
            return False, f"💸 成本超限: ${self.estimated_cost_usd:.3f} > ${max_cost_usd}"
        if self.total_steps > max_steps:
            return False, f"⏱ 步骤超限: {self.total_steps} > {max_steps}"
        return True, "ok"

    def summary(self) -> str:
        elapsed = time.time() - self.start_time
        success_rate = (
            self.successful_steps / self.total_steps * 100
            if self.total_steps > 0 else 0
        )
        return (
            f"任务耗时: {elapsed:.1f}s | "
            f"步骤: {self.successful_steps}/{self.total_steps} "
            f"({success_rate:.0f}%) | "
            f"重规划: {self.replan_count}次 | "
            f"Token: {self.total_tokens:,} | "
            f"成本: ${self.estimated_cost_usd:.4f}"
        )
```

集成 OpenTelemetry，让 Datadog / Prometheus 能接入：

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, BatchSpanProcessor

def setup_tracing(service_name: str = "long-horizon-agent"):
    provider = TracerProvider()
    provider.add_span_processor(
        BatchSpanProcessor(ConsoleSpanExporter())  # 替换为 OTLPSpanExporter
    )
    trace.set_tracer_provider(provider)
    return trace.get_tracer(service_name)

tracer = setup_tracing()

def traced_step(step: MicroStep, executor: ToolExecutor,
                metrics: TaskMetrics) -> ToolResult:
    """带 OpenTelemetry Span 的工具调用"""
    with tracer.start_as_current_span(f"step:{step.id}") as span:
        span.set_attribute("step.tool", step.tool)
        span.set_attribute("step.description", step.description[:100])
        span.set_attribute("task.cost_usd", metrics.estimated_cost_usd)

        result = executor.execute(step)

        span.set_attribute("step.success", result.success)
        if not result.success:
            span.record_exception(Exception(result.error))
            span.set_status(trace.StatusCode.ERROR, result.error[:200])

        metrics.record_tool_call(step.tool, result.success)
        return result
```

---

## 总结与行动清单

Long Horizon Agent 的工程挑战不在于"更聪明的模型"，而在于**更完整的系统设计**。六层架构的每一层都解决了真实的工程难题：分层规划防止目标漂移，四维记忆对抗上下文饱和，幂等执行让恢复成为可能，检查点保障了任务不因意外而从零开始，重规划让失败成为调整而不是终止，可观测性让整个过程从黑盒变成可控。

把这六层拼在一起，就是一个能稳定跑完"真实世界长任务"的 Agent 系统。

**你现在可以做的**：

1. **先补检查点**：如果你有现成的 Agent，先给它加上宏观阶段粒度的 Checkpoint——不需要重构整个架构，但立刻获得断点续传能力
2. **引入 Context Folding**：在执行循环里加入"每 N 步主动压缩一次历史"的逻辑，用 `claude-haiku` 等小模型做压缩，边际成本极低
3. **实现 TaskMetrics**：在每个工具调用点记录成本和步骤数，一旦发现成本异常上升，触发熔断而不是让任务无限跑
4. **把"任务"从代码里分离出来**：用类似本文 `TaskGraph` 的结构来显式描述目标、约束和步骤，而不是把它们藏在提示词里——这是让系统可测试的基础
5. **测量你的 Long Horizon 基准线**：从 TerminalBench-2 选 10 个任务，跑一次，记录成功率和平均步骤数，作为优化的起点

## References

- [AgentFlow: Synthesizing Multi-Agent Harnesses for Vulnerability Discovery][links-1]
- [TerminalBench-2: Benchmarking Agents on Hard, Realistic Terminal Tasks][links-2]
- [AgentFold: Long-Horizon Web Agents with Proactive Context Folding][links-3]
- [Temporal.io: Durable Execution for Long-Running Workflows][links-4]
- [LangGraph: Building Stateful Multi-Actor Applications with LLMs][links-5]


[links-1]: https://arxiv.org/abs/2604.20801
[links-2]: https://arxiv.org/abs/2601.11868
[links-3]: https://openreview.net/forum?id=IuZoTgsUws
[links-4]: https://docs.temporal.io/
[links-5]: https://langchain-ai.github.io/langgraph/
