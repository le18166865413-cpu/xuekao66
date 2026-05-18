import { useState, useEffect } from 'react';
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
  type SystemLog
} from '../../utils/featureManager';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';

export default function FeatureManagerAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [features, setFeatures] = useState<FeatureConfig[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [activeTab, setActiveTab] = useState<'features' | 'logs'>('features');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setFeatures(getFeatures());
    setLogs(getLogs(100));
    showNotification('数据已刷新', 'success');
  };

  const handleToggleFeature = (featureId: string) => {
    const success = toggleFeature(featureId);
    if (success) {
      refreshData();
    }
  };

  const handleParamChange = (featureId: string, paramKey: string, value: string | number | boolean) => {
    const success = updateFeatureParam(featureId, paramKey, value);
    if (success) {
      refreshData();
    }
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

  const logTypeStyles: Record<string, string> = {
    info: 'text-blue-600 bg-blue-50',
    warning: 'text-amber-600 bg-amber-50',
    error: 'text-rose-600 bg-rose-50',
    success: 'text-emerald-600 bg-emerald-50'
  };

  const logTypeIcons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle
  };

  const renderParamInput = (param: any, featureId: string, paramKey: string) => {
    switch (param.type) {
      case 'boolean':
        return (
          <div
            onClick={() => handleParamChange(featureId, paramKey, !(param.value as boolean))}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '9999px',
              backgroundColor: param.value ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              transition: '0.2s',
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transform: param.value ? 'translateX(20px)' : 'translateX(0)',
              transition: '0.2s',
            }} />
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={param.value as number}
            onChange={(e) => handleParamChange(featureId, paramKey, parseInt(e.target.value) || 0)}
            className="admin-input"
            style={{ width: '120px' }}
          />
        );
      case 'select':
        return (
          <select
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            className="admin-input admin-select"
            style={{ width: '120px' }}
          >
            {param.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            rows={3}
            className="admin-input admin-textarea"
            style={{ flex: 1 }}
          />
        );
      default:
        return (
          <input
            type="text"
            value={param.value as string}
            onChange={(e) => handleParamChange(featureId, paramKey, e.target.value)}
            className="admin-input"
            style={{ flex: 1 }}
          />
        );
    }
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>功能管理</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-primary" onClick={refreshData}>
              <RefreshCw size={16} />
              刷新数据
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgb(226 232 240)', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('features')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'features' ? 'rgb(59 130 246)' : 'transparent',
              color: activeTab === 'features' ? 'white' : 'rgb(100 116 139)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Settings size={16} />
            功能配置
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'logs' ? 'rgb(59 130 246)' : 'transparent',
              color: activeTab === 'logs' ? 'white' : 'rgb(100 116 139)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <FileText size={16} />
            操作日志
          </button>
        </div>

        {activeTab === 'features' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgb(100 116 139)',
                    zIndex: 1,
                  }}
                />
                <input
                  type="text"
                  placeholder="搜索功能..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'page', 'component', 'feature', 'system'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      background: activeCategory === cat ? 'rgb(59 130 246)' : 'rgb(241 245 249)',
                      color: activeCategory === cat ? 'white' : 'rgb(100 116 139)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredFeatures.map((feature) => (
                <div key={feature.id} className="admin-card" style={{ margin: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        background: feature.category === 'page' ? 'rgb(59 130 246)' :
                          feature.category === 'component' ? 'rgb(124 58 237)' :
                            feature.category === 'feature' ? 'rgb(22 163 74)' :
                              'rgb(245 158 11)',
                      }} />
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'rgb(15 23 42)', margin: 0 }}>{feature.name}</h3>
                        <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: '4px 0 0 0' }}>{feature.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        background: 'rgb(241 245 249)',
                        color: 'rgb(100 116 139)',
                      }}>
                        {categoryLabels[feature.category]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFeature(feature.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '500',
                          background: feature.enabled ? 'rgb(220 252 231)' : 'rgb(241 245 249)',
                          color: feature.enabled ? 'rgb(21 128 61)' : 'rgb(100 116 139)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {feature.enabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        {feature.enabled ? '启用' : '禁用'}
                      </button>
                      {expandedFeature === feature.id ? (
                        <ChevronUp size={20} style={{ color: 'rgb(100 116 139)' }} />
                      ) : (
                        <ChevronDown size={20} style={{ color: 'rgb(100 116 139)' }} />
                      )}
                    </div>
                  </div>

                  {expandedFeature === feature.id && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgb(226 232 240)' }}>
                      {Object.keys(feature.params).length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {Object.entries(feature.params).map(([key, param]: [string, any]) => (
                            <div
                              key={key}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '12px',
                                background: 'rgb(248 250 252)',
                                borderRadius: '8px',
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)' }}>{param.name}</div>
                                <div style={{ fontSize: '12px', color: 'rgb(100 116 139)', marginTop: '2px' }}>{param.description}</div>
                              </div>
                              {renderParamInput(param, feature.id, key)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>该功能暂无配置参数</p>
                      )}

                      {feature.lastModified && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgb(226 232 240)', fontSize: '12px', color: 'rgb(100 116 139)' }}>
                          最后修改: {formatDate(feature.lastModified)}
                          {feature.modifiedBy && ` · 修改人: ${feature.modifiedBy}`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredFeatures.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Search size={48} style={{ color: 'rgb(209 213 219)', margin: '0 auto 12px auto' }} />
                  <p style={{ color: 'rgb(100 116 139)' }}>未找到匹配的功能</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'rgb(15 23 42)', margin: 0 }}>系统操作日志</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="admin-btn admin-btn-secondary" onClick={handleRefreshLogs}>
                  <RefreshCw size={16} />
                  刷新
                </button>
                <button className="admin-btn admin-btn-danger" onClick={handleClearLogs}>
                  <Trash2 size={16} />
                  清空
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
              {logs.map((log) => {
                const Icon = logTypeIcons[log.type] || Info;
                return (
                  <div
                    key={log.id}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: log.type === 'info' ? 'rgb(239 246 255)' :
                        log.type === 'success' ? 'rgb(220 252 231)' :
                          log.type === 'warning' ? 'rgb(255 251 235)' :
                            'rgb(254 242 242)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Icon size={20} style={{
                        color: log.type === 'info' ? 'rgb(59 130 246)' :
                          log.type === 'success' ? 'rgb(22 163 74)' :
                            log.type === 'warning' ? 'rgb(245 158 11)' :
                              'rgb(239 68 68)',
                        flexShrink: 0,
                        marginTop: '2px',
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '500', fontSize: '14px', color: 'rgb(15 23 42)' }}>{log.message}</span>
                          <span style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>[{log.module}]</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '12px', color: 'rgb(100 116 139)' }}>
                          <span>{formatDate(log.timestamp)}</span>
                          {log.user && <span>用户: {log.user}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {logs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <FileText size={48} style={{ color: 'rgb(209 213 219)', margin: '0 auto 12px auto' }} />
                  <p style={{ color: 'rgb(100 116 139)' }}>暂无操作日志</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
