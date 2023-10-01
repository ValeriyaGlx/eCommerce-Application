import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';
import Like from '../../shared/components/Like/Like';
import './_ProductCard.scss';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner/LoadingSpinner';
import {
  addProductToCart,
  idOfProductToCart,
} from '../ApiCart/addProductToCart';
import getCookie from '../../shared/cookie/getCookie';
import { getNumberOfProductToCart } from '../ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';
import { store } from '../../app/store/store';

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
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartId = getCookie('cartId');
        if (cartId) {
          const idOfProducts = await idOfProductToCart();
          const isProductsToCart = idOfProducts.includes(productId);
          setIsButtonDisabled(isProductsToCart);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function clickCard(event: React.MouseEvent) {
    const currentTarget = event.target as HTMLElement;
    if (currentTarget.className !== 'icon-cart') {
      navigate(`/products/product/${path}`);
    }
  }

  async function clickCart(event: React.MouseEvent) {
    setIsLoading(true);
    await addProductToCart(event, productId);
    setIsLoading(false);
    setIsButtonDisabled(true);
    const number = await getNumberOfProductToCart();
    dispatch(setNumberOfProductToCart(number));
  }

  return (
    <div className='product-card' onClick={clickCard} role={'product-card'}>
      <img src={imageUrl} alt={productName} className={'product-card-img'} />
      <div className='hover-content'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ButtonWithRoute
              className={'button-link'}
              path={`/products/product/${path}`}
              data={'More detailed'}
            />
            <ShoppingCartButton
              isDisabled={isButtonDisabled}
              className={'icon-cart'}
              onClick={(event) => clickCart(event)}
            />
          </>
        )}
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
