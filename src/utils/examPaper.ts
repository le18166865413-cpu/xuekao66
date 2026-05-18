import type { ExamPaper, ExamPaperAnalysis, QuestionItem } from '../types/admin';

const EXAM_PAPERS_KEY = 'xuekao_exam_papers';
const EXAM_ANALYSES_KEY = 'xuekao_exam_analyses';

// 知识点数据
const knowledgePointsData: Record<string, string[]> = {
  math: ['函数', '数列', '几何', '概率', '不等式', '三角函数', '导数', '立体几何'],
  chinese: ['文学常识', '阅读理解', '语言运用', '写作'],
  english: ['语法', '词汇', '阅读理解', '完形填空', '写作'],
  physics: ['力学', '电磁学', '光学', '热学', '近代物理'],
  chemistry: ['有机化学', '无机化学', '化学反应原理', '实验'],
  biology: ['细胞', '遗传', '代谢', '生态系统'],
  history: ['中国古代史', '近代史', '世界史'],
  geography: ['自然地理', '人文地理', '区域地理'],
  politics: ['经济生活', '政治生活', '文化生活', '哲学']
};

// 章节数据
const chaptersData: Record<string, string[]> = {
  math: ['第一章', '第二章', '第三章', '第四章', '第五章'],
  chinese: ['第一单元', '第二单元', '第三单元', '第四单元'],
  english: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4'],
  physics: ['第一章', '第二章', '第三章', '第四章'],
  chemistry: ['第一章', '第二章', '第三章', '第四章'],
  biology: ['第一章', '第二章', '第三章', '第四章'],
  history: ['第一单元', '第二单元', '第三单元', '第四单元'],
  geography: ['第一章', '第二章', '第三章', '第四章'],
  politics: ['第一单元', '第二单元', '第三单元', '第四单元']
};

// 保存试卷
export const saveExamPaper = (paper: ExamPaper): void => {
  const papers = getExamPapers();
  papers.push(paper);
  localStorage.setItem(EXAM_PAPERS_KEY, JSON.stringify(papers));
};

// 获取所有试卷
export const getExamPapers = (userId?: string): ExamPaper[] => {
  const data = localStorage.getItem(EXAM_PAPERS_KEY);
  const papers: ExamPaper[] = data ? JSON.parse(data) : [];
  if (userId) {
    return papers.filter(p => p.userId === userId);
  }
  return papers;
};

// 获取单个试卷
export const getExamPaperById = (id: string): ExamPaper | null => {
  const papers = getExamPapers();
  return papers.find(p => p.id === id) || null;
};

// 更新试卷
export const updateExamPaper = (id: string, updates: Partial<ExamPaper>): void => {
  const papers = getExamPapers();
  const index = papers.findIndex(p => p.id === id);
  if (index !== -1) {
    papers[index] = { ...papers[index], ...updates, updatedAt: Date.now() };
    localStorage.setItem(EXAM_PAPERS_KEY, JSON.stringify(papers));
  }
};

// 删除试卷
export const deleteExamPaper = (id: string): void => {
  const papers = getExamPapers().filter(p => p.id !== id);
  localStorage.setItem(EXAM_PAPERS_KEY, JSON.stringify(papers));
  // 同时删除相关分析
  const analyses = getExamAnalyses().filter(a => a.paperId !== id);
  localStorage.setItem(EXAM_ANALYSES_KEY, JSON.stringify(analyses));
};

// 保存分析结果
export const saveExamAnalysis = (analysis: ExamPaperAnalysis): void => {
  const analyses = getExamAnalyses();
  // 检查是否已有该试卷的分析
  const existingIndex = analyses.findIndex(a => a.paperId === analysis.paperId);
  if (existingIndex !== -1) {
    analyses[existingIndex] = analysis;
  } else {
    analyses.push(analysis);
  }
  localStorage.setItem(EXAM_ANALYSES_KEY, JSON.stringify(analyses));
};

// 获取所有分析
export const getExamAnalyses = (): ExamPaperAnalysis[] => {
  const data = localStorage.getItem(EXAM_ANALYSES_KEY);
  return data ? JSON.parse(data) : [];
};

// 获取单个分析
export const getExamAnalysisByPaperId = (paperId: string): ExamPaperAnalysis | null => {
  const analyses = getExamAnalyses();
  return analyses.find(a => a.paperId === paperId) || null;
};

// 生成模拟分析数据
export const generateExamAnalysis = (
  paper: ExamPaper,
  questions: QuestionItem[]
): ExamPaperAnalysis => {
  const knowledgePoints: ExamPaperAnalysis['knowledgePoints'] = {};
  const chapters: ExamPaperAnalysis['chapters'] = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // 统计知识点
  const kpStats: Record<string, { total: number; correct: number; score: number }> = {};
  const chapterStats: Record<string, { total: number; correct: number; score: number }> = {};

  questions.forEach(q => {
    // 知识点统计
    if (!kpStats[q.knowledgePoint]) {
      kpStats[q.knowledgePoint] = { total: 0, correct: 0, score: 0 };
    }
    kpStats[q.knowledgePoint].total++;
    kpStats[q.knowledgePoint].score += q.score;
    if (q.isCorrect) {
      kpStats[q.knowledgePoint].correct++;
    }

    // 章节统计
    if (!chapterStats[q.chapter]) {
      chapterStats[q.chapter] = { total: 0, correct: 0, score: 0 };
    }
    chapterStats[q.chapter].total++;
    chapterStats[q.chapter].score += q.score;
    if (q.isCorrect) {
      chapterStats[q.chapter].correct++;
    }
  });

  // 构建知识点分析
  Object.entries(kpStats).forEach(([kp, stats]) => {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    let mastery: 'excellent' | 'good' | 'medium' | 'needs_improvement';
    if (percentage >= 90) mastery = 'excellent';
    else if (percentage >= 75) mastery = 'good';
    else if (percentage >= 60) mastery = 'medium';
    else mastery = 'needs_improvement';

    knowledgePoints[kp] = {
      name: kp,
      totalQuestions: stats.total,
      correctCount: stats.correct,
      score: percentage,
      mastery
    };

    // 分类强弱项
    if (mastery === 'excellent' || mastery === 'good') {
      strengths.push(kp);
    } else {
      weaknesses.push(kp);
    }
  });

  // 构建章节分析
  Object.entries(chapterStats).forEach(([ch, stats]) => {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    chapters[ch] = {
      name: ch,
      totalQuestions: stats.total,
      correctCount: stats.correct,
      score: percentage
    };
  });

  // 生成建议
  if (weaknesses.length > 0) {
    suggestions.push(`重点复习以下知识点：${weaknesses.slice(0, 3).join('、')}`);
  }
  suggestions.push('整理错题本，分析错误原因');
  suggestions.push('加强薄弱知识点的专项练习');
  suggestions.push('定期进行模拟测试，检验学习效果');

  const overallPercentage = Math.round((paper.userScore / paper.totalScore) * 100);

  return {
    id: `analysis_${Date.now()}`,
    paperId: paper.id,
    overallScore: paper.userScore,
    overallPercentage,
    knowledgePoints,
    chapters,
    strengths,
    weaknesses,
    suggestions,
    createdAt: Date.now()
  };
};

// 生成模拟题目数据
export const generateMockQuestions = (subject: string, totalScore: number): QuestionItem[] => {
  const kps = knowledgePointsData[subject] || ['知识点1', '知识点2', '知识点3'];
  const chaps = chaptersData[subject] || ['第一章', '第二章', '第三章'];
  const questions: QuestionItem[] = [];
  const questionCount = Math.floor(Math.random() * 5) + 8; // 8-12题

  for (let i = 0; i < questionCount; i++) {
    const difficulty: 'easy' | 'medium' | 'hard' = 
      Math.random() > 0.7 ? 'hard' : Math.random() > 0.4 ? 'medium' : 'easy';
    const score = difficulty === 'hard' ? 10 : difficulty === 'medium' ? 6 : 4;
    const isCorrect = Math.random() > 0.35; // 65%正确率

    questions.push({
      id: `q_${Date.now()}_${i}`,
      questionNumber: `${i + 1}`,
      knowledgePoint: kps[Math.floor(Math.random() * kps.length)],
      chapter: chaps[Math.floor(Math.random() * chaps.length)],
      difficulty,
      score,
      userScore: isCorrect ? score : 0,
      isCorrect,
      userAnswer: isCorrect ? '正确答案' : '错误答案',
      correctAnswer: '正确答案',
      analysis: '本题考查的是基本概念和应用能力'
    });
  }

  return questions;
};

// 格式化日期
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

// 获取掌握度文本
export const getMasteryText = (mastery: string): string => {
  const map: Record<string, string> = {
    excellent: '优秀',
    good: '良好',
    medium: '中等',
    needs_improvement: '需加强'
  };
  return map[mastery] || mastery;
};

// 获取掌握度颜色
export const getMasteryColor = (mastery: string): string => {
  const map: Record<string, string> = {
    excellent: 'text-emerald-600 bg-emerald-100',
    good: 'text-blue-600 bg-blue-100',
    medium: 'text-amber-600 bg-amber-100',
    needs_improvement: 'text-rose-600 bg-rose-100'
  };
  return map[mastery] || 'text-slate-600 bg-slate-100';
};
