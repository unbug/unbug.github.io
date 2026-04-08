---
layout: post
title:  "一分钟读论文：《WebAssembly 与 JS 在移动设备上的能耗对比》"
author: unbug
categories: [Performance]
image: assets/images/screenshot-20230126-220033.jpg
tags: [WebAssembly, JavaScript, Mobile]
---
在真实应用中评估 WebAsssembly 更多关注的是 API 和性能，而移动设备显然也需要关注能耗。荷兰阿姆斯特丹自由大学的论文[《Comparing the Energy Efficiency of WebAssembly and JavaScript in Web Applications on Android Mobile Devices》][paper1-url]在 Android 上通过对 32 个 Web 应用程序基于 Firefox、Chrome 跑 WebAssembly 与 JavaScript 之间的能耗进行分析，结果发现 WebAssembly 的能耗显著低于 JavaScript。

![img2]({{ site.baseurl }}/assets/images/screenshot-20230126-220033.jpg)

论文设计了一个可在树莓派上自动化的装置，使用 Trepn 收集能耗数据。实验用的 WebAssembly 的 C 代码是基于原始 JavaScript 代码编译产生。

|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/assets/images/screenshot-20230126-222117.jpg)| ![img2]({{ site.baseurl }}/assets/images/screenshot-20230126-222143.jpg) |

**结果表明：**

- 与 WebAssembly 相比，JavaScript 几乎大 100 焦，这意味着将 WebAssembly 用于 Web 应用程序能`显著降低`对 Android 移动设备的能耗。

- WebAssembly 在 Chrome 浏览器上的平均能耗为 31.91 焦，在 Firefox 上为 19.02 焦，比 Chrome 低 12.89 焦，`平均节能 40.39%`。如果 500 万用户从 Chrome 切换到 Firefox，那么总共将节省 200 万焦的能源。这个能量相当于一个100W的灯泡6小时消耗的能量。


![img2]({{ site.baseurl }}/assets/images/screenshot-20230126-222232.jpg)


[paper1-url]: https://dl.acm.org/doi/fullHtml/10.1145/3530019.3530034