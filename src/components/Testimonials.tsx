import { Quote, Star, GraduationCap, TrendingUp, Sparkles, MessageCircle, User } from 'lucide-react';
import { SafeImage } from './SafeImage';
import SectionTitle from './SectionTitle';
import { useTypewriter } from '../hooks/useTypewriter';

interface Testimonial {
  id: number;
  name: string;
  school: string;
  content: string;
  subject: string;
  rating: number;
  gradient: string;
  avatar: string;
  score?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: '张同学',
    school: '北京大学',
    content: '学考合一的课程让我从班级中游逆袭到年级前十，数学单科提升了40分。系统的学习方法和名师的指导让我找到了学习的方向。AI评测精准定位我的薄弱环节，真的太神奇了！',
    subject: '高考数学冲刺班',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    score: '+40分',
  },
  {
    id: 2,
    name: '李同学',
    school: '清华大学',
    content: '知识评测系统精准定位我的薄弱环节，针对性学习让效率翻倍。最终成功考入理想院校，感谢学考合一的专业服务。这里有名师、有方法、有坚持，强烈推荐！',
    subject: 'AI智能测评',
    rating: 5,
    gradient: 'from-violet-500 to-purple-500',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    score: '考入清华',
  },
  {
    id: 3,
    name: '王同学',
    school: '复旦大学',
    content: '名师一对一辅导，英语从90分提升到135分。老师不仅传授知识，更教会了我学习的方法和思维方式。升学规划功能帮我找到了最适合的院校，真的很专业！',
    subject: '英语一对一辅导',
    rating: 5,
    gradient: 'from-orange-500 to-pink-500',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    score: '+45分',
  },
  {
    id: 4,
    name: '陈同学',
    school: '浙江大学',
    content: '物理学渣到物理竞赛金牌，只用了半年时间！学考合一的老师真的很专业，不仅讲课生动有趣，还教会了我很多解题技巧。强烈推荐给学弟学妹们！',
    subject: '物理竞赛辅导',
    rating: 5,
    gradient: 'from-emerald-500 to-teal-500',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    score: '竞赛金牌',
  },
  {
    id: 5,
    name: '刘同学',
    school: '上海交通大学',
    content: '免费资料库真的太实用了！历年高考真题、学霸笔记、模拟试卷应有尽有。化学从C提升到A，感谢学考合一提供的优质资源。',
    subject: '免费资料',
    rating: 5,
    gradient: 'from-amber-500 to-orange-500',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    score: 'C→A',
  },
  {
    id: 6,
    name: '赵同学',
    school: '南京大学',
    content: '每天的学习任务打卡让我养成了良好的学习习惯。升学规划功能根据我的兴趣和能力，推荐了最适合的专业方向。现在已经成为年级前十的学霸了！',
    subject: '升学规划',
    rating: 5,
    gradient: 'from-rose-500 to-red-500',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    score: '年级前十',
  },
  {
    id: 7,
    name: '孙同学',
    school: '武汉大学',
    content: '语文一直是我的弱项，学考合一的老师耐心指导，教会了我很多阅读理解的技巧。高考语文考了128分，是我从来没想过的成绩！',
    subject: '语文专项辅导',
    rating: 5,
    gradient: 'from-blue-500 to-violet-500',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
    score: '+35分',
  },
  {
    id: 8,
    name: '周同学',
    school: '中山大学',
    content: '历史知识点太多太杂，自己复习完全抓不住重点。学考合一的历史课程帮我梳理了完整的时间线，高考历史拿了95分！',
    subject: '历史串讲',
    rating: 5,
    gradient: 'from-teal-500 to-cyan-500',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    score: '+30分',
  },
  {
    id: 9,
    name: '吴同学',
    school: '四川大学',
    content: '政治时事热点更新太快，自己根本跟不上。学考合一的老师每周都会整理最新的时政要点，让我高考政治拿了满分！',
    subject: '政治时政',
    rating: 5,
    gradient: 'from-indigo-500 to-blue-500',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    score: '满分',
  },
  {
    id: 10,
    name: '郑同学',
    school: '中国科大',
    content: '生物遗传题一直是我的噩梦，学考合一的老师用生动的案例帮我理解抽象概念。现在做遗传题又快又准，生物成绩提升了一大截！',
    subject: '生物专项',
    rating: 5,
    gradient: 'from-emerald-500 to-teal-500',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    score: '+38分',
  },
];

export default function Testimonials() {
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  const typewriterText = useTypewriter({
    texts: ['来自真实学员的学习反馈，见证每一次进步与成长'],
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDuration: 4000,
  });
  
  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      
      <div className="container-custom relative">
        {/* 包装框 */}
        <div className="border-2 border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-soft bg-slate-800/30 backdrop-blur-sm">
          <div className="text-center mb-16">
            <SectionTitle id="testimonials-heading" dark={true}>
              学员评价
            </SectionTitle>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 min-h-[28px]">
              {typewriterText}<span className="animate-pulse">|</span>
            </p>
            
            {/* 统计数据 */}
            <div 
              className="flex flex-wrap justify-center gap-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-slate-500">平均评分</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">+86分</span>
                <span className="text-slate-500">平均提分</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">98%</span>
                <span className="text-slate-500">好评率</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 第一层 - 向左滚动 */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-marquee-left">
                {[...firstRow, ...firstRow].map((item, index) => (
                  <article
                    key={`row1-${item.id}-${index}`}
                    className="group relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 
                               border border-slate-700/50 hover:border-slate-600/50 
                               hover:bg-slate-800/80 transition-all duration-500 flex-shrink-0 w-72"
                    role="listitem"
                    style={{
                      backgroundImage: item.background_image ? `url(${item.background_image})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    {/* Quote icon */}
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} 
                                    flex items-center justify-center mb-3 shadow-lg`}>
                      <Quote className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>

                    {/* Rating and Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                        ))}
                      </div>
                      {item.score && (
                        <span 
                          className={`px-2 py-0.5 text-xs font-bold bg-gradient-to-r ${item.gradient} text-white rounded-full`}
                        >
                          {item.score}
                        </span>
                      )}
                    </div>
                    
                    <blockquote>
                      <p className="text-slate-300 leading-relaxed mb-4 text-xs line-clamp-3">
                        "{item.content}"
                      </p>
                    </blockquote>
                    
                    <footer className="border-t border-slate-700/50 pt-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-600 group-hover:border-blue-500 transition-colors"
                        >
                          <SafeImage
                            src={item.avatar}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            index={index}
                            icon={User}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <div className="text-white text-sm font-semibold truncate">{item.name}</div>
                            <GraduationCap className="w-3 h-3 text-blue-400 flex-shrink-0" aria-hidden="true" />
                          </div>
                          <div className="text-slate-400 text-xs truncate">{item.school}</div>
                        </div>
                      </div>
                      <div className={`mt-2 text-xs font-medium bg-gradient-to-r ${item.gradient} 
                                     bg-clip-text text-transparent truncate`}>
                        {item.subject}
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            {/* 第二层 - 向右滚动 */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-marquee-right">
                {[...secondRow, ...secondRow].map((item, index) => (
                  <article
                    key={`row2-${item.id}-${index}`}
                    className="group relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 
                               border border-slate-700/50 hover:border-slate-600/50 
                               hover:bg-slate-800/80 transition-all duration-500 flex-shrink-0 w-72"
                    role="listitem"
                    style={{
                      backgroundImage: item.background_image ? `url(${item.background_image})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    {/* Quote icon */}
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} 
                                    flex items-center justify-center mb-3 shadow-lg`}>
                      <Quote className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>

                    {/* Rating and Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                        ))}
                      </div>
                      {item.score && (
                        <span 
                          className={`px-2 py-0.5 text-xs font-bold bg-gradient-to-r ${item.gradient} text-white rounded-full`}
                        >
                          {item.score}
                        </span>
                      )}
                    </div>
                    
                    <blockquote>
                      <p className="text-slate-300 leading-relaxed mb-4 text-xs line-clamp-3">
                        "{item.content}"
                      </p>
                    </blockquote>
                    
                    <footer className="border-t border-slate-700/50 pt-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-600 group-hover:border-blue-500 transition-colors"
                        >
                          <SafeImage
                            src={item.avatar}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            index={index}
                            icon={User}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <div className="text-white text-sm font-semibold truncate">{item.name}</div>
                            <GraduationCap className="w-3 h-3 text-blue-400 flex-shrink-0" aria-hidden="true" />
                          </div>
                          <div className="text-slate-400 text-xs truncate">{item.school}</div>
                        </div>
                      </div>
                      <div className={`mt-2 text-xs font-medium bg-gradient-to-r ${item.gradient} 
                                     bg-clip-text text-transparent truncate`}>
                        {item.subject}
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes marquee-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes marquee-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-marquee-left {
            animation: marquee-left 40s linear infinite;
          }
          
          .animate-marquee-right {
            animation: marquee-right 40s linear infinite;
          }
          
          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
