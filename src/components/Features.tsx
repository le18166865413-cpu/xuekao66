import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Brain, Users, FileText, ArrowUpRight, Target, Sparkles, BarChart3, Shield, Compass, Lightbulb, Award, TrendingUp
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTypewriter } from '../hooks/useTypewriter';
import { getActiveFeatures } from '../utils/featuresData';
import { Feature as AdminFeature } from '../types/admin';

const iconMap: Record<string, LucideIcon> = {
  'BookOpen': BookOpen,
  'Brain': Brain,
  'Users': Users,
  'FileText': FileText,
  'BarChart3': BarChart3,
  'BarChart2': BarChart3,
  'Shield': Shield,
  'Compass': Compass,
  'Lightbulb': Lightbulb,
  'Award': Award,
  'Target': Target,
  'TrendingUp': TrendingUp,
};

interface FeatureHighlight {
  icon: LucideIcon;
  label: string;
  value: string;
}

const highlights: FeatureHighlight[] = [
  { icon: Users, label: '注册学员', value: '50万+' },
  { icon: BookOpen, label: '精品课程', value: '1000+' },
  { icon: Award, label: '学员好评', value: '98%' },
  { icon: TrendingUp, label: '平均提分', value: '+86分' },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
  gradient: string;
  highlight?: string;
}

/**
 * 核心服务展示组件 - 增强版
 * 采用卡片式设计，带有渐变图标和悬停动效
 */
export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const typewriterText = useTypewriter({
    texts: ['全方位学习支持体系，助力每一位学子实现学业突破'],
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDuration: 4000,
  });

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = () => {
    const adminFeatures = getActiveFeatures();
    const transformed = adminFeatures.map(af => ({
      icon: iconMap[af.icon] || BookOpen,
      title: af.title,
      desc: af.desc,
      link: af.link,
      gradient: af.gradient,
      highlight: af.highlight,
    }));
    setFeatures(transformed);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden" aria-labelledby="features-heading">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container-custom relative">
        <div className="border-2 border-slate-200 rounded-3xl p-6 lg:p-8 shadow-soft">
          <div className="text-center mb-16">
            <SectionTitle id="features-heading">
              核心服务
            </SectionTitle>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 min-h-[28px]">
              {typewriterText}<span className="animate-pulse">|</span>
            </p>
            
            <div 
              className="flex flex-wrap justify-center gap-6 lg:gap-12"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            role="list"
            aria-label="核心服务列表"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <a
                  key={`feature-${index}`}
                  href={feature.link}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-100 
                             hover:border-slate-200 hover:shadow-xl transition-all duration-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  role="listitem"
                  aria-label={`${feature.title} - ${feature.desc}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.05] rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div 
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                      >
                        <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      
                      {feature.highlight && (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${feature.gradient} text-white shadow-sm`}>
                          {feature.highlight}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight
                                   group-hover:text-slate-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {feature.desc}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
                        了解更多 →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <motion.a
              href="#/courses"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              探索全部服务
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
