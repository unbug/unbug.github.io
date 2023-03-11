---
layout: post
title:  "一分钟读论文：《寻找失去的时间：浏览器中 JavaScript 定时器的综述》"
author: unbug
categories: [Security, FrontEnd]
image: assets/images/screenshot-20230311-235854.jpg
tags: [JavaScript]
---
法国的图卢兹大学、斯特拉斯堡大学和国家信息与自动化研究所（INRIA）合著的论文[《SoK: In Search of Lost Time: A Review of JavaScript Timers in Browsers》][paper1-url] 测试了不同的浏览器和操作系统下的 JavaScript 定时器的性能和精度，收集了来自**Alexa Top 1M**网站的数据，分析了它们使用 JavaScript 定时器的频率和目的。发现：JavaScript  定时器性能和精度在不同的浏览器和操作系统下有着显著的差异，`存在着许多安全隐患，可以被用来实现一些高级的攻击`。

## JavaScript 定时器的种类和特点
-   JavaScript 定时器最早出现在1995年的Netscape Navigator 2.0中，最初只有两种类型：setTimeout和setInterval，用于在指定的时间间隔后或重复地执行一段代码。
-   随着Web技术的发展， JavaScript 定时器也增加了新的类型和功能，例如requestAnimationFrame、SharedArrayBuffer、Web Workers等，用于实现更高效、更精确、更多样化地异步编程。
-   JavaScript 定时器可以根据不同地维度进行分类：
    -   定时器源：指定了执行代码地来源，可以是字符串（eval）、函数（callback）或对象（promise）；
    -   定时器目标：指定了执行代码地目标环境，可以是主线程（main thread）、辅助线程（worker thread）或共享内存区域（shared memory）；
    -   定时器模式：指定了执行代码地触发方式，可以是单次触发（one-shot）、周期性触发（periodic）或动画帧触发（animation frame）；
    -   定时器精度：指定了执行代码地时间精度，可以是毫秒级别（millisecond-level）、微秒级别（microsecond-level）或纳秒级别（nanosecond-level）；
    -   定时器可靠性：指定了执行代码地保证程度，可以是强保证（strong guarantee）、弱保证（weak guarantee）或无保证（no guarantee）。
-   JavaScript 定时器在浏览器中的实现和行为受到多种因素的影响，例如：
    -   浏览器内核：不同浏览器内核可能使用不同地算法和机制来管理和调度 JavaScript 定时器；
    -   浏览器状态：浏览器可能根据当前状态来调整 JavaScript 定时器地优先级和频率，例如是否处于后台、是否充电、是否节能等；
    -   网页上下文：网页可能根据当前上下文来控制 JavaScript 定时器地启动和停止，例如是否可见、是否激活、是否有用户交互等；
    -   网页脚本：网页脚本可能根据自身逻辑来修改或清除 JavaScript 定时器，并且可能与其他脚本产生竞争或冲突。

## JavaScript 定时器在安全领域的应用和挑战
-   JavaScript 定时器可以被用于实现多种基于时间的攻击，例如：
    -   网络侧信道攻击（network side-channel attacks）：利用 JavaScript 定时器测量网络请求或响应的时间，从而推断出敏感信息，例如用户地理位置、网络拓扑、网站内容等；
    -   处理器侧信道攻击（processor side-channel attacks）：利用 JavaScript 定时器测量处理器执行指令或访问缓存的时间，从而推断出敏感信息，例如用户设备型号、操作系统版本、加密密钥等；
    -   内存侧信道攻击（memory side-channel attacks）：利用 JavaScript 定时器测量内存分配或释放的时间，从而推断出敏感信息，例如用户输入内容、网页结构、内存布局等；
    -   其他类型的攻击（other types of attacks）：利用 JavaScript 定时器实现其他目的，例如识别用户身份、跟踪用户行为、干扰用户体验等。
-   JavaScript 定时器在安全领域也面临多种挑战和威胁，例如：
    -   隐私泄露（privacy leakage）： JavaScript 定时器可能被恶意网站或第三方脚本滥用，导致用户隐私数据被收集或泄露；
    -   资源消耗（resource consumption）： JavaScript 定时器可能被恶意网站或第三方脚本过度使用，导致用户设备资源被占用或耗尽；
    -   安全漏洞（security vulnerabilities）： JavaScript 定时器可能引发或加剧一些安全漏洞，例如跨站点请求伪造（CSRF）、跨域资源共享（CORS）、跨帧脚本（XFS）等。
-   浏览器和标准组织为了防止或减轻 JavaScript 定时器带来地风险和影响，采取了多种对策和限制，例如：
    -   降低精度（lowering precision）：通过增加噪声或舍入误差来降低 JavaScript 定时器返回地时间值地精度；
    -   增加延迟（increasing delay）：通过增加最小间隔或最大延迟来增加 JavaScript 定时器执行地时间值地延迟；
    -   减少可靠性（reducing reliability）：通过取消保证或引入随机性来减少 JavaScript 定时器执行地时间值地可靠性；
    -   禁用功能（disabling features）：通过禁止访问或移除支持来禁用某些类型地 JavaScript 定时器。

## JavaScript 定时器的性能和特性的测量方法和评估结果
-   JavaScript 定时器的性能和特性可以通过多种方法进行测量，例如：
    -   基于网页的实验（web-based experiments）：通过在网页中嵌入 JavaScript 代码来测试不同类型的 JavaScript 定时器在不同环境下的表现；
    -   基于本地的实验（local-based experiments）：通过在本地服务器或设备上运行 JavaScript 代码来测试不同类型的 JavaScript 定时器在不同环境下的表现；
    -   基于模拟的实验（simulation-based experiments）：通过在模拟器或虚拟机上运行 JavaScript 代码来测试不同类型的 JavaScript 定时器在不同环境下的表现；
    -   基于分析的实验（analysis-based experiments）：通过对 JavaScript 代码或浏览器源码进行静态或动态分析来测试不同类型地 JavaScript 定时器在不同环境下地表现。
-   JavaScript 定时器地性能和特性可以从多个方面进行评估，例如：
    -   精度（precision）：评估 JavaScript 定时器返回地时间值与真实时间值之间地差异；
    -   延迟（delay）：评估 JavaScript 定时器执行地时间值与预期时间值之间地差异；
    -   可靠性（reliability）：评估 JavaScript 定时器执行地时间值与其他因素之间地关联程度；
    -   功能性（functionality）：评估 JavaScript 定时器提供地功能是否符合预期或需求。
-   JavaScript 定时器地测量和评估结果显示了一些有趣和重要地发现，例如：
    -   不同类型、来源、版本、平台、设备、网络等因素都会影响 JavaScript 定时器地性能和特性；
    -   不同类型地 JavaScript 定时器有各自独特且复杂地行为模式，且存在一些异常或错误情况；
    -   不同类型地 JavaScript 定时器之间存在一些相互影响或竞争关系，且有一些潜在风险或漏洞；
    -   不同类型地 JavaScript 定时器对用户隐私、安全、体验等方面都有一些正面或负面影响。
-   JavaScript 定时器对浏览器和标准组织提出了一些建议和展望，例如：
    -   提高透明度（increasing transparency）：通过提供更多信息或接口来让用户了解并控制 JavaScript 定时器;
    -   提高一致性（increasing consistency）：通过统一规范或标准来让开发者更容易使用并优化 JavaScript 定时器;
    -   提高安全性（increasing security）：通过增强防御或监控来让攻击者更难利用并攻击 JavaScript 定时器;
    -   提高灵活性（increasing flexibility）：通过支持更多功能或选项来让应用场景更广泛并满足更多需求。

## JavaScript 定时器的应用和挑战
-   JavaScript 定时器在不同领域和场景中有多种应用，例如：
    -   网页性能（web performance）： JavaScript 定时器可以用来测量或优化网页的加载速度、响应时间、资源消耗等指标；
    -   网络测量（network measurement）： JavaScript 定时器可以用来测量或估计网络的延迟、带宽、拥塞、路由等参数；
    -   网络攻击（network attack）： JavaScript 定时器可以用来发起或防御网络攻击，如端口扫描、跨站请求伪造、分布式拒绝服务等；
    -   用户识别（user identification）： JavaScript 定时器可以用来识别或追踪用户的身份、行为、偏好等特征；
    -   设备指纹（device fingerprinting）： JavaScript 定时器可以用来获取或分析设备的硬件、软件、配置等信息；
    -   密码学（cryptography）： JavaScript 定时器可以用来生成或验证密码学相关的随机数、密钥、签名等数据。
-   JavaScript 定时器在不同领域和场景中也面临多种挑战，例如：
    -   可信度（trustworthiness）： JavaScript 定时器是否能够提供准确且可靠地时间值，而不受到外部或内部地干扰或操纵；
    -   兼容性（compatibility）： JavaScript 定时器是否能够在不同地浏览器或平台上保持一致且兼容地行为和功能；
    -   安全性（security）： JavaScript 定时器是否能够防止或抵抗恶意地攻击或利用，而不泄露敏感地信息或资源；
    -   可控性（controllability）： JavaScript 定时器是否能够让用户或开发者有足够地权限和选项来控制其行为和功能。
-   JavaScript 定时器对未来研究提出了一些问题和方向，例如：
    -   如何设计更高效且安全地 JavaScript 定时器API，以满足更多地需求且减少更多地风险？
    -   如何评估并比较不同类型地 JavaScript 定时器在不同环境下地性能和特性？
    -   如何利用并优化现有地 JavaScript 定时器在不同领域和场景中地应用？
    -   如何发现并解决现有地 JavaScript 定时器存在地问题和漏洞？


[paper1-url]: https://oaklandsok.github.io/papers/rokicki2021.pdf