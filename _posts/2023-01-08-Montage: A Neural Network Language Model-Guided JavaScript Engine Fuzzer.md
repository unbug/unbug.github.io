---
layout: post
title:  "一分钟读论文：《Montage：基于神经网络语言模型 (NNLM) 实现 JS 引擎模糊测试器》"
author: unbug
categories: [ NNLM, secure, JS ]
image: assets/images/Screenshot2023-01-08at01.14.29.png
tags: [featured, sticky]
---
韩国科学技术院（KAIST）论文[《Montage: A Neural Network Language Model-Guided JavaScript Engine Fuzzer》][paper1-url] 首次提出了基于神经网络语言模型 (NNLM) 实现 JS 引擎模糊测试器： Montage。
1. 论文提出了一种将 JS 测试用例的层次结构和这些结构之间的关系建模为一系列片段的新算法。 将 AST 编码为片段序列使 Montage 能够使用 LSTM 模型学习片段之间的关系。
2. 技术的关键方面是将 JS 抽象语法树 (AST) 转换为可以直接训练流行的 NNLM 的 AST 子树序列
3. 试验用例结果表明 Montage 在最新的 JS 引擎中发现了 37 个真实 bug，有3个是公共漏洞和暴露（CVE），证明了它能有效发现 JS 引擎的 bug。

以下是 Montage 的设计示意图：
![overview]({{ site.baseurl }}/assets/images/Screenshot2023-01-08at01.14.29.png)

以下是使用3种模糊测试器和 Montage 方法发现的错误数量比较

![montage vs xxx]({{ site.baseurl }}/assets/images/Screenshot2023-01-08at01.42.57.png)

以下是用 CVE-2019-0860 的测试代码能够触发的成功案例之一。
```js
function f0 ( f, p = {}) {
    f . __proto__ = p ;
    f . arguments = 44;
    f . arguments === 44;
}

let v1 = new Proxy({} , {});
for ( let v0 = 0; v0 < 1000 ; ++ v0 ) {
    f0 ( function () {'use strict ';} , v1 );
    f0 ( class C {} , v1 );
}
```


### References
- [Fuzzing(模糊测试)的前世今生（上）][links-1]
- [Fuzzing(模糊测试)的前世今生（中）][links-2]
- [Fuzzing(模糊测试)的前世今生（下）][links-3]


[paper1-url]: https://www.semanticscholar.org/reader/f976a25fbbb86fc7c10008b1276940885cee41d0
[links-1]: https://www.anquanke.com/post/id/283945
[links-2]: https://www.anquanke.com/post/id/283946
[links-3]: https://www.anquanke.com/post/id/283947
