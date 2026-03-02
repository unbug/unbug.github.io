#!/bin/bash

# Micropaper 重启恢复脚本
# 用途：重启后快速检查状态并提供恢复建议

echo "=========================================="
echo "  Micropaper 重启恢复检查"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 工作目录
WORKSPACE="/Users/unbug/.openclaw/workspace"
cd "$WORKSPACE" || exit 1

# 检查 1：MICROPAPER-MANUAL.md 是否存在
echo "[1/6] 检查肌肉记忆手册..."
if [ -f "MICROPAPER-MANUAL.md" ]; then
    echo -e "  ${GREEN}✅ MICROPAPER-MANUAL.md 存在${NC}"
else
    echo -e "  ${RED}❌ MICROPAPER-MANUAL.md 不存在！${NC}"
    echo "  请从备份恢复或重新创建"
    exit 1
fi

# 检查 2：micropaper-state-v2.json 是否存在
echo ""
echo "[2/6] 检查状态文件..."
if [ -f "micropaper-state-v2.json" ]; then
    echo -e "  ${GREEN}✅ micropaper-state-v2.json 存在${NC}"
    
    # 读取当前状态
    CURRENT_PHASE=$(python3 -c "import json; print(json.load(open('micropaper-state-v2.json'))['currentPhase'])" 2>/dev/null)
    TOTAL_PAPERS=$(python3 -c "import json; print(json.load(open('micropaper-state-v2.json'))['totalCompletedPapers'])" 2>/dev/null)
    LAST_PAPER=$(python3 -c "import json; print(json.load(open('micropaper-state-v2.json'))['lastCompletedPaper'])" 2>/dev/null)
    
    echo "  当前阶段: $CURRENT_PHASE"
    echo "  已完成论文: $TOTAL_PAPERS 篇"
    echo "  最后完成: $LAST_PAPER"
else
    echo -e "  ${RED}❌ micropaper-state-v2.json 不存在！${NC}"
    exit 1
fi

# 检查 3：最近的复盘文件
echo ""
echo "[3/6] 检查最近的复盘文件..."
TODAY=$(date +"%Y-%m-%d")
YESTERDAY=$(date -v-1d +"%Y-%m-%d" 2>/dev/null || date -d "yesterday" +"%Y-%m-%d")

for DATE in "$TODAY" "$YESTERDAY"; do
    REVIEW_FILE="memory/${DATE}-micropaper-review.md"
    if [ -f "$REVIEW_FILE" ]; then
        echo -e "  ${GREEN}✅ 找到复盘文件: $REVIEW_FILE${NC}"
        break
    fi
done

# 检查 4：memory 目录
echo ""
echo "[4/6] 检查 memory 目录..."
if [ -d "memory" ]; then
    MEMORY_COUNT=$(ls memory/ | wc -l)
    echo -e "  ${GREEN}✅ memory 目录存在，包含 $MEMORY_COUNT 个文件${NC}"
else
    echo -e "  ${YELLOW}⚠️  memory 目录不存在${NC}"
fi

# 检查 5：AGENTS.md
echo ""
echo "[5/6] 检查 AGENTS.md..."
if [ -f "AGENTS.md" ]; then
    echo -e "  ${GREEN}✅ AGENTS.md 存在${NC}"
else
    echo -e "  ${YELLOW}⚠️  AGENTS.md 不存在${NC}"
fi

# 检查 6：git 状态
echo ""
echo "[6/6] 检查 git 状态..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    GIT_STATUS=$(git status --short)
    if [ -z "$GIT_STATUS" ]; then
        echo -e "  ${GREEN}✅ 工作树干净${NC}"
    else
        echo -e "  ${YELLOW}⚠️  有未提交的变更:${NC}"
        echo "$GIT_STATUS" | head -5
    fi
else
    echo -e "  ${YELLOW}⚠️  不是 git 仓库${NC}"
fi

echo ""
echo "=========================================="
echo "  恢复建议"
echo "=========================================="
echo ""

case "$CURRENT_PHASE" in
    "idle")
        echo "🎯 当前状态: IDLE（空闲）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md"
        echo "  2. 等待心跳，CEO 会自动派发新任务"
        echo "  3. 或者手动触发新任务"
        ;;
    "researcher")
        echo "🔬 当前状态: RESEARCHER（研究员）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md 的 4.1 部分"
        echo "  2. 继续研究员的工作：找论文、写初稿"
        echo "  3. 完成后更新状态为 editor"
        ;;
    "editor")
        echo "✏️  当前状态: EDITOR（编辑）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md 的 4.2 部分"
        echo "  2. 继续编辑的工作：润色、生成配图"
        echo "  3. 注意配图路径格式！"
        echo "  4. 完成后更新状态为 publisher"
        ;;
    "publisher")
        echo "📦 当前状态: PUBLISHER（发布者）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md 的 4.3 部分"
        echo "  2. 继续发布者的工作：git 提交、推送"
        echo "  3. 完成后更新状态为 review"
        ;;
    "review")
        echo "📝 当前状态: REVIEW（复盘）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md 的 4.4 部分"
        echo "  2. 写复盘报告"
        echo "  3. 保存到 memory/YYYY-MM-DD-micropaper-review.md"
        echo "  4. 完成后更新状态为 confirms"
        ;;
    "confirms")
        echo "✅ 当前状态: CONFIRMS（确认）"
        echo ""
        echo "下一步操作:"
        echo "  1. 阅读 MICROPAPER-MANUAL.md 的 4.5 部分"
        echo "  2. 三个 agent 分别确认"
        echo "  3. 保存到 memory/YYYY-MM-DD-micropaper-confirmations.md"
        echo "  4. 完成后更新状态为 idle"
        ;;
    *)
        echo "❓ 未知状态: $CURRENT_PHASE"
        echo ""
        echo "请检查 micropaper-state-v2.json 文件"
        ;;
esac

echo ""
echo "=========================================="
echo "  💡 重要提示"
echo "=========================================="
echo ""
echo "1. 第一个要读的文件: MICROPAPER-MANUAL.md"
echo "2. 不要先读 AGENTS.md！"
echo "3. 按照检查清单逐项执行"
echo "4. 遇到问题看手册的第 6 部分（常见问题）"
echo ""
echo "=========================================="
