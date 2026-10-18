import { useState, useRef } from 'react';
import type { InvitationData } from '../../data/invitation';
import { EnvelopeBack } from './EnvelopeBack';
import { EnvelopeArtwork } from './EnvelopeArtwork';
import { EnvelopeFlap } from './EnvelopeFlap';
import { EnvelopeFront } from './EnvelopeFront';
import { EnvelopeSeal } from './EnvelopeSeal';
import { InvitationReveal } from './InvitationReveal';
import { playEnvelopeOpenTimeline } from '../../animations/envelopeTimeline';
import '../../styles/envelope.css';

export type ExperienceState = 'CLOSED' | 'OPENING' | 'REVEALED' | 'CONTENT';

interface EnvelopeExperienceProps {
  data: InvitationData;
  onAudioStart?: () => void;
  onStateChange?: (state: ExperienceState) => void;
}

export const EnvelopeExperience: React.FC<EnvelopeExperienceProps> = ({
  data,
  onAudioStart,
  onStateChange,
}) => {
  const [state, setState] = useState<ExperienceState>('CLOSED');

  // GSAP animation element refs
  const envelopeContainerRef = useRef<HTMLDivElement>(null);
  const envelopeSealRef = useRef<HTMLDivElement>(null);
  const topInstructionRef = useRef<HTMLDivElement>(null);
  const bottomInstructionRef = useRef<HTMLDivElement>(null);
  const invitationWrapperRef = useRef<HTMLDivElement>(null);

  const updateState = (newState: ExperienceState) => {
    setState(newState);
    if (onStateChange) onStateChange(newState);
  };

  const handleOpenEnvelope = () => {
    if (state !== 'CLOSED') return;
    updateState('OPENING');

    // Trigger audio music playback
    if (onAudioStart) {
      onAudioStart();
    }

    // Collect invitation child elements for staggered reveal
    const revealItems = invitationWrapperRef.current
      ? (Array.from(
          invitationWrapperRef.current.querySelectorAll('.reveal-item')
        ) as HTMLElement[])
      : [];

    const lanterns = invitationWrapperRef.current
      ? (Array.from(
          invitationWrapperRef.current.querySelectorAll('.lantern-container')
        ) as HTMLElement[])
      : [];

    // Trigger synchronized master GSAP timeline
    playEnvelopeOpenTimeline(
      {
        envelopeContainer: envelopeContainerRef.current,
        envelopeSeal: envelopeSealRef.current,
        topInstruction: topInstructionRef.current,
        bottomInstruction: bottomInstructionRef.current,
        invitationWrapper: invitationWrapperRef.current,
        leftLantern: lanterns[0] || null,
        rightLantern: lanterns[1] || null,
        invitationElements: revealItems,
      },
      {
        onReveal: () => {
          updateState('REVEALED');
        },
        onComplete: () => {
          updateState('CONTENT');
        },
      }
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fbf8f2] flex flex-col items-center justify-start overflow-x-hidden">
      
      {/* 1. INITIAL CLOSED ENVELOPE OVERLAY (Centered in Viewport) */}
      {state !== 'CONTENT' && (
        <div 
          className={`fixed inset-0 z-40 flex flex-col items-center justify-between py-10 px-4 bg-[#fbf8f2] select-none ${
            state === 'REVEALED' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Top Instruction Header: "AN INVITATION AWAITS" */}
          <div
            ref={topInstructionRef}
            className="relative z-10 pt-4 text-center transition-opacity duration-300"
          >
            <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#8e6e53] uppercase font-medium">
              An Invitation Awaits
            </h2>
          </div>

          {/* Centered Royal Envelope Component */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-sm sm:max-w-md my-auto">
            <div
              ref={envelopeContainerRef}
              onClick={handleOpenEnvelope}
              className="envelope-wrapper envelope-float cursor-pointer group"
            >
              {/* Backing Base Layer */}
              <EnvelopeBack />

              {/* Damask Floral Artwork Layer */}
              <EnvelopeArtwork />

              {/* Top Flap Component (Layered & Aligned) */}
              <EnvelopeFlap />

              {/* Bottom Pocket Component (Layered & Aligned) */}
              <EnvelopeFront />

              {/* Central Embossed Wax Seal */}
              <EnvelopeSeal
                ref={envelopeSealRef}
                onClick={handleOpenEnvelope}
                isOpening={state === 'OPENING'}
              />
            </div>
          </div>

          {/* Bottom Instruction: "✦ Tap the seal to open ✦" */}
          <div
            ref={bottomInstructionRef}
            onClick={handleOpenEnvelope}
            className="relative z-10 pb-6 text-center cursor-pointer select-none"
          >
            <p className="font-great-vibes text-2xl sm:text-3xl text-[#681329] tracking-wide flex items-center justify-center gap-2.5 hover:text-[#8b1837] transition-colors">
              <span className="text-sm sm:text-base text-[#c69c57] animate-pulse">✦</span>
              <span className="drop-shadow-sm font-normal">Tap the seal to open</span>
              <span className="text-sm sm:text-base text-[#c69c57] animate-pulse">✦</span>
            </p>
          </div>
        </div>
      )}

      {/* 2. REVEALED INVITATION SECTION (Continuous underneath canvas) */}
      <div
        ref={invitationWrapperRef}
        style={{
          opacity: state === 'CLOSED' ? 0 : 1,
          pointerEvents: state === 'CONTENT' || state === 'REVEALED' ? 'auto' : 'none',
        }}
        className="w-full max-w-lg mx-auto flex flex-col items-center bg-[#fbf8f2] relative z-20 min-h-screen"
      >
        <InvitationReveal data={data} />
      </div>

    </div>
  );
};
