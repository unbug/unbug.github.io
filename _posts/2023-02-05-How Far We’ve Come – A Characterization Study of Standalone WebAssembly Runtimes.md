---
layout: post
title:  "一分钟读论文：《我们走了多远——WebAssembly 运行时的全面特征研究》"
author: unbug
categories: [FrontEnd]
image: assets/images/screenshot-20230201-234812.jpg
tags: [sticky, featured, WebAssembly, Rust]
---
WebAssembly ⼆进制⽂件依赖 Web 浏览器的 JavaScript 引擎来执⾏，需要独⽴的 WebAssembly 运⾏时才能在⾮ Web 浏览器中运⾏ WebAssembly 代码。美国佐治亚大学的论文[《How Far We’ve Come – A Characterization Study of Standalone WebAssembly Runtimes》][paper1-url]构建了一个标准的 WABench 的基准套件，对独立的 WebAssembly 运行时进行了全面的表征研究，包含性能、内存开销和架构特征。分析了`33 个独⽴ WebAssembly 运⾏时`的TOP5，发现这些独立运⾏时在运⾏ WebAssembly ⼆进制⽂件时平均会`降低 1.59 到 9.57 倍的性能`。

通常有两种执行 WebAssembly 代码的方法：`解释型和 JIT（SinglePass, Cranelift, LLVM）`。WebAssembly 独立运行时的标准：
- 该运行时是一个独立的 WebAssembly 运行时，支持使用 WASI 编译的 WebAssembly 二进制代码。
- 运行时足够成熟，可以运行广泛的 WebAssembly 应用程序。 
- 运行时随着 WebAssembly 和 WASI 的发展而积极开发和维护。

论文研究了符合以上标准的 WebAssembly 独立运行时 TOP5：`Wasmtime（Rust，JIT）、WAVM（C/C++，JIT）、Wasmer（Rust，JIT）、Wasm3（C，解释型）、WAMR (C, 解释型)`。

## 论文研究的发现
![]({{ site.baseurl }}/assets/images/screenshot-20230202-001657.jpg)
![]({{ site.baseurl }}/assets/images/screenshot-20230202-003158.jpg)

- 与原生执行相⽐，所有五个独⽴的 WebAssembly 运⾏时在执⾏ WebAssembly ⼆进制⽂件时都会引⼊额外的性能开销。平均性能下降范围从`1.59× (Wasmer) 到9.57× (WAMR)`。
- 在三个 WebAssembly JIT 编译器中，Cranelift 和 LLVM 对于不同的基准程序集具有最佳性能。与 SinglePass 相⽐，Cranelift 的性能平均提速为`1.74× `，⽽ LLVM 的提速为`1.43×`。
- AOT 编译对 WAVM 的性能（`1.73×性能加速`）有很⼤影响，⽽对 Wasmtime （`1.02×加速`）和 Wasmer（`1.02×加速`）的影响⾮常有限。
- WebAssembly 编译器优化可以为不同的 WebAssembly 运⾏时带来相当⼤的性能改进，性能加速`1.44× ‒ 3.57×`。
- 运⾏ WebAssembly ⼆进制⽂件时，独⽴ WebAssembly 运⾏时消耗的内存资源是原生执⾏的 `1.26x‒ 5.50x`。
- WebAssembly 运⾏时不仅执⾏更多的机器指令，即平均为原生执⾏的 `2.03x‒ 14.61x`，⽽且还表现出⽐原生执⾏更⾼的每周期指令（Instructions per cycle, 即 IPC）值。
- WebAssembly 运⾏时表现出⽐原生执⾏更多的分⽀预测未命中率，范围从`1.52× 到 12.64×`，但它们的分⽀预测未命中率通常`⾮常接近原生执⾏`。
- 与原生执⾏相⽐， WebAssembly 运⾏时的`平均缓存未命中率为1.39x⾄4.60x`，⽽它们的缓存未命中率通常相似。


下表是论文作者研究构建的 WABench 基准套件中包含的基准程序。

![]({{ site.baseurl }}/assets/images/screenshot-20230202-000852.jpg)

## References
- [WABench 基准套件][links-1]
- [Wasmtime][links-2]
- [Wasmer][links-3]
- [Wasm3 Labs][links-4]
- [WAMR][links-5]
- [WAVM][links-6]


[paper1-url]: https://cobweb.cs.uga.edu/~wenwen/papers/iiswc2022.pdf
[links-1]: https://github.com/dunnock/wabench
[links-2]: https://github.com/bytecodealliance
[links-3]: https://wasmer.io/
[links-4]: https://github.com/wasm3
[links-5]: https://github.com/bytecodealliance/wasm-micro-runtime
[links-6]: https://github.com/WAVM/WAVM