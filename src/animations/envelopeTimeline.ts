import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

export interface EnvelopeTimelineRefs {
  envelopeContainer: HTMLElement | null;
  envelopeSeal: HTMLElement | null;
  topInstruction: HTMLElement | null;
  bottomInstruction: HTMLElement | null;
  invitationWrapper: HTMLElement | null;
  leftLantern: HTMLElement | null;
  rightLantern: HTMLElement | null;
  invitationElements: HTMLElement[];
}

export interface EnvelopeTimelineOptions {
  onStart?: () => void;
  onReveal?: () => void;
  onComplete?: () => void;
}

export function playEnvelopeOpenTimeline(
  refs: EnvelopeTimelineRefs,
  options: EnvelopeTimelineOptions = {}
): gsap.core.Timeline {
  const tl = gsap.timeline({
    paused: false,
    onStart: () => {
      if (options.onStart) options.onStart();
    },
    onComplete: () => {
      if (options.onComplete) options.onComplete();
    },
  });

  // 1. Golden Sparkle Particle Burst at the Seal position
  try {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#c69c57', '#f3dfa2', '#e8ca88', '#74122d', '#ffffff'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  } catch {
    // Ignore if canvas-confetti is not available
  }

  // Phase 1: Immediate fade-out of the opening instructions
  if (refs.topInstruction) {
    tl.to(
      refs.topInstruction,
      {
        opacity: 0,
        y: -18,
        duration: 0.35,
        ease: 'power2.out',
      },
      0
    );
  }

  if (refs.bottomInstruction) {
    tl.to(
      refs.bottomInstruction,
      {
        opacity: 0,
        y: 18,
        duration: 0.35,
        ease: 'power2.out',
      },
      0
    );
  }

  // Phase 2: Seal micro-pulse
  if (refs.envelopeSeal) {
    tl.to(
      refs.envelopeSeal,
      {
        scale: 1.18,
        duration: 0.25,
        ease: 'back.out(2)',
      },
      0
    );
  }

  // Phase 3: Seamless continuous envelope expansion (matches frames 25-55 of the recording)
  // The envelope scales outward as one unified physical object
  if (refs.envelopeContainer) {
    tl.to(
      refs.envelopeContainer,
      {
        scale: 2.15,
        duration: 1.05,
        ease: 'power2.out',
        transformOrigin: 'center center',
      },
      0.1
    );

    // Smooth dissolve into the cream background without blank screen gap
    tl.to(
      refs.envelopeContainer,
      {
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.6,
        ease: 'power1.inOut',
      },
      0.45
    );
  }

  // Phase 4: Underlying Invitation Canvas Reveal (already positioned directly beneath)
  const revealTime = 0.35;

  tl.add(() => {
    if (options.onReveal) options.onReveal();
  }, revealTime);

  if (refs.invitationWrapper) {
    tl.fromTo(
      refs.invitationWrapper,
      {
        opacity: 0,
        scale: 0.97,
      },
      {
        opacity: 1,
        scale: 1.0,
        duration: 0.8,
        ease: 'power2.out',
      },
      revealTime
    );
  }

  // Top Corner Lanterns Drop In smoothly
  if (refs.leftLantern) {
    tl.fromTo(
      refs.leftLantern,
      {
        y: -35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      revealTime + 0.1
    );
  }

  if (refs.rightLantern) {
    tl.fromTo(
      refs.rightLantern,
      {
        y: -35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      revealTime + 0.1
    );
  }

  // Staggered sequence for invitation typography elements
  if (refs.invitationElements && refs.invitationElements.length > 0) {
    tl.fromTo(
      refs.invitationElements,
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.09,
        duration: 0.65,
        ease: 'power2.out',
      },
      revealTime + 0.2
    );
  }

  return tl;
}
