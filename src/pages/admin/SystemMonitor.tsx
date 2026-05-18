import { useState, useEffect } from 'react';
import {
  BarChart3, Activity, Clock, TrendingUp, Database, Server,
  AlertCircle, CheckCircle, Zap, RefreshCw, Download,
  PieChart, Users, Target
} from 'lucide-react';
import { stats, validateQuestionBank } from '../../utils/questionBank';
import { getAllocationStats, resetAllocationStats } from '../../utils/intelligentQuestionAllocator';
import { getPlanStats, resetPlanStats } from '../../utils/studyPlanGenerator';
import Notification, { useNotification } from '../../components/admin/Notification';

export default function SystemMonitorAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [questionBankStats, setQuestionBankStats] = useState(stats);
  const [validationResult, setValidationResult] = useState(validateQuestionBank());
  const [allocationStats, setAllocationStats] = useState(getAllocationStats());
  const [planStats, setPlanStats] = useState(getPlanStats());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleRefresh = () => {
    setQuestionBankStats(stats);
    setValidationResult(validateQuestionBank());
    setAllocationStats(getAllocationStats());
    setPlanStats(getPlanStats());
    setLastUpdate(new Date());
    showNotification('数据已刷新', 'success');
  };

  const handleResetStats = () => {
    if (confirm('确定要重置统计数据吗？')) {
      resetAllocationStats();
      resetPlanStats();
      setAllocationStats(getAllocationStats());
      setPlanStats(getPlanStats());
      showNotification('统计数据已重置', 'success');
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const subjects = [
    { id: 'math', name: '数学', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'chinese', name: '语文', color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'english', name: '英语', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'physics', name: '物理', color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'chemistry', name: '化学', color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'biology', name: '生物', color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'history', name: '历史', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'geography', name: '地理', color: 'text-lime-600', bg: 'bg-lime-50' },
    { id: 'politics', name: '政治', color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const difficulties = [
    { id: 'easy', name: '基础题', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'medium', name: '中档题', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'hard', name: '提高题', color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'expert', name: '压轴题', color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>系统监控</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleResetStats}>
              <Download size={16} />
              重置统计
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleRefresh}>
              <RefreshCw size={16} />
              刷新数据
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Database size={20} style={{ color: 'rgb(59 130 246)' }} />
              <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>题库总量</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(15 23 42)' }}>
              {questionBankStats.totalQuestions}
            </div>
            <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>道题目</div>
          </div>

          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Activity size={20} style={{ color: 'rgb(22 163 74)' }} />
              <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>评测次数</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(15 23 42)' }}>
              {allocationStats.totalAllocations}
            </div>
            <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>次评测</div>
          </div>

          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={20} style={{ color: 'rgb(245 158 11)' }} />
              <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>平均出题耗时</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(15 23 42)' }}>
              {formatTime(allocationStats.avgAllocationTime)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>上次: {formatTime(allocationStats.lastAllocationTime)}</div>
          </div>

          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Target size={20} style={{ color: 'rgb(124 58 237)' }} />
              <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>学习计划生成</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(15 23 42)' }}>
              {planStats.totalPlans}
            </div>
            <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>个学习计划</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={20} style={{ color: 'rgb(59 130 246)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)' }}>题库科目分布</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {subjects.map((subject) => {
                const count = questionBankStats.bySubject[subject.id as keyof typeof questionBankStats.bySubject] || 0;
                const percent = questionBankStats.totalQuestions > 0
                  ? (count / questionBankStats.totalQuestions) * 100
                  : 0;
                return (
                  <div key={subject.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '48px', fontSize: '13px', color: 'rgb(100 116 139)' }}>{subject.name}</span>
                    <div style={{ flex: 1, height: '8px', background: 'rgb(226 232 240)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: 'rgb(59 130 246)' }}></div>
                    </div>
                    <span style={{ width: '40px', fontSize: '13px', color: 'rgb(100 116 139)', textAlign: 'right' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <PieChart size={20} style={{ color: 'rgb(245 158 11)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)' }}>难度分布</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {difficulties.map((diff) => {
                const count = questionBankStats.byDifficulty[diff.id as keyof typeof questionBankStats.byDifficulty] || 0;
                const percent = questionBankStats.totalQuestions > 0
                  ? (count / questionBankStats.totalQuestions) * 100
                  : 0;
                return (
                  <div key={diff.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '48px', fontSize: '13px', color: 'rgb(100 116 139)' }}>{diff.name}</span>
                    <div style={{ flex: 1, height: '8px', background: 'rgb(226 232 240)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: 'rgb(245 158 11)' }}></div>
                    </div>
                    <span style={{ width: '80px', fontSize: '13px', color: 'rgb(100 116 139)', textAlign: 'right' }}>{count} ({percent.toFixed(1)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Server size={20} style={{ color: 'rgb(22 163 74)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)' }}>题库验证状态</h3>
          </div>
          {validationResult.isValid ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <CheckCircle size={24} style={{ color: 'rgb(22 163 74)', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: '600', color: 'rgb(22 163 74)', margin: 0 }}>题库验证通过</p>
                <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: '4px 0 0 0' }}>所有题目数据完整且格式正确</p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertCircle size={24} style={{ color: 'rgb(239 68 68)', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: '600', color: 'rgb(239 68 68)', margin: 0 }}>题库验证失败</p>
                  <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: '4px 0 0 0' }}>发现 {validationResult.errors.length} 个问题</p>
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgb(254 242 242)', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                  {validationResult.errors.slice(0, 10).map((error, index) => (
                    <li key={index} style={{ fontSize: '13px', color: 'rgb(185 28 28)', marginBottom: '4px' }}>{error}</li>
                  ))}
                  {validationResult.errors.length > 10 && (
                    <li style={{ fontSize: '13px', color: 'rgb(100 116 139)' }}>...还有 {validationResult.errors.length - 10} 个错误</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '13px', color: 'rgb(100 116 139)' }}>
          最后更新: {formatDate(lastUpdate)}
        </div>
      </div>
    </div>
  );
}
