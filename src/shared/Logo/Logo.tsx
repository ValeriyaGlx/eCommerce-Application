import React, { FC } from 'react';

import logoMain from '../../assets/icons/logo-main.svg';
import './Logo.scss';

interface LogoProps {
  logo?: typeof logoMain;
}

const Logo: FC<LogoProps> = ({ logo }) => {
  return (
    <div className='header-logo'>
      <img src={logo ? logo : logoMain} className='logo-img' alt='logo' />
      <h4 className='logo-title'>DigiSet</h4>
    </div>
  );
};

export default Logo;
