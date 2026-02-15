import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendar } from '../contexts/CalendarContext';
import clsx from 'clsx';

export const CalendarGrid: React.FC = () => {
  const { currentDate, events, setSelectedEvent } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Generate days. ensure we cover the full grid.
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.02 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      transition: { duration: 0.2 } 
    }
  };

  const dayVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10 flex-shrink-0">
        {weekDays.map(day => (
          <div key={day} className="py-4 text-center text-sm font-semibold text-slate-400 tracking-wide uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid Container */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div 
             key={currentDate.toString()}
             variants={containerVariants}
             initial="hidden"
             animate="visible"
             exit="exit"
             className="absolute inset-0 grid grid-cols-7 grid-rows-6"
          >
            {calendarDays.map((day) => {
              const dayEvents = getDayEvents(day);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isDayToday = isToday(day);

              return (
                <motion.div
                  key={day.toString()}
                  variants={dayVariants}
                  className={clsx(
                    "relative border-b border-r border-slate-800/50 p-2 transition-all hover:bg-slate-800/30 group flex flex-col gap-1 min-h-0",
                    !isCurrentMonth && "bg-slate-900/30 text-slate-600",
                    isCurrentMonth && "text-slate-200"
                  )}
                  onClick={() => {
                      // Optional interaction
                  }}
                >
                  <div className="flex justify-between items-center mb-1 shrink-0">
                    <span className={clsx(
                      "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full transition-all",
                      isDayToday ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-110" : "text-slate-400"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                        <span className="text-[10px] text-slate-500 font-medium hidden lg:block bg-slate-800/50 px-1.5 py-0.5 rounded-full">
                            {dayEvents.length}
                        </span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className={clsx(
                          "w-full text-left px-2 py-1.5 rounded-md text-xs font-medium truncate transition-all transform hover:scale-[1.02] hover:shadow-lg hover:brightness-110",
                          event.color,
                          "text-white/95 shadow-sm"
                        )}
                      >
                         <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm flex-shrink-0" />
                            <span className="truncate">{event.title}</span>
                         </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};