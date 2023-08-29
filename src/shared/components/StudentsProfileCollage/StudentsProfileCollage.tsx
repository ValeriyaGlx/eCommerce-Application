import React from 'react';

import './_StudentsProfileCollage.scss';
import collage from '../../../assets/img/collage.png';

const StudentsProfileCollage = () => {
  return (
    <div className={'profile-container__img'}>
      <img src={collage} alt={'img'} />
    </div>
  );
};

export default StudentsProfileCollage;
