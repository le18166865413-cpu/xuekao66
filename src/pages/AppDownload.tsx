import { motion } from 'framer-motion';
import { 
  Smartphone, Download, CheckCircle, Star, Users, 
  Sparkles, QrCode, Apple, PlayCircle, Bell, 
  Brain, Target, BookOpen, MessageCircle
} from 'lucide-react';

const appFeatures = [
  {
    icon: Brain,
    title: 'AI智能评测',
    desc: '精准定位学习薄弱点',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: '海量课程',
    desc: '随时随地学习优质课程',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: MessageCircle,
    title: '在线答疑',
    desc: '24小时名师在线解答',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Target,
    title: '学习计划',
    desc: '个性化学习路径规划',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const appStats = [
  { value: '100万+', label: '下载量' },
  { value: '4.9', label: '应用评分' },
  { value: '50万+', label: '活跃用户' },
];

export default function AppDownload() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-fuchsia-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl" />
        
        <div className="container-custom relative">
          <div className="grid xl:grid-cols-2 gap-12 xl:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-sm font-medium text-blue-600 mb-6">
                <Smartphone className="w-4 h-4" />
                APP下载
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                学考合一
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">APP</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
                下载学考合一APP，随时随地享受AI智能教育服务，让学习更高效
              </p>
              
              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">下载</div>
                    <div>App Store</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
                >
                  <PlayCircle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">下载</div>
                    <div>Android</div>
                  </div>
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center">
                {appStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-br from-blue-600 to-violet-600 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                    <div className="w-20 h-6 bg-black rounded-full" />
                  </div>
                  <div className="pt-12 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">学考合一</h3>
                        <p className="text-sm text-slate-500">AI智能教育</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold text-slate-900">AI评测报告</span>
                        </div>
                        <p className="text-sm text-slate-600">您的数学成绩已提升15分</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-emerald-500" />
                          <span className="font-semibold text-slate-900">今日学习目标</span>
                        </div>
                        <p className="text-sm text-slate-600">已完成 3/5 项任务</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-amber-500" />
                          <span className="font-semibold text-slate-900">精选课程</span>
                        </div>
                        <p className="text-sm text-slate-600">高考数学冲刺班进行中</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-violet-200 rounded-3xl blur-2xl opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              APP核心功能
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              功能强大，体验流畅，让学习更高效
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                  flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 
                                  transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Methods */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              多种下载方式
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              选择最适合你的下载方式
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">扫码下载</h3>
              <p className="text-slate-600 text-center mb-6">
                扫描下方二维码，下载APP
              </p>
              <div className="w-40 h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mx-auto flex items-center justify-center">
                <QrCode className="w-32 h-32 text-slate-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-black rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">App Store</h3>
              <p className="text-slate-600 text-center mb-6">
                iOS用户请前往App Store搜索"学考合一"
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-slate-700 to-black text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                前往下载
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Android</h3>
              <p className="text-slate-600 text-center mb-6">
                Android用户请前往应用市场搜索"学考合一"
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                前往下载
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                立即下载，开启学习新体验
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                加入百万用户的选择，让学习更高效
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">
                  <Apple className="w-5 h-5" />
                  iOS下载
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all">
                  <PlayCircle className="w-5 h-5" />
                  Android下载
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


