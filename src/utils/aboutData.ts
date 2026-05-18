import { CompanyInfo, Milestone, TeamMember, Value } from '../types/admin';

const STORAGE_KEY_COMPANY = 'xuekao_company_info';
const STORAGE_KEY_MILESTONES = 'xuekao_milestones';
const STORAGE_KEY_TEAM = 'xuekao_team';
const STORAGE_KEY_VALUES = 'xuekao_values';

const defaultCompanyInfo: CompanyInfo = {
  id: 'company-1',
  hero_title: '关于学考合一',
  hero_subtitle: '专注教育提分，汇聚名师资源，为每一位学生提供个性化的学习方案',
  about_title: '公司简介',
  about_desc1: '学考合一教育科技有限公司成立于2018年，是一家专注于K12在线教育的科技企业。我们依托AI技术和优质师资，为学生提供个性化学习方案。',
  about_desc2: '我们的使命是让每一个学生都能找到适合自己的学习路径，通过科技赋能教育，帮助超过50万学生实现成绩提升，实现自己的学业梦想。',
  about_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  phone: '400-888-9999',
  email: 'contact@xuekao.com',
  address: '北京市海淀区中关村大街1号',
};

const defaultMilestones: Milestone[] = [
  { id: 'milestone-1', year: '2018', title: '公司成立', desc: '学考合一教育科技正式成立', icon: '🎯', gradient: 'from-blue-500 to-cyan-500', is_active: true, sort_order: 0 },
  { id: 'milestone-2', year: '2019', title: '平台上线', desc: '在线教育平台正式发布', icon: '🚀', gradient: 'from-violet-500 to-purple-500', is_active: true, sort_order: 1 },
  { id: 'milestone-3', year: '2020', title: 'AI测评', desc: '智能测评系统上线', icon: '🤖', gradient: 'from-emerald-500 to-teal-500', is_active: true, sort_order: 2 },
  { id: 'milestone-4', year: '2021', title: '百万学员', desc: '累计服务学员突破百万', icon: '👥', gradient: 'from-amber-500 to-orange-500', is_active: true, sort_order: 3 },
  { id: 'milestone-5', year: '2023', title: '行业领先', desc: '成为行业头部教育品牌', icon: '🏆', gradient: 'from-rose-500 to-red-500', is_active: true, sort_order: 4 },
];

const defaultTeam: TeamMember[] = [
  { id: 'team-1', name: '陈明远', role: '创始人CEO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', bio: '前新东方名师，深耕教育行业15年', gradient: 'from-blue-500 to-cyan-500', is_active: true, sort_order: 0 },
  { id: 'team-2', name: '林雅婷', role: '教学总监', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', bio: '北师大教育学博士，专注K12教学研究', gradient: 'from-violet-500 to-purple-500', is_active: true, sort_order: 1 },
  { id: 'team-3', name: '王志强', role: '技术总监', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', bio: '前阿里技术专家，10年技术研发经验', gradient: 'from-emerald-500 to-teal-500', is_active: true, sort_order: 2 },
];

const defaultValues: Value[] = [
  { id: 'value-1', icon: 'Heart', title: '用心教育', desc: '以学生成长为核心，用心做好每一堂课', gradient: 'from-rose-500 to-red-500', is_active: true, sort_order: 0 },
  { id: 'value-2', icon: 'Star', title: '追求卓越', desc: '不断提升教学质量，追求行业领先', gradient: 'from-amber-500 to-orange-500', is_active: true, sort_order: 1 },
  { id: 'value-3', icon: 'BookOpen', title: '终身学习', desc: '鼓励学生和教师共同成长进步', gradient: 'from-emerald-500 to-teal-500', is_active: true, sort_order: 2 },
  { id: 'value-4', icon: 'Users', title: '合作共赢', desc: '携手家长、教师，共同助力学生成长', gradient: 'from-blue-500 to-cyan-500', is_active: true, sort_order: 3 },
];

let companyInfo: CompanyInfo = { ...defaultCompanyInfo };
let milestones: Milestone[] = [...defaultMilestones];
let team: TeamMember[] = [...defaultTeam];
let values: Value[] = [...defaultValues];

const loadFromStorage = () => {
  try {
    const storedCompany = localStorage.getItem(STORAGE_KEY_COMPANY);
    const storedMilestones = localStorage.getItem(STORAGE_KEY_MILESTONES);
    const storedTeam = localStorage.getItem(STORAGE_KEY_TEAM);
    const storedValues = localStorage.getItem(STORAGE_KEY_VALUES);
    
    if (storedCompany) companyInfo = JSON.parse(storedCompany);
    if (storedMilestones) milestones = JSON.parse(storedMilestones);
    if (storedTeam) team = JSON.parse(storedTeam);
    if (storedValues) values = JSON.parse(storedValues);
  } catch (e) {
    console.error('Failed to load about data from storage:', e);
  }
};

const saveCompanyInfo = () => {
  try {
    localStorage.setItem(STORAGE_KEY_COMPANY, JSON.stringify(companyInfo));
  } catch (e) {
    console.error('Failed to save company info:', e);
  }
};

const saveMilestones = () => {
  try {
    localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(milestones));
  } catch (e) {
    console.error('Failed to save milestones:', e);
  }
};

const saveTeam = () => {
  try {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(team));
  } catch (e) {
    console.error('Failed to save team:', e);
  }
};

const saveValues = () => {
  try {
    localStorage.setItem(STORAGE_KEY_VALUES, JSON.stringify(values));
  } catch (e) {
    console.error('Failed to save values:', e);
  }
};

loadFromStorage();

// Company Info
export const getCompanyInfo = (): CompanyInfo => {
  return { ...companyInfo };
};

export const updateCompanyInfo = (updates: Partial<CompanyInfo>): boolean => {
  companyInfo = { ...companyInfo, ...updates };
  saveCompanyInfo();
  return true;
};

export const resetCompanyInfo = () => {
  companyInfo = { ...defaultCompanyInfo };
  saveCompanyInfo();
};

// Milestones
export const getMilestones = (): Milestone[] => {
  return [...milestones].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveMilestones = (): Milestone[] => {
  return getMilestones().filter(m => m.is_active);
};

export const getMilestone = (id: string): Milestone | undefined => {
  return milestones.find(m => m.id === id);
};

export const updateMilestone = (id: string, updates: Partial<Milestone>): boolean => {
  const index = milestones.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  milestones[index] = { ...milestones[index], ...updates };
  saveMilestones();
  return true;
};

export const createMilestone = (milestone: Omit<Milestone, 'id'>): Milestone => {
  const newMilestone: Milestone = {
    ...milestone,
    id: `milestone-${Date.now()}`,
  };
  
  milestones.push(newMilestone);
  saveMilestones();
  return newMilestone;
};

export const deleteMilestone = (id: string): boolean => {
  const index = milestones.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  milestones.splice(index, 1);
  saveMilestones();
  return true;
};

export const resetMilestones = () => {
  milestones = [...defaultMilestones];
  saveMilestones();
};

// Team
export const getTeam = (): TeamMember[] => {
  return [...team].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveTeam = (): TeamMember[] => {
  return getTeam().filter(m => m.is_active);
};

export const getTeamMember = (id: string): TeamMember | undefined => {
  return team.find(m => m.id === id);
};

export const updateTeamMember = (id: string, updates: Partial<TeamMember>): boolean => {
  const index = team.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  team[index] = { ...team[index], ...updates };
  saveTeam();
  return true;
};

export const createTeamMember = (member: Omit<TeamMember, 'id'>): TeamMember => {
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now()}`,
  };
  
  team.push(newMember);
  saveTeam();
  return newMember;
};

export const deleteTeamMember = (id: string): boolean => {
  const index = team.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  team.splice(index, 1);
  saveTeam();
  return true;
};

export const resetTeam = () => {
  team = [...defaultTeam];
  saveTeam();
};

// Values
export const getValues = (): Value[] => {
  return [...values].sort((a, b) => a.sort_order - b.sort_order);
};

export const getActiveValues = (): Value[] => {
  return getValues().filter(v => v.is_active);
};

export const getValue = (id: string): Value | undefined => {
  return values.find(v => v.id === id);
};

export const updateValue = (id: string, updates: Partial<Value>): boolean => {
  const index = values.findIndex(v => v.id === id);
  if (index === -1) return false;
  
  values[index] = { ...values[index], ...updates };
  saveValues();
  return true;
};

export const createValue = (value: Omit<Value, 'id'>): Value => {
  const newValue: Value = {
    ...value,
    id: `value-${Date.now()}`,
  };
  
  values.push(newValue);
  saveValues();
  return newValue;
};

export const deleteValue = (id: string): boolean => {
  const index = values.findIndex(v => v.id === id);
  if (index === -1) return false;
  
  values.splice(index, 1);
  saveValues();
  return true;
};

export const resetValues = () => {
  values = [...defaultValues];
  saveValues();
};

export const resetAllAbout = () => {
  resetCompanyInfo();
  resetMilestones();
  resetTeam();
  resetValues();
};
