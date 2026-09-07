---
layout: post
title: "AI 范式雷达：《网站开始给 Agent 单独上一道菜》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-markdown-negotiation.svg
tags: [agent, http, content-negotiation, seo, markdown]
description: "Accept: text/markdown 内容协商正在被编码 Agent、Cloudflare、Vercel、Netlify 同时采用，同一 URL 实测少九成到近全部的字节。网站与 Agent 的接口契约正从抓取加清洗转向按需供料，这正在成为 Agent 时代的新 SEO 接口。"
---

同一个 URL、同一个 `Accept` 头，返回的字节从 `23,855` 掉到 `2,201`——这不是压缩，是换了一种表示。8 月 26 日登上的 HN 热帖《Serve Markdown to AI Agents with Accept Headers》（Algolia API 今日实测 `176` 分）把 HTTP 内容协商这个 90 年代机制重新推上前台：网站不再只为人渲染 HTML，而是给 Agent 直供干净 Markdown。范式转移在于「网页默认给人看、Agent 抓了自己洗」正在变成「网站把 Agent 当一等公民访客、按请求头供料」。

![内容协商：同一 URL 两种表示]( {{ site.baseurl }}/assets/images/paradigm-radar-markdown-negotiation.svg )

## 一个老机制的新买家

`Accept` 头是 RFC 9110 定义的既有协商机制，`text/markdown` 媒体类型出自 RFC 7763，Codex CLI 走的 `<link rel="alternate" type="text/markdown">` 发现路径出自 RFC 8288。这套组合没有任何新协议、新标准——这正是它能快速落地的原因。

实测可复现（2026-09-07 本机 curl）：acceptmarkdown.com 带 `Accept: text/markdown` 请求返回 `content-type: text/markdown; charset=utf-8` 且带 `vary: Accept`，正文 `2,201` 字节 vs HTML `23,855` 字节，省 `90.8%`。Anthropic 官方文档更极端：同一页面 HTML `476,665` 字节、`.md` 版 `16,629` 字节，省 `96.5%`。

## 供给侧已经站了多少人

acceptmarkdown.com/status（发起方维护的矩阵，利益相关）显示明确发送该头部的有 7 款编码 Agent：Claude Code（verified 2025-11-13）、Copilot Chat、Copilot CLI、Cursor、Microsoft Copilot、OpenClaw、OpenCode；Codex CLI 为 Partial（走 Link 头发现）。Cloudflare 文档站已上线「Markdown for Agents」零配置支持，实测响应头 `content-type: text/markdown`、vary 含 accept。

今日新增证据：Vercel 文档与 Netlify 文档对同一请求头同样返回 `text/markdown; charset=utf-8`（curl 实测），而 Astro 文档仍返回 HTML。头部托管平台把它做成了默认能力，跟进速度超出选题简报的预期；消费级大产品则全部缺席。

对 Agent 开发者还有一层直接收益：同样的上下文窗口预算，Markdown 表示能多装数倍正文；抓取侧少一层 HTML 转 Markdown 的有损转换，表格与代码块的结构性信息不再丢失。这也是为什么采用者全部集中在「Agent 高频读文档」的编码场景，而非泛网页浏览。

## 反方把三个软肋说透了

鸡蛋问题：ChatGPT browse、Gemini、Claude.ai web 在矩阵上均为 No（只抓 HTML），HN 高赞评论直言「等 top 4 AI chatbot 说它们会用这个头我再支持」。清洗本来就在客户端做：Firecrawl、Exa 这类抓取服务早已在抓取时把 HTML 转 Markdown，「等全网改服务器」不如「买中间层」现实。激励错位最深：网站愿意喂搜索引擎换流量，却怕被 Agent 白嫖——评论区称 Time 杂志已向 Agent 投放带广告的 Markdown 变体（社区传闻，未独立核实）；而 Markdown 可内嵌 HTML 与 script 标签，不做消毒的渲染器就是提示注入新入口。

## 边界条件与接下来盯什么

SPA 与 JS 渲染页面无法零成本供 Markdown；`Vary: Accept` 让同一 URL 至少两份缓存，高流量站点的 CDN 碎片化成本没有公开数据；广告变现型内容方天然缺动机——采用者集中在文档站、博客、API 参考这类「内容即产品」场景。另有评论实测语义化 HTML 仅比等价 Markdown 多 5%-20% 字节（出自 HN 评论区，与「十倍」体感相悖，差距取决于原页面腐化程度）——省字节的叙事在烂页面上成立，在本来干净的页面上并不戏剧化。

未来一两个周期盯三个信号：消费端（ChatGPT browse / Gemini / Claude.ai web）是否在矩阵上翻绿，若下个周期仍全为 No，本趋势降级为编码 Agent 专属 niche；IETF 是否出现正式草案（当前只是既有 RFC 组合应用）；以及首个 Markdown 变体投毒案例或 CVE——它决定这是接口标准还是军备竞赛的起点。

**你现在可以做的**：两条 curl 测自家站点（`curl -sI -H "Accept: text/markdown" https://你的站点/`），看返回的是 `text/html` 还是 `text/markdown`；对自家文章页跑 HTML vs Markdown 字节对比量化收益；acceptmarkdown.com 给了 nginx、Caddy、Next.js、WordPress 等十余种配方，十分钟可上线最小版本。

## References
- [Serve Markdown to AI Agents with Accept Headers (HN)][links-1]
- [acceptmarkdown.com][links-2]
- [Agent support matrix][links-3]
- [Cloudflare: Markdown for Agents][links-4]
- [RFC 7763: The text/markdown Media Type][links-5]

[links-1]: https://news.ycombinator.com/item?id=49454764
[links-2]: https://acceptmarkdown.com/
[links-3]: https://acceptmarkdown.com/status
[links-4]: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
[links-5]: https://www.rfc-editor.org/info/rfc7763
