# 学考合一 - Vercel 部署指南

## 🚀 快速开始

### 方式一：使用 GitHub 自动化部署（推荐）

#### 第一步：安装 Git
下载并安装 Git：https://git-scm.com/download/win

#### 第二步：初始化 Git 仓库
```bash
# 打开终端，进入项目目录
cd d:\me

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - 学考合一网站"
```

#### 第三步：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名称：`xuekao-website`
3. 选择 "Private"（私有）或 "Public"（公开）
4. 点击 "Create repository"

#### 第四步：推送代码到 GitHub
```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/xuekao-website.git

# 推送代码
git push -u origin main
```

#### 第五步：连接到 Vercel
1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择刚创建的 GitHub 仓库 `xuekao-website`
4. Vercel 会自动检测配置（使用 vercel.json）
5. 点击 "Deploy"

#### 第六步：等待部署完成
- 预计时间：1-3 分钟
- Vercel 会自动构建和部署

#### 第七步：获取访问地址
- 部署完成后，Vercel 会提供访问地址
- 格式：`https://xuekao-website.vercel.app`
- 或您绑定的自定义域名

---

### 方式二：使用 Vercel CLI（命令行部署）

#### 第一步：安装 Vercel CLI
以管理员身份打开 PowerShell：
```powershell
npm install -g vercel --force
```

#### 第二步：登录 Vercel
```bash
vercel login
```
按提示输入邮箱登录

#### 第三步：部署到预览环境
```bash
# 在项目目录运行
cd d:\me
vercel
```

#### 第四步：部署到生产环境
```bash
vercel --prod
```

---

### 方式三：手动拖拽部署（最简单）

#### 第一步：构建生产版本
```bash
cd d:\me
npm run build
```

#### 第二步：访问 Vercel 拖拽页面
访问：https://vercel.com/new

#### 第三步：拖拽部署
1. 在 Vercel 页面选择 "Deploy Static Site"
2. 打开文件资源管理器
3. 进入 `d:\me\dist` 文件夹
4. 将整个 `dist` 文件夹拖拽到 Vercel 网页上

#### 第四步：等待部署完成
- 预计时间：10-30 秒
- Vercel 会生成访问地址

---

## 📋 部署前检查清单

- [ ] 已安装 Git（方式一）
- [ ] 已创建 GitHub 账号（方式一）
- [ ] 已构建生产版本：`npm run build` 成功
- [ ] 已配置 vercel.json
- [ ] dist 文件夹已生成

## 🔧 vercel.json 配置

项目已配置 `vercel.json`，内容如下：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🌐 自定义域名（可选）

### 在 Vercel 中配置
1. 进入项目 → Settings → Domains
2. 输入您的域名：`xuekao.com`
3. Vercel 会显示 DNS 配置指导

### DNS 配置
根据 Vercel 提供的指导配置 DNS：

```
记录类型    名称    值
A           @      76.76.21.21
CNAME       www    cname.vercel-dns.com
```

## 🔄 更新网站

### 方式一：GitHub 自动部署
```bash
# 修改代码后
git add .
git commit -m "Update content"
git push origin main
# Vercel 自动检测并重新部署
```

### 方式二：手动更新
```bash
vercel --prod
# 或重新拖拽 dist 文件夹
```

## 🎯 常见问题

### Q: 部署失败怎么办？
**A:** 
- 检查 `npm run build` 在本地是否成功
- 查看 Vercel 构建日志
- 确保 vercel.json 配置正确

### Q: 页面404？
**A:** 
- 确认 vercel.json 中 rewrites 配置正确
- 这是 SPA 应用，所有路由都指向 index.html

### Q: 样式/资源加载失败？
**A:** 
- 确认使用相对路径而非绝对路径
- 检查 build 后 dist 目录内容完整

### Q: 部署很慢？
**A:** 
- 第一次部署需要安装依赖（约1-2分钟）
- 后续部署会更快（约10-30秒）

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- Vercel 支持：https://vercel.com/help
- GitHub：https://github.com

## 🎉 恭喜！

部署成功后，您可以：
- 通过 Vercel 提供的 URL 访问网站
- 绑定自定义域名
- 享受全球 CDN 加速
- 自动 HTTPS 安全加密
- Git 推送自动部署

祝您部署顺利！🚀
