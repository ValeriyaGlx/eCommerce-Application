import React from 'react';

import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import './_MainHome.scss';

const MainHome = () => {
  return (
    <div className={'wrapper-main'}>
      <p>Для проверки</p>
      <ButtonWithRoute
        className={'button-signIn button-signIn__addition'}
        path={'/signIn'}
        data={'Sign in'}
      />
      <ButtonWithRoute
        className={'button-signUp button-signUp__addition'}
        path={'/singUp'}
        data={'Sign up'}
      />
    </div>
  );
};

export default MainHome;
