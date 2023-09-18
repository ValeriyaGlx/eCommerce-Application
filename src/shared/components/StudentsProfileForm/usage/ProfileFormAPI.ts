const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export interface Address {
  id: string;
  defaultAddress: boolean;
  country: string;

  [key: string]: string | boolean;
}

function getCountry(country: string) {
  let fullCountry;
  switch (country) {
    case 'ru':
      fullCountry = 'Russia';
      break;
    case 'by':
      fullCountry = 'Belarus';
      break;
    case 'us':
      fullCountry = 'United States';
      break;
    case 'ge':
      fullCountry = 'Georgia';
      break;
    default:
      fullCountry = 'Choose country';
  }
  return fullCountry;
}

function getAddresses(array: Address[], ids: string[], defaultAddressId: string, type: string): Address[] {
  const addressesIds = ids;
  const allAddresses = array;
  const result = [];

  const newAllAddresses = allAddresses.map((oldObj) => {
    const newObj = {
      id: oldObj.id,
      defaultAddress: false,
      country: getCountry(oldObj.country.toLowerCase()),
      street: oldObj.streetName,
      code: oldObj.postalCode,
      city: oldObj.city,
      type: type,
    };

    if (newObj.id === defaultAddressId) {
      newObj.defaultAddress = true;
    } else {
      newObj.defaultAddress = false;
    }

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
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  version: number;
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
      billingAddress: getAddresses(res.addresses, res.billingAddressIds, res.defaultBillingAddressId, 'billing'),
      shippingAddress: getAddresses(res.addresses, res.shippingAddressIds, res.defaultShippingAddressId, 'shipping'),
    },
    version: res.version,
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
  const person = await responseProfile.json();

  return getProfileObject(person);
}
