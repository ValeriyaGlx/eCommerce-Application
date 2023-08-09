import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithRoute.css';

interface ButtonProps {
  className: string;
  path: string;
  data: string;
}

const ButtonWithRoute: FC<ButtonProps> = ({ className, path, data }) => {
  return (
    <div className={className}>
      <Link to={path}>{data}</Link>
    </div>
  );
};

export default ButtonWithRoute;
