---
layout: post
title:  "一分钟读论文：《Low-code 开发的特点与挑战：从业者视角》"
author: unbug
categories: [LCNC]
image: assets/images/screenshot-20230127-174230.jpg
---
中国的武汉大学、美国的伊利诺伊大学和澳大利的亚莫纳什大学合著的论文[《Characteristics and Challenges of Low-Code Development: The Practitioners’ Perspective》][paper1-url] 分析了 Stack Overflow 和 Reddit 两大社区关于 Low-code development（LCD）的优势、局限性和挑战。结果表明：(1) LCD 可以提供图形用户界面供用户拖放，只需很少甚至不需要代码；(2) LCD 平台中开箱即用的单元（例如，API 和组件）的设备使其易于学习和使用并加快开发速度；(3) LCD 在需要自动化流程和工作流的领域尤其受到青睐；(4)从业者对 LCD 的优缺点看法不一。

**对 LCD 的理解是什么？**
- 大多数从业者倾向于使用低代码（例如，“编码工作量低”）来描述 LCD，他们认为 LCD 的编码工作量较低，是可视化编程。 
- 一些认为 LCD 是预先设计好的模板，对非专业程序员友好，所见即所得（WYSIWYG），以及业务流程。 
- 一些人认为 LCD 利用图形用户界面来开发程序，一个用例是构建自动化以“以最少的人工参与实现无人值守操作的自动化”。 
- 一些人认为 LCD 给数据库操作带来了方便。 例如，一位从业者提到“它提供了一些很酷的工具，用于通过脚手架生成 CRUD 实体”。 
- 一些人认为 LCD “结合了视觉和代码工作流程以促进同一环境中的协作”。

**LCD 有哪些平台？**

|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![rq2-1]({{ site.baseurl }}/assets/images/screenshot-20230127-175244.jpg)| ![rq2-2]({{ site.baseurl }}/assets/images/screenshot-20230127-175320.jpg) |

21个 LCD 平台中，其中 14 个是商业的，而 7 个是开源的。 

**LCD 使用哪些编程语言开发？**

Java、Javascript、C#、Python。

**LCD 中主要的执行单元是什么？**

API、Template、Component、Service、Framework、Widgets、SDK。 

**LCD 开发了哪些类型的应用程序？**

移动应用程序、Web 应用程序、集成应用程序。

**哪些域使用了 LCD？**

![rq7]({{ site.baseurl }}/assets/images/screenshot-20230127-174230.jpg)

- LCD 使用最多的领域是电子商务，包括企业对企业（B2B）和企业对消费者（B2C）。 
- 业务流程管理 (BPM) 和社交媒体，其中社交媒体具体包含聚会、聊天、约会和博客应用程序等。
- 客户关系管理 (CRM)
- 内容管理系统 ( CMS) 、Extract-Transform-Load (ETL) 和 Entertainment。 
- 使用低代码游戏引擎开发游戏
- 机器人流程自动化 (RPA) 和医疗

**LCD 有什么好处？**
- LCD 允许更快的开发，从而快速将应用程序推向市场。 
- 与雇用开发人员编写应用程序代码相比，LCD 易于学习和使用且 IT 成本更低，因此非常棒。
- LCD 对新手友好，因为它“帮助非技术人员以简单和熟悉的方式创建软件”。
- LCD 构建应用的系统质量更高，集成和扩展能力强，工作量小，可定制性好。
- LCD 具有直观的感知，具有“完全灵活，几乎可以做任何事情”的卓越可用性，并且始终提供“友好的界面”和“惊人的 UI”，从而提供更好的用户体验。 
- LCD 可以轻松部署该应用程序，并且与编程相比，改进 IT 治理非常具有成本效益。 
- LCD 适合团队开发。

**LCD的局限和挑战是什么？**
- 虽然使用 LCD 比编码更容易和更快，但它仍然有一个陡峭的学习 某种程度的弯曲。 
- 一些 LCD 平台的高定价使 LCD 的成本变得昂贵，特别是如果你有大量的用户。 
- LCD 平台缺乏定制化。 
- LCD 平台的加载和发布速度较慢。 
- LCD 在某种程度上不如编程强大，复杂度高。 
- 复杂的问题仍然需要编码，无法访问源代码，不是真正的易用性以及对有经验的开发者的限制。 
- 厂商锁定、维护调试困难、集成困难也是 LCD 的弱点。 


[paper1-url]: https://www.semanticscholar.org/reader/a902af2c82e161e82d7fc247d67961a972fea767