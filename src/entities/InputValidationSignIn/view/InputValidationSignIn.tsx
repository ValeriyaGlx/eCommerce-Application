import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import InputValidation from '../../../shared/components/InputValidation/InputValidation';
import { store } from '../../../app/store/store';
import {
  setSingInInputValidationError,
  setSingInInputValue,
} from '../../../app/store/actions/signinAction/signinSlice';

type RootState = ReturnType<typeof store.getState>;

interface InputValidationProps {
  type: string;
  placeholder: string;
  valid: (inputValue: string) => string;
  showPassword?: (e: React.MouseEvent) => void;
  inputName: string;
}

const InputValidationSignIn: FC<InputValidationProps> = ({
  type,
  placeholder,
  valid,
  showPassword,
  inputName,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const inputState = useSelector((state: RootState) => state.signin[inputName]);

  const validate = (inputValue: string) => {
    const validationError = valid(inputValue);
    dispatch(setSingInInputValidationError({ inputName, validationError }));
  };

  const handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue: string = event.currentTarget.value.trimStart();
    validate(inputValue);
    dispatch(setSingInInputValue({ inputName, inputValue }));
  };

  const error = store.getState().signin[inputName].validationError;

  return (
    <div>
      <InputValidation
        errorClass={error === '' || error === null ? '' : 'red-singin'}
        type={type}
        placeholder={placeholder}
        showPassword={showPassword}
        inputName={inputName}
        handleInputChange={handleValueChange}
        value={inputState.value}
        errorMessage={inputState.validationError}
        color={'white'}
      />
    </div>
  );
};

export default InputValidationSignIn;
