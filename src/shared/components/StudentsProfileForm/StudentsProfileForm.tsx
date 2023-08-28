import React from 'react';
import './_StudentsProfileForm.scss';

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
    </div>
  );
};

export default StudentProfileForm;
