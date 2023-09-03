import React, { FC } from 'react';

import logoVisible from '../../assets/icons/icon-heart.svg';
import InputValidation from '../../shared/components/InputValidation/InputValidation';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../app/store/store';
import { setInputValueWithValidation } from '../../app/store/actions/signupActions/signupActions';
import {
  setPasswordValue,
  validateAllFields,
} from '../../app/store/actions/changePasswordAction/changePasswordSlice';

interface InputValidationPasswordCurrentProps {
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
}

type RootState = ReturnType<typeof store.getState>;

const InputValidationPassword: FC<InputValidationPasswordCurrentProps> = ({
  type,
  placeholder,
  showPassword,
  onBlur,
  inputName,
  min,
  styles,
  readonly,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputState = useSelector(
    (state: RootState) => state.changePassword[inputName],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trimStart();
    dispatch(setPasswordValue({ inputName, inputValue }));
    dispatch(validateAllFields({ inputName }));
  };

  const error = store.getState().changePassword[inputName].validationError;

  return (
    <InputValidation
      errorClass={error === '' || error === null ? '' : 'red'}
      type={type}
      placeholder={placeholder}
      inputName={inputName}
      showPassword={showPassword}
      onBlur={onBlur}
      min={min}
      handleInputChange={handleInputChange}
      errorMessage={inputState.validationError}
      value={inputState.value}
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default InputValidationPassword;
