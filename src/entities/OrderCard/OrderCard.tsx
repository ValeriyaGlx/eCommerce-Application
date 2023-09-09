import React, { FC } from 'react';

import './_OrderCard.scss';
import Button from '../../shared/components/Button/Button';
import OrderCounter from '../../shared/OrderCounter/OrderCounter';

interface OrderCardProps {
  id: string;
  name: string;
  image: string;
  discount?: string;
  price: string;
}

const OrderCard: FC<OrderCardProps> = ({
  id,
  name,
  image,
  discount,
  price,
}) => {
  console.log(id);

  return (
    <div>
      <div className={'order-card_separator'} />
      <div className={'order_card-container'}>
        <img src={image} alt={'img'} />
        <div className={'order_card-description'}>
          <div className={'order_inner'}>
            <h5>{name}</h5>
            <Button
              className={'delete-from-cart'}
              data={''}
              onClick={() => {}}
            />
          </div>
          <div className={'order_amounts'}>
            <div className={'order_amounts-numberof'}>
              <span>`1 x ${discount ? discount : price}`</span>
              <OrderCounter initialValue={1} />
            </div>
            <div className={'order_amounts-prices'}>
              {discount ? (
                <div className={'wrapper-prices'}>
                  <span className={'new-price'}>${discount}</span>
                  <span className={'old-price'}>${price}</span>
                </div>
              ) : (
                <span className={'price'}>${price}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={'order-card_separator'} />
    </div>
  );
};

export default OrderCard;
