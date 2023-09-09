import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './_OrderCard.scss';
import Button from '../../shared/components/Button/Button';
import OrderCounter from '../../shared/OrderCounter/OrderCounter';
import { removeProductFromCart } from '../ApiCart/addProductToCart';

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
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteClick = async () => {
    setIsVisible(false);
    const res = await removeProductFromCart(id);
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
    </CSSTransition>
  );
};

export default OrderCard;
