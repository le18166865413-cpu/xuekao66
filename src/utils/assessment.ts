export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  chapter: string;
  category: string;
  score: number;
  explanation: string;
  knowledgePoint: string;
}

export interface Assessment {
  id: string;
  subject: string;
  userId: string;
  answers: { questionId: number; answer: number }[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: number;
  results: {
    questionId: number;
    question: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
    score: number;
  }[];
  chapterAnalysis: {
    [chapter: string]: { total: number; correct: number; score: number };
  };
}

export interface UserProfile {
  age: number;
  region: string;
  school: string;
  scores: { subject: string; score: number; date: string }[];
}

export const subjects = [
  { id: 'math', name: '数学', icon: '📐', description: '函数、数列、几何、概率等高考核心知识点', gradient: 'from-blue-500 to-cyan-500', lightBg: 'from-blue-50 to-cyan-50' },
  { id: 'chinese', name: '语文', icon: '📚', description: '文学常识、阅读理解、语言运用、写作', gradient: 'from-rose-500 to-pink-500', lightBg: 'from-rose-50 to-pink-50' },
  { id: 'english', name: '英语', icon: '🔤', description: '语法、词汇、阅读理解、完形填空、写作', gradient: 'from-emerald-500 to-teal-500', lightBg: 'from-emerald-50 to-teal-50' },
  { id: 'physics', name: '物理', icon: '⚡', description: '力学、电磁学、光学、热学、近代物理', gradient: 'from-violet-500 to-purple-500', lightBg: 'from-violet-50 to-purple-50' },
  { id: 'chemistry', name: '化学', icon: '⚗️', description: '有机化学、无机化学、化学反应原理、实验', gradient: 'from-orange-500 to-amber-500', lightBg: 'from-orange-50 to-amber-50' },
  { id: 'biology', name: '生物', icon: '🧬', description: '细胞、遗传、代谢、生态系统', gradient: 'from-green-500 to-emerald-500', lightBg: 'from-green-50 to-emerald-50' },
  { id: 'history', name: '历史', icon: '📜', description: '中国古代史、近代史、世界史', gradient: 'from-amber-500 to-yellow-500', lightBg: 'from-amber-50 to-yellow-50' },
  { id: 'geography', name: '地理', icon: '🌍', description: '自然地理、人文地理、区域地理', gradient: 'from-indigo-500 to-blue-500', lightBg: 'from-indigo-50 to-blue-50' },
  { id: 'politics', name: '政治', icon: '📖', description: '经济生活、政治生活、文化生活、哲学', gradient: 'from-red-500 to-rose-500', lightBg: 'from-red-50 to-rose-50' },
];

export const difficultyLevels = [
  { id: 'easy', name: '基础题', description: '考查基本概念和简单应用', scoreRange: [0, 60] },
  { id: 'medium', name: '中档题', description: '考查综合运用和分析能力', scoreRange: [60, 80] },
  { id: 'hard', name: '提高题', description: '考查复杂问题解决和创新思维', scoreRange: [80, 95] },
  { id: 'expert', name: '压轴题', description: '高考压轴难度，区分顶尖学生', scoreRange: [95, 100] },
];

export const calculateScore = (questions: Question[], answers: { questionId: number; answer: number }[]) => {
  let correctAnswers = 0;
  const results = [];
  const chapterAnalysis: { [chapter: string]: { total: number; correct: number; score: number } } = {};

  questions.forEach((question) => {
    const userAnswer = answers.find((a) => a.questionId === question.id);
    const isCorrect = userAnswer?.answer === question.correctAnswer;

    if (!chapterAnalysis[question.chapter]) {
      chapterAnalysis[question.chapter] = { total: 0, correct: 0, score: 0 };
    }
    chapterAnalysis[question.chapter].total++;
    if (isCorrect) {
      chapterAnalysis[question.chapter].correct++;
      correctAnswers++;
    }
    chapterAnalysis[question.chapter].score = Math.round(
      (chapterAnalysis[question.chapter].correct / chapterAnalysis[question.chapter].total) * 100
    );

    results.push({
      questionId: question.id,
      question: question.question,
      userAnswer: userAnswer?.answer ?? -1,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation,
      score: question.score,
    });
  });

  const score = Math.round((correctAnswers / questions.length) * 100);

  return {
    score,
    correctAnswers,
    totalQuestions: questions.length,
    results,
    chapterAnalysis,
  };
};

const ASSESSMENTS_KEY = 'xuekao_assessments';
const PROFILE_KEY = 'xuekao_profile';

export const saveAssessment = (assessment: Assessment): void => {
  const assessments = getAssessments();
  assessments.push(assessment);
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
};

export const getAssessments = (userId?: string): Assessment[] => {
  const data = localStorage.getItem(ASSESSMENTS_KEY);
  const assessments: Assessment[] = data ? JSON.parse(data) : [];
  if (userId) {
    return assessments.filter(a => a.userId === userId);
  }
  return assessments;
};

export const getAssessmentById = (id: string): Assessment | null => {
  const assessments = getAssessments();
  return assessments.find((a) => a.id === id) || null;
};

export const deleteAssessment = (id: string): void => {
  const assessments = getAssessments().filter((a) => a.id !== id);
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearAllData = (): void => {
  localStorage.removeItem(ASSESSMENTS_KEY);
  localStorage.removeItem(PROFILE_KEY);
};

export const getSubjectColor = (subjectId: string): string => {
  const colorMap: Record<string, string> = {
    math: 'from-blue-500 to-cyan-500',
    chinese: 'from-red-500 to-pink-500',
    english: 'from-green-500 to-emerald-500',
    physics: 'from-purple-500 to-violet-500',
    chemistry: 'from-orange-500 to-amber-500',
    biology: 'from-teal-500 to-cyan-500',
    history: 'from-indigo-500 to-purple-500',
    geography: 'from-lime-500 to-green-500',
    politics: 'from-rose-500 to-red-500',
  };
  return colorMap[subjectId] || 'from-gray-500 to-gray-600';
};

export const getSubjectGradient = (subjectId: string): string => {
  return `bg-gradient-to-br ${getSubjectColor(subjectId)}`;
};