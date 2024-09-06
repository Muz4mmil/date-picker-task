'use client'
import { create } from 'zustand';

type Recurrence = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  recurrence: Recurrence;
  interval: number;
  daysOfWeek: number[];
  startDate: Date;
  endDate: Date | null;
  setRecurrence: (recurrence: Recurrence) => void;
  setInterval: (interval: number) => void;
  setDaysOfWeek: (days: number[]) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
}

export const useStore = create<RecurrenceState>((set) => ({
  recurrence: 'daily',
  interval: 1,
  daysOfWeek: [],
  startDate: new Date(),
  endDate: null,
  setRecurrence: (recurrence) => set({ recurrence }),
  setInterval: (interval) => set({ interval }),
  setDaysOfWeek: (days) => set({ daysOfWeek: days }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
