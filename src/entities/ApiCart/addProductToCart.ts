import React from 'react';

import { store } from '../../app/store/store';
import getCookie from '../../shared/cookie/getCookie';
import { tokenAnonRequest } from '../../features/formSubmitSignIn/usage/ApiAuthorization';
import setToken from '../../shared/cookie/setToken';

import { addProductApi, createCart, getCartById, removeProductApi } from './ApiCart';

interface ProductsToCart {
  id: string;
  productId: string;
  name: {
    'en-US': string;
  };
  variant: {
    id: number;
    prices: [
      {
        value: {
          currencyCode: string;
          centAmount: number;
        };
      },
    ];
    images: [
      {
        url: string;
      },
    ];
    attributes: [
      {
        name: string;
        value: [string];
      },
      {
        name: string;
        value: number;
      },
    ];
  };
  price: {
    value: {
      currencyCode: string;
      centAmount: number;
    };
  };
}

export async function idOfProductToCart() {
  const isAuth = store.getState().authorization.isAuthorization;
  const isCart = getCookie('cartId');
  let token: string;
  if (isCart) {
    if (isAuth) {
      token = getCookie('authToken') as string;
    } else {
      token = getCookie('anonToken') as string;
    }
    const cartId = await getCartById(isCart, token);
    return cartId.lineItems.map((el: ProductsToCart) => el.productId);
  }
}

export async function addProductToCart(event: React.MouseEvent, productId: string) {
  const isAuth = store.getState().authorization.isAuthorization;
  const isCart = getCookie('cartId');
  if (!isAuth && !isCart) {
    const anonTokenObj = await tokenAnonRequest();
    const anonToken = anonTokenObj.access_token;
    setToken('anonToken', anonToken);
    await createCart(anonToken);
    const cartObj = await addProductApi(anonToken, productId);
    return cartObj.lineItems;
  } else if (!isAuth && isCart) {
    const token = getCookie('anonToken') as string;
    const cartObj = await addProductApi(token, productId);
    return cartObj.lineItems;
  } else if (isAuth && isCart) {
    const token = getCookie('authToken') as string;
    const cartObj = await addProductApi(token, productId);
    return cartObj.lineItems;
  } else {
    const token = getCookie('authToken') as string;
    await createCart(token);
    const cartObj = await addProductApi(token, productId);
    return cartObj.lineItems;
  }
}

export function findIdByProductId(objArr: Array<ProductsToCart>, targetProductId: string) {
  for (let i = 0; i < objArr.length; i++) {
    if (objArr[i].productId === targetProductId) {
      return objArr[i].id;
    }
  }
}

export async function removeProductFromCart(productId: string) {
  const isAuth = store.getState().authorization.isAuthorization;
  let res;
  if (!isAuth) {
    const token = getCookie('anonToken') as string;
    res = await removeProductApi(token, productId);
  } else if (isAuth) {
    const token = getCookie('authToken') as string;
    res = await removeProductApi(token, productId);
  }

  return res;
}
