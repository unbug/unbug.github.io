---
layout: post
title: "Vision-DeepResearch：首个长时序多模态深度研究模型，8B 参数干翻 GPT-5"
date: 2026-03-01 01:50:00 +0800
categories: research
tags: [multimodal, deep-research, vision-language, mllm, ai]
image: assets/images/vision-deepresearch-architecture.svg
---

![Vision-DeepResearch 架构图](/images/vision-deepresearch-architecture.svg)

# Vision-DeepResearch：首个长时序多模态深度研究模型，8B 参数干翻 GPT-5

## 重磅新闻：开源模型再下一城！

2026 年 1 月，AI 圈又炸了！来自多个研究机构的团队发布了 **Vision-DeepResearch**，这是**首个长时序多模态深度研究模型**，能够执行数十轮推理和数百次搜索引擎交互。

更牛逼的是，这个只有 8B 参数的开源模型，在多个基准测试中直接干翻了 GPT-5、Gemini-2.5 Pro 和 Claude-4-Sonnet 等顶级闭源模型！

## 背景：之前的模型都弱爆了

现有的多模态深度研究工作主要采用"推理-然后-工具调用"范式（ReAct），但存在以下局限性：

1. **推理轮次有限**：无法处理需要深度研究的复杂任务
2. **搜索能力单一**：缺乏多尺度、多实体的视觉和文本搜索能力
3. **端到端能力弱**：深度研究能力没有内化为模型自身能力

简单说就是：之前的模型都像个实习生，给他个复杂任务，他查两下就放弃了。

## Vision-DeepResearch：真正的研究助理

Vision-DeepResearch 提出了一种全新的多模态深度研究范式：

- **多轮推理**：支持数十轮推理步骤（像真正的研究员一样深入思考）
- **多实体搜索**：同时处理多个实体的查询（同时查好几个人物、地点）
- **多尺度视觉搜索**：支持图像裁剪、图像搜索等多种视觉操作（放大看细节，缩小看整体）
- **数百次引擎交互**：能够与真实搜索引擎进行数百次交互（不厌其烦地查资料）

### 两步训练策略：把研究能力刻进 DNA

通过创新的训练方法将深度研究能力内化为模型自身能力：

1. **冷启动监督训练（SFT）**：使用高质量的 VQA 实例和多轮轨迹进行监督微调
2. **强化学习训练（RL）**：通过强化学习进一步优化模型的深度研究能力

简单说就是：先看优秀研究员怎么做（SFT），然后自己不断练习变得更好（RL）。

## 技术架构：四大工具在手

Vision-DeepResearch 支持多种工具：

1. **多尺度图像裁剪**：对图像进行不同尺度的裁剪分析
2. **图像搜索**：使用视觉搜索引擎搜索相关图像
3. **文本搜索**：使用文本搜索引擎查询信息
4. **网页浏览**：获取和总结网页内容

### 推理流程

```
推理 → 工具调用 → 观察整合 → 下一步推理 → ... → 最终答案
```

就像真正的研究员：先思考要查什么，然后查资料，整理信息，再思考下一步查什么，最后给出答案。

## 实验结果：8B 干翻 GPT-5，服不服？

### 综合性能对比

| 模型 | VDR | FVQA | MMSearch+ | MMSearch | LiveVQA | BC-VL | 平均 |
|-----|-----|------|-----------|----------|---------|-------|------|
| GPT-5 (直接回答) | 9.8 | 57.3 | 19.1 | 33.3 | 57.5 | 47.2 | 37.4 |
| Gemini-2.5 Pro (直接回答) | 8.0 | 60.7 | 14.5 | 39.8 | 60.3 | 43.1 | 37.7 |
| Claude-4-Sonnet (直接回答) | 2.0 | 35.3 | 4.0 | 18.7 | 38.5 | 29.3 | 21.3 |
| GPT-5 (智能体工作流) | 20.4 | 69.0 | 17.2 | 63.7 | 73.3 | 46.1 | 48.3 |
| Gemini-2.5 Pro (智能体工作流) | 18.8 | 68.3 | 22.2 | 69.0 | 76.0 | 49.9 | 50.7 |
| **Vision-DeepResearch-8B** | **29.2** | **64.7** | **20.4** | **69.6** | **76.7** | **42.6** | **50.5** |
| **Vision-DeepResearch-30B-A3B** | **37.8** | **74.2** | **28.5** | **69.6** | **77.6** | **53.7** | **56.9** |

### 性能提升亮点

**Vision-DeepResearch-8B 对比基础模型：**
- VDR：+12.2 分（从 17.0 → 29.2）
- MMSearch：+17.6 分（从 52.0 → 69.6）
- LiveVQA：+13.7 分（从 63.0 → 76.7）
- 平均：+10.4 分（从 40.1 → 50.5）

**Vision-DeepResearch-30B-A3B 对比基础模型：**
- VDR：+17.6 分（从 20.2 → 37.8）
- FVQA：+16.5 分（从 57.7 → 74.2）
- MMSearch+：+18.5 分（从 10.0 → 28.5）
- 平均：+16.0 分（从 40.9 → 56.9）

### 关键发现

> "Vision-DeepResearch 显著超越了现有的多模态深度研究 MLLM，以及基于强大闭源基础模型（如 GPT-5、Gemini-2.5 Pro 和 Claude-4-Sonnet）构建的工作流。"

翻译成人话就是：我们的开源模型，比那些大厂的闭源模型还牛逼！

## VDR-Bench：专门的测试基准

为了评估多模态深度研究能力，团队同时发布了 **VDR-Bench**（Vision-DeepResearch Benchmark），重新思考了多模态大型语言模型的视觉和文本搜索。

VDR-Bench 的特点：
- 重新思考视觉和文本搜索
- 支持多尺度、多实体的搜索评估
- 包含全面的测试用例

## 开源资源：全部开放，拿去用！

### 已发布资源

- ✅ **代码**：SFT 代码、RL 代码（2026-02-03 发布）
- ✅ **数据集**：
  - Cold-start Dataset (demo)
  - RL Dataset (demo)
  - VDR-Bench (full)
  - VDR-Bench (testmini)
- ✅ **模型权重**：
  - Vision-DeepResearch-8B (SFT-only)
  - Vision-DeepResearch-30B-A3B (SFT+RL，即将发布)

### GitHub 仓库

- **地址**：https://github.com/Osilly/Vision-DeepResearch
- **Star**：377+（截至 2026-03-01）
- **Fork**：38+

## 核心贡献：三个第一

### 1. 首个长时序多模态深度研究 MLLM

> "我们提出了首个长时序多模态深度研究 MLLM，引入了多轮、多实体和多尺度的视觉/文本搜索，并扩展到数十轮推理步骤和数百次搜索引擎交互。"

### 2. 深度研究能力内化

通过冷启动监督和强化学习训练，将深度研究能力内化为 MLLM 自身能力，而不是简单的外部工具调用。

### 3. 超越顶级闭源模型

在多个基准测试中，Vision-DeepResearch 不仅超越了现有多模态深度研究 MLLM，还超越了基于 GPT-5、Gemini-2.5 Pro 和 Claude-4-Sonnet 等强大闭源基础模型构建的工作流。

## 应用场景：真正的智能助手

### 1. 多模态深度研究

- 需要深入研究的复杂视觉问答任务
- 跨多个实体的信息收集和综合
- 长期推理链的多模态问题解决

### 2. 智能信息检索

- 结合视觉和文本的混合搜索
- 多步推理的信息获取
- 自动化研究助手

### 3. 真实世界应用

- 需要深度调查的场景
- 多源信息整合
- 复杂决策支持

## 总结：开源万岁！

Vision-DeepResearch 代表了多模态大型语言模型领域的重大进步。其关键贡献包括：

1. ✅ **首个长时序多模态深度研究 MLLM**：支持数十轮推理和数百次搜索引擎交互
2. ✅ **创新的训练策略**：冷启动监督 + 强化学习，内化深度研究能力
3. ✅ **全面超越顶级闭源模型**：在多个基准测试中超越 GPT-5、Gemini-2.5 Pro 和 Claude-4-Sonnet
4. ✅ **完整的开源生态**：代码、数据集、模型权重全部开源
5. ✅ **配套基准测试**：VDR-Bench 重新定义多模态搜索评估标准

Vision-DeepResearch 的成功展示了将深度研究能力内化为多模态模型自身能力的巨大潜力，为未来的智能信息检索和自动化研究助手开辟了新的可能性。

最重要的是：**它是开源的！** 这意味着我们都可以用它来构建自己的智能研究助理，而不用依赖大厂的闭源 API。

---

## 参考来源

1. Huang, W., Zeng, Y., Wang, Q., et al. (2026). Vision-DeepResearch: Incentivizing DeepResearch Capability in Multimodal Large Language Models. arXiv:2601.22060.

2. Zeng, Y., Huang, W., Fang, Z., et al. (2026). Vision-DeepResearch Benchmark: Rethinking Visual and Textual Search for Multimodal Large Language Models. arXiv:2602.02185.

3. GitHub. Osilly/Vision-DeepResearch. https://github.com/Osilly/Vision-DeepResearch

4. Hugging Face. Vision-DeepResearch. https://huggingface.co/Osilly/Vision-DeepResearch-8B

5. Project Page. https://osilly.github.io/Vision-DeepResearch/
