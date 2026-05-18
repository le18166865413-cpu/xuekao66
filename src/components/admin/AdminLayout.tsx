import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Book,
  LayoutDashboard,
  Book as BookIcon,
  Newspaper,
  Users,
  Star,
  UserCheck,
  Layers,
  Building2,
  Award,
  ArrowRight,
  Building,
  HeartHandshake,
  Trophy,
  MapPin,
  MessageSquare,
  Download,
  Settings,
  Database,
  LogOut,
  User,
  Monitor,
  BarChart3,
  Grid3X3,
  Briefcase,
  Activity,
  Cog,
  LayoutTemplate,
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: '数据概览' },
  { path: '/admin/hero-slides', icon: Monitor, label: 'Hero轮播图' },
  { path: '/admin/stats', icon: BarChart3, label: '数据统计' },
  { path: '/admin/features', icon: Grid3X3, label: '核心服务' },
  { path: '/admin/about', icon: Briefcase, label: '关于页面' },
  { path: '/admin/news', icon: Newspaper, label: '资讯管理' },
  { path: '/admin/courses', icon: BookIcon, label: '课程管理' },
  { path: '/admin/users', icon: Users, label: '注册用户管理' },
  { path: '/admin/testimonials', icon: Star, label: '学员评价' },
  { path: '/admin/teachers', icon: UserCheck, label: '师资管理' },
  { path: '/admin/students', icon: Layers, label: '学员案例' },
  { path: '/admin/partners', icon: Building2, label: '合作品牌' },
  { path: '/admin/achievements', icon: Award, label: '学考合一动态' },
  { path: '/admin/quick-entries', icon: ArrowRight, label: '快速入口' },
  { path: '/admin/universities', icon: Building, label: '院校管理' },
  { path: '/admin/majors', icon: BookIcon, label: '专业管理' },
  { path: '/admin/companion-plans', icon: Layers, label: '伴学套餐' },
  { path: '/admin/partner-programs', icon: HeartHandshake, label: '合伙人计划' },
  { path: '/admin/oem-cases', icon: Trophy, label: 'OEM 合作案例' },
  { path: '/admin/study-rooms', icon: MapPin, label: '合作自习室' },
  { path: '/admin/messages', icon: MessageSquare, label: '留言管理' },
  { path: '/admin/app-download', icon: Download, label: 'APP 下载管理' },
  { path: '/admin/system-monitor', icon: Activity, label: '系统监控' },
  { path: '/admin/feature-manager', icon: Cog, label: '功能管理' },
  { path: '/admin/module-config', icon: LayoutTemplate, label: '模块配置' },
  { path: '/admin/settings', icon: Settings, label: '系统设置' },
  { path: '/admin/system-config', icon: Database, label: '系统配置' },
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div style={{ padding: '20px', borderBottom: '1px solid rgb(30 41 59)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Book size={24} style={{ color: 'rgb(59 130 246)' }} />
          <span style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>学考合一</span>
        </div>
        <div style={{ color: 'rgb(100 116 139)', fontSize: '12px', marginTop: '4px', marginLeft: '36px' }}>
          后台管理系统
        </div>
      </div>

      <nav style={{ padding: '12px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function AdminHeader() {
  const { session, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getRoleName = (role: string) => {
    const roleNames: Record<string, string> = {
      super_admin: '超级管理员',
      teacher: '答疑老师',
      supervisor: '督学老师',
      sales: '销售',
      auditor: '内容审核',
    };
    return roleNames[role] || role;
  };

  return (
    <header className="admin-header">
      <div>
        <h1 style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(15 23 42)', margin: 0 }}>
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
              {session ? getRoleName(session.role) : '-'}
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
          background: 'rgb(248 250 252)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgb(226 232 240)',
              borderTopColor: 'rgb(37 99 235)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <span style={{ color: 'rgb(100 116 139)' }}>加载中...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
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
