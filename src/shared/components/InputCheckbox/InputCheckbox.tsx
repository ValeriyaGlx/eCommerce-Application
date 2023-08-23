import React, { FC } from 'react';

interface InputCheckboxProps {
  id: string;
  data: string;
  className: string;
  onChange: () => void;
  checked: boolean;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  id,
  data,
  className,
  onChange,
  checked,
}) => {
  return (
    <div className={className}>
      <input
        type='checkbox'
        id={id}
        name={id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{data}</label>
    </div>
  );
};

export default InputCheckbox;
