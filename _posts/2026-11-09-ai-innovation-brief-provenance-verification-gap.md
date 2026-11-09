---
layout: post
title: "AI 智创简报：《贴水印成了行业，拆水印成了生意，验水印还是个爱好》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/provenance-verification-gap.svg
image_alt: "对比图：左侧人山人海——对抗攻击专利 1944 件、水印嵌入专利 1062 件、拆标工具头名 6321 星、逆向 SynthID 仓库 5058 星；右侧空位——第三方检测 11 件、溯源机器学习 75 件、SynthID 加水印 6 件、凭证校验双查询真零"
tags: [ai-content-provenance, watermarking, patents, c2pa, solo-dev]
description: "AI 内容水印嵌入专利 1062 件、对抗攻击 1944 件，第三方检测仅 11 件，凭证校验双查询真零；不建库、只验签的独立校验器暂无权利要求卡住。"
---

`2026-11-09` 同日 Google Patents 精确检索：水印嵌入 `1062` 件、对抗攻击 `1944` 件，第三方检测仅 `11` 件，凭证校验的双查询两次真零。

![水印嵌入与对抗攻击的专利圈地 vs 第三方验真的空位]({{ site.baseurl }}/assets/images/provenance-verification-gap.svg)

## 六件专利，没有一件替第三方验凭证

当日逐字复核的六件详情页各有落点。微软（Microsoft Technology Licensing LLC）`US20250298500A1` 溯源内容追踪（`2025-09-25` 公开）claim 编辑系统里对模型生成段落挂溯源元数据并给可视化标识，判词：闭环在自家编辑器的显示层里。微软 `US20250356057A1` 生成模型内容检测（`2025-11-20` 公开）claim 篡改帧验证第一签名后补签第二签名，判词：盖章方自己补签，仍是签发端。个人申请人 Michael Boucher 的 `US20250322156A1` AI 文本识别（`2025-10-16` 公开，sole inventor）claim 监听剪切板事件抓文本比对 AI 文本库，判词：一个人已在动手，但落点是剪贴板检测，不是凭证校验。公安部第三研究所 `CN122196982A` claim 多维向量投影加锦标赛采样的文本水印，合肥工业大学 `CN122433060A` claim 采样与优选输出的黑盒水印及检测，判词：两件都在学术嵌入端。

## 验真位的检索面：窄处真零

AI 内容溯源（content provenance，指标明内容来自哪个模型、经谁编辑的凭证链条）的检索面窄得多："content provenance" "machine learning" 仅 `75` 件，"SynthID" "watermark" 仅 `6` 件，第三方检测 `11` 件。再往精确处查，"provenance graph" "watermark removal" "third-party verifier" 与去掉尾项的重查两次都返回 `0`，HTTP 均 `200`、返回体为合法 JSON、total_num_results 为零——空位不是检索通道故障。仓库侧同温：GitHub 上去水印工具 wiltodelta/remove-ai-watermarks 头名 `6321` 星，aloshdenny/reverse-SynthID `5058` 星；唯一自称第三方水印取证的 karthikrshet/ClaudeMark 只有 `10` 星。

## 六条反方，逐条摆开

诚实呈现要有六条。其一，Qomplx Inc 的 `US12602572B2` 已授权（`2026-04-14`，优先权 `2023-12-23`），claim 把外部内容分块哈希后与自家注册内容元素数据库比对判 AI/非 AI——它验的是指纹库，不是签名凭证；本期只把它当内容验真订阅服务看。其二，ClaudeMark 虽仅 `10` 星，第三方水印取证这个坑位已被占。其三，微软两件圈住签发与显示端，外部校验器的边缘空间受挤压。其四，"watermark" "verify" "provenance" 命中 `362` 件，不是零；多数是签发链路带上 verify 字样，精确到第三方验证才见空位。其五，`1944` 件对抗攻击的头部申请人是中国高校与 Digimarc，攻防两头都有正经机构。其六，`6321` 星只证明拆标需求热度，推不出灰色产业规模。

## 单人切口：不建库的凭证校验器

空位对应一个个人可交付物：C2PA（业内内容凭证标准，把生成模型、编辑记录签进文件）与水印凭证的独立校验 CLI/CI 检查器——凭证可验、链可查、不建内容库。前文六件里，微软两件在签发显示端，Qomplx 的 claim 依赖自家注册哈希库，个人那件落在剪贴板比对；只验凭证、不碰库、不生成内容的形态暂无权利要求卡住。上一篇[工具调用空结果语义]({{ site.baseurl }}/ai-innovation-brief-tool-failure-semantics/)管的是调用返回没人分箱，这一篇管的是内容本身没人验真。

## References
- [微软溯源内容追踪专利][links-p1]
- [微软生成模型内容检测专利][links-p2]
- [个人申请人 AI 文本识别专利][links-p3]
- [公安部三所 LLM 文本水印专利][links-p4]
- [合肥工业大学黑盒大模型水印专利][links-p5]
- [Qomplx 内容识别与验真专利][links-p6]
- [GitHub：remove-ai-watermarks][links-g1]
- [GitHub：reverse-SynthID][links-g2]
- [GitHub：ClaudeMark][links-g3]


[links-p1]: https://patents.google.com/patent/US20250298500A1/en
[links-p2]: https://patents.google.com/patent/US20250356057A1/en
[links-p3]: https://patents.google.com/patent/US20250322156A1/en
[links-p4]: https://patents.google.com/patent/CN122196982A/en
[links-p5]: https://patents.google.com/patent/CN122433060A/en
[links-p6]: https://patents.google.com/patent/US12602572B2/en
[links-g1]: https://github.com/wiltodelta/remove-ai-watermarks
[links-g2]: https://github.com/aloshdenny/reverse-SynthID
[links-g3]: https://github.com/karthikrshet/ClaudeMark