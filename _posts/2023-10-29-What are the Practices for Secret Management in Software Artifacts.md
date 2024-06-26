---
layout: post
title:  "一分钟读论文：《软件工程管理密码有哪些最佳实践？》"
author: unbug
categories: [Secturity]
image: assets/images/screenshot-20230214-001720.jpg
tags: [featured, Secret]
---
硬编码凭证被 CWE 确定为最危险的 `TOP25` 软件弱点之一，而 GitHub 公开的 Repo 中有超过`600万`个公开的密码（数据库凭证、API 密钥和其他凭证）。美国北卡罗来纳州立大学的论文[《What are the Practices for Secret Management in Software Artifacts?》][paper1-url]确定了 `24` 种管理密码的最佳实践。发现：`本地环境变量`、`外部密码管理服务`、`使用版本控制系统扫描工具`和`使用临时密码`能有效避免意外提交密码和限制密码暴露。

## 对源代码 (OSC) 保密的做法
- `OSC-1：使用本地环境变量。`本地环境变量是在应用程序外部定义的动态对象，用于避免将密码存储在 VCS 或配置 (config) 文件中，是实践者力荐的。
- `OSC-2：将密码移动到配置文件。`使用模板配置文件可以减少将密码签入 VCS 的机会，从而防止潜在的密码泄露。
- `OSC-3：忽略敏感文件。`为避免提交敏感文件，所有数据库都应包含一个 `.gitignore` 文件
- `OSC-4：为客户端应用程序添加服务器端实现。`为了避免在客户端应用程序中获取保密数据，服务端将使用适当的加密并为客户端获取数据，从而消除了在客户端应用程序中保存密码的必要性。

## 安全存储密码 (SSC) 的实践
- `SSC-1：使用外部密码管理系统。`管理密码的实践中`最推荐的方案`，外部密码管理系统最大限度地减少人工参与创建、分发和维护密码。这些系统可以根据开发人员所在的团队分配权限，可使开发人员的密码失效，可设置动态密码，可设置基于租约的密码管理。例如 HashiCorp Vault, AWS KMS 和 Knox。
- `SSC-2：存储加密的密码。`使用加密工具的好处是实施不需要额外的基础设施，`避免对密码进行 Base64 编码`，必须安全地管理加密密钥（远离 VCS）并且`不用基于角色的机密访问控制`。
- ` SSC-3：私有数据库不安全。`由于数据库可以克隆到新机器上，因此数据库历史中存在的密码将传播到克隆的数据库。只有一个被破坏的开发者帐户或一个错误的配置就足以访问私有数据库中存在的所有密码。

## 限制密码泄露的做法 (LSE)
- `LSE-1：使用临时密码。`临时密码可以通过终止访问来防止以前未被发现的数据泄露成为威胁，需要正确轮换和重新分配密码。
- `LSE-2：限制 API 访问和权限。`还应设置 API 密钥使用的每日限制。因为攻击者经常在他们的范围内使用密码，所以检测他们何时恶意地这样做可能具有挑战性。通过限制对密码的访问和许可来限制损害和横向移动。
- `LSE-3：撤销机密并清理 VCS 历史记录。`密码不会通过在另一次提交中删除它们而被完全删除，因为密码将保留在 VCS 历史记录中。最佳做法是在使用工具扫描 VCS 历史记录之前关闭所有拉取请求。GitHub 建议使用 `git rebase` 因为合并可以引入一些受污染的历史。
- `LSE-4：审核所有上传到 VCS 的代码并查看 VCS 审核日志以查找可疑活动。`

## 避免意外密码提交 (ASC) 的做法
- `Asc-1：使用 VCS 扫描工具。`不建议依赖代码审查来检测密码，建议运行 VCS 扫描工具，将 VCS 扫描工具与持续集成或持续部署，例如 TruffleHog、Gitrob 和 git-all-secrets。
- `ASC-2：显式添加文件。`在 VCS 显式添加文件，应避免使用通配符命令 (`git add -A, git add ., add *`) 。
- `ASC-3：在提交之前使用 VCS 钩子检查文件。`为了防止密码被推送到 VCS 数据库中，建议使用 VCS 在特定操作之前或之后执行脚本。钩子可用于在提交之前或拉取之后分别过滤和涂抹密码，每个开发者都需要单独设置 VCS 钩子。

## 管理部署中密码的实践 (MSD)
- `MSD-1：在 CI/CD 中使用密码变量。`从 CI/CD 脚本中删除硬编码的密码，并使用构建/部署系统的密码变量。
- `MSD-2：使用配置管理系统。`不同机器的配置由配置管理系统 (CMS) 工具从一个集中位置进行协调，可以使用确保每台机器接收正确配置的相同机制将密码分发到特定机器。
- `Msd-3：为每个环境使用不同的密码。`避免在多个环境中使用相同的密码，这样暴露一个环境的密码就不会危及其他环境。生产环境的密码应该不同于开发或预生产环境。将生产环境的密码仅限于一小部分所有者，以避免失败的风险。
- `MSD-4：将点文件保存在根目录之外。`在部署过程中将点文件（例如 `.git, .gitignore, .config`）移出根目录。应该对`生产服务器上的点文件应用适当的访问限制`，以避免泄露密码。如果`.git`文件夹没有保存在根目录之外，那么提交更改的整个历史就会暴露给攻击者。

## 执行密码保护政策 (OEP) 的组织实践
组织可以采用一般做法在 VCS 中为开发人员实施政策。这些一般做法可以最大限度地减少漏洞，从而有助于避免泄露密码。
- `OEP-1：严格管理开发者权限。`组织应遵循最小特权原则。组织不应授予开发人员超出所需范围的权限，例如更改数据库可见性和添加外部贡献者。如果数据库包含密码，则有权更改数据库可见性的开发人员越多，失败的风险就越高。
- `OEP-2：强制执行 2FA 身份验证。`为了防止通过不安全的开发者帐户泄露源代码，建议强制执行 2FA 身份验证。
- `OEP-3：需要提交签名。`恶意用户可以通过伪装成其他人将可利用代码推送到 VCS 中，并通过更改 VCS 中的用户名和电子邮件地址来保持无法追踪。对于代码合并的验证和可追溯性，可以使用提交签名，这是一种密码代码签名技术。提交签名是通过 GPG 完成的，签名的提交会获得一个“已验证”标志。恶意用户的提交很容易被追踪，因为提交不会有“已验证”标志。
- `OEP-4：添加 Security.md 文件。`添加 `Security.md` 以正式记录与安全相关的过程和程序，例如令牌可访问性、身份验证要求和漏洞报告。这安全 `Security.md` 可以作为开发人员的有用参考，也可以作为组织安全期望的集中空间。
- `OEP-5：实现单点登录。`可以通过利用 SAML SSO 明确提供对资源的权限来管理对 VCS 资源（例如特定数据库和拉取请求）的访问。SAML SSO 还允许设置经批准的身份提供者，这使组织能够强制开发人员使用组织的帐户而不是私人拥有的 VCS 帐户进行登录。
- `OEP-6：禁用 Fork。`Git Fork 功能允许开发人员复制数据库，并且对测试和沙盒很有用。Fork 可以向公众泄露密码。每一次 Fork，风险都会呈指数增长，从而导致一系列安全漏洞。


[paper1-url]: https://arxiv.org/pdf/2208.11280.pdf