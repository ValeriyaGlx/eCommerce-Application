import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import iconCart from '../../assets/icons/icon-cart.svg';
import iconHeart from '../../assets/icons/icon-heart.svg';
import iconProfile from '../../assets/icons/icon-user.svg';
import './_Header.scss';
import { CartButton } from '../../shared/components/CartButton/CartButton';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import Logo from '../../shared/Logo/Logo';
import { store } from '../../app/store/store';
import Button from '../../shared/components/Button/Button';
import { logOut } from '../../app/store/actions/authorizationAction/authorizationSlice';
import deleteToken from '../../shared/cookie/deleteToken';
import UserButton from '../../shared/components/UserButton/UserButton';

type RootState = ReturnType<typeof store.getState>;

export function Header() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const name = localStorage.getItem('firstName');

  const [isLogOut, setIsLogOut] = useState(false);
  const isAuthorization = useSelector(
    (state: RootState) => state.authorization.isAuthorization,
  );

  function setLogOut() {
    setIsLogOut(true);
    deleteToken('token');
    localStorage.removeItem('firstName');
    dispatch(logOut());
    navigate('/');
  }

  return (
    <header className='header'>
      <Logo className={'logo-title-black'} />

      <nav className='wrapper-button'>
        <CartButton src={iconCart} alt='cartButton' to={'/cart'} />
        <CartButton src={iconHeart} alt='favoriets' to={'/favorites'} />
        {isAuthorization && !isLogOut && (
          <>
            <UserButton
              //
              src={iconProfile}
              alt={'profile'}
              to={'/profile'}
              name={name ? `${name}` : 'Profile'}
            />
          </>
        )}
        {isAuthorization === false && (
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
      </nav>
    </header>
  );
}
