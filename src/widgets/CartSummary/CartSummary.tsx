import React, { FC } from 'react';

import PromocodeInfo from '../../shared/components/PromocodeInfo/PromocodeInfo';
import OrderSummary from '../../features/OrderSummary/OrderSummary';

interface CartSummaryProps {
  total: string;
}

const CartSummary: FC<CartSummaryProps> = ({ total }) => {
  return (
    <section>
      <OrderSummary total={total} />
      <PromocodeInfo />
    </section>
  );
};

export default CartSummary;
