---
layout: post
title:  "一分钟读论文：《Chrome 〈!DOCTYPE aigc〉: 你的网页何必是 HTML》"
author: unbug
categories: [AI, FrontEnd]
image: assets/images/screenshot-20240308-113527.jpg
tags: [ChatGPT, Gemini]
---
前端开发即将成为历史，Google Gemini Team、Google Chrome Team、Google Cloud Team 和 Google Chromebook Team 合著的论文[《Chrome `<!DOCTYPE aigc>`: Your next web page is not HTML》][paper1-url] 提出了通过大模型零成本发布网页的设计方案。论文中提到 Chrome 在实验一个功能，你的网页内容只需使用人类语言编写提示词，当用户浏览你的网站时，Chrome 会根据大模型自动生成网页内容。

你只需将 HTML 文档类型声明 `<!DOCTYPE HTML>` 替换为 `<!DOCTYPE aigc>`，主体内容则是你网页的提示词，例如，“一个类 YouTube 的网站，展示搞笑的猫短视频”。

如果你购买了下一代搭载了 Google 自研 AI 芯片的 Google Chromebooks，你的用户甚至可以在`无需联网`的情况下访问你的网址，即刻浏览由 Google 强大的多模态大模型 Gemini 生成的网页内容。

与此同时 OpenAI 也在测试同样功能的 React 组件 [`<OpenAIView>`][links-1]，两者的目标都是让自家的大模型接管网页开发和内容生成。从论文内容来看 Google Chrome `<!DOCTYPE aigc>` 功能更强大些，以下来看看两者的差异性：

## **实现原理**

Google Chrome `<!DOCTYPE aigc>` 基于 Google Gemini 大模型生成内容，WebSocket 加载，以 Chrome 作为渲染载体。
![]({{ site.baseurl }}/assets/images/screenshot-20240308-113527.jpg)

**例子**


```html
<!DOCTYPE aigc>
Show me a YouTube-like website
 that shows short funny cat videos.

```

OpenAI 的 React 组件 `<OpenAIView>` 基于 OpenAI 的大模型生成内容，微前端加载，以 React 作为渲染容器。

**例子**


```js
//...
export default function MyApp() {
  return (
    <OpenAIView>
    Show me a YouTube-like website 
    that shows short funny cat videos.
     </OpenAIView>
  );
}
```

## **内容生成**

Google Chrome `<!DOCTYPE aigc>`：

- 文本、图片、视频、动画等 HTML 网页元素 100%支持；
- `支持可交互游戏`，通过  Canvas+WebGL+WASM 实现；
- `支持动态更新`，按需更新网页中的模块；
- 支持 `Single Source of Truth`，严格根据提供的在线数据 API 解析并生成内容；

OpenAI 的 React 组件 `<OpenAIView>`：

- 文本、图片、视频等 React 组件生态支持的元素；
- 不支持可交互游戏；
- 不支持动态更新；
- 不支持 Single Source of Truth；

## **可用性**

Google Chrome `<!DOCTYPE aigc>`：

- 支持跨平台，`但仅限于 Chrome，不兼容其他浏览器`；
- 装备 Google AI 芯片的 Chromebook `支持离线浏览`；
- `全球可用`；

OpenAI 的 React 组件 `<OpenAIView>`：

- 支持跨平台，`兼容任何浏览器`；
- 不支持离线；
- 仅欧美地区；

## **安全性**

Google Chrome `<!DOCTYPE aigc>`：

- `支持加密`，通过加密提示词防止他人盗用，Chrome 会校验提示词的加密 hash 与域名的匹配，保证你的网站内容总是独一无二的。
- `支持隐私策略`，用户浏览的内容都是无法追踪的；

OpenAI 的 React 组件 `<OpenAIView>`：

- 不支持加密；
- 不支持隐私策略；

## References
- [OpenAI React component playground][links-1]


[paper1-url]: https://arxiv.org/pdf/2312.11805.pdf
[links-1]: https://platform.openai.com/playground