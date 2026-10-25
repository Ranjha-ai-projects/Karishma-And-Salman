/**
 * Wedlio Royal Reveal — Production Diagnostic Instrumentation
 * Temporary diagnostics to capture exact mobile browser animation,
 * touch gestures, pointer events, and canvas metrics.
 */

export interface EnvelopeDiagnosticEvent {
  type:
    | 'emblem_tap_detected'
    | 'timeline_created'
    | 'timeline_started'
    | 'progress_milestone'
    | 'timeline_interrupted_or_killed'
    | 'component_unmounted'
    | 'entrance_state_change';
  timestamp: number;
  data: Record<string, unknown>;
}

export interface ProgressMilestoneRecord {
  milestone: '0%' | '25%' | '50%' | '75%' | '100%';
  progress: number;
  elapsedMs: number;
  timestamp: number;
}

export interface EnvelopeDiagnostics {
  status:
    | 'idle'
    | 'tap_detected'
    | 'timeline_created'
    | 'timeline_started'
    | 'animating'
    | 'completed'
    | 'interrupted_or_killed'
    | 'unmounted';
  events: EnvelopeDiagnosticEvent[];
  milestones: {
    '0%': ProgressMilestoneRecord | null;
    '25%': ProgressMilestoneRecord | null;
    '50%': ProgressMilestoneRecord | null;
    '75%': ProgressMilestoneRecord | null;
    '100%': ProgressMilestoneRecord | null;
  };
  mediaQueries: {
    isMobileMaxWidth640: boolean;
    isMobileMaxWidth768: boolean;
    isCoarsePointer: boolean;
    canHover: boolean;
    prefersReducedMotion: boolean;
    viewport: { width: number; height: number };
    devicePixelRatio: number;
    userAgent: string;
  };
  tapTime?: number;
  startTime?: number;
  completionTime?: number;
  totalDurationMs?: number;
  expectedDurationSec?: number;
  updateCount: number;
  jumpedDirectlyToCompletion: boolean;
  cancellationReason?: string;
  cancellationProgress?: number;
}

export interface ScratchDiagnosticEvent {
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel' | 'progress_check' | 'reveal_triggered';
  timestamp: number;
  pointerType?: string;
  pointerId?: number;
  client?: { x: number; y: number };
  canvasRelative?: { x: number; y: number };
  bufferCoordinates?: { x: number; y: number };
  cssDimensions?: { width: number; height: number };
  internalDimensions?: { width: number; height: number };
  devicePixelRatio?: number;
  completionPercentage?: number;
  notes?: string;
}

export interface ScratchDiagnostics {
  status: 'idle' | 'scratching' | 'revealed';
  pointerEventsCount: {
    down: number;
    move: number;
    up: number;
    cancel: number;
  };
  canvasMetrics: {
    cssWidth: number;
    cssHeight: number;
    internalWidth: number;
    internalHeight: number;
    devicePixelRatio: number;
  } | null;
  currentPercentage: number;
  threshold: number;
  events: ScratchDiagnosticEvent[];
  history: Array<{ percentage: number; elapsedMs: number }>;
  gestureInterceptionSuspected: boolean;
  coordinateMismatchSuspected: boolean;
}

declare global {
  interface Window {
    __ENVELOPE_DIAGNOSTICS__?: EnvelopeDiagnostics;
    __SCRATCH_DIAGNOSTICS__?: ScratchDiagnostics;
  }
}

export function getActiveMediaQueries() {
  if (typeof window === 'undefined') {
    return {
      isMobileMaxWidth640: false,
      isMobileMaxWidth768: false,
      isCoarsePointer: false,
      canHover: true,
      prefersReducedMotion: false,
      viewport: { width: 1024, height: 768 },
      devicePixelRatio: 1,
      userAgent: 'SSR',
    };
  }

  return {
    isMobileMaxWidth640: window.matchMedia('(max-width: 640px)').matches,
    isMobileMaxWidth768: window.matchMedia('(max-width: 768px)').matches,
    isCoarsePointer: window.matchMedia('(pointer: coarse)').matches,
    canHover: window.matchMedia('(hover: hover)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    devicePixelRatio: window.devicePixelRatio || 1,
    userAgent: navigator.userAgent || 'unknown',
  };
}

export function initEnvelopeDiagnostics(): EnvelopeDiagnostics {
  const diagnostics: EnvelopeDiagnostics = {
    status: 'idle',
    events: [],
    milestones: {
      '0%': null,
      '25%': null,
      '50%': null,
      '75%': null,
      '100%': null,
    },
    mediaQueries: getActiveMediaQueries(),
    updateCount: 0,
    jumpedDirectlyToCompletion: false,
  };

  if (typeof window !== 'undefined') {
    window.__ENVELOPE_DIAGNOSTICS__ = diagnostics;
  }
  return diagnostics;
}

export function logEnvelopeEvent(
  type: EnvelopeDiagnosticEvent['type'],
  data: Record<string, unknown>
) {
  const timestamp = performance.now();
  const evt: EnvelopeDiagnosticEvent = { type, timestamp, data };

  if (typeof window !== 'undefined') {
    if (!window.__ENVELOPE_DIAGNOSTICS__) {
      initEnvelopeDiagnostics();
    }
    const diag = window.__ENVELOPE_DIAGNOSTICS__!;
    diag.events.push(evt);

    if (type === 'emblem_tap_detected') {
      diag.status = 'tap_detected';
      diag.tapTime = timestamp;
      diag.mediaQueries = getActiveMediaQueries();
    } else if (type === 'timeline_created') {
      diag.status = 'timeline_created';
      diag.expectedDurationSec = data.duration as number;
    } else if (type === 'timeline_started') {
      diag.status = 'timeline_started';
      diag.startTime = timestamp;
    } else if (type === 'timeline_interrupted_or_killed') {
      diag.status = 'interrupted_or_killed';
      diag.cancellationReason = (data.reason as string) || 'unknown';
      diag.cancellationProgress = (data.progress as number) || 0;
    } else if (type === 'component_unmounted') {
      diag.status = 'unmounted';
    }
  }

  console.log(`[ENVELOPE DIAGNOSTIC] ${type}:`, data);
}

export function recordEnvelopeMilestone(
  milestone: '0%' | '25%' | '50%' | '75%' | '100%',
  progress: number,
  startTime: number
) {
  const now = performance.now();
  const elapsedMs = Math.round(now - startTime);
  const record: ProgressMilestoneRecord = {
    milestone,
    progress: Math.round(progress * 1000) / 1000,
    elapsedMs,
    timestamp: now,
  };

  if (typeof window !== 'undefined') {
    if (!window.__ENVELOPE_DIAGNOSTICS__) {
      initEnvelopeDiagnostics();
    }
    const diag = window.__ENVELOPE_DIAGNOSTICS__!;
    diag.milestones[milestone] = record;
  }

  logEnvelopeEvent('progress_milestone', {
    milestone,
    progress: record.progress,
    elapsedMs,
  });
}

export function initScratchDiagnostics(threshold: number): ScratchDiagnostics {
  const diagnostics: ScratchDiagnostics = {
    status: 'idle',
    pointerEventsCount: {
      down: 0,
      move: 0,
      up: 0,
      cancel: 0,
    },
    canvasMetrics: null,
    currentPercentage: 0,
    threshold,
    events: [],
    history: [],
    gestureInterceptionSuspected: false,
    coordinateMismatchSuspected: false,
  };

  if (typeof window !== 'undefined') {
    window.__SCRATCH_DIAGNOSTICS__ = diagnostics;
  }
  return diagnostics;
}

export function logScratchEvent(event: Omit<ScratchDiagnosticEvent, 'timestamp'>) {
  const timestamp = performance.now();
  const fullEvent: ScratchDiagnosticEvent = { ...event, timestamp };

  if (typeof window !== 'undefined') {
    if (!window.__SCRATCH_DIAGNOSTICS__) {
      initScratchDiagnostics(0.4);
    }
    const diag = window.__SCRATCH_DIAGNOSTICS__!;
    diag.events.push(fullEvent);

    if (event.type === 'pointerdown') {
      diag.status = 'scratching';
      diag.pointerEventsCount.down++;
    } else if (event.type === 'pointermove') {
      diag.pointerEventsCount.move++;
    } else if (event.type === 'pointerup') {
      diag.pointerEventsCount.up++;
    } else if (event.type === 'pointercancel') {
      diag.pointerEventsCount.cancel++;
      diag.gestureInterceptionSuspected = true;
      console.warn('[SCRATCH DIAGNOSTIC] Pointer cancelled! Gesture interception suspected.');
    } else if (event.type === 'reveal_triggered') {
      diag.status = 'revealed';
    }

    if (event.completionPercentage !== undefined) {
      diag.currentPercentage = event.completionPercentage;
      diag.history.push({
        percentage: event.completionPercentage,
        elapsedMs: Math.round(timestamp - (diag.events[0]?.timestamp || timestamp)),
      });
    }

    if (event.cssDimensions && event.internalDimensions) {
      diag.canvasMetrics = {
        cssWidth: event.cssDimensions.width,
        cssHeight: event.cssDimensions.height,
        internalWidth: event.internalDimensions.width,
        internalHeight: event.internalDimensions.height,
        devicePixelRatio: event.devicePixelRatio || window.devicePixelRatio || 1,
      };
    }
  }

  console.log(`[SCRATCH DIAGNOSTIC] ${event.type}:`, event);
}
