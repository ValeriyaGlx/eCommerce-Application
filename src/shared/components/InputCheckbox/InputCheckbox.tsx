import React, { FC } from 'react';

import './_InputChackbox.scss';

interface InputCheckboxProps {
  id: string;
  data: string;
  className: string;
  onChange: () => void;
  checked: boolean;
  disabled?: boolean;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  id,
  data,
  className,
  onChange,
  checked,
  disabled,
}) => {
  return (
    <div className={className}>
      <input
        type='checkbox'
        id={id}
        name={id}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id}>{data}</label>
    </div>
  );
};

export default InputCheckbox;
