export interface DifficultyConfig {
  count: number;
  scoreRange: [number, number];
  percentage: number;
}

export interface AssessmentMode {
  id: string;
  name: string;
  subject: string;
  totalScore: number;
  timeLimit: number;
  difficulties: {
    easy: DifficultyConfig;
    medium: DifficultyConfig;
    hard: DifficultyConfig;
  };
}

export const SUBJECT_150_MODES: AssessmentMode[] = [
  {
    id: 'math_standard',
    name: '数学标准测试',
    subject: 'math',
    totalScore: 310,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 16, scoreRange: [4, 5], percentage: 0.23 },
      medium: { count: 16, scoreRange: [5, 10], percentage: 0.39 },
      hard: { count: 8, scoreRange: [10, 17], percentage: 0.38 },
    },
  },
  {
    id: 'chinese_standard',
    name: '语文标准测试',
    subject: 'chinese',
    totalScore: 300,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 18, scoreRange: [3, 4], percentage: 0.25 },
      medium: { count: 14, scoreRange: [4, 8], percentage: 0.4 },
      hard: { count: 6, scoreRange: [8, 15], percentage: 0.35 },
    },
  },
  {
    id: 'english_standard',
    name: '英语标准测试',
    subject: 'english',
    totalScore: 280,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 24, scoreRange: [1, 2], percentage: 0.3 },
      medium: { count: 16, scoreRange: [2, 4], percentage: 0.4 },
      hard: { count: 8, scoreRange: [4, 8], percentage: 0.3 },
    },
  },
];

export const SUBJECT_100_MODES: AssessmentMode[] = [
  {
    id: 'physics_standard',
    name: '物理标准测试',
    subject: 'physics',
    totalScore: 250,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 10, scoreRange: [4, 5], percentage: 0.25 },
      medium: { count: 10, scoreRange: [5, 10], percentage: 0.4 },
      hard: { count: 5, scoreRange: [10, 15], percentage: 0.35 },
    },
  },
  {
    id: 'chemistry_standard',
    name: '化学标准测试',
    subject: 'chemistry',
    totalScore: 280,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 16, scoreRange: [4, 6], percentage: 0.4 },
      medium: { count: 14, scoreRange: [6, 10], percentage: 0.5 },
      hard: { count: 4, scoreRange: [10, 15], percentage: 0.1 },
    },
  },
  {
    id: 'biology_standard',
    name: '生物标准测试',
    subject: 'biology',
    totalScore: 175,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 12, scoreRange: [3, 4], percentage: 0.3 },
      medium: { count: 10, scoreRange: [4, 5], percentage: 0.45 },
      hard: { count: 5, scoreRange: [5, 6], percentage: 0.25 },
    },
  },
];

export const PRACTICE_MODES: AssessmentMode[] = [
  {
    id: 'practice_easy',
    name: '基础练习',
    subject: 'all',
    totalScore: 150,
    timeLimit: 3600,
    difficulties: {
      easy: { count: 20, scoreRange: [3, 5], percentage: 0.6 },
      medium: { count: 8, scoreRange: [5, 8], percentage: 0.3 },
      hard: { count: 2, scoreRange: [8, 10], percentage: 0.1 },
    },
  },
  {
    id: 'practice_medium',
    name: '标准练习',
    subject: 'all',
    totalScore: 200,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 12, scoreRange: [3, 5], percentage: 0.3 },
      medium: { count: 12, scoreRange: [5, 10], percentage: 0.45 },
      hard: { count: 6, scoreRange: [10, 15], percentage: 0.25 },
    },
  },
  {
    id: 'practice_hard',
    name: '提升练习',
    subject: 'all',
    totalScore: 250,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 6, scoreRange: [4, 6], percentage: 0.15 },
      medium: { count: 12, scoreRange: [6, 12], percentage: 0.4 },
      hard: { count: 12, scoreRange: [12, 18], percentage: 0.45 },
    },
  },
];

export const FULL_ASSESSMENT_MODES: AssessmentMode[] = [
  {
    id: 'full_math',
    name: '数学完整测评',
    subject: 'math',
    totalScore: 310,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 16, scoreRange: [4, 5], percentage: 0.23 },
      medium: { count: 16, scoreRange: [5, 10], percentage: 0.39 },
      hard: { count: 8, scoreRange: [10, 17], percentage: 0.38 },
    },
  },
  {
    id: 'full_chinese',
    name: '语文完整测评',
    subject: 'chinese',
    totalScore: 300,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 18, scoreRange: [3, 4], percentage: 0.25 },
      medium: { count: 14, scoreRange: [4, 8], percentage: 0.4 },
      hard: { count: 6, scoreRange: [8, 15], percentage: 0.35 },
    },
  },
  {
    id: 'full_english',
    name: '英语完整测评',
    subject: 'english',
    totalScore: 280,
    timeLimit: 7200,
    difficulties: {
      easy: { count: 24, scoreRange: [1, 2], percentage: 0.3 },
      medium: { count: 16, scoreRange: [2, 4], percentage: 0.4 },
      hard: { count: 8, scoreRange: [4, 8], percentage: 0.3 },
    },
  },
  {
    id: 'full_physics',
    name: '物理完整测评',
    subject: 'physics',
    totalScore: 250,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 10, scoreRange: [4, 5], percentage: 0.25 },
      medium: { count: 10, scoreRange: [5, 10], percentage: 0.4 },
      hard: { count: 5, scoreRange: [10, 15], percentage: 0.35 },
    },
  },
  {
    id: 'full_chemistry',
    name: '化学完整测评',
    subject: 'chemistry',
    totalScore: 280,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 16, scoreRange: [4, 6], percentage: 0.4 },
      medium: { count: 14, scoreRange: [6, 10], percentage: 0.5 },
      hard: { count: 4, scoreRange: [10, 15], percentage: 0.1 },
    },
  },
  {
    id: 'full_biology',
    name: '生物完整测评',
    subject: 'biology',
    totalScore: 175,
    timeLimit: 5400,
    difficulties: {
      easy: { count: 12, scoreRange: [3, 4], percentage: 0.3 },
      medium: { count: 10, scoreRange: [4, 5], percentage: 0.45 },
      hard: { count: 5, scoreRange: [5, 6], percentage: 0.25 },
    },
  },
];

export const LEGACY_MODES: AssessmentMode[] = [
  {
    id: 'legacy_60',
    name: '60分模式',
    subject: 'all',
    totalScore: 55,
    timeLimit: 1800,
    difficulties: {
      easy: { count: 8, scoreRange: [3, 4], percentage: 0.5 },
      medium: { count: 5, scoreRange: [4, 6], percentage: 0.35 },
      hard: { count: 2, scoreRange: [6, 8], percentage: 0.15 },
    },
  },
  {
    id: 'legacy_90',
    name: '90分模式',
    subject: 'all',
    totalScore: 85,
    timeLimit: 2700,
    difficulties: {
      easy: { count: 10, scoreRange: [3, 5], percentage: 0.4 },
      medium: { count: 8, scoreRange: [5, 8], percentage: 0.4 },
      hard: { count: 3, scoreRange: [8, 12], percentage: 0.2 },
    },
  },
  {
    id: 'legacy_120',
    name: '120分模式',
    subject: 'all',
    totalScore: 115,
    timeLimit: 3600,
    difficulties: {
      easy: { count: 12, scoreRange: [4, 5], percentage: 0.35 },
      medium: { count: 10, scoreRange: [5, 10], percentage: 0.4 },
      hard: { count: 5, scoreRange: [10, 15], percentage: 0.25 },
    },
  },
];

export const getAllModes = (subject?: string): AssessmentMode[] => {
  const allModes = [
    ...SUBJECT_150_MODES,
    ...SUBJECT_100_MODES,
    ...FULL_ASSESSMENT_MODES,
  ];
  
  if (subject) {
    return allModes.filter(m => m.subject === subject);
  }
  
  return allModes;
};

export const getModeById = (modeId: string): AssessmentMode | undefined => {
  return getAllModes().find(m => m.id === modeId);
};

export const calculateDaysToGaokao = (): number => {
  const today = new Date();
  let gaokaoDate = new Date(today.getFullYear(), 5, 7);
  
  if (today > gaokaoDate) {
    gaokaoDate.setFullYear(gaokaoDate.getFullYear() + 1);
  }
  
  const diffTime = gaokaoDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(diffDays, 1);
};
