---
layout: post
title:  "一分钟读论文：《基于 ChatGPT、AR 和 Voicebots 的儿童外教软件设计框架》"
author: unbug
categories: [AI, Engineering]
image: assets/images/screenshot-20230210-075138.jpg
tags: [ChatGPT, MachineLearning, AR, MR, VR]
---
ChatGPT 催生了很多教育领域的创业项目，欧盟大约有`2600万4到8岁的儿童，美国大约有1700万4到8岁的儿童`，外语软件将服务于数百万家庭。美国的佛罗里达理工大学与南佛罗里达大学合著的论文[《Framework for A Foreign Language Teaching Software for Children Utilizing AR, Voicebots and ChatGPT (Large Language Models)》][paper1-url]设计出一个框架，用于利用 AR+Voicebots+ChatGPT 技术开发语言学习软件，框架遵循了⼉童外语教学的设计原则：`游戏化、社交互动、惊喜奖励`。利用论文中提到的技术平台，开发人员、研究人员和企业家能够比以往更快地实现产品化，本设计框架和设计原则可以成为开发高效外语教学软件的蓝图。

## 设计框架的构成

|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![]({{ site.baseurl }}/assets/images/screenshot-20230210-075312.jpg)| ![]({{ site.baseurl }}/assets/images/screenshot-20230210-075138.jpg) |


- `增强现实 (AR)`：AR 将计算机⽣成的数据（图像、声⾳等）叠加到⽤⼾视图，向其中添加数字信息层来增强⽤⼾对现实世界的感知。可以使⽤多种 AR 框架（例如 ARCore、ARKit 或 Vuforia）将 AR 技术嵌⼊到移动应⽤程序中。 
- `语音机器人（Voicebots）`：用于语⾳转⽂本或⽂本转语⾳。可以使用聊天机器⼈平台：Dialogflow、IBM Watson Assistant、Amazon Lex、 ManyChat、Chatfuel 、Wit.ai 、MindMeld、Chatbot 、Azure Bot Service。
- `ChatGPT（大型语言模型 AI）`：设计对话是⼀项⾮常重要、具有挑战性且耗时的任务，为了克服内容生成的任务，建议`利用 ChatGPT 创建内容`。测试表明 ChatGPT 有助于学习外语的对话。在教授外语时，特别是对于年幼的孩子，一些最初的对话和主题是自我介绍，以及关于动物、食物、车辆、家庭成员、身体部位、车辆、职业等的对话。通过提供对高质量、定制化和个性化语言学习材料的访问，ChatGPT 可能彻底改变语言的教学和学习方式。

|                                       |                                       |
|:-------------------------------------:|:-------------------------------------:|
|![img1]({{ site.baseurl }}/assets/images/screenshot-20230210-074753.jpg)| ![img2]({{ site.baseurl }}/assets/images/screenshot-20230210-074807.jpg) |

## References
- [成功 AR 儿童产品 Shifu][links-1]


[paper1-url]: https://dergipark.org.tr/en/download/article-file/2864638
[links-1]: https://www.playshifu.com/