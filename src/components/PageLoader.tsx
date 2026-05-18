import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          >
            <div className="text-center">
              {/* Logo 动画 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
              >
                {/* Logo - 保持静止 */}
                <motion.div
                  className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <Logo size={60} />
                </motion.div>
                
                {/* 脉冲发光效果 */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.9, 1.3, 0.9]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/40 via-violet-400/40 to-fuchsia-400/40 rounded-2xl blur-xl -z-10"
                />
                
                {/* 第二层光晕 - 增强脉冲效果 */}
                <motion.div
                  animate={{ 
                    opacity: [0.1, 0.5, 0.1],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-violet-300/30 to-fuchsia-300/30 rounded-2xl blur-2xl -z-20"
                />
              </motion.div>

              {/* 品牌名称 */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-slate-900 mb-2"
              >
                学考合一
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-slate-500 text-sm mb-8"
              >
                做有温度有结果的教育
              </motion.p>

              {/* 进度条 */}
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 rounded-full"
                />
              </div>
              
              {/* 加载文字 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-xs mt-4"
              >
                正在加载资源...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页面内容 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
