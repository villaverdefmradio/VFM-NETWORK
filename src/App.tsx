import React from 'react';
import RadioPlayer from './components/RadioPlayer';
import Schedule from './components/Schedule';
import Chat from './components/Chat';
import Podcasts from './components/Podcasts';
import { Radio, Menu, Search, Bell } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Radio className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">Villaverde <span className="text-blue-600">FM</span></h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="text-blue-600">Inicio</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Programación</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Podcasts</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contacto</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <button className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section: Live Status & Featured */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] group shadow-2xl shadow-blue-500/10">
              <img 
                src="https://picsum.photos/seed/radio-studio/1200/600" 
                alt="Studio" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase animate-pulse">En Directo</span>
                  <span className="text-white/80 text-xs font-medium">Escuchando ahora: 1.2k oyentes</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                  EntreMixtando: Entrevista exclusiva con artistas locales
                </h2>
              </div>
            </div>
            
            <Podcasts />
          </div>

          <div className="space-y-8">
            <Schedule />
            <Chat />
          </div>
        </section>
      </main>

      {/* Floating Radio Player */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="pointer-events-auto">
          <RadioPlayer />
        </div>
      </div>
    </div>
  );
}
