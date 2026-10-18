import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import type { WeddingEvent } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface WeddingEventsProps {
  events: WeddingEvent[];
}

export const WeddingEvents: React.FC<WeddingEventsProps> = ({ events }) => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center bg-[#fbf8f2] overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-1"
        >
          <h3 className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e53] uppercase font-medium">
            Three Days of Celebration
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#6b1228] font-normal leading-tight">
            Wedding Ceremonies
          </h2>
          <GoldDivider variant="light" />
        </motion.div>

        {/* 3-Card Responsive Grid: 1-col on mobile, 2-col on tablet, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-md md:max-w-none mx-auto items-stretch">
          {events.map((event, index) => {
            const { theme } = event;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.14 }}
                className={`w-full rounded-3xl overflow-hidden border-2 ${theme.cardBorder} shadow-[0_15px_35px_rgba(90,13,32,0.08)] group hover:shadow-[0_22px_45px_rgba(90,13,32,0.16)] transition-all duration-500 flex flex-col h-full bg-[#fffdfa] hover:-translate-y-1`}
              >
                {/* Top Ceremony Photograph Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#faf6ee]">
                  <img
                    src={event.image}
                    alt={`${event.title} Ceremony`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle top-to-bottom soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Corner Filigree Accents */}
                  <div className="absolute top-3.5 left-3.5 w-5 h-5 border-t-2 border-l-2 border-[#e8ca88]/90 pointer-events-none rounded-tl-xs drop-shadow-xs" />
                  <div className="absolute top-3.5 right-3.5 w-5 h-5 border-t-2 border-r-2 border-[#e8ca88]/90 pointer-events-none rounded-tr-xs drop-shadow-xs" />

                  {/* Decorative Mughal-Inspired Arched Silhouette Divider */}
                  <svg 
                    viewBox="0 0 120 28" 
                    preserveAspectRatio="none" 
                    className="absolute -bottom-[1px] left-0 w-full h-8 sm:h-9 z-10 pointer-events-none"
                  >
                    <path 
                      d="M0,28 L0,16 Q18,16 28,11 Q38,6 45,6 Q48,6 50,0 Q52,6 55,6 Q62,6 72,11 Q82,16 100,16 L100,28 Z" 
                      className="fill-[#fffdf9]" 
                    />
                    <path 
                      d="M0,16 Q18,16 28,11 Q38,6 45,6 Q48,6 50,0 Q52,6 55,6 Q62,6 72,11 Q82,16 100,16" 
                      fill="none" 
                      stroke={theme.archStroke} 
                      strokeWidth="1.2" 
                      strokeOpacity="0.75" 
                    />
                  </svg>

                  {/* Centered Ornamental Icon Medallion Overlapping Arch Peak */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
                    <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center p-2.5 ${theme.iconBg} border-2 ${theme.iconBorder} shadow-[0_4px_12px_rgba(0,0,0,0.14)]`}>
                      <img 
                        src={event.icon} 
                        alt="" 
                        className="max-w-full max-h-full object-contain drop-shadow-xs" 
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Arched Information Panel */}
                <div className={`pt-8 pb-6 px-6 sm:px-7 ${theme.panelBg} flex-1 flex flex-col justify-between space-y-5 relative`}>
                  
                  {/* Bottom Corner Filigree */}
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c69c57]/30 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c69c57]/30 pointer-events-none" />

                  {/* Upper Block: Tag, Large Title, Poetic Subtitle */}
                  <div className="text-center space-y-2">
                    {/* Ceremony Tag Badge */}
                    <div className="flex justify-center">
                      <span className={`font-cinzel text-[10px] tracking-[0.2em] font-semibold uppercase py-1 px-3.5 rounded-full ${theme.tagBg} ${theme.tagText} shadow-xs`}>
                        {event.tag}
                      </span>
                    </div>

                    {/* Large Elegant Event Title */}
                    <h3 
                      className="font-script text-5xl sm:text-6xl font-normal leading-tight drop-shadow-xs"
                      style={{ color: theme.primaryColor }}
                    >
                      {event.title}
                    </h3>

                    {/* Short Poetic Subtitle */}
                    {event.subtitle && (
                      <p className="font-serif italic text-xs sm:text-[13px] text-[#6b5042] px-2 leading-relaxed">
                        {event.subtitle}
                      </p>
                    )}

                    {/* Symmetrical Gold Divider Line */}
                    <div className="flex items-center justify-center gap-2 pt-1 pb-1">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c69c57]/60" />
                      <span className="text-[10px] text-[#c69c57]">✦</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c69c57]/60" />
                    </div>
                  </div>

                  {/* Middle Block: Date, Time & Venue Specs */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#4a2e2b] bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#c69c57]/20 shadow-xs">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                      <span className="font-serif font-semibold text-[#4a2e2b]">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                      <span className="font-serif text-[#6d5548] font-medium">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                      <span className="font-serif font-medium text-[#4a2e2b]">{event.venue}</span>
                    </div>

                    {/* Nikah & Barat Program Timetable Breakdown */}
                    {event.schedule && event.schedule.length > 0 && (
                      <div className="pt-2.5 mt-2 border-t border-[#c69c57]/25 space-y-1.5">
                        <span className="font-cinzel text-[9.5px] tracking-[0.16em] text-[#8e6e53] font-semibold uppercase block text-center">
                          Ceremony Schedule
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {event.schedule.map((item) => (
                            <div
                              key={item.label}
                              className="bg-white/90 border border-[#c69c57]/35 rounded-lg px-2 py-1 flex flex-col justify-center text-center shadow-xs"
                            >
                              <span className="font-cinzel text-[9.5px] tracking-wider font-bold" style={{ color: theme.primaryColor }}>
                                {item.label}
                              </span>
                              <span className="font-serif text-[11px] text-[#5a3a33] font-semibold">
                                {item.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action: Functional Get Directions Button */}
                  <div className="pt-2">
                    <a
                      href={event.directionsUrl || 'https://maps.app.goo.gl/4AmvFfDbLiwj2pSJA'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 sm:py-3 px-4 rounded-full ${theme.buttonBg} ${theme.buttonHoverBg} ${theme.buttonText} border ${theme.buttonBorder} shadow-sm flex items-center justify-center gap-2 font-cinzel text-xs tracking-[0.18em] uppercase font-semibold transition-all transform hover:scale-[1.02] active:scale-98`}
                    >
                      <Navigation className="w-3.5 h-3.5 shrink-0" />
                      <span>Get Directions</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
