import React, { FC, useState } from 'react';

import './_OrderCounter.scss';

interface OrderCounterProps {
  initialValue: number;
}

const OrderCounter: FC<OrderCounterProps> = ({ initialValue }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const incrementQuantity = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={'quantity-counter'}>
      <button onClick={decrementQuantity}>-</button>
      <div>{quantity}</div>
      <button onClick={incrementQuantity}>+</button>
    </div>
  );
};

export default OrderCounter;
