import { motion } from 'framer-motion';
import { Award, Users, GraduationCap, Sparkles, BookOpen, MessageCircle, TrendingUp, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SafeImage } from './SafeImage';
import { teachers as teachersData } from '../data';
import SectionTitle from './SectionTitle';
import { useTypewriter } from '../hooks/useTypewriter';

/**
 * 师资展示组件 - 增强版
 * 采用卡片式设计，带有悬停效果和渐变装饰
 */
export default function Teachers() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(teachersData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = teachersData.slice(startIndex, endIndex);

  const typewriterText = useTypewriter({
    texts: ['汇聚行业顶尖名师，为每一位学生提供最专业的教学指导'],
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDuration: 4000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage(prev => prev >= totalPages ? 1 : prev + 1);
    }, 4000); // 4秒自动翻页
    return () => clearInterval(timer);
  }, [totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden" aria-labelledby="teachers-heading">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container-custom relative">
        {/* 包装框 */}
        <div className="border-2 border-slate-200 rounded-3xl p-6 lg:p-8 shadow-soft">
          <div className="text-center mb-16">
            <SectionTitle id="teachers-heading">
              师资力量
            </SectionTitle>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 min-h-[28px]">
              {typewriterText}<span className="animate-pulse">|</span>
            </p>
            
            {/* 师资数据 */}
            <div 
              className="flex flex-wrap justify-center gap-8"
            >
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">200+</span>
                <span className="text-slate-500">优秀教师</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-slate-500">平均评分</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">10年+</span>
                <span className="text-slate-500">平均教龄</span>
              </div>
            </div>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="list"
            aria-label="教师团队列表"
          >
            {currentTeachers.map((teacher, index) => (
              <article
                key={teacher.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 
                           hover:border-slate-200 hover:shadow-xl transition-all duration-500"
                role="listitem"
              >
                {/* Image container */}
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative" style={{
                    backgroundImage: teacher.background_image ? `url(${teacher.background_image})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                  <SafeImage
                    src={teacher.avatar || ''}
                    alt={`${teacher.name}老师`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 
                             group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    index={index}
                    icon={User}
                  />
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-blue-500 to-cyan-500 opacity-0 
                                  group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Subject badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 
                                  text-white text-xs font-bold rounded-full shadow-lg`}>
                    {teacher.specialties[0]}
                  </div>
                  
                  {/* Achievement badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <motion.div 
                      className="px-2 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span className="text-xs font-medium text-slate-700">教龄 {teacher.experience}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-slate-900">{teacher.name}</h3>
                    <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{teacher.title}</p>
                  
                  {/* 科目标签 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {teacher.specialties.map((subj, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        {subj}
                      </span>
                    ))}
                  </div>
                  
                  {/* 统计数据 */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="w-3 h-3" />
                      <span>{teacher.studentCount.toLocaleString()}学生</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{teacher.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="上一页"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === page
                        ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-500'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`第${page}页`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="下一页"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
