import React from 'react';

import MyBag from '../../widgets/MyBag/MyBag';

export function Cart() {
  return (
    //<EmptyCart />
    <div className={'cart-container'}>
      <MyBag />
      {/*<CartSummary />*/}
    </div>
  );
}
