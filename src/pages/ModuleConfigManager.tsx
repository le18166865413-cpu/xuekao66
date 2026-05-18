import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Eye, EyeOff, Monitor, Tablet, Smartphone,
  RotateCcw, Save, Undo2, ChevronDown, ChevronUp, ChevronRight,
  Palette, Type, AlignLeft, AlignCenter, AlignRight,
  Square, CornerDownRight, Sparkles, History, XCircle
} from 'lucide-react';
import {
  getModules,
  updateModule,
  toggleModule,
  getVersions,
  rollbackToVersion,
  getDefaultFontFamilies,
  generateStyleObject,
  generateTextStyleObject,
  type ModuleConfig,
  type ConfigVersion,
  type TextStyle,
  type CourseItem,
  type TeacherItem,
  type MilestoneItem,
  type StatItem,
  type FeatureItem
} from '../utils/moduleConfig';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

function EditableText({ value, onChange, style, className }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleClick = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="border border-blue-400 rounded px-2 py-1 outline-none bg-white shadow-sm"
        style={style}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`inline ${className || ''}`}
      style={style}
    >
      {value}
    </span>
  );
}

interface EditableButtonProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'cta';
}

function EditableButton({ value, onChange, variant = 'default' }: EditableButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleClick = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const baseStyles = variant === 'cta'
    ? 'px-8 py-4 bg-yellow-400 text-gray-800 font-bold rounded-full hover:bg-yellow-300 transition-colors text-lg'
    : 'px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors';

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="border border-blue-400 rounded px-4 py-2 outline-none bg-white shadow-sm text-center"
        style={{ minWidth: '120px' }}
      />
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} cursor-pointer`}
    >
      {value}
    </button>
  );
}

export default function ModuleConfigManager() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleConfig[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleConfig | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'versions'>('content');
  const [versions, setVersions] = useState<ConfigVersion[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editedConfig, setEditedConfig] = useState<ModuleConfig | null>(null);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadModules();
    }
  }, [isAuthenticated, isAdmin]);

  useEffect(() => {
    if (selectedModule) {
      setEditedConfig({ ...selectedModule });
      loadVersions(selectedModule.id);
    }
  }, [selectedModule]);

  const loadModules = () => {
    setModules(getModules());
  };

  const loadVersions = (moduleId: string) => {
    setVersions(getVersions(moduleId, 20));
  };

  const handleSave = () => {
    if (!editedConfig) return;
    
    try {
      const success = updateModule(
        editedConfig.id,
        editedConfig,
        'admin',
        '更新模块配置'
      );
      
      if (success) {
        loadModules();
        setSelectedModule(editedConfig);
        showSuccessNotification();
      } else {
        showErrorNotification('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存配置失败:', error);
      showErrorNotification('保存配置时发生错误');
    }
  };

  const showErrorNotification = (message: string) => {
    setErrorMessage(message);
    setShowErrorMsg(true);
    setTimeout(() => setShowErrorMsg(false), 3000);
  };

  const handleToggle = (moduleId: string) => {
    toggleModule(moduleId, 'admin');
    loadModules();
  };

  const handleRollback = (versionId: string) => {
    if (confirm('确定要回滚到该版本吗？')) {
      try {
        const success = rollbackToVersion(versionId, 'admin');
        if (success) {
          loadModules();
          loadVersions(selectedModule?.id || '');
          showSuccessNotification();
        } else {
          showErrorNotification('回滚失败，请重试');
        }
      } catch (error) {
        console.error('回滚配置失败:', error);
        showErrorNotification('回滚配置时发生错误');
      }
    }
  };

  const handleConfigChange = (key: string, value: any) => {
    if (!editedConfig) return;
    setEditedConfig(prev => ({
      ...prev!,
      [key]: value
    }));
  };

  const handleStyleChange = (styleType: keyof ModuleConfig, key: string, value: any) => {
    if (!editedConfig) return;
    setEditedConfig(prev => ({
      ...prev!,
      [styleType]: {
        ...(prev![styleType] as TextStyle),
        [key]: value
      }
    }));
  };

  const showSuccessNotification = () => {
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 3000);
  };

  const fontFamilies = getDefaultFontFamilies();
  const fontWeights = [
    { value: 'normal', label: '正常' },
    { value: 'medium', label: '中等' },
    { value: 'semibold', label: '半粗' },
    { value: 'bold', label: '粗体' },
  ];
  const textAlignOptions = [
    { value: 'left', label: '左对齐', icon: AlignLeft },
    { value: 'center', label: '居中', icon: AlignCenter },
    { value: 'right', label: '右对齐', icon: AlignRight },
  ];
  const gradientDirections = [
    { value: 'to-r', label: '从左到右' },
    { value: 'to-l', label: '从右到左' },
    { value: 'to-t', label: '从下到上' },
    { value: 'to-b', label: '从上到下' },
    { value: 'to-tr', label: '左下到右上' },
    { value: 'to-br', label: '左上到右下' },
    { value: 'to-bl', label: '右上到左下' },
    { value: 'to-tl', label: '右下到左上' },
  ];
  const borderStyles = [
    { value: 'none', label: '无' },
    { value: 'solid', label: '实线' },
    { value: 'dashed', label: '虚线' },
    { value: 'dotted', label: '点线' },
    { value: 'double', label: '双实线' },
  ];

  const categoryLabels: Record<string, string> = {
    hero: '首屏',
    feature: '功能',
    course: '课程',
    teacher: '讲师',
    testimonial: '评价',
    cta: '行动号召',
    stats: '统计',
    partner: '合作伙伴',
    section: '章节',
  };

  const categoryColors: Record<string, string> = {
    hero: 'bg-gradient-to-r from-blue-500 to-violet-500',
    feature: 'bg-gradient-to-r from-green-500 to-emerald-500',
    course: 'bg-gradient-to-r from-amber-500 to-orange-500',
    teacher: 'bg-gradient-to-r from-pink-500 to-rose-500',
    testimonial: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
    cta: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    stats: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    partner: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    section: 'bg-gradient-to-r from-slate-500 to-slate-600',
  };

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

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <AnimatePresence>
        {showSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg">
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">配置保存成功</span>
            </div>
          </motion.div>
        )}
        {showErrorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg">
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-72 flex-shrink-0 bg-white/5 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/10 p-4 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">模块配置</h1>
            <p className="text-sm text-slate-400 mt-1">管理网站模块内容与样式</p>
          </div>

          <div className="space-y-2">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                onClick={() => setSelectedModule(module)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedModule?.id === module.id
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${module.enabled ? 'bg-green-500' : 'bg-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{module.name}</p>
                    <p className="text-xs text-slate-400">{categoryLabels[module.category]}</p>
                  </div>
                  {selectedModule?.id === module.id && (
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {selectedModule ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedModule.name}</h2>
                    <p className="text-slate-400 mt-1">{selectedModule.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(selectedModule.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedModule.enabled
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30'
                    }`}
                  >
                    {selectedModule.enabled ? (
                      <>
                        <Eye className="w-4 h-4" />
                        已启用
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4" />
                        已禁用
                      </>
                    )}
                  </button>
                </div>

                <div className="flex gap-2 bg-white/5 rounded-xl p-1">
                  {[
                    { id: 'content', label: '内容', icon: Type },
                    { id: 'style', label: '样式', icon: Palette },
                    { id: 'versions', label: '版本', icon: History },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-slate-900'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  {activeTab === 'content' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">标题文本</label>
                        <input
                          type="text"
                          value={editedConfig?.title || ''}
                          onChange={(e) => handleConfigChange('title', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                          placeholder="输入标题"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">副标题文本</label>
                        <input
                          type="text"
                          value={editedConfig?.subtitle || ''}
                          onChange={(e) => handleConfigChange('subtitle', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                          placeholder="输入副标题"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">描述文本</label>
                        <textarea
                          rows={3}
                          value={editedConfig?.description || ''}
                          onChange={(e) => handleConfigChange('description', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                          placeholder="输入描述"
                        />
                      </div>

                      {editedConfig?.category === 'cta' && (
                        <div className="border-t border-white/10 pt-6">
                          <h4 className="text-sm font-medium text-slate-300 mb-4">CTA按钮设置</h4>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">按钮文本</label>
                            <input
                              type="text"
                              value={editedConfig.ctaButtonText || ''}
                              onChange={(e) => handleConfigChange('ctaButtonText', e.target.value)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                              placeholder="输入按钮文本"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">按钮链接</label>
                            <input
                              type="text"
                              value={editedConfig.ctaButtonLink || ''}
                              onChange={(e) => handleConfigChange('ctaButtonLink', e.target.value)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                              placeholder="输入链接地址"
                            />
                          </div>
                        </div>
                      )}

                      {editedConfig?.category === 'course' && editedConfig.courses && (
                        <div className="border-t border-white/10 pt-6">
                          <h4 className="text-sm font-medium text-slate-300 mb-4">课程列表</h4>
                          <div className="space-y-4">
                            {editedConfig.courses.map((course: CourseItem, index: number) => (
                              <div key={course.id} className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm text-slate-400">课程 {index + 1}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">课程标题</label>
                                    <input
                                      type="text"
                                      value={course.title}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, title: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">副标题</label>
                                    <input
                                      type="text"
                                      value={course.subtitle}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, subtitle: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">价格</label>
                                    <input
                                      type="text"
                                      value={course.price}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, price: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">原价</label>
                                    <input
                                      type="text"
                                      value={course.originalPrice || ''}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, originalPrice: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">分类</label>
                                    <input
                                      type="text"
                                      value={course.category}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, category: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">学习人数</label>
                                    <input
                                      type="number"
                                      value={course.students}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, students: parseInt(e.target.value) || 0 };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-xs text-slate-400 mb-1">图片URL</label>
                                    <input
                                      type="text"
                                      value={course.imageUrl}
                                      onChange={(e) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, imageUrl: e.target.value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {editedConfig?.category === 'stats' && editedConfig.stats && (
                        <div className="border-t border-white/10 pt-6">
                          <h4 className="text-sm font-medium text-slate-300 mb-4">统计数据</h4>
                          <div className="space-y-4">
                            {editedConfig.stats.map((stat: StatItem, index: number) => (
                              <div key={stat.id} className="bg-white/5 rounded-lg p-4">
                                <div className="grid grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">数值</label>
                                    <input
                                      type="text"
                                      value={stat.value}
                                      onChange={(e) => {
                                        const newStats = [...editedConfig.stats!];
                                        newStats[index] = { ...stat, value: e.target.value };
                                        handleConfigChange('stats', newStats);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">单位</label>
                                    <input
                                      type="text"
                                      value={stat.suffix || ''}
                                      onChange={(e) => {
                                        const newStats = [...editedConfig.stats!];
                                        newStats[index] = { ...stat, suffix: e.target.value };
                                        handleConfigChange('stats', newStats);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                      placeholder="如：万"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">标签</label>
                                    <input
                                      type="text"
                                      value={stat.label}
                                      onChange={(e) => {
                                        const newStats = [...editedConfig.stats!];
                                        newStats[index] = { ...stat, label: e.target.value };
                                        handleConfigChange('stats', newStats);
                                      }}
                                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'style' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                          <Type className="w-4 h-4" />
                          标题样式
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">字体</label>
                            <select
                              value={editedConfig?.titleStyle.fontFamily || ''}
                              onChange={(e) => handleStyleChange('titleStyle', 'fontFamily', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            >
                              {fontFamilies.map((font) => (
                                <option key={font} value={font} className="bg-slate-800">
                                  {font.split(',')[0]}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">字号</label>
                            <input
                              type="text"
                              value={editedConfig?.titleStyle.fontSize || ''}
                              onChange={(e) => handleStyleChange('titleStyle', 'fontSize', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                              placeholder="48px"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">粗细</label>
                            <select
                              value={editedConfig?.titleStyle.fontWeight || ''}
                              onChange={(e) => handleStyleChange('titleStyle', 'fontWeight', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            >
                              {fontWeights.map((w) => (
                                <option key={w.value} value={w.value} className="bg-slate-800">
                                  {w.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">颜色</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={editedConfig?.titleStyle.color || '#ffffff'}
                                onChange={(e) => handleStyleChange('titleStyle', 'color', e.target.value)}
                                className="w-12 h-10 rounded-lg cursor-pointer border-0"
                              />
                              <input
                                type="text"
                                value={editedConfig?.titleStyle.color || ''}
                                onChange={(e) => handleStyleChange('titleStyle', 'color', e.target.value)}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs text-slate-400 mb-1">对齐方式</label>
                            <div className="flex gap-2">
                              {textAlignOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => handleStyleChange('titleStyle', 'textAlign', opt.value)}
                                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                                    editedConfig?.titleStyle.textAlign === opt.value
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white/10 text-slate-400 hover:bg-white/20'
                                  }`}
                                >
                                  <opt.icon className="w-4 h-4" />
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                          <Type className="w-4 h-4" />
                          副标题样式
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">字号</label>
                            <input
                              type="text"
                              value={editedConfig?.subtitleStyle.fontSize || ''}
                              onChange={(e) => handleStyleChange('subtitleStyle', 'fontSize', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                              placeholder="16px"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">颜色</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={editedConfig?.subtitleStyle.color || '#e0e7ff'}
                                onChange={(e) => handleStyleChange('subtitleStyle', 'color', e.target.value)}
                                className="w-12 h-10 rounded-lg cursor-pointer border-0"
                              />
                              <input
                                type="text"
                                value={editedConfig?.subtitleStyle.color || ''}
                                onChange={(e) => handleStyleChange('subtitleStyle', 'color', e.target.value)}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          背景设置
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">背景类型</label>
                            <div className="flex gap-2">
                              {['solid', 'gradient', 'image'].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => handleConfigChange('background', { ...editedConfig?.background, type })}
                                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                    editedConfig?.background.type === type
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white/10 text-slate-400 hover:bg-white/20'
                                  }`}
                                >
                                  {type === 'solid' ? '纯色' : type === 'gradient' ? '渐变' : '图片'}
                                </button>
                              ))}
                            </div>
                          </div>
                          {editedConfig?.background.type === 'solid' && (
                            <div>
                              <label className="block text-xs text-slate-400 mb-1">背景颜色</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={editedConfig.background.color || '#4f46e5'}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, color: e.target.value })}
                                  className="w-12 h-10 rounded-lg cursor-pointer border-0"
                                />
                                <input
                                  type="text"
                                  value={editedConfig.background.color || ''}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, color: e.target.value })}
                                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                                />
                              </div>
                            </div>
                          )}
                          {editedConfig?.background.type === 'gradient' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">起始颜色</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={editedConfig.background.gradientStart || '#4f46e5'}
                                    onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientStart: e.target.value })}
                                    className="w-10 h-8 rounded cursor-pointer border-0"
                                  />
                                  <input
                                    type="text"
                                    value={editedConfig.background.gradientStart || ''}
                                    onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientStart: e.target.value })}
                                    className="flex-1 px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">结束颜色</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={editedConfig.background.gradientEnd || '#7c3aed'}
                                    onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientEnd: e.target.value })}
                                    className="w-10 h-8 rounded cursor-pointer border-0"
                                  />
                                  <input
                                    type="text"
                                    value={editedConfig.background.gradientEnd || ''}
                                    onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientEnd: e.target.value })}
                                    className="flex-1 px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                  />
                                </div>
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs text-slate-400 mb-1">渐变方向</label>
                                <select
                                  value={editedConfig.background.gradientDirection || 'to-r'}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientDirection: e.target.value })}
                                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                                >
                                  {gradientDirections.map((dir) => (
                                    <option key={dir.value} value={dir.value} className="bg-slate-800">
                                      {dir.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                          {editedConfig?.background.type === 'image' && (
                            <div>
                              <label className="block text-xs text-slate-400 mb-1">图片URL</label>
                              <input
                                type="text"
                                value={editedConfig.background.imageUrl || ''}
                                onChange={(e) => handleConfigChange('background', { ...editedConfig.background, imageUrl: e.target.value })}
                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                                placeholder="输入图片URL"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                          <Square className="w-4 h-4" />
                          边框设置
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">边框样式</label>
                            <select
                              value={editedConfig?.border.style || 'none'}
                              onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, style: e.target.value })}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                            >
                              {borderStyles.map((style) => (
                                <option key={style.value} value={style.value} className="bg-slate-800">
                                  {style.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">边框颜色</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={editedConfig?.border.color || '#ffffff'}
                                onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, color: e.target.value })}
                                className="w-12 h-10 rounded-lg cursor-pointer border-0"
                              />
                              <input
                                type="text"
                                value={editedConfig?.border.color || ''}
                                onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, color: e.target.value })}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">边框宽度</label>
                            <input
                              type="text"
                              value={editedConfig?.border.width || ''}
                              onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, width: e.target.value })}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder='1px' focus:outline-none focus:border-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">圆角半径</label>
                            <input
                              type="text"
                              value={editedConfig?.border.radius || ''}
                              onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, radius: e.target.value })}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder='8px' focus:outline-none focus:border-blue-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          阴影设置
                        </h4>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm text-slate-400">启用阴影</span>
                          <button
                            onClick={() => handleConfigChange('shadow', { ...editedConfig?.shadow, enable: !editedConfig?.shadow.enable })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              editedConfig?.shadow.enable ? 'bg-green-500' : 'bg-slate-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                editedConfig?.shadow.enable ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        {editedConfig?.shadow.enable && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-slate-400 mb-1">阴影颜色</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={editedConfig.shadow.color || 'rgba(0,0,0,0.3)'}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, color: e.target.value })}
                                  className="w-12 h-10 rounded-lg cursor-pointer border-0"
                                />
                                <input
                                  type="text"
                                  value={editedConfig.shadow.color || ''}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, color: e.target.value })}
                                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">X偏移</label>
                                <input
                                  type="text"
                                  value={editedConfig.shadow.offsetX || ''}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, offsetX: e.target.value })}
                                  className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Y偏移</label>
                                <input
                                  type="text"
                                  value={editedConfig.shadow.offsetY || ''}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, offsetY: e.target.value })}
                                  className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">模糊</label>
                                <input
                                  type="text"
                                  value={editedConfig.shadow.blur || ''}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, blur: e.target.value })}
                                  className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">扩展</label>
                                <input
                                  type="text"
                                  value={editedConfig.shadow.spread || ''}
                                  onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, spread: e.target.value })}
                                  className="w-full px-2 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'versions' && (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {versions.length > 0 ? (
                        versions.map((version) => (
                          <div
                            key={version.id}
                            className="p-3 bg-white/5 rounded-lg border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300 font-medium">版本 {version.id.slice(-8)}</span>
                              <button
                                onClick={() => handleRollback(version.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-400 rounded text-xs hover:bg-amber-500/30 transition-colors"
                              >
                                <Undo2 className="w-3 h-3" />
                                回滚
                              </button>
                            </div>
                            <div className="text-xs text-slate-400">
                              <div>时间: {formatDate(version.timestamp)}</div>
                              {version.user && <div>操作人: {version.user}</div>}
                              {version.reason && <div>原因: {version.reason}</div>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          暂无版本记录
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Save className="w-4 h-4" />
                    保存配置
                  </motion.button>
                  <motion.button
                    onClick={() => setEditedConfig({ ...selectedModule })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    实时预览
                  </h3>
                  <div className="flex gap-1 bg-white/10 rounded-lg p-1">
                    {[
                      { id: 'desktop', icon: Monitor, label: 'PC' },
                      { id: 'tablet', icon: Tablet, label: '平板' },
                      { id: 'mobile', icon: Smartphone, label: '手机' },
                    ].map((device) => (
                      <button
                        key={device.id}
                        onClick={() => setPreviewDevice(device.id as typeof previewDevice)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-all ${
                          previewDevice === device.id
                            ? 'bg-white text-slate-900'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <device.icon className="w-4 h-4" />
                        {device.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="mx-auto bg-white rounded-lg overflow-hidden shadow-2xl"
                    style={{ width: deviceWidths[previewDevice] }}
                  >
                    <div
                      style={editedConfig ? generateStyleObject(editedConfig) : {}}
                      className="min-h-[400px] p-4"
                    >
                      {editedConfig?.title && (
                        <div className="mb-2 text-center">
                          <EditableText
                            value={editedConfig.title}
                            onChange={(value) => handleConfigChange('title', value)}
                            style={generateTextStyleObject(editedConfig.titleStyle)}
                            className="cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                          />
                        </div>
                      )}
                      {editedConfig?.subtitle && (
                        <div className="mb-6 text-center">
                          <EditableText
                            value={editedConfig.subtitle}
                            onChange={(value) => handleConfigChange('subtitle', value)}
                            style={generateTextStyleObject(editedConfig.subtitleStyle)}
                            className="cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                          />
                        </div>
                      )}
                      
                      {editedConfig?.category === 'course' && editedConfig.courses && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {editedConfig.courses.slice(0, previewDevice === 'mobile' ? 2 : 4).map((course: CourseItem, index: number) => (
                            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                              <img 
                                src={course.imageUrl} 
                                alt={course.title}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-3">
                                <EditableText
                                  value={course.category}
                                  onChange={(value) => {
                                    const newCourses = [...editedConfig.courses!];
                                    newCourses[index] = { ...course, category: value };
                                    handleConfigChange('courses', newCourses);
                                  }}
                                  className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full cursor-pointer hover:bg-blue-200"
                                />
                                <div className="mt-2">
                                  <EditableText
                                    value={course.title}
                                    onChange={(value) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, title: value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="block font-semibold text-gray-800 text-sm cursor-pointer hover:bg-gray-50 rounded px-1"
                                  />
                                </div>
                                <EditableText
                                  value={course.subtitle}
                                  onChange={(value) => {
                                    const newCourses = [...editedConfig.courses!];
                                    newCourses[index] = { ...course, subtitle: value };
                                    handleConfigChange('courses', newCourses);
                                  }}
                                  className="block text-xs text-gray-500 mt-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                                <div className="flex items-center justify-between mt-2">
                                  <EditableText
                                    value={course.price}
                                    onChange={(value) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, price: value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="text-red-500 font-bold cursor-pointer hover:bg-gray-50 rounded px-1"
                                  />
                                  {course.originalPrice && (
                                    <EditableText
                                      value={course.originalPrice}
                                      onChange={(value) => {
                                        const newCourses = [...editedConfig.courses!];
                                        newCourses[index] = { ...course, originalPrice: value };
                                        handleConfigChange('courses', newCourses);
                                      }}
                                      className="text-xs text-gray-400 line-through cursor-pointer hover:bg-gray-50 rounded px-1"
                                    />
                                  )}
                                </div>
                                <EditableText
                                  value={`${course.students.toLocaleString()} 人已学习`}
                                  onChange={(value) => {
                                    const newCourses = [...editedConfig.courses!];
                                    const num = parseInt(value.replace(/[^0-9]/g, '')) || course.students;
                                    newCourses[index] = { ...course, students: num };
                                    handleConfigChange('courses', newCourses);
                                  }}
                                  className="block text-xs text-gray-400 mt-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'teacher' && editedConfig.teachers && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                          {editedConfig.teachers.slice(0, previewDevice === 'mobile' ? 2 : previewDevice === 'tablet' ? 3 : 4).map((teacher: TeacherItem, index: number) => (
                            <div key={teacher.id} className="text-center">
                              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                                {teacher.name.charAt(0)}
                              </div>
                              <EditableText
                                value={teacher.name}
                                onChange={(value) => {
                                  const newTeachers = [...editedConfig.teachers!];
                                  newTeachers[index] = { ...teacher, name: value };
                                  handleConfigChange('teachers', newTeachers);
                                }}
                                className="block font-semibold text-gray-800 mt-2 text-sm cursor-pointer hover:bg-gray-50 rounded px-1"
                              />
                              <EditableText
                                value={teacher.title}
                                onChange={(value) => {
                                  const newTeachers = [...editedConfig.teachers!];
                                  newTeachers[index] = { ...teacher, title: value };
                                  handleConfigChange('teachers', newTeachers);
                                }}
                                className="block text-xs text-blue-500 cursor-pointer hover:bg-gray-50 rounded px-1"
                              />
                              <EditableText
                                value={teacher.subject}
                                onChange={(value) => {
                                  const newTeachers = [...editedConfig.teachers!];
                                  newTeachers[index] = { ...teacher, subject: value };
                                  handleConfigChange('teachers', newTeachers);
                                }}
                                className="block text-xs text-gray-500 cursor-pointer hover:bg-gray-50 rounded px-1"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'stats' && editedConfig.stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                          {editedConfig.stats.map((stat: StatItem, index: number) => (
                            <div key={stat.id} className="text-center">
                              <div className="text-3xl font-bold text-blue-600">
                                <EditableText
                                  value={stat.value}
                                  onChange={(value) => {
                                    const newStats = [...editedConfig.stats!];
                                    newStats[index] = { ...stat, value };
                                    handleConfigChange('stats', newStats);
                                  }}
                                  className="cursor-pointer hover:bg-blue-50 rounded px-2"
                                />
                                <EditableText
                                  value={stat.suffix || ''}
                                  onChange={(value) => {
                                    const newStats = [...editedConfig.stats!];
                                    newStats[index] = { ...stat, suffix: value };
                                    handleConfigChange('stats', newStats);
                                  }}
                                  className="cursor-pointer hover:bg-blue-50 rounded px-1"
                                />
                              </div>
                              <EditableText
                                value={stat.label}
                                onChange={(value) => {
                                  const newStats = [...editedConfig.stats!];
                                  newStats[index] = { ...stat, label: value };
                                  handleConfigChange('stats', newStats);
                                }}
                                className="block text-sm text-gray-600 cursor-pointer hover:bg-gray-50 rounded px-1"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'feature' && editedConfig.features && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {editedConfig.features.slice(0, previewDevice === 'mobile' ? 2 : 4).map((feature: FeatureItem, index: number) => (
                            <div key={feature.id} className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-blue-500" />
                              </div>
                              <div>
                                <EditableText
                                  value={feature.title}
                                  onChange={(value) => {
                                    const newFeatures = [...editedConfig.features!];
                                    newFeatures[index] = { ...feature, title: value };
                                    handleConfigChange('features', newFeatures);
                                  }}
                                  className="block font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                                <EditableText
                                  value={feature.description}
                                  onChange={(value) => {
                                    const newFeatures = [...editedConfig.features!];
                                    newFeatures[index] = { ...feature, description: value };
                                    handleConfigChange('features', newFeatures);
                                  }}
                                  className="block text-sm text-gray-500 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'hero' && (
                        <div className="text-center">
                          {editedConfig.description && (
                            <EditableText
                              value={editedConfig.description}
                              onChange={(value) => handleConfigChange('description', value)}
                              style={generateTextStyleObject(editedConfig.descriptionStyle)}
                              className="block max-w-md mx-auto mb-6 cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                            />
                          )}
                          {editedConfig.ctaButtonText && (
                            <EditableButton
                              value={editedConfig.ctaButtonText}
                              onChange={(value) => handleConfigChange('ctaButtonText', value)}
                            />
                          )}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'cta' && (
                        <div className="text-center">
                          {editedConfig.description && (
                            <EditableText
                              value={editedConfig.description}
                              onChange={(value) => handleConfigChange('description', value)}
                              style={generateTextStyleObject(editedConfig.descriptionStyle)}
                              className="block max-w-md mx-auto mb-6 cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                            />
                          )}
                          {editedConfig.ctaButtonText && (
                            <EditableButton
                              value={editedConfig.ctaButtonText}
                              onChange={(value) => handleConfigChange('ctaButtonText', value)}
                              variant="cta"
                            />
                          )}
                        </div>
                      )}
                      
                      {editedConfig?.category === 'partner' && editedConfig.partnerLogos && (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          {editedConfig.partnerLogos.slice(0, 4).map((logo, index) => (
                            <div key={index} className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <EditableText
                                value={`合作伙伴 ${index + 1}`}
                                onChange={(value) => {
                                  const newLogos = [...editedConfig.partnerLogos!];
                                  newLogos[index] = value;
                                  handleConfigChange('partnerLogos', newLogos);
                                }}
                                className="text-xs text-gray-400 cursor-pointer hover:bg-gray-200 rounded px-1"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {editedConfig?.milestones && (
                        <div className="space-y-4 mt-4">
                          {editedConfig.milestones.slice(0, 3).map((milestone: MilestoneItem, index: number) => (
                            <div key={milestone.id} className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <EditableText
                                  value={milestone.year}
                                  onChange={(value) => {
                                    const newMilestones = [...editedConfig.milestones!];
                                    newMilestones[index] = { ...milestone, year: value };
                                    handleConfigChange('milestones', newMilestones);
                                  }}
                                  className="text-sm font-bold text-purple-600 cursor-pointer hover:bg-purple-200 rounded-full w-full h-full flex items-center justify-center"
                                />
                              </div>
                              <div>
                                <EditableText
                                  value={milestone.title}
                                  onChange={(value) => {
                                    const newMilestones = [...editedConfig.milestones!];
                                    newMilestones[index] = { ...milestone, title: value };
                                    handleConfigChange('milestones', newMilestones);
                                  }}
                                  className="block font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                                <EditableText
                                  value={milestone.description}
                                  onChange={(value) => {
                                    const newMilestones = [...editedConfig.milestones!];
                                    newMilestones[index] = { ...milestone, description: value };
                                    handleConfigChange('milestones', newMilestones);
                                  }}
                                  className="block text-sm text-gray-500 cursor-pointer hover:bg-gray-50 rounded px-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px]">
              <LayoutGrid className="w-16 h-16 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">选择一个模块</h3>
              <p className="text-slate-500">从左侧列表中选择要配置的模块</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}