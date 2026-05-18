import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Users, Clock, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { courses as coursesData, courseCategories, courseGrades, coursesStats } from '../data';
import SectionTitle from '../components/SectionTitle';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Courses() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGrade, setActiveGrade] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const openCourseDetail = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = coursesData.filter(course => {
    const matchCategory = activeCategory === 'all' || course.subject === activeCategory;
    const matchGrade = activeGrade === 'all' || String(course.gradeLevel) === activeGrade;
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchGrade && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden h-[466px]">
        {/* Background decorations */}
        <div className="absolute inset-0">
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
              <span className="text-sm font-medium text-slate-300">精选优质课程</span>
            </motion.div>
            
            <SectionTitle dark={true} noWheat={true}>
              课程中心
            </SectionTitle>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              汇聚名师资源，提供系统化学习方案，助力学业提升
            </p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 mt-10"
            >
              {[
                { value: coursesStats.totalCourses + '+', label: '精品课程' },
                { value: coursesStats.totalStudents, label: '学员信赖' },
                { value: coursesStats.avgRating * 20 + '%', label: '好评率' },
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

      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-6 mb-10"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索课程名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">学科筛选</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {courseCategories.map(cat => (
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
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Grade Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">年级筛选</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {courseGrades.map(grade => (
                <motion.button
                  key={grade.id}
                  onClick={() => setActiveGrade(grade.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeGrade === grade.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {grade.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-500 cursor-pointer"
                onClick={() => openCourseDetail(course.id)}
              >
                {/* Image/Preview */}
                <div className="relative h-48 overflow-hidden">
                  {course.thumbnailUrl ? (
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      crossOrigin="anonymous"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                      <BookOpen className="w-12 h-12 text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.isNew && (
                      <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        NEW
                      </span>
                    )}
                    {course.isHot && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                        HOT
                      </span>
                    )}
                    {course.isFeatured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                        推荐
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  {course.subtitle && (
                    <p className="text-sm text-slate-500 mb-3">{course.subtitle}</p>
                  )}
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {course.teacher.name[0]}
                    </span>
                    {course.teacher.name} · {course.teacher.title}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrollmentCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.lessonCount}节
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">¥{course.price}</span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-slate-400 line-through">¥{course.originalPrice}</span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      查看详情
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">没有找到相关课程</h3>
            <p className="text-slate-500">请尝试调整筛选条件或搜索关键词</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
