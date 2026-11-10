---
layout: post
title:  "一分钟读论文：《跑十轮不如跑一轮》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/e-means-epochs-curve.svg
image_alt: "收敛曲线：跑满 25 个 epoch 才能达到的 Lloyd k-means 损失，e-means 在 1.4 到 2.6 个 epoch 就碰到；横轴为 epoch 数，纵轴为聚类损失。"
tags: [clustering, k-means, vector-search, faiss]
description: "Meta FAIR 预印本 e-means 换掉 k-means 的更新规则：GPU 提速 10 到 45 倍，100 亿向量分 1600 万簇只用 2.5 个 epoch，代码已并入 faiss 主干。"
---

Meta FAIR 的预印本论文[《e-means: outperforming k-means》][paper1-url]把 k-means 的更新规则换成 mini-batch 加滑动平均，摘要口径做到 `10-45x` 的 GPU 端到端提速，代码已并入 faiss 主干。

k-means 要最小化每个点到其最近质心的平方距离和，聚类、压缩、检索索引、数据清洗都在用它；做向量检索和 RAG 的人几乎人手一份。滑动平均指对历史值平滑跟进的更新。论文另引他人工作补了一句：它近来也被用于大模型栈里压缩 attention cache、给注意力做稀疏化——这是既有用途，并非 e-means 的新功能，站内《KV cache serving 专利简报》[（站内阅读）][links-3]正是这一方向的延伸。

## 换掉更新规则，顺手消掉扫参

e-means 的做法有三层：把 mini-batch 的滑动平均更新规则专门化到 k-means；学习率按 cosine 退火，并给中途失去分配点的死簇做复活处理；再对衰减率与 batch size 如何影响最终损失拟合 scaling law，直接给出公式，换数据集不用再扫超参。论文点出老方法的空白：此前没有任何方法告诉使用者给定问题该用多大 batch、多长步长，质心死了也没几个方法管。

![跑满 25 个 epoch 才达到的 Lloyd 损失，e-means 用 1.4 到 2.6 个 epoch 就碰到]({{ site.baseurl }}/assets/images/e-means-epochs-curve.svg)

速度数字分两个口径。摘要口径：`1.4` 到 `2.6` 个 epoch 就追平 Lloyd 算法（k-means 的经典迭代法）跑满 `25` 个 epoch 的损失，折算 `10-45x` GPU 端到端提速，基线是 state-of-the-art 实现（正文指 Faiss-GPU 与 Flash-KMeans）。正文 `4.3` 节对 Flash-KMeans 逐档实测更精确：跨 `1M` 到 `1B` 规模、`10` 个 seed 取中位数，提速为 `9.5x` 到 `45.5x`，且收敛损失更低。结论口径则是 `1` 到 `3` 个 epoch 达到收敛的 Lloyd 质量，三组数字各管各的，不能互换。

最有画面感的是 DINO10B 演示：约 `10 billion`（一百亿）条 DINO 向量切进 `16 million`（一千六百万）个簇，只花 `2.5` 个 epoch，损失低于 Lloyd 跑 `25` 个 epoch 的水位——注意这个 `2.5` 只在这一个数据集上成立。

## 进了 faiss 主干，还没上货架

代码住在 `facebookresearch/faiss` 的 `contrib/e_means` 目录；faiss 是 `41288` stars、`4588` forks 的 MIT 开源库，描述写着“高效稠密向量相似检索与聚类”。用一行 `from faiss.contrib.e_means import NumpyEmeans` 就能起步，GPU 路线提供 Triton、CuTe、PyTorch 三套后端，距离计算可转 BF16、FP8、INT8，数据能从 SSD 流式读入，簇超过约 `10^6` 个还能套 IVF 索引做近似分配再提速。

时间差也写在同一个仓里：代码 `2026-11-02` 就进了 faiss 主干，主 README 至今零提及 e-means，官网 `2026-11-05` 才建，第三方独立复现目前为零。作者是 Douze 与 Jégou——正是 faiss 与 product quantization 的本尊，可信度来自这里，但对比基线里的 faiss 也是作者自家库，这笔账得记着。

## 刹车写在论文自己身上

低维和小数据集是明确边界：论文的 scaling law 为较高维数据调参，`not optimal on very low-dimensional and tiny datasets`；`d ≤ 16` 默认改用 quality batch、`d ≤ 2` 还要关掉簇复活，相当于一组官方补丁。对手并不服气：Flash-KMeans 换用 k-means++ 初始化后，`8` 个配置的平均误差仍全部输给 e-means，但优势收窄到 `0.06%` 到 `0.33%`。论文自标 Preprint、正在同行评审；DINO10B 基准覆盖 `100k` 到 `10B` 规模档位，以 CC-by 4.0 许可、约 `10 TB` 分批发布，论文给了下载路径，目录直链暂不可列举。站内《循环语言模型的省算力账》[（站内阅读）][links-2]同样是换算力账的路子。

## References
- [e-means: outperforming k-means (in one-tenth the epochs)][paper1-url]
- [faiss contrib/e_means 代码目录][links-1]
- [e-means 官网][links-4]
- [站内：循环语言模型的省算力账][links-2]
- [站内：KV cache serving 专利简报][links-3]


[paper1-url]: https://arxiv.org/abs/2611.09501
[links-1]: https://github.com/facebookresearch/faiss/tree/main/contrib/e_means
[links-2]: {{ site.baseurl }}/one-minute-read-paper-halting-head-compute-gap/
[links-3]: {{ site.baseurl }}/innovation-brief-kv-cache-serving-patents/
[links-4]: https://e-means.github.io/
