import { idOfProductToCart, addProductToCart } from '../entities/ApiCart/addProductToCart';
import * as CookieModule from '../shared/cookie/getCookie';
import * as ApiCartModule from '../entities/ApiCart/ApiCart';
import * as tokenAnonRequest from '../features/formSubmitSignIn/usage/ApiAuthorization';

describe('idOfProductToCart', () => {
  let getCookieSpy: jest.SpyInstance;
  let getCartByIdSpy: jest.SpyInstance;

  beforeEach(() => {
    getCookieSpy = jest.spyOn(CookieModule, 'default');
    getCartByIdSpy = jest.spyOn(ApiCartModule, 'getCartById');
  });

  afterEach(() => {
    getCookieSpy.mockRestore();
    getCartByIdSpy.mockRestore();
  });

  test('idOfProductToCart returns a list of product IDs if there is a cartId and authentication', async () => {
    const cartId = 'cartId';
    const authToken = 'yourAuthToken';
    const productIds = ['productId1', 'productId2'];

    getCookieSpy.mockReturnValue(cartId);
    getCookieSpy.mockReturnValue(authToken);

    getCartByIdSpy.mockResolvedValueOnce({
      lineItems: productIds.map((productId) => ({ productId })),
    });

    const result = await idOfProductToCart();

    expect(result).toEqual(productIds);
  });
});

describe('addProductToCart', () => {
  let getCookieSpy: jest.SpyInstance;
  let tokenAnonRequestSpy: jest.SpyInstance;
  let addProductApiSpy: jest.SpyInstance;

  beforeEach(() => {
    getCookieSpy = jest.spyOn(CookieModule, 'default');
    tokenAnonRequestSpy = jest.spyOn(tokenAnonRequest, 'tokenAnonRequest');
    addProductApiSpy = jest.spyOn(ApiCartModule, 'addProductApi');
  });

  afterEach(() => {
    getCookieSpy.mockRestore();
    tokenAnonRequestSpy.mockRestore();
    addProductApiSpy.mockRestore();
  });

  test('addProductToCart returns LineItems in the absence of authentication and cartId', async () => {
    const anonToken = 'yourAnonToken';
    const productId = 'product123';
    const lineItems = [{ productId }];

    getCookieSpy.mockReturnValue(null);
    tokenAnonRequestSpy.mockResolvedValue({ access_token: anonToken });

    addProductApiSpy.mockResolvedValueOnce({ lineItems });

    const result = await addProductToCart({} as React.MouseEvent, productId);

    expect(tokenAnonRequestSpy).toHaveBeenCalled();
    expect(addProductApiSpy).toHaveBeenCalledWith(anonToken, productId);

    expect(result).toEqual(lineItems);
  });
});
