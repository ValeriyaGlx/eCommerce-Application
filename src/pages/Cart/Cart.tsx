import React from 'react';

import MyBag from '../../widgets/MyBag/MyBag';
import './_Cart.scss';
import CartSummary from '../../widgets/CartSummary/CartSummary';

export function Cart() {
  return (
    //<EmptyCart />
    <div className={'cart-container'}>
      <MyBag />
      <CartSummary />
    </div>
  );
}
