import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  BookOpen, Brain, Users, Target, Calendar, 
  MessageCircle, Video, FileText, Award,
  CheckCircle, Clock, TrendingUp, Sparkles, Gift, Wallet, LineChart, Users2, Crown, Rocket,
  Building2, Store, Globe, ArrowRight, Send, ChevronRight, Wheat
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const partnerBenefits = [
  {
    icon: Wallet,
    title: '高额佣金',
    desc: '佣金比例最高可达30%，收入无上限',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Gift,
    title: '专属福利',
    desc: '合伙人专属课程折扣和内部资源',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: LineChart,
    title: '成长赋能',
    desc: '提供专业培训，助你快速成长',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users2,
    title: '资源共享',
    desc: '共享优质师资和课程资源',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: Award,
    title: '品牌支持',
    desc: '提供统一品牌形象和营销素材',
    gradient: 'from-pink-500 to-fuchsia-500',
  },
  {
    icon: Clock,
    title: '灵活时间',
    desc: '自由安排工作时间，随时随地赚钱',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

const partnershipModels = [
  {
    icon: Store,
    title: '合作自习室',
    desc: '为线下自习室提供优质课程内容和AI测评系统，实现线上线下融合发展，提升自习室竞争力和服务水平。',
    features: ['AI测评系统', '优质课程内容', '品牌授权', '运营支持'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Building2,
    title: '教培机构OEM',
    desc: '为教培机构提供完整的课程体系和技术支持，帮助机构快速转型线上，提升教学效率和竞争力。',
    features: ['课程体系', '技术支持', '品牌定制', '运营培训'],
    gradient: 'from-violet-500 to-purple-500',
    popular: true,
  },
  {
    icon: Globe,
    title: '地区合伙人',
    desc: '在指定区域内独家运营，享有区域保护和优先发展权，共同开拓当地教育市场。',
    features: ['区域独家', '优先发展', '专属培训', '高额返佣'],
    gradient: 'from-orange-500 to-amber-500',
  },
];

const partnershipProcess = [
  {
    step: '01',
    title: '提交申请',
    desc: '填写申请表，提供相关资料',
    icon: FileText,
  },
  {
    step: '02',
    title: '初步审核',
    desc: '总部审核资质，评估合作潜力',
    icon: CheckCircle,
  },
  {
    step: '03',
    title: '商务洽谈',
    desc: '合作细节沟通，签订合作协议',
    icon: Users,
  },
  {
    step: '04',
    title: '正式合作',
    desc: '培训赋能，启动运营',
    icon: Rocket,
  },
];

const faqData = [
  {
    question: '成为合伙人需要什么条件？',
    answer: '成为合伙人需要年满18周岁，有良好的信用记录，对教育行业有热情。不同合作模式有不同的具体要求，详情请咨询招商经理。',
  },
  {
    question: '合伙人可以获得哪些支持？',
    answer: '我们为合伙人提供全面的支持，包括：专业培训、营销素材、客服支持、技术支持、运营指导等。',
  },
  {
    question: '佣金如何结算？',
    answer: '佣金按月结算，每月15日发放上月佣金。支持银行卡、支付宝、微信等多种结算方式。',
  },
  {
    question: '可以同时开展多种合作模式吗？',
    answer: '可以的，符合条件的合伙人可以同时开展多种合作模式，实现多元化收益。',
  },
];

export default function Partner() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    mode: '',
    company: '',
    description: '',
  });

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('申请已提交，我们的招商经理将在24小时内与您联系！');
  };

  const [question, setQuestion] = useState('');

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      alert('您的问题已提交，我们会尽快回复！');
      setQuestion('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-fuchsia-50" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-sm font-medium text-blue-600 mb-6">
              <Crown className="w-4 h-4" />
              合伙人计划2.0
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              携手学考合一
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">共创教育未来</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              合作自习室 · 教培机构OEM · 地区合伙人
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Rocket className="w-5 h-5" />
                立即咨询
              </motion.a>
              <motion.a
                href="#benefits"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <Users2 className="w-5 h-5" />
                了解详情
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 六大合作优势 */}
      <section id="benefits" className="py-20">
        <div className="container-custom">
          <SectionTitle title="六大合作优势" subtitle="选择学考合一，选择成功" noWheat={true} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} 
                                  flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 
                                  transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 合作模式展示 */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <SectionTitle title="合作模式" subtitle="多种合作模式，满足不同需求" noWheat={true} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl overflow-hidden border-2 ${
                    model.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-slate-100 hover:border-slate-200'
                  } transition-all duration-500`}
                >
                  {model.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-full">
                      推荐
                    </div>
                  )}
                  
                  <div className={`h-32 bg-gradient-to-br ${model.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Icon className="w-16 h-16 text-white/90" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{model.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{model.desc}</p>
                    
                    <div className="space-y-3 mb-6">
                      {model.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        model.popular
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      了解详情
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 合作流程 */}
      <section className="py-20">
        <div className="container-custom">
          <SectionTitle title="合作流程" subtitle="简单四步，开启合作之旅" noWheat={true} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                  
                  {index < partnershipProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" style={{ width: 'calc(100% + 16px)' }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 立即咨询/申请表单 */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <SectionTitle title="立即咨询" subtitle="填写下方表单，我们的招商经理将在24小时内与您联系" noWheat={true} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">姓名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">手机号码 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入手机号码"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">合作城市</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入城市名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">合作模式</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">请选择合作模式</option>
                    <option value="studyroom">合作自习室</option>
                    <option value="oem">教培机构OEM</option>
                    <option value="partner">地区合伙人</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">公司/机构名称</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="请输入公司或机构名称"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">合作意向说明</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="请简要描述您的合作意向和优势"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                提交申请
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 留言咨询区域 */}
      <section className="py-20">
        <div className="container-custom">
          <SectionTitle title="留言咨询" subtitle="查看其他学员的咨询和我们的专业回复，或提交您的问题" noWheat={true} />

          <div className="max-w-3xl mx-auto">
            {/* FAQ列表 */}
            <div className="space-y-4 mb-12">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-slate-100 overflow-hidden"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: faqOpen === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: faqOpen === index ? 'auto' : 0, opacity: faqOpen === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* 提交问题 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">提交您的问题</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="请输入您的问题..."
                />
                <motion.button
                  onClick={handleQuestionSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  提交问题
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}