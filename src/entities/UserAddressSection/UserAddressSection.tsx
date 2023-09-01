import React, { FC, useEffect } from 'react';

import SignUpSelectTag from '../SignUpSelectTag/SignUpSelectTag';
import InputValidationSignUp from '../InputValidationSignUp/view/InputValidationSignUp';
import { Address } from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import InputValidationProfile from '../InputValidationProfile/InputValidationProfile';

interface UserAddressSectionProps {
  title: string;
  readonly: boolean;
  inputName: string;
  selectArray: { value: string; data: string; id: number }[];
  addressArray: {
    type: string;
    placeholder: string;
    id: number;
    name: string;
  }[];
  data: Address[];
  addressId: string;
}

const UserAddressSection: FC<UserAddressSectionProps> = ({
  title,
  inputName,
  selectArray,
  addressArray,
  readonly,
  addressId,
}) => {
  return (
    <div className={'profile-form__billing'}>
      <h5 className={'profile-form__title__adress'}>{title}</h5>
      <div className={'profile-input__billing'}>
        <SignUpSelectTag
          selectArray={selectArray}
          className={'singUp-select'}
          inputName={inputName}
        />
        {addressArray.map(({ type, placeholder, id, name }, index) => (
          <InputValidationProfile
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            readonly={readonly}
            addressId={addressId}
          />
        ))}
      </div>
    </div>
  );
};

export default UserAddressSection;
