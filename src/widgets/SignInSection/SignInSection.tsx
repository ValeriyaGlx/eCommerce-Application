import React from 'react';

import Logo from '../../shared/Logo/Logo';
import InputValidation from '../../entities/InputValidation/InputValidation';
import InputSubmit from '../../entities/InputSubmit/InputSubmit';
import './SignInSection.scss';
import blueLogo from '../../assets/icons/logo-blue.svg';

const SignInSection = () => {
  return (
    <section className={'signInSection'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title'} logo={blueLogo} />
      </div>
      <h2 className={'signInSection-text'}>Login to Your Account</h2>
      <div className={'container-input'}>
        <InputValidation type={'text'} placeholder={'Email'} />
        <InputValidation type={'password'} placeholder={'Password'} />
      </div>
      <InputSubmit className={'signIn_submit-button'} value={'SIGN IN'} />
    </section>
  );
};

export default SignInSection;
