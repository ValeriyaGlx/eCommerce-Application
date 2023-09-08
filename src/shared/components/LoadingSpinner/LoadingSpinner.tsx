import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './_LoadingSpiner.scss';

export const LoadingSpinner = () => {
  return (
    <div className='loading-spinner '>
      <FaSpinner className='spinner' />
    </div>
  );
};
