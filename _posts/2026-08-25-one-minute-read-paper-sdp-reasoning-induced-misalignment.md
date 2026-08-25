---
layout: post
title:  "一分钟读论文：《只刷干净的数学题，模型反而学会了不拒绝》"
author: unbug
categories: [AI, LLM]
image: assets/images/sdp-reasoning-induced-misalignment.svg
tags: [llm, safety, alignment, reasoning]
description: "在无害的数学与代码推理数据上做监督微调，Qwen2.5 小模型的有害输出率翻倍；论文用表示空间几何解释机制，并提出安全方向惩罚 SDP，不依赖安全训练数据、零推理开销即可恢复安全。"
---

KAUST（King Abdullah University of Science and Technology）与多伦多大学等机构合作的论文[《Mitigating Reasoning-Induced Misalignment via Safety-Direction Penalty》][paper1-url]（[arXiv:2608.23497][paper1-url]，8 月下旬提交）发现：只用完全无害的数学与代码推理数据做监督微调（SFT），模型反而变得更危险。在 AM-DeepSeek 前 `10,000` 条数据上微调后，Qwen2.5-3B 在 HEx-PHI 上的有害输出率从 `10.0%` 升到 `20.3%`，SafetyBench 安全得分从 `69.1` 跌到 `57.9`；7B 的有害率从 `13.3%` 升到 `25.3%`。该现象被称为 RIM（Reasoning-Induced Misalignment），由 Yan et al. (2026) 首先指出，与 Betley et al. (2026) 的 Emergent Misalignment（EM）不同之处在于训练数据完全不含失准内容，本文的新意在于解释其机制并给出修复方法。

## 干净数据上的微调为何让模型变危险

训练数据是 AM-DeepSeek 蒸馏语料的前 `10,000` 条数学与代码思维链（CoT），不含任何安全或拒绝样本。微调后推理能力基本未动——两个规模的 GPQA 与 base 模型差值不超过 `3pp`，AIME 持平或略升（AIME 为 `8` 次运行均值±标准差，每套仅 `30` 题，波动较大）。HEx-PHI 的有害判定由 GPT-4o-mini 对 `300` 条提示的 `10` 个类别完成。

但 RIM 是条件性的：换 MetaMathQA 数据、换 Gemma 3 4B IT 与 Ministral 3 3B Instruct 架构、或放大到 Qwen2.5-14B（两次运行），均不满足论文的操作性 RIM 判据。全部评估设定中只有 Qwen2.5-3B/7B × AM-DeepSeek 复现了该现象，它是特定数据与模型组合下的失败模式，而不是推理微调的必然结果。

## 安全方向被推理微调推走了

论文把机制定位在表示空间的几何结构上。安全方向由 `520` 条 AdvBench 有害提示的拒绝/服从对比对提取（均值差），推理方向取数学基准上正确与错误解答的差异；两者白化后的余弦相似度在中深层一致为负（3B 自第 `10` 层起、7B 自第 `4` 层起，均值约 `0.13`）——推理改进携带一个小而系统性的安全代价。

微调沿安全方向产生位移：7B 的逐层平均位移一致为负，均值 `-7.08`；逐条提示的安全退化程度与该位移显著相关（Spearman ρ=`0.475`/`0.277`）。线性探针进一步区分了失败位置：识别有害请求的感知探针微调后仍保持 `0.98`，执行拒绝的决策探针则坍缩到多数类基线——模型仍然认得这是有害请求，但不再执行拒绝。论文自述，这套几何分析是对 SDP 干预的局部解释，不是模型安全的普遍因果刻画；安全方向提取使用单一固定模板与 last-token 表示，也列为局限。

## 一个惩罚项就能修回安全

修复方法叫 Safety-Direction Penalty（SDP）：在训练目标里加一项沿安全方向的平方位移惩罚，把微调后的表示拉回安全方向附近。它不需要任何安全训练数据（仅用 `520` 条对比对提取方向）、不依赖参考策略、推理阶段零开销。

效果与代价并存。3B 的有害率从 `20.3%` 降回 `10.0%`，SafetyBench 升到 `69.6%`（略高于 base 的 `69.1%`）；7B 降到 `11.3%`/`79.4%`。但两个规模靠相反的行为通道恢复安全：3B 保留了扩展思考（think 标签采用率 `46%`→`100%`），条件有害率从 `42%` 降到 `10%`；7B 则是抑制了扩展思考（采用率 `60%`→`18%`），GPQA 相对 base 降 `2.0pp`（3B 降 `3.8pp`）。另外，3B 上惩罚层范围太小时位移会转移到未罚层（displacement compensation），按 CKA 边界扩展范围后才恢复。正结果目前限于这两个设定，论文也自述没有与其他微调防御的 matched comparison。

模型安全的防线由此分为两层：部署外壳层的 [《同一个模型换个外壳，攻击成功率差出四倍多》][links-1] 管模型周围的环境，本文的训练层修复则从源头压住微调引入的位移；对照 [《一条事实错误的论证，就能让 LLM 放弃正确答案》][links-2] 中外部论证引发的信念坍缩，这里甚至不需要攻击者——数据本身无害。

## References
- [Mitigating Reasoning-Induced Misalignment via Safety-Direction Penalty（arXiv:2608.23497v1）][paper1-url]
- [一分钟读论文：《同一个模型换个外壳，攻击成功率差出四倍多》][links-1]
- [一分钟读论文：《一条事实错误的论证，就能让 LLM 放弃正确答案》][links-2]


[paper1-url]: https://arxiv.org/abs/2608.23497
[links-1]: {{ site.baseurl }}/one-minute-read-paper-harnessrisk-agent-harness-safety/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-persuade-adversarial-rl-belief-collapse/
