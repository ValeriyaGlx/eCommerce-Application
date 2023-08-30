import React, { useState } from 'react';

import './_InputRadio.scss';
import tick from '../../../assets/icons/check-icn.svg';

interface RadioInputProps {
  options: { label: string; value: string; key: number }[];
  onChange: (selectedValue: string) => void;
  className: string;
}

export const InputRadio: React.FC<RadioInputProps> = ({
  options,
  onChange,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.key} className={'wrapper-input_radio'}>
          <input
            id={option.value}
            type='radio'
            name='radioInput'
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
          />

          <label htmlFor={option.value} key={option.value}>
            <span>
              <img src={tick} alt='Checked Icon' />
            </span>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
