import React, { FC } from 'react';
import './_Button.scss';

interface ButtonProps {
  className: string;
  data: string;
  onClick?: (event: React.MouseEvent) => void;
  role?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  data,
  onClick,
  role,
  disabled,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      role={role}
      disabled={disabled}
    >
      {data}
    </button>
  );
};

export default Button;
