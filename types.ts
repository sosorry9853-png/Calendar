export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color: string;
  location?: string;
}

export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export enum ViewMode {
  Month = 'month',
  Week = 'week',
  Day = 'day'
}

export type AudioStatus = 'disconnected' | 'connecting' | 'connected' | 'speaking';