import React, { FC } from 'react';

import PromocodeInfo from '../../shared/components/PromocodeInfo/PromocodeInfo';
import OrderSummary from '../../features/OrderSummary/OrderSummary';

interface CartSummaryProps {
  total: string;
  updatePricesWithCode: (value: string) => Promise<number>;
  commonDiscount: number;
}

const CartSummary: FC<CartSummaryProps> = ({
  total,
  updatePricesWithCode,
  commonDiscount,
}) => {
  return (
    <section className={'summary-container'}>
      <OrderSummary
        total={total}
        updatePricesWithCode={updatePricesWithCode}
        commonDiscount={commonDiscount}
      />
      <PromocodeInfo />
    </section>
  );
};

export default CartSummary;
