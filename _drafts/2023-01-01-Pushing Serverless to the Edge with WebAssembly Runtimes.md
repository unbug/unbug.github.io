---
layout: post
title:  "一分钟读论文：《利用 WebAssembly 运行时将 Serverless 部署到边缘设备》"
author: unbug
categories: [Architecture]
image: assets/images/screenshot-20230209-192526.jpg
tags: [WebAssembly, Serverless, IoT, EdgeComputing]
---
边缘主机的 CPU 和内存限制会加剧 Serverless 启动延迟，对物联网服务并不友好。为了享受 Serverless 模型的弹性、灵活性和成本优势，同时利用对新兴物联网服务至关重要的边缘计算的潜力，需要解决 Serverless 平台的性能低下问题。奥地利维也纳工业大学的论文[《Pushing Serverless to the Edge with WebAssembly Runtimes》][paper1-url] 研究了用于 Serverless 边缘计算的基于 WebAssembly 的运行时环境的设计和实现，结果发现：可将`冷启动延迟降低 99.5%`，可将内存消耗`降低5倍以上`，并在低端边缘计算设备上的函数执行吞吐量比 Docker 容器`提升4.2倍`。

![]({{ site.baseurl }}/assets/images/screenshot-20230209-192526.jpg)




## References
- [InfoQ - Better Serverless Computing with WebAssembly][links-1]


[paper1-url]: https://dsg.tuwien.ac.at/team/sd/papers/CCGrid_2022_P_Frangoudis_Pushing.pdf
[links-1]: https://www.infoq.com/presentations/webassembly-edge-wasi/