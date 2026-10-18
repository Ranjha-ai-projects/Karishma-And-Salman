import { forwardRef } from 'react';

interface EnvelopeSealProps {
  onClick?: () => void;
  isOpening?: boolean;
}

export const EnvelopeSeal = forwardRef<HTMLDivElement, EnvelopeSealProps>(
  ({ onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 sm:w-24 sm:h-24 cursor-pointer select-none group"
      >
        {/* Subtle pulsing gold halo behind seal */}
        <div className="absolute -inset-2.5 rounded-full bg-amber-400/25 blur-md gold-halo-pulse pointer-events-none" />

        {/* Seal Image Container */}
        <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105 active:scale-95">
          <img
            src="/assets/wax-seal-transparent.png"
            alt="Royal Wax Seal Monogram EA"
            className="w-full h-full object-contain seal-drop-shadow"
            draggable={false}
          />
        </div>
      </div>
    );
  }
);

EnvelopeSeal.displayName = 'EnvelopeSeal';
