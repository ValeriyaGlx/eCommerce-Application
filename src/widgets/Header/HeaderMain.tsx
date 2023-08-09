import React from 'react';

import logo from '../../assets/icons/logo.svg';
import iconCart from '../../assets/icons/icon-cart.svg';
import './Header.css';
import { Categories } from '../../entities/Categories/Categories';
import { CartButton } from '../../entities/CartButton/CartButton';
import { SignInButton } from '../../entities/SignInButton/SignInButton';
import { SignUpButton } from '../../entities/SignUpButton/SignUpButton';

export function HeaderMain() {
  return (
    <header className='header'>
      <div className='header-logo'>
        <img src={logo} className='logo-img' alt='logo' />
        <h1 className='logo-title'>DigiSet</h1>
      </div>
      <Categories />
      <div className='wrapper-button'>
        <CartButton src={iconCart} alt='cartButton' />
        <SignInButton />
        <SignUpButton />
      </div>
    </header>
  );
}
