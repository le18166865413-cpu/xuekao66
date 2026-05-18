import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Settings, ToggleLeft, ToggleRight, ChevronDown, ChevronUp,
  FileText, AlertCircle, CheckCircle, AlertTriangle, Info,
  RotateCcw, Trash2, Search, X, Save, RefreshCw, Eye
} from 'lucide-react';
import {
  getFeatures,
  getLogs,
  toggleFeature,
  updateFeatureParam,
  clearLogs,
  addLog,
  type FeatureConfig,
  type SystemLog,
  type FeatureParam
} from '../utils/featureManager';

export default function FeatureManager() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [features, setFeatures] = useState<FeatureConfig[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [activeTab, setActiveTab] = useState<'features' | 'logs'>('features');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      refreshData();
    }
  }, [isAuthenticated, isAdmin]);

  const refreshData = () => {
    setFeatures(getFeatures());
    setLogs(getLogs(100));
  };

  const handleToggleFeature = (featureId: string) => {
    const success = toggleFeature(featureId);
    if (success) {
      refreshData();
      showSuccessNotification();
    }
  };

  const handleParamChange = (featureId: string, paramKey: string, value: string | number | boolean) => {
    const success = updateFeatureParam(featureId, paramKey, value);
    if (success) {
      refreshData();
      showSuccessNotification();
    }
  };

  const showSuccessNotification = () => {
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 3000);
  };

  const handleClearLogs = () => {
    if (confirm('确定要清空所有日志吗？')) {
      clearLogs();
      refreshData();
    }
  };

  const handleRefreshLogs = () => {
    addLog('info', 'system', '手动刷新日志', { action: 'refresh' });
    refreshData();
  };

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const categoryLabels: Record<string, string> = {
    all: '全部',
    page: '页面',
    component: '组件',
    feature: '功能',
    system: '系统'
  };

  const categoryColors: Record<string, string> = {
    page: 'bg-blue-500',
    component: 'bg-purple-500',
    feature: 'bg-green-500',
    system: 'bg-amber-500'
  };

  const logTypeStyles: Record<string, string> = {
    info: 'text-blue-500 bg-blue-50',
    warning: 'text-amber-500 bg-amber-50',
    error: 'text-rose-500 bg-rose-50',
    success: 'text-emerald-500 bg-emerald-50'
  };

  const logTypeIcons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle
  };

  const renderParamInput = (param: FeatureParam, featureId: string, paramKey: string) => {
    switch (param.type) {
      case 'boolean':
        return (
          <button
            onClick={() => handleParamChange(featureId, paramKey, !(param.value as boolean))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              param.value ? 'bg-green-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                param.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        );
      case 'number':
        return (
          <input
            type="number"
            value={param.value as number}
            onChange={(e) => handleParamChange(featureId, paramKey, parseInt(e.target.value) || 0)}
            className="w-24 px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          />
        );
      case 'select':
        return (
          <select
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          >
            {param.options?.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-800">
                {opt}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            rows={3}
            className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          />
        );
      default:
        return (
          <input
            type="text"
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
          />
        );
    }
  };

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

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <AnimatePresence>
        {showSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">配置更新成功</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">功能管理中心</h1>
            <p className="text-blue-300 mt-2">管理网站所有功能模块的启用状态和参数配置</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={refreshData}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              刷新数据
            </motion.button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('features')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors ${
                activeTab === 'features'
                  ? 'text-white bg-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-5 h-5" />
              功能配置
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'text-white bg-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-5 h-5" />
              操作日志
            </button>
          </div>

          {activeTab === 'features' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索功能..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'page', 'component', 'feature', 'system'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${categoryColors[feature.category]}`} />
                        <div>
                          <h3 className="font-semibold text-white">{feature.name}</h3>
                          <p className="text-sm text-slate-400 mt-0.5">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300">
                          {categoryLabels[feature.category]}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFeature(feature.id);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            feature.enabled
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              : 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30'
                          }`}
                        >
                          {feature.enabled ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              启用
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              禁用
                            </>
                          )}
                        </button>
                        {expandedFeature === feature.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedFeature === feature.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-white/5">
                            <div className="pt-4">
                              <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                参数配置
                              </h4>
                              {Object.keys(feature.params).length > 0 ? (
                                <div className="grid gap-3">
                                  {Object.entries(feature.params).map(([key, param]) => (
                                    <div
                                      key={key}
                                      className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                                    >
                                      <div className="flex-1">
                                        <div className="text-sm text-white font-medium">{param.name}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">{param.description}</div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {renderParamInput(param, feature.id, key)}
                                        {param.required && (
                                          <span className="text-xs text-rose-400">必填</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-slate-500">该功能暂无配置参数</p>
                              )}
                            </div>

                            {feature.dependencies.length > 0 && (
                              <div className="pt-4 mt-4 border-t border-white/5">
                                <h4 className="text-sm font-medium text-slate-300 mb-2">依赖功能</h4>
                                <div className="flex flex-wrap gap-2">
                                  {feature.dependencies.map((depId) => {
                                    const dep = features.find(f => f.id === depId);
                                    return (
                                      <span
                                        key={depId}
                                        className={`px-3 py-1 rounded-full text-xs ${
                                          dep?.enabled
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-rose-500/20 text-rose-400'
                                        }`}
                                      >
                                        {dep?.name || depId}
                                        {dep?.enabled ? (
                                          <CheckCircle className="inline w-3 h-3 ml-1" />
                                        ) : (
                                          <AlertCircle className="inline w-3 h-3 ml-1" />
                                        )}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                              <span>最后修改: {formatDate(feature.lastModified)}</span>
                              {feature.modifiedBy && (
                                <span>修改人: {feature.modifiedBy}</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {filteredFeatures.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">未找到匹配的功能</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">系统操作日志</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshLogs}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    刷新
                  </button>
                  <button
                    onClick={handleClearLogs}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    清空
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {logs.map((log) => {
                  const Icon = logTypeIcons[log.type];
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg ${logTypeStyles[log.type]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{log.message}</span>
                            <span className="text-xs opacity-70">[{log.module}]</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs opacity-70">
                            <span>{formatDate(log.timestamp)}</span>
                            {log.user && <span>用户: {log.user}</span>}
                          </div>
                          {log.details && Object.keys(log.details).length > 0 && (
                            <div className="mt-2 p-2 bg-black/20 rounded text-xs font-mono overflow-x-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {logs.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">暂无操作日志</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}