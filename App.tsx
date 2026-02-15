import React, { useState } from 'react';
import { CalendarProvider, useCalendar } from './contexts/CalendarContext';
import { CalendarGrid } from './components/CalendarGrid';
import { EventDetails } from './components/EventDetails';
import { EventModal } from './components/EventModal';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  const { currentDate, setCurrentDate } = useCalendar();
  const [modalState, setModalState] = useState<{ isOpen: boolean; date?: Date }>({ isOpen: false });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const jumpToToday = () => setCurrentDate(new Date());

  const handleOpenModal = (date?: Date) => {
    setModalState({ isOpen: true, date });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, date: undefined });
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0f172a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/60">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 ring-1 ring-white/10">
                    <CalendarIcon className="text-white w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                    Calendar
                </h1>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/40 rounded-xl p-1 border border-slate-700/50 backdrop-blur-sm">
                <button onClick={prevMonth} className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-slate-400 hover:text-white">
                    <ChevronLeft size={18} />
                </button>
                <div className="w-36 text-center font-semibold text-sm tracking-wide">
                    {format(currentDate, 'MMMM yyyy')}
                </div>
                <button onClick={nextMonth} className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-slate-400 hover:text-white">
                    <ChevronRight size={18} />
                </button>
            </div>
            
            <button 
                onClick={jumpToToday}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-slate-800/50 rounded-lg border border-transparent hover:border-slate-700/50"
            >
                Today
            </button>
        </div>

        <div className="flex items-center gap-4">
             <div className="relative hidden md:block group">
                <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-64 transition-all placeholder:text-slate-600 text-slate-300"
                />
             </div>

             <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/30 hover:scale-[1.02] hover:shadow-blue-900/40 active:scale-95 ring-1 ring-white/10"
            >
                <Plus size={18} />
                <span>New Event</span>
             </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 p-6 overflow-hidden flex flex-col">
         <CalendarGrid onDateClick={handleOpenModal} />
         <EventDetails />
         <AnimatePresence>
            {modalState.isOpen && (
                <EventModal 
                  isOpen={modalState.isOpen} 
                  onClose={handleCloseModal}
                  preselectedDate={modalState.date}
                />
            )}
         </AnimatePresence>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CalendarProvider>
      <MainLayout />
    </CalendarProvider>
  );
};

export default App;