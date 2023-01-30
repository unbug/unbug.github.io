---
layout: post
title:  "一分钟读论文：《评估消除 JS 死代码对移动网页性能的影响》"
author: unbug
categories: [ Performance, JS ]
image: assets/images/screenshot-20230113-155913.jpg
---
你的 WebApp 包含都少没用的代码？如何识别？删除掉收益如何？诺基亚贝尔实验室和美国纽约大学阿布扎比分校的论文[《Muzeel: assessing the impact of JavaScript dead code elimination on mobile web performance》][paper1-url] 基于他们联合开发的 Muzeel 针对 15,000 个流行的网站进行分析，发现：超过一半的 JS 文件至少` 70% 代码是死代码（dead code）`，占文件大小的 55%。

## 分析死代码极具挑战：
- 由于JavaScript 的动态特性，静态分析是无效的，需要动态访问对象的属性和上下文绑定。
- 需要处理用户交互，并非所有 JS 代码都在页面加载时触发，需要为用户交互需要建模。
- 需要处理高度动态的页面，很多网页是动态添加交互元素的，不同的交互也会修改现有元素。

## Muzeel
Muzeel 是一个用于识别和消除没用的 JavaScript 函数（也称为“死代码”）的框架。该框架的特点是是黑盒的，能在页面加载后动态分析 JS，识别并消除未使用函数的代码。

**该框架的原理如下：**
![arch]({{ site.baseurl }}/assets/images/screenshot-20230113-155913.jpg)

- `预处理阶段：`为每个 JS 文件生成一份 JS 函数清单，修改每个 JS 函数加入日志收集器并关联唯一 ID，将修改好的 JS 文件上传 CDN
- `自动化分析阶段：`自动在浏览器中加载网页包含新 JS 的网页，自动触发网页中的 UI 交互相关事件，用到的的函数会输出日志。
- `消除阶段：`读取日志，在函数列表匹配未被用到的函数，重新生产 JS 文件。

## 收益分析：
![result1]({{ site.baseurl }}/assets/images/screenshot-20230113-155813.jpg)
![result2]({{ site.baseurl }}/assets/images/screenshot-20230113-155847.jpg)

- 消除 JS 代码可以加快网页加载速度，在低端手机或 3G 网络下有高达`几秒的提升`。
- Muzeel 可以将页面加载速度提高达`25-30%`，消耗更低的 CPU 和带宽使用率。


## 推荐阅读
- [Muzeel on GitHub][links-1]
- [Muzeel: A Dynamic JavaScript Analyzer for Dead Code Elimination in Today's Web][links-2]

[paper1-url]: https://dl.acm.org/doi/10.1145/3517745.3561427
[links-1]: https://github.com/comnetsAD/Muzeel
[Links-2]: https://arxiv.org/pdf/2106.08948.pdf