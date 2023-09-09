import React from 'react';

import PromocodeInfo from '../../shared/components/PromocodeInfo/PromocodeInfo';
import OrderSummary from '../../features/OrderSummary/OrderSummary';

const CartSummary = () => {
  return (
    <section>
      <OrderSummary />
      <PromocodeInfo />
    </section>
  );
};

export default CartSummary;
