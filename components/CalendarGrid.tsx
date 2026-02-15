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

interface CalendarGridProps {
  onDateClick: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ onDateClick }) => {
  const { currentDate, events, setSelectedEvent } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Staggered animation for grid cells
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.02,
        delayChildren: 0.05
      } 
    },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: "spring", stiffness: 400, damping: 30 }
    }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative ring-1 ring-white/5">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-white/5 bg-slate-900/60 z-10 flex-shrink-0">
        {weekDays.map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
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
                  onClick={() => onDateClick(day)}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  className={clsx(
                    "relative border-b border-r border-white/5 p-2 transition-colors cursor-pointer group flex flex-col gap-1.5 min-h-0",
                    !isCurrentMonth && "bg-slate-950/40 opacity-50 text-slate-600",
                    isCurrentMonth && "text-slate-300"
                  )}
                >
                  <div className="flex justify-between items-start shrink-0 px-1">
                    <span className={clsx(
                      "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300",
                      isDayToday 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105" 
                        : "group-hover:text-white"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                        <span className="text-[10px] text-blue-200 font-medium bg-blue-500/20 px-1.5 py-0.5 rounded-full border border-blue-500/30">
                            {dayEvents.length}
                        </span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar px-1 pb-1">
                    {dayEvents.map(event => (
                      <motion.button
                        layoutId={event.id}
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className={clsx(
                          "w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium truncate transition-all duration-200",
                          event.color,
                          "hover:brightness-110 hover:translate-x-1 hover:shadow-lg text-white shadow-sm ring-1 ring-black/5"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/90 flex-shrink-0 shadow-sm" />
                            <span className="truncate opacity-95">{event.title}</span>
                         </div>
                      </motion.button>
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