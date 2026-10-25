import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { InvitationData } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface WeddingCountdownProps {
  data: InvitationData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Wedding target date: Nikah ceremony on 05 Dec 2026 at 21:00 (9:00 PM IST)
    const target = new Date(data.mainEvent.targetTimestamp || '2026-12-05T21:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.mainEvent.targetTimestamp]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const timeUnits = [
    { label: 'Days', value: formatNumber(timeLeft.days) },
    { label: 'Hours', value: formatNumber(timeLeft.hours) },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center text-center bg-gradient-to-b from-[#460918] via-[#5a0d20] to-[#400816] text-[#F8EBDD] overflow-hidden">
      {/* Background Floating Golden Stardust (pointer-events-none, strictly non-interfering) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300"
            style={{
              top: `${(i * 23) % 100}%`,
              left: `${(i * 37) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: 0.35 + (i % 4) * 0.1,
              boxShadow: '0 0 8px rgba(245, 210, 120, 0.8)',
              animation: `float-particle ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto w-full space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-1"
        >
          <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#F8EBDD] uppercase font-bold">
            {data.countdown.header}
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#f3dfa2] font-normal leading-tight drop-shadow-[0_2px_12px_rgba(230,190,100,0.3)]">
            {data.countdown.title}
          </h2>
          <GoldDivider variant="dark" />
        </motion.div>

        {/* Direct Countdown Cards Grid (Clean, Luxurious Burgundy + Gold) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#380714]/75 border border-[#c69c57]/60 rounded-3xl p-5 sm:p-7 shadow-[0_15px_35px_rgba(20,2,6,0.5)] backdrop-blur-sm space-y-5"
        >
          {/* 4-column Countdown Units */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gradient-to-b from-[#4a091a]/95 to-[#2f040f]/95 border border-[#c69c57]/50 rounded-2xl py-3.5 sm:py-4 px-1 sm:px-2 flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,230,165,0.25),0_4px_12px_rgba(0,0,0,0.35)] hover:border-[#f3dfa2]/60 transition-colors duration-300"
              >
                <span className="font-script text-3xl sm:text-5xl text-[#f3dfa2] leading-none tracking-normal">
                  {unit.value}
                </span>
                <span className="font-cinzel text-[11px] sm:text-xs tracking-widest text-[#F8EBDD] font-bold uppercase mt-2">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#c69c57]/30">
            <span className="font-script text-2xl sm:text-3xl text-[#f3dfa2]">
              Until forever begins
            </span>
            <span className="text-[#c69c57]">✦</span>
            <span className="font-serif italic text-sm sm:text-base text-[#F8EBDD] font-medium">
              05 December 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingCountdown;
