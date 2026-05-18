import React from 'react';

interface SectionTitleProps {
  id?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
  noWheat?: boolean;
}

export default function SectionTitle({ id, children, title, subtitle, className = '', dark = false, noWheat = false }: SectionTitleProps) {
  const displayTitle = children || title;
  
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center gap-4">
        {!noWheat && (
          <>
            {/* 左边麦穗 */}
            <img
              src="/images/wheat-left.png"
              alt=""
              className="w-auto h-[48px] object-contain"
              style={{ transform: 'rotate(-15deg)' }}
              aria-hidden="true"
            />
          </>
        )}
        
        {/* 标题 */}
        <h2
          id={id}
          className={`text-display-sm lg:text-display-md font-bold ${dark ? 'text-white' : 'text-slate-900'} tracking-tight text-center ${className} m-0 leading-[1.2]`}
        >
          {displayTitle}
        </h2>
        
        {!noWheat && (
          <>
            {/* 右边麦穗 */}
            <img
              src="/images/wheat-right.png"
              alt=""
              className="w-auto h-[48px] object-contain"
              style={{ transform: 'rotate(15deg)' }}
              aria-hidden="true"
            />
          </>
        )}
      </div>
      
      {/* 副标题 */}
      {subtitle && (
        <p className={`text-lg ${dark ? 'text-white/80' : 'text-slate-600'} max-w-2xl mx-auto mt-4`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}