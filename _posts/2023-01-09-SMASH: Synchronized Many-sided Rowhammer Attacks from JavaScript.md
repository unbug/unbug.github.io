---
layout: post
title:  "一分钟读论文：《SMASH：通过 JavaScript 触发同步多边 Rowhammer 攻击》"
author: unbug
categories: [ Rowhammer, Secure, JS,  ]
image: assets/images/screenshot-20230109-165401.png
tags: [featured]
---
Rowhammer 被归类为影响一些最新的 DRAM 设备的问题，其中重复访问一行存储器可能导致相邻行中的位翻转，这意味着理论上攻击者可以改变存储器中该位的值，从而获得对所有物理内存的读写访问权。确定性的 Rowhammer 攻击对数十亿移动用户构成了真正的威胁。

**JavaScript 触发同步多边 Rowhammer 攻击面临的三大挑战：**
- 挑战 1：为了构建多边访问模式，攻击者需要大量的物理内存，这在 JavaScript 中是很难获得的。
- 挑战 2：攻击者需要找到一种策略来生成可以有效执行多边 Rowhammer 的模式，而不会引入太多额外的缓存命中和未命中。
- 挑战 3：攻击者必须仔细安排缓存命中和未命中的顺序，才能成功绕过 in-DRAM TRR 缓冲措施。

美國加州的高等计算机协会（USENIX）的这篇新论文[《SMASH: Synchronized Many-sided Rowhammer Attacks from JavaScript》][paper1-url]构建了SMASH（Synchronized MAny-Sided Hammering）实现了在现代 DDR4 系统上基于 Firefox 浏览器中从 JavaScript 触发同步多边 Rowhammer 攻击：

![rowhammer-from-js]({{ site.baseurl }}/assets/images/screenshot-20230109-170443.png)

**设计思路概要：**
- 创建一个同步的自我驱逐模式（选择双行对大页面着色，处理更换策略 QLRU，）
- 尽量利用所有硬件和软件缓冲策略
- 重新启用过去基于 JavaScript 的 Rowhammer 攻击


<iframe width="560" height="315" src="https://www.youtube.com/embed/-qd-Xjkdb2k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### References
- [The Rowhammer: the Evolution of a Dangerous Attack][links-1]


[paper1-url]: https://atc.usenix.org/system/files/sec21-de-ridder.pdf
[links-1]: https://resources.infosecinstitute.com/topic/rowhammer-evolution-dangerous-attack-years/