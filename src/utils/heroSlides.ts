import { HeroSlide } from '../types/admin';

const STORAGE_KEY = 'xuekao_hero_slides';

const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    badgeText: '做有温度有结果的教育',
    titlePart1: '专注提分',
    titlePart2: '成就未来',
    subtitle: '汇聚名师资源，提供个性化学习方案，让每个学生都能找到适合自己的提分路径',
    features: ['高考全科', 'AI评测', '名师指导', '个性化'],
    ctaPrimary: '开始探索',
    ctaSecondary: '免费测评',
    gradient: 'from-blue-50 via-white to-violet-50/50',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    is_active: true,
    sort_order: 0,
    floatCard1_title: 'AI 智能测评',
    floatCard1_desc: '精准定位薄弱环节',
    floatCard1_icon: 'Brain',
    floatCard1_gradient: 'from-blue-500 to-violet-500',
    floatCard2_value: '+2,580',
    floatCard2_label: '本周新学员',
    floatCard3_value: '+86分',
    floatCard3_label: '平均提分',
    floatCard3_gradient: 'from-emerald-500 to-teal-500',
    floatCard4_value: '98%',
    floatCard4_label: '用户好评率',
    floatCard4_gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'slide-2',
    badgeText: 'AI驱动的智能学习平台',
    titlePart1: '智慧教育',
    titlePart2: '赋能成长',
    subtitle: '利用人工智能技术，为每位学生量身定制学习方案，实现高效学习',
    features: ['智能推荐', '数据分析', '错题本', '学习报告'],
    ctaPrimary: '立即体验',
    ctaSecondary: '了解更多',
    gradient: 'from-emerald-50 via-white to-teal-50/50',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    is_active: true,
    sort_order: 1,
    floatCard1_title: '智能题库',
    floatCard1_desc: '百万级精选题目',
    floatCard1_icon: 'BookOpen',
    floatCard1_gradient: 'from-emerald-500 to-teal-500',
    floatCard2_value: '+50万',
    floatCard2_label: '每日练习',
    floatCard3_value: '99%',
    floatCard3_label: '题目准确率',
    floatCard3_gradient: 'from-blue-500 to-violet-500',
    floatCard4_value: '24h',
    floatCard4_label: '学习支持',
    floatCard4_gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'slide-3',
    badgeText: '名师护航 梦想起航',
    titlePart1: '名师在线',
    titlePart2: '指点迷津',
    subtitle: '汇聚全国顶尖名师，一对一在线辅导，让学习更有针对性',
    features: ['名师直播', '在线答疑', '作业批改', '学习计划'],
    ctaPrimary: '预约名师',
    ctaSecondary: '查看师资',
    gradient: 'from-amber-50 via-white to-orange-50/50',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    is_active: true,
    sort_order: 2,
    floatCard1_title: '名师课堂',
    floatCard1_desc: '零距离互动教学',
    floatCard1_icon: 'Users',
    floatCard1_gradient: 'from-amber-500 to-orange-500',
    floatCard2_value: '500+',
    floatCard2_label: '认证名师',
    floatCard3_value: '10年+',
    floatCard3_label: '教学经验',
    floatCard3_gradient: 'from-violet-500 to-fuchsia-500',
    floatCard4_value: '98%',
    floatCard4_label: '辅导成功率',
    floatCard4_gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'slide-4',
    badgeText: '升学规划 一路相伴',
    titlePart1: '志愿填报',
    titlePart2: '精准指导',
    subtitle: '专业升学规划团队，为您提供一站式志愿填报指导服务',
    features: ['志愿评估', '院校推荐', '专业分析', '录取预测'],
    ctaPrimary: '预约咨询',
    ctaSecondary: '了解服务',
    gradient: 'from-violet-50 via-white to-fuchsia-50/50',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop',
    is_active: true,
    sort_order: 3,
    floatCard1_title: '志愿规划',
    floatCard1_desc: '智能匹配院校',
    floatCard1_icon: 'Target',
    floatCard1_gradient: 'from-violet-500 to-fuchsia-500',
    floatCard2_value: '10万+',
    floatCard2_label: '成功案例',
    floatCard3_value: '95%',
    floatCard3_label: '录取成功率',
    floatCard3_gradient: 'from-blue-500 to-cyan-500',
    floatCard4_value: '2000+',
    floatCard4_label: '合作院校',
    floatCard4_gradient: 'from-teal-500 to-emerald-500',
  },
];

let heroSlides: HeroSlide[] = [...defaultHeroSlides];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      heroSlides = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load hero slides from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(heroSlides));
  } catch (e) {
    console.error('Failed to save hero slides to storage:', e);
  }
};

loadFromStorage();

export const getHeroSlides = (): HeroSlide[] => {
  return [...heroSlides].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveHeroSlides = (): HeroSlide[] => {
  return getHeroSlides().filter(slide => slide.is_active);
};

export const getHeroSlide = (id: string): HeroSlide | undefined => {
  return heroSlides.find(slide => slide.id === id);
};

export const updateHeroSlide = (id: string, updates: Partial<HeroSlide>): boolean => {
  const index = heroSlides.findIndex(slide => slide.id === id);
  if (index === -1) return false;
  
  heroSlides[index] = {
    ...heroSlides[index],
    ...updates,
  };
  
  saveToStorage();
  return true;
};

export const createHeroSlide = (slide: Omit<HeroSlide, 'id'>): HeroSlide => {
  const newSlide: HeroSlide = {
    ...slide,
    id: `slide-${Date.now()}`,
  };
  
  heroSlides.push(newSlide);
  saveToStorage();
  return newSlide;
};

export const deleteHeroSlide = (id: string): boolean => {
  const index = heroSlides.findIndex(slide => slide.id === id);
  if (index === -1) return false;
  
  heroSlides.splice(index, 1);
  saveToStorage();
  return true;
};

export const resetHeroSlides = () => {
  heroSlides = [...defaultHeroSlides];
  saveToStorage();
};
