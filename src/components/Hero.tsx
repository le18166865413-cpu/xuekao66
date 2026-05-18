import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, BookOpen, Brain, Users, Target, TrendingUp, Award, Play, CheckCircle, Star, Zap, Clock, Infinity as InfinityIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SafeImage } from './SafeImage';
import { getActiveHeroSlides } from '../utils/heroSlides';
import { HeroSlide as AdminHeroSlide } from '../types/admin';

const iconMap: Record<string, any> = {
  'Brain': Brain,
  'BookOpen': BookOpen,
  'Users': Users,
  'Target': Target,
  'Award': Award,
  'Trophy': Award,
  'Sparkles': Sparkles,
  'CheckCircle': CheckCircle,
  'Star': Star,
  'TrendingUp': TrendingUp,
  'Zap': Zap,
  'Clock': Clock,
};

interface HeroSlide {
  id: string | number;
  badgeText: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ value: string; label: string; icon: any }>;
  gradient: string;
  imageUrl: string;
  floatCard1: { title: string; desc: string; icon: any; gradient: string };
  floatCard2: { value: string; label: string };
  floatCard3: { value: string; label: string; gradient: string };
  floatCard4: { value: string; label: string; gradient: string };
}

function transformAdminSlide(slide: AdminHeroSlide): HeroSlide {
  const icon1 = iconMap[slide.floatCard1_icon] || Sparkles;
  const defaultStats = [
    { value: '50万+', label: '学员信赖', icon: Users },
    { value: '1000+', label: '精品课程', icon: BookOpen },
    { value: '98%', label: '好评率', icon: Star },
    { value: '9科', label: '高考科目', icon: Target },
  ];
  
  return {
    id: slide.id,
    badgeText: slide.badgeText,
    titlePart1: slide.titlePart1,
    titlePart2: slide.titlePart2,
    subtitle: slide.subtitle,
    features: slide.features,
    ctaPrimary: slide.ctaPrimary,
    ctaSecondary: slide.ctaSecondary,
    stats: defaultStats,
    gradient: slide.gradient,
    imageUrl: slide.imageUrl,
    floatCard1: {
      title: slide.floatCard1_title,
      desc: slide.floatCard1_desc,
      icon: icon1,
      gradient: slide.floatCard1_gradient,
    },
    floatCard2: {
      value: slide.floatCard2_value,
      label: slide.floatCard2_label,
    },
    floatCard3: {
      value: slide.floatCard3_value,
      label: slide.floatCard3_label,
      gradient: slide.floatCard3_gradient,
    },
    floatCard4: {
      value: slide.floatCard4_value,
      label: slide.floatCard4_label,
      gradient: slide.floatCard4_gradient,
    },
  };
}

function FloatingParticle({ delay, size, duration }: { delay: number; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-violet-400/20 blur-sm"
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
}

function StatCard({ value, label, icon: Icon, delay }: { value: string; label: string; icon: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + delay, duration: 0.5 }}
      className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/50 shadow-soft min-w-[120px]"
    >
      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-shrink-0">
        <div className="text-base font-bold text-slate-900 whitespace-nowrap">{value}</div>
        <div className="text-[10px] text-slate-500 whitespace-nowrap">{label}</div>
      </div>
    </motion.div>
  );
}

function FeatureTag({ text, icon: Icon, delay }: { text: string; icon: any; delay: number }) {
  const featureIcons: { [key: string]: any } = {
    '高考全科': BookOpen,
    'AI评测': Brain,
    '名师指导': Users,
    '个性化': Target,
    '智能推荐': Zap,
    '数据分析': Brain,
    '错题本': BookOpen,
    '学习报告': Star,
    '名师直播': Users,
    '在线答疑': Users,
    '作业批改': BookOpen,
    '学习计划': Clock,
    '志愿评估': Target,
    '院校推荐': Award,
    '专业分析': Brain,
    '录取预测': CheckCircle,
  };
  
  const IconComponent = featureIcons[text] || Star;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + delay, duration: 0.5 }}
      className="flex items-center gap-2 text-sm text-slate-600 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-100 shadow-sm"
    >
      <IconComponent className="w-4 h-4 text-blue-500" />
      <span>{text}</span>
    </motion.div>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = () => {
    const adminSlides = getActiveHeroSlides();
    if (adminSlides.length > 0) {
      setHeroSlides(adminSlides.map(transformAdminSlide));
    } else {
      const defaultSlides = getDefaultSlides();
      setHeroSlides(defaultSlides);
    }
  };

  const getDefaultSlides = (): HeroSlide[] => [
    {
      id: 'default-1',
      badgeText: '做有温度有结果的教育',
      titlePart1: '专注提分',
      titlePart2: '成就未来',
      subtitle: '汇聚名师资源，提供个性化学习方案，让每个学生都能找到适合自己的提分路径',
      features: ['高考全科', 'AI评测', '名师指导', '个性化'],
      ctaPrimary: '开始探索',
      ctaSecondary: '免费测评',
      stats: [
        { value: '50万+', label: '学员信赖', icon: Users },
        { value: '1000+', label: '精品课程', icon: BookOpen },
        { value: '98%', label: '好评率', icon: Star },
        { value: '9科', label: '高考科目', icon: Target },
      ],
      gradient: 'from-blue-50 via-white to-violet-50/50',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      floatCard1: { title: 'AI 智能测评', desc: '精准定位薄弱环节', icon: Brain, gradient: 'from-blue-500 to-violet-500' },
      floatCard2: { value: '+2,580', label: '本周新学员' },
      floatCard3: { value: '+86分', label: '平均提分', gradient: 'from-emerald-500 to-teal-500' },
      floatCard4: { value: '98%', label: '用户好评率', gradient: 'from-amber-500 to-orange-500' },
    },
    {
      id: 'default-2',
      badgeText: 'AI驱动的智能学习平台',
      titlePart1: '智慧教育',
      titlePart2: '赋能成长',
      subtitle: '利用人工智能技术，为每位学生量身定制学习方案，实现高效学习',
      features: ['智能推荐', '数据分析', '错题本', '学习报告'],
      ctaPrimary: '立即体验',
      ctaSecondary: '了解更多',
      stats: [
        { value: '100万+', label: '题库容量', icon: BookOpen },
        { value: '99%', label: '准确率', icon: Target },
        { value: '24/7', label: '全天候', icon: Clock },
        { value: '100%', label: '数据安全', icon: CheckCircle },
      ],
      gradient: 'from-emerald-50 via-white to-teal-50/50',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      floatCard1: { title: '智能题库', desc: '百万级精选题目', icon: BookOpen, gradient: 'from-emerald-500 to-teal-500' },
      floatCard2: { value: '+50万', label: '每日练习' },
      floatCard3: { value: '99%', label: '题目准确率', gradient: 'from-blue-500 to-violet-500' },
      floatCard4: { value: '24h', label: '学习支持', gradient: 'from-cyan-500 to-blue-500' },
    },
    {
      id: 'default-3',
      badgeText: '名师护航 梦想起航',
      titlePart1: '名师在线',
      titlePart2: '指点迷津',
      subtitle: '汇聚全国顶尖名师，一对一在线辅导，让学习更有针对性',
      features: ['名师直播', '在线答疑', '作业批改', '学习计划'],
      ctaPrimary: '预约名师',
      ctaSecondary: '查看师资',
      stats: [
        { value: '500+', label: '名师团队', icon: Users },
        { value: '10年+', label: '平均教龄', icon: Award },
        { value: '98%', label: '辅导好评', icon: Star },
        { value: '1v1', label: '专属辅导', icon: Target },
      ],
      gradient: 'from-amber-50 via-white to-orange-50/50',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      floatCard1: { title: '名师课堂', desc: '零距离互动教学', icon: Users, gradient: 'from-amber-500 to-orange-500' },
      floatCard2: { value: '500+', label: '认证名师' },
      floatCard3: { value: '10年+', label: '教学经验', gradient: 'from-violet-500 to-fuchsia-500' },
      floatCard4: { value: '98%', label: '辅导成功率', gradient: 'from-rose-500 to-pink-500' },
    },
    {
      id: 'default-4',
      badgeText: '升学规划 一路相伴',
      titlePart1: '志愿填报',
      titlePart2: '精准指导',
      subtitle: '专业升学规划团队，为您提供一站式志愿填报指导服务',
      features: ['志愿评估', '院校推荐', '专业分析', '录取预测'],
      ctaPrimary: '预约咨询',
      ctaSecondary: '了解服务',
      stats: [
        { value: '10万+', label: '成功案例', icon: CheckCircle },
        { value: '95%', label: '录取率', icon: Target },
        { value: '2000+', label: '合作院校', icon: Award },
        { value: '1对1', label: '专属顾问', icon: Users },
      ],
      gradient: 'from-violet-50 via-white to-fuchsia-50/50',
      imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop',
      floatCard1: { title: '志愿规划', desc: '智能匹配院校', icon: Target, gradient: 'from-violet-500 to-fuchsia-500' },
      floatCard2: { value: '10万+', label: '成功案例' },
      floatCard3: { value: '95%', label: '录取成功率', gradient: 'from-blue-500 to-cyan-500' },
      floatCard4: { value: '2000+', label: '合作院校', gradient: 'from-teal-500 to-emerald-500' },
    },
  ];

  useEffect(() => {
    setTypedLine1('');
    setTypedLine2('');
    
    if (heroSlides.length === 0) return;
    
    const slide = heroSlides[currentSlide];
    
    let line1Index = 0;
    let line2Index = 0;
    
    const typeLine1 = setInterval(() => {
      if (line1Index < slide.titlePart1.length) {
        setTypedLine1(slide.titlePart1.slice(0, line1Index + 1));
        line1Index++;
      } else {
        clearInterval(typeLine1);
        const typeLine2 = setInterval(() => {
          if (line2Index < slide.titlePart2.length) {
            setTypedLine2(slide.titlePart2.slice(0, line2Index + 1));
            line2Index++;
          } else {
            clearInterval(typeLine2);
          }
        }, 100);
      }
    }, 150);
    
    return () => {
      clearInterval(typeLine1);
    };
  }, [currentSlide, heroSlides]);

  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides]);

  const goToPrev = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (heroSlides.length === 0) {
    return null;
  }

  const slide = heroSlides[currentSlide];

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="首页主横幅轮播"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05),transparent_50%)]" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/30 to-violet-100/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-violet-100/20 to-blue-100/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} size={40} duration={6} />
        <FloatingParticle delay={1} size={25} duration={5} />
        <FloatingParticle delay={2} size={35} duration={7} />
        <FloatingParticle delay={0.5} size={20} duration={4} />
        <FloatingParticle delay={1.5} size={30} duration={6} />
        <FloatingParticle delay={2.5} size={15} duration={5} />
        <FloatingParticle delay={3} size={28} duration={7} />
      </div>

      <div className="relative max-w-8xl mx-auto px-6 lg:px-8 xl:px-12 w-full py-12 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center border-2 border-slate-200 rounded-3xl p-6 lg:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-full mb-6 shadow-soft"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </motion.div>
                <span className="text-sm font-medium text-slate-700">{slide.badgeText}</span>
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">NEW</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 leading-tight tracking-tight"
              >
                {typedLine1}
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent ml-2"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  {typedLine2}
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-1 h-12 bg-blue-600 ml-1 align-middle"
                />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-slate-600 mb-4 max-w-lg leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base text-slate-400 mb-8 max-w-md"
              >
                {slide.features.join(' · ')}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {slide.features.map((feature, index) => (
                  <FeatureTag key={feature} text={feature} icon={Star} delay={index * 0.1} />
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <motion.a
                  href="#/courses"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={slide.ctaPrimary}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center gap-2">
                    <span>{slide.ctaPrimary}</span>
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.a>
                <motion.a
                  href="#/assessment"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={slide.ctaSecondary}
                >
                  <Play className="w-5 h-5 text-blue-500" />
                  <span>{slide.ctaSecondary}</span>
                </motion.a>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 xl:gap-8"
                role="list" 
                aria-label="平台数据统计"
              >
                {slide.stats.map((stat, index) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} delay={index * 0.1} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden xl:block mt-8"
              aria-hidden="true"
            >
              <div className="relative">
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <SafeImage
                    src={slide.imageUrl}
                    alt="教育平台"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    index={currentSlide}
                    icon={BookOpen}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                  
                  <motion.div className="absolute inset-0 flex items-center justify-center" whileHover={{ scale: 1.1 }}>
                    <motion.div
                      className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      animate={{ boxShadow: ["0 0 0 0 rgba(99,102,241,0.4)", "0 0 0 20px rgba(99,102,241,0)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-5 shadow-xl border border-slate-100"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${slide.floatCard1.gradient} rounded-lg flex items-center justify-center shadow-lg`}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <slide.floatCard1.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{slide.floatCard1.title}</div>
                      <div className="text-xs text-slate-500">{slide.floatCard1.desc}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-emerald-600">已帮助10万+学生</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border-3 border-white shadow-md flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Users className="w-5 h-5 text-white" />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{slide.floatCard2.value}</div>
                      <div className="text-xs text-slate-500">{slide.floatCard2.label}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${slide.floatCard3.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">{slide.floatCard3.value}</div>
                      <div className="text-xs text-slate-500">{slide.floatCard3.label}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-12 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${slide.floatCard4.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{slide.floatCard4.value}</span>
                        <span className="text-xs text-amber-600">★★★★★</span>
                      </div>
                      <div className="text-xs text-slate-500">{slide.floatCard4.label}</div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-violet-200 rounded-3xl rotate-6 opacity-60" />
                <div className="absolute -z-10 -top-10 -right-10 w-32 h-32 border-4 border-blue-100 rounded-3xl -rotate-12 opacity-40" />
                <div className="absolute -z-10 bottom-1/2 right-1/2 w-20 h-20 bg-gradient-to-r from-fuchsia-200 to-pink-200 rounded-full blur-xl opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center mt-8">
          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4 justify-items-center max-w-4xl w-full px-4">
            {heroSlides.map((s, index) => (
              <motion.button
                key={s.id}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => goToSlide(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card-hover h-16 w-[200px] border-2 rounded-xl bg-white shadow-sm transition-all duration-300 flex items-center gap-3 px-4 cursor-pointer group ${
                  index === currentSlide
                    ? 'border-blue-500 shadow-lg scale-[1.02]'
                    : 'hover:border-blue-300'
                }`}
              >
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg shrink-0 transition-transform ${
                  index === 0 ? 'bg-blue-100 text-blue-600' : ''
                } ${index === 1 ? 'bg-emerald-100 text-emerald-600' : ''} ${index === 2 ? 'bg-amber-100 text-amber-600' : ''} ${index === 3 ? 'bg-violet-100 text-violet-600' : ''} group-hover:scale-110`}>
                  {index === 0 && <Sparkles className="h-5 w-5" />}
                  {index === 1 && <Brain className="h-5 w-5" />}
                  {index === 2 && <Users className="h-5 w-5" />}
                  {index === 3 && <Target className="h-5 w-5" />}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className={`text-sm font-semibold leading-tight ${
                    index === currentSlide ? 'text-blue-600' : 'text-slate-700 group-hover:text-blue-600'
                  } transition-colors`}>
                    {s.titlePart1}
                  </div>
                  <p className="text-xs text-slate-500 truncate leading-tight">
                    {s.titlePart2}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
