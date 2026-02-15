import React, { useEffect, useState } from 'react';
import { useLiveSession } from '../hooks/useLiveSession';
import { Mic, MicOff, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VoiceInterface: React.FC = () => {
  const { connect, disconnect, status, volume } = useLiveSession();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-connect when opened
  useEffect(() => {
    if (isOpen && status === 'disconnected') {
      connect();
    } else if (!isOpen && status !== 'disconnected') {
      disconnect();
    }
  }, [isOpen, connect, disconnect]);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Visualizer bars
  const bars = Array.from({ length: 5 });

  return (
    <>
      <button
        onClick={toggleOpen}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-500'
        } text-white flex items-center justify-center group`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute right-full mr-3 bg-slate-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Talk to Lumina
            </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col items-center justify-center text-center space-y-6">
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                        status === 'connected' ? 'bg-green-500 animate-pulse' :
                        status === 'speaking' ? 'bg-purple-500' :
                        status === 'connecting' ? 'bg-yellow-500' : 'bg-slate-500'
                    }`} />
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        {status === 'speaking' ? 'Lumina Speaking' : 
                         status === 'connected' ? 'Listening...' : 
                         status === 'connecting' ? 'Connecting...' : 'Disconnected'}
                    </span>
                </div>

                {/* Visualizer */}
                <div className="h-16 flex items-center justify-center space-x-1">
                    {bars.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: status === 'speaking' || status === 'connected' 
                                    ? 16 + (volume * 100 * (Math.random() + 0.5)) 
                                    : 4,
                                backgroundColor: status === 'speaking' ? '#a855f7' : '#3b82f6'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-3 rounded-full bg-blue-500"
                            style={{ minHeight: '4px', maxHeight: '64px' }}
                        />
                    ))}
                </div>

                <div className="text-slate-300 text-sm">
                    {status === 'connected' ? 
                        "Say 'Schedule lunch with Mike tomorrow at 1pm'" : 
                        status === 'speaking' ? "Responding..." : "Initializing..."
                    }
                </div>
            </div>
            
            {/* Footer */}
            <div className="bg-slate-950/50 p-3 text-center border-t border-white/5">
                <p className="text-[10px] text-slate-500">Powered by Gemini Live API</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};