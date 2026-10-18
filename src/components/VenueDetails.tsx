import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Image as ImageIcon } from 'lucide-react';
import type { InvitationData } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface VenueDetailsProps {
  venue: InvitationData['venue'];
}

export const VenueDetails: React.FC<VenueDetailsProps> = ({ venue }) => {
  const [activePhoto, setActivePhoto] = useState<'entrance' | 'lawn'>('entrance');

  const currentPhotoSrc = activePhoto === 'lawn' && venue.secondaryImage 
    ? venue.secondaryImage 
    : venue.image;

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center bg-[#fbf8f2] overflow-hidden">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-1"
        >
          <h3 className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e53] uppercase font-medium">
            {venue.header}
          </h3>
          <h2 className="font-script text-5xl sm:text-6xl text-[#6b1228] font-normal leading-tight">
            {venue.title}
          </h2>
          <GoldDivider variant="light" />
        </motion.div>

        {/* 2-Column Responsive Layout on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full max-w-md lg:max-w-none mx-auto">
          
          {/* Left Column: Venue Image & Information Card */}
          <div className="flex flex-col space-y-6">
            {/* Venue Image Card with Photo Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden border border-[#e8ca88]/60 shadow-[0_15px_35px_rgba(90,13,32,0.08)] group"
            >
              <img
                key={currentPhotoSrc}
                src={currentPhotoSrc}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#460918]/85 via-[#460918]/25 to-black/20 pointer-events-none" />

              {/* View Switcher Chips (Entrance Canopy vs Celebration Lawn) */}
              {venue.secondaryImage && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <button
                    type="button"
                    onClick={() => setActivePhoto('entrance')}
                    className={`px-3 py-1 rounded-full text-[10px] font-cinzel font-semibold tracking-wider uppercase transition-all ${
                      activePhoto === 'entrance'
                        ? 'bg-[#f3dfa2] text-[#460918] shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Entrance
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto('lawn')}
                    className={`px-3 py-1 rounded-full text-[10px] font-cinzel font-semibold tracking-wider uppercase transition-all ${
                      activePhoto === 'lawn'
                        ? 'bg-[#f3dfa2] text-[#460918] shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Lawn
                  </button>
                </div>
              )}

              {/* Photo Caption Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/15 text-[10px] font-cinzel text-white/90">
                <ImageIcon className="w-3 h-3 text-[#f3dfa2]" />
                <span>{activePhoto === 'entrance' ? 'Grand Entrance Canopy' : 'Celebration Grounds'}</span>
              </div>

              {/* Text Overlay at bottom */}
              <div className="absolute bottom-5 left-6 right-6 text-left">
                <h4 className="font-script text-3xl sm:text-4xl text-[#ff8ea3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {venue.name}
                </h4>
                <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] text-[#f3dfa2] uppercase font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {venue.cityState}
                </p>
              </div>
            </motion.div>

            {/* Venue Details & Directions Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full flex-1 bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e8ca88]/60 shadow-[0_15px_35px_rgba(90,13,32,0.06)] space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Location Pin Icon */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#74122d]">
                    <MapPin className="w-4 h-4 text-[#74122d]" />
                  </div>
                  <span className="font-cinzel text-[11px] tracking-[0.2em] text-[#8e6e53] uppercase font-semibold">
                    Wedding Venue
                  </span>
                </div>

                {/* Venue Name & City */}
                <div className="space-y-1">
                  <h3 className="font-script text-4xl sm:text-5xl text-[#6b1228] font-normal leading-tight">
                    {venue.name}
                  </h3>
                  <p className="font-cinzel text-[11px] tracking-[0.2em] text-[#8e6e53] uppercase font-semibold">
                    {venue.cityState}
                  </p>
                </div>

                {/* Description */}
                <p className="font-serif text-xs sm:text-sm text-[#7a6455] leading-relaxed">
                  {venue.description}
                </p>

                {/* Address */}
                <div className="pt-1">
                  <p className="font-serif text-xs sm:text-sm text-[#4a2e2b] leading-relaxed">
                    <strong className="text-[#5a0d20]">Address: </strong>
                    {venue.address}
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={venue.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#5a0d20] hover:bg-[#6b1228] text-[#f3dfa2] border border-[#c69c57]/60 shadow-md flex items-center justify-center gap-2 font-cinzel text-xs tracking-[0.2em] uppercase font-semibold transition-all transform hover:scale-[1.02] active:scale-98"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#e8ca88]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Google Maps Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full min-h-[340px] lg:min-h-[500px] h-full rounded-3xl overflow-hidden border border-[#e8ca88]/60 shadow-[0_15px_35px_rgba(90,13,32,0.08)] bg-white"
          >
            {/* Google Maps Iframe */}
            <iframe
              title="Venue Location Map"
              src={venue.mapEmbedUrl}
              className="w-full h-full border-0 grayscale-[0.1] contrast-[1.05]"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating 'Open in Maps' button */}
            <div className="absolute top-4 left-4 z-10">
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-white/95 hover:bg-white text-[#4a2e2b] border border-gray-300 shadow-md flex items-center gap-1.5 font-sans text-xs font-medium transition-all"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#74122d]" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
