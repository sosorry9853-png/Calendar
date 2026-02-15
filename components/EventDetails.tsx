import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Trash2, Calendar, AlignLeft } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarEvent } from '../types';

interface EventDetailsPanelProps {
  event: CalendarEvent;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({ event, onClose, onDelete }) => {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl p-6 flex flex-col"
    >
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-xl font-bold text-white/90">Event Details</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
        <div>
          <h3 className="text-3xl font-bold text-white mb-3 leading-tight tracking-tight">{event.title}</h3>
          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${event.color} text-white shadow-lg shadow-black/20`}>
             {event.color.replace('bg-', '').replace('-500', '')}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 text-slate-300 group">
            <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                <Calendar className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{format(event.start, 'EEEE, MMMM d')}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Date</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-slate-300 group">
            <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                <Clock className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            </div>
            <div>
              <p className="font-semibold text-white text-lg">
                {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Time</p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-4 text-slate-300 group">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-white leading-snug">{event.location}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Location</p>
              </div>
            </div>
          )}

          {event.description && (
            <div className="flex items-start gap-4 text-slate-300 group">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                <AlignLeft className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-300">{event.description}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Description</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800/50 mt-4">
        <button
          onClick={() => onDelete(event.id)}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium py-3.5 rounded-xl transition-all border border-red-500/20 hover:border-red-500/40"
        >
          <Trash2 size={18} />
          Delete Event
        </button>
      </div>
    </motion.div>
  );
};

export const EventDetails: React.FC = () => {
  const { selectedEvent, setSelectedEvent, removeEvent } = useCalendar();

  return (
    <AnimatePresence>
      {selectedEvent && (
        <EventDetailsPanel 
          key="panel"
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onDelete={removeEvent}
        />
      )}
    </AnimatePresence>
  );
};