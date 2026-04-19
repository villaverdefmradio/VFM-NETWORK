import React from 'react';
import { PlayCircle, Headphones, Download, Share2 } from 'lucide-react';

const podcastData = [
  { 
    id: 1, 
    title: "Entrevista con el Alcalde", 
    series: "Actualidad Local", 
    date: "2 Abr 2026", 
    duration: "45:20",
    image: "https://picsum.photos/seed/radio1/200/200"
  },
  { 
    id: 2, 
    title: "Resumen de la Jornada de Básket", 
    series: "La Hora del Básket", 
    date: "1 Abr 2026", 
    duration: "32:15",
    image: "https://picsum.photos/seed/radio2/200/200"
  },
  { 
    id: 3, 
    title: "Historia de Villaverde del Río", 
    series: "Cultura y Tradición", 
    date: "30 Mar 2026", 
    duration: "58:40",
    image: "https://picsum.photos/seed/radio3/200/200"
  },
  { 
    id: 4, 
    title: "Nuevas Tendencias Musicales", 
    series: "Música sin Pausa", 
    date: "28 Mar 2026", 
    duration: "25:10",
    image: "https://picsum.photos/seed/radio4/200/200"
  },
];

export default function Podcasts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Headphones className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold">Últimos Podcasts</h2>
        </div>
        <button className="text-sm font-bold text-blue-500 hover:underline">Ver todos</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {podcastData.map((podcast) => (
          <div 
            key={podcast.id} 
            className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={podcast.image} 
                alt={podcast.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                {podcast.duration}
              </div>
            </div>
            
            <div className="p-4">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{podcast.series}</span>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mt-1 line-clamp-2 leading-tight h-10">
                {podcast.title}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-zinc-500">{podcast.date}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
