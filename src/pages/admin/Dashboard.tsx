import { useState, useEffect } from 'react';
import { Users, Book, FileText, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

function StatCard({ label, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="admin-stats-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: '0 0 8px 0' }}>{label}</p>
          <p style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: 'rgb(15 23 42)' }}>
            {value}
          </p>
        </div>
        <div
          className="admin-stats-icon"
          style={{ background: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
        <TrendingUp size={14} style={{ color: 'rgb(34 197 94)' }} />
        <span style={{ fontSize: '14px', color: 'rgb(34 197 94)', fontWeight: '500' }}>{change}</span>
        <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>较上月</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stats] = useState({
    totalUsers: 12568,
    activeUsers: 8234,
    totalCourses: 156,
    monthlyRevenue: 128450,
  });

  const fetchStats = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  const statCards = [
    {
      label: '总用户数',
      value: formatNumber(stats.totalUsers),
      change: '+12.5%',
      icon: Users,
      color: 'rgb(37 99 235)',
    },
    {
      label: '活跃用户',
      value: formatNumber(stats.activeUsers),
      change: '+8.2%',
      icon: Users,
      color: 'rgb(34 197 94)',
    },
    {
      label: '课程数',
      value: String(stats.totalCourses),
      change: '+5.1%',
      icon: Book,
      color: 'rgb(168 85 247)',
    },
    {
      label: '本月收入',
      value: `¥${formatNumber(stats.monthlyRevenue)}`,
      change: '+15.3%',
      icon: DollarSign,
      color: 'rgb(245 158 11)',
    },
  ];

  return (
    <div>
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>
            数据统计
          </h2>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'admin-spin' : ''} />
            刷新数据
          </button>
        </div>
      </div>

      <div className="admin-grid-3">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'rgb(15 23 42)' }}>
          数据趋势
        </h3>
        <div
          style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(248 250 252)',
            borderRadius: '8px',
            color: 'rgb(100 116 139)',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <FileText size={48} style={{ opacity: 0.5 }} />
          <span>图表区域 - 可集成 Recharts</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div className="admin-card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'rgb(15 23 42)' }}>
            热门课程 TOP 5
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['高考数学冲刺班', '英语听说强化课', '物理实验专题', '化学高考模拟', '语文作文技巧'].map(
              (course, index) => (
                <div
                  key={course}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgb(248 250 252)',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: index < 3 ? 'rgb(37 99 235)' : 'rgb(203 213 225)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', color: 'rgb(15 23 42)' }}>{course}</span>
                  <span style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>
                    {Math.floor(Math.random() * 500 + 100)} 人学习
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'rgb(15 23 42)' }}>
            最新动态
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { time: '10分钟前', event: '新用户注册：张三' },
              { time: '30分钟前', event: '课程购买：高考数学冲刺班' },
              { time: '1小时前', event: '新评论：李四评价了英语听说强化课' },
              { time: '2小时前', event: '新学员案例：王五被清华大学录取' },
              { time: '3小时前', event: '资讯发布：2024年高考政策解读' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingBottom: '12px',
                  borderBottom: index < 4 ? '1px solid rgb(226 232 240)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgb(37 99 235)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '12px', color: 'rgb(100 116 139)', width: '70px', flexShrink: 0 }}>
                  {item.time}
                </span>
                <span style={{ fontSize: '14px', color: 'rgb(15 23 42)' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
