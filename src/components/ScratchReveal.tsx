import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchRevealProps {
  onRevealed?: () => void;
  revealedContent: React.ReactNode;
  threshold?: number; // percentage scratched to auto-reveal (0.40 = 40%)
  scratchPrompt?: string;
  scratchSubtext?: string;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  onRevealed,
  revealedContent,
  threshold = 0.40,
  scratchPrompt = "✦ SCRATCH TO REVEAL ✦",
  scratchSubtext = "Scratch the gold to reveal our wedding dates"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isScratchingRef = useRef(false);
  const hasStartedScratchingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isCanvasRemoved, setIsCanvasRemoved] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{
    id: number;
    left: number;
    size: number;
    delay: number;
    targetY: number;
    targetX: number;
    targetRotate: number;
  }>>([]);

  // Draw royal gold foil texture and embossed invitation text on canvas
  const drawGoldFoil = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scale = canvas.width / (canvas.clientWidth || 320);

    ctx.save();

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c79c4a');
    grad.addColorStop(0.2, '#ecd07a');
    grad.addColorStop(0.4, '#b88d3b');
    grad.addColorStop(0.6, '#dfc06a');
    grad.addColorStop(0.8, '#a67c2d');
    grad.addColorStop(1, '#e5c46d');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Golden sparkles / foil specks overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = (Math.random() * 2 + 1) * scale;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle darker gold specks for depth
    ctx.fillStyle = 'rgba(120, 80, 20, 0.2)';
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = (Math.random() * 1.5 + 0.5) * scale;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Concentric luxury border ring inside foil
    ctx.strokeStyle = 'rgba(255, 245, 215, 0.45)';
    ctx.lineWidth = 1.5 * scale;
    ctx.strokeRect(8 * scale, 8 * scale, width - 16 * scale, height - 16 * scale);

    // Embossed gold prompt text & heart
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = `bold ${Math.round(13 * scale)}px "Cinzel", Georgia, serif`;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 4 * scale;
    ctx.shadowOffsetX = 1 * scale;
    ctx.shadowOffsetY = 1 * scale;
    ctx.fillText(scratchPrompt, width / 2, height / 2 - 12 * scale);

    ctx.font = `${Math.round(16 * scale)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('♡', width / 2, height / 2 - 32 * scale);

    ctx.font = `italic ${Math.round(12 * scale)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#fffdf5';
    ctx.fillText(scratchSubtext, width / 2, height / 2 + 15 * scale);

    ctx.restore();
  }, [scratchPrompt, scratchSubtext]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed || hasStartedScratchingRef.current) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 3);
    const clientWidth = canvas.clientWidth || 320;
    const clientHeight = canvas.clientHeight || 150;

    canvas.width = Math.round(clientWidth * ratio);
    canvas.height = Math.round(clientHeight * ratio);

    drawGoldFoil(canvas);
  }, [drawGoldFoil, isRevealed]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      // Do not reset gold foil if user has already started scratching or card is revealed
      if (!hasStartedScratchingRef.current && !isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Reliable completion animation
  const completeReveal = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    isScratchingRef.current = false;
    lastPointRef.current = null;

    // Generate floating celebratory hearts
    const hearts = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 0.4,
      targetY: -140 - Math.random() * 60,
      targetX: (Math.random() - 0.5) * 40,
      targetRotate: (Math.random() - 0.5) * 45,
    }));
    setFloatingHearts(hearts);

    // Celebratory golden confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c69c57', '#e8ca88', '#f3dfa2', '#e17085', '#74122d'],
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    } catch {
      // Ignore if confetti not available
    }

    // Remove scratch canvas overlay after the smooth fade completes
    setTimeout(() => {
      setIsCanvasRemoved(true);
    }, 650);

    if (onRevealed) onRevealed();
  }, [isRevealed, onRevealed]);

  // Accurate scratch progress calculation sampling active date area
  const checkScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Sample the central region where date content is located (10% to 90% width, 15% to 85% height)
    const startX = Math.round(width * 0.1);
    const endX = Math.round(width * 0.9);
    const startY = Math.round(height * 0.15);
    const endY = Math.round(height * 0.85);
    const sampleWidth = endX - startX;
    const sampleHeight = endY - startY;

    if (sampleWidth <= 0 || sampleHeight <= 0) return;

    const imgData = ctx.getImageData(startX, startY, sampleWidth, sampleHeight);
    const pixels = imgData.data;
    let transparentCount = 0;
    const sampleStep = 16;
    const totalSamples = pixels.length / (4 * sampleStep);

    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const ratio = transparentCount / totalSamples;
    if (ratio >= threshold) {
      completeReveal();
    }
  }, [isRevealed, threshold, completeReveal]);

  // Map touch/pointer client coordinates relative to the canvas internal buffer
  function getPointerPosition(event: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture not supported
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { x, y } = getPointerPosition(e, canvas);
    const lineWidth = 38 * (canvas.width / (canvas.clientWidth || 320));

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.restore();

    isScratchingRef.current = true;
    hasStartedScratchingRef.current = true;
    lastPointRef.current = { x, y };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { x, y } = getPointerPosition(e, canvas);
    const previous = lastPointRef.current;
    const lineWidth = 38 * (canvas.width / (canvas.clientWidth || 320));

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (previous) {
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Intermediate dense circular dabs for smooth, gap-free erase on fast finger swipes
      const dist = Math.hypot(x - previous.x, y - previous.y);
      const step = lineWidth / 3;
      if (dist > step) {
        const steps = Math.ceil(dist / step);
        for (let i = 1; i < steps; i++) {
          const t = i / steps;
          ctx.beginPath();
          ctx.arc(previous.x + (x - previous.x) * t, previous.y + (y - previous.y) * t, lineWidth / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    lastPointRef.current = { x, y };

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(() => {
        checkScratchProgress();
        animFrameRef.current = null;
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = false;
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    checkScratchProgress();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-inner select-none"
        style={{ touchAction: 'none' }}
      >
        {/* 1. Underlying Date / Reveal Card - already rendered beneath before scratching starts */}
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-[#ffffff] to-[#faf6ef] rounded-2xl border border-amber-200/60 shadow-sm pointer-events-auto">
          {revealedContent}
        </div>

        {/* 2. Transparent HTML Canvas placed directly over the card with gold foil */}
        {!isCanvasRemoved && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`scratch-canvas absolute inset-0 transition-opacity duration-600 ease-out ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-grab active:cursor-grabbing'
            }`}
            style={{ borderRadius: '1rem', touchAction: 'none' }}
          />
        )}

        {/* Floating Celebratory Hearts when revealed */}
        <AnimatePresence>
          {isRevealed && floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: 30, scale: 0.5, x: 0 }}
              animate={{ 
                opacity: [0, 0.9, 0.9, 0],
                y: heart.targetY,
                x: heart.targetX,
                scale: [0.5, 1.2, 1],
                rotate: heart.targetRotate
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, delay: heart.delay, ease: "easeOut" }}
              className="absolute bottom-4 pointer-events-none z-30"
              style={{ left: `${heart.left}%` }}
            >
              <svg 
                width={heart.size} 
                height={heart.size} 
                viewBox="0 0 24 24" 
                fill="#e65a78" 
                className="drop-shadow-[0_2px_8px_rgba(230,90,120,0.5)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. Accessible Secondary Tap-to-Reveal Control */}
      {!isRevealed && (
        <button
          type="button"
          onClick={completeReveal}
          className="mt-3 px-3.5 py-1.5 rounded-full text-xs font-cinzel tracking-wider text-[#6b1228] bg-[#fbf5e6]/80 hover:bg-[#fbf5e6] border border-[#c69c57]/40 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer font-semibold"
          aria-label="Tap to reveal wedding date directly without scratching"
        >
          <span className="text-[#c69c57]">✦</span>
          <span className="underline underline-offset-4 decoration-[#6b1228]/40">Tap to reveal directly</span>
          <span className="text-[#c69c57]">✦</span>
        </button>
      )}
    </div>
  );
};

export default ScratchReveal;
