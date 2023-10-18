import getCookie from '../../../shared/cookie/getCookie';
import { createCart } from '../../../entities/ApiCart/ApiCart';

const url = process.env.REACT_APP_AUTH_URL;
const project = process.env.REACT_APP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const host = process.env.REACT_APP_HOST;

export async function tokenRequest(email: string, password: string) {
  const urlRequest = `${url}/oauth/${project}/customers/token`;
  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', email);
  body.append('password', password);
  const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}

export async function tokenAnonRequest() {
  const urlRequest = `${url}/oauth/${project}/anonymous/token?grant_type=client_credentials`;
  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}

export async function logInRequest(email: string, password: string, token: string) {
  const urlRequest = `${host}/${project}/login`;
  const authHeader = 'Bearer ' + token;
  let isCart = getCookie('cartId');

  if (isCart === undefined) {
    const anonTokenObj = await tokenAnonRequest();
    const anonToken = anonTokenObj.access_token;
    await createCart(anonToken);
    isCart = getCookie('cartId');
  }
  let requestBody;

  if (isCart) {
    requestBody = {
      email: email,
      password: password,
      anonymousCart: {
        id: isCart,
        typeId: 'cart',
      },
    };
  } else {
    requestBody = {
      email: email,
      password: password,
    };
  }
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}
