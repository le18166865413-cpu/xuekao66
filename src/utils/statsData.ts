import { StatItem } from '../types/admin';

const STORAGE_KEY = 'xuekao_stats';

const defaultStats: StatItem[] = [
  { id: 'stat1', value: 50000, suffix: '+', label: '累计学员', icon: 'Users', gradient: 'from-blue-500 to-cyan-500', description: '来自全国各地的学生信赖选择', is_active: true, sort_order: 0 },
  { id: 'stat2', value: 1200, suffix: '+', label: '精品课程', icon: 'BookOpen', gradient: 'from-violet-500 to-purple-500', description: '覆盖全学科系统化课程体系', is_active: true, sort_order: 1 },
  { id: 'stat3', value: 96, suffix: '%', label: '提分通过率', icon: 'Target', gradient: 'from-orange-500 to-pink-500', description: '科学方法助力成绩显著提升', is_active: true, sort_order: 2 },
  { id: 'stat4', value: 98, suffix: '%', label: '学员好评率', icon: 'Heart', gradient: 'from-emerald-500 to-teal-500', description: '优质服务赢得广泛认可', is_active: true, sort_order: 3 },
];

let stats: StatItem[] = [...defaultStats];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      stats = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load stats from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to storage:', e);
  }
};

loadFromStorage();

export const getStats = (): StatItem[] => {
  return [...stats].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveStats = (): StatItem[] => {
  return getStats().filter(item => item.is_active);
};

export const updateStat = (id: string, updates: Partial<StatItem>): boolean => {
  const index = stats.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  stats[index] = {
    ...stats[index],
    ...updates,
  };
  
  saveToStorage();
  return true;
};

export const createStat = (item: Omit<StatItem, 'id'>): StatItem => {
  const newItem: StatItem = {
    ...item,
    id: `stat${Date.now()}`,
  };
  
  stats.push(newItem);
  saveToStorage();
  return newItem;
};

export const deleteStat = (id: string): boolean => {
  const index = stats.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  stats.splice(index, 1);
  saveToStorage();
  return true;
};

export const resetStats = () => {
  stats = [...defaultStats];
  saveToStorage();
};
