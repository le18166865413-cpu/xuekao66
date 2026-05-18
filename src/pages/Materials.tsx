import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Filter, Search, CheckCircle, BookOpen, GraduationCap, Sparkles, ArrowRight, Eye, Star, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'all', name: '全部', icon: '📚', count: 128 },
  { id: 'math', name: '数学', icon: '📐', count: 35 },
  { id: 'english', name: '英语', icon: '🔤', count: 28 },
  { id: 'physics', name: '物理', icon: '⚡', count: 22 },
  { id: 'chemistry', name: '化学', icon: '⚗️', count: 18 },
  { id: 'chinese', name: '语文', icon: '📖', count: 15 },
  { id: 'history', name: '历史', icon: '📜', count: 10 },
];

const types = [
  { id: 'all', name: '全部类型', icon: '📁' },
  { id: 'exam', name: '真题试卷', icon: '📝' },
  { id: 'notes', name: '学霸笔记', icon: '📓' },
  { id: 'formula', name: '公式大全', icon: '📊' },
  { id: 'guide', name: '备考指南', icon: '🎯' },
];

const materials = [
  { 
    id: 1, 
    title: '2024高考数学真题汇编', 
    category: 'math', 
    type: 'exam', 
    downloads: 12580, 
    size: '15.2MB',
    rating: 4.9,
    isHot: true,
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 2, 
    title: '高中英语词汇速记手册', 
    category: 'english', 
    type: 'notes', 
    downloads: 8960, 
    size: '8.5MB',
    rating: 4.8,
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    id: 3, 
    title: '物理公式大全（含推导过程）', 
    category: 'physics', 
    type: 'formula', 
    downloads: 7230, 
    size: '5.3MB',
    rating: 4.9,
    isHot: true,
    gradient: 'from-orange-500 to-pink-500'
  },
  { 
    id: 4, 
    title: '化学方程式汇总与记忆技巧', 
    category: 'chemistry', 
    type: 'formula', 
    downloads: 6540, 
    size: '4.8MB',
    rating: 4.7,
    gradient: 'from-emerald-500 to-teal-500'
  },
  { 
    id: 5, 
    title: '高考英语阅读理解技巧大全', 
    category: 'english', 
    type: 'guide', 
    downloads: 5890, 
    size: '6.2MB',
    rating: 4.8,
    gradient: 'from-amber-500 to-orange-500'
  },
  { 
    id: 6, 
    title: '数学压轴题解析与秒杀技巧', 
    category: 'math', 
    type: 'exam', 
    downloads: 9870, 
    size: '12.1MB',
    rating: 4.9,
    isHot: true,
    gradient: 'from-rose-500 to-red-500'
  },
  { 
    id: 7, 
    title: '语文古诗词鉴赏模板', 
    category: 'chinese', 
    type: 'notes', 
    downloads: 4520, 
    size: '3.5MB',
    rating: 4.6,
    gradient: 'from-indigo-500 to-blue-500'
  },
  { 
    id: 8, 
    title: '历史时间轴与重大事件梳理', 
    category: 'history', 
    type: 'guide', 
    downloads: 3210, 
    size: '7.8MB',
    rating: 4.5,
    gradient: 'from-cyan-500 to-blue-500'
  },
];

const stats = [
  { value: '5000+', label: '资料总量', icon: FileText },
  { value: '100万+', label: '下载次数', icon: Download },
  { value: '98%', label: '好评率', icon: Star },
  { value: '每日更新', label: '持续更新中', icon: TrendingUp },
];

export default function Materials() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<number>>(new Set());

  const handleDownload = (id: number) => {
    if (downloadedIds.has(id)) return;
    
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => new Set([...prev, id]));
    }, 2000);
  };

  const filteredMaterials = materials.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchType = activeType === 'all' || item.type === activeType;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchType && matchSearch;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden h-[466px]">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-8xl mx-auto px-4 py-20 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 self-center"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Free Resources</span>
          </motion.div>
          
          <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
              >
                免费学习资料
              </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-8"
          >
            海量学习资料免费下载，真题试卷、学霸笔记、公式大全，助力高效备考
          </motion.p>
          
          {/* 统计数据 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* 筛选器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-10"
        >
          {/* 搜索框 */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索学习资料..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl transition-all"
            />
          </div>

          {/* 学科筛选 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">按学科</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-white/80' : 'text-slate-400'}`}>
                    {cat.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 类型筛选 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">按类型</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeType === type.id
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 资料列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* 顶部渐变条 */}
                <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />
                
                <div className="p-6">
                  {/* 头部信息 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    {item.isHot && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow">
                        热门
                      </span>
                    )}
                  </div>

                  {/* 标题和描述 */}
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {getCategoryInfo(item.category).name}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {types.find(t => t.id === item.type)?.name}
                    </span>
                  </div>

                  {/* 统计信息 */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {item.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {Math.floor(item.downloads * 2.5).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {item.rating}
                    </span>
                  </div>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-400">{item.size}</span>
                    <motion.button
                      onClick={() => handleDownload(item.id)}
                      disabled={downloadingId === item.id || downloadedIds.has(item.id)}
                      whileHover={{ scale: downloadedIds.has(item.id) ? 1 : 1.05 }}
                      whileTap={{ scale: downloadedIds.has(item.id) ? 1 : 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all ${
                        downloadedIds.has(item.id)
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : downloadingId === item.id
                          ? 'bg-slate-700 text-white cursor-not-allowed'
                          : `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                      }`}
                    >
                      {downloadedIds.has(item.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          已下载
                        </>
                      ) : downloadingId === item.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          下载中...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          免费下载
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">没有找到相关资料</h3>
            <p className="text-slate-500 mb-6">请尝试调整筛选条件或搜索关键词</p>
            <motion.button
              onClick={() => {
                setActiveCategory('all');
                setActiveType('all');
                setSearchQuery('');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              重置筛选
            </motion.button>
          </motion.div>
        )}

        {/* 底部CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-slate-900">更多资料即将上线</h3>
            </div>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              我们持续更新更多优质学习资料，关注我们获取最新资料推送
            </p>
            <motion.a
              href="#/courses"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              浏览全部课程
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
