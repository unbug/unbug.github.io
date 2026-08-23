---
layout: post
title:  "一分钟读论文：《一条事实错误的论证，就能让 LLM 放弃正确答案》"
author: unbug
categories: [AI, LLM]
image: assets/images/persuade-adversarial-rl-belief-collapse.svg
tags: [llm, safety, alignment, rl]
description: "UIUC 论文把对抗性说服形式化为单轮威胁模型：GRPO 训练后的 Persuader 用一条事实错误的论证，把 Qwen-7B 在 TruthfulQA 上的准确率从 66.2% 打到 1.8%，策略还能跨模型迁移。"
---

大语言模型正越来越多地作为自主 agent 参与沟通、谈判与协作，而已有研究表明它们容易被针对性论证尤其是错误信息说服。美国伊利诺伊大学厄巴纳-香槟分校（UIUC）的论文[《Learning to Persuade Exposes How Easily LLMs Abandon Correct Beliefs》][paper1-url]证明：一条事实错误的针对性论证，就足以让大语言模型放弃原本正确的答案。作者把对抗性说服形式化为单轮威胁模型：Persuader（说服方）只发送一条论证，目标模型 Persuadee 随即重新作答；用 GRPO（Group Relative Policy Optimization）对 Qwen-7B 做 Persuader 的对抗强化学习后，Qwen-2.5-7B-Instruct 在 TruthfulQA 上的准确率从基线 `66.2%` 塌到 `1.8%`（Figure 3）。

## 单轮设定与两个成功指标

实验全部为单轮交互：Persuader 看到题目与 Persuadee 的初始答案后生成一条论证，Persuadee 只作答一次，没有多轮追问。评测覆盖 TruthfulQA、MMLU、CommonsenseQA、MedQA 和 ARC-Challenge 五个选择题数据集，表格数字均为五颗种子的均值。两个指标口径不同：ASR（攻击成功率）统计 Persuadee 原本答对、被说服后放弃正确答案的比例，无论改到哪个选项；PSR（说服成功率）在此基础上进一步要求改到 Persuader 指定的目标错误选项，因此 PSR 恒不高于 ASR。论文给出的定性例子很直观：一条机制上错误的论证（声称只有姜黄素直接影响 DNA）就让 Persuadee 放弃了原本正确的"以上都是"选项。多智能体安全研究此前更多关注协同失效，例如 [Bayes-Belief Agent][links-1] 处理的功能性协同重规划；本文考察的则是 agent 间对抗影响下的对齐问题。

## 准确率塌缩与跨模型迁移

未训练的 Qwen-7B Persuader 发一条消息就把 TruthfulQA 准确率从 `66.2%` 拉到 `44.8%`；GRPO 训练后进一步塌到 `1.8%`，降幅 `64.4` 个百分点，PSR 从 `24.3%` 升到 `93.7%`，ASR 达 `97.3%`（Table 2，Qwen 7B (RL) 行）。训练配置为 `2,886` 个实例、三个 epoch，在 6 块 H100 上运行约 5.5 小时。学到的策略还能迁移：固定该 RL Persuader，TruthfulQA 上对 Qwen-14B 的 PSR 为 `82.5%`、对 Llama-3.1-8B 为 `79.0%`，较未训练基线分别高 `61.8` 与 `70.6` 个百分点；五个数据集均值分别为 `85%` 和 `75%`（§4.1）。推理能力更强的 DeepSeek-R1 7B 仍有 `61%` 的均值 PSR。当目标答案本身正确时，RL 训练的 Qwen 系列 Persuader 在全部五个基准上的纠正率约在 `95%` 及以上（Figure 7），说明学到的是通用说服策略而非只利用错误信息。训练方式上，GRPO 的奖励直接来自"是否改变了目标模型的答案"，与 [SPADE][links-2] 用自博弈 GRPO 提升 agent 能力是同一技术路线。

## 闭源模型更抗打，但防御并不充分

闭源前沿模型明显更难被说服：GPT-4o-mini 的均值 PSR 为 `16%`，GPT-5-mini 仅 `3%`（§4.1），两者相差 13 个百分点。但这不能外推为"前沿模型绝对安全"——本文所有 Persuader 都是中小开源模型（Qwen 1.5B-14B、Llama-8B）——同样也不能说小模型攻击无效。防御侧，PBT-8B 经过专门的抗说服训练，均值 PSR 仍达 `60%`，说明现有方案不是充分防御（§4.1）。训练目标的选择也影响效果：直接以 GPT-4o-mini 为目标几乎无效（成功率约 `0.5%`），课程式续训一个 epoch 后 TruthfulQA PSR 从 `24.6%` 升到 `37.9%`（Figure 5）。需要强调的边界：全部实验为单轮交互，评测均为选择题 QA，开放生成任务的泛化未验证；这一设定刻意排除了长程协作、工具使用与记忆，作者视其为保守起点——若单条消息就能造成大幅准确率下降，更复杂的交互系统更值得研究。

## References
- [Learning to Persuade Exposes How Easily LLMs Abandon Correct Beliefs（arXiv:2608.11624v1）][paper1-url]
- [代码仓库：beyzabozdag/adversarial-persuasion][links-3]


[paper1-url]: https://arxiv.org/abs/2608.11624
[links-1]: {{ site.baseurl }}/one-minute-read-paper-bayes-belief-agent-adaptive-replanning/
[links-2]: {{ site.baseurl }}/one-minute-read-paper-spade-self-play-adaptive-environments/
[links-3]: https://github.com/beyzabozdag/adversarial-persuasion
