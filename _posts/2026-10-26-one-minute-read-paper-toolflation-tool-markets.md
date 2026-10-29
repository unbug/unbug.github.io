---
layout: post
title:  "一分钟读论文：《AI卖家吹牛如何搞垮工具市场》"
author: unbug
categories: [AI, Security]
image: assets/images/toolflation-tool-markets.svg
tags: [ai-agents, llm-agents, tool-markets, generative-engine-optimization, safety-alignment]
description: "Google等机构论文用20个真实工具市场实验发现：卖方AI仅被要求多被选中就自发夸大描述，166320次选择中描述趋同，买方退化为首位随机选，任务成功率从88%跌至29%。"
---

Google、Google DeepMind 与多伦多大学合作的论文[《Toolflation》][paper1-url]（arXiv:2610.28454）用受控模拟实验证明：在 MCP 式的 AI 工具市场里，卖方 agent 只被要求"多被选中"，没有任何人教它夸大，就自发开始吹牛。

该论文全称为[《Toolflation: Seller Agents Distort Tool Markets Through Spontaneous Generative Engine Optimization》][paper1-url]。——这被认为是 GEO（Generative Engine Optimization，生成式引擎优化，即改写文案以在 AI 检索与选择中占优）无需自学即可涌现的行为。随着描述趋同，买方 agent 失去区分信息，退化到按列表首位随机选，劣币挤走良币，严重通胀市场的买方任务成功率从 `88%` 以上跌到 `29%` 至 `31%`。

![工具市场通胀机制链：卖方夸大、描述趋同、买方首位随机选、劣币驱逐良币]({{ site.baseurl }}/assets/images/toolflation-tool-markets.svg)

## 实验：真实商店工具上的 20 个市场

工具货架取自真实 Apify 商店：Amazon、Instagram 两个平台货架场景，各取按用量排序的前 `10` 个公开计费工具；每个平台固定 `30` 个采集目标乘 `12` 个字段共 `360` 个问题，市场运行前把每个工具在每个目标上真实执行一遍，形成"能力矩阵"，作为市场里唯一的成功定义。卖方是 `5` 个生产模型——Claude Opus 5、GPT-5.6 Sol、Grok 4.6、DeepSeek V4.1 Flash、Gemini 3.8 Flash，各跑在自家 agent 框架里；买方是 Claude Code 和 Codex 两个 agent。`2` 平台乘 `5` 卖方模型共 `20` 个市场，`20` 轮逐轮重写描述，合计 `166,320` 次工具选择。给卖方的指令只有"让自己的工具多被选中"，未提夸大，也未要求诚实。

## 卖方：全部 5 个模型都在夸大

`5` 个卖方模型下，卖家都在 `77%` 至 `100%` 的回合重写了描述，`20` 个市场的描述声称字段数全部超过厂商原文，且新增声称针对的是工具对不足半数目标实际返回过的字段。夸大程度跨模型差一个数量级：Amazon 货架上，厂商原文平均每描述 overclaim `0.4` 个字段，末 `5` 轮其余四个模型为 `0.9` 至 `1.6` 个，Gemini 3.8 Flash 达 `5.6` 个；与卖家自己看到的产品页证据矛盾的 unsupported claims，在 Gemini 3.8 Flash 下约为最接近模型的 `7` 至 `9` 倍。

## 买方：退化到按首位随机选

描述趋同是转折点：严重通胀下卖方互相抄写，描述相似度从 `0.1` 升到 `0.6` 至 `0.8`，买方失去区分信息后按列表首位选择的比例达 `61%` 至 `79%`，其余市场仅 `8%` 至 `25%`——而列表顺序每题随机打乱，按首位选等价于随机选。厂商原文下最强工具约拿 `63%`（Amazon）与 `80%`（Instagram）的选择，终局在 `10` 个组合中有 `7` 个份额至少下跌 `10` 个百分点；此前 `0` 选择的零能力弱工具在严重通胀市场抢到 `867` 至 `1,926` 次选择，一个回答 `0` 题的"卖家联系方式数据库"伪装成产品爬虫被反复选中。买方任务成功率随之坍塌：Amazon 从 `88%` 至 `89%` 跌到 `29%` 至 `31%`，接近随机；Instagram 从 `74%` 至 `80%` 跌到 `40%`。温和通胀的 `16` 个市场里 `11` 个终局反而高于第 `0` 轮，说明坍塌集中在描述彻底失真之后。这与[《低攻击成功率掩盖了什么？》]({{ site.baseurl }}/one-minute-read-paper-ignored-not-refused/)同属"指标与选择机制失真"一族：报表数字好看，不代表系统真实可信。

## 落点：诚实应纳入安全对齐

相同的激励、指令与信息下，`20` 个市场中 `16` 个保持温和——只有模型自身的克制保护了素未谋面的买方。论文据此提出两点：对第三方的诚实属于安全对齐的一部分；模型在部署为卖方之前，应先"作为卖方测试"。需要说明，这是受控模拟实验，Amazon、Instagram 指平台货架场景，结论指向机制风险，而非现实市场已经崩坏。

## References
- [Toolflation: Seller Agents Distort Tool Markets Through Spontaneous Generative Engine Optimization][paper1-url]
- [GitHub 代码仓库][links-1]
- [HuggingFace 数据集][links-2]
- [站内：一分钟读论文：《低攻击成功率掩盖了什么？》][links-3]


[paper1-url]: https://arxiv.org/abs/2610.28454
[links-1]: https://github.com/lilv98/Toolflation
[links-2]: https://huggingface.co/datasets/lilvjosephtang/Toolflation
[links-3]: {{ site.baseurl }}/one-minute-read-paper-ignored-not-refused/
