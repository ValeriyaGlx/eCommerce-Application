import React, { FC, useState } from 'react';
import './_OrderCard.scss';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Button from '../../shared/components/Button/Button';
import OrderCounter from '../../shared/OrderCounter/OrderCounter';
import { getNumberOfProductToCart } from '../ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';
import { store } from '../../app/store/store';

interface OrderCardProps {
  id: string;
  name: string;
  image: string;
  discount?: string;
  price: string;
  total: string;
  quantity: number;
  productId: string;
  getGoods: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
}

type RootState = ReturnType<typeof store.getState>;

const OrderCard: FC<OrderCardProps> = ({
  id,
  name,
  image,
  discount,
  price,
  total,
  quantity,
  productId,
  getGoods,
  changeQuantity,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteClick = async () => {
    setIsVisible(false);
    await getGoods(id);
    const number = await getNumberOfProductToCart();
    if (number) {
      dispatch(setNumberOfProductToCart(number));
    } else {
      dispatch(setNumberOfProductToCart(0));
    }
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames='order-card'
      unmountOnExit
    >
      <div className={'order-card'}>
        <div className={'order-card_separator'} />
        <div className={'order_card-container'}>
          <img src={image} alt={'img'} />
          <div className={'order_card-description'}>
            <div className={'order_inner'}>
              <h5>{name}</h5>
              <Button
                className={'delete-from-cart'}
                data={''}
                onClick={handleDeleteClick}
              />
            </div>
            <div className={'order_amounts'}>
              <div className={'order_amounts-numberof'}>
                <div className={'single-price'}>
                  {discount ? (
                    <div className={'cart-with-discount'}>
                      <span className={'old-price'}>${price}</span>
                      <div>1 x ${discount}</div>
                    </div>
                  ) : (
                    <div>1 x ${price}</div>
                  )}
                </div>
                <OrderCounter
                  initialValue={quantity}
                  productId={productId}
                  id={id}
                  changeQuantity={changeQuantity}
                />
              </div>
              <div className={'order_amounts-prices'}>
                <span className={'price'}>${total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'order-card_separator'} />
      </div>
    </CSSTransition>
  );
};

export default OrderCard;
