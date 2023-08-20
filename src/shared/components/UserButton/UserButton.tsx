import { Link } from 'react-router-dom';
import React, { FC } from 'react';

import './_UserButton.scss';

interface UserButtonProps {
  src: string;
  alt: string;
  to: string;
  name: string;
}

const UserButton: FC<UserButtonProps> = ({ to, src, alt, name }) => {
  return (
    <Link to={to} className={'button-profile'}>
      <span className='span-profile'>{name}</span>
      <img className='img-profile' src={src} alt={alt} />
    </Link>
  );
};

export default UserButton;
