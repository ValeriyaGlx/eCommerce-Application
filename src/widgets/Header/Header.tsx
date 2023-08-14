import React from 'react';

import iconCart from '../../assets/icons/icon-cart.svg';
import './_Header.scss';
import { CartButton } from '../../shared/components/CartButton/CartButton';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import Logo from '../../shared/Logo/Logo';
import SelectTag from '../../shared/components/SelectTag/SelectTag';
import { SELECT_CATEGORIES_DATA as categoriesArray } from '../../constants/headerConstants/headerConstants';
import arrow from '../../assets/icons/arrow-down-caategories.png';
import logo from '../../assets/icons/categories-logo.png';

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
        arrow={arrow}
        logo={logo}
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
