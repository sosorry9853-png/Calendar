import React, { useState } from 'react';
import { CalendarProvider, useCalendar } from './contexts/CalendarContext';
import { CalendarGrid } from './components/CalendarGrid';
import { EventDetails } from './components/EventDetails';
import { EventModal } from './components/EventModal';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

const MainLayout: React.FC = () => {
  const { currentDate, setCurrentDate } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const jumpToToday = () => setCurrentDate(new Date());

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0f172a] text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <CalendarIcon className="text-white w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Calendar
                </h1>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
                <button onClick={prevMonth} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                    <ChevronLeft size={20} />
                </button>
                <div className="w-32 text-center font-semibold text-lg">
                    {format(currentDate, 'MMMM yyyy')}
                </div>
                <button onClick={nextMonth} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                    <ChevronRight size={20} />
                </button>
            </div>
            
            <button 
                onClick={jumpToToday}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-slate-800 rounded-lg"
            >
                Today
            </button>
        </div>

        <div className="flex items-center gap-4">
             {/* Simple search placeholder */}
             <div className="relative hidden md:block group">
                <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                />
             </div>

             <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 hover:scale-105"
            >
                <Plus size={20} />
                <span>New Event</span>
             </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-hidden relative">
         <CalendarGrid />
         <EventDetails />
         <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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