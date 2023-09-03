import React, { useState } from 'react';

import './_StudentsProfileCollage.scss';
import collage from '../../assets/img/collage.svg';
import Button from '../components/Button/Button';
import ModalProfile from '../ModalWindowPassword/ModalWindowPassword';

const StudentsProfileCollage = () => {
  const [isOpen, setOpen] = useState(false);
  const showClickModalWindow = () => {
    setOpen((currentValue) => !currentValue);
  };

  return (
    <>
      <ModalProfile isOpen={isOpen} />
      <div className={'profile-wrapper'}>
        <div className={'profile-container__img'}>
          <div className={'profile-container__button'}>
            <Button
              className={'profile-button'}
              data={'Change the Password'}
              onClick={showClickModalWindow}
            />
          </div>
          <img src={collage} alt={'img'} />
        </div>
      </div>
    </>
  );
};

export default StudentsProfileCollage;
