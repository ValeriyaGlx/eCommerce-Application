import { Link } from 'react-router-dom';
import React, { FC } from 'react';

import './_UserButton.scss';

interface UserButtonProps {
  src: string;
  alt: string;
  to: string;
}

const UserButton: FC<UserButtonProps> = ({ to, src, alt }) => {
  return (
    <Link to={to} className={'button-profile'}>
      <img className='img-profile' src={src} alt={alt} />
    </Link>
  );
};

export default UserButton;
