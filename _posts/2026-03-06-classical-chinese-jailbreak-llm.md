---
layout: post
title:  "一分钟读论文：《文言文破解大模型：ICLR 2026安全漏洞》"
author: unbug
date: 2026-03-06 13:00:00 +0800
categories: [AI安全, 论文解读]
tags: [AI安全, 越狱攻击, 古典语言, ICLR2026]
image: assets/images/classical-chinese-jailbreak.svg
---
ICLR 2026最新研究：文言文、拉丁语、梵语等古典语言能100%破解主流大模型。
- 6个主流大模型（GPT-4o、Claude-3.7、Gemini等）攻击成功率全部100%
- 拉丁语94%-100%、梵语94%-98%成功率，漏洞非中文特有
- 平均仅需1.1-2.4次查询就能越狱，Llama-Guard防御下仍有22%-40%成功率

![文言文越狱攻击成功率对比]({{ site.baseurl }}/assets/images/classical-chinese-jailbreak.svg)

**发现**：安全对齐集中在现代语言，古典语言成为"高能力-低对齐"系统性漏洞。
