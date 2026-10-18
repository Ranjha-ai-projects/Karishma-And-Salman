import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { WeddingEvent } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface WeddingEventsProps {
  events: WeddingEvent[];
}

export const WeddingEvents: React.FC<WeddingEventsProps> = ({ events }) => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center bg-[#fbf8f2] overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        
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
            Wedding Events
          </h2>
          <GoldDivider variant="light" />
        </motion.div>

        {/* Event Cards Grid (Responsive 1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-md md:max-w-none mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="w-full bg-[#ffffff] rounded-3xl overflow-hidden border border-[#e8ca88]/60 shadow-[0_15px_35px_rgba(90,13,32,0.08)] group hover:shadow-[0_20px_45px_rgba(90,13,32,0.14)] transition-all duration-500 flex flex-col"
            >
              {/* Artwork Image Container */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#faf6ee]">
                <img
                  src={event.image}
                  alt={`${event.title} Ceremony`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Soft bottom vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Event Info Details */}
              <div className={`p-6 sm:p-7 bg-gradient-to-b ${event.gradientBg} space-y-4 flex-1 flex flex-col justify-between`}>
                <div className="space-y-4">
                  {/* Top Row: Icon + Ceremony Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src={event.icon} 
                        alt="" 
                        className="max-w-full max-h-full object-contain drop-shadow-sm" 
                      />
                    </div>
                    <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.2em] text-[#8e6e53] font-semibold uppercase">
                      {event.tag}
                    </span>
                  </div>

                  {/* Event Title */}
                  <div>
                    <h3 className="font-script text-5xl sm:text-6xl text-[#6b1228] font-normal leading-tight">
                      {event.title}
                    </h3>
                    <div className="w-16 h-[1.5px] bg-[#c69c57]/60 mt-1 mb-2" />
                  </div>
                </div>

                {/* Date, Time, Venue Specs */}
                <div className="space-y-2.5 text-xs sm:text-sm text-[#4a2e2b] pt-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#74122d] shrink-0" />
                    <span className="font-serif font-medium">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#74122d] shrink-0" />
                    <span className="font-serif text-[#7a6455]">{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#74122d] shrink-0" />
                    <span className="font-serif font-medium text-[#4a2e2b]">{event.venue}</span>
                  </div>

                  {/* Program Schedule Breakdown */}
                  {event.schedule && event.schedule.length > 0 && (
                    <div className="pt-3 border-t border-[#c69c57]/30 space-y-2">
                      <span className="font-cinzel text-[10px] tracking-[0.18em] text-[#8e6e53] font-semibold uppercase block">
                        Ceremony Schedule
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {event.schedule.map((item) => (
                          <div
                            key={item.label}
                            className="bg-white/80 border border-[#c69c57]/35 rounded-xl px-2.5 py-1.5 flex flex-col justify-center shadow-xs"
                          >
                            <span className="font-cinzel text-[10px] tracking-wider text-[#74122d] font-bold">
                              {item.label}
                            </span>
                            <span className="font-serif text-xs text-[#5a3a33] font-semibold">
                              {item.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
