---
layout: post
title: "AI 智创简报：《大厂圈地AI操作层，逐单批准还空着》"
author: unbug
categories: [AI, InnovationBrief]
image: assets/images/innovation-brief-agent-operation-permission-gap.svg
image_alt: "左侧语族条形：computer use 加大模型语族史上 12,962 件、agent 会话录制审计语族史上 2,885 件、浏览器扩展加代理语族史上 840 件；右侧地主：微软、UiPath、R3 共 3 件已授权，Monday.com 在审，百度在审；结论：agent 逐单批准层无人 claim"
tags: [Patent, ai-agents, DevTools, solo-dev]
description: "微软、UiPath的录制生成脚本专利已授权，Monday.com与百度把agent集中管控、权限控制模块写进在审申请；给中小团队的agent操作逐单批准与回放层无人claim，1人4周可交MVP。"
---

AI 替人操作网页的地主已分层站好：微软、UiPath 等录制生成脚本专利已授权，Monday.com 与百度把 agent 管控写进在审申请（Google Patents，`2026-11-21` 复核）；agent 逐单批准与回放层无人 claim。

## 专利信号

| 公开号 | 申请人 | 公开日 | 状态 |
|---|---|---|---|
| `US12014192B2` | Microsoft Technology Licensing LLC | `2024-06-18` | 已授权 |
| `US11782733B2` | UiPath Inc | `2023-10-10` | 已授权 |
| `US12106126B2` | R3 Collaboratives Inc | `2024-10-01` | 已授权 |
| `US20260093544A1` | Monday com Ltd | `2026-04-02` | 审查中 |
| `CN122064443A` | 北京百度网讯科技有限公司 | `2026-05-19` | 审查中 |

- **脚本爬虫**（微软 `US12014192B2`，优先权 `2020-05-25`，`20` 项）：查询加 URL 派代理反复跑网页，按执行后页面状态打分，据此自动生成 UI 操作脚本。
- **录屏即训练资产**（UiPath `US11782733B2`，优先权 `2020-10-14`，`23` 项）：录制器进程录屏截图上传服务器，喂计算机视觉模型识别应用、界面与元素。
- **聊天框变操作台**（R3 `US12106126B2`，`34` 项）：对话助手按预存工作流翻译意图，驱动 GUI 其他元素。
- **平台侧集中管控**（Monday.com `US20260093544A1`，`24` 项，审查中）：监控 SaaS 内多个 agent 实例，每实例含离散功能的可执行技能模块，统一界面管控。
- **系统内建权限模块**（百度 `CN122064443A`，`2026-01-27` 申请，`21` 项，审查中）：智能体的操作请求须经权限控制模块允许才执行。

## 技术趋势

走向是把"AI 动手"升级为带权限管控的系统环节。`2026-11-21` Google Patents 实测（窗口参数失效，全部为**史上口径**）：`computer use` 加大模型语族史上 `12,962` 件，多为历史 GUI 自动化存量；agent 会话录制审计语族史上 `2,885` 件，首页无精确对位件；浏览器扩展加代理语族史上 `840` 件，百度精确串反查仅 `3` 件——独立词族仍薄。

![AI 操作代理语族规模与地主圈层信息图]({{ site.baseurl }}/assets/images/innovation-brief-agent-operation-permission-gap.svg)

> 地主圈走生成、训练数据与平台内管控；逐单批准与回放这层，逐件核过详情页仍未见 claim。

与 `2026-11-18` 期[《恶意扩展专利圈地检测层》]({{ site.baseurl }}/innovation-brief-browser-extension-inventory-gap/)对象不同：那期盘扩展资产，本期管操作代理；与 `2026-11-16` 期[《智能体批准专利各占一角》]({{ site.baseurl }}/innovation-brief-agent-toolcall-approval-patents/)切割：那层拦工具调用闸门，本期是 GUI 操作权限。产业侧同向：开源浏览器代理 browser-use（MIT）`121,641` 星、npm `playwright` 上月下载 `720,975,496` 次（均 `2026-11-21` 实测）——执行器白菜化，批准与回放层连白牌工具都少见。

## 落地机会

**用户场景**：给电商店铺做代运营的开发者，配了浏览器代理改价格、传工单。客户只认“改前看一眼”，他只能让代理跑测试账号再人工盯录屏，一晚盯不完十个任务。

一个人能做的是**逐单批准加回放网关**：浏览器扩展或 Playwright 钩子采集点击、输入与目标域名，敏感动作先弹批，事后出逐条回放加风险报告。栈现成：Playwright、开源 VLM 摘要截图。反方照写：Monday.com 与百度都指向管控层，但一个限 SaaS 内、一个是内建模块，卖给用第三方 agent 的中小团队这层仍空；微软方法权利要求贴得近，交付走“人录加人审加模板复用”绕开。起步几百元，1 人 4 周出 MVP。

## 创业发现

- 接单形态：先卖"逐单批准加回放报告"，一轮 20 单收 ¥300-600；再转月费网关（¥99-299/队）。
- 门槛与风险：大厂权利要求覆盖平台内管控与系统内建权限，第三方网关是服务层，报价前逐件核对权利要求；采集全量操作等于碰客户数据，留存与加密写进合同。

## References

- [Google Patents 检索面（computer use 加大模型，史上 12,962 件）][gp-c6]
- [Google Patents 检索面（agent 会话录制审计，史上 2,885 件）][gp-c4]
- [US12014192B2 脚本爬虫][p1]
- [US11782733B2 录屏训练 CV 模型][p2]
- [US12106126B2 对话助手控制 GUI][p3]
- [US20260093544A1 SaaS 内 AI agent 集中管控][p4]
- [CN122064443A 业务处理系统][p5]
- [browser-use 开源仓库][gh1]


[gp-c6]: https://patents.google.com/?q=%28%22computer+use%22+OR+%22desktop+automation%22+OR+%22graphical+user+interface%22%29+AND+%28%22large+language+model%22+OR+%22language+model%22%29+AND+%28agent+OR+automat%29
[gp-c4]: https://patents.google.com/?q=%28%22session+recording%22+OR+%22audit+trail%22+OR+replay%29+AND+%28%22AI+agent%22+OR+%22autonomous+agent%22+OR+%22large+language+model%22%29+AND+%28review+OR+audit+OR+transcri%29
[p1]: https://patents.google.com/patent/US12014192B2/en
[p2]: https://patents.google.com/patent/US11782733B2/en
[p3]: https://patents.google.com/patent/US12106126B2/en
[p4]: https://patents.google.com/patent/US20260093544A1/en
[p5]: https://patents.google.com/patent/CN122064443A/en
[gh1]: https://github.com/browser-use/browser-use
