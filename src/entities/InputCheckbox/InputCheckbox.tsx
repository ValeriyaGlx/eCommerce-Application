import React, { FC } from 'react';

interface InputCheckboxProps {
  id: string;
  data: string;
  className: string;
  onChange: () => void;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  id,
  data,
  className,
  onChange,
}) => {
  return (
    <div className={className}>
      <input type='checkbox' id={id} name={id} onChange={onChange} />
      <label htmlFor={id}>{data}</label>
    </div>
  );
};

export default InputCheckbox;
