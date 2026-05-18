import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Brain, Target, Calendar, CalendarDays, Newspaper,
  TrendingUp, Sparkles, Search, Filter, Eye, Award, Clock, Users,
  Bookmark, Share2, ArrowRight
} from 'lucide-react';
import { newsArticles, newsCategories } from '../data/newsData';
import SectionTitle from '../components/SectionTitle';

export default function News() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 筛选文章
  const filteredArticles = newsArticles.filter(article => {
    const matchCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // 精选文章（取前4个）
  const featuredArticles = newsArticles.filter(a => a.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-fuchsia-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl" />
        
        <div className="relative max-w-8xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-sm font-medium text-blue-600 mb-6">
              <Newspaper className="w-4 h-4" />
              高考资讯
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              高考资讯
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">一网打尽</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              实时更新高考政策、备考指南、学习方法，让每一位考生都能及时掌握最新资讯
            </p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索高考政策、备考指南、学习方法..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-lg transition-all"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* News Categories */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-16 z-40">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            {newsCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {filteredArticles.length > 0 && (
        <section className="py-12">
          <div className="max-w-8xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  精选推荐
                </h2>
                <p className="text-slate-500 mt-1">最受关注的高考资讯</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Featured Article */}
              {filteredArticles.find(a => a.isFeatured) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-1"
                >
                  <div
                    className={`bg-gradient-to-br ${filteredArticles.find(a => a.isFeatured)!.gradient} rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer group`}
                    onClick={() => navigate(`/news/${filteredArticles.find(a => a.isFeatured)!.id}`)}
                  >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:translate-x-1/3 transition-transform duration-700" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {filteredArticles.find(a => a.isFeatured)!.categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-white/80">
                          <CalendarDays className="w-4 h-4" />
                          {filteredArticles.find(a => a.isFeatured)!.date}
                        </span>
                        {filteredArticles.find(a => a.isFeatured)!.isHot && (
                          <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> 热门
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-100 transition-colors">
                        {filteredArticles.find(a => a.isFeatured)!.title}
                      </h3>
                      <p className="text-white/90 mb-6 leading-relaxed">
                        {filteredArticles.find(a => a.isFeatured)!.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {filteredArticles.find(a => a.isFeatured)!.viewCount.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {filteredArticles.find(a => a.isFeatured)!.readTime}
                          </span>
                        </div>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 hover:translate-x-1 transition-all">
                          阅读全文
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Side Featured Articles */}
              <div className="grid grid-cols-1 gap-4">
                {filteredArticles
                  .filter(a => a.isFeatured)
                  .slice(1, 3)
                  .map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => navigate(`/news/${article.id}`)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                          <BookOpen className="w-8 h-8 text-white/50" />
                        </div>
                        <div className="flex-1">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium mb-2 inline-block">
                            {article.categoryName}
                          </span>
                          <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" />
                              {article.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.viewCount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-8xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '128', label: '篇资讯', icon: Newspaper, color: 'text-blue-600' },
              { value: '1.2M', label: '总阅读', icon: Eye, color: 'text-violet-600' },
              { value: '98%', label: '用户好评', icon: Award, color: 'text-emerald-600' },
              { value: '15分钟', label: '平均阅读', icon: Clock, color: 'text-amber-600' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 pb-20">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                最新资讯
              </h2>
              <p className="text-slate-500 mt-1">共 {filteredArticles.length} 篇文章</p>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">没有找到相关资讯</h3>
              <p className="text-slate-500">请尝试调整搜索关键词</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/news/${article.id}`)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/30" />
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {article.isHot && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                            <TrendingUp className="w-3 h-3" /> 热门
                          </span>
                        )}
                        {article.isFeatured && (
                          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                            <Sparkles className="w-3 h-3" /> 推荐
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {article.categoryName}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <CalendarDays className="w-4 h-4" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.viewCount.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:text-slate-600 transition-colors">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:text-slate-600 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        </section>
    </div>
  );
}
