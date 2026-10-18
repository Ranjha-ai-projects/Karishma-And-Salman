import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  musicUrl: string;
  autoStart?: boolean;
}

export const MusicControl: React.FC<MusicControlProps> = ({ musicUrl, autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    if (autoStart) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be blocked by browser until user gesture
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl, autoStart]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
        className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#5a0d20]/85 hover:bg-[#5a0d20] text-[#e8ca88] border border-[#c69c57]/60 shadow-lg backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-[#f3dfa2] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </>
        ) : (
          <VolumeX className="w-5 h-5 text-[#c69c57]/80" />
        )}
      </button>
    </div>
  );
};
