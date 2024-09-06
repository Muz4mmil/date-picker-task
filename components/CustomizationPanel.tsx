'use client'
import React from 'react';
import { useStore } from '@/store/store';

const CustomizationPanel = () => {
  const recurrence = useStore((state) => state.recurrence);
  const interval = useStore((state) => state.interval);
  const setInterval = useStore((state) => state.setInterval);
  const daysOfWeek = useStore((state) => state.daysOfWeek);
  const setDaysOfWeek = useStore((state) => state.setDaysOfWeek);

  const toggleDayOfWeek = (day: number) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  return (
    <div className="my-4">
      <label className="block text-sm mb-1">Every</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="w-16 p-2 border rounded"
        />

        <p>Days</p>
      </div>
      {recurrence === 'weekly' && (
        <div className="mt-4">
          <label className="block text-sm">Select Days of the Week:</label>
          <div className="flex space-x-2 mt-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                key={day}
                onClick={() => toggleDayOfWeek(index)}
                className={`px-2 py-1 ${daysOfWeek.includes(index) ? 'bg-blue-600 text-white' : 'border text-black'} rounded`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;
