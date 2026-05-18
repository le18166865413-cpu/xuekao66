import { Achievement } from '../types/admin';

const STORAGE_KEY = 'xuekao_achievements';

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: '2024届学员再创辉煌',
    description: '一本上线率达到92%，其中36人被清北录取',
    date: '2024-07-15',
    location: '北京总部',
    image: 'https://picsum.photos/400/300',
    icon: 'trophy',
    category: '喜报',
    highlight: true,
    is_active: true,
    sort_order: 1,
  },
  {
    id: '2',
    title: '智能测评系统全面升级',
    description: 'AI驱动的个性化测评系统上线，提分效果提升40%',
    date: '2024-06-20',
    icon: 'award',
    category: '产品更新',
    highlight: true,
    is_active: true,
    sort_order: 2,
  },
  {
    id: '3',
    title: '与10所985高校达成合作',
    description: '建立优质生源基地，为学员提供更多升学机会',
    date: '2024-05-10',
    icon: 'target',
    category: '校企合作',
    highlight: false,
    is_active: true,
    sort_order: 3,
  },
];

let achievements: Achievement[] = [...defaultAchievements];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      achievements = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load achievements from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error('Failed to save achievements to storage:', e);
  }
};

loadFromStorage();

export const getAchievements = (): Achievement[] => {
  return [...achievements].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveAchievements = (): Achievement[] => {
  return getAchievements().filter(item => item.is_active);
};

export const updateAchievement = (id: string, updates: Partial<Achievement>): boolean => {
  const index = achievements.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  achievements[index] = {
    ...achievements[index],
    ...updates,
  };
  
  saveToStorage();
  return true;
};

export const createAchievement = (item: Omit<Achievement, 'id'>): Achievement => {
  const newItem: Achievement = {
    ...item,
    id: `achievement_${Date.now()}`,
  };
  
  achievements.push(newItem);
  saveToStorage();
  return newItem;
};

export const deleteAchievement = (id: string): boolean => {
  const index = achievements.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  achievements.splice(index, 1);
  saveToStorage();
  return true;
};

export const resetAchievements = () => {
  achievements = [...defaultAchievements];
  saveToStorage();
};
