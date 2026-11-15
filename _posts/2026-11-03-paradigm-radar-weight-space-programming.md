---
layout: post
title:  "AI 范式雷达：《模型的配方摊在桌面上》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-weight-space-cover.svg
image_alt: "封面：左为七日 HN 事件点阵与分数，右为权重可编程的三层结构"
tags: [open-weights, model-editing, interpretability, inference, coding-agent, paradigm-radar]
description: "HN 十二天事件簇实测：MIT CSAIL 博客称前沿模型能原生读写神经网络权重拿下近三千分，RISC-V CPU 被编译进权重，五小模型组队打平前沿，打假与复测帖接踵而至，权重正从调用品变成编程介质。"
---

`2026` 年 `10` 月 `25` 日至 `11` 月 `13` 日的 Hacker News 上，实测到 `9` 个同主题事件帖（最高 `2969` 分，`2026-11-16` 复测；`11-03` 首采为六帖）：讨论对象从「权重可被读写编译组队」的宣称，扩展成一场公开打假与复测——开源权重正在从调用品变成可编程介质。

口径：首采为 `2026-11-03` Algolia 实测（即封面 a 面的六帖点阵）；本文 `2026-11-16` 经 hn.algolia.com 全树复测并补入首采后新发的 `3` 帖；博客与论文为原文直读；仓库星数为 api.github.com 同日实测；评论区引语为原文摘译并附评论编号。

## 十二天事件簇实测

时间线（首帖分数为 `11-03` 首采，括注为 `11-16` 复测）：

- `10-25` GVS5H：五个 Qwen3.8-27B 组队打平前沿大模型（`195` 分，复测 `196` 分 / `75` 条，帖主 rzk）
- `10-26` IBM CEO 称开源权重模型已经又好又便宜（`428` 分 / `339` 条）
- `10-27` 五家推理服务商同时上架去安全化 DeepSeek（`100` 分 / `114` 条）
- `10-29` Qwenputer：一台确定性 RISC-V CPU 被编译进 Qwen3.5 权重（`704` 分，复测 `709` 分 / `143` 条）
- `10-31` Memdoor：五个 Qwen3.8-27B 在 LiveCodeBench Hard 击败前沿模型（`456` 分，复测 `465` 分 / `233` 条）
- `11-02` Astra 能读写权重改进 Qwen（首采 `2526` 分，复测 `2969` 分 / `899` 条，帖主 dbreunig）
- `11-03` 打假帖《The 'Astra can read and write weights to improve Qwen' post is misleading》（`1045` 分 / `206` 条）
- `11-11` 复测帖《Can a Linear Program Do Weight-Space Programming?》（`294` 分 / `47` 条）
- `11-13` 论文帖《Weight Space Misfolding》（`142` 分 / `59` 条）

簇内密度罕见：十二天九帖、两个仓库、两个独立博客、一篇 alphaxiv 论文，前六帖全部指向同一个动作——对权重本体动手，而不是对提示词动手；后三帖则是对这个动作本身能走多远的公开审查。

![七日 HN 事件点阵与权重可编程三层结构]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-cover.svg)

![十二天九帖时间点阵：主贴 Astra 2526→2969 为最大圆，打假 1045、LP 复现 294、Misfolding 142 为红色补采点；底注指出正反两翼同时出帖的形态]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-recheck-timeline.svg)

## 三个一手源说了什么

热度最高的 Astra 结果出自 MIT CSAIL 博客《Sparks of Weight-Space Programming》（`11` 月 `2` 日发布，作者 Rikiya Takehi、Jayden Teoh、Alex Zhang、Omar Khattab）。TL;DR 原句为 "We find that frontier LLMs are surprisingly good at natively reading and writing neural network weights, well past what we'd expect from humans or conventional algorithms."——前沿大模型无需工具辅助即可直接读写神经网络的权重。博客里的实验比标题更具体：四个游戏策略网络（`500→32→32→5` 的 MLP，`17,253` 个权重，PPO 同参训练），Astra 只读裸权重就四发四中报出游戏名，Breakout 置信 `99%`；三个 `7.2M` 字符级语言模型抹掉输入输出层、只留四个中间 transformer 块，Astra 三次全报对训练语料（Python、罗马音日语、英语），还准确点出每个模型里的复制头（induction head，复读前文的注意力头），与实测定位完全一致；改权重一侧，它定位到 Qwen3.5-0.8B 推理打转的病因在 `15`、`19` 层的某个方向，改 `0.016%` 的权重把 MATH-500 从 `7.9%` 拉到 `48.1%`，IFEval 顺带涨三倍（博客数字，非第三方复测）。

评论区已经有人在讨论这是否是实验室为递归自我改进（RSI）做的内训外溢：vanyle（评论 `50342657`）直猜 Astra 被喂过权重数据「作为 OpenAI 逼近 RSI 的尝试」，作者未做此声称；两日后 Honnibal 的打假帖（见下节）把这场猜测的热度浇掉一半。

Qwenputer 是同一个方向的极端演示：一篇个人博客把一台完整的确定性 RISC-V CPU 编译进了 stock Qwen 3.5 4B 的权重里。机制在博客里写得见底：Qwen 3.5 每四层有三层用 Gated DeltaNet 线性注意力，作者发现把门控设成 `1`、写强度 beta 设成 `1`、配 one-hot 键编码，状态矩阵就变成了精确可按地址覆写的 RAM；随后「不涉及任何训练」，由编译器直接把 CPU 电路写进权重——注意力头查表、前馈单元算数、DeltaNet 头存 RAM，模型解码时 CPU 随之运行，能跑算术、C 与 MicroPython。博客还内置了一个模型内文件存储：文件名哈希进 DeltaNet 状态里的 `1024` 个槽位。线程里 jazzyjackson（评论 `50283405`）摘录这段时感叹「读这帖比任何时候都想搞懂 LLM 怎么工作」；作者 Divyansh Agrawal 把这类成果称为「compiled weights」，且已放出系列后两篇——一篇演示混合模型把推理藏进 RNN 状态规避思维链监控，一篇演示编译权重当模型自身无法篡改的内建监控。理论渊源作者自己标了：Schlag 等人 `2021` 年 ICML 论文的「delta 规则即联想记忆（fast weights）」，新意在做成了精确、可按址、量产模型内可运行。它没有实用价值，但有范式价值：权重只要能编码一台 CPU，就说明它是通用介质而不是玄学参数。

![对权重本体的五种动作链路：读（Astra 实验 1/2/4）→写（0.016% 权重改 Qwen）→编译（Qwenputer 把 RISC-V 写进 4B）→组队（GVS5H/Memdoor 五模型编队）→验（LP 复现与零权重病毒），下方附自左到右递减的口径标尺]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-ops-chain.svg)

供给端同步在动：Memdoor 仓库复测 `406` 星（`10-05` 建仓）与 GVS5H 仓库复测 `1,207` 星（`08-26` 建仓，Persis Capital 研究实验室）都声称五个 Qwen3.8-27B 的编队能在 LiveCodeBench Hard 打平单个前沿大模型。GVS5H 的架构被 badsectoracula（评论 `50228427`）从 PDF 里摘出来过：除验证器外所有角色都是同一个底层模型，各拿干净上下文、靠磁盘上共享工作区协同——task.md 记题目、plan.md 记计划、notes.md 记中间发现、solution.py 收口。属于自报口径，第三方独立复现至复测日仍未出现。IBM CEO 帖下 jacquesm（评论 `50238737`，子树 `178` 条）给出了需求侧实景：八卡机加两台 DGX Spark 的自家阵列，「已经几个月没用付费模型」，整套约 `2.5` 万美元——开源权重的成本线，员工级硬件已在实测兑现。

## 线程暗线：震撼、数据论与安全侧

`2969` 分的线程里除了口号与冷水，还有三条值得存档的暗线。第一条是专业读者的震撼刻度：vessenes（评论 `50341841`，子树 `303` 条）连用三个可以验证的细节收尾「I'm shook」；xg15（`50343529`）把它归进一种正在变常态的能力——LLM 几秒内吃下人类要数年才读得懂的巨型系统，suriyaG（`50345407`）随即补上关键区分：代码本就是给人读的，权重不是，这才是本帖疯传的理由。第二条是训练数据论：futureshock（`50342071`）提出线程内被反复引用的怀疑——「直接改权重」这类技能哪来的训练语料？除非实验室投喂过大量机器学习研究；vanyle（`50342657`）把它推到极端版本（早期 GPT 因语料里棋谱多而会下棋的同构类比），elanning（`50343212`）则以自测回应小网络权重转文本后模型确能推理其结构；数据论至今无人能证实或证伪，但 `50343565` 提醒过，LLM 与扩散模型直接预测权重本来就是进行中的研究方向（`2402.18153`），「凭空天赋」与「内训外溢」之间存在宽阔的中间地带。第三条是安全侧的提前到场：NitpickLawyer（`50342153`）把改权重修打转与去安全化（abliteration，找到拒绝行为所在位置并翻掉）并案，prophesi（`50342942`）一句「原理几乎相同」让 hermitShell（`50347474`）顺势担忧开源模型「永远可以被重新对齐绕开护栏」——读写权重的能力平移到攻击面，比论文展望更快地出现在评论区。solarpunk_enthu（`50343875`）甚至给出了完整假想剧本：恶意模型批量生成并分发人类读不懂的小型网络，把智能埋进互联网缝隙。这些都不构成事实，但构成需求侧：守门工具的紧迫性，线程读者自己已经替厂商写好了需求文档。

## 打假波：一千零四十五分的冷水

`11-03`（原始博客爆红次日），honnibal.dev 发《The 'Astra can read and write weights to improve Qwen' post is misleading》冲上 `1045` 分 / `206` 条；发帖人 Matthew Honnibal 是 spaCy 作者，线程里有人直接点名「他是 spaCy 的作者，本该更懂标准」（评论 `50351967`）。打假点逐条可查：其一，「只读裸权重、无工具」的设置只出现在实验 `1`、`2`、`4`，对象是 `1.7` 万到 `17` 万权重的小网络，与 Qwen 那个量级无关——被广泛转述的「读权重」与真正有效的 Qwen 改写实验是两个实验（评论 `50351599`）。其二，math 提升的实质更接近修掉推理打转：机械可解释性研究者 x313（评论 `50353792`）自报职业身份称「关键结果与让 Qwen 更会数学无关，只是降低了 reasoning loop，这类问题用简单方法也能修」。其三，权重生成与改写早有谱系：Astra 线程里 yurimo（评论 `50347685`，子树 `96` 条）自述研究方向就是 weight-space learning，点名超网络（hypernetworks）一脉从 `2016` 年 Google Brain 起就存在，「博客写作与转发放大了结论」。

![被混用的两个实验对照：左栏只读裸权重实验（17,253 权重小网络、四发四中、3/3 语料），右栏 Qwen 改写实验（0.016% 权重、MATH 7.9→48.1、x313 归因反驳），底栏 Honnibal 判决线与反-反方两条]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-astra-split.svg)

`11-11` 的复测帖把冷水升级到可执行层面：nathan.rs 用 `1940` 年代血统的线性规划（LP）直接构造出对 Qwen 权重的同类编辑，帖下 kragen（评论 `50453155`）一句话定性：「这描述的是一个 1940 年代的线性优化算法在编辑一个有数十亿参数的 Qwen 模型」——「Astra 自己怎么没做到」。也有反-反方：phogged（评论 `50351571`）认为原文正文写得清楚、 misleading 的只是标题；kenjackson（`50351578`）称「论文把做了什么没做什么写得再明白不过」；`11-11` 帖下 FrustratedMonky（`50453312`）提醒区分「直接改权重」与「想出一个改权重的方法」之间的措辞游戏。三派立场并排后剩下的硬地面是：小网络上读权重属实、有同行可复述；「原生」成色与大规模泛化未定；而质疑本身全部来自同行级参与者——这场打假恰恰证明权重编程已是有专业读者的领域，不是营销狂欢。

![三派立场图：主贴派（I'm shook、训练数据论）、打假派（口径混用、修 loop、1940s 算法复现）、反-反方（misleading 的是标题）各自列评论编号，底注取三派交集]({{ site.baseurl }}/assets/images/paradigm-radar-weight-space-debate-map.svg)

## 反面证据与边界

原始博客之外，其余各源的水分要分开记账。其一，Astra 是博客而非同行评审论文，读写权重在多大模型规模、多通用领域成立尚无答案，`11-03` 首采时评论区最集中的质疑就是 "does it cap at small model sizes and common domains"，`11-13` 前该质疑未获正面回应。其二，五小模型打平大模型的两个仓库都来自非学术机构，评测基准单一（LiveCodeBench Hard），Memdoor 帖下 cloudking（评论 `50322446`）追问「有人用本地模型真上线过有用户的正经应用吗」，线程内无人给出实例；roenxi（`50321420`）指路两比特量化方案时，SwellJoe（`50321472`）当场回怼「两比特明显更笨，五个也不补得回来」。价格优势（五分之一）与单卡可跑都是卖方叙述。其三，把 CPU 编译进 4B 模型是精巧玩具，作者自己列了 limits 一节，博客明写「没有实用价值」。其四，去安全化 DeepSeek 帖（`100` 分）里 hypfer（评论 `50255244`）质疑这类模型的必要性，反方 soulofmischief（`50255280`）给出自用场景「修自己老设备的固件，两大厂模型都拒绝配合」——供给成形的同时，其正当性争论也一并成形了。

但方向性信号不依赖单点成立：同窗口内去安全化模型已有五家商用服务商供给（allmodels.io 聚合页口径）、企业高管公开背书开源权重成本线、员工级硬件阵列现身、权重读写与编译连发、打假与复测在千分帖级公开过招——合起来看是一条链：**读权重（可解释）→ 写权重（可修改）→ 编权重（可装载）→ 组权重（可复制编排）→ 验权重（可攻防）**。

## 对做工具的人意味着什么

`11-13` 的《Weight Space Misfolding》论文帖（`142` 分）给这条链补上了最后一环的攻防剧本：所谓零权重病毒（zero-weight virus）——藏在权重空间、常规评估测不出的行为后门；线程里 aatd86（评论 `50488426`）的对策一句话「更该要开放权重和模型哈希了」，另一路研究者自述在做「统计法检测模型欺骗行为」（`50488517`，转述）。这与本栏目一贯的守门问题接上了。站内[《官方渠道沦陷之后》]({{ site.baseurl }}/paradigm-radar-toolchain-poisoning/)讲过 AI 工具链被当成供应链资产管理；这层变化更激进：资产本体（权重）变成可改写文本。可预见的空位集中在「改写之后的守门」——权重变更的审计与 diff 工具、改写后模型的行为回归测试、模型哈希与签名目录、以及五小模型编队这种多副本工作流的路由与一致性校验。防御工具链投毒的人都知道，管道里最危险的是没人能读懂的包裹；而权重，恰恰是所有人都读不懂的那种——现在多了一个转折：连改它的方式都有人能用 `1940` 年代的算法复现了，守门层的紧迫性只会更高。

模型配方的桌面已经摊开，读得懂、改得对、验得住的中间层，还没有人真正占住。

## References
- [Sparks of Weight-Space Programming 博客][links-1]
- [HN：Astra can read and write weights to improve Qwen][links-2]
- [HN：The 'Astra can read and write weights' post is misleading][links-3]
- [honnibal.dev 打假原文][links-4]
- [HN：Can a Linear Program Do Weight-Space Programming?][links-5]
- [Linear Program 复测原文][links-6]
- [HN：Weight Space Misfolding][links-7]
- [Qwenputer: a RISC-V CPU inside Qwen3.5][links-8]
- [HN：Qwenputer][links-9]
- [divagr18/qwenputer 仓库][links-10]
- [HN：Five Qwen3.8-27B match Fable 5 (GVS5H)][links-11]
- [HN：Memdoor][links-12]
- [HN：IBM CEO on open weight models][links-13]
- [HN：5 inference providers for abliterated DeepSeek][links-14]
- [guregodevo/memdoor][links-15]
- [slee-persis/GVS5H][links-16]
- [vanyle RSI 猜测评论][links-17]
- [yurimo 超网络谱系评论][links-18]
- [x313 机械可解释性反证][links-19]
- [honnibal 帖下核心打假评论][links-20]
- [spaCy 作者点名评论][links-21]
- [标题误导论][links-22]
- [kragen LP 定性评论][links-23]
- [措辞游戏提醒][links-24]
- [jacquesm 自家阵列实景][links-25]
- [cloudking 无生产应用追问][links-26]
- [roenxi 量化路线][links-27]
- [SwellJoe 量化回怼][links-28]
- [badsectoracula GVS5H 架构摘录][links-29]
- [jazzyjackson Qwenputer 感叹][links-30]
- [aatd86 开放权重与模型哈希][links-31]
- [欺骗检测研究转述][links-32]
- [Weight Space Misfolding 论文页][links-33]
- [vessenes 震撼长评][links-35]
- [xg15 系统理解能力论][links-36]
- [suriyaG 代码与权重之别][links-37]
- [futureshock 训练数据质疑][links-38]
- [elanning 小网络自测回应][links-39]
- [space_fountain 权重预测研究先例][links-40]
- [权重预测研究论文 2402.18153][links-41]
- [NitpickLawyer 修打转细节][links-42]
- [prophesi abliteration 并案][links-43]
- [hermitShell 开源模型再对齐担忧][links-44]
- [solarpunk_enthu 分布式嵌入智能假想][links-45]
- [站内：AI 范式雷达《官方渠道沦陷之后》][links-34]


[links-1]: https://rikiyat.github.io/blog/weight-space-programming/
[links-2]: https://news.ycombinator.com/item?id=50341174
[links-3]: https://news.ycombinator.com/item?id=50351111
[links-4]: https://honnibal.dev/blog/astra-read-write-misleading
[links-5]: https://news.ycombinator.com/item?id=50452655
[links-6]: https://nathan.rs/posts/weight-space-lp/
[links-7]: https://news.ycombinator.com/item?id=50487762
[links-8]: https://divagr.com/blog/qwenputer
[links-9]: https://news.ycombinator.com/item?id=50282838
[links-10]: https://github.com/divagr18/qwenputer
[links-11]: https://news.ycombinator.com/item?id=50228167
[links-12]: https://news.ycombinator.com/item?id=50320995
[links-13]: https://news.ycombinator.com/item?id=50238088
[links-14]: https://news.ycombinator.com/item?id=50254836
[links-15]: https://github.com/guregodevo/memdoor
[links-16]: https://github.com/slee-persis/GVS5H
[links-17]: https://news.ycombinator.com/item?id=50342657
[links-18]: https://news.ycombinator.com/item?id=50347685
[links-19]: https://news.ycombinator.com/item?id=50353792
[links-20]: https://news.ycombinator.com/item?id=50351599
[links-21]: https://news.ycombinator.com/item?id=50351967
[links-22]: https://news.ycombinator.com/item?id=50351571
[links-23]: https://news.ycombinator.com/item?id=50453155
[links-24]: https://news.ycombinator.com/item?id=50453312
[links-25]: https://news.ycombinator.com/item?id=50238737
[links-26]: https://news.ycombinator.com/item?id=50322446
[links-27]: https://news.ycombinator.com/item?id=50321420
[links-28]: https://news.ycombinator.com/item?id=50321472
[links-29]: https://news.ycombinator.com/item?id=50228427
[links-30]: https://news.ycombinator.com/item?id=50283405
[links-31]: https://news.ycombinator.com/item?id=50488426
[links-32]: https://news.ycombinator.com/item?id=50488517
[links-33]: https://www.alphaxiv.org/abs/2611.weight-space-misfolding
[links-34]: {{ site.baseurl }}/paradigm-radar-toolchain-poisoning/
[links-35]: https://news.ycombinator.com/item?id=50341841
[links-36]: https://news.ycombinator.com/item?id=50343529
[links-37]: https://news.ycombinator.com/item?id=50345407
[links-38]: https://news.ycombinator.com/item?id=50342071
[links-39]: https://news.ycombinator.com/item?id=50343212
[links-40]: https://news.ycombinator.com/item?id=50343565
[links-41]: https://arxiv.org/pdf/2402.18153
[links-42]: https://news.ycombinator.com/item?id=50342153
[links-43]: https://news.ycombinator.com/item?id=50342942
[links-44]: https://news.ycombinator.com/item?id=50347474
[links-45]: https://news.ycombinator.com/item?id=50343875
