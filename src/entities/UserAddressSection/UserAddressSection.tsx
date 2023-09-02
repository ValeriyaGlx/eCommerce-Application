import React, { FC } from 'react';

import InputValidationProfile from '../InputValidationProfile/InputValidationProfile';
import ProfileSelectTag from '../ProfileSelectedTag/ProfileSelectedTag';

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
  addressId: string;
  defaultAddress: boolean;
}

const UserAddressSection: FC<UserAddressSectionProps> = ({
  title,
  inputName,
  selectArray,
  addressArray,
  readonly,
  addressId,
  defaultAddress,
}) => {
  return (
    <div className={'profile-form__billing'}>
      <h5 className={'profile-form__title__adress'}>{title}</h5>
      {defaultAddress && <span style={{ color: 'red' }}>default</span>}
      <div className={'profile-input__billing'}>
        <ProfileSelectTag
          selectArray={selectArray}
          className={'singUp-select'}
          inputName={inputName}
          addressId={addressId}
          readonly={readonly}
        />
        {addressArray.map(({ type, placeholder, id, name }) => (
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
