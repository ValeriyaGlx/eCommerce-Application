import React, { useEffect, useState } from 'react';

import MyBag from '../../widgets/MyBag/MyBag';
import './_Cart.scss';
import CartSummary from '../../widgets/CartSummary/CartSummary';
import getCookie from '../../shared/cookie/getCookie';
import EmptyCart from '../../shared/EmptyCart/EmptyCart';
import { getCartById } from '../../entities/ApiCart/ApiCart';

export function Cart() {
  const [isCart, setIsCart] = useState(false);
  const [goods, setGoods] = useState([]);
  const [total, setTotal] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const cartId = getCookie('cartId');
      if (!cartId) {
        return;
      } else {
        setIsCart(true);
      }

      const token = getCookie('accessToken');

      if (token) {
        const res = await getCartById(cartId, token);
        const totalPrice = (res.totalPrice.centAmount / 100).toFixed(2);
        setTotal(totalPrice);
        setGoods(res.lineItems);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!isCart ? (
        <EmptyCart />
      ) : (
        <div className={'cart-container'}>
          <MyBag goods={goods} />
          <CartSummary total={total} />
        </div>
      )}
    </>
  );
}
