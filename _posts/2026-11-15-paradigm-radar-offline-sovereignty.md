---
layout: post
title:  "AI 范式雷达：《他们把设备搬回局域网》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/offline-sovereignty-wave.svg
image_alt: "封面：一条时间线上竖着 11-10 到 11-14 五根热度柱子，分数依次为 1199、792、740、572、479，对应智能家居、空气净化器等五类设备的离线主权事件"
tags: [local-first, smart-home, subscription, local-ai, open-source, paradigm-radar]
description: "HN 五天事件簇实测（截至 2026-11-15）：五个互不相识的主体同指云端加订阅，离线自主从抱怨变成有工具链的迁移，反方提醒本地化同样有成本门槛。"
---

`2026-11-10` 至 `11-15` 的 Hacker News 实测到 `5` 个同主题独立爆帖（最高 `1199` 分，分数与全树评论数截至 `11-15`）：三个互不相识的人、一家大厂、一批开源项目，在同五天把矛头指向「云端依赖加订阅制」——设备主权正从抱怨变成有工具链的迁移。

口径先钉死：本文分数与全树评论数经 hn.algolia.com 接口于 `2026-11-15` 首采、`2026-11-16` 复采，两个时点的差值都会写明；仓库星数为 api.github.com 同日实测；评论区引语为原文摘译，全部附可定位的评论编号；转述与自述另行标注。复采时主锚帖升至 `1200` 分 / `443` 条，Lovable 泄露帖从 `910` 升至 `937` 分 / `337` 条，其余四帖分数未动。

![11-10 至 11-14 五根热度柱的时间线]({{ site.baseurl }}/assets/images/offline-sovereignty-wave.svg)

## 三个互不相识的人

第一位是家居自动化博主 skittleson，帖《Smart home devices should work without the internet》冲到 `1199` 分（复采 `1200`）/ `443` 条评论：作者在评论区自报这是十年家居自动化规则的总结，第一条规则原文为「nothing core should depend on a vendor's server」，核心栈是树莓派上的 Tasmota、MQTT 与 Node-RED（评论 `50441708`）。这条自报还有个插曲：有人当场抓包他的 Alexa 自动化违反了自己的规则，他的回答是核心系统离线仍可控制即可——规则的边界在讨论里被磨出了形状（评论 `50441708` 子树）。热度最高的长评来自 mountain_peak（`50443286`，子树 `110` 条）：他 `20` 年前买下一栋前房主经营家庭自动化公司的房子，全屋 X10/Insteon 布线与墙面触控面板原封不动，至今不需要任何订阅——一条来自真实住宅的反证，比任何宣言都硬。

第二位是逆向者 scottjg，帖《Reverse engineering my Coway air purifier to ditch the cloud》`792` 分 / `223` 条：拆开净化器换固件，只为不经过厂商云。第三位是绣花机机主 simpsoka，一台 `300` 美元设备要求订阅才能用，他干脆自研配套 App，Show HN 帖 `740` 分 / `256` 条，评论区还引出 DMCA 法理争论——买下的设备能不能自己修。

三人不同作者、不同设备、不同厂商，事件互不引用，也没有共同推动方。范式迁移的经典形状，恰是互不相识的人在同一周撞见同一堵墙。

## Coway 帖里浮出的「LLM 逆向波」

净化器帖下最值钱的不是固件本身，而是对这批逆向的方法论定性。Aurornis（评论 `50484284`，子树 `37` 条）指出该机固件「通过明文 HTTP 下载根证书，从来都可以被中间人攻击」，并称这波 LLM 逆向工程最大的发现，是量产设备里早就躺着多少没人费力去挖的荒唐选择——会做这事的人各忙各的，现在工具让「费力的挖掘」第一次变得可行；tedd4u（`50486455`）追问 Coway 或其固件外包方当初为什么敢这么设计，无人能答。deadbabe（`50484045`）把模式说成趋势：买一个云端订阅设备、逆向它、接到自己服务器上，「这是 AI 促成的少数好事之一」。

冷水同样在场。jerf（`50484219`）警告窗口可能正在关闭：AI 公司已经动手封锁这类逆向用途，「趁还能做赶紧做」；simonsarris（`50485569`，自家两台无云 Coway 用户）反问为什么不直接买不联网的型号，「净化器不需要被监控」。评论区还反复给出第三条路：Corsi-Rosenthal 纸箱净化器——纸盒加四片 MERV-13 滤网加一台 `20` 寸风扇，完全绕开智能层，被顶了至少三次。

## 绣花机：一个「全 AI 建造」的应用与被核查的底稿

Show HN 帖下最长的高赞子树来自 spdustin（`50472665`，子树 `142` 条）：他断定这个项目背后是 LLM 在干重活，并顺势写下这批人的共同信念——大模型第一次让用户「挠自己的痒处」变得可复制。作者 simpsoka 没有回避来源：协议是他用 PacketLogger 从零逆向的，实现过程里 agent 参考了开源库 Respira 做交叉验证，而「整个 App 是用 AI 构建的」，此话逐字可查（评论 `50475887`）。同一楼层他核了价：机器日常价 `499` 美元、事发时亚马逊 `303` 美元，并判断厂商是「先靠订阅把机器赔本卖出去，再越卖越便宜」——订阅制定价的反推，出自机主本人。

反方也留了档：nijave（`50474205`）担心这种好日子有保质期，OEM 迟早让模型给固件上安全启动、签名与防回滚，Google 系设备已是先例；inanutshellus（`50473697`）则把类比推到打印机自带墨盒——「西部时代又回来了」。

## 迟到的大厂与降本的极客

Apple 宣布新 Mac App 让本地跑 AI 模型变得简单，帖《Apple has new Mac app coming to make running local AI models easy》拿到 `572` 分 / `564` 条评论——评论比点赞还多，声量全挤在讨论区，这本身就是需求侧证据。线程里最长的子树来自 pen2l（`50447085`，子树 `393` 条）：蒸馏路线让模型越来越小、本地跑越来越现实，Apple 是「这一章收尾时的赢家」；同线程 jph（`50450531`）给出罕见的自报账单：高端 Mac Studio 摊到约每月 `1000` 美元（三年期），对照他五个开发者用 Claude Ultra 的同额月支出，「等 API 定价改纯计费那天就切本地」。反方账同样在：gizmodo59（`50447737`）说万元预算内跑不动不量化的模型，「我想要但买不起」；tonymet（`50448149`）反问远程推理这么便宜为什么投本地，被 t-3 以「便宜的远程不是永远」驳回。同一窗口里，独立开发者的《I'm making LLMs work on small and old devices》`479` 分 / `180` 条：作者 mrashad74 自述把 `16B` 模型跑进可用内存不足 `1GB` 的 iPad Air 一代与小米电视盒，内核与改模全部开源，还说清代价——为配对模型与硬件做了 `107+50` 次实验（评论 `50468889`、`50471287`）；sebazzz（`50470839`）提醒这类小模型「还笨到没法挂工具」。另有 Edge0-145B 端侧模型帖 `353` 分 / `105` 条、Unsloth Qwen3.8-27B 量化更新 `252` 分 / `83` 条（均截至 `11-15`），把本地推理从「勉强能跑」推向「日常跑得动」。云端集中化的代价也有现成注脚：`11-14` 的 Lovable 应用泄露用户护照信息帖从 `910` 升至 `937` 分 / `337` 条，出事时泄露的是护照号。

## 从抱怨到购买守则与工具链

热度正在落成两类可复制的东西。第一类是购买守则：reasonabl_human（评论 `50442644`）的规则清单是「买能干活的最便宜硬件、无视软件差评、到手先让 Claude 写本地优先固件」；driverdan（`50446355`）只买 Zigbee/Z-Wave 或固件可替换的设备，且非传感器设备必须脱离 App 也能全功能；scosman（`50443914`）用 Home Assistant 官方 IoT Class 分级过滤，只装 Local Push 与 Local Polling 档。守则以前只存在于老玩家的肌肉记忆，现在被写成了可检索的条目——这是「迁移」最具体的形状。

第二类是工具：绣花机自研 App 的仓库 zigzag 复采 `783` 星（建仓 `10-30`，描述直接写着「通过 MCP 用 AI agent 做刺绣设计」）；发布于 `11-04` 的 smolmaxxing `728` 星；主锚帖讨论的自建替代方案，生态底座 home-assistant/core `92,318` 星（复采，仓库描述「local control and privacy first」，建仓 `2013` 年）。这与上期《Goodbye Claude, hello Pi》的「执行壳」搬家不同——那期搬的是开发者工具的位置，这期下沉到灯泡、净化器与绣花机。本地计算与云依赖的隐性成本，此前在[《AI 范式雷达：Agent 的隐藏成本》]({{ site.baseurl }}/paradigm-radar-agent-hidden-cost/)已算过一笔账；而在[《AI 范式雷达：ERC-8004 与信任基础设施》]({{ site.baseurl }}/paradigm-radar-erc8004-trust-infrastructure/)里，「去云端化」走的是链上信任这条相反路径。本期这批人选择的路线，是让自己的数据一步都不出家门。

## 第二线：旧硬件回收流

同一五天还有第六帖补充底盘：《Why get an expensive Pi when I have an old phone?》`599` 分 / `318` 条（复采；`11-15` 首采 `590`/`312`），作者把旧安卓机刷机当家庭服务器。顶路子树来自 deng（`50496293`，`130` 条）：收屏幕碎掉的旧笔记本拆主板，`16GB` 内存随手就能给 `x86` 派生态，比树莓派快且便宜。Freak_NL（`50495561`，`46` 条）点出规模化的真瓶颈：买两台旧手机容易，凑几百台同型号、电池健康、摄像头行为一致才是难处——树莓派是「要一百台就有一百台」的通用货。反方口径同样齐：yjftsjthsd-h（`50495586`）一句话版——「因为 Pi 有维护良好的内核和不用打架的用户空间」；randomblock1（`50495681`）列 GPIO、文档、一致性等清单；shit_game（`50496122`）抱怨手机从设计上就防着用户，「我想要到手即用、不跟我较劲的东西」。旧硬件流的成熟度，比固件逆向还早一个身位。

## 反方同样在场

反弹叙事并不缺反驳。其一来自厂商立场：把设备逻辑放上云是成本理性，一台 `40` 美元设备不可能附带终身本地固件维护，云推送是最便宜的兼容层。其二，个人逆向的固件没有安全审计与后续维护，变砖责任归用户，厂商一纸律师函就能下架；nijave 的安全启动预言（`50474205`）给这条接上了技术路径。其三，「智能家居本就该躺在货架上」——cadamsdotcom（`50448617`）算的是总账：去云意味着自己养一个脆弱控制器、买前研究、坏了更常修，付出的生命能量换不来普通人的便利；同线程 thibsrn（`50443406`）建议学食品营养标签做隐私分级来矫正市场，c-linkage（`50443592`）回他说普通人只想开箱即用，根本不在乎本地优先。其四，便利发明本身在退化为负担：everdrive（`50443875`）「它们先是能用，然后一更新就说不清发生了什么」，跟帖援引美海军因触屏改回物理旋钮。其五——来自主锚轴内部的自反：旧手机帖 `599` 分提醒，为 `300` 美元设备写固件是少数人的特权，本地化本身也有成本门槛，沉默的大多数仍用脚投票选了省心订阅。另有观察轴在跟进，本期不展开。范式是否真的迁移，最终不看谁在写固件，看多数人的账单。

## 云侧事故注脚：Lovable 的账

本地化叙事的对侧，`11-14` 冲榜的 Lovable 泄露帖把云端一侧的成本量化到了个数：研究者 neathack（作者自报，评论 `50499563`）用 Common Crawl 归档扫出 `159,041` 个 Lovable 项目在 `2025-12` 至 `2026-09` 间公开在册，其中 `34,545` 个用 Supabase，抽样里约 `2.5%` 的项目在泄露用户数据，护照号在列。Lovable 安全负责人 igorandri（`50502105`）到场定性：根因是 Supabase 行级安全（Row-Level Security，数据库按行给用户放行读的规则）没配好，平台发布前自动扫描并提供一键修复；varenc（`50502127`）回击：约 `7,500` 个站点运营者对平台已发出的告警无动于衷，这本身就是平台的系统性失守——「提示了但没人点」不能豁免分发方。一键修复与自动修复（auto-fix）能否把这条曲线压下去，是本期留下的观察点之一。还有个值得记录的传播学细节：作者自述这份研究两周前首发无人问津，复投才冲上近千分（评论 `50499563`）——云侧事故的声量同样靠二次点火，本地化叙事的热度里也有同一种复投机制在起作用。

## 口径与边界

三个人的自述均为评论区署名自报，未经独立核验；`92,318` 星等大数只说明开源热度，不等于收入；Apple 帖的热度不构成对任何芯片路线的背书；「LLM 逆向波」是线程参与者的定性说法，本文按其原文引用。本期不主张「订阅制已死」，主张的只是：五天、六个帖簇、互不引用的主体，同时把「设备主权」从抱怨做成守则、固件与应用——动作密度本身即证据。

## References
- [Smart home devices should work without the internet][links-1]
- [Reverse engineering my Coway air purifier to ditch the cloud][links-2]
- [My $300 embroidery machine needed a subscription, so I built my own app][links-3]
- [Apple has new Mac app coming to make running local AI models easy][links-4]
- [I'm making LLMs work on small and old devices][links-5]
- [Why get an expensive Pi when I have an old phone?][links-6]
- [Lovable apps expose passport details][links-7]
- [simpsoka/zigzag][links-8]
- [hyperionaidev/smolmaxxing][links-9]
- [home-assistant/core][links-10]
- [skittleson 作者自述评论][links-11]
- [mountain_peak 二十年老宅长评][links-12]
- [Aurornis 论 LLM 逆向波][links-13]
- [tedd4u 追问明文 HTTP 根证书][links-14]
- [deadbabe 趋势定性评论][links-15]
- [jerf 封锁警告评论][links-16]
- [simonsarris 无云购买论][links-17]
- [spdustin 高赞长评][links-18]
- [simpsoka 自述逆向与 AI 构建][links-19]
- [nijave 安全启动预言][links-20]
- [inanutshellus 打印机类比][links-21]
- [pen2l Apple 赢家论][links-22]
- [jph 本地 vs 订阅自报账单][links-23]
- [gizmodo59 买不起论][links-24]
- [tonymet 远程便宜论][links-25]
- [mrashad74 小设备项目自述][links-26]
- [sebazzz 小模型无用论][links-27]
- [reasonabl_human 购买守则][links-28]
- [driverdan 协议守则][links-29]
- [scosman IoT Class 过滤法][links-30]
- [deng 旧笔记本主板路线][links-31]
- [Freak_NL 旧手机规模化瓶颈][links-32]
- [yjftsjthsd-h 树莓派内核论][links-33]
- [randomblock1 树莓派清单][links-34]
- [shit_game 手机防用户抱怨][links-35]
- [cadamsdotcom 货架论][links-36]
- [thibsrn 隐私标签建议][links-37]
- [c-linkage 普通人开箱论][links-38]
- [everdrive 便利退化论][links-39]
- [neathack 作者自报扫描口径][links-40]
- [igorandri Lovable 安全负责人回应][links-41]
- [varenc 系统性失守反击][links-42]
- [站内：AI 范式雷达《Agent 的隐藏成本》][links-43]
- [站内：AI 范式雷达《ERC-8004 与信任基础设施》][links-44]
- [jhbruhn/respira 开源绣花协议库][links-45]


[links-1]: https://news.ycombinator.com/item?id=50441707
[links-2]: https://news.ycombinator.com/item?id=50474959
[links-3]: https://news.ycombinator.com/item?id=50470488
[links-4]: https://news.ycombinator.com/item?id=50446520
[links-5]: https://news.ycombinator.com/item?id=50468888
[links-6]: https://news.ycombinator.com/item?id=50440709
[links-7]: https://news.ycombinator.com/item?id=50499017
[links-8]: https://github.com/simpsoka/zigzag
[links-9]: https://github.com/hyperionaidev/smolmaxxing
[links-10]: https://github.com/home-assistant/core
[links-11]: https://news.ycombinator.com/item?id=50441708
[links-12]: https://news.ycombinator.com/item?id=50443286
[links-13]: https://news.ycombinator.com/item?id=50484284
[links-14]: https://news.ycombinator.com/item?id=50486455
[links-15]: https://news.ycombinator.com/item?id=50484045
[links-16]: https://news.ycombinator.com/item?id=50484219
[links-17]: https://news.ycombinator.com/item?id=50485569
[links-18]: https://news.ycombinator.com/item?id=50472665
[links-19]: https://news.ycombinator.com/item?id=50475887
[links-20]: https://news.ycombinator.com/item?id=50474205
[links-21]: https://news.ycombinator.com/item?id=50473697
[links-22]: https://news.ycombinator.com/item?id=50447085
[links-23]: https://news.ycombinator.com/item?id=50450531
[links-24]: https://news.ycombinator.com/item?id=50447737
[links-25]: https://news.ycombinator.com/item?id=50448149
[links-26]: https://news.ycombinator.com/item?id=50468889
[links-27]: https://news.ycombinator.com/item?id=50470839
[links-28]: https://news.ycombinator.com/item?id=50442644
[links-29]: https://news.ycombinator.com/item?id=50446355
[links-30]: https://news.ycombinator.com/item?id=50443914
[links-31]: https://news.ycombinator.com/item?id=50496293
[links-32]: https://news.ycombinator.com/item?id=50495561
[links-33]: https://news.ycombinator.com/item?id=50495586
[links-34]: https://news.ycombinator.com/item?id=50495681
[links-35]: https://news.ycombinator.com/item?id=50496122
[links-36]: https://news.ycombinator.com/item?id=50448617
[links-37]: https://news.ycombinator.com/item?id=50443406
[links-38]: https://news.ycombinator.com/item?id=50443592
[links-39]: https://news.ycombinator.com/item?id=50443875
[links-40]: https://news.ycombinator.com/item?id=50499563
[links-41]: https://news.ycombinator.com/item?id=50502105
[links-42]: https://news.ycombinator.com/item?id=50502127
[links-43]: {{ site.baseurl }}/paradigm-radar-agent-hidden-cost/
[links-44]: {{ site.baseurl }}/paradigm-radar-erc8004-trust-infrastructure/
[links-45]: https://github.com/jhbruhn/respira
