import React from 'react';
import './_Profile.scss';

import StudentProfileForm from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import StudentsProfileCollage from '../../shared/components/StudentsProfileCollage/StudentsProfileCollage';

export function Profile() {
  return (
    <div className='wrapper-profile'>
      <StudentProfileForm />
      <StudentsProfileCollage />
    </div>
  );
}

export default Profile;
