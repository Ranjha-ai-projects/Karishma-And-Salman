import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { WeddingEvent } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface WeddingEventsProps {
  events: WeddingEvent[];
}

const getEventStyles = (eventId: string) => {
  switch (eventId) {
    case 'haldi':
      return {
        textColor: 'text-[#623917]',
        iconColor: 'text-[#8a4e1a]',
        tagColor: 'text-[#623917]',
        titleColor: 'text-[#623917]',
        borderColor: 'border-[#c79c4a]/50',
        scheduleCardBg: 'bg-white/95 border-[#c79c4a]/50',
        scheduleLabelColor: 'text-[#623917]',
        scheduleTimeColor: 'text-[#45260f]',
        dividerColor: 'bg-[#8a4e1a]/60',
      };
    case 'mehendi':
      return {
        textColor: 'text-[#234B39]',
        iconColor: 'text-[#234B39]',
        tagColor: 'text-[#234B39]',
        titleColor: 'text-[#234B39]',
        borderColor: 'border-[#3f7058]/50',
        scheduleCardBg: 'bg-white/95 border-[#3f7058]/50',
        scheduleLabelColor: 'text-[#234B39]',
        scheduleTimeColor: 'text-[#163326]',
        dividerColor: 'bg-[#234B39]/60',
      };
    case 'nikah':
    default:
      return {
        textColor: 'text-[#602039]',
        iconColor: 'text-[#74122d]',
        tagColor: 'text-[#602039]',
        titleColor: 'text-[#602039]',
        borderColor: 'border-[#8e455e]/50',
        scheduleCardBg: 'bg-white/95 border-[#8e455e]/50',
        scheduleLabelColor: 'text-[#602039]',
        scheduleTimeColor: 'text-[#421224]',
        dividerColor: 'bg-[#74122d]/60',
      };
  }
};

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
          <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#532033] uppercase font-bold">
            Three Days of Celebration
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#6b1228] font-normal leading-tight">
            Wedding Events
          </h2>
          <GoldDivider variant="light" />
        </motion.div>

        {/* Event Cards Grid (Responsive 1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-md md:max-w-none mx-auto">
          {events.map((event, index) => {
            const styles = getEventStyles(event.id);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="w-full bg-[#ffffff] rounded-3xl overflow-hidden border border-[#e8ca88]/70 shadow-[0_15px_35px_rgba(90,13,32,0.08)] group hover:shadow-[0_20px_45px_rgba(90,13,32,0.14)] transition-all duration-500 flex flex-col"
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
                  <div className="space-y-3">
                    {/* Top Row: Icon + Ceremony Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img 
                          src={event.icon} 
                          alt="" 
                          className="max-w-full max-h-full object-contain drop-shadow-sm" 
                        />
                      </div>
                      <span className={`font-cinzel text-xs tracking-[0.2em] ${styles.tagColor} font-bold uppercase`}>
                        {event.tag}
                      </span>
                    </div>

                    {/* Event Title */}
                    <div>
                      <h3 className={`font-script text-5xl sm:text-6xl ${styles.titleColor} font-normal leading-tight`}>
                        {event.title}
                      </h3>
                      <div className={`w-16 h-[2px] ${styles.dividerColor} mt-1 mb-2`} />
                    </div>
                  </div>

                  {/* Date, Time, Venue Specs - high contrast & minimum 15px-16px font size */}
                  <div className={`space-y-3 text-[15px] sm:text-base ${styles.textColor} pt-1`}>
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-4.5 h-4.5 ${styles.iconColor} shrink-0`} />
                      <span className="font-serif font-semibold">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className={`w-4.5 h-4.5 ${styles.iconColor} shrink-0`} />
                      <span className="font-serif font-medium">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className={`w-4.5 h-4.5 ${styles.iconColor} shrink-0 mt-0.5`} />
                      <span className="font-serif font-semibold leading-snug">{event.venue}</span>
                    </div>

                    {/* Program Schedule Breakdown */}
                    {event.schedule && event.schedule.length > 0 && (
                      <div className={`pt-3 border-t ${styles.borderColor} space-y-2`}>
                        <span className={`font-cinzel text-xs tracking-[0.18em] ${styles.tagColor} font-bold uppercase block`}>
                          Ceremony Schedule
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {event.schedule.map((item) => (
                            <div
                              key={item.label}
                              className={`${styles.scheduleCardBg} border rounded-xl px-2.5 py-2 flex flex-col justify-center shadow-xs`}
                            >
                              <span className={`font-cinzel text-xs tracking-wider ${styles.scheduleLabelColor} font-bold`}>
                                {item.label}
                              </span>
                              <span className={`font-serif text-sm ${styles.scheduleTimeColor} font-semibold`}>
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
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WeddingEvents;
