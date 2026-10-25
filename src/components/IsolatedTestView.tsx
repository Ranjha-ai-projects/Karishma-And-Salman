import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScratchReveal } from './ScratchReveal';
import { coverImage } from '../assets/coverImage';
import {
  initEnvelopeDiagnostics,
  logEnvelopeEvent,
  recordEnvelopeMilestone,
  getActiveMediaQueries,
} from '../diagnostics/diagnostics';

export const IsolatedTestView: React.FC = () => {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'animating' | 'revealed'>('closed');
  const [hudUpdate, setHudUpdate] = useState(0);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const emblemRef = useRef<HTMLButtonElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isTriggeredRef = useRef(false);

  useEffect(() => {
    initEnvelopeDiagnostics();
    const interval = setInterval(() => {
      setHudUpdate((c) => c + 1);
    }, 200);
    return () => {
      clearInterval(interval);
      if (timelineRef.current) {
        logEnvelopeEvent('timeline_interrupted_or_killed', {
          reason: 'unmount',
          progress: timelineRef.current.progress(),
        });
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleOpenEnvelope = (e?: React.SyntheticEvent) => {
    if (isTriggeredRef.current || envelopeState !== 'closed') return;
    isTriggeredRef.current = true;

    const eventDetails: Record<string, unknown> = {
      eventType: e ? e.type : 'manual',
    };
    if (e && 'clientX' in e) {
      const me = e as React.MouseEvent;
      eventDetails.clientX = me.clientX;
      eventDetails.clientY = me.clientY;
    }
    logEnvelopeEvent('emblem_tap_detected', eventDetails);

    setEnvelopeState('animating');
    logEnvelopeEvent('entrance_state_change', { from: 'closed', to: 'animating' });

    const scene = sceneRef.current;
    const emblem = emblemRef.current;
    const backdrop = backdropRef.current;

    if (!scene) {
      setEnvelopeState('revealed');
      return;
    }

    if (timelineRef.current) {
      logEnvelopeEvent('timeline_interrupted_or_killed', {
        reason: 'new_animation_requested',
        progress: timelineRef.current.progress(),
      });
      timelineRef.current.kill();
    }

    const media = getActiveMediaQueries();
    const startTime = performance.now();
    const duration = media.prefersReducedMotion ? 0.6 : 1.6;

    logEnvelopeEvent('timeline_created', {
      duration,
      prefersReducedMotion: media.prefersReducedMotion,
      viewport: media.viewport,
      devicePixelRatio: media.devicePixelRatio,
    });

    const rect = scene.getBoundingClientRect();
    const scaleX = window.innerWidth / (rect.width || 1);
    const scaleY = window.innerHeight / (rect.height || 1);
    const requiredScale = Math.max(scaleX, scaleY, 3.5) * 1.35;

    let recorded0 = false;
    let recorded25 = false;
    let recorded50 = false;
    let recorded75 = false;
    let recorded100 = false;

    const tl = gsap.timeline({
      onStart: () => {
        logEnvelopeEvent('timeline_started', { startTime: performance.now() });
      },
      onUpdate: () => {
        const prog = tl.progress();
        if (!recorded0 && prog >= 0) {
          recorded0 = true;
          recordEnvelopeMilestone('0%', prog, startTime);
        }
        if (!recorded25 && prog >= 0.25) {
          recorded25 = true;
          recordEnvelopeMilestone('25%', prog, startTime);
        }
        if (!recorded50 && prog >= 0.50) {
          recorded50 = true;
          recordEnvelopeMilestone('50%', prog, startTime);
        }
        if (!recorded75 && prog >= 0.75) {
          recorded75 = true;
          recordEnvelopeMilestone('75%', prog, startTime);
        }
        if (!recorded100 && prog >= 0.99) {
          recorded100 = true;
          recordEnvelopeMilestone('100%', prog, startTime);
        }
      },
      onComplete: () => {
        if (!recorded100) {
          recorded100 = true;
          recordEnvelopeMilestone('100%', 1.0, startTime);
        }
        const totalElapsedMs = Math.round(performance.now() - startTime);
        logEnvelopeEvent('entrance_state_change', {
          from: 'animating',
          to: 'revealed',
          totalElapsedMs,
        });

        if (window.__ENVELOPE_DIAGNOSTICS__) {
          window.__ENVELOPE_DIAGNOSTICS__.status = 'completed';
          window.__ENVELOPE_DIAGNOSTICS__.completionTime = performance.now();
          window.__ENVELOPE_DIAGNOSTICS__.totalDurationMs = totalElapsedMs;
        }

        setEnvelopeState('revealed');
      },
    });

    timelineRef.current = tl;

    if (media.prefersReducedMotion) {
      if (backdrop) tl.to(backdrop, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 0);
      tl.to(scene, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 0);
      return;
    }

    if (emblem) {
      tl.to(
        emblem,
        {
          scale: 0.93,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
        0
      );
    }

    if (backdrop) {
      tl.to(
        backdrop,
        {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0.2
      );
    }

    tl.to(
      scene,
      {
        scale: requiredScale,
        duration: 1.4,
        ease: 'power2.inOut',
        transformOrigin: '50% 50%',
        force3D: true,
      },
      0.2
    );

    tl.to(
      scene,
      {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      },
      0.6
    );
  };

  const handleReset = () => {
    isTriggeredRef.current = false;
    if (timelineRef.current) timelineRef.current.kill();
    setEnvelopeState('closed');
    initEnvelopeDiagnostics();

    if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1 });
    if (sceneRef.current) gsap.set(sceneRef.current, { scale: 1, opacity: 1 });
    if (emblemRef.current) gsap.set(emblemRef.current, { scale: 1 });
  };

  const envDiag = typeof window !== 'undefined' ? window.__ENVELOPE_DIAGNOSTICS__ : null;
  const scratchDiag = typeof window !== 'undefined' ? window.__SCRATCH_DIAGNOSTICS__ : null;

  return (
    <div className="w-full min-h-screen bg-[#fbf8f2] text-[#4a2e2b] flex flex-col items-center justify-start p-4 relative">
      {/* Test Route Header */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl p-3 border border-amber-300 shadow-sm mb-4 z-40 text-center">
        <h1 className="text-base font-cinzel font-bold text-[#74122d]">
          Wedlio Isolated Mobile Test Harness
        </h1>
        <p className="text-[11px] text-[#6b5247] mt-0.5">
          Isolated testing for Envelope Zoom & Scratch Canvas (No page scroll or lanterns)
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1 bg-[#74122d] text-white text-xs rounded-md shadow-xs"
          >
            Reset Envelope
          </button>
          <a
            href="/"
            className="px-3 py-1 bg-amber-100 text-[#74122d] text-xs rounded-md border border-amber-300"
          >
            Go to Full Site
          </a>
        </div>
      </div>

      {/* Live Diagnostic HUD */}
      <div className="w-full max-w-md bg-stone-900/90 text-stone-100 text-[10px] font-mono p-3 rounded-lg shadow-md mb-4 z-40 space-y-1">
        <div className="flex justify-between border-b border-stone-700 pb-1 font-bold text-amber-300">
          <span>DIAGNOSTIC TELEMETRY (Task 1 & 2)</span>
          <span>Tick: {hudUpdate}</span>
        </div>
        <div className="flex justify-between">
          <span>Envelope Status:</span>
          <span className="font-semibold text-emerald-400">{envDiag?.status || 'idle'}</span>
        </div>
        <div className="grid grid-cols-5 gap-1 text-center py-1 bg-stone-800/80 rounded my-1 text-[9px]">
          {(['0%', '25%', '50%', '75%', '100%'] as const).map((m) => {
            const hit = envDiag?.milestones[m];
            return (
              <div
                key={m}
                className={`p-1 rounded ${hit ? 'bg-emerald-800 text-white' : 'bg-stone-700 text-stone-400'}`}
              >
                <div>{m}</div>
                <div>{hit ? `${hit.elapsedMs}ms` : '—'}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <span>Scratch Status:</span>
          <span className="font-semibold text-amber-400">{scratchDiag?.status || 'idle'}</span>
        </div>
        <div className="flex justify-between">
          <span>Scratch Progress:</span>
          <span className="font-semibold text-amber-300">
            {scratchDiag ? `${Math.round(scratchDiag.currentPercentage * 100)}%` : '0%'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Pointer Events:</span>
          <span>
            D:{scratchDiag?.pointerEventsCount.down || 0} | M:{scratchDiag?.pointerEventsCount.move || 0} | U:{scratchDiag?.pointerEventsCount.up || 0} | C:{scratchDiag?.pointerEventsCount.cancel || 0}
          </span>
        </div>
        <div className="flex justify-between text-stone-400 text-[9px]">
          <span>Viewport: {window.innerWidth}x{window.innerHeight}</span>
          <span>DPR: {window.devicePixelRatio || 1}</span>
          <span>Motion: {envDiag?.mediaQueries.prefersReducedMotion ? 'Reduced' : 'Standard'}</span>
        </div>
      </div>

      {/* ISOLATED SECTION 1: Scratch Canvas Test */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-md border border-amber-200 mb-8 z-10 flex flex-col items-center">
        <h2 className="text-xs font-cinzel font-bold text-[#80223a] mb-2 uppercase tracking-wider">
          Isolated Scratch Canvas
        </h2>
        <ScratchReveal
          threshold={0.4}
          revealedContent={
            <div className="text-center">
              <p className="text-[11px] font-cinzel text-amber-800 uppercase tracking-widest">
                Save the Auspicious Dates
              </p>
              <p className="text-xl font-cinzel font-bold text-[#74122d] my-1">
                03 – 05 DEC 2026
              </p>
              <p className="text-xs font-serif italic text-stone-600">
                Karishma & Salman • Sultanpur
              </p>
            </div>
          }
        />
      </div>

      {/* ISOLATED SECTION 2: Envelope Entrance Overlay */}
      {envelopeState !== 'revealed' && (
        <div
          className="envelope-overlay"
          style={{ touchAction: 'none' }}
        >
          <div ref={backdropRef} className="envelope-backdrop" />

          <div
            ref={sceneRef}
            className="envelope-scene cursor-pointer"
            id="isolated-scene"
            onClick={handleOpenEnvelope}
          >
            <img
              src={coverImage}
              alt="Royal Wedding Envelope"
              className="envelope-cover"
              draggable={false}
            />

            <button
              ref={emblemRef}
              type="button"
              className="emblem-btn group"
              onClick={handleOpenEnvelope}
              aria-label="Open wedding invitation"
            >
              <span className="emblem-spark" aria-hidden="true" />
              <div
                className="relative w-[78%] h-[78%] rounded-full flex items-center justify-center pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #f7ecd9 0%, #ebd6bb 45%, #cfad83 80%, #b89163 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(70, 25, 10, 0.35), 0 2px 6px rgba(0, 0, 0, 0.18)',
                  border: '1px solid rgba(168, 125, 68, 0.5)',
                }}
              >
                <span className="font-cinzel text-base font-bold text-[#80531a]">
                  KS
                </span>
              </div>
            </button>
          </div>

          <div className="hint z-10">
            Tap the golden emblem to test isolated zoom
          </div>
        </div>
      )}
    </div>
  );
};

export default IsolatedTestView;
