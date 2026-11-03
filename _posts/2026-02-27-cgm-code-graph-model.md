---
layout: post
title:  "一分钟读论文：《让AI像程序员一样理解整个代码库》"
author: unbug
categories: [AI, Engineering]
image: assets/images/cgm-code-graph-model.svg
tags: [Code Generation, NeurIPS 2025, Code Understanding, Open Source Models]
description: "蚂蚁集团在NeurIPS 2025提出Code Graph Model，把代码库建模为文件、函数、类构成的调用关系图并融入注意力机制，SWE-bench Lite解决率达43.00%，位列开源权重模型第一名，代码模型数据全部开源。"
---

蚂蚁集团研究团队在 NeurIPS 2025 发表的论文[《Code Graph Model》][paper1-url]提出 CGM，把整个代码库建模为文件、函数、类构成的调用关系图并融入模型注意力机制，在 SWE-bench Lite 上取得 `43.00%` 解决率，位列开源权重模型第 `1` 名。理解问题、找到相关文件、梳理函数调用关系、修改代码，这类仓库级软件工程任务由此有了不依赖闭源模型和复杂 Agent 系统的开源方案。

## 代码图与 R4 链

**代码图**把代码库表示成一张地图：节点是文件、函数、类，边是调用、继承、导入等关系。例如文件 A 里的函数 X 调用了文件 B 里的函数 Y，两者之间就有一条调用关系的边，整个代码库的结构由此清晰呈现。

CGM 采用名为 **R4 链**的四步流水线：

```
问题 → Rewriter（重写）→ Retriever（检索）→ Reranker（重排）→ Reader（生成）→ 代码补丁
```

- **Rewriter**：分提取器和推理器两个阶段，从问题描述中找出相关文件、类、函数并生成搜索查询。例如问题是"用户登录时出现空指针异常"，就会定位到 `auth.py`、`user.py` 和 `login()`、`validate_user()` 等目标
- **Retriever**：以锚点节点（如 `login()` 函数）为中心扩展出连通子图，包含调用它和被它调用的所有相关函数与文件，序列化为 JSON，让 AI 看到完整上下文而非孤立代码片段
- **Reranker**：给候选文件打 `1-5` 分，`1` 分几乎肯定无关，`5` 分很可能是根本原因，把注意力集中到最关键的文件上
- **Reader**：生成最终代码补丁。它不只把代码图当文本喂给 AI，而是语义集成加结构集成，把图的结构信息直接集成进 LLM 的注意力机制，让模型生成代码时知道改这里要考虑那里的影响

## 基准表现与三大创新

CGM 在 SWE-bench Lite 上解决率 `43.00%`，开源权重模型第 `1` 名，在所有系统方法中排名第 `8`，比之前最佳开源模型高 `12.33%`；迭代版本 CGM-72B-V1.1 为 `41.67%`、V1.2 达 `44.00%`。在规模更大的 SWE-bench Verified 上，CGM 同样位居开源权重模型第 `1`。

它的创新集中在三点：

- **无需 Agent**：不依赖多 AI 角色配合的复杂 Agent 系统，只让模型理解代码结构，开源模型也能做好
- **真正理解代码图**：通过图感知注意力机制直接理解图结构，而非把图当文本输入
- **完整开源**：代码、模型、数据全部公开，见 [GitHub 仓库][ref1]与 [Hugging Face 模型页][ref2]，支持 Python 和 Java

## 开源工程模型的意义

这篇论文证明复杂的软件工程任务不一定需要闭源模型和复杂 Agent 系统：小公司不必依赖昂贵的闭源服务，代码隐私可以得到更好保护，社区可以共同改进模型。对开发者的启示是：不要只看单个函数而要理解整个项目架构，图结构能帮助 AI 更好地理解代码库，重写、检索、重排、生成的 R4 流程值得借鉴。同类工作可参考站内[《让AI像程序员一样边写代码边调试》]({{ site.baseurl }}/execution-guided-code-generation/)，同样聚焦让模型在真实代码结构上可靠工作。


## References
- [论文 Code Graph Model][paper1-url]
- [GitHub 仓库][ref1]
- [Hugging Face 模型][ref2]


[paper1-url]: https://arxiv.org/abs/2505.16901
[ref1]: https://github.com/codefuse-ai/CodeFuse-CGM
[ref2]: https://huggingface.co/codefuse-ai/CodeFuse-CGM-72B
