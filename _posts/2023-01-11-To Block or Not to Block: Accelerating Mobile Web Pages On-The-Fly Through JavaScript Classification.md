---
layout: post
title:  "一分钟读论文：《通过 JS 分类即时加速移动网页》"
author: unbug
categories: [Performance, FrontEnd]
image: assets/images/screenshot-20230111-155305.jpeg
tags: [JavaScript, Mobile]
---
通过机器学习(ML)加持的 JS 分类服务优化移动页面`加载时间减少了 50%`，`用户体验提升 60% 以上`，同时保持了大多数页面 90%-100% 的交互体验。
诺基亚⻉尔实验室和美国纽约大学、美国兰卡斯特大学管理学院合著的论文[《To Block or Not to Block: Accelerating Mobile Web Pages On-The-Fly Through JavaScript Classification》][paper1-url] 设计了一个服务 - SlimWeb 通过识别并删除网页的⾮关键 JS 以优化性能。

## 论文的成果：
- `ML 驱动的 JS 分类器`，以 90% 的准确率对 JS 元素进行分类；
- 一个易于安装的浏览器插件，为移动用户提供较轻版本的网页；
- 与原始页面相比，`页面加载时间减少了 50%`，与最先进的解决方案（JSCleaner）相比减少了 30% 以上；
- `用户体验提高60%以上`，同时保持与原始页面90%以上的相似度；

## SlimWeb 架构设计：
![deploy]({{ site.baseurl }}/assets/images/screenshot-20230111-174410.jpg)

**SlimWeb 包含三大部分：**
- `ML Classifier：`机器学习创建的 JS 分类器。服务爬取流⾏的⽹⻚，识别这些⻚⾯中使⽤的 JS 元素，然后使⽤分类器标记这些元素并将它们的类别存储在数据库中
- `SlimWeb Service：`JS 标签服务。它会定期更新标签并与终端的浏览器插件同步。
- `SlimWeb plugin: `浏览器插件，负责拦截⾮关键的 JS 元素。这些元素是根据从服务收到的标签。当⽤⼾请求⽹⻚时，插件⾸先检查每个 JS 元素是否在本地可⽤的标签，以便⽴即阻⽌⾮关键元素。在没有标签的情况下，插件认为相应的 JS 元素是关键的，并从 Web 请求它。


## 收益分析
**先来看看市面上优化移动端网页的解决方案：**
- **OpearMini：**服务端渲染页面并压缩后返回给端上，缺点是服务器网络波动影响；
- **Brave：**通过建立黑名单过滤广告脚本，缺点是这种基于⿊名单的解决⽅案⽆法检测到新出的⼴告 JS 元素；
- **Flywheel 代理：**Google 的移动网络数据压缩代理，缺点是通过 Flywheel 优化⻚⾯加载时间并不总是可⾏的；
- **BrowseLite：**通过应⽤不同的图像压缩技术来节省数据。Apple News 和 Facebook 的 Instant Articles 用的就是它；
- **Google AMP：**提供了⼀个框架来创建新的更快的⻚⾯，缺点是用户需要实现新的网站。
- **JSCleaner：**通过代理服务器提供了⼀组简化的⽹⻚，其中关键和⾮关键 JS 元素由基于规则的分类器识别。

SlimWeb 和 AMP 之间的⼀个主要区别是后者为开发⼈员提供了⼀个框架来创建新的更快的⻚⾯，⽽ SlimWeb 旨在在客⼾端即时提供更轻量级的⻚⾯版本，因此本论文的分析过程主要是 SlimWeb 与 JSCleaner 进⾏了⽐较:

![result1]({{ site.baseurl }}/assets/images/screenshot-20230111-163859.jpeg)
- ⻚⾯⼤⼩的中位数减少了 50% 以上（从 1300 KB 到 600KB），阻⽌⼴告、分析和社交这三个类别以实现最⼤的数据节省是有益的，尤其是发展中国家地区，减少⽹络请求也会会间接改善设备能耗。

![result2]({{ site.baseurl }}/assets/images/screenshot-20230111-164252.jpeg)
- SlimWeb 与原始版本相⽐减少了 50% 以上的 PLT（Page load times），与 JSCleaner 相⽐减少了 30% 左。
- 相较于原始版本，SlimWeb 将 SpeedIndex 降低了 60% 以上，⽹络请求减少了 40% 以上。
- 在 3G ⽹络上的性能使⽤ SlimWeb（绿框）时 PLT 减少了约 50%，⽽ privacy-badger+AdBlock（红框）中只减少了 25%。
- 即使 privacy-badger+AdBlock+JSCleaner 组合使⽤，也达不到 SlimWeb 的效果，因为 SlimWeb 中使⽤机器学习（ML）对 JS 元素进⾏分类

## 推荐阅读
- [Speed index][links-1]
- [Page load times][links-2]
- [JSCleaner: De-Cluttering Mobile Webpages Through JavaScript Cleanup][links-3]
- [BrowseLite: A Private Data Saving Solution for the Web][links-4]
- [Google AMP][links-5]
- [Flywheel: Google's data compression proxy for the mobile web][links-6]


[paper1-url]: https://arxiv.org/pdf/2106.13764.pdf
[links-1]: https://developer.mozilla.org/en-US/docs/Glossary/Speed_index
[links-2]: https://www.bigcommerce.com/ecommerce-answers/what-page-load-time-and-why-it-important/
[links-3]: https://dl.acm.org/doi/10.1145/3366423.3380157
[links-4]: https://dl.acm.org/doi/abs/10.1145/3442381.3449885
[links-5]: https://developers.google.com/amp
[links-6]: https://dl.acm.org/doi/10.5555/2789770.2789796