---
layout: post
title:  "一分钟读论文：《用 Rust 和 WebAssembly 补充 JS 实现高性能 Node、Web 应用程序》"
author: unbug
categories: [Architecture, Performance]
image: assets/images/screenshot-20230202-162534.jpg
tags: [featured, Rust, WebAssembly, NodeJS]
---
希腊伯罗奔尼撒大学的论文[《Complementing JavaScript in High-Performance Node.js and Web Applications with Rust and WebAssembly》][paper1-url]描述了如何将 JavaScript 与 Rust 结合使用作为高级脚本语言来代替 C++ 的架构。发现：基于 Rust 的实现性能超过 JS `1.15 超过 115 倍`，超过 Node.js 的并发模型` 14.5 倍或更多`，证明 Rust 能够提供非阻塞操作和硬件访问所需的低级功能，同时保持与 JavaScript 的高级相似性，从而提高生产力。

|                                       |                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/assets/images/screenshot-20230202-150815.jpg)| ![img2]({{ site.baseurl }}/assets/images/screenshot-20230202-150834.jpg) | ![img3]({{ site.baseurl }}/assets/images/screenshot-20230202-150848.jpg) |

论文实现了一个种子伪随机数生成器 (PRNG)的 JS 应用。得益于 Rust 的零成本抽象和与 JS 的语法相似性，移植过程基本上复制粘贴就完成将每一行 JS 代码转换为 Rust 语法。测试也可以移植，因为在 JS 模块中看到的断言也存在于 Rust 中。Rust 中包含一个基准库，即 Bencher，基准也可以移植过来。

**测试结果：**

![img3]({{ site.baseurl }}/assets/images/screenshot-20230202-162534.jpg)

- 通过对等效的 Rust 和 JS 实现执行相同的优化，Rust 对优化的反应要好得多，因为它的速度提高了` 10 倍以上`，而 JS 的性能仅提高了未优化的` 1.3 到 2.2 倍`。在整个测量范围内，Rust 的同步实现能够胜过 JS` 1.15 到 115 倍以上`，随着工作负载的增加产生更大的收益。
- Rust 的异步实现利用 work-stealing 技术能够胜过 Node.js 的并发模型` 14.5 倍`或更多，从而为轻型和重型工作负载带来更大的收益，而无需进行微调。
- 通过对在浏览器中交叉编译的 Rust 代码到 WebAssembly 的多线程执行以及在 Node.js 内部执行的相同实现进行首次性能评估，单线程实现比相应的纯 JS 实现在 Firefox 中高出约` 4 倍`，在 Chromium 中高出约` 2 倍`。
- 与等效的 Node.js 实现相比，在 Chromium 内部执行的 WebAssembly 能够提供单线程实现的 93.5% 的性能和多线程实现的 67.86% 的性能，这意味着性能比 Node.js `高出 1.87 到 24 倍以上`等效的手动优化的纯 JS 实现。

## References
- [Paper on MDPI][links-1]


[paper1-url]: https://www.mdpi.com/2079-9292/11/19/3217/pdf?version=1665474262
[links-1]: https://www.mdpi.com/2079-9292/11/19/3217