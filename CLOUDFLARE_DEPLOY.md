# 学考合一 - Cloudflare Pages 部署指南

## 🚀 快速部署（推荐：直接上传）

### 方式一：直接上传（最简单，无需 Git）

#### 第 1 步：打开 Cloudflare Pages
访问：https://pages.cloudflare.com

#### 第 2 步：注册/登录
- 免费注册 Cloudflare 账号
- 使用邮箱注册即可

#### 第 3 步：创建项目
1. 点击 **"Create a project"**
2. 选择 **"Direct Upload"**（直接上传）

#### 第 4 步：上传文件夹
1. 找到项目文件夹：`d:\me\dist`
2. 将整个 `dist` 文件夹拖拽到上传区域
3. 输入项目名称：`xuekao`（或其他名字）
4. 点击 **"Deploy Site"**

#### 第 5 步：完成！
- 等待 1-2 分钟
- 获得访问地址：`https://xuekao.pages.dev`

---

### 方式二：GitHub 自动部署（推荐用于持续更新）

#### 第 1 步：安装 Git
下载并安装：https://git-scm.com/download/win

#### 第 2 步：初始化 Git 仓库
```bash
cd d:\me

# 初始化 Git
git init
git add .
git commit -m "Initial commit - 学考合一"
```

#### 第 3 步：创建 GitHub 仓库
1. 访问：https://github.com/new
2. 仓库名称：`xuekao-website`
3. 选择 Public 或 Private
4. 点击 **"Create repository"**

#### 第 4 步：推送代码到 GitHub
```bash
# 替换 YOUR_USERNAME 为您的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/xuekao-website.git
git push -u origin main
```

#### 第 5 步：连接到 Cloudflare Pages
1. 访问：https://pages.cloudflare.com
2. 点击 **"Create a project"** → **"Connect to Git"**
3. 选择 GitHub，授权 Cloudflare 访问您的仓库
4. 选择刚创建的仓库 `xuekao-website`

#### 第 6 步：配置构建
在 Cloudflare Pages 配置页面：
- **Project name**: `xuekao`
- **Framework preset**: `None`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

#### 第 7 步：部署！
点击 **"Save and Deploy"**

---

## 📋 部署前检查清单

- [ ] `npm run build` 成功运行
- [ ] `dist` 文件夹已生成
- [ ] 访问 https://pages.cloudflare.com
- [ ] 选择部署方式（直接上传 或 GitHub）

---

## 🔄 更新网站

### 方式一：直接上传（手动更新）
1. 修改代码
2. 运行 `npm run build`
3. 在 Cloudflare Pages 项目页面点击 "Create a new deployment"
4. 重新上传 `dist` 文件夹

### 方式二：GitHub 自动部署（推荐）
```bash
# 修改代码后
git add .
git commit -m "Update content"
git push origin main
# Cloudflare Pages 自动检测并重新部署
```

---

## 🌐 自定义域名（可选）

### 添加自定义域名
1. 在 Cloudflare Pages 项目页面 → **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入您的域名（如：xuekao.com）
4. 按照 Cloudflare 指引配置 DNS

### DNS 配置
Cloudflare 会提供 DNS 记录配置指引，通常是：
```
CNAME    xuekao.com    xuekao.pages.dev
```

---

## 🎯 为什么选择 Cloudflare Pages？

| 特性 | Cloudflare Pages | Vercel |
|------|-----------------|--------|
| 国内访问速度 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 费用 | 免费 | 免费 |
| 备案要求 | 不需要 | 不需要 |
| 全球 CDN | ✅ | ✅ |
| 自动 HTTPS | ✅ | ✅ |
| GitHub 集成 | ✅ | ✅ |

---

## 📞 获取帮助

- Cloudflare Pages 文档：https://developers.cloudflare.com/pages
- Cloudflare 支持：https://community.cloudflare.com

---

## 🎉 快速开始

**推荐方式：直接上传**
1. 双击运行 `deploy-cloudflare.bat`
2. 访问 https://pages.cloudflare.com
3. 拖拽 `dist` 文件夹
4. 完成！

祝部署顺利！🚀
