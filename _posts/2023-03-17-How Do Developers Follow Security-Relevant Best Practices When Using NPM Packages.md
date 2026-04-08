---
layout: post
title:  "一分钟读论文：《工程师如何遵循 NPM 包安全最佳实践？》"
author: unbug
categories: [Security]
image: assets/images/screenshot-20230124-230804.jpg
tags: [NPM, NodeJS]
---
不遵循包依赖的最佳实践会导致严重的安全风险。例如，2021 年 3 月，安全专家在 NPM 包网络掩码中发现了一个漏洞可影响超过 278,000 个应用。美国布莱克斯堡弗吉尼亚理工大学和东北大学软件学院合著的论文[《How Do Developers Follow Security-Relevant Best Practices When Using NPM Packages?》][paper1-url] 分析了841个 JS 应用与 NPM TOP 1000 包发现工程师经常忽略安全的最佳实践。

## NPM 包安全最佳实践（BPs）
- BP1：使用命令`npm audit`扫描库依赖项中的漏洞，并使用`npm audit fix`移除漏洞，消除易受攻击包的使用可以减少恶意模块的攻击面。
- BP2：使用`depcheck`和`npm dedupe`扫描和/或删除未使用和重复的包，因为这些依赖项可能会不必要地扩大攻击面并使软件实现变得混乱。
- BP3：使用`package-lock.json` 强制锁定依赖包版本。

### 论文分析发现
- 大多数工程师没有遵循最佳实践，因为`npm audit`报告了大量漏洞。
- 841 个中有 755 个在其最新版本中有`depcheck`报告的未使用依赖项。
- 841 个项目中有 698 个报告了重复的依赖项。 大多数项目似乎都有惊人的大量重复报告（即 17-512）。
- 548个项目在版本控制下没有`package-lock.json` 。
- 命令`npm audit fix`删除了仅55个程序中的所有脆弱依赖项，但在241个程序中保留了脆弱的依赖项。
- `npm-dedupe` 仅删除了 10 个程序中所有报告的重复项，部分删除了 467 个程序中的重复项，但保留或增加了 231 个程序中的重复项。
- 工程师关心安全性。 然而，一些工程师认为 `npm-audit` 有很多误报。
- 大多数工程师将报告的未使用依赖项视为误报或不重要的问题。
- 大多数工程师并不担心重复的依赖项。 同时，一些工程师表达了保留同一包的多个版本的必要性，以及他们对 `depcheck` 可靠性的担忧。
- 工程师并不抵触使用锁定文件，主要是因为他们不关心可重复的构建或不完全了解锁定机制。


## References
- [Vulnerability in ‘netmask’ npm Package Affects 280,000 Projects][links-1]


[paper1-url]: https://people.cs.vt.edu/nm8247/publications/mahir-secdev-2022.pdf
[links-1]: https://www.securityweek.com/vulnerability-netmask-npm-package-affects-280000-projects/