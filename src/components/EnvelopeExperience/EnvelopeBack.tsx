import React, { forwardRef } from 'react';

interface EnvelopeBackProps {
  children?: React.ReactNode;
}

export const EnvelopeBack = forwardRef<HTMLDivElement, EnvelopeBackProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 z-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#621026] via-[#520b1e] to-[#400615] envelope-box-shadow overflow-hidden"
      >
        {/* Subtle satin sheen lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />

        {/* Fine gold border lining */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-[#ecd5a5]/30 pointer-events-none" />

        {/* Light shimmer pass */}
        <div className="envelope-shimmer" />

        {children}
      </div>
    );
  }
);

EnvelopeBack.displayName = 'EnvelopeBack';
