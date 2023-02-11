---
layout: post
title:  "一分钟读论文：《利用 WebAssembly 运行时将 Serverless 部署到边缘设备》"
author: unbug
categories: [Architecture]
image: assets/images/screenshot-20230210-234722.jpg
tags: [WebAssembly, Serverless, IoT, EdgeComputing]
---
边缘主机的 CPU 和内存限制会加剧 Serverless 启动延迟，对物联网服务并不友好。为了享受 Serverless 模型的弹性、灵活性和成本优势，同时利用对新兴物联网服务至关重要的边缘计算的潜力，需要解决 Serverless 平台的性能低下问题。奥地利维也纳工业大学的论文[《Pushing Serverless to the Edge with WebAssembly Runtimes》][paper1-url] 设计了基于 WASM 的 FaaS 平台的架构，用于 Serverless 边缘计算的基于 WebAssembly 的运行时环境的设计和实现。评估后发现优于 Docker。

- 可将`冷启动延迟降低 99.5%`。
- 可将内存消耗`降低5倍以上`。
- 在低端边缘计算设备上的函数执行吞吐量比 Docker 容器`提升4.2倍`。

## 基于 WASM 的 FaaS 平台的架构设计

|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/assets/images/screenshot-20230210-234703.jpg)| ![img2]({{ site.baseurl }}/assets/images/screenshot-20230210-234722.jpg) |

- `Serverless 平台：`⽤ Apache OpenWhisk 作为实现 WASM ⽀持的框架。 由于 OpenWhisk 的设计易于使⽤新语⾔进⾏扩展，因此语⾔运⾏时协议得到了很好的改进并且易于实现。
- `WebAssembly 运⾏时：`同时支持 WASMtime、WASMer、WebAssembly Micro Runtime (wamr)。
- `OpenWhisk WASM 运行时容器：`
  - 在 OpenWhisk 和不同的 WASM 运⾏时之间引⼊了⽀持 WASM 模块的执⾏层。该层实现独⽴于 WASM 运⾏时的部分，例如与 OpenWhisk 通信。因此，每个 WASM 运⾏时都会产⽣⼀个单独的执⾏器⼆进制⽂件，并且可以独⽴于其他运⾏时使⽤。
  - 修改 OpenWhisk 的调⽤程序，使其与 WASM 执⾏器⽽不是 Docker 守护进程通信。
  - WASM 执⾏器是⽤ Rust 从头开始编写的。Rust 编译器后端使⽤ LLVM，因此可以为任何架构编译 Rust 程序，特别是 aarch64 和 wasm32-wasi，
  - 为 OpenWhisk WASM 运行时容器开发 Serverless 功能分两个阶段。1）函数被编译成 WASM 并优化⽣成的代码。2）将⽣成的预编译⼆进制⽂件压缩并准备好上传到 OpenWhisk。



## References
- [InfoQ - Better Serverless Computing with WebAssembly][links-1]


[paper1-url]: https://dsg.tuwien.ac.at/team/sd/papers/CCGrid_2022_P_Frangoudis_Pushing.pdf
[links-1]: https://www.infoq.com/presentations/webassembly-edge-wasi/