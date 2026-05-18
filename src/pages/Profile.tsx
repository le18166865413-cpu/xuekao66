import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserCircle, BookOpen, Award, Calendar, TrendingUp, LogOut, CheckCircle, XCircle, Database, LayoutGrid, FileText, LayoutDashboard, MapPin, GraduationCap, Phone, Users, Target, Edit3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAssessments, Assessment } from '../utils/assessment';
import { getExamPapers, ExamPaper } from '../utils/examPaper';
import { getUsers } from '../utils/auth';
import { subjects } from '../utils/assessment';

/**
 * 个人资料项组件
 */
function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-base font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * 可编辑的个人资料项组件
 */
function EditProfileItem({ 
  icon, 
  label, 
  value, 
  onChange,
  type = "text"
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  onChange: (val: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`请输入${label}`}
        />
      </div>
    </div>
  );
}

/**
 * 可编辑的科目选择组件
 */
function EditSubjectsItem({ 
  icon, 
  label, 
  value, 
  onChange
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string[]; 
  onChange: (val: string[]) => void;
}) {
  const subjectOptions = ['数学', '语文', '英语', '物理', '化学', '生物'];
  
  const toggleSubject = (subject: string) => {
    if (value.includes(subject)) {
      onChange(value.filter(s => s !== subject));
    } else {
      onChange([...value, subject]);
    }
  };
  
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {subjectOptions.map((subject) => (
          <button
            key={subject}
            onClick={() => toggleSubject(subject)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              value.includes(subject)
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 个人中心页面
 * 展示用户信息、学习记录和评估结果
 */
export default function Profile() {
  const { user, logout, isAuthenticated, isStaff } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    if (user) {
      const userAssessments = getAssessments(user.id);
      const userPapers = getExamPapers(user.id);
      setAssessments(userAssessments);
      setPapers(userPapers);
      
      // 初始化编辑数据
      if (user.role === 'parent') {
        setEditData({
          childName: user.childName || '',
          childRegion: user.childRegion || '',
          childSchool: user.childSchool || '',
          childPhone: user.childPhone || '',
          childSubjects: user.childSubjects || [],
          childScore: user.childScore || ''
        });
      } else {
        setEditData({
          name: user.name || '',
          region: user.region || '',
          school: user.school || '',
          studentPhone: user.studentPhone || '',
          parentPhone: user.parentPhone || '',
          subjects: user.subjects || [],
          score: user.score || ''
        });
      }
    }
    setLoading(false);
  }, [user]);

  // 保存编辑
  const handleSaveEdit = () => {
    if (!user) return;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...editData };
      localStorage.setItem('xuekao_users', JSON.stringify(users));
      
      // 刷新页面来更新上下文
      window.location.reload();
    }
    setIsEditing(false);
  };

  // 开始编辑
  const handleStartEdit = () => {
    if (user?.role === 'parent') {
      setEditData({
        childName: user.childName || '',
        childRegion: user.childRegion || '',
        childSchool: user.childSchool || '',
        childPhone: user.childPhone || '',
        childSubjects: user.childSubjects || [],
        childScore: user.childScore || ''
      });
    } else {
      setEditData({
        name: user?.name || '',
        region: user?.region || '',
        school: user?.school || '',
        studentPhone: user?.studentPhone || '',
        parentPhone: user?.parentPhone || '',
        subjects: user?.subjects || [],
        score: user?.score || ''
      });
    }
    setIsEditing(true);
  };

  const getSubjectName = (subject: string) => {
    const subjects: { [key: string]: string } = {
      'math': '数学',
      'chinese': '语文',
      'english': '英语',
      'physics': '物理',
      'chemistry': '化学',
      'biology': '生物'
    };
    return subjects[subject] || subject;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-rose-100';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalScore = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length)
    : 0;

  const getRoleBadge = (role: string) => {
    const roleConfig: { [key: string]: { label: string; color: string; icon: string } } = {
      'admin': { label: '管理员', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '👑' },
      'company': { label: '公司员工', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '💼' },
      'paid': { label: '付费用户', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '💎' },
      'student': { label: '学生', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: '🎓' },
      'parent': { label: '家长', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: '👨‍👩‍👧' },
    };

    const config = roleConfig[role] || roleConfig['student'];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  };

  return (
    <div id="profile" className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <UserCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {user?.name || user?.email}
                  </h1>
                  {user?.role && getRoleBadge(user.role)}
                </div>
                <p className="text-slate-500 mb-4">{user?.email}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>加入时间: {new Date().toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Personal Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {user?.role === 'parent' ? '您的孩子资料' : '个人资料'}
                </h2>
                <p className="text-slate-500 text-sm">
                  {user?.role === 'parent' ? '查看和管理孩子的学习信息' : '查看和管理个人学习信息'}
                </p>
              </div>
              {!isEditing ? (
                <motion.button
                  onClick={handleStartEdit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  编辑资料
                </motion.button>
              ) : (
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setIsEditing(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    onClick={handleSaveEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    保存
                  </motion.button>
                </div>
              )}
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user?.role === 'parent' ? (
                  <>
                    <ProfileItem 
                      icon={<Users className="w-5 h-5 text-purple-500" />} 
                      label="孩子姓名" 
                      value={user.childName || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<MapPin className="w-5 h-5 text-blue-500" />} 
                      label="地区" 
                      value={user.childRegion || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<GraduationCap className="w-5 h-5 text-green-500" />} 
                      label="学校" 
                      value={user.childSchool || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Phone className="w-5 h-5 text-orange-500" />} 
                      label="联系电话" 
                      value={user.childPhone || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Target className="w-5 h-5 text-pink-500" />} 
                      label="已报科目" 
                      value={user.childSubjects?.join('、') || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Award className="w-5 h-5 text-yellow-500" />} 
                      label="报名时的分数" 
                      value={user.childScore ? `${user.childScore}分` : '未填写'} 
                    />
                  </>
                ) : (
                  <>
                    <ProfileItem 
                      icon={<Users className="w-5 h-5 text-purple-500" />} 
                      label="姓名" 
                      value={user?.name || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<MapPin className="w-5 h-5 text-blue-500" />} 
                      label="地区" 
                      value={user?.region || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<GraduationCap className="w-5 h-5 text-green-500" />} 
                      label="学校" 
                      value={user?.school || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Phone className="w-5 h-5 text-orange-500" />} 
                      label="学生电话" 
                      value={user?.studentPhone || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Phone className="w-5 h-5 text-cyan-500" />} 
                      label="家长电话" 
                      value={user?.parentPhone || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Target className="w-5 h-5 text-pink-500" />} 
                      label="已报科目" 
                      value={user?.subjects?.join('、') || '未填写'} 
                    />
                    <ProfileItem 
                      icon={<Award className="w-5 h-5 text-yellow-500" />} 
                      label="报名时的分数" 
                      value={user?.score ? `${user.score}分` : '未填写'} 
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user?.role === 'parent' ? (
                  <>
                    <EditProfileItem 
                      icon={<Users className="w-5 h-5 text-purple-500" />} 
                      label="孩子姓名" 
                      value={editData.childName}
                      onChange={(val) => setEditData({...editData, childName: val})}
                    />
                    <EditProfileItem 
                      icon={<MapPin className="w-5 h-5 text-blue-500" />} 
                      label="地区" 
                      value={editData.childRegion}
                      onChange={(val) => setEditData({...editData, childRegion: val})}
                    />
                    <EditProfileItem 
                      icon={<GraduationCap className="w-5 h-5 text-green-500" />} 
                      label="学校" 
                      value={editData.childSchool}
                      onChange={(val) => setEditData({...editData, childSchool: val})}
                    />
                    <EditProfileItem 
                      icon={<Phone className="w-5 h-5 text-orange-500" />} 
                      label="联系电话" 
                      value={editData.childPhone}
                      onChange={(val) => setEditData({...editData, childPhone: val})}
                    />
                    <EditSubjectsItem
                      icon={<Target className="w-5 h-5 text-pink-500" />}
                      label="已报科目"
                      value={editData.childSubjects || []}
                      onChange={(val) => setEditData({...editData, childSubjects: val})}
                    />
                    <EditProfileItem 
                      icon={<Award className="w-5 h-5 text-yellow-500" />} 
                      label="报名时的分数" 
                      value={editData.childScore}
                      onChange={(val) => setEditData({...editData, childScore: val})}
                      type="number"
                    />
                  </>
                ) : (
                  <>
                    <EditProfileItem 
                      icon={<Users className="w-5 h-5 text-purple-500" />} 
                      label="姓名" 
                      value={editData.name}
                      onChange={(val) => setEditData({...editData, name: val})}
                    />
                    <EditProfileItem 
                      icon={<MapPin className="w-5 h-5 text-blue-500" />} 
                      label="地区" 
                      value={editData.region}
                      onChange={(val) => setEditData({...editData, region: val})}
                    />
                    <EditProfileItem 
                      icon={<GraduationCap className="w-5 h-5 text-green-500" />} 
                      label="学校" 
                      value={editData.school}
                      onChange={(val) => setEditData({...editData, school: val})}
                    />
                    <EditProfileItem 
                      icon={<Phone className="w-5 h-5 text-orange-500" />} 
                      label="学生电话" 
                      value={editData.studentPhone}
                      onChange={(val) => setEditData({...editData, studentPhone: val})}
                    />
                    <EditProfileItem 
                      icon={<Phone className="w-5 h-5 text-cyan-500" />} 
                      label="家长电话" 
                      value={editData.parentPhone}
                      onChange={(val) => setEditData({...editData, parentPhone: val})}
                    />
                    <EditSubjectsItem
                      icon={<Target className="w-5 h-5 text-pink-500" />}
                      label="已报科目"
                      value={editData.subjects || []}
                      onChange={(val) => setEditData({...editData, subjects: val})}
                    />
                    <EditProfileItem 
                      icon={<Award className="w-5 h-5 text-yellow-500" />} 
                      label="报名时的分数" 
                      value={editData.score}
                      onChange={(val) => setEditData({...editData, score: val})}
                      type="number"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Admin/Staff Section */}
        {isStaff && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {user?.role === 'admin' ? '管理员功能' : '员工功能'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    管理系统功能入口
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    window.location.hash = '#/question-bank';
                    window.location.reload();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Database className="w-5 h-5" />
                  题库管理
                </motion.button>
                <motion.button
                  onClick={() => {
                    window.location.hash = '#/admin/dashboard';
                    window.location.reload();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  后台管理
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              label: '完成评估',
              value: assessments.length,
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: FileText,
              label: '上传试卷',
              value: papers.length,
              color: 'from-amber-500 to-orange-600'
            },
            {
              icon: TrendingUp,
              label: '平均得分',
              value: `${totalScore}分`,
              color: 'from-violet-500 to-violet-600'
            },
            {
              icon: Award,
              label: '优秀率',
              value: `${Math.round(assessments.filter(a => a.score >= 80).length * 100 / Math.max(assessments.length, 1))}%`,
              color: 'from-emerald-500 to-emerald-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + (isStaff ? 0.1 : 0) }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Assessment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">评估历史</h2>
            <span className="text-slate-500 text-sm">共 {assessments.length} 次</span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500">加载中...</p>
            </div>
          ) : assessments.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">暂无评估记录</h3>
              <p className="text-slate-500 mb-6">开始您的第一次知识评估吧！</p>
              <motion.button
                onClick={() => {
                  window.location.hash = '#/assessment';
                  const element = document.getElementById('assessment');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                立即评估
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <motion.button
                  key={assessment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => window.location.hash = `#/assessment/${assessment.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-left cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {getSubjectName(assessment.subject)}
                        </h3>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(assessment.score)} ${getScoreColor(assessment.score)}`}>
                          {assessment.score >= 60 ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {assessment.score}分
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>正确 {assessment.correctAnswers}/{assessment.totalQuestions} 题</span>
                        <span>用时 {Math.round(assessment.timeSpent / 60)} 分钟</span>
                        <span>{formatDate(assessment.completedAt)}</span>
                      </div>
                    </div>

                    {/* Chapter Analysis */}
                    {Object.keys(assessment.chapterAnalysis).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(assessment.chapterAnalysis).map(([chapter, data]) => (
                          <div
                            key={chapter}
                            className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600"
                            title={`${chapter}: ${data.score}分`}
                          >
                            {chapter}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Exam Papers History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">历史试卷</h2>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-sm">共 {papers.length} 份</span>
              <motion.button
                onClick={() => window.location.hash = '#/upload-paper'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <FileText className="w-4 h-4" />
                上传试卷
              </motion.button>
            </div>
          </div>

          {papers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">暂无历史试卷</h3>
              <p className="text-slate-500 mb-6">上传你的考试试卷，获取详细分析！</p>
              <motion.button
                onClick={() => window.location.hash = '#/upload-paper'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                立即上传
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {papers.map((paper, index) => {
                const subject = subjects.find(s => s.id === paper.subject);
                const scorePercentage = Math.round((paper.userScore / paper.totalScore) * 100);
                const getScoreColor = () => {
                  if (scorePercentage >= 80) return 'from-emerald-500 to-teal-500';
                  if (scorePercentage >= 60) return 'from-amber-500 to-orange-500';
                  return 'from-rose-500 to-pink-500';
                };

                return (
                  <motion.button
                    key={paper.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    onClick={() => window.location.hash = `#/paper/${paper.id}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-left cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {paper.title}
                          </h3>
                          {subject && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                              {subject.icon} {subject.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span>{paper.examDate}</span>
                          {paper.description && (
                            <span className="text-slate-400">•</span>
                          )}
                          {paper.description && (
                            <span className="text-slate-500 line-clamp-1">
                              {paper.description}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${getScoreColor()} rounded-full flex items-center justify-center text-white font-bold`}>
                            {scorePercentage}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900">
                              {paper.userScore}分
                            </span>
                            <span className="text-slate-400">/</span>
                            <span className="text-slate-500">
                              {paper.totalScore}分
                            </span>
                          </div>
                        </div>
                      </div>
                      {paper.images.length > 0 && (
                        <div className="flex gap-1">
                          {paper.images.slice(0, 3).map((img, i) => (
                          <img
                              key={i}
                              src={img}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                            />
                          ))}
                          {paper.images.length > 3 && (
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-medium border border-slate-200">
                              +{paper.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
