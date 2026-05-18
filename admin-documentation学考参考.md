# 学考合一 - 后台管理系统详细文档

## 目录

1. [系统架构概览](#1-系统架构概览)
2. [认证与权限体系](#2-认证与权限体系)
3. [布局与导航设计](#3-布局与导航设计)
4. [功能模块详解](#4-功能模块详解)
5. [数据库模型设计](#5-数据库模型设计)
6. [对象存储与签名策略](#6-对象存储与签名策略)
7. [AI 功能与模型配置](#7-ai-功能与模型配置)
8. [性能优化策略](#8-性能优化策略)
9. [API 接口清单](#9-api-接口清单)

---

## 1. 系统架构概览

### 1.1 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16 |
| UI 库 | React | 19 |
| 语言 | TypeScript | 5 |
| UI 组件 | shadcn/ui (Radix UI) | - |
| 样式 | Tailwind CSS | 4 |
| ORM | Drizzle ORM | - |
| 数据库 | PostgreSQL | - |
| 对象存储 | S3 兼容 (火山引擎 TOS) | - |
| AI SDK | coze-coding-dev-sdk | - |
| 运行时 | Node.js | 24.14.1 |

### 1.2 目录结构

```
src/
├── app/
│   ├── admin/                    # 后台管理页面
│   │   ├── layout.tsx            # 后台布局（侧边栏 + 认证守卫）
│   │   ├── login/                # 登录页
│   │   ├── init/                 # 系统初始化页
│   │   ├── dashboard/            # 数据统计
│   │   ├── news/                 # 资讯管理
│   │   ├── courses/              # 课程管理
│   │   ├── materials/            # 资料管理
│   │   ├── partners/             # 合作品牌
│   │   ├── testimonials/         # 学员评价
│   │   ├── achievements/         # 学考合一动态（成就展示）
│   │   ├── teachers/             # 师资管理
│   │   ├── students/             # 学员案例
│   │   ├── users/                # 注册用户管理
│   │   ├── user-activity/        # 用户活动统计
│   │   ├── universities/         # 院校管理
│   │   ├── majors/               # 专业管理
│   │   ├── hero-banners/         # Hero 轮播图
│   │   ├── quick-entries/        # 快速入口
│   │   ├── companion-plans/      # 伴学套餐
│   │   ├── study-rooms/          # 合作自习室
│   │   ├── partner-programs/     # 合伙人计划
│   │   ├── oem-cases/            # OEM 合作案例
│   │   ├── messages/             # 留言管理
│   │   ├── app-download/         # APP 下载管理
│   │   ├── settings/             # 系统设置
│   │   ├── system-config/        # 系统配置
│   │   └── diag/                 # 诊断页面
│   ├── (frontend)/               # 前台展示页面
│   └── api/                      # API 路由
│       ├── admin/                # 后台管理 API
│       ├── home/                 # 首页数据聚合 API
│       └── upload/               # 文件上传 API
├── components/
│   ├── ui/                       # shadcn/ui 基础组件
│   └── admin/                    # 后台专用组件
├── lib/                          # 工具函数
├── storage/
│   └── database/                 # 数据库相关
├── utils/                        # 通用工具
│   └── storage-signature.ts      # 签名策略
└── services/                     # 业务服务
    └── wechatOfficialAccountService.ts
```

### 1.3 架构原则

- **前后端分离**：页面为 React 客户端组件 (`'use client'`)，通过 fetch 调用后端 API
- **API Routes 模式**：Next.js App Router 提供 BFF 层，统一处理数据库操作和业务逻辑
- **ORM 数据访问**：通过 Drizzle ORM 操作 PostgreSQL，类型安全
- **对象存储**：文件通过 S3 兼容协议上传至火山引擎 TOS，签名 URL 访问
- **AI 集成**：通过 `coze-coding-dev-sdk` 调用 LLM 和 Web Search

---

## 2. 认证与权限体系

### 2.1 登录流程

```
用户输入用户名密码
    ↓
POST /api/admin/login
    ↓
验证用户名密码（环境变量 ADMIN_ACCOUNTS）
    ↓
生成 session 写入 localStorage + Cookie
    ↓
跳转至 dashboard
```

### 2.2 Session 机制

| 属性 | 说明 |
|------|------|
| 存储位置 | `localStorage` (key: `admin_session`) + HttpOnly Cookie |
| 有效期 | **7天** |
| 验证字段 | `adminId`, `username`, `loginTime` |
| 过期处理 | 清除 localStorage，重定向至登录页 |

### 2.3 管理员账户配置

通过环境变量 `ADMIN_ACCOUNTS` 配置，格式：

```
username:password:name;username2:password2:name2
```

当前默认账户：

| 字段 | 值 |
|------|-----|
| 用户名 | `wuhe` |
| 密码 | `123456` |
| 名称 | 管理员 |
| 角色 | 超级管理员 |

### 2.4 认证守卫

在 `admin/layout.tsx` 中实现，所有 `/admin/*` 路径均受保护（除 `/admin/login`, `/admin/init`, `/admin/diag`）：

1. 读取 `localStorage` 中的 `admin_session`
2. 解析并验证 `adminId`, `username`, `loginTime` 字段
3. 检查 Session 是否超过 7 天有效期
4. 验证失败：清除 Session，重定向至登录页

### 2.5 角色权限体系（设置页面）

在系统设置页面中定义了基于角色的权限矩阵：

| 角色 | 预设权限 |
|------|---------|
| 超级管理员 | `full_access` (全部权限) |
| 答疑老师 | `question_bank`, `view_students` |
| 督学老师 | `view_students`, `upload_cases` |
| 销售 | `view_contacts`, `manage_codes` |
| 内容审核 | `content_audit` |

可用权限列表：

| 权限 ID | 名称 | 分类 |
|---------|------|------|
| `full_access` | 全部权限 | 系统 |
| `question_bank` | 题库编辑 | 内容 |
| `view_students` | 查看学生数据 | 学生 |
| `upload_cases` | 学员案例上传 | 内容 |
| `view_contacts` | 查看联系方式 | 销售 |
| `manage_codes` | 兑换码管理 | 销售 |
| `content_audit` | 内容审核上架 | 内容 |
| `course_manage` | 课程管理 | 内容 |
| `material_manage` | 资料管理 | 内容 |
| `user_manage` | 用户管理 | 系统 |
| `system_config` | 系统配置 | 系统 |
| `data_export` | 数据导出 | 数据 |

---

## 3. 布局与导航设计

### 3.1 整体布局

```
┌─────────────────────────────────────────────┐
│                  顶部区域                     │
├──────────┬──────────────────────────────────┤
│          │                                   │
│  侧边栏   │          主内容区域                │
│  (256px)  │                                   │
│          │                                   │
│  - Logo   │  ┌───────────────────────────┐   │
│  - 管理员  │  │     页面标题 + 操作按钮     │   │
│  - 导航菜单 │  ├───────────────────────────┤   │
│  - 退出登录 │  │                           │   │
│          │  │     数据表格 / 表单 / 卡片    │   │
│          │  │                           │   │
│          │  └───────────────────────────┘   │
│          │                                   │
└──────────┴──────────────────────────────────┘
```

### 3.2 侧边栏导航菜单

| 序号 | 图标 | 标签 | 路径 |
|------|------|------|------|
| 1 | LayoutDashboard | 数据统计 | `/admin/dashboard` |
| 2 | Book | 课程管理 | `/admin/courses` |
| 3 | Newspaper | 资讯管理 | `/admin/news` |
| 4 | FileText | 资料管理 | `/admin/materials` |
| 5 | Building2 | 合作品牌 | `/admin/partners` |
| 6 | Users | 注册用户管理 | `/admin/users` |
| 7 | BarChart3 | 用户活动统计 | `/admin/user-activity` |
| 8 | Layers | 伴学套餐 | `/admin/companion-plans` |
| 9 | Star | 学员评价 | `/admin/testimonials` |
| 10 | Award | 学考合一动态 | `/admin/achievements` |
| 11 | ArrowRight | 快速入口 | `/admin/quick-entries` |
| 12 | Building | 院校管理 | `/admin/universities` |
| 13 | Book | 专业管理 | `/admin/majors` |
| 14 | Handshake | 合伙人计划 | `/admin/partner-programs` |
| 15 | Trophy | OEM 合作案例 | `/admin/oem-cases` |
| 16 | MapPin | 合作自习室 | `/admin/study-rooms` |
| 17 | Layers | 学员案例 | `/admin/students` |
| 18 | UserCheck | 师资管理 | `/admin/teachers` |
| 19 | MessageSquare | 留言管理 | `/admin/messages` |
| 20 | Download | APP 下载管理 | `/admin/app-download` |
| 21 | Settings | 系统设置 | `/admin/settings` |

### 3.3 侧边栏样式

| 属性 | 值 |
|------|-----|
| 宽度 | `w-64` (256px) |
| 背景 | `bg-slate-900/50` |
| 边框 | `border-r border-slate-800` |
| 响应式 | `hidden lg:block`（小屏隐藏） |
| Logo | 蓝色 BookOpen 图标 + "学考合一" 文字 |
| 管理员卡片 | 圆形渐变头像 + 名称 + 角色 |
| 激活态 | `bg-blue-600 text-white` |
| 默认态 | `text-slate-300 hover:bg-slate-800` |
| 滚动 | `overflow-y-auto h-screen sticky top-0` |

### 3.4 通用页面结构

每个管理页面遵循统一的结构模式：

```
1. 页面标题区 (border-b bg-muted/50)
   - 标题 + 描述
   - 操作按钮（新增、批量操作等）

2. 筛选/搜索区
   - 搜索输入框
   - 分类/状态筛选
   - 批量操作

3. 数据展示区
   - Card 网格布局 或 Table 表格布局
   - 每个数据项支持编辑、删除、排序

4. 弹窗表单 (Dialog)
   - 新增/编辑表单
   - 图片上传组件
   - 预览面板
```

---

## 4. 功能模块详解

### 4.1 数据统计 (`/admin/dashboard`)

**样式特征**：
- 顶部标题栏 + 导出报表/刷新数据按钮
- 核心指标卡片 4 列网格：总用户数、活跃用户、课程数、收入
- 每个 Card 包含：标题 + 图标 + 数值 + 环比变化

**数据展示**：

| 指标 | 示例值 | 环比 |
|------|--------|------|
| 总用户数 | 12,568 | +12.5% |
| 活跃用户 | 8,234 | +8.2% |
| 课程数 | 156 | +5.1% |
| 月收入 | ¥128,450 | +15.3% |

**实现原理**：静态展示页面，数据硬编码。Tabs 切换"今日/本周/本月"维度的趋势图表。

---

### 4.2 资讯管理 (`/admin/news`)

**核心功能**：教育资讯的完整生命周期管理

#### 4.2.1 功能列表

| 功能 | 说明 |
|------|------|
| 资讯列表 | 卡片网格展示，支持搜索、分类筛选 |
| AI 生成资讯 | 基于关键词 + 分类，调用 LLM 自动生成 |
| AI 生成封面图 | 调用文生图模型生成资讯封面 |
| AI 纠错 | 自动检测并修正文章中的错别字、语病 |
| AI 全部修复 | 批量检测所有资讯并自动修复 |
| 微信公众号同步 | 将资讯同步至公众号草稿箱 |
| 编辑/删除 | 手动编辑资讯内容 |
| 排序管理 | 通过 sortOrder 字段控制展示顺序 |

#### 4.2.2 AI 生成资讯流程

```
用户选择分类 + 输入关键词（可选）
    ↓
1. 如果无关键词 → 调用 WebSearchClient 从权威高考网站搜索
   - 权威来源：阳光高考网、中国教育在线、人民网教育、新华网等 11 个网站
   - 按分类关键词随机组合搜索查询
   - 随机选择 2-3 个关键词 + 3-4 个权威网站
    ↓
2. 调用 LLM (doubao-seed-2-0-lite) 生成文章
   - System Prompt 定义角色：专业教育新闻编辑
   - 根据分类自动选择标题风格：
     · 严肃新闻型（高考政策/教育资讯/教育科技）→ 严谨客观
     · 案例指导型（学习方法/家庭教育/志愿填报/学员故事）→ 抖音/小红书标题党
   - 输出格式：JSON {title, summary, content, tag, readTime}
    ↓
3. 重复检测（编辑距离算法）
   - 与同分类已有标题计算相似度
   - 完全重复 → 重新生成（最多 3 次）
   - 相似度 > 50% → 重新生成（最多 3 次）
   - 3 次仍重复 → 跳过该条
    ↓
4. 写入数据库
```

#### 4.2.3 AI 纠错流程

```
调用 LLM (deepseek-v3-2) 对文章进行纠错
    ↓
System Prompt 定义：教育内容编辑，负责检查错别字、语病、逻辑错误
    ↓
返回 JSON: { corrections: [{original, corrected, reason}], fixedContent }
    ↓
更新文章内容
```

#### 4.2.4 微信公众号同步

| 步骤 | 说明 |
|------|------|
| 获取 access_token | 通过 AppID + AppSecret 向微信 API 换取 |
| 上传封面图 | 将资讯图片下载后上传至微信素材库，获取 media_id |
| 生成精美排版 | 将 Markdown 正文转换为微信公众号 HTML 排版 |
| 创建草稿 | 调用微信 `addDraft` API 创建草稿 |

配置文件：`src/config/wechat-official-account.config.ts`
服务类：`src/services/wechatOfficialAccountService.ts`

#### 4.2.5 资讯分类

| 分类 ID | 名称 | 标题风格 |
|---------|------|---------|
| 高考政策 | 严肃新闻 | 严谨客观 |
| 学习方法 | 案例指导 | 吸引人 |
| 教育科技 | 严肃新闻 | 严谨客观 |
| 家庭教育 | 案例指导 | 吸引人 |
| 志愿填报 | 案例指导 | 吸引人 |
| 学员故事 | 案例指导 | 吸引人 |
| 教育资讯 | 严肃新闻 | 严谨客观 |

---

### 4.3 合作品牌 (`/admin/partners`)

**样式特征**：
- 卡片网格展示品牌 Logo
- 每个品牌卡片显示：Logo 图片、名称、排序、状态

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | varchar(200) | 品牌名称 |
| image | varchar(500) | Logo 图片路径 |
| url | varchar(500) | 跳转链接 |
| isActive | boolean | 是否启用 |
| sortOrder | integer | 排序权重 |
| imageWidth | integer | 图片宽度 (默认 80) |
| imageHeight | integer | 图片高度 (默认 80) |
| imageScale | integer | 图片缩放 (默认 100) |
| fontSize | integer | 字体大小 (默认 14) |
| fontWeight | varchar | 字体粗细 (默认 normal) |
| customStyle | text | 自定义 CSS |

**设计原理**：品牌展示需要精细的视觉控制，因此每个品牌都有独立的图片尺寸、缩放、字体样式参数，还支持自定义 CSS。

---

### 4.4 学员评价 (`/admin/testimonials`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | varchar | 学员姓名 |
| avatar | varchar | 头像（单字符，用于文字头像） |
| avatarWidth | integer | 头像宽度 (默认 80) |
| avatarHeight | integer | 头像高度 (默认 80) |
| avatarScale | integer | 头像缩放 (默认 100) |
| avatarOpacity | integer | 头像透明度 (默认 100) |
| rating | varchar | 评分 (1-5) |
| content | text | 评价内容 |
| course | varchar | 课程名称 |
| backgroundImage | varchar | 背景图片 |
| isFeatured | boolean | 是否精选 |
| sortOrder | integer | 排序权重 |

**特殊设计**：头像采用文字头像方案（取姓氏首字），而非图片，减少资源加载。

---

### 4.5 学考合一动态/成就展示 (`/admin/achievements`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| title | varchar(200) | 成就标题 |
| description | text | 成就描述 |
| date | varchar(50) | 日期 |
| location | varchar(200) | 地点 |
| image | varchar(500) | 成就图片（签名 URL） |
| icon | varchar(50) | 图标类型 (users/trophy/target/award) |
| category | varchar(50) | 分类（会议参与/荣誉奖项/展会活动/里程碑/会议举办/技术突破） |
| highlight | boolean | 是否高亮 |
| isActive | boolean | 是否启用 |
| sortOrder | integer | 排序权重 |

**图片刷新机制**：
- API: `POST /api/admin/achievements/refresh-images`
- 遍历所有成就记录，提取对象存储 Key
- 重新生成签名 URL（10 年有效期）
- 更新数据库中的 image 字段

---

### 4.6 师资管理 (`/admin/teachers`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | varchar(100) | 教师姓名 |
| school | varchar(200) | 所属单位/头衔 |
| major | varchar(50) | 主教学科 |
| subject | varchar(50) | 教授科目 |
| description | text | 教师简介 |
| avatar | varchar(500) | 头像图片 |
| backgroundImage | varchar(500) | 背景图片 |
| avatarWidth | integer | 头像宽度 (默认 100) |
| avatarHeight | integer | 头像高度 (默认 100) |
| avatarScale | integer | 头像缩放 (默认 100) |
| avatarOpacity | integer | 头像透明度 (默认 100) |
| isFeatured | boolean | 是否精选 |
| sortOrder | integer | 排序权重 |

**科目选项**：语文、数学、英语、物理、化学、生物、政治、历史、地理、道法、英语口语

**头衔选项**：教研专家组、中学特级教师、特级教师、正高级教学专家、高级教师、骨干教师、学科带头人、学科负责人、首席教研师、高考教学专家、教研部XX教师等

**图片修复 API**：`POST /api/admin/teachers/fix-images` - 批量刷新教师图片签名 URL

---

### 4.7 学员案例 (`/admin/students`)

**功能**：管理优秀学员案例，包含提分数据、录取院校等信息。

**展示形式**：卡片网格，包含学员照片、姓名、提升分数、录取院校、课程等。

---

### 4.8 Hero 轮播图 (`/admin/hero-banners`)

**核心功能**：管理首页 Hero 区域的轮播 Banner

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| title | varchar | 标题 |
| subtitle | text | 副标题 |
| badge | varchar | 角标文字 |
| primaryButtonText | varchar | 主按钮文字 |
| primaryButtonLink | varchar | 主按钮链接 |
| secondaryButtonText | varchar | 次按钮文字 |
| secondaryButtonLink | varchar | 次按钮链接 |
| backgroundImage | varchar | 背景图片 |
| gradientClass | varchar | 渐变 CSS 类名 |
| icon | varchar | 图标类型 |
| isActive | boolean | 是否启用 |
| sortOrder | integer | 排序权重 |

**预览功能**：内嵌 `HeroBannerPreview` 组件，实时预览前台展示效果，包括背景图片、渐变遮罩、文字排版、按钮等。

---

### 4.9 快速入口 (`/admin/quick-entries`)

**功能**：管理首页快速入口导航项，包含图标、标题、链接、排序。

---

### 4.10 院校管理 (`/admin/universities`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | varchar(200) | 院校名称 |
| code | varchar(50) | 院校代码 (唯一) |
| category | varchar(50) | 院校类别 |
| level | varchar(50) | 层次 (985/211/双一流等) |
| location | varchar(500) | 地址 |
| province | varchar(50) | 省份 |
| city | varchar(100) | 城市 |
| website | varchar(500) | 官网 |
| logo | varchar(500) | Logo |
| tags | jsonb | 标签数组 |
| isActive | boolean | 是否启用 |
| sortOrder | integer | 排序权重 |

---

### 4.11 专业管理 (`/admin/majors`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | varchar(200) | 专业名称 |
| code | varchar(50) | 专业代码 (唯一) |
| category | varchar(50) | 学科门类 |
| degree | varchar(50) | 学位类型 |
| duration | integer | 学制 (年) |
| requirements | text | 选科要求 |
| employment | text | 就业方向 |
| salary | varchar(100) | 薪资范围 |
| isHot | boolean | 是否热门 |
| isActive | boolean | 是否启用 |

---

### 4.12 注册用户管理 (`/admin/users`)

**功能**：
- 用户列表展示（Table 表格布局）
- 搜索：按用户名/邮箱/手机号
- 筛选：按角色、状态
- 批量操作：多选用户进行批量操作
- 用户详情弹窗
- 新增/编辑用户

**筛选条件**：

| 筛选项 | 选项 |
|--------|------|
| 角色 | user, admin, teacher 等 |
| 状态 | active, inactive |

---

### 4.13 用户活动统计 (`/admin/user-activity`)

**功能**：记录和展示用户的课程浏览行为，包括观看时长、最后浏览时间等。

---

### 4.14 伴学套餐 (`/admin/companion-plans`)

**功能**：管理伴学套餐产品，包含套餐名称、价格、内容、时长等。

---

### 4.15 合伙人计划 (`/admin/partner-programs`)

**功能**：管理合伙人招募信息，包含合作模式、佣金政策、支持政策等。

---

### 4.16 OEM 合作案例 (`/admin/oem-cases`)

**功能**：管理 OEM 合作案例展示，包含合作伙伴信息、合作内容、案例图片等。

---

### 4.17 合作自习室 (`/admin/study-rooms`)

**数据模型**：

| 字段 | 类型 | 说明 |
|------|------|------|
| roomName | varchar(200) | 自习室名称 |
| roomCode | varchar(50) | 房间代码 (唯一) |
| location | varchar(500) | 地址 |
| capacity | integer | 容纳人数 |
| facilities | jsonb | 设施列表 |
| openingHours | text | 营业时间 |
| contactPerson | varchar(100) | 联系人 |
| contactPhone | varchar(50) | 联系电话 |
| contactEmail | varchar(100) | 联系邮箱 |
| features | jsonb | 特色标签 |
| isFeatured | boolean | 是否精选 |

---

### 4.18 留言管理 (`/admin/messages`)

**功能**：管理前台用户提交的咨询留言，包含查看、回复、标记已读等。

---

### 4.19 APP 下载管理 (`/admin/app-download`)

**功能**：管理 APP 下载页面的配置，包含下载链接、二维码、版本信息等。

---

### 4.20 系统设置 (`/admin/settings`)

**功能分区**：

| Tab | 内容 |
|-----|------|
| 平台信息 | 站点名称、URL、描述、联系电话、联系邮箱 |
| 权限管理 | 角色权限矩阵（见 2.5 节） |
| 数据库 | 数据库状态监控 |

**平台基本信息**：

| 字段 | 默认值 |
|------|--------|
| 站点名称 | 学考合一 |
| 站点 URL | https://www.zhixue.com |
| 站点描述 | 专业的在线教育平台，为学生提供优质课程和个性化学习方案 |
| 联系电话 | 400-888-8888 |
| 联系邮箱 | support@zhixue.com |

---

### 4.21 系统配置 (`/admin/system-config`)

**功能**：键值对形式的系统配置管理

| 字段 | 说明 |
|------|------|
| key | 配置键名 |
| value | 配置值 |
| category | 分类 (system/ui/api/contact/seo/other) |
| description | 配置描述 |
| dataType | 数据类型 (string/number/boolean/json) |
| isActive | 是否启用 |

**支持操作**：搜索、分类筛选、新增、编辑、删除。

---

### 4.22 系统初始化 (`/admin/init`)

**功能**：首次部署时初始化系统，创建数据库表和默认数据。

**触发条件**：数据库表不存在时，自动跳转至此页面。

---

### 4.23 诊断页面 (`/admin/diag`)

**功能**：系统健康检查和故障诊断，无需认证即可访问。

---

## 5. 数据库模型设计

### 5.1 核心表

| 表名 | 说明 | 主要字段 |
|------|------|---------|
| `news` | 资讯 | title, summary, content, category, tag, readTime, isHot, isFeatured |
| `partners` | 合作品牌 | name, image, url, imageWidth/Height/Scale, fontSize/Weight |
| `testimonials` | 学员评价 | name, avatar, rating, content, course, avatarWidth/Height/Scale/Opacity |
| `achievements` | 成就展示 | title, description, date, location, image, icon, category, highlight |
| `teachers` | 师资 | name, school, major, subject, description, avatar, backgroundImage |
| `students` | 学员案例 | name, school, score, description, avatar, backgroundImage |
| `hero_banners` | 轮播图 | title, subtitle, badge, buttons, backgroundImage, gradientClass, icon |
| `quick_entries` | 快速入口 | title, icon, link, description |
| `universities` | 院校 | name, code, category, level, location, province, city, website, logo, tags |
| `majors` | 专业 | name, code, category, degree, duration, requirements, employment, salary |
| `users` | 用户 | username, email, phone, password, role, isActive |
| `user_course_views` | 用户浏览 | userId, courseId, viewDuration, lastViewedAt |
| `co_study_rooms` | 合作自习室 | roomName, roomCode, location, capacity, facilities, features |
| `sms_verification_codes` | 短信验证码 | phoneNumber, code, msgId, expireAt, verified |
| `system_configs` | 系统配置 | key, value, category, description, dataType |

### 5.2 通用字段设计

所有表均包含以下通用字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | varchar(36) | UUID 主键，通过 `gen_random_uuid()` 自动生成 |
| `is_active` | boolean | 是否启用，默认 true |
| `sort_order` | integer | 排序权重，默认 0（数字越大越靠前） |
| `created_at` | timestamp | 创建时间，默认 `now()` |
| `updated_at` | timestamp | 更新时间 |

### 5.3 图片字段设计

所有包含图片的表都采用统一的图片元数据字段：

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `image` / `avatar` / `backgroundImage` | varchar(500) | - | 图片 URL（签名 URL 或本地路径） |
| `imageWidth` | integer | 80-800 | 图片显示宽度 (px) |
| `imageHeight` | integer | 80-600 | 图片显示高度 (px) |
| `imageScale` | integer | 100 | 图片缩放比例 (%) |
| `imageOpacity` | integer | 100 | 图片透明度 (%) |

**设计原理**：不同展示位置的图片需要不同的尺寸和效果，通过独立参数控制每个图片的展示效果，而非依赖 CSS 全局样式。

### 5.4 索引设计

高频查询字段均建立了 B-Tree 索引：

| 表 | 索引字段 | 用途 |
|----|---------|------|
| news | category | 按分类查询 |
| partners | name | 按名称搜索 |
| universities | name, category | 按名称/类别搜索 |
| majors | name, category | 按名称/类别搜索 |
| user_course_views | userId, courseId, lastViewedAt | 用户浏览记录查询 |
| co_study_rooms | location, roomCode (唯一) | 地址搜索和房间号唯一 |
| sms_verification_codes | phoneNumber, msgId | 验证码查询 |

---

## 6. 对象存储与签名策略

### 6.1 存储架构

```
上传文件 → S3 Client (putObject) → 火山引擎 TOS
    ↓
生成签名 URL → 返回给前端展示
```

### 6.2 签名有效期策略

通过 `src/utils/storage-signature.ts` 统一管理：

| 资源类型 | 文件夹 | 有效期 | 说明 |
|---------|--------|--------|------|
| 公开资源 | achievements, brands, teachers, news | **10 年** | 长期展示，几乎不需刷新 |
| 用户资源 | avatars, uploads | **30 天** | 需定期刷新，安全性高 |
| 其他 | - | **1 年** | 默认策略 |

```typescript
// 使用示例
import { getExpiresByFolder, formatExpireTime } from '@/utils/storage-signature';

const expireTime = getExpiresByFolder('achievements'); // 315360000 (10年)
const readable = formatExpireTime(expireTime); // "10年"
```

### 6.3 图片上传流程

```
前端选择文件
    ↓
POST /api/upload (multipart/form-data)
    ↓
1. 验证文件类型 (image/*)
2. 验证文件大小 (≤ 10MB)
3. 生成唯一 Key: {folder}/{timestamp}_{random}.{ext}
4. S3 Client putObject 上传至 TOS
5. 根据文件夹类型获取签名有效期
6. S3 Client getSignedUrl 生成签名 URL
7. 返回 { url, key, folder, expireTime, expireTimeReadable }
```

---

## 7. AI 功能与模型配置

### 7.1 模型清单

| 模型 ID | 使用场景 | 说明 |
|---------|---------|------|
| `doubao-seed-2-0-lite-260215` | 资讯生成 | 综合能力超越 1.8，性价比最优 |
| `deepseek-v3-2-251201` | 资讯纠错、批量修复 | 日常纠错够用 |

### 7.2 可用模型列表

| 模型 ID | 类型 | 特点 |
|---------|------|------|
| doubao-seed-2-0-pro-260215 | 旗舰 | 复杂推理、多模态、Agent 场景 |
| doubao-seed-2-0-lite-260215 | 均衡 | 性价比最优，超越 1.8 |
| doubao-seed-2-0-mini-260215 | 轻量 | 低时延、高并发 |
| doubao-seed-1-8-251228 | Agent | 多模态 Agent 定向优化 |
| doubao-seed-1-6-251015 | 通用 | 能力多面手 |
| doubao-seed-1-6-vision-250815 | 视觉 | 视觉理解 SOTA |
| deepseek-v3-2-251201 | 通用 | 平衡推理与输出 |
| deepseek-r1-250528 | 推理 | 671B 满血版 R1 |
| kimi-k2-5-260127 | Agent | 开源 SoTA，多模态 |
| glm-5-0-260211 | 旗舰 | 智谱 Agentic Engineering |
| glm-4-7-251222 | 旗舰 | 更强编程与多步推理 |
| minimax-m2-5-260212 | Agent | 编码与智能体 SOTA |
| qwen-3-5-plus-260215 | 通用 | 混合架构，高推理效率 |

### 7.3 SDK 使用方式

```typescript
// LLM 调用
import { LLMClient, Config } from 'coze-coding-dev-sdk';
const config = new Config();
const client = new LLMClient(config);

const response = await client.invoke(messages, {
  model: 'doubao-seed-2-0-lite-260215',
  temperature: 0.8,
});

// Web Search 调用
import { WebSearchClient, Config } from 'coze-coding-dev-sdk';
const config = new Config();
const client = new WebSearchClient(config);

const results = await client.search({
  query: '搜索关键词',
  maxResults: 8,
});
```

---

## 8. 性能优化策略

### 8.1 首页数据聚合

| 优化项 | 优化前 | 优化后 |
|--------|--------|--------|
| API 请求数 | 6 个独立请求 | 1 个聚合请求 |
| 接口 | 6 个独立 API | `/api/home` |

`/api/home` 使用 `Promise.all` 并行查询 6 个数据源，减少串行等待。

### 8.2 图片加载优化

| 优化项 | 实现方式 |
|--------|---------|
| 首屏 Hero 图片 | `fetchPriority="high"` + `loading="eager"` |
| 非首屏图片 | `loading="lazy"` + `decoding="async"` |
| 品牌 Logo | 懒加载 + 异步解码 |
| 成就图片 | 懒加载 + 异步解码 |

### 8.3 字体优化

| 优化项 | 实现方式 |
|--------|---------|
| Preconnect | `ReactDOM.preconnect('https://fonts.googleapis.cn')` |
| CN 域名 | 使用 `fonts.googleapis.cn` 替代 `fonts.googleapis.com` |
| Font Preload 组件 | `src/components/font-preload.tsx` |

### 8.4 签名 URL 有效期

通过分级签名策略，减少签名 URL 刷新频率：

| 资源类型 | 有效期 | 预期刷新频率 |
|---------|--------|-------------|
| 公开展示 | 10 年 | 几乎不需要 |
| 用户资源 | 30 天 | 每月 |
| 默认 | 1 年 | 每年 |

---

## 9. API 接口清单

### 9.1 认证相关

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/admin/login` | 管理员登录 |
| POST | `/api/admin/logout` | 退出登录 |
| GET | `/api/admin/init` | 检查系统是否已初始化 |
| POST | `/api/admin/init` | 执行系统初始化 |

### 9.2 资讯管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/news` | 获取资讯列表 |
| POST | `/api/admin/news` | 新增资讯 |
| PUT | `/api/admin/news/[id]` | 更新资讯 |
| DELETE | `/api/admin/news/[id]` | 删除资讯 |
| POST | `/api/admin/news/generate` | AI 生成资讯 |
| POST | `/api/admin/news/correct` | AI 纠错 |
| POST | `/api/admin/news/fix-all` | AI 批量修复 |
| POST | `/api/admin/news/generate-image` | AI 生成封面图 |
| POST | `/api/admin/news/sync-wechat` | 同步至微信公众号 |

### 9.3 合作品牌

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/partners` | 获取品牌列表 |
| POST | `/api/admin/partners` | 新增品牌 |
| PUT | `/api/admin/partners/[id]` | 更新品牌 |
| DELETE | `/api/admin/partners/[id]` | 删除品牌 |

### 9.4 学员评价

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/testimonials` | 获取评价列表 |
| POST | `/api/admin/testimonials` | 新增评价 |
| PUT | `/api/admin/testimonials/[id]` | 更新评价 |
| DELETE | `/api/admin/testimonials/[id]` | 删除评价 |

### 9.5 成就展示

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/achievements` | 前台获取成就列表 |
| GET | `/api/admin/achievements` | 后台获取成就列表 |
| POST | `/api/admin/achievements` | 新增成就 |
| PUT | `/api/admin/achievements/[id]` | 更新成就 |
| DELETE | `/api/admin/achievements/[id]` | 删除成就 |
| POST | `/api/admin/achievements/refresh-images` | 刷新所有成就图片签名 URL |

### 9.6 师资管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/teachers` | 前台获取教师列表 |
| GET | `/api/admin/teachers` | 后台获取教师列表 |
| POST | `/api/admin/teachers` | 新增教师 |
| PUT | `/api/admin/teachers/[id]` | 更新教师 |
| DELETE | `/api/admin/teachers/[id]` | 删除教师 |
| POST | `/api/admin/teachers/fix-images` | 刷新教师图片签名 URL |

### 9.7 文件上传

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/upload` | 上传文件（公开资源，10 年签名） |
| POST | `/api/admin/upload` | 上传文件（管理端） |

### 9.8 首页聚合

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/home` | 首页全部数据（Hero + 品牌 + 评价 + 学员 + 教师 + 成就） |

### 9.9 系统配置

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/system-config` | 获取配置列表 |
| POST | `/api/admin/system-config` | 新增配置 |
| PUT | `/api/admin/system-config/[id]` | 更新配置 |
| DELETE | `/api/admin/system-config/[id]` | 删除配置 |

---

> **文档版本**: v1.0  
> **最后更新**: 2026-04-16  
> **技术栈**: Next.js 16 + React 19 + TypeScript 5 + Drizzle ORM + PostgreSQL + 火山引擎 TOS
