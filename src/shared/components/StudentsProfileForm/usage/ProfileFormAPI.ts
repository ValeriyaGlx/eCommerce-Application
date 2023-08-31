const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

function getAddresses(array: string[], billingId: string, shippingId: string) {
  console.log(array, billingId, shippingId);
}
interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: string[];
  billingAddressIds: string;
  shippingAddressIds: string;
}
function getProfileObject(res: UserProfile) {
  // console.log(res.billingAddressIds);
  const profileInfo = {
    name: res.firstName,
    surname: res.lastName,
    date: res.dateOfBirth,
    email: res.email,
  };

  getAddresses(res.addresses, res.billingAddressIds, res.shippingAddressIds);

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
