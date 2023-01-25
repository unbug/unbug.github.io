---
layout: post
title:  "一分钟读论文：《跨站脚本攻击揭露22年：全面调查及系统映射》"
author: unbug
categories: [ Security]
image: assets/images/screenshot-20230122-215140.jpg
---
作为前端工程师你真的了解 XSS 吗？微软安全工程师 1999 年底披露了 XSS，XSS 就一直稳居 OWASP（开放 Web 应用程序安全 ） 报告的前 TOP10。阿尔及利亚的拉尔比特贝西大学、盖勒马大学和巴吉莫赫塔尔大学的 LRS 实验室的论文[《Twenty-two years since revealing cross-site scripting attacks: a systematic mapping and a comprehensive survey》][paper1-url] 调查了147份高质量研究，总结制定了一个全面的分类法，描述了用于预防、检测、保护和防御 XSS 攻击的不同技术。

## XSS 攻击都有哪些类型？
![ Types of XSS attacks]({{ site.baseurl }}/assets/images/screenshot-20230122-215140.jpg)

### 基于应用的 XSS 攻击
- 反射 XSS (RXSS)：当作为 HTTP 请求的⼀部分提供的恶意数据在未经过适当清理的情况下成为服务器响应的⼀部分时，就会发⽣ RXSS 攻击。因此，嵌⼊在 HTTP响应中的恶意数据会返回客⼾端并在浏览器呈现时执⾏。RXSS的典型⽬标是具有搜索功能的 Web 应⽤程序，其中嵌⼊的恶意数据成为搜索结果或错误消息的⼀部分。
- 存储型 XSS (SXSS)：当以输⼊形式提供的恶意数据未经清理就存储在服务器应⽤程序数据库或⽂件中时，就会出现 SXSS 攻击。 SXSS 攻击的典型⽬标是在线社交⽹络应⽤程序和论坛，恶意数据可以在其中发布、存储在数据库中，从⽽感染访问它们的每个⽤⼾。SXSS 攻击也称为持久性。
- DOM XSS (DXSS)：DXSS 攻击是渲染时攻击。与 RXSS 和 SXSS 相反， DXSS 攻击中使⽤的恶意数据⽤于动态更改浏览器在渲染阶段⽣成的 DOM 树。
- JavaScript Mimicry XSS（JSM-XSS）：攻击者不是注⼊恶意脚本，⽽是利⽤ Web 应⽤程序中已经使⽤的脚本来发起 JSM-XSS 攻击。 JSM-XSS 攻击很难被检测到并且很容易通过基于⽩名单的过滤器。
- XSS 蠕⾍（WXSS）：WXSS 攻击是具有⾃我复制能⼒的 XSS 攻击。具有⾃我复制能⼒的 RXSS 和 SXSS 攻击被归类为WXSS。采⽤这种区分是因为传播攻击并成为蠕⾍需要特定的其他类型的 Web 应⽤程序漏洞。 WXSS 攻击更加危险，因为它们在 Web 应⽤程序⽤⼾之间传播，并随着时间的推移逐渐感染其他⽤⼾。此类攻击的典型⽬标是在线社交⽹络应⽤程序。

### 基于第三⽅的 XSS 攻击
- 通过脚本⼩⼯具 (CR-XSS) 进⾏代码重⽤：触发 CR-XSS 攻击基本上需要了解⽬标应⽤程序使⽤的库和/或框架中包含的脚本。这
些也称为脚本⼩⼯具。成功的 CR-XSS 攻击是通过注⼊带有伪装负载（即不可执⾏形式）的 HTML 代码来实现的，这些负载匹
配 DOM 元素并激发脚本⼩⼯具的执⾏。显然，通过执⾏单个或⼀系列⼩⼯具，良性有效负载被转换为可执⾏脚本。
- 通⽤ XSS (UXSS)：UXSS 是由于浏览器本⾝或其扩展之⼀没有对 URL 进⾏适当的清理⽽引起的。为了触发 UXSS 攻击，⼊侵者可以利⽤位于浏
览器或浏览器扩展中的漏洞。因此，通过诱使⽤⼾单击⼀个链接，该链接会激发访问者浏览器中安装的插件的执⾏，该插件会触发链接中包含
的恶意脚本的执⾏。

### 基于协作的 XSS 攻击
- Mutation XSS (MXSS)：MXSS 攻击主要是由浏览器利⽤Web 应⽤程序中使⽤的innerHTML属性将格式化的HTML 字符串转换为有效 DOM
元素的能⼒引起的。
- Cross-API Scripting (XAS)：XAS是⼀种XSS攻击，针对为社交⽹络等第三⽅开发者提供Restful API的Web应⽤程序。攻击者在他们⾃
⼰的应⽤程序配置⽂件中注⼊恶意脚本，因此第三⽅应⽤程序的⽤⼾容易受到 XAS 的攻击。恶意数据通过使⽤ API 从 Web 应⽤程序
检索数据传输到受害者的浏览器。 XAS 攻击的根本原因是缺乏对数据的适当清理：(1) Web 应⽤程序本⾝允许攻击者注⼊恶意数
据，(2) 第三⽅ Web 应⽤程序在没有适当的情况下接受恶意 API 响应
- Content-Sniffing XSS（CS-XSS）：由于浏览器对⽂件内容类型的错误解读⽽引起的XSS攻击被命名为content-sniffing XSS，本⽂
简称为CS-XSS。为了进⾏ CS-XSS 攻击，恶意数据作为单独的媒体⽂件（例如 PDF、图像）的⼀部分被提供给易受攻击的 Web应⽤程
序。这些⽂件对每个在易受攻击的浏览器中加载它们的⽤⼾都是有害的。要想成功， CS-XSS 攻击需要允许上传受感染⽂件的 Web
应⽤程序和使⽤内容嗅探实践来推断⽂件类型的浏览器。由于⽂件中存在脚本，浏览器会将它们视为HTML ⽂件，因此会在受害者浏览
器执⾏注⼊脚本的位置呈现。

## 

[paper1-url]: https://arxiv.org/pdf/2205.08425.pdf