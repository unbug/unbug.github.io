---
layout: post
title:  "一分钟读论文：《使用 Rust 和 WebAssembly 在高性能 Node 和 Web 应用程序中补充 JavaScript》"
author: unbug
categories: [Architecture, Performance]
image: 
tags: [featured, Rust, WebAssembly, NodeJS]
---
希腊伯罗奔尼撒大学的论文[《Complementing JavaScript in High-Performance Node.js and Web Applications with Rust and WebAssembly》][paper1-url]：发现：基于 Rust 的实现性能超过 JS `1.15 超过 115 倍`，超过 Node.js 的并发模型` 14.5 倍或更多`。

我们研究了名为 Rust 的新型系统编程语言是否可以与 JavaScript 一起用于 Node.js 和基于 Web 的应用程序开发。该论文描述了如何将 JavaScript 与 Rust 结合使用作为高级脚本语言来代替 C++，以实现效率并避免竞争条件以及与内存相关的软件问题。此外，我们进行了压力测试，以评估所提出的架构在各种场景中的性能。基于 Rust 的实现能够在测量范围内超过 JS 1.15 超过 115 倍，并且在不需要微调的情况下超过 Node.js 的并发模型 14.5 倍或更多。在网络浏览器中，单线程 WebAssembly 实现比各自的纯 JS 实现高出大约两到四倍。与等效的 Node.js 实现相比，在 Chromium 内部执行的 WebAssembly 能够提供单线程实现的 93.5% 的性能和多线程实现的 67.86% 的性能，这意味着性能比 Node.js 高出 1.87 到 24 倍以上等效的手动优化的纯 JS 实现。单线程实现性能提升 5%，多线程实现性能提升 67.86%，相当于手动优化纯 JS 实现性能提升 1.87 到 24 倍以上。我们的发现提供了大量证据，证明 Rust 能够提供非阻塞操作和硬件访问所需的低级功能，同时保持与 JavaScript 的高级相似性，从而提高生产力。

|                                       |                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/assets/images/screenshot-20230202-150815.jpg)| ![img2]({{ site.baseurl }}/assets/images/screenshot-20230202-150834.jpg) | ![img2]({{ site.baseurl }}/assets/images/screenshot-20230202-150848.jpg) |

论文实现了一个种子伪随机数生成器 (PRNG)的 JS 应用。益于 Rust 的零成本抽象和与 JS 的语法相似性，yi zhi，基本上复制粘贴就完成将每一行 JS 代码转换为 Rust 语法。

PRNG模块可以通过将每一行代码转换为 Rust 语法从 JS 移植。在更复杂的应用中，可能需要修改逻辑，但得益于 Rust 的零成本抽象和与 JS 的语法相似性，程序应该不会有负担。Rust 的语法对于 JS 开发人员来说可能很熟悉，因为它与 C 语法相似，并且对函数式编程风格的一流支持，例如，闭包，通过map、filter、fold等进行的一系列元素处理。虽然不是尽可能高效，但数值操作可以直接复制，因为 JS 的数字表示遵循与 Rust 的双精度浮点相同的标准，即 IEEE 754 [ 34]. 可以在稍后通过使用 JS 可能无法生成的较低级别代码来执行优化。此外，Rust 没有利用 C++ 的经典继承；相反，可以为类似于 JS 的原型链和工厂函数的结构实现方法。测试也可以移植，因为在 JS 模块中看到的断言也存在于 Rust 中。测试的条件执行是通过发出cargo test命令来执行的，该命令的作用与npm test命令类似。Rust 中包含一个基准库，即Bencher，基准也可以移植过来。


![]({{ site.baseurl }}/)

## References
- [Paper on MDPI][links-1]


[paper1-url]: https://www.mdpi.com/2079-9292/11/19/3217/pdf?version=1665474262
[links-1]: https://www.mdpi.com/2079-9292/11/19/3217