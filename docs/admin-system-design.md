# 后台管理系统设计方案

> **版本**: v1.0
> **日期**: 2026-05-15
> **状态**: 待审阅

---

## 1. 项目概述

### 1.1 目标

在现有 React SPA 项目中扩展后台管理功能，实现与参考文档一致的功能模块，采用模块化组件设计。

### 1.2 核心约束

> **重要**: 前台现有样式、颜色、组件保持不变，仅在后台管理区域使用独立样式体系。

---

## 2. 技术架构

### 2.1 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + React Router 6 | 复用现有 |
| 数据 | Supabase | 复用现有客户端 |
| 表单 | React Hook Form + Zod | 统一表单处理 |
| UI | Tailwind CSS (独立后台样式) | 后台专用样式，不影响前台 |
| 图标 | Lucide React | 复用现有 |

### 2.2 样式隔离策略

```
src/
├── styles/
│   ├── index.css          # 前台样式（不修改）
│   └── admin.css          # 后台专用样式（新增）
```

- 后台使用 `admin-` 前缀的 CSS 类名
- 后台组件样式完全独立，不继承前台样式
- 确保修改后台不影响前台 UI

---

## 3. 目录结构

```
src/
├── components/
│   ├── admin/                      # 后台专用组件
│   │   ├── AdminLayout.tsx         # 后台布局（侧边栏 + 顶部）
│   │   ├── AdminSidebar.tsx        # 侧边栏导航
│   │   ├── AdminHeader.tsx         # 顶部栏
│   │   ├── DataTable.tsx            # 通用数据表格
│   │   ├── DataCard.tsx            # 通用数据卡片
│   │   ├── DataForm.tsx            # 通用表单弹窗
│   │   ├── ImageUpload.tsx         # 图片上传组件
│   │   ├── StatusBadge.tsx         # 状态徽章
│   │   └── ConfirmDialog.tsx       # 确认对话框
│   └── ui/                         # 现有 UI 组件（不修改）
├── pages/
│   └── admin/                      # 后台页面
│       ├── Login.tsx                # 登录页
│       ├── Dashboard.tsx           # 数据统计
│       ├── News.tsx                 # 资讯管理
│       ├── Courses.tsx              # 课程管理
│       ├── Users.tsx                # 用户管理
│       ├── Partners.tsx             # 合作品牌
│       ├── Testimonials.tsx         # 学员评价
│       ├── Achievements.tsx         # 学考合一动态
│       ├── Teachers.tsx             # 师资管理
│       ├── Students.tsx             # 学员案例
│       ├── Universities.tsx         # 院校管理
│       ├── Majors.tsx               # 专业管理
│       ├── QuickEntries.tsx         # 快速入口
│       ├── CompanionPlans.tsx       # 伴学套餐
│       ├── PartnerPrograms.tsx       # 合伙人计划
│       ├── OemCases.tsx             # OEM 合作案例
│       ├── StudyRooms.tsx           # 合作自习室
│       ├── Messages.tsx             # 留言管理
│       ├── AppDownload.tsx          # APP 下载管理
│       ├── Settings.tsx             # 系统设置
│       └── SystemConfig.tsx         # 系统配置
├── contexts/
│   └── AuthContext.tsx              # 扩展：支持 admin 角色
├── hooks/
│   ├── useAdminAuth.ts              # 后台认证 hook
│   └── useDataTable.ts              # 数据表格 hook
├── lib/
│   └── supabase/
│       └── admin.ts                 # 后台专用 API
└── utils/
    └── admin.ts                     # 后台工具函数
```

---

## 4. 功能模块

### 4.1 侧边栏导航（20 项）

| 序号 | 图标 | 标签 | 路径 |
|------|------|------|------|
| 1 | LayoutDashboard | 数据统计 | `/admin/dashboard` |
| 2 | Book | 课程管理 | `/admin/courses` |
| 3 | Newspaper | 资讯管理 | `/admin/news` |
| 4 | Users | 注册用户管理 | `/admin/users` |
| 5 | Star | 学员评价 | `/admin/testimonials` |
| 6 | UserCheck | 师资管理 | `/admin/teachers` |
| 7 | Layers | 学员案例 | `/admin/students` |
| 8 | Building2 | 合作品牌 | `/admin/partners` |
| 9 | Award | 学考合一动态 | `/admin/achievements` |
| 10 | ArrowRight | 快速入口 | `/admin/quick-entries` |
| 11 | Building | 院校管理 | `/admin/universities` |
| 12 | Book | 专业管理 | `/admin/majors` |
| 13 | Layers | 伴学套餐 | `/admin/companion-plans` |
| 14 | Handshake | 合伙人计划 | `/admin/partner-programs` |
| 15 | Trophy | OEM 合作案例 | `/admin/oem-cases` |
| 16 | MapPin | 合作自习室 | `/admin/study-rooms` |
| 17 | MessageSquare | 留言管理 | `/admin/messages` |
| 18 | Download | APP 下载管理 | `/admin/app-download` |
| 19 | Settings | 系统设置 | `/admin/settings` |
| 20 | Database | 系统配置 | `/admin/system-config` |

### 4.2 模块功能清单

#### Phase 1: 基础架构
- [ ] AdminLayout（侧边栏 + 顶部 + 主内容区）
- [ ] 认证守卫（admin 路由保护）
- [ ] 登录/登出功能

#### Phase 2: 核心模块
| 模块 | 功能 |
|------|------|
| 资讯管理 | 列表、新增、编辑、删除、搜索、分类筛选、AI 预留接口 |
| 课程管理 | 列表、新增、编辑、删除、上下架 |
| 用户管理 | 列表、搜索、筛选、查看详情 |
| 学员评价 | 列表、新增、编辑、删除、精选标记 |
| 师资管理 | 列表、新增、编辑、删除、精选标记 |

#### Phase 3: 扩展模块
| 模块 | 功能 |
|------|------|
| 合作品牌 | 列表、新增、编辑、删除、排序 |
| 学考合一动态 | 列表、新增、编辑、删除、分类、刷新图片 |
| 快速入口 | 列表、新增、编辑、删除 |
| 院校管理 | 列表、新增、编辑、删除、搜索、分类 |
| 专业管理 | 列表、新增、编辑、删除、搜索 |

#### Phase 4: 商业模块
| 模块 | 功能 |
|------|------|
| 伴学套餐 | 列表、新增、编辑、删除 |
| 合伙人计划 | 列表、新增、编辑、删除 |
| OEM 合作案例 | 列表、新增、编辑、删除 |
| 合作自习室 | 列表、新增、编辑、删除 |
| 留言管理 | 列表、查看、回复、标记已读 |

#### Phase 5: 系统模块
| 模块 | 功能 |
|------|------|
| APP 下载管理 | 配置下载链接、二维码 |
| 系统设置 | 平台信息、权限管理、数据库状态 |
| 系统配置 | 键值对配置管理 |
| 数据统计 | 核心指标卡片、趋势图表 |

---

## 5. 数据模型

### 5.1 复用现有数据

继续使用 `src/supabase/types.ts` 中定义的数据类型。

### 5.2 新增数据类型

```typescript
// src/types/admin.ts

export interface AdminSession {
  adminId: string;
  username: string;
  name: string;
  role: 'super_admin' | 'teacher' | 'supervisor' | 'sales' | 'auditor';
  permissions: string[];
  loginTime: number;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  category: 'system' | 'ui' | 'api' | 'contact' | 'seo' | 'other';
  description: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuickEntry {
  id: string;
  title: string;
  icon: string;
  link: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface CompanionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface PartnerProgram {
  id: string;
  title: string;
  description: string;
  commission: string;
  requirements: string[];
  isActive: boolean;
}

export interface OemCase {
  id: string;
  partnerName: string;
  description: string;
  image: string;
  link?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface StudyRoom {
  id: string;
  roomName: string;
  roomCode: string;
  location: string;
  capacity: number;
  facilities: string[];
  openingHours: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  features: string[];
  isFeatured: boolean;
}

export interface Message {
  id: string;
  name: string;
  phone: string;
  email?: string;
  content: string;
  isRead: boolean;
  repliedContent?: string;
  createdAt: string;
}

export interface AppDownload {
  id: string;
  platform: 'ios' | 'android' | 'windows' | 'mac';
  version: string;
  downloadUrl: string;
  qrCode?: string;
  isActive: boolean;
}
```

---

## 6. API 设计

### 6.1 后台 API 调用方式

由于是 SPA，所有数据操作通过 Supabase 客户端直接调用：

```typescript
// 示例：获取资讯列表
const fetchNews = async (filters?: { category?: string; search?: string }) => {
  let query = supabase.from('news').select('*').order('sort_order', { ascending: false });
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.search) query = query.ilike('title', `%${filters.search}%`);
  return query;
};
```

### 6.2 AI 接口预留

```typescript
// src/services/aiService.ts（预留接口）

export const aiService = {
  generateNews: async (params: {
    category: string;
    keywords?: string[];
  }): Promise<{ title: string; content: string; summary: string }> => {
    // TODO: 接入 AI API
    throw new Error('AI 功能待接入');
  },

  correctText: async (content: string): Promise<{ corrected: string }> => {
    // TODO: 接入纠错 API
    throw new Error('AI 纠错功能待接入');
  },

  generateImage: async (prompt: string): Promise<string> => {
    // TODO: 接入文生图 API
    throw new Error('AI 生图功能待接入');
  },
};
```

---

## 7. 认证与权限

### 7.1 Session 存储

```typescript
// localStorage key: 'admin_session'
interface AdminSession {
  adminId: string;
  username: string;
  name: string;
  role: string;
  permissions: string[];
  loginTime: number; // 时间戳
}
```

### 7.2 路由守卫

```typescript
// AdminRoute 组件
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Loading />;
  return isAuthenticated ? children : null;
};
```

### 7.3 权限检查

```typescript
// usePermission hook
export const usePermission = (permission: string) => {
  const { session } = useAdminAuth();
  if (session?.role === 'super_admin') return true;
  return session?.permissions.includes(permission) ?? false;
};
```

---

## 8. 实施计划

### 8.1 Phase 1: 基础架构（1-2 天）

| 任务 | 说明 |
|------|------|
| 创建目录结构 | 新建 admin 组件和页面目录 |
| AdminLayout | 侧边栏 + 顶部 + 主内容区布局 |
| AdminSidebar | 导航菜单组件 |
| 路由配置 | 添加 /admin/* 路由 |
| 认证 Context | 扩展 AuthContext 支持 admin |
| 登录页面 | Login.tsx |
| 路由守卫 | AdminRoute 组件 |

### 8.2 Phase 2: 核心模块（3-4 天）

| 任务 | 说明 |
|------|------|
| 通用组件 | DataTable, DataCard, DataForm, ImageUpload |
| 资讯管理 | 完整 CRUD + AI 预留 |
| 课程管理 | 完整 CRUD |
| 用户管理 | 列表 + 详情 |
| 学员评价 | 完整 CRUD |
| 师资管理 | 完整 CRUD |

### 8.3 Phase 3: 扩展模块（2-3 天）

| 任务 | 说明 |
|------|------|
| 合作品牌 | 完整 CRUD |
| 学考合一动态 | 完整 CRUD + 图片刷新 |
| 快速入口 | 完整 CRUD |
| 院校管理 | 完整 CRUD |
| 专业管理 | 完整 CRUD |

### 8.4 Phase 4: 商业模块（2-3 天）

| 任务 | 说明 |
|------|------|
| 伴学套餐 | 完整 CRUD |
| 合伙人计划 | 完整 CRUD |
| OEM 案例 | 完整 CRUD |
| 合作自习室 | 完整 CRUD |
| 留言管理 | 列表 + 回复 |

### 8.5 Phase 5: 系统模块（1-2 天）

| 任务 | 说明 |
|------|------|
| APP 下载 | 配置管理 |
| 系统设置 | 平台信息 + 权限管理 |
| 系统配置 | 键值对管理 |
| 数据统计 | 指标卡片 + 图表 |

---

## 9. 交互设计规范

### 9.1 通用 CRUD 流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   列表展示    │────▶│   新建/编辑   │────▶│   表单提交    │────▶│   刷新列表    │
│  (数据获取)   │     │ (Dialog弹窗) │     │(INSERT/UPDATE)│     │  (重新fetch) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                                        │
       │              ┌─────────────┐           │
       └─────────────▶│   删除确认    │◀──────────┘
                      │ (confirm)   │
                      │ (DELETE)    │
                      └─────────────┘
```

**核心状态管理**：

```typescript
// 每个页面的核心状态结构
const [items, setItems] = useState<any[]>([]);           // 数据列表
const [loading, setLoading] = useState(true);            // 加载状态
const [dialogOpen, setDialogOpen] = useState(false);     // 弹窗开关
const [editingItem, setEditingItem] = useState<any>(null); // 当前编辑项（null=新建）
const [formData, setFormData] = useState({...});          // 表单数据
```

**新建 vs 编辑判断**：

```typescript
const handleOpenDialog = (item?: any) => {
  setEditingItem(item || null);
  setFormData(item ? { ...item } : { /* 默认值 */ });
  setDialogOpen(true);
};

const handleSubmit = async () => {
  if (editingItem) {
    await supabase.from('table').update(formData).eq('id', editingItem.id);
  } else {
    await supabase.from('table').insert(formData);
  }
  setDialogOpen(false);
  fetchItems();
};
```

### 9.2 启用/禁用 (isActive) 交互

**乐观更新 + 即时切换**：

```typescript
const handleToggleActive = async (id: string, newValue: boolean) => {
  // 1. 乐观更新：先更新本地状态
  setItems(prev => prev.map(item =>
    item.id === id ? { ...item, isActive: newValue } : item
  ));

  // 2. 异步调用 API 持久化
  const { error } = await supabase
    .from('table')
    .update({ is_active: newValue })
    .eq('id', id);

  if (error) {
    // 回滚
    fetchItems();
    showNotification('更新失败', 'error');
  }
};
```

**UI 表现**：
- `isActive: true` → Switch 开启（绿色）
- `isActive: false` → Switch 关闭（灰色/灰显）

### 9.3 排序 (sortOrder) 交互

- `sortOrder` 数值越小越靠前
- 新建项目默认 `sortOrder = 列表长度`（排到最后）
- 前端实时排序展示

```typescript
const sortedItems = [...items].sort((a, b) =>
  (a.sort_order || 0) - (b.sort_order || 0)
);
```

### 9.4 通知系统

```typescript
const [notification, setNotification] = useState<{
  message: string;
  type: 'success' | 'error';
} | null>(null);

// 显示后 3 秒自动消失
const showNotification = (message: string, type: 'success' | 'error') => {
  setNotification({ message, type });
  setTimeout(() => setNotification(null), 3000);
};
```

### 9.5 批量操作（学员案例）

```typescript
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

const toggleSelect = (id: string) => {
  const newSelected = new Set(selectedIds);
  newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
  setSelectedIds(newSelected);
};

const handleBatchDelete = async () => {
  if (selectedIds.size === 0) return;
  if (!confirm(`确定删除选中的 ${selectedIds.size} 条？`)) return;

  for (const id of selectedIds) {
    await supabase.from('students').delete().eq('id', id);
  }
  setSelectedIds(new Set());
  fetchItems();
};
```

---

## 10. 各模块详细功能

### 10.1 资讯管理 (News)

| 功能 | 说明 | AI 预留 |
|------|------|---------|
| 列表展示 | 卡片网格，支持搜索、分类筛选 | - |
| 新增/编辑 | Dialog 表单，支持富文本 | - |
| 删除 | confirm 确认后删除 | - |
| 启用/禁用 | Switch 即时切换 (isActive) | - |
| 热门标记 | Switch 即时切换 (isHot) | - |
| 精选标记 | Switch 即时切换 (isFeatured) | - |
| 排序 | sortOrder 字段控制 | - |
| AI 生成 | 关键词 + 分类生成资讯 | ✅ 预留接口 |
| AI 纠错 | 检测错别字、语法问题 | ✅ 预留接口 |
| AI 重写 | 基于现有标题重新生成 | ✅ 预留接口 |
| 一键纠错全部 | SSE 流式进度返回 | ✅ 预留接口 |
| AI 生成封面图 | 生成后自动填充到表单 | ✅ 预留接口 |
| 同步到公众号 | 上传草稿到微信公众号 | ✅ 预留接口 |

### 10.2 合作品牌 (Partners)

| 功能 | 说明 |
|------|------|
| 列表展示 | 品牌 Logo 网格 |
| 图片样式控制 | 宽度、高度、缩放、透明度 |
| 从文件夹导入 | 扫描 `public/assets/universities/` 目录 |
| 实时预览 | 预览前台品牌展示效果 |

### 10.3 学员评价 (Testimonials)

| 功能 | 说明 |
|------|------|
| 评分显示 | 1-5 星可视化 |
| 文字头像 | 取姓氏首字作为头像 |
| AI 随机生成 | 生成假评价用于测试 |

### 10.4 师资管理 (Teachers)

| 功能 | 说明 |
|------|------|
| 预设学科 | 语文、数学、英语、物理、化学、生物、政治、历史、地理、道法、英语口语 |
| 预设头衔 | 教研专家组、特级教师、高级教师、骨干教师等 |
| 修复图片签名 | 批量刷新教师图片的签名 URL |

### 10.5 成就动态 (Achievements)

| 功能 | 说明 |
|------|------|
| 图标类型 | trophy, award, target, users |
| 分类 | 荣誉奖项、会议参与、展会活动、里程碑、技术突破 |
| 高亮标记 | highlight: true 前台放大展示 |
| 刷新图片签名 | 批量刷新成就图片的签名 URL |

### 10.6 Hero Banner 管理

| 功能 | 说明 |
|------|------|
| 左右分栏 | 左侧编辑表单 + 右侧实时预览 |
| 设备模拟 | 桌面(100%) / 平板(768px) / 手机(375px) |
| 渐变遮罩 | 可选叠加渐变效果 |
| 按钮图标 | PlayCircle, GraduationCap, Users, FileText, BookOpen |

---

## 11. 通用组件规范

### 11.1 ImageUpload 组件

**支持两种输入方式**：
1. **文件上传**：选择本地文件 → 上传到 Supabase Storage → 返回 URL
2. **URL 输入**：直接粘贴图片 URL

**上传流程**：

```typescript
// 1. 校验文件
if (!file.type.startsWith('image/')) {
  alert('请选择图片文件');
  return;
}
if (file.size > 5 * 1024 * 1024) {
  alert('图片大小不能超过 5MB');
  return;
}

// 2. 上传到 Supabase Storage
const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
const { data, error } = await supabase.storage
  .from('images')
  .upload(fileName, file);

// 3. 获取公开 URL
const { data: { publicUrl } } = supabase.storage
  .from('images')
  .getPublicUrl(fileName);
```

**样式控制字段**：

| 参数 | 说明 | 范围 |
|------|------|------|
| imageWidth | 宽度(px) | 20-2000 |
| imageHeight | 高度(px) | 20-2000 |
| imageScale | 缩放(%) | 10-200 |
| imageOpacity | 透明度(%) | 0-100 |

### 11.2 PreviewPane 组件

**结构**：

```
PreviewPane
├── 头部工具栏（标题 + 设备切换 + 刷新开关）
├── 预览内容区（设备宽度容器）
└── 收起状态的浮动按钮
```

**设备宽度**：

| 设备 | 宽度 | 说明 |
|------|------|------|
| desktop | 100% | 全宽展示 |
| tablet | 768px | iPad 竖屏 |
| mobile | 375px | iPhone 标准 |

---

## 12. 页面交互速查表

| 页面 | 新建 | 编辑 | 删除 | 启用/禁用 | 排序 | 图片上传 | 图片样式 | AI生成 | 实时预览 | 批量操作 | 文件夹导入 | 特殊功能 |
|------|:----:|:----:|:----:|:--------:|:----:|:-------:|:-------:|:------:|:-------:|:-------:|:---------:|---------|
| 资讯管理 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* | - | - | - | AI纠错/重写/一键纠错/封面图/微信同步 |
| 合作品牌 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ | - | ✅ | 从文件夹导入 |
| 学员评价 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* | - | - | - | 随机生成评价 |
| 学员案例 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | ✅ | - | 分页/多选/批量删除/详情查看 |
| 师资管理 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | 修复图片签名URL |
| 成就动态 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | 刷新图片签名/高亮标记 |
| Hero Banner | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ | - | - | 渐变遮罩/设备模拟 |
| 快速入口 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | - | - |
| 院校管理 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | - | 分类/985/211筛选 |
| 专业管理 | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | - | - | 学科门类筛选 |
| 留言管理 | - | - | ✅ | - | - | - | - | - | - | - | - | 查看/回复/标记已读 |
| 系统配置 | ✅ | ✅ | ✅ | ✅ | - | - | - | - | - | - | - | 分类筛选 |

> *AI 生成功能预留接口，暂不实现

---

## 13. 验收标准

1. **样式隔离**: 修改后台样式不影响前台 UI
2. **功能完整**: 所有 20 个模块均可正常使用
3. **AI 预留**: AI 相关按钮显示但暂不可用，有友好提示
4. **认证安全**: 未登录无法访问 /admin/* 页面
5. **响应式**: 后台支持移动端基本访问
6. **交互一致**: 所有页面遵循统一的 CRUD、启用/禁用、排序规范

---

## 14. 风险与应对

| 风险 | 应对措施 |
|------|----------|
| Supabase 表不存在 | 创建数据库迁移脚本 |
| 样式冲突 | 使用独立 CSS 文件和 admin- 前缀 |
| 性能问题 | 数据表格分页 + 懒加载 |
| AI 接入复杂 | 预留接口，后续按需接入 |
| 图片存储 | 统一使用 Supabase Storage |

---

> **审阅后请确认是否开始实施**
