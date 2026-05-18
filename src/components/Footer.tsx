import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';
import Logo from './Logo';

interface FooterLink {
  name: string;
  href: string;
  id: string;
}

const quickLinks: FooterLink[] = [
  { name: '课程中心', href: '#/courses', id: 'courses' },
  { name: '知识评测', href: '#/assessment', id: 'assessment' },
  { name: '免费资料', href: '#/materials', id: 'materials' },
  { name: '关于我们', href: '#/about', id: 'about' },
];

const services: FooterLink[] = [
  { name: '在线课程', href: '#/courses', id: 'courses' },
  { name: 'AI测评', href: '#/assessment', id: 'assessment' },
  { name: '名师辅导', href: '#/courses', id: 'courses' },
  { name: '学习资料', href: '#/materials', id: 'materials' },
];

const handleNavClick = (id: string, href: string) => {
  window.location.hash = href;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * 页脚组件
 * 采用现代卡片式设计，带有渐变装饰和悬停效果
 */
export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
      
      <div className="container-custom relative py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-md bg-white">
                <Logo size={22} />
              </div>
              <span className="text-lg font-bold text-slate-900">学考合一</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              专注教育提分，汇聚名师资源，为每一位学生提供个性化的学习方案。
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 border-2 border-white"
                  />
                ))}
              </div>
              <span>50万+ 学员信赖</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            aria-label="页脚快速链接"
          >
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
              快速链接
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id, link.href)}
                    className="group text-sm text-slate-500 hover:text-slate-900 transition-colors 
                               inline-flex items-center gap-2 focus:outline-none focus:ring-2 
                               focus:ring-blue-500 focus:ring-offset-2 rounded p-1 -m-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            aria-label="页脚服务项目"
          >
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
              服务项目
            </h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id + service.name}>
                  <button
                    onClick={() => handleNavClick(service.id, service.href)}
                    className="group text-sm text-slate-500 hover:text-slate-900 transition-colors 
                               inline-flex items-center gap-2 focus:outline-none focus:ring-2 
                               focus:ring-blue-500 focus:ring-offset-2 rounded p-1 -m-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-violet-500 transition-colors" />
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
              联系我们
            </h3>
            <address className="not-italic space-y-4">
              <a 
                href="tel:4008889999" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'tel:4008889999';
                }}
                className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" aria-hidden="true" />
                </div>
                <span>400-888-9999</span>
              </a>
              <a 
                href="mailto:contact@xuekao.com" 
                className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-violet-500" aria-hidden="true" />
                </div>
                <span>contact@xuekao.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                </div>
                <span>北京市海淀区中关村大街1号</span>
              </div>
            </address>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} 学考合一教育科技有限公司 版权所有
            </p>
            <nav className="flex gap-6 text-sm" aria-label="法律条款">
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                隐私政策
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                服务条款
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
