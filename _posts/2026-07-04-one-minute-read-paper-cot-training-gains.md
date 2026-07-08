---
layout: post
title:  "一分钟读论文：《Where Do CoT Training Gains Land in LLM based Agents?》"
author: unbug
categories: [AI, Research]
image: assets/images/cot-training-gains.svg
tags: [cot-training, agent-reasoning, prompt-action]
---

一篇关于CoT训练增益本质的论文[《Where Do CoT Training Gains Land in LLM based Agents?》][paper1-url]，通过系统性实验揭示了思维链（Chain of Thought, CoT）训练在大语言模型智能体中的实际作用机制。研究发现，CoT训练并未如预期那样扩大CoT推理的优势，而是帮助提高了prompt action的质量。

在智能体工作流中，模型通常需要结合推理轨迹与动作指令来完成复杂任务。传统观点认为，CoT训练主要通过增强模型的推理能力来提升最终表现。然而，该研究指出，后续checkpoint更不太可能根据CoT修订动作，这表明模型对prompt的依赖更强。换句话说，CoT训练的真正增益落在了提示词动作的质量提升上，而非推理轨迹本身的优化。

## 注意力与梯度的分布特征

为了理解这一现象，研究分析了模型在训练过程中的注意力分布和梯度流动特征。结果表明，Prompt通常比推理轨迹长得多，占用了大部分的注意力质量和梯度质量。

在大语言模型智能体中，输入序列由提示词、推理轨迹和动作指令组成。由于提示词往往包含丰富的上下文信息和任务指令，其长度显著超过后续的CoT推理部分。这种长度差异导致模型在训练时，将大部分注意力资源分配给了prompt部分。同时，梯度回传过程中，prompt相关的token也接收了主要的梯度更新信号。

因此，CoT训练虽然引入了推理轨迹，但由于注意力质量和梯度质量主要集中在prompt上，模型的最终行为更多地受到提示词质量的驱动。这也是为什么后续checkpoint更倾向于依赖prompt action，而非根据CoT推理来修订动作的原因。

## 干预方法与域外泛化提升

基于上述发现，研究提出了一种选择性掩盖部分训练样本上的action-token监督的干预方法。该方法通过有选择地忽略某些样本中的动作令牌监督信号，迫使模型更加依赖推理轨迹来生成有效的动作指令。

实验结果表明，这种干预方法显著提升了模型的域外泛化能力。在未见过的任务分布或领域场景中，经过选择性掩盖训练的模型表现出更强的适应性和鲁棒性。这是因为模型不再完全依赖于prompt action的质量，而是学会了从推理轨迹中提取关键信息来指导动作生成。

## References
- [论文原文][paper1-url]

[paper1-url]: https://arxiv.org/abs/2606.26935v1
