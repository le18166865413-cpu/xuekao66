export interface TextStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: string;
  letterSpacing: string;
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image';
  color: string;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-br' | 'to-bl' | 'to-tl';
  imageUrl: string;
  imagePosition: string;
  imageRepeat: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  imageSize: 'cover' | 'contain' | 'auto';
}

export interface BorderConfig {
  style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  color: string;
  width: string;
  radius: string;
}

export interface SpacingConfig {
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
}

export interface ShadowConfig {
  enable: boolean;
  color: string;
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
}

export interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  category: string;
  students: number;
}

export interface TeacherItem {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  subject: string;
  experience: string;
  description: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  year: string;
  icon?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  moduleDescription: string;
  category: 'hero' | 'feature' | 'course' | 'teacher' | 'testimonial' | 'cta' | 'stats' | 'partner' | 'section';
  enabled: boolean;
  
  title: string;
  titleStyle: TextStyle;
  
  subtitle: string;
  subtitleStyle: TextStyle;
  
  description: string;
  descriptionStyle: TextStyle;
  
  background: BackgroundConfig;
  border: BorderConfig;
  spacing: SpacingConfig;
  shadow: ShadowConfig;
  
  customStyles: Record<string, string>;
  
  lastModified: number;
  modifiedBy?: string;
  
  courses?: CourseItem[];
  teachers?: TeacherItem[];
  milestones?: MilestoneItem[];
  stats?: StatItem[];
  features?: FeatureItem[];
  ctaButtonText?: string;
  ctaButtonLink?: string;
  partnerLogos?: string[];
}

export interface ConfigVersion {
  id: string;
  moduleId: string;
  timestamp: number;
  config: ModuleConfig;
  user?: string;
  reason?: string;
}

const defaultFontFamilies = [
  'PingFang SC, Microsoft YaHei, sans-serif',
  'Microsoft YaHei, PingFang SC, sans-serif',
  'Arial, Helvetica, sans-serif',
  'Georgia, serif',
  'Times New Roman, Times, serif',
  'Courier New, Courier, monospace',
  'Verdana, Geneva, sans-serif',
  'Tahoma, Geneva, sans-serif',
];

const defaultModules: ModuleConfig[] = [
  {
    id: 'hero-main',
    name: '首屏英雄区',
    moduleDescription: '网站首页首屏展示区域',
    category: 'hero',
    enabled: true,
    title: '学考合一',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: '1.2',
      letterSpacing: '2px',
    },
    subtitle: 'AI智能测评 · 个性化学习方案',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '20px',
      fontWeight: 'normal',
      color: '#e0e7ff',
      textAlign: 'center',
      lineHeight: '1.5',
      letterSpacing: '1px',
    },
    description: '基于人工智能的高考学习辅助平台，为每位学生定制专属学习路径',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#c7d2fe',
      textAlign: 'center',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'gradient',
      color: '#4f46e5',
      gradientStart: '#4f46e5',
      gradientEnd: '#7c3aed',
      gradientDirection: 'to-br',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#ffffff',
      width: '0',
      radius: '0',
    },
    spacing: {
      paddingTop: '120px',
      paddingRight: '20px',
      paddingBottom: '120px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.3)',
      offsetX: '0',
      offsetY: '10px',
      blur: '30px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-courses',
    name: '热门课程',
    moduleDescription: '首页热门课程展示模块',
    category: 'course',
    enabled: true,
    title: '热门课程',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: '精选优质课程',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'solid',
      color: '#ffffff',
      gradientStart: '#ffffff',
      gradientEnd: '#f3f4f6',
      gradientDirection: 'to-b',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#e5e7eb',
      width: '1px',
      radius: '0',
    },
    spacing: {
      paddingTop: '80px',
      paddingRight: '20px',
      paddingBottom: '80px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.1)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
    courses: [
      {
        id: 'course-1',
        title: '高考数学满分冲刺班',
        subtitle: '名师授课 · 系统提分',
        price: '¥2999',
        originalPrice: '¥3999',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mathematics%20education%20classroom%20with%20formulas%20on%20blackboard&image_size=landscape_4_3',
        category: '数学',
        students: 12580,
      },
      {
        id: 'course-2',
        title: '高考英语140+提分班',
        subtitle: '语法精讲 · 阅读突破',
        price: '¥2599',
        originalPrice: '¥3599',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20learning%20classroom%20with%20books&image_size=landscape_4_3',
        category: '英语',
        students: 9860,
      },
      {
        id: 'course-3',
        title: '高考物理模型解题法',
        subtitle: '举一反三 · 轻松解题',
        price: '¥2799',
        originalPrice: '¥3799',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=physics%20science%20education%20with%20formulas&image_size=landscape_4_3',
        category: '物理',
        students: 8450,
      },
      {
        id: 'course-4',
        title: '高中化学系统化学习',
        subtitle: '知识点全覆盖',
        price: '¥2399',
        originalPrice: '¥3399',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chemistry%20lab%20education%20with%20beakers&image_size=landscape_4_3',
        category: '化学',
        students: 7230,
      },
    ],
  },
  {
    id: 'section-features',
    name: '功能特性',
    moduleDescription: '首页功能特性展示模块',
    category: 'feature',
    enabled: true,
    title: '核心功能',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: 'AI驱动的学习体验',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'gradient',
      color: '#f9fafb',
      gradientStart: '#ffffff',
      gradientEnd: '#f3f4f6',
      gradientDirection: 'to-b',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#e5e7eb',
      width: '1px',
      radius: '0',
    },
    spacing: {
      paddingTop: '80px',
      paddingRight: '20px',
      paddingBottom: '80px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.1)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-features',
    name: '功能特性',
    moduleDescription: '首页功能特性展示模块',
    category: 'feature',
    enabled: true,
    title: '核心功能',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: 'AI驱动的学习体验',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'gradient',
      color: '#f9fafb',
      gradientStart: '#ffffff',
      gradientEnd: '#f3f4f6',
      gradientDirection: 'to-b',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#e5e7eb',
      width: '1px',
      radius: '0',
    },
    spacing: {
      paddingTop: '80px',
      paddingRight: '20px',
      paddingBottom: '80px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.1)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-teachers',
    name: '讲师团队',
    moduleDescription: '首页讲师展示模块',
    category: 'teacher',
    enabled: true,
    title: '名师团队',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: '资深教育专家',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'solid',
      color: '#ffffff',
      gradientStart: '#ffffff',
      gradientEnd: '#ffffff',
      gradientDirection: 'to-b',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#e5e7eb',
      width: '1px',
      radius: '0',
    },
    spacing: {
      paddingTop: '80px',
      paddingRight: '20px',
      paddingBottom: '80px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.1)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-stats',
    name: '数据统计',
    moduleDescription: '首页数据统计展示模块',
    category: 'stats',
    enabled: true,
    title: '平台数据',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: '值得信赖的学习平台',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#e0e7ff',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#c7d2fe',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'gradient',
      color: '#4f46e5',
      gradientStart: '#4f46e5',
      gradientEnd: '#7c3aed',
      gradientDirection: 'to-r',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#ffffff',
      width: '0',
      radius: '0',
    },
    spacing: {
      paddingTop: '80px',
      paddingRight: '20px',
      paddingBottom: '80px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.2)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-cta',
    name: '行动号召',
    moduleDescription: '首页CTA行动号召模块',
    category: 'cta',
    enabled: true,
    title: '开始你的学习之旅',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: '立即注册，开启个性化学习体验',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'gradient',
      color: '#fef3c7',
      gradientStart: '#fef3c7',
      gradientEnd: '#fde68a',
      gradientDirection: 'to-br',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#fbbf24',
      width: '2px',
      radius: '12px',
    },
    spacing: {
      paddingTop: '60px',
      paddingRight: '20px',
      paddingBottom: '60px',
      paddingLeft: '20px',
      marginTop: '80px',
      marginRight: '20px',
      marginBottom: '80px',
      marginLeft: '20px',
    },
    shadow: {
      enable: true,
      color: 'rgba(251, 191, 36, 0.3)',
      offsetX: '0',
      offsetY: '8px',
      blur: '20px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
  {
    id: 'section-partners',
    name: '合作伙伴',
    moduleDescription: '首页合作伙伴展示模块',
    category: 'partner',
    enabled: true,
    title: '合作伙伴',
    titleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    subtitle: '携手共进，共创未来',
    subtitleStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'medium',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    description: '',
    descriptionStyle: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#6b7280',
      textAlign: 'left',
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    background: {
      type: 'solid',
      color: '#f9fafb',
      gradientStart: '#f9fafb',
      gradientEnd: '#f3f4f6',
      gradientDirection: 'to-b',
      imageUrl: '',
      imagePosition: 'center',
      imageRepeat: 'no-repeat',
      imageSize: 'cover',
    },
    border: {
      style: 'none',
      color: '#e5e7eb',
      width: '1px',
      radius: '0',
    },
    spacing: {
      paddingTop: '60px',
      paddingRight: '20px',
      paddingBottom: '60px',
      paddingLeft: '20px',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    },
    shadow: {
      enable: false,
      color: 'rgba(0,0,0,0.1)',
      offsetX: '0',
      offsetY: '4px',
      blur: '10px',
      spread: '0',
    },
    customStyles: {},
    lastModified: Date.now(),
  },
];

const STORAGE_KEY = 'xuekao_module_configs';
const VERSION_STORAGE_KEY = 'xuekao_config_versions';

let modules: ModuleConfig[] = [...defaultModules];
let versions: ConfigVersion[] = [];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      modules = JSON.parse(stored);
    }
    const storedVersions = localStorage.getItem(VERSION_STORAGE_KEY);
    if (storedVersions) {
      versions = JSON.parse(storedVersions);
    }
  } catch (e) {
    console.error('Failed to load config from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(versions));
  } catch (e) {
    console.error('Failed to save config to storage:', e);
  }
};

loadFromStorage();

export const getModules = (): ModuleConfig[] => modules;

export const getModule = (id: string): ModuleConfig | undefined => {
  return modules.find(m => m.id === id);
};

export const updateModule = (id: string, updates: Partial<ModuleConfig>, user?: string, reason?: string): boolean => {
  const index = modules.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  const oldConfig = { ...modules[index] };
  
  modules[index] = {
    ...modules[index],
    ...updates,
    lastModified: Date.now(),
    modifiedBy: user,
  };
  
  const version: ConfigVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    moduleId: id,
    timestamp: Date.now(),
    config: oldConfig,
    user,
    reason,
  };
  
  versions.unshift(version);
  
  if (versions.length > 100) {
    versions = versions.slice(0, 100);
  }
  
  saveToStorage();
  return true;
};

export const updateModuleStyle = (
  moduleId: string,
  styleType: 'titleStyle' | 'subtitleStyle' | 'descriptionStyle',
  updates: Partial<TextStyle>,
  user?: string
): boolean => {
  const module = getModule(moduleId);
  if (!module) return false;
  
  const oldConfig = { ...module };
  
  (module[styleType] as TextStyle) = {
    ...module[styleType],
    ...updates,
  };
  
  module.lastModified = Date.now();
  module.modifiedBy = user;
  
  const version: ConfigVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    moduleId,
    timestamp: Date.now(),
    config: oldConfig,
    user,
    reason: `更新${styleType}样式`,
  };
  
  versions.unshift(version);
  
  if (versions.length > 100) {
    versions = versions.slice(0, 100);
  }
  
  saveToStorage();
  return true;
};

export const toggleModule = (id: string, user?: string): boolean => {
  const module = getModule(id);
  if (!module) return false;
  
  return updateModule(id, { enabled: !module.enabled }, user, module.enabled ? '禁用模块' : '启用模块');
};

export const getVersions = (moduleId?: string, limit: number = 20): ConfigVersion[] => {
  let filtered = versions;
  if (moduleId) {
    filtered = filtered.filter(v => v.moduleId === moduleId);
  }
  return filtered.slice(0, limit);
};

export const rollbackToVersion = (versionId: string, user?: string): boolean => {
  const version = versions.find(v => v.id === versionId);
  if (!version) return false;
  
  const currentConfig = getModule(version.moduleId);
  if (!currentConfig) return false;
  
  const oldConfig = { ...currentConfig };
  
  const index = modules.findIndex(m => m.id === version.moduleId);
  if (index === -1) return false;
  
  modules[index] = {
    ...version.config,
    lastModified: Date.now(),
    modifiedBy: user,
  };
  
  const newVersion: ConfigVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    moduleId: version.moduleId,
    timestamp: Date.now(),
    config: oldConfig,
    user,
    reason: `回滚到版本 ${version.id}`,
  };
  
  versions.unshift(newVersion);
  
  saveToStorage();
  return true;
};

export const getCategoryModules = (category: ModuleConfig['category']): ModuleConfig[] => {
  return modules.filter(m => m.category === category);
};

export const getEnabledModules = (): ModuleConfig[] => {
  return modules.filter(m => m.enabled);
};

export const isModuleEnabled = (id: string): boolean => {
  const module = getModule(id);
  return module?.enabled ?? false;
};

export const getModuleConfig = (id: string): ModuleConfig | undefined => {
  return modules.find(m => m.id === id);
};

export const getDefaultFontFamilies = (): string[] => defaultFontFamilies;

export const generateStyleObject = (config: ModuleConfig): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  if (config.background.type === 'solid') {
    styles.backgroundColor = config.background.color;
  } else if (config.background.type === 'gradient') {
    const directionMap: Record<string, string> = {
      'to-r': 'to right',
      'to-l': 'to left',
      'to-t': 'to top',
      'to-b': 'to bottom',
      'to-tr': 'to top right',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
      'to-tl': 'to top left',
    };
    styles.background = `linear-gradient(${directionMap[config.background.gradientDirection]}, ${config.background.gradientStart}, ${config.background.gradientEnd})`;
  } else if (config.background.type === 'image' && config.background.imageUrl) {
    styles.backgroundImage = `url(${config.background.imageUrl})`;
    styles.backgroundPosition = config.background.imagePosition;
    styles.backgroundRepeat = config.background.imageRepeat;
    styles.backgroundSize = config.background.imageSize;
  }
  
  if (config.border.style !== 'none') {
    styles.border = `${config.border.width} ${config.border.style} ${config.border.color}`;
  }
  styles.borderRadius = config.border.radius;
  
  styles.padding = `${config.spacing.paddingTop} ${config.spacing.paddingRight} ${config.spacing.paddingBottom} ${config.spacing.paddingLeft}`;
  styles.margin = `${config.spacing.marginTop} ${config.spacing.marginRight} ${config.spacing.marginBottom} ${config.spacing.marginLeft}`;
  
  if (config.shadow.enable) {
    styles.boxShadow = `${config.shadow.offsetX} ${config.shadow.offsetY} ${config.shadow.blur} ${config.shadow.spread} ${config.shadow.color}`;
  }
  
  return styles;
};

export const generateTextStyleObject = (style: TextStyle): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  styles.fontFamily = style.fontFamily;
  styles.fontSize = style.fontSize;
  styles.fontWeight = style.fontWeight;
  styles.color = style.color;
  styles.textAlign = style.textAlign;
  styles.lineHeight = style.lineHeight;
  styles.letterSpacing = style.letterSpacing;
  
  return styles;
};

export const generateStyleString = (config: ModuleConfig): string => {
  const styles: string[] = [];
  
  if (config.background.type === 'solid') {
    styles.push(`background-color: ${config.background.color}`);
  } else if (config.background.type === 'gradient') {
    const directionMap: Record<string, string> = {
      'to-r': 'to right',
      'to-l': 'to left',
      'to-t': 'to top',
      'to-b': 'to bottom',
      'to-tr': 'to top right',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
      'to-tl': 'to top left',
    };
    styles.push(`background: linear-gradient(${directionMap[config.background.gradientDirection]}, ${config.background.gradientStart}, ${config.background.gradientEnd})`);
  } else if (config.background.type === 'image' && config.background.imageUrl) {
    styles.push(`background-image: url(${config.background.imageUrl})`);
    styles.push(`background-position: ${config.background.imagePosition}`);
    styles.push(`background-repeat: ${config.background.imageRepeat}`);
    styles.push(`background-size: ${config.background.imageSize}`);
  }
  
  if (config.border.style !== 'none') {
    styles.push(`border: ${config.border.width} ${config.border.style} ${config.border.color}`);
  }
  styles.push(`border-radius: ${config.border.radius}`);
  
  styles.push(`padding: ${config.spacing.paddingTop} ${config.spacing.paddingRight} ${config.spacing.paddingBottom} ${config.spacing.paddingLeft}`);
  styles.push(`margin: ${config.spacing.marginTop} ${config.spacing.marginRight} ${config.spacing.marginBottom} ${config.spacing.marginLeft}`);
  
  if (config.shadow.enable) {
    styles.push(`box-shadow: ${config.shadow.offsetX} ${config.shadow.offsetY} ${config.shadow.blur} ${config.shadow.spread} ${config.shadow.color}`);
  }
  
  return styles.join('; ');
};

export const generateTextStyleString = (style: TextStyle): string => {
  const styles: string[] = [];
  
  styles.push(`font-family: ${style.fontFamily}`);
  styles.push(`font-size: ${style.fontSize}`);
  styles.push(`font-weight: ${style.fontWeight}`);
  styles.push(`color: ${style.color}`);
  styles.push(`text-align: ${style.textAlign}`);
  styles.push(`line-height: ${style.lineHeight}`);
  styles.push(`letter-spacing: ${style.letterSpacing}`);
  
  return styles.join('; ');
};