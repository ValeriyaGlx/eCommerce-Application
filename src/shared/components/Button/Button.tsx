import React, { FC } from 'react';
import './_Button.scss';

interface ButtonProps {
  className: string;
  data: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ className, data, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {data}
    </button>
  );
};

export default Button;
