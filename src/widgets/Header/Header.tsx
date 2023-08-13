import React from 'react';

import iconCart from '../../assets/icons/icon-cart.svg';
import './Header.scss';
import { CartButton } from '../../entities/CartButton/CartButton';
import ButtonWithRoute from '../../entities/ButtonWithRoute/ButtonWithRoute';
import Logo from '../../shared/Logo/Logo';
import SelectTag from '../../entities/SelectTag/SelectTag';
import { SELECT_CATEGORIES_DATA as categoriesArray } from '../../constants/headerConstants/headerConstants';

export function Header() {
  return (
    <header className='header'>
      <Logo className={'logo-title-black'} />
      <SelectTag
        selectArray={categoriesArray}
        className={'header-select'}
        value={'Categories'}
        inputName={'header-select-tag'}
        onClick={() => {
          console.log('here will be implement redux save logic');
        }}
      />
      <div className='wrapper-button'>
        <CartButton src={iconCart} alt='cartButton' />
        <ButtonWithRoute
          className={'button-signIn'}
          path={'/signIn'}
          data={'Sign in'}
        />
        <ButtonWithRoute
          className={'button-signUp'}
          path={'/singUp'}
          data={'Sign up'}
        />
      </div>
    </header>
  );
}
