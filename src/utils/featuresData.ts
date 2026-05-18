import { Feature } from '../types/admin';

const STORAGE_KEY = 'xuekao_features';

const defaultFeatures: Feature[] = [
  {
    id: 'f1',
    icon: 'BookOpen',
    title: '课程中心',
    desc: '按科目/学段分类的优质课程，覆盖高考全科目（语数外物化生史地政），系统化学习路径',
    link: '#/courses',
    gradient: 'from-blue-500 to-cyan-500',
    highlight: '1000+精品课程',
    is_active: true,
    sort_order: 0,
  },
  {
    id: 'f2',
    icon: 'Brain',
    title: '知识评测',
    desc: 'AI智能测评，根据输入的最近考试成绩自动匹配难度，精准定位薄弱环节，生成个性化学习报告',
    link: '#/assessment',
    gradient: 'from-violet-500 to-purple-500',
    highlight: '智能难度匹配',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'f3',
    icon: 'Users',
    title: '名师辅导',
    desc: '专业名师一对一答疑解惑，针对性提升学习效率，疑难问题及时解决',
    link: '#/courses',
    gradient: 'from-orange-500 to-amber-500',
    highlight: '名师在线答疑',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'f4',
    icon: 'FileText',
    title: '免费资料',
    desc: '海量学习资料免费领取，真题试卷与学霸笔记，历年高考真题下载',
    link: '#/materials',
    gradient: 'from-emerald-500 to-teal-500',
    highlight: '免费领取',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'f5',
    icon: 'BarChart3',
    title: '学习报告',
    desc: '详细的学习数据分析报告，可视化展示学习进度和效果，及时调整学习策略',
    link: '#/profile',
    gradient: 'from-indigo-500 to-blue-500',
    highlight: '数据分析',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'f6',
    icon: 'Shield',
    title: '安全学习',
    desc: '纯净学习环境，无广告打扰，专为学生设计的学习平台',
    link: '#/about',
    gradient: 'from-slate-600 to-slate-800',
    highlight: '纯净学习环境',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'f7',
    icon: 'Compass',
    title: '升学规划',
    desc: '专业升学指导服务，志愿填报智能推荐，帮助学生科学规划未来',
    link: '#/planning',
    gradient: 'from-rose-500 to-pink-500',
    highlight: '智能志愿推荐',
    is_active: true,
    sort_order: 6,
  },
  {
    id: 'f8',
    icon: 'Lightbulb',
    title: '智能题库',
    desc: 'AI智能推荐练习题目，根据学习进度精准推送，高效提升薄弱环节',
    link: '#/question-bank',
    gradient: 'from-yellow-500 to-orange-500',
    highlight: '个性化推荐',
    is_active: true,
    sort_order: 7,
  },
];

let features: Feature[] = [...defaultFeatures];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      features = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load features from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
  } catch (e) {
    console.error('Failed to save features to storage:', e);
  }
};

loadFromStorage();

export const getFeatures = (): Feature[] => {
  return [...features].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveFeatures = (): Feature[] => {
  return getFeatures().filter(item => item.is_active);
};

export const updateFeature = (id: string, updates: Partial<Feature>): boolean => {
  const index = features.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  features[index] = {
    ...features[index],
    ...updates,
  };
  
  saveToStorage();
  return true;
};

export const createFeature = (item: Omit<Feature, 'id'>): Feature => {
  const newItem: Feature = {
    ...item,
    id: `f${Date.now()}`,
  };
  
  features.push(newItem);
  saveToStorage();
  return newItem;
};

export const deleteFeature = (id: string): boolean => {
  const index = features.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  features.splice(index, 1);
  saveToStorage();
  return true;
};

export const resetFeatures = () => {
  features = [...defaultFeatures];
  saveToStorage();
};
