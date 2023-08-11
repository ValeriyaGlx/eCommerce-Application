import React from 'react';

import Logo from '../../shared/Logo/Logo';
import './_SignInSection.scss';
import blueLogo from '../../assets/icons/logo-blue.svg';
import FormSubmitSignIn from '../../features/formSubmitSignIn/FormSubmitSignIn';

const SignInSection = () => {
  return (
    <section className={'signInSection'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title'} logo={blueLogo} />
      </div>
      <h2 className={'signInSection-text'}>Login to Your Account</h2>
      <div className={'container-input'}>
        <FormSubmitSignIn />
      </div>
    </section>
  );
};

export default SignInSection;
