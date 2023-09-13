import React, { FC, useState } from 'react';
import './_OrderCounter.scss';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getNumberOfProductToCart } from '../../entities/ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';
import { store } from '../../app/store/store';

interface OrderCounterProps {
  initialValue: number;
  productId: string;
  id: string;
  changeQuantity: (id: string, quantity: number) => void;
}

type RootState = ReturnType<typeof store.getState>;

const OrderCounter: FC<OrderCounterProps> = ({
  initialValue,
  id,
  changeQuantity,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [quantity, setQuantity] = useState(initialValue);
  const [isGetQuery, setIsGetQuery] = useState(false);

  const incrementQuantity = async () => {
    if (quantity < 100) {
      setIsGetQuery(true);
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      await changeQuantity(id, newQuantity);
      setIsGetQuery(false);
      const number = await getNumberOfProductToCart();
      dispatch(setNumberOfProductToCart(number));
    }
  };

  const decrementQuantity = async () => {
    if (quantity > 1) {
      setIsGetQuery(true);
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await changeQuantity(id, newQuantity);
      setIsGetQuery(false);
      const number = await getNumberOfProductToCart();
      dispatch(setNumberOfProductToCart(number));
    }
  };

  return (
    <div className={'quantity-counter'}>
      <button onClick={decrementQuantity} disabled={isGetQuery}>
        -
      </button>
      <div>{quantity}</div>
      <button onClick={incrementQuantity} disabled={isGetQuery}>
        +
      </button>
    </div>
  );
};

export default OrderCounter;
