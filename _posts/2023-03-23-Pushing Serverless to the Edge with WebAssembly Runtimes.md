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

论文介绍了基于WebAssembly的运行时环境原型系统 WOW（WebAssembly execution in Apache OpenWhisk）的设计和实现，以及与现有的基于容器的运行时环境的对比和优化。
- WOW 是一个基于Apache OpenWhisk（一个开源的无服务器计算平台）的扩展，它支持将WebAssembly模块（Wasm modules）作为无服务器函数部署和执行。
- WOW 的主要组件包括：
  - Wasm Executor：一个负责加载和执行Wasm模块的组件，它使用了 wasmtime（一个成熟的WebAssembly运行时库）来提供高效和安全的Wasm执行环境。
  - Wasm Invoker：一个负责调度和管理 Wasm Executor 的组件，它与 OpenWhisk 的 Controller 和 Kafka 消息队列进行通信，接收函数调用请求，并将其转发给合适的 Wasm Executor。
  - Wasm Pre-warm Pool：一个负责预热和缓存 Wasm Executor 的组件，它可以根据函数调用频率和配置参数动态调整预热池的大小，以减少冷启动延迟并提高资源利用率。
- WOW 与现有的基于容器的运行时环境（如Docker或runc）相比，具有以下优势：
  - WOW 可以在不同类型和规模的边缘计算设备上运行，而不需要安装复杂的容器技术或操作系统。
  - WOW 可以快速加载和执行Wasm模块，而不需要创建和初始化容器镜像或依赖库。
  - WOW 可以紧凑地表示和存储Wasm模块，而不需要占用大量的磁盘空间或内存资源。
  - WOW 可以安全地隔离和沙箱化Wasm模块，而不需要额外的安全机制或权限管理。
- WOW 也进行了一些优化措施，以提高其性能和可用性，包括：
  - 使用 HTTP 协议代替 gRPC 协议来传输函数调用请求和响应，以减少网络开销和序列化/反序列化时间。
  - 使用共享内存代替文件系统来传递函数输入参数和输出结果，以减少磁盘读写时间和内存拷贝时间。
  - 使用多线程代替多进程来并发执行Wasm模块，以减少进程创建时间和上下文切换时间。




## References
- [InfoQ - Better Serverless Computing with WebAssembly][links-1]


[paper1-url]: https://dsg.tuwien.ac.at/team/sd/papers/CCGrid_2022_P_Frangoudis_Pushing.pdf
[links-1]: https://www.infoq.com/presentations/webassembly-edge-wasi/