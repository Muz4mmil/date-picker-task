'use client'

import { useRecurrenceStore } from '@/store/store';
import { useState, useEffect } from 'react';

export default function CalendarPreview() {
  const { recurrence, interval, selectedWeekdays, startDate, endDate } = useRecurrenceStore();
  const [previewDates, setPreviewDates] = useState<Date[]>([]);

  useEffect(() => {
    generatePreviewDates();
  }, [recurrence, interval, selectedWeekdays, startDate, endDate]);

  const generatePreviewDates = () => {
    if (!startDate) return; // Start date is required

    let dates: Date[] = [];
    let currentDate = new Date(startDate);

    // Loop until the end date is reached, or we've generated a maximum of 12 preview dates
    while ((!endDate || currentDate <= endDate) && dates.length <= 12) {
      switch (recurrence) {
        case 'daily':
          dates.push(new Date(currentDate)); // Push a copy of the current date
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + interval); // Move to the next date based on the interval
          break;

        case 'weekly':
          if (selectedWeekdays.length > 0) {
            for (const day of selectedWeekdays) {
              const nextDay = getNextWeekday(currentDate, day);
              if (!endDate || nextDay <= endDate) {
                dates.push(nextDay);
              }
            }
          } else {
            dates.push(new Date(currentDate));
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + 7 * interval);
          }
          break;

        case 'monthly':
          dates.push(new Date(currentDate));
          currentDate = new Date(currentDate);
          currentDate.setMonth(currentDate.getMonth() + interval);
          break;

        case 'yearly':
          dates.push(new Date(currentDate));
          currentDate = new Date(currentDate);
          currentDate.setFullYear(currentDate.getFullYear() + interval);
          break;

        default:
          break;
      }
    }

    setPreviewDates(dates);
  };

  // Helper function to calculate the next weekday
  const getNextWeekday = (baseDate: Date, targetDay: number): Date => {
    const resultDate = new Date(baseDate);
    const currentDay = resultDate.getDay();
    const daysToAdd = (targetDay - currentDay + 7) % 7;
    resultDate.setDate(resultDate.getDate() + daysToAdd);
    return resultDate;
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">Preview</h3>
      <div className="grid grid-cols-4 gap-2">
        {previewDates.map((date, idx) => (
          <div key={idx} className="p-2 border rounded text-center">
            {date.toDateString()}
          </div>
        ))}
      </div>
    </div>
  );
}
