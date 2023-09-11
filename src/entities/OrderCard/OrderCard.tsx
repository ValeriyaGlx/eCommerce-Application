import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './_OrderCard.scss';
import Button from '../../shared/components/Button/Button';
import OrderCounter from '../../shared/OrderCounter/OrderCounter';

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
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteClick = async () => {
    setIsVisible(false);
    await getGoods(id);
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
