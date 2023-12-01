---
layout: post
title:  "一分钟读论文：《线上系统事故解决时间（TTM）需要多久？》"
author: unbug
categories: [Engineering]
image: assets/images/screenshot-20231106-160243.jpg
tags: [featured, Incident]
---
事故从发现到解决有三个重要的衡量指标： TTD（Time To Detect，事故被发现的时间）、TTE（Time To Engage，相关责任人响应时间）、TTM（Time To Mitigate，事故缓解或解决时间）。TTM 是定位问题和制定解决方案并解决的时长。微软研究院的论文[《How Long Will it Take to Mitigate this Incident for Online Service Systems》][paper1-url]，从微软`20个在线服务系统`中收集了2018年至2020年的 `2.7 万`条事故数据，发现 TTM 与事故的严重性、影响范围、类型、来源、所属服务和所属团队有显著的相关性，`信息不足、沟通不畅、协作不协调`是影响 TTM 最大的因素，并提出了预测方法 TTMPred。

## TTM 的实证研究
数据使用了微软内部的事故管理系统，从2018年至2020年的20个大规模在线服务系统中收集了事故数据，包括事故的文本描述、讨论记录、缓解时间等信息，共计约2.7万条。

**事故生命周期的的时间分布**

- 事故生命周期中的时间分布，包括事故的`开始时间、结束时间、持续时间和缓解时间`。
- 发现事故的开始时间和结束时间的分布呈现出明显的周期性，即`事故在工作日和工作时间更多发生，而在周末和非工作时间更少发生`。
- 发现事故的持续时间和缓解时间的分布呈现出长尾特征，即`大多数事故可以在较短的时间内结束或缓解`，但少数事故需要较长的时间。
- 发现事故的持续时间和缓解时间与事故的`严重性、影响范围、类型、来源、所属服务和所属团队`有显著的差异，即不同属性的事故的时间分布有不同的特点。

**影响 TTM 的因素**

- 发现事故的文本描述和讨论记录中反映了事故处理过程中的一些挑战和障碍，例如`信息不足、沟通不畅、协作不协调`等。
- 发现事故的挑战和障碍对事故缓解时间有一定的影响，例如信息不足会导致事故缓解时间延长，沟通不畅会导致事故缓解时间缩短，协作不协调会导致事故缓解时间波动等。

## 预测 TTM 的方法 TTMPered

![]({{ site.baseurl }}/assets/images/screenshot-20231106-160243.jpg)

论文提出了一种基于深度学习的事故缓解时间预测方法，称为 TTMPred。评估 TTMPred 的有效性和性能时使用了微软四个大规模、不同类型的在线服务系统的事故数据，包括 Azure DevOps、Azure SQL、Azure Storage 和 Office 365。
- TTMPred 在所有评价指标上都显著优于对比方法，说明TTMPred能够有效地利用事故的文本描述和讨论记录中的语义信息和时序信息，实现对事故缓解时间的准确预测。
- TTMPred 在不同的事故属性上都表现出稳定的性能，说明TTMPred具有良好的泛化能力，能够适应不同的事故场景。
- TTMPred 的两层注意力机制能够有效地捕捉事故文本中的关键信息，提高事故表示的质量。
- TTMPred 的连续损失函数能够有效地平衡预测值和真实值之间的绝对误差和相对误差，以及预测时间点和事故结束时间点之间的时间差，优化模型的预测性能。


## References
- [缓解时间 (TTM)][links-1]
- [如何做好Postmortem？][links-2]


[paper1-url]: https://www.microsoft.com/en-us/research/uploads/prod/2021/09/2021ISSRE_TTMPrediction_cameraReady1.pdf
[links-1]: https://learn.microsoft.com/zh-cn/devops/operate/what-is-monitoring
[links-2]: https://zhuanlan.zhihu.com/p/34083617