import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './_ButtonWithRoute.scss';

interface ButtonProps {
  className: string;
  path: string;
  data: string;
}

const ButtonWithRoute: FC<ButtonProps> = ({ className, path, data }) => {
  return (
    <Link className={className} to={path}>
      {data}
    </Link>
  );
};

export default ButtonWithRoute;
