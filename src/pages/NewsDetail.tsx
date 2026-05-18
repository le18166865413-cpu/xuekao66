import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, CalendarDays, Users, Clock, Eye, 
  Bookmark, Share2, ArrowLeft, ArrowRight,
  TrendingUp, Sparkles, MessageCircle, Heart, Copy, Check, Send
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { newsArticles } from '../data/newsData';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = newsArticles.find(a => a.id === id);
  
  const relatedArticles = article 
    ? newsArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 4)
    : [];

  // 收藏状态
  const [isBookmarked, setIsBookmarked] = useState(false);
  // 分享状态
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  // 评论相关
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // 加载收藏状态
    const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')!) : [];
    setIsBookmarked(bookmarks.includes(id));
    
    // 加载评论
    const articleComments = localStorage.getItem(`comments_${id}`) ? JSON.parse(localStorage.getItem(`comments_${id}`)!) : [];
    setComments(articleComments);
    setCommentCount(articleComments.length);
  }, [id]);

  const handleBookmark = () => {
    const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')!) : [];
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((b: string) => b !== id);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarks.push(id!);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title || '',
          text: article?.summary || '',
          url: url
        });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      // 降级方案：复制链接
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    const comment: Comment = {
      id: `comment_${Date.now()}`,
      author: commentAuthor,
      content: newComment,
      date: new Date().toLocaleDateString('zh-CN'),
      likes: 0
    };
    
    const newComments = [...comments, comment];
    setComments(newComments);
    setCommentCount(newComments.length);
    localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
    setNewComment('');
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">文章不存在</h2>
          <p className="text-slate-500 mb-6">该文章可能已被删除或不存在</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/news')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl"
          >
            返回资讯中心
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${article.gradient}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/news')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回资讯中心</span>
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {article.categoryName}
              </span>
              {article.isHot && (
                <span className="px-4 py-1.5 bg-rose-500/80 backdrop-blur-sm text-white text-sm font-bold rounded-full flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> 热门
                </span>
              )}
              {article.isFeatured && (
                <span className="px-4 py-1.5 bg-amber-500/80 backdrop-blur-sm text-white text-sm font-bold rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 推荐
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8 mb-8 text-white/90">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                <span className="text-base">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-base">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-base">{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="text-base">{article.viewCount.toLocaleString()} 阅读</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="text-base">{commentCount} 评论</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookmark}
                className={`px-6 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg ${
                  isBookmarked 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
                {isBookmarked ? '已收藏' : '收藏文章'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {copied ? '已复制' : '分享文章'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6 sm:p-8 lg:p-10"
            >
              <header className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  文章内容
                </h2>
              </header>
              
              <div className="prose prose-slate prose-lg sm:prose-xl max-w-none">
                <style>{`
                  .prose h1 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-top: 2rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.3;
                    letter-spacing: -0.02em;
                  }
                  .prose h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-top: 1.75rem;
                    margin-bottom: 1rem;
                    line-height: 1.35;
                    letter-spacing: -0.01em;
                  }
                  .prose h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #334155;
                    margin-top: 1.5rem;
                    margin-bottom: 0.875rem;
                    line-height: 1.4;
                  }
                  .prose h4 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #475569;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                  }
                  .prose p {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: #475569;
                    margin-bottom: 1.25rem;
                    letter-spacing: 0.01em;
                  }
                  .prose ul, .prose ol {
                    margin-bottom: 1.25rem;
                    padding-left: 1.5rem;
                  }
                  .prose li {
                    font-size: 1rem;
                    line-height: 1.75;
                    color: #475569;
                    margin-bottom: 0.75rem;
                    padding-left: 0.75rem;
                  }
                  .prose li::marker {
                    color: #3b82f6;
                    font-weight: 600;
                  }
                  .prose strong {
                    font-weight: 600;
                    color: #1e293b;
                  }
                  .prose a {
                    color: #2563eb;
                    font-weight: 500;
                    text-decoration: underline;
                    underline-offset: 2px;
                    transition: color 0.2s ease;
                  }
                  .prose a:hover {
                    color: #1d4ed8;
                  }
                  .prose blockquote {
                    border-left: 4px solid #3b82f6;
                    background-color: #f0f9ff;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 0 0.5rem 0.5rem 0;
                  }
                  .prose blockquote p {
                    color: #334155;
                    font-style: italic;
                    margin-bottom: 0;
                  }
                  .prose code {
                    background-color: #f1f5f9;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    color: #374151;
                  }
                  .prose pre {
                    background-color: #1e293b;
                    padding: 1.25rem;
                    border-radius: 0.75rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                  }
                  .prose pre code {
                    background-color: transparent;
                    color: #e2e8f0;
                    padding: 0;
                  }
                  .prose img {
                    border-radius: 0.75rem;
                    margin: 1.5rem 0;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                  }
                  .prose hr {
                    border: none;
                    height: 1px;
                    background: linear-gradient(to right, transparent, #cbd5e1, transparent);
                    margin: 2rem 0;
                  }
                `}</style>
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </motion.article>

            {/* Tags Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-emerald-500" />
                相关标签
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-all cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Author Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 rounded-2xl border border-blue-100 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                <Users className="w-6 h-6 text-violet-500" />
                作者信息
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {article.author[0]}
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900">{article.author}</div>
                  <div className="text-slate-500 text-sm">高考资讯专家</div>
                  <div className="text-blue-600 text-sm mt-1 hover:underline cursor-pointer">查看作者主页</div>
                </div>
              </div>
            </motion.section>

            {/* Comments Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                评论 ({commentCount})
              </h2>
              
              {/* Comment Input */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="您的昵称"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <textarea
                  placeholder="写下您的评论..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400 resize-none"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || !commentAuthor.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  发表评论
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无评论，快来发表第一条评论吧！</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {comment.author[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-900">{comment.author}</span>
                            <span className="text-xs text-slate-400">{comment.date}</span>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{comment.content}</p>
                          <button
                            onClick={() => handleLikeComment(comment.id)}
                            className="flex items-center gap-1 text-sm text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Article Info */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-4">文章信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">分类</span>
                  <span className="font-semibold text-slate-900">{article.categoryName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">发布时间</span>
                  <span className="font-semibold text-slate-900">{article.date}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">阅读时长</span>
                  <span className="font-semibold text-slate-900">{article.readTime}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-500 font-medium">阅读量</span>
                  <span className="font-semibold text-slate-900">{article.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl p-6 text-white"
            >
              <h3 className="font-bold text-lg mb-4">快速操作</h3>
              <div className="space-y-3">
                <button onClick={handleBookmark} className="w-full flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
                  <span>{isBookmarked ? '已收藏' : '收藏文章'}</span>
                </button>
                <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? '链接已复制' : '复制链接'}</span>
                </button>
              </div>
            </motion.section>

            {/* Newsletter */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-2">订阅资讯</h3>
              <p className="text-slate-500 text-sm mb-4">获取最新高考资讯和学习攻略</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400"
                />
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  订阅资讯
                </button>
              </div>
            </motion.section>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-slate-100"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-500" />
              相关推荐
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((related) => (
                <motion.article
                  key={related.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/news/${related.id}`)}
                >
                  <div className={`h-40 bg-gradient-to-br ${related.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white/20" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full text-xs font-medium">
                        {related.categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{related.summary}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{related.date}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {related.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            返回资讯中心
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all"
          >
            回到顶部
            <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}