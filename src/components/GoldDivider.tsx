import React from 'react';

interface GoldDividerProps {
  variant?: 'light' | 'dark' | 'burgundy';
  className?: string;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const isBurgundy = variant === 'burgundy';

  const lineColor = isDark
    ? 'rgba(218, 174, 102, 0.4)'
    : isBurgundy
    ? 'rgba(116, 18, 45, 0.25)'
    : 'rgba(198, 156, 87, 0.45)';

  const diamondColor = isDark
    ? '#e8ca88'
    : isBurgundy
    ? '#74122d'
    : '#c69c57';

  return (
    <div className={`flex items-center justify-center w-full my-4 px-4 ${className}`}>
      <div 
        className="h-[1px] flex-1 max-w-[120px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${lineColor})`
        }}
      />
      <div className="mx-2.5 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transform rotate-45">
          <rect x="4" y="4" width="16" height="16" fill={diamondColor} rx="1" />
        </svg>
      </div>
      <div 
        className="h-[1px] flex-1 max-w-[120px]"
        style={{
          background: `linear-gradient(90deg, ${lineColor}, transparent)`
        }}
      />
    </div>
  );
};
