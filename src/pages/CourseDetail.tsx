import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock, ChevronLeft, ShoppingCart, Play, CheckCircle, Calendar, ArrowLeft, BookOpen, Award, MessageCircle, Sparkles } from 'lucide-react';
import { courses as coursesData, teachers } from '../data';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);

  // 找到对应的课程
  const course = coursesData.find(c => c.id === id || String(c.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBuyNow = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">课程不存在</h2>
          <p className="text-slate-500 mb-6">该课程可能已下架或不存在</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl"
          >
            返回课程中心
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-8xl mx-auto px-4 py-16">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回课程中心</span>
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Tags */}
              <div className="flex gap-2 mb-4">
                {course.isNew && (
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}
                {course.isHot && (
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                    HOT
                  </span>
                )}
                {course.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>
              
              {course.subtitle && (
                <p className="text-lg text-slate-300 mb-6">
                  {course.subtitle}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{course.enrollmentCount.toLocaleString()}人学习</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-white">{course.rating}分</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{course.duration}</span>
                </div>
              </div>

              {/* Teacher */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {course.teacher.name[0]}
                </div>
                <div>
                  <div className="font-medium text-white">{course.teacher.name}</div>
                  <div className="text-slate-400 text-sm">{course.teacher.title}</div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-white">¥{course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-lg text-slate-400 line-through">¥{course.originalPrice}</span>
                )}
                {course.isDiscount && (
                  <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-sm font-medium rounded-full">
                    限时特惠
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <motion.button
                  onClick={handleBuyNow}
                  disabled={addedToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-4 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                    addedToCart 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      已加入购物车
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      立即购买
                    </>
                  )}
                </motion.button>
                <motion.button
                  className="px-8 py-4 font-semibold border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/10 rounded-xl transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  免费试听
                </motion.button>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {course.thumbnailUrl ? (
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  crossOrigin="anonymous"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl shadow-2xl flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/20" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-8xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                课程简介
              </h2>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>{course.description}</p>
              </div>
            </motion.section>

            {/* Learning Objectives */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-500" />
                学习目标
              </h2>
              <ul className="space-y-4">
                {course.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-slate-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Course Syllabus */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-violet-500" />
                课程大纲
              </h2>
              <div className="space-y-4">
                {course.syllabus.map((lesson: any, index: number) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-500 text-white rounded-full font-bold text-sm flex-shrink-0">
                      {lesson.order}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{lesson.title}</div>
                      <div className="text-sm text-slate-500">{lesson.description}</div>
                    </div>
                    <div className="text-sm text-slate-400">{lesson.duration}</div>
                    {lesson.isFree && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                        免费
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Teacher Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6"
            >
              <h3 className="font-bold text-slate-900 mb-4">讲师介绍</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {course.teacher.name[0]}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{course.teacher.name}</div>
                  <div className="text-slate-500 text-sm">{course.teacher.title}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{course.teacher.bio}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-slate-100">
                <div>
                  <div className="text-xl font-bold text-slate-900">{course.teacher.courseCount}</div>
                  <div className="text-xs text-slate-500">课程</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{(course.teacher.studentCount / 1000).toFixed(0)}k+</div>
                  <div className="text-xs text-slate-500">学生</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{course.teacher.rating}</div>
                  <div className="text-xs text-slate-500">评分</div>
                </div>
              </div>
            </motion.div>

            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6"
            >
              <h3 className="font-bold text-slate-900 mb-4">课程信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">授课教师</span>
                  <span className="text-slate-900">{course.teacher.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">课程时长</span>
                  <span className="text-slate-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">课时数量</span>
                  <span className="text-slate-900">{course.lessonCount}节</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">适合年级</span>
                  <span className="text-slate-900">{course.grade}</span>
                </div>
                {course.startDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">开课时间</span>
                    <span className="text-slate-900">{course.startDate}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">¥{course.price}</div>
                <p className="text-slate-500 text-sm mb-4">立即加入，开启学习之旅</p>
                <motion.button
                  onClick={handleBuyNow}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  立即购买
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
