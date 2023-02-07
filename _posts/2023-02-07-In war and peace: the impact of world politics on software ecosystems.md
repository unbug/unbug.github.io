---
layout: post
title:  "一分钟读论文：《战争与和平：世界政治对软件生态系统的影响》"
author: unbug
categories: [SoftwareEcosystem]
image: assets/images/screenshot-20230203-152100.jpg
tags: [Protestware, SupplyChainAttacks, OpenSource, OSS]
---
两国交战，平民是否有罪？国际人道法约定“战争时要尽可能限制对妇女和儿童以及其他平民的影响”。开源许可证明确规定应该“不歧视个⼈或群体。License 不得歧视任何⼈”。 俄乌冲突中开源如何影响开发者呢？我们来看看⽇本学技术研究所和澳大利亚墨尔本大学合著的论文[《In war and peace: the impact of world politics on software ecosystems》][paper1-url]中研究的几个例子：当开源项目的维护者将他们的开源项目化为抗议软件（Protestware）。

抗议软件不仅在政治冲突的背景下具有相关性，⽽且开源维护者有自己的⽴场。`Faker.js` 和 `Colors.js` 这两个拥有超过 21,000 个依赖应⽤程序和超过 2200 万每周下载量的库的维护者故意发布了⼀个更新给亚⻢逊云开发⼯具包的⽤⼾带来了问题，该更新产⽣了⼀个⽆限循环，导致依赖应⽤程序喷出以“Liberty Liberty Liberty”作为开头的乱码。作者在 README 表明自己的立场，要求6位数的年薪作为报酬。

## 俄乌冲突中的真实案例
**恶意抗议软件 Node-ipc：**

Node-ipc 是使用广泛的 npm 开源组件，其作者出于其个人政治立场在仓库中加入将俄罗斯与白俄罗斯区域用户数据抹除的恶意代码，`Vue.js 生态中的 vue-cli 包依赖了它使得漏洞影响范围很大（一周内上百万次下载）`，GitHub 宣布这是一个严重漏洞，漏洞跟踪编号 CVE-2022-23812。

**温和的抗议软件：**
- 其一，同样是 node-ipc 的维护者，只是这次改成在用户桌面创建反战标语，维护者还在 REAMDE 中要求开发者不喜欢就锁定使用正常的版本。
- 其二，AWS terraform 的维护者在自己的项目的 License 描述中添加了反战标语。

**制裁开发者：**
- MongoDB 决定不向俄罗斯买家出其产品。
- 甲骨文终止对俄罗斯用户的支持。
- GitHub 暂停了俄罗斯账⼾。被暂停的⽤⼾的`整个活动和历史都消失了`。更⼤的问题是 `GitHub 没有向库维护⼈员提供任何警告`。

**知名互联网公司的制裁：**
- 微软暂停在俄罗斯的销售其产品。 
- 苹果暂停在俄罗斯的销售其产品。 
- SAP 暂停在俄罗斯的销售其产品。 


## 论文引发的10个思考题
在高度互连的大型软件生态系统中，平均包可以直接依赖超过五个其他包，抗议软件对整个生态系统的影响可能是毁灭性的，特别恶意软件。
- (1) 抗议软件在传播政治⽅⾯的效果如何？
- (2) 抗议软件对软件生态系统的直接影响是什么？
- (3) 谁受到抗议软件的影响，他们与抗议软件维护者有什么关系（如果有）？
- (4) 项目使用哪些缓解策略来保护或修复其供应链，这些缓解策略的有效性如何？
- (5) 供应链冗余在提高弹性方面的效果如何？
- (6) 将库变成抗议软件的变化与其他软件演变有何不同？
- (7) 我们自动检测抗议软件的准确度如何？
- (8) 软件生态系统中其他利益相关者认为维护者的责任是什么？
- (9) 抗议软件如何影响整个生态系统的信任？
- (10) 抗议软件如何在生态系统层面受到监管？

## References
- [2022 Github 对乌克兰战争的回应][links-1]
- [关于战争的常见问题][links-2]
- [俄乌热战背景下的NODE-IPC供应链投毒攻击][links-3]


[paper1-url]: https://www.semanticscholar.org/reader/19d4db23117ccedc3d7fb7b245e2fe0ee9de86c8
[links-1]: https://github.blog/2022-03-02-our-response-to-the-war-in-ukraine/
[links-2]: https://www.icrc.org/zh/document/ihl-rules-of-war-faq-geneva-conventions
[links-3]: http://blog.nsfocus.net/node-ipc-npm/