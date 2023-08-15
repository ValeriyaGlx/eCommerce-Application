import React, { FC } from 'react';
import './_button.scss';

interface ButtonProps {
  className: string;
  data: string;
}

const ButtonWithRoute: FC<ButtonProps> = ({ className, data }) => {
  return <button className={className}>{data}</button>;
};

export default ButtonWithRoute;
