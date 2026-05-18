import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Activity, Clock, TrendingUp, Database, Server, 
  AlertCircle, CheckCircle, Zap, RefreshCw, Download, 
  PieChart, Users, Target
} from 'lucide-react';
import { stats, validateQuestionBank } from '../utils/questionBank';
import { getAllocationStats, resetAllocationStats } from '../utils/intelligentQuestionAllocator';
import { getPlanStats, resetPlanStats } from '../utils/studyPlanGenerator';

export default function SystemMonitor() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  // 所有 useState 必须在条件检查之前
  const [questionBankStats, setQuestionBankStats] = useState(stats);
  const [validationResult, setValidationResult] = useState(validateQuestionBank());
  const [allocationStats, setAllocationStats] = useState(getAllocationStats());
  const [planStats, setPlanStats] = useState(getPlanStats());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 权限检查
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllocationStats(getAllocationStats());
      setPlanStats(getPlanStats());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setQuestionBankStats(stats);
    setValidationResult(validateQuestionBank());
    setAllocationStats(getAllocationStats());
    setPlanStats(getPlanStats());
    setLastUpdate(new Date());
  };

  const handleResetStats = () => {
    resetAllocationStats();
    resetPlanStats();
    setAllocationStats(getAllocationStats());
    setPlanStats(getPlanStats());
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

  // 加载状态检查（必须在所有 Hooks 之后）
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-400 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  // 权限检查（必须在所有 Hooks 之后）
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <p className="text-slate-400 text-lg">无访问权限</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">系统监控中心</h1>
            <p className="text-blue-300 mt-2">实时跟踪题库规模、评测性能和学习计划生成</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              刷新
            </motion.button>
            <motion.button
              onClick={handleResetStats}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              重置统计
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-400">题库总量</span>
            </div>
            <div className="text-3xl font-bold text-white">{questionBankStats.totalQuestions}</div>
            <div className="text-xs text-slate-400 mt-1">道题目</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-400">评测次数</span>
            </div>
            <div className="text-3xl font-bold text-white">{allocationStats.totalAllocations}</div>
            <div className="text-xs text-slate-400 mt-1">次测评</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-400">平均出题耗时</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatTime(allocationStats.avgAllocationTime)}</div>
            <div className="text-xs text-slate-400 mt-1">上次: {formatTime(allocationStats.lastAllocationTime)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-slate-400">学习计划生成</span>
            </div>
            <div className="text-3xl font-bold text-white">{planStats.totalPlans}</div>
            <div className="text-xs text-slate-400 mt-1">个学习计划</div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">题库科目分布</h2>
            </div>
            <div className="space-y-3">
              {subjects.map((subject, index) => {
                const count = questionBankStats.bySubject[subject.id] || 0;
                const percent = questionBankStats.totalQuestions > 0 
                  ? (count / questionBankStats.totalQuestions) * 100 
                  : 0;
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4"
                  >
                    <span className={`w-16 text-sm font-medium ${subject.color.replace('600', '400')}`}>{subject.name}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${subject.bg.replace('50', '500')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      />
                    </div>
                    <span className="w-12 text-sm text-slate-300 text-right">{count}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">难度分布</h2>
            </div>
            <div className="space-y-3">
              {difficulties.map((diff, index) => {
                const count = questionBankStats.byDifficulty[diff.id] || 0;
                const percent = questionBankStats.totalQuestions > 0 
                  ? (count / questionBankStats.totalQuestions) * 100 
                  : 0;
                return (
                  <motion.div
                    key={diff.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4"
                  >
                    <span className={`w-16 text-sm font-medium ${diff.color.replace('600', '400')}`}>{diff.name}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${diff.bg.replace('50', '500')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      />
                    </div>
                    <span className="w-12 text-sm text-slate-300 text-right">{count} ({percent.toFixed(1)}%)</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">题库验证状态</h2>
            </div>
            <div className="flex items-start gap-3 mb-4">
              {validationResult.isValid ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-400">题库验证通过</p>
                    <p className="text-sm text-slate-400">所有题目数据完整且格式正确</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-rose-400">题库验证失败</p>
                    <p className="text-sm text-slate-400">发现 {validationResult.errors.length} 个问题</p>
                  </div>
                </>
              )}
            </div>
            {validationResult.errors.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto">
                <ul className="space-y-2">
                  {validationResult.errors.slice(0, 10).map((error, index) => (
                    <li key={index} className="text-sm text-rose-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0" />
                      {error}
                    </li>
                  ))}
                  {validationResult.errors.length > 10 && (
                    <li className="text-sm text-slate-400">...还有 {validationResult.errors.length - 10} 个错误</li>
                  )}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">评测性能指标</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                <span className="text-sm text-slate-300">平均出题时间</span>
                <span className="font-semibold text-blue-400">{formatTime(allocationStats.avgAllocationTime)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-lg">
                <span className="text-sm text-slate-300">出题准确率</span>
                <span className="font-semibold text-green-400">{allocationStats.avgScoreAccuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-500/20 rounded-lg">
                <span className="text-sm text-slate-300">平均计划生成时间</span>
                <span className="font-semibold text-amber-400">{formatTime(planStats.avgGenerationTime)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-500/20 rounded-lg">
                <span className="text-sm text-slate-300">平均目标分数</span>
                <span className="font-semibold text-purple-400">{Math.round(planStats.avgTargetScore)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">评测模式使用统计</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(allocationStats.modeUsage).map(([modeId, count]) => (
                <div key={modeId} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-sm text-slate-400">{modeId}</div>
                  <div className="text-xl font-bold text-white">{count}</div>
                  <div className="text-xs text-slate-400">次使用</div>
                </div>
              ))}
              {Object.keys(allocationStats.modeUsage).length === 0 && (
                <div className="col-span-2 text-center py-8 text-slate-400">
                  暂无评测数据
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-semibold text-white">学生水平分布</h2>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {(['优秀', '良好', '中等', '及格', '薄弱'] as const).map((level) => {
                const count = planStats.plansByLevel[level] || 0;
                const colors: Record<string, string> = {
                  '优秀': 'bg-emerald-500',
                  '良好': 'bg-blue-500',
                  '中等': 'bg-amber-500',
                  '及格': 'bg-orange-500',
                  '薄弱': 'bg-rose-500',
                };
                return (
                  <div key={level} className="text-center">
                    <div className={`w-full aspect-square ${colors[level]} rounded-lg flex items-center justify-center mb-2`}>
                      <span className="text-white font-bold text-lg">{count}</span>
                    </div>
                    <div className="text-xs text-slate-400">{level}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-400">
          最后更新: {formatDate(lastUpdate)}
        </div>
      </div>
    </div>
  );
}