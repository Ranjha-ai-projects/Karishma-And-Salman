import React, { forwardRef } from 'react';

interface EnvelopeFrontProps {
  children?: React.ReactNode;
}

export const EnvelopeFront = forwardRef<HTMLDivElement, EnvelopeFrontProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute bottom-0 left-0 right-0 z-15 w-full h-[58%] pointer-events-none"
      >
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="/assets/envelope-pocket.png"
            alt="Royal Envelope Front Pocket"
            className="w-full h-full object-cover object-bottom"
            draggable={false}
          />
          {children}
        </div>
      </div>
    );
  }
);

EnvelopeFront.displayName = 'EnvelopeFront';
