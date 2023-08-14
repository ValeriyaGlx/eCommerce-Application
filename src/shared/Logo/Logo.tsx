import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import logoMain from '../../assets/icons/logo-main.svg';
import './Logo.scss';

interface LogoProps {
  logo?: typeof logoMain;
  className: string;
}

const Logo: FC<LogoProps> = ({ logo, className }) => {
  return (
    <Link className='header-logo' to={'/'}>
      <img src={logo ? logo : logoMain} className='logo-img' alt='logo' />
      <h4 className={className}>DigiSet</h4>
    </Link>
  );
};

export default Logo;
