import React from 'react';
import { motion } from 'framer-motion';
import type { InvitationData } from '../data/invitation';
import { GoldDivider } from './GoldDivider';

interface FamilyDetailsProps {
  family: InvitationData['family'];
}

export const FamilyDetails: React.FC<FamilyDetailsProps> = ({ family }) => {
  return (
    <section className="relative w-full py-14 px-4 flex flex-col items-center bg-[#fbf8f2] overflow-hidden">
      <div className="max-w-xl mx-auto w-full">
        
        {/* Luxury Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#ffffff] rounded-3xl p-8 sm:p-10 border border-[#e8ca88]/60 shadow-[0_15px_35px_rgba(90,13,32,0.06)] text-center space-y-4"
        >
          {/* Header */}
          <p className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e53] uppercase font-semibold flex items-center justify-center gap-2">
            <span className="text-[#c69c57]">✦</span>
            <span>{family.header}</span>
            <span className="text-[#c69c57]">✦</span>
          </p>

          {/* Title */}
          <h2 className="font-script text-4xl sm:text-5xl text-[#6b1228] font-normal leading-tight">
            {family.title}
          </h2>

          <GoldDivider variant="light" />

          {/* Family Names */}
          <div className="space-y-2 pt-2">
            {family.names.map((name, index) => (
              <p 
                key={index}
                className="font-serif text-lg sm:text-xl text-[#4a2e2b] font-medium tracking-wide"
              >
                {name}
              </p>
            ))}

            {/* Relatives & Friends */}
            <p className="font-script text-3xl sm:text-4xl text-[#74122d] pt-3">
              {family.closing}
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
