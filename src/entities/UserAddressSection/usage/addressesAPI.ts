import { store } from '../../../app/store/store';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

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
  console.log(id);
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
