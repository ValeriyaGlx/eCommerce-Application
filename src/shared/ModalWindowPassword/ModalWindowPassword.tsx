import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import './_ModalWindowPasswordAnimation.scss';
import './_ModalWindowPassword.scss';
import InputValidationSignUp from '../../entities/InputValidationSignUp/view/InputValidationSignUp';
import InputValidationPassword from '../../entities/InputValidationPassword/InputValidationPassword';
import { store } from '../../app/store/store';
import { closeModal } from '../../app/store/actions/modalSliceAction/modalSlice';
import Button from '../components/Button/Button';
import { resetPasswordState } from '../../app/store/actions/changePasswordAction/changePasswordSlice';
import { resetPassword } from '../../app/store/actions/signupActions/sugnupSlice';

type RootState = ReturnType<typeof store.getState>;

interface ModalProfileProps {
  isOpen: boolean;
  onClick?: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen }) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const closePasswordModal = () => {
    dispatch(closeModal());
    dispatch(resetPasswordState());
    dispatch(resetPassword());
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
            />
            <div
              className={'image-modal-close'}
              onClick={closePasswordModal}
            ></div>
            <div className={'image-modal-save'}>
              <Button
                className={'profile-button'}
                data={'Save'}
                onClick={() => {}}
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
