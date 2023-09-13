import '@testing-library/jest-dom/extend-expect';
import { tokenRequest, logInRequest } from '../features/formSubmitSignIn/usage/ApiAuthorization';

let originalFetch: typeof global.fetch;

describe('tokenRequest', () => {
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('authentication data on success', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const expectedResponse = {
      access_token: 'your-access-token',
      expires_in: 3600,
      refresh_token: 'your-refresh-token',
      token_type: 'Bearer',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await tokenRequest(email, password);

    expect(result).toEqual(expectedResponse);
  });

  test('status code on failure', async () => {
    const email = 'test@example.com';
    const password = 'incorrectPassword';

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const result = await tokenRequest(email, password);

    expect(result).toBe(400);
  });
});

describe('logInRequest', () => {
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('logInRequest success', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'oje&61bu7dsbgu29mdme';

    const expectedResponse = {
      email: 'test@example.com',
      firstName: 'User',
      lastName: 'UserLastName',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => expectedResponse,
    });

    const result = await logInRequest(email, password, token);

    expect(result).toEqual(expectedResponse);
  });

  test('status code on failure', async () => {
    const email = 'test@example.com';
    const password = 'incorrectPassword';
    const token = 'oje&61bu7dsbgu29mdme';

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const result = await logInRequest(email, password, token);

    expect(result).toBe(400);
  });
});
