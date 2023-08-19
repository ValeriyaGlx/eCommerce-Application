import { store } from '../../../app/store/store';
import { setSingUpSuccess } from '../../../app/store/actions/modalSliceAction/modalSlice';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;
const auth = process.env.REACT_APP_AUTH_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

interface IAddress {
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
}

export interface ISubmitData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: IAddress[];
  billingAddress: string;
  shippingAddress: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export async function getAccessToken() {
  const urlRequest = `${auth}/oauth/token`;
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

async function logUpRequest(submitData: ISubmitData, token: string) {
  const urlRequest = `${host}/${project}/customers`;
  const authHeader = 'Bearer ' + token;
  try {
    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });
    if (!response.ok) {
      await store.dispatch(setSingUpSuccess({ isSuccess: false }));
      return response.status;
    } else {
      await store.dispatch(setSingUpSuccess({ isSuccess: true }));
      return await response.json();
    }
  } catch (error) {
    throw error;
  }
}

export default logUpRequest;
