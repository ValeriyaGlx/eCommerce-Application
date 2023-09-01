import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import logoVisible from '../../assets/icons/icon-heart.svg';
import { store } from '../../app/store/store';
import InputValidation from '../../shared/components/InputValidation/InputValidation';

type RootState = ReturnType<typeof store.getState>;
type AddressId = keyof RootState['profileAddresses'];

interface AddressState {
  value: string;
  validationError: string;
}

type ProfileState = Record<string, Record<string, AddressState>>;

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
  const inputStateRender: ProfileState = useSelector(
    (state: RootState) => state.profileAddresses[addressId as AddressId],
  ) as ProfileState;

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
        inputStateRender ? inputStateRender.validation[inputName].value : ''
      }
      errorMessage={''}
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default InputValidationProfile;
