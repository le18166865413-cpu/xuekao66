export interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  category: 'page' | 'component' | 'feature' | 'system';
  enabled: boolean;
  params: Record<string, FeatureParam>;
  dependencies: string[];
  lastModified: number;
  modifiedBy?: string;
}

export interface FeatureParam {
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'textarea';
  value: string | number | boolean;
  options?: string[];
  required: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error' | 'success';
  module: string;
  message: string;
  details?: Record<string, any>;
  user?: string;
}

const defaultFeatures: FeatureConfig[] = [
  {
    id: 'page-home',
    name: '首页',
    description: '网站首页，展示核心功能和课程推荐',
    category: 'page',
    enabled: true,
    params: {
      showHero: { name: '显示首屏', description: '是否显示首页英雄区', type: 'boolean', value: true, required: false },
      showCourses: { name: '显示课程推荐', description: '是否显示热门课程推荐', type: 'boolean', value: true, required: false },
      showFeatures: { name: '显示功能特性', description: '是否显示功能特性展示', type: 'boolean', value: true, required: false },
      showTeachers: { name: '显示讲师', description: '是否显示讲师团队', type: 'boolean', value: true, required: false },
      showStats: { name: '显示数据统计', description: '是否显示统计数据', type: 'boolean', value: true, required: false },
      wheatDecoration: { name: '麦穗装饰', description: '标题是否显示麦穗装饰', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-courses',
    name: '课程中心',
    description: '课程列表页面，支持筛选和搜索',
    category: 'page',
    enabled: true,
    params: {
      enableSearch: { name: '启用搜索', description: '是否启用课程搜索功能', type: 'boolean', value: true, required: false },
      enableFilter: { name: '启用筛选', description: '是否启用科目/年级筛选', type: 'boolean', value: true, required: false },
      defaultSort: { name: '默认排序', description: '课程默认排序方式', type: 'select', value: 'popular', options: ['popular', 'newest', 'price-asc', 'price-desc'], required: false },
      itemsPerPage: { name: '每页数量', description: '每页显示的课程数量', type: 'number', value: 8, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-assessment',
    name: '测评中心',
    description: 'AI智能测评系统',
    category: 'page',
    enabled: true,
    params: {
      enableQuickStart: { name: '快速开始', description: '是否显示快速开始按钮', type: 'boolean', value: true, required: false },
      defaultQuestionCount: { name: '默认题目数', description: '测评默认题目数量', type: 'number', value: 20, required: false },
      defaultDuration: { name: '默认时长', description: '测评默认时长（分钟）', type: 'number', value: 60, required: false },
      enableSubjectSelect: { name: '科目选择', description: '是否允许选择测评科目', type: 'boolean', value: true, required: false },
    },
    dependencies: ['feature-assessment-engine'],
    lastModified: Date.now(),
  },
  {
    id: 'page-planning',
    name: '升学规划',
    description: '专业探索和职业规划',
    category: 'page',
    enabled: true,
    params: {
      enableProfile: { name: '个人画像', description: '是否启用个人画像功能', type: 'boolean', value: true, required: false },
      enableCareerQuiz: { name: '职业测评', description: '是否启用职业倾向测评', type: 'boolean', value: true, required: false },
      enableMajorExplore: { name: '专业探索', description: '是否启用专业探索功能', type: 'boolean', value: true, required: false },
    },
    dependencies: ['feature-plan-generator'],
    lastModified: Date.now(),
  },
  {
    id: 'page-news',
    name: '高考资讯',
    description: '资讯列表和详情页面',
    category: 'page',
    enabled: true,
    params: {
      enableSearch: { name: '启用搜索', description: '是否启用资讯搜索', type: 'boolean', value: true, required: false },
      enableCategoryFilter: { name: '分类筛选', description: '是否启用分类筛选', type: 'boolean', value: true, required: false },
      wheatDecoration: { name: '麦穗装饰', description: '标题是否显示麦穗装饰', type: 'boolean', value: false, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-companion',
    name: '伴学中心',
    description: '伴学服务介绍页面',
    category: 'page',
    enabled: true,
    params: {
      showPackages: { name: '显示套餐', description: '是否显示服务套餐', type: 'boolean', value: true, required: false },
      showPricing: { name: '显示价格', description: '是否显示价格信息', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-partner',
    name: '合伙人',
    description: '合伙人计划介绍',
    category: 'page',
    enabled: true,
    params: {
      showBenefits: { name: '显示优势', description: '是否显示合作优势', type: 'boolean', value: true, required: false },
      showProcess: { name: '显示流程', description: '是否显示合作流程', type: 'boolean', value: true, required: false },
      showContactForm: { name: '显示表单', description: '是否显示咨询表单', type: 'boolean', value: true, required: false },
      wheatDecoration: { name: '麦穗装饰', description: '标题是否显示麦穗装饰', type: 'boolean', value: false, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-about',
    name: '关于我们',
    description: '公司介绍页面',
    category: 'page',
    enabled: true,
    params: {
      wheatDecoration: { name: '麦穗装饰', description: '标题是否显示麦穗装饰', type: 'boolean', value: false, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-materials',
    name: '资料中心',
    description: '学习资料下载页面',
    category: 'page',
    enabled: true,
    params: {
      enableDownload: { name: '启用下载', description: '是否启用资料下载功能', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-app',
    name: 'APP下载',
    description: '移动端APP下载引导',
    category: 'page',
    enabled: true,
    params: {
      showQRCode: { name: '显示二维码', description: '是否显示下载二维码', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'page-profile',
    name: '用户中心',
    description: '用户个人中心',
    category: 'page',
    enabled: true,
    params: {
      showAdminPanel: { name: '管理员面板', description: '是否显示管理员快捷入口', type: 'boolean', value: true, required: false },
    },
    dependencies: ['feature-auth'],
    lastModified: Date.now(),
  },
  {
    id: 'page-question-bank',
    name: '题库管理',
    description: '后台题库管理系统',
    category: 'page',
    enabled: true,
    params: {
      enableImport: { name: '启用导入', description: '是否启用批量导入功能', type: 'boolean', value: true, required: false },
      enableExport: { name: '启用导出', description: '是否启用批量导出功能', type: 'boolean', value: true, required: false },
      enableScreening: { name: '质量筛查', description: '是否启用质量筛查功能', type: 'boolean', value: true, required: false },
    },
    dependencies: ['feature-auth', 'feature-question-bank'],
    lastModified: Date.now(),
  },
  {
    id: 'page-image-bank',
    name: '图库管理',
    description: '图片资源管理系统',
    category: 'page',
    enabled: true,
    params: {
      enableUpload: { name: '启用上传', description: '是否启用图片上传', type: 'boolean', value: true, required: false },
      enableAPI: { name: '启用API', description: '是否启用外部图库API', type: 'boolean', value: true, required: false },
    },
    dependencies: ['feature-auth'],
    lastModified: Date.now(),
  },
  {
    id: 'page-monitor',
    name: '系统监控',
    description: '系统状态监控中心',
    category: 'page',
    enabled: true,
    params: {
      autoRefresh: { name: '自动刷新', description: '是否自动刷新数据', type: 'boolean', value: true, required: false },
      refreshInterval: { name: '刷新间隔', description: '自动刷新间隔（秒）', type: 'number', value: 5, required: false },
    },
    dependencies: ['feature-auth'],
    lastModified: Date.now(),
  },
  {
    id: 'feature-auth',
    name: '用户认证',
    description: '用户登录注册系统',
    category: 'feature',
    enabled: true,
    params: {
      enableRegister: { name: '启用注册', description: '是否允许用户注册', type: 'boolean', value: true, required: false },
      enableRememberMe: { name: '记住我', description: '是否启用记住密码', type: 'boolean', value: true, required: false },
      requireEmailVerify: { name: '邮箱验证', description: '是否要求邮箱验证', type: 'boolean', value: false, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'feature-assessment-engine',
    name: '测评引擎',
    description: 'AI智能测评核心引擎',
    category: 'feature',
    enabled: true,
    params: {
      enableIntelligentAllocation: { name: '智能出题', description: '是否启用智能题目分配', type: 'boolean', value: true, required: false },
      difficultyRange: { name: '难度范围', description: '题目难度范围', type: 'select', value: 'all', options: ['easy', 'medium', 'hard', 'expert', 'all'], required: false },
      maxQuestionCount: { name: '最大题目数', description: '单次测评最大题目数', type: 'number', value: 50, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'feature-plan-generator',
    name: '学习计划生成',
    description: '个性化学习计划生成器',
    category: 'feature',
    enabled: true,
    params: {
      enableAIRecommend: { name: 'AI推荐', description: '是否启用AI智能推荐', type: 'boolean', value: true, required: false },
      planDuration: { name: '计划时长', description: '默认学习计划时长（天）', type: 'number', value: 30, required: false },
    },
    dependencies: ['feature-assessment-engine'],
    lastModified: Date.now(),
  },
  {
    id: 'feature-question-bank',
    name: '题库系统',
    description: '题目数据库管理',
    category: 'feature',
    enabled: true,
    params: {
      enableDuplicateCheck: { name: '去重检查', description: '是否启用重复题目检测', type: 'boolean', value: true, required: false },
      duplicateThreshold: { name: '去重阈值', description: '相似度阈值（%）', type: 'number', value: 80, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'component-header',
    name: '顶部导航',
    description: '网站顶部导航栏',
    category: 'component',
    enabled: true,
    params: {
      showLogo: { name: '显示Logo', description: '是否显示Logo', type: 'boolean', value: true, required: false },
      showSearch: { name: '显示搜索', description: '是否显示搜索框', type: 'boolean', value: true, required: false },
      showUserMenu: { name: '显示用户菜单', description: '是否显示用户菜单', type: 'boolean', value: true, required: false },
      showMobileMenu: { name: '移动端菜单', description: '是否启用移动端菜单', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'component-footer',
    name: '页脚',
    description: '网站页脚',
    category: 'component',
    enabled: true,
    params: {
      showLinks: { name: '显示链接', description: '是否显示快捷链接', type: 'boolean', value: true, required: false },
      showCopyright: { name: '显示版权', description: '是否显示版权信息', type: 'boolean', value: true, required: false },
      showContact: { name: '显示联系方式', description: '是否显示联系信息', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'component-section-title',
    name: '章节标题',
    description: '页面章节标题组件',
    category: 'component',
    enabled: true,
    params: {
      defaultWheat: { name: '默认麦穗', description: '默认是否显示麦穗装饰', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'system-logging',
    name: '日志系统',
    description: '系统操作日志记录',
    category: 'system',
    enabled: true,
    params: {
      enableLogging: { name: '启用日志', description: '是否记录操作日志', type: 'boolean', value: true, required: false },
      logRetention: { name: '日志保留', description: '日志保留天数', type: 'number', value: 30, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
  {
    id: 'system-analytics',
    name: '数据分析',
    description: '用户行为数据分析',
    category: 'system',
    enabled: true,
    params: {
      enableTracking: { name: '启用追踪', description: '是否追踪用户行为', type: 'boolean', value: true, required: false },
      enableReporting: { name: '启用报表', description: '是否生成数据分析报表', type: 'boolean', value: true, required: false },
    },
    dependencies: [],
    lastModified: Date.now(),
  },
];

let features: FeatureConfig[] = [...defaultFeatures];
let logs: SystemLog[] = [];

export const getFeatures = (): FeatureConfig[] => features;

export const getFeature = (id: string): FeatureConfig | undefined => {
  return features.find(f => f.id === id);
};

export const updateFeature = (id: string, updates: Partial<FeatureConfig>, user?: string): boolean => {
  const index = features.findIndex(f => f.id === id);
  if (index === -1) return false;
  
  features[index] = {
    ...features[index],
    ...updates,
    lastModified: Date.now(),
    modifiedBy: user,
  };
  
  addLog('success', 'feature-manager', `功能配置更新: ${features[index].name}`, { featureId: id, updates });
  return true;
};

export const toggleFeature = (id: string, user?: string): boolean => {
  const feature = getFeature(id);
  if (!feature) return false;
  
  if (feature.dependencies.length > 0) {
    const missingDeps = feature.dependencies.filter(depId => {
      const dep = getFeature(depId);
      return !dep || !dep.enabled;
    });
    
    if (missingDeps.length > 0) {
      addLog('error', 'feature-manager', `启用失败: ${feature.name} 依赖的功能未启用`, { featureId: id, missingDeps });
      return false;
    }
  }
  
  return updateFeature(id, { enabled: !feature.enabled }, user);
};

export const updateFeatureParam = (featureId: string, paramKey: string, value: string | number | boolean, user?: string): boolean => {
  const feature = getFeature(featureId);
  if (!feature || !feature.params[paramKey]) return false;
  
  feature.params[paramKey].value = value;
  feature.lastModified = Date.now();
  feature.modifiedBy = user;
  
  addLog('info', 'feature-manager', `参数更新: ${feature.name} - ${feature.params[paramKey].name}`, { featureId, paramKey, value });
  return true;
};

export const addLog = (type: SystemLog['type'], module: string, message: string, details?: Record<string, any>, user?: string): void => {
  const log: SystemLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type,
    module,
    message,
    details,
    user,
  };
  
  logs.unshift(log);
  
  const retentionDays = getFeature('system-logging')?.params.logRetention.value as number || 30;
  const maxAge = retentionDays * 24 * 60 * 60 * 1000;
  logs = logs.filter(log => Date.now() - log.timestamp <= maxAge);
  
  if (logs.length > 1000) {
    logs = logs.slice(0, 1000);
  }
};

export const getLogs = (limit: number = 100, module?: string): SystemLog[] => {
  let filteredLogs = logs;
  if (module) {
    filteredLogs = filteredLogs.filter(log => log.module === module);
  }
  return filteredLogs.slice(0, limit);
};

export const clearLogs = (user?: string): void => {
  logs = [];
  addLog('info', 'feature-manager', '日志已清空', undefined, user);
};

export const getCategoryFeatures = (category: FeatureConfig['category']): FeatureConfig[] => {
  return features.filter(f => f.category === category);
};

export const getEnabledFeatures = (): FeatureConfig[] => {
  return features.filter(f => f.enabled);
};

export const isFeatureEnabled = (id: string): boolean => {
  const feature = getFeature(id);
  return feature?.enabled ?? false;
};

export const getFeatureParam = (featureId: string, paramKey: string): any => {
  const feature = getFeature(featureId);
  return feature?.params[paramKey]?.value;
};

addLog('info', 'system', '功能管理系统初始化完成', { totalFeatures: features.length });