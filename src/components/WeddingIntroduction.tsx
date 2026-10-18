import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import type { InvitationData } from '../data/invitation';
import { Lanterns } from './Lanterns';

interface WeddingIntroductionProps {
  data: InvitationData;
}

export const WeddingIntroduction: React.FC<WeddingIntroductionProps> = ({ data }) => {
  return (
    <section className="relative w-full pt-8 pb-14 px-4 flex flex-col items-center text-center bg-[#fbf8f2] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Hanging Lanterns */}
      <Lanterns position="top" className="mb-2" />

      <div className="relative z-10 max-w-md mx-auto w-full space-y-6">
        
        {/* Bismillah Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-1.5 pt-2"
        >
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#5a0d20] font-bold tracking-wide leading-relaxed">
            {data.bismillah}
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#7a5c48] font-normal">
            {data.bismillahTranslation}
          </p>
        </motion.div>

        {/* Host & Invitation Announcement */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-2 pt-2"
        >
          <p className="font-serif text-sm sm:text-base text-[#4a2e2b] font-medium tracking-wide">
            {data.hostHeader}
          </p>
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.2em] text-[#74122d] font-semibold flex items-center justify-center gap-1.5">
            <span className="text-[10px] text-[#c69c57]">✦</span>
            <span>TOGETHER WITH THEIR FAMILIES</span>
            <span className="text-[10px] text-[#c69c57]">✦</span>
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#7a6455] leading-relaxed max-w-xs mx-auto pt-1 font-light">
            {data.invitationNote}
          </p>
        </motion.div>

        {/* Quranic Verse */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-1 pt-4 pb-2"
        >
          <p className="font-arabic text-3xl sm:text-4xl text-[#5a0d20] font-bold">
            {data.quranVerse}
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#7a5c48]">
            {data.quranVerseTranslation}
          </p>
          <p className="font-cinzel text-[10px] tracking-widest text-[#9d806a]">
            {data.quranReference}
          </p>
        </motion.div>

        {/* Couple Presentation */}
        <div className="py-3 space-y-4">
          {/* Bride */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-1"
          >
            <h1 className="font-script text-6xl sm:text-7xl text-[#c69c57] leading-none drop-shadow-[0_2px_8px_rgba(198,156,87,0.25)] hover:scale-105 transition-transform duration-300">
              {data.bride.name}
            </h1>
            <p className="font-serif text-xs sm:text-sm text-[#4a2e2b] font-medium pt-1">
              {data.bride.subtitle}
            </p>
            <p className="font-serif italic text-xs text-[#7a6455]">
              {data.bride.parents}
            </p>
          </motion.div>

          {/* Weds Divider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 my-2"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c69c57]" />
            <span className="font-great-vibes text-3xl sm:text-4xl text-[#74122d] font-normal italic px-2">
              Weds
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c69c57]" />
          </motion.div>

          {/* Groom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-1"
          >
            <h2 className="font-script text-6xl sm:text-7xl text-[#c69c57] leading-none drop-shadow-[0_2px_8px_rgba(198,156,87,0.25)] hover:scale-105 transition-transform duration-300">
              {data.groom.name}
            </h2>
            {data.groom.subtitle && (
              <p className="font-serif text-xs sm:text-sm text-[#4a2e2b] font-medium pt-1">
                {data.groom.subtitle}
              </p>
            )}
            <p className="font-serif italic text-xs text-[#7a6455]">
              {data.groom.parents}
            </p>
          </motion.div>
        </div>

        {/* Nikah Main Event Highlight Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-2"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c69c57]/50 to-transparent my-4" />
          
          <div className="space-y-1.5 py-1">
            <p className="font-arabic text-2xl text-[#5a0d20] font-bold">
              {data.mainEvent.blessing}
            </p>
            <h3 className="font-great-vibes text-4xl sm:text-5xl text-[#5a0d20] font-medium leading-tight">
              {data.mainEvent.title}
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#4a2e2b] font-medium pt-1">
              {data.mainEvent.date}
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#7a6455]">
              {data.mainEvent.time}
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#4a2e2b] font-medium">
              {data.mainEvent.venue}
            </p>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c69c57]/50 to-transparent my-4" />
        </motion.div>

        {/* Pill Badges: Date & Location */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-3 pt-2"
        >
          {/* Date Badge */}
          <div className="w-full max-w-[260px] py-2.5 px-6 rounded-full bg-[#fcfaf5] border border-[#c69c57]/50 shadow-sm flex items-center justify-center gap-3 text-[#5a0d20] hover:border-[#c69c57] transition-all">
            <Calendar className="w-4 h-4 text-[#74122d]" />
            <span className="font-cinzel text-xs tracking-widest text-[#4a2e2b] font-semibold">
              {data.mainEvent.dateRangeBadge}
            </span>
          </div>

          {/* Location Badge */}
          <div className="w-full max-w-[260px] py-2.5 px-6 rounded-full bg-[#fcfaf5] border border-[#c69c57]/50 shadow-sm flex items-center justify-center gap-3 text-[#5a0d20] hover:border-[#c69c57] transition-all">
            <MapPin className="w-4 h-4 text-[#74122d]" />
            <span className="font-cinzel text-xs tracking-widest text-[#4a2e2b] font-semibold">
              {data.mainEvent.locationBadge}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
