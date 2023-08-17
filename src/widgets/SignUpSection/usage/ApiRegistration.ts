import { store } from '../../../app/store/store';
import { setSingUpSuccess } from '../../../app/store/modalSliceAction/modalSlice';

const token = process.env.REACT_APP_ACCESS_TOKEN_BEARER;
const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

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

async function logUpRequest(submitData: ISubmitData) {
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
