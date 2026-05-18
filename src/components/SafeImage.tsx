import { useState } from 'react';

// 渐变色方案库
const gradients = [
  'from-blue-400 to-violet-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-cyan-400 to-blue-500',
  'from-violet-400 to-fuchsia-500',
  'from-green-400 to-emerald-500',
  'from-red-400 to-orange-500'
];

// 获取随机渐变色
export function getRandomGradient(index = 0) {
  return gradients[index % gradients.length];
}

// 图片占位符组件
export function ImagePlaceholder({ 
  alt, 
  index = 0, 
  className = '',
  icon: Icon
}: { 
  alt: string;
  index?: number;
  className?: string;
  icon?: any;
}) {
  const gradient = getRandomGradient(index);
  
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
      {Icon && <Icon className="w-16 h-16 text-white/50" />}
      <span className="sr-only">{alt}</span>
    </div>
  );
}

// 安全图片组件 - 如果图片加载失败就显示渐变占位符
export function SafeImage({
  src,
  alt,
  index = 0,
  className = '',
  icon: Icon,
  ...props
}: {
  src: string;
  alt: string;
  index?: number;
  className?: string;
  icon?: any;
  [key: string]: any;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return <ImagePlaceholder alt={alt} index={index} className={className} icon={Icon} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      crossOrigin="anonymous"
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
