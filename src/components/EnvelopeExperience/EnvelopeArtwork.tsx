import { forwardRef } from 'react';

interface EnvelopeArtworkProps {
  className?: string;
}

export const EnvelopeArtwork = forwardRef<HTMLDivElement, EnvelopeArtworkProps>(
  ({ className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 z-10 w-full h-full pointer-events-none ${className}`}
      >
        {/* Intricate Royal Damask Illustration */}
        <img
          src="/assets/envelope.png"
          alt="Royal Floral Damask Embroidery"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    );
  }
);

EnvelopeArtwork.displayName = 'EnvelopeArtwork';
