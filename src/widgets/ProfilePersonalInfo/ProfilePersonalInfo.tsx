import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditMode from '../../shared/components/EditMode/EditMode';
import { INPUTS_PROFILE_DATA as profLinks } from '../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../entities/InputValidationSignUp/view/InputValidationSignUp';
import getCookie from '../../shared/cookie/getCookie';
import { getProfile } from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import { setInputValueWithValidation } from '../../app/store/actions/signupActions/signupActions';
import { store } from '../../app/store/store';
import { setVersion } from '../../app/store/actions/profileVersion/profileVersion';

import { updateProfile } from './usage/profileUpdateAPI';

type AppDispatch = typeof store.dispatch;

const ProfilePersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(true);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('red');
  const [fieldChanges, setFieldChanges] = useState({});
  const [validErrors, setValidErrors] = useState({});
  const [currentValues, setCurrentValues] = useState({});

  const dispatch = useDispatch<AppDispatch>();

  const onFieldChange = (fieldName: string, fieldValue: string) => {
    setFieldChanges((prevChanges) => ({
      ...prevChanges,
      [fieldName]: fieldValue,
    }));

    const validationErrors = store.getState().signup.signup[fieldName]
      .validationError as string;

    const values = store
      .getState()
      .signup.signup[fieldName].value.trim() as string;
    setCurrentValues((prevValues) => ({
      ...prevValues,
      [fieldName]: values,
    }));

    setValidErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validationErrors,
    }));
  };

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

    setFieldChanges({});
    setValidErrors({});
  };

  const sendRequest = () => {
    const hasChanges = Object.keys(fieldChanges).length > 0;
    let hasValidationErrors = false;

    Object.values(validErrors).forEach((error) => {
      if (error) {
        hasValidationErrors = true;
      }
    });

    if (!hasChanges) {
      setMessage('No changes made.');
      setColor('red');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    if (hasValidationErrors) {
      setMessage('Fix validation errors first.');
      setColor('red');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const version = profile.version;
        await dispatch(setVersion({ version }));

        const entriesProfilePersonal = Object.entries(profile.personal);
        const entriesCurrentValues = Object.entries(currentValues);

        const isMatch = entriesCurrentValues.every(
          ([currentKey, currentValue]) => {
            const matchingEntry = entriesProfilePersonal.find(
              ([key, value]) => key === currentKey && value === currentValue,
            );

            return matchingEntry !== undefined;
          },
        );

        if (!isMatch) {
          await updateProfile(token);
          setMessage('Data updated successfully!');
          setTimeout(() => setMessage(''), 1000);

          setColor('green');
          setEditMode(false);
          setReadonlyMode(true);
        } else {
          setMessage('No changes made.');
          setColor('red');
          setTimeout(() => setMessage(''), 1000);
          return;
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    setFieldChanges({});
    setValidErrors({});
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
          message={message}
          colorMessage={color}
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
            onFieldChange={onFieldChange}
          />
        ))}
      </div>
    </>
  );
};

export default ProfilePersonalInfo;
