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
    <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col md:flex-row items-center gap-6 sticky bottom-4 z-50 max-w-4xl mx-auto w-full">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative group">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Radio className="w-8 h-8 text-white" />
          </div>
          {isPlaying && (
            <div className="absolute -top-1 -right-1 flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate">Villaverde FM</h3>
          <p className="text-zinc-400 text-sm truncate">En Directo - Alianza de Radios Online</p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-lg"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>

        <div className="flex items-center gap-3 flex-1 md:w-48">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
