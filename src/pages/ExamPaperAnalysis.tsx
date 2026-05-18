import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Award, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Target, 
  BookOpen,
  Calendar,
  Image as ImageIcon,
  FileText,
  Download
} from 'lucide-react';
import { subjects } from '../utils/assessment';
import { 
  getExamPaperById, 
  getExamAnalysisByPaperId,
  formatDate,
  getMasteryText,
  getMasteryColor,
  deleteExamPaper
} from '../utils/examPaper';
import type { ExamPaper, ExamPaperAnalysis } from '../types/admin';

interface ExamPaperAnalysisProps {
  paperId?: string;
  onBack?: () => void;
}

export default function ExamPaperAnalysis({ paperId: propPaperId, onBack }: ExamPaperAnalysisProps) {
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [analysis, setAnalysis] = useState<ExamPaperAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // 从URL获取paperId
    let id = propPaperId;
    if (!id) {
      const hash = window.location.hash;
      const match = hash.match(/\/paper\/([^/]+)/);
      if (match) id = match[1];
    }
    
    if (id) {
      const paperData = getExamPaperById(id);
      const analysisData = getExamAnalysisByPaperId(id);
      setPaper(paperData);
      setAnalysis(analysisData);
    }
    
    setLoading(false);
  }, [propPaperId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">加载分析报告...</p>
        </div>
      </div>
    );
  }

  if (!paper || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">未找到分析报告</h2>
          <p className="text-slate-600 mb-6">该试卷分析不存在或已被删除</p>
          <button
            onClick={onBack || (() => window.location.hash = '#/profile')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  const subjectInfo = subjects.find(s => s.id === paper.subject);
  const scorePercentage = Math.round((paper.userScore / paper.totalScore) * 100);
  
  const getScoreColor = () => {
    if (scorePercentage >= 90) return 'from-emerald-500 to-teal-500';
    if (scorePercentage >= 75) return 'from-blue-500 to-cyan-500';
    if (scorePercentage >= 60) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-pink-500';
  };

  const handleDelete = () => {
    if (confirm('确定要删除这份试卷和分析报告吗？')) {
      deleteExamPaper(paper.id);
      window.location.hash = '#/profile';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 头部 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack || (() => window.location.hash = '#/profile')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{paper.title}</h1>
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1">
                  {subjectInfo?.icon}
                  {subjectInfo?.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {paper.examDate}
                </span>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              删除
            </button>
          </div>
        </motion.div>

        {/* 分数卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreColor()} flex items-center justify-center text-white shadow-lg`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{scorePercentage}%</div>
                  <div className="text-xs opacity-90">得分率</div>
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {paper.userScore} <span className="text-2xl text-slate-400">/ {paper.totalScore}</span>
                </div>
                <p className="text-slate-600">{paper.description || '考试分析报告'}</p>
              </div>
            </div>
            {paper.images.length > 0 && (
              <button
                onClick={() => setShowImages(!showImages)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                查看试卷
              </button>
            )}
          </div>
        </motion.div>

        {/* 试卷图片 */}
        {showImages && paper.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8 overflow-hidden"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4">试卷图片</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paper.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`试卷 ${index + 1}`}
                  className="w-full rounded-xl border border-slate-200"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* 知识点分析 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-slate-700" />
            知识点掌握分析
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.knowledgePoints).map(([key, kp], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-900">{kp.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    kp.mastery === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                    kp.mastery === 'good' ? 'bg-blue-100 text-blue-700' :
                    kp.mastery === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {getMasteryText(kp.mastery)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <span>{kp.correctCount}/{kp.totalQuestions} 题正确</span>
                  <span className="text-slate-400">•</span>
                  <span>{kp.score}% 掌握度</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      kp.score >= 90 ? 'bg-emerald-500' :
                      kp.score >= 75 ? 'bg-blue-500' :
                      kp.score >= 60 ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${kp.score}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 章节分析 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-slate-700" />
            章节掌握情况
          </h3>
          <div className="space-y-4">
            {Object.entries(analysis.chapters).map(([key, chapter], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-900">{chapter.name}</span>
                  <span className={`text-sm font-bold ${
                    chapter.score >= 90 ? 'text-emerald-600' :
                    chapter.score >= 75 ? 'text-blue-600' :
                    chapter.score >= 60 ? 'text-amber-600' :
                    'text-rose-600'
                  }`}>
                    {chapter.correctCount}/{chapter.totalQuestions} 题 ({chapter.score}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      chapter.score >= 90 ? 'bg-emerald-500' :
                      chapter.score >= 75 ? 'bg-blue-500' :
                      chapter.score >= 60 ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${chapter.score}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 强弱项和建议 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 强项 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              你的强项
            </h3>
            {analysis.strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.strengths.map((strength, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">继续努力，发现你的强项！</p>
            )}
          </motion.div>

          {/* 弱项 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-rose-600" />
              需要加强
            </h3>
            {analysis.weaknesses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {weakness}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">太棒了！没有明显的弱项！</p>
            )}
          </motion.div>
        </div>

        {/* 学习建议 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl shadow-lg border border-blue-200 p-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            学习建议
          </h3>
          <ul className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-700 leading-relaxed">{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
