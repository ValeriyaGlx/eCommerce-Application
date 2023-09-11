import React, { FC } from 'react';

import './_MyBag.scss';
import OrderCard from '../../entities/OrderCard/OrderCard';
import Button from '../../shared/components/Button/Button';

import { getGoodsData } from './usage/getGoodsData';

interface IGood {
  id: string;
  productId: string;
  quantity: number;
  name: {
    'en-US': string;
  };
  variant: {
    images: Array<{
      url: string;
    }>;
  };
  price: {
    value: {
      centAmount: number;
    };
  };
  totalPrice: {
    centAmount: number;
  };
}

interface MyBagProps {
  goods: IGood[];
  getGoods: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
}

const MyBag: FC<MyBagProps> = ({ goods, getGoods, changeQuantity }) => {
  const ordersArray = getGoodsData(goods);

  return (
    <section className={'my-bag_section'}>
      <h2>My Bag</h2>
      <div className={'orders-container'}>
        {ordersArray.map(
          ({
            id,
            name,
            image,
            price,
            discount,
            quantity,
            productId,
            total,
          }) => (
            <OrderCard
              key={id}
              image={image}
              name={name}
              price={price}
              total={total}
              id={id}
              discount={discount}
              getGoods={getGoods}
              quantity={quantity}
              productId={productId}
              changeQuantity={changeQuantity}
            />
          ),
        )}
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
