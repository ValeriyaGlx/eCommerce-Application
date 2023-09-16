import React, { useEffect, useState } from 'react';

import './_Cart.scss';
import CartSummary from '../../widgets/CartSummary/CartSummary';
import getCookie from '../../shared/cookie/getCookie';
import EmptyCart from '../../shared/EmptyCart/EmptyCart';
import { getCartById } from '../../entities/ApiCart/ApiCart';
import {
  changeLineItemQuantity,
  getAllDiscounts,
  implementPromoCode,
  removeProductFromCart,
} from '../../entities/ApiCart/addProductToCart';
import MyBag from '../../widgets/MyBag/MyBag';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner/LoadingSpinner';

export function Cart() {
  const [isCart, setIsCart] = useState(false);
  const [goods, setGoods] = useState([]);
  const [total, setTotal] = useState('');
  const [goodsLength, setGoodsLength] = useState(0);
  const [isGetQuery, setIsGetQuery] = useState(false);
  const [commonDiscount, setCommonDiscount] = useState(0);

  useEffect(() => {
    setIsGetQuery(true);
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

        let newDesc = 1;

        for (const discount of res.discountCodes) {
          const res = await getAllDiscounts(discount.discountCode.id);
          if (res) {
            newDesc = newDesc / (1 - Number(res.description['en-US']));
            setCommonDiscount(newDesc);
          }
        }

        const totalPrice = (res.totalPrice.centAmount / 100).toFixed(2);
        setTotal(totalPrice);
        setGoods(res.lineItems);
        setGoodsLength(res.lineItems.length);
        setIsGetQuery(false);
      }
    };
    fetchData();
  }, []);

  const getGoods = async (id: string) => {
    const res = await removeProductFromCart(id);
    if (res) {
      const totalPrice = (res.totalPrice.centAmount / 100).toFixed(2);
      const amount = res.lineItems.length;
      setTotal(totalPrice);
      setGoods(res.lineItems);
      setGoodsLength(amount);
    }
  };

  const changeQuantity = async (currentId: string, newQuantity: number) => {
    const res = await changeLineItemQuantity(currentId, newQuantity);
    const totalPrice = (res.totalPrice.centAmount / 100).toFixed(2);
    setTotal(totalPrice);
    setGoods(res.lineItems);
  };

  const removeAllItems = async (
    array: Array<{ [key: string]: string | number }>,
  ) => {
    let lastReturnValue;

    for (const item of array) {
      lastReturnValue = await removeProductFromCart(item.id as string);
    }
    const amount = lastReturnValue.lineItems.length;

    setGoods(lastReturnValue.lineItems);
    setGoodsLength(amount);

    return lastReturnValue.lineItems;
  };

  const updatePricesWithCode = async (inputValue: string) => {
    const res = await implementPromoCode(inputValue);
    if (typeof res !== 'number') {
      const totalPrice = (res.totalPrice.centAmount / 100).toFixed(2);
      setGoods(res.lineItems);
      setTotal(totalPrice);

      let newDesc = 1;

      for (const discount of res.discountCodes) {
        const res = await getAllDiscounts(discount.discountCode.id);
        if (res) {
          newDesc = newDesc / (1 - Number(res.description['en-US']));
          setCommonDiscount(newDesc);
        }
      }
    }
    return res;
  };

  if (isGetQuery && isCart) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!isCart || !goodsLength ? (
        <EmptyCart />
      ) : (
        <div className={'cart-container'}>
          <MyBag
            goods={goods}
            getGoods={getGoods}
            changeQuantity={changeQuantity}
            removeAllItems={removeAllItems}
          />
          <CartSummary
            commonDiscount={commonDiscount}
            total={total}
            updatePricesWithCode={updatePricesWithCode}
          />
        </div>
      )}
    </>
  );
}
