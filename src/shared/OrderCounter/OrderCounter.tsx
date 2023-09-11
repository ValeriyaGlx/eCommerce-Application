import React, { FC, useState } from 'react';

import './_OrderCounter.scss';

interface OrderCounterProps {
  initialValue: number;
  productId: string;
  id: string;
  changeQuantity: (id: string, quantity: number) => void;
}

const OrderCounter: FC<OrderCounterProps> = ({
  initialValue,
  id,
  changeQuantity,
}) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [isGetQuery, setIsGetQuery] = useState(false);

  const incrementQuantity = async () => {
    if (quantity < 100) {
      setIsGetQuery(true);
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      await changeQuantity(id, newQuantity);
      setIsGetQuery(false);
    }
  };

  const decrementQuantity = async () => {
    if (quantity > 1) {
      setIsGetQuery(true);
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await changeQuantity(id, newQuantity);
      setIsGetQuery(false);
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
