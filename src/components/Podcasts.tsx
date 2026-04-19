import React, { useState, useEffect } from 'react';
import { PlayCircle, Headphones, Download, Share2, Loader2, PauseCircle } from 'lucide-react';

interface PodcastItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  image: string;
  audioUrl: string;
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePodcast, setActivePodcast] = useState<string | null>(null);

  const RSS_URL = 'https://www.ivoox.com/smoothjazz-top-20_fg_f11070463_filtro_1.xml';
  const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`;

  useEffect(() => {
    async function fetchRSS() {
      try {
        const response = await fetch(PROXY_URL);
        if (!response.ok) throw new Error('No se pudo conectar con el servidor de podcasts');
        
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        const parsedItems: PodcastItem[] = Array.from(items).slice(0, 8).map((item, index) => {
          const title = item.querySelector("title")?.textContent || "Sin título";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const date = new Date(pubDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
          const duration = item.getElementsByTagName("itunes:duration")[0]?.textContent || "N/A";
          const image = item.getElementsByTagName("itunes:image")[0]?.getAttribute("href") || "https://picsum.photos/seed/jazz/400/400";
          const audioUrl = item.querySelector("enclosure")?.getAttribute("url") || "";
          
          return {
            id: audioUrl || index.toString(),
            title,
            date,
            duration,
            image,
            audioUrl
          };
        });

        setPodcasts(parsedItems);
      } catch (err) {
        console.error("RSS Fetch Error:", err);
        setError("Error al cargar los podcasts. Por favor, inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchRSS();
  }, []);

  const togglePodcast = (url: string) => {
    if (activePodcast === url) {
      setActivePodcast(null);
    } else {
      setActivePodcast(url);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium">Cargando Smooth Jazz Top 100...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm font-bold text-red-600 underline">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Smooth Jazz Top 100</h2>
            <p className="text-sm text-zinc-500 font-medium">Últimos programas de iVoox</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id} 
            className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden group">
              <img 
                src={podcast.image} 
                alt={podcast.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button 
                  onClick={() => togglePodcast(podcast.audioUrl)}
                  className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300"
                >
                  {activePodcast === podcast.audioUrl ? (
                    <PauseCircle className="w-10 h-10 fill-current" />
                  ) : (
                    <PlayCircle className="w-10 h-10 fill-current" />
                  )}
                </button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 uppercase tracking-tighter">
                {podcast.duration}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-2 h-10 text-sm mb-3">
                {podcast.title}
              </h3>
              
              {activePodcast === podcast.audioUrl && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <audio 
                    autoPlay 
                    controls 
                    className="w-full h-8 scale-90 -mx-4 accent-blue-600"
                    src={podcast.audioUrl}
                  />
                  <p className="text-[10px] text-center text-blue-500 font-bold mt-2 uppercase animate-pulse">Reproduciendo...</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">{podcast.date}</span>
                <div className="flex gap-1">
                  <a href={podcast.audioUrl} download className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all">
                    <Download className="w-4 h-4" />
                  </a>
                  <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full transition-all">
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
