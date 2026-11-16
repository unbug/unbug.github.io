---
layout: post
title: "AI 范式雷达：《网站开始给 Agent 单独上一道菜》"
author: unbug
categories: [AI, ParadigmRadar]
image: assets/images/paradigm-radar-markdown-negotiation.svg
tags: [agent, http, content-negotiation, seo, markdown]
description: "Accept: text/markdown 内容协商正在被编码 Agent、Cloudflare、Vercel、Netlify 同时采用，同一 URL 实测少九成到近全部的字节。网站与 Agent 的接口契约正从抓取加清洗转向按需供料，这正在成为 Agent 时代内容网站的新 SEO 接口。"
---

同一个 URL、同一个 `Accept` 头，返回的字节从 `24,222` 掉到 `2,201`——这不是压缩，是换了一种表示。

8 月 26 日登上的 HN 热帖《Serve Markdown to AI Agents with Accept Headers》（Algolia API 当日实测 `176` 分）把 HTTP 内容协商这个 90 年代机制重新推上前台：网站不再只为人渲染 HTML，而是给 Agent 直供干净 Markdown。范式转移在于「网页默认给人看、Agent 抓了自己洗」正在变成「网站把 Agent 当一等公民访客、按请求头供料」。

口径先钉死：首采为 `2026-09-07` 本机 curl 与 Algolia 实测；`2026-11-16` 复测同一组端点，两次字节数分列；社区传闻（Time 投毒变体）与评论口径（`5%-20%` 对比）一律标注来源等级；首版引用的 Anthropic 文档页字节对比在复测时已失效（该路径两模式同返 `301,107` 字节 HTML），本版撤下该数据点，以复测三站实测替代。

![内容协商：同一 URL 两种表示]({{ site.baseurl }}/assets/images/paradigm-radar-markdown-negotiation.svg)

## 一个老机制的新买家

`Accept` 头是 RFC 9110 定义的既有协商机制，`text/markdown` 媒体类型出自 RFC 7763，Codex CLI 走的 `<link rel="alternate" type="text/markdown">` 发现路径出自 RFC 8288。这套组合没有任何新协议、新标准——这正是它能快速落地的原因。机制拆开只有三个零件：客户端在请求里声明偏好（`Accept: text/markdown`，可带 q 值排优先级），服务端有货就换表示、没货就按 `Accept` 的退路回 HTML，同时在响应挂 `Vary: Accept` 告诉中间缓存「这个 URL 的返回内容取决于请求头，别把两种表示混着存」。值得注意的是整条链路没有任何新信任假设：谁供料、谁消毒、谁缓存，责任边界与二十年来的 Web 缓存体系完全一致——反方也因此拿「老机制不该为新买家改设计」说事（下文细账）。

复测把时间轴往前又推了七个月：这条线不是 8 月才冒出来的。检索 HN 存档，`2026-02-05` 就有 Show HN: Accept-md（一条命令让 Next.js 站点对 LLM 抓取友好，HN `46903806`），`02-28` 支持 SvelteKit（HN `47188252`），`02-24` 有人做 HTML→Markdown 中间层代理 markdowninthemiddle（HN `47134859`），`03-25` 有博客提案「浏览器直接要 Markdown 会怎样」（HN `47516707`），`04-01` 有 Markdown 原生 Web 服务器 mkdnsite——人读 HTML、机器读 md 双门面设计（HN `47606946`），`05-06` 有 curl.md（URL 转 Markdown 服务，HN `48036795`），`02-22` 甚至已有人把「Cloudflare 的 Markdown for Agents」当作参照物做通用抽取器（HN `47113352`）。这些帖子分数全部个位数。同一机制的独立尝试密集铺了半年，直到 `08-26` 主帖才拿到 `176` 分：这是标准史常见的「长孵化、短引爆」形态，供给侧先饱和，然后等平台默认能力点火。再往前，`2024-09` 的 llms.txt 提案（HN `41439983`，`206` 分 / `175` 条）是这条线的第一次冲锋：静态清单文件解决「网站告诉机器自己有什么」，但清单与页面内容两张皮；内容协商是第二次冲锋，直接把表示层交出来。两次冲锋的共同背景板是 `2026-06` 那条 Ask HN 的忧虑——「机器可读的网页，还是人类想要的网页吗」（HN `48410589`，`36` 分 / `57` 条）。

## 三条供料路线：同一个终点不同的信任边界

把散在各处的实现摆开，「给 Agent 供 Markdown」实际有三条路线，差异不在格式而在**谁在什么时机做转换**。第一条是主帖路线：`Accept` 头协商，服务端按请求换表示，转换发生在源站、格式由供方保证，代价是每站要自己接（或由平台代接）。第二条是路径后缀路线：同一内容在固定路径额外挂 `.md` 变体，Anthropic 文档是当时实测里最激进的样本，Vercel 的 llms.txt 内联指令提案（HN `44963512`）也算这条线的变体——它不需要客户端会发特殊头，消费端零改造就能吃到，代价是多一倍 URL 空间要维护。第三条是 Codex CLI 的 Link 头发现路线：页面 HTML 里用 `<link rel="alternate" type="text/markdown">` 指出机器版地址，Agent 先抓 HTML 再顺链接换料——多一跳请求，但完全不依赖请求头支持，对中间设备最保守。三条路线在 `2026-11-16` 都活着，且没有互相吞并的迹象：格式之争已经结束，剩下的只是接入姿势之争，这个格局本身说明「给机器换菜」的共识已经沉到底座。

## 供给侧已经站了多少人

acceptmarkdown.com/status（发起方维护的矩阵，利益相关）显示明确发送该头部的有 7 款编码 Agent：Claude Code（verified 2025-11-13）、Copilot Chat、Copilot CLI、Cursor、Microsoft Copilot、OpenClaw、OpenCode；Codex CLI 为 Partial（走 Link 头发现）。复测注记：该矩阵页已改为纯前端渲染，`2026-11-16` 无法从服务端响应复核行级数据，「是否翻绿」需各 Agent 真实请求验证——这本身就是可测性缺口，列为观察点。

复测的硬证据来自 curl 三站（`2026-11-16` 本机实测）：Cloudflare 文档站「Markdown for Agents」文档页仍在线（`developers.cloudflare.com`，零配置支持保持），且复测撞见一个细节——该文档页自己的 HTML 顶部就写着「完整文档索引请取 llms.txt」，两条供给线在同一个页面上并联出现；Vercel 文档同一 URL 返回 Markdown `9,867` 字节 vs HTML `720,896` 字节，省 `98.6%`；Netlify 文档 `2,943` 字节 vs `277,700` 字节，省 `98.9%`；发起方自己的 acceptmarkdown.com 也保持 `2,190` vs `23,844`（省 `90.8%`）。与首采对照：头部托管平台的支持不仅没有回退，字节优势随页面腐化还在扩大——两大 CDN/托管商把「给 Agent 换菜」做成了平台默认能力，站点不用自己写一行代码。Astro 文档当时仍返回 HTML，是文档站里的对照组：框架文档的供料形态之争，其实也是各家 DX 的竞争项。

![复测字节柱状：Vercel 省 98.6%、Netlify 省 98.9%、acceptmarkdown 省 90.8%，两列对比 HTML 与 Markdown 表示]({{ site.baseurl }}/assets/images/paradigm-radar-markdown-bytes.svg)

对 Agent 开发者还有一层直接收益：同样的上下文窗口预算，Markdown 表示能多装数倍正文；抓取侧少一层 HTML 转 Markdown 的有损转换，表格与代码块的结构性信息不再丢失。这也是为什么采用者全部集中在「Agent 高频读文档」的编码场景，而非泛网页浏览。这条供给线与本刊[《外壳走上台前：Agent 的竞争从换模型转向换 Harness》]({{ site.baseurl }}/paradigm-radar-harness-first-class/)互为表里：外壳决定 Agent 怎么干活，内容协商决定它读进去什么。

## 线程细账：赞成与反对都不是铁板

`176` 分主帖全树 `108` 条，复测精读后能看出双方的成色。反方最体面的两条都出自协议原教旨：collimarco（评论 `49456343`，子树 `23` 条）问「干净语义 HTML 本来就为机器优化了几十年，为什么还要换表示」——这条与评论区实测「语义化 HTML 仅比等价 Markdown 多 5%-20% 字节」（honr，`49457154`，子树 `10` 条）互为弹药：页面越干净，换菜越不值；k1m（`49456793`，子树 `22` 条）搬出 HTTP 共同作者 Roy Fielding 的名言反对「每个请求带一堆偏好头」的设计取向，并担心一 URL 多表示会污染复制链接的场景（`49458280`）；spider-mario（`49461693`）补了工程后患：客户端无法枚举服务端可供给的格式集合，存档系统更难办。正方同样有协议派：9dev（`49457099`，子树 `11` 条）认为「请求这个资源、优先要 Markdown、没有就退回 HTML」在 REST 语义内自洽，并给出缓解方案——所有响应都带 Link 头声明可用表示（`49461992`）；joshum97（`49456470`，子树 `9` 条）代表工程直觉：「谁会给 LLM 喂原始 HTML？那等于让人看汇编」。中间地带更有意思：kaangiray26（`49455503`，子树 `8` 条）期待这套机制被主流接受后，**人**也能借道读无广告无 JS 的净版页面——供给协议一旦被消费者发现，它就不只服务 Agent。这条与下文 Time 传闻合读，是同一枚硬币的正反两面。还有一类声音值得单记：spockz（`49455908`）问「这跟 Agent 直接搜索吃网页有什么本质区别」，整棵子树里没有一页纸答清楚——而这恰是本文的回答对象：本质区别在于契约。搜索抓取是无协商的一次性消费，网站不知道被谁拿走了什么版本；内容协商是显式契约，供方声明表示、需方声明偏好、`Vary` 约束缓存，三方权责可审计。给机器供料要不要从「被爬」升级为「有约在先」，176 分帖真正的议题是这一条。

## 反方把三个软肋说透了

鸡蛋问题：ChatGPT browse、Gemini、Claude.ai web 在矩阵上均为 No（只抓 HTML），高赞评论 lekevicius（`49455934`）直言「等 top 4 AI chatbot 说它们会用这个头我再支持，在那之前它只是个没人采用的漂亮主意」。清洗本来就在客户端做：Firecrawl、Exa 这类抓取服务早已在抓取时把 HTML 转 Markdown，「等全网改服务器」不如「买中间层」现实——2 月那条 markdowninthemiddle 代理帖的存在，说明中间层自己也知道这是过渡形态。激励错位最深：网站愿意喂搜索引擎换流量，却怕被 Agent 白嫖——评论区称 Time 杂志已向 Agent 投放带广告的 Markdown 变体（社区传闻，未独立核实，来源为 hnlmorg `49456192` 一带的讨论）；而 Markdown 可内嵌 HTML 与 script 标签，不做消毒的渲染器就是提示注入新入口（a2ff6eeb0，`49455769`），hnlmorg 补了一个容易被忽略的差别：HTML 里的注入内容用户在浏览器看得见，Markdown 直供的注入却可能只喂给模型、人类全程不知情。

![三面软肋：鸡蛋问题（消费端全 No）、中间层替代（Firecrawl/Exa 已做清洗）、激励错位（投毒变体与不可见注入），下方为对应破局条件]({{ site.baseurl }}/assets/images/paradigm-radar-markdown-softbelly.svg)

## 缓存与运维的暗账

省字节的故事只讲了请求的一半，另一半在缓存。`Vary: Accept` 一挂，同一 URL 在 CDN 里至少存两份——浏览器一份 HTML、Agent 一份 Markdown，缓存命中率天然被劈开；对日均千万级请求的站点，回源与存储成本的上升没有公开测算可查（主帖线程内无人给出数字，这也是本文列为观察点的原因）。k1m 的复制链接担忧（`49458280`）是同一笔账的客户端版本：用户把 URL 从聊天窗口转发到浏览器，两种表示在用户端不可见地切换，「我看到的」与「你看到的」可能不是一份文档。spider-mario 的存档论（`49461693`）则是第三方视角：抓取机器人若声明了 `Accept`，Web Archive 存下的就是 Agent 版快照，若干年后人们研究 2026 年的网页，看到的将是被压缩给机器读的平行宇宙。三条暗账合起来说明：这个机制的采用决策不是纯技术账——省下的 token 属于 Agent 开发者，多出的缓存与语义风险由全站分摊，账目错配的位置恰好在「谁受益谁付费」的中间。这也是平台默认能力的微妙之处：Cloudflare 们把开关替站点按了，账也替全站接了。

## 边界条件与接下来盯什么

SPA 与 JS 渲染页面无法零成本供 Markdown；`Vary: Accept` 让同一 URL 至少两份缓存，高流量站点的 CDN 碎片化成本没有公开数据；广告变现型内容方天然缺动机——采用者集中在文档站、博客、API 参考这类「内容即产品」场景。另有评论实测语义化 HTML 仅比等价 Markdown 多 5%-20% 字节（出自 HN 评论区，与「十倍」体感相悖，差距取决于原页面腐化程度）——省字节的叙事在烂页面上成立，在本来干净的页面上并不戏剧化。Vercel 的 `720,896` 字节与 Netlify 的 `277,700` 字节恰好示范了「烂页面」的量级：文档站的 HTML 外壳本身已成负担，这不是修辞，是复测数字。

未来一两个周期盯四个信号：消费端（ChatGPT browse / Gemini / Claude.ai web）是否在矩阵上翻绿——矩阵改前端渲染后第三方连复核都难，「不可测」本身升级为独立观察点；IETF 是否出现正式草案（当前只是既有 RFC 组合应用，Fielding 一派的反对声意味着标准化路径未必平坦）；首个 Markdown 变体投毒案例或 CVE——它决定这是接口标准还是军备竞赛的起点；以及 Cloudflare 式的平台默认能力是否从「文档站」扩展到「任意站点一键开」（平台侧一个开关顶社区半年布道）。

**你现在可以做的**：两条 curl 测自家站点（`curl -sI -H "Accept: text/markdown" https://你的站点/`），看返回的是 `text/html` 还是 `text/markdown`；对自家文章页跑 HTML vs Markdown 字节对比量化收益；acceptmarkdown.com 给了 nginx、Caddy、Next.js、WordPress 等十余种配方，十分钟可上线最小版本。

## References
- [Serve Markdown to AI Agents with Accept Headers (HN)][links-1]
- [acceptmarkdown.com][links-2]
- [Agent support matrix][links-3]
- [Cloudflare: Markdown for Agents][links-4]
- [RFC 7763: The text/markdown Media Type][links-5]
- [Accept-md：Next.js 站点的第一个尝试][links-6]
- [llms.txt 原始提案帖][links-7]
- [Roy Fielding 引述与一 URL 多表示之争][links-8]
- [站内：AI 范式雷达《外壳走上台前》][links-9]
- [站内：AI 范式雷达《Agent 权限清单要住进哪个载体》][links-10]


[links-1]: https://news.ycombinator.com/item?id=49454764
[links-2]: https://acceptmarkdown.com/
[links-3]: https://acceptmarkdown.com/status
[links-4]: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
[links-5]: https://www.rfc-editor.org/info/rfc7763
[links-6]: https://news.ycombinator.com/item?id=46903806
[links-7]: https://news.ycombinator.com/item?id=41439983
[links-8]: https://news.ycombinator.com/item?id=49456793
[links-9]: {{ site.baseurl }}/paradigm-radar-harness-first-class/
[links-10]: {{ site.baseurl }}/paradigm-radar-agent-permission-artifact/
