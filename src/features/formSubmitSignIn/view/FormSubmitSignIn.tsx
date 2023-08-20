import React from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import './_formSubmutSignIn.scss';
import { useNavigate } from 'react-router-dom';

import { tokenRequest, logInRequest } from '../usage/ApiAuthorization';
import InputSubmit from '../../../shared/components/InputSubmit/InputSubmit';
import InputValidationSignIn from '../../../entities/InputValidationSignIn/view/InputValidationSignIn';
import {
  validateEmail,
  validatePassword,
} from '../../../entities/InputValidationSignIn/usage/utils/validationSignIn';
import { showPassword } from '../../formCommon/showPassword';
import { store } from '../../../app/store/store';
import { setSingInInputValidationError } from '../../../app/store/actions/signinAction/signinSlice';
import {
  closeModal,
  openModal,
} from '../../../app/store/actions/modalSliceAction/modalSlice';
import { loginSuccess } from '../../../app/store/actions/authorizationAction/authorizationSlice';
import logoFailed from '../../../assets/icons/modal-logo-failed.png';
import ModalSignPage from '../../ModalFailed/ModalFailed';
import setToken from '../../../shared/cookie/setToken';
import setDataLocalStorage from '../../../shared/localStorage/setDataLocalStorage';

type RootState = ReturnType<typeof store.getState>;

const FormSubmitSignIn = () => {
  const navigate = useNavigate();

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const emailState = useSelector((state: RootState) => state.signin.email);
  const passwordState = useSelector(
    (state: RootState) => state.signin.password,
  );
  useSelector((state: RootState) => state.modal.isOpen);

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
      const isAuthorization = await tokenRequest(email, password);
      if (typeof isAuthorization === 'number') {
        dispatch(openModal());
      } else {
        const token = isAuthorization.access_token;
        setToken(token);
        const logindata = await logInRequest(email, password, token);
        setDataLocalStorage('firstName', logindata.customer.firstName);

        dispatch(loginSuccess());
        navigate('/');
      }
    }
  };

  const clickButton = () => {
    dispatch(closeModal());
  };

  return (
    <div className={'wrapper-form'}>
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
          <InputSubmit className={'signIn_submit-button'} value={'Sign in'} />
        </div>
      </form>
      <ModalSignPage
        logo={logoFailed}
        h2={'Login Failed!'}
        p={'Please, recheck the username and password and try again'}
        buttonValue={'TRY AGAIN'}
        isOpen={store.getState().modal.isOpen}
        onClick={clickButton}
      />
    </div>
  );
};

export default FormSubmitSignIn;
