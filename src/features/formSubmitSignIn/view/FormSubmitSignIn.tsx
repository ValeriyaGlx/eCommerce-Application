import React from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import './_formSubmutSignIn.scss';
import { authorize } from '../usage/ApiAuthorization';
import InputSubmit from '../../../shared/components/InputSubmit/InputSubmit';
import InputValidationSignIn from '../../../entities/InputValidationSignIn/view/InputValidationSignIn';
import {
  validateEmail,
  validatePassword,
} from '../../../entities/InputValidationSignIn/usage/utils/validationSignIn';
import { showPassword } from '../../formCommon/showPassword';
import { store } from '../../../app/store/store';
import { setSingInInputValidationError } from '../../../app/store/signinAction/signinSlice';

type RootState = ReturnType<typeof store.getState>;

const FormSubmitSignIn = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const emailState = useSelector((state: RootState) => state.signin.email);

  const passwordState = useSelector(
    (state: RootState) => state.signin.password,
  );

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrorEmail: string = validateEmail(emailState.value);
    dispatch(
      setSingInInputValidationError({
        inputName: 'email',
        validationError: validationErrorEmail,
      }),
    );
    const validationErrorPassword: string = validatePassword(
      passwordState.value,
    );
    dispatch(
      setSingInInputValidationError({
        inputName: 'password',
        validationError: validationErrorPassword,
      }),
    );
    if (
      validationErrorPassword.length === 0 &&
      validationErrorEmail.length === 0
    ) {
      const email = store.getState().signin.email.value;
      const password = store.getState().signin.password.value;
      await authorize(email, password);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputValidationSignIn
        type={'text'}
        placeholder={'Email'}
        valid={validateEmail}
        inputName={'email'}
      />
      <InputValidationSignIn
        type={'password'}
        placeholder={'Password'}
        showPassword={showPassword}
        valid={validatePassword}
        inputName={'password'}
      />
      <div className={'container-submit'}>
        <InputSubmit className={'signIn_submit-button'} value={'SIGN IN'} />
      </div>
    </form>
  );
};

export default FormSubmitSignIn;
