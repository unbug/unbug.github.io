# Micropaper 肌肉记忆手册

> **🚨 重要提示**：每次重启 OpenClaw 后，**第一个读的文件就是这个！**
>
> **不要先读 AGENTS.md** —— 所有关键信息都在这里！
>
> **记忆文件一律放在父级 workspace，不要放在这个 repo 里！**
>
> **写作风格一律遵循 `STYLE-GUIDE.md`，Agent 记忆不得覆盖它！**

---

## 1. 启动检查清单（重启后必须逐项检查！）

- [ ] 1.1 确认这个文件（MICROPAPER-MANUAL.md）存在
- [ ] 1.2 检查 `micropaper-state-v2.json` 是否存在且状态正确
- [ ] 1.3 检查父级 workspace 里的最近复盘文件 `../memory/YYYY-MM-DD-micropaper-review.md`
- [ ] 1.4 确认当前阶段 `currentPhase`
- [ ] 1.5 确认已完成论文数量
- [ ] 1.6 如果状态是 IDLE，准备派发新任务；如果是其他状态，继续当前流程

---

## 2. 职责分工（绝对不能混淆！违者重罚！）

### CEO (agent=main)
- ✅ **做**：战略决策、任务派发、**范式审核**、复盘组织
- ✅ **范式审核**：编辑完成后，CEO 对照 `STYLE-GUIDE.md` 逐项审核文章，合格才交给发布者
- ❌ **绝不做**：写论文、配图、git 提交等执行层工作
- **肌肉记忆**：CEO 是质量守门人 + 指挥官！审核不过 → 退回编辑！

### 研究员 (agent=researcher)
- ✅ **做**：找论文、写初稿
- ✅ **优先用**：Chrome 浏览器打开 Google 学术搜索
- ❌ **不做**：润色、配图、git 提交
- **肌肉记忆**：找到高质量论文，提取核心亮点！

### 编辑 (agent=editor)
- ✅ **做**：润色文章、生成配图
- ✅ **只生成**：SVG 格式（不需要转 PNG！）
- ❌ **不做**：找论文、git 提交
- **肌肉记忆**：写完交 CEO 审核，不是直接交发布者！

### 发布者 (agent=publisher)
- ✅ **做**：git 提交、发布上线
- ✅ **先检查**：git status
- ❌ **不做**：找论文、润色、配图
- **肌肉记忆**：commit message 要清晰！

---

## 3. 流程状态机（必须严格遵守！）

```
IDLE → 研究员 → 编辑 → CEO审核 → 发布者 → 复盘 → 确认 → IDLE
  ↑                       ↑                                    ↓
  │                       └── 不合格退回 ──┘                   │
  └────────────────────────────────────────────────────────────┘
```

### 状态说明
- **IDLE**：空闲，等待心跳
- **RESEARCHER**：研究员找论文、写初稿
- **EDITOR**：编辑润色、配图
- **CEO_REVIEW**：CEO 对照 STYLE-GUIDE.md 审核文章范式，不合格退回 EDITOR
- **PUBLISHER**：发布者 git 提交、发布
- **REVIEW**：复盘，保存到 `../memory/YYYY-MM-DD-micropaper-review.md`
- **CONFIRM**：确认，保存到 `../memory/YYYY-MM-DD-micropaper-confirmations.md`

---

## 4. 各阶段检查清单（每个阶段完成前必须逐项检查！）

### 4.1 研究员阶段检查清单

- [ ] 4.1.1 用 Chrome 浏览器打开 Google 学术搜索
- [ ] 4.1.2 找到高质量的论文（最近的、有影响力的）
- [ ] 4.1.3 提取核心亮点和数据（让人"哇"的信息）
- [ ] 4.1.4 按照 Jekyll 格式保存到 `_posts/`
- [ ] 4.1.5 检查 frontmatter 是否完整（title、date、tags、categories、image）
- [ ] 4.1.6 更新 `micropaper-state-v2.json`，设置 `currentPhase: "editor"`

### 4.2 编辑阶段检查清单

- [ ] 4.2.1 润色文章，让它更生动有趣（保留核心信息）
- [ ] 4.2.2 生成 SVG 配图（只生成 SVG！不需要转 PNG！）
- [ ] 4.2.3 保存配图到 `assets/images/`
- [ ] 4.2.4 **检查图片路径格式（最重要！）**：
  - frontmatter 的 image 字段：`assets/images/xxx.svg`（相对路径）
  - 正文中的图片：`![标题](/assets/images/xxx.svg)`（绝对路径）
- [ ] 4.2.5 在文章中插入配图引用
- [ ] 4.2.6 更新 `micropaper-state-v2.json`，设置 `currentPhase: "ceo_review"`

### 4.3 发布者阶段检查清单

- [ ] 4.3.1 运行 `git status` 检查状态
- [ ] 4.3.2 `git add` 添加相关文件（文章、配图、状态文件等）
- [ ] 4.3.3 `git commit` 写清晰的 message（比如："发布第34篇论文：AI共同研究员时代到来"）
- [ ] 4.3.4 `git push` 推送到远程仓库
- [ ] 4.3.5 确认推送成功
- [ ] 4.3.6 更新 `micropaper-state-v2.json`，设置 `currentPhase: "review"`

### 4.4 复盘阶段检查清单

- [ ] 4.4.1 写复盘报告，包含：基本信息、完成情况、数据统计、肌肉记忆验证、成功经验
- [ ] 4.4.2 保存到 `../memory/YYYY-MM-DD-micropaper-review.md`
- [ ] 4.4.3 更新 `micropaper-state-v2.json`，设置 `currentPhase: "confirmations"`
- [ ] 4.4.4 更新 `../HEARTBEAT.md`

### 4.5 确认阶段检查清单

- [ ] 4.5.1 三个 agent（研究员、编辑、发布者）分别确认
- [ ] 4.5.2 保存到 `../memory/YYYY-MM-DD-micropaper-confirmations.md`
- [ ] 4.5.3 更新 `micropaper-state-v2.json`，设置 `currentPhase: "idle"`
- [ ] 4.5.4 更新 `../HEARTBEAT.md`

---

## 5. 配图规范（肌肉记忆！每次配图前都要看！）

### 5.1 格式要求
- ✅ **只生成 SVG 格式**，不需要转 PNG
- ❌ **绝不生成**：PNG、JPG 等其他格式

### 5.2 路径格式（最容易出错！）

**frontmatter 中的 image 字段（相对路径）**：
```yaml
image: assets/images/xxx.svg
```

**正文中的图片引用（绝对路径，以 / 开头）**：
```markdown
![图片标题](/assets/images/xxx.svg)
```

### 5.3 保存位置
- 必须保存到：`assets/images/` 目录
- 文件名：用小写字母和连字符，比如 `cybersecurity-evolution.svg`

---

## 6. 常见问题快速解决（重启后遇到问题先看这里！）

### 问题 1：重启后不知道进度在哪？
**解决**：
1. 打开 `micropaper-state-v2.json`
2. 看 `currentPhase` 字段
3. 看 `lastCompletedPaper` 字段

### 问题 2：配图路径不对？
**解决**：
1. 看这个手册的第 5 部分
2. frontmatter 用相对路径：`assets/images/xxx.svg`
3. 正文用绝对路径：`![标题](/assets/images/xxx.svg)`

### 问题 3：git 提交失败？
**解决**：
1. 先运行 `git status` 看看状态
2. `git add` 相关文件
3. `git commit -m "清晰的 message"`
4. `git push`

### 问题 4：状态文件丢失或损坏？
**解决**：
1. 看父级 workspace 的最近复盘文件 `../memory/YYYY-MM-DD-micropaper-review.md`
2. 从复盘文件中恢复状态
3. 重新创建 `micropaper-state-v2.json`

### 问题 5：忘记下一步做什么？
**解决**：
1. 看这个手册的第 3 部分（状态机）
2. 看 `micropaper-state-v2.json` 的 `currentPhase`
3. 按照对应阶段的检查清单执行

---

## 7. 重启后快速恢复指南（5 分钟内恢复状态！）

### 步骤 1：打开这个手册（1 分钟）
- 第一个文件就读这个：`MICROPAPER-MANUAL.md`
- 不要先读其他文件！

### 步骤 2：完成启动检查清单（2 分钟）
- 逐项勾选第 1 部分的检查清单
- 确认状态文件存在且正确

### 步骤 3：确定当前阶段（1 分钟）
- 看 `micropaper-state-v2.json` 的 `currentPhase`
- 看最近的复盘文件了解上下文

### 步骤 4：执行对应阶段（1 分钟）
- 根据 `currentPhase`，找到对应的检查清单（第 4 部分）
- 按照检查清单逐项执行

---

## 8. 状态文件说明

### 文件位置
`/Users/unbug/.openclaw/workspace/micropaper-state-v2.json`

### 字段说明
```json
{
  "currentPhase": "idle",           // 当前阶段：idle|researcher|editor|publisher|review|confirmations
  "lastCompletedPaper": "论文标题",  // 最后完成的论文
  "lastCompletedTime": "ISO时间",    // 最后完成时间
  "totalCompletedPapers": 34,        // 已完成论文总数
  "quickRecovery": {
    "lastReviewFile": "memory/...",  // 最近的复盘文件
    "lastConfirmationsFile": "memory/..."  // 最近的确认文件
  }
}
```

---

## 9. 肌肉记忆强化训练

### 每次执行任务前，默念：
1. **先读 MICROPAPER-MANUAL.md**（不是 AGENTS.md！）
2. **职责分工不能混**（CEO 不做执行层！）
3. **按照检查清单执行**（逐项勾选！）
4. **配图路径要正确**（frontmatter 相对，正文绝对！）
5. **完成后更新状态**（micropaper-state-v2.json！）

### 每次重启后，默念：
1. **第一个读 MICROPAPER-MANUAL.md**
2. **完成启动检查清单**
3. **5 分钟内恢复状态**

---

## 10. 成功标准

### 重启后的成功标准
- ✅ 5 分钟内恢复状态
- ✅ 第一篇论文质量不下降
- ✅ 无需人类提醒下一步
- ✅ 整个流程自动化

### 日常的成功标准
- ✅ CEO 不做执行层工作
- ✅ 每个阶段都按检查清单执行
- ✅ 配图路径正确
- ✅ git 提交成功
- ✅ 复盘和确认都保存到父级 workspace 文件，不污染 repo

---

## 📝 版本历史

- **v1.0** (2026-03-02)：初始版本，解决重启后质量下降问题

---

**最后更新**：2026-03-02  
**维护者**：CEO (main agent)
