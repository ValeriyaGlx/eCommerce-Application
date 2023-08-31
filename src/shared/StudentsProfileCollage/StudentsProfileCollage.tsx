import React from 'react';

import './_StudentsProfileCollage.scss';
import collage from '../../assets/img/collage.svg';
import ButtonWithRoute from '../components/ButtonWithRoute/ButtonWithRoute';

const StudentsProfileCollage = () => {
  return (
    <div className={'profile-wrapper'}>
      <div className={'profile-container__img'}>
        <img src={collage} alt={'img'} />
        <div className={'profile-container__button'}>
          <ButtonWithRoute
            className={'button-signIn button-main-products'}
            path={''}
            data={'Change Password'}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsProfileCollage;
