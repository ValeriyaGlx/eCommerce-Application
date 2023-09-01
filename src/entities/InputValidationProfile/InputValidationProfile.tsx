import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import logoVisible from '../../assets/icons/icon-heart.svg';
import { store } from '../../app/store/store';
import InputValidation from '../../shared/components/InputValidation/InputValidation';

type RootState = ReturnType<typeof store.getState>;

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
  const inputStateRender = useSelector(
    (state: RootState) => state.profileAddresses[addressId],
  );

  if (inputStateRender) {
    console.log(store.getState().profileAddresses[addressId][inputName]);
  }

  return (
    <InputValidation
      errorClass={''}
      type={type}
      placeholder={placeholder}
      inputName={inputName}
      showPassword={showPassword}
      onBlur={onBlur}
      min={min}
      handleInputChange={() => {}}
      value={
        inputStateRender
          ? store.getState().profileAddresses[addressId][inputName].value
          : ''
      }
      errorMessage={''}
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default InputValidationProfile;
