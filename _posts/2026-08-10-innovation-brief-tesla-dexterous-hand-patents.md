---
layout: post
title: "AI 智创简报：《特斯拉灵巧手五连专利，腱驱模组的国产替代窗口》"
author: unbug
categories: [AI, InnovationBrief, Robotics]
image: assets/images/innovation-brief-tesla-dexterous-hand-patents.svg
tags: [Patent, Robotics, Manufacturing, HumanoidRobot, Actuator]
---

Tesla 在同一天公开了五件人形机器人手部专利，技术要点高度一致：把驱动器全部搬到前臂，用腱绳把力传到手指。这个结构选择把价值量从「手」转移到了「前臂动力舱」，也把机会留给了做丝杠、腱绳和柔性关节的中小厂商。

![特斯拉灵巧手专利信号与制造机会]({{ site.baseurl }}/assets/images/innovation-brief-tesla-dexterous-hand-patents.svg)

## 专利信号

五件 PCT 申请于 **2026-04-16** 同日国际公布，构成一个完整的手-腕-前臂专利簇：

| 公开号 | 名称 |
|--------|------|
| `WO2026/080687` | Mechanically actuated robotic hand |
| `WO2026/080690` | Wrist joint for robotic hand |
| `WO2026/080691` | Robotic forearm assembly |
| `WO2026/080693` | Joint assembly for robotic appendage |
| `WO2026/080701` | Robotic appendage |

申请人为 **Tesla, Inc.**（`WO2026/080687` 在 Google Patents、`WO2026/080691` 在 PATENTSCOPE 页面均直接标注）。同期另有中国申请人的 `WO2026/162064`「灵巧手手指、灵巧手及机器人」于 2026-08-06 公布，分类号 `B25J15/00`，同样指向仿生指节运动轨迹。注意：以上均为**国际公布**，不等于已授权。

## 技术趋势

专利簇共同指向一条与「关节内置电机」相反的路线：**手内不放驱动，只放传动与感知**。公开资料对该结构的解读集中在三点——驱动器阵列沿前臂轴向排布、腱绳经腕部路由通道换向、指节用柔性铰链替代销轴轴承。

与现有量产方案的差异点很明确：连杆或指节内电机方案的瓶颈在手掌空间和散热，而腱驱方案把这两个约束一起挪到前臂，代价是腱绳磨损、路由摩擦和长期蠕变成为新的可靠性主矛盾。

## 制造机会

价值量随之从整手转移到几个具体环节：

- **微型丝杠与空心杯电机**：前臂动力舱的线性驱动阵列，是精密加工与一致性壁垒最高的一环
- **高强纤维腱绳与耐磨导向件**：涉及纤维选型、端接工艺与低摩擦衬套，属于典型的材料 + 工艺组合
- **柔性铰链复合材料**：纤维/弹性体/形状记忆合金的叠层结构，需要模压与疲劳工艺能力
- **指端触觉传感阵列**：柔性电路与封装工艺，可复用消费电子产线

具备落地条件的是已有精密丝杠、微特电机、绳缆及柔性电路产线的厂商。公开的产业信息显示，国内已有微型丝杠、空心杯电机与指尖触觉传感器厂商进入送样或量产验证阶段。

## 创业发现

- **腱驱手部模组整包**：把前臂驱动阵列、腱绳路由与整手做成可替换模组，卖给缺乏手部工程能力的机器人本体厂。门槛是百万次循环的寿命验证；风险是头部本体厂自研回收该环节。
- **腱绳与柔性关节的寿命测试服务**：行业尚无统一的磨损与蠕变测试标准，测试台加数据库本身可成生意。门槛低但天花板也低，需绑定标准制定方。

> 结构路线一旦被头部厂商锁定，配套件的窗口期通常只有一到两个量产周期。

## References
- [WO/2026/080687 Mechanically actuated robotic hand][links-1]
- [WO/2026/080691 Robotic forearm assembly][links-2]
- [WO/2026/080690 Wrist joint for robotic hand][links-3]
- [WO/2026/080693 Joint assembly for robotic appendage][links-4]
- [WO/2026/080701 Robotic appendage][links-5]
- [WO/2026/162064 灵巧手手指、灵巧手及机器人][links-6]


[links-1]: https://patents.google.com/patent/WO2026080687A1/en
[links-2]: https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2026080691
[links-3]: https://patentscope.wipo.int/search/en/WO2026080690
[links-4]: https://patentscope.wipo.int/search/en/WO2026080693
[links-5]: https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2026080701
[links-6]: https://patentscope.wipo.int/search/zh/detail.jsf?docId=WO2026162064
