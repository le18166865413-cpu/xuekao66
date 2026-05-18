import { ArrowRight, Sparkles, Zap } from 'lucide-react';

/**
 * 行动号召组件
 * 采用渐变背景和浮动元素增强视觉吸引力
 */
export default function CTA() {
  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Floating elements */}
      <div
        className="absolute top-20 left-20 w-16 h-16 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"
      />
      <div
        className="absolute bottom-20 right-20 w-12 h-12 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hidden lg:block"
      />
      <div
        className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-lg hidden lg:block"
      />
      
      <div className="container-custom relative">
        <div
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-300">立即开始，免费体验</span>
          </div>
          
          <h2 
            id="cta-heading"
            className="text-display-sm md:text-display-md font-bold text-white tracking-tight mb-6"
          >
            开启你的
            <span className="gradient-text"> 提分之旅</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
            立即注册，免费体验AI智能测评，获取个性化学习方案，让提分变得简单高效
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#/register"
              className="btn-gradient inline-flex items-center justify-center gap-2 text-base px-8 py-4 hover:scale-102 transition-transform"
              aria-label="免费注册账号"
            >
              <Zap className="w-5 h-5" aria-hidden="true" />
              免费注册
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="#/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                         border border-slate-600 text-white text-base font-medium rounded-lg
                         hover:border-slate-400 hover:bg-white/5 hover:scale-102 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
                         focus:ring-offset-slate-900"
              aria-label="浏览课程列表"
            >
              浏览课程
            </a>
          </div>
          
          {/* Trust indicators */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              无需信用卡
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              7天免费试用
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              随时取消
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
