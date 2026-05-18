import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Award, Clock, CheckCircle, XCircle, 
  BarChart3, TrendingUp, AlertCircle, ChevronDown, ChevronUp, Info,
  Download, FileText, FileCode, File, Printer, ChevronRight, X
} from 'lucide-react';
import { getAssessmentById, subjects } from '../utils/assessment';
import type { Assessment } from '../utils/assessment';

function AssessmentDetail() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const id = window.location.hash.split('/').pop();
    if (id) {
      const data = getAssessmentById(id);
      setAssessment(data);
      setLoading(false);
    }
  }, []);

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getWrongQuestions = () => {
    if (!assessment) return [];
    return assessment.results.filter(r => !r.isCorrect);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-rose-100';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: 'txt' | 'html' | 'md') => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const subject = subjects.find(s => s.id === assessment?.subject);
    const wrongQuestions = getWrongQuestions();
    let content = '';
    let filename = '';

    if (format === 'txt') {
      content = `错题本 - ${subject?.name || '测评'}\n`;
      content += `生成时间: ${formatDate(Date.now())}\n`;
      content += `错题数量: ${wrongQuestions.length} 题\n`;
      content += '='.repeat(60) + '\n\n';

      wrongQuestions.forEach((question, index) => {
        content += `第 ${index + 1} 题\n`;
        content += `题目: ${question.question}\n`;
        content += `你的答案: ${question.userAnswer >= 0 ? ['A', 'B', 'C', 'D'][question.userAnswer] : '未作答'}\n`;
        content += `正确答案: ${['A', 'B', 'C', 'D'][question.correctAnswer]}\n`;
        content += `解析: ${question.explanation}\n`;
        content += '-'.repeat(60) + '\n\n';
      });
      filename = `错题本_${subject?.name}_${Date.now()}.txt`;
      downloadFile(content, filename, 'text/plain;charset=utf-8');
    } else if (format === 'html') {
      content = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>错题本 - ${subject?.name || '测评'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; }
    .meta { color: #64748b; margin-bottom: 2rem; }
    .question { background: #f8fafc; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    .question-number { background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: bold; margin-right: 0.5rem; }
    .wrong-answer { color: #dc2626; font-weight: bold; }
    .correct-answer { color: #16a34a; font-weight: bold; }
    .explanation { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 0.75rem; margin-top: 0.5rem; }
    @media print { body { padding: 1rem; } }
  </style>
</head>
<body>
  <h1>错题本 - ${subject?.name || '测评'}</h1>
  <div class="meta">生成时间: ${formatDate(Date.now())} | 错题数量: ${wrongQuestions.length} 题</div>
  ${wrongQuestions.map((question, index) => `
  <div class="question">
    <p><span class="question-number">第 ${index + 1} 题</span>${question.question}</p>
    <p>你的答案: <span class="wrong-answer">${question.userAnswer >= 0 ? ['A', 'B', 'C', 'D'][question.userAnswer] : '未作答'}</span></p>
    <p>正确答案: <span class="correct-answer">${['A', 'B', 'C', 'D'][question.correctAnswer]}</span></p>
    <div class="explanation"><strong>解析:</strong> ${question.explanation}</div>
  </div>
  `).join('')}
</body>
</html>`;
      filename = `错题本_${subject?.name}_${Date.now()}.html`;
      downloadFile(content, filename, 'text/html;charset=utf-8');
    } else if (format === 'md') {
      content = `# 错题本 - ${subject?.name || '测评'}\n\n`;
      content += `> 生成时间: ${formatDate(Date.now())} | 错题数量: ${wrongQuestions.length} 题\n\n`;

      wrongQuestions.forEach((question, index) => {
        content += `## 第 ${index + 1} 题\n\n`;
        content += `**题目:** ${question.question}\n\n`;
        content += `**你的答案:** ~~${question.userAnswer >= 0 ? ['A', 'B', 'C', 'D'][question.userAnswer] : '未作答'}~~\n\n`;
        content += `**正确答案:** **${['A', 'B', 'C', 'D'][question.correctAnswer]}**\n\n`;
        content += `**解析:**\n\n${question.explanation}\n\n`;
        content += `---\n\n`;
      });
      filename = `错题本_${subject?.name}_${Date.now()}.md`;
      downloadFile(content, filename, 'text/markdown;charset=utf-8');
    }
    
    setIsExporting(false);
    setShowExportModal(false);
  };

  const handlePrint = () => {
    const subject = subjects.find(s => s.id === assessment?.subject);
    const wrongQuestions = getWrongQuestions();
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>错题本 - ${subject?.name || '测评'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; }
    .meta { color: #64748b; margin-bottom: 2rem; }
    .question { background: #f8fafc; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    .question-number { background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: bold; margin-right: 0.5rem; }
    .wrong-answer { color: #dc2626; font-weight: bold; }
    .correct-answer { color: #16a34a; font-weight: bold; }
    .explanation { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 0.75rem; margin-top: 0.5rem; }
    @media print { body { padding: 1rem; } }
  </style>
</head>
<body>
  <h1>错题本 - ${subject?.name || '测评'}</h1>
  <div class="meta">生成时间: ${formatDate(Date.now())} | 错题数量: ${wrongQuestions.length} 题</div>
  ${wrongQuestions.map((question, index) => `
  <div class="question">
    <p><span class="question-number">第 ${index + 1} 题</span>${question.question}</p>
    <p>你的答案: <span class="wrong-answer">${question.userAnswer >= 0 ? ['A', 'B', 'C', 'D'][question.userAnswer] : '未作答'}</span></p>
    <p>正确答案: <span class="correct-answer">${['A', 'B', 'C', 'D'][question.correctAnswer]}</span></p>
    <div class="explanation"><strong>解析:</strong> ${question.explanation}</div>
  </div>
  `).join('')}
</body>
</html>`);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">评估记录不存在</h3>
          <p className="text-slate-500 mb-6">该评估记录已被删除或不存在</p>
          <button
            onClick={() => window.location.hash = '#/profile'}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            返回个人中心
          </button>
        </div>
      </div>
    );
  }

  const subject = subjects.find(s => s.id === assessment.subject);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => window.location.hash = '#/profile'}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回评估历史
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-6"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${subject?.gradient || 'from-blue-500 to-violet-500'} rounded-3xl mb-6 shadow-lg`}
              >
                <Award className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                {subject?.name}测评详情
              </h1>
              <p className="text-slate-500">{formatDate(assessment.completedAt)}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl p-6 text-white text-center shadow-lg"
              >
                <div className="text-4xl font-bold">{assessment.score}%</div>
                <div className="text-sm opacity-90 mt-1">正确率</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-slate-900">
                  {assessment.correctAnswers}/{assessment.totalQuestions}
                </div>
                <div className="text-sm text-slate-500 mt-1">答对题数</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6" />
                  {formatTime(assessment.timeSpent)}
                </div>
                <div className="text-sm text-slate-500 mt-1">答题用时</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${assessment.score >= 80 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : assessment.score >= 60 ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-rose-500 to-pink-500'} rounded-2xl p-6 text-white text-center shadow-lg`}
              >
                <div className="text-2xl font-bold">
                  {assessment.score >= 80 ? '优秀' : assessment.score >= 60 ? '良好' : '需加强'}
                </div>
                <div className="text-sm opacity-90 mt-1">等级评价</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-slate-700" />
              章节掌握情况
            </h2>
            <div className="space-y-4">
              {Object.entries(assessment.chapterAnalysis).map(([chapter, data], index) => (
                <motion.div
                  key={chapter}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
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
                      transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-slate-700" />
                答题详情
              </h2>
              <motion.button
                onClick={() => setShowExportModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                disabled={getWrongQuestions().length === 0}
                style={{ opacity: getWrongQuestions().length === 0 ? 0.5 : 1, cursor: getWrongQuestions().length === 0 ? 'not-allowed' : 'pointer' }}
              >
                <Download className="w-4 h-4" />
                一键导出错题
                {getWrongQuestions().length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {getWrongQuestions().length}题
                  </span>
                )}
              </motion.button>
            </div>
            <div className="space-y-4">
              {assessment.results.map((result, index) => (
                <motion.div
                  key={result.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`border rounded-xl overflow-hidden ${result.isCorrect ? 'border-emerald-200' : 'border-rose-200'}`}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${result.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-slate-900 flex-1 text-left line-clamp-1">
                        {result.question}
                      </span>
                      {result.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                    {expandedQuestions.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  {expandedQuestions.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4"
                    >
                      <div className="bg-slate-50 rounded-xl p-4 mt-2">
                        <p className="text-slate-900 mb-4">{result.question}</p>
                        <div className="space-y-3 mb-4">
                          <div className={`flex items-center gap-3 p-3 rounded-lg ${result.userAnswer === 0 ? (result.isCorrect ? 'bg-emerald-100 border border-emerald-200' : 'bg-rose-100 border border-rose-200') : 'bg-white border border-slate-200'}`}>
                            <span className="font-medium">A.</span>
                            <span className="flex-1">选项A</span>
                            {result.userAnswer === 0 && !result.isCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-500" />
                            )}
                            {result.correctAnswer === 0 && result.isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                          <div className={`flex items-center gap-3 p-3 rounded-lg ${result.userAnswer === 1 ? (result.isCorrect ? 'bg-emerald-100 border border-emerald-200' : 'bg-rose-100 border border-rose-200') : 'bg-white border border-slate-200'}`}>
                            <span className="font-medium">B.</span>
                            <span className="flex-1">选项B</span>
                            {result.userAnswer === 1 && !result.isCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-500" />
                            )}
                            {result.correctAnswer === 1 && result.isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                          <div className={`flex items-center gap-3 p-3 rounded-lg ${result.userAnswer === 2 ? (result.isCorrect ? 'bg-emerald-100 border border-emerald-200' : 'bg-rose-100 border border-rose-200') : 'bg-white border border-slate-200'}`}>
                            <span className="font-medium">C.</span>
                            <span className="flex-1">选项C</span>
                            {result.userAnswer === 2 && !result.isCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-500" />
                            )}
                            {result.correctAnswer === 2 && result.isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                          <div className={`flex items-center gap-3 p-3 rounded-lg ${result.userAnswer === 3 ? (result.isCorrect ? 'bg-emerald-100 border border-emerald-200' : 'bg-rose-100 border border-rose-200') : 'bg-white border border-slate-200'}`}>
                            <span className="font-medium">D.</span>
                            <span className="flex-1">选项D</span>
                            {result.userAnswer === 3 && !result.isCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-500" />
                            )}
                            {result.correctAnswer === 3 && result.isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                            <Info className="w-4 h-4" />
                            解析
                          </div>
                          <p className="text-slate-700">{result.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">导出错题</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="p-6">
                {getWrongQuestions().length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">暂无错题</h4>
                    <p className="text-slate-500">本次测评全部正确，继续保持！</p>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-600 mb-6">
                      本次测评共有 <span className="font-bold text-rose-600">{getWrongQuestions().length}</span> 道错题，选择导出格式：
                    </p>
                    
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => handleExport('txt')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isExporting}
                        className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900">纯文本格式</div>
                          <div className="text-sm text-slate-500">.txt 文件，简洁的文本格式</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleExport('html')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isExporting}
                        className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <FileCode className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900">HTML 格式</div>
                          <div className="text-sm text-slate-500">.html 文件，可直接用浏览器打开</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleExport('md')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isExporting}
                        className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <File className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900">Markdown 格式</div>
                          <div className="text-sm text-slate-500">.md 文件，适合笔记软件使用</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </motion.button>
                      
                      <div className="pt-3 border-t border-slate-200">
                        <motion.button
                          onClick={handlePrint}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isExporting}
                          className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                            <Printer className="w-6 h-6 text-slate-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold text-slate-900">直接打印</div>
                            <div className="text-sm text-slate-500">打开打印预览，打印错题本</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {isExporting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/80 flex items-center justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-700 font-medium">正在导出...</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AssessmentDetail;