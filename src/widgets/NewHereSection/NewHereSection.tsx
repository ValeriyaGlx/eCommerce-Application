import React from 'react';

import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import './_NewHereSection.scss';

const NewHereSection = () => {
  return (
    <section className={'newHereSection'}>
      <h2 className={'newHereSection-title'}>New Here?</h2>
      <p className={'newHereSection-text'}>
        Join our community and unlock a world of possibilities.
        <br />
        Create your account now and dive into a realm of exciting opportunities!
      </p>
      <ButtonWithRoute
        className={'button-signUp'}
        path={'/signUp'}
        data={'Sign up'}
      />
    </section>
  );
};

export default NewHereSection;
