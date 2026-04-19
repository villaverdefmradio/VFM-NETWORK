import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "RadioBot", text: "¡Bienvenidos al chat de Villaverde FM!", time: "12:00", isMe: false },
    { id: 2, user: "Maria88", text: "Me encanta la canción que está sonando.", time: "12:05", isMe: false },
    { id: 3, user: "Juan_V", text: "Saludos desde el centro.", time: "12:10", isMe: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      user: "Tú",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col h-[500px]">
      <div className="p-4 border-bottom border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-500" />
        <h2 className="font-bold text-lg">Chat en Vivo</h2>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-zinc-500 font-medium">124 online</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-center gap-2 mb-1 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{msg.user}</span>
              <span className="text-[10px] text-zinc-400">{msg.time}</span>
            </div>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.isMe 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-b-2xl border-t border-zinc-100 dark:border-zinc-800">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-1.5 top-1.5 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
