'use client'
import React from 'react';
import { useStore } from '@/store/store';

const RecurrenceOptions = () => {
  const setRecurrence = useStore((state) => state.setRecurrence);
  const recurrence = useStore((state) => state.recurrence);
  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="">
      <label htmlFor="" className='text-sm'>Recurrence:</label>
      <div className="flex space-x-2 mt-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setRecurrence(option.toLowerCase() as 'daily' | 'weekly' | 'monthly' | 'yearly')}
            className={`px-4 py-2 ${recurrence === option.toLowerCase() ? 'bg-blue-600 text-white' : 'border text-black'} rounded`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
