---
layout: post
title:  "一分钟读论文：《ChatGPT 提示模式：提高代码质量、重构、需求获取和软件设计》"
author: unbug
categories: [AI]
image: assets/images/screenshot-20230319-024727.jpg
tags: [ChatGPT, MachineLearning]
---
 前哈佛大学计算机科学教授、谷歌工程主管 Matt Welsh 在美国计算机协会（ACM）的一个虚拟会议上说“不要指望你的程序员职业生涯会一直持续下去，因为 AI 正在取代这个角色”。ChatGPT 近来让很多工程师感到很无力，仿佛任何努终将通徒劳，但也有很多工程师看到了机会并尝试通过它成为 10X 工程师。美国田纳西州纳什维尔市范德堡大学的论文[《ChatGPT Prompt Patterns for Improving Code Quality, Refactoring, Requirements Elicitation, and Software Design》][paper1-url] ，为软件工程提供了一个模式目录，全面总结了帮助工程师应用于改进需求获取、快速原型制作、代码质量、重构和系统设计的提示模式的核心思想和100个常用提示。


## 系统需求和架构模式
介绍了一些用于快速原型设计和需求获取的提示模式，这些模式可以帮助软件工程师在开发过程中更好地理解和验证系统需求和架构，并提高开发效率和质量。以下是每个模式需用的关键提示：

**需求模拟模式（Requirements Simulator Pattern）**
1.  我希望你扮演系统的角色
2.  使用需求来指导你的行为
3.  我会要求你做X，你要告诉我在给定的需求下X是否 可能。
4.  如果X是可能的，用需求来解释为什么。
5.  如果我不能根据需求做X，用Y格式写出需要的 缺失需求。

**规范消歧模式（Specification Disambiguation Pattern）**
1.  在这个范围内
2.  考虑这些需求或规范
3.  指出任何模糊或潜在的意外结果的地方

**API生成模式（API Generator Pattern）**
1.  使用系统描述X
2.  为系统生成一个API规范
3.  API规范应该采用Y格式

**API模拟模式（API Simulator Pattern）**
1.  根据规范X扮演描述的系统
2.  我会以Y格式输入请求到API中
3.  你要根据规范X以Z格式响应适当的回应

**少样本代码示例生成模式（Few-shot Code Example Generation Pattern）**
1.  我将给你提供系统X
2.  创建N个示例来展示使用系统X的方法
3.  尽可能让示例覆盖完整
4.  （可选）示例应该基于系统X的公共接口
5.  （可选）示例应该关注X

**领域特定语言创建模式（DSL Creation Pattern）**
1.  我想让你为X创建一个领域特定语言
2.  语言的语法必须遵循以下约束条件
3.  向我解释这种语言并提供一些例子

**架构可能性模式（Architectural Possibilities Pattern）**
1.  我正在开发一个用X为Y服务的软件系统
2.  系统必须遵守这些约束条件
3.  描述N种可能的架构方案
4.  用Q来描述架构

**变更请求模拟模式（Change Request Simulation Pattern）**
1. 我的软件系统架构是X 
2. 系统必须遵守这些约束条件 
3. 我想让你模拟一个我将描述的对系统的变更 
4. 用Q来描述变更的影响 
5. 这是对我的系统的变更


## 代码质量和重构模式
介绍了一些用于提高代码质量和重构的提示模式，这些模式可以帮助软件工程师在使用 ChatGPT 生成或修改代码时避免常见的问题和错误，并提高代码的可读性和可维护性。以下是每个模式需用的关键提示：

**代码聚类模式（Code Clustering Pattern）**
1.  在X范围内
2.  我希望你以一种方式编写或重构代码，将具有Y属性的代码与具有Z属性的代码分开。
3.  这些是具有Y属性的代码的例子。
4.  这些是具有Z属性的代码的例子。

**中间抽象模式（Intermediate Abstraction Pattern）**
1.  如果你编写或重构具有X属性的代码
2.  使用其他具有Y属性的代码
3.  （可选）定义X属性
4.  （可选）定义Y属性
5.  在X和Y之间插入一个中间抽象Z
6.  （可选）抽象Z应该具有这些属性

**原则性代码模式（Principled Code Pattern）**
1.  在这个范围内
2.  生成、重构或创建符合命名原则X的代码

**隐藏假设模式（Hidden Assumptions Pattern）**
1.  在这个范围内
2.  列出这段代码所做的假设
3.  （可选）估计改变这些假设或它们改变的可能性有多难

**伪码重构模式（Pseudo-code Refactoring Pattern）**
1.  重构这段代码 
2. 使其与这段伪码相匹配 
3. 尽可能地匹配伪码的结构

**数据引导重构模式（Data-guided Refactoring Pattern）** 
1. 重构这段代码 
2. 使其输入、输出或存储数据格式为X 
3. 提供一个或多个X的例子


![]({{ site.baseurl }}/)

<!--
<p><iframe style="width:100%;" height="315" src="https://arxiv.org/pdf/2112.10165.pdf" frameborder="0" allowfullscreen></iframe></p>


|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/)| ![img2]({{ site.baseurl }}/) |
-->


## References
- [ACM Chicago Feb 8 2023: Large Language Models and the End of Programming from Matt Welsh of Fixie.ai][links-1]


[paper1-url]: https://arxiv.org/pdf/2303.07839.pdf
[links-1]: https://www.youtube.com/watch?v=qmJ4xLC1ObU