import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { TrendingUp, BookOpen, Award, Heart, Sparkles, Users, Target, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getActiveStats } from '../utils/statsData';
import { StatItem as AdminStatItem } from '../types/admin';

const iconMap: Record<string, LucideIcon> = {
  'Users': Users,
  'BookOpen': BookOpen,
  'Target': Target,
  'Heart': Heart,
  'Award': Award,
  'Sparkles': Sparkles,
  'TrendingUp': TrendingUp,
  'BarChart2': TrendingUp,
};

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const duration = 2500;
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeOutExpo * value);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, animate]);

  return (
    <span ref={ref} className="text-5xl lg:text-6xl font-bold tracking-tight">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  delay: number;
  index: number;
}

function Stat({ value, suffix, label, icon: Icon, gradient, description, delay, index }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
      
      <div className="relative">
        <motion.div 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
          whileHover={{ rotate: 6 }}
        >
          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
        </motion.div>
        
        <div className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
          <AnimatedNumber value={value} suffix={suffix} />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">{label}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        
        <div className="absolute -bottom-4 -right-4 text-8xl font-bold text-slate-50 group-hover:text-slate-100 transition-colors duration-500 -z-10">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const [stats, setStats] = useState<AdminStatItem[]>([]);

  useEffect(() => {
    const activeStats = getActiveStats();
    setStats(activeStats);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-100/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50/50 to-violet-50/50 rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 mb-6 shadow-soft"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            Platform Data
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            数据见证实力
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            用真实的数据说话，让每一个选择都值得
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
          {stats.map((stat, index) => (
            <Stat 
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={iconMap[stat.icon] || Users}
              gradient={stat.gradient}
              description={stat.description}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#/courses"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5" />
            立即开始学习
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
