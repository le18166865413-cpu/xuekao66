# 后台管理系统实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 React SPA 项目中构建完整的后台管理系统，包含 20 个管理模块。

**Architecture:** 后台使用独立样式体系（admin- 前缀），通过 React Router 管理路由，Supabase 作为数据源，Session 存储在 localStorage。

**Tech Stack:** React 18 + React Router 6 + Supabase + Tailwind CSS + Lucide React + React Hook Form + Zod

---

## 文件结构

```
src/
├── components/
│   └── admin/                      # 后台专用组件
│       ├── AdminLayout.tsx         # 后台布局
│       ├── AdminSidebar.tsx        # 侧边栏
│       ├── AdminHeader.tsx         # 顶部栏
│       ├── DataTable.tsx           # 通用表格
│       ├── DataCard.tsx            # 通用卡片
│       ├── DataDialog.tsx          # 通用弹窗表单
│       ├── ImageUpload.tsx         # 图片上传
│       ├── PreviewPane.tsx         # 实时预览
│       ├── Notification.tsx        # 通知提示
│       ├── ConfirmDialog.tsx       # 确认对话框
│       └── Switch.tsx              # 开关组件
├── pages/
│   └── admin/                      # 后台页面
│       ├── Login.tsx               # 登录
│       ├── Dashboard.tsx           # 数据统计
│       ├── News.tsx                # 资讯管理
│       ├── Courses.tsx             # 课程管理
│       ├── Users.tsx               # 用户管理
│       ├── Partners.tsx            # 合作品牌
│       ├── Testimonials.tsx        # 学员评价
│       ├── Achievements.tsx        # 成就动态
│       ├── Teachers.tsx            # 师资管理
│       ├── Students.tsx            # 学员案例
│       ├── Universities.tsx        # 院校管理
│       ├── Majors.tsx              # 专业管理
│       ├── QuickEntries.tsx        # 快速入口
│       ├── CompanionPlans.tsx      # 伴学套餐
│       ├── PartnerPrograms.tsx     # 合伙人计划
│       ├── OemCases.tsx            # OEM 案例
│       ├── StudyRooms.tsx         # 合作自习室
│       ├── Messages.tsx            # 留言管理
│       ├── AppDownload.tsx         # APP 下载
│       ├── Settings.tsx            # 系统设置
│       └── SystemConfig.tsx        # 系统配置
├── contexts/
│   └── AdminContext.tsx            # 后台 Context
├── hooks/
│   ├── useAdminAuth.ts             # 后台认证
│   ├── useNotification.ts         # 通知
│   └── useDataTable.ts            # 数据表格
├── styles/
│   └── admin.css                   # 后台样式
├── types/
│   └── admin.ts                    # 后台类型
├── lib/
│   └── supabase/
│       └── admin.ts                # 后台 API
└── services/
    └── aiService.ts               # AI 服务（预留）
```

---

## Phase 1: 基础架构

### Task 1: 创建目录和类型定义

**Files:**
- Create: `src/types/admin.ts`
- Create: `src/styles/admin.css`
- Modify: `src/App.tsx` (添加路由)

- [ ] **Step 1: 创建后台类型定义**

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

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onToggle?: (item: T, field: string, value: boolean) => void;
}

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}
```

- [ ] **Step 2: 创建后台样式文件**

```css
/* src/styles/admin.css */

/* 后台布局 */
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 256px;
  background: rgb(15 23 42);
  border-right: 1px solid rgb(30 41 59);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.admin-main {
  flex: 1;
  margin-left: 256px;
  background: rgb(248 250 252);
}

.admin-header {
  height: 64px;
  background: white;
  border-bottom: 1px solid rgb(226 232 240);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.admin-content {
  padding: 24px;
}

/* 卡片样式 */
.admin-card {
  background: white;
  border-radius: 8px;
  border: 1px solid rgb(226 232 240);
  padding: 20px;
}

.admin-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(226 232 240);
}

/* 表格样式 */
.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  text-align: left;
  padding: 12px 16px;
  background: rgb(248 250 252);
  font-weight: 500;
  color: rgb(51 65 85);
  border-bottom: 1px solid rgb(226 232 240);
}

.admin-table td {
  padding: 12px 16px;
  border-bottom: 1px solid rgb(226 232 240);
}

.admin-table tr:hover {
  background: rgb(248 250 252);
}

/* 按钮样式 */
.admin-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-btn-primary {
  background: rgb(37 99 235);
  color: white;
  border: none;
}

.admin-btn-primary:hover {
  background: rgb(29 78 216);
}

.admin-btn-secondary {
  background: white;
  color: rgb(51 65 85);
  border: 1px solid rgb(203 213 225);
}

.admin-btn-secondary:hover {
  background: rgb(248 250 252);
}

.admin-btn-danger {
  background: white;
  color: rgb(239 68 68);
  border: 1px solid rgb(239 68 68);
}

.admin-btn-danger:hover {
  background: rgb(254 242 242);
}

/* 开关样式 */
.admin-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgb(203 213 225);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.admin-switch.active {
  background: rgb(34 197 94);
}

.admin-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.admin-switch.active::after {
  transform: translateX(20px);
}

/* 弹窗样式 */
.admin-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.admin-dialog {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
}

.admin-dialog-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgb(226 232 240);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-dialog-body {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 130px);
}

.admin-dialog-footer {
  padding: 16px 20px;
  border-top: 1px solid rgb(226 232 240);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 表单样式 */
.admin-form-group {
  margin-bottom: 16px;
}

.admin-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51 65 85);
  margin-bottom: 6px;
}

.admin-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgb(203 213 225);
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.admin-input:focus {
  outline: none;
  border-color: rgb(37 99 235);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.admin-textarea {
  min-height: 100px;
  resize: vertical;
}

.admin-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
}

/* 通知样式 */
.admin-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 2000;
  animation: slideIn 0.3s ease;
}

.admin-notification-success {
  background: rgb(34 197 94);
  color: white;
}

.admin-notification-error {
  background: rgb(239 68 68);
  color: white;
}

.admin-notification-info {
  background: rgb(59 130 246);
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 图片上传样式 */
.admin-image-upload {
  border: 2px dashed rgb(203 213 225);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.admin-image-upload:hover {
  border-color: rgb(37 99 235);
}

.admin-image-preview {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

/* 搜索和筛选 */
.admin-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.admin-search {
  flex: 1;
  min-width: 200px;
}

/* 分页样式 */
.admin-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgb(226 232 240);
}

/* 标签徽章 */
.admin-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.admin-badge-success {
  background: rgb(220 252 231);
  color: rgb(21 128 61);
}

.admin-badge-warning {
  background: rgb(254 249 232);
  color: rgb(202 138 4);
}

.admin-badge-danger {
  background: rgb(254 242 242);
  color: rgb(220 38 38);
}

/* 响应式 */
@media (max-width: 1024px) {
  .admin-sidebar {
    display: none;
  }

  .admin-main {
    margin-left: 0;
  }
}
```

- [ ] **Step 3: 添加路由配置到 App.tsx**

在 `src/App.tsx` 中添加 `/admin/*` 路由：

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import News from './pages/admin/News';
// ... 其他页面

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 前台路由保持不变 */}
        <Route path="/" element={<Home />} />
        {/* ... 其他前台路由 */}

        {/* 后台路由 */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<News />} />
          {/* ... 其他后台路由 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Task 2: 后台认证 Context

**Files:**
- Create: `src/contexts/AdminContext.tsx`
- Create: `src/hooks/useAdminAuth.ts`

- [ ] **Step 1: 创建 AdminContext**

```typescript
// src/contexts/AdminContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminSession } from '../types/admin';

interface AdminContextType {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// 默认管理员账户
const ADMIN_ACCOUNTS = [
  { username: 'wuhe', password: '123456', name: '管理员', role: 'super_admin', permissions: ['full_access'] },
];

const SESSION_KEY = 'admin_session';
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 天

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储的 session
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AdminSession;
        const now = Date.now();
        if (now - parsed.loginTime < SESSION_EXPIRY) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const account = ADMIN_ACCOUNTS.find(
      acc => acc.username === username && acc.password === password
    );

    if (!account) {
      return false;
    }

    const newSession: AdminSession = {
      adminId: `admin_${Date.now()}`,
      username: account.username,
      name: account.name,
      role: account.role as AdminSession['role'],
      permissions: account.permissions,
      loginTime: Date.now(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return (
    <AdminContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
```

- [ ] **Step 2: 创建 useAdminAuth hook**

```typescript
// src/hooks/useAdminAuth.ts
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useAdminAuth(requireAuth: boolean = true) {
  const { session, isAuthenticated, isLoading, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, requireAuth, navigate]);

  const checkPermission = (permission: string): boolean => {
    if (!session) return false;
    if (session.role === 'super_admin') return true;
    return session.permissions.includes(permission);
  };

  return {
    session,
    isAuthenticated,
    isLoading,
    logout,
    checkPermission,
  };
}
```

---

### Task 3: AdminLayout 组件

**Files:**
- Create: `src/components/admin/AdminLayout.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/AdminHeader.tsx`

- [ ] **Step 1: 创建 AdminSidebar**

```typescript
// src/components/admin/AdminSidebar.tsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Book,
  Newspaper,
  Users,
  Star,
  UserCheck,
  Layers,
  Building2,
  Award,
  ArrowRight,
  Building,
  Handshake,
  Trophy,
  MapPin,
  MessageSquare,
  Download,
  Settings,
  Database,
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: '数据统计' },
  { path: '/admin/courses', icon: Book, label: '课程管理' },
  { path: '/admin/news', icon: Newspaper, label: '资讯管理' },
  { path: '/admin/users', icon: Users, label: '注册用户管理' },
  { path: '/admin/testimonials', icon: Star, label: '学员评价' },
  { path: '/admin/teachers', icon: UserCheck, label: '师资管理' },
  { path: '/admin/students', icon: Layers, label: '学员案例' },
  { path: '/admin/partners', icon: Building2, label: '合作品牌' },
  { path: '/admin/achievements', icon: Award, label: '学考合一动态' },
  { path: '/admin/quick-entries', icon: ArrowRight, label: '快速入口' },
  { path: '/admin/universities', icon: Building, label: '院校管理' },
  { path: '/admin/majors', icon: Book, label: '专业管理' },
  { path: '/admin/companion-plans', icon: Layers, label: '伴学套餐' },
  { path: '/admin/partner-programs', icon: Handshake, label: '合伙人计划' },
  { path: '/admin/oem-cases', icon: Trophy, label: 'OEM 合作案例' },
  { path: '/admin/study-rooms', icon: MapPin, label: '合作自习室' },
  { path: '/admin/messages', icon: MessageSquare, label: '留言管理' },
  { path: '/admin/app-download', icon: Download, label: 'APP 下载管理' },
  { path: '/admin/settings', icon: Settings, label: '系统设置' },
  { path: '/admin/system-config', icon: Database, label: '系统配置' },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div style={{ padding: '20px', borderBottom: '1px solid rgb(30 41 59)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Book size={24} style={{ color: 'rgb(59 130 246)' }} />
          <span style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>学考合一</span>
        </div>
      </div>

      <nav style={{ padding: '12px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        .admin-sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          color: rgb(203 213 225);
          text-decoration: none;
          transition: all 0.2s;
        }

        .admin-sidebar-link:hover {
          background: rgb(30 41 59);
          color: white;
        }

        .admin-sidebar-link.active {
          background: rgb(37 99 235);
          color: white;
        }
      `}</style>
    </aside>
  );
}
```

- [ ] **Step 2: 创建 AdminHeader**

```typescript
// src/components/admin/AdminHeader.tsx
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export default function AdminHeader() {
  const { session, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <div>
        <h1 style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(15 23 42)' }}>
          后台管理
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={18} style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)' }}>
              {session?.name || '管理员'}
            </div>
            <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>
              {session?.role === 'super_admin' ? '超级管理员' : session?.role}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'rgb(254 242 242)',
            color: 'rgb(239 68 68)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          <LogOut size={16} />
          退出登录
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: 创建 AdminLayout**

```typescript
// src/components/admin/AdminLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        加载中...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
```

---

### Task 4: 登录页面

**Files:**
- Create: `src/pages/admin/Login.tsx`

- [ ] **Step 1: 创建登录页面**

```typescript
// src/pages/admin/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Lock, User } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('用户名或密码错误');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgb(15 23 42), rgb(30 41 59))',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))',
              borderRadius: '16px',
              marginBottom: '16px',
            }}
          >
            <Book size={32} style={{ color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'rgb(15 23 42)' }}>
            学考合一
          </h1>
          <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', marginTop: '4px' }}>
            后台管理系统
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">用户名</label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgb(100 116 139)',
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">密码</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgb(100 116 139)',
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '12px',
                background: 'rgb(254 242 242)',
                color: 'rgb(220 38 38)',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '12px' }}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            padding: '12px',
            background: 'rgb(248 250 252)',
            borderRadius: '6px',
            fontSize: '12px',
            color: 'rgb(100 116 139)',
          }}
        >
          <strong>测试账号：</strong> wuhe / 123456
        </div>
      </div>
    </div>
  );
}
```

---

### Task 5: 通用组件 - Notification

**Files:**
- Create: `src/components/admin/Notification.tsx`
- Create: `src/hooks/useNotification.ts`

- [ ] **Step 1: 创建通知 hook**

```typescript
// src/hooks/useNotification.ts
import { useState, useCallback } from 'react';
import { Notification } from '../types/admin';

let notificationId = 0;

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
      const id = `notification_${++notificationId}`;
      const notification: Notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
      }

      return id;
    },
    []
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
  };
}
```

- [ ] **Step 2: 创建 Notification 组件**

```typescript
// src/components/admin/Notification.tsx
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Notification as NotificationType } from '../types/admin';

interface Props {
  notifications: NotificationType[];
  onClose: (id: string) => void;
}

export default function Notification({ notifications, onClose }: Props) {
  if (notifications.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000 }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`admin-notification admin-notification-${notification.type}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
          }}
        >
          {icons[notification.type]}
          <span>{notification.message}</span>
          <button
            onClick={() => onClose(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '4px',
              marginLeft: '8px',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## Phase 2: 核心模块

### Task 6: 通用组件 - DataDialog

**Files:**
- Create: `src/components/admin/DataDialog.tsx`

- [ ] **Step 1: 创建 DataDialog 组件**

```typescript
// src/components/admin/DataDialog.tsx
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

export default function DataDialog({ open, onClose, title, children, footer, width = '600px' }: Props) {
  if (!open) return null;

  return (
    <div className="admin-dialog-overlay" onClick={onClose}>
      <div
        className="admin-dialog"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-dialog-header">
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'rgb(100 116 139)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-dialog-body">{children}</div>

        {footer && <div className="admin-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}
```

---

### Task 7: 资讯管理页面

**Files:**
- Create: `src/pages/admin/News.tsx`

- [ ] **Step 1: 创建资讯管理页面**

```typescript
// src/pages/admin/News.tsx
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Sparkles } from 'lucide-react';
import { supabase } from '../../supabase/client';
import { useNotification } from '../../hooks/useNotification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tag: string;
  read_time: string;
  image: string;
  is_hot: boolean;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

const categories = [
  '高考政策', '学习方法', '教育科技', '家庭教育',
  '志愿填报', '学员故事', '教育资讯'
];

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tag: '',
    read_time: '5分钟',
    image: '',
    is_hot: false,
    is_featured: false,
    is_active: true,
    sort_order: 0,
  });
  const { notifications, showNotification, hideNotification } = useNotification();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleOpenDialog = (item?: NewsItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        summary: item.summary || '',
        content: item.content || '',
        category: item.category || '',
        tag: item.tag || '',
        read_time: item.read_time || '5分钟',
        image: item.image || '',
        is_hot: item.is_hot || false,
        is_featured: item.is_featured || false,
        is_active: item.is_active !== false,
        sort_order: item.sort_order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        summary: '',
        content: '',
        category: '',
        tag: '',
        read_time: '5分钟',
        image: '',
        is_hot: false,
        is_featured: false,
        is_active: true,
        sort_order: items.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      showNotification('请填写标题', 'error');
      return;
    }

    const dbData = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      category: formData.category,
      tag: formData.tag,
      read_time: formData.read_time,
      image: formData.image,
      is_hot: formData.is_hot,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingItem) {
      const result = await supabase
        .from('news')
        .update(dbData)
        .eq('id', editingItem.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('news')
        .insert({ ...dbData, created_at: new Date().toISOString() });
      error = result.error;
    }

    if (error) {
      showNotification('保存失败: ' + error.message, 'error');
    } else {
      showNotification('保存成功', 'success');
      setDialogOpen(false);
      fetchItems();
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!confirm(`确定删除 "${item.title}"？`)) return;

    const { error } = await supabase.from('news').delete().eq('id', item.id);
    if (error) {
      showNotification('删除失败', 'error');
    } else {
      showNotification('删除成功', 'success');
      fetchItems();
    }
  };

  const handleToggle = async (item: NewsItem, field: string, value: boolean) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );

    const { error } = await supabase
      .from('news')
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq('id', item.id);

    if (error) {
      showNotification('更新失败', 'error');
      fetchItems();
    }
  };

  const handleAIGenerate = () => {
    showNotification('AI 生成功能待接入', 'info');
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>资讯管理</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleAIGenerate}>
              <Sparkles size={16} style={{ marginRight: '6px' }} />
              AI 生成
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} style={{ marginRight: '6px' }} />
              新增资讯
            </button>
          </div>
        </div>

        <div className="admin-filters">
          <div className="admin-search" style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(100 116 139)',
              }}
            />
            <input
              type="text"
              placeholder="搜索标题..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-input admin-select"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="">全部分类</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>加载中...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>标题</th>
                  <th>分类</th>
                  <th>热门</th>
                  <th>精选</th>
                  <th>启用</th>
                  <th>排序</th>
                  <th style={{ width: '120px' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: '500' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgb(100 116 139)', marginTop: '4px' }}>
                        {item.summary?.slice(0, 50)}...
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-success">{item.category || '-'}</span>
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_hot ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_hot', !item.is_hot)}
                      />
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_featured ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_featured', !item.is_featured)}
                      />
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_active !== false ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_active', !item.is_active)}
                      />
                    </td>
                    <td>{item.sort_order}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="admin-btn admin-btn-secondary"
                          onClick={() => handleOpenDialog(item)}
                          style={{ padding: '6px 10px' }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="admin-btn admin-btn-danger"
                          onClick={() => handleDelete(item)}
                          style={{ padding: '6px 10px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'rgb(100 116 139)' }}>
                暂无数据
              </div>
            )}
          </div>
        )}
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑资讯' : '新增资讯'}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>
              取消
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>
              保存
            </button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">标题 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="admin-input"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="admin-form-group">
            <label className="admin-label">分类</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="admin-input admin-select"
            >
              <option value="">请选择</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">标签</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">摘要</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="admin-input admin-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">内容</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="admin-input admin-textarea"
            style={{ minHeight: '150px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="admin-form-group">
            <label className="admin-label">阅读时间</label>
            <input
              type="text"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              className="admin-input"
              placeholder="如: 5分钟"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">排序</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">封面图 URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="admin-input"
            placeholder="https://..."
          />
        </div>
      </DataDialog>
    </div>
  );
}
```

---

### Task 8: 数据统计页面

**Files:**
- Create: `src/pages/admin/Dashboard.tsx`

- [ ] **Step 1: 创建数据统计页面**

```typescript
// src/pages/admin/Dashboard.tsx
import { Users, Book, FileText, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: '总用户数', value: '12,568', change: '+12.5%', icon: Users, color: 'rgb(37 99 235)' },
    { label: '活跃用户', value: '8,234', change: '+8.2%', icon: Users, color: 'rgb(34 197 94)' },
    { label: '课程数', value: '156', change: '+5.1%', icon: Book, color: 'rgb(168 85 247)' },
    { label: '本月收入', value: '¥128,450', change: '+15.3%', icon: DollarSign, color: 'rgb(245 158 11)' },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div>
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>数据统计</h2>
          <button className="admin-btn admin-btn-secondary" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={16} style={{ marginRight: '6px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            刷新数据
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: '0 0 8px 0' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: 'rgb(15 23 42)' }}>
                  {stat.value}
                </p>
              </div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
              <TrendingUp size={14} style={{ color: 'rgb(34 197 94)' }} />
              <span style={{ fontSize: '14px', color: 'rgb(34 197 94)', fontWeight: '500' }}>
                {stat.change}
              </span>
              <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>较上月</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>数据趋势</h3>
        <div
          style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(248 250 252)',
            borderRadius: '8px',
            color: 'rgb(100 116 139)',
          }}
        >
          图表区域 - 可集成 Recharts
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

---

## Phase 3-5: 剩余模块

后续模块结构与 News.tsx 类似，每个页面包含：
- 数据获取 (useEffect + supabase)
- 搜索筛选
- 表格展示
- 新增/编辑弹窗
- 删除确认
- 启用/禁用开关

每个模块预计创建 1-2 个文件，预计工作量：

| Phase | 模块数 | 预计任务 |
|-------|--------|----------|
| Phase 3 | 5 个模块 | Tasks 9-13 |
| Phase 4 | 5 个模块 | Tasks 14-18 |
| Phase 5 | 4 个模块 | Tasks 19-22 |

---

## 实施检查清单

- [ ] Task 1: 目录和类型定义
- [ ] Task 2: 后台认证 Context
- [ ] Task 3: AdminLayout 组件
- [ ] Task 4: 登录页面
- [ ] Task 5: Notification 组件
- [ ] Task 6: DataDialog 组件
- [ ] Task 7: 资讯管理页面
- [ ] Task 8: 数据统计页面
- [ ] Task 9: 课程管理页面
- [ ] Task 10: 用户管理页面
- [ ] Task 11: 学员评价页面
- [ ] Task 12: 师资管理页面
- [ ] Task 13: 学员案例页面
- [ ] Task 14: 合作品牌页面
- [ ] Task 15: 成就动态页面
- [ ] Task 16: 快速入口页面
- [ ] Task 17: 院校管理页面
- [ ] Task 18: 专业管理页面
- [ ] Task 19: 伴学套餐页面
- [ ] Task 20: 合伙人计划页面
- [ ] Task 21: OEM 案例页面
- [ ] Task 22: 合作自习室页面
- [ ] Task 23: 留言管理页面
- [ ] Task 24: APP 下载页面
- [ ] Task 25: 系统设置页面
- [ ] Task 26: 系统配置页面

---

> **计划完成，等待执行指令**
