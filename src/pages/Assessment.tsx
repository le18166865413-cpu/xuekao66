import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Clock, CheckCircle, XCircle, ChevronRight, RotateCcw, 
  Target, TrendingUp, Award, BookOpen, BarChart3, ArrowLeft, Info, 
  Star, Calendar, MapPin, Building, GraduationCap, Sparkles,
  PlayCircle, FileText, AlertCircle, Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { subjects, difficultyLevels, calculateScore, saveAssessment, saveUserProfile, getUserProfile, UserProfile } from '../utils/assessment';
import { questionBank, Question, stats, validateQuestionBank } from '../utils/questionBank';
import { getAllModes, getModeById, calculateDaysToGaokao } from '../utils/assessmentModes';
import { allocateIntelligentQuestions } from '../utils/intelligentQuestionAllocator';
import { generateStudyPlan, determineStudentLevel, getWeakCategories, getStrongCategories, StudyPlan } from '../utils/studyPlanGenerator';

type AssessmentStep = 'subject' | 'mode' | 'profile' | 'quiz' | 'result';

export default function Assessment() {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<AssessmentStep>('subject');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    age: 0,
    region: '',
    school: '',
    scores: []
  });
  
  const [recentScore, setRecentScore] = useState('');
  const [scoreDate, setScoreDate] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && !showResult) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, showResult]);

  useEffect(() => {
    const savedProfile = getUserProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const selectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setStep('mode');
    setError(null);
  };

  const selectMode = (modeId: string) => {
    setSelectedMode(modeId);
    setStep('profile');
  };

  const startQuiz = () => {
    if (!selectedMode || !selectedSubject) return;

    setLoading(true);
    
    try {
      const mode = getModeById(selectedMode);
      if (!mode) {
        setError('无法找到测评模式');
        setLoading(false);
        return;
      }

      const subjectQuestions = questionBank.filter(q => q.subject === selectedSubject);
      
      if (subjectQuestions.length === 0) {
        setError('该科目暂无题目');
        setLoading(false);
        return;
      }

      const allocated = allocateIntelligentQuestions(subjectQuestions, mode);
      
      setTimeout(() => {
        setQuestions(allocated.questions);
        setStartTime(Date.now());
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setElapsedTime(0);
        setShowAnalysis(null);
        setStep('quiz');
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('启动测评失败:', error);
      setError('启动测评失败，请重试');
      setLoading(false);
    }
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestion].id);
    if (existingIndex >= 0) {
      newAnswers[existingIndex].answer = optionIndex;
    } else {
      newAnswers.push({
        questionId: questions[currentQuestion].id,
        answer: optionIndex
      });
    }
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnalysis(null);
    } else {
      generateResult();
    }
  };

  const generateResult = () => {
    const scoreResult = calculateScore(questions, answers);
    const mode = getModeById(selectedMode!);
    
    const categoryStats = Object.entries(scoreResult.chapterAnalysis).map(([category, data]) => ({
      category,
      total: data.total,
      correct: data.correct,
      correctRate: data.total > 0 ? data.correct / data.total : 0
    }));

    const earnedScore = Math.round((scoreResult.score / 100) * (mode?.totalScore || 100));
    const daysToGaokao = calculateDaysToGaokao();
    
    const plan = generateStudyPlan(
      `assessment_${Date.now()}`,
      selectedSubject || 'math',
      categoryStats,
      earnedScore,
      mode?.totalScore || 100,
      daysToGaokao
    );
    setStudyPlan(plan);

    const studentLevel = determineStudentLevel(categoryStats[0]?.correctRate || scoreResult.score / 100, earnedScore);
    const weakCategories = getWeakCategories(categoryStats);
    const strongCategories = getStrongCategories(categoryStats);

    const assessmentResult = {
      ...scoreResult,
      timeSpent: elapsedTime,
      suggestions: generateSuggestions(scoreResult.score, scoreResult.chapterAnalysis, studentLevel, weakCategories, strongCategories),
      recommendedDifficulty: getRecommendedDifficulty(scoreResult.score),
      studentLevel,
      weakCategories,
      strongCategories,
      totalScore: mode?.totalScore || 100,
      earnedScore,
      daysToGaokao,
      planSummary: {
        targetScore: plan.targetScore,
        estimatedImprovement: plan.estimatedImprovement,
        totalStages: plan.totalStages
      }
    };

    setResult(assessmentResult);
    setShowResult(true);
    setStep('result');
    saveResult(assessmentResult);
  };

  const getRecommendedDifficulty = (score: number) => {
    if (score < 60) return 'easy';
    if (score < 80) return 'medium';
    if (score < 95) return 'hard';
    return 'expert';
  };

  const generateSuggestions = (score: number, chapterAnalysis: any, studentLevel: string, weakCategories: string[], strongCategories: string[]): string[] => {
    const suggestions: string[] = [];
    
    const levelInfo = {
      '优秀': { message: '表现优秀', advice: '挑战压轴题，冲刺满分', color: 'text-emerald-600' },
      '良好': { message: '表现良好', advice: '巩固薄弱环节，提升稳定性', color: 'text-blue-600' },
      '中等': { message: '表现中等', advice: '加强基础知识，提升解题能力', color: 'text-amber-600' },
      '及格': { message: '刚刚及格', advice: '系统复习，夯实基础', color: 'text-orange-600' },
      '薄弱': { message: '基础薄弱', advice: '从基础开始，循序渐进', color: 'text-rose-600' }
    };

    const level = levelInfo[studentLevel as keyof typeof levelInfo];
    suggestions.push(`当前水平：${level?.message || '待评估'}（${level?.advice || ''}）`);

    if (score >= 80) {
      suggestions.push('基础扎实，建议适当挑战难题，冲击高分');
    } else if (score >= 60) {
      suggestions.push('基础较好，需要重点突破薄弱环节');
    } else {
      suggestions.push('建议系统复习基础知识，建立完整的知识体系');
    }

    if (weakCategories.length > 0) {
      suggestions.push(`薄弱知识点：${weakCategories.slice(0, 3).join('、')}（建议优先攻克）`);
    }
    
    if (strongCategories.length > 0) {
      suggestions.push(`强项知识点：${strongCategories.slice(0, 3).join('、')}（继续保持）`);
    }

    suggestions.push('建议每天保持30-60分钟专项训练');
    suggestions.push('定期回顾错题，总结解题思路');

    return suggestions;
  };

  const saveResult = async (assessmentResult: any) => {
    if (!selectedSubject || !user) return;
    
    setSaving(true);
    try {
      const assessment = {
        id: `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        subject: selectedSubject,
        userId: user.id,
        answers,
        score: assessmentResult.score,
        totalQuestions: assessmentResult.totalQuestions,
        correctAnswers: assessmentResult.correctAnswers,
        timeSpent: assessmentResult.timeSpent,
        completedAt: Date.now(),
        results: assessmentResult.results,
        chapterAnalysis: assessmentResult.chapterAnalysis,
        studentLevel: assessmentResult.studentLevel,
        planSummary: assessmentResult.planSummary
      };

      saveAssessment(assessment);
    } catch (err) {
      console.error('保存结果失败:', err);
    } finally {
      setSaving(false);
    }
  };

  const resetAssessment = () => {
    setStep('subject');
    setSelectedSubject(null);
    setSelectedMode(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowAnalysis(null);
    setResult(null);
    setStudyPlan(null);
    setError(null);
    setRecentScore('');
    setScoreDate('');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}小时${mins}分${secs.toString().padStart(2, '0')}秒`;
    }
    return `${mins}分${secs.toString().padStart(2, '0')}秒`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${mins}分钟`;
    }
    return `${mins}分钟`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'expert': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '基础题';
      case 'medium': return '中档题';
      case 'hard': return '提高题';
      case 'expert': return '压轴题';
      default: return difficulty;
    }
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === questions[currentQuestion].id)?.answer;
  };

  const getProgressPercent = () => {
    if (!questions.length) return 0;
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return answers.length;
  };

  const getModeInfo = () => {
    if (!selectedMode) return null;
    return getModeById(selectedMode);
  };

  // Helper functions for subject styles
  const getSubjectGradient = (subjectId: string) => {
    const gradients: Record<string, string> = {
      math: 'from-blue-500 to-cyan-500',
      chinese: 'from-rose-500 to-pink-500',
      english: 'from-emerald-500 to-teal-500',
      physics: 'from-violet-500 to-purple-500',
      chemistry: 'from-orange-500 to-amber-500',
      biology: 'from-green-500 to-emerald-500',
      history: 'from-amber-500 to-yellow-500',
      geography: 'from-indigo-500 to-blue-500',
      politics: 'from-red-500 to-rose-500',
    };
    return gradients[subjectId] || 'from-blue-500 to-cyan-500';
  };

  const getSubjectLightBg = (subjectId: string) => {
    const lightBgs: Record<string, string> = {
      math: 'from-blue-50 to-cyan-50',
      chinese: 'from-rose-50 to-pink-50',
      english: 'from-emerald-50 to-teal-50',
      physics: 'from-violet-50 to-purple-50',
      chemistry: 'from-orange-50 to-amber-50',
      biology: 'from-green-50 to-emerald-50',
      history: 'from-amber-50 to-yellow-50',
      geography: 'from-indigo-50 to-blue-50',
      politics: 'from-red-50 to-rose-50',
    };
    return lightBgs[subjectId] || 'from-blue-50 to-cyan-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Hero Section - 仅在选择科目步骤显示 */}
      {step === 'subject' && (
        <div className="relative bg-slate-900 overflow-hidden h-[466px]">
          {/* Background decorations */}
          <div className="absolute inset-0 w-[1815px] h-[466px] flex flex-col">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-8xl mx-auto px-4 py-20 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">AI智能测评</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                知识评测中心
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                基于高考大纲的精准测评，覆盖核心考点，智能分析薄弱环节
              </p>
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-8 mt-10"
              >
                {[
                  { value: subjects.length + '+', label: '核心科目' },
                  { value: '500+', label: '精选题目' },
                  { value: 'AI', label: '智能匹配' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-rose-800 font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-rose-600 hover:text-rose-800 underline"
                >
                  关闭提示
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 'subject' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">选择测评方式</h2>
            <p className="text-slate-600 mb-8">在线测评或上传历史试卷进行分析</p>

            {/* 上传试卷入口 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.hash = '#/upload-paper'}
                className="w-full bg-gradient-to-br from-blue-500 to-violet-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-left"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">上传历史试卷</h3>
                    <p className="text-white/80">上传你的考试试卷，获取详细的知识点分析和学习建议</p>
                  </div>
                  <ChevronRight className="w-8 h-8 opacity-80" />
                </div>
              </motion.button>
            </motion.div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">或选择在线测评</h3>
            <p className="text-slate-600 mb-6">点击下方卡片开始对应科目的精准测评</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
              {subjects.map((subject, index) => {
                const gradient = getSubjectGradient(subject.id);
                const lightBg = getSubjectLightBg(subject.id);
                
                return (
                  <motion.button
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectSubject(subject.id)}
                    className="group bg-white rounded-2xl p-8 border-2 border-slate-100 hover:shadow-xl transition-all relative overflow-hidden text-left"
                    aria-label={`开始${subject.name}测评`}
                  >
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Icon with Gradient Background */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {subject.icon}
                      </div>
                      
                      {/* Subject Name */}
                      <div className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800">
                        {subject.name}
                      </div>
                      
                      {/* Description */}
                      <div className="text-sm text-slate-500 mb-4 leading-relaxed group-hover:text-slate-600">
                        {subject.description}
                      </div>
                      
                      {/* Arrow Indicator */}
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                        <span className="text-sm font-medium">开始测评</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '精准', label: '知识点分析', icon: Target },
                { value: '4种', label: '难度等级', icon: Star },
                { value: 'AI', label: '智能出题', icon: Brain },
                { value: '专业', label: '学习计划', icon: Calendar },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center py-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <Icon className="w-6 h-6 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 'mode' && selectedSubject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setStep('subject');
                    setSelectedSubject(null);
                  }}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  返回
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {subjects.find(s => s.id === selectedSubject)?.name}测评
                  </h2>
                  <p className="text-slate-500 text-sm">请选择测评模式</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {getAllModes(selectedSubject).map((mode, index) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => selectMode(mode.id)}
                  className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{mode.name}</h3>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        总分: {mode.totalScore}分
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(mode.timeLimit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
                        基础 {mode.difficulties.easy.count}题
                      </span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                        中档 {mode.difficulties.medium.count}题
                      </span>
                      <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">
                        压轴 {mode.difficulties.hard.count}题
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'profile' && selectedSubject && selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setStep('mode');
                    setSelectedMode(null);
                  }}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  返回
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {subjects.find(s => s.id === selectedSubject)?.name} - {getModeInfo()?.name}
                  </h2>
                  <p className="text-slate-500 text-sm">准备开始测评</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-4 mb-8"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">测评信息</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                    <span>题目数量：{getModeInfo()?.difficulties.easy.count + (getModeInfo()?.difficulties.medium.count || 0) + (getModeInfo()?.difficulties.hard.count || 0)} 道</span>
                    <span>总分：{getModeInfo()?.totalScore} 分</span>
                    <span>时长：{formatDuration(getModeInfo()?.timeLimit || 0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={() => {
                  setStep('mode');
                  setSelectedMode(null);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded-xl transition-all"
              >
                返回选择模式
              </motion.button>
              <motion.button
                onClick={startQuiz}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    准备题目...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    开始测评
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && !showResult && (
          <>
            {loading ? (
              <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600">正在智能匹配题目...</p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100"
              >
                <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-50 to-violet-50 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={resetAssessment}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      退出
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                        {subjects.find(s => s.id === selectedSubject)?.name}测评
                      </h2>
                      <p className="text-slate-500 text-sm">第 {currentQuestion + 1} / {questions.length} 题</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{formatTime(elapsedTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">{getAnsweredCount()}/{questions.length}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-violet-500 h-full rounded-full"
                    style={{ width: `${getProgressPercent()}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                            {questions[currentQuestion]?.chapter}
                          </span>
                          <span className={`px-4 py-1.5 text-sm rounded-full border ${getDifficultyColor(questions[currentQuestion]?.difficulty)}`}>
                            {getDifficultyText(questions[currentQuestion]?.difficulty)}
                          </span>
                          {questions[currentQuestion]?.score && (
                            <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-sm rounded-full border border-slate-200">
                              分值：{questions[currentQuestion].score}分
                            </span>
                          )}
                          <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-sm rounded-full border border-slate-200">
                            知识点：{questions[currentQuestion]?.knowledgePoint}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium text-slate-900 leading-relaxed">
                          {questions[currentQuestion]?.question}
                        </h3>
                      </div>

                      <div className="space-y-4 mb-8" role="radiogroup" aria-label="请选择答案">
                        {questions[currentQuestion]?.options.map((option, index) => {
                          const currentAnswer = getCurrentAnswer();
                          return (
                            <motion.button
                              key={index}
                              onClick={() => selectAnswer(index)}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`w-full p-5 border-2 text-left rounded-xl transition-all ${
                                currentAnswer === index
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                              }`}
                              role="radio"
                              aria-checked={currentAnswer === index}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  selectAnswer(index);
                                }
                              }}
                            >
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mr-4 text-sm ${
                                currentAnswer === index
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-slate-800 font-medium">{option}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {showAnalysis === currentQuestion && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8"
                        >
                          <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-amber-900 mb-2">解析</p>
                              <p className="text-amber-800 leading-relaxed">{questions[currentQuestion]?.explanation}</p>
                              <p className="text-amber-700 text-sm mt-3 font-medium">
                                正确答案：{String.fromCharCode(65 + (questions[currentQuestion]?.correctAnswer || 0))}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex gap-4">
                        {showAnalysis !== currentQuestion && getCurrentAnswer() !== undefined && (
                          <motion.button
                            onClick={() => setShowAnalysis(currentQuestion)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-all font-medium"
                          >
                            查看解析
                          </motion.button>
                        )}
                        <motion.button
                          onClick={nextQuestion}
                          disabled={getCurrentAnswer() === undefined}
                          whileHover={{ scale: getCurrentAnswer() !== undefined ? 1.02 : 1 }}
                          whileTap={{ scale: getCurrentAnswer() !== undefined ? 0.98 : 1 }}
                          className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                          {currentQuestion === questions.length - 1 ? '提交测评' : '下一题'}
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center gap-1 justify-center flex-wrap">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const answer = answers.find(a => a.questionId === questions[index].id);
                          if (answer !== undefined || index <= currentQuestion) {
                            setCurrentQuestion(index);
                            setShowAnalysis(null);
                          }
                        }}
                        disabled={index > currentQuestion && !answers.find(a => a.questionId === questions[index].id)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === currentQuestion
                            ? 'bg-blue-500 w-6'
                            : answers.find(a => a.questionId === questions[index].id)
                            ? 'bg-emerald-500'
                            : 'bg-slate-300'
                        } ${index > currentQuestion && !answers.find(a => a.questionId === questions[index].id) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125'}`}
                        aria-label={`跳转到第${index + 1}题`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {step === 'result' && result && studyPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl mb-6 shadow-lg"
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">测评完成!</h2>
                <p className="text-slate-500 text-lg">
                  {subjects.find(s => s.id === selectedSubject)?.name}测评结果
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl p-6 text-white text-center shadow-lg"
                >
                  <div className="text-4xl font-bold">{result.score}%</div>
                  <div className="text-sm opacity-90 mt-1">正确率</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-slate-900">{result.correctAnswers}/{result.totalQuestions}</div>
                  <div className="text-sm text-slate-500 mt-1">答对题数</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-slate-900">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-slate-500 mt-1">答题用时</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`${result.score >= 80 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : result.score >= 60 ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-rose-500 to-pink-500'} rounded-2xl p-6 text-white text-center shadow-lg`}
                >
                  <div className="text-2xl font-bold">{result.studentLevel}</div>
                  <div className="text-sm opacity-90 mt-1">等级评价</div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900">学习目标</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">当前得分</span>
                      <span className="font-bold text-slate-900">{result.earnedScore}分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">目标分数</span>
                      <span className="font-bold text-emerald-600">{result.planSummary.targetScore}分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">预计提升</span>
                      <span className="font-bold text-emerald-600">+{result.planSummary.estimatedImprovement}分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">高考倒计时</span>
                      <span className="font-bold text-amber-600">{result.daysToGaokao}天</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">知识点分析</h3>
                  </div>
                  <div className="space-y-2">
                    {result.weakCategories.length > 0 && (
                      <div className="flex items-center gap-2 text-rose-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">薄弱知识点：{result.weakCategories.join('、')}</span>
                      </div>
                    )}
                    {result.strongCategories.length > 0 && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">强项知识点：{result.strongCategories.join('、')}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600">学习阶段：{result.planSummary.totalStages}个阶段</div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-slate-700" />
                    章节掌握情况
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(result.chapterAnalysis).map(([chapter, data]: [string, any], index) => (
                      <motion.div
                        key={chapter}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-5"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-slate-900">{chapter}</span>
                          <span className={`text-sm font-bold ${data.score >= 80 ? 'text-emerald-600' : data.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                            {data.correct}/{data.total} ({data.score}%)
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${data.score >= 80 ? 'bg-emerald-500' : data.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${data.score}%` }}
                            transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-slate-700" />
                    备考建议
                  </h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{suggestion}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-violet-600" />
                    学习计划概览
                  </h3>
                  <div className="space-y-4">
                    {studyPlan.stages.map((stage, index) => (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="bg-white rounded-xl p-4 border border-slate-100"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="font-semibold text-slate-900">{stage.name}</h4>
                              <p className="text-sm text-slate-500">{stage.durationDays}天 · 重点：{stage.focus}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stage.tasks.slice(0, 3).map((task, idx) => (
                            <span key={task.id} className="px-3 py-1 bg-violet-50 text-violet-700 text-sm rounded-full">
                              {task.subCategory || task.category}
                            </span>
                          ))}
                          {stage.tasks.length > 3 && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                              +{stage.tasks.length - 3}项任务
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {saving && (
                <div className="mb-6 text-center text-slate-600">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
                    正在保存结果...
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-10">
                <motion.button
                  onClick={() => {
                    setSelectedMode(null);
                    setStep('mode');
                  }}
                  disabled={saving}
                  whileHover={{ scale: saving ? 1 : 1.02 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  className="flex-1 py-4 border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  更换模式
                </motion.button>
                <motion.button
                  onClick={resetAssessment}
                  disabled={saving}
                  whileHover={{ scale: saving ? 1 : 1.02 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold rounded-xl hover:shadow-xl transition-all"
                >
                  选择其他科目
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
