---
layout: post
title:  "一分钟读论文：《ChatGPT 提示模式：提升代码质量、重构、需求获取和软件设计》"
author: unbug
categories: [AI, Software Engineering]
image: assets/images/arxiv-paper-chatgpt-prompt-patterns.png
tags: [featured, ChatGPT, Prompt Engineering, AI]
date: 2026-02-26 02:00:00 +0800
---
范德堡大学的论文[《ChatGPT Prompt Patterns for Improving Code Quality, Refactoring, Requirements Elicitation, and Software Design》][paper1-url] 整理了 **13 种可复用的提示模式**，帮助开发者用 ChatGPT 自动化常见的软件工程任务，涵盖需求获取、系统设计、代码质量和重构四大领域。

## 核心发现

- **提示模式就像设计模式**：可以像经典软件设计模式一样被复用和适配
- **覆盖全生命周期**：从需求 → 设计 → 编码 → 重构的完整流程
- **所有模式都在 ChatGPT 上验证过**，也适用于其他大语言模型

## 13 种提示模式分类

### 1️⃣ 需求获取（Requirements Elicitation）
- **需求模拟器（Requirements Simulator）**：让 LLM 模拟需求，探索完整性
- **规格歧义消除（Specification Disambiguation）**：识别模糊的需求
- **变更请求模拟（Change Request Simulation）**：评估需求变更的影响

### 2️⃣ 系统设计与模拟（System Design & Simulation）
- **API 生成器（API Generator）**：自动生成 API 设计
- **API 模拟器（API Simulator）**：模拟 API 行为
- **少样本示例生成器（Few-shot Example Generator）**：创建训练示例
- **领域特定语言创建（DSL Creation）**：设计 DSL
- **架构可能性探索（Architectural Possibilities）**：探索不同架构方案

### 3️⃣ 代码质量（Code Quality）
- **代码聚类（Code Clustering）**：将代码按功能分组
- **中间抽象（Intermediate Abstraction）**：在高层和低层代码间建立桥梁
- **原则性代码（Principled Code）**：确保代码遵循设计原则
- **隐藏假设识别（Hidden Assumptions）**：发现代码中的隐含假设

### 4️⃣ 重构（Refactoring）
- **伪代码重构（Pseudo-code Refactoring）**：用高层指令控制重构
- **数据驱动重构（Data-guided Refactoring）**：基于数据格式变更重构

## 提示模式的通用结构

好的提示通常包含这些元素：
1. **会话范围声明**：如 "从现在起"、"扮演 X 角色"
2. **明确的任务描述**：具体要做什么
3. **输出格式要求**：期望的结果格式
4. **约束条件**：需要遵守的规则

## 实用示例

**自动生成依赖文件**：
> "从现在起，你生成的任何代码如果跨多个文件，自动生成一个 Python 脚本来创建这些文件。"

**识别代码假设**：
> "列出这段代码做的所有假设，以及在当前结构下改变每个假设的难度。"

**伪代码重构**：
> 1. 重构这段代码
> 2. 让输入/输出/存储数据格式变为 X
> 3. 提供 X 的 1-2 个示例


[paper1-url]: https://arxiv.org/abs/2303.07839
