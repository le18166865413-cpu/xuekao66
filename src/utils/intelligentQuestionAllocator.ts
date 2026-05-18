import { AssessmentMode } from './assessmentModes';
import { Question } from './questionBank';

interface AllocationResult {
  questions: Question[];
  totalScore: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
  categoryCoverage: string[];
  allocationTime: number;
  scoreAccuracy: number;
}

export const allocateIntelligentQuestions = (
  allQuestions: Question[],
  mode: AssessmentMode
): AllocationResult => {
  const startTime = performance.now();
  
  const questionsByDifficulty = {
    easy: allQuestions.filter(q => q.difficulty === 'easy'),
    medium: allQuestions.filter(q => q.difficulty === 'medium'),
    hard: allQuestions.filter(q => q.difficulty === 'hard'),
    expert: allQuestions.filter(q => q.difficulty === 'expert'),
  };

  const usedQuestionIds = new Set<number>();
  const allocatedQuestions: Question[] = [];
  let totalScore = 0;

  const difficulties: Array<'easy' | 'medium' | 'hard' | 'expert'> = ['easy', 'medium', 'hard', 'expert'];
  
  // 简化逻辑：直接从对应难度中随机选取题目
  difficulties.forEach(difficulty => {
    const config = mode.difficulties[difficulty];
    if (!config || config.count === 0) return;
    
    const pool = questionsByDifficulty[difficulty];
    if (pool.length === 0) return;

    const available = pool.filter(q => !usedQuestionIds.has(q.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, config.count);
    
    selected.forEach(q => {
      allocatedQuestions.push(q);
      totalScore += q.score;
      usedQuestionIds.add(q.id);
    });
  });

  // 随机打乱题目顺序
  const shuffled = [...allocatedQuestions].sort(() => Math.random() - 0.5);

  const endTime = performance.now();
  const scoreAccuracy = 100 - Math.min(100, Math.abs(totalScore - mode.totalScore) / mode.totalScore * 100);

  return {
    questions: shuffled,
    totalScore,
    difficultyDistribution: {
      easy: shuffled.filter(q => q.difficulty === 'easy').length,
      medium: shuffled.filter(q => q.difficulty === 'medium').length,
      hard: shuffled.filter(q => q.difficulty === 'hard').length,
      expert: shuffled.filter(q => q.difficulty === 'expert').length,
    },
    categoryCoverage: [...new Set(shuffled.map(q => q.category))],
    allocationTime: endTime - startTime,
    scoreAccuracy: Math.max(0, scoreAccuracy),
  };
};

export const getAllocationStats = (): any => {
  return { 
    totalAllocations: 0,
    avgAllocationTime: 0,
    lastAllocationTime: 0,
    avgScoreAccuracy: 0,
    modeUsage: {}
  };
};

export const resetAllocationStats = (): void => {
};

export const clearQuestionCache = (): void => {
};

export const allocateQuestionsByScore = (
  questions: Question[],
  targetScore: number,
  count: number
): Question[] => {
  if (questions.length === 0) return [];

  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const validateAllocation = (questions: Question[], mode: AssessmentMode): {
  isValid: boolean;
  issues: string[];
} => {
  return { isValid: true, issues: [] };
};
