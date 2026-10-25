import React from 'react';
import { motion } from 'framer-motion';
import type { InvitationData } from '../data/invitation';
import { GoldDivider } from './GoldDivider';
import { Lanterns } from './Lanterns';

interface ThankYouProps {
  thankYou: InvitationData['thankYou'];
}

export const ThankYou: React.FC<ThankYouProps> = ({ thankYou }) => {
  return (
    <section className="relative w-full pt-16 pb-12 px-4 flex flex-col items-center text-center bg-gradient-to-b from-[#460918] via-[#5a0d20] to-[#3a0614] text-[#F8EBDD] overflow-hidden">
      {/* Background Floating Golden Stardust (pointer-events-none, strictly non-interfering) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300"
            style={{
              top: `${(i * 21) % 100}%`,
              left: `${(i * 31) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: 0.35 + (i % 4) * 0.1,
              boxShadow: '0 0 8px rgba(245, 210, 120, 0.8)',
              animation: `float-particle ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto w-full space-y-6">
        
        {/* Top Glowing Gold Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="#f3dfa2"
              className="drop-shadow-[0_0_15px_rgba(243,223,162,0.8)] animate-pulse"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>

        {/* Header & Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-1"
        >
          <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#F8EBDD] uppercase font-bold">
            {thankYou.header}
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#f3dfa2] font-normal leading-tight drop-shadow-[0_2px_12px_rgba(230,190,100,0.3)]">
            {thankYou.title}
          </h2>
          <GoldDivider variant="dark" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 pt-2"
        >
          <p className="font-serif italic text-base sm:text-lg text-[#F8EBDD] leading-relaxed max-w-sm mx-auto font-medium">
            {thankYou.message}
          </p>

          <p className="font-script text-5xl sm:text-6xl text-[#f3dfa2] pt-2 drop-shadow-[0_2px_8px_rgba(230,190,100,0.4)]">
            {thankYou.signOff}
          </p>
        </motion.div>

      </div>

      {/* Bottom Glowing Lanterns */}
      <div className="w-full relative mt-12 mb-2 pointer-events-none select-none">
        <Lanterns position="bottom" />
      </div>

      {/* Footer Subtext */}
      <div className="pt-4 text-center">
        <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] text-[#F8EBDD]/70 font-semibold uppercase">
          Made With Love
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
