---
layout: post
title:  "一分钟读论文：《工程师如何设计测试用例：深入观察性研究》"
author: unbug
categories: [Engineering]
image: assets/images/screenshot-20230117-191039.jpg
tags: [Test, UnitTest]
---
先写测试还是先写代码？荷兰代尔夫特特理工大学和澳大利亚墨尔本大学的论文[《How Developers Engineer Test Cases: An Observational Study》][paper1-url] 观察了 13 位具有不同级别经验的工程师为真实世界的开源码编写测试用例，并调查了 72 位工程师之后，总结了一个框架和一组策略来解释工程师如何设计测试用例。

## 论文总结的测试框架

![framework]({{ site.baseurl }}/assets/images/screenshot-20230117-191039.jpg)

1. 测试用例是工程师在测试阶段产生的主要资产，它描述了一组输入和一系列期望。 测试用例为被测程序提供输入，并将程序的输出与预期行为进行比较。
2. 测试用例是工程师在程序文档中看到的内容、工程师在整个测试过程中构建的程序的心智模型以及工程师从源码结构中理解的内容的组合。
3. 工程师从测试失败中吸取教训，并利用他们新获得的知识来改进他们的程序心智模型，这通常会产生新的测试用例。
4. 工程师以测试代码的形式自动化测试用例。
5. 工程师提出新的测试用例，直到满足特定的 ADEQUACY CRITERION。 然后工程师认为他们的测试任务已经完成。

**文档：**
- (D1) 工程师使用文档构建被测程序如何工作的初始心智模型。
- (D2) 工程师大多在缺乏关于在特定情况下对程序的期望的知识时求助于文档。
- (D3) 不完整或不清楚的文档可能会阻止工程师理解他们必须测试的确切内容。 此外，不完整和不清楚的文档似乎很普遍。

**源码：**
- (S1) 工程师强烈依赖源码来理解被测程序。
- (S2) 部分缺乏理解不会阻止工程师继续他们的测试活动。
- (S3) 工程师通常在不仔细检查文档的情况下相信方法的结果。
- (S4) 调试器支持工程师更好地理解代码并帮助他们了解如何到达特定分支。 `在测试失败发生后立即求助于调试器是一种常见的行为`。
- (S5) 工程师经常使用代码覆盖率报告来扩充他们的测试套件。


**心智模型：**
- (M1) 尽管工程师没有明确指出，但他们在测试时构建的心智模型在他们设计的测试用例中发挥了作用。
- (M2) 心智模型不仅通过文档和源码建立，还通过假设检验和失败建立。
- (M3) 工程师首先通过探索简单案例来开始构建他们的心智模型。


**测试案例：**
- (TC1) 测试用例源自各种信息源，即文档、源码和心智模型。
- (TC2) 工程师不仅关注 “happy path” 案例，还关注边界和例外案例。
- (TC3) 测试用例中使用的输入往往是简单、简短和随机的。测试用例包含执行预期行为的单个输入。


**测试代码：**
- (C1) 工程师通常通过复制和粘贴的方式重用以前编写的测试方法。
- (C2) 先前测试中定义的输入值通常会作为下一次测试输入值的灵感，尽管接受调查的工程师确认这不是常规行为。
- (C3) 工程师在他们的测试代码中执行几个重构操作。提取变量和重命名测试方法是最常见的。
- (C4) 测试代码中出现错误，通常是由于复制和粘贴以前的测试方法或由于测试断言的错误定义。

**ADEQUACY CRITERION（充分标准）：**
- (A1) 工程师使用代码覆盖率并重新访问生产和测试代码作为最终检查以确保它们覆盖了所有内容。
- (A2) 系统地重新访问文档是一个不太流行的充分性标准。
- (A3) 虽然不是系统地，但工程师在软件开发和测试方面的个人经验也在决定何时停止测试方面发挥作用。

## 论文总结的测试策略
- 策略1：`密集文档指导`。工程师高度依赖文档作为生成测试用例的主要信息来源，而很少依赖源码本身。这种策略类似于所谓的黑盒测试。
- 策略2：`密集源码指导`。工程师通过阅读程序的文档来建立对程序的初始直觉，然后完全以代码结构为指导（通常由代码覆盖工具支持）。遵循此策略的工程师几乎不看程序的文档。
- 策略3：`混合指导`。工程师利用文档、被测程序的源码以及他们从这两个源构建的心智模型来设计测试用例。工程师不会明确坚持将单一信息来源作为主要来源，并可能在任何给定时间求助于两者。

**测试策略要点：**
- (T1) 工程师主要使用三种不同的策略：密集文档指导、密集源码指导和混合指导。 当开发功能也作为流程的一部分时，一些工程师使用 TDD。
- (T2) 使用其他来源作为验证和扩充工程测试用例的方法（例如，使用源码扩充从文档生成的测试）是倾向于更多地关注文档或源码的策略的一种可能变体。
- (T3) 在观察性研究中看到工程师之间策略的清晰分布，但接受调查的工程师声称使用了一种更加临时的方法，其中使用了两种来源。
- (T4) 缺乏良好的文档来支持测试过程使得许多工程师更多地求助于源码而不是他们想要的。


[paper1-url]: https://arxiv.org/pdf/2103.01783.pdf