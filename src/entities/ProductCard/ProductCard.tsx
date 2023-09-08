import React from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import cart from '../../assets/icons/shopping-cart-fill.svg';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';
import Like from '../../shared/components/Like/Like';
import { store } from '../../app/store/store';
import getCookie from '../../shared/cookie/getCookie';
import { tokenAnonRequest } from '../../features/formSubmitSignIn/usage/ApiAuthorization';
import { addProductToCart, createCart } from '../ApiCart/ApiCart';
import setToken from '../../shared/cookie/setToken';
import { addProduct } from '../../app/store/actions/cartSliceAction/cartSliceAction';

import './_ProductCard.scss';

interface ProductCardProps {
  key: number;
  path: string;
  imageUrl: string;
  productName: string;
  description: string;
  price: string;
  discount?: string;
  difficulty: string;
  duration: number;
  productId: string;
}

type RootState = ReturnType<typeof store.getState>;

const ProductCard: React.FC<ProductCardProps> = ({
  path,
  imageUrl,
  productName,
  description,
  price,
  discount,
  difficulty,
  duration,
  productId,
}) => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useSelector((state: RootState) => state.cart.productsInCart);

  function clickCard(event: React.MouseEvent) {
    const currentTarget = event.target as HTMLElement;
    if (currentTarget.parentElement?.className !== 'icon-cart') {
      navigate(`/products/product/${path}`);
    }
  }

  async function clickCart(event: React.MouseEvent) {
    const isAuth = store.getState().authorization.isAuthorization;
    const isCart = getCookie('cartId');
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('shopping-img-cart')) {
      const button = target.closest('button') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
      }
    } else if (target.classList.contains('icon-cart')) {
      target.disabled = true;
    }
    dispatch(addProduct({ productId }));
    if (!isAuth && !isCart) {
      const anonTokenObj = await tokenAnonRequest();
      const anonToken = anonTokenObj.access_token;
      setToken('anonToken', anonToken);
      await createCart(anonToken);
      const a = await addProductToCart(anonToken, productId);
      console.log(a);
    } else if (!isAuth && isCart) {
      const token = getCookie('anonToken') as string;
      const a = await addProductToCart(token, productId);
      console.log(a);
    } else if (isAuth && isCart) {
      const token = getCookie('authToken') as string;
      const a = await addProductToCart(token, productId);
      console.log(a);
    } else {
      const token = getCookie('authToken') as string;
      await createCart(token);
      const a = await addProductToCart(token, productId);
      console.log(a);
    }
  }

  return (
    <div className='product-card' onClick={clickCard}>
      <img src={imageUrl} alt={productName} className={'product-card-img'} />
      <div className='hover-content'>
        <ButtonWithRoute
          className={'button-link'}
          path={`/products/product/${path}`}
          data={'More detailed'}
        />
        <ShoppingCartButton
          productId={productId}
          className={'icon-cart'}
          src={cart}
          onClick={(event) => clickCart(event)}
        />
      </div>
      <h3>{productName}</h3>
      <div className={'product-card-attrs-container'}>
        <span>{duration} weeks</span>
        <span
          className={`product-card-icon-difficulty icon-difficulty-${difficulty}`}
        ></span>
      </div>
      <p>{description}</p>
      <div className={'product-card-container'}>
        {discount ? (
          <div className={'wrapper-prices'}>
            <span className={'new-price'}>${discount}</span>
            <span className={'old-price'}>${price}</span>
          </div>
        ) : (
          <span className={'price'}>${price}</span>
        )}
        <Like />
      </div>
    </div>
  );
};

export default ProductCard;
