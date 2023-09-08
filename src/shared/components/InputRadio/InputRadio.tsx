import React from 'react';

import './_InputRadio.scss';
import tick from '../../../assets/icons/check-icn.svg';

interface RadioInputProps {
  options: { label: string; value: string; key: number }[];
  selectedValue: string;
  onChange: (selectedValue: string) => void;
  className: string;
  name: string;
}

export const InputRadio: React.FC<RadioInputProps> = ({
  options,
  selectedValue,
  onChange,
  className,
  name,
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.key} className={'wrapper-input_radio'}>
          <input
            id={option.value}
            type='radio'
            name={name}
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
