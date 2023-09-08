import React from 'react';

import './_MyBag.scss';
import OrderCard from '../../entities/OrderCard/OrderCard';
import Button from '../../shared/components/Button/Button';

const MyBag = () => {
  return (
    <section className={'my-bag_section'}>
      <h2>My Bag</h2>
      <div className={'orders-container'}>
        <OrderCard />
      </div>

      <Button
        className={'reset-cart-button'}
        data={'Reset Cart'}
        onClick={() => {}}
      />
    </section>
  );
};

export default MyBag;
