import React, { forwardRef } from 'react';

interface EnvelopeFlapProps {
  children?: React.ReactNode;
}

export const EnvelopeFlap = forwardRef<HTMLDivElement, EnvelopeFlapProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 right-0 z-20 w-full h-[52%] origin-top pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="/assets/envelope-flap.png"
            alt="Royal Envelope Flap"
            className="w-full h-full object-cover object-top filter drop-shadow-[0_8px_12px_rgba(20,2,6,0.4)]"
            draggable={false}
          />
          {children}
        </div>
      </div>
    );
  }
);

EnvelopeFlap.displayName = 'EnvelopeFlap';
