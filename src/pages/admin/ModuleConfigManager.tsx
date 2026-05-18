import { useState, useEffect } from 'react';
import {
  LayoutGrid, Eye, EyeOff, Monitor, Tablet, Smartphone,
  RotateCcw, Save, Undo2, ChevronRight, Palette, Type,
  AlignLeft, AlignCenter, AlignRight, Square, Sparkles,
  History, XCircle, ChevronDown, ChevronUp
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
} from '../../utils/moduleConfig';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';

export default function ModuleConfigManagerAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [modules, setModules] = useState<ModuleConfig[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'versions'>('content');
  const [versions, setVersions] = useState<ConfigVersion[]>([]);
  const [editedConfig, setEditedConfig] = useState<ModuleConfig | null>(null);

  useEffect(() => {
    loadModules();
  }, []);

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
        showNotification('配置保存成功', 'success');
      } else {
        showNotification('保存失败，请重试', 'error');
      }
    } catch (error) {
      console.error('保存配置失败:', error);
      showNotification('保存配置时发生错误', 'error');
    }
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
          showNotification('回滚成功', 'success');
        } else {
          showNotification('回滚失败，请重试', 'error');
        }
      } catch (error) {
        console.error('回滚配置失败:', error);
        showNotification('回滚配置时发生错误', 'error');
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
    teacher: '师资',
    testimonial: '评价',
    cta: '行动号召',
    stats: '统计',
    partner: '合作伙伴',
    section: '章节',
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

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      
      <div style={{ display: 'flex', gap: '24px', minHeight: 'calc(100vh - 120px)' }}>
        {/* 左侧模块列表 */}
        <div style={{ width: '280px', flexShrink: 0, borderRight: '1px solid rgb(226 232 240)', paddingRight: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 4px 0' }}>模块配置</h2>
            <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: 0 }}>管理网站模块内容与样式</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedModule?.id === module.id ? 'rgb(239 246 255)' : 'transparent',
                  border: selectedModule?.id === module.id ? '1px solid rgb(59 130 246)' : '1px solid transparent',
                  transition: '0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: module.enabled ? 'rgb(34 197 94)' : 'rgb(148 163 184)',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {module.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>
                      {categoryLabels[module.category]}
                    </div>
                  </div>
                  {selectedModule?.id === module.id && <ChevronRight size={16} style={{ color: 'rgb(59 130 246)' }} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧配置区域 */}
        <div style={{ flex: 1 }}>
          {selectedModule ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'rgb(15 23 42)', margin: '0 0 4px 0' }}>
                    {selectedModule.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: 0 }}>
                    {selectedModule.description}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleToggle(selectedModule.id)}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      backgroundColor: selectedModule.enabled ? 'rgb(220 252 231)' : 'rgb(241 245 249)',
                      color: selectedModule.enabled ? 'rgb(21 128 61)' : 'rgb(100 116 139)',
                    }}
                  >
                    {selectedModule.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                    {selectedModule.enabled ? '已启用' : '已禁用'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="admin-btn admin-btn-primary"
                  >
                    <Save size={16} />
                    保存配置
                  </button>
                </div>
              </div>

              {/* Tab 切换 */}
              <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgb(226 232 240)', marginBottom: '24px' }}>
                {[
                  { id: 'content', label: '内容', icon: Type },
                  { id: 'style', label: '样式', icon: Palette },
                  { id: 'versions', label: '版本', icon: History },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    style={{
                      padding: '12px 24px',
                      background: 'transparent',
                      color: activeTab === tab.id ? 'rgb(59 130 246)' : 'rgb(100 116 139)',
                      border: 'none',
                      borderBottom: activeTab === tab.id ? '2px solid rgb(59 130 246)' : '2px solid transparent',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="admin-card">
                {activeTab === 'content' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)', marginBottom: '8px' }}>
                        标题文本
                      </label>
                      <input
                        type="text"
                        value={editedConfig?.title || ''}
                        onChange={(e) => handleConfigChange('title', e.target.value)}
                        className="admin-input"
                        placeholder="输入标题"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)', marginBottom: '8px' }}>
                        副标题文本
                      </label>
                      <input
                        type="text"
                        value={editedConfig?.subtitle || ''}
                        onChange={(e) => handleConfigChange('subtitle', e.target.value)}
                        className="admin-input"
                        placeholder="输入副标题"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)', marginBottom: '8px' }}>
                        描述文本
                      </label>
                      <textarea
                        rows={3}
                        value={editedConfig?.description || ''}
                        onChange={(e) => handleConfigChange('description', e.target.value)}
                        className="admin-input admin-textarea"
                        placeholder="输入描述"
                      />
                    </div>

                    {editedConfig?.category === 'cta' && (
                      <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)', marginTop: '4px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0' }}>
                          CTA按钮设置
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'rgb(71 85 105)', marginBottom: '6px' }}>
                              按钮文本
                            </label>
                            <input
                              type="text"
                              value={editedConfig.ctaButtonText || ''}
                              onChange={(e) => handleConfigChange('ctaButtonText', e.target.value)}
                              className="admin-input"
                              placeholder="输入按钮文本"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'rgb(71 85 105)', marginBottom: '6px' }}>
                              按钮链接
                            </label>
                            <input
                              type="text"
                              value={editedConfig.ctaButtonLink || ''}
                              onChange={(e) => handleConfigChange('ctaButtonLink', e.target.value)}
                              className="admin-input"
                              placeholder="输入链接地址"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {editedConfig?.category === 'course' && editedConfig.courses && (
                      <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)', marginTop: '4px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0' }}>
                          课程列表
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {editedConfig.courses.map((course: CourseItem, index: number) => (
                            <div key={course.id} className="admin-card" style={{ margin: 0, backgroundColor: 'rgb(248 250 252)' }}>
                              <div style={{ marginBottom: '12px' }}>
                                <span style={{ fontSize: '13px', color: 'rgb(100 116 139)' }}>课程 {index + 1}</span>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    课程标题
                                  </label>
                                  <input
                                    type="text"
                                    value={course.title}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, title: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    副标题
                                  </label>
                                  <input
                                    type="text"
                                    value={course.subtitle}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, subtitle: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    价格
                                  </label>
                                  <input
                                    type="text"
                                    value={course.price}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, price: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    原价
                                  </label>
                                  <input
                                    type="text"
                                    value={course.originalPrice || ''}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, originalPrice: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    分类
                                  </label>
                                  <input
                                    type="text"
                                    value={course.category}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, category: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    学习人数
                                  </label>
                                  <input
                                    type="number"
                                    value={course.students}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, students: parseInt(e.target.value) || 0 };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    图片URL
                                  </label>
                                  <input
                                    type="text"
                                    value={course.imageUrl}
                                    onChange={(e) => {
                                      const newCourses = [...editedConfig.courses!];
                                      newCourses[index] = { ...course, imageUrl: e.target.value };
                                      handleConfigChange('courses', newCourses);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {editedConfig?.category === 'stats' && editedConfig.stats && (
                      <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)', marginTop: '4px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0' }}>
                          统计数据
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {editedConfig.stats.map((stat: StatItem, index: number) => (
                            <div key={stat.id} className="admin-card" style={{ margin: 0, backgroundColor: 'rgb(248 250 252)' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    数值
                                  </label>
                                  <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => {
                                      const newStats = [...editedConfig.stats!];
                                      newStats[index] = { ...stat, value: e.target.value };
                                      handleConfigChange('stats', newStats);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    单位
                                  </label>
                                  <input
                                    type="text"
                                    value={stat.suffix || ''}
                                    onChange={(e) => {
                                      const newStats = [...editedConfig.stats!];
                                      newStats[index] = { ...stat, suffix: e.target.value };
                                      handleConfigChange('stats', newStats);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
                                    placeholder="如：万"
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '12px', color: 'rgb(100 116 139)', marginBottom: '4px' }}>
                                    标签
                                  </label>
                                  <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => {
                                      const newStats = [...editedConfig.stats!];
                                      newStats[index] = { ...stat, label: e.target.value };
                                      handleConfigChange('stats', newStats);
                                    }}
                                    className="admin-input"
                                    style={{ fontSize: '13px' }}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Type size={18} />
                        标题样式
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            字体
                          </label>
                          <select
                            value={editedConfig?.titleStyle.fontFamily || ''}
                            onChange={(e) => handleStyleChange('titleStyle', 'fontFamily', e.target.value)}
                            className="admin-input admin-select"
                          >
                            {fontFamilies.map((font) => (
                              <option key={font} value={font}>{font.split(',')[0]}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            字号
                          </label>
                          <input
                            type="text"
                            value={editedConfig?.titleStyle.fontSize || ''}
                            onChange={(e) => handleStyleChange('titleStyle', 'fontSize', e.target.value)}
                            className="admin-input"
                            placeholder="48px"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            粗细
                          </label>
                          <select
                            value={editedConfig?.titleStyle.fontWeight || ''}
                            onChange={(e) => handleStyleChange('titleStyle', 'fontWeight', e.target.value)}
                            className="admin-input admin-select"
                          >
                            {fontWeights.map((w) => (
                              <option key={w.value} value={w.value}>{w.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            颜色
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="color"
                              value={editedConfig?.titleStyle.color || '#ffffff'}
                              onChange={(e) => handleStyleChange('titleStyle', 'color', e.target.value)}
                              style={{
                                width: '44px',
                                height: '40px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                            <input
                              type="text"
                              value={editedConfig?.titleStyle.color || ''}
                              onChange={(e) => handleStyleChange('titleStyle', 'color', e.target.value)}
                              className="admin-input"
                            />
                          </div>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '8px' }}>
                            对齐方式
                          </label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {textAlignOptions.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => handleStyleChange('titleStyle', 'textAlign', opt.value)}
                                style={{
                                  flex: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '10px',
                                  borderRadius: '8px',
                                  backgroundColor: editedConfig?.titleStyle.textAlign === opt.value ? 'rgb(59 130 246)' : 'rgb(241 245 249)',
                                  color: editedConfig?.titleStyle.textAlign === opt.value ? 'white' : 'rgb(100 116 139)',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                }}
                              >
                                <opt.icon size={16} />
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Type size={18} />
                        副标题样式
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            字号
                          </label>
                          <input
                            type="text"
                            value={editedConfig?.subtitleStyle.fontSize || ''}
                            onChange={(e) => handleStyleChange('subtitleStyle', 'fontSize', e.target.value)}
                            className="admin-input"
                            placeholder="16px"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            颜色
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="color"
                              value={editedConfig?.subtitleStyle.color || '#e0e7ff'}
                              onChange={(e) => handleStyleChange('subtitleStyle', 'color', e.target.value)}
                              style={{
                                width: '44px',
                                height: '40px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                            <input
                              type="text"
                              value={editedConfig?.subtitleStyle.color || ''}
                              onChange={(e) => handleStyleChange('subtitleStyle', 'color', e.target.value)}
                              className="admin-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Palette size={18} />
                        背景设置
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '8px' }}>
                            背景类型
                          </label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {['solid', 'gradient', 'image'].map((type) => (
                              <button
                                key={type}
                                onClick={() => handleConfigChange('background', { ...editedConfig?.background, type })}
                                style={{
                                  flex: 1,
                                  padding: '10px',
                                  borderRadius: '8px',
                                  backgroundColor: editedConfig?.background.type === type ? 'rgb(59 130 246)' : 'rgb(241 245 249)',
                                  color: editedConfig?.background.type === type ? 'white' : 'rgb(100 116 139)',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                }}
                              >
                                {type === 'solid' ? '纯色' : type === 'gradient' ? '渐变' : '图片'}
                              </button>
                            ))}
                          </div>
                        </div>
                        {editedConfig?.background.type === 'solid' && (
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              背景颜色
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="color"
                                value={editedConfig.background.color || '#4f46e5'}
                                onChange={(e) => handleConfigChange('background', { ...editedConfig.background, color: e.target.value })}
                                style={{
                                  width: '44px',
                                  height: '40px',
                                  borderRadius: '6px',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              />
                              <input
                                type="text"
                                value={editedConfig.background.color || ''}
                                onChange={(e) => handleConfigChange('background', { ...editedConfig.background, color: e.target.value })}
                                className="admin-input"
                              />
                            </div>
                          </div>
                        )}
                        {editedConfig?.background.type === 'gradient' && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                                起始颜色
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                  type="color"
                                  value={editedConfig.background.gradientStart || '#4f46e5'}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientStart: e.target.value })}
                                  style={{
                                    width: '40px',
                                    height: '36px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                  }}
                                />
                                <input
                                  type="text"
                                  value={editedConfig.background.gradientStart || ''}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientStart: e.target.value })}
                                  className="admin-input"
                                  style={{ fontSize: '13px' }}
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                                结束颜色
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                  type="color"
                                  value={editedConfig.background.gradientEnd || '#7c3aed'}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientEnd: e.target.value })}
                                  style={{
                                    width: '40px',
                                    height: '36px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                  }}
                                />
                                <input
                                  type="text"
                                  value={editedConfig.background.gradientEnd || ''}
                                  onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientEnd: e.target.value })}
                                  className="admin-input"
                                  style={{ fontSize: '13px' }}
                                />
                              </div>
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                              <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                                渐变方向
                              </label>
                              <select
                                value={editedConfig.background.gradientDirection || 'to-r'}
                                onChange={(e) => handleConfigChange('background', { ...editedConfig.background, gradientDirection: e.target.value })}
                                className="admin-input admin-select"
                              >
                                {gradientDirections.map((dir) => (
                                  <option key={dir.value} value={dir.value}>{dir.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        {editedConfig?.background.type === 'image' && (
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              图片URL
                            </label>
                            <input
                              type="text"
                              value={editedConfig.background.imageUrl || ''}
                              onChange={(e) => handleConfigChange('background', { ...editedConfig.background, imageUrl: e.target.value })}
                              className="admin-input"
                              placeholder="输入图片URL"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Square size={18} />
                        边框设置
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            边框样式
                          </label>
                          <select
                            value={editedConfig?.border.style || 'none'}
                            onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, style: e.target.value })}
                            className="admin-input admin-select"
                          >
                            {borderStyles.map((style) => (
                              <option key={style.value} value={style.value}>{style.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            边框颜色
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="color"
                              value={editedConfig?.border.color || '#ffffff'}
                              onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, color: e.target.value })}
                              style={{
                                width: '44px',
                                height: '40px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                            <input
                              type="text"
                              value={editedConfig?.border.color || ''}
                              onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, color: e.target.value })}
                              className="admin-input"
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            边框宽度
                          </label>
                          <input
                            type="text"
                            value={editedConfig?.border.width || ''}
                            onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, width: e.target.value })}
                            className="admin-input"
                            placeholder="1px"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                            圆角半径
                          </label>
                          <input
                            type="text"
                            value={editedConfig?.border.radius || ''}
                            onChange={(e) => handleConfigChange('border', { ...editedConfig?.border, radius: e.target.value })}
                            className="admin-input"
                            placeholder="8px"
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: '20px', borderTop: '1px solid rgb(226 232 240)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={18} />
                        阴影设置
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '14px', color: 'rgb(100 116 139)' }}>启用阴影</span>
                        <button
                          onClick={() => handleConfigChange('shadow', { ...editedConfig?.shadow, enable: !editedConfig?.shadow.enable })}
                          style={{
                            position: 'relative',
                            width: '44px',
                            height: '24px',
                            borderRadius: '9999px',
                            backgroundColor: editedConfig?.shadow.enable ? 'rgb(34 197 94)' : 'rgb(203 213 225)',
                            cursor: 'pointer',
                            border: 'none',
                            transition: '0.2s',
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: editedConfig?.shadow.enable ? '22px' : '2px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transition: '0.2s',
                          }} />
                        </button>
                      </div>
                      {editedConfig?.shadow.enable && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              阴影颜色
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="color"
                                value={editedConfig.shadow.color || 'rgba(0,0,0,0.3)'}
                                onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, color: e.target.value })}
                                style={{
                                  width: '44px',
                                  height: '40px',
                                  borderRadius: '6px',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              />
                              <input
                                type="text"
                                value={editedConfig.shadow.color || ''}
                                onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, color: e.target.value })}
                                className="admin-input"
                              />
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              阴影偏移 X
                            </label>
                            <input
                              type="text"
                              value={editedConfig.shadow.offsetX || ''}
                              onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, offsetX: e.target.value })}
                              className="admin-input"
                              placeholder="0px"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              阴影偏移 Y
                            </label>
                            <input
                              type="text"
                              value={editedConfig.shadow.offsetY || ''}
                              onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, offsetY: e.target.value })}
                              className="admin-input"
                              placeholder="4px"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'rgb(100 116 139)', marginBottom: '6px' }}>
                              模糊半径
                            </label>
                            <input
                              type="text"
                              value={editedConfig.shadow.blur || ''}
                              onChange={(e) => handleConfigChange('shadow', { ...editedConfig.shadow, blur: e.target.value })}
                              className="admin-input"
                              placeholder="8px"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'versions' && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 16px 0' }}>
                      版本历史
                    </h4>
                    {versions.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {versions.map((version) => (
                          <div key={version.id} className="admin-card" style={{ margin: 0, backgroundColor: 'rgb(248 250 252)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: version.isCurrent ? 'rgb(34 197 94)' : 'rgb(148 163 184)',
                                }} />
                                <div>
                                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(15 23 42)' }}>
                                    {version.message}
                                    {version.isCurrent && <span style={{ marginLeft: '8px', fontSize: '12px', color: 'rgb(34 197 94)' }}>(当前)</span>}
                                  </div>
                                  <div style={{ fontSize: '12px', color: 'rgb(100 116 139)', marginTop: '2px' }}>
                                    {formatDate(version.timestamp)} · {version.author}
                                  </div>
                                </div>
                              </div>
                              {!version.isCurrent && (
                                <button
                                  onClick={() => handleRollback(version.id)}
                                  className="admin-btn admin-btn-secondary"
                                  style={{ fontSize: '13px', padding: '6px 12px' }}
                                >
                                  <Undo2 size={14} />
                                  回滚到此版本
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'rgb(100 116 139)' }}>
                        暂无版本历史
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <LayoutGrid size={64} style={{ color: 'rgb(209 213 219)', margin: '0 auto 16px auto' }} />
              <p style={{ fontSize: '16px', color: 'rgb(100 116 139)', margin: 0 }}>请从左侧选择一个模块进行配置</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
