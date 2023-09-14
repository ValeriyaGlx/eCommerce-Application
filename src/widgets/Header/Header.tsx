import React, { useEffect, useState } from 'react';
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
import { openMenu } from '../../shared/burgerMenuUsage/burgerMenuUsage';
import { deleteCart } from '../../entities/ApiCart/ApiCart';
import getCookie from '../../shared/cookie/getCookie';
import { getNumberOfProductToCart } from '../../entities/ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';

import about from './../../assets/icons/information.svg';

type RootState = ReturnType<typeof store.getState>;

export function Header() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const [isLogOut, setIsLogOut] = useState(false);
  const isAuthorization = useSelector(
    (state: RootState) => state.authorization.isAuthorization,
  );
  const numberOfProductToCart = useSelector(
    (state: RootState) => state.cart.numberOfProductToCart,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cart = getCookie('cartId');
        if (cart) {
          const number = await getNumberOfProductToCart();
          if (number) {
            dispatch(setNumberOfProductToCart(number));
          } else {
            dispatch(setNumberOfProductToCart(0));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  async function setLogOut() {
    setIsLogOut(true);
    const token = getCookie('authToken') as string;
    await deleteCart(token);
    deleteToken('authToken');
    deleteToken('cartId');
    localStorage.removeItem('firstName');
    const number = await getNumberOfProductToCart();
    if (number) {
      dispatch(setNumberOfProductToCart(number));
    } else {
      dispatch(setNumberOfProductToCart(0));
    }
    dispatch(logOut());
    navigate('/');
  }

  return (
    <header className='header'>
      <Logo className={'logo-title-black'} />

      <div className='menu_icon' onClick={openMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className='background-menu'></div>

      <nav className='menu'>
        <div className={'menu_list wrapper-button'}>
          <ButtonWithRoute
            className={'all-products'}
            path={'/products'}
            data={'All Products'}
          />
          <CartButton
            src={iconCart}
            alt='cartButton'
            to={'/cart'}
            number={`${numberOfProductToCart}`}
          />
          <CartButton
            src={iconHeart}
            alt='favoriets'
            to={'/favorites'}
            number={'0'}
          />
          <UserButton src={about} alt={'about'} to={'/about'} />
          {isAuthorization && !isLogOut && (
            <>
              <UserButton src={iconProfile} alt={'profile'} to={'/profile'} />
            </>
          )}
          {isAuthorization === false && (
            <>
              <ButtonWithRoute
                className={'button-signIn button-signIn__addition'}
                path={'/signIn'}
                data={'Sign In'}
              />
              <ButtonWithRoute
                className={'button-signUp button-signUp__addition'}
                path={'/signUp'}
                data={'Sign Up'}
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
      </nav>
    </header>
  );
}
