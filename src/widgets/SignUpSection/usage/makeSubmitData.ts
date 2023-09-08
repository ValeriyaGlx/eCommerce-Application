import { store } from '../../../app/store/store';

import { ISubmitData } from './ApiRegistration';

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

const makeSubmitData = () => {
  const signUpData = store.getState().signup.signup;
  const SignUpCountries = store.getState().signup.countries;

  const checkboxes = store.getState().signup.checkboxes;
  const isSameAddresses = checkboxes.isSameAddress;

  const data: ISubmitData = {
    email: signUpData.email.value,
    password: signUpData.password.value,
    firstName: signUpData.name.value,
    lastName: signUpData.surname.value,
    dateOfBirth: signUpData.date.value,
    addresses: [
      {
        country: getCountry(SignUpCountries.shipping),
        postalCode: signUpData.shipping_code.value,
        city: signUpData.shipping_city.value,
        streetName: signUpData.shipping_street.value,
      },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
  };

  if (isSameAddresses) {
    data.addresses.push({
      country: getCountry(SignUpCountries.shipping),
      postalCode: signUpData.shipping_code.value,
      city: signUpData.shipping_city.value,
      streetName: signUpData.shipping_street.value,
    });
  } else {
    data.addresses.push({
      country: getCountry(SignUpCountries.billing),
      postalCode: signUpData.billing_code.value,
      city: signUpData.billing_city.value,
      streetName: signUpData.billing_street.value,
    });
  }

  const isDefaultBothAddresses = checkboxes.isDefaultBothAddresses;
  const isBillingDefault = checkboxes.isBillingDefault;
  const isShippingDefault = checkboxes.isShippingDefault;

  if (isSameAddresses && isDefaultBothAddresses) {
    data.defaultBillingAddress = 0;
    data.defaultShippingAddress = 1;
    data.billingAddresses = [];
    data.shippingAddresses = [];

    return data;
  }

  if (!isSameAddresses && isBillingDefault) {
    data.defaultBillingAddress = 1;
  }

  if (!isSameAddresses && isShippingDefault) {
    data.defaultShippingAddress = 0;
  }
  return data;
};

export default makeSubmitData;
