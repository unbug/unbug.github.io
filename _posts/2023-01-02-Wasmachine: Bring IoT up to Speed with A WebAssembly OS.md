---
layout: post
title:  "一分钟读论文：《Wasmachine：WebAssembly OS 可加速物联网和边缘计算》"
author: unbug
categories: [Performance]
image: assets/images/screenshot-20230202-231832.jpg
tags: [WebAssembly, Rust, IoT, Edge-computing]
---
物联网设备通常内存和性能很弱。新西兰奥克兰大学的论文[《Wasmachine: Bring IoT up to Speed with A WebAssembly OS》][paper1-url] 设计出在资源受限的物联网和边缘设备中高效安全地执行 WebAssembly 应用程序的操作系统：Wasmachine。Wasmachine 通过提前将 WebAssembly 编译为本机二进制文件并在内核模式下以零成本系统调来实现高效执行。Wasmachine 原型用 Rust 实现，性能评估结果表明，在 Wasmachine 中运行的 WebAssembly 应用程序比 Linux 中的原生应用程序`快 21%`。

![]({{ site.baseurl }}/assets/images/screenshot-20230202-230550.jpg)

- Wasmachine 实现了⼀个 AOT 编译器，在执⾏之前将 WebAssembly 指令编译成原⽣ CPU。AOT 编译器是使⽤ LLVM 编译器基础构建。
- Wasmachine 实现了⼀个轻量级内核，以更好地满⾜在资源受限设备中⾼效运⾏ WebAssembly 应⽤程序的需求。
- Wasmachine 具有类似 Unix 的单⽚内核架构，⽬前⽀持 64 位 x86 和 armv8 硬件。内核⽤汇编和 Rust 编写的。需要汇编来在引导期间初始化硬件（例如，定时器和中断控制器），并在上下⽂切换期间保存/恢复寄存器。
- Wasmachine 不使⽤“保护环”简化了流程管理模型。
- Wasmachine 禁⽤硬件保护，因为我们的编译器已经强制执⾏了沙箱保护。
- Wasmachine 使⽤硬件边界检查。
- Wasmachine 将 WASI 函数的⼀个⼦集实现为系统调⽤。
- Wasmachine 实现了常⽤的锁定原语，如⾃旋锁、互斥锁和信号量，以保护和同步内部数据结构。


[paper1-url]: https://staff.itee.uq.edu.au/jaga/proceedings/percomworkshops2020/papers/p343-wen.pdf