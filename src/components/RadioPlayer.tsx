import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { motion } from 'motion/react';

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL de ejemplo para una radio (puedes cambiarla por la real)
  const streamUrl = "https://epanel.mediacp.eu:8081/stream";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden relative">
            <Radio className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10" />
            {isPlaying && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20"
              />
            )}
          </div>
        </div>
        
        <div className="min-w-0 pr-4">
          <h3 className="font-bold text-sm md:text-base truncate text-zinc-900 dark:text-zinc-100">Villaverde FM</h3>
          <div className="flex items-center gap-2">
            {isPlaying && (
              <div className="flex gap-0.5 items-end h-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-0.5 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
            )}
            <p className="text-zinc-500 dark:text-zinc-400 text-xs truncate">En Directo</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-center w-full md:w-1/3">
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl hover:scale-110 active:scale-95 group"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        </button>
      </div>

      <div className="flex items-center gap-4 w-full md:w-1/3 justify-end">
        <div className="flex items-center gap-3 w-40">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
