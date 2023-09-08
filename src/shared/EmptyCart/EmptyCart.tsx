import React from 'react';

import ButtonWithRoute from '../components/ButtonWithRoute/ButtonWithRoute';
import bag from '../../assets/icons/icon-bag-black.svg';
import './_EmptyCart.scss';

const EmptyCart = () => {
  return (
    <div className={'empty-cart_container'}>
      <img src={bag} alt={'cart'} />
      <p>Your Bag is Empty</p>
      <ButtonWithRoute
        className={'button-empty-cart'}
        path={'/products'}
        data={'View Catalog'}
      />
    </div>
  );
};

export default EmptyCart;
