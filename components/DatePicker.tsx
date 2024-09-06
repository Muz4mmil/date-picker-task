'use client'

import React from 'react';
import { useStore } from '@/store/store';
import { format } from 'date-fns';

const DatePickerInput = () => {
  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const setStartDate = useStore((state) => state.setStartDate);
  const setEndDate = useStore((state) => state.setEndDate);

  return (
    <div className="flex space-x-4 items-center">
      <div className="">
        <label className='block text-sm'>From</label>
        <input
          type="date"
          value={format(startDate, 'yyyy-MM-dd')}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="p-2 border rounded"
        />
      </div>

      <p>_</p>

      <div className="">
        <label className='block text-sm'>To</label>
        <input
          type="date"
          value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
          className="p-2 border rounded"
          placeholder="End Date (optional)"
        />
      </div>
    </div>
  );
};

export default DatePickerInput;

