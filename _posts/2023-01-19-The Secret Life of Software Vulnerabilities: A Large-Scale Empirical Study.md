---
layout: post
title:  "一分钟读论文：《软件漏洞的秘密生命周期：大规模实证研究》"
author: unbug
categories: [ Secure ]
image: assets/images/screenshot-20230117-173044.jpg
tags: [featured]
---
意大利菲夏诺萨勒诺大学软件工程 (SeSa) 实验室的论文[《The Secret Life of Software Vulnerabilities: A Large-Scale Empirical Study》][paper1-url]对 GitHub 上 1,096 个开源项目，来自国家漏洞数据库的 3,663 个带有公共补丁的漏洞的生命周期进行的大规模实证研究。发现：
- 在创建新文件后不久就产生了漏洞；
- 开发者在维护源码的同时造成漏洞； 
- `工作量较大的开发者导致了大多数安全漏洞`； 
- 漏洞在源码中停留的天数方面具有很高的存活率。

### 论文研究的问题和结论
#### RQ1：漏洞如何被引入到源码中？

- 平均有 4.71 个 VCC（vulnerability-contributing commits，既漏洞贡献提交量） 引入一个漏洞。
- `60.93% 引入不止一个`，平均跨度超过 4 年。
- SQL 注入最多 VCC (18.36) 的漏洞类型。 
- VCC 中涉及的文件中几乎有一半 (47.91%) 是在这些提交的上下文中创建的。

#### RQ2：漏洞引入到源码中的上下文是什么？
- 绝大多数 VCC (69.50%) 在其目标中包含至少一项维护活动（即错误修复、增强或重构）。 
- 绝大多数漏洞 (83.99%) 在项目创建的第一年之后开始出现，通常 (59.68%) 至少在发布前 30 天发布。 
- `新人开发者和专家开发者的分布相当（分别为 43.24% 和 40.04%）。
- 超过 55% 的开发者在工作量很大时执行 VCC。

#### RQ3：漏洞的生存能力如何？

![RQ3]({{ site.baseurl }}/assets/images/screenshot-20230117-173044.jpg)

- 至少有一半的漏洞存活了 `511` 天。 
- 输入验证漏洞比其他漏洞修复得更早，而内存管理问题在代码中持续时间更长。

#### RQ4：如何从源码中删除已知漏洞？

 - 修复提交通常涉及一个文件，`添加的行数是删除的行数的两倍`。 
 - “清理外部输入”是修复输入验证问题的最常用方法。 例如，在源码中添加缺失的检查，即使涉及大量文件和代码行也是如此。

### 论文的主要贡献
![contribution]({{ site.baseurl }}/assets/images/screenshot-20230117-172209.jpg)

- 大规模的实证调查，研究漏洞是如何以及在何种情况下产生的，它们存在多长时间，以及如何在用不同编程语言编写的、涉及不同应用领域的数千个项目中消除它们；
- 一个关于软件漏洞的大型精选数据集，以及用于执行我们分析的整套脚本，其他研究人员可以利用这些数据集在我们的研究基础上进一步探索软件漏洞问题；
- 一份研究路线图，描述了软件工程研究社区应该面临的下一步和挑战，以便为从业者提供更好的支持。


[paper1-url]: https://fpalomba.github.io/pdf/Journals/J41.pdf