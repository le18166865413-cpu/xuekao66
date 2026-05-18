# 后台管理系统 - 交互功能与原理补充说明

> 本文档是对 `admin-documentation.md` 的补充，详细描述每个后台页面的交互功能、原理逻辑和实现细节。

---

## 目录

1. [通用交互模式](#1-通用交互模式)
2. [资讯管理 - 交互详解](#2-资讯管理---交互详解)
3. [合作品牌管理 - 交互详解](#3-合作品牌管理---交互详解)
4. [学员评价管理 - 交互详解](#4-学员评价管理---交互详解)
5. [学员案例管理 - 交互详解](#5-学员案例管理---交互详解)
6. [师资展示管理 - 交互详解](#6-师资展示管理---交互详解)
7. [成就动态管理 - 交互详解](#7-成就动态管理---交互详解)
8. [Hero Banner 管理 - 交互详解](#8-hero-banner-管理---交互详解)
9. [通用图片上传组件原理](#9-通用图片上传组件原理)
10. [实时预览系统原理](#10-实时预览系统原理)

---

## 1. 通用交互模式

### 1.1 CRUD 标准流程

所有管理页面遵循统一的 CRUD 交互模式：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   列表展示    │────▶│   新建/编辑   │────▶│   表单提交    │────▶│   刷新列表    │
│  (GET /api)  │     │ (Dialog弹窗) │     │(POST/PUT)   │     │  (重新fetch) │
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

**新建 vs 编辑 判断逻辑**：

```typescript
const handleOpenDialog = (item?: any) => {
  setEditingItem(item || null);
  if (item) {
    // 编辑模式：将现有数据填充到表单
    setFormData({ ...item });
  } else {
    // 新建模式：重置表单为默认值
    setFormData({ /* 默认值 */ });
  }
  setDialogOpen(true);
};

// 提交时根据 editingItem 是否为 null 决定 POST 或 PUT
const handleSubmit = async () => {
  const url = editingItem
    ? `/api/admin/xxx/${editingItem.id}`  // 编辑 → PUT
    : '/api/admin/xxx';                    // 新建 → POST
  const method = editingItem ? 'PUT' : 'POST';
  await fetch(url, { method, body: JSON.stringify(formData) });
  setDialogOpen(false);
  fetchItems(); // 重新加载列表
};
```

### 1.2 启用/禁用 (isActive) 交互

**实现方式**：Switch 组件 + 即时 API 调用

```typescript
// 前端即时切换，无需弹窗确认
const handleToggleActive = async (id: string, newValue: boolean) => {
  // 1. 乐观更新：先更新本地状态
  setItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, isActive: newValue } : item
    )
  );

  // 2. 异步调用 API 持久化
  await fetch(`/api/admin/xxx/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive: newValue }),
  });
};
```

**UI 表现**：

- `isActive: true` → Switch 开启（绿色），列表中正常显示
- `isActive: false` → Switch 关闭（灰色），列表中灰显或标记"已禁用"

**前台影响**：前台 API 查询时自动过滤 `isActive = true` 的记录，禁用的数据不会展示。

### 1.3 排序 (sortOrder) 交互

**实现方式**：数字输入 + 列表自动排序

```typescript
// 前端排序逻辑
const sortedItems = [...items].sort((a, b) => {
  return (a.sortOrder || 0) - (b.sortOrder || 0);
});
```

- `sortOrder` 越小越靠前
- 新建项目默认 `sortOrder = 当前列表长度`（排到最后）
- 用户可手动修改 sortOrder 值调整顺序

### 1.4 删除交互

**实现方式**：`confirm()` 确认 + DELETE 请求

```typescript
const handleDelete = async (id: string) => {
  if (!confirm('确定删除？')) return;  // 浏览器原生确认框
  const response = await fetch(`/api/admin/xxx/${id}`, { method: 'DELETE' });
  if (response.ok) {
    fetchItems(); // 刷新列表
    alert('删除成功');
  }
};
```

**批量删除**（学员案例页面）：

```typescript
const handleBatchDelete = async () => {
  if (selectedIds.size === 0) return;
  // 逐个发送 DELETE 请求，并行执行
  const deletePromises = Array.from(selectedIds).map(id =>
    fetch(`/api/admin/xxx/${id}`, { method: 'DELETE' })
  );
  await Promise.all(deletePromises);
  setSelectedIds(new Set()); // 清空选中
  await loadStudents();       // 重新加载
};
```

### 1.5 通知系统

**实现方式**：页面级状态 + 自动消失

```typescript
const [notification, setNotification] = useState<{
  message: string;
  type: 'success' | 'error';
} | null>(null);

// 显示通知
setNotification({ message: '操作成功', type: 'success' });

// 3-5秒后自动消失
setTimeout(() => setNotification(null), 3000);
```

---

## 2. 资讯管理 - 交互详解

### 2.1 AI 生成资讯

**交互流程**：

```
用户点击"AI生成" → 弹出AI生成对话框 → 输入关键词/分类/数量 → 点击生成
    │
    ▼
POST /api/admin/news/generate
{
  keyword: "高考改革",    // 可选，为空时自动抓取阳光高考网
  category: "政策解读",
  count: 1               // 1条：填充到编辑表单；多条：批量保存
}
    │
    ▼
后端调用 doubao-seed-2-0-lite 模型生成
    │
    ▼
count=1 → 自动填充到编辑表单，用户可修改后手动保存
count>1 → 批量调用 POST /api/admin/news 逐条保存
```

**原理**：
- 模型：`doubao-seed-2-0-lite-260215`
- 关键词为空时，后端自动从阳光高考网抓取最新教育资讯作为生成素材
- 生成的资讯包含：title、summary、content、category、tag、readTime

### 2.2 AI 纠错

**交互流程**：

```
用户在编辑表单中点击"AI纠错" →
POST /api/admin/news/correct
{
  id: "xxx",            // 可选，文章ID
  title: "...",
  summary: "...",
  content: "...",
  category: "...",
  tag: "..."
}
    │
    ▼
后端调用 deepseek-v3-2 模型检查并纠错
    │
    ▼
返回纠错后的内容 → 自动覆盖到表单中
用户确认后手动保存
```

**原理**：
- 模型：`deepseek-v3-2-251201`
- 检查范围：标题准确性、摘要精简度、内容错别字/语法、分类/标签匹配度
- 纠错结果直接填充到表单，用户可二次修改

### 2.3 AI 重写

**交互流程**：

```
用户在编辑表单中点击"AI重写" →
POST /api/admin/news/generate（复用生成接口）
{
  keyword: formData.title,  // 以当前标题为关键词
  category: formData.category,
  count: 1
}
    │
    ▼
返回重写后的内容 → 覆盖到表单
```

### 2.4 一键纠错全部

**交互流程**：

```
用户点击"一键纠错全部" → confirm确认 →
POST /api/admin/news/fix-all
    │
    ▼
后端使用 SSE (Server-Sent Events) 流式返回进度
    │
    ▼
前端通过 ReadableStream 实时读取进度
每处理一篇返回: { type: "success"|"skipped", current, total, message }
    │
    ▼
进度条实时更新: "正在处理 3/20: xxx文章"
    │
    ▼
全部完成: "纠错完成！已修复 X 篇，跳过 Y 篇"
```

**SSE 流式读取原理**：

```typescript
const response = await fetch('/api/admin/news/fix-all', { method: 'POST' });
const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const text = decoder.decode(value);
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const event = JSON.parse(line.slice(6));
      // 更新进度: { current, total, message }
      setFixProgress(event);
    }
  }
}
```

### 2.5 AI 生成封面图

**交互流程**：

```
用户点击"生成封面图" →
POST /api/admin/news/generate-image
{
  title: "...",
  summary: "..."
}
    │
    ▼
后端调用 AI 图片生成模型 → 上传到对象存储 → 返回签名URL
    │
    ▼
自动填充到表单的 image 字段
```

**快速生成**（列表页直接生成）：

```
用户在列表中点击某条新闻的"生成封面图"图标 →
同上调用 → 生成成功后自动更新数据库
```

### 2.6 启用/禁用/热门/精选切换

**交互方式**：列表中直接点击 Switch 切换，无需弹窗

```typescript
const handleToggleNewsStatus = async (itemId: string, field: string, newValue: boolean) => {
  // 1. 乐观更新本地状态
  setNews(prevNews =>
    prevNews.map(item =>
      item.id === itemId ? { ...item, [field]: newValue } : item
    )
  );

  // 2. 异步更新数据库
  await fetch(`/api/admin/news/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ [field]: newValue }),
  });
};
```

**三个开关**：
- `isActive`：是否在前台展示
- `isHot`：是否标记为热门（红色标签）
- `isFeatured`：是否标记为精选（推荐展示）

### 2.7 同步到微信公众号

**交互流程**：

```
用户点击"同步到公众号" →
  ├─ 未配置微信 → 提示"请先配置环境变量"
  ├─ 未保存文章 → 提示"请先保存"
  ├─ 无封面图 → 提示"微信公众号必须有封面图"
  └─ 检查通过 → confirm确认 →
POST /api/admin/news/sync-wechat
{ newsId: "xxx" }
    │
    ▼
后端流程:
1. 获取 access_token（带缓存，2小时有效期）
2. 如果文章有图片，上传到微信素材库获取 media_id
3. 将 HTML 内容转换为微信公众号精美排版
4. 调用微信草稿箱接口添加草稿
    │
    ▼
返回成功: "文章已保存到草稿箱，请在公众号后台查看"
```

---

## 3. 合作品牌管理 - 交互详解

### 3.1 从文件夹导入

**交互流程**：

```
用户点击"从文件夹导入" →
GET /api/admin/partners/sync-from-folder
    │
    ▼
后端扫描 /public/assets/universities/ 目录
返回图片列表 → 弹出预览对话框
    │
    ▼
用户确认 →
POST /api/admin/partners/sync-from-folder
    │
    ▼
后端为每张图片创建品牌记录：
- name: 从文件名提取（如"北京大学.png" → "北京大学"）
- image: /assets/universities/北京大学.png
- isActive: true
- sortOrder: 递增
```

**原理**：
- 扫描服务器本地 `public/assets/universities/` 目录
- 从文件名中提取品牌名（去除扩展名）
- 自动跳过已存在的同名品牌

### 3.2 品牌图片样式控制

每个品牌可独立控制图片的显示参数：

| 参数 | 说明 | 默认值 | 范围 |
|------|------|--------|------|
| imageWidth | 图片宽度(px) | 80 | 20-2000 |
| imageHeight | 图片高度(px) | 80 | 20-2000 |
| imageScale | 缩放比例(%) | 100 | 10-200 |
| fontSize | 文字大小(px) | 14 | - |
| fontWeight | 文字粗细 | normal | normal/medium/bold |

### 3.3 实时预览

```
左侧: 编辑表单（品牌列表 + 编辑弹窗）
右侧: PreviewPane 预览面板

点击"预览"按钮 → 右侧面板展示前台品牌轮播效果
支持设备切换: 桌面(100%) / 平板(768px) / 手机(375px)
```

---

## 4. 学员评价管理 - 交互详解

### 4.1 AI 随机生成评价

**交互流程**：

```
用户点击"随机生成"按钮 →
POST /api/admin/testimonials/generate-random
    │
    ▼
后端随机生成一条学员评价数据
    │
    ▼
自动填充到新建表单（不自动保存，用户需手动确认）
```

**生成内容**：
- name：随机中文姓名
- avatar：取姓氏首字
- rating：5（固定满分）
- content：随机生成的评价文本
- course：随机课程名

### 4.2 评价表单字段

| 字段 | 类型 | 说明 |
|------|------|------|
| name | Input | 学员姓名 |
| avatar | ImageUpload | 头像（支持上传或URL输入） |
| role | Input | 角色/身份 |
| rating | Select | 评分(1-5)，下拉选择 |
| content | Textarea | 评价内容 |
| course | Input | 课程名称 |
| backgroundImage | ImageUpload | 背景图（含宽高/缩放/透明度控制） |
| isActive | Switch | 是否启用 |
| sortOrder | Input | 排序权重 |

### 4.3 评分显示

```typescript
// 前端渲染星星评分
{[1, 2, 3, 4, 5].map((star) => (
  <Star
    key={star}
    className={`h-4 w-4 ${star <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
  />
))}
```

---

## 5. 学员案例管理 - 交互详解

### 5.1 分页功能

```typescript
const [page, setPage] = useState(1);
const pageSize = 4; // 每页4条

const totalPages = Math.ceil(students.length / pageSize);
const startIndex = (page - 1) * pageSize;
const currentStudents = students.slice(startIndex, startIndex + pageSize);
```

**UI 表现**：底部分页器，显示"第 X-Y 条，共 Z 条"

### 5.2 多选与批量操作

**交互流程**：

```
┌──────────────────────────────────────────┐
│  ☐ 全选    │ 学员1 │ 学员2 │ 学员3 │ ... │
│  ☑ 学员1   │  详情  │  编辑  │  删除  │     │
│  ☑ 学员3   │  详情  │  编辑  │  删除  │     │
└──────────────────────────────────────────┘
                              │
                    已选 2 项 │ [批量删除]
                              ▼
                    confirm("确定删除选中的2条？")
```

**选中逻辑**：

```typescript
// 单选切换
const toggleSelect = (studentId: string) => {
  const newSelectedIds = new Set(selectedIds);
  if (newSelectedIds.has(studentId)) {
    newSelectedIds.delete(studentId);
  } else {
    newSelectedIds.add(studentId);
  }
  setSelectedIds(newSelectedIds);
};

// 全选/取消全选（仅当前页）
const toggleSelectAll = () => {
  if (currentStudents.every(s => selectedIds.has(s.id))) {
    // 取消全选当前页
    currentStudents.forEach(s => selectedIds.delete(s.id));
  } else {
    // 全选当前页
    currentStudents.forEach(s => selectedIds.add(s.id));
  }
};
```

### 5.3 详情查看

**交互流程**：

```
用户点击"详情"按钮 →
setSelectedStudent(student) →
setIsDetailDialogOpen(true) →
弹出详情 Dialog（只读模式，展示所有字段）
```

**详情字段**：
- 基本信息：姓名、学校、录取院校、专业、科目、提分情况
- 详细内容：学员故事、家长评价
- 附件：照片、成绩对比图、协议文件
- 状态：published/pending/draft

### 5.4 状态管理

学员案例有三态：

| 状态 | 含义 | 前台展示 |
|------|------|---------|
| published | 已发布 | 展示 |
| pending | 待审核 | 不展示 |
| draft | 草稿 | 不展示 |

**数据库映射**：`isActive: true → published, isActive: false → draft`

### 5.5 文件上传（照片/成绩对比/协议）

```typescript
const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
  // 1. 校验文件类型
  if (!file.type.startsWith('image/')) { alert('请选择图片文件'); return; }

  // 2. 校验文件大小 (5MB)
  if (file.size > 5 * 1024 * 1024) { alert('图片大小不能超过5MB'); return; }

  // 3. 上传到对象存储
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/upload', { method: 'POST', body: formData });

  // 4. 获取签名URL
  const data = await response.json();
  onSuccess(data.url); // 回调设置URL到表单
};
```

---

## 6. 师资展示管理 - 交互详解

### 6.1 师资表单字段

| 字段 | 类型 | 说明 |
|------|------|------|
| name | Input | 教师姓名 |
| school | Select | 头衔/所属机构（预设列表） |
| description | Textarea | 教师简介（支持多行格式） |
| subject | Select | 学科（预设列表） |
| avatar | ImageUpload | 头像 |
| backgroundImage | ImageUpload | 背景图 |
| isActive | Switch | 是否启用 |
| sortOrder | Input | 排序权重 |

### 6.2 预设选项

**学科列表**：语文、数学、英语、物理、化学、生物、政治、历史、地理、道法、英语口语

**头衔列表**：教研专家组、中学特级教师、特级教师、正高级教学专家、高级教师、骨干教师、学科带头人、学科负责人、首席教研师、高考教学专家、教研部XX教师

### 6.3 修复图片签名URL

```
用户点击"修复图片"按钮 →
POST /api/admin/teachers/fix-images
    │
    ▼
后端遍历所有教师记录:
1. 检查 backgroundImage 是否包含过期签名
2. 从 URL 中提取 objectKey
3. 重新生成10年有效期的签名URL
4. 更新数据库记录
```

---

## 7. 成就动态管理 - 交互详解

### 7.1 成就表单字段

| 字段 | 类型 | 说明 |
|------|------|------|
| title | Input | 成就标题 |
| description | Textarea | 成就描述 |
| date | Input | 日期（如"2024年12月"） |
| location | Input | 地点 |
| image | ImageUpload | 背景图片 |
| icon | Select | 图标类型 |
| category | Select | 分类 |
| highlight | Switch | 是否高亮 |
| isActive | Switch | 是否启用 |
| sortOrder | Input | 排序权重 |

### 7.2 图标类型

| icon值 | 对应图标 | 适用场景 |
|--------|---------|---------|
| trophy | 🏆 Trophy | 荣誉奖项 |
| award | 🏅 Award | 获奖表彰 |
| target | 🎯 Target | 技术突破、目标达成 |
| users | 👥 Users | 会议参与、学员里程碑 |

### 7.3 分类

| 分类 | 说明 |
|------|------|
| 荣誉奖项 | 获得的奖项、认证 |
| 会议参与 | 参加的行业会议 |
| 会议举办 | 主办的会议活动 |
| 展会活动 | 参展的展会 |
| 里程碑 | 服务学员突破等 |
| 技术突破 | 自主研发成果 |

### 7.4 高亮标记 (highlight)

- `highlight: true` → 前台以更大尺寸/醒目样式展示
- `highlight: false` → 前台以普通尺寸展示
- 用于区分核心成就和一般成就

### 7.5 刷新图片签名URL

**交互流程**：

```
用户点击"刷新图片"按钮 →
confirm("确定要刷新所有成就图片的签名URL吗？") →
POST /api/admin/achievements/refresh-images
    │
    ▼
后端流程:
1. 查询所有成就记录
2. 遍历每条记录的 image 字段
3. 从 URL 中解析 objectKey
4. 使用 storage-signature 工具重新生成签名URL
5. 签名有效期: 10年（公开资源策略）
6. 更新数据库中的 image 字段
    │
    ▼
返回: { success: true, updated: 8, total: 8, expireTimeReadable: "10年" }
```

---

## 8. Hero Banner 管理 - 交互详解

### 8.1 Banner 表单字段

| 字段 | 类型 | 说明 |
|------|------|------|
| key | Select | 页面标识 |
| badge | Input | 角标文本（如"新课上线"） |
| title | Input | 主标题 |
| description | Textarea | 副标题描述 |
| primaryButtonText | Input | 主按钮文本 |
| primaryButtonLink | Input | 主按钮链接 |
| primaryButtonIcon | Select | 主按钮图标 |
| secondaryButtonText | Input | 副按钮文本 |
| secondaryButtonLink | Input | 副按钮链接 |
| backgroundImage | ImageUpload | 背景图 |
| gradientClass | Input | 渐变遮罩CSS类 |
| isActive | Switch | 是否启用 |
| sortOrder | Input | 排序权重 |

### 8.2 页面标识 (key)

| key值 | 对应前台页面 |
|-------|------------|
| courses | 课程页面 |
| assessment | 测评页面 |
| consultation | 咨询页面 |
| materials | 资料页面 |

### 8.3 主按钮图标

| 图标名 | 图标 | 适用场景 |
|--------|------|---------|
| PlayCircle | ▶ | 视频课程 |
| GraduationCap | 🎓 | 学历教育 |
| Users | 👥 | 团队服务 |
| FileText | 📄 | 资料下载 |
| BookOpen | 📖 | 课程学习 |

### 8.4 实时预览系统

**交互方式**：左右分栏布局

```
┌──────────────────────────────────────────────────────────────┐
│                    Hero Banner 管理                            │
├─────────────────────────┬────────────────────────────────────┤
│                         │  👁 实时预览     [🖥] [📱] [💻]   │
│   编辑表单               │  ┌──────────────────────────────┐  │
│                         │  │  [角标]                       │  │
│   Key: [courses ▼]      │  │  主标题                       │  │
│   标题: [_________]      │  │  副标题描述                    │  │
│   描述: [_________]      │  │  [主按钮] [副按钮]             │  │
│   按钮: [_________]      │  └──────────────────────────────┘  │
│   背景: [上传图片]        │                                    │
│                         │  设备: 桌面(100%) | 平板(768px) |    │
│                         │       手机(375px)                   │
└─────────────────────────┴────────────────────────────────────┘
```

**预览原理**：
1. 用户在左侧编辑表单
2. 右侧 PreviewPane 组件实时渲染前台效果
3. 表单数据变化时，预览自动更新（React 状态驱动）
4. 支持三种设备宽度模拟

### 8.5 渐变遮罩

**gradientClass** 字段控制背景图上的渐变遮罩：

```
backgroundImage + gradientClass 叠加效果:
┌─────────────────────────────┐
│  [背景图片]                  │
│  + [渐变遮罩 from-blue-600]  │  ← 可控制透明度
│  = [最终效果]                │
│    白色文字在渐变上清晰可见    │
└─────────────────────────────┘
```

---

## 9. 通用图片上传组件原理

### 9.1 ImageUpload 组件

**文件位置**：`src/components/admin/image-upload.tsx`

**支持两种图片输入方式**：

1. **文件上传**：选择本地文件 → 上传到对象存储 → 获取签名URL
2. **URL输入**：直接粘贴图片URL

**上传流程**：

```
选择文件 → 校验(类型+大小) → FormData → POST /api/upload
    │
    ▼
后端处理:
1. 读取文件 → 上传到对象存储
2. 根据文件夹类型设置签名有效期:
   - 公开资源(achievements/brands/teachers/news): 10年
   - 用户资源(avatars/uploads): 30天
   - 默认: 1年
3. 返回 { success: true, data: { url, expireTime, expireTimeReadable } }
    │
    ▼
前端设置 imageUrl → 触发预览渲染
```

**校验规则**：
- 文件类型：必须以 `image/` 开头
- 文件大小：最大 5MB

### 9.2 图片样式控制

每个图片可独立控制以下参数：

| 参数 | 组件 | 范围 | 默认值 |
|------|------|------|--------|
| imageWidth | Input(number) | 20-2000 | 200 |
| imageHeight | Input(number) | 20-2000 | 150 |
| imageScale | Slider | 10-200 | 100 |
| imageOpacity | Slider | 0-100 | 100 |
| customStyle | Input(text) | CSS字符串 | '' |

**预览渲染逻辑**：

```typescript
<img
  src={image}
  style={{
    width: `${imageScale}%`,
    height: 'auto',
    opacity: imageOpacity / 100,
    objectFit: 'contain',
  }}
/>
```

### 9.3 图片加载状态处理

```typescript
onError={(e) => {
  // 图片加载失败（如签名URL过期）→ 隐藏图片
  e.currentTarget.style.display = 'none';
}}
onLoad={(e) => {
  // 图片加载成功 → 显示图片
  e.currentTarget.style.display = 'block';
}}
```

---

## 10. 实时预览系统原理

### 10.1 PreviewPane 组件

**文件位置**：`src/components/admin/preview-pane.tsx`

**组件结构**：

```
PreviewPane
├── 头部工具栏
│   ├── 标题 + 加载状态指示器
│   ├── 设备切换按钮组 (桌面/平板/手机)
│   ├── 实时刷新开关
│   └── 展开/收起按钮
├── 预览内容区
│   └── 设备宽度容器
│       └── previewComponent (React.ReactNode)
└── PreviewToggle (收起状态的浮动按钮)
```

**设备宽度映射**：

| 设备 | 宽度 | CSS |
|------|------|-----|
| desktop | 100% | 全宽展示 |
| tablet | 768px | iPad 竖屏 |
| mobile | 375px | iPhone 标准宽度 |

**实时更新原理**：

```
编辑表单状态变化 (formData)
        │
        ▼
React 重新渲染
        │
        ▼
PreviewPane 接收新的 previewComponent prop
        │
        ▼
预览内容自动更新（无需手动刷新）
```

- **自动刷新**：默认开启，表单数据变化时预览自动更新
- **手动刷新**：关闭自动刷新后，需点击刷新按钮

### 10.2 页面专属预览组件

| 管理页面 | 预览组件 | 预览内容 |
|---------|---------|---------|
| Hero Banner | `HeroBannerPreview` | 完整 Hero 区域：背景图+渐变+标题+按钮 |
| 合作品牌 | `PartnersCarouselPreview` | 品牌网格：图片+灰度hover效果 |
| 成就动态 | (使用通用预览) | 成就卡片样式 |

**HeroBannerPreview 详细逻辑**：

```typescript
// 1. 背景层：图片 or 渐变
{data.backgroundImage ? (
  <img src={data.backgroundImage} style={{
    width: data.imageWidth, height: data.imageHeight,
    transform: `scale(${data.imageScale / 100})`,
    opacity: data.imageOpacity / 100,
  }} />
) : (
  <div className={`bg-gradient-to-r ${data.gradientClass}`} />
)}

// 2. 渐变遮罩层（可选）
{data.gradientClass && (
  <div className={`bg-gradient-to-r ${data.gradientClass}`} style={{ opacity: 0.7 }} />
)}

// 3. 内容层：角标 + 标题 + 描述 + 按钮
{data.badge && <span className="badge">{data.badge}</span>}
<h1>{data.title}</h1>
<p>{data.description}</p>
<Button>{data.primaryButtonText}</Button>
```

---

## 附录：各页面交互功能速查表

| 页面 | 新建 | 编辑 | 删除 | 启用/禁用 | 排序 | 图片上传 | 图片样式 | AI生成 | 实时预览 | 批量操作 | 文件夹导入 | 特殊功能 |
|------|:----:|:----:|:----:|:--------:|:----:|:-------:|:-------:|:------:|:-------:|:-------:|:---------:|---------|
| 资讯管理 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | AI纠错/重写/一键纠错/生成封面/微信同步 |
| 合作品牌 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ | - | ✅ | 从文件夹导入 |
| 学员评价 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | 随机生成评价 |
| 学员案例 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | ✅ | - | 分页/多选/批量删除/详情查看 |
| 师资展示 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | ✅ | - | 修复图片签名URL |
| 成就动态 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | - | - | - | 刷新图片签名URL/高亮标记 |
| Hero Banner | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | ✅ | - | - | 渐变遮罩/按钮图标/设备模拟 |
