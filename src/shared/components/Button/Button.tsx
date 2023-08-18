import React, { FC } from 'react';
import './_button.scss';

interface ButtonProps {
  className: string;
  data: string;
  onClick: () => void;
}

const ButtonWithRoute: FC<ButtonProps> = ({ className, data, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {data}
    </button>
  );
};

export default ButtonWithRoute;
