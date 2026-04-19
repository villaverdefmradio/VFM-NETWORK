import React, { useState, useRef, useEffect } from 'react';
import { Send, LogIn, MessageSquare } from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  addDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: Timestamp;
}

export default function Chat() {
  const { user, signIn } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(50));
  const [values, loading, error] = useCollectionData(q, { idField: 'id' } as any);

  useEffect(() => {
    if (error) console.error("Firestore Chat Error:", error);
  }, [error]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    try {
      await addDoc(messagesRef, {
        text: inputValue.trim(),
        senderId: user.uid,
        senderName: user.displayName || 'Anónimo',
        createdAt: serverTimestamp(),
      });
      setInputValue("");
    } catch (err) {
      handleFirestoreError(err, 'create', 'messages');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [values]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-[600px] overflow-hidden">
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <MessageSquare className="w-5 h-5 text-purple-500" />
        <h2 className="font-bold text-lg">Chat en Vivo</h2>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">En línea</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700"
      >
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="p-4 text-center text-xs text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
            Error al cargar mensajes: {error.message}
          </div>
        )}

        {!loading && values?.length === 0 && (
          <div className="text-center py-10 text-zinc-400 text-sm italic">
            No hay mensajes aún. ¡Sé el primero en saludar!
          </div>
        )}

        {values?.map((msg: any) => {
          const isMe = user && msg.senderId === user.uid;
          const date = msg.createdAt?.toDate?.() || null;
          const time = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';

          return (
            <div key={msg.id || Math.random()} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                  {msg.senderName}
                </span>
                <span className="text-[10px] text-zinc-400">{time}</span>
              </div>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm transition-all ${
                isMe 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
        {user ? (
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-1.5 top-1.5 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <button 
            onClick={signIn}
            className="w-full py-3 bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex items-center justify-center gap-2 text-zinc-500 hover:text-blue-500 hover:border-blue-500 transition-all group"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Inicia sesión para participar</span>
          </button>
        )}
      </div>
    </div>
  );
}
