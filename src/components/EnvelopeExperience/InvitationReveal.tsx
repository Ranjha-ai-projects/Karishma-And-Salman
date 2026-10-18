import { forwardRef } from 'react';
import type { InvitationData } from '../../data/invitation';
import { Lanterns } from '../Lanterns';
import { Calendar, MapPin } from 'lucide-react';

interface InvitationRevealProps {
  data: InvitationData;
}

export const InvitationReveal = forwardRef<HTMLDivElement, InvitationRevealProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-lg mx-auto flex flex-col items-center text-center bg-[#fbf8f2] relative z-10 pt-4 pb-12 px-4"
      >
        {/* Soft background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Hanging Lanterns */}
        <Lanterns position="top" className="mb-3" />

        {/* Introduction Main Flow */}
        <div className="relative z-10 max-w-md mx-auto w-full space-y-6">
          
          {/* 1. Host Header */}
          <div className="reveal-item pt-1">
            <p className="font-serif text-sm sm:text-base text-[#4a2e2b] font-medium tracking-wide">
              {data.hostHeader}
            </p>
          </div>

          {/* 2. Bismillah Header */}
          <div className="reveal-item space-y-1.5 pt-1">
            <h2 className="font-arabic text-3xl sm:text-4xl text-[#5a0d20] font-bold tracking-wide leading-relaxed">
              {data.bismillah}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-[#7a5c48] font-normal">
              {data.bismillahTranslation}
            </p>
          </div>

          {/* 3. Invitation Announcement */}
          <div className="reveal-item space-y-2 pt-1">
            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] text-[#74122d] font-semibold flex items-center justify-center gap-2">
              <span className="text-[10px] text-[#c69c57]">✦</span>
              <span>TOGETHER WITH THEIR FAMILIES</span>
              <span className="text-[10px] text-[#c69c57]">✦</span>
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#7a6455] leading-relaxed max-w-xs mx-auto pt-1 font-light">
              {data.invitationNote}
            </p>
          </div>

          {/* 4. Quranic Verse */}
          <div className="reveal-item space-y-1 pt-3 pb-1">
            <p className="font-arabic text-3xl sm:text-4xl text-[#5a0d20] font-bold">
              {data.quranVerse}
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-[#7a5c48]">
              {data.quranVerseTranslation}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-[#9d806a]">
              {data.quranReference}
            </p>
          </div>

          {/* 5. Couple Presentation */}
          <div className="reveal-item py-2 space-y-3">
            {/* Bride */}
            <div className="space-y-1">
              <h1 className="font-script text-6xl sm:text-7xl text-[#c69c57] leading-none drop-shadow-[0_2px_8px_rgba(198,156,87,0.25)]">
                {data.bride.name}
              </h1>
              <p className="font-serif text-xs sm:text-sm text-[#4a2e2b] font-medium pt-1">
                {data.bride.subtitle}
              </p>
              <p className="font-serif italic text-xs text-[#7a6455]">
                {data.bride.parents}
              </p>
            </div>

            {/* Weds Divider */}
            <div className="flex items-center justify-center gap-4 my-2">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c69c57]" />
              <span className="font-great-vibes text-3xl sm:text-4xl text-[#74122d] font-normal italic px-2">
                Weds
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c69c57]" />
            </div>

            {/* Groom */}
            <div className="space-y-1">
              <h2 className="font-script text-5xl sm:text-6xl text-[#c69c57] leading-none drop-shadow-[0_2px_8px_rgba(198,156,87,0.25)]">
                {data.groom.name}
              </h2>
              <p className="font-serif italic text-xs text-[#7a6455] pt-1">
                {data.groom.parents}
              </p>
            </div>
          </div>

          {/* 6. Nikah Main Event Highlight Card */}
          <div className="reveal-item pt-2">
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
          </div>

          {/* 7. Pill Badges: Date & Location */}
          <div className="reveal-item flex flex-col items-center gap-3 pt-2">
            <div className="w-full max-w-[260px] py-2.5 px-6 rounded-full bg-[#fcfaf5] border border-[#c69c57]/50 shadow-sm flex items-center justify-center gap-3 text-[#5a0d20]">
              <Calendar className="w-4 h-4 text-[#74122d]" />
              <span className="font-cinzel text-xs tracking-widest text-[#4a2e2b] font-semibold">
                {data.mainEvent.dateRangeBadge}
              </span>
            </div>

            <div className="w-full max-w-[260px] py-2.5 px-6 rounded-full bg-[#fcfaf5] border border-[#c69c57]/50 shadow-sm flex items-center justify-center gap-3 text-[#5a0d20]">
              <MapPin className="w-4 h-4 text-[#74122d]" />
              <span className="font-cinzel text-xs tracking-widest text-[#4a2e2b] font-semibold">
                {data.mainEvent.locationBadge}
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

InvitationReveal.displayName = 'InvitationReveal';
