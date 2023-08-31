import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { store } from '../../../app/store/store';
import './_StudentsProfileForm.scss';
import { INPUTS_PROFILE_DATA as profLinks } from '../../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import {
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../../constants/signupConstants/signupConstants';
import getCookie from '../../cookie/getCookie';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import AddressesSectionMap from '../../../entities/AddressesSectionMap/AddressesSectionMap';

import { Address, getProfile } from './usage/ProfileFormAPI';
import { initializeAddresses } from '../../../app/store/actions/profileAddressesAction/profileAddressesAction';

type AppDispatch = typeof store.dispatch;

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
    const initialAddressState = {};

    fullAddresses.forEach((address) => {
      initialAddressState[address.id] = {};

      addressArray.forEach(({ name }) => {
        initialAddressState[address.id][name] = {
          value: address[name],
          validationError: '',
        };
      });
    });

    // Диспатчить инициализацию в Redux
    dispatch(initializeAddresses(initialAddressState));
  }, [dispatch, addressArray, fullAddresses]);

  return (
    <div className={'profile-form'}>
      <div className={'profile-form__head'}>
        <div className={'profile-form__title'}>Student's Profile</div>
      </div>
      <h4 className={'profile-form__headline'}>Personal Information</h4>
      <div className={'profile-form__input'}>
        {profLinks.map(({ id, type, placeholder, name, logo, min, style }) => (
          <InputValidationSignUp
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            logo={logo}
            min={min}
            styles={style}
            readonly={true}
          />
        ))}
      </div>
      <h4 className={'profile-form__headline'}>Address Information</h4>
      <AddressesSectionMap
        arr={shippingAddresses}
        inputName={'shipping'}
        title={'Shipping address'}
        selectArray={selectArray}
        addressArray={addressArray}
        readonly={false}
      />

      <AddressesSectionMap
        arr={billingAddresses}
        inputName={'billing'}
        title={'Billing address'}
        selectArray={selectArray}
        addressArray={addressArray}
        readonly={true}
      />
    </div>
  );
};

export default StudentProfileForm;
