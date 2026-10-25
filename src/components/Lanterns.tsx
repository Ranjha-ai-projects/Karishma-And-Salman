import React from 'react';

interface LanternsProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export const Lanterns: React.FC<LanternsProps> = ({ position = 'top', className = '' }) => {
  if (position === 'top') {
    return (
      <div className={`w-full absolute top-2 sm:top-4 inset-x-0 flex justify-between px-2 sm:px-8 pointer-events-none select-none z-20 overflow-hidden ${className}`}>
        {/* Left Lantern */}
        <div className="w-8 h-14 sm:w-12 sm:h-20 md:w-14 md:h-24 relative pointer-events-none select-none shrink-0">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse pointer-events-none" />
          <img 
            src="/assets/lantern-transparent.png" 
            alt="" 
            aria-hidden="true"
            className="w-full h-full object-contain relative drop-shadow-[0_4px_12px_rgba(230,170,50,0.5)] animate-lantern-glow pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Right Lantern (offset to leave room for music toggle at top-right) */}
        <div className="w-8 h-14 sm:w-12 sm:h-20 md:w-14 md:h-24 relative mr-12 sm:mr-14 pointer-events-none select-none shrink-0">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse pointer-events-none" />
          <img 
            src="/assets/lantern-transparent.png" 
            alt="" 
            aria-hidden="true"
            className="w-full h-full object-contain relative drop-shadow-[0_4px_12px_rgba(230,170,50,0.5)] animate-lantern-glow pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto flex justify-between px-3 sm:px-8 pointer-events-none select-none z-10 overflow-hidden ${className}`}>
      <div className="w-8 h-14 sm:w-11 sm:h-18 md:w-12 md:h-22 relative pointer-events-none select-none shrink-0">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse pointer-events-none" />
        <img 
          src="/assets/lantern-transparent.png" 
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-contain relative drop-shadow-[0_4px_10px_rgba(230,170,50,0.4)] animate-lantern-glow pointer-events-none select-none"
          draggable={false}
        />
      </div>
      <div className="w-8 h-14 sm:w-11 sm:h-18 md:w-12 md:h-22 relative pointer-events-none select-none shrink-0">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse pointer-events-none" />
        <img 
          src="/assets/lantern-transparent.png" 
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-contain relative drop-shadow-[0_4px_10px_rgba(230,170,50,0.4)] animate-lantern-glow pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Lanterns;
