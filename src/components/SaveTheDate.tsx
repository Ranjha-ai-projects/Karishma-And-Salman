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
          <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#532033] uppercase font-bold">
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
          className="w-full bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e8ca88]/70 shadow-[0_12px_36px_rgba(90,13,32,0.08)] space-y-4 text-center"
        >
          {/* Calendar Icon & Celebration Tag */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-11 h-11 rounded-full bg-[#fbf5e6] border border-[#c69c57]/30 flex items-center justify-center text-[#74122d] shadow-xs">
              <Calendar className="w-5 h-5 text-[#74122d]" />
            </div>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] text-[#532033] font-bold uppercase">
              {data.saveTheDate.badge}
            </p>
          </div>

          {/* Gold Scratch to Reveal Box */}
          <ScratchReveal
            scratchPrompt="✦ SCRATCH TO REVEAL ✦"
            scratchSubtext="Scratch the gold to reveal our wedding dates"
            revealedContent={
              <div className="flex flex-col items-center justify-center space-y-1 px-2">
                <span className="text-base text-[#74122d]">♡</span>
                <p className="font-serif text-2xl sm:text-3xl text-[#532033] font-bold tracking-wide leading-snug">
                  {data.saveTheDate.revealedDate}
                </p>
              </div>
            }
          />

          {/* Instruction text */}
          <p className="font-serif italic text-sm sm:text-base text-[#532033] font-medium pt-1">
            {data.saveTheDate.revealText}
          </p>

          {/* Location Badge */}
          <div className="flex items-center justify-center gap-2 text-[#532033] pt-1">
            <MapPin className="w-4 h-4 text-[#74122d] shrink-0" />
            <span className="font-cinzel text-xs sm:text-sm tracking-wider font-bold uppercase">
              {data.saveTheDate.location}
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SaveTheDate;
