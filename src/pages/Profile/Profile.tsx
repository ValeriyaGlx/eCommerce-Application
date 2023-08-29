import React from 'react';
import './_Profile.scss';

import { FORM_LINKS_DATA as formLinks } from '../../constants/studentsProfileForm/studentsProfileForm';
import StudentProfileForm from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import StudentsProfileCollage from '../../shared/components/StudentsProfileCollage/StudentsProfileCollage';

export function Profile() {
  return (
    <div className='wrapper-profile'>
      {formLinks.map(({ id, imageUrl, title }) => (
        <StudentProfileForm key={id} title={title} imageUrl={imageUrl} />
      ))}

      <StudentsProfileCollage />
    </div>
  );
}

export default Profile;
