---
layout: post
title: "AI 智创简报：《恶意扩展专利圈地检测层，下架还在装的清单没人交》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-browser-extension-inventory-gap.svg
image_alt: "核心数字：Google Patents 同日同域实测，宽短语恶意扩展检测侧史上 3313 件，精确短语 browser extension management 史上 35 件；Avast、Palo Alto Networks、WalkMe、成都鲁易、Island、Mimecast 六件公开日集中在 2025-03 至 2026-06，仅 Island 已授权"
tags: [browser-extension, threat-intel, Patent, msp, solo-dev]
description: "恶意扩展检测专利史上 3313 件，扩展管理精确词族史上仅 35 件；大厂全在做检测引擎，已下架仍在装的终端清单差分无人交付，1 人 3 周可做。"
---

一家 120 人跨境电商的 IT 外包服务商（MSP），替客户回安全问卷时被一句话卡住："列出终端实际安装的浏览器扩展及风险等级。"手里只有 Intune 导出的扩展清单：300 个扩展 ID 里，17 个已在 Chrome Web Store 下架、4 个出现在恶意情报清单——逐个开商店页手工核对，要耗上一整天。

## 专利信号

- **US20250094580A1** · **Avast Software sro**：优先权 `2023-09-14`，`2025-03-20` 公开，审查中。浏览器扩展恶意内容动态分析，claim1 口径是安装扩展于浏览器后评估。
- **US20250258920A1** · **Palo Alto Networks Inc**：优先权 `2021-04-22`，`2025-08-14` 公开，审查中。组织后端验证端点上的安全浏览器与浏览防护。
- **US20250337779A1** · **WalkMe Ltd**：优先权 `2022-01-19`，`2025-10-30` 公开，审查中。用合法页面库表示匹配做钓鱼检测。
- **CN121051008A** · **成都鲁易**（Chengdu Luyi Technology Co ltd）：优先权 `2025-07-17`，`2025-12-02` 公开，审查中。浏览器与插件自动化安装测试系统，从优先权到公开仅 138 天。
- **AU2022273947B2** · **Island Technology Inc**：优先权 `2021-05-10`，`2025-04-17` 公开，六件中唯一已授权（status 原文 Active）。企业浏览器：policy engine 内置于渲染引擎。
- **US20260135883A1** · **Mimecast Services Ltd**：`2026-05-14` 公开，审查中。属延续案族，用户交互前主动推送内容威胁警告，对应"风险情报到终端"这一环。

## 技术趋势

> 大厂专利全部假设你有 SIEM/EDR，没有面向 50-300 人公司的「清单+差分+一页报告」交付层。

同一 Google Patents 域、同日（`2026-11-17`）同会话实测：宽短语 `browser extension AND malicious / data exfiltration` 史上总量 `3313` 件，精确短语 `"browser extension management"` 史上 `35` 件。两句检索式覆盖范围不同，只能并排看规模，不可相除算增长率。反差本身说明问题：专利圈地在检测引擎，不在企业清单/管理层。另一侧的产业佐证是空的：GitHub 搜 "removed from chrome web store" 仅 2 个仓库且无一相关，搜 malicious extension monitor 头部仅 ★2（2026-11-17 实测）。

## 落地机会

**用户场景**：开头那位 MSP——50-300 人的客户要交安全问卷、要过合规检查，答得出装了哪些扩展，答不出"哪些已在商店下架仍装着、哪些上了恶意清单"。

一个人能做的那一层是三源差分：客户导出的扩展 ID/CRX 哈希清单 × Chrome Web Store 现存状态（页面 404/not available 即"下架仍在装"）× ExtSentry/malext 公开恶意情报，产出一页 HTML 报告 + CSV + Intune/Admx 阻断块。反方必须看清：ExtSentry（★41，单人维护，2026-11-17 仍在 push）已把免费恶意扩展 feed 占死，但它只转 20 种 SIEM/CTI 导入格式，不做终端清单差分——再做一个恶意扩展库是撞车，能做的是差分加交付。npm 上的商店抓取库 chrome-web-store-scraper 已停更 8 年（2026-11-17 实测）。域名加服务器加代理不到 1000 元，1 人 3 周出 MVP。

## 创业发现

- 收费：单次盘点报告 3000-6000 元起，转季度订阅——清单差分必须持续跑，天然续费；MSP 白牌按端收费 `$0.5-1`/端/月。首批客户就是接安全问卷的 MSP、IT 外包和 SaaS 初创负责人。
- 门槛与风险：Chrome Web Store 无官方 API，状态要自建抓取与缓存；误阻断责任须在合同限定为"清单为线索、阻断由客户授权"。
- 本周动作：把自家浏览器策略导出的扩展 ID 清单跑一遍商店状态差分，出一页样例报告——既是作品，也是下次填问卷的弹药。
- 上一期[Shadow AI 盘点]({{ site.baseurl }}/innovation-brief-shadow-ai-inventory/)盘的是员工在用哪些 AI 工具，这期盘的是员工浏览器上装着哪些扩展，对象与数据源都不同。

## References
- [Google Patents 宽短语检索（检测侧）][links-gp-wide]
- [Google Patents 精确短语检索（管理层）][links-gp-narrow]
- [GitHub：ExtSentry 恶意扩展 feed][links-extsentry]
- [malext.io：恶意扩展可查库][links-malext]
- [HN Algolia：browser extension malicious 检索串][links-hn]


[links-gp-wide]: https://patents.google.com/?q=%22browser+extension%22+AND+%28malicious+OR+%22data+exfiltration%22%29
[links-gp-narrow]: https://patents.google.com/?q=%22browser+extension+management%22
[links-extsentry]: https://github.com/ExtSentry/ExtSentry.github.io
[links-malext]: https://malext.io
[links-hn]: https://hn.algolia.com/api/v1/search?query=browser%20extension%20malicious&tags=story
