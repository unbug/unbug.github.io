---
layout: post
title:  "一分钟读论文：《循环语言模型的省算力账，批次维度对不上》"
author: unbug
categories: [AI]
image: assets/images/halting-head-compute-gap.svg
tags: [llm, efficient-inference, test-time-compute]
description: "Apple论文用10万GPU小时从零预训练发现：循环语言模型的halting head平均省算力被双重高估，批次解码实付远超平均，修好训练后质量领先只剩约0.003 BPB，省算力账本要换记法。"
---

Apple 论文[《Do Halting Heads Really Save Compute in Looped Language Models?》][paper1-url]（arXiv:2610.32246，2026-10-23 提交）从零预训练了 `140M` 到 `1.3B` 四档参数的循环语言模型，逐个清点批次解码真正花掉的迭代数，结论是 halting head（在每个迭代后判断 token 是否停止的小层）按"平均每 token 迭代数"报告的省算力被系统性高估。

上周站内[《删掉一个前缀，近满分的投毒防御当场裸奔》]({{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/)打的是防御评测指标的失真，这一篇打的是另一个轴：推理计算分配指标的失真——预测平均、实际花费、批次实付是三个数。

![head 预测、exit rule 实跑、批次实付三个数对不上]({{ site.baseurl }}/assets/images/halting-head-compute-gap.svg)

## 预测不到一半迭代，实跑几乎跑满

循环语言模型把同一块层反复跑，每跑一遍算一个迭代，深度是推理时的设置而非权重的一部分，省算力的希望由此而来。论文转引的行业惯例（Tan et al., 2023）称计算量可省 `50%`——这是从规则跳过的迭代数估算的，并非实测运行时间。论文自己的 mixture-loss halting head 预测均值 `3.7` 个迭代（上限 `8`），不到一半；但默认退出规则要等停止概率累计到 `90%` 才放行，token 实跑 `7.6` 到 `7.9` 个迭代，论文原话是 save almost no compute（几乎不省算力）。病灶在训练损失：mixture loss 给所有迭代的状态混合打分，从不给退出规则真正停下的那一次打分；若改用按概率抽样停止迭代的方案把平均值真正花出去，质量要付约 `0.2` BPB（每字节比特数，语言模型损失，越低越好）的代价。

## 批次等最慢的 token，领先塌缩到 0.003

改用逐步打分（per-step loss）加强早停先验后，token 真的停在约 `3` 个迭代，对随机深度训练的无头基线领先约 `0.0246` BPB（`770M` 档位实测，`Table 1` 三档中最大值）。但服务端 `32` 条序列一起解码时，批次要等迭代最多的那个 token 停手才关门：token 平均跑 `3` 次左右，一个批次实付 `4.4` 到 `4.7` 次。`370M` 模型计时实测，批次比固定跑满 `8` 次快约 `1.6` 倍；若按实跑步数固定深度跑同一份权重，本可快 `2.3` 倍，差额就是等待最慢 token 的成本。在批次实付深度上重新对账，`0.0246` 的领先塌到 `0.003` BPB。对已发布开源模型 Ouro 2.6B（Zhu 等人，arXiv:2510.25741）的复测显示，token 平均省约 `1/10` 迭代，`32` token 批次只省约 `1%`——这是该文自测口径，非 Ouro 官方结论。

## 省是真的省过，但账本要换记法

结论并非 halting head 一无是处。逐步打分加固定深度解码时，模型仍全面领先无头基线；把停止 token 已算出的 key/value 复用进 KV cache（论文引 Geiping et al., 2025 的做法），单序列解码能保住几乎全部领先。Ouro 的 gate 在质量侧也真有收益：按该文自测，同等平均深度下其门控分配值 `0.30` BPB。作者的范围限定同样逐字写清：结论只适用于 for the halting heads we train，即该文的 mixture/per-step 训练配置、上限 `1.3B` 参数（训 `104B` tokens）的规模，不能外推到所有自适应深度方案。整个项目约花 `100,000` GPU-hours，预训练了超过 `100` 个模型。论文建议改报三个数——head 预测均值、退出规则实跑步数、批次实付步数——并给出训练前上界测试：瞄准 `3` 次迭代的 head，单序列解码上界约 `0.03` BPB，`32` 序列批次下缩到约 `0.01`。

## References
- [Do Halting Heads Really Save Compute in Looped Language Models?][paper1-url]
- [Scaling Latent Reasoning via Looped Language Models（Ouro 论文原文）][links-1]
- [站内：一分钟读论文：《删掉一个前缀，近满分的投毒防御当场裸奔》][links-2]


[paper1-url]: https://arxiv.org/abs/2610.32246
[links-1]: https://arxiv.org/abs/2510.25741
[links-2]: {{ site.baseurl }}/one-minute-read-paper-rag-defense-benchmark-shortcut/
