import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, MapPin, AlignLeft } from 'lucide-react';
import { useCalendar } from '../contexts/CalendarContext';
import { format } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDate?: Date;
}

export const EventModal: React.FC<EventModalProps> = ({ onClose, preselectedDate }) => {
  const { addEvent } = useCalendar();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(preselectedDate ? format(preselectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    
    addEvent({
        title,
        start,
        end,
        location,
        description,
        color: 'bg-emerald-500'
    });
    
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/30">
          <h2 className="text-lg font-bold text-white tracking-tight">New Event</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Event Title</label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Team Sync"
              className="w-full bg-slate-950/50 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
              <div>
                 <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Date</label>
                 <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 text-slate-500 w-4 h-4 pointer-events-none" />
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Time</label>
                    <div className="flex items-center space-x-2">
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="bg-slate-950/50 border border-slate-700/60 rounded-xl px-2 py-2.5 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 [color-scheme:dark]" />
                        <span className="text-slate-500 font-medium">-</span>
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="bg-slate-950/50 border border-slate-700/60 rounded-xl px-2 py-2.5 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 [color-scheme:dark]" />
                    </div>
                 </div>
              </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Location</label>
            <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-500 w-4 h-4 pointer-events-none" />
                <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Add location"
                className="w-full bg-slate-950/50 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
            <div className="relative">
                <AlignLeft className="absolute left-3 top-3 text-slate-500 w-4 h-4 pointer-events-none" />
                <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add details"
                rows={3}
                className="w-full bg-slate-950/50 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none placeholder:text-slate-600"
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] ring-1 ring-white/10"
          >
            Create Event
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};