import { Wheat, Trophy, Users, BookOpen, Calendar, TrendingUp, Award, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';

interface Partner {
  name: string;
  gradient: string;
}

const partners: Partner[] = [
  { name: '清华大学', gradient: 'from-purple-500 to-indigo-500' },
  { name: '北京大学', gradient: 'from-red-500 to-pink-500' },
  { name: '复旦大学', gradient: 'from-blue-500 to-cyan-500' },
  { name: '浙江大学', gradient: 'from-emerald-500 to-teal-500' },
  { name: '南京大学', gradient: 'from-violet-500 to-purple-500' },
  { name: '武汉大学', gradient: 'from-orange-500 to-amber-500' },
  { name: '中山大学', gradient: 'from-sky-500 to-blue-500' },
  { name: '四川大学', gradient: 'from-rose-500 to-pink-500' },
  { name: '上海交大', gradient: 'from-cyan-500 to-blue-500' },
  { name: '中国科大', gradient: 'from-lime-500 to-emerald-500' },
  { name: '同济大学', gradient: 'from-amber-500 to-yellow-500' },
  { name: '西安交大', gradient: 'from-red-500 to-orange-500' },
  { name: '哈工大', gradient: 'from-blue-500 to-indigo-500' },
  { name: '北航', gradient: 'from-sky-500 to-cyan-500' },
  { name: '南开大学', gradient: 'from-violet-500 to-purple-500' },
  { name: '厦大', gradient: 'from-teal-500 to-emerald-500' },
  { name: '中大', gradient: 'from-emerald-500 to-teal-500' },
  { name: '吉大', gradient: 'from-lime-500 to-green-500' },
  { name: '山东大学', gradient: 'from-orange-500 to-red-500' },
  { name: '湖南大学', gradient: 'from-red-500 to-rose-500' },
  { name: '华东师范', gradient: 'from-blue-500 to-violet-500' },
];

interface Milestone {
  year: string;
  title: string;
  description: string;
  gradient: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    year: '2020',
    title: '品牌创立',
    description: '学考合一教育品牌正式创立，致力于为学生提供优质教育资源',
    gradient: 'from-blue-500 to-cyan-500',
    icon: Rocket,
  },
  {
    year: '2021',
    title: '课程上线',
    description: '首批高考全科课程正式上线，覆盖九大科目，服务首批学员',
    gradient: 'from-violet-500 to-purple-500',
    icon: BookOpen,
  },
  {
    year: '2022',
    title: 'AI评测系统',
    description: '自主研发的AI智能评测系统上线，实现个性化学习路径规划',
    gradient: 'from-emerald-500 to-teal-500',
    icon: TrendingUp,
  },
  {
    year: '2023',
    title: '名师阵容',
    description: '汇聚200+行业名师，平均教龄超过10年，学员满意度达98%',
    gradient: 'from-orange-500 to-amber-500',
    icon: Award,
  },
  {
    year: '2024',
    title: '学员突破',
    description: '平台学员突破50万，帮助无数学生实现学业突破，考入理想院校',
    gradient: 'from-pink-500 to-rose-500',
    icon: Trophy,
  },
  {
    year: '2025',
    title: '合作伙伴',
    description: '与全国21所重点高校建立合作关系，共建教育生态',
    gradient: 'from-indigo-500 to-blue-500',
    icon: Users,
  },
];

/**
 * 合作院校展示组件
 * 采用卡片式设计，带有渐变图标和悬停效果
 */
export default function Partners() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = partners.slice(startIndex, endIndex);

  // 自动轮播
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
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="partners-heading">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container-custom relative space-y-16">
        {/* 公司里程碑 */}
        <div className="border-2 border-slate-200 rounded-3xl p-6 lg:p-8 shadow-soft">
          <div className="text-center mb-12">
            <SectionTitle id="milestones-heading">
              公司里程碑
            </SectionTitle>
          </div>

          {/* 里程碑数据统计 */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">5年+</span>
              <span className="text-slate-500">深耕教育</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-5 h-5 text-violet-500" />
              <span className="font-semibold">50万+</span>
              <span className="text-slate-500">注册学员</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold">1000+</span>
              <span className="text-slate-500">精品课程</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-semibold">98%</span>
              <span className="text-slate-500">学员好评</span>
            </div>
          </div>

          {/* 里程碑卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.year}
                  className="group relative bg-white rounded-xl p-4 border border-slate-100 
                             hover:border-slate-200 hover:shadow-lg transition-all duration-300
                             flex flex-col items-center text-center"
                >
                  {/* 年份标签 */}
                  <div className={`mb-3 px-3 py-1 rounded-full bg-gradient-to-r ${milestone.gradient} text-white text-xs font-bold`}>
                    {milestone.year}
                  </div>
                  
                  {/* 图标 */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.gradient} 
                                  flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 
                                  transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  
                  {/* 标题 */}
                  <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                    {milestone.title}
                  </h3>
                  
                  {/* 描述 */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 合作院校 */}
        <div className="border-2 border-slate-200 rounded-3xl p-6 lg:p-8 shadow-soft">
          <div className="text-center mb-12">
            <SectionTitle id="partners-heading">
              合作院校
            </SectionTitle>
          </div>

          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4 xl:gap-6"
            role="list"
            aria-label="合作院校列表"
          >
            {currentPartners.map((partner, index) => (
              <div
                key={partner.name}
                className="group bg-white rounded-xl p-6 lg:p-8 border border-slate-100 
                           hover:border-slate-200 hover:shadow-soft transition-all duration-300
                           flex flex-col items-center justify-center gap-4"
                role="listitem"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${partner.gradient} 
                                flex items-center justify-center shadow-lg group-hover:scale-110 
                                transition-transform duration-300 ease-spring`}>
                  <Wheat className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-700 text-center group-hover:text-slate-900 transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}