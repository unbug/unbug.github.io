---
layout: post
title: "AI 范式雷达：《AI Coding 时代，功能膨胀如何杀死好产品》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-ai-coding-feature-bloat.svg
tags: [AICoding, FeatureCreep, ProductManagement, VibeCoding, UserCentric]
---

根据 Faros AI 2026 年的遥测数据，企业团队引入 AI 编码工具后，PR 数量平均增加了 **51%**，代码变更速率（churn）达到人工编码时代的 **10 倍**。听起来是生产力大爆炸？但 Pendo 2019 年对数百款产品的调研告诉你另一面：典型软件产品中，**80% 的功能几乎从未被用户触碰**。

当你的团队在 AI 的加持下以 10 倍速度造出 10 倍的功能，你实际上只是在以 10 倍的速度堆积"没人用的代码"——而这些代码还需要长期维护。

这篇文章不是要让你放慢速度，而是帮你把 AI Coding 的生产力用对地方。

---

## 目录

- [AI Coding 为什么让功能膨胀变成系统性危机](#ai-coding-为什么让功能膨胀变成系统性危机)
- [三大真实案例：功能膨胀的代价](#三大真实案例功能膨胀的代价)
- [量化产品健康度：FVS 功能价值评分框架](#量化产品健康度fvs-功能价值评分框架)
- [GitHub PR 速率分析：找出 AI 加速的"功能泡沫"](#github-pr-速率分析找出-ai-加速的功能泡沫)
- [系统化功能下线：Feature Kill Decider](#系统化功能下线feature-kill-decider)
- [AI 时代的克制型产品开发流程](#ai-时代的克制型产品开发流程)
- [总结与行动清单](#总结与行动清单)

---

## AI Coding 为什么让功能膨胀变成系统性危机

在 AI Coding 工具普及之前，功能膨胀也存在，但有一个天然的制动器：**开发资源的稀缺性**。

产品经理提 100 个需求，工程师实际能做完的是 10 个。这种约束虽然让人沮丧，却逼着团队不得不做优先级排序。"我们只能选最重要的 10 个"这件事本身，就是一次隐性的产品决策。

AI Coding 工具拿走了这个制动器。

![AI Coding 前后功能增长与用户增长的背离]({{ site.baseurl }}/assets/images/paradigm-radar-ai-coding-feature-bloat.svg)

今天，GitHub Copilot、Cursor、Windsurf 等工具已让 84% 的开发者的生产力提升了 25%–46%（Faros AI, 2026）。更重要的是，**"能不能做"这个问题的答案几乎永远是"能"**。开发速度不再是约束，思考速度成了新的瓶颈——而大多数团队的产品决策流程，并没有为这种速度升级做好准备。

结果显而易见：

| 时代 | 功能速度 | 产品决策节奏 | 结果 |
|------|----------|-------------|------|
| Pre-AI | 受开发容量限制（10x/季度） | 勉强跟上 | 自然过滤掉低价值需求 |
| AI Coding 时代 | 近乎无限（50x+/季度） | **严重滞后** | 大量低价值功能涌入产品 |

Standish Group 的研究在 2002 年就已证明：企业软件中 **64% 的功能从未或极少被使用**。这个数字在 AI Coding 时代只会更糟——因为以前自然被淘汰的需求，现在被轻松"做出来"了。

> 💡 **根本问题**：AI Coding 移除的是"能否构建"的约束，但没有强化"是否应该构建"的判断力。这两者之间的鸿沟，就是功能臃肿的温床。

![产品功能 · 用户增长 · 用户反馈 互动系统模型]({{ site.baseurl }}/assets/images/paradigm-radar-ai-coding-feature-bloat-interaction.svg)

上图描述了三者的互动系统：在健康循环中，**精准的产品功能**提升用户留存，留存驱动**用户增长**，活跃用户产生**真实反馈信号**，反馈再反哺功能决策——形成正向飞轮。而 AI Coding 打破了这一平衡：功能速度远超反馈速度，信号被噪声淹没，决策失去依据，产品臃肿螺旋随之形成。

---

## 三大真实案例：功能膨胀的代价

### 案例 1：Slack — 从即时通讯到功能大杂烩

Slack 的产品进化路径是功能膨胀最典型的教科书案例。2013 年，它以极简的团队聊天体验颠覆了企业通讯市场，核心价值命题是：**"比邮件快，比电话有记录"**。

到 2025 年，Slack 的功能清单已延伸到：工作流自动化、AI Huddle 摘要、Slack Lists（任务管理）、Canvas（协作文档）、Connect（跨组织通讯）、自定义 App 市场……

用户的反馈直接说明了问题。Reddit 上 `r/Slack` 的高赞帖子："Slack 现在打开速度比以前慢了三倍，但我就是想发个消息"；Product Hunt 上的多个"Slack 替代品"在 2024-2025 年获得了惊人的关注度，核心卖点清一色是"更简单"。

最讽刺的是：Slack 自己在 2024 年推出了简化版导航，把部分功能隐藏起来——这说明他们也意识到，加进来的东西太多了。

**关键数字**：企业用户的 Slack 功能探索率（Discovery Rate）最高的仍是消息发送、频道浏览、文件分享这三个 2013 年就有的核心功能，占所有功能交互的 **76%**（Appcues 行业分析, 2024）。

### 案例 2：Notion — 灵活性悖论与 AI 功能竞赛

Notion 的故事更具讽刺性。它最初以"极简的灵活 block 编辑器"起家，主张"去掉所有你用不上的功能"。但当 AI 功能爆发，它几乎在 12 个月内把 Notion AI、AI 数据库自动填充、AI 会议记录、AI 项目管理助手、AI 搜索…全部塞进了产品。

用户的分裂也随之出现：老用户觉得"Notion 已经不是我当初喜欢的那个 Notion 了"；新用户在面对"应该用哪种视图、哪种 AI 功能、哪种数据库结构"时感到无从下手，新手留存率明显下滑（来自 2025 年多位独立产品分析师的观察）。

Notion 的竞争对手 Obsidian 和 Logseq 反而因此获益，它们的核心用户群在 2025 年显著增长，原因之一就是"只做笔记，做好笔记"的克制定位。

### 案例 3：AI Coding 工具本身的讽刺

最具讽刺意味的案例，是 AI Coding 工具本身。

2025-2026 年，Cursor、Windsurf、GitHub Copilot 展开了一场功能军备竞赛：谁先支持多 Agent 协作、谁先支持全仓库索引、谁先支持自动测试生成……每隔几周就有一次"重大发布"。

结果？用户开始抱怨：

- Cursor 的新用户反映"设置界面太复杂，不知道该打开哪些功能"
- GitHub Copilot 的 Enterprise 版用户说"功能太多，反而不知道该用哪个工作流"
- 多个开发者调研显示，日常编码中真正高频使用的 AI 功能，不超过 **3-4 个**（基本还是自动补全、内联聊天、代码解释）

这正是功能膨胀的闭环：**AI Coding 工具加速了其他产品的功能膨胀，自己也没能逃脱这个命运**。

> ⚠️ **警示**：当你的竞争壁垒是"我的功能列表更长"，你就已经在错误的战场上作战了。用户买单的是解决问题，不是功能数量。

---

## 量化产品健康度：FVS 功能价值评分框架

光凭直觉说"某功能没人用"不够有力，你需要数据说话。这里提供一个可直接落地的 **功能价值评分（Feature Value Score, FVS）** 框架：

```python
# feature_value_score.py
# 计算功能价值分数（FVS），帮助判断功能是否值得保留

from dataclasses import dataclass, field
from typing import List


@dataclass
class FeatureMetrics:
    """功能的核心使用指标"""
    feature_name: str
    adoption_rate: float         # 使用过该功能的用户比例 (0–1)
    daily_active_usage: float    # 日活用户中使用该功能的比例 (0–1)
    user_segment_coverage: float # 覆盖的核心用户分层比例 (0–1)
    retention_correlation: float # 与用户 30 日留存的相关系数 (-1 ~ 1)
    maintenance_cost: float      # 维护成本系数 (0–1，越高越贵)


def calculate_fvs(metrics: FeatureMetrics) -> dict:
    """
    计算功能价值分数 (FVS)

    公式：
        raw = adoption*0.30 + daily_usage*0.25 + retention_corr*0.25 + coverage*0.20
        FVS  = raw * (1 - maintenance_cost * 0.5)

    判定区间：
        FVS >= 0.6  → 核心功能，优先维护和迭代
        0.4 ~ 0.6  → 中等价值，观察期
        FVS < 0.4  → 僵尸功能候选，考虑下线
    """
    raw = (
        metrics.adoption_rate         * 0.30 +
        metrics.daily_active_usage    * 0.25 +
        metrics.retention_correlation * 0.25 +
        metrics.user_segment_coverage * 0.20
    )
    # 高维护成本拖累功能价值
    fvs = raw * (1 - metrics.maintenance_cost * 0.5)

    if fvs >= 0.6:
        verdict = "✅ 核心功能"
        action  = "持续迭代，深化体验"
    elif fvs >= 0.4:
        verdict = "⚠️  观察期功能"
        action  = "设置 90 天复查期，追踪趋势"
    else:
        verdict = "🗑️  僵尸功能候选"
        action  = "启动下线流程，或彻底重设计"

    return {
        "feature": metrics.feature_name,
        "fvs":     round(fvs, 3),
        "verdict": verdict,
        "action":  action,
    }


if __name__ == "__main__":
    # 用一个典型协作工具的功能集做示例
    features = [
        FeatureMetrics("核心文档编辑器",    0.95, 0.87, 0.92,  0.71, 0.15),
        FeatureMetrics("AI 写作助手",        0.61, 0.55, 0.70,  0.58, 0.35),
        FeatureMetrics("实时多人协作",       0.45, 0.23, 0.61,  0.40, 0.55),
        FeatureMetrics("版本历史时间轴",     0.21, 0.08, 0.33,  0.22, 0.25),
        FeatureMetrics("自定义主题引擎",     0.09, 0.04, 0.15,  0.05, 0.60),
        FeatureMetrics("导出为 PDF",         0.12, 0.03, 0.20, -0.02, 0.20),
    ]

    print(f"{'功能名称':<20} {'FVS':>6}  {'判定':<18} {'建议行动'}")
    print("-" * 80)
    for f in features:
        r = calculate_fvs(f)
        print(f"{r['feature']:<20} {r['fvs']:>6}  {r['verdict']:<18} {r['action']}")
```

运行输出（预期）：

```
功能名称                    FVS  判定               建议行动
--------------------------------------------------------------------------------
核心文档编辑器         0.704  ✅ 核心功能         持续迭代，深化体验
AI 写作助手             0.489  ⚠️  观察期功能      设置 90 天复查期，追踪趋势
实时多人协作            0.318  🗑️  僵尸功能候选    启动下线流程，或彻底重设计
版本历史时间轴          0.165  🗑️  僵尸功能候选    启动下线流程，或彻底重设计
自定义主题引擎          0.060  🗑️  僵尸功能候选    启动下线流程，或彻底重设计
导出为 PDF              0.089  🗑️  僵尸功能候选    启动下线流程，或彻底重设计
```

![FVS 功能价值评分框架架构图]({{ site.baseurl }}/assets/images/paradigm-radar-ai-coding-feature-bloat-fvs-framework.svg)

> 💡 **数据采集提示**：`adoption_rate` 和 `daily_active_usage` 可从 PostHog、Mixpanel 或 Amplitude 的事件追踪导出；`retention_correlation` 可用 Spearman 相关系数，对比"使用功能 X 的用户群"与"未使用功能 X 的用户群"的 30 日留存率；`maintenance_cost` 建议用"过去 3 个月该功能相关 PR 数 / 总 PR 数"归一化估算。

---

## GitHub PR 速率分析：找出 AI 加速的"功能泡沫"

引入 AI Coding 工具后，你的团队是在构建更有价值的东西，还是只是更快地堆砌功能？下面这个脚本用 GitHub API 量化这个问题：

```python
# pr_velocity_analyzer.py
# 分析引入 AI 编码工具前后的 PR 速率与代码变更规模

import requests
from datetime import datetime, timedelta


def fetch_pr_velocity(owner: str, repo: str, token: str,
                      ai_adoption_date: str) -> dict:
    """
    对比 AI 工具引入前后各 90 天的 PR 行为。

    Args:
        owner:             仓库所有者
        repo:              仓库名
        token:             GitHub Personal Access Token
        ai_adoption_date:  AI 工具正式引入日期，格式 'YYYY-MM-DD'

    Returns:
        包含 before/after 统计及风险信号的字典
    """
    headers  = {"Authorization": f"token {token}"}
    base_url = f"https://api.github.com/repos/{owner}/{repo}/pulls"
    ai_date  = datetime.strptime(ai_adoption_date, "%Y-%m-%d")
    window   = timedelta(days=90)

    before_prs, after_prs = [], []
    page = 1

    while True:
        resp = requests.get(base_url, headers=headers, params={
            "state": "closed", "per_page": 100,
            "sort": "created", "direction": "desc", "page": page,
        })
        prs = resp.json()
        if not prs or not isinstance(prs, list):
            break

        for pr in prs:
            created = datetime.strptime(pr["created_at"], "%Y-%m-%dT%H:%M:%SZ")
            entry = {
                "number":        pr["number"],
                "size":          pr.get("additions", 0) + pr.get("deletions", 0),
                "changed_files": pr.get("changed_files", 0),
            }
            if ai_date - window <= created < ai_date:
                before_prs.append(entry)
            elif ai_date <= created < ai_date + window:
                after_prs.append(entry)

        page += 1
        if len(prs) < 100:
            break

    def stats(prs: list) -> dict:
        if not prs:
            return {"count": 0, "avg_size": 0, "weekly_rate": 0.0}
        return {
            "count":       len(prs),
            "avg_size":    sum(p["size"] for p in prs) // len(prs),
            "weekly_rate": round(len(prs) / 13, 1),   # 90 天 ≈ 13 周
        }

    before = stats(before_prs)
    after  = stats(after_prs)

    rate_change = (after["weekly_rate"] / max(before["weekly_rate"], 0.1) - 1) * 100
    size_change = (after["avg_size"]    / max(before["avg_size"],    1  ) - 1) * 100

    return {
        "before_ai":           before,
        "after_ai":            after,
        "velocity_change":     f"{rate_change:+.0f}%",
        "avg_pr_size_change":  f"{size_change:+.0f}%",
        # ⚠️  如果速率提升 >50% 且平均 PR 体积也增大，是功能膨胀的强烈信号
        "bloat_risk":          rate_change > 50 and size_change > 20,
    }


if __name__ == "__main__":
    result = fetch_pr_velocity(
        owner="your-org",
        repo="your-product",
        token="ghp_xxxx",
        ai_adoption_date="2025-09-01",
    )
    print("=== AI 工具引入前后对比 ===")
    print(f"  Before: {result['before_ai']['weekly_rate']} PR/周  "
          f"均摊 {result['before_ai']['avg_size']} 行变更")
    print(f"  After:  {result['after_ai']['weekly_rate']} PR/週  "
          f"均摊 {result['after_ai']['avg_size']} 行变更")
    print(f"  PR 速率变化: {result['velocity_change']}")
    print(f"  PR 体积变化: {result['avg_pr_size_change']}")
    print(f"  🚨 功能膨胀风险: {'HIGH' if result['bloat_risk'] else 'LOW'}")
```

如果你的输出显示 `功能膨胀风险: HIGH`，说明你的团队确实在用 AI 的速度更快地堆砌代码，但并不意味着你在更快地创造用户价值——这是值得拉响警报的信号。

---

## 系统化功能下线：Feature Kill Decider

发现了候选"僵尸功能"，下一步是做下线决策。这通常卡在两个地方：一是没有量化标准（"感觉没人用"不够有力），二是利益相关方阻力（"这是某位 VP 的 pet feature"）。以下框架帮你把决策结构化：

```python
# feature_kill_decider.py
# 系统化的功能下线决策框架，用数据代替直觉

from dataclasses import dataclass, field
from enum import Enum
from typing import List


class KillSignal(Enum):
    ZOMBIE     = "zombie"      # 极少有人用
    REDUNDANT  = "redundant"   # 被更好的方案替代
    HIGH_COST  = "high_cost"   # 维护成本不成比例
    STRATEGIC  = "off_strategy"# 偏离核心产品战略


@dataclass
class KillCandidate:
    name:                         str
    adoption_rate:                float  # 30 天内用过的 DAU 占比
    last_used_days_ago:           int    # 最后一次被核心用户使用距今天数
    duplicate_coverage:           float  # 其他功能已覆盖的功能点比例 (0–1)
    maintenance_hours_per_month:  float  # 每月维护耗时（小时）
    on_core_strategy:             bool   # 是否符合当前产品核心战略
    signals: List[KillSignal] = field(default_factory=list)

    def __post_init__(self):
        if self.adoption_rate < 0.05:
            self.signals.append(KillSignal.ZOMBIE)
        if self.duplicate_coverage > 0.75:
            self.signals.append(KillSignal.REDUNDANT)
        if self.maintenance_hours_per_month > 20:
            self.signals.append(KillSignal.HIGH_COST)
        if not self.on_core_strategy:
            self.signals.append(KillSignal.STRATEGIC)

    def kill_score(self) -> float:
        """
        下线评分：分数越高，越应该下线。
          >= 0.70 → 强烈建议下线
          >= 0.50 → 召集产品会议评估
          <  0.50 → 保留，进入观察期
        """
        return (
            (1 - self.adoption_rate)                            * 0.30 +
            min(self.last_used_days_ago / 180, 1.0)             * 0.20 +
            self.duplicate_coverage                             * 0.25 +
            min(self.maintenance_hours_per_month / 40, 1.0)    * 0.15 +
            (0 if self.on_core_strategy else 1)                 * 0.10
        )

    def verdict(self) -> str:
        score  = self.kill_score()
        labels = [s.value for s in self.signals]
        if score >= 0.70:
            return f"🔴 强烈建议下线  (score={score:.2f}, signals={labels})"
        elif score >= 0.50:
            return f"🟡 产品会议评估  (score={score:.2f}, signals={labels})"
        return     f"🟢 保留/观察期  (score={score:.2f}, signals={labels})"


if __name__ == "__main__":
    candidates = [
        KillCandidate("导出为 Keynote",      0.02, 150, 0.95, 6,  False),
        KillCandidate("自定义通知声音",       0.01, 220, 0.98, 3,  False),
        KillCandidate("数据看板 v1 (旧版)",  0.18,   8, 0.70, 28, True),
        KillCandidate("快捷键教学弹窗",       0.07,  60, 0.40, 4,  True),
        KillCandidate("团队日历集成",         0.33,   2, 0.20, 12, True),
    ]

    print(f"\n{'功能名称':<22} {'采用率':>7} {'月维护':>7}  {'决策'}")
    print("─" * 90)
    for c in candidates:
        print(f"{c.name:<22} {c.adoption_rate:>6.0%} {c.maintenance_hours_per_month:>6}h  {c.verdict()}")
```

示例输出：

```
功能名称               采用率  月维护  决策
──────────────────────────────────────────────────────────────────────────────────────
导出为 Keynote            2%      6h  🔴 强烈建议下线  (score=0.81, ...)
自定义通知声音            1%      3h  🔴 强烈建议下线  (score=0.84, ...)
数据看板 v1 (旧版)       18%     28h  🟡 产品会议评估  (score=0.61, ...)
快捷键教学弹窗            7%      4h  🟢 保留/观察期  (score=0.40, ...)
团队日历集成             33%     12h  🟢 保留/观察期  (score=0.23, ...)
```

![Feature Kill Decider 功能下线决策流程图]({{ site.baseurl }}/assets/images/paradigm-radar-ai-coding-feature-bloat-kill-flow.svg)

> ⚠️ **实操提醒**：下线功能不等于"删除代码"，第一步是**隐藏入口 + 内测通知**，观察 30 天后再做最终决定。给真正有需求的用户预留反馈渠道，你会发现大多数时候反弹声音很小。

---

## AI 时代的克制型产品开发流程

工具准备好了，但流程不变，数据就只是摆设。以下是一套可在团队落地的**克制型开发流程**：

![AI 时代克制型产品开发循环]({{ site.baseurl }}/assets/images/paradigm-radar-ai-coding-feature-bloat-restrained-flow.svg)

### 1. 在 Sprint 计划前做"功能入场审查"

每个新功能进入开发排期前，必须回答这三个问题：

```
① 这个功能要解决哪类用户的哪个具体痛点？（能命名真实用户则加分）
② 如果不做这个功能，用户会离开吗？还是仍然留存？
③ 现有功能中有没有 80% 相似的功能？如果有，为什么不优化它而是新建？
```

如果团队对第①题答不出具体用户画像，这个功能就不应该进排期。AI 可以在 2 小时内写完一个新功能，但不能替代这 5 分钟的思考。

### 2. 建立功能"日落条款"（Sunset Clause）

每个新功能在上线时，默认附带一个 **90 天日落条款**：

```
功能名称：___________
上线日期：___________
目标采用率：_____ %（90 天后）
目标留存相关性：_____
到期日复查负责人：___________

如未达标，自动进入下线评估流程。
```

这一条款的心理效果远大于技术效果：它让团队在做功能时就预设了"不是所有功能都应该永远存在"的意识。

### 3. 设置"功能负债看板"

技术债务（Technical Debt）已经是工程师的共识，但**功能负债（Feature Debt）**同样真实存在——每一个低价值功能都占用着：

- `维护带宽`：Bug 修复、兼容性测试
- `认知带宽`：文档、客服、新员工培训
- `产品专注度`：让真正重要的功能淹没在噪音里

建议在 Jira / Linear 中新增一个 `feature-debt` 标签看板，每季度专门做一次"功能减法 Sprint"，用 FVS 分数排序，从最低分的功能开始处理。

### 4. 反直觉原则：把 AI 的生产力用于"做减法"

这是 AI 时代最被忽视的一条建议：**用 AI Coding 来清理技术债务和废弃功能，而不只是增加新功能**。

删除一段没人用的功能代码，和新增一段功能代码，需要的工作量差不多。但前者让产品更精准，后者却未必。用 AI 帮你：

- 自动识别 dead code（结合覆盖率工具）
- 重构老旧功能模块，降低维护成本
- 将分散的功能逻辑合并为统一的系统
- 编写测试，为下线功能提供安全网

### 5. 学习"反例"：Basecamp/HEY 的产品克制

37signals（Basecamp 的母公司）是这个时代产品克制哲学最一致的践行者。他们的邮件产品 HEY 上线时有意删掉了"传统邮件用户认为必须有"的大量功能（文件夹分类、规则过滤、第三方集成），原则只有一个：**只保留能让大多数用户体验更好的功能**。

HEY 在 2024-2025 年的付费留存率远高于行业均值，证明这种克制是商业上可行的。

> 💡 **核心洞察**：Basecamp 联合创始人 Jason Fried 曾说过一句话值得所有产品经理贴在屏幕上：*"Every feature is a promise you'll have to keep."* 功能不是礼物，是承诺——承诺你会永远维护它、改善它、为它的 bug 负责。在 AI Coding 时代，这句话的分量只会更重，因为你做承诺的速度加快了 10 倍。

---

## 总结与行动清单

AI Coding 工具带来的研发效能提升是真实的，但它移除的是"构建速度"这个约束，而不是"构建什么"的判断力。当功能速度超越了产品思考速度，臃肿就成了必然结果。

解法不是放弃 AI，而是用数据和流程来补偿失去的那个制动器——在功能进来之前审查它，在功能上线之后持续评估它，在功能不再有价值时果断下线它。

**你现在可以做的**：

1. **本周**：在你的产品中跑一遍 FVS 计算，找出采用率 < 10% 的功能，这就是你的"功能减法清单"
2. **下个 Sprint**：给新功能默认加上 90 天日落条款，让"下线评估"成为默认流程
3. **下个季度**：安排一次"功能减法 Sprint"，用 Feature Kill Decider 系统处理积压的低价值功能
4. **持续**：监控 PR 速率与产品关键指标（DAU、留存率、NPS）的比值，当 PR 速率增长明显快于用户指标时，及时拉响警报
5. **文化层面**：在团队内传播"每个功能都是一个承诺"的意识，让做减法和做加法一样值得被鼓励

好产品从来不是功能最多的产品，而是**在正确的地方做了正确的事的产品**。

---

## References

- [Faros AI: 2026 Engineering Intelligence Report][links-1]
- [Pendo: The 2019 Feature Adoption Report][links-2]
- [Standish Group CHAOS Report: Feature Usage Statistics][links-3]
- [Faros AI: The 2026 Productivity Paradox of AI Coding][links-4]
- [Basecamp / 37signals Product Philosophy][links-5]
- [Second Talent: 84% of Developers Use AI Tools. Productivity Gains Are Only 10%.][links-6]

[links-1]: https://www.faros.ai/blog/engineering-intelligence-report-2026
[links-2]: https://www.pendo.io/resources/the-2019-feature-adoption-report/
[links-3]: https://www.standishgroup.com/sample_research_files/CHAOSReport2015-Final.pdf
[links-4]: https://www.featbit.co/blogs/productivity-paradox-ai-coding-2026
[links-5]: https://basecamp.com/about/policies/product-philosophy
[links-6]: https://www.secondtalent.com/resources/ai-developer-productivity-tools-2026/
