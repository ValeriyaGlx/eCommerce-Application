import './_Profile.scss';

import StudentProfileForm from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import StudentsProfileCollage from '../../shared/StudentsProfileCollage/StudentsProfileCollage';
import ModalProfile from '../../shared/ModalWindowPassword/view/ModalWindowPassword';

export function Profile() {
  return (
    <>
      <div className='wrapper-profile'>
        <StudentProfileForm />
        <StudentsProfileCollage />
        <ModalProfile isOpen={false} />
      </div>
    </>
  );
}

export default Profile;
