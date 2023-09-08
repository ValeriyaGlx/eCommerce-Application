import React from 'react';

import OrderCard from '../../entities/OrderCard/OrderCard';
import Button from '../../shared/components/Button/Button';

const MyBag = () => {
  return (
    <section>
      <h2>My Bag</h2>
      <div className={'orders-container'}>
        <OrderCard />
      </div>

      <Button className={''} data={'Reset Cart'} onClick={() => {}} />
    </section>
  );
};

export default MyBag;
