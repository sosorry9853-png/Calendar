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

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, preselectedDate }) => {
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
    
    // Reset
    setTitle('');
    setLocation('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">New Event</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Event Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Team Sync"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
                 <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Time</label>
                    <div className="flex items-center space-x-2">
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm w-full" />
                        <span className="text-slate-500">-</span>
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm w-full" />
                    </div>
                 </div>
              </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
            <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Add location"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
            <div className="relative">
                <AlignLeft className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add description"
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
          >
            Create Event
          </button>
        </form>
      </motion.div>
    </div>
  );
};