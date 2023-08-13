import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import logoVisible from '../../assets/icons/visible.png';
import './_InputValidation.scss';
import { setInputValueWithValidation } from '../../app/store/validationActions/signupActions';
import { store } from '../../app/store/store';

interface InputValidationProps {
  type: string;
  placeholder: string;
  inputName: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
  handleInputChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}

type RootState = ReturnType<typeof store.getState>;

const InputValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
  handleInputChange,
  onBlur,
  errorMessage,
  value,
  inputName,
  min,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputState = useSelector(
    (state: RootState) => state.inputs.signup[inputName],
  );

  const handleInputChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trimStart();
    dispatch(setInputValueWithValidation(inputName, newValue));
  };

  return (
    <React.Fragment>
      <div className={'input-area'}>
        {logo && <img className={'input-logo'} src={logo} alt={'icon'} />}
        <input
          type={type}
          placeholder={placeholder}
          value={inputName === 'sign-in' ? value : inputState.value}
          onBlur={onBlur}
          onChange={
            inputName === 'sign-in' ? handleInputChange : handleInputChangeTest
          }
          min={min}
        />
        {type === 'password' && (
          <button className={'show-password'} onClick={showPassword}>
            <img className={'password-visible'} src={logoVisible} alt={'eye'} />
          </button>
        )}
      </div>
      <div className={'error-message'}>
        {inputName === 'sign-in' ? errorMessage : inputState.validationError}
      </div>
    </React.Fragment>
  );
};

export default InputValidation;
