import React, { FC, useState } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import './_ModalWindowPasswordAnimation.scss';
import './_ModalWindowPassword.scss';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import InputValidationPassword from '../../../entities/InputValidationPassword/InputValidationPassword';
import { store } from '../../../app/store/store';
import { closeModal } from '../../../app/store/actions/modalSliceAction/modalSlice';
import Button from '../../components/Button/Button';
import { resetPasswordState } from '../../../app/store/actions/changePasswordAction/changePasswordSlice';
import { resetPassword } from '../../../app/store/actions/signupActions/sugnupSlice';
import getCookie from '../../cookie/getCookie';
import { getProfile } from '../../components/StudentsProfileForm/usage/ProfileFormAPI';
import { setVersion } from '../../../app/store/actions/profileVersion/profileVersion';

import { changePassword } from '../usage/changePasswordAPI';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';

type RootState = ReturnType<typeof store.getState>;

interface ModalProfileProps {
  isOpen: boolean;
  onClick?: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen }) => {
  const passwordState = useSelector(
    (state: RootState) => state.signup.signup.password,
  );
  const [isValid, setIsValid] = useState(true);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const closePasswordModal = () => {
    setIsValid(true);
    dispatch(closeModal());
    dispatch(resetPasswordState());
    dispatch(resetPassword());
  };

  const submitChangePassword = () => {
    const errorState = store.getState().changePassword;
    const newPasswordValidation =
      store.getState().signup.signup.password.validationError;
    const errors = [
      errorState.confirmPassword.validationError,
      errorState.currentPassword.validationError,
      newPasswordValidation,
    ];

    const filteredErrors = errors.filter((error) => error !== null);

    if (filteredErrors.length > 0) {
      setIsValid(false);
      //
      Object.entries(passwordState).forEach((inputName) => {
        console.log(inputName);
        // dispatch(setInputValueWithValidation(inputName[0], inputName[1].value));
      });
      console.log(errors);
      return;
    }

    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const version = profile.version;

        dispatch(setVersion({ version }));
        const res = await changePassword(token);
      } catch (e) {
        console.log(e);
      }
    };
    console.log('send');
    // fetchData();
  };

  return (
    <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
      <div className={'modal-background'}>
        <div className={'modal-window'}>
          <div className={'modal-inner'}>
            <h2>Change the Password</h2>
            <h5>Current Password</h5>
            <InputValidationPassword
              type={'password'}
              placeholder={'Current Password'}
              inputName={'currentPassword'}
              isValid={isValid}
            />
            <h5>New Password</h5>
            <InputValidationSignUp
              type={'password'}
              placeholder={'New Password'}
              inputName={'password'}
              changePassword={true}
            />
            <InputValidationPassword
              type={'password'}
              placeholder={'Confirm Password'}
              inputName={'confirmPassword'}
              isValid={isValid}
            />
            <div
              className={'image-modal-close'}
              onClick={closePasswordModal}
            ></div>
            <div className={'image-modal-save'}>
              <Button
                className={'profile-button'}
                data={'Save'}
                onClick={submitChangePassword}
              />
              <Button
                className={'profile-button'}
                data={'Cancel'}
                onClick={closePasswordModal}
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalProfile;
