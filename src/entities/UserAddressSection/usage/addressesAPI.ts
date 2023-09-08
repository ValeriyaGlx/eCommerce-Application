import { store } from '../../../app/store/store';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

const getCountry = (country: string) => {
  let countryForJSON: string;
  switch (country) {
    case 'Russia':
      countryForJSON = 'RU';
      break;
    case 'Georgia':
      countryForJSON = 'GE';
      break;
    case 'United States':
      countryForJSON = 'US';
      break;
    case 'Belarus':
      countryForJSON = 'BY';
      break;
    default:
      countryForJSON = 'RU';
  }

  return countryForJSON;
};

function actionAddress(action: string, id: string) {
  let data;
  switch (action) {
    case 'remove':
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'removeAddress',
            addressId: id,
          },
        ],
      };
      break;
    case 'change':
      const newAddress = store.getState().profileAddresses[id];
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'changeAddress',
            addressId: id,
            address: {
              streetName: newAddress.validation.street.value,
              postalCode: newAddress.validation.code.value,
              city: newAddress.validation.city.value,
              country: getCountry(newAddress.withoutValidation.country as string),
            },
          },
        ],
      };
      break;
    case 'addShipping':
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId: id,
          },
        ],
      };
      break;
    case 'addBilling':
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'addBillingAddressId',
            addressId: id,
          },
        ],
      };
      break;
    case 'defaultBilling':
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: id,
          },
        ],
      };
      break;
    case 'defaultShipping':
      data = {
        version: store.getState().profileVersion.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: id,
          },
        ],
      };
      break;
  }
  return data;
}

function addAddress() {
  const data = {
    version: store.getState().profileVersion.version,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName: '',
          postalCode: '',
          city: '',
          country: 'US',
        },
      },
    ],
  };
  return data;
}

export async function changeAddresses(token: string, action: string, id: string) {
  const urlRequest = `${host}/${project}/me`;

  const authHeader = 'Bearer ' + token;
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(actionAddress(action, id)),
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}

export async function addAddresses(token: string) {
  const urlRequest = `${host}/${project}/me`;

  const authHeader = 'Bearer ' + token;
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(addAddress()),
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}
