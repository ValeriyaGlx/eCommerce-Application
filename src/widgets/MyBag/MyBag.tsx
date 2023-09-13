import React, { FC, useState } from 'react';
import './_MyBag.scss';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import ModalFailed from '../../features/ModalFailed/ModalFailed';
import OrderCard from '../../entities/OrderCard/OrderCard';
import Button from '../../shared/components/Button/Button';
import logo from '../../assets/icons/modal-logo-failed.png';
import { getNumberOfProductToCart } from '../../entities/ApiCart/getNumberOfProductToCart';
import { setNumberOfProductToCart } from '../../app/store/actions/cartAction/cartSlice';
import { store } from '../../app/store/store';

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
  removeAllItems: (
    array: Array<{ [key: string]: string | number }>,
  ) => Promise<[]>;
}

type RootState = ReturnType<typeof store.getState>;

const MyBag: FC<MyBagProps> = ({
  goods,
  getGoods,
  changeQuantity,
  removeAllItems,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const ordersArray = getGoodsData(goods);

  async function clearShoppingCart() {
    await removeAllItems(ordersArray);
    const number = await getNumberOfProductToCart();
    if (number) {
      dispatch(setNumberOfProductToCart(number));
    } else {
      dispatch(setNumberOfProductToCart(0));
    }
  }

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
        data={'Clear Shopping Cart'}
        onClick={() => setOpenModal(true)}
      />
      <ModalFailed
        logo={logo}
        h2={'Confirm Cart Clearance'}
        p={'Are you sure you want to completely clear your cart?'}
        buttonValue={'Confirm'}
        closeButtonData={'Cancel'}
        closeButtonOnClick={() => setOpenModal(false)}
        isOpen={openModal}
        onClick={clearShoppingCart}
      />
    </section>
  );
};

export default MyBag;
