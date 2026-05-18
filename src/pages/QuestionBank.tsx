import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { questionBank as initialQuestionBank } from '../utils/questionBank';
import { subjects, difficultyLevels } from '../utils/assessment';
import type { Question } from '../utils/questionBank';
import { 
  Database, Search, Filter, Download, Upload, CheckCircle, XCircle, 
  AlertCircle, Image, FileJson, FileSpreadsheet, RefreshCw, Trash2, 
  Edit, Plus, Eye, EyeOff, ChevronDown, ChevronUp, Check, AlertTriangle,
  Shield, ImageIcon, Link as LinkIcon, Code, FileText, ExternalLink
} from 'lucide-react';

const QuestionBank = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 状态管理
  const [questions, setQuestions] = useState<Question[]>([...initialQuestionBank]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showScreeningModal, setShowScreeningModal] = useState(false);
  const [importResult, setImportResult] = useState<{success: number; duplicate: number; error: number} | null>(null);
  const [screeningResult, setScreeningResult] = useState<any[]>([]);
  const [isScreening, setIsScreening] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [showImageBank, setShowImageBank] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // 权限检查
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-400 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  // 过滤题目
  const filteredQuestions = questions.filter(q => {
    const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchSearch = searchText === '' || 
      q.question.includes(searchText) || 
      q.knowledgePoint.includes(searchText) ||
      q.chapter.includes(searchText);
    return matchSubject && matchDifficulty && matchSearch;
  });

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : subjectId;
  };

  const getDifficultyName = (difficultyId: string) => {
    const difficulty = difficultyLevels.find(d => d.id === difficultyId);
    return difficulty ? difficulty.name : difficultyId;
  };

  const getDifficultyColor = (difficultyId: string) => {
    switch (difficultyId) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // 计算相似度
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().replace(/\s+/g, '');
    const s2 = str2.toLowerCase().replace(/\s+/g, '');
    
    if (s1 === s2) return 100;
    
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 100;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return ((longer.length - editDistance) / longer.length) * 100;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2[i-1] === str1[j-1]) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1,
            matrix[i][j-1] + 1,
            matrix[i-1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // 一键导出
  const handleExport = (format: 'json' | 'csv') => {
    const dataToExport = selectedQuestions.length > 0 
      ? questions.filter(q => selectedQuestions.includes(q.id))
      : filteredQuestions;

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(dataToExport, null, 2);
      filename = `题库导出_${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    } else {
      const headers = ['ID', '科目', '题目', '选项', '正确答案', '难度', '章节', '知识点', '解析'];
      const rows = dataToExport.map(q => [
        q.id,
        getSubjectName(q.subject),
        q.question,
        q.options.join('|'),
        q.correctAnswer,
        getDifficultyName(q.difficulty),
        q.chapter,
        q.knowledgePoint,
        q.explanation
      ]);
      content = [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
      filename = `题库导出_${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 一键导入
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedQuestions: Question[];

        if (file.name.endsWith('.json')) {
          importedQuestions = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          importedQuestions = parseCSV(content);
        } else {
          alert('请上传 JSON 或 CSV 文件');
          return;
        }

        // 自动去重
        const duplicateThreshold = 90;
        let successCount = 0;
        let duplicateCount = 0;
        let errorCount = 0;

        const newQuestions = [...questions];
        const maxId = Math.max(...newQuestions.map(q => q.id), 0);

        importedQuestions.forEach((q, index) => {
          try {
            // 检查是否重复
            const isDuplicate = newQuestions.some(existingQ => 
              calculateSimilarity(existingQ.question, q.question) >= duplicateThreshold
            );

            if (isDuplicate) {
              duplicateCount++;
            } else {
              newQuestions.push({
                ...q,
                id: maxId + index + 1
              });
              successCount++;
            }
          } catch (err) {
            errorCount++;
          }
        });

        setQuestions(newQuestions);
        setImportResult({ success: successCount, duplicate: duplicateCount, error: errorCount });
        setShowImportModal(true);
      } catch (err) {
        alert('文件解析失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseCSV = (content: string): Question[] => {
    const lines = content.split('\n');
    const questions: Question[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const match = line.match(/^"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/);
      if (match) {
        questions.push({
          id: parseInt(match[1]) || i,
          subject: match[2],
          question: match[3],
          options: match[4].split('|'),
          correctAnswer: parseInt(match[5]),
          difficulty: match[6] as any,
          chapter: match[7],
          knowledgePoint: match[8],
          explanation: match[9]
        });
      }
    }
    
    return questions;
  };

  // 一键筛查
  const handleScreening = async () => {
    setIsScreening(true);
    setScreeningResult([]);
    setShowScreeningModal(true);

    const results: any[] = [];
    
    for (const q of questions) {
      const issues: string[] = [];
      
      // 检查题目是否为空
      if (!q.question || q.question.trim().length === 0) {
        issues.push('题目内容为空');
      }
      
      // 检查选项是否完整
      if (!q.options || q.options.length < 4) {
        issues.push('选项不完整（少于4个选项）');
      }
      
      // 检查正确答案是否有效
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        issues.push('正确答案索引无效');
      }
      
      // 检查答案是否正确
      const correctOption = q.options[q.correctAnswer];
      if (correctOption) {
        // 检查答案是否包含明显的否定词
        if (correctOption.includes('错误') || correctOption.includes('不对') || correctOption.includes('不是')) {
          issues.push('正确答案可能标记错误');
        }
      }
      
      // 检查解析是否为空或太短
      if (!q.explanation || q.explanation.trim().length < 10) {
        issues.push('解析内容缺失或过短');
      }
      
      // 检查解析是否提到正确答案
      if (q.explanation && q.explanation.includes('正确答案') && !q.explanation.includes(correctOption)) {
        issues.push('解析中提到正确答案但未说明具体选项');
      }

      if (issues.length > 0) {
        results.push({
          id: q.id,
          subject: getSubjectName(q.subject),
          question: q.question.substring(0, 50) + (q.question.length > 50 ? '...' : ''),
          issues
        });
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setScreeningResult(results);
    setIsScreening(false);
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };

  // 切换单个选择
  const toggleSelect = (id: number) => {
    setSelectedQuestions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 删除选中题目
  const handleDeleteSelected = () => {
    if (selectedQuestions.length === 0) return;
    if (!confirm(`确定要删除选中的 ${selectedQuestions.length} 道题目吗？`)) return;
    
    setQuestions(prev => prev.filter(q => !selectedQuestions.includes(q.id)));
    setSelectedQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  题库管理中心
                </h1>
                <p className="text-blue-300 mt-1">管理和维护所有题目资源</p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowImageBank(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                <ImageIcon className="w-5 h-5" />
                图库管理
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 操作栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/20 relative z-[100]"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* 搜索 */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜索题目、知识点..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 科目筛选 */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-slate-800">全部科目</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id} className="bg-slate-800">
                    {subject.icon} {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 难度筛选 */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-slate-800">全部难度</option>
                {difficultyLevels.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id} className="bg-slate-800">
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 添加题目 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Plus className="w-5 h-5" />
              添加题目
            </motion.button>
          </div>

          {/* 功能按钮 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-blue-300">
              <CheckCircle className="w-4 h-4" />
              已选择 {selectedQuestions.length} / {filteredQuestions.length} 道题目
            </div>
            
            <div className="flex-1"></div>

            <motion.button
              onClick={toggleSelectAll}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              {selectedQuestions.length === filteredQuestions.length ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {selectedQuestions.length === filteredQuestions.length ? '取消全选' : '全选'}
            </motion.button>

            <motion.button
              onClick={handleScreening}
              disabled={isScreening}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              {isScreening ? '筛查中...' : '一键筛查'}
            </motion.button>

            <motion.button
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              一键导入
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              onChange={handleImport}
              className="hidden"
            />

            <div className="relative" ref={exportDropdownRef}>
              <motion.button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                导出
                <ChevronDown className={`w-4 h-4 transition-transform ${showExportDropdown ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {showExportDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-lg shadow-2xl border border-white/20 z-[9999]"
                  >
                    <button
                      onClick={() => {
                        handleExport('json');
                        setShowExportDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-t-lg transition-colors"
                    >
                      <FileJson className="w-4 h-4" />
                      导出 JSON
                    </button>
                    <button
                      onClick={() => {
                        handleExport('csv');
                        setShowExportDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-b-lg transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      导出 CSV
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selectedQuestions.length > 0 && (
              <motion.button
                onClick={handleDeleteSelected}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                删除选中
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 relative z-10"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-400">{questions.length}</div>
            <div className="text-blue-300 text-sm mt-1">总题目数</div>
          </div>
          {subjects.slice(0, 4).map((subject, index) => (
            <div key={subject.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">{questions.filter(q => q.subject === subject.id).length}</div>
              <div className="text-slate-400 text-sm mt-1">{subject.name}</div>
            </div>
          ))}
        </motion.div>

        {/* 题目列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                      onChange={toggleSelectAll}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">科目</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">题目</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">难度</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">知识点</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">章节</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredQuestions.map((question, index) => (
                  <motion.tr
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.005 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => toggleSelect(question.id)}
                        className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">{question.id}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {getSubjectName(question.subject)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-200 max-w-md">
                      <div className="line-clamp-2">{question.question}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                        {getDifficultyName(question.difficulty)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">{question.knowledgePoint}</td>
                    <td className="px-4 py-4 text-sm text-slate-400">{question.chapter}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">编辑</button>
                        <button 
                          onClick={() => {
                            if (confirm('确定要删除这道题目吗？')) {
                              setQuestions(prev => prev.filter(q => q.id !== question.id));
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredQuestions.length === 0 && (
            <div className="text-center py-16">
              <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">没有找到符合条件的题目</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 导入结果弹窗 */}
      <AnimatePresence>
        {showImportModal && importResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowImportModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl z-50 p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">导入完成</h3>
                <div className="space-y-2 text-slate-300">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    成功导入：{importResult.success} 道
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    重复跳过：{importResult.duplicate} 道
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    导入失败：{importResult.error} 道
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowImportModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
              >
                确定
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 筛查结果弹窗 */}
      <AnimatePresence>
        {showScreeningModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowScreeningModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[80vh] bg-slate-800 rounded-2xl shadow-2xl z-50 p-8 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">题目质量筛查报告</h3>
                    <p className="text-slate-400 text-sm">
                      {isScreening ? '正在分析...' : `共发现 ${screeningResult.length} 个问题`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowScreeningModal(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {isScreening ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-amber-400 text-lg">正在筛查题目质量...</p>
                    <p className="text-slate-500 text-sm mt-2">请稍候</p>
                  </div>
                </div>
              ) : screeningResult.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">所有题目质量良好</h4>
                    <p className="text-slate-400">未发现明显问题</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4">
                  {screeningResult.map((result, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-red-400 font-mono text-sm">ID: {result.id}</span>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">{result.subject}</span>
                          </div>
                          <p className="text-slate-300 text-sm">{result.question}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.issues.map((issue: string, i: number) => (
                          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isScreening && (
                <div className="mt-6 flex justify-end">
                  <motion.button
                    onClick={() => setShowScreeningModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
                  >
                    关闭
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 图库管理弹窗 */}
      <AnimatePresence>
        {showImageBank && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowImageBank(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-8xl max-h-[85vh] bg-slate-800 rounded-2xl shadow-2xl z-50 p-8 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">图库 API 管理</h3>
                    <p className="text-slate-400 text-sm">配置和管理图片资源</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowImageBank(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <ImageBankGuide />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// 图库 API 对接说明组件
const ImageBankGuide = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'usage'>('overview');

  return (
    <div>
      {/* 标签页 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview', label: '功能概览', icon: FileText },
          { id: 'config', label: 'API 配置', icon: Code },
          { id: 'usage', label: '使用示例', icon: LinkIcon }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="w-6 h-6 text-blue-400" />
              图库 API 功能说明
            </h4>
            <div className="space-y-4 text-slate-300">
              <p>图库 API 为题库系统提供图片资源管理和对接功能，支持以下特性：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>统一图片资源管理</li>
                <li>题目配图自动关联</li>
                <li>图片 CDN 加速访问</li>
                <li>多图库平台对接支持</li>
                <li>图片上传和压缩优化</li>
                <li>图片使用统计和监控</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h5 className="text-lg font-semibold text-white mb-2">图片上传</h5>
              <p className="text-slate-400 text-sm">支持批量上传图片，自动压缩和格式转换</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                <LinkIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <h5 className="text-lg font-semibold text-white mb-2">智能关联</h5>
              <p className="text-slate-400 text-sm">AI 自动识别图片内容，关联相关题目</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h5 className="text-lg font-semibold text-white mb-2">版权管理</h5>
              <p className="text-slate-400 text-sm">图片版权信息追踪，防止侵权使用</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <h5 className="text-lg font-semibold text-white mb-2">数据统计</h5>
              <p className="text-slate-400 text-sm">图片使用频率分析，优化资源配置</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="space-y-6">
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              API 配置参数
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">API Endpoint</label>
                <input
                  type="text"
                  placeholder="https://api.example.com/v1/images"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="输入您的 API Key"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">图库类型</label>
                <select className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500">
                  <option value="unsplash">Unsplash</option>
                  <option value="pexels">Pexels</option>
                  <option value="pixabay">Pixabay</option>
                  <option value="custom">自定义图库</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
              >
                保存配置
              </motion.button>
            </div>
          </div>

          <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-lg font-semibold text-amber-400 mb-2">配置提示</h5>
                <ul className="text-amber-200/80 text-sm space-y-1">
                  <li>• 请确保 API Key 具有足够的访问权限</li>
                  <li>• 部分图库 API 有调用频率限制</li>
                  <li>• 建议配置图片缓存以提高访问速度</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-6">
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
            <h4 className="text-lg font-semibold text-white mb-4">JavaScript 调用示例</h4>
            <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-emerald-400">
{`// 初始化图库客户端
const imageBank = new ImageBankClient({
  apiKey: 'your-api-key',
  endpoint: 'https://api.example.com'
});

// 搜索图片
const results = await imageBank.search({
  query: '数学公式',
  perPage: 10
});

// 上传图片
const uploadResult = await imageBank.upload({
  file: imageFile,
  metadata: {
    subject: 'math',
    chapter: '函数'
  }
});

// 获取图片 URL
const imageUrl = imageBank.getUrl(results[0].id);`}
              </code>
            </pre>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
            <h4 className="text-lg font-semibold text-white mb-4">REST API 端点</h4>
            <div className="space-y-3">
              {[
                { method: 'GET', endpoint: '/images/search', desc: '搜索图片' },
                { method: 'POST', endpoint: '/images/upload', desc: '上传图片' },
                { method: 'GET', endpoint: '/images/:id', desc: '获取图片详情' },
                { method: 'DELETE', endpoint: '/images/:id', desc: '删除图片' },
                { method: 'GET', endpoint: '/images/stats', desc: '获取使用统计' }
              ].map((api, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                    api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {api.method}
                  </span>
                  <code className="text-slate-300 text-sm flex-1">{api.endpoint}</code>
                  <span className="text-slate-500 text-sm">{api.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
            >
              <ExternalLink className="w-4 h-4" />
              查看完整文档
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
