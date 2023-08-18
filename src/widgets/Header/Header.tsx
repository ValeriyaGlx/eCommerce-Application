import React, { useEffect, useState } from 'react';

import iconCart from '../../assets/icons/icon-cart.svg';
import iconHeart from '../../assets/icons/icon-heart.svg';
import './_Header.scss';
import { CartButton } from '../../shared/components/CartButton/CartButton';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import Logo from '../../shared/Logo/Logo';
import SelectTag from '../../shared/components/SelectTag/SelectTag';
import { SELECT_CATEGORIES_DATA as categoriesArray } from '../../constants/headerConstants/headerConstants';
import arrow from '../../assets/icons/arrow-down-caategories.png';
import logo from '../../assets/icons/categories-logo.png';
import { store } from '../../app/store/store';
import Button from '../../shared/components/Button/Button';
import { logOut } from '../../app/store/authorizationAction/authorizationSlice';
import deleteToken from '../../shared/cookie/deleteToken';

export function Header() {
  const isAuthorization = store.getState().authorization.isAuthorization;
  const name = localStorage.getItem('firstName');

  const [isLogOut, setIsLogOut] = useState(false);

  function setLogOut() {
    setIsLogOut(true);
    deleteToken('token');
    localStorage.removeItem('firstName');
  }

  useEffect(() => {
    if (isLogOut) {
      store.dispatch(logOut());
    }
  }, [isLogOut]);

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
        {isAuthorization && !isLogOut && (
          <>
            <CartButton src={iconHeart} alt='favoriets' />
            <ButtonWithRoute
              className={'button-profile'}
              path={'/signIn'}
              data={name ? `Hello, ${name}` : 'Your profile'}
            />
          </>
        )}
        {(!isAuthorization || isLogOut) && (
          <>
            <ButtonWithRoute
              className={'button-signIn button-signIn__addition'}
              path={'/signIn'}
              data={'Sign in'}
            />
            <ButtonWithRoute
              className={'button-signUp button-signUp__addition'}
              path={'/singUp'}
              data={'Sign up'}
            />
          </>
        )}
        {isAuthorization && !isLogOut && (
          <>
            <Button
              className={'button-logOut'}
              data={'Log out'}
              onClick={setLogOut}
            />
          </>
        )}
      </div>
    </header>
  );
}
