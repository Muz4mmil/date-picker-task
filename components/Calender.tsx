'use client'

import React from 'react';
import { useStore } from '@/store/store';
import { addDays, addWeeks, addMonths, addYears, format } from 'date-fns';

const Calender = () => {
  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const recurrence = useStore((state) => state.recurrence);
  const interval = useStore((state) => state.interval);
  const daysOfWeek = useStore((state) => state.daysOfWeek);

  const generateRecurringDates = (): Date[] => {
    let dates: Date[] = [];
    let currentDate = startDate;
    let maxIterations = 50;

    while (currentDate <= (endDate || addYears(startDate, 1)) && maxIterations > 0) {
      if (recurrence === 'daily') {
        dates.push(currentDate);
        currentDate = addDays(currentDate, interval);
      } else if (recurrence === 'weekly') {
        if (daysOfWeek.includes(currentDate.getDay())) {
          dates.push(currentDate);
        }
        currentDate = addDays(currentDate, 1);
      } else if (recurrence === 'monthly') {
        dates.push(currentDate);
        currentDate = addMonths(currentDate, interval);
      } else if (recurrence === 'yearly') {
        dates.push(currentDate);
        currentDate = addYears(currentDate, interval);
      }
      maxIterations--;
    }
    return dates;
  };

  const dates = generateRecurringDates();

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-2 text-sm">Preview</h3>
      <div className="grid grid-cols-3 gap-2">
        {dates.map((date, idx) => (
          <span key={idx} className="block text-sm text-gray-700 border bg-slate-50 rounded py-0.5 px-2">{format(date, 'MMM dd, yyyy')}</span>
        ))}
      </div>
    </div>
  );
};

export default Calender;
