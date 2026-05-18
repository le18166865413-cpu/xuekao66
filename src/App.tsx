import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import PageTransition, { useScrollToTop } from './components/PageTransition';
import AdminLayout from './components/admin/AdminLayout';
import './styles/admin.css';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Assessment from './pages/Assessment';
import AssessmentDetail from './pages/AssessmentDetail';
import ExamPaperUpload from './pages/ExamPaperUpload';
import ExamPaperAnalysis from './pages/ExamPaperAnalysis';
import Materials from './pages/Materials';
import About from './pages/About';
import Profile from './pages/Profile';
import Planning from './pages/Planning';
import QuestionBank from './pages/QuestionBank';
import ImageBank from './pages/ImageBank';
import SystemMonitor from './pages/SystemMonitor';
import FeatureManager from './pages/FeatureManager';
import ModuleConfigManager from './pages/ModuleConfigManager';
import Companion from './pages/Companion';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Partner from './pages/Partner';
import CourseDetail from './pages/CourseDetail';
import AppDownload from './pages/AppDownload';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNews from './pages/admin/News';
import AdminCourses from './pages/admin/Courses';
import AdminMaterials from './pages/admin/Materials';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminTeachers from './pages/admin/Teachers';
import AdminStudents from './pages/admin/Students';
import AdminPartners from './pages/admin/Partners';
import AdminAchievements from './pages/admin/Achievements';
import AdminQuickEntries from './pages/admin/QuickEntries';
import AdminUniversities from './pages/admin/Universities';
import AdminMajors from './pages/admin/Majors';
import AdminCompanionPlans from './pages/admin/CompanionPlans';
import AdminAppDownloads from './pages/admin/AppDownloads';
import AdminHeroSlides from './pages/admin/HeroSlides';
import AdminStats from './pages/admin/StatsAdmin';
import AdminFeatures from './pages/admin/FeaturesAdmin';
import AdminAboutPage from './pages/admin/AboutPage';
import AdminSystemMonitor from './pages/admin/SystemMonitor';
import AdminFeatureManager from './pages/admin/FeatureManager';
import AdminModuleConfigManager from './pages/admin/ModuleConfigManager';
import AdminPlaceholder from './components/admin/AdminPlaceholder';

// 管理后台页面路由，不显示官网Header和Footer
const adminRoutes = ['/question-bank', '/image-bank', '/monitor', '/features', '/config', '/admin'];

// 路由包装组件，包含页面过渡和滚动到顶部
function RouteWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <PageTransition>{children}</PageTransition>;
}

function AppContent() {
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);
  
  useEffect(() => {
    // 检测是否是后台页面
    const checkIfAdmin = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        const isAdmin = hash.includes('#/admin') || 
                        hash.includes('#/question-bank') ||
                        hash.includes('#/image-bank') ||
                        hash.includes('#/monitor') ||
                        hash.includes('#/features') ||
                        hash.includes('#/config');
        setIsAdminPage(isAdmin);
      }
    };
    
    checkIfAdmin();
    
    // 监听 hash 变化
    const handleHashChange = () => {
      checkIfAdmin();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location]);
  
  return (
    <div className="min-h-screen bg-white">
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<RouteWrapper><Home /></RouteWrapper>} />
        <Route path="/courses" element={<RouteWrapper><Courses /></RouteWrapper>} />
        <Route path="/assessment" element={<RouteWrapper><Assessment /></RouteWrapper>} />
        <Route path="/assessment/:id" element={<RouteWrapper><AssessmentDetail /></RouteWrapper>} />
        <Route path="/upload-paper" element={<RouteWrapper><ExamPaperUpload /></RouteWrapper>} />
        <Route path="/paper/:id" element={<RouteWrapper><ExamPaperAnalysis /></RouteWrapper>} />
        <Route path="/materials" element={<RouteWrapper><Materials /></RouteWrapper>} />
        <Route path="/planning" element={<RouteWrapper><Planning /></RouteWrapper>} />
        <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
        <Route path="/profile" element={<RouteWrapper><Profile /></RouteWrapper>} />
        <Route path="/question-bank" element={<RouteWrapper><QuestionBank /></RouteWrapper>} />
        <Route path="/image-bank" element={<RouteWrapper><ImageBank /></RouteWrapper>} />
        <Route path="/monitor" element={<RouteWrapper><SystemMonitor /></RouteWrapper>} />
        <Route path="/features" element={<RouteWrapper><FeatureManager /></RouteWrapper>} />
        <Route path="/config" element={<RouteWrapper><ModuleConfigManager /></RouteWrapper>} />
        <Route path="/companion" element={<RouteWrapper><Companion /></RouteWrapper>} />
        <Route path="/news" element={<RouteWrapper><News /></RouteWrapper>} />
        <Route path="/news/:id" element={<RouteWrapper><NewsDetail /></RouteWrapper>} />
        <Route path="/partner" element={<RouteWrapper><Partner /></RouteWrapper>} />
        <Route path="/app" element={<RouteWrapper><AppDownload /></RouteWrapper>} />
        <Route path="/courses/:id" element={<RouteWrapper><CourseDetail /></RouteWrapper>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="hero-slides" element={<AdminHeroSlides />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="features" element={<AdminFeatures />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="system-monitor" element={<AdminSystemMonitor />} />
              <Route path="feature-manager" element={<AdminFeatureManager />} />
              <Route path="module-config" element={<AdminModuleConfigManager />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="materials" element={<AdminMaterials />} />
          <Route path="users" element={<AdminPlaceholder title="注册用户管理" />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="quick-entries" element={<AdminQuickEntries />} />
          <Route path="universities" element={<AdminUniversities />} />
          <Route path="majors" element={<AdminMajors />} />
          <Route path="companion-plans" element={<AdminCompanionPlans />} />
          <Route path="partner-programs" element={<AdminPlaceholder title="合伙人计划" />} />
          <Route path="oem-cases" element={<AdminPlaceholder title="OEM 合作案例" />} />
          <Route path="study-rooms" element={<AdminPlaceholder title="合作自习室" />} />
          <Route path="messages" element={<AdminPlaceholder title="留言管理" />} />
          <Route path="app-download" element={<AdminAppDownloads />} />
          <Route path="settings" element={<AdminPlaceholder title="系统设置" />} />
          <Route path="system-config" element={<AdminPlaceholder title="系统配置" />} />
        </Route>
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <HashRouter>
          <PageLoader>
            <AppContent />
          </PageLoader>
        </HashRouter>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
