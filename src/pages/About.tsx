import { motion } from 'framer-motion';
import { Target, Award, Users, Phone, Mail, MapPin, Star, Heart, BookOpen, GraduationCap, Sparkles, TrendingUp, Clock, Shield, MessageCircle, ArrowRight, Play, CheckCircle, User } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { useState, useEffect } from 'react';
import { getCompanyInfo, getActiveMilestones, getActiveTeam, getActiveValues } from '../utils/aboutData';

export default function About() {
  const [companyInfo, setCompanyInfo] = useState(getCompanyInfo());
  const [milestones, setMilestones] = useState(getActiveMilestones());
  const [team, setTeam] = useState(getActiveTeam());
  const [values, setValues] = useState(getActiveValues());

  useEffect(() => {
    setCompanyInfo(getCompanyInfo());
    setMilestones(getActiveMilestones());
    setTeam(getActiveTeam());
    setValues(getActiveValues());
  }, []);

  const stats = [
    { value: '50万+', label: '服务学员', icon: Users, gradient: 'from-blue-500 to-violet-500' },
    { value: '1000+', label: '精品课程', icon: BookOpen, gradient: 'from-violet-500 to-purple-500' },
    { value: '200+', label: '优秀教师', icon: GraduationCap, gradient: 'from-emerald-500 to-teal-500' },
    { value: '98%', label: '好评率', icon: Star, gradient: 'from-amber-500 to-orange-500' },
  ];

  const achievements = [
    { icon: TrendingUp, title: '平均提分', value: '+86分' },
    { icon: Clock, title: '服务时长', value: '7×24小时' },
    { icon: Shield, title: '数据安全', value: '银行级加密' },
    { icon: Award, title: '行业认证', value: 'ISO9001' },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return Heart;
      case 'Star': return Star;
      case 'BookOpen': return BookOpen;
      case 'Users': return Users;
      default: return Heart;
    }
  };
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">About Us</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            {companyInfo.hero_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12"
          >
            {companyInfo.hero_subtitle}
          </motion.p>
          
          {/* 数据统计 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 公司介绍 */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-8xl mx-auto px-4">
          <div className="grid xl:grid-cols-2 gap-16 xl:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">{companyInfo.about_title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {companyInfo.about_desc1}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                {companyInfo.about_desc2}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {achievements.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200"
                    >
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-700">{item.title}: {item.value}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <SafeImage
                  src={companyInfo.about_image}
                  alt="学考合一团队"
                  className="w-full h-auto"
                  index={0}
                  icon={Users}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              
              {/* 浮动卡片 */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-slate-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">+86分</div>
                    <div className="text-sm text-slate-500">平均提分</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-violet-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-50/50 rounded-full blur-3xl" />
        
        <div className="relative max-w-8xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 mb-6"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Our Values
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">核心价值观</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              以学生成长为核心，我们始终坚持这些价值理念
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = getIconComponent(value.icon);
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-slate-500 text-center leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-24 bg-white relative">
        <div className="max-w-8xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">发展历程</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              从初创到行业领先，我们一直在进步
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white border-2 border-slate-100 p-8 w-56 text-center rounded-2xl hover:border-slate-200 hover:shadow-xl transition-all duration-500"
              >
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg`}
                  whileHover={{ rotate: 6 }}
                >
                  {m.icon}
                </motion.div>
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${m.gradient} bg-clip-text text-transparent`}>{m.year}</div>
                <div className="font-semibold text-slate-900 mb-1">{m.title}</div>
                <div className="text-sm text-slate-500">{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心团队 */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-8xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">核心团队</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              由行业精英组成的专业团队，为您的学习保驾护航
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-square relative overflow-hidden">
                  <SafeImage
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    index={i}
                    icon={User}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 hover:opacity-20 transition-opacity duration-500`} />
                </div>
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className={`inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                    {member.role}
                  </div>
                  <p className="text-slate-500 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-8xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">联系我们</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              期待与您的交流与合作
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Phone, 
                title: '客服热线', 
                value: companyInfo.phone,
                subtitle: '7×24小时服务',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Mail, 
                title: '电子邮箱', 
                value: companyInfo.email,
                subtitle: '工作日24小时内回复',
                gradient: 'from-violet-500 to-purple-500'
              },
              { 
                icon: MapPin, 
                title: '公司地址', 
                value: companyInfo.address,
                subtitle: '学考合一大厦',
                gradient: 'from-emerald-500 to-teal-500'
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 text-center">{item.title}</h3>
                  <p className="text-white/90 text-center mb-1">{item.value}</p>
                  <p className="text-slate-400 text-sm text-center">{item.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <motion.a
              href="#/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              立即咨询
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
