export type StudentLevel = '优秀' | '良好' | '中等' | '及格' | '薄弱';

export interface CategoryConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  weight: number;
  subCategories: string[];
}

export interface SubjectConfig {
  categoryDifficulty: Record<string, 'easy' | 'medium' | 'hard'>;
  categoryWeights: Record<string, number>;
  subCategories: Record<string, string[]>;
}

export interface CategoryStats {
  category: string;
  total: number;
  correct: number;
  correctRate: number;
}

export interface StudyTask {
  id: string;
  category: string;
  subCategory?: string;
  priority: number;
  estimatedDays: number;
  description: string;
  resources: string[];
  status: 'pending' | 'in_progress' | 'completed';
}

export interface StudyStage {
  id: string;
  name: string;
  durationDays: number;
  startDate?: string;
  endDate?: string;
  tasks: StudyTask[];
  focus: string;
  progress: number;
}

export interface StudyPlan {
  assessmentId: string;
  subject: string;
  studentLevel: StudentLevel;
  totalStages: number;
  stages: StudyStage[];
  estimatedImprovement: number;
  targetScore: number;
  daysToGaokao: number;
  earnedScore: number;
  totalScore: number;
  createdAt: string;
  generatedTime: number;
}

export interface PlanStats {
  totalPlans: number;
  avgGenerationTime: number;
  plansBySubject: Record<string, number>;
  plansByLevel: Record<StudentLevel, number>;
  avgTargetScore: number;
  lastGeneratedTime: number;
}

const planStats: PlanStats = {
  totalPlans: 0,
  avgGenerationTime: 0,
  plansBySubject: {},
  plansByLevel: {
    '优秀': 0,
    '良好': 0,
    '中等': 0,
    '及格': 0,
    '薄弱': 0,
  },
  avgTargetScore: 0,
  lastGeneratedTime: 0,
};

const SUBJECT_CONFIGS: Record<string, SubjectConfig> = {
  math: {
    categoryDifficulty: {
      '集合与常用逻辑用语': 'easy',
      '函数概念与性质': 'medium',
      '导数及其应用': 'hard',
      '三角函数': 'medium',
      '平面向量': 'easy',
      '数列': 'medium',
      '不等式': 'medium',
      '立体几何': 'medium',
      '解析几何': 'hard',
      '概率统计': 'medium',
      '复数': 'easy',
      '算法初步': 'easy',
      '基本初等函数': 'easy',
      '直线与圆': 'medium',
      '排列组合': 'medium',
      '解三角形': 'medium',
    },
    categoryWeights: {
      '集合与常用逻辑用语': 5,
      '函数概念与性质': 12,
      '导数及其应用': 25,
      '三角函数': 12,
      '平面向量': 5,
      '数列': 12,
      '不等式': 5,
      '立体几何': 12,
      '解析几何': 22,
      '概率统计': 12,
      '复数': 2,
      '算法初步': 2,
      '基本初等函数': 8,
      '直线与圆': 8,
      '排列组合': 8,
      '解三角形': 6,
    },
    subCategories: {
      '导数及其应用': ['导数概念', '导数运算', '导数应用', '定积分'],
      '解析几何': ['直线与圆', '椭圆', '双曲线', '抛物线'],
      '概率统计': ['排列组合', '概率', '统计', '随机变量'],
      '三角函数': ['三角恒等变换', '三角函数图像', '解三角形'],
    },
  },
  chinese: {
    categoryDifficulty: {
      '现代文阅读': 'medium',
      '古诗文阅读': 'hard',
      '语言文字运用': 'easy',
      '写作': 'hard',
      '文学常识': 'easy',
      '古代诗歌': 'medium',
      '文言文阅读': 'hard',
      '文学名著': 'medium',
    },
    categoryWeights: {
      '现代文阅读': 36,
      '古诗文阅读': 34,
      '语言文字运用': 20,
      '写作': 60,
      '文学常识': 6,
      '古代诗歌': 16,
      '文言文阅读': 19,
      '文学名著': 6,
    },
    subCategories: {
      '现代文阅读': ['论述类', '文学类', '实用类'],
      '古诗文阅读': ['文言文', '古诗词', '名句默写'],
      '语言文字运用': ['字音字形', '词语运用', '病句辨析', '标点'],
      '写作': ['审题立意', '结构安排', '语言表达', '素材运用'],
    },
  },
  english: {
    categoryDifficulty: {
      '听力': 'medium',
      '阅读理解': 'hard',
      '完形填空': 'medium',
      '语法填空': 'easy',
      '写作': 'hard',
      '动词时态': 'easy',
      '虚拟语气': 'medium',
      '定语从句': 'medium',
      '非谓语动词': 'medium',
    },
    categoryWeights: {
      '听力': 30,
      '阅读理解': 40,
      '完形填空': 15,
      '语法填空': 15,
      '写作': 40,
      '动词时态': 5,
      '虚拟语气': 4,
      '定语从句': 4,
      '非谓语动词': 4,
    },
    subCategories: {
      '听力': ['短对话', '长对话', '独白'],
      '阅读理解': ['细节理解', '推理判断', '主旨大意', '词义猜测'],
      '写作': ['应用文', '读后续写', '概要写作'],
    },
  },
  physics: {
    categoryDifficulty: {
      '力学': 'medium',
      '电磁学': 'hard',
      '热学': 'easy',
      '光学': 'medium',
      '原子物理': 'easy',
      '运动学': 'easy',
      '功和能': 'medium',
      '动量': 'medium',
      '机械波': 'medium',
      '万有引力': 'medium',
    },
    categoryWeights: {
      '力学': 35,
      '电磁学': 40,
      '热学': 10,
      '光学': 10,
      '原子物理': 5,
      '运动学': 12,
      '功和能': 12,
      '动量': 8,
      '机械波': 6,
      '万有引力': 6,
    },
    subCategories: {
      '力学': ['运动学', '牛顿运动定律', '功和能', '动量'],
      '电磁学': ['静电场', '恒定电流', '磁场', '电磁感应'],
      '热学': ['分子动理论', '热力学定律'],
    },
  },
  chemistry: {
    categoryDifficulty: {
      '物质结构': 'medium',
      '化学反应原理': 'hard',
      '有机化学': 'medium',
      '无机化学': 'easy',
      '化学用语': 'easy',
      '元素周期律': 'medium',
      '化学实验': 'medium',
      '电化学': 'medium',
    },
    categoryWeights: {
      '物质结构': 20,
      '化学反应原理': 30,
      '有机化学': 25,
      '无机化学': 25,
      '化学用语': 6,
      '元素周期律': 12,
      '化学实验': 10,
      '电化学': 12,
    },
    subCategories: {
      '化学反应原理': ['化学反应速率', '化学平衡', '电化学'],
      '有机化学': ['烃类', '烃的衍生物', '生物大分子'],
      '无机化学': ['金属', '非金属', '化合物'],
    },
  },
  biology: {
    categoryDifficulty: {
      '细胞': 'easy',
      '遗传': 'hard',
      '代谢': 'medium',
      '生态': 'easy',
      '进化': 'medium',
      '植物生命活动': 'medium',
    },
    categoryWeights: {
      '细胞': 20,
      '遗传': 30,
      '代谢': 25,
      '生态': 25,
      '进化': 10,
      '植物生命活动': 12,
    },
    subCategories: {
      '遗传': ['遗传定律', 'DNA复制', '基因表达', '变异'],
      '代谢': ['光合作用', '呼吸作用', '酶与ATP'],
      '细胞': ['细胞结构', '细胞分裂', '细胞分化'],
    },
  },
  history: {
    categoryDifficulty: {
      '中国古代史': 'medium',
      '中国近代史': 'medium',
      '中国现代史': 'easy',
      '世界史': 'medium',
    },
    categoryWeights: {
      '中国古代史': 30,
      '中国近代史': 25,
      '中国现代史': 20,
      '世界史': 25,
    },
    subCategories: {
      '中国古代史': ['先秦', '秦汉', '唐宋', '明清'],
      '中国近代史': ['晚清', '民国', '抗日战争'],
      '世界史': ['古代', '近代', '现代'],
    },
  },
  geography: {
    categoryDifficulty: {
      '地球': 'easy',
      '气候': 'medium',
      '人文地理': 'medium',
      '中国地理': 'easy',
      '海洋': 'medium',
      '农业': 'medium',
    },
    categoryWeights: {
      '地球': 15,
      '气候': 25,
      '人文地理': 25,
      '中国地理': 20,
      '海洋': 10,
      '农业': 15,
    },
    subCategories: {
      '气候': ['气候类型', '天气系统', '气候变化'],
      '人文地理': ['人口', '城市', '产业'],
      '中国地理': ['疆域', '地形', '资源'],
    },
  },
  politics: {
    categoryDifficulty: {
      '政治生活': 'medium',
      '经济生活': 'hard',
      '文化生活': 'medium',
      '生活与哲学': 'hard',
    },
    categoryWeights: {
      '政治生活': 25,
      '经济生活': 30,
      '文化生活': 20,
      '生活与哲学': 25,
    },
    subCategories: {
      '政治生活': ['公民', '政府', '政党', '国际'],
      '经济生活': ['生产', '分配', '交换', '消费'],
      '生活与哲学': ['唯物论', '辩证法', '认识论'],
    },
  },
};

export const determineStudentLevel = (correctRate: number, earnedScore: number): StudentLevel => {
  if (correctRate >= 0.8 || earnedScore >= 100) return '优秀';
  if (correctRate >= 0.6 || earnedScore >= 80) return '良好';
  if (correctRate >= 0.4 || earnedScore >= 60) return '中等';
  if (correctRate >= 0.2 || earnedScore >= 40) return '及格';
  return '薄弱';
};

export const calculatePriority = (
  categoryStats: CategoryStats,
  subject: string,
  studentLevel: StudentLevel
): number => {
  const config = SUBJECT_CONFIGS[subject] || SUBJECT_CONFIGS.math;
  const weight = config.categoryWeights[categoryStats.category] || 5;
  const correctRate = categoryStats.correctRate;

  let priority = 50;

  if (correctRate < 0.4 && weight >= 10) {
    priority = 100;
  } else if (correctRate < 0.6 && weight >= 8) {
    priority = 80;
  } else if (correctRate < 0.7) {
    priority = 60;
  } else if (correctRate >= 0.8) {
    priority = 10;
  }

  if (studentLevel === '薄弱' || studentLevel === '及格') {
    const difficulty = config.categoryDifficulty[categoryStats.category] || 'medium';
    if (difficulty === 'easy') {
      priority += 20;
    } else if (difficulty === 'hard') {
      priority -= 30;
    }
  }

  if (studentLevel === '优秀') {
    const difficulty = config.categoryDifficulty[categoryStats.category] || 'medium';
    if (difficulty === 'hard') {
      priority += 30;
    }
  }

  if (correctRate >= 0.9) {
    priority = 0;
  }

  return Math.max(0, Math.min(100, priority));
};

export const generateStudyPlan = (
  assessmentId: string,
  subject: string,
  categoryStatsList: CategoryStats[],
  earnedScore: number,
  totalScore: number,
  daysToGaokao: number
): StudyPlan => {
  const startTime = performance.now();
  
  const correctRate = earnedScore / totalScore;
  const studentLevel = determineStudentLevel(correctRate, earnedScore);

  const config = SUBJECT_CONFIGS[subject] || SUBJECT_CONFIGS.math;

  const categoryPriorities = categoryStatsList.map(stats => ({
    ...stats,
    priority: calculatePriority(stats, subject, studentLevel),
  }));

  const sortedByPriority = [...categoryPriorities]
    .filter(c => c.priority > 0)
    .sort((a, b) => b.priority - a.priority);

  const totalStages = Math.min(Math.ceil(daysToGaokao / 14), 6);
  const baseDuration = Math.ceil(daysToGaokao / totalStages);

  const stages: StudyStage[] = [];
  let currentPriorityIndex = 0;

  const stageNames = ['基础夯实阶段', '能力提升阶段', '重点突破阶段', '冲刺强化阶段', '综合提升', '最终冲刺'];

  const today = new Date();
  
  for (let i = 0; i < totalStages; i++) {
    const stageName = i >= stageNames.length ? `阶段${i + 1}` : stageNames[i];
    
    const stageTasks: StudyTask[] = [];
    const tasksPerStage = Math.max(1, Math.ceil(sortedByPriority.length / totalStages));
    
    for (let j = 0; j < tasksPerStage && currentPriorityIndex < sortedByPriority.length; j++) {
      const categoryStat = sortedByPriority[currentPriorityIndex];
      const subCats = config.subCategories[categoryStat.category] || [];
      
      stageTasks.push({
        id: `${categoryStat.category}_${i}_${j}`,
        category: categoryStat.category,
        priority: categoryStat.priority,
        estimatedDays: Math.max(1, Math.ceil(categoryStat.priority / 25)),
        description: `深入学习${categoryStat.category}，重点突破薄弱环节`,
        resources: [
          `${categoryStat.category}知识点精讲`,
          `${categoryStat.category}练习题集`,
          `${categoryStat.category}真题解析`,
        ],
        status: 'pending',
      });

      if (subCats.length > 0 && categoryStat.correctRate < 0.5) {
        const subCatCount = Math.min(2, subCats.length);
        subCats.slice(0, subCatCount).forEach((subCat, idx) => {
          stageTasks.push({
            id: `${categoryStat.category}_${subCat}_${i}_${j}_${idx}`,
            category: categoryStat.category,
            subCategory: subCat,
            priority: categoryStat.priority + 5,
            estimatedDays: 2,
            description: `专项突破：${subCat}`,
            resources: [`${subCat}专项训练`, `${subCat}典型例题`],
            status: 'pending',
          });
        });
      }

      currentPriorityIndex++;
    }

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + i * baseDuration);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (i === totalStages - 1 ? daysToGaokao - i * baseDuration : baseDuration) - 1);

    stages.push({
      id: `stage_${i + 1}`,
      name: stageName,
      durationDays: i === totalStages - 1 ? daysToGaokao - i * baseDuration : baseDuration,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      tasks: stageTasks,
      focus: getStageFocus(i, totalStages),
      progress: 0,
    });
  }

  const baseImprovements: Record<StudentLevel, number> = {
    '薄弱': 0.2,
    '及格': 0.15,
    '中等': 0.12,
    '良好': 0.08,
    '优秀': 0.05,
  };

  const base = baseImprovements[studentLevel];
  const stageBonus = totalStages * 0.02;
  const estimatedImprovement = Math.round(totalScore * (base + stageBonus));

  const targetScore = Math.min(totalScore, earnedScore + estimatedImprovement);

  const endTime = performance.now();

  updatePlanStats(subject, studentLevel, targetScore, endTime - startTime);

  return {
    assessmentId,
    subject,
    studentLevel,
    totalStages,
    stages,
    estimatedImprovement,
    targetScore,
    daysToGaokao,
    earnedScore,
    totalScore,
    createdAt: new Date().toISOString(),
    generatedTime: endTime - startTime,
  };
};

const getStageFocus = (index: number, totalStages: number): string => {
  const ratio = index / totalStages;
  if (ratio < 0.3) return '高优先级';
  if (ratio < 0.6) return '重点突破';
  if (ratio < 0.8) return '巩固强化';
  return '冲刺提升';
};

const updatePlanStats = (subject: string, level: StudentLevel, targetScore: number, time: number): void => {
  planStats.totalPlans++;
  planStats.lastGeneratedTime = time;
  planStats.avgGenerationTime = 
    (planStats.avgGenerationTime * (planStats.totalPlans - 1) + time) / planStats.totalPlans;
  planStats.plansBySubject[subject] = (planStats.plansBySubject[subject] || 0) + 1;
  planStats.plansByLevel[level]++;
  planStats.avgTargetScore = 
    (planStats.avgTargetScore * (planStats.totalPlans - 1) + targetScore) / planStats.totalPlans;
};

export const getPlanStats = (): PlanStats => {
  return { ...planStats };
};

export const resetPlanStats = (): void => {
  planStats.totalPlans = 0;
  planStats.avgGenerationTime = 0;
  planStats.plansBySubject = {};
  planStats.plansByLevel = {
    '优秀': 0,
    '良好': 0,
    '中等': 0,
    '及格': 0,
    '薄弱': 0,
  };
  planStats.avgTargetScore = 0;
  planStats.lastGeneratedTime = 0;
};

export const getWeakCategories = (categoryStatsList: CategoryStats[]): string[] => {
  return categoryStatsList.filter(c => c.correctRate < 0.5).map(c => c.category);
};

export const getStrongCategories = (categoryStatsList: CategoryStats[]): string[] => {
  return categoryStatsList.filter(c => c.correctRate >= 0.8).map(c => c.category);
};

export const getMediumCategories = (categoryStatsList: CategoryStats[]): string[] => {
  return categoryStatsList.filter(c => c.correctRate >= 0.5 && c.correctRate < 0.8).map(c => c.category);
};

export const validateStudyPlan = (plan: StudyPlan): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (!plan.assessmentId) {
    issues.push('缺少测评ID');
  }
  
  if (!plan.subject) {
    issues.push('缺少科目');
  }
  
  if (plan.daysToGaokao <= 0) {
    issues.push('高考倒计时天数无效');
  }
  
  if (plan.totalStages === 0) {
    issues.push('阶段数量为0');
  }
  
  const totalTaskDays = plan.stages.reduce((sum, stage) => {
    return sum + stage.tasks.reduce((taskSum, task) => taskSum + task.estimatedDays, 0);
  }, 0);
  
  if (totalTaskDays > plan.daysToGaokao * 2) {
    issues.push(`任务预计天数(${totalTaskDays}天)远超剩余天数(${plan.daysToGaokao}天)`);
  }
  
  const duplicateTaskIds = new Set<string>();
  const allTaskIds: string[] = [];
  
  plan.stages.forEach(stage => {
    stage.tasks.forEach(task => {
      allTaskIds.push(task.id);
    });
  });
  
  allTaskIds.forEach(id => {
    if (allTaskIds.filter(i => i === id).length > 1) {
      duplicateTaskIds.add(id);
    }
  });
  
  if (duplicateTaskIds.size > 0) {
    issues.push(`存在重复任务ID: ${Array.from(duplicateTaskIds).join(', ')}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

export const formatStudyPlanForDisplay = (plan: StudyPlan): string[] => {
  const lines: string[] = [];
  
  lines.push(`学习计划概览`);
  lines.push(`学生水平：${plan.studentLevel}`);
  lines.push(`当前得分：${plan.earnedScore}/${plan.totalScore}`);
  lines.push(`目标分数：${plan.targetScore}`);
  lines.push(`预计提升：${plan.estimatedImprovement}分`);
  lines.push(`剩余天数：${plan.daysToGaokao}天`);
  lines.push(`阶段数量：${plan.totalStages}个`);
  lines.push('');

  plan.stages.forEach((stage, index) => {
    lines.push(`【阶段${index + 1}】${stage.name}（${stage.durationDays}天）`);
    lines.push(`  时间：${stage.startDate} ~ ${stage.endDate}`);
    lines.push(`  重点：${stage.focus}`);
    lines.push(`  任务：`);
    stage.tasks.forEach(task => {
      const subCat = task.subCategory ? ` - ${task.subCategory}` : '';
      const status = task.status === 'completed' ? '(已完成)' : task.status === 'in_progress' ? '(进行中)' : '';
      lines.push(`    • ${task.category}${subCat}（优先级：${task.priority}，预计${task.estimatedDays}天）${status}`);
    });
    lines.push('');
  });

  return lines;
};

export const getCategoryConfig = (subject: string, category: string): CategoryConfig | null => {
  const config = SUBJECT_CONFIGS[subject];
  if (!config) return null;
  
  return {
    difficulty: config.categoryDifficulty[category] || 'medium',
    weight: config.categoryWeights[category] || 5,
    subCategories: config.subCategories[category] || [],
  };
};

export const getAllSubjects = (): string[] => {
  return Object.keys(SUBJECT_CONFIGS);
};

export const getSubjectConfig = (subject: string): SubjectConfig | null => {
  return SUBJECT_CONFIGS[subject] || null;
};