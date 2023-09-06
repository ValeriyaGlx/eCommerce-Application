import setToken from '../../shared/cookie/setToken';

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
      currency: 'EUR',
    }),
  });
  if (!response.ok) {
    return response.status;
  } else {
    const data = await response.json();
    setToken('cardId', data.id);
  }
}
