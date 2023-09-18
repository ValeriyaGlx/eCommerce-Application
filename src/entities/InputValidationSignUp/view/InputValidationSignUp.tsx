import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import InputValidation from '../../../shared/components/InputValidation/InputValidation';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import { store } from '../../../app/store/store';
import logoVisible from '../../../assets/icons/visible.png';
import { setPasswordValue } from '../../../app/store/actions/changePasswordAction/changePasswordSlice';
import { ChangePasswordStateKey } from '../../InputValidationPassword/InputValidationPassword';

type RootState = ReturnType<typeof store.getState>;

interface InputValidationSignUpProps {
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
  onFieldChange?: (fieldName: string, fieldValue: string) => void;
  changePassword?: boolean;
}

const inputValidationSignUp: FC<InputValidationSignUpProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
  onBlur,
  inputName,
  min,
  styles,
  readonly,
  onFieldChange,
  changePassword,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputState = useSelector(
    (state: RootState) => state.signup.signup[inputName],
  );

  const handleInputChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trimStart();
    dispatch(setInputValueWithValidation(inputName, newValue));

    if (onFieldChange) {
      onFieldChange(inputName, newValue);
    }

    if (changePassword) {
      const inputValue = newValue;
      dispatch(
        setPasswordValue({
          inputName: inputName as ChangePasswordStateKey,
          inputValue,
        }),
      );
    }
  };
  const error = store.getState().signup.signup[inputName].validationError;

  return (
    <InputValidation
      errorClass={error === '' || error === null ? '' : 'red'}
      type={type}
      placeholder={placeholder}
      inputName={inputName}
      showPassword={showPassword}
      logo={logo}
      onBlur={onBlur}
      min={min}
      handleInputChange={handleInputChangeTest}
      value={inputState.value}
      errorMessage={inputState.validationError}
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default inputValidationSignUp;
