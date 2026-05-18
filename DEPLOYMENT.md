# 学考合一 - 网站部署指南 (Vercel)

## 🚀 快速部署到 Vercel

### 方法一：使用 Vercel CLI（推荐）

```bash
# 1. 全局安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署到预览环境（测试）
vercel

# 4. 部署到生产环境
vercel --prod
```

### 方法二：使用 GitHub 集成（自动化部署）

1. **推送代码到 GitHub**
   ```bash
   # 初始化 Git（如果尚未初始化）
   git init
   
   # 添加所有文件
   git add .
   
   # 提交
   git commit -m "Initial commit"
   
   # 添加远程仓库（替换为您的仓库地址）
   git remote add origin https://github.com/your-username/xuekao-website.git
   
   # 推送
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 https://vercel.com/new
   - 点击 "Import Git Repository"
   - 选择您的 GitHub 仓库
   - Vercel 会自动检测配置（使用 vercel.json）
   - 点击 "Deploy"

3. **配置环境变量（如需要）**
   - 在 Vercel 控制台 → Settings → Environment Variables
   - 添加必要的环境变量

### 方法三：手动上传部署

1. **构建生产版本**
   ```bash
   npm run build
   ```

2. **拖拽部署**
   - 访问 https://vercel.com/new
   - 选择 "Import Third-Party Git Repository"
   - 选择 "Deploy Static Site"
   - 拖拽 `dist` 文件夹到网页

## 📁 项目配置说明

已创建的配置文件：
- `vercel.json` - Vercel 部署配置
- `dist/` - 生产构建产物

## 🔧 vercel.json 配置说明

```json
{
  "buildCommand": "npm run build",      // 构建命令
  "outputDirectory": "dist",            // 输出目录
  "installCommand": "npm install",      // 安装依赖
  "rewrites": [                        // 路由重写（支持 SPA）
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [                         // 缓存和安全头
    {
      "source": "/assets/(.*)",
      "headers": [{
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }]
    }
  ]
}
```

## 🌐 自定义域名（可选）

1. **在 Vercel 控制台配置**
   - 进入项目 → Settings → Domains
   - 添加您的域名（如：xuekao.com）
   - Vercel 会提供 DNS 配置指导

2. **DNS 配置**
   ```
   类型    名称    值
   A       @      76.76.21.21
   CNAME   www    cname.vercel-dns.com
   ```

3. **HTTPS**
   - Vercel 自动提供 SSL/TLS 证书
   - 无需额外配置

## ⚡ 部署后访问

- **预览环境**: `https://your-project.vercel.app`
- **生产环境**: `https://your-custom-domain.com`

## 🔄 更新部署

### CLI 方式
```bash
# 预览环境
vercel

# 生产环境
vercel --prod
```

### Git 方式
- 只需推送到 GitHub
- Vercel 自动触发重新部署

## 📊 监控和分析

Vercel 提供：
- **Analytics** - 访问量分析（免费）
- **Speed Insights** - 性能监控
- **Logs** - 实时日志

## 🐛 常见问题

### 1. 构建失败
- 检查 `npm run build` 在本地是否成功
- 查看 Vercel 构建日志
- 确保所有依赖在 package.json 中

### 2. 路由 404
- 确认 vercel.json 中 rewrites 配置正确
- 检查是否所有路由都指向 index.html

### 3. 资源加载失败
- 检查资源路径是否使用相对路径
- 确认 build 后 dist 目录内容完整

## 🎯 部署检查清单

- [x] 创建 vercel.json 配置文件
- [x] 构建生产版本
- [x] 配置路由重写（SPA 支持）
- [x] 配置缓存策略
- [ ] 连接 GitHub 仓库
- [ ] 配置自定义域名（如需要）
- [ ] 测试生产环境功能

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Vercel 支持: https://vercel.com/help

## 🎉 快速开始命令

```bash
# 完整部署流程
npm install -g vercel    # 安装 CLI
vercel login             # 登录
vercel --prod           # 部署生产环境
```

祝部署成功！🎊
