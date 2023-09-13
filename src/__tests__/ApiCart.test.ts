import { getCartById, createCart, addProductApi } from '../entities/ApiCart/ApiCart';
import { removeProductApi, changeLineItemQuantityApi } from '../entities/ApiCart/ApiCart';
import * as ApiCartModule from '../entities/ApiCart/ApiCart';
import * as CookieModule from '../shared/cookie/getCookie';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

describe('getCartById', () => {
  let originalFetch: jest.SpyInstance;

  beforeEach(() => {
    const mockCart = { id: 'cartId', items: [] };
    originalFetch = jest.spyOn(global, 'fetch');
    originalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCart,
    });
  });

  afterEach(() => {
    originalFetch.mockRestore();
  });

  test('getCartById  returns the expected result', async () => {
    const mockCart = { id: 'cartId', items: [] };
    const authToken = 'yourAuthToken';
    const idCart = 'cartId';

    const result = await getCartById(idCart, authToken);

    expect(originalFetch).toHaveBeenCalledWith(
      `${host}/${project}/carts/${idCart}`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      }),
    );

    expect(result).toEqual(mockCart);
  });
});

describe('createCart', () => {
  let originalFetch: jest.SpyInstance;

  beforeEach(() => {
    originalFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    originalFetch.mockRestore();
  });

  test('createCart  returns the expected result', async () => {
    const authToken = 'yourAuthToken';
    const expectedResponse = { id: 'cartId', currency: 'USD' };

    originalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await createCart(authToken);

    expect(originalFetch).toHaveBeenCalledWith(
      `${host}/${project}/carts/`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'USD',
        }),
      }),
    );

    expect(result).toEqual(expectedResponse);
  });
});

describe('addProductApi', () => {
  let originalFetch: jest.SpyInstance;
  let getCookieSpy: jest.SpyInstance;
  let getCartByIdSpy: jest.SpyInstance;

  beforeEach(() => {
    originalFetch = jest.spyOn(global, 'fetch');
    getCookieSpy = jest.spyOn(CookieModule, 'default');
    getCartByIdSpy = jest.spyOn(ApiCartModule, 'getCartById');
  });

  afterEach(() => {
    originalFetch.mockRestore();
    getCookieSpy.mockRestore();
    getCartByIdSpy.mockRestore();
  });

  test('addProductApi returns the expected result', async () => {
    const token = 'yourAuthToken';
    const productId = 'product123';
    const cartId = 'cartId';
    const cartVersion = 1;

    const expectedResponse = { id: cartId, version: cartVersion + 1 };

    getCartByIdSpy.mockResolvedValueOnce({
      version: cartVersion,
    });

    getCookieSpy.mockReturnValue(cartId);

    originalFetch.mockResolvedValue({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await addProductApi(token, productId);

    expect(result).toEqual(expectedResponse);
  });
});

describe('removeProductApi', () => {
  let originalFetch: jest.SpyInstance;
  let getCookieSpy: jest.SpyInstance;
  let getCartByIdSpy: jest.SpyInstance;

  beforeEach(() => {
    originalFetch = jest.spyOn(global, 'fetch');
    getCookieSpy = jest.spyOn(CookieModule, 'default');
    getCartByIdSpy = jest.spyOn(ApiCartModule, 'getCartById');
  });

  afterEach(() => {
    originalFetch.mockRestore();
    getCookieSpy.mockRestore();
    getCartByIdSpy.mockRestore();
  });

  test('removeProductApi returns the expected result when the request is successful', async () => {
    const token = 'yourAuthToken';
    const productId = 'product123';
    const cartId = 'cartId';
    const cartVersion = 1;

    const expectedResponse = { id: cartId, version: cartVersion + 1 };
    getCookieSpy.mockReturnValue(cartId);
    getCartByIdSpy.mockResolvedValue({
      version: cartVersion,
    });
    originalFetch.mockResolvedValue({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await removeProductApi(token, productId);

    expect(result).toEqual(expectedResponse);
  });

  test('removeProductApi returns status on unsuccessful request', async () => {
    const token = 'yourAuthToken';
    const productId = 'product123';
    const cartId = 'cartId';
    const cartVersion = 1;
    const expectedErrorStatus = 404;

    getCartByIdSpy.mockResolvedValueOnce({
      version: cartVersion,
    });

    getCookieSpy.mockReturnValueOnce(cartId);
    originalFetch.mockResolvedValue({
      ok: false,
      status: expectedErrorStatus,
      json: async () => expectedErrorStatus,
    });

    const result = await removeProductApi(token, productId);

    expect(result).toEqual(expectedErrorStatus);
  });
});

describe('changeLineItemQuantityApi', () => {
  let originalFetch: jest.SpyInstance;
  let getCookieSpy: jest.SpyInstance;
  let getCartByIdSpy: jest.SpyInstance;

  beforeEach(() => {
    originalFetch = jest.spyOn(global, 'fetch');
    getCookieSpy = jest.spyOn(CookieModule, 'default');
    getCartByIdSpy = jest.spyOn(ApiCartModule, 'getCartById');
  });

  afterEach(() => {
    originalFetch.mockRestore();
    getCookieSpy.mockRestore();
    getCartByIdSpy.mockRestore();
  });

  test('changeLineItemQuantityApi returns the expected result when the request is successful', async () => {
    const token = 'yourAuthToken';
    const lineItemId = 'lineItem123';
    const quantity = 2;
    const cartId = 'cartId';
    const cartVersion = 1;

    const expectedResponse = { id: cartId, version: cartVersion + 1 };

    getCartByIdSpy.mockResolvedValue({
      version: cartVersion,
    });
    getCookieSpy.mockReturnValue(cartId);
    originalFetch.mockResolvedValue({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await changeLineItemQuantityApi(token, lineItemId, quantity);

    expect(result).toEqual(expectedResponse);
  });
});
