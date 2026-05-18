import { motion } from 'framer-motion';
import { 
  BookOpen, Brain, Users, Target, Calendar, 
  MessageCircle, Video, FileText, Award,
  CheckCircle, Clock, TrendingUp, Sparkles
} from 'lucide-react';

const companionFeatures = [
  {
    icon: Calendar,
    title: '学习计划制定',
    desc: '根据测评结果和个人目标，AI智能生成个性化学习计划',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageCircle,
    title: '在线答疑辅导',
    desc: '专业老师24小时在线，随时解答学习中遇到的问题',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Video,
    title: '一对一视频课',
    desc: '名师一对一视频辅导，针对性解决学习难题',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: FileText,
    title: '作业批改点评',
    desc: '专业老师详细批改作业，提供针对性改进建议',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Target,
    title: '学习目标追踪',
    desc: '实时追踪学习进度，确保按计划完成学习目标',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Brain,
    title: '薄弱点攻克',
    desc: 'AI精准定位薄弱环节，专项训练快速提升',
    color: 'from-rose-500 to-red-500',
  },
];

const studyPrograms = [
  {
    title: '高考冲刺班',
    duration: '3个月',
    subjects: '全科',
    target: '高考考生',
    price: '¥9,999',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '单科提升班',
    duration: '1个月',
    subjects: '单科',
    target: '单科薄弱学生',
    price: '¥2,999',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    title: '寒假特训营',
    duration: '15天',
    subjects: '重点科目',
    target: '初中/高中生',
    price: '¥4,999',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
];

export default function Companion() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-fuchsia-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-sm font-medium text-blue-600 mb-6">
              <Sparkles className="w-4 h-4" />
              伴学中心
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              让学习更有
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">针对性</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              专业伴学团队全程跟踪指导，从制定计划到攻克难点，让每一个学习目标都能高效达成
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#/assessment"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Brain className="w-5 h-5" />
                立即评测
              </motion.a>
              <motion.a
                href="#/courses"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                了解更多
              </motion.a>
            </div>
          </motion.div>
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
              全方位伴学服务
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              从计划制定到目标达成，全程专业伴学支持
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {companionFeatures.map((feature, index) => {
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
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} 
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

      {/* Study Programs Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              精选伴学方案
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              针对不同学习需求，定制专业伴学计划
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${program.gradient}`} />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{program.title}</h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span>·</span>
                    <span>{program.subjects}</span>
                  </div>
                  <p className="text-slate-600 mb-6">{program.target}</p>
                  <div className="text-3xl font-bold text-slate-900 mb-6">{program.price}</div>
                  <motion.a
                    href="#/courses"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center justify-center w-full py-3 bg-gradient-to-r ${program.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all`}
                  >
                    立即报名
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: '服务学员' },
              { value: '500+', label: '专业伴学老师' },
              { value: '98%', label: '学员满意度' },
              { value: '+86', label: '平均提分' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
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
            className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-12 lg:p-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              准备好开始你的伴学之旅了吗？
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              立即预约免费测评，让专业老师为你量身定制学习方案
            </p>
            <motion.a
              href="#/assessment"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Brain className="w-5 h-5" />
              立即预约免费测评
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
