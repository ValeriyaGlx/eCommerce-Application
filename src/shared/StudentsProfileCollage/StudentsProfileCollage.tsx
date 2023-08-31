import React from 'react';

import './_StudentsProfileCollage.scss';
import collage from '../../assets/img/collage.svg';
import Button from '../components/Button/Button';

const StudentsProfileCollage = () => {
  return (
    <div className={'profile-wrapper'}>
      <div className={'profile-container__img'}>
        <div className={'profile-container__button'}>
          <Button
            className={'button-main-products'}
            data={'Change Password'}
            onClick={() => console.log('change password')}
          />
        </div>
        <img src={collage} alt={'img'} />
      </div>
    </div>
  );
};

export default StudentsProfileCollage;
