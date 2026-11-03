# IMG01 配图重做报告（批次 IMG01 · 顶刊 v3 标准）

执行时间：2026-11-03 · 执行人：editor subagent
仓库：/home/unbug/Documents/unbug.github.io（master，未 commit/push）
标准：IMAGE-STYLE-GUIDE.md（三轮定稿 v3）· 范例 claim-smoothing-research-agents.svg

## 逐张结果（4/4 完成，均为 NEW 全新设计）

1. **ChatGPT-Prompt-Patterns-for-Improving-Code-Quality.svg** — 完成
   - a：四大领域模式数横向条形（长度正比数量，数量以中文「三种/四种/两种模式」标注）；b：好提示四元素清单 + 四条落地示例注记
   - 注：该文无数值型结果，图表为结构归纳；底注已声明「分类与模式计数为论文自述口径」
2. **On-the-Robustness-of-Code-Generation-Techniques.svg** — 完成
   - a：46%/28%/13%+73% 满条为约 73% 的比例条；b：112/122/98/14/24 重叠关系清单；c：数据集规模行（1,401 / 892 / 150 tokens / 5.3 / 3.0 / 77% / 87%）
3. **Software-Stability-A-Systematic-Literature-Review.svg** — **DEGRADED**
   - 正文仅有定性内容（四类指标定义、三个价值位置、综述局限），无任何量化统计可上坐标轴；按铁律改画类别枚举条（轴标题与底注均声明「每类 1 项指标、不含量化统计」）
4. **small-llm-judge-code-generation.svg** — 完成
   - a：Kappa 条形（0.57/0.54/0.49/0.45/0.40，含零样本起点 0.10/0.00 标注）；b：五模型提升条（+20.6% 等，含 Pass@1 值）；c：以小胜大与成本行（+0.034/+0.090、$600/$17,500/29 倍）

## 六项验证结果（全部通过）

- 工具说明：本机无 xmllint 与 rsvg-convert，改用 python minidom 做 XML 合法性 + 全属性坐标自算（所有 x/width ≤ 1200，y/height ≤ 675），并对长文本行做宽度估算修正一处（图2 面板 c TP 标注右移起点防溢出）。报告如实注明。
- XML 合法性：4/4 minidom parse OK
- 越界：坐标自算 4/4 无越界
- 色板白名单：数据色仅 #0072B2 / #D55E00（每图 ≤2 色相），退让灰 #999999，辅助 #D9D9D9，墨色 #1A1B1E/#555/#767676，底 #FFFFFF — 全在白名单
- 无衬线审计：仅 'Helvetica Neue',Helvetica,Arial,'PingFang SC',sans-serif
- 数字对表：SVG text 数字 token 逐张脚本比对正文，4/4 ⊆ 正文（含轴刻度亦取正文出现的数字）
- 线宽：全部 stroke 仅 0.5（网格）/0.75（轴、框线）；数据表达用实心填充矩形/圆点，无 <1.5px 数据线

## 约束遵守

- 仅写 assets/images/ 下 4 个新 SVG；_posts/ 一字节未动（git status 确认）；未 commit；未改清单外文件
- Front matter image 引用未切换（留给 CEO）
- git status 中其它 _posts 改动为先前批次遗留，非本次产生
