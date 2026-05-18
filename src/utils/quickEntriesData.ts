import { QuickEntry } from '../types/admin';

const STORAGE_KEY = 'xuekao_quick_entries';

const defaultQuickEntries: QuickEntry[] = [
  {
    id: 'quick-1',
    title: '课程中心',
    icon: 'book',
    link: '/courses',
    description: '探索精品课程',
    is_active: true,
    sort_order: 0,
  },
  {
    id: 'quick-2',
    title: '智能测评',
    icon: 'lightbulb',
    link: '/assessment',
    description: 'AI学习诊断',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'quick-3',
    title: '升学规划',
    icon: 'compass',
    link: '/planning',
    description: '专业与院校探索',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'quick-4',
    title: '资料下载',
    icon: 'book',
    link: '/materials',
    description: '海量复习资料',
    is_active: true,
    sort_order: 3,
  },
];

let quickEntries: QuickEntry[] = [...defaultQuickEntries];

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      quickEntries = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load quick entries from storage:', e);
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quickEntries));
  } catch (e) {
    console.error('Failed to save quick entries to storage:', e);
  }
};

loadFromStorage();

export const getQuickEntries = (): QuickEntry[] => {
  return [...quickEntries].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveQuickEntries = (): QuickEntry[] => {
  return getQuickEntries().filter(entry => entry.is_active);
};

export const getQuickEntry = (id: string): QuickEntry | undefined => {
  return quickEntries.find(entry => entry.id === id);
};

export const updateQuickEntry = (id: string, updates: Partial<QuickEntry>): boolean => {
  const index = quickEntries.findIndex(entry => entry.id === id);
  if (index === -1) return false;
  
  quickEntries[index] = {
    ...quickEntries[index],
    ...updates,
  };
  
  saveToStorage();
  return true;
};

export const createQuickEntry = (entry: Omit<QuickEntry, 'id'>): QuickEntry => {
  const newEntry: QuickEntry = {
    ...entry,
    id: `quick-${Date.now()}`,
  };
  
  quickEntries.push(newEntry);
  saveToStorage();
  return newEntry;
};

export const deleteQuickEntry = (id: string): boolean => {
  const index = quickEntries.findIndex(entry => entry.id === id);
  if (index === -1) return false;
  
  quickEntries.splice(index, 1);
  saveToStorage();
  return true;
};

export const resetQuickEntries = () => {
  quickEntries = [...defaultQuickEntries];
  saveToStorage();
};
