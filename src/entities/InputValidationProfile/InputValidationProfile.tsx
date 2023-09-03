import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import logoVisible from '../../assets/icons/icon-heart.svg';
import { store } from '../../app/store/store';
import InputValidation from '../../shared/components/InputValidation/InputValidation';
import { setAddressInputWithValidation } from '../../app/store/actions/profileAddressesAction/profileAddressesAction';

type RootState = ReturnType<typeof store.getState>;
type AddressId = keyof RootState['profileAddresses'];

interface InputValidationProfileProps {
  type: string;
  placeholder: string;
  inputName: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  styles?: string;
  readonly?: boolean;
  addressId: string;
}

const InputValidationProfile: FC<InputValidationProfileProps> = ({
  type,
  placeholder,
  showPassword,
  onBlur,
  inputName,
  min,
  styles,
  readonly,
  addressId,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputStateRender = useSelector(
    (state: RootState) => state.profileAddresses[addressId as AddressId],
  );

  const handleInputChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trimStart();

    dispatch(setAddressInputWithValidation(addressId, inputName, newValue));
  };

  return (
    <InputValidation
      errorClass={''}
      type={type}
      placeholder={placeholder}
      inputName={inputName}
      showPassword={showPassword}
      onBlur={onBlur}
      min={min}
      handleInputChange={handleInputChangeTest}
      value={
        inputStateRender ? inputStateRender.validation[inputName].value : ''
      }
      errorMessage={
        inputStateRender
          ? inputStateRender.validation[inputName].validationError
          : ''
      }
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default InputValidationProfile;
