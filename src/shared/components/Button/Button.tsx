import React, { FC } from 'react';
import './_Button.scss';

interface ButtonProps {
  className: string;
  data: string;
  onClick?: () => void;
  role?: string;
}

const Button: FC<ButtonProps> = ({ className, data, onClick, role }) => {
  return (
    <button className={className} onClick={onClick} role={role}>
      {data}
    </button>
  );
};

export default Button;
