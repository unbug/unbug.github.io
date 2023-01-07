---
layout: post
title:  "NPM 供应链的软肋是什么?"
author: unbug
categories: [ papers, npm, javascript, secure ]
image: assets/images/FlxdEa2aYAEbcyI.jpeg
---
NPM 供应链攻击非常严峻，微软和北卡罗莱纳州立大学合作的一片论文[《NPM 供应链的软肋是什么》][paper1-url]，有几个数据触目惊心：
1. 93K里就有 3k  维护者的邮箱都已经失效甚至在网上被售卖，覆盖33个 TOP1 流行的包。
2. 2.2%的包可以本身逻辑就支持安装脚本，2.4% TOP1 流行包依赖了它们。而市面上93%的恶意脚本都是通过安装脚本达到目的。
3. 58%的包和44%的维护者都不活跃了，而流行包里有38%的包两者都不活跃了。
4. 1% TOP1 的包包含30+维护者，60+贡献者，维护：贡献高达1:2。
5. NPM 52%的包被5K 作者拥有。

研究人员通过挟持一个包的维护者，随意一个钓鱼实验都有平均50%+回收率：

![walking]({{ site.baseurl }}/assets/images/FlxdEa2aYAEbcyI.jpeg)


<p><iframe style="width:100%;" height="615" src="https://arxiv.org/pdf/2112.10165.pdf" frameborder="0" allowfullscreen></iframe></p>


[paper1-url]: https://arxiv.org/pdf/2112.10165.pdf