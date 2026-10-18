import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RoyalEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const RoyalEnvelope: React.FC<RoyalEnvelopeProps> = ({ onOpen, isOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    // Golden sparkles burst
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#c69c57', '#e8ca88', '#f3dfa2', '#74122d', '#ffffff'],
        disableForReducedMotion: true
      });
    } catch (e) {
      console.error(e);
    }

    // Call onOpen to start music & trigger page reveal
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between py-10 px-4 bg-[#fbf8f2] overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-radial from-[#ffffff] via-[#fbf8f2] to-[#f4ebe0] opacity-90 pointer-events-none" />

          {/* Top Header */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ 
              opacity: isAnimating ? 0 : 1, 
              y: isAnimating ? -30 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 pt-4 text-center"
          >
            <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#8e6e53] uppercase font-medium">
              An Invitation Awaits
            </h2>
          </motion.div>

          {/* Centered Envelope & Seal Container */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-sm sm:max-w-md my-auto">
            <motion.div 
              animate={isAnimating ? { 
                scale: [1, 1.08, 1.85], 
                opacity: [1, 0.95, 0],
                filter: ["blur(0px)", "blur(0px)", "blur(4px)"]
              } : { 
                scale: 1,
                y: [0, -5, 0]
              }}
              transition={isAnimating ? {
                duration: 0.85,
                ease: [0.25, 1, 0.5, 1]
              } : {
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
              onClick={handleOpen}
              className="relative cursor-pointer group transform transition-transform duration-300"
              style={{ width: '290px', height: '270px' }}
            >
              {/* Envelope Body with Royal Damask Embroidery */}
              <div className="w-full h-full relative rounded-xl overflow-hidden envelope-shadow">
                <img 
                  src="/assets/envelope.png" 
                  alt="Royal Wedding Envelope" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Shimmer light pass */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Centered Wax Seal Monogram */}
              <motion.div 
                animate={isAnimating ? {
                  scale: [1, 1.25, 1.8],
                  opacity: [1, 0.8, 0]
                } : {
                  scale: [1, 1.05, 1]
                }}
                transition={isAnimating ? {
                  duration: 0.5,
                  ease: "easeOut"
                } : {
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "easeInOut"
                }}
                className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-auto"
              >
                <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/assets/wax-seal-transparent.png" 
                    alt="Royal Monogram Seal" 
                    className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                  />
                  {/* Subtle pulsing gold halo */}
                  <div className="absolute -inset-2 rounded-full bg-amber-400/20 blur-md animate-pulse pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Opening Instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: isAnimating ? 0 : 1, 
              y: isAnimating ? 30 : 0 
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 pb-6 text-center cursor-pointer"
            onClick={handleOpen}
          >
            <p className="font-great-vibes text-2xl sm:text-3xl text-[#6b1228] tracking-wide flex items-center justify-center gap-2.5 hover:text-[#8b1837] transition-colors">
              <span className="text-sm sm:text-base text-[#c69c57] animate-pulse">✦</span>
              <span className="drop-shadow-sm">Tap the seal to open</span>
              <span className="text-sm sm:text-base text-[#c69c57] animate-pulse">✦</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
