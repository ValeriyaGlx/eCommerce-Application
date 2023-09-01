const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export interface Address {
  id: string;

  [key: string]: string;
}

function getAddresses(array: Address[], ids: string[]): Address[] {
  const addressesIds = ids;
  const allAddresses = array;
  const result = [];

  const newAllAddresses = allAddresses.map((oldObj) => {
    const newObj = {
      id: oldObj.id,
      street: oldObj.streetName,
      code: oldObj.postalCode,
      city: oldObj.city,
    };
    return newObj;
  });

  for (let i = 0; i < addressesIds.length; i++) {
    result.push(...newAllAddresses.filter((el) => el.id === addressesIds[i]));
  }

  return result;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: Address[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  billingAddress: [];
}

function getProfileObject(res: UserProfile) {
  const profileInfo = {
    personal: {
      name: res.firstName,
      surname: res.lastName,
      date: res.dateOfBirth,
      email: res.email,
    },
    addresses: {
      billingAddress: getAddresses(res.addresses, res.billingAddressIds),
      shippingAddress: getAddresses(res.addresses, res.shippingAddressIds),
    },
  };
  return profileInfo;
}

export async function getProfile(token: string) {
  const urlRequestProfile = `${host}/${project}/me`;

  const responseProfile = await fetch(urlRequestProfile, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const products = await responseProfile.json();

  return getProfileObject(products);
}
