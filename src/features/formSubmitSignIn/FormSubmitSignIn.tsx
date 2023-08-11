import React, { useState } from 'react';

import InputSubmit from '../../entities/InputSubmit/InputSubmit';
import InputWithValidation from '../InputWithValidation/InputWithValidation';
import {
  validateEmail,
  validatePassword,
  validateSubmit,
} from '../utils/Validation';
import './_formSubmutSignIn.scss';
import { showPassword } from '../formCommon/showPassword';

const FormSubmitSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(validateSubmit(email, password));
  };

  const handleInputEmail = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = event.currentTarget.value;
    setEmail(newValue);
  };

  const handleInputPassword = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = event.currentTarget.value;
    setPassword(newValue);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputWithValidation
        type={'text'}
        placeholder={'Email'}
        value={email}
        valid={validateEmail}
        onBlur={handleInputEmail}
      />
      <InputWithValidation
        type={'password'}
        placeholder={'Password'}
        showPassword={showPassword}
        value={password}
        valid={validatePassword}
        onBlur={handleInputPassword}
      />
      <div className={'container-submit'}>
        <InputSubmit className={'signIn_submit-button'} value={'SIGN IN'} />
        <div className={'error-message'}>{errorMessage}</div>
      </div>
    </form>
  );
};

export default FormSubmitSignIn;
