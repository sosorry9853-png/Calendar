import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Trash2, Calendar, AlignLeft } from 'lucide-react';
import { format } from 'date-fns';

export const EventDetails: React.FC = () => {
  const { selectedEvent, setSelectedEvent, removeEvent } = useCalendar();

  return (
    <AnimatePresence>
      {selectedEvent && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 z-40 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-bold text-white">Event Details</h2>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{selectedEvent.title}</h3>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${selectedEvent.color} text-white/90`}>
                 {selectedEvent.color.replace('bg-', '').replace('-500', '')} Label
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-300">
                <Calendar className="w-5 h-5 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium text-white">{format(selectedEvent.start, 'EEEE, MMMM d')}</p>
                  <p className="text-sm text-slate-400">Date</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-5 h-5 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium text-white">
                    {format(selectedEvent.start, 'h:mm a')} - {format(selectedEvent.end, 'h:mm a')}
                  </p>
                  <p className="text-sm text-slate-400">Duration</p>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 mt-0.5 text-blue-500" />
                  <div>
                    <p className="font-medium text-white">{selectedEvent.location}</p>
                    <p className="text-sm text-slate-400">Location</p>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div className="flex items-start gap-3 text-slate-300">
                  <AlignLeft className="w-5 h-5 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm leading-relaxed text-slate-300">{selectedEvent.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => removeEvent(selectedEvent.id)}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium py-3 rounded-xl transition-colors"
            >
              <Trash2 size={18} />
              Delete Event
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};