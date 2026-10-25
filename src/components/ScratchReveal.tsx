import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchRevealProps {
  onRevealed?: () => void;
  revealedContent: React.ReactNode;
  threshold?: number; // percentage scratched to auto-reveal (0.42 = 42%)
  scratchPrompt?: string;
  scratchSubtext?: string;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  onRevealed,
  revealedContent,
  threshold = 0.42,
  scratchPrompt = "✦ SCRATCH TO REVEAL ✦",
  scratchSubtext = "Scratch the gold to reveal our wedding dates"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isScratchingRef = useRef(false);
  const hasStartedScratchingRef = useRef(false);
  const radiusRef = useRef(36);
  const animFrameRef = useRef<number | null>(null);

  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{
    id: number;
    left: number;
    size: number;
    delay: number;
    targetY: number;
    targetX: number;
    targetRotate: number;
  }>>([]);

  // Draw gold foil texture on canvas
  const drawGoldFoil = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
    ctx.save();
    ctx.scale(dpr, dpr);

    // Rich golden metallic gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c79c4a');
    grad.addColorStop(0.2, '#ecd07a');
    grad.addColorStop(0.4, '#b88d3b');
    grad.addColorStop(0.6, '#dfc06a');
    grad.addColorStop(0.8, '#a67c2d');
    grad.addColorStop(1, '#e5c46d');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add gold flecks / sparkles overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add subtle darker gold specks
    ctx.fillStyle = 'rgba(120, 80, 20, 0.2)';
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Gold Text & Heart Icon
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top prompt
    ctx.font = 'bold 13px "Cinzel", Georgia, serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(scratchPrompt, width / 2, height / 2 - 12);

    // Heart icon above text
    ctx.font = '16px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('♡', width / 2, height / 2 - 32);

    // Subtext
    ctx.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#fffdf5';
    ctx.fillText(scratchSubtext, width / 2, height / 2 + 15);

    ctx.restore();
  }, [scratchPrompt, scratchSubtext]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isFullyRevealed || hasStartedScratchingRef.current) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, rect.width || 320);
    const height = Math.max(120, rect.height || 150);

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Dynamic stroke radius based on device density (around 22-26 CSS pixels)
    radiusRef.current = Math.round(24 * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    drawGoldFoil(ctx, width, height, dpr);
  }, [drawGoldFoil, isFullyRevealed]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      // Only re-init if scratching hasn't commenced, avoiding foil reset during scroll
      if (!hasStartedScratchingRef.current && !isFullyRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isFullyRevealed]);

  const completeReveal = useCallback(() => {
    if (isFullyRevealed) return;
    setIsFullyRevealed(true);
    isScratchingRef.current = false;
    lastPosRef.current = null;

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
        colors: ['#c69c57', '#e8ca88', '#f3dfa2', '#e17085', '#74122d']
      });
    } catch {
      // Ignore if confetti not available
    }

    if (onRevealed) onRevealed();
  }, [isFullyRevealed, onRevealed]);

  // Check how much has been scratched (at ~42% threshold auto-complete)
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Sample pixels across canvas
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    let transparentCount = 0;
    const sampleStep = 16;
    const totalSamples = pixels.length / (4 * sampleStep);

    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const percentage = transparentCount / totalSamples;
    if (percentage >= threshold) {
      completeReveal();
    }
  }, [isFullyRevealed, threshold, completeReveal]);

  // Exact mapping from screen coordinates to canvas internal pixels
  const getCanvasPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const radius = radiusRef.current;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const interpolateScratch = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);
    const radius = radiusRef.current;
    const step = Math.max(3, radius / 3);

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius * 2;

    // Continuous connecting stroke
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Intermediate circular dabs for solid, gap-free erase
    if (dist > step) {
      const steps = Math.ceil(dist / step);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        ctx.beginPath();
        ctx.arc(p1.x + dx * t, p1.y + dy * t, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Destination circular stamp
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Modern Unified Pointer Events with setPointerCapture
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isFullyRevealed) return;
    isScratchingRef.current = true;
    hasStartedScratchingRef.current = true;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture not supported
    }

    const pos = getCanvasPoint(e.clientX, e.clientY);
    lastPosRef.current = pos;
    scratchAt(pos.x, pos.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || isFullyRevealed) return;

    const currentPos = getCanvasPoint(e.clientX, e.clientY);

    if (lastPosRef.current) {
      interpolateScratch(lastPosRef.current, currentPos);
    } else {
      scratchAt(currentPos.x, currentPos.y);
    }

    lastPosRef.current = currentPos;

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(() => {
        checkScratchPercentage();
        animFrameRef.current = null;
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = false;
    lastPosRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    checkScratchPercentage();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-inner select-none"
        style={{ touchAction: 'none' }}
      >
        {/* Revealed Content Behind the scratch foil */}
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-[#ffffff] to-[#faf6ef] rounded-2xl border border-amber-200/60 shadow-sm">
          {revealedContent}
        </div>

        {/* Gold Scratch Canvas Layer with smooth dissolution */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
            isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-grab active:cursor-grabbing'
          }`}
          style={{ borderRadius: '1rem', touchAction: 'none' }}
        />

        {/* Floating Hearts when revealed */}
        <AnimatePresence>
          {isFullyRevealed && floatingHearts.map((heart) => (
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

      {/* Accessible Tap-to-Reveal Alternative */}
      {!isFullyRevealed && (
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
