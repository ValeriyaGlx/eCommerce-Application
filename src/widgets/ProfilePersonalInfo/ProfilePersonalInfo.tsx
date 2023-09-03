import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditMode from '../../shared/components/EditMode/EditMode';
import { INPUTS_PROFILE_DATA as profLinks } from '../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../entities/InputValidationSignUp/view/InputValidationSignUp';
import getCookie from '../../shared/cookie/getCookie';
import { getProfile } from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import { setInputValueWithValidation } from '../../app/store/actions/signupActions/signupActions';
import { store } from '../../app/store/store';
import { updateProfile } from './usage/profileUpdateAPI';
import { setVersion } from '../../app/store/actions/profileVersion/profileVersion';
import profile from '../../pages/Profile/Profile';

type AppDispatch = typeof store.dispatch;

const ProfilePersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const onEditMode = () => {
    setEditMode(true);
    setReadonlyMode(false);
  };

  const offEditMode = () => {
    setEditMode(false);
    setReadonlyMode(true);
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const profileFields = Object.entries(profile.personal);
        console.log(profileFields);

        profileFields.forEach((el) => {
          const inputName = el[0];
          const inputValue = el[1];
          dispatch(setInputValueWithValidation(inputName, inputValue));
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  };

  const sendRequest = () => {
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const version = profile.version;

        await dispatch(setVersion({ version }));
        await updateProfile(token);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    setEditMode(false);
    setReadonlyMode(true);
  };

  return (
    <>
      <div className={'personal-information-edit_container'}>
        <h4 className={'profile-form__headline'}>Personal Information</h4>
        <EditMode
          editMode={editMode}
          onEditMode={onEditMode}
          offEditMode={offEditMode}
          sendRequest={sendRequest}
        />
      </div>
      <div className={'profile-form__input'}>
        {profLinks.map(({ id, type, placeholder, name, logo, min, style }) => (
          <InputValidationSignUp
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            logo={logo}
            min={min}
            styles={style}
            readonly={readonlyMode}
          />
        ))}
      </div>
    </>
  );
};

export default ProfilePersonalInfo;
