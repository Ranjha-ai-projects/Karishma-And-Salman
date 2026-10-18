import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchRevealProps {
  onRevealed?: () => void;
  revealedContent: React.ReactNode;
  threshold?: number; // percentage scratched to auto-reveal (0.45 = 45%)
  scratchPrompt?: string;
  scratchSubtext?: string;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  onRevealed,
  revealedContent,
  threshold = 0.45,
  scratchPrompt = "✦ SCRATCH TO REVEAL ✦",
  scratchSubtext = "Scratch the gold to reveal our wedding dates"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isScratchingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number; size: number; delay: number }>>([]);

  // Draw gold foil texture on canvas
  const drawGoldFoil = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add subtle darker gold specks
    ctx.fillStyle = 'rgba(120, 80, 20, 0.18)';
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
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(scratchPrompt, width / 2, height / 2 - 12);

    // Heart icon above or between text
    ctx.font = '16px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('♡', width / 2, height / 2 - 32);

    // Subtext
    ctx.font = 'italic 11px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#fffdf5';
    ctx.fillText(scratchSubtext, width / 2, height / 2 + 15);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }, [scratchPrompt, scratchSubtext]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isFullyRevealed) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 140;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    drawGoldFoil(ctx, width, height);
  }, [drawGoldFoil, isFullyRevealed]);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  // Check how much has been scratched (at ~45% threshold auto-complete)
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Sample every 16th pixel for high performance
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
  }, [isFullyRevealed, threshold]);

  const completeReveal = useCallback(() => {
    if (isFullyRevealed) return;
    setIsFullyRevealed(true);

    // Generate floating celebratory hearts
    const hearts = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 0.4
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

  // Smooth continuous scratch stroke with linear interpolation
  const performScratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 44 * dpr;

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x * dpr, lastPosRef.current.y * dpr);
      ctx.lineTo(currentX * dpr, currentY * dpr);
      ctx.stroke();
    }

    // Circular brush dab at current coordinate
    ctx.beginPath();
    ctx.arc(currentX * dpr, currentY * dpr, 22 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    lastPosRef.current = { x: currentX, y: currentY };

    // Debounced percentage check with animation frame
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(() => {
        checkScratchPercentage();
        animFrameRef.current = null;
      });
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isScratchingRef.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    performScratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratchingRef.current) {
      performScratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    isScratchingRef.current = false;
    lastPosRef.current = null;
  };

  // Touch handlers with touch-action: none for mobile responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isScratchingRef.current = true;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        lastPosRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratchingRef.current && e.touches.length > 0) {
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isScratchingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-inner select-none cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Revealed Content Behind the scratch foil */}
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-[#ffffff] to-[#faf6ef] rounded-2xl border border-amber-200/60 shadow-sm">
          {revealedContent}
        </div>

        {/* Gold Scratch Canvas Layer with gentle fade dissolve */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-1000 ease-out ${
            isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
                y: -140 - Math.random() * 60,
                x: (Math.random() - 0.5) * 40,
                scale: [0.5, 1.2, 1],
                rotate: (Math.random() - 0.5) * 45
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
          className="mt-2.5 px-3 py-1 rounded-full text-[11px] font-cinzel tracking-wider text-[#a77d46] hover:text-[#58152d] hover:bg-[#fbf5e6] transition-all flex items-center gap-1.5 cursor-pointer"
          aria-label="Tap to reveal wedding date directly without scratching"
        >
          <span>✦</span>
          <span className="underline underline-offset-4 decoration-[#a77d46]/40">Tap to reveal directly</span>
          <span>✦</span>
        </button>
      )}
    </div>
  );
};
