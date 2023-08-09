import { FC } from 'react';

interface InputCheckboxProps {
  id: string;
  isChecked: boolean;
  data: string;
}

const InputCheckbox: FC<InputCheckboxProps> = ({ id, isChecked, data }) => {
  return (
    <div>
      <input type='checkbox' id={id} name={id} checked />
      <label htmlFor={id}>{data}</label>
    </div>
  );
};

export default InputCheckbox;
