import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../../app/store/store';
import './_StudentsProfileForm.scss';
import {
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../../constants/signupConstants/signupConstants';
import getCookie from '../../cookie/getCookie';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import AddressesSectionMap from '../../../entities/AddressesSectionMap/AddressesSectionMap';
import { initializeAddresses } from '../../../app/store/actions/profileAddressesAction/profileAddressesSlice';
import ProfilePersonalInfo from '../../../widgets/ProfilePersonalInfo/ProfilePersonalInfo';

import { Address, getProfile } from './usage/ProfileFormAPI';
import { setVersion } from '../../../app/store/actions/profileVersion/profileVersion';

export type AppDispatch = typeof store.dispatch;

interface State {
  validation: {
    [key: string]: {
      value?: string;
      validationError?: string;
    };
  };
  withoutValidation: {
    country?: string;
    defaultAddress?: boolean;
  };
}

export const StudentProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [billingAddresses, setBillingAddresses] = useState<Address[]>(
    [] as Address[],
  );
  const [shippingAddresses, setShippingAddresses] = useState<Address[]>(
    [] as Address[],
  );
  const [fullAddresses, setFullAddresses] = useState<Address[]>(
    [] as Address[],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const profileFields = Object.entries(profile.personal);
        const version = profile.version;

        dispatch(setVersion({ version }));

        setBillingAddresses(profile.addresses.billingAddress);
        setShippingAddresses(profile.addresses.shippingAddress);
        setFullAddresses([
          ...profile.addresses.shippingAddress,
          ...profile.addresses.billingAddress,
        ]);

        profileFields.forEach((el) => {
          const inputName = el[0];
          const inputValue = el[1];
          dispatch(setInputValueWithValidation(inputName, inputValue));
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const initialAddressState: { [key: string]: State } = {};

    fullAddresses.forEach((address) => {
      initialAddressState[address.id] = {
        validation: {},
        withoutValidation: {},
      };
      initialAddressState[address.id].withoutValidation = {
        country: address.country,
        defaultAddress: address.defaultAddress,
      };

      addressArray.forEach(({ name }) => {
        initialAddressState[address.id].validation[name] = {
          value: (address[name] as string) || '',
          validationError: '',
        };
      });
    }, []);

    dispatch(initializeAddresses(initialAddressState));
  }, [fullAddresses]);

  return (
    <div className={'profile-form'}>
      <div className={'profile-form__head'}>
        <div className={'profile-form__title'}>Student's Profile</div>
      </div>
      <ProfilePersonalInfo />
      <AddressesSectionMap
        arr={shippingAddresses}
        inputName={'shipping'}
        title={'Shipping address'}
        selectArray={selectArray}
        addressArray={addressArray}
      />
      <AddressesSectionMap
        arr={billingAddresses}
        inputName={'billing'}
        title={'Billing address'}
        selectArray={selectArray}
        addressArray={addressArray}
      />
    </div>
  );
};

export default StudentProfileForm;
