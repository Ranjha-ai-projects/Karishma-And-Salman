import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { invitationData } from './data/invitation';
import { coverImage } from './assets/coverImage';
import { MusicControl } from './components/MusicControl';
import { WeddingIntroduction } from './components/WeddingIntroduction';
import { SaveTheDate } from './components/SaveTheDate';
import { WeddingCountdown } from './components/WeddingCountdown';
import { WeddingEvents } from './components/WeddingEvents';
import { VenueDetails } from './components/VenueDetails';
import { FamilyDetails } from './components/FamilyDetails';
import { ThankYou } from './components/ThankYou';

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [overlayUnmounted, setOverlayUnmounted] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  // Dev mode flag for testing replay if needed: e.g. ?dev=true or ?replay=true
  const [isDevMode, setIsDevMode] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const emblemRef = useRef<HTMLButtonElement | null>(null);
  const headerNoteRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check for dev mode in query string
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsDevMode(params.has('dev') || params.has('replay'));
    }

    // Scroll to top and lock scroll during unopened envelope state
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (isAnimating || isOpened) return;

    setIsAnimating(true);
    setStartMusic(true);

    // Golden celebratory particles burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#d4ac6b', '#ffecc6', '#a77d46', '#58152d', '#ffffff'],
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsOpened(true);
      setOverlayUnmounted(true);
      setIsAnimating(false);
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const overlay = overlayRef.current;
    const scene = sceneRef.current;
    const emblem = emblemRef.current;
    const headerNote = headerNoteRef.current;
    const hint = hintRef.current;

    if (!scene || !overlay) {
      setIsOpened(true);
      setOverlayUnmounted(true);
      setIsAnimating(false);
      document.body.style.overflow = '';
      return;
    }

    if (timelineRef.current) timelineRef.current.kill();

    // Synchronized GSAP Timeline for butter-smooth zoom and progressive dissolve
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpened(true);
        setOverlayUnmounted(true);
        setIsAnimating(false);
        document.body.style.overflow = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
      },
    });

    timelineRef.current = tl;

    // 0.00s–0.20s: Emblem tactile response
    if (emblem) {
      tl.to(
        emblem,
        {
          scale: 0.93,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 0.05s–0.35s: Fade out header note and hint cleanly
    if (headerNote) {
      tl.to(
        headerNote,
        {
          opacity: 0,
          y: -12,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.05
      );
    }

    if (hint) {
      tl.to(
        hint,
        {
          opacity: 0,
          y: 12,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.05
      );
    }

    // 0.20s–0.80s: Gentle smooth zoom acceleration
    tl.to(
      scene,
      {
        scale: 1.65,
        duration: 0.6,
        ease: 'power2.in',
        transformOrigin: '50% 50%',
      },
      0.2
    );

    // 0.80s–1.60s: Continuous scaling outward to 3.8x without sudden jumps
    tl.to(
      scene,
      {
        scale: 3.8,
        duration: 0.8,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
      },
      0.8
    );

    // 0.75s–1.55s: Envelope dissolves smoothly into the cream invitation already visible underneath
    tl.to(
      scene,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.inOut',
      },
      0.75
    );

    // 0.95s–1.65s: Overlay radial backdrop dissolves cleanly to reveal cream invitation
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.7,
        ease: 'power1.out',
      },
      0.95
    );
  };

  // Dev-only reset function
  const handleDevReset = () => {
    if (timelineRef.current) timelineRef.current.kill();
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsOpened(false);
    setIsAnimating(false);
    setOverlayUnmounted(false);

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 1 });
    }
    if (sceneRef.current) {
      gsap.set(sceneRef.current, { scale: 1, opacity: 1 });
    }
    if (emblemRef.current) {
      gsap.set(emblemRef.current, { scale: 1 });
    }
    if (headerNoteRef.current) {
      gsap.set(headerNoteRef.current, { opacity: 1, y: 0 });
    }
    if (hintRef.current) {
      gsap.set(hintRef.current, { opacity: 1, y: 0 });
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#fbf8f2] text-[#4a2e2b] relative selection:bg-[#c69c57] selection:text-[#380714]">
      {/* Background Music Player */}
      <MusicControl musicUrl={invitationData.musicUrl} autoStart={startMusic} />

      {/* =========================================================================
          LAYER 1: WEDDING INVITATION (ALREADY RENDERED IN THE BACKGROUND)
          Directly begins with Arabic Bismillah and Royal Introduction (Screenshot 2)
          No intermediate burgundy screen!
      ========================================================================= */}
      <div 
        id="invitation-content"
        className="w-full flex flex-col items-center relative"
      >
        {/* Traditional Islamic Blessing & Family Introduction (Screenshot 2) */}
        <WeddingIntroduction data={invitationData} />

        {/* Interactive Scratch-to-Reveal Save the Date */}
        <SaveTheDate data={invitationData} />

        {/* Live Countdown Clock to Nikah */}
        <WeddingCountdown data={invitationData} />

        {/* Multi-Day Ceremonies (Haldi, Mehendi, Nikah) */}
        <WeddingEvents events={invitationData.events} />

        {/* Venue & Location with Interactive Map and Directions */}
        <VenueDetails venue={invitationData.venue} />

        {/* Family Welcoming Details */}
        <FamilyDetails family={invitationData.family} />

        {/* Heartfelt Thank You & Lanterns */}
        <ThankYou thankYou={invitationData.thankYou} />
      </div>

      {/* =========================================================================
          LAYER 2: FOREGROUND ROYAL ENVELOPE OVERLAY
          Smoothly zooms and dissolves, directly exposing the cream invitation
      ========================================================================= */}
      {!overlayUnmounted && (
        <div
          ref={overlayRef}
          className="envelope-overlay"
          aria-label="Open the royal invitation"
          style={{
            touchAction: isAnimating ? 'none' : 'auto',
            pointerEvents: isAnimating ? 'none' : 'auto',
          }}
        >
          {/* Top Header Note */}
          <div ref={headerNoteRef} className="header-note">
            A Royal Wedding Invitation
          </div>

          {/* 3D Perspective Scene Container */}
          <div
            ref={sceneRef}
            className="envelope-scene"
            id="scene"
          >
            <img
              src={coverImage}
              alt="Royal Wedding Invitation Cover"
              className="envelope-cover"
              loading="eager"
              draggable={false}
            />

            {/* Circular Interactive Emblem with Pulse & Rotating Spark */}
            <button
              ref={emblemRef}
              type="button"
              className="emblem-btn"
              onClick={handleOpenEnvelope}
              aria-label="Enter the wedding invitation"
              disabled={isAnimating}
            >
              <span className="emblem-spark" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Hint */}
          <div ref={hintRef} className="hint">
            Tap the golden emblem to enter
          </div>
        </div>
      )}

      {/* Development-Only Replay Button (Only visible if ?dev=true or ?replay=true in URL) */}
      {isDevMode && isOpened && (
        <button
          type="button"
          onClick={handleDevReset}
          className="fixed bottom-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-[#f9efe5]/90 border border-[#c6a67b] text-[#6f3d3f] text-xs font-sans shadow-md hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
          aria-label="Developer Replay Entrance"
        >
          <span>↺</span>
          <span>Dev Replay</span>
        </button>
      )}
    </main>
  );
}

export default App;
