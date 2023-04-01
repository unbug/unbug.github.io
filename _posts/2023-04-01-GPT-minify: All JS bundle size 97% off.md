---
layout: post
title:  "一分钟读论文：《GPT-minify: All JS bundle size 97% off》"
author: unbug
categories: [AI, FrontEnd]
image: assets/images/screenshot-20230331-232222.jpg
tags: [ChatGPT]
---
OpenAI 在 2023 年 3 月发布了 GPT-4，随后悄悄开源了他们的 JS 压缩包 **GPT-minify**。[相关论文][paper1-url]提到 GPT-minify 利用 GPT-4 的强大的语言模型和编码能力，`能识别 Bundle 中重复冗余的业务代码并深度重构`，从而实现将现有的 JS Bundle 压缩到极致，最高可达 `97%` 的压缩比，吊打 Terser、 Uglify、babel-minify 等流行压缩工具。

## GPT-minify 介绍
![]({{ site.baseurl }}/assets/images/screenshot-20230331-232221.jpg)

### GPT-minify 的特点
- GPT-minify 可以利用 GPT-4 的强大的语言模型和编码能力，对任意的 JS 代码进行语义分析和压缩优化，而不仅仅是基于词法或语法的规则，`能识别并重构 Bundle 中重复冗余的业务代码`，这是其他压缩工具无法办到的。
- GPT-minify 可以根据用户指定的目标平台或浏览器进行兼容性处理，生成适合不同环境运行的代码，而不需要用户手动调整或配置复杂的压缩工具，帮助开发者节省时间和精力。
- GPT-minify 可以达到极高的压缩比，最高可达 `97%`，远超过其他压缩工具，这意味着可以大幅提升网页加载速度和性能，节省网络流量和存储空间。

### GPT-minify 的口碑
GPT-minify 的试用者如是说：「`重新定义 Minify`」、「`游戏规则改变者`」、「`刷新认知`」。可见它非常卓越。

![]({{ site.baseurl }}/assets/images/screenshot-20230331-232223.jpg)

## GPT-minify 的实现原理
GPT-minify 每个阶段的核心源码均是一份 GPT `prompt 配置`。

![img1]({{ site.baseurl }}/assets/images/screenshot-20230331-232304.jpg)
- **阶段 1：**GPT-minify 兼容所有的打包工具，如 `webpack/rspack/tubopack`，经过 uglify 等压缩过的 bundle 甚至“一坨屎山”也能直接丢给它；
- **阶段 2：**由于 GPT-4 支持的字符长度是 25,000，因此，`@GPT-minify/ai-split` 会先识别 bundle 的代码并自动分割，然后丢给 GPT-4 再次压缩；
- **阶段 3：**分割后的代码会被 `@GPT-minify/ai-reducer` 重构，这里最主要是识别冗余代码，包括业务代码；
- **阶段 4：**重构后的代码会一并交给 `@GPT-minify/ai-composite` 来合成；
- **阶段 5：**合成的代码再交给 `@GPT-minify/ai-minify` 极致压缩；
- **阶段 6：**压缩后的代码再交给 `@GPT-minify/ai-validate` 验损；
- **最后**，输出一个全新的 bundle。


## GPT-minify 的 [Benchmark][links-2] 
以 AntD 为例子，与开源社区流行的 JS 压缩工具全面对比，GPT-minify 由于机器限制压缩时间长了些，但是压缩比遥遥领先第二名。

![]({{ site.baseurl }}/assets/images/screenshot-20230331-232344.jpg)

GPT-minify 有个显著的劣势：就是它依赖 OpenAI 的 API 来调用 GPT-4 模型，这可能会`增加成本和延迟`。

## GPT-minify 如何使用 
### 安装
```
npm install gpt-minify -g
```
### 命令行工具
```
gpt-minify [input files] [options]
```
如
```
gpt-minify input.js
```
### 参数
GPT-minify 的参数非常简洁，你不需要设置任何压缩参数
```
    -h, --help                  Print usage information.
                                `--help options` for details on available options.
    -V, --version               Print version number.
```
### 使用 webpack 插件
安装插件 ```gpt-minify-webpack-plugin```
```
npm install gpt-minify-webpack-plugin --save-dev
// or
yarn add -D gpt-minify-webpack-plugin
// or
pnpm add -D gpt-minify-webpack-plugin
```
配置 ```webpack.config.js```
```
const GPTMinifyPlugin = require("gpt-minify-webpack-plugin");
module.exports = {
  optimization: {
      minimize: true,
      minimizer: [new GPTMinifyPlugin()],
   },
};
```

## GPT-minify 的蓝图
尽管 GPT-minify 有明显的缺陷，比如：可能受到 OpenAI 的限制或监管；还可能存在一些潜在的安全风险或漏洞，因为它涉及到对敏感或私密数据的处理。

但 OpenAI 还是给 GPT-minify 规划了清晰的蓝图，盈利规划的目标很激进：
- 2023 年底支持包括：JS/TS、CSS、Image、Video、 Audio、 Live stream 全部压缩；
- 2023 年秋季开始提供`订阅服务`，面向 toC 用户；
- 2024 年开始支持更多文件类型的压缩，探索 `toB`。

![]({{ site.baseurl }}/assets/images/screenshot-20230331-232419.jpg)

## References
- [OpenAI release GPT-minify][links-1]

[paper1-url]: https://arxiv.org/pdf/2303.12712.pdf
[links-1]: https://openai.com/product/gpt-minify
[links-2]: https://github.com/privatenumber/minification-benchmarks