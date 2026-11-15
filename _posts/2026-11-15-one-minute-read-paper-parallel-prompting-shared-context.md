---
layout: post
title:  "一分钟读论文：《80 行改动，批量推理快 6 倍》"
author: unbug
categories: [AI, OneMinuteRead]
image: assets/images/parallel-prompting-decode-kv.svg
image_alt: "左右对照：传统 batch 解码中每个问题在每一步都要重读一遍长文档的 KV cache；Parallel Prompting 让多条回答流共用同一份文档 KV，每一步只读一遍。"
tags: [llm-inference, kv-cache, serving, sglang, batch-inference]
description: "加州大学圣克鲁兹分校预印本 Parallel Prompting 只改 80 行 SGLang，让同一长文档的多个问题在解码时只读一遍 KV cache：A100 提速 3.7 倍、RTX A6000 近 6 倍，144 次配对全胜；但 GQA 模型只剩 1.3 到 1.9 倍，长答案还会倒退。"
---

UCSC 团队的预印本论文[《Read Once, Answer Many》][paper1-url]发现，前缀缓存没有消掉共享长文档的成本：解码每步、每问仍要重读一遍文档 KV cache，往 SGLang 加约 `80` 行后 A100 快 `3.7` 倍、RTX A6000 快 `5.9` 至 `6.0` 倍。

## 每问每步重读一遍 KV

论文把这笔账说得很直：decode 阶段被内存带宽卡住，成本随问题数增长。前缀缓存（让同一长文档不重复预处理的机制）只解决了预处理，KV cache（注意力层缓存的键值对）仍按问题数重复读。老路子 batch prompting 把多问拼进同一序列，文档确实只读一次，但答案只能逐个生成，后写的还要注意到先写的，既拖长又互相污染。作者的改法是把 P 个问题变成同一个请求里的 P 条回答流，并行解码，再在注意力 kernel 内加一个按流编号生成的掩码：每条回答只看得见文档和它自己的问题，P 条流共享同一次文档 KV 读取。掩码由两个定长索引张量在现有 Triton kernel 内算出，不构造稠密掩码，每个解码步形状固定，能被 CUDA graph 捕获。全程不删 token，不压缩语义，纯粹是执行层的并行化。

![传统 batch 每问每步重读文档 KV，Parallel Prompting 每步只读一遍]({{ site.baseurl }}/assets/images/parallel-prompting-decode-kv.svg)

## 三组数字，各管各的口径

**三组加速数字分属不同基线，不能混用**。头条口径：对开启前缀缓存与 CUDA graphs 的 stock SGLang（FlashInfer 后端），CodeLlama-7B 这类 MHA 模型、`8k`–`16k` token 文档、每文档 `64`–`256` 问，A100 上 `3.7×`，RTX A6000（`48GB` 工作站卡）上 `5.9–6.0×`，两个 SGLang 版本都成立。第二组：换成与作者共用同一套注意力内核的 stock Triton 作基线，`5.1–7.5×`。第三组见下一节，真实基准上只有 `1.81×` 和 `1.12×`。

统计底气很足：`144` 次配对计时全部获胜（`2` 款 GPU、`2` 个版本、`6` 组负载、`6` 组输入），最慢的 Parallel Prompting 仍比同负载最快的 stock 快 `2.46–4.76×`（单边符号检验 p=`1.5×10⁻¹¹`）。最有画面感的那格：对 `16k` token 文档回答 `256` 问，stock SGLang 花 `60.0` 秒，新方法 `12.3` 秒。

显存账同样要标清口径：那是 HuggingFace 原型实验（非 SGLang 引擎路径）的结果，每批至多 `8` 问时占 `16.9 GiB`，不到标准 prompting `53.6 GiB` 的三分之一，还快 `2.1×`；放到 `32` 问则是用 `46%` 显存快 `4.3×`。站内《跑十轮不如跑一轮》[（站内阅读）][links-4]同样是把老操作换掉、重新算一笔算力账的路子。

## GQA 刹车与长答案软肋

**收益取决于 stock 解码每步重读多少 KV**。CodeLlama-7B 是多头的 MHA 模型；换成现在主流的 GQA（分组查询注意力）模型，每 token 的 KV 变小，stock 本来重读的量就少，加速缩水到 `1.3–1.9×`，只写快 6 倍而不交代 MHA 前提就是误导。真实长文本基准更冷：QuALITY 上 `2,086` 问共 `73.6` 秒，比 stock FlashInfer 快 `1.81×`；LooGLE 上只比 Triton 快 `1.12×`，反而比 FlashInfer 慢 `1.26×`。两边平均答案长度不同是主因：QuALITY 答案短，生成步数少；LooGLE 答案长，解码时长主导，文档 KV 重复读的占比被摊薄，共享读取的便宜也就省不出来，长答案是明确的失效边界。限制还有一串：仅支持 Triton 后端、单 GPU、贪心解码、离线批式（同一文档的问题须提前知道），输出因浮点运算次序改变并非逐位一致。论文自标 Preprint、无同行评审；代码仓 `jlab-nlp/parallel-prompting`（Apache-2.0，`2026-11-10` 建仓，`stars` 仅 `1`）自带逐表复现脚本与原始结果，`48GB` 工作站卡即可跑到头条场景，但发布四天，第三方独立复现目前为零。

## References
- [Read Once, Answer Many (arXiv:2611.15130)][paper1-url]
- [代码仓库 jlab-nlp/parallel-prompting][links-1]
- [项目页][links-2]
- [站内：长上下文读不准的 context rot][links-3]
- [站内：e-means 换掉 k-means][links-4]


[paper1-url]: https://arxiv.org/abs/2611.15130
[links-1]: https://github.com/jlab-nlp/parallel-prompting
[links-2]: https://jlab-nlp.github.io/parallel-prompting/
[links-3]: {{ site.baseurl }}/one-minute-read-paper-length-is-cheap-attention-context-rot/
[links-4]: {{ site.baseurl }}/one-minute-read-paper-e-means-kmeans-successor/
