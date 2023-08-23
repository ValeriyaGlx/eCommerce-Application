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
      <img className='img-profile' src={src} alt={alt} />
      <div className='span-profile'>{name}</div>
    </Link>
  );
};

export default UserButton;
