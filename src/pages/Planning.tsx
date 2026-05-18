import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, GraduationCap, Briefcase, BookOpen, 
  BarChart3, Lightbulb, Calendar, CheckCircle,
  User, Award, TrendingUp, Compass
} from 'lucide-react';

const majors = [
  { id: 'cs', name: '计算机科学', category: '工科', description: '培养软件开发、人工智能、网络安全等方向人才', subjects: ['数学', '物理', '英语'] },
  { id: 'ee', name: '电气工程', category: '工科', description: '研究电能的生产、传输、分配和应用', subjects: ['物理', '数学'] },
  { id: 'me', name: '机械工程', category: '工科', description: '培养机械设计、制造、自动化领域人才', subjects: ['物理', '数学'] },
  { id: 'civil', name: '土木工程', category: '工科', description: '从事建筑设计、施工管理、结构分析', subjects: ['数学', '物理'] },
  { id: 'biology', name: '生物科学', category: '理科', description: '研究生命现象、生物结构与功能', subjects: ['生物', '化学'] },
  { id: 'chemistry', name: '化学', category: '理科', description: '研究物质的组成、结构和变化规律', subjects: ['化学', '数学'] },
  { id: 'business', name: '工商管理', category: '管理', description: '培养企业管理、市场营销、财务管理人才', subjects: ['数学', '英语'] },
  { id: 'law', name: '法学', category: '文科', description: '研究法律理论与实践，培养法律专业人才', subjects: ['语文', '政治'] },
  { id: 'medicine', name: '临床医学', category: '医学', description: '培养临床医疗、诊断、治疗专业人才', subjects: ['生物', '化学', '物理'] },
  { id: 'art', name: '艺术设计', category: '艺术', description: '培养视觉传达、环境设计、工业设计人才', subjects: ['美术', '语文'] },
];

const universities = [
  { id: 'pku', name: '北京大学', type: '985/211', location: '北京', majors: ['cs', 'biology', 'chemistry', 'law'] },
  { id: 'tsinghua', name: '清华大学', type: '985/211', location: '北京', majors: ['cs', 'ee', 'me', 'civil'] },
  { id: 'fudan', name: '复旦大学', type: '985/211', location: '上海', majors: ['business', 'law', 'medicine'] },
  { id: 'shanghai', name: '上海交通大学', type: '985/211', location: '上海', majors: ['cs', 'me', 'medicine'] },
  { id: 'zhejiang', name: '浙江大学', type: '985/211', location: '浙江', majors: ['cs', 'biology', 'medicine'] },
  { id: 'nju', name: '南京大学', type: '985/211', location: '江苏', majors: ['chemistry', 'cs', 'business'] },
];

const careerPaths = [
  { id: 'software', name: '软件工程师', required: ['cs'], avgSalary: '15-30K', growth: '高' },
  { id: 'data', name: '数据分析师', required: ['cs', 'biology'], avgSalary: '12-25K', growth: '高' },
  { id: 'engineer', name: '电气工程师', required: ['ee'], avgSalary: '10-20K', growth: '中' },
  { id: 'doctor', name: '医生', required: ['medicine'], avgSalary: '15-40K', growth: '稳定' },
  { id: 'lawyer', name: '律师', required: ['law'], avgSalary: '10-50K', growth: '中' },
  { id: 'manager', name: '企业管理', required: ['business'], avgSalary: '12-35K', growth: '中' },
  { id: 'designer', name: '设计师', required: ['art'], avgSalary: '8-20K', growth: '中' },
];

const studyPlanTemplates = [
  { id: 'science', name: '理科冲刺计划', duration: '6个月', subjects: ['数学', '物理', '化学'], focus: '强化基础，提升难题能力' },
  { id: 'arts', name: '文科提升计划', duration: '6个月', subjects: ['语文', '英语', '政治'], focus: '积累素材，提升写作能力' },
  { id: 'comprehensive', name: '综合提升计划', duration: '12个月', subjects: ['全部科目'], focus: '全面发展，均衡提升' },
];

export default function Planning() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<{
    name: string;
    grade: string;
    targetScore: string;
    interests: string[];
    strengths: string[];
    weaknesses: string[];
  }>({
    name: '',
    grade: '',
    targetScore: '',
    interests: [],
    strengths: [],
    weaknesses: []
  });
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const tabs = [
    { id: 'profile', name: '个人画像', icon: User },
    { id: 'major', name: '专业探索', icon: GraduationCap },
    { id: 'career', name: '职业规划', icon: Briefcase },
    { id: 'plan', name: '学习计划', icon: Calendar },
    { id: 'resources', name: '资料中心', icon: BookOpen },
  ];

  const interests = ['编程', '数学', '阅读', '绘画', '音乐', '运动', '写作', '实验'];

  return (
    <div id="planning" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 pt-24 pb-16">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 text-slate-700 text-sm rounded-full mb-6">
            <Compass className="w-4 h-4" />
            升学规划中心
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">智能升学规划系统</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            通过科学的自我评估、专业探索和职业规划，为您制定个性化的升学路径
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-600" />
                    个人信息录入
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="请输入您的姓名"
                        className="w-full px-4 py-3 border border-slate-200 focus:border-slate-400 rounded-xl focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">年级</label>
                      <select
                        value={profile.grade}
                        onChange={(e) => setProfile(prev => ({ ...prev, grade: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 focus:border-slate-400 rounded-xl focus:outline-none transition-colors"
                      >
                        <option value="">请选择年级</option>
                        <option value="高一">高一</option>
                        <option value="高二">高二</option>
                        <option value="高三">高三</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">目标分数</label>
                      <input
                        type="number"
                        value={profile.targetScore}
                        onChange={(e) => setProfile(prev => ({ ...prev, targetScore: e.target.value }))}
                        placeholder="请输入目标高考分数"
                        className="w-full px-4 py-3 border border-slate-200 focus:border-slate-400 rounded-xl focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                    兴趣爱好
                  </h2>
                  <div className="grid grid-cols-4 gap-3">
                    {interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`py-3 px-4 rounded-xl border-2 transition-all ${
                          profile.interests.includes(interest)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-400 text-slate-600'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-3">优势学科</label>
                    <div className="flex flex-wrap gap-2">
                      {['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理'].map(subject => (
                        <button
                          key={subject}
                          onClick={() => setProfile(prev => ({
                            ...prev,
                            strengths: prev.strengths.includes(subject)
                              ? prev.strengths.filter(s => s !== subject)
                              : [...prev.strengths, subject]
                          }))}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            profile.strengths.includes(subject)
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-3">薄弱学科</label>
                    <div className="flex flex-wrap gap-2">
                      {['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理'].map(subject => (
                        <button
                          key={subject}
                          onClick={() => setProfile(prev => ({
                            ...prev,
                            weaknesses: prev.weaknesses.includes(subject)
                              ? prev.weaknesses.filter(s => s !== subject)
                              : [...prev.weaknesses, subject]
                          }))}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            profile.weaknesses.includes(subject)
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'major' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-violet-600" />
                    专业探索
                  </h2>
                  <div className="flex gap-2">
                    {['全部', '工科', '理科', '管理', '文科', '医学', '艺术'].map(category => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          category === '全部'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {majors.map(major => (
                    <motion.div
                      key={major.id}
                      onClick={() => setSelectedMajor(selectedMajor === major.id ? null : major.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedMajor === major.id
                          ? 'border-violet-500 bg-violet-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900">{major.name}</h3>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          {major.category}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{major.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {major.subjects.map(subject => (
                          <span key={subject} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                            {subject}
                          </span>
                        ))}
                      </div>
                      {selectedMajor === major.id && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h4 className="font-semibold text-slate-900 mb-2">推荐院校</h4>
                          <div className="flex flex-wrap gap-2">
                            {universities.filter(u => u.majors.includes(major.id)).map(university => (
                              <span key={university.id} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                                {university.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'career' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-emerald-600" />
                  职业规划
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {careerPaths.map(career => (
                    <motion.div
                      key={career.id}
                      onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCareer === career.id
                          ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900">{career.name}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          career.growth === '高' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : career.growth === '稳定'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {career.growth}增长
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">平均薪资</span>
                          <span className="font-medium text-slate-900">{career.avgSalary}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">相关专业</span>
                          <div className="flex gap-1">
                            {career.required.map(m => (
                              <span key={m} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                                {majors.find(ma => ma.id === m)?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'plan' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-amber-600" />
                  学习计划
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {studyPlanTemplates.map(plan => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{plan.name}</h3>
                          <span className="text-sm text-slate-500">{plan.duration}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{plan.focus}</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.subjects.map(subject => (
                          <span key={subject} className="px-3 py-1 bg-white text-slate-600 text-sm rounded-full border border-slate-200">
                            {subject}
                          </span>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
                        开始计划
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-4">学习进度追踪</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">75%</div>
                      <div className="text-sm text-slate-500">数学</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-violet-600">82%</div>
                      <div className="text-sm text-slate-500">英语</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">68%</div>
                      <div className="text-sm text-slate-500">物理</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  资料中心
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: '高考真题详解', type: '真题', size: '2.5MB', downloads: '1.2万' },
                    { title: '学科知识点总结', type: '知识点', size: '1.8MB', downloads: '8.6千' },
                    { title: '错题本模板', type: '模板', size: '500KB', downloads: '5.2千' },
                    { title: '学习计划表', type: '工具', size: '300KB', downloads: '3.8千' },
                    { title: '名校招生简章汇总', type: '资讯', size: '3.2MB', downloads: '6.1千' },
                    { title: '专业介绍大全', type: '指南', size: '4.5MB', downloads: '9.3千' },
                  ].map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-violet-100 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{resource.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="px-2 py-0.5 bg-slate-200 rounded">{resource.type}</span>
                            <span>{resource.size}</span>
                            <span>下载 {resource.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                        下载
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">985</div>
            <div className="text-sm text-slate-500">目标院校</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-violet-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">680</div>
            <div className="text-sm text-slate-500">目标分数</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">120</div>
            <div className="text-sm text-slate-500">剩余天数</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">8</div>
            <div className="text-sm text-slate-500">已完成测评</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
