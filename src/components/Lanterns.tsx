import React from 'react';

interface LanternsProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export const Lanterns: React.FC<LanternsProps> = ({ position = 'top', className = '' }) => {
  if (position === 'top') {
    return (
      <div className={`w-full absolute top-2 sm:top-5 inset-x-0 flex justify-between px-3 sm:px-8 pointer-events-none select-none z-20 ${className}`}>
        {/* Left Lantern */}
        <div className="w-10 h-16 sm:w-14 sm:h-26 relative">
          <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-xl animate-pulse" />
          <img 
            src="/assets/lantern-transparent.png" 
            alt="Royal Lantern" 
            className="w-full h-full object-contain relative drop-shadow-[0_4px_14px_rgba(230,170,50,0.6)] animate-lantern-glow"
          />
        </div>

        {/* Right Lantern (offset slightly to leave clean breathing room for music toggle) */}
        <div className="w-10 h-16 sm:w-14 sm:h-26 relative mr-12 sm:mr-14">
          <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-xl animate-pulse" />
          <img 
            src="/assets/lantern-transparent.png" 
            alt="Royal Lantern" 
            className="w-full h-full object-contain relative drop-shadow-[0_4px_14px_rgba(230,170,50,0.6)] animate-lantern-glow"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto flex justify-between px-4 sm:px-8 pointer-events-none select-none z-10 ${className}`}>
      <div className="w-10 h-16 sm:w-12 sm:h-22 relative">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
        <img 
          src="/assets/lantern-transparent.png" 
          alt="Royal Lantern" 
          className="w-full h-full object-contain relative drop-shadow-[0_4px_12px_rgba(230,170,50,0.5)] animate-lantern-glow"
        />
      </div>
      <div className="w-10 h-16 sm:w-12 sm:h-22 relative">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
        <img 
          src="/assets/lantern-transparent.png" 
          alt="Royal Lantern" 
          className="w-full h-full object-contain relative drop-shadow-[0_4px_12px_rgba(230,170,50,0.5)] animate-lantern-glow"
        />
      </div>
    </div>
  );
};
