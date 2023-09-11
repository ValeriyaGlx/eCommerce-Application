import getCookie from '../../shared/cookie/getCookie';

import { getCartById } from './ApiCart';

export const getNumberOfProductToCart = async () => {
  try {
    const cart = getCookie('cartId');
    if (cart) {
      const anonToken = getCookie('anonToken') as string;
      const authToken = getCookie('authToken') as string;
      let obj;
      if (anonToken) {
        obj = await getCartById(cart, anonToken);
      }
      if (authToken) {
        obj = await getCartById(cart, authToken);
      }
      return obj.totalLineItemQuantity;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
