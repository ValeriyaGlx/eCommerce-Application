import React from 'react';
import './_Profile.scss';

import StudentProfileForm from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import StudentsProfileCollage from '../../shared/StudentsProfileCollage/StudentsProfileCollage';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

export function Profile() {
  return (
    <>
      <div className={'profile-container__button'}>
        <ButtonWithRoute
          className={'button-signIn button-main-products'}
          path={'/products'}
          data={'Load More'}
        />
      </div>
      <div className='wrapper-profile'>
        <StudentProfileForm />
        <StudentsProfileCollage />
      </div>
    </>
  );
}

export default Profile;
