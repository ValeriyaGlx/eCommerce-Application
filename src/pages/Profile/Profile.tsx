import React from 'react';
import './_Profile.scss';

import { FORM_LINKS_DATA as formLinks } from '../../constants/studentsProfileForm/studentsProfileForm';
import { COLLAGE_LINKS_DATA as collageLinks } from '../../constants/studentsProfileCollage/studentsProfileCollage';
import StudentProfileForm from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import StudentsProfileCollage from '../../shared/components/StudentsProfileCollage/StudentsProfileCollage';

export function Profile() {
  return (
    <div className='wrapper-profile'>
      {formLinks.map(({ id, imageUrl, title }) => (
        <StudentProfileForm key={id} title={title} imageUrl={imageUrl} />
      ))}
      {collageLinks.map(({ id, className, imageUrl }) => (
        <StudentsProfileCollage
          key={id}
          className={className}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
}

export default Profile;
