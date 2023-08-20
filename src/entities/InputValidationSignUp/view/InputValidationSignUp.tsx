import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import InputValidation from '../../../shared/components/InputValidation/InputValidation';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import { store } from '../../../app/store/store';
import logoVisible from '../../../assets/icons/visible.png';

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
}

const inputValidationSignUp: FC<InputValidationSignUpProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
  onBlur,
  inputName,
  min,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputState = useSelector(
    (state: RootState) => state.signup.signup[inputName],
  );

  const handleInputChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trimStart();
    dispatch(setInputValueWithValidation(inputName, newValue));
  };
  return (
    <InputValidation
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
    />
  );
};

export default inputValidationSignUp;
