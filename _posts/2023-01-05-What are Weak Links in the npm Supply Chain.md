---
layout: post
title:  "一分钟读论文：《NPM 供应链的软肋是什么?》"
author: unbug
categories: [Security]
image: assets/images/Screenshot-2023-01-07-at-22.jpeg
tags: [sticky, featured, MPM, NodeJS]
---
微软和美国北卡罗莱纳州立大学合作的一篇论文[《What are Weak Links in the npm Supply Chain?》][paper1-url]，显然 NPM 供应链攻击形势非常严峻，论文结论建议 NPM 要求对依赖排名前 100 的包的维护者进行`强制性 2FA 登录认证`。有几个数据触目惊心：
1. 93K里就有 3k  维护者的邮箱都已经失效甚至在网上被售卖，覆盖33个 TOP1 流行的包。
2. 2.2%的包可以本身逻辑就支持安装脚本，2.4% TOP1 流行包依赖了它们。而市面上93%的恶意脚本都是通过安装脚本达到目的。
3. `58%`的包和44%的维护者都不活跃了，而流行包里有38%的包两者都不活跃了。
4. 1% TOP1 的包包含30+维护者，60+贡献者，维护：贡献高达1:2。
5. NPM 52%的包被 `5K` 作者拥有。

论文提出了一个框架以识别 NPM 包的薄弱环节，同时研究人员通过挟持某些包的维护者邮箱，随意一个钓鱼实验都有平均`50%+回收率`：

![survey-result]({{ site.baseurl }}/assets/images/FlxdEa2aYAEbcyI.jpeg)


## References
- [Track on ICSE 2022][links-1]


[paper1-url]: https://arxiv.org/pdf/2112.10165.pdf

[links-1]: https://conf.researchr.org/details/icse-2022/icse-2022-seip---software-engineering-in-practice/39/What-are-Weak-Links-in-the-npm-Supply-Chain-#
