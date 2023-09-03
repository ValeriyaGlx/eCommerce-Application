import React from 'react';

import './_StudentsProfileCollage.scss';
import collage from '../../assets/img/collage.svg';
import Button from '../components/Button/Button';
import ModalProfile from '../ModalWindowPassword/ModalWindowPassword';

const handleClick = () => {
  console.log(1);
  return <ModalProfile isOpen={false} onClick={() => undefined} />;
};

const StudentsProfileCollage = () => {
  return (
    <div className={'profile-wrapper'}>
      <div className={'profile-container__img'}>
        <div className={'profile-container__button'}>
          <Button
<<<<<<< HEAD
            className={'profile-button'}
            data={'Change the Password'}
            onClick={() => console.log('change password')}
=======
            className={'button-main-products'}
            data={'Change Password'}
            onClick={handleClick}
>>>>>>> 76873b4 (feat: add new objects, scss styles)
          />
        </div>
        <img src={collage} alt={'img'} />
      </div>
    </div>
  );
};

export default StudentsProfileCollage;
