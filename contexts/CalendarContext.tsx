import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalendarEvent, ViewMode } from '../types';
import { addHours, startOfToday, parseISO } from 'date-fns';

interface CalendarContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  removeEvent: (id: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    // Initial dummy data
    const today = startOfToday();
    return [
      {
        id: '1',
        title: 'Team Sync',
        start: addHours(today, 10),
        end: addHours(today, 11),
        description: 'Weekly sync with the design team.',
        color: 'bg-blue-500',
        location: 'Conference Room A'
      },
      {
        id: '2',
        title: 'Lunch with Sarah',
        start: addHours(today, 13),
        end: addHours(today, 14),
        description: 'Discussing the new project roadmap.',
        color: 'bg-green-500',
        location: 'Downtown Cafe'
      },
       {
        id: '3',
        title: 'Project Deadline',
        start: addHours(today, 17),
        end: addHours(today, 18),
        description: 'Final submission for the Q3 report.',
        color: 'bg-red-500',
        location: 'Remote'
      }
    ];
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const addEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      color: newEvent.color || 'bg-indigo-500' // Default color
    };
    setEvents(prev => [...prev, event]);
  };

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  return (
    <CalendarContext.Provider value={{
      events,
      addEvent,
      removeEvent,
      currentDate,
      setCurrentDate,
      viewMode,
      setViewMode,
      selectedEvent,
      setSelectedEvent
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};