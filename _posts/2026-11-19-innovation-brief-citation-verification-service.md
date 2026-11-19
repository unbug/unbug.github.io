---
layout: post
title: "AI 智创简报：《arXiv 封禁编造引用，投稿前引用回查成了代跑生意》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-citation-verification-service.svg
image_alt: "核心数字：arXiv 对编造引用封禁 1 年；Google Patents 精确引用验真语族史上 5 件、宽语族史上 20,956 件（2026-11-18 同日同域实测）；开源 refchecker ★577 等 MIT 免费在前；npm 商业封装月下载数百量级，交付物层空白"
tags: [citation-verification, Patent, academic-publishing, compliance, solo-dev]
description: "arXiv 封禁编造引用 1 年，引用验真精确语族史上仅 5 件；工具层被 MIT 开源占满，投稿前四色回查报告的服务层空着，1 人 3 周可交付。"
---

一名给 Elsevier 子刊返修的博士后，被审稿人点出 2 条引用查无此文——他手里 80 条参考文献，有 6 条是 Copilot 补写的。arXiv 已对编造引用出台封禁 1 年新规（HN 659 分，`2026-05-14`），逐条打开文献库人工核对要一下午，还查不出"标题作者对不上"这种半真引用。

## 专利信号

- **US12505299B2** · **Casetext Inc**：优先权 `2023-08-16`，`2025-12-23` 公开，已授权。生成文本接口的幻觉检测：枚举源文本段落，对生成引用逐条做可验证性核对；同族 `EP4630936A1`/`EP4630937A1`（审查中）两件在 `2025-10-15` 同日公开，是族证据。
- **US12645555B1** · **Stone & Ink Archive LLC**：优先权 `2026-01-09`，`2026-06-02` 公开，已授权，从申请到公开仅 145 天。机器产物的 fail-closed 一致性层：可回放验证回执加证据快照承诺绑定。
- **CN122175015A** · **成都汇能博友软件科技等三家（含成都晶林科技）**：优先权 `2026-05-12`，`2026-06-09` 公开，审查中，28 天超快公开。留一法消融 RAG 引用验真：标注出处与实检文档不符即判伪。
- **US12531820B2** · **Amazon Technologies Inc**：优先权 `2023-09-29`，`2026-01-20` 公开，已授权。知识图谱辅助大模型，以图谱节点/边做事实锚。
- **US12602412B2 / US12405978B2** · **个人发明人 Vijay Madisetti**（同族）：优先权同为 `2023-05-04`，公开日为 `2026-04-14` 与 `2025-09-02`，均已授权。分域检索的 RAG 管线优化、文档上下文定义与分段生成。

## 技术趋势

`2026-11-18` 同一 Google Patents 域、同日同会话实测：宽语族 `references + language model + verif` 史上 `20,956` 件，直指本赛道的精确语族 `"citation hallucination" OR "hallucinated references" OR "hallucinated citations"` 史上 `5` 件，其中 3 件就是上面 #1/#2/#3。两句检索式覆盖范围不同，只能并排看规模，不可相除算增长率。

> GPTZero 测的是 AI 文本率，11-09 发布的[《验水印还是个爱好》]({{ site.baseurl }}/ai-innovation-brief-provenance-verification-gap/)管的是签发方签名凭证——两者都不是"自己稿子里的参考文献逐条回查"。

趋势用同期布局口径：法律 AI 公司、个人发明人、云厂商、档案公司、中国科技公司五类主体 21 个月内各自走到授权或公开，把"生成内容↔出处逐条可验证"写进权利要求。两件 2026 年新公开件从申请到公开仅 145 天、28 天，是申请人在抢时间戳，属事实描述。

## 落地机会

**用户场景**：开头那位博士后之外，还有代投机构和被 EY 假引用事故（HN 326 分）点到的咨询公司——报告对外交付前没人逐条验过出处。

一个人做的不是工具，是服务层：BibTeX/Word 抽取引用，走 OpenAlex（免费无 key）+ Crossref Polite Pool + 撤稿标记（`is_retracted` 实测 91,576 条）逐条回查，输出**真/查无此文/元数据不匹配/已撤稿**四色带时间戳报告。开源拥挤是实据：refchecker ★577、opendraft ★535、bibtex-verifier ★145 全部 MIT 免费在前。npm 上 5 个 2026 年 10-11 月上线的商业 MCP 封装月下载仅数百量级（citeguard 219），商品化极早期，交付物层空白。起步不到 1000 元，1 人 3 周出 MVP（开源与 npm 数字为 2026-11-18 实测）。

## 创业发现

- 收钱阶梯：散单报告 ¥30-50/篇建案例 → 代投机构 ¥10-20/篇月结 → 科研诚信专员/图书馆年度订阅 ¥3,000-8,000 → 咨询报告线 ¥300-800/份（EY 事故已把需求溢出到企业报告场景）。
- 风险：收录缺口会把真引用误判"查无"，未命中项必须转人工并在报告注明；工具层会被 MIT 开源白牌化，只能靠交付速度与机构合同锁客户。
- 反方照写：独立产品试水者 Referentia 上 HN 仅 3 分，C 端付费意愿未证明。
- 本周动作：拿自己一份旧稿的参考文献跑一遍四色报告，挂到学术社群接第一单。

## References
- [Google Patents 精确语族检索（史上 5 件）][links-gp-precise]
- [Google Patents：US12505299B2][links-patent-casetext]
- [Google Patents：US12645555B1][links-patent-stoneink]
- [Google Patents：CN122175015A][links-patent-chengdu]
- [HN Algolia：arXiv 编造引用封禁检索串][links-hn-arxiv]
- [HN Algolia：GPTZero 顶会抽检检索串][links-hn-gptzero]
- [HN Algolia：EY 报告假引用检索串][links-hn-ey]
- [OpenAlex：撤稿标记查询][links-openalex]
- [GitHub：refchecker][links-refchecker]
- [npm：citation verification 检索串][links-npm]


[links-gp-precise]: https://patents.google.com/?q=%22citation%20hallucination%22%20OR%20%22hallucinated%20references%22%20OR%20%22hallucinated%20citations%22
[links-patent-casetext]: https://patents.google.com/patent/US12505299B2/en
[links-patent-stoneink]: https://patents.google.com/patent/US12645555B1/en
[links-patent-chengdu]: https://patents.google.com/patent/CN122175015A/en
[links-hn-arxiv]: https://hn.algolia.com/api/v1/search?query=arxiv%20hallucinated%20references&tags=story
[links-hn-gptzero]: https://hn.algolia.com/api/v1/search?query=GPTZero&tags=story&numericFilters=created_at_i%3E1735689600
[links-hn-ey]: https://hn.algolia.com/api/v1/search?query=EY%20Canada%20cybersecurity%20report%20citations&tags=story
[links-openalex]: https://api.openalex.org/works?filter=is_retracted:true&per-page=1
[links-refchecker]: https://github.com/markrussinovich/refchecker
[links-npm]: https://registry.npmjs.org/-/v1/search?text=citation%20verification
