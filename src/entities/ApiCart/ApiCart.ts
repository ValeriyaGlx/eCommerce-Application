import setToken from '../../shared/cookie/setToken';
import getCookie from '../../shared/cookie/getCookie';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export async function getCartById(idCart: string, authToken: string) {
  const urlRequestProducts = `${host}/${project}/carts/${idCart}`;

  const responseProducts = await fetch(urlRequestProducts, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });
  return responseProducts.json();
}

export async function createCart(authToken: string) {
  const urlRequest = `${host}/${project}/carts/`;
  const authHeader = 'Bearer ' + authToken;

  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currency: 'USD',
    }),
  });
  if (!response.ok) {
    return response.status;
  } else {
    const data = await response.json();
    setToken('cartId', data.id);
    return data;
  }
}

export async function addProductToCart(token: string, productId: string) {
  const cartId = getCookie('cartId');
  if (cartId) {
    const cartObj = await getCartById(cartId, token);
    const cartVersion = cartObj.version;
    const urlRequest = `${host}/${project}/carts/${cartId}`;
    const authHeader = 'Bearer ' + token;

    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      }),
    });
    if (!response.ok) {
      return response.status;
    } else {
      return response.json();
    }
  }
}

export async function deleteCart(token: string) {
  const cartId = getCookie('cartId');
  if (cartId) {
    const cartObj = await getCartById(cartId, token);
    const cartVersion = cartObj.version;
    const urlRequest = `${host}/${project}/carts/${cartId}?version=${cartVersion}`;
    const authHeader = 'Bearer ' + token;

    const response = await fetch(urlRequest, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return response.status;
    } else {
      return response.json();
    }
  }
}
