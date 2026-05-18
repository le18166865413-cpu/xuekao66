import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Lock, User, Eye, EyeOff, LogOut, UserCircle, Sparkles, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const navItems = [
  { name: '首页', href: '#/', id: 'home' },
  { name: '课程中心', href: '#/courses', id: 'courses' },
  { name: '伴学中心', href: '#/companion', id: 'companion' },
  { name: '知识评测', href: '#/assessment', id: 'assessment' },
  { name: '高考资讯', href: '#/news', id: 'news' },
  { name: '免费资料', href: '#/materials', id: 'materials' },
  { name: '合伙人计划2.0', href: '#/partner', id: 'partner' },
  { name: 'APP下载', href: '#/app', id: 'app' },
];

const authenticatedNavItems = [
  { name: '首页', href: '#/', id: 'home' },
  { name: '课程中心', href: '#/courses', id: 'courses' },
  { name: '伴学中心', href: '#/companion', id: 'companion' },
  { name: '知识评测', href: '#/assessment', id: 'assessment' },
  { name: '高考资讯', href: '#/news', id: 'news' },
  { name: '免费资料', href: '#/materials', id: 'materials' },
  { name: '合伙人计划2.0', href: '#/partner', id: 'partner' },
  { name: 'APP下载', href: '#/app', id: 'app' },
];

const adminNavItems = [
  { name: '首页', href: '#/', id: 'home' },
  { name: '课程中心', href: '#/courses', id: 'courses' },
  { name: '伴学中心', href: '#/companion', id: 'companion' },
  { name: '知识评测', href: '#/assessment', id: 'assessment' },
  { name: '高考资讯', href: '#/news', id: 'news' },
  { name: '免费资料', href: '#/materials', id: 'materials' },
  { name: '合伙人计划2.0', href: '#/partner', id: 'partner' },
  { name: 'APP下载', href: '#/app', id: 'app' },
];

/**
 * 导航栏组件
 * 支持滚动时背景变化、移动端菜单、无障碍访问
 * 采用现代玻璃态设计风格，集成用户认证系统
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, login, register, logout, isAuthenticated, isStaff } = useAuth();

  const currentNavItems = isAuthenticated 
    ? (isStaff ? adminNavItems : authenticatedNavItems)
    : navItems;

  const handleNavClick = useCallback((id: string, href: string) => {
    setActiveNav(id);
    setIsMobileMenuOpen(false);
    window.location.hash = href;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const openAuthModal = (loginMode: boolean) => {
    setIsLoginMode(loginMode);
    setShowAuthModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setAuthError('');
    setAuthSuccess('');
    document.body.style.overflow = '';
  };

  const validateForm = () => {
    if (!email) {
      setAuthError('请输入邮箱');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError('请输入有效的邮箱地址');
      return false;
    }
    if (!isLoginMode && !name) {
      setAuthError('请输入姓名');
      return false;
    }
    if (!password) {
      setAuthError('请输入密码');
      return false;
    }
    if (password.length < 6) {
      setAuthError('密码长度至少6位');
      return false;
    }
    if (!isLoginMode && password !== confirmPassword) {
      setAuthError('两次输入的密码不一致');
      return false;
    }
    setAuthError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let result;
      if (isLoginMode) {
        result = await login(email, password);
      } else {
        result = await register(email, name, password);
      }

      if (result.success) {
        setAuthSuccess(result.message);
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      } else {
        setAuthError(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    handleNavClick('home', '#/');
  };

  // 使用 useCallback 优化滚动事件处理函数
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);
    
    // 根据滚动位置更新活动导航
    const sections = currentNavItems.map(item => document.getElementById(item.id));
    const scrollPosition = scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveNav(currentNavItems[i].id);
        break;
      }
    }
  }, [currentNavItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 切换移动端菜单时禁止背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-blue-100/95 backdrop-blur-xl border-b border-blue-300/60 shadow-soft' 
            : 'bg-blue-100/85'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="学考合一 - 返回首页"
            >
              <motion.div 
                className="rounded-lg flex items-center justify-center shadow-md group-hover:shadow-blue-500/25 transition-shadow bg-white"
                style={{ width: '36px', height: '36px' }}
                whileHover={{ rotate: 5 }}
              >
                <Logo size={28} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900">学考合一</span>
                {isScrolled && (
                  <motion.span 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-slate-500 hidden lg:block"
                  >
                    做有温度有结果的教育
                  </motion.span>
                )}
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="主导航">
              {currentNavItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                    activeNav === item.id 
                      ? 'text-slate-900' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-current={activeNav === item.id ? 'page' : undefined}
                >
                  <span className="relative inline-block">{item.name}
                    {activeNav === item.id && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}</span>
                </motion.button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {/* Notification bell */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="通知"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                  </motion.button>
                  
                  {/* User menu */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-medium">
                        {user?.name?.[0] || user?.email?.[0] || 'U'}
                      </div>
                      <span className="max-w-[100px] truncate">{user?.name || user?.email}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showUserMenu && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setShowUserMenu(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                          >
                            <div className="p-3 border-b border-slate-100">
                              <p className="text-sm font-medium text-slate-900">{user?.name || '用户'}</p>
                              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                            <button
                              onClick={() => {
                                setShowUserMenu(false);
                                handleNavClick('profile', '#/profile');
                              }}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <UserCircle className="w-4 h-4" />
                              个人中心
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              退出登录
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                  <motion.button
                    onClick={() => openAuthModal(true)}
                    className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors px-4 py-2.5 rounded-lg hover:bg-slate-50"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="登录"
                  >
                    登录
                  </motion.button>
                  <motion.button
                    onClick={() => openAuthModal(false)}
                    className="text-sm font-medium bg-gradient-to-r from-blue-500 to-violet-500 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="免费注册"
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      免费注册
                    </span>
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl hover:bg-slate-50 transition-colors"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-slate-900" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm lg:hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMobileMenu}
                aria-hidden="true"
              />
              {/* Menu Panel */}
              <motion.div
                className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50 fixed top-20 left-0 right-0 bottom-0 overflow-y-auto shadow-2xl z-40"
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <nav className="px-6 py-8 space-y-2" role="navigation" aria-label="移动端导航">
                  {currentNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id, item.href)}
                      className={`block py-4 px-4 text-lg font-medium rounded-xl transition-colors w-full text-left ${
                        activeNav === item.id ? 'text-slate-900 bg-gradient-to-r from-blue-50 to-violet-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.name}
                      {activeNav === item.id && (
                        <motion.div
                          layoutId="mobileActiveNav"
                          className="inline-block ml-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-medium">
                              {user?.name?.[0] || user?.email?.[0] || 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{user?.name || '用户'}</p>
                              <p className="text-xs text-slate-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 justify-center px-4 py-4 text-rose-600 hover:text-rose-700 font-medium rounded-xl hover:bg-rose-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <LogOut className="w-5 h-5" />
                          退出登录
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => openAuthModal(true)}
                          className="w-full py-4 text-slate-700 hover:text-slate-900 font-medium text-left px-4 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          登录
                        </button>
                        <button 
                          onClick={() => openAuthModal(false)}
                          className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            免费注册
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
              onClick={closeAuthModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-8"
            >
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isLoginMode ? '欢迎回来' : '创建账号'}
                </h2>
                <p className="text-slate-500 mt-1">
                  {isLoginMode ? '请登录您的账号' : '开启您的学习之旅'}
                </p>
              </div>

              {authError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl"
                >
                  {authError}
                </motion.div>
              )}

              {authSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl"
                >
                  {authSuccess}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">姓名</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="请输入姓名"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="请输入邮箱"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入密码"
                      className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">确认密码</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="请再次输入密码"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl transition-all"
                      />
                    </div>
                  </div>
                )}

                {isLoginMode && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      忘记密码？
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-3.5 font-semibold rounded-xl transition-all ${
                    isSubmitting
                      ? 'bg-slate-700 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      处理中...
                    </span>
                  ) : (
                    isLoginMode ? '登录' : '注册'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-slate-500 text-sm">
                  {isLoginMode ? '还没有账号？' : '已有账号？'}
                </span>
                <button
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  {isLoginMode ? '立即注册' : '立即登录'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
