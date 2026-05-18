import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 200);
    }
  }, [location, displayLocation]);

  return (
    <motion.div
      key={displayLocation.pathname}
      initial="initial"
      animate={transitionStage === 'fadeIn' ? 'animate' : 'exit'}
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// 滚动到顶部钩子
export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
}
