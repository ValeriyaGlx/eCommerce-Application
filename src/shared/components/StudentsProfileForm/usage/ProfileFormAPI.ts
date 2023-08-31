const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

function getAddresses(array: string[], ids: string[]) {
  // console.log(array);
  // console.log(ids);
  const billingAddressesIds = ids;
  const allAddresses = array;
  let result = [];

  for (let i = 0; i < billingAddressesIds.length; i++) {
    result.push(...allAddresses.filter((el) => el.id === billingAddressesIds[i]));
  }

  // console.log(result);
  return result;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: string[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  billingAddress: [];
}

function getProfileObject(res: UserProfile) {
  const profileInfo = {
    name: res.firstName,
    surname: res.lastName,
    date: res.dateOfBirth,
    email: res.email,
    billingAddress: getAddresses(res.addresses, res.billingAddressIds),
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
