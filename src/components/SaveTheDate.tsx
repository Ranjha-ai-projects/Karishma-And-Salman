import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import type { InvitationData } from '../data/invitation';
import { GoldDivider } from './GoldDivider';
import { ScratchReveal } from './ScratchReveal';

interface SaveTheDateProps {
  data: InvitationData;
}

export const SaveTheDate: React.FC<SaveTheDateProps> = ({ data }) => {
  return (
    <section className="relative w-full py-12 px-4 flex flex-col items-center text-center bg-[#fbf8f2] overflow-hidden">
      <div className="max-w-md mx-auto w-full space-y-4">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-1"
        >
          <h3 className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e53] uppercase font-medium">
            {data.saveTheDate.header}
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#6b1228] font-normal leading-tight">
            {data.saveTheDate.title}
          </h2>
          <GoldDivider variant="light" />
        </motion.div>

        {/* White Card with Scratch Reveal Area */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e8ca88]/60 shadow-[0_12px_36px_rgba(90,13,32,0.06)] space-y-4 text-center"
        >
          {/* Calendar Icon & Celebration Tag */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#74122d]">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.2em] text-[#7a5c48] font-semibold">
              {data.saveTheDate.badge}
            </p>
          </div>

          {/* Gold Scratch to Reveal Box */}
          <ScratchReveal
            scratchPrompt="✦ SCRATCH TO REVEAL ✦"
            scratchSubtext="Scratch the gold to reveal our wedding dates"
            revealedContent={
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="text-sm text-[#74122d]">♡</span>
                <p className="font-script text-3xl sm:text-4xl text-[#6b1228] font-semibold leading-snug">
                  {data.saveTheDate.revealedDate}
                </p>
              </div>
            }
          />

          {/* Swipe instruction */}
          <p className="font-script text-xl sm:text-2xl text-[#7a5c48] pt-1">
            {data.saveTheDate.revealText}
          </p>

          {/* Location Badge */}
          <div className="flex items-center justify-center gap-1.5 text-[#8e6e53] pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#74122d]" />
            <span className="font-cinzel text-[10px] sm:text-xs tracking-widest font-semibold uppercase">
              {data.saveTheDate.location}
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
