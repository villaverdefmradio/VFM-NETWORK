import React from 'react';
import { Clock, Calendar } from 'lucide-react';

const scheduleData = [
  { time: "08:00 - 10:00", title: "Buenos Días Villaverde", host: "Juan Pérez", category: "Magazine" },
  { time: "10:00 - 12:00", title: "EntreMixtando", host: "Elena García", category: "Entrevistas" },
  { time: "12:00 - 14:00", title: "La Hora del Básket", host: "Carlos Ruiz", category: "Deportes" },
  { time: "14:00 - 16:00", title: "Música sin Pausa", host: "DJ Villa", category: "Musical" },
  { time: "16:00 - 18:00", title: "Actualidad Local", host: "Marta Sánchez", category: "Noticias" },
  { time: "18:00 - 20:00", title: "Tarde de Radio", host: "Pedro López", category: "Variedades" },
];

export default function Schedule() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold">Programación de Hoy</h2>
      </div>
      
      <div className="space-y-4">
        {scheduleData.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
          >
            <div className="flex flex-col items-center min-w-[100px] py-1 px-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Clock className="w-3 h-3 text-zinc-500 mb-1" />
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{item.time}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">con {item.host}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
