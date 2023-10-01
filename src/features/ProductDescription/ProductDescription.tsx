import React, { FC, useEffect, useState } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import './_ProductDescription.scss';
import Like from '../../shared/components/Like/Like';
import {
  addProductToCart,
  findIdByProductId,
  idOfProductToCart,
  removeProductFromCart,
} from '../../entities/ApiCart/addProductToCart';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';
import getCookie from '../../shared/cookie/getCookie';
import { getCartById } from '../../entities/ApiCart/ApiCart';
import { getNumberOfProductToCart } from '../../entities/ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';
import { store } from '../../app/store/store';

interface ProductDescriptionProps {
  inner: string;
  description: string;
  discount: string;
  price: string;
  difficulty: string;
  duration: number;
  productId: string;
}

type RootState = ReturnType<typeof store.getState>;

const ProductDescription: FC<ProductDescriptionProps> = ({
  inner,
  description,
  discount,
  price,
  difficulty,
  duration,
  productId,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState('');

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

  async function addCart(event: React.MouseEvent) {
    setIsAnimating(true);
    await addProductToCart(event, productId);
    setIsButtonDisabled(true);
    setTimeout(() => setIsAnimating(false), 300);
    const number = await getNumberOfProductToCart();
    dispatch(setNumberOfProductToCart(number));
  }

  async function removeFromCart() {
    setIsAnimating(true);
    const cart = getCookie('cartId') as string;
    const anonToken = getCookie('anonToken') as string;
    const authToken = getCookie('authToken') as string;
    let obj;
    if (anonToken) {
      obj = await getCartById(cart, anonToken);
    }
    if (authToken) {
      obj = await getCartById(cart, authToken);
    }
    const idLineItem = findIdByProductId(obj.lineItems, productId) as string;
    await removeProductFromCart(idLineItem);
    setIsButtonDisabled(false);
    setMessage('Item removed successfully');
    setTimeout(() => setIsAnimating(false), 300);
    setTimeout(() => setMessage(''), 1000);
    const number = await getNumberOfProductToCart();
    if (number) {
      dispatch(setNumberOfProductToCart(number));
    } else {
      dispatch(setNumberOfProductToCart(0));
    }
  }

  return (
    <div className={'product-description'}>
      <div>
        <h2>{inner}</h2>
        <div className={'attrs-container'}>
          <span>{duration} weeks</span>
          <span
            className={`icon-difficulty icon-difficulty-${difficulty}`}
          ></span>
        </div>

        <p>{description}</p>
      </div>
      <div>
        <div className={'price-container'}>
          <div>
            {discount ? (
              <div className={'wrapper-prices'}>
                <span className={'new-price'}>${discount}</span>
                <span className={'old-price'}>${price}</span>
              </div>
            ) : (
              <span className={'price'}>${price}</span>
            )}
          </div>
          <Like />
        </div>
        {!isButtonDisabled ? (
          <ShoppingCartButton
            isDisabled={isButtonDisabled}
            className={`buy-now-button ${isAnimating ? 'change' : ''}`}
            data={'Buy Now'}
            onClick={(event) => addCart(event)}
            message={message}
          />
        ) : (
          <ShoppingCartButton
            isDisabled={false}
            className={`remove-button ${isAnimating ? 'change' : ''}`}
            data={'Remove from Cart'}
            onClick={removeFromCart}
            message={message}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
