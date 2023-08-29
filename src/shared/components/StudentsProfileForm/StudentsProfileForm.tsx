import React from 'react';

import './_StudentsProfileForm.scss';
// eslint-disable-next-line max-len
import { INPUTS_PROFILE_DATA as profileLinks } from '../../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';

interface StudentProfileFormProps {
  title: string;
  imageUrl: string;
}

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  title,
  imageUrl,
}) => {
  return (
    <div className='profile-form'>
      <div className='profile-form__head'>
        <div className='profile-form__title'>{title}</div>
        <img src={imageUrl} alt={'img'} />
      </div>
      <div className={'profile-form__input'}>
        {profileLinks.map(
          ({ id, type, placeholder, name, logo, min, style }) => (
            <InputValidationSignUp
              key={id}
              type={type}
              placeholder={placeholder}
              inputName={name}
              logo={logo}
              min={min}
              styles={style}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default StudentProfileForm;
