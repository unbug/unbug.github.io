---
layout: post
title:  "一分钟读论文：《ChatGPT  for Robotics：设计原则和模型能力》"
author: unbug
categories: [AI, Engineering]
image: assets/images/screenshot-20230407-153513.jpg
tags: [ChatGPT, Robotics]
---
2023年初推出的 Loona Smart Petbot 集成了 ChatGPT，是具备优秀人格化的机器人。市面上有很多可编程的机器人都提供了丰富的传感器，如果你手头有一个这样的机器人（如 Anki Vector、大疆 RoboMaster EP、优必选悟空机器人教育版），通过 ChatGPT 你同样可以轻易使其人格化。微软自主系统和机器人研究院和 ChatGPT 合著的论文[《ChatGPT for Robotics: Design Principles and Model Abilities》][paper1-url] 提出了 ChatGPT 应用于机器人的设计原则、ChatGPT 应用于机器人的 Pipeline 和让用户可以协作地应用优秀提示方案的 `PromptCraft`，能指导你基于 ChatGPT 大幅提升机器人的可玩性。

-  ChatGPT 是一个基于大规模文本和人类交互数据训练的语言模型，可以生成与各种提示和问题相关的连贯和语法正确的回答。
-  ChatGPT 可以通过一系列的设计原则来指导其解决机器人学任务，包括特殊的提示结构、高级API和文本反馈等。
-  ChatGPT 可以适应不同的机器人学任务、仿真器和形态，例如空中导航、操纵和具身代理等，并且可以通过自然语言指令来与用户交互。

##  ChatGPT 解决机器人问题的能力
- `Zero-shot task planning:` ChatGPT 可以根据用户的自然语言指令，生成适用于不同机器人平台和任务的代码，无需任何预先训练或微调。这种能力可以让用户快速地探索不同的机器人方案，而不需要了解底层的编程细节。适用场景包括机械臂操作、无人机导航、家庭助理机器人等。优点是可以实现跨平台、跨任务的机器人控制，缺点是可能存在代码错误或效率低下的风险。
- `User on the loop:` ChatGPT 可以与用户进行交互式对话，以解决复杂的机器人任务，例如需要多步骤或多个目标的任务。用户可以通过对话提供高层次的反馈、指导或修改指令，而ChatGPT可以根据用户的意图和上下文调整代码或行为。这种能力可以让用户更灵活地控制机器人，而不需要一次性给出完整的指令。适用场景包括机器人协作、机器人教学、机器人规划等。优点是可以提高机器人任务的成功率和鲁棒性，缺点是可能需要更多的对话轮次或用户干预。
- `Perception-action loops:` ChatGPT 可以利用视觉信息来指导机器人的动作，例如识别物体、估计距离、规避障碍等。ChatGPT可以通过XML标签或其他格式来接收和处理图像数据，并生成相应的代码或动作序列。这种能力可以让机器人更好地适应复杂和动态的环境，而不需要预先定义所有可能的情况。适用场景包括机器人导航、机器人抓取、机器人搜索等。优点是可以增强机器人的感知和决策能力，缺点是可能存在视觉误识别或动作不准确的风险。
- `Reasoning and common-sense robotics tasks:` ChatGPT 可以利用常识知识和推理能力来解决一些需要逻辑、几何或数学思维的机器人任务，例如计算角度、判断方向、选择最优路径等。ChatGPT可以通过自然语言或数学表达式来表达和解决这些问题，并生成相应的代码或动作序列。这种能力可以让机器人更智能地执行一些抽象或难以描述的任务，而不需要用户提供过多的细节。适用场景包括机器人推理、机器人游戏、机器人创造等。优点是可以拓展机器人的应用范围和难度，缺点是可能存在常识错误或推理失败的风险。

## ChatGPT 应用于机器人的设计原则和 Pipeline

![]({{ site.baseurl }}/assets/images/screenshot-20230407-153622.jpg)

-   第一步，我们定义一个高级的机器人函数库。这个库可以针对特定的机器人形态或场景，应该能够映射到机器人平台上的实际实现，同时命名足够描述性，让 ChatGPT 能够理解；
-   第二步，我们为 ChatGPT 构建一个提示语，描述任务的目标，同时指定允许使用的高级函数库中的函数。提示语也可以包含一些约束条件，或者指示 ChatGPT 如何组织其回应；
-   第三步，用户保持在循环中，评估 ChatGPT 生成的代码，可以通过直接分析或者模拟的方式，同时向 ChatGPT 提供关于代码质量和安全性的反馈；
-   第四步，在对 ChatGPT 生成的实现进行迭代后，最终的代码可以部署到机器人上。

## PromptCraft
一个开源的研究工具 PromptCraft，让用户更容易地开始使用 ChatGPT 进行机器人学研究，它有以下几个特性：
-   它包含了一个平台，让研究者可以协作地上传和投票评价机器人学应用中的优秀提示方案，从而形成一个有用的提示库。
-   它提供了一个基于微软 AirSim 的机器人学仿真器样例，集成了 ChatGPT ，让用户可以通过自然语言指令来控制不同的机器人平台，例如机械臂、无人机和家庭助理机器人等。
-   它支持使用 OpenAI 的  ChatGPT ，也欢迎使用其他的大型语言模型（例如开源的模型或者有API访问权限的模型，如 GPT-3 和 Codex）。
-   它可以帮助用户快速地开始使用 ChatGPT 进行机器人学研究，也可以帮助用户学习和探索不同的提示技巧和策略

使用 PromptCraft 的方法如下：
-   用户可以从 GitHub 上下载或克隆 PromptCraft-Robotics 仓库，然后按照 README.md 文件中的说明安装所需的依赖项和配置环境。
-   用户可以运行 ` ChatGPT _airsim`文件夹中的示例代码，来启动仿真器和  ChatGPT ，并通过文本输入框来与机器人交互。
-   用户可以在 Discussions 页面中提交或查看其他用户提交的提示示例，也可以通过 pull request 来添加新的机器人学类别和示例。


## References
- [PromptCraft][links-1]


[paper1-url]: https://www.microsoft.com/en-us/research/uploads/prod/2023/02/ChatGPT___Robotics.pdf
[links-1]: https://github.com/microsoft/PromptCraft-Robotics