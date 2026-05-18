import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Save,
  FileText,
  Calendar,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { subjects } from '../utils/assessment';
import { 
  saveExamPaper, 
  generateExamAnalysis, 
  saveExamAnalysis,
  generateMockQuestions,
  formatDate 
} from '../utils/examPaper';
import type { ExamPaper, QuestionItem } from '../types/admin';

interface ExamPaperUploadProps {
  onBack?: () => void;
  onAnalysisComplete?: (paperId: string) => void;
}

export default function ExamPaperUpload({ onBack, onAnalysisComplete }: ExamPaperUploadProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<'basic' | 'upload' | 'questions' | 'complete'>('basic');
  const [loading, setLoading] = useState(false);
  
  // 基本信息
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [totalScore, setTotalScore] = useState<number>(100);
  const [userScore, setUserScore] = useState<number>(0);
  
  // 图片上传
  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  
  // 题目
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const goToNextStep = () => {
    if (step === 'basic') {
      if (!selectedSubject || !title) return;
      // 生成模拟题目数据
      const mockQuestions = generateMockQuestions(selectedSubject, totalScore);
      // 根据得分调整正确率
      const percentage = Math.min(userScore / totalScore, 1);
      const adjustedQuestions = mockQuestions.map((q, i) => ({
        ...q,
        isCorrect: Math.random() < percentage,
        userScore: Math.random() < percentage ? q.score : 0
      }));
      // 重新计算总分
      let currentScore = adjustedQuestions.reduce((sum, q) => sum + q.userScore, 0);
      while (currentScore < userScore && adjustedQuestions.some(q => !q.isCorrect)) {
        const q = adjustedQuestions.find(q => !q.isCorrect);
        if (q) {
          q.isCorrect = true;
          q.userScore = q.score;
          currentScore += q.score;
        }
      }
      setQuestions(adjustedQuestions);
      setStep('upload');
    } else if (step === 'upload') {
      setStep('questions');
    } else if (step === 'questions') {
      submitPaper();
    }
  };

  const goToPrevStep = () => {
    if (step === 'upload') setStep('basic');
    else if (step === 'questions') setStep('upload');
  };

  const submitPaper = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // 创建试卷
      const paper: ExamPaper = {
        id: `paper_${Date.now()}`,
        userId: user.id,
        subject: selectedSubject,
        title,
        description,
        examDate,
        totalScore,
        userScore,
        images,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      saveExamPaper(paper);
      
      // 生成分析
      const analysis = generateExamAnalysis(paper, questions);
      saveExamAnalysis(analysis);
      
      setStep('complete');
      
      // 自动跳转到分析页面
      setTimeout(() => {
        if (onAnalysisComplete) {
          onAnalysisComplete(paper.id);
        } else {
          window.location.hash = `#/paper/${paper.id}`;
        }
      }, 2000);
    } catch (error) {
      console.error('提交试卷失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = (index: number, updates: Partial<QuestionItem>) => {
    setQuestions(prev => prev.map((q, i) => 
      i === index ? { ...q, ...updates } : q
    ));
  };

  const addQuestion = () => {
    const newQuestion: QuestionItem = {
      id: `q_${Date.now()}`,
      questionNumber: `${questions.length + 1}`,
      knowledgePoint: '未分类',
      chapter: '未分类',
      difficulty: 'medium',
      score: 5,
      userScore: 0,
      isCorrect: false
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const getSubjectInfo = () => subjects.find(s => s.id === selectedSubject);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 头部 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack || (() => window.location.hash = '#/assessment')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">上传历史试卷</h1>
          <p className="text-slate-600">上传你的考试试卷，AI将为你生成详细的分析报告</p>
        </motion.div>

        {/* 步骤指示器 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {[
              { key: 'basic', label: '基本信息', icon: FileText },
              { key: 'upload', label: '上传试卷', icon: Upload },
              { key: 'questions', label: '题目分析', icon: Target },
              { key: 'complete', label: '完成', icon: CheckCircle }
            ].map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.key;
              const isCompleted = 
                (step === 'upload' && index < 1) ||
                (step === 'questions' && index < 2) ||
                (step === 'complete' && index < 3);
              
              return (
                <div key={stepItem.key} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {stepItem.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 步骤内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
        >
          {/* 步骤1：基本信息 */}
          {step === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">填写试卷基本信息</h2>
              
              {/* 科目选择 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">选择科目</label>
                <div className="grid grid-cols-3 gap-3">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSubject === subject.id
                          ? `border-blue-500 bg-gradient-to-br ${subject.lightBg}`
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{subject.icon}</div>
                      <div className={`font-medium ${
                        selectedSubject === subject.id ? 'text-blue-700' : 'text-slate-700'
                      }`}>
                        {subject.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 试卷标题 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">试卷标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：2024年高三第一次模拟考试"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* 描述 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">备注（可选）</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="添加一些备注信息..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* 日期和分数 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    考试日期
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">总分</label>
                  <input
                    type="number"
                    value={totalScore}
                    onChange={(e) => setTotalScore(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">你的得分</label>
                  <input
                    type="number"
                    value={userScore}
                    onChange={(e) => setUserScore(Number(e.target.value))}
                    max={totalScore}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={goToNextStep}
                  disabled={!selectedSubject || !title}
                  whileHover={{ scale: !selectedSubject || !title ? 1 : 1.02 }}
                  whileTap={{ scale: !selectedSubject || !title ? 1 : 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  下一步
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </motion.button>
              </div>
            </div>
          )}

          {/* 步骤2：上传试卷 */}
          {step === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">上传试卷图片</h2>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  dragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className={`w-16 h-16 mx-auto mb-4 ${dragOver ? 'text-blue-500' : 'text-slate-400'}`} />
                <p className="text-lg text-slate-600 mb-2">拖拽图片到这里，或点击上传</p>
                <p className="text-sm text-slate-400 mb-4">支持 JPG、PNG 格式</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-5 h-5" />
                  选择文件
                </label>
              </div>

              {/* 图片预览 */}
              {images.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-slate-700 mb-4">已上传的图片</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`试卷 ${index + 1}`}
                          className="w-full h-40 object-cover rounded-xl border border-slate-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <motion.button
                  onClick={goToPrevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  上一步
                </motion.button>
                <motion.button
                  onClick={goToNextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  下一步
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </motion.button>
              </div>
            </div>
          )}

          {/* 步骤3：题目分析 */}
          {step === 'questions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">核对题目信息</h2>
                <button
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  添加题目
                </button>
              </div>
              
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center font-medium text-sm">
                          {q.questionNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                              q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {q.difficulty === 'easy' ? '基础' : q.difficulty === 'medium' ? '中档' : '难题'}
                            </span>
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              q.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {q.isCorrect ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {q.isCorrect ? '正确' : '错误'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">知识点</label>
                        <input
                          type="text"
                          value={q.knowledgePoint}
                          onChange={(e) => updateQuestion(index, { knowledgePoint: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">章节</label>
                        <input
                          type="text"
                          value={q.chapter}
                          onChange={(e) => updateQuestion(index, { chapter: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">分值</label>
                        <input
                          type="number"
                          value={q.score}
                          onChange={(e) => updateQuestion(index, { score: Number(e.target.value) })}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">得分</label>
                        <input
                          type="number"
                          value={q.userScore}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateQuestion(index, { 
                              userScore: val,
                              isCorrect: val >= q.score
                            });
                          }}
                          max={q.score}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <motion.button
                  onClick={goToPrevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  上一步
                </motion.button>
                <motion.button
                  onClick={submitPaper}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      生成分析中...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      生成分析报告
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}

          {/* 步骤4：完成 */}
          {step === 'complete' && (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">分析报告已生成！</h2>
              <p className="text-slate-600 mb-8">你的试卷分析已完成，正在跳转查看详情...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
