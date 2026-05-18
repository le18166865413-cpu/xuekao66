import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Users, Star, BookOpen } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { courses as coursesData } from '../data';

/**
 * 热门课程展示组件
 * 采用卡片式设计，带有渐变标签和悬停动效
 */
export default function Courses() {
  const navigate = useNavigate();
  
  // 只展示前6门热门课程
  const displayCourses = coursesData.slice(0, 6);

  const openCourseDetail = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden" aria-labelledby="courses-heading">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-50/50 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container-custom relative">
        {/* 包装框 */}
        <div className="border-2 border-slate-200 rounded-3xl p-6 lg:p-8 shadow-soft">
          <div className="flex flex-col items-center text-center mb-16 gap-6">
            {/* 徽章标签 */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600">
              Popular Courses
            </span>
            
            {/* 标题区域 - 包含麦穗 */}
            <div className="inline-flex items-center justify-center gap-4">
              <img
                src="/images/wheat-left.png"
                alt=""
                className="w-auto h-[48px] object-contain"
                style={{ transform: 'rotate(-15deg)' }}
                aria-hidden="true"
              />
              <h2 
                id="courses-heading"
                className="text-display-sm lg:text-display-md font-bold text-slate-900 tracking-tight m-0"
              >
                热门课程
              </h2>
              <img
                src="/images/wheat-right.png"
                alt=""
                className="w-auto h-[48px] object-contain"
                style={{ transform: 'rotate(15deg)' }}
                aria-hidden="true"
              />
            </div>
            
            {/* 查看全部按钮 - 单独一行 */}
            <button
              onClick={() => navigate('/courses')}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 
                         rounded-full text-sm font-medium text-slate-700 hover:border-slate-300 
                         hover:bg-slate-50 transition-all duration-300 focus:outline-none 
                         focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              aria-label="查看全部课程"
            >
              查看全部
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </button>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8"
            role="list"
            aria-label="热门课程列表"
          >
            {displayCourses.map((course, index) => {
              // 确定课程标签
              let courseTag = '精选';
              if (course.isHot) courseTag = '热门';
              else if (course.isNew) courseTag = '新课';
              else if (course.isFeatured) courseTag = '推荐';

              return (
                <article
                  key={course.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 
                             hover:border-slate-200 hover:shadow-soft-lg transition-all duration-500 cursor-pointer"
                  role="listitem"
                  onClick={() => openCourseDetail(course.id)}
                >
                  {/* Image container */}
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <SafeImage
                      src={''}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      index={index}
                      icon={BookOpen}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Tag */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${course.gradient} 
                                    text-white text-xs font-medium rounded-full shadow-lg`}>
                      {courseTag}
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                      <span className="text-sm font-semibold text-slate-700">{course.rating}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{course.teacher.name}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" aria-hidden="true" />
                            {course.enrollmentCount.toLocaleString()}人在学
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        {course.isDiscount ? (
                          <>
                            <span className="text-2xl font-bold text-slate-900">¥{course.price}</span>
                            <span className="text-sm text-slate-400 line-through block">¥{course.originalPrice}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-slate-900">¥{course.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
